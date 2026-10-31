import { join, resolve } from "node:path";

import { compareByChapter, listCourseDirs, readPackageName } from "../scripts/course-lookup";

/** 一个课件的 E2E 启动目标 */
export interface CourseTarget {
  /** 目录名，同时用作 URL 前缀，例如 capacitor */
  slug: string;
  /** Package.json 中的包名，用于 pnpm --filter 启动 */
  packageName: string;
  /** 课件目录绝对路径 */
  directory: string;
  /** E2E 专用端口（slidev 开启 strictPort，端口被占用会直接启动失败） */
  port: number;
  /** 课件入口地址 */
  baseURL: string;
}

const ROOT_DIR = resolve(import.meta.dirname, "..");
const COURSES_DIR = join(ROOT_DIR, "courses");
/** 与默认的 3030 拉开距离，避免和正在运行的 pnpm dev 抢端口 */
const DEFAULT_FIRST_PORT = 30401;

/**
 * E2E 服务的起始端口，默认 30401。
 *
 * Slidev 开启 `strictPort`，端口被占用会直接启动失败；要在另一个进程里同时跑 E2E，用 `E2E_BASE_PORT=<别的端口>`
 * 把这一批服务整体挪开（未设置时行为与以前完全一致）。
 */
function resolveFirstPort(): number {
  const configured = process.env.E2E_BASE_PORT?.trim();

  if (!configured) return DEFAULT_FIRST_PORT;

  const port = Number(configured);

  if (!Number.isInteger(port) || port <= 0 || port > 65535)
    throw new Error(`E2E_BASE_PORT 必须是 1–65535 的整数，当前是 "${configured}"`);

  return port;
}

const FIRST_PORT = resolveFirstPort();

/** `E2E_COURSE` 里指定的课件 slug（未设置 / 空串时为空数组） */
export function requestedCourseSlugs(): string[] {
  return (process.env.E2E_COURSE ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * 把「全量排序后的课件序号 + slug」变成可启动的目标。
 *
 * 端口按**全量序号**分配（不是本次运行序号）：只跑子集时端口不变，多个进程各跑各的课件也不会抢端口。
 */
function toCourseTarget({ index, slug }: { index: number; slug: string }): CourseTarget {
  const directory = join(COURSES_DIR, slug);
  const packageName = readPackageName(slug);

  if (!packageName) throw new Error(`课件 ${slug} 缺少 package.json，无法启动 E2E 服务`);

  // `E2E_COURSE_PORT`：调度器（`scripts/e2e.ts`）起 server 前会先做端口自动避让（见 `e2e/ports.ts`），
  // 挑好的端口用这个变量告诉 Playwright 这边，保证两边算出的 baseURL 一致。
  const chosen = Number(process.env.E2E_COURSE_PORT ?? "");
  const port = Number.isInteger(chosen) && chosen > 0 ? chosen : FIRST_PORT + index;

  // 用 localhost（而不是 127.0.0.1）：slidev/vite 默认只绑到 localhost 解析出的地址，
  // 在 macOS 上通常只有 IPv6 的 ::1，写 127.0.0.1 会连不上。
  return { slug, packageName, directory, port, baseURL: `http://localhost:${port}/${slug}/` };
}

/**
 * 全部课件（**不受 `E2E_COURSE` 过滤**），按章节号排序，新课件加目录后自动纳入 E2E。
 *
 * 目录发现与排序统一由 `scripts/course-lookup.ts` 提供（`listCourseDirs()` 已过滤掉没有 `slides.md` 的空骨架目录 —— 与 `pnpm
 * build` 的口径一致，否则 E2E 会去启动一个起不来的 server）。
 *
 * **端口按「课件在全部课件里的固定序号」分配**（不是按本次运行的序号）：这样多个 AI 进程各跑各的课件时不会抢端口； 只有**同一个课件**被两个进程同时跑，才需要用
 * `E2E_BASE_PORT` 整体挪开。
 *
 * 选课脚本与「本次检查了多少门 / 共多少门」的口径都用它；启动测试用 `listCourses()`。
 */
export function listAllCourses(): CourseTarget[] {
  return listCourseDirs()
    .sort(compareByChapter)
    .map((slug, index) => toCourseTarget({ index, slug }));
}

/**
 * 本次要跑的课件（受 `E2E_COURSE` 过滤）。
 *
 * 可用 `E2E_COURSE=1.3-velocity,1.x-vectors` 只跑指定课件（写目录名）。 `E2E_COURSE` 未设置 = 全量；设置了解析后为空 / 含不存在的
 * slug 时由 `scripts/e2e.ts` 报错， 不会静默跑 0 门（那会让 CI 假绿）。
 */
export function listCourses(): CourseTarget[] {
  const filter = requestedCourseSlugs();
  const courses = listAllCourses();

  return filter.length > 0 ? courses.filter((course) => filter.includes(course.slug)) : courses;
}
