// 一键创建新课件骨架：生成 slides.md / README.md / 顶底栏 / 思路模板，并登记进首页配置（课件清单的唯一来源）。
//
// 用法：pnpm create:course --name force-equilibrium --chapter-name "共点力的平衡" --chapter "3.5" --textbook bx1
// 详见 `pnpm create:course --help`。

import {
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

import {
  renderGlobalBottom,
  renderGlobalTop,
  renderIdeaDoc,
  renderPackageJson,
  renderReadme,
  renderSlides,
  renderStyle,
} from "./course-templates";
import type { CourseTemplateContext } from "./course-templates";

const ROOT_DIR = path.resolve(import.meta.dirname, "..");
const COURSES_DIR = path.join(ROOT_DIR, "courses");
const SHARED_ADDON_DIR = path.join(ROOT_DIR, "workspace/shared");
const CONFIG_PATH = path.join(ROOT_DIR, "workspace/homepage/courses.config.ts");
// 按需目录：先建空目录，用到才往里放文件
const OPTIONAL_DIRS = ["components", "images"];
// --name 只给英文名：包名 = `<name>-courseware`，限制成 kebab-case（不允许结尾或连续连字符）
const NAME_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/u;
// 目录名 = 章节前缀 + 英文名：允许数字开头、含点（3.5-force-equilibrium / 1.x-vectors / o1-1.3-refraction）
const DIR_PATTERN = /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/u;

const USAGE = `用法：
  pnpm create:course --name <英文名> --chapter-name "<中文课题名>" [选项]

必填：
  --name <英文名>          英文名（kebab-case）：决定包名 <英文名>-courseware，如 capacitor
  --chapter-name <中文名>  课题名，如 "电容器的电容"

选填：
  --chapter <章节号>       如 "3.5"：封面显示「§ 3.5」，并作为首页卡片的章节号，
                           同时决定目录名的章节前缀（跨节写 "2.2·2.3"，非教材小节写 "2.x"）
  --chapter-label <章节名> 顶栏封面显示的章节名，如 "第三章 相互作用——力"（默认用 --chapter）
  --textbook <分册>        分册（名称/简称/slug，如 "必修第一册"、"必修1"、"bx1"）；
                           提供后自动登记 workspace/homepage/courses.config.ts（课件清单）
  --folder <路径>          生成位置，默认 courses/<章节前缀>-<英文名>
  --no-register            不修改 courses.config.ts
  --force                  覆盖已存在的骨架文件（仅限 courses/ 下的目录，会列出被覆盖的文件）
  --dry-run                只打印将要生成/修改的文件清单，不落盘
  -h, --help               显示本帮助

目录名 = 章节前缀 + 英文名（同时是 URL 前缀与首页 slug）：
  必修（bx1/bx2/bx3）    <章>.<节>-<英文名>，如 3.5-force-equilibrium；跨节 2.2-2.3-…；非教材小节 1.x-…
  选择性必修（xx1/2/3）  o<册号>-<章>.<节>-<英文名>，如 o1-1.3-refraction

示例：
  pnpm create:course --name force-equilibrium --chapter-name "共点力的平衡" \\
    --chapter "3.5" --chapter-label "第三章 相互作用——力" --textbook bx1
`;

interface CourseOptions {
  /** 英文名（kebab-case）：包名 = `<name>-courseware` */
  name: string;
  /** 目录名（章节前缀 + 英文名）：URL 前缀与首页 slug */
  dirName: string;
  chapterName: string;
  /** 封面章节号（缺省时是显眼的占位符） */
  chapter: string;
  /** 顶栏封面显示的章节名 */
  chapterLabel: string;
  /** 目标目录（绝对路径） */
  folder: string;
  /** 分册查询串；空字符串表示不自动登记 */
  textbookQuery: string;
  force: boolean;
  register: boolean;
  dryRun: boolean;
}

interface TextbookGroup {
  name: string;
  shortName: string;
  slug: string;
}

interface PlannedFile {
  path: string;
  content: string;
}

/** 对共享文件的一处待写入改动 */
interface FileUpdate {
  label: string;
  path: string;
  content: string;
}

// 预期内的用户错误：只打印一行提示，不打堆栈
class CliError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CliError";
  }
}

const fail = (message: string): never => {
  throw new CliError(message);
};

// 解析命令行；出错直接抛出（单独抽出来是为了让 TS 明确返回值一定存在）
const parseArgsOrFail = (): Record<string, unknown> => {
  try {
    return parseArgs({
      options: {
        name: { type: "string" },
        "chapter-name": { type: "string" },
        folder: { type: "string" },
        chapter: { type: "string" },
        "chapter-label": { type: "string" },
        textbook: { type: "string" },
        "no-register": { type: "boolean", default: false },
        force: { type: "boolean", default: false },
        "dry-run": { type: "boolean", default: false },
        help: { type: "boolean", short: "h", default: false },
      },
    }).values;
  } catch (err) {
    return fail(`参数解析失败：${err instanceof Error ? err.message : String(err)}`);
  }
};

// 把已存在的祖先目录走一遍 realpath：macOS 的 /tmp → /private/tmp 这类符号链接
// 会让 addon 相对路径在运行时被解析到别处
const canonicalizeFolder = (target: string): string => {
  const tail: string[] = [];
  let current = target;

  while (!existsSync(current)) {
    const parent = path.dirname(current);

    if (parent === current) return target;

    tail.unshift(path.basename(current));
    current = parent;
  }

  try {
    return path.join(realpathSync(current), ...tail);
  } catch {
    return target;
  }
};

// 目录在 courses/ 下（含子目录）
const isInsideCourses = (folder: string): boolean => {
  const relativePath = path.relative(COURSES_DIR, folder);

  return relativePath !== "" && !relativePath.startsWith("..") && !path.isAbsolute(relativePath);
};

// 正好是 courses/<slug> 这一层：只有它会成为 pnpm workspace 成员（pnpm-workspace.yaml 只匹配 courses/*）
const isWorkspaceCourse = (folder: string): boolean => path.dirname(folder) === COURSES_DIR;

const readString = (values: Record<string, unknown>, key: string): string => {
  const value = values[key];

  return typeof value === "string" ? value.trim() : "";
};

// `--chapter` 只保留「章.节」结构：`·` / `/` / 全角点统一换成连字符（跨节 "2.2·2.3" → "2.2-2.3"）
const normalizeChapter = (chapter: string): string =>
  chapter
    .trim()
    .replace(/^§\s*/u, "")
    .replaceAll(/[·・/／．]/gu, "-")
    .replaceAll(/\s+/gu, "")
    .replaceAll(/-+/gu, "-")
    .replaceAll(/^-|-$/gu, "");

// 解析 courses.config.ts 里的分册分组（文件是手写 TS，这里只做只读解析）
const readTextbookGroups = (): TextbookGroup[] => {
  const text = readFileSync(CONFIG_PATH, "utf8");
  const pattern =
    /name:\s*"(?<name>[^"]+)",\s*shortName:\s*"(?<shortName>[^"]+)",\s*slug:\s*"(?<slug>[^"]+)"/gu;
  const groups: TextbookGroup[] = [];

  for (const match of text.matchAll(pattern)) {
    const { name = "", shortName = "", slug = "" } = match.groups ?? {};

    groups.push({ name, shortName, slug });
  }

  return groups;
};

const resolveTextbook = (query: string): TextbookGroup => {
  const groups = readTextbookGroups();

  for (const group of groups)
    if (group.name === query || group.shortName === query || group.slug === query) return group;

  const available = groups.map((item) => `${item.name}（${item.slug}）`).join("、");

  return fail(`找不到分册 "${query}"，可选：${available}`);
};

// 目录名 = 章节前缀 + 英文名：前缀由 --textbook + --chapter 推导（选必加 `o<册号>-`）
// 没给 --chapter（或只有占位符）时退化成英文名
const deriveDirName = (name: string, chapter: string, textbookQuery: string): string => {
  const normalized = normalizeChapter(chapter);

  if (normalized === "") return name;

  const textbookSlug = readTextbookGroups().find(
    (group) =>
      group.name === textbookQuery ||
      group.shortName === textbookQuery ||
      group.slug === textbookQuery,
  )?.slug;
  const volume = /^xx(?<volume>[123])$/u.exec(textbookSlug ?? "")?.groups?.volume;
  const dirName = `${volume ? `o${volume}-` : ""}${normalized}-${name}`;

  if (!DIR_PATTERN.test(dirName)) {
    fail(
      `无法从 --chapter "${chapter}" 推导出合法目录名（得到 "${dirName}"）：` +
        '章节号请写成 "3.5" / "2.2·2.3" / "2.x"（非教材小节用 x）这类',
    );
  }

  return dirName;
};

const parseCli = (values: Record<string, unknown>): CourseOptions => {
  const name = readString(values, "name");
  const chapterName = readString(values, "chapter-name");

  if (name === "" || chapterName === "") fail(`缺少必填参数 --name / --chapter-name\n\n${USAGE}`);

  const nameHint = `--name 必须是 kebab-case 英文名（小写字母开头，只含小写字母/数字/连字符，至少 2 位）：收到 "${name}"`;

  if (name.length < 2 || !NAME_PATTERN.test(name)) fail(nameHint);

  const textbookQuery = readString(values, "textbook");
  const chapter = readString(values, "chapter");
  const chapterLabel = readString(values, "chapter-label");

  if (textbookQuery !== "" && chapter === "")
    fail('使用 --textbook 自动登记时，必须同时提供 --chapter（首页卡片要展示章节号，如 "3.5"）');

  const dirName = deriveDirName(name, chapter, textbookQuery);
  const folderValue = readString(values, "folder");
  const folder = canonicalizeFolder(
    path.resolve(ROOT_DIR, folderValue === "" ? path.join("courses", dirName) : folderValue),
  );
  const force = values.force === true;

  if (force && !isInsideCourses(folder))
    fail("--force 只允许用于 courses/ 下的目录，避免误覆盖共享 addon 或其他文件");

  const register = values["no-register"] !== true;

  if (values["no-register"] === true && textbookQuery !== "")
    console.warn("⚠️  --no-register 生效：不会自动登记 courses.config.ts");

  return {
    name,
    dirName,
    chapterName,
    chapter: chapter === "" ? "待补充章节号" : chapter,
    chapterLabel:
      chapterLabel === "" ? (chapter === "" ? "第 X 章（待补充）" : chapter) : chapterLabel,
    folder,
    textbookQuery,
    force,
    register,
    dryRun: values["dry-run"] === true,
  };
};

// 相对课件目录的**父目录**计算 addon 路径（Slidev 解析 addon 的基准，见 AGENTS.md）
const resolveAddonPath = (folder: string): string =>
  path.relative(path.dirname(folder), SHARED_ADDON_DIR).split("\\").join("/");

const buildTemplateContext = (
  options: CourseOptions,
  textbook?: TextbookGroup,
): CourseTemplateContext => ({
  slug: options.dirName,
  name: options.name,
  chapterName: options.chapterName,
  chapter: options.chapter,
  chapterLabel: options.chapterLabel,
  addonPath: resolveAddonPath(options.folder),
  textbookName: textbook?.name,
});

const planFiles = (options: CourseOptions, textbook?: TextbookGroup): PlannedFile[] => {
  const context = buildTemplateContext(options, textbook);

  return [
    { path: "package.json", content: renderPackageJson(context) },
    { path: "slides.md", content: renderSlides(context) },
    { path: "global-top.vue", content: renderGlobalTop(context) },
    { path: "global-bottom.vue", content: renderGlobalBottom() },
    { path: "style.css", content: renderStyle(context) },
    { path: "README.md", content: renderReadme(context) },
    { path: path.join("content", "思路.md"), content: renderIdeaDoc(context) },
  ];
};

const writeFiles = (options: CourseOptions, files: PlannedFile[]): void => {
  const conflicts = files.filter((file) => existsSync(path.join(options.folder, file.path)));
  const conflictList = conflicts.map((file) => path.join(options.folder, file.path)).join("\n  ");

  if (conflicts.length > 0 && !options.force)
    fail(`目标文件已存在（用 --force 覆盖）：\n  ${conflictList}`);

  // --force 会真的覆盖已有内容，先把"要覆盖什么"摊开给用户看
  if (conflicts.length > 0) {
    console.log("♻️  --force 覆盖以下文件：");

    for (const file of conflicts) {
      const target = path.join(options.folder, file.path);
      const before = statSync(target).size;
      const after = Buffer.byteLength(file.content);

      console.log(`   ${file.path}（${before} 字节 → ${after} 字节）`);
    }

    console.log("   注意：骨架清单以外的文件（components/、content/教案.md 等）不会被删除或改动\n");
  }

  for (const file of files) {
    if (options.dryRun) continue;

    const target = path.join(options.folder, file.path);

    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, file.content);
  }

  // 组件 / 图片目录先建好（本地可见，agent 知道该往哪放），但不放 .gitkeep：
  // Git 不跟踪空目录，真没用到组件或图片时，这两个目录不存在也完全不影响运行
  for (const dir of OPTIONAL_DIRS)
    if (!options.dryRun) mkdirSync(path.join(options.folder, dir), { recursive: true });
};

// 找到 `[` 对应的 `]`（跳过字符串字面量，够用即可）
const findArrayEnd = (text: string, openIndex: number): number => {
  let depth = 0;
  let quote = "";

  for (let index = openIndex; index < text.length; index += 1) {
    const char = text[index];

    if (quote !== "") {
      if (char === "\\") index += 1;
      else if (char === quote) quote = "";

      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
    } else if (char === "[" || char === "{") {
      depth += 1;
    } else if (char === "]" || char === "}") {
      depth -= 1;

      if (depth === 0) return index;
    }
  }

  return -1;
};

const renderCourseEntry = (options: CourseOptions): string => {
  const chapter = options.chapter.startsWith("§") ? options.chapter : `§${options.chapter}`;
  const placeholder = "待补充：一句话说明本课讲了什么。";

  // 手写 TS 风格（键不加引号、末尾带逗号），与 courses.config.ts 其余条目一致
  return [
    "      {",
    `        slug: ${JSON.stringify(options.dirName)},`,
    `        title: ${JSON.stringify(options.chapterName)},`,
    `        chapter: ${JSON.stringify(chapter)},`,
    `        description: ${JSON.stringify(placeholder)},`,
    "        tags: [],",
    "      }",
  ].join("\n");
};

// 把 CourseMeta 插进对应分册的 courses 数组
const insertCourseEntry = (text: string, group: TextbookGroup, options: CourseOptions): string => {
  // 已经登记过就不再插（重复跑 --force 不会产生重复条目）
  if (text.includes(`slug: "${options.dirName}"`)) return text;

  const groupIndex = text.indexOf(`slug: "${group.slug}"`);

  if (groupIndex === -1) fail(`courses.config.ts 里找不到分册 ${group.slug}，请手动登记`);

  // 下一个分册的起点：越界说明 config 结构与脚本预期不一致，宁可不写也不能写错位置
  const nextGroupIndex = text.indexOf('name: "', groupIndex + 1);
  const boundary = nextGroupIndex === -1 ? text.length : nextGroupIndex;
  const arrayOpen = text.indexOf("courses: [", groupIndex);

  const arrayHint = `courses.config.ts 里找不到分册 ${group.slug} 的 courses 数组（结构可能已改），请手动登记`;

  if (arrayOpen === -1 || arrayOpen > boundary) fail(arrayHint);

  const bracketIndex = arrayOpen + "courses: ".length;
  const arrayEnd = findArrayEnd(text, bracketIndex);

  const bracketHint = `courses.config.ts 的分册 ${group.slug} 括号不配对（结构可能已改），请手动登记`;

  if (arrayEnd === -1 || arrayEnd > boundary) fail(bracketHint);

  const inner = text.slice(bracketIndex + 1, arrayEnd);
  const entry = renderCourseEntry(options);
  const nextInner =
    inner.trim() === "" ? `\n${entry},` : `${inner.replace(/\s+$/u, "")}\n${entry},`;

  return `${text.slice(0, bracketIndex)}[${nextInner}\n    ${text.slice(arrayEnd)}`;
};

const planConfigUpdate = (options: CourseOptions, textbook: TextbookGroup): FileUpdate[] => {
  const original = readFileSync(CONFIG_PATH, "utf8");
  const content = insertCourseEntry(original, textbook, options);

  return content === original
    ? []
    : [
        {
          label: `workspace/homepage/courses.config.ts（${textbook.name}）`,
          path: CONFIG_PATH,
          content,
        },
      ];
};

// 共享文件改动**先在内存里算完再统一落盘**：任何一步报错都不会留下半截写入
const registerShared = (options: CourseOptions, textbook?: TextbookGroup): string[] => {
  const updates: FileUpdate[] = textbook ? planConfigUpdate(options, textbook) : [];

  if (!options.dryRun) for (const update of updates) writeFileSync(update.path, update.content);

  return updates.map((update) => update.label);
};

const printSummary = (
  options: CourseOptions,
  files: PlannedFile[],
  touched: string[],
  textbook?: TextbookGroup,
): void => {
  const folderLabel = path.relative(ROOT_DIR, options.folder) || options.folder;
  const prefix = options.dryRun ? "🧪 [dry-run] " : "";
  const workspaceCourse = isWorkspaceCourse(options.folder);

  console.log(`\n${prefix}✅ 课件骨架：${folderLabel}（${options.chapterName}）\n`);
  console.log("📁 生成文件");

  for (const file of files) console.log(`   ${path.join(folderLabel, file.path)}`);

  // 空目录也报一下：agent 会往这里放组件 / 图片
  for (const dir of OPTIONAL_DIRS)
    console.log(`   ${path.join(folderLabel, dir)}/（空目录，按需放文件）`);

  if (touched.length > 0) {
    console.log(`\n🔧 已登记${options.dryRun ? "（dry-run：仅预演，未落盘）" : ""}`);

    for (const item of touched) console.log(`   ${item}`);
  } else if (options.register && workspaceCourse) {
    console.log(
      textbook
        ? "\n🔧 首页配置里已有该 slug，跳过重复登记"
        : "\n🔧 未自动登记：没有提供 --textbook（分册），记得手动登记 workspace/homepage/courses.config.ts",
    );
  } else if (options.register) {
    console.log(
      `\n🔧 未自动登记：目标目录不是 courses/<目录名> 这一层，不会被 pnpm workspace 纳入，需手动处理`,
    );
  } else {
    console.log("\n🔧 未登记：--no-register 生效（courses.config.ts 没动）");
  }

  console.log("\n👉 下一步");

  if (workspaceCourse) {
    console.log("   1. pnpm install        # 新课件是 workspace 包，必须先装依赖");
    console.log(`   2. pnpm dev ${options.dirName}    # 预览（也可直接 pnpm dev 交互选择）`);
  } else {
    console.log(`   1. 把课件放进 courses/${options.dirName}/ 才能作为 workspace 包预览 / 构建`);
    console.log(
      `   2. pnpm --filter ${options.name}-courseware dev   # 预览（需自行保证依赖可用）`,
    );
  }

  console.log("   3. 整理 content/思路.md，向老师复述确认后再逐页写 slides.md");
  console.log("   4. pnpm test:e2e       # 逐页检查是否超出 16:9 画面");
  console.log("   5. 设计定稿后再写 content/教案.md 与 content/逐字稿.md\n");
};

const main = (): void => {
  const values = parseArgsOrFail();

  if (values.help === true) {
    console.log(USAGE);

    return;
  }

  const options = parseCli(values);
  const workspaceCourse = isWorkspaceCourse(options.folder);

  if (!isInsideCourses(options.folder)) {
    console.warn(
      `⚠️  目标目录不在 courses/ 下（${options.folder}）：不会加入 pnpm workspace，也不会自动登记首页配置；` +
        "slides.md 里的 addon 路径按「课件目录的父目录」推算，若解析不到请手动调整",
    );
  } else if (!workspaceCourse) {
    console.warn(
      `⚠️  目标目录在 courses/ 的子目录里（${options.folder}）：pnpm-workspace.yaml 只匹配 courses/*，` +
        `它不会成为 workspace 包（首页与 pnpm test:e2e 也扫不到），因此不自动登记；建议改成 courses/${options.dirName}`,
    );
  } else if (path.basename(options.folder) !== options.dirName) {
    console.warn(
      `⚠️  目录名（${path.basename(options.folder)}）与自动推导的目录名（${options.dirName}）不一致，` +
        "URL 前缀与首页 slug 按自动推导值生成",
    );
  }

  let textbook: TextbookGroup | undefined;

  if (options.textbookQuery !== "") textbook = resolveTextbook(options.textbookQuery);

  const files = planFiles(options, textbook);

  if (options.dryRun) console.log("🧪 dry-run：不写任何文件\n");

  writeFiles(options, files);

  const touched = options.register && workspaceCourse ? registerShared(options, textbook) : [];

  printSummary(options, files, touched, textbook);

  if (!options.dryRun && workspaceCourse && !existsSync(path.join(options.folder, "node_modules")))
    console.warn("⚠️  新课件还没有 node_modules，先执行 pnpm install 再预览 / 跑测试");
};

try {
  main();
} catch (err) {
  if (!(err instanceof CliError)) throw err;

  console.error(`❌ ${err.message}`);
  process.exitCode = 1;
}
