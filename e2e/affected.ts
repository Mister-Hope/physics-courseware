import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

/**
 * 「改动 → 该跑哪些课件」的判定。
 *
 * 设计口径：**宁可多跑，不可漏跑**。
 *
 * - 命中全局路径（共享样式 / 布局 / 依赖 / E2E 自身）→ 全量；
 * - 共享组件 → 只跑静态引用它的课件，一个引用方都找不到时退回全量（说明映射不可信）；
 * - 未识别的路径 → 全量；
 * - 只有明确的文档 / 教案 / 注册表 / 入口网站改动才判"不用跑"。
 *
 * 判定结果由 `scripts/e2e-affected.ts` 消费并换成 `E2E_COURSE`（见该脚本）。
 */

const ROOT_DIR = resolve(import.meta.dirname, "..");
const COURSES_DIR = join(ROOT_DIR, "courses");
const SHARED_COMPONENTS_DIR = join(ROOT_DIR, "workspace", "shared", "components");

/** 本次要跑的规模 */
export type AffectedMode = "none" | "courses" | "all";

/** 一次判定结果 */
export interface AffectedPlan {
  /** None = 跳过；courses = 只跑子集；all = 全量 */
  mode: AffectedMode;
  /** 要跑的课件 slug（按章节顺序）：none 时为空，all 时为全部课件 */
  courses: string[];
  /** 触发本次判定的理由（人类可读，CI 摘要里直接用） */
  reasons: string[];
  /** 与幻灯片版面无关、被忽略的改动文件 */
  ignored: string[];
}

/** 共享组件名 → 引用它的课件 slug（已做传递闭包：A 用了 B，则改 B 也要跑用 A 的课件） */
export type SharedComponentUsage = Record<string, string[]>;

export interface SelectAffectedOptions {
  /** `git diff --name-only` 的输出（相对仓库根、posix 路径） */
  changedFiles: string[];
  /** 全部课件 slug（用于过滤已删除 / 重命名的旧路径） */
  allCourses: string[];
  /** 共享组件引用表；不传则现扫（见 `buildSharedComponentUsage`） */
  usage?: SharedComponentUsage;
}

/** 一改就必须全量的路径 */
const GLOBAL_RULES: { pattern: RegExp; reason: string }[] = [
  { pattern: /^workspace\/shared\/styles\//u, reason: "共享样式（workspace/shared/styles）" },
  { pattern: /^workspace\/shared\/layouts\//u, reason: "共享布局（workspace/shared/layouts）" },
  { pattern: /^workspace\/shared\/setup\//u, reason: "共享 Slidev setup" },
  { pattern: /^workspace\/shared\/assets\//u, reason: "共享素材（校徽等）" },
  { pattern: /^workspace\/shared\/types\//u, reason: "共享类型声明" },
  { pattern: /^workspace\/shared\/utils\//u, reason: "共享工具函数" },
  { pattern: /^workspace\/shared\/uno\.config\.ts$/u, reason: "UnoCSS 配置" },
  { pattern: /^workspace\/shared\/vite\.config\.ts$/u, reason: "共享 Vite 配置" },
  { pattern: /^workspace\/shared\/package\.json$/u, reason: "共享 addon 依赖" },
  { pattern: /^workspace\/shared\/vite-env\.d\.ts$/u, reason: "共享类型声明" },
  { pattern: /^e2e\//u, reason: "E2E 测试自身" },
  { pattern: /^playwright\.config\.ts$/u, reason: "Playwright 配置" },
  { pattern: /^scripts\/e2e\.ts$/u, reason: "E2E 调度器" },
  { pattern: /^scripts\/e2e-affected\.ts$/u, reason: "E2E 选课脚本" },
  { pattern: /^package\.json$/u, reason: "根依赖清单" },
  { pattern: /^pnpm-lock\.yaml$/u, reason: "依赖锁文件" },
  { pattern: /^pnpm-workspace\.yaml$/u, reason: "pnpm workspace 配置" },
  { pattern: /^tsconfig\.json$/u, reason: "TypeScript 配置" },
  { pattern: /^patches\//u, reason: "依赖补丁" },
  { pattern: /^\.github\/workflows\//u, reason: "CI 工作流" },
];

/** 与幻灯片版面无关、明确可以忽略的路径 */
const IGNORED_RULES: { pattern: RegExp; reason: string }[] = [
  { pattern: /^courses\.json$/u, reason: "课件注册表（不影响版面）" },
  { pattern: /^courses\.schema\.json$/u, reason: "注册表 schema" },
  { pattern: /^workspace\/homepage\//u, reason: "入口网站（不是课件）" },
  { pattern: /^resources\//u, reason: "教材 / 平行工具" },
  { pattern: /^\.agents\//u, reason: "笔记与技能" },
  { pattern: /^\.vscode\//u, reason: "编辑器配置" },
  { pattern: /^\.github\//u, reason: "GitHub 配置（非工作流）" },
  { pattern: /^(?:README|AGENTS|NOTICE|LICENSE)[^/]*$/u, reason: "根目录文档" },
  { pattern: /^scripts\//u, reason: "构建 / 工具脚本（不参与幻灯片渲染）" },
  { pattern: /^workspace\/shared\/[^/]*\.md$/u, reason: "共享 addon 文档" },
  { pattern: /^(?:oxlint|oxfmt|stylelint)\.config\.(?:ts|js)$/u, reason: "Lint / 格式化配置" },
  {
    pattern: /^(?:\.ncurc\.js|\.prettierignore|\.gitignore|skills-lock\.json)$/u,
    reason: "工具配置",
  },
];

/** 课件目录里不参与渲染的文件（相对课件目录） */
const COURSE_IGNORED_RULES: { pattern: RegExp; reason: string }[] = [
  { pattern: /^README\.md$/u, reason: "课件说明" },
  { pattern: /^content\//u, reason: "思路 / 教案 / 逐字稿（不参与渲染）" },
];

/** 统一成 posix 相对路径（git 输出本来就是，这里防一手 Windows） */
function normalizePath(file: string): string {
  return file.replaceAll("\\", "/").replace(/^\.\//u, "").trim();
}

/** 课件里是否出现了某个共享组件的标签（`<CoordAxes` / `<CoordAxes/>`） */
function referencesComponent(text: string, component: string): boolean {
  return new RegExp(`<${component}\\b`, "u").test(text);
}

function readText(file: string): string {
  try {
    return readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

/**
 * 扫描「共享组件 → 引用它的课件」。
 *
 * 直接引用来自各课件的 `slides.md` / `components/*.vue` / `global-*.vue`； 共享组件之间也可能互相引用（例如某个组合组件内部用了
 * `CourseArrow`），所以再对组件依赖图求一次传递闭包。
 */
export function buildSharedComponentUsage(allCourses: string[]): SharedComponentUsage {
  if (!existsSync(SHARED_COMPONENTS_DIR)) return {};

  const components = readdirSync(SHARED_COMPONENTS_DIR)
    .filter((file) => file.endsWith(".vue"))
    .map((file) => file.slice(0, -4));

  // 每个课件实际会渲染的源文件（正文 + 页面外壳 + 本课组件）
  const courseText = new Map<string, string>();

  for (const slug of allCourses) {
    const directory = join(COURSES_DIR, slug);
    const parts = [
      readText(join(directory, "slides.md")),
      readText(join(directory, "global-top.vue")),
      readText(join(directory, "global-bottom.vue")),
    ];
    const componentsDirectory = join(directory, "components");

    if (existsSync(componentsDirectory)) {
      for (const file of readdirSync(componentsDirectory)) {
        if (file.endsWith(".vue")) parts.push(readText(join(componentsDirectory, file)));
      }
    }

    courseText.set(slug, parts.join("\n"));
  }

  // 直接引用：组件 → 课件
  const directUsers = new Map<string, Set<string>>(
    components.map((component) => [component, new Set<string>()]),
  );

  for (const [slug, text] of courseText) {
    for (const component of components) {
      if (referencesComponent(text, component)) directUsers.get(component)?.add(slug);
    }
  }

  // 组件依赖：组件 → 引用了它的上层组件（用于把"改底层组件"扩散到"用上层组件的课件"）
  const parents = new Map<string, Set<string>>(
    components.map((component) => [component, new Set<string>()]),
  );

  for (const component of components) {
    const text = readText(join(SHARED_COMPONENTS_DIR, `${component}.vue`));

    for (const other of components) {
      if (other !== component && referencesComponent(text, other))
        parents.get(other)?.add(component);
    }
  }

  const usage: SharedComponentUsage = {};

  for (const component of components) {
    const users = new Set(directUsers.get(component) ?? []);
    const stack = [...(parents.get(component) ?? [])];
    const seen = new Set<string>();

    while (stack.length > 0) {
      const parent = stack.pop();

      if (parent == null || seen.has(parent)) continue;

      seen.add(parent);

      for (const user of directUsers.get(parent) ?? []) users.add(user);
      for (const grandParent of parents.get(parent) ?? []) stack.push(grandParent);
    }

    usage[component] = [...users].sort();
  }

  return usage;
}

/**
 * 把改动文件列表换算成"这次要跑哪些课件"。
 *
 * @param options 改动文件 + 全部课件（可选传入现成的共享组件引用表）
 * @returns 判定结果；`mode: "all"` 时应跑全部课件，`"none"` 时直接跳过
 */
export function selectAffectedCourses({
  changedFiles,
  allCourses,
  usage,
}: SelectAffectedOptions): AffectedPlan {
  const files = changedFiles.map(normalizePath).filter(Boolean);
  const allCoursesSet = new Set(allCourses);

  // 先判全局：命中任何一条就直接全量，不用再管其它文件
  const globalReasons = new Set<string>();

  for (const file of files) {
    const rule = GLOBAL_RULES.find((item) => item.pattern.test(file));

    if (rule) globalReasons.add(rule.reason);
  }

  if (globalReasons.size > 0) {
    return {
      mode: "all",
      courses: [...allCourses],
      reasons: [...globalReasons],
      ignored: [],
    };
  }

  const directCourseHits = new Set<string>();
  const courseHits = new Set<string>();
  const sharedComponentReasons = new Set<string>();
  const ignored: string[] = [];

  const usageTable = files.some((file) => /^workspace\/shared\/components\/[^/]+\.vue$/u.test(file))
    ? (usage ?? buildSharedComponentUsage(allCourses))
    : undefined;

  for (const file of files) {
    const courseMatch = /^courses\/([^/]+)\/(.+)$/u.exec(file);

    if (courseMatch) {
      const [, slug, relative] = courseMatch;

      if (!allCoursesSet.has(slug)) {
        // 课件已删除 / 重命名：旧路径不再需要检查（新路径会单独出现在 diff 里）
        ignored.push(`${file}（课件已不存在）`);
        continue;
      }

      if (COURSE_IGNORED_RULES.some((rule) => rule.pattern.test(relative))) {
        ignored.push(file);
        continue;
      }

      directCourseHits.add(slug);
      courseHits.add(slug);
      continue;
    }

    const sharedMatch = /^workspace\/shared\/components\/(.+)$/u.exec(file);

    if (sharedMatch) {
      const name = sharedMatch[1];

      if (name.endsWith(".md")) {
        ignored.push(file);
        continue;
      }

      if (name.endsWith(".vue")) {
        const component = name.slice(0, -4);
        const users = usageTable?.[component];

        if (!users || users.length === 0) {
          // 找不到引用方 = 映射不可信（可能被动态使用），退回全量
          return {
            mode: "all",
            courses: [...allCourses],
            reasons: [`共享组件 ${component} 找不到引用方，无法缩小范围`],
            ignored: [],
          };
        }

        sharedComponentReasons.add(`共享组件 ${component} → 引用它的 ${users.length} 门课件`);
        for (const slug of users) courseHits.add(slug);
        continue;
      }

      // components 目录下的 .ts 等公共逻辑：无法安全判断影响面
      return {
        mode: "all",
        courses: [...allCourses],
        reasons: [`共享组件目录下的非组件文件：${file}`],
        ignored: [],
      };
    }

    if (file.startsWith("workspace/shared/")) {
      if (file.endsWith(".md")) {
        ignored.push(file);
        continue;
      }

      return {
        mode: "all",
        courses: [...allCourses],
        reasons: [`共享 addon 的其它文件：${file}`],
        ignored: [],
      };
    }

    const ignoredRule = IGNORED_RULES.find((rule) => rule.pattern.test(file));

    if (ignoredRule) {
      ignored.push(file);
      continue;
    }

    // 未识别的路径：宁可全量
    return {
      mode: "all",
      courses: [...allCourses],
      reasons: [`未识别的路径，保守全量：${file}`],
      ignored: [],
    };
  }

  if (courseHits.size === 0) {
    return {
      mode: "none",
      courses: [],
      reasons: ["改动只涉及文档 / 注册表 / 入口网站等与幻灯片版面无关的文件"],
      ignored,
    };
  }

  const reasons = [...sharedComponentReasons];

  if (directCourseHits.size > 0)
    reasons.unshift(`课件目录改动 → 直接命中 ${directCourseHits.size} 门课件`);

  return {
    mode: "courses",
    courses: allCourses.filter((slug) => courseHits.has(slug)),
    reasons,
    ignored,
  };
}
