// `pnpm dev` —— 交互式选择要启动的目标（入口网站 / 某个课件）。
//
// 用法：
//   pnpm dev                交互选择（首项是入口网站，其后按分册分组列课件）
//   pnpm dev --list         只打印列表后退出（给 AI 与脚本用）
//   pnpm dev <标识>         跳过提问直接启动：目录名 / 英文名 / 章节号 / 唯一子串
//
// 课件清单与排序以 workspace/homepage/src/courses.config.ts 为准，未登记的目录补在最后（按章节号数值排序）。

import { execFileSync } from "node:child_process";
import path from "node:path";

import { Separator, select } from "@inquirer/prompts";

import { listUnregistered, readCourseGroups, resolveCourseId } from "./course-lookup";
import type { CourseInfo } from "./course-lookup";

const ROOT_DIR = path.resolve(import.meta.dirname, "..");
const HOMEPAGE_NAME = "🌐 入口网站（localhost:3030）";

interface HomepageTarget {
  kind: "homepage";
}

interface CourseTarget {
  kind: "course";
  course: CourseInfo;
}

type Target = HomepageTarget | CourseTarget;

const HOMEPAGE: HomepageTarget = { kind: "homepage" };

const courseLabel = (course: CourseInfo): string =>
  course.title ? `${course.chapter ?? ""} ${course.title}（${course.slug}）`.trim() : course.slug;

const printList = (): void => {
  console.log("📚 可选目标：");
  console.log(`   ${HOMEPAGE_NAME}`);

  for (const group of readCourseGroups()) {
    if (group.courses.length === 0) continue;

    console.log(`   ── ${group.name}（${group.shortName}）──`);

    for (const course of group.courses) console.log(`      ${courseLabel(course)}`);
  }

  const unregistered = listUnregistered();

  if (unregistered.length > 0) {
    console.log("   ── 未登记 ──");

    for (const course of unregistered) console.log(`      ${courseLabel(course)}`);
  }

  console.log(`
用法：
  pnpm dev            交互选择
  pnpm dev <标识>     直接启动（目录名 / 英文名 / 章节号 / 唯一子串，如 1.3-velocity、velocity、1.3）
  pnpm dev --list     只看列表`);
};

const start = (target: Target): void => {
  if (target.kind === "homepage") {
    console.log("▶ 启动入口网站（localhost:3030）");
    execFileSync("pnpm", ["--filter", "physics-courseware-homepage", "dev"], {
      cwd: ROOT_DIR,
      stdio: "inherit",
    });
    return;
  }

  const { course } = target;

  if (!course.packageName) {
    console.error(`✗ 课件 ${course.slug} 缺少 package.json，无法启动`);
    process.exitCode = 1;
    return;
  }

  console.log(`▶ 启动课件 ${course.slug}（${course.packageName}）`);
  execFileSync("pnpm", ["--filter", course.packageName, "dev"], {
    cwd: ROOT_DIR,
    stdio: "inherit",
  });
};

const printMatchError = (id: string, matches: CourseInfo[]): void => {
  if (matches.length === 0) {
    console.error(`✗ 找不到课件「${id}」，候选：`);
    printList();
    return;
  }

  console.error(`✗ 「${id}」匹配到多个课件，请写更具体的标识：`);

  for (const course of matches) console.error(`   ${courseLabel(course)}`);
};

const resolveTarget = (id: string): Target | null => {
  if (["home", "homepage", "入口", "首页", "网站"].includes(id.toLowerCase())) return HOMEPAGE;

  const matches = resolveCourseId(id);

  if (matches.length === 1) return { kind: "course", course: matches[0] };

  printMatchError(id, matches);
  process.exitCode = 1;

  return null;
};

const chooseFromList = async (): Promise<Target> => {
  const choices: (Separator | { name: string; value: Target })[] = [
    { name: HOMEPAGE_NAME, value: HOMEPAGE },
  ];

  for (const group of readCourseGroups()) {
    if (group.courses.length === 0) continue;

    choices.push(new Separator(`── ${group.name} ──`));

    for (const course of group.courses)
      choices.push({ name: courseLabel(course), value: { kind: "course", course } });
  }

  const unregistered = listUnregistered();

  if (unregistered.length > 0) {
    choices.push(new Separator("── 未登记 ──"));

    for (const course of unregistered)
      choices.push({ name: courseLabel(course), value: { kind: "course", course } });
  }

  return select<Target>({
    message: "选择要启动的目标",
    choices,
    pageSize: 20,
    loop: false,
  });
};

const main = async (): Promise<void> => {
  const args = process.argv.slice(2);

  if (args.includes("--list") || args.includes("--help") || args.includes("-h")) {
    printList();
    return;
  }

  if (args.length > 1) {
    console.error(`✗ 只接受一个课件标识（收到 ${args.length} 个）：${args.join(" ")}`);
    process.exitCode = 1;
    return;
  }

  const target = args.length === 0 ? await chooseFromList() : resolveTarget(args[0]);

  if (target) start(target);
};

await main();
