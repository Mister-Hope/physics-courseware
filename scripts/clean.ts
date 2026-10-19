import { existsSync, readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";

/**
 * `pnpm clean` —— 清掉所有可再生的大体积产物：构建输出 `dist/` 与端到端检查的缓存。
 *
 * ```bash
 * pnpm clean              → 删掉下面所有目标
 * pnpm run clean --dry-run → 只列出会删什么（含体积），不动文件
 * ```
 *
 * ⚠️ 必须带 `run`：`clean` 是 pnpm 12 的内置命令，`pnpm clean --dry-run` 会被 pnpm 自己的参数解析器拒掉 （`error:
 * unexpected argument '--dry-run' found`），加 `run` 才会把参数转给本脚本。
 *
 * **只删这些**（都在 `.gitignore` 里，删掉后重新 `pnpm build` / `pnpm test:e2e` 就会再生成）：
 *
 * - 根 `dist/`、各课件 `dist/`、`workspace/<包>/dist/`
 * - `.e2e/`（Playwright 的 `test-results` / `html-report`；按操作 + 课件分家，见 `e2e/artifacts.ts`）
 * - `courses/<slug>/.temp/`（版面报告、截图、对比图）
 * - `courses/<slug>/test-results/`、根 `test-results/`、`playwright-report/`、`blob-report/`
 *
 * ⛔ **绝不碰**：`node_modules/`、源码、`content/`、`resources/`；也不删用户级缓存（`~/Library/Caches/ms-playwright`
 * 等）。
 */
const ROOT = path.resolve(import.meta.dirname, "..");
const COURSES_DIR = path.join(ROOT, "courses");
const WORKSPACE_DIR = path.join(ROOT, "workspace");

const dryRun = process.argv.includes("--dry-run");

/**
 * 目录体积（递归求和，用于告诉用户省了多少）
 *
 * @param target 目标目录
 * @returns 目录总字节数（读不到的条目按 0 计）
 */
const directorySize = (target: string): number => {
  let total = 0;

  for (const entry of readdirSync(target, { withFileTypes: true })) {
    const child = path.join(target, entry.name);

    try {
      total += entry.isDirectory() ? directorySize(child) : statSync(child).size;
    } catch {
      // 权限/竞态导致的读取失败不该中断清理
    }
  }

  return total;
};

/**
 * 待清理目标：根级 + 各课件级
 *
 * @returns 当前真实存在的待清理目录列表
 */
const collectTargets = (): string[] => {
  const targets = [
    path.join(ROOT, "dist"),
    path.join(ROOT, ".e2e"),
    path.join(ROOT, "test-results"),
    path.join(ROOT, "playwright-report"),
    path.join(ROOT, "blob-report"),
  ];

  for (const [base, extra] of [
    [COURSES_DIR, [".temp", "test-results", "dist"]],
    [WORKSPACE_DIR, ["dist"]],
  ] as const) {
    if (!existsSync(base)) continue;

    for (const entry of readdirSync(base, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;

      for (const name of extra) targets.push(path.join(base, entry.name, name));
    }
  }

  return targets.filter((target) => existsSync(target));
};

const formatSize = (bytes: number): string =>
  bytes > 1024 * 1024 * 1024
    ? `${(bytes / 1024 ** 3).toFixed(2)} GB`
    : bytes > 1024 * 1024
      ? `${(bytes / 1024 ** 2).toFixed(1)} MB`
      : `${(bytes / 1024).toFixed(0)} KB`;

const targets = collectTargets();

if (targets.length === 0) {
  console.log("✅ 没有需要清理的产物（dist 与 e2e 缓存都不存在）");
} else {
  let total = 0;

  for (const target of targets) {
    const size = directorySize(target);
    total += size;
    console.log(
      `${dryRun ? "（dry-run）会删" : "删除"} ${path.relative(ROOT, target)} —— ${formatSize(size)}`,
    );

    if (!dryRun) rmSync(target, { recursive: true, force: true });
  }

  console.log(`\n${dryRun ? "共可清理" : "已清理"} ${targets.length} 处，${formatSize(total)}`);
  if (dryRun) console.log("（去掉 --dry-run 才会真的删）");
}
