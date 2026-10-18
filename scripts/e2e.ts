// `pnpm test:e2e` —— **限流版**端到端调度器（本地与 CI 都用它）。
//
// 为什么需要它：Playwright 的 `webServer` 数组会在**跑任何用例之前把列出的 server 全部启动**，
// 而本仓库一课一个 dev server：实测**单个 Slidev dev server ≈ 550MB**，25 个课件一起起 ≈ 13.6GB ——
// 本地和 CI（4 核 / 16GB）都会被打爆（CI 上表现为跑到一半 `SIGTERM`、exit 143）。
//
// 所以这里把 dev server 的生命周期收回来自己管：**同时最多 `E2E_CONCURRENCY` 个课件（默认 4）**，
// 哪个课件跑完就立刻补下一个（滑动窗口）。课件列表来自 `e2e/courses.ts`，**新加课件自动纳入**，
// 不需要在任何地方维护分片名单。
//
// 用法：
//
// ```bash
// pnpm test:e2e                                    # 全部课件，并发 4
// E2E_CONCURRENCY=2 pnpm test:e2e                  # 换并发上限（本机内存小就调小）
// E2E_COURSE=5.1-curvilinear-motion pnpm test:e2e  # 只跑指定课件（逗号分隔，多个）
// ```
//
// 只跑两道门禁 spec（`design-tokens` / `layout-overflow`）。`shots`（截图助手，用 `pnpm shots`）与
// `zzz-pages`（单页排查）是辅助工具，不进这个调度器；想直接跑全套用 `pnpm exec playwright test`。

import { spawn } from "node:child_process";
import type { ChildProcess } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

import { listCourses } from "../e2e/courses";
import type { CourseTarget } from "../e2e/courses";
import { describePortOwner, findFreePort, isHttpOk } from "../e2e/ports";

const ROOT_DIR = path.resolve(import.meta.dirname, "..");

/** 本调度器跑的是版面检查：产物按「操作」自动分家（见 `e2e/artifacts.ts`），子进程继承这个变量 */
process.env.E2E_OPERATION ??= "layout";

const PLAYWRIGHT_BIN = path.join(ROOT_DIR, "node_modules", ".bin", "playwright");
/** 两道门禁 spec（辅助 spec 见文件头） */
const SPEC_FILES = ["e2e/design-tokens.spec.ts", "e2e/layout-overflow.spec.ts"];
/** Dev server 就绪等待上限：Slidev 冷启动通常 10–40s，留足余量 */
const READY_TIMEOUT_MS = 180_000;
const READY_POLL_MS = 1000;
/** Dev server 失败时要回显的最后几行日志 */
const SERVER_LOG_LINES = 20;
/** 并发上限（超过课件数时按课件数算） */
const CONCURRENCY = Math.max(1, Number(process.env.E2E_CONCURRENCY ?? "4") || 4);

/** 一个课件的执行结果 */
interface CourseResult {
  /** 课件目录名 */
  slug: string;
  /** 是否通过 */
  passed: boolean;
  /** 耗时（秒） */
  seconds: number;
}

/** 所有活着的子进程（收到 Ctrl-C 时统一收尸） */
const liveChildren = new Set<ChildProcess>();

const logLine = (slug: string, line: string): void => {
  if (line.trim().length > 0) console.log(`[${slug}] ${line}`);
};

// 子进程输出逐行加前缀转发（并行时日志不串）
const pipeOutput = (child: ChildProcess, slug: string): void => {
  for (const stream of [child.stdout, child.stderr]) {
    stream?.setEncoding("utf8");
    stream?.on("data", (chunk: string) => {
      for (const line of chunk.split("\n")) logLine(slug, line);
    });
  }
};

// 能应答（任何 HTTP 状态都算）＝ dev server 就绪：Slidev 会先 302 到带 base 的路径
// ⛔ 用 `node:http` 探测，**不要**用 `fetch`：Node 24 的 undici 并发探测时会抛 setTypeOfService EINVAL 把整轮跑挂掉
const respondOk = (url: string): Promise<boolean> => isHttpOk(url);

// 轮询等待 dev server 就绪；超时返回 false
const waitForServer = async (url: string, deadline: number): Promise<boolean> => {
  if (await respondOk(url)) return true;
  if (Date.now() > deadline) return false;

  await new Promise((resolve) => {
    setTimeout(resolve, READY_POLL_MS);
  });

  return waitForServer(url, deadline);
};

// 启动某课件的 Slidev dev server；stderr 交给调用方收集（只在失败时回显）。
// 优先用课件自己的 bin：它是纯 node 进程，没有 pnpm 包一层，收尸干净、启动也快；
// 缺了才退回 `pnpm --filter <包名> exec slidev`（例如依赖还没装好）。
const startServer = (course: CourseTarget, collectStderr: (line: string) => void): ChildProcess => {
  const localBin = path.join(course.directory, "node_modules", ".bin", "slidev");
  const args = ["--base", `/${course.slug}/`, "--port", String(course.port)];
  const child = existsSync(localBin)
    ? spawn(localBin, args, {
        cwd: course.directory,
        detached: true,
        stdio: ["ignore", "ignore", "pipe"],
      })
    : spawn("pnpm", ["--filter", course.packageName, "exec", "slidev", ...args], {
        cwd: ROOT_DIR,
        detached: true,
        stdio: ["ignore", "ignore", "pipe"],
      });

  child.stderr?.setEncoding("utf8");
  child.stderr?.on("data", (chunk: string) => {
    for (const line of chunk.split("\n")) collectStderr(line);
  });

  liveChildren.add(child);
  child.once("exit", () => {
    liveChildren.delete(child);
  });

  return child;
};

// 收掉 dev server：detached 起的是进程组，连同它的子进程一起杀
const stopServer = (child: ChildProcess): void => {
  if (child.exitCode != null || child.signalCode != null) return;

  try {
    if (process.platform === "win32" || child.pid == null) child.kill("SIGTERM");
    else process.kill(-child.pid, "SIGTERM");
  } catch {
    child.kill("SIGTERM");
  }
};

// 用 Playwright 跑一个课件的门禁 spec，返回退出码
const runPlaywright = (course: CourseTarget): Promise<number> =>
  new Promise((resolve) => {
    const child = spawn(PLAYWRIGHT_BIN, ["test", ...SPEC_FILES], {
      cwd: ROOT_DIR,
      env: {
        ...process.env,
        // 只测这一个课件；server 由本调度器负责，别再让 Playwright 自己拉起来
        E2E_COURSE: course.slug,
        E2E_NO_WEBSERVER: "1",
        // 端口已经自动避让过（见 runCourse），告诉 spec 侧用同一个端口算 baseURL
        E2E_COURSE_PORT: String(course.port),
      },
      stdio: ["ignore", "pipe", "pipe"],
    });

    liveChildren.add(child);
    pipeOutput(child, course.slug);
    child.once("error", (error) => {
      logLine(course.slug, `启动 Playwright 失败：${error.message}`);
      resolve(1);
    });
    child.once("exit", (code) => {
      liveChildren.delete(child);
      resolve(code ?? 1);
    });
  });

// 跑一个课件：起 server → 等就绪 → 跑门禁 spec → 停 server（无论成败都收尸）
const runCourse = async (course: CourseTarget): Promise<CourseResult> => {
  const startedAt = Date.now();

  // 端口自动避让：教师本机开着的 dev server 常常正好占着某个课件的默认端口，
  // 撞上就 90s 超时（报错还只说"等待页面"，不提端口冲突）——所以先找一个真能绑的端口。
  const port = await findFreePort(course.port);
  const target: CourseTarget = {
    ...course,
    port,
    baseURL: `http://localhost:${port}/${course.slug}/`,
  };

  if (port !== course.port)
    {console.log(
      `↪ [${course.slug}] 端口 ${course.port} 被占用（${describePortOwner(course.port)}），改用 ${port}`,
    );}

  const serverLog: string[] = [];
  const server = startServer(target, (line) => {
    serverLog.push(line);
    if (serverLog.length > SERVER_LOG_LINES) serverLog.shift();
  });

  try {
    const ready = await waitForServer(target.baseURL, Date.now() + READY_TIMEOUT_MS);

    if (!ready) {
      console.log(`✗ [${target.slug}] dev server 在 ${READY_TIMEOUT_MS / 1000}s 内没起来`);
      console.log(`   ${port} 端口上监听的是：${describePortOwner(port)}`);
      for (const line of serverLog) logLine(target.slug, line);
      return { slug: target.slug, passed: false, seconds: (Date.now() - startedAt) / 1000 };
    }

    console.log(`▶ [${target.slug}] ${target.baseURL} 已就绪`);
    const code = await runPlaywright(target);
    const seconds = (Date.now() - startedAt) / 1000;

    console.log(
      `${code === 0 ? "✓" : "✗"} [${target.slug}] ${code === 0 ? "通过" : `失败（exit ${code}）`}，${seconds.toFixed(1)}s`,
    );

    return { slug: target.slug, passed: code === 0, seconds };
  } finally {
    stopServer(server);
  }
};

/**
 * 滑动窗口调度：同时最多 `concurrency` 个课件在跑，跑完一个立刻补下一个。
 *
 * @param courses 本次要跑的课件（已按 `E2E_COURSE` 过滤）
 * @param concurrency 并发上限
 * @returns 每个课件的结果（完成顺序）
 */
const runPool = async (courses: CourseTarget[], concurrency: number): Promise<CourseResult[]> => {
  const queue = [...courses];
  const results: CourseResult[] = [];

  const worker = async (): Promise<void> => {
    const course = queue.shift();

    if (course == null) return;

    // 单个课件出任何意外都不许带走整轮（真踩过：一个 undici 崩溃让整轮验收白跑）
    try {
      results.push(await runCourse(course));
    } catch (err) {
      console.log(
        `✗ [${course.slug}] 执行中断：${err instanceof Error ? err.message : String(err)}`,
      );
      results.push({ slug: course.slug, passed: false, seconds: 0 });
    }

    await worker();
  };

  await Promise.all(Array.from({ length: Math.min(concurrency, courses.length) }, () => worker()));

  return results;
};

// 打印汇总表
const printSummary = (results: CourseResult[]): void => {
  const failed = results.filter((result) => !result.passed);

  console.log(`\n──────── E2E 汇总（并发 ${CONCURRENCY}）────────`);

  for (const result of [...results].sort((left, right) => left.slug.localeCompare(right.slug)))
    console.log(`${result.passed ? "✓" : "✗"} ${result.slug}  ${result.seconds.toFixed(1)}s`);

  console.log(
    failed.length === 0
      ? `\n全部 ${results.length} 个课件通过`
      : `\n${failed.length} 个课件失败：${failed.map((item) => item.slug).join("、")}`,
  );
};

const courses = listCourses();

if (courses.length === 0) {
  console.log("⚠️  没有匹配的课件（检查 E2E_COURSE）");
} else {
  console.log(
    `E2E：${courses.length} 个课件，并发上限 ${CONCURRENCY}（每个课件跑 ${SPEC_FILES.length} 个门禁 spec）`,
  );

  process.on("SIGINT", () => {
    console.log("\n收到 Ctrl-C，正在收掉 dev server…");
    for (const child of liveChildren) stopServer(child);
    process.exitCode = 130;
  });

  const results = await runPool(courses, CONCURRENCY);

  printSummary(results);
  process.exitCode = results.every((result) => result.passed) ? 0 : 1;
}
