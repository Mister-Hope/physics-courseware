// 校验课件注册表 `courses.json`（仓库根目录的**唯一数据源**，字段说明见 `courses.schema.json`）。
//
// 用法：pnpm check:courses
//
// 检查项（手写校验，不引入任何依赖）：
// 1) JSON 能解析；根结构、`$schema` 指向、键集都符合约定；
// 2) 必填字段齐全、类型正确（分册 4 项 / 课件 5 项，出现未知键也算错）；
// 3) 课件 slug 全局唯一、分册 slug 不重复、slug 形状合法；
// 4) 每门课的 slug 在 courses/ 下确实存在同名目录。
//
// 失败时逐条打印可读错误（带 JSON 路径）并以非 0 退出；描述超长只警告，不算失败。

import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

// 仓库根目录（本文件在 scripts/ 下）
const ROOT_DIR = path.resolve(import.meta.dirname, "..");
const REGISTRY_PATH = path.join(ROOT_DIR, "courses.json");
const SCHEMA_PATH = path.join(ROOT_DIR, "courses.schema.json");
const COURSES_DIR = path.join(ROOT_DIR, "courses");

const REGISTRY_NAME = "courses.json";
// 注册表首行的 `$schema`：编辑器据此自动补全 / 校验
const SCHEMA_REF = "./courses.schema.json";
const ROOT_KEYS = ["$schema", "textbooks"];
const TEXTBOOK_KEYS = ["name", "shortName", "slug", "courses"];
const COURSE_KEYS = ["slug", "title", "chapter", "description", "tags"];
// 分册 slug：与 courses.schema.json 的 enum 保持一致（新增分册要两边一起改）
const TEXTBOOK_SLUGS = ["bx1", "bx2", "bx3", "xx1", "xx2", "xx3"];
// 课件 slug 的形状：章节前缀 + 英文名（3.5-force-equilibrium / 1.x-vectors / o2-1.2-lorentz-force）
const SLUG_PATTERN = /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/u;
// 描述的建议长度：现有少量历史条目更长，故只警告不报错
const MAX_DESCRIPTION_LENGTH = 80;

const errors: string[] = [];
const warnings: string[] = [];

// 值的可读描述（报错用）
const describe = (value: unknown): string => {
  if (Array.isArray(value)) return "数组";
  if (value == null) return "null";
  if (typeof value === "object") return "对象";

  return typeof value === "string" ? `字符串 ${JSON.stringify(value)}` : typeof value;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value != null && !Array.isArray(value);

// 校验非空字符串字段；类型谓词，调用处可直接当 string 用
const checkString = (value: unknown, where: string): value is string => {
  if (typeof value !== "string") {
    errors.push(`${where} 必须是字符串，实际是 ${describe(value)}`);

    return false;
  }

  if (value.trim() === "") {
    errors.push(`${where} 不能是空字符串`);

    return false;
  }

  return true;
};

// 校验必填键齐全、没有多余键（对应 schema 的 required / additionalProperties: false）
const checkKeys = (value: Record<string, unknown>, keys: string[], where: string): void => {
  const missing = keys.filter((key) => !(key in value));
  const extra = Object.keys(value).filter((key) => !keys.includes(key));

  for (const key of missing) errors.push(`${where} 缺少必填字段 "${key}"`);

  for (const key of extra) errors.push(`${where} 出现未知字段 "${key}"`);
};

// 记下 slug 第一次出现的位置；重复时把两处都报出来（课件 slug 全局唯一、分册 slug 也不能重复）
const recordSlug = (
  seen: Map<string, string>,
  slug: string,
  where: string,
  label: string,
): void => {
  const previous = seen.get(slug);

  if (previous == null) seen.set(slug, where);
  else errors.push(`${where}.slug "${slug}" 与 ${previous}.slug 重复（${label}）`);
};

// 校验一门课的登记项
const checkCourse = (course: unknown, where: string, seenSlugs: Map<string, string>): void => {
  if (!isRecord(course)) {
    errors.push(`${where} 必须是对象，实际是 ${describe(course)}`);

    return;
  }

  checkKeys(course, COURSE_KEYS, where);

  const { slug, description, tags } = course;

  checkString(course.title, `${where}.title`);
  checkString(course.chapter, `${where}.chapter`);

  if (checkString(description, `${where}.description`)) {
    const { length } = description;

    if (length > MAX_DESCRIPTION_LENGTH) {
      warnings.push(
        `${where}.description 有 ${length} 字，超过建议的 ${MAX_DESCRIPTION_LENGTH} 字（首页卡片会截断）`,
      );
    }
  }

  if (Array.isArray(tags)) {
    const seenTags = new Set<string>();

    tags.forEach((tag: unknown, index) => {
      if (!checkString(tag, `${where}.tags[${index}]`)) return;

      if (seenTags.has(tag)) errors.push(`${where}.tags[${index}] 重复出现 "${tag}"`);

      seenTags.add(tag);
    });
  } else {
    errors.push(`${where}.tags 必须是字符串数组，实际是 ${describe(tags)}`);
  }

  if (checkString(slug, `${where}.slug`)) {
    if (!SLUG_PATTERN.test(slug)) {
      errors.push(
        `${where}.slug "${slug}" 形状不合法：应为「章节前缀-英文名」（如 3.5-force-equilibrium）`,
      );
    }

    recordSlug(seenSlugs, slug, where, "slug 必须全局唯一");

    const courseDir = path.join(COURSES_DIR, slug);

    if (!existsSync(courseDir) || !statSync(courseDir).isDirectory()) {
      errors.push(
        `${where}.slug "${slug}" 在 courses/ 下找不到同名目录（${path.relative(ROOT_DIR, courseDir)}）`,
      );
    }
  }
};

// 校验一个分册，返回它登记了几门课件
const checkTextbook = (
  textbook: unknown,
  where: string,
  seenTextbookSlugs: Map<string, string>,
  seenCourseSlugs: Map<string, string>,
): number => {
  if (!isRecord(textbook)) {
    errors.push(`${where} 必须是对象，实际是 ${describe(textbook)}`);

    return 0;
  }

  checkKeys(textbook, TEXTBOOK_KEYS, where);

  const { slug, courses } = textbook;

  checkString(textbook.name, `${where}.name`);
  checkString(textbook.shortName, `${where}.shortName`);

  if (checkString(slug, `${where}.slug`)) {
    if (!TEXTBOOK_SLUGS.includes(slug)) {
      errors.push(
        `${where}.slug "${slug}" 不是合法分册 slug（可选：${TEXTBOOK_SLUGS.join(" / ")}）`,
      );
    }

    recordSlug(seenTextbookSlugs, slug, where, "分册 slug 不能重复");
  }

  if (Array.isArray(courses)) {
    courses.forEach((course, index) => {
      checkCourse(course, `${where}.courses[${index}]`, seenCourseSlugs);
    });

    return courses.length;
  }

  errors.push(`${where}.courses 必须是数组（该分册暂无课件时写 []），实际是 ${describe(courses)}`);

  return 0;
};

// 统计分册 / 课件数并输出结论：有错逐条列出并以非 0 退出，只有警告时打印警告后算通过
const report = (textbooks: unknown): void => {
  let groupCount = 0;
  let courseCount = 0;

  if (Array.isArray(textbooks)) {
    const seenTextbookSlugs = new Map<string, string>();
    const seenCourseSlugs = new Map<string, string>();

    groupCount = textbooks.length;

    textbooks.forEach((textbook, index) => {
      const where = `${REGISTRY_NAME}.textbooks[${index}]`;

      courseCount += checkTextbook(textbook, where, seenTextbookSlugs, seenCourseSlugs);
    });
  } else {
    errors.push(`${REGISTRY_NAME}.textbooks 必须是数组，实际是 ${describe(textbooks)}`);
  }

  if (errors.length > 0) {
    console.error(`❌ ${REGISTRY_NAME} 校验失败：${errors.length} 处问题\n`);

    for (const error of errors) console.error(`   • ${error}`);

    console.error(
      `\n字段含义与取值范围见 courses.schema.json；也可用编辑器打开 ${REGISTRY_NAME} 看实时校验。`,
    );
    process.exitCode = 1;

    return;
  }

  for (const warning of warnings) console.warn(`⚠️  ${warning}`);

  console.log(
    `✅ ${REGISTRY_NAME} 校验通过：${groupCount} 个分册 / ${courseCount} 门课件（字段齐全、slug 唯一且都有同名目录）`,
  );
};

const main = (): void => {
  if (!existsSync(SCHEMA_PATH))
    errors.push(`找不到 ${SCHEMA_REF}（与 ${REGISTRY_NAME} 同目录，编辑器靠它补全）`);

  let data: unknown;

  try {
    data = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
  } catch (err) {
    console.error(
      `❌ ${REGISTRY_NAME} 解析失败：${err instanceof Error ? err.message : String(err)}`,
    );
    process.exitCode = 1;

    return;
  }

  if (!isRecord(data)) {
    console.error(`❌ ${REGISTRY_NAME} 根节点必须是对象，实际是 ${describe(data)}`);
    process.exitCode = 1;

    return;
  }

  checkKeys(data, ROOT_KEYS, REGISTRY_NAME);

  const { $schema, textbooks } = data;

  if ($schema !== SCHEMA_REF) {
    errors.push(
      `${REGISTRY_NAME}.$schema 应写成 ${JSON.stringify(SCHEMA_REF)}，实际是 ${describe($schema)}`,
    );
  }

  report(textbooks);
};

main();
