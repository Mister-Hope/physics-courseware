/**
 * 幻灯片布局溢出检测。
 *
 * 判定标准：**元素的可见矩形（已被祖先 overflow 裁剪后的部分）超出了幻灯片画布** —— 画布就是 `#slide-content`（980×552 的逻辑 16:9
 * 区域，屏幕上按等比缩放显示）。
 *
 * 之所以要看"裁剪后的矩形"，是因为课件里大量装饰性光晕（`blur` + 绝对定位）会被父级 `overflow-hidden` 裁掉，它们永远不会漏到投影画面外，不应算作溢出。
 */

/** 四边溢出量（逻辑像素，正数表示超出画布） */
export interface OverflowEdges {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface OverflowViolation {
  /** 给人和 agent 看的 DOM 路径（含 class，最多 5 段） */
  path: string;
  /** 可直接 `querySelector` 的稳定选择器（相对幻灯片根，tag + :nth-of-type，不截断） */
  selector: string;
  /** 从幻灯片根逐级 children 下标：唯一、无歧义，标注截图红框时按它下钻 */
  indexPath: number[];
  tag: string;
  id?: string;
  /** 语义化的类名（已剔除 vue scope 与 slidev 页码类） */
  classes: string[];
  /** 元素可见文本（截断） */
  text: string;
  /** 四边溢出量（逻辑像素） */
  overflow: OverflowEdges;
  /** 溢出的方向，如 ["bottom"] */
  directions: string[];
  /** 最大的那个溢出量，用于排序 */
  severity: number;
  /** 元素矩形（逻辑像素，相对画布左上角） */
  rect: { x: number; y: number; width: number; height: number };
  /** 是否是最外层溢出元素（父级都没溢出 → 通常是"根因"，改它最有效） */
  outermost: boolean;
  /** 该元素内部还有多少个子元素同样溢出（改外层就能一起解决） */
  nested: number;
  ariaHidden: boolean;
  position: string;
}

/** 「内容底部」的定位信息（报告里用来说明"最后一行内容是什么"，便于直接去改那一块） */
export interface ContentBottomElement {
  /** 给人和 agent 看的 DOM 路径（含 class，最多 5 段） */
  path: string;
  /** 可直接 `querySelector` 的稳定选择器（相对幻灯片根） */
  selector: string;
  indexPath: number[];
  tag: string;
  classes: string[];
  /** 元素可见文本（截断） */
  text: string;
  /** 元素矩形（逻辑像素，相对画布左上角） */
  rect: { x: number; y: number; width: number; height: number };
}

/**
 * 一个「本步可见元素」的快照（点击稳定性检查用）。
 *
 * `key` 是**稳定标识**（tag + class + id / data-* / aria-label / role + 自身文本），用于相邻两步之间配对，
 * **不含数组下标**——否则插入一个元素会让后面所有元素错位配对，凭空报出一堆假位移。
 */
export interface VisibleElementSnapshot {
  /** 稳定标识（两步之间配对用；同页出现完全相同的元素时追加 `~2`、`~3` 去重） */
  key: string;
  /** 给人和 agent 看的 DOM 路径（含 class，最多 5 段） */
  path: string;
  /** 可直接 `querySelector` 的稳定选择器（相对幻灯片根） */
  selector: string;
  indexPath: number[];
  tag: string;
  id?: string;
  classes: string[];
  /** 元素自身文本（只看直接文本节点，不含后代——后代的出现/消失不该改变父元素的标识） */
  text: string;
  /** 元素矩形（逻辑像素，相对画布左上角） */
  rect: { x: number; y: number; width: number; height: number };
  /** 命中 `E2E_STABILITY_IGNORE` 白名单（仍记录，但不算位移违例） */
  ignored: boolean;
}

/**
 * 页面底部留白测量（逻辑像素）。
 *
 * 「内容底部」= 该页**最靠下的可见内容元素**的 bottom；「留白」= 画布高度（552）− 内容底部。
 *
 * ⚠️ 不能用 `.slidev-layout` 这类铺满画布的容器当内容底部，否则留白恒为 0。所有排除规则见 `measureLayout` 里的内容元素判定。
 */
export interface WhitespaceMeasurement {
  /** 内容底部到画布顶部的距离（逻辑像素），= 552 − whitespace */
  contentBottom: number;
  /** 画布底部到内容底部的留白（逻辑像素）；负数表示内容已经越过画布底部 */
  whitespace: number;
  /** 留白占画布高度的比例（1 = 整页空白，0 = 内容刚好到底）；负数表示溢出 */
  ratio: number;
  /** 最靠下的内容元素（没量到内容元素时为 undefined，此时留白按 0 处理） */
  element?: ContentBottomElement;
}

/**
 * 正文越出 `.page-grow` 可用区域的一次记录。
 *
 * `.page-grow` 是「正文容器」（`flex:1` + `justify-content:center`，见各课件的 `style.css`）：正文总高超过它的
 * 可用高度时，垂直居中会让内容**同时向上顶出容器**（首行叠到页面大标题 `h1` 上）**并超出下边界**被裁掉。 这既不是越出 980×552
 * 画布（溢出检查不报），也不是点击位移（稳定性检查不报），底部留白反而很小（留白检查也不报）， 所以必须单独量一次。
 */
export interface BlockFitViolation {
  /** 给人和 agent 看的 DOM 路径（含 class，最多 5 段） */
  path: string;
  /** 可直接 `querySelector` 的稳定选择器（相对幻灯片根） */
  selector: string;
  indexPath: number[];
  tag: string;
  id?: string;
  classes: string[];
  /** 元素可见文本（截断） */
  text: string;
  /** 越界方向：`top` = 顶出上边界（叠到标题上），`bottom` = 超出下边界 */
  directions: ("top" | "bottom")[];
  /** 顶出 `.page-grow` padding box 上边界的像素（正数 = 顶出） */
  overflowTop: number;
  /** 超出下边界的像素（正数 = 超出） */
  overflowBottom: number;
  /** 两个方向里较大的越界量（排序用） */
  severity: number;
  /** 元素矩形（画布逻辑像素，相对画布左上角） */
  rect: { x: number; y: number; width: number; height: number };
  /** 是否是最外层越界元素（父级都没越界 → 通常是"根因"，改它最有效） */
  outermost: boolean;
  /** 内部还有多少个子元素同样越界（改外层即可一起解决） */
  nested: number;
  ariaHidden: boolean;
  position: string;
  /** 命中 `E2E_BLOCK_IGNORE` 白名单（仍记录，但不计入违例统计） */
  ignored: boolean;
}

/** 一页某一状态下的「正文越出 `.page-grow` 可用区域」测量 */
export interface BlockFitMeasurement {
  /** 该页是否有 `.page-grow`（封面等没有正文容器的页面直接跳过） */
  present: boolean;
  /** `.page-grow` 的 padding box（画布逻辑像素；该页有多个容器时取第一个） */
  box?: { x: number; y: number; width: number; height: number };
  /** 顶出上边界的最大像素（只统计未命中白名单的元素） */
  overflowTop: number;
  /** 超出下边界的最大像素（只统计未命中白名单的元素） */
  overflowBottom: number;
  /** 越界元素个数（不含命中白名单的） */
  overflowCount: number;
  /** 命中白名单、只记录不计违例的越界元素个数 */
  ignoredCount: number;
  /** 越界元素（outermost 排前，其次按越界量从大到小） */
  elements: BlockFitViolation[];
}

export interface LayoutMeasureResult {
  slide?: number;
  title: string;
  state: string;
  clicks: number;
  canvas: { width: number; height: number; scale: number };
  /** 参与检查的元素总数（已排除 display:none / 全透明 / 零尺寸的） */
  scanned: number;
  /** 这一页渲染失败（Slidev 的错误占位页）：此时"没有溢出"毫无意义，必须单独报出来 */
  renderError: boolean;
  violations: OverflowViolation[];
  /** 页面底部留白（"内容挤在上半页"的教学问题，与溢出相反方向的体检） */
  whitespace: WhitespaceMeasurement;
  /** 正文是否越出 `.page-grow` 的可用区域（顶出上边界 / 超出下边界） */
  blockFit: BlockFitMeasurement;
  /**
   * 本步所有可见元素的快照（仅在 payload 传 `collectElements: true` 时返回）。
   *
   * 点击稳定性检查（`stability-scan.ts`）复用它——与溢出/留白**共用同一轮遍历与同一套可见性口径**，
   * 不会出现"溢出扫描认为不可见、稳定性扫描认为可见"这种两套口径的问题。
   */
  elements?: VisibleElementSnapshot[];
}

export interface LayoutMeasurePayload {
  rootSelector: string;
  tolerance: number;
  slide?: number;
  title?: string;
  state: string;
  clicks: number;
  /** 是否额外返回本步可见元素快照（默认 false，避免给既有报告塞入大量数据） */
  collectElements?: boolean;
  /** 命中这些 CSS 选择器的元素标记为 `ignored`（稳定性白名单，例如天然会动的手风琴段落） */
  ignoreSelectors?: string[];
  /** 正文越界判定容差（逻辑像素，默认 1；超过它才算"顶出 / 超出"） */
  blockTolerance?: number;
  /** 正文越界白名单选择器（`E2E_BLOCK_IGNORE`，命中只记录不计违例） */
  blockIgnoreSelectors?: string[];
}

/**
 * 在浏览器里跑：测量一个根元素内部所有「可见矩形越出画布」的元素。
 *
 * ⚠️ 这个函数会被 `page.evaluate` 序列化后注入页面，因此**必须自包含**： 不能引用模块作用域里的任何变量或函数。
 */
export function measureLayout(payload: LayoutMeasurePayload): LayoutMeasureResult {
  const ROUND = (value: number, digits = 1) => {
    const factor = 10 ** digits;

    return Math.round(value * factor) / factor;
  };
  /** 这些标签不参与布局检查（都是不渲染盒子的元数据标签） */
  const IGNORED_TAGS = ["SCRIPT", "STYLE", "LINK", "META", "TEMPLATE", "NOSCRIPT", "BR", "WBR"];
  /** 小于这个尺寸的可见矩形视为"被裁没了" */
  const MIN_VISIBLE_SIZE = 0.5;
  /** 累计透明度低于这个值的元素视为不可见（v-click 未展开的动画元素） */
  const MIN_OPACITY = 0.05;
  const { rootSelector, tolerance, slide, state, clicks } = payload;
  const collectElements = payload.collectElements === true;
  const ignoreSelectors = payload.ignoreSelectors ?? [];
  const blockIgnoreSelectors = payload.blockIgnoreSelectors ?? [];
  /** 正文越界容差：默认 1px（超过它才算"顶出上边界 / 超出下边界"） */
  const blockTolerance = payload.blockTolerance ?? 1;
  const root = document.querySelector(rootSelector);

  /** 没有正文容器 / 没量到内容时的空结果 */
  const emptyBlockFit = (): BlockFitMeasurement => ({
    present: false,
    overflowTop: 0,
    overflowBottom: 0,
    overflowCount: 0,
    ignoredCount: 0,
    elements: [],
  });

  if (!root) {
    return {
      slide,
      title: payload.title ?? "",
      state,
      clicks,
      canvas: { width: 0, height: 0, scale: 1 },
      scanned: 0,
      renderError: true,
      violations: [],
      whitespace: { contentBottom: 0, whitespace: 0, ratio: 0 },
      blockFit: emptyBlockFit(),
      elements: collectElements ? [] : undefined,
    };
  }

  const canvasElement = (document.querySelector("#slide-content") ?? root) as HTMLElement;
  const canvasRect = canvasElement.getBoundingClientRect();
  const logicalWidth = canvasElement.offsetWidth || 980;
  const logicalHeight = canvasElement.offsetHeight || 552;
  const scale = canvasRect.width / logicalWidth || 1;

  /** 累计祖先 opacity */
  const effectiveOpacity = (element: Element): number => {
    let opacity = 1;
    let current: Element | null = element;

    while (current) {
      opacity *= Number.parseFloat(getComputedStyle(current).opacity) || 0;
      if (opacity < MIN_OPACITY) return opacity;
      if (current === root) break;
      current = current.parentElement;
    }

    return opacity;
  };

  /**
   * 元素矩形与所有祖先 overflow 容器求交，得到"真正能看见"的范围。
   *
   * 已知局限：`position: fixed` 的后代其实不受祖先裁剪影响，但课件里没有这种结构； 只按 border box 计算，不含 `box-shadow` / `filter:
   * blur` 的绘制溢出。
   */
  const visibleRect = (
    element: Element,
  ): { left: number; right: number; top: number; bottom: number } => {
    const rect = element.getBoundingClientRect();
    let { left, right, top, bottom } = rect;
    let parent = element.parentElement;

    while (parent && parent !== root) {
      const style = getComputedStyle(parent);

      if (style.overflowX !== "visible" || style.overflowY !== "visible") {
        const parentRect = parent.getBoundingClientRect();

        if (style.overflowX !== "visible") {
          left = Math.max(left, parentRect.left);
          right = Math.min(right, parentRect.right);
        }

        if (style.overflowY !== "visible") {
          top = Math.max(top, parentRect.top);
          bottom = Math.min(bottom, parentRect.bottom);
        }
      }

      parent = parent.parentElement;
    }

    return { left, right, top, bottom };
  };

  const describePath = (element: Element): string => {
    const parts: string[] = [];
    let current: Element | null = element;

    while (current && current !== root && parts.length < 5) {
      const own = [...current.classList].filter(
        (name) => !name.startsWith("data-v") && !name.startsWith("slidev-page"),
      );

      parts.unshift(
        `${current.tagName.toLowerCase()}${own
          .slice(0, 3)
          .map((name) => `.${name}`)
          .join("")}`,
      );
      current = current.parentElement;
    }

    return parts.join(" > ") || rootSelector;
  };

  /**
   * 相对 root 的 `:nth-of-type` 选择器链（**不截断**）。
   *
   * 首段一定是 root 的直系子元素，所以报告里拼 `.slidev-page[...] > <selector>` 是成立的。 深层元素（KaTeX 内部动辄 20
   * 层）链会很长，但只有溢出元素才会被打印。
   */
  const describeSelector = (element: Element): string => {
    const parts: string[] = [];
    let current: Element | null = element;

    while (current && current !== root) {
      const parent: Element | null = current.parentElement;
      const index = parent
        ? [...parent.children]
            .filter((item) => item.tagName === current?.tagName)
            .indexOf(current) + 1
        : 1;

      parts.unshift(`${current.tagName.toLowerCase()}:nth-of-type(${index})`);
      current = parent;
    }

    return parts.join(" > ");
  };

  /**
   * 从 root 逐级 children 下标（唯一、无歧义）。
   *
   * 标注红框时按它下钻，避免 `querySelector` 在任意深度上匹配到同 tag 的别的元素。
   */
  const describeIndexPath = (element: Element): number[] => {
    const path: number[] = [];
    let current: Element | null = element;

    while (current && current !== root) {
      const parent: Element | null = current.parentElement;

      if (!parent) break;

      path.unshift([...parent.children].indexOf(current));
      current = parent;
    }

    return path;
  };

  /**
   * 元素文本（含后代，折叠空白后截断）。
   *
   * 用 `textContent` 而不是 `innerText`：v-click 用 opacity 隐藏元素、DOM 仍在，`textContent` 不会随之变化； 只有 `v-if`
   * 真删真插才会变——正是我们想区分的情况。含后代文本还能让 `v-for` 出来的同款条目 （如 `pa-step`，文字在子 `<span>`
   * 里）各自有不同标识，避免"按出现顺序错位配对"。
   */
  const elementText = (element: Element, limit: number): string =>
    (element.textContent ?? "").trim().replace(/\s+/gu, " ").slice(0, limit);

  /** 参与稳定标识的语义属性（不含 Vue scope / Slidev 内部类，它们会随点击状态变化） */
  const IDENTITY_ATTRS = [
    "id",
    "data-testid",
    "data-key",
    "data-id",
    "data-name",
    "data-role",
    "aria-label",
    "role",
  ];

  /** 语义 class（剔除 Vue scope 与 Slidev 内部类，后者会随点击状态变化） */
  const semanticClasses = (element: Element): string[] =>
    [...element.classList].filter(
      (name) => !name.startsWith("data-v") && !name.startsWith("slidev-"),
    );

  /**
   * 祖先结构路径（tag + 语义 class，**不含下标**，最多往上 3 层）。
   *
   * 这是稳定标识的关键一环：例如 KaTeX 的行内 `<svg>` 与课件里的大 `<svg>` 若只按 tag 标识会撞车， 其中一个出现后就会让另一个"错位配对"、报出几百像素的假位移。
   */
  const describeAncestors = (element: Element): string => {
    const parts: string[] = [];
    let current = element.parentElement;
    let depth = 0;

    while (current && current !== root && depth < 3) {
      const own = semanticClasses(current)
        .slice(0, 2)
        .map((name) => `.${name}`)
        .join("");

      parts.unshift(`${current.tagName.toLowerCase()}${own}`);
      current = current.parentElement;
      depth += 1;
    }

    return parts.join(">");
  };

  /**
   * 稳定标识：祖先结构路径 + tag + 语义 class + id / data-* / aria-label / role + 文本。
   *
   * ⚠️ 刻意**不含任何 DOM 下标**：否则前面插入一个元素，后面所有元素下标平移，会错位配对、凭空报出假位移。
   */
  const describeKey = (element: Element): string => {
    const attrs = IDENTITY_ATTRS.map((name) => element.getAttribute(name))
      .filter((value): value is string => Boolean(value))
      .join(",");

    return [
      describeAncestors(element),
      element.tagName.toLowerCase(),
      semanticClasses(element).slice(0, 4).join("."),
      attrs,
      elementText(element, 60),
    ]
      .filter(Boolean)
      .join("|");
  };

  /** 白名单选择器匹配（选择器写错不该让整轮扫描崩掉） */
  const matchesAny = (element: Element, selectors: string[]): boolean =>
    selectors.some((selector) => {
      try {
        return element.matches(selector);
      } catch {
        return false;
      }
    });

  const isIgnored = (element: Element): boolean => matchesAny(element, ignoreSelectors);
  const isBlockIgnored = (element: Element): boolean => matchesAny(element, blockIgnoreSelectors);

  /**
   * 只取"文档流里的盒子"：
   *
   * - SVG 内部（`<path>` / `<line>` / `<defs>` 里的 marker 等）不是文档流布局，固定尺寸的 SVG 内部 允许用 `v-if` 换内容（见
   *   AGENTS.md），它们的矩形还常是 KaTeX 的"超长路径"这类绘图值；
   * - KaTeX 内部（`.katex` 里几十层 `<span>`）同理，是公式的排版细节，公式盒子被顶跑才算布局问题。 两者的**根元素本身**照常参与。
   */
  const isLayoutBox = (element: Element): boolean => {
    const tag = element.tagName.toLowerCase();
    const insideSvg = tag !== "svg" && element.closest("svg") !== null;
    const katexRoot = element.closest(".katex");

    return !insideSvg && !(katexRoot !== null && katexRoot !== element);
  };

  /** 元素定位信息（DOM 路径 / 稳定选择器 / 下标链 / tag / 语义 class） */
  const elementInfo = (
    element: Element,
  ): {
    path: string;
    selector: string;
    indexPath: number[];
    tag: string;
    classes: string[];
  } => ({
    path: describePath(element),
    selector: describeSelector(element),
    indexPath: describeIndexPath(element),
    tag: element.tagName.toLowerCase(),
    classes: [...element.classList].filter((name) => !name.startsWith("data-v")),
  });

  const found: {
    element: Element;
    edges: OverflowEdges;
    severity: number;
    rect: DOMRect;
    directions: string[];
  }[] = [];
  const seen = new Set<Element>();
  /** 稳定性扫描的原始采集（key 去重放到遍历结束后统一处理，保证同 key 元素编号稳定） */
  const collected: { element: Element; key: string; ignored: boolean }[] = [];
  let scanned = 0;

  /** 铺满画布的容器（`#slide-content` / `.slidev-layout` 等）不是"内容"，量留白时必须排除 */
  const PAGE_CONTAINER_SELECTOR =
    "#slide-content, #slide-container, #slideshow, .slidev-layout, .slidev-page, .global-top, .global-bottom";

  /**
   * 判断一个元素能不能代表"页面内容底部"。
   *
   * 排除的都是**不是内容**或**必然贴到画布底部**的东西，否则留白会被算成 0：
   *
   * - 页面容器自身（`.slidev-layout` 铺满 552px，它的 bottom 就是画布底部）
   * - 铺满整个画布高度的元素（背景 / 全高布局容器 / `inset-y-0` 装饰条）
   * - 跨页固定层（顶栏 / 底栏）与 `position: fixed` 元素
   * - `aria-hidden="true"` 的纯装饰（例如封面右下角那幅贴底的对角线矢量图）
   */
  const isContentBottomCandidate = (
    element: Element,
    visible: { top: number; bottom: number },
  ): boolean => {
    if (element.matches(PAGE_CONTAINER_SELECTOR)) return false;
    if (element.closest(".global-top, .global-bottom")) return false;
    if (element.closest('[aria-hidden="true"]')) return false;
    if (getComputedStyle(element).position === "fixed") return false;
    // 铺满整个画布高度 = 容器 / 背景，不是一行内容
    if (visible.bottom - visible.top >= logicalHeight - 2) return false;

    return true;
  };

  let lowestContent:
    | { element: Element; visible: { left: number; right: number; top: number; bottom: number } }
    | undefined;

  // ── 正文越界（`.page-grow` 的可用区域）──
  // 判定：可见内容元素的可见矩形与 `.page-grow` 的 **padding box** 求交，顶出上边界 / 超出下边界的记为越界。
  // 内容比容器高时 `justify-content:center` 会让它两头都冒出容器：上面叠到 h1、下面被裁掉。
  /** `.page-grow` 的 padding box（按容器缓存，避免每个元素都重算一遍样式） */
  const blockBoxes = new Map<
    Element,
    { left: number; right: number; top: number; bottom: number }
  >();
  const paddingBoxOf = (
    holder: Element,
  ): { left: number; right: number; top: number; bottom: number } => {
    const cached = blockBoxes.get(holder);

    if (cached) return cached;

    const rect = holder.getBoundingClientRect();
    const style = getComputedStyle(holder);
    /** `parseFloat("medium")` → NaN（border-style 为 none 时宽度是关键字），兜底成 0 */
    const border = (value: string): number => Number.parseFloat(value) || 0;
    const box = {
      left: rect.left + border(style.borderLeftWidth),
      right: rect.right - border(style.borderRightWidth),
      top: rect.top + border(style.borderTopWidth),
      bottom: rect.bottom - border(style.borderBottomWidth),
    };

    blockBoxes.set(holder, box);

    return box;
  };
  const blockFound: {
    element: Element;
    overTop: number;
    overBottom: number;
    rect: DOMRect;
    ignored: boolean;
  }[] = [];

  for (const element of root.querySelectorAll("*")) {
    if (IGNORED_TAGS.includes(element.tagName)) continue;

    const style = getComputedStyle(element);

    if (style.display === "none" || style.visibility === "hidden") continue;

    const rect = element.getBoundingClientRect();

    if (rect.width <= MIN_VISIBLE_SIZE || rect.height <= MIN_VISIBLE_SIZE) continue;
    if (effectiveOpacity(element) < MIN_OPACITY) continue;

    const visible = visibleRect(element);

    if (
      visible.right - visible.left <= MIN_VISIBLE_SIZE ||
      visible.bottom - visible.top <= MIN_VISIBLE_SIZE
    )
      continue;

    scanned += 1;

    // 稳定性扫描：记录本步可见元素（同一轮遍历、同一套可见性过滤，绝不另起一套口径）
    if (collectElements && isLayoutBox(element))
      collected.push({ element, key: describeKey(element), ignored: isIgnored(element) });

    // 正文越界：与 `.page-grow` 的 padding box 比较（同一轮遍历、同一套可见性口径）。
    // 排除 `.page-grow` 自身、跨页固定层、`aria-hidden` 纯装饰与固定定位元素——与留白测量同一套排除逻辑。
    const blockHolder = element.closest(".page-grow");

    if (
      blockHolder &&
      blockHolder !== element &&
      isLayoutBox(element) &&
      !element.closest(".global-top, .global-bottom") &&
      !element.closest('[aria-hidden="true"]') &&
      style.position !== "fixed"
    ) {
      const box = paddingBoxOf(blockHolder);
      const overTop = box.top - visible.top;
      const overBottom = visible.bottom - box.bottom;

      if (overTop > blockTolerance || overBottom > blockTolerance)
        blockFound.push({
          element,
          overTop,
          overBottom,
          rect,
          ignored: isBlockIgnored(element),
        });
    }

    // 留白测量：记录最靠下的可见内容元素（与溢出判定共用同一轮遍历与同一套可见性过滤）
    if (
      logicalHeight > 0 &&
      isContentBottomCandidate(element, visible) &&
      (!lowestContent || visible.bottom > lowestContent.visible.bottom)
    ) {
      lowestContent = { element, visible };
    }

    // 统一换算成画布的逻辑像素：画布 980×552，屏幕上按 scale 等比缩放
    const edges: OverflowEdges = {
      top: ROUND((canvasRect.top - visible.top) / scale),
      right: ROUND((visible.right - canvasRect.right) / scale),
      bottom: ROUND((visible.bottom - canvasRect.bottom) / scale),
      left: ROUND((canvasRect.left - visible.left) / scale),
    };
    const directions = (["top", "right", "bottom", "left"] as const).filter(
      (direction) => edges[direction] > tolerance,
    );

    if (directions.length === 0) continue;

    seen.add(element);
    found.push({
      element,
      edges,
      severity: Math.max(...directions.map((direction) => edges[direction])),
      rect,
      directions,
    });
  }

  const violations: OverflowViolation[] = found.map((item) => {
    let ancestor: Element | null = item.element.parentElement;
    let outermost = true;

    while (ancestor && ancestor !== root) {
      if (seen.has(ancestor)) {
        outermost = false;
        break;
      }

      ancestor = ancestor.parentElement;
    }

    const nested = outermost
      ? found.filter(
          (other) => other.element !== item.element && item.element.contains(other.element),
        ).length
      : 0;

    return {
      path: describePath(item.element),
      selector: describeSelector(item.element),
      indexPath: describeIndexPath(item.element),
      tag: item.element.tagName.toLowerCase(),
      id: item.element.id || undefined,
      classes: [...item.element.classList].filter((name) => !name.startsWith("data-v")),
      text: (item.element instanceof HTMLElement
        ? item.element.innerText
        : item.element.textContent || ""
      )
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 80),
      overflow: item.edges,
      directions: item.directions,
      severity: item.severity,
      rect: {
        x: ROUND((item.rect.left - canvasRect.left) / scale),
        y: ROUND((item.rect.top - canvasRect.top) / scale),
        width: ROUND(item.rect.width / scale),
        height: ROUND(item.rect.height / scale),
      },
      outermost,
      nested,
      ariaHidden: item.element.getAttribute("aria-hidden") === "true",
      position: getComputedStyle(item.element).position,
    };
  });

  const heading = root.querySelector("h1, h2, h3");
  // Slidev 在幻灯片加载失败时会渲染一个错误占位页，页面上只有一个元素；
  // 如果不单独识别，测试会把"整页挂了"当成"没有溢出"放过
  const renderError = /An error occurred on this slide|slide failed to load/iu.test(
    root.textContent ?? "",
  );

  // 「留白」= 画布高度 − 内容底部；量不到任何内容元素时（例如量的是顶栏/底栏）按 0 留白处理，
  // 不能报成"整页空白"
  const contentBottom = lowestContent
    ? ROUND((lowestContent.visible.bottom - canvasRect.top) / scale)
    : logicalHeight;
  const whitespace = ROUND(logicalHeight - contentBottom);
  const whitespaceElement: ContentBottomElement | undefined = lowestContent
    ? {
        path: describePath(lowestContent.element),
        selector: describeSelector(lowestContent.element),
        indexPath: describeIndexPath(lowestContent.element),
        tag: lowestContent.element.tagName.toLowerCase(),
        classes: [...lowestContent.element.classList].filter((name) => !name.startsWith("data-v")),
        text: (lowestContent.element instanceof HTMLElement
          ? lowestContent.element.innerText
          : lowestContent.element.textContent || ""
        )
          .trim()
          .replace(/\s+/g, " ")
          .slice(0, 80),
        rect: {
          x: ROUND((lowestContent.visible.left - canvasRect.left) / scale),
          y: ROUND((lowestContent.visible.top - canvasRect.top) / scale),
          width: ROUND((lowestContent.visible.right - lowestContent.visible.left) / scale),
          height: ROUND((lowestContent.visible.bottom - lowestContent.visible.top) / scale),
        },
      }
    : undefined;

  // ── 正文越界结果：outermost = 根因元素（父级都没越界 → 改它一处就能连带解决子元素）──
  const blockSeen = new Set(blockFound.map((item) => item.element));
  const blockElements: BlockFitViolation[] = blockFound
    .map((item) => {
      const overflowTop = ROUND(Math.max(0, item.overTop));
      const overflowBottom = ROUND(Math.max(0, item.overBottom));
      const directions = (["top", "bottom"] as const).filter(
        (direction) => (direction === "top" ? overflowTop : overflowBottom) > blockTolerance,
      );
      let ancestor: Element | null = item.element.parentElement;
      let outermost = true;

      while (ancestor && ancestor !== root) {
        if (blockSeen.has(ancestor)) {
          outermost = false;
          break;
        }

        ancestor = ancestor.parentElement;
      }

      const nested = outermost
        ? blockFound.filter(
            (other) => other.element !== item.element && item.element.contains(other.element),
          ).length
        : 0;

      return {
        ...elementInfo(item.element),
        id: item.element.id || undefined,
        text: elementText(item.element, 80),
        directions,
        overflowTop,
        overflowBottom,
        severity: Math.max(overflowTop, overflowBottom),
        rect: {
          x: ROUND((item.rect.left - canvasRect.left) / scale),
          y: ROUND((item.rect.top - canvasRect.top) / scale),
          width: ROUND(item.rect.width / scale),
          height: ROUND(item.rect.height / scale),
        },
        outermost,
        nested,
        ariaHidden: item.element.getAttribute("aria-hidden") === "true",
        position: getComputedStyle(item.element).position,
        ignored: item.ignored,
      };
    })
    .sort(
      (left, right) =>
        Number(right.outermost) - Number(left.outermost) ||
        Number(left.ignored) - Number(right.ignored) ||
        right.severity - left.severity ||
        left.path.localeCompare(right.path),
    );

  const countedBlocks = blockElements.filter((item) => !item.ignored);
  const blockHolder = root.querySelector(".page-grow");
  const blockBox = blockHolder ? paddingBoxOf(blockHolder) : undefined;
  const blockFit: BlockFitMeasurement = {
    present: blockHolder !== null,
    box: blockBox
      ? {
          x: ROUND((blockBox.left - canvasRect.left) / scale),
          y: ROUND((blockBox.top - canvasRect.top) / scale),
          width: ROUND((blockBox.right - blockBox.left) / scale),
          height: ROUND((blockBox.bottom - blockBox.top) / scale),
        }
      : undefined,
    overflowTop: countedBlocks.length
      ? ROUND(Math.max(...countedBlocks.map((item) => item.overflowTop)))
      : 0,
    overflowBottom: countedBlocks.length
      ? ROUND(Math.max(...countedBlocks.map((item) => item.overflowBottom)))
      : 0,
    overflowCount: countedBlocks.length,
    ignoredCount: blockElements.length - countedBlocks.length,
    elements: blockElements,
  };
  // 稳定标识去重：完全同款的元素（例如 `v-for` 生成的同款网格线）按 DOM 顺序追加 `~2`、`~3`。
  // 这只是"完全同款"时的兜底，身份仍由 tag/class/文本决定，不是拿 DOM 下标当身份。
  const keyCount = new Map<string, number>();
  const elements: VisibleElementSnapshot[] | undefined = collectElements
    ? collected.map((item) => {
        const occurrence = (keyCount.get(item.key) ?? 0) + 1;
        keyCount.set(item.key, occurrence);

        const rect = item.element.getBoundingClientRect();

        return {
          key: occurrence === 1 ? item.key : `${item.key}~${occurrence}`,
          path: describePath(item.element),
          selector: describeSelector(item.element),
          indexPath: describeIndexPath(item.element),
          tag: item.element.tagName.toLowerCase(),
          id: item.element.id || undefined,
          classes: [...item.element.classList].filter((name) => !name.startsWith("data-v")),
          text: elementText(item.element, 80),
          rect: {
            x: ROUND((rect.left - canvasRect.left) / scale),
            y: ROUND((rect.top - canvasRect.top) / scale),
            width: ROUND(rect.width / scale),
            height: ROUND(rect.height / scale),
          },
          ignored: item.ignored,
        };
      })
    : undefined;

  return {
    slide,
    title:
      payload.title ??
      (heading ? (heading.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60) : ""),
    state,
    // 回显 Slidev 真实点击数（`clicks` 传大数时会被夹到该页的 clicksTotal）
    clicks: window.__slidev__?.nav?.clicks ?? clicks,
    canvas: { width: logicalWidth, height: logicalHeight, scale: ROUND(scale, 4) },
    scanned,
    renderError,
    violations: violations.sort((left, right) => right.severity - left.severity),
    whitespace: {
      contentBottom,
      whitespace,
      ratio: ROUND(whitespace / logicalHeight, 4),
      element: whitespaceElement,
    },
    blockFit,
    elements,
  };
}
