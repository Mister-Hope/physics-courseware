import { join, resolve } from "node:path";

const REPO_ROOT = resolve(import.meta.dirname, "..");
const COURSES_DIR = join(REPO_ROOT, "courses");

/**
 * 一次「操作」＝一类端到端任务（版面检查 / 截图 / 对比图 / 单页排查）。
 *
 * 产物目录**按操作自动派生**，各操作只清自己的目录 ⇒ 先后跑不会互相删文件 （`pnpm shots` 拍完再跑 `pnpm test:e2e`，截图不会被清掉）。
 */
export type E2EOperation = "layout" | "shots" | "compare" | "pages";

/** 操作 → 产物子目录名（沿用既有名字，老报告路径不变） */
const OPERATION_DIR: Record<E2EOperation, string> = {
  layout: "layout-overflow",
  shots: "shots",
  compare: "compare",
  pages: "pages",
};

/**
 * 当前操作：由脚本写 `E2E_OPERATION`（`scripts/shots.ts`、`scripts/compare-shots.ts`、`scripts/e2e.ts`）；
 * 没写就按版面检查算。**不要手工传**——传错会写到别的操作的目录里。
 */
export const currentOperation = (): E2EOperation => {
  const raw = (process.env.E2E_OPERATION ?? "").trim() as E2EOperation;

  return raw in OPERATION_DIR ? raw : "layout";
};

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
 * 本次「操作 × 课件范围」的产物根目录。
 *
 * - 只跑一个课件 → `courses/<slug>/.temp/<操作>/`（按课件隔离，已被 gitignore 忽略）；
 * - 一次跑多个课件 → `e2e/reports/<操作>/`（同一进程在写，不会再分家）；
 * - `E2E_ARTIFACT_DIR=<路径>` 可显式覆盖（同一个课件被两个进程同时跑时用它岔开；**平时不用写**）。
 *
 * @param scopes 课件 slug；默认取 `E2E_COURSE`
 * @param operation 操作类型；默认取 `E2E_OPERATION`
 * @returns 产物根目录绝对路径
 */
export function artifactRoot(
  scopes: string[] = selectedSlugs(),
  operation = currentOperation(),
): string {
  const override = (process.env.E2E_ARTIFACT_DIR ?? "").trim();

  if (override) return resolve(REPO_ROOT, override);

  return scopes.length === 1
    ? join(COURSES_DIR, scopes[0], ".temp", OPERATION_DIR[operation])
    : join(REPO_ROOT, "e2e", "reports", OPERATION_DIR[operation]);
}

/**
 * `pnpm shots` 的截图目录（`e2e/shots.spec.ts` 与 `scripts/shots.ts` 共用，保证两边算法一致）。
 *
 * @param scopes 课件 slug；默认取 `E2E_COURSE`
 * @returns 截图目录绝对路径
 */
export function shotsDir(scopes?: string[]): string {
  return artifactRoot(scopes, "shots");
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
  return artifactRoot(scopes, "layout");
}

/**
 * 单页排查（`e2e/zzz-pages.spec.ts` + `pnpm compare:shots`）的导出目录。
 *
 * @param scopes 课件 slug；默认取 `E2E_COURSE`
 * @returns 目录绝对路径
 */
export function pagesDir(scopes?: string[]): string {
  return artifactRoot(scopes, "pages");
}

/**
 * Playwright 自己的中间产物目录（每次运行会被清空，所以按「操作 + 范围」双重隔离）。
 *
 * - 按操作分：截图与版面检查各跑各的，不会互相清 `test-results` / `html-report`；
 * - 按范围分：只跑一个课件时用课件名，全量运行时按 `E2E_BASE_PORT` 分（并跑两套全量必须换端口）。
 *
 * @param operation 操作类型；默认取 `E2E_OPERATION`
 * @returns `.e2e/<操作>/<本次运行>/` 绝对路径
 */
export function playwrightRunDir(operation = currentOperation()): string {
  const slugs = selectedSlugs();
  const scope = slugs.length > 0 ? slugs.join("+") : `all-${process.env.E2E_BASE_PORT ?? "30401"}`;

  return join(REPO_ROOT, ".e2e", operation, scope);
}
