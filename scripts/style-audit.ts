/**
 * 课件风格体检 —— 配套 `.agents/notes/style-guide.md` 的可执行验收。
 *
 * 用法： pnpm style:audit # 全部课件，只打印有发现的 pnpm style:audit 10.4-capacitor # 指定课件（可多个）
 *
 * 查什么（对应 style-guide 的哪一节）： ① 卡片数量 §4 一份课件 ≤15，超出多半是该用 .key / .divider-l 的地方用了卡片 ② 图标数量 §5 0 个 =
 * 并列条目大概率缺扫读锚点 ③ 硬编码视觉参数 §3 色值 / font-size / border-radius 必须走 token ④ 裸类名 §6 用了某个类却没在同一课 style.css
 * 里定义 ⑤ 越权覆盖 §8 重写共享选择器、覆盖了 --page-gap/--stack-gap 以外的变量
 *
 * 结果是**建议性**的（默认 exit 0）：存量课件按"谁改谁收敛"，不拿来卡 CI。
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { PALETTE_CLASS, PALETTE_TO_TOKEN, parseColor, tokenOfHex } from "./token-colors";

const ROOT = path.resolve(import.meta.dirname, "..");
const COURSES_DIR = path.join(ROOT, "courses");
/** Style-guide §4：一份课件卡片总数上限 */
const CARD_BUDGET = 15;

/** 共享样式正本目录（common / layout / atoms 三个文件里的类 = 全部合法共享原子） */
const SHARED_STYLES_DIR = path.join(ROOT, "workspace", "shared", "styles");

// 读文件（不存在算空串）。声明放在最前：模块顶层的初始化就可能用到它，
// 若挪到下面、又有人改成 `const` 之前的顶层调用，会掉进暂时性死区（TDZ）。
const read = (file: string): string => (existsSync(file) ? readFileSync(file, "utf8") : "");

/**
 * 共享原子全集 —— **从正本 CSS 现读**，不手工维护。
 *
 * 正本：`workspace/shared/styles/{common,layout,atoms}.css`。以前这里是手工抄的一份清单， 结果 `atoms.css` 新增
 * `.data-table`/`.split-wide`/`.ok`/`.step-list` 等 12 个原子后清单没跟上，
 * 子代理一用就被误报成"裸类名"、被迫绕开正本写私有值（真踩过）。现在直接扫 CSS 顶层选择器。
 *
 * @returns 三个正本样式文件里定义的共享原子类名
 */
const sharedAtomClasses = (): Set<string> => {
  const atoms = new Set<string>();
  // 顶层选择器：行首 `.name`（`.a,` / `.a {` / `.a:hover {` 都算），复合选择器里的不算
  const TOP_LEVEL = /^\.(?<name>[a-z][a-z0-9-]*)\s*(?:[,{]|$)/mu;

  for (const file of ["common.css", "layout.css", "atoms.css"]) {
    for (const line of readFileSync(path.join(SHARED_STYLES_DIR, file), "utf8").split("\n")) {
      const name = TOP_LEVEL.exec(line)?.groups?.name;

      if (name) atoms.add(name);
    }
  }

  return atoms;
};

const SHARED_ATOMS = sharedAtomClasses();

/** UnoCSS 工具类前缀（它们不是"自造原子"，排除掉） */
const UTILITY_PREFIXES = new Set([
  "m",
  "p",
  "mt",
  "mb",
  "ml",
  "mr",
  "mx",
  "my",
  "pt",
  "pb",
  "pl",
  "pr",
  "px",
  "py",
  "gap",
  "gap-x",
  "gap-y",
  "space",
  "grid",
  "col",
  "row",
  "flex",
  "basis",
  "order",
  "text",
  "font",
  "leading",
  "tracking",
  "whitespace",
  "break",
  "uppercase",
  "italic",
  "w",
  "h",
  "min-w",
  "max-w",
  "min-h",
  "max-h",
  "size",
  "bg",
  "border",
  "rounded",
  "shadow",
  "opacity",
  "outline",
  "ring",
  "divide",
  "items",
  "justify",
  "place",
  "self",
  "content",
  "z",
  "top",
  "left",
  "right",
  "bottom",
  "inset",
  "absolute",
  "relative",
  "fixed",
  "sticky",
  "overflow",
  "pointer",
  "select",
  "cursor",
  "hidden",
  "block",
  "inline",
  "contents",
  "transition",
  "duration",
  "ease",
  "delay",
  "transform",
  "translate",
  "scale",
  "rotate",
  "sr",
  "not-sr",
  "visually",
]);

/** 只有这些变量允许在本课 `:root` 里覆盖（layout.css 声明的唯一出口） */
const ALLOWED_ROOT_OVERRIDES = new Set(["--page-gap", "--stack-gap"]);

/** 共享选择器：本课 style.css 不得重写（style-guide §8）。标签给人看，正则给机器用 */
const PROTECTED_SELECTORS: [label: string, pattern: RegExp][] = [
  [".slidev-layout（页面外壳）", /^\.slidev-layout\b/mu],
  ["h1（页面大标题）", /^h1\s*\{/mu],
  ["table / th / td（共享表格）", /^(?<tag>table|th|td)\s*\{/mu],
  [".mini-title（小节标题）", /^\.mini-title\s*[,{]/mu],
  [".ask（提问）", /^\.ask\s*[,{]/mu],
  [".problem（习题题干）", /^\.problem\s*[,{]/mu],
  [".key（结论竖线）", /^\.key\s*[,{]/mu],
];

const CLASS_ATTR = /(?<![:\w-])class="(?<classes>[^"]*)"/gu;
const CLASS_DEF = /^\s*\.(?<name>[a-zA-Z][\w-]*)/mu;
/** 与 `CLASS_DEF` 同源，但带 `g`（`matchAll` 要求）——全仓多处复用，避免每次 new RegExp */
const CLASS_DEF_GLOBAL = new RegExp(CLASS_DEF.source, "gmu");
const STYLE_BLOCK = /<style[^>]*>(?<block>[\s\S]*?)<\/style>/gu;
const ICON = /<(?<icon>mdi-[a-z0-9-]+)/gu;
/** 允许给图标放大的字号类：共享阶梯（带 `!important`）+ 图标专用 `.icon-*`（也带 `!important`） */
const ICON_SIZE_OK = /^(?:(?<text>text-(?:[2-5]xl))|(?<icon>icon-(?:md|lg|xl|2xl)))$/u;
/**
 * UnoCSS 的字号类不带 `!important`，压不过 `common.css` 给 svg 钉的 `font-size:16px` 基准 → 图标钉死 16px。
 * 只在"作者确实想把图标放大"（text-2xl 及以上）时报：行内小图标用 text-lg/xl 是有意为之、不算问题。
 */
const UNOCSS_BIG_TEXT = /^text-(?<xl>[2-9]xl|\d{2,}xl)$/u;
/** 只用来"找有没有"，别带 `g`（`test()` 配 `g` 会记住 lastIndex、隔次返回假） */
const FONT_SIZE = /font-size\s*:\s*(?<size>[^;}{]+);/gu;
const BORDER_RADIUS = /border-radius\s*:\s*(?<radius>[^;}{]+);/gu;
/** 剥掉 `var(--…)` 再判断"是否写死了值" */
const CSS_VALUE = /var\((?<var>[^)]*)\)/gu;
const ROOT_VAR = /^\s*(?<var>--[\w-]+)\s*:/mu;

interface Finding {
  level: "error" | "warn" | "info";
  message: string;
}

/**
 * 本课 slides.md + components/*.vue 里的所有源码文本
 *
 * @param dir 课件目录
 * @returns 该课 slides.md 与全部组件源码拼成的文本
 */
const courseSources = (dir: string): string => {
  const parts = [read(path.join(dir, "slides.md"))];
  const components = path.join(dir, "components");

  if (existsSync(components)) {
    const componentFiles = readdirSync(components).filter((name) => name.endsWith(".vue"));

    for (const name of componentFiles) parts.push(read(path.join(components, name)));
  }

  return parts.join("\n");
};

/**
 * 一个组件源码里 `<style>` 段定义的类名（模板里的 `class="…"` 属性值不算）。
 *
 * @param vue 组件源码（.vue 全文）
 * @returns 该组件样式段里定义的类名
 */
const styleBlockClasses = (vue: string): string[] =>
  [...vue.matchAll(STYLE_BLOCK)].flatMap((match) =>
    [...(match.groups?.block ?? "").matchAll(CLASS_DEF_GLOBAL)].map(
      (item) => item.groups?.name ?? "",
    ),
  );

/**
 * 本课**定义过**的类名 = `style.css` 里定义的 ∪ 各组件 `<style>`（含 scoped）里定义的。
 *
 * ⚠️ 必须把组件的 `<style>` 算进来：本仓库大量课件把类写成组件局部样式（如 3.4 的 `ae-*`/`dc-*`/`fp-*` 全在 `<style scoped>` 里），只扫
 * `style.css` 会把它们误判成"裸类名"。
 *
 * @param dir 课件目录
 * @param css 本课 `style.css` 全文
 * @returns 本课定义过的全部类名
 */
const courseDefinedClasses = (dir: string, css: string): Set<string> => {
  const defined = new Set(
    [...css.matchAll(CLASS_DEF_GLOBAL)].map((match) => match.groups?.name ?? ""),
  );
  const components = path.join(dir, "components");
  const componentFiles = existsSync(components)
    ? readdirSync(components).filter((file) => file.endsWith(".vue"))
    : [];
  const componentClasses = componentFiles.flatMap((name) =>
    styleBlockClasses(read(path.join(components, name))),
  );

  for (const cls of componentClasses) if (cls) defined.add(cls);

  return defined;
};

/**
 * 是否像 UnoCSS 工具类（`mt-2` / `grid-cols-3` / `text-center` …）
 *
 * @param token `class="…"` 里的一个类名
 * @returns 命中工具类前缀表返回 true
 */
const isUtility = (token: string): boolean => {
  const [head] = token.split("-");

  // `grid-cols-3` 的 head 是 `grid`、`mt-4` 的 head 是 `mt`——按首段查前缀表就够了
  return UTILITY_PREFIXES.has(head) || UTILITY_PREFIXES.has(token);
};

/**
 * 拆出一条源码行里 `class="…"` 的所有类名 token
 *
 * @param line 源码的一行
 * @returns 该行 `class` 属性里的全部类名
 */
const classTokens = (line: string): string[] =>
  [...line.matchAll(CLASS_ATTR)].flatMap((match) => (match.groups?.classes ?? "").split(/\s+/u));

// ── 各项检查都拆成独立函数：单一职责、圈复杂度低，也便于单独测试 ──

/**
 * ① 卡片数量（§4：一份课件 ≤15，超出该用 .ask/.key/.divider-l）
 *
 * @param sources 本课 slides.md + 组件源码
 * @returns 卡片数与对应发现
 */
const checkCards = (sources: string): { cards: number; findings: Finding[] } => {
  const cards = classTokens(sources).filter((token) => /^card[a-z0-9-]*$/u.test(token)).length;

  return {
    cards,
    findings:
      cards > CARD_BUDGET
        ? [
            {
              level: "warn",
              message: `卡片 ${cards} 处（上限 ${CARD_BUDGET}）—— 我们的思路是"只有定义才立卡片"：提问用 .ask、落点用 .key、对比用 .half-grid + .divider-l；你看看这些卡片里哪些其实是提问 / 结论 / 对比？（§4）`,
            },
          ]
        : [],
  };
};

/**
 * ② 图标数量（§5：并列条目 / 概念三栏 / 步骤条该配扫读图标）
 *
 * @param icons 全课图标数
 * @returns 图标为 0 时的建议
 */
const checkIconCount = (icons: number): Finding[] =>
  icons === 0
    ? [
        {
          level: "info",
          message:
            "全课 0 个图标 —— 我们的思路是：并列可扫读的结构（概念三栏 / 要素列举 / 步骤条 / 对错判定）配一个语义图标；本课有这类结构吗？（§5）",
        },
      ]
    : [];

/**
 * ②b 图标字号（§5：UnoCSS 的 text-* 不带 !important，压不过 common.css 给 svg 钉的 16px 基准）
 *
 * @param sources 本课 slides.md + 组件源码
 * @returns 图标用了压不过 16px 基准的 UnoCSS 字号类的发现
 */
const checkIconSizes = (sources: string): Finding[] =>
  sources.split("\n").flatMap((line, index) => {
    if (!line.includes("<mdi-")) return [];

    // 只在"作者确实想把图标放大"（text-2xl 及以上）时报：行内小图标用 text-lg/xl 是有意为之
    return classTokens(line)
      .filter((token) => UNOCSS_BIG_TEXT.test(token) && !ICON_SIZE_OK.test(token))
      .map((token) => ({
        level: "warn",
        message: `第 ${index + 1} 行图标用了 \`${token}\`（UnoCSS，压不过 svg 的 16px 基准，图标会被钉死 16px）→ 换共享阶梯 .text-2xl…5xl 或 .icon-md/lg/xl/2xl（§5）`,
      }));
  });

/**
 * ③ 单行 CSS 的硬编码色值 / 私调字号 / 非 token 圆角（§3）
 *
 * @param line `style.css` 的一行
 * @param index 该行在文件里的下标（从 0 起，报错时 +1 转成行号）
 * @param unknownColors 本课"不在 token 表里"的色值记账表（按出现次数累加）
 * @returns 这一行的发现
 */
const checkCssLine = (
  line: string,
  index: number,
  unknownColors: Map<string, number>,
): Finding[] => {
  if (line.trimStart().startsWith("/*")) return [];

  const out: Finding[] = [];
  // 先剥掉 `var(--…)`：剩下的 hex / rgb( 才是"写死的值"
  const raw = line.replaceAll(CSS_VALUE, "");

  for (const match of raw.matchAll(/#[\da-fA-F]{3,8}\b|rgba?\([^)]*\)/gu)) {
    const { hex, alpha } = parseColor(match[0]);

    if (!hex) continue;

    const token = tokenOfHex(hex);

    // ① 写死的值**本来就是某个 token** ⇒ 客观错误：没有任何理由不写 var()
    if (token && alpha === 1) {
      out.push({
        level: "error",
        message:
          `style.css:${index + 1} 这个色值就是 \`${token}\`（${hex}）里的同一个值 —— 直接写 \`var(${token})\` 就行，写死等于抄了一遍 token（§3）。` +
          `请复查这行是不是从别处粘贴时把 var() 漏成了字面值：｜ ${line.trim()}`,
      });
      continue;
    }

    // ② 同一个色相只是加了透明度 ⇒ 警告（我们这套体系的做法是 color-mix）
    if (token) {
      out.push({
        level: "warn",
        message:
          `style.css:${index + 1} \`${match[0]}\` 的色相就是 \`${token}\`，只是带了透明度。` +
          `我们的思路是：色相一律取 token、透明度用 \`color-mix(in srgb, var(${token}) N%, transparent)\` 表达（§3）——你看这样写是否更贴合（§3）`,
      });
      continue;
    }

    // ③ 完全不在 token 表里的颜色：先记账，整门课超过 5 个才提醒"配色可能跑偏"
    unknownColors.set(hex, (unknownColors.get(hex) ?? 0) + 1);
  }

  for (const match of line.matchAll(FONT_SIZE)) {
    const value = match.groups?.size?.trim() ?? "";

    if (/^[0-9.]+(?:rem|px|em)$/u.test(value)) {
      out.push({
        level: "warn",
        message: `style.css:${index + 1} 私调字号 ${value} → 用 .text-* 阶梯或 .mini-note（§3）`,
      });
    }
  }

  for (const match of line.matchAll(BORDER_RADIUS)) {
    const value = match.groups?.radius?.trim() ?? "";

    if (!value.startsWith("var(--radius") && !/^(?:999px|50%|\d+%)$/u.test(value)) {
      out.push({
        level: "warn",
        message: `style.css:${index + 1} 圆角 ${value} → 用 var(--radius-*)（§3）`,
      });
    }
  }

  return out;
};

/**
 * 全仓 `style.css` 里定义过的所有类名 → 哪些课定义了它。
 *
 * 用途：判断"裸类名"时，只有**在别的课里被定义过、本课却没定义**的类才是真信号 （同名不同义的跨课碰撞）。UnoCSS 工具类（`.align-middle` / `.max-w-md` /
 * `.abs-br` / `.group`…） 从不会出现在任何 style.css 里，用这个索引一筛就自然排除，不必穷举工具类前缀。
 *
 * @returns 类名 → 定义过它的课件目录名
 */
const buildCourseClassIndex = (): Map<string, string[]> => {
  const index = new Map<string, string[]>();

  for (const entry of readdirSync(COURSES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const cssFile = path.join(COURSES_DIR, entry.name, "style.css");

    if (!existsSync(cssFile)) continue;

    for (const match of read(cssFile).matchAll(CLASS_DEF_GLOBAL)) {
      const name = match.groups?.name ?? "";

      if (!name) continue;

      const list = index.get(name) ?? [];

      list.push(entry.name);
      index.set(name, list);
    }
  }

  return index;
};

/**
 * 判断"裸类名"：本课页面用了这个类，却没在本课 `style.css` **或任一组件的 `<style>`** 里定义。
 *
 * 只在**至少有一门别的课定义了它**时才算违例——那意味着同名不同义的跨课碰撞（§6 最危险的一类）。 纯工具类 / 本课一次性类名不在此列，避免把 UnoCSS 之类的噪声报成"裸类名"。
 *
 * @param slug 课件目录名
 * @param css 本课 `style.css` 全文
 * @param sources 本课 slides.md + 组件源码
 * @param classIndex 全仓类名索引（见 `buildCourseClassIndex`）
 * @returns 跨课碰撞的裸类名发现
 */
const checkBareClasses = (
  slug: string,
  css: string,
  sources: string,
  classIndex: Map<string, string[]>,
): Finding[] => {
  const defined = courseDefinedClasses(path.join(COURSES_DIR, slug), css);
  const used = new Set(classTokens(sources).filter((token) => /^[a-z][a-z0-9-]*$/u.test(token)));
  const bare = [...used].filter((token) => {
    if (SHARED_ATOMS.has(token) || defined.has(token) || isUtility(token)) return false;

    // 有别的课定义了它 → 跨课碰撞；全仓都没定义 → 工具类或一次性类名，不报
    const definers = classIndex.get(token) ?? [];

    return definers.length > 0 && !definers.includes(slug);
  });

  return [
    ...bare.slice(0, 8).map((token): Finding => ({
      level: "warn",
      message: `裸类名 \`.${token}\` 在页面里用了、本课 style.css 与组件 <style> 都没定义（§6）`,
    })),
    ...(bare.length > 8
      ? [{ level: "warn", message: `…另有 ${bare.length - 8} 个裸类名未列出` } as Finding]
      : []),
  ];
};

/**
 * ⑤a 重写共享选择器（§8：只许覆盖 --page-gap/--stack-gap）
 *
 * @param css 本课 `style.css` 全文
 * @returns 重写了共享选择器的发现
 */
const checkProtectedSelectors = (css: string): Finding[] =>
  PROTECTED_SELECTORS.flatMap(([label, pattern]) =>
    pattern.test(css)
      ? [
          {
            level: "error",
            message:
              `重写了共享选择器 ${label} —— 这类选择器属于"全仓视觉契约"，课内改它只会改这一门课、其余课件不变（§8）。` +
              `请复查这里：你要调的是密度（改 :root 的 --page-gap / --stack-gap），还是想新增一条共享原子？` +
              `后者应该加在 workspace/shared，不要在本课覆写。`,
          },
        ]
      : [],
  );

/**
 * ⑤b 在 `:root` 里覆盖了非密度变量（§8）。
 *
 * **只查 `:root` 块内部**：§8 禁的是"改全局默认值"。类作用域里的自定义属性是**官方旋钮**—— 正本 `.split-wide` 的 `--cols` 就是留给课件写
 * `.fig-wide { --cols: … }` 变体用的 （`atoms.css` 的 `.fig-narrow` 自己就是这么写的），把它报成越权是误报（真踩过：2.4 的
 * `.fig-wide`）。
 *
 * @param css 本课 `style.css` 全文
 * @returns `:root` 里覆盖了非密度变量的发现
 */
const checkRootOverrides = (css: string): Finding[] => {
  const findings: Finding[] = [];
  let rootDepth = 0;

  css.split("\n").forEach((line, index) => {
    // 进出 :root 块（:root 规则内不会嵌套花括号，数大括号深度即可）
    if (/:root\s*\{/u.test(line)) {
      rootDepth = 1;
    } else if (rootDepth > 0) {
      rootDepth += (line.match(/\{/gu) ?? []).length - (line.match(/\}/gu) ?? []).length;

      if (rootDepth <= 0) rootDepth = 0;
    }

    if (rootDepth === 0) return;

    const varName = ROOT_VAR.exec(line)?.groups?.var ?? "";

    if (varName && !ALLOWED_ROOT_OVERRIDES.has(varName)) {
      findings.push({
        level: "error",
        message:
          `style.css:${index + 1} 在 :root 里覆盖了非密度变量 ${varName} —— 这是全仓配色 / 圆角的统一口径，` +
          `本课改掉、别的课照旧，同一套课件会呈现两种视觉（§8）。请复查：真需要这个值吗？` +
          `需要就先提升成共享 token（workspace/shared），不要在课内改。`,
      });
    }
  });

  return findings;
};

/**
 * ⑤ 边框纪律：左侧竖线（`.problem` / `.key`）只给"弱提示性文字"用，主体内容不套（§4）。
 *
 * 页面里常见的误用是把题干/解析整段套进 `.problem`。这里只报**可疑**信号， 不改语义——因为单看 class 认不出"这段是不是弱提示"，交给人判断。
 *
 * @param sources 本课 slides.md + 组件源码
 * @returns 疑似把主体内容套进 `.problem` 的发现
 */
const checkBorderMisuse = (sources: string): Finding[] => {
  const lines = sources.split("\n");
  const findings: Finding[] = [];
  // 题干段落的特征词：出现在"这一段是题干"的上下文里
  const stemHint = /题干|下列|如图|如图所示|一个物体|质量为|求|已知/u;

  lines.forEach((line, index) => {
    if (!/class="[^"]*\bproblem\b/u.test(line)) return;
    if (!stemHint.test(line)) return;

    findings.push({
      level: "warn",
      message: `第 ${index + 1} 行疑似把"题干/主体内容"套进了 .problem（左侧竖线只给弱提示文字用，§4）`,
    });
  });

  return findings.slice(0, 5);
};

/**
 * ⑥ 竖线滥用：`.key` 的左侧竖线只给"这一页的落点"用，**一页最多一处**（§4）。
 *
 * 实测最常见的滥用：把**每一步解析/推导**都套成 `.key`（1.3 第 18 页曾一页 6 处）， 满屏金/蓝竖线，既没信息量又把落点淹掉。推导步骤应当是普通段落。
 *
 * ⚠️ 只传 `slides.md` 本体：`courseSources()` 是把 slides.md 与组件源码拼起来的， 拼起来后 `---`
 * 分页会失效、把不同页甚至不同文件当成一页（自测时就咬过一次 1.x-vectors）。
 *
 * @param slidesMd `courses/<slug>/slides.md` 正文
 * @returns 同页 `.key` 多于一处 的发现
 */
const checkKeyOveruse = (slidesMd: string): Finding[] => {
  // 相邻命中必然同页；`---` 分隔线之间算一页，末尾那一段也算一页
  const pages: number[][] = [[]];

  slidesMd.split("\n").forEach((line, index) => {
    if (/^---\s*$/u.test(line)) pages.push([]);
    else if (/class="[^"]*\bkey(?:-\w+)?\b[^"]*"/u.test(line)) pages.at(-1)?.push(index + 1);
  });

  // 分级：2 处只是"可能"，交给执行者判断；≥3 处几乎必然是"把每一步解析都套了竖线"
  const findings: Finding[] = pages
    .filter((hits) => hits.length >= 2)
    .map((hits) => ({
      level: hits.length >= 3 ? "error" : "warn",
      message:
        hits.length >= 3
          ? `同一页有 ${hits.length} 处 .key（行 ${hits.join("、")}）—— 极可能把每一步解析 / 推导都套成了竖线，请逐条复判：只留落点那一条，其余改普通段落（§4）`
          : `同一页有 2 处 .key（行 ${hits.join("、")}）—— 若第二处确实是旁注 / 易错警示，可以保留；否则只留这一页的落点，其余改普通段落（§4）`,
    }));

  // 只列前 6 页，但**必须把总数说出来**——否则执行者会以为"只有这几处"
  // （真踩过：1.3 实际 16 页，执行者只看到 6 条）
  if (findings.length <= 6) return findings;

  return [
    ...findings.slice(0, 6),
    {
      level: findings.some((item) => item.level === "error") ? "error" : "warn",
      message:
        `…另有 ${findings.length - 6} 页存在同类问题（本课合计 ${findings.length} 页）。` +
        `请用 \`grep -n 'class="[^"]*\\bkey' courses/<slug>/slides.md\` 逐页排查，不要只改上面列出的几页`,
    },
  ];
};

/**
 * ④ 配色是否跑偏：整门课出现 **≥5 个不在 token 表里的颜色** 就提醒一句。
 *
 * 依据（教师意见）：偶尔一个过渡色可以忽略；但一门课冒出十几个自己的颜色，说明"这套 PPT 的配色已经跟全仓不一样了"， 值得停下来问一句"这是有意的吗"。少于 5
 * 个不报——避免把正常的局部描边变成噪音。
 *
 * @param unknownColors 本课 style.css 里出现的"非 token"颜色 → 次数
 * @returns 配色提醒
 */
const checkColorPalette = (unknownColors: Map<string, number>): Finding[] => {
  if (unknownColors.size < 5) return [];

  const list = [...unknownColors]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([hex, count]) => `${hex}${count > 1 ? `×${count}` : ""}`)
    .join("、");

  return [
    {
      level: "warn",
      message:
        `本课 style.css 用了 ${unknownColors.size} 个不在 token 表里的颜色（${list}${unknownColors.size > 8 ? "…" : ""}）。` +
        `我们这套体系的思路是"配色只有暖金 / 深蓝 / 红 / 蓝 / 青那几支主色 + 一组中性色阶，其余靠透明度与 color-mix 变化"` +
        `——你检查一下这些新颜色是不是必要的？若只是中间过渡色，建议换回 var(--c-*)（§3）`,
    },
  ];
};

/**
 * ⑦ 调色板工具类（§3 的另一条腿）：`text-emerald-400` 和 `#34d399` 是**同一件事**—— 都是"绕过 token 写死颜色"。所以按同一条规则处理：
 *
 * - 取值**等于已存在的 token** ⇒ `error`（共享 token 一旦调色，这些地方不会跟着变）
 * - 取值**不在 token 表里** ⇒ 记账；整门课出现 ≥5 种不同调色板色 ⇒ `warn`（配色可能跑偏）
 *
 * @param sources 本课 slides.md + 组件源码
 * @returns 调色板工具类的发现
 */
const checkPaletteClasses = (sources: string): Finding[] => {
  const counts = new Map<string, number>();
  // 注释行不算：注释里为了说明问题写到类名（如"把 text-amber-300 换掉"）不该被当成真实用法
  const code = sources
    .split("\n")
    .filter((line) => !/^\s*(?:\/\*|\*|\/\/|<!--)/u.test(line))
    .join("\n");

  for (const match of code.matchAll(PALETTE_CLASS)) {
    const key = `${match.groups?.family}-${match.groups?.shade}`;

    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  if (counts.size === 0) return [];

  const same = [...counts].filter(([key]) => PALETTE_TO_TOKEN[key]);
  const unknown = [...counts].filter(([key]) => !PALETTE_TO_TOKEN[key]);
  const findings: Finding[] = [];

  for (const [key, count] of same.sort((a, b) => b[1] - a[1]).slice(0, 5)) {
    findings.push({
      level: "error",
      message:
        `\`${key}\` 用了 ${count} 处 —— 它的取值就是 \`${PALETTE_TO_TOKEN[key]}\` 的值，属于"绕过 token 写死颜色"。` +
        `请复查：这里该用语义类（\`.text-dim\` / \`.ok-line\` / \`.bad-line\`…）还是 \`style="color: var(${PALETTE_TO_TOKEN[key]})"\`？` +
        `共享 token 以后一调色，这些调色板类不会跟着变（§3）`,
    });
  }

  if (same.length > 5) {
    findings.push({
      level: "error",
      message: `…另有 ${same.length - 5} 种"取值等于 token"的调色板类未列出（本课合计 ${same.length} 种），请用 \`grep -rhoE '(text|bg|border|fill|stroke)-[a-z]+-[0-9]+' courses/<slug>\` 逐处排查`,
    });
  }

  if (unknown.length >= 5) {
    findings.push({
      level: "warn",
      message:
        `本课还用了 ${unknown.length} 种**不在 token 表里**的调色板色（${unknown
          .slice(0, 8)
          .map(([key, count]) => `${key}×${count}`)
          .join("、")}${unknown.length > 8 ? "…" : ""}）。` +
        `我们的思路是"配色只有那几支主色 + 一组中性色阶"——你看看这些是不是必要？必要的话应该在 workspace/shared 补成共享 token，而不是各课自己用调色板（§3）`,
    });
  }

  return findings;
};

const auditCourse = (
  slug: string,
  classIndex: Map<string, string[]>,
): { findings: Finding[]; cards: number; icons: number; customClasses: number } => {
  const dir = path.join(COURSES_DIR, slug);
  const css = read(path.join(dir, "style.css"));
  const sources = courseSources(dir);
  const slidesMd = read(path.join(dir, "slides.md"));
  const unknownColors = new Map<string, number>();
  const { cards, findings: cardFindings } = checkCards(sources);
  const icons = [...sources.matchAll(ICON)].length;
  const defined = courseDefinedClasses(dir, css);

  const findings: Finding[] = [
    ...cardFindings,
    ...checkIconCount(icons),
    ...checkIconSizes(sources),
    ...css.split("\n").flatMap((line, index) => checkCssLine(line, index, unknownColors)),
    ...checkColorPalette(unknownColors),
    ...checkBareClasses(slug, css, sources, classIndex),
    ...checkBorderMisuse(sources),
    ...checkKeyOveruse(slidesMd),
    ...checkPaletteClasses(sources),
    ...checkProtectedSelectors(css),
    ...checkRootOverrides(css),
  ];

  return {
    findings,
    cards,
    icons,
    customClasses: [...defined].filter((name) => !SHARED_ATOMS.has(name)).length,
  };
};

const targets = process.argv.slice(2);
const slugs =
  targets.length > 0
    ? targets
    : readdirSync(COURSES_DIR).filter((name) =>
        existsSync(path.join(COURSES_DIR, name, "slides.md")),
      );

let flagged = 0;
/** 全仓类名索引只建一次（跨课裸类名判定用） */
const classIndex = buildCourseClassIndex();

for (const slug of slugs) {
  const { findings, cards, icons, customClasses } = auditCourse(slug, classIndex);
  const errors = findings.filter((item) => item.level === "error").length;
  const warns = findings.filter((item) => item.level === "warn").length;

  if (findings.length === 0) {
    console.log(`✅ ${slug}  卡片 ${cards} · 图标 ${icons} · 自造类 ${customClasses}`);
    continue;
  }

  if (errors > 0) flagged += 1;

  const mark = errors > 0 ? "❌" : warns > 0 ? "⚠️" : "ℹ️";
  const tail = [errors > 0 ? `错误 ${errors}` : "", warns > 0 ? `警告 ${warns}` : ""]
    .filter(Boolean)
    .join(" · ");

  console.log(
    `\n${mark} ${slug}  卡片 ${cards} · 图标 ${icons} · 自造类 ${customClasses}${tail ? `  [${tail}]` : ""}`,
  );
  for (const item of findings) {
    const prefix = item.level === "error" ? "✗" : item.level === "warn" ? "!" : "·(建议)";
    console.log(`   ${prefix} ${item.message}`);
  }
}

console.log(
  `\n── ${slugs.length} 门课，${flagged} 门有**错误**级发现（警告级由执行者判断，不阻塞）。` +
    `口径见 .agents/notes/style-guide.md；存量课件"谁改谁收敛"。`,
);
