import { join, relative } from "node:path";

import { layoutReportDir } from "./artifacts";
import type {
  BlockFitMeasurement,
  BlockFitViolation,
  LayoutMeasureResult,
  OverflowViolation,
  WhitespaceMeasurement,
} from "./overflow-scan";
import {
  collectStabilitySlides,
  collectStabilityViolations,
  maxStabilityShift,
  type StabilityShift,
  type StabilityStepResult,
} from "./stability-scan";

/** 报告目录（相对仓库根），用于打印"报告在哪"——与 `e2e/artifacts.ts` 同一套规则 */
const REPORT_DIR = relative(join(import.meta.dirname, ".."), layoutReportDir());

/** 一次「某一页 + 某一状态」的检查结果 */
export interface CheckResult {
  slide: number;
  title: string;
  /** 状态标签：初始态 / 全部展开 */
  state: string;
  clicks: number;
  /** 实际参与测量的元素个数（0 说明这一页没量到东西，属于异常） */
  scanned: number;
  /** 这一页渲染失败（Slidev 错误占位页） */
  renderError: boolean;
  violations: OverflowViolation[];
  /** 页面底部留白（内容底部到画布底部的距离），用于发现"内容挤在上半页" */
  whitespace: WhitespaceMeasurement;
  /** 正文是否越出 `.page-grow` 的可用区域（顶出上边界 / 超出下边界） */
  blockFit: BlockFitMeasurement;
  /** 相对报告目录的截图路径（仅溢出页有） */
  screenshot?: string;
}

/**
 * 一页里「第 N 步」的正文越界测量。
 *
 * 「初始态 / 全部展开」两个状态已由 `CheckResult.blockFit` 覆盖，这里补上**中间步**：内容逐步呈现时 正文高度会变化，可能只有某几步越界。
 */
export interface BlockFitStepResult {
  slide: number;
  title: string;
  /** 点击步数（0 = 未点击） */
  step: number;
  /** 该步的正文越界测量 */
  blockFit: BlockFitMeasurement;
}

/** 报告里「哪个课件 / 哪一页 / 哪一步 / 哪个元素越界」的一条记录 */
export interface BlockFitOffense {
  slug: string;
  slide: number;
  title: string;
  /** 状态标签（含第几步），例如「第 0 步（初始态）」「第 3 步」「第 6 步（全部展开）」 */
  state: string;
  step: number;
  violation: BlockFitViolation;
}

export interface CourseResult {
  slug: string;
  baseURL: string;
  totalSlides: number;
  checks: CheckResult[];
  /** 顶栏 / 底栏等跨页固定层的检查结果 */
  globals: LayoutMeasureResult[];
  /** 逐页逐步的点击稳定性检查（相邻两步之间"已可见元素被顶跑"的位移） */
  stability: StabilityStepResult[];
  /** 逐页逐步的正文越界检查（正文顶出 / 超出 `.page-grow` 的可用区域） */
  blockFitSteps: BlockFitStepResult[];
}

export interface ReportMeta {
  generatedAt: string;
  viewport: { width: number; height: number };
  tolerance: number;
  /** 留白判定阈值（逻辑像素，`E2E_WHITESPACE_TOLERANCE` 可调，默认 150） */
  whitespaceTolerance: number;
  /** 点击位移判定阈值（逻辑像素，`E2E_STABILITY_TOLERANCE` 可调，默认 1） */
  stabilityTolerance: number;
  /** 正文越界判定阈值（逻辑像素，`E2E_BLOCK_TOLERANCE` 可调，默认 1） */
  blockTolerance: number;
}

/** 留白阈值兜底值（与 `slidev-driver.ts` 的默认值一致，避免报告函数依赖环境变量） */
export const DEFAULT_WHITESPACE_TOLERANCE = 150;
/** 点击位移阈值兜底值（与 `slidev-driver.ts` 的默认值一致） */
export const DEFAULT_STABILITY_TOLERANCE = 1;
/** 正文越界阈值兜底值（与 `slidev-driver.ts` 的默认值一致） */
export const DEFAULT_BLOCK_TOLERANCE = 1;

const DIRECTION_LABELS: Record<keyof OverflowViolation["overflow"], string> = {
  top: "上",
  right: "右",
  bottom: "下",
  left: "左",
};

export function formatDirections(violation: OverflowViolation): string {
  return violation.directions
    .map(
      (direction) =>
        `${DIRECTION_LABELS[direction as keyof typeof DIRECTION_LABELS]} ${violation.overflow[direction as keyof OverflowViolation["overflow"]]}px`,
    )
    .join(" / ");
}

function formatViolationLine(violation: OverflowViolation, index: number): string {
  const text = violation.text ? ` ｜ 文案：${violation.text}` : "";
  const nested = violation.nested ? `（内部还有 ${violation.nested} 个元素同样溢出）` : "";

  return `${index + 1}. \`${violation.path}\` 超出 ${formatDirections(violation)}${nested}${text}`;
}

/** 单页的溢出条目（含"根因"与"被牵连"的区分） */
export function slideViolationLines(check: CheckResult): {
  outermost: OverflowViolation[];
  nested: OverflowViolation[];
} {
  return {
    outermost: check.violations.filter((violation) => violation.outermost),
    nested: check.violations.filter((violation) => !violation.outermost),
  };
}

/** 渲染失败的「页面 × 状态」列表 */
export function collectRenderErrors(
  results: CourseResult[],
): { slug: string; check: CheckResult }[] {
  return results.flatMap((result) =>
    result.checks
      .filter((check) => check.renderError)
      .map((check) => ({ slug: result.slug, check })),
  );
}

export function countViolations(results: CourseResult[]): number {
  return results.reduce(
    (total, result) =>
      total + result.checks.reduce((sum, check) => sum + check.violations.length, 0),
    0,
  );
}

/** 「218px（39.5%）」 */
export function formatWhitespace(measurement: WhitespaceMeasurement): string {
  return `${measurement.whitespace}px（${(measurement.ratio * 100).toFixed(1)}%）`;
}

/** 「下 12px（dx 0 / dy 12）」 */
export function formatStabilityShift(shift: StabilityShift): string {
  return `${shift.direction} ${shift.distance}px（dx ${shift.dx} / dy ${shift.dy}）`;
}

/** 报告里给位移元素定位用的一行（DOM 路径 + 文案片段） */
export function describeStabilityTarget(shift: StabilityShift): string {
  const text = shift.text ? ` ｜ 文案：${shift.text}` : "";

  return `\`${shift.path}\`${text}`;
}

/** 点击稳定性超容差时给出来的可读信息（只有 `E2E_STRICT_STABILITY=1` 时才会作为失败原因出现）。 */
export function renderStabilityFailureMessage(results: CourseResult[], tolerance: number): string {
  const offending = results
    .map((result) => ({ slug: result.slug, steps: collectStabilityViolations(result.stability) }))
    .filter((item) => item.steps.length > 0);
  const lines = [
    `发现 ${offending.length} 个课件存在「点击时已可见元素被顶跑」超过 ${tolerance}px 的位移（常规页面点击只允许出现新元素，不允许移动已有元素）：`,
    "",
  ];

  for (const { slug, steps } of offending) {
    for (const step of steps) {
      lines.push(
        `【${slug}】第 ${step.slide} 页「${step.title || "无标题"}」· 点击第 ${step.from} → ${step.to} 步（最大位移 ${step.maxShift}px）`,
      );

      for (const shift of step.shifts.filter((item) => !item.ignored).slice(0, 12))
        lines.push(`  - ${describeStabilityTarget(shift)} ｜ ${formatStabilityShift(shift)}`);
    }
  }

  lines.push(
    "",
    "常见原因：组件里按 `$clicks` 分步时用了 `v-if`（真删真插会把后面的元素顶跑）。",
    "改法：用 `visibility: hidden` 占位（`:class=\"{ 'v-hidden': step < 2 }\"` + `.v-hidden { visibility: hidden; }`），",
    "或把长期存在的操作提示放在最上面。手风琴式有意「展开—收起」的段落可用 `E2E_STABILITY_IGNORE`（逗号分隔选择器）加入白名单。",
    `完整报告：${REPORT_DIR}/layout-overflow.md（机器可读：${REPORT_DIR}/layout-overflow.json）`,
  );

  return lines.join("\n");
}

/**
 * 留白超过阈值的「页面 × 状态」，按留白从大到小排序。
 *
 * 渲染失败的页面不列入（整页没渲染出来时留白没有意义，而且它已经单独让测试失败了）。
 */
export function collectWhitespaceHotspots(
  results: CourseResult[],
  tolerance: number,
): { slug: string; check: CheckResult }[] {
  return results
    .flatMap((result) =>
      result.checks
        .filter((check) => !check.renderError && check.whitespace.whitespace > tolerance)
        .map((check) => ({ slug: result.slug, check })),
    )
    .sort(
      (left, right) =>
        right.check.whitespace.whitespace - left.check.whitespace.whitespace ||
        left.check.slide - right.check.slide ||
        left.check.state.localeCompare(right.check.state),
    );
}

/** 每页的「初始态 / 全部展开」留白（控制台与报告的全量明细用） */
export function groupWhitespaceBySlide(
  result: CourseResult,
): { slide: number; title: string; states: CheckResult[] }[] {
  const bySlide = new Map<number, CheckResult[]>();

  for (const check of result.checks) {
    const list = bySlide.get(check.slide) ?? [];

    list.push(check);
    bySlide.set(check.slide, list);
  }

  return [...bySlide.entries()]
    .sort(([left], [right]) => left - right)
    .map(([slide, states]) => ({
      slide,
      title: states[0]?.title ?? "",
      states: states.sort((left, right) => left.clicks - right.clicks),
    }));
}

/**
 * 留白过大时给出来的可读信息（只有 `E2E_STRICT_WHITESPACE=1` 时才会作为失败原因出现）。
 *
 * 默认只报告不失败：别的课件本来就可能有大留白，直接 fail 会把 CI 弄红。
 */
export function renderWhitespaceFailureMessage(results: CourseResult[], tolerance: number): string {
  const hotspots = collectWhitespaceHotspots(results, tolerance);
  const lines = [
    `发现 ${hotspots.length} 个「页面 × 状态」底部留白超过 ${tolerance}px（内容挤在页面上方，可放大字号 / 行距 / 间距，或让布局更充分地铺满页面）：`,
    "",
  ];

  for (const { slug, check } of hotspots) {
    lines.push(
      `【${slug}】第 ${check.slide} 页「${check.title || "无标题"}」· ${check.state}：留白 ${formatWhitespace(check.whitespace)}（内容底部 ${check.whitespace.contentBottom}px）`,
    );

    if (check.whitespace.element?.text)
      lines.push(`  最后的内容：${check.whitespace.element.text}`);
  }

  lines.push(
    "",
    "（`E2E_STRICT_WHITESPACE=1` 打开时才会因此失败；阈值由 `E2E_WHITESPACE_TOLERANCE` 控制，默认 150px）",
    "调整后留白仍偏大：优先把字号、行距、卡片内边距放大，或让内容在垂直方向居中 / 均分。",
    `完整报告：${REPORT_DIR}/layout-overflow.md（机器可读：${REPORT_DIR}/layout-overflow.json）`,
  );

  return lines.join("\n");
}

// ── 正文越出 `.page-grow` 可用区域（内容比正文容器高 → 上顶标题、下被裁）──

/** 「上」/「下」/「上 + 下」 */
export function formatBlockFitDirections(violation: BlockFitViolation): string {
  return violation.directions.map((direction) => (direction === "top" ? "上" : "下")).join(" + ");
}

/** 「上 12px」/「下 8px」/「上 12px / 下 8px」 */
export function formatBlockFitOverflow(violation: BlockFitViolation): string {
  const parts: string[] = [];

  if (violation.overflowTop > 0) parts.push(`上 ${violation.overflowTop}px`);
  if (violation.overflowBottom > 0) parts.push(`下 ${violation.overflowBottom}px`);

  return parts.join(" / ") || "0px";
}

/** 报告里给越界元素定位用的一行（DOM 路径 + 文案片段） */
export function describeBlockFitTarget(violation: BlockFitViolation): string {
  const text = violation.text ? ` ｜ 文案：${violation.text}` : "";

  return `\`${violation.path}\`${text}`;
}

/** 一页「第 N 步」的状态标签（与 `STATES` 的 初始态 / 全部展开 对齐，避免同一状态重复列出） */
export function blockFitStateLabel(step: number, maxStep: number): string {
  if (step === 0) return maxStep === 0 ? "第 0 步（初始态 = 全部展开）" : "第 0 步（初始态）";
  if (step >= maxStep) return `第 ${step} 步（全部展开）`;

  return `第 ${step} 步`;
}

/** 一个课件里「正文越界」的步（`blockFit.overflowCount > 0`，已排除白名单元素） */
export function collectBlockFitSteps(result: CourseResult): BlockFitStepResult[] {
  return result.blockFitSteps.filter((step) => step.blockFit.overflowCount > 0);
}

/** 一个课件里正文越界过的页面号（去重、升序） */
export function collectBlockFitSlides(result: CourseResult): number[] {
  return [...new Set(collectBlockFitSteps(result).map((step) => step.slide))].sort(
    (left, right) => left - right,
  );
}

/** 全部课件里正文越界过的「页 × 步」 */
export function collectBlockFitViolations(
  results: CourseResult[],
): { slug: string; step: BlockFitStepResult }[] {
  return results.flatMap((result) =>
    collectBlockFitSteps(result).map((step) => ({ slug: result.slug, step })),
  );
}

/** 全部课件里正文越界的明细（逐元素，含「根因 / 被牵连」标记） */
export function collectBlockFitOffenses(results: CourseResult[]): BlockFitOffense[] {
  return results.flatMap((result) => {
    const maxStepBySlide = new Map<number, number>();

    for (const step of result.blockFitSteps)
      maxStepBySlide.set(step.slide, Math.max(maxStepBySlide.get(step.slide) ?? 0, step.step));

    return collectBlockFitSteps(result).flatMap((step) =>
      step.blockFit.elements
        .filter((violation) => !violation.ignored)
        .map((violation) => ({
          slug: result.slug,
          slide: step.slide,
          title: step.title,
          state: blockFitStateLabel(step.step, maxStepBySlide.get(step.slide) ?? step.step),
          step: step.step,
          violation,
        })),
    );
  });
}

/** 全部课件里最大的顶出 / 超出像素（用于控制台一行汇总） */
export function maxBlockFitOverflow(results: CourseResult[]): { top: number; bottom: number } {
  const steps = results.flatMap((result) => result.blockFitSteps);

  return {
    top: steps.length ? Math.max(...steps.map((step) => step.blockFit.overflowTop), 0) : 0,
    bottom: steps.length ? Math.max(...steps.map((step) => step.blockFit.overflowBottom), 0) : 0,
  };
}

/** 正文越界超容差时给出来的可读信息（只有 `E2E_STRICT_BLOCK_FIT=1` 时才会作为失败原因出现） */
export function renderBlockFitFailureMessage(results: CourseResult[], tolerance: number): string {
  const violations = collectBlockFitViolations(results);
  const lines = [
    `发现 ${violations.length} 个「页 × 步」的正文越出 \`.page-grow\` 的可用区域超过 ${tolerance}px（内容比正文容器高：垂直居中会让首行叠到页面标题上、末行被裁掉）：`,
    "",
  ];

  for (const { slug, step } of violations) {
    lines.push(
      `【${slug}】第 ${step.slide} 页「${step.title || "无标题"}」· 第 ${step.step} 步：顶出 ${step.blockFit.overflowTop}px / 超出 ${step.blockFit.overflowBottom}px`,
    );

    for (const violation of step.blockFit.elements.filter((item) => !item.ignored).slice(0, 12))
      lines.push(
        `  - ${describeBlockFitTarget(violation)} ｜ ${formatBlockFitOverflow(violation)}${violation.outermost ? "（根因）" : "（被牵连）"}`,
      );
  }

  lines.push(
    "",
    "常见原因：`.page-grow`（`flex:1` + `justify-content:center`）里的内容总高超过它的可用高度。",
    "改法：压**最外层**越界元素（缩小 SVG / 字号 / 行距，或把垂直堆叠改成两栏），或把这一页拆成两页。",
    "有意做出血效果的元素可用 `E2E_BLOCK_IGNORE`（逗号分隔选择器）加入白名单；容差由 `E2E_BLOCK_TOLERANCE` 控制。",
    `完整报告：${REPORT_DIR}/layout-overflow.md（机器可读：${REPORT_DIR}/layout-overflow.json）`,
  );

  return lines.join("\n");
}

/** 打印到终端的进度摘要（每个课件一行） */
export function renderConsoleSummary(
  result: CourseResult,
  whitespaceTolerance = DEFAULT_WHITESPACE_TOLERANCE,
  stabilityTolerance = DEFAULT_STABILITY_TOLERANCE,
  blockTolerance = DEFAULT_BLOCK_TOLERANCE,
): string {
  const failing = result.checks.filter((check) => check.violations.length > 0);
  const broken = result.checks.filter((check) => check.renderError);
  const hotspots = collectWhitespaceHotspots([result], whitespaceTolerance);
  const lines = [
    `📐 ${result.slug}：共 ${result.totalSlides} 页，检查 ${result.checks.length} 个状态，${failing.length ? `❌ ${failing.length} 个状态溢出` : "✅ 无溢出"}${broken.length ? ` ｜ ⛔ ${new Set(broken.map((check) => check.slide)).size} 页渲染失败` : ""}`,
  ];

  for (const slide of new Set(broken.map((check) => check.slide))) {
    lines.push(`   ⛔ 第 ${slide} 页渲染失败（Slidev 错误占位页，内容根本没渲染出来）`);
  }

  for (const check of failing) {
    lines.push(`   第 ${check.slide} 页「${check.title || "无标题"}」· ${check.state}`);

    for (const [index, violation] of slideViolationLines(check).outermost.entries()) {
      lines.push(`     ${formatViolationLine(violation, index)}`);
    }
  }

  for (const layer of result.globals) {
    if (layer.violations.length)
      lines.push(`   ⚠️ ${layer.title} 溢出：${layer.violations.length} 个元素`);
  }

  // ── 底部留白（与溢出相反方向的体检：哪几页内容挤在上半页，该放大字号 / 间距）──
  lines.push(
    hotspots.length
      ? `   🧭 留白（阈值 ${whitespaceTolerance}px）：⚠️ ${hotspots.length} 个「页面 × 状态」留白偏大`
      : `   🧭 留白（阈值 ${whitespaceTolerance}px）：✅ 无留白过大页面`,
  );

  for (const { check } of hotspots) {
    lines.push(
      `     第 ${check.slide} 页「${check.title || "无标题"}」· ${check.state}：留白 ${formatWhitespace(check.whitespace)}，内容底部 ${check.whitespace.contentBottom}px`,
    );
  }

  // 全量明细（初始态 / 全部展开对照），重排版面时直接看这里
  lines.push("     留白明细（左 初始态 · 右 全部展开）：");

  for (const item of groupWhitespaceBySlide(result)) {
    const states = item.states
      .map((check) => `${check.state} ${check.whitespace.whitespace}px`)
      .join(" · ");

    lines.push(`     第 ${item.slide} 页「${item.title || "无标题"}」：${states}`);
  }

  // ── 点击稳定性（相邻两步之间"已可见元素是否被顶跑"）──
  const stabilitySteps = collectStabilityViolations(result.stability);
  const stabilitySlides = collectStabilitySlides(result.stability);
  const ignoredCount = result.stability.reduce((sum, step) => sum + step.ignoredCount, 0);
  const stepCount = result.stability.length;

  lines.push(
    stabilitySteps.length
      ? `   🖱️ 点击位移（阈值 ${stabilityTolerance}px）：⚠️ ${stabilitySlides.length} 页共 ${stabilitySteps.length} 步存在位移${ignoredCount ? `（另有 ${ignoredCount} 条命中白名单已忽略）` : ""}`
      : `   🖱️ 点击位移（阈值 ${stabilityTolerance}px）：✅ 无已可见元素被顶跑（检查 ${stepCount} 个步进）${ignoredCount ? `，白名单忽略 ${ignoredCount} 条` : ""}`,
  );

  for (const step of stabilitySteps) {
    lines.push(
      `     第 ${step.slide} 页「${step.title || "无标题"}」· 第 ${step.from} → ${step.to} 步：最大位移 ${step.maxShift}px（${step.shifts.filter((shift) => !shift.ignored).length} 个元素）`,
    );

    for (const shift of step.shifts.filter((item) => !item.ignored).slice(0, 5))
      lines.push(
        `       · ${shift.path}${shift.text ? ` ｜ ${shift.text}` : ""} → ${formatStabilityShift(shift)}`,
      );
  }

  // ── 正文越界（正文比 `.page-grow` 高 → 首行叠到标题上、末行被裁）──
  const blockSteps = collectBlockFitSteps(result);
  const blockSlides = collectBlockFitSlides(result);
  const blockIgnoredCount = result.blockFitSteps.reduce(
    (sum, step) => sum + step.blockFit.ignoredCount,
    0,
  );
  const blockCounted = blockSteps.reduce(
    (sum, step) => sum + step.blockFit.elements.filter((item) => !item.ignored).length,
    0,
  );
  /** 真正量到了 `.page-grow` 的「页 × 步」数（其余是没有正文容器的页面，已跳过） */
  const blockScannedCount = result.blockFitSteps.filter((step) => step.blockFit.present).length;

  lines.push(
    blockSteps.length
      ? `   📐 正文越界（阈值 ${blockTolerance}px）：⚠️ ${blockSlides.length} 页共 ${blockSteps.length} 步、${blockCounted} 个元素顶出 / 超出 \`.page-grow\` 可用区域${blockIgnoredCount ? `（另有 ${blockIgnoredCount} 个命中白名单已忽略）` : ""}`
      : blockScannedCount === 0
        ? `   📐 正文越界（阈值 ${blockTolerance}px）：— 该课件没有使用 \`.page-grow\`，${result.blockFitSteps.length} 个「页 × 步」全部跳过`
        : `   📐 正文越界（阈值 ${blockTolerance}px）：✅ 正文都在 \`.page-grow\` 可用区域内（检查 ${blockScannedCount} 个「页 × 步」${blockIgnoredCount ? `，白名单忽略 ${blockIgnoredCount} 个元素` : ""}）`,
  );

  for (const step of blockSteps) {
    lines.push(
      `     第 ${step.slide} 页「${step.title || "无标题"}」· 第 ${step.step} 步：顶出 ${step.blockFit.overflowTop}px / 超出 ${step.blockFit.overflowBottom}px`,
    );

    // 只列「根因」元素（改它一处就能连带解决被牵连的子元素），与溢出汇总的口径一致
    for (const violation of step.blockFit.elements
      .filter((item) => !item.ignored && item.outermost)
      .slice(0, 5))
      lines.push(
        `       · ${violation.path}${violation.text ? ` ｜ ${violation.text}` : ""} → ${formatBlockFitOverflow(violation)}`,
      );
  }

  return lines.join("\n");
}

/** 渲染失败的说明（比溢出更严重：内容根本没渲染出来） */
export function renderRenderErrorSections(results: CourseResult[]): string[] {
  const broken = collectRenderErrors(results);

  if (broken.length === 0) return [];

  const slides = [...new Set(broken.map((item) => `${item.slug}#${item.check.slide}`))];
  const lines = [`⛔ ${slides.length} 个页面渲染失败（Slidev 错误占位页，内容没渲染出来）：`, ""];

  for (const item of broken) {
    lines.push(
      `  【${item.slug}】第 ${item.check.slide} 页「${item.check.title || "无标题"}」· ${item.check.state}`,
    );
  }

  lines.push(
    "",
    "  排查：看 `pnpm dev <课件标识>` 的终端报错；常见原因是组件没解析到（例如引用了不存在的组件，",
    "  Slidev 会把它当图标名去解析而报 `Icon xx/yy not found`），或组件内部抛错。",
    "",
  );

  return lines;
}

/** 测试失败时给出来的可读信息（会出现在 Playwright 报告与终端） */
export function renderFailureMessage(results: CourseResult[]): string {
  const failing = results.flatMap((result) =>
    result.checks
      .filter((check) => check.violations.length > 0)
      .map((check) => ({ slug: result.slug, check })),
  );
  const lines = [...renderRenderErrorSections(results)];

  lines.push(`发现 ${failing.length} 个「页面 × 状态」存在元素超出 16:9 画面：`, "");

  for (const { slug, check } of failing) {
    lines.push(`【${slug}】第 ${check.slide} 页「${check.title || "无标题"}」· ${check.state}`);

    const { outermost, nested } = slideViolationLines(check);

    for (const [index, violation] of outermost.entries())
      lines.push(`  ${formatViolationLine(violation, index)}`);

    if (nested.length)
      lines.push(`  （另有 ${nested.length} 个内部元素被牵连，改上面的外层元素即可一并解决）`);

    if (check.screenshot) lines.push(`  截图：${check.screenshot}`);
  }

  lines.push(
    "",
    `完整报告：${REPORT_DIR}/layout-overflow.md（机器可读：${REPORT_DIR}/layout-overflow.json）`,
  );

  return lines.join("\n");
}

/** 机器可读报告：agent 拿它定位"哪一页、哪个元素、超了多少" */
export function buildJsonReport(results: CourseResult[], meta: ReportMeta): string {
  return `${JSON.stringify(
    {
      ...meta,
      canvas: { width: 980, height: 552 },
      courses: results.map((result) => {
        const hotspots = collectWhitespaceHotspots([result], meta.whitespaceTolerance);

        return {
          slug: result.slug,
          baseURL: result.baseURL,
          totalSlides: result.totalSlides,
          violationCount: result.checks.reduce((sum, check) => sum + check.violations.length, 0),
          renderErrorSlides: [
            ...new Set(
              result.checks.filter((check) => check.renderError).map((check) => check.slide),
            ),
          ],
          whitespaceTolerance: meta.whitespaceTolerance,
          whitespaceHotspotCount: hotspots.length,
          // 点击稳定性：逐页逐步
          stability: {
            tolerance: meta.stabilityTolerance,
            stepCount: result.stability.length,
            violationStepCount: collectStabilityViolations(result.stability).length,
            violatedSlides: collectStabilitySlides(result.stability),
            maxShift: maxStabilityShift(result.stability),
            ignoredCount: result.stability.reduce((sum, step) => sum + step.ignoredCount, 0),
            // 每个「页 × 步」都带 stability{...}；shifts 为位移明细
            steps: result.stability.map((step) => ({
              slide: step.slide,
              title: step.title,
              from: step.from,
              to: step.to,
              compared: step.compared,
              stability: {
                maxShift: step.maxShift,
                maxIgnoredShift: step.maxIgnoredShift,
                shiftCount: step.shifts.length,
                ignoredCount: step.ignoredCount,
              },
              shifts: step.shifts,
            })),
          },
          // 正文越出 `.page-grow` 可用区域：逐页逐步（本次新增的体检项）
          blockFit: {
            tolerance: meta.blockTolerance,
            stepCount: result.blockFitSteps.length,
            // 真正量到 `.page-grow` 的步数（其余是没有正文容器的页面，已跳过）
            scannedStepCount: result.blockFitSteps.filter((step) => step.blockFit.present).length,
            skippedStepCount: result.blockFitSteps.filter((step) => !step.blockFit.present).length,
            violationStepCount: collectBlockFitSteps(result).length,
            violatedSlides: collectBlockFitSlides(result),
            maxOverflowTop: maxBlockFitOverflow([result]).top,
            maxOverflowBottom: maxBlockFitOverflow([result]).bottom,
            ignoredCount: result.blockFitSteps.reduce(
              (sum, step) => sum + step.blockFit.ignoredCount,
              0,
            ),
            // 每个「页 × 步」都带 blockFit{overflowTop,overflowBottom,overflowCount,elements[]}
            steps: result.blockFitSteps.map((step) => ({
              slide: step.slide,
              title: step.title,
              step: step.step,
              blockFit: step.blockFit,
            })),
          },
          // 留白偏大的页面（按留白从大到小），方便 agent 直接照着重排版面
          whitespaceHotspots: hotspots.map(({ check }) => ({
            slide: check.slide,
            title: check.title,
            state: check.state,
            clicks: check.clicks,
            whitespace: check.whitespace.whitespace,
            ratio: check.whitespace.ratio,
            contentBottom: check.whitespace.contentBottom,
          })),
          globals: result.globals,
          // 覆盖度：通过的页也写进来，agent 才能确认"每页都真的量到了"
          checks: result.checks.map((check) => ({
            slide: check.slide,
            state: check.state,
            clicks: check.clicks,
            scanned: check.scanned,
            renderError: check.renderError,
            violationCount: check.violations.length,
            whitespace: check.whitespace,
            blockFit: check.blockFit,
          })),
          slides: result.checks
            .filter((check) => check.violations.length > 0)
            .map((check) => ({
              slide: check.slide,
              title: check.title,
              state: check.state,
              clicks: check.clicks,
              scanned: check.scanned,
              screenshot: check.screenshot,
              violations: check.violations,
              whitespace: check.whitespace,
              blockFit: check.blockFit,
            })),
        };
      }),
    },
    null,
    2,
  )}\n`;
}

/** 人 / agent 都可读的 Markdown 报告 */
export function buildMarkdownReport(results: CourseResult[], meta: ReportMeta): string {
  const total = countViolations(results);
  const renderErrors = collectRenderErrors(results);
  const hotspots = collectWhitespaceHotspots(results, meta.whitespaceTolerance);
  const lines: string[] = [
    "# 幻灯片布局溢出报告（16:9）",
    "",
    `- 生成时间：${meta.generatedAt}`,
    `- 检查视口：${meta.viewport.width}×${meta.viewport.height}（16:9）`,
    "- 幻灯片画布：980×552（Slidev 逻辑尺寸，元素坐标已换算成逻辑像素）",
    `- 判定容差：${meta.tolerance}px（小于该值视为亚像素误差）`,
    `- 留白阈值：${meta.whitespaceTolerance}px（留白 = 552 − 内容底部；\`E2E_WHITESPACE_TOLERANCE\` 可调）`,
    `- 位移阈值：${meta.stabilityTolerance}px（点击时已可见元素的位置差；\`E2E_STABILITY_TOLERANCE\` 可调）`,
    `- 正文越界阈值：${meta.blockTolerance}px（正文越出 \`.page-grow\` 可用区域；\`E2E_BLOCK_TOLERANCE\` 可调）`,
    `- 结论：${renderErrors.length > 0 ? `⛔ ${renderErrors.length} 个页面渲染失败` : total === 0 ? "✅ 所有页面均在画面内" : `❌ 共 ${total} 个元素越出画面`}`,
    "",
    "| 课件 | 页数 | 检查状态数 | 渲染失败页数 | 溢出状态数 | 溢出元素数 | 留白偏大状态数 | 位移步数 | 正文越界步数 |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ];

  for (const result of results) {
    const failing = result.checks.filter((check) => check.violations.length > 0);
    const courseHotspots = hotspots.filter((item) => item.slug === result.slug).length;

    lines.push(
      `| ${result.slug} | ${result.totalSlides} | ${result.checks.length} | ${new Set(result.checks.filter((check) => check.renderError).map((check) => check.slide)).size} | ${failing.length} | ${result.checks.reduce((sum, check) => sum + check.violations.length, 0)} | ${courseHotspots} | ${collectStabilityViolations(result.stability).length} | ${collectBlockFitSteps(result).length} |`,
    );
  }

  lines.push(
    "",
    "> 判定口径：元素「被祖先 overflow 裁剪后的可见矩形」超出画布才算溢出；",
    "> 全透明（v-click 未展开）与零尺寸元素不计；跨页固定层（顶栏/底栏）单独检查。",
    "> `初始态` = 未点击（clicks=0），`全部展开` = 所有 v-click 都展开。",
    "> 留白口径：留白 = 552 −「内容底部」，内容底部 = 该页最靠下的可见内容元素的 bottom；",
    "> 排除页面容器（`.slidev-layout` 等铺满画布的容器）、跨页固定层、`aria-hidden` 纯装饰与零尺寸/全透明元素。",
    "",
  );

  for (const result of results) {
    lines.push(`## ${result.slug}`, "");

    const brokenSlides = [
      ...new Set(result.checks.filter((check) => check.renderError).map((check) => check.slide)),
    ];

    if (brokenSlides.length > 0) {
      lines.push(
        `### ⛔ 渲染失败 ${brokenSlides.length} 页（内容没渲染出来，"无溢出"不作数）`,
        "",
        `第 ${brokenSlides.join("、")} 页 —— 跑 \`pnpm dev ${result.slug}\` 看终端报错。`,
        "",
      );
    }

    if (!result.checks.some((check) => check.violations.length > 0)) {
      lines.push(`✅ ${result.totalSlides} 页（${result.checks.length} 个状态）全部在画面内。`, "");
    }

    for (const check of result.checks.filter((item) => item.violations.length > 0)) {
      const { outermost, nested } = slideViolationLines(check);

      lines.push(`### ❌ 第 ${check.slide} 页 · ${check.title || "无标题"} · ${check.state}`, "");

      for (const [index, violation] of outermost.entries()) {
        lines.push(`${index + 1}. \`${violation.path}\``);
        lines.push(
          `   - 超出：**${formatDirections(violation)}**（${violation.directions.join(" + ")}）`,
        );
        lines.push(
          `   - 元素矩形：${violation.rect.width}×${violation.rect.height} @ (${violation.rect.x}, ${violation.rect.y})`,
        );
        lines.push(
          `   - 选择器：\`.slidev-page[data-slidev-no="${check.slide}"] > ${violation.selector}\``,
        );

        if (violation.text) lines.push(`   - 文案：${violation.text}`);
        if (violation.nested)
          lines.push(`   - 内部还有 ${violation.nested} 个元素同样溢出，改外层即可`);

        lines.push("");
      }

      if (nested.length) {
        lines.push(`<details><summary>被牵连的 ${nested.length} 个子元素</summary>`, "");

        for (const [index, violation] of nested.entries())
          lines.push(formatViolationLine(violation, index));

        lines.push("", "</details>", "");
      }

      if (check.screenshot)
        lines.push(`截图（红框 = 溢出元素）：[${check.screenshot}](${check.screenshot})`, "");
    }

    for (const layer of result.globals.filter((item) => item.violations.length > 0)) {
      lines.push(`### ❌ 跨页固定层 · ${layer.title}`, "");

      for (const [index, violation] of layer.violations.entries())
        lines.push(formatViolationLine(violation, index));

      lines.push("");
    }
  }

  // ── 点击过程中位移的元素（"点击只允许出现新元素，不允许移动已有元素"）──
  lines.push("## 点击过程中位移的元素", "");

  const stabilityViolations = results.flatMap((result) =>
    collectStabilityViolations(result.stability).map((step) => ({ slug: result.slug, step })),
  );
  const totalStabilitySteps = results.reduce((sum, result) => sum + result.stability.length, 0);
  const ignoredShifts = results.reduce(
    (sum, result) => sum + result.stability.reduce((inner, step) => inner + step.ignoredCount, 0),
    0,
  );

  if (stabilityViolations.length === 0) {
    lines.push(
      `✅ 无已可见元素被顶跑（阈值 ${meta.stabilityTolerance}px，共检查 ${totalStabilitySteps} 个「页 × 步」步进${ignoredShifts ? `；白名单忽略 ${ignoredShifts} 条` : ""}）。`,
      "",
    );
  } else {
    lines.push(
      `共 ${stabilityViolations.length} 个「页 × 步」在上一步已可见的元素被顶跑（阈值 ${meta.stabilityTolerance}px；元素"出现 / 消失"本身不算违例）：`,
      "",
      "| 课件 | 页 | 标题 | 点击步 | 元素路径 | 文案 | 方向 | 位移 |",
      "| --- | --- | --- | --- | --- | --- | --- | --- |",
    );

    for (const { slug, step } of stabilityViolations) {
      for (const shift of step.shifts.filter((item) => !item.ignored)) {
        lines.push(
          `| ${slug} | 第 ${step.slide} 页 | ${step.title || "无标题"} | ${step.from} → ${step.to} | \`${shift.path}\`${shift.outermost ? "" : "（被牵连）"} | ${(shift.text || "—").replaceAll("|", "\\|")} | ${shift.direction} | **${shift.distance}px** |`,
        );
      }
    }

    lines.push("");
  }

  lines.push(
    "<details>",
    "<summary>全部「页 × 步」的位移明细（含被白名单忽略的条目，用于判断哪些元素天然会动）</summary>",
    "",
    "| 课件 | 页 | 标题 | 步 | 参与配对 | 违例位移 | 最大位移 | 白名单忽略 |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
  );

  for (const result of results) {
    for (const step of result.stability) {
      lines.push(
        `| ${result.slug} | 第 ${step.slide} 页 | ${step.title || "无标题"} | ${step.from} → ${step.to} | ${step.compared} | ${step.shifts.filter((shift) => !shift.ignored).length} | ${step.maxShift}px | ${step.ignoredCount} |`,
      );
    }
  }

  lines.push(
    "",
    "</details>",
    "",
    `> 口径：相邻两步之间，**两步都可见**的元素按稳定标识配对（不含 DOM 下标），位置差超过 ${meta.stabilityTolerance}px 记一次位移；`,
    "> 元素「出现 / 消失」不算违例。默认只报告、不让测试失败；设 `E2E_STRICT_STABILITY=1` 后超容差会让测试失败。",
    "> 容差用 `E2E_STABILITY_TOLERANCE` 调整；手风琴式有意位移的段落可用 `E2E_STABILITY_IGNORE`（逗号分隔 CSS 选择器）加入白名单。",
    "",
  );

  // ── 正文越出 `.page-grow` 可用区域（上顶标题、下被裁：溢出/留白/稳定性三项都漏掉的盲区）──
  lines.push("## 正文越出可用区域", "");

  const blockViolations = collectBlockFitViolations(results);
  const blockOffenses = collectBlockFitOffenses(results);
  const blockStepCount = results.reduce((sum, result) => sum + result.blockFitSteps.length, 0);
  const blockScannedCount = results.reduce(
    (sum, result) => sum + result.blockFitSteps.filter((step) => step.blockFit.present).length,
    0,
  );
  const blockIgnoredCount = results.reduce(
    (sum, result) =>
      sum + result.blockFitSteps.reduce((inner, step) => inner + step.blockFit.ignoredCount, 0),
    0,
  );
  /** 覆盖度说明：真正量到的步数 + 被跳过的步数（没有 `.page-grow` 的页面） */
  const blockScope = `共检查 ${blockScannedCount} 个「页 × 步」${
    blockStepCount > blockScannedCount
      ? `（另有 ${blockStepCount - blockScannedCount} 个所在页面没有 \`.page-grow\`（如封面）已跳过）`
      : ""
  }${blockIgnoredCount ? `；白名单忽略 ${blockIgnoredCount} 个元素` : ""}`;

  if (blockViolations.length === 0) {
    lines.push(
      `✅ 没有正文越出 \`.page-grow\` 的可用区域（阈值 ${meta.blockTolerance}px，${blockScope}）。`,
      "",
    );
  } else {
    const blockSlides = new Set(blockOffenses.map((item) => `${item.slug}#${item.slide}`)).size;
    const blockMax = maxBlockFitOverflow(results);

    lines.push(
      `共 ${blockSlides} 个页面、${blockViolations.length} 个「页 × 步」存在正文越界（阈值 ${meta.blockTolerance}px，最大顶出 ${blockMax.top}px / 最大超出 ${blockMax.bottom}px；${blockScope}）：`,
      "",
      "> `.page-grow` 是 `flex:1` + `justify-content:center` 的正文容器。内容比它高时，垂直居中会让**首行顶出容器叠到页面标题上**、**末行超出下边界被裁掉**——",
      "> 这既不是越出 980×552 画布（溢出检查不报），也不是点击位移（稳定性检查不报），底部留白反而很小（留白检查也不报）。",
      "",
      "| 课件 | 页 | 标题 | 状态 | 元素路径 | 文案 | 方向 | 越界 |",
      "| --- | --- | --- | --- | --- | --- | --- | --- |",
    );

    for (const offense of blockOffenses) {
      const violation = offense.violation;

      lines.push(
        `| ${offense.slug} | 第 ${offense.slide} 页 | ${offense.title || "无标题"} | ${offense.state} | \`${violation.path}\`${violation.outermost ? "" : "（被牵连）"} | ${(violation.text || "—").replaceAll("|", "\\|")} | ${formatBlockFitDirections(violation)} | **${formatBlockFitOverflow(violation)}** |`,
      );
    }

    lines.push("");
  }

  lines.push(
    "<details>",
    "<summary>全部「页 × 步」的正文越界明细（含通过项，用于确认每页每步都真的量到了；没有 .page-grow 的页面已跳过）</summary>",
    "",
    "| 课件 | 页 | 标题 | 步 | 顶出上边界 | 超出下边界 | 越界元素 |",
    "| --- | --- | --- | --- | --- | --- | --- |",
  );

  for (const result of results) {
    for (const step of result.blockFitSteps.filter((item) => item.blockFit.present)) {
      lines.push(
        `| ${result.slug} | 第 ${step.slide} 页 | ${step.title || "无标题"} | ${step.step} | ${step.blockFit.overflowTop}px | ${step.blockFit.overflowBottom}px | ${step.blockFit.elements.length} |`,
      );
    }
  }

  lines.push(
    "",
    "</details>",
    "",
    `> 口径：**可见内容元素**的可见矩形与 \`.page-grow\` 的 **padding box** 求交，顶出上边界 / 超出下边界超过 ${meta.blockTolerance}px 记一次越界；`,
    "> 排除 `.page-grow` 自身、跨页固定层（顶栏/底栏）、`aria-hidden` 纯装饰、固定定位元素，以及 SVG / KaTeX 内部节点（与稳定性检查同一套口径）；",
    "> 没有 `.page-grow` 的页面（如 `layout: cover` 封面）直接跳过。默认只报告、不让测试失败；设 `E2E_STRICT_BLOCK_FIT=1` 后越界会让测试失败。",
    "> 容差用 `E2E_BLOCK_TOLERANCE` 调整（默认 1px）；有意做出血效果的元素可用 `E2E_BLOCK_IGNORE`（逗号分隔 CSS 选择器）加入白名单。",
    "",
  );

  // ── 留白偏大的页面（与溢出相反方向的体检：内容挤在上半页 → 字号 / 间距本可以更大）──
  lines.push("## 留白偏大的页面", "");

  if (hotspots.length === 0) {
    lines.push(
      `✅ 无留白过大页面（阈值 ${meta.whitespaceTolerance}px，共 ${results.reduce(
        (sum, result) => sum + result.checks.length,
        0,
      )} 个「页面 × 状态」）。`,
      "",
    );
  } else {
    lines.push(
      `共 ${hotspots.length} 个「页面 × 状态」留白超过 ${meta.whitespaceTolerance}px（内容挤在页面上方，可放大字号 / 行距 / 间距，或让布局更充分地铺满页面）：`,
      "",
      "| 课件 | 页 | 标题 | 状态 | 留白 | 占比 | 内容底部 |",
      "| --- | --- | --- | --- | --- | --- | --- |",
    );

    for (const { slug, check } of hotspots) {
      lines.push(
        `| ${slug} | 第 ${check.slide} 页 | ${check.title || "无标题"} | ${check.state} | **${check.whitespace.whitespace}px** | ${(check.whitespace.ratio * 100).toFixed(1)}% | ${check.whitespace.contentBottom}px |`,
      );
    }

    lines.push("");
  }

  lines.push(
    "<details>",
    "<summary>全部页面的留白明细（每页两态，用于判断哪几页该放大字号 / 加大间距）</summary>",
    "",
    "| 课件 | 页 | 标题 | 状态 | 内容底部 | 留白 | 占比 | 最靠下的内容元素 |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
  );

  for (const result of results) {
    for (const item of groupWhitespaceBySlide(result)) {
      for (const check of item.states) {
        const element = check.whitespace.element;
        const location = element
          ? `\`${element.path}\`${element.text ? ` ｜ ${element.text.replaceAll("|", "\\|")}` : ""}`
          : "—";

        lines.push(
          `| ${result.slug} | 第 ${check.slide} 页 | ${item.title || "无标题"} | ${check.state} | ${check.whitespace.contentBottom}px | ${check.whitespace.whitespace}px | ${(check.whitespace.ratio * 100).toFixed(1)}% | ${location} |`,
        );
      }
    }
  }

  lines.push(
    "",
    "</details>",
    "",
    `> 留白默认只报告、不让测试失败（其它课件本来就可能有大留白）；设 \`E2E_STRICT_WHITESPACE=1\` 后，`,
    `> 留白超过阈值会让测试失败并在失败信息里列出具体页面。阈值用 \`E2E_WHITESPACE_TOLERANCE\` 调整（默认 150px）。`,
    "",
    "## 修复提示",
    "",
    "- **下 / 右溢出**（最常见）：内容比画布高/宽。压缩行距、内边距、字号、SVG 尺寸，或把垂直堆叠改成两栏网格。",
    "- **上 / 左溢出**：负 margin、绝对定位（`-top-*` / `-left-*`）越界，检查装饰元素是否被 `overflow-hidden` 裁剪。",
    "- **留白偏大**（与溢出相反）：内容没占满画布高度。优先放大字号 / 行距 / 卡片内边距，或把内容在垂直方向居中、均分（`justify-between`），也可改用两栏网格撑满。",
    "- **正文越出 `.page-grow` 可用区域**（上顶标题 / 下被裁）：正文总高超过正文容器的可用高度。压**最外层**越界元素（缩小 SVG / 字号 / 行距，或把垂直堆叠改成两栏），内容确实多就拆成两页。",
    "- 只改「最外层溢出元素」通常就能连带解决内部被牵连的元素。",
    "- 改完重跑 `pnpm test:e2e` 复验。",
    "",
  );

  return lines.join("\n");
}
