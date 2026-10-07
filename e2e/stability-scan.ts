/**
 * 点击过程的布局稳定性检查。
 *
 * 老师的原话："对于常规的文字幻灯片，都应该保证点击的时候只是出现新的，不影响已有布局的排布"。 也就是说：相邻两次点击之间，上一步**已经可见**的元素位置必须一动不动；元素"出现 /
 * 消失"本身不算问题 （手风琴式依次展开、收起属于例外）。
 *
 * 做法：每一步都用 `snapshotSlide`（复用 `overflow-scan.ts` 的 `measureLayout`，可见性口径完全一致）拿到
 * 本步可见元素快照，再按**稳定标识**（见 `VisibleElementSnapshot.key`，不含 DOM 下标）在相邻两步之间配对， 位置差超过容差的记一次「位移」。
 *
 * 默认只警告；`E2E_STRICT_STABILITY=1` 时才让测试失败。容差 `E2E_STABILITY_TOLERANCE`（默认 1px）， 白名单
 * `E2E_STABILITY_IGNORE`（逗号分隔 CSS 选择器，命中者只记录不算违例）。
 */

import type { VisibleElementSnapshot } from "./overflow-scan";

export interface StabilityShift {
  /** 稳定标识（两步配对用） */
  key: string;
  /** DOM 路径 */
  path: string;
  /** 相对幻灯片根的选择器 */
  selector: string;
  indexPath: number[];
  tag: string;
  id?: string;
  classes: string[];
  text: string;
  /** 水平位移（逻辑像素，正 = 向右） */
  dx: number;
  /** 垂直位移（逻辑像素，正 = 向下） */
  dy: number;
  /** 位移距离（逻辑像素） */
  distance: number;
  /** 方向标签，如 "下"、"右下" */
  direction: string;
  /** 是否是最外层被顶跑的元素（父级没动 → 通常是根因，改它最有效） */
  outermost: boolean;
  /** 命中稳定性白名单，只记录不算违例 */
  ignored: boolean;
  /** 位移前的矩形（画布逻辑像素） */
  before: VisibleElementSnapshot["rect"];
  /** 位移后的矩形（画布逻辑像素） */
  after: VisibleElementSnapshot["rect"];
}

/** 一页里「第 from 步 → 第 to 步」这一步的稳定性结果 */
export interface StabilityStepResult {
  slide: number;
  title: string;
  /** 起点步数 */
  from: number;
  /** 终点步数（= from + 1） */
  to: number;
  /** 两步都可见、成功配对的元素个数 */
  compared: number;
  /** 超过容差、计入违例的位移 */
  shifts: StabilityShift[];
  /** 其中命中白名单、被忽略的条数 */
  ignoredCount: number;
  /** 违例位移的最大像素（没有违例时为 0） */
  maxShift: number;
  /** 被白名单忽略的位移的最大像素（没有时为 0） */
  maxIgnoredShift: number;
}

export interface CompareOptions {
  slide: number;
  title: string;
  from: number;
  to: number;
  tolerance: number;
}

const round = (value: number, digits = 1): number => {
  const factor = 10 ** digits;

  return Math.round(value * factor) / factor;
};

/** 位移方向标签（以主导轴为准，两个轴都超过半个像素就写组合方向） */
export function describeShiftDirection(dx: number, dy: number): string {
  const parts: string[] = [];

  if (dx > 0.5) parts.push("右");
  else if (dx < -0.5) parts.push("左");

  if (dy > 0.5) parts.push("下");
  else if (dy < -0.5) parts.push("上");

  return parts.join("") || "原地";
}

/** 判断 `candidate` 是不是 `element` 的祖先（用 indexPath 前缀表示） */
function isAncestorPath(ancestor: number[], descendant: number[]): boolean {
  if (ancestor.length >= descendant.length) return false;

  return ancestor.every((value, index) => descendant[index] === value);
}

/**
 * 比较相邻两步的可见元素快照，找出「已可见元素被顶跑」的位移。
 *
 * **配对规则**：只取两步都可见的元素，按 `key`（稳定标识，不含数组下标）配对。只在一步里出现的元素 视为"出现 / 消失"，不算违例。
 */
export function compareStepSnapshots(
  before: VisibleElementSnapshot[],
  after: VisibleElementSnapshot[],
  options: CompareOptions,
): StabilityStepResult {
  const afterByKey = new Map(after.map((element) => [element.key, element]));
  const shifts: StabilityShift[] = [];
  let compared = 0;

  for (const previous of before) {
    const current = afterByKey.get(previous.key);

    if (!current) continue;

    compared += 1;

    const dx = round(current.rect.x - previous.rect.x);
    const dy = round(current.rect.y - previous.rect.y);
    const distance = round(Math.hypot(dx, dy));

    if (distance <= options.tolerance) continue;

    shifts.push({
      key: previous.key,
      path: previous.path,
      selector: previous.selector,
      indexPath: previous.indexPath,
      tag: previous.tag,
      id: previous.id,
      classes: previous.classes,
      text: previous.text || current.text,
      dx,
      dy,
      distance,
      direction: describeShiftDirection(dx, dy),
      outermost: true,
      ignored: previous.ignored || current.ignored,
      before: previous.rect,
      after: current.rect,
    });
  }

  // 父级也动了 → 这是被牵连的子元素；改最外层那个才有效
  for (const shift of shifts)
    shift.outermost = !shifts.some(
      (other) => other !== shift && isAncestorPath(other.indexPath, shift.indexPath),
    );

  shifts.sort(
    (left, right) =>
      Number(left.ignored) - Number(right.ignored) ||
      right.distance - left.distance ||
      left.path.localeCompare(right.path),
  );

  const counted = shifts.filter((shift) => !shift.ignored);

  return {
    slide: options.slide,
    title: options.title,
    from: options.from,
    to: options.to,
    compared,
    shifts,
    ignoredCount: shifts.length - counted.length,
    maxShift: counted.length ? Math.max(...counted.map((shift) => shift.distance)) : 0,
    maxIgnoredShift: shifts.length
      ? Math.max(...shifts.filter((shift) => shift.ignored).map((shift) => shift.distance), 0)
      : 0,
  };
}

/** 一个课件里「有违例位移」的步骤 */
export function collectStabilityViolations(steps: StabilityStepResult[]): StabilityStepResult[] {
  return steps.filter((step) => step.shifts.some((shift) => !shift.ignored));
}

/** 一个课件里被顶跑过的页面号（去重、升序） */
export function collectStabilitySlides(steps: StabilityStepResult[]): number[] {
  return [...new Set(collectStabilityViolations(steps).map((step) => step.slide))].sort(
    (left, right) => left - right,
  );
}

/** 一个课件里最大的违例位移（像素） */
export function maxStabilityShift(steps: StabilityStepResult[]): number {
  const values = steps.filter((step) => step.maxShift > 0).map((step) => step.maxShift);

  return values.length ? Math.max(...values) : 0;
}
