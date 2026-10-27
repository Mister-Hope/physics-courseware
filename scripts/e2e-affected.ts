import { execFileSync } from "node:child_process";
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { AffectedPlan } from "../e2e/affected";
import { selectAffectedCourses } from "../e2e/affected";
import { listAllCourses } from "../e2e/courses";

// `pnpm e2e:affected` —— 算出"这次改动需要跑哪些课件"，并给 CI 产出 `E2E_COURSE` / matrix。
//
// 三种用法：
//
//   pnpm e2e:affected --since origin/main --explain   # 本地：看这次分支会跑哪几门
//   pnpm e2e:affected --since HEAD~1                 # 只按最近一个提交判定
//   pnpm e2e:affected --github                       # CI：自动取基线并写 $GITHUB_OUTPUT
//
// 基线规则：
//
// - `--since <ref>` 优先；
// - PR（`pull_request`）：`pull_request.base.sha`（与 HEAD 求 merge-base）；
// - push main：**上次成功的 CI** 的 `head_sha`（失败不推进基线，红的课件下次自动带上）；
// - 其它事件 / 本地：默认全量。
//
// 兜底原则是 **fail-open**：基线拿不到、diff 失败、脚本异常，一律回退全量，绝不静默跳过。
// 只有"改动确实与幻灯片版面无关"（文档 / 教案 / 注册表 / 入口网站）才返回 `none`。
//
// CI 侧输出（`$GITHUB_OUTPUT`）：`mode`（none / courses / all）、`matrix`（分片后的矩阵）、
// `baseline`、`total`；同时往 `$GITHUB_STEP_SUMMARY` 写一段人类可读的判定摘要。

const ROOT_DIR = path.resolve(import.meta.dirname, "..");
const COURSES_DIR = path.join(ROOT_DIR, "courses");
// 全量时分几片跑（GitHub Actions matrix），每片一个 runner
const DEFAULT_JOBS = 6;
// 超过多少门课才值得分片
const DEFAULT_SHARD_SIZE = 12;
// 基线最多回溯多少天：太旧的"上次成功"会让 diff 大到失去意义
const DEFAULT_MAX_AGE_DAYS = 7;
// 写进理由里的改动文件上限，避免 CI 摘要过长
const MAX_REASON_FILES = 8;
// 课件页数缓存（分片均衡用；读不到时按 1 页算）
const pageCountCache = new Map<string, number>();

interface Options {
  since?: string;
  full: boolean;
  jobs: number;
  shardSize: number;
  maxAgeDays: number;
  explain: boolean;
  json: boolean;
  github: boolean;
  changedFilesFrom?: string;
}

interface DiffBaseline {
  // 基线 commit；没有可用基线时为 undefined，表示全量
  ref?: string;
  // 人类可读的来源说明
  source: string;
}

interface EmitInput {
  plan: AffectedPlan;
  shards: string[][];
  baseline: DiffBaseline;
  changedFileCount: number;
  changedFiles: string[];
}

interface GithubEvent {
  before?: string;
  pull_request?: { base?: { sha?: string } };
}

// ────────────────────────────── git 辅助 ──────────────────────────────

const git = (gitArgs: string[]): string =>
  execFileSync("git", gitArgs, {
    cwd: ROOT_DIR,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();

const gitTry = (gitArgs: string[]): string | null => {
  try {
    const output = git(gitArgs);

    return output.length > 0 ? output : null;
  } catch {
    return null;
  }
};

const refExists = (ref: string): boolean =>
  gitTry(["rev-parse", "--verify", `${ref}^{commit}`]) != null;

const isAncestor = (ref: string): boolean => {
  try {
    execFileSync("git", ["merge-base", "--is-ancestor", ref, "HEAD"], {
      cwd: ROOT_DIR,
      stdio: "ignore",
    });

    return true;
  } catch {
    return false;
  }
};

const readGithubEvent = (): GithubEvent | null => {
  const eventPath = process.env.GITHUB_EVENT_PATH;

  if (!eventPath || !existsSync(eventPath)) return null;

  try {
    return JSON.parse(readFileSync(eventPath, "utf8")) as GithubEvent;
  } catch {
    return null;
  }
};

// ────────────────────────────── 参数 ──────────────────────────────

const parsePositiveInt = (raw: string | undefined, flag: string): number => {
  const value = Number(raw);

  if (!Number.isInteger(value) || value <= 0)
    throw new Error(`${flag} 需要正整数，当前是 "${raw ?? ""}"`);

  return value;
};

const parseArgs = (argv: string[]): Options => {
  const parsed: Options = {
    full: false,
    jobs: DEFAULT_JOBS,
    shardSize: DEFAULT_SHARD_SIZE,
    maxAgeDays: DEFAULT_MAX_AGE_DAYS,
    explain: false,
    json: false,
    github: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    switch (arg) {
      case "--since": {
        parsed.since = argv[index + 1];
        index += 1;
        break;
      }
      case "--jobs": {
        parsed.jobs = parsePositiveInt(argv[index + 1], "--jobs");
        index += 1;
        break;
      }
      case "--shard-size": {
        parsed.shardSize = parsePositiveInt(argv[index + 1], "--shard-size");
        index += 1;
        break;
      }
      case "--max-age-days": {
        parsed.maxAgeDays = parsePositiveInt(argv[index + 1], "--max-age-days");
        index += 1;
        break;
      }
      case "--changed-files-from": {
        parsed.changedFilesFrom = argv[index + 1];
        index += 1;
        break;
      }
      case "--full": {
        parsed.full = true;
        break;
      }
      case "--explain": {
        parsed.explain = true;
        break;
      }
      case "--json": {
        parsed.json = true;
        break;
      }
      case "--github": {
        parsed.github = true;
        break;
      }
      default: {
        throw new Error(`未知参数：${arg}`);
      }
    }
  }

  return parsed;
};

const options = parseArgs(process.argv.slice(2));
const allCourses = listAllCourses().map((course) => course.slug);

// ────────────────────────────── 基线 ──────────────────────────────

// 取「上次成功的 CI」的 head_sha：失败不推进基线，所以红过的课件下次会被自动带上
const lastSuccessfulRunSha = async (): Promise<string | null> => {
  const repository = process.env.GITHUB_REPOSITORY;
  const token = process.env.GITHUB_TOKEN;

  if (!repository || !token) return null;

  const workflow = (process.env.E2E_BASELINE_WORKFLOW ?? "ci.yml").trim();
  const branch = (process.env.E2E_BASELINE_BRANCH ?? "main").trim();
  const url = `https://api.github.com/repos/${repository}/actions/workflows/${workflow}/runs?branch=${encodeURIComponent(branch)}&status=success&per_page=1`;

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${token}`,
        "user-agent": "physics-courseware-e2e-affected",
        "x-github-api-version": "2022-11-28",
      },
    });

    if (!response.ok) {
      console.warn(`⚠️ 查询上次成功的 CI 失败：HTTP ${response.status}`);
      return null;
    }

    const payload = (await response.json()) as { workflow_runs?: { head_sha?: string }[] };

    return payload.workflow_runs?.[0]?.head_sha ?? null;
  } catch (err) {
    console.warn(`⚠️ 查询上次成功的 CI 出错：${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
};

const validateBaseline = (ref: string, source: string): DiffBaseline => {
  if (!refExists(ref)) return { source: `${source}，但基线 ${ref.slice(0, 7)} 不在本地历史里` };

  if (!isAncestor(ref))
    return { source: `${source}，但基线不是 HEAD 的祖先（force-push / rebase？）` };

  const timestamp = Number(gitTry(["log", "-1", "--format=%ct", ref]));

  if (Number.isFinite(timestamp) && timestamp > 0) {
    const ageDays = (Date.now() / 1000 - timestamp) / 86_400;

    if (ageDays > options.maxAgeDays) {
      return {
        source: `${source}，但基线已 ${ageDays.toFixed(1)} 天未更新（阈值 ${options.maxAgeDays} 天）`,
      };
    }
  }

  return { ref, source };
};

const resolvePullRequestBaseline = (event: GithubEvent | null): DiffBaseline => {
  const baseSha = event?.pull_request?.base?.sha;

  if (baseSha) return { ref: baseSha, source: "PR 基线（pull_request.base.sha）" };

  const mergeBase = gitTry(["merge-base", "HEAD", "origin/main"]);

  if (mergeBase) return { ref: mergeBase, source: "PR 基线（merge-base origin/main）" };

  return { source: "PR 取不到基线与 merge-base" };
};

const resolvePushBaseline = async (event: GithubEvent | null): Promise<DiffBaseline> => {
  const lastGreen = await lastSuccessfulRunSha();

  if (lastGreen) return validateBaseline(lastGreen, "上次成功的 CI（main）");

  const before = event?.before;

  if (before && !/^0+$/u.test(before))
    return validateBaseline(before, `本次 push 的上一个提交（${before.slice(0, 7)}）`);

  return { source: "没有上次成功的 CI，也拿不到上一个提交" };
};

const resolveBaseline = async (): Promise<DiffBaseline> => {
  if (options.changedFilesFrom) return { source: `改动清单文件 ${options.changedFilesFrom}` };

  if (options.full) return { source: "手动要求全量（--full / E2E_FULL）" };

  const since = options.since ?? process.env.E2E_SINCE?.trim();

  if (since) return { ref: since, source: "指定基线（--since）" };

  const fullFlag = (process.env.E2E_FULL ?? "").trim().toLowerCase();

  if (fullFlag === "1" || fullFlag === "true") return { source: "手动要求全量（E2E_FULL）" };

  if (!options.github)
    return { source: "本地未指定 --since，默认全量（用 --since origin/main 可增量）" };

  const eventName = process.env.GITHUB_EVENT_NAME ?? "";
  const event = readGithubEvent();

  if (eventName === "pull_request" || eventName === "pull_request_target")
    return resolvePullRequestBaseline(event);

  if (eventName === "push") return resolvePushBaseline(event);

  return { source: `事件 ${eventName || "(本地)"} 默认全量` };
};

// ────────────────────────────── 改动清单 ──────────────────────────────

const loadChangedFiles = (baseline: DiffBaseline): string[] => {
  if (options.changedFilesFrom) {
    return readFileSync(options.changedFilesFrom, "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  if (!baseline.ref) return [];

  const mergeBase = gitTry(["merge-base", baseline.ref, "HEAD"]);

  if (!mergeBase) throw new Error(`无法计算基线 ${baseline.ref.slice(0, 7)} 与 HEAD 的 merge-base`);

  return git(["diff", "--name-only", "--no-renames", mergeBase, "HEAD"])
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};

const selectPlan = (changedFiles: string[]): AffectedPlan => {
  if (changedFiles.length === 0)
    return { mode: "none", courses: [], reasons: ["基线之后没有改动"], ignored: [] };

  return selectAffectedCourses({ changedFiles, allCourses });
};

// ────────────────────────────── 分片 ──────────────────────────────

// 课件页数：给分片做均衡，避免某一片全是大课
const pageCount = (slug: string): number => {
  const cached = pageCountCache.get(slug);

  if (cached != null) return cached;

  let count = 1;

  try {
    const separators = readFileSync(path.join(COURSES_DIR, slug, "slides.md"), "utf8")
      .split("\n")
      .filter((line) => line.trim() === "---").length;

    count = Math.max(1, separators - 1);
  } catch {
    // 读不到就按 1 页算，只影响均衡、不影响正确性
  }

  pageCountCache.set(slug, count);

  return count;
};

// 不超过 shardSize 门就 1 片；否则最多 maxShards 片，按页数贪心均衡
const splitIntoShards = (courses: string[], maxShards: number, shardSize: number): string[][] => {
  if (courses.length === 0) return [];
  if (courses.length <= shardSize) return [courses];

  const shardCount = Math.min(maxShards, Math.ceil(courses.length / shardSize));
  const order = new Map(courses.map((slug, index) => [slug, index]));
  const bins = Array.from({ length: shardCount }, () => ({ slugs: [] as string[], pages: 0 }));
  const sorted = [...courses].sort(
    (left, right) => pageCount(right) - pageCount(left) || left.localeCompare(right),
  );

  for (const slug of sorted) {
    const target = bins.reduce((min, bin) => (bin.pages < min.pages ? bin : min));

    target.slugs.push(slug);
    target.pages += pageCount(slug);
  }

  return bins
    .filter((bin) => bin.slugs.length > 0)
    .map((bin) =>
      bin.slugs.sort((left, right) => (order.get(left) ?? 0) - (order.get(right) ?? 0)),
    );
};

// ────────────────────────────── 输出 ──────────────────────────────

const writeGithubOutput = (key: string, value: string): void => {
  appendFileSync(process.env.GITHUB_OUTPUT ?? "", `${key}=${value}\n`);
};

const printSummary = ({
  plan,
  shards,
  baseline,
  changedFileCount,
  changedFiles,
}: EmitInput): void => {
  const size =
    plan.mode === "all"
      ? `全量（${plan.courses.length} 门）`
      : plan.mode === "none"
        ? "跳过（与幻灯片版面无关）"
        : `${plan.courses.length} 门 / 共 ${allCourses.length} 门`;

  console.log("\n──────── E2E 受影响课件 ────────");
  console.log(`基线：${baseline.ref ? baseline.ref.slice(0, 12) : "(无)"}（${baseline.source}）`);
  console.log(`改动文件：${changedFileCount} 个`);
  console.log(`规模：${size}`);

  for (const reason of plan.reasons) console.log(`理由：${reason}`);

  if (plan.mode === "courses") console.log(`课件：${plan.courses.join("、")}`);

  if (shards.length > 1) {
    console.log("分片：");

    for (const [index, courses] of shards.entries())
      console.log(`  第 ${index + 1} 片（${courses.length} 门）：${courses.join("、")}`);
  }

  if (options.explain) {
    if (plan.ignored.length > 0) {
      console.log("忽略的改动：");

      for (const file of plan.ignored) console.log(`  - ${file}`);
    }

    if (changedFiles.length > 0) {
      console.log(
        `改动清单（前 ${Math.min(changedFiles.length, MAX_REASON_FILES)} 个，共 ${changedFiles.length} 个）：`,
      );

      for (const file of changedFiles.slice(0, MAX_REASON_FILES)) console.log(`  - ${file}`);
    }
  }
};

const writeStepSummary = ({ plan, shards, baseline, changedFileCount }: EmitInput): void => {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;

  if (!summaryPath) return;

  const size =
    plan.mode === "all"
      ? `**全量 ${plan.courses.length} 门**`
      : plan.mode === "none"
        ? "**跳过**（改动与幻灯片版面无关）"
        : `**${plan.courses.length} 门 / 共 ${allCourses.length} 门**`;

  const lines = [
    "## E2E 受影响的课件",
    "",
    `- 基线：${baseline.ref ? `\`${baseline.ref.slice(0, 12)}\`` : "（无）"}（${baseline.source}）`,
    `- 改动文件：${changedFileCount} 个`,
    `- 检查规模：${size}`,
    ...plan.reasons.map((reason) => `- 理由：${reason}`),
  ];

  if (plan.mode === "courses") lines.push(`- 课件：${plan.courses.join("、")}`);

  if (shards.length > 1) {
    lines.push(`- 分片：${shards.length} 片（每片一个 runner）`);

    for (const [index, courses] of shards.entries())
      lines.push(`  - 第 ${index + 1} 片（${courses.length} 门）：${courses.join("、")}`);
  }

  lines.push("");

  appendFileSync(summaryPath, lines.join("\n"));
};

const emit = ({ plan, shards, baseline, changedFileCount, changedFiles }: EmitInput): void => {
  const matrix = {
    include: shards.map((courses, index) => ({
      shard: index,
      count: courses.length,
      courses: courses.join(","),
    })),
  };

  if (options.json) {
    console.log(
      JSON.stringify(
        {
          baseline: baseline.ref ?? null,
          baselineSource: baseline.source,
          changedFileCount,
          plan,
          shards,
          matrix,
        },
        null,
        2,
      ),
    );
  } else {
    printSummary({ plan, shards, baseline, changedFileCount, changedFiles });
  }

  if (!process.env.GITHUB_OUTPUT) return;

  writeGithubOutput("mode", plan.mode);
  writeGithubOutput("baseline", baseline.ref ?? "");
  writeGithubOutput("total", String(allCourses.length));
  writeGithubOutput("matrix", JSON.stringify(matrix));

  writeStepSummary({ plan, shards, baseline, changedFileCount, changedFiles });
};

// ────────────────────────────── 入口 ──────────────────────────────

const run = async (): Promise<void> => {
  try {
    const baseline = await resolveBaseline();
    const changedFiles = loadChangedFiles(baseline);
    const plan =
      baseline.ref || options.changedFilesFrom
        ? selectPlan(changedFiles)
        : {
            mode: "all" as const,
            courses: [...allCourses],
            reasons: [baseline.source],
            ignored: [],
          };
    const shards = splitIntoShards(
      plan.mode === "none" ? [] : plan.courses,
      options.jobs,
      options.shardSize,
    );

    emit({ plan, shards, baseline, changedFileCount: changedFiles.length, changedFiles });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    console.error(`✗ 选课失败：${message}`);

    if (!options.github) {
      console.error("  （本地调试请用 --since <ref>，或直接 pnpm test:e2e 全量）");
      process.exitCode = 1;
      return;
    }

    // fail-open：选课脚本坏了也要跑测试，不能因为"算不出该跑谁"而静默跳过
    console.error("↪ 回退全量（fail-open）：本次按全部课件检查，避免漏测。");

    const shards = splitIntoShards(allCourses, options.jobs, options.shardSize);
    const plan: AffectedPlan = {
      mode: "all",
      courses: allCourses,
      reasons: [`选课脚本异常，回退全量：${message}`],
      ignored: [],
    };

    emit({
      plan,
      shards,
      baseline: { source: "选课失败，按全量处理" },
      changedFileCount: 0,
      changedFiles: [],
    });
  }
};

await run();
