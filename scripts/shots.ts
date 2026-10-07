import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import { shotsDir } from "../e2e/artifacts";
import { listCourses, resolveCourseId } from "./course-lookup";

/**
 * `pnpm shots` —— 批量给课件截页图（agent 自查页面用）
 *
 * ```bash
 * pnpm shots                             → 列出课件与用法
 * pnpm shots 1.x-vectors 15 18-20        → 截 15、18、19、20 页（未点击状态）
 * pnpm shots 1.x-vectors 15 --clicks=all → 同时截"未点击"和"全部展开"
 * pnpm shots 1.x-vectors 4 --clicks=each → 每一步点击都截一张
 *
 * <课件> 支持模糊匹配：完整目录名 / 英文名 / 章节号（如 1.3）/ 唯一子串。
 * ```
 *
 * 图落在**课件自己的** `courses/<课件>/.temp/shots/`（多个 AI 进程同时开发不同课件时互不打架； 目录规则见
 * `e2e/artifacts.ts`），控制台会打印每张图的绝对路径（可直接交给 read_image 看）。
 */
const ROOT = path.resolve(import.meta.dirname, "..");

const args = process.argv.slice(2);
const slugs = listCourses().map((course) => course.slug);

const printUsage = (): void => {
  console.log(`用法：
  pnpm shots <课件> [页号...] [--clicks=0|all|each|<数字>]

  <页号> 支持 15、15-17、15 18-20 三种写法；不写页号 = 全部页
  --clicks 默认 0（只看未点击状态）；all = 0 + 全部展开；each = 每一步都截

课件：${slugs.join(", ")}`);
};

const main = (): void => {
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    printUsage();
    return;
  }

  const [id = ""] = args;
  const matches = resolveCourseId(id);

  if (matches.length !== 1) {
    console.error(
      matches.length === 0
        ? `✗ 找不到课件「${id ?? ""}」，可选：${slugs.join(", ")}`
        : `✗ 「${id}」匹配到多个课件，请写更具体的标识：${matches.map((course) => course.slug).join("、")}`,
    );
    process.exitCode = 1;
    return;
  }

  const course = matches[0].slug;

  const clicks = args.find((arg) => arg.startsWith("--clicks="))?.slice("--clicks=".length) ?? "0";
  const pages = args.slice(1).filter((arg) => !arg.startsWith("-"));
  // 与截图 spec 用同一套规则算目录（这里显式把课件传进去，不依赖父进程的 E2E_COURSE）
  const shotsDirectory = shotsDir([course]);

  console.log(
    `📸 截图：${course} ${pages.length > 0 ? `第 ${pages.join("、")} 页` : "全部页"}（clicks=${clicks}）`,
  );

  execFileSync("pnpm", ["exec", "playwright", "test", "e2e/shots.spec.ts", "--reporter=line"], {
    cwd: ROOT,
    env: {
      ...process.env,
      E2E_COURSE: course,
      E2E_SHOT_PAGES: pages.join(","),
      E2E_SHOT_CLICKS: clicks,
    },
    stdio: "inherit",
  });

  if (existsSync(shotsDirectory)) {
    const files = readdirSync(shotsDirectory)
      .filter((name) => name.endsWith(".png"))
      .sort()
      .map((name) => path.join(shotsDirectory, name));

    console.log(`\n共 ${files.length} 张（按修改时间新→旧）：`);

    for (const file of files.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs).slice(0, 12))
      console.log(`  ${file}`);
  }
};

main();
