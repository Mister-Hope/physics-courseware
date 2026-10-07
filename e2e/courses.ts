import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

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

function readPackageName(directory: string): string | undefined {
  const manifestPath = join(directory, "package.json");

  if (!existsSync(manifestPath)) return undefined;

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as { name?: string };

  return manifest.name;
}

/**
 * 发现 `courses/` 下的全部课件，新课件加目录后自动纳入 E2E。
 *
 * 可用 `E2E_COURSE=1.3-velocity,1.x-vectors` 只跑指定课件（写目录名）。
 *
 * **端口按「课件在全部课件里的固定序号」分配**（不是按本次运行的序号）：这样多个 AI 进程各跑各的课件时不会抢端口； 只有**同一个课件**被两个进程同时跑，才需要用
 * `E2E_BASE_PORT` 整体挪开。序号按章节号数值排序（10.4 排在 2.1 之后）。
 */

/** 章节号排序键：按数值逐段比较（字符串排序会让 10.4 排在 2.1 前面）；`x` 段排在同章数字段之后 */
const chapterRank = (slug: string): number[] =>
  (
    /^(?:o\d+-)?(?<chapter>\d+(?:\.[\dx]+)*(?:-\d+(?:\.[\dx]+)*)*)/u.exec(slug)?.groups?.chapter ??
    ""
  )
    .split(/[.-]/u)
    .map((part) => (part === "x" ? Number.MAX_SAFE_INTEGER : Number(part)));

const compareByChapter = (left: string, right: string): number => {
  const leftRank = chapterRank(left);
  const rightRank = chapterRank(right);

  for (let index = 0; index < Math.max(leftRank.length, rightRank.length); index += 1) {
    const diff = (leftRank[index] ?? -1) - (rightRank[index] ?? -1);

    if (diff !== 0) return diff;
  }

  return left.localeCompare(right);
};
export function listCourses(): CourseTarget[] {
  const filter = process.env.E2E_COURSE?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return readdirSync(COURSES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort(compareByChapter)
    .map((slug, index) => ({ index, slug }))
    .filter(({ slug }) => (filter?.length ? filter.includes(slug) : true))
    .map(({ index, slug }) => {
      const directory = join(COURSES_DIR, slug);
      const packageName = readPackageName(directory);

      if (!packageName) throw new Error(`课件 ${slug} 缺少 package.json，无法启动 E2E 服务`);

      const port = FIRST_PORT + index;

      // 用 localhost（而不是 127.0.0.1）：slidev/vite 默认只绑到 localhost 解析出的地址，
      // 在 macOS 上通常只有 IPv6 的 ::1，写 127.0.0.1 会连不上。
      return { slug, packageName, directory, port, baseURL: `http://localhost:${port}/${slug}/` };
    });
}
