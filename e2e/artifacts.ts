import { join, resolve } from "node:path";

const REPO_ROOT = resolve(import.meta.dirname, "..");
const COURSES_DIR = join(REPO_ROOT, "courses");

/**
 * 本次运行涉及的课件（`E2E_COURSE=1.x-vectors` 或 `E2E_COURSE=1.3-velocity,1.4-acceleration`）。
 *
 * @returns 课件 slug 列表；没有指定就是空数组（= 全量运行）
 */
export function selectedSlugs(): string[] {
  return (process.env.E2E_COURSE ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * 本次运行的产物根目录。
 *
 * **为什么要按课件分家**：多个 AI 进程会同时开发不同课件，而版面检查开跑前会 `rmSync` 整个产物目录——产物写在一起＝直接删掉另一个进程的报告和截图。所以：
 *
 * - 只跑一个课件（`pnpm shots`、`E2E_COURSE=<slug>` 的 e2e 都是这种）→ 写进**课件自己的** `courses/<slug>/.temp/`，
 *   天然按课件隔离，且已被 gitignore 忽略；
 * - 一次跑多个课件 → 退回 `e2e/reports/`（同一进程在写，不会再分家）；
 * - `E2E_ARTIFACT_DIR=<路径>` 可显式指定：同一个课件被两个进程同时跑时用它岔开。
 *
 * @param scopes 课件 slug；默认取 `E2E_COURSE`
 * @returns 产物根目录绝对路径
 */
export function artifactRoot(scopes: string[] = selectedSlugs()): string {
  const override = (process.env.E2E_ARTIFACT_DIR ?? "").trim();

  if (override) return resolve(REPO_ROOT, override);

  return scopes.length === 1
    ? join(COURSES_DIR, scopes[0], ".temp")
    : join(REPO_ROOT, "e2e", "reports");
}

/**
 * `pnpm shots` 的截图目录（`e2e/shots.spec.ts` 与 `scripts/shots.ts` 共用，保证两边算法一致）。
 *
 * @param scopes 课件 slug；默认取 `E2E_COURSE`
 * @returns 截图目录绝对路径
 */
export function shotsDir(scopes?: string[]): string {
  return join(artifactRoot(scopes), "shots");
}

/**
 * 版面检查（layout-overflow）的报告目录：报告 + 红框截图都在这里。
 *
 * 与 `shots/` 分开是有意的：版面检查会清空自己的目录，不能顺手删掉截图助手刚拍的图。
 *
 * @param scopes 课件 slug；默认取 `E2E_COURSE`
 * @returns 报告目录绝对路径
 */
export function layoutReportDir(scopes?: string[]): string {
  return join(artifactRoot(scopes), "layout-overflow");
}

/**
 * Playwright 自己的中间产物目录（每次运行会被清空，所以同样要按运行隔离）。
 *
 * 按课件分组；全量运行时按 `E2E_BASE_PORT` 分组（并跑两套全量必须换端口，这里保持一致）。
 *
 * @returns `.e2e/<本次运行>/` 绝对路径
 */
export function playwrightRunDir(): string {
  const slugs = selectedSlugs();
  const scope = slugs.length > 0 ? slugs.join("+") : `all-${process.env.E2E_BASE_PORT ?? "30401"}`;

  return join(REPO_ROOT, ".e2e", scope);
}
