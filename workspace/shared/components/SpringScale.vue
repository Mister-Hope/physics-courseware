<script setup lang="ts">
import { computed, useId } from "vue";

interface Point {
  x: number;
  y: number;
}

/**
 * 弹簧测力计（**只能在 `<svg>` 里用**，与 `CourseArrow` / `SurfaceHatch` 同类；不能当 HTML 元素直接写，也**不能用 ` ```comp `
 * 代码块** ——代码块只能写在 markdown 顶层、进不了 `<svg>`）。
 *
 * 造型按实验室"条形盒刻度尺式"真实测力计精修设计：
 *
 * - **外壳扁细长**：宽 : 长 = **1 : 5.5**（`thickness` 只能把外壳改窄，最宽就是默认的 1 : 5.5）；
 * - **上下金属护套端盖 + 四角铆钉**：还原真实物理实验室条形盒测力计外观；
 * - **外壳三栏布局**：左刻度列（1/3 宽）｜中间深色导向凹槽（1/3 宽）｜右刻度列（1/3 宽）；
 * - **凹槽内可见动态螺旋弹簧与中心拉杆**：弹簧上端锚定在零点上方，下端随 `force` 真实拉伸，下方连接金属拉杆直通底部挂钩；
 * - **挂钩随拉力动态外伸 + 居中相切问号钩（`?` 形 J 钩）**：拉力增大时，金属拉杆与挂钩随指针同步向外伸出（外伸量 `extension` 与 `force / maxForce`
 *   成正比，1:1 刚体同步）；拉杆从中轴线 `across = S/2` 垂直伸出，经相切过渡圆弧进入**圆心严格落在中轴线 `across = S/2` 上**的圆钩。
 *
 * 一处画好、各课复用：3.2 摩擦力（拉物块测滑动摩擦力）、3.3 牛顿第三定律（两台对拉）、3.4 力的合成（两台成角度拉结点）都有测力计要画， 一律用它，别再在各课手画表身/刻度/挂钩。
 *
 * ```html
 * <!-- ① 竖直悬挂：量程 5 N、分度 0.2 N、示数 2.4 N、带读数框（数字与读数框都在左侧） -->
 * <SpringScale :x="40" :y="12" :length="300" :force="2.4" label="2.4" />
 *
 * <!-- ② 两台水平对拉：B 加 mirror（吊环与挂钩换端、刻度数字也整体镜像）。
 *      位置别手算——用 A 暴露的 hookEnd / extension 让两个钩子咬合，见下面「对拉配方」 -->
 * <SpringScale
 *   ref="a"
 *   :x="10"
 *   :y="40"
 *   :length="300"
 *   orientation="horizontal"
 *   :force="3"
 *   label="3"
 * />
 * <SpringScale
 *   :x="bX"
 *   :y="40"
 *   :length="300"
 *   orientation="horizontal"
 *   :force="3"
 *   mirror
 *   label="3"
 *   number-side="right"
 * />
 *
 * <!-- ③ 只画表身（不要吊环 / 挂钩），自己接绳子：量程 10 N、数字标右侧、整体缩到 0.8 倍 -->
 * <SpringScale
 *   :x="6"
 *   :y="6"
 *   :length="360"
 *   :scale="0.8"
 *   :max-force="10"
 *   :ring="false"
 *   :hook="false"
 *   number-side="right"
 * />
 * ```
 *
 * ## 位置与占位（都是父级 `<svg>` 的 viewBox 用户单位）
 *
 * 记外壳宽 `S`、外壳长 `L = length × scale`：`S = min(thickness || length / 5.5, length / 5.5) ×
 * scale`（`thickness` 给大了会被夹回，只会更窄）。
 *
 * - `x` / `y` = **外壳靠吊环那一端的外角**（竖直 = 左上角，水平 = 左端上角）；
 * - 沿轴线占位 = `(ring ? 0.8S : 0) + L + (hook ? 0.64S : 0) + extension`（吊环 0.8S、挂钩 0.64S 是组件内的固定比例）；
 * - 垂直轴线占位 = `S`；有 `label` 时读数框那一侧再占 `0.61S`；
 * - `extension = clamp(force / maxForce, 0, 1) × (L − 1.05S)`：**示数一变，整机占位就变**——零位约 1.26 倍外壳长、满量程约
 *   2.07 倍，viewBox 要按页面上出现的最大示数留足，否则挂钩会被裁掉；
 * - ⚠️ 传了 `mirror` 时图形**不是**从 `x` / `y` 起画：它会沿轴**反向**再多伸出 `extension`（水平镜像时"左边缘 = x − extension"）。
 *   对拉请照下面「对拉配方」用暴露坐标算位置，别按"x 就是左边缘"摆。
 *
 * ## props 全表
 *
 * | prop          | 类型                            | 默认                  | 说明                                                                                     |
 * | ------------- | ----------------------------- | ------------------- | -------------------------------------------------------------------------------------- |
 * | `x` / `y`     | `number`                      | `0` / `0`           | 外壳靠吊环那一端的外角在父级 `<svg>` 里的位置                                                            |
 * | `scale`       | `number`                      | `1`                 | 整体缩放（外壳长宽、刻度、字号一起缩；不影响 `x` / `y`）                                                      |
 * | `length`      | `number`                      | `300`               | **外壳长度**（不含吊环与挂钩），单位 viewBox 用户单位                                                      |
 * | `thickness`   | `number`                      | `0`                 | 外壳宽度；`0` = 自动取 `length / 5.5`；给大了夹回 `length / 5.5`（外宽上限 1 : 5.5）                       |
 * | `orientation` | `"vertical"` / `"horizontal"` | `"vertical"`        | 竖直（挂钩朝下）/ 水平（挂钩朝右）                                                                     |
 * | `force`       | `number`                      | `0`                 | 当前示数（N）：指针位置 = `clamp(force / maxForce, 0, 1)`，真实线性，同时决定挂钩外伸量                          |
 * | `maxForce`    | `number`                      | `5`                 | 量程（N）；`≤ 0` 按 `1` 处理                                                                   |
 * | `division`    | `number`                      | `0.2`               | 分度值（N）：每 `division` 一根短刻度；主刻度（带数字）步长由量程自动取（保证数字 ≤ 6 个）                                 |
 * | `numberSide`  | `"left"` / `"right"`          | `"left"`            | 刻度数字（与读数框）标在哪一侧；竖直 = 左/右列，水平 = 上/下列；另一侧只有刻度线                                           |
 * | `showNumbers` | `boolean`                     | `true`              | 是否显示刻度数字与单位 `N`                                                                        |
 * | `showPointer` | `boolean`                     | `true`              | 是否显示游标指针                                                                               |
 * | `color`       | `string`                      | `var(--c-text-dim)` | 外壳 / 吊环 / 挂钩等金属件与细刻度颜色                                                                 |
 * | `accent`      | `string`                      | `var(--c-accent)`   | 指针、读数框、单位 `N` 的强调色                                                                     |
 * | `ring`        | `boolean`                     | `true`              | 是否画顶部吊环（带连接杆与调零轴套）                                                                     |
 * | `hook`        | `boolean`                     | `true`              | 是否画底部挂钩（拉杆 + 过渡圆弧 + 3/4 圆钩一体成形）                                                        |
 * | `mirror`      | `boolean`                     | `false`             | 沿轴线整体镜像：吊环与挂钩换端、挂钩朝向反转、刻度数字顺序反转（对拉场景用）                                                 |
 * | `label`       | `string`                      | `""`                | 读数框文本，**只给数值/符号部分**（如 `"2.4"`、`"F"`），单位 `N` 由组件补；纯数字走 `KaTeX_Main`，其它走 `KaTeX_Math` 斜体 |
 *
 * ## `defineExpose`：暴露的关键坐标（父级 `<svg>` 坐标系下的实时响应式值）
 *
 * | 名称           | 类型         | 说明                                             |
 * | ------------ | ---------- | ---------------------------------------------- |
 * | `hookCenter` | `{ x, y }` | 挂钩圆弧**圆心**                                     |
 * | `hookEnd`    | `{ x, y }` | 挂钩沿轴线**最远端极点**——两个测力计对拉时对齐它（不是对齐 `hookCenter`） |
 * | `hookNeck`   | `{ x, y }` | 挂钩直拉杆与过渡圆弧的交接点                                 |
 * | `ringCenter` | `{ x, y }` | 顶部吊环圆心                                         |
 * | `ringEnd`    | `{ x, y }` | 顶部吊环最外端极点                                      |
 * | `pointerPos` | `{ x, y }` | 当前游标指针中心                                       |
 * | `extension`  | `number`   | 当前拉杆随拉力外伸的位移量（viewBox 用户单位）                    |
 * | `hookRadius` | `number`   | 挂钩主圆弧半径                                        |
 *
 * **对拉配方**（A 正常、B 镜像、两者示数相同）——`bX` 必须用 A 的实时坐标算，不能写死：
 *
 * ```ts
 * const a = ref<{ hookEnd: { x: number }; extension: number } | null>(null);
 * // B 的 hookEnd 与 A 的 hookEnd 重合：两个钩圆恰好外切，看着像互相挂住
 * const bX = computed(() => (a.value ? a.value.hookEnd.x + a.value.extension : 0));
 * ```
 *
 * 想让两钩咬得更深，可在此基础上再沿轴靠近约 `0.5 × hookRadius`（改动后请截图确认，别让钩身穿过对方钩圆）。竖直方向对拉同理，换成 `y`。
 *
 * ## 尺寸与字号（决定后排看不看得清）
 *
 * - 组件内字号都是外壳宽 `S` 的比例：**刻度数字 = 0.17S、单位 `N` = 0.175S、读数框 = 0.26S**（两位数字的主刻度还会再缩）；
 * - 渲染后字号 ≈ 组件内字号 × 渲染宽 ÷ viewBox 宽。整台测力计轴线长约 `7S`（零位）～`9.2S`（半量程以上）， 所以**竖直挂一整台、给到 430px 高时刻度数字只有约
 *   8px**——这是 1 : 5.5 细长比例的必然结果，不是 bug；
 * - 因此：① viewBox 要紧贴图形包围盒（别留大边，留了白就等于把字号缩小）；② 竖直单台用 `style="height:100%;width:auto"`， **不要
 *   `width:100%`**（1 : 5.5 的细长图会按宽度撑高、顶破页面）；③ 要让学生看清示数，用 `label` 读数框（比刻度数字大 1.5 倍）并让整机占满页高。
 *
 * ## 其它约定
 *
 * - **超出量程**（`force > maxForce` 或 `force < 0`）：指针停在端点**并变红**，读数框同步变红；
 * - `color` / `accent` 默认走设计系统变量；组件内部的半透明色一律**无空格** `rgba(...)`（SVG 属性里的空格会被 UnoCSS attributify
 *   当工具类）；
 * - 内部渐变 id 用 `useId()` 生成，同一页放多台测力计不会串色。
 */

const RATIO = 5.5;
const MIN_ASPECT = 5.5;
const LABEL_STEPS = [0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 2.5, 5, 10, 20, 25, 50, 100];

/** 三栏布局（都是外壳宽 S 的比例）：左刻度列 [0, 1/3]、凹槽 [1/3, 2/3]、右刻度列 [2/3, 1] */
const GROOVE_V0 = 1 / 3;
const GROOVE_V1 = 2 / 3;
/** 刻度线：外端离壳壁 0.055 S，细刻度长 0.08 S、半刻度长 0.108 S、主刻度长 0.138 S */
const TICK_V0 = 0.055;
const TICK_MINOR = 0.08;
const TICK_HALF = 0.108;
const TICK_MAJOR = 0.138;
/** 刻度数字列中心（落在刻度列靠凹槽的那一半里） */
const NUMBER_V = 0.265;
/** 刻度数字可用的横向宽度（S 的比例），超过就自动缩小字号 */
const NUMBER_WIDTH = 0.136;
/** 测针：两端伸进两侧刻度列，中间跨过凹槽 */
const NEEDLE_V0 = 0.095;
const NEEDLE_V1 = 0.905;
const NEEDLE_HALF = 0.03;
/** 挂钩：零位基础直杆段 + 颈部过渡圆弧 + 居中 3/4 圆钩（外伸行程与指针位移 1:1 刚体同步） */
const HOOK_BASE_STEM = 0.1;
const HOOK_ELBOW = 0.1;
const HOOK_RADIUS = 0.23;
/** 刻度上端留出写单位 `N` 的空档、下端留一点收尾 */
const SCALE_TOP = 0.7;
const SCALE_BOTTOM = 0.35;
/** 单位 `N` 离外壳上端的距离 */
const UNIT_U = 0.32;

const decimalCount = (step: number): number => {
  if (!Number.isFinite(step) || step <= 0) return 0;

  const text = step.toFixed(6).replace(/0+$/u, "");
  const dot = text.indexOf(".");

  return dot === -1 ? 0 : Math.min(text.length - dot - 1, 3);
};

const {
  x = 0,
  y = 0,
  scale = 1,
  length = 300,
  thickness = 0,
  orientation = "vertical",
  force = 0,
  maxForce = 5,
  division = 0.2,
  numberSide = "left",
  showNumbers = true,
  showPointer = true,
  color = "var(--c-text-dim)",
  accent = "var(--c-accent)",
  ring = true,
  hook = true,
  mirror = false,
  label = "",
  // eslint-disable-next-line vue/max-props
} = defineProps<{
  /** 外壳左上角（吊环端）在父级 `<svg>` 里的 x */
  x?: number;
  /** 外壳左上角（吊环端）在父级 `<svg>` 里的 y */
  y?: number;
  /** 整体缩放倍率（长宽、刻度、字号一起缩） */
  scale?: number;
  /** 外壳长度（不含吊环与挂钩） */
  length?: number;
  /** 外壳宽度；`0`（默认）= 自动按 `length / 5.5`，给大了夹回 `length / 5.5`（外宽上限 1 : 5.5） */
  thickness?: number;
  /** `vertical` = 竖直（挂钩朝下）；`horizontal` = 水平（挂钩朝右） */
  orientation?: "vertical" | "horizontal";
  /** 当前示数（N） */
  force?: number;
  /** 量程（N） */
  maxForce?: number;
  /** 分度值（N） */
  division?: number;
  /** 刻度数字标在哪一侧（竖直=左/右列，水平=上/下列） */
  numberSide?: "left" | "right";
  /** 是否显示刻度数字与单位 `N` */
  showNumbers?: boolean;
  /** 是否显示测针 */
  showPointer?: boolean;
  /** 金属件与细刻度颜色 */
  color?: string;
  /** 测针 / 读数框 / 单位标注的强调色 */
  accent?: string;
  /** 是否画顶部吊环 */
  ring?: boolean;
  /** 是否画底部挂钩 */
  hook?: boolean;
  /** 沿轴线整体镜像：吊环与挂钩换端、挂钩朝向反转（对拉场景用） */
  mirror?: boolean;
  /** 表盘旁读数文本（只给数字部分，单位由组件补） */
  label?: string;
}>();

const uid = useId();
const caseGradId = `ss-case-${uid}`;
const capGradId = `ss-cap-${uid}`;
const grooveGradId = `ss-groove-${uid}`;

const isVertical = computed(() => orientation === "vertical");
const safeMax = computed(() => (maxForce > 0 ? maxForce : 1));
const forceRatio = computed(() => Math.min(Math.max(force / safeMax.value, 0), 1));
const caseLength = computed(() => length * scale);
const caseThickness = computed(() => {
  const raw = thickness > 0 ? thickness : length / RATIO;

  return Math.min(raw, length / MIN_ASPECT) * scale;
});

const geo = computed(() => {
  const size = caseThickness.value;
  const body = caseLength.value;
  /** 吊环半径 / 连接杆长（吊环总占 0.8 倍外壳宽） */
  const ringRadius = size * 0.28;
  const ringStem = size * 0.24;
  const ringExtent = ring ? ringRadius * 2 + ringStem : 0;
  const bodyTop = ringExtent;
  const bodyBottom = bodyTop + body;

  const scaleTop = bodyTop + size * SCALE_TOP;
  const scaleBottom = bodyBottom - size * SCALE_BOTTOM;
  const scaleSpan = scaleBottom - scaleTop;

  /**
   * 随拉力 1:1 刚体同步外伸的居中 `?` 形挂钩几何计算：
   *
   * - 测针、拉杆、挂钩属于同一根刚性连接杆，因此挂钩外伸位移 `extension` 严格等于指针位移 `forceRatio * scaleSpan`！
   * - 任何拉力下，`stemEnd - pointer.along` 恒等于定长 `baseStemEnd - scaleTop`。
   */
  const baseStemLen = size * HOOK_BASE_STEM;
  const extension = hook ? forceRatio.value * scaleSpan : 0;
  const elbowRadius = size * HOOK_ELBOW;
  const hookRadius = size * HOOK_RADIUS;
  const dyCenters = Math.sqrt(hookRadius * hookRadius + 2 * hookRadius * elbowRadius);

  const baseStemEnd = bodyBottom + baseStemLen;
  const baseHookCy = baseStemEnd + dyCenters;
  const baseHookTail = hook ? baseHookCy + hookRadius : bodyBottom;

  const stemEnd = baseStemEnd + extension;
  const hookCy = stemEnd + dyCenters;
  const hookTail = hook ? hookCy + hookRadius : bodyBottom;

  return {
    size,
    body,
    ringRadius,
    ringStem,
    ringExtent,
    bodyTop,
    bodyBottom,
    extension,
    stemEnd,
    elbowRadius,
    hookRadius,
    hookCy,
    hookTail,
    /** 镜像翻转基准跨度取零位跨度 `baseHookTail`，确保 `mirror` 时吊环固定在远端、挂钩随力向反方向伸出 */
    baseAxisSpan: baseHookTail,
    axisSpan: hookTail,
    scaleTop,
    scaleBottom,
    scaleSpan,
    numberV: size * NUMBER_V,
    unitU: bodyTop + size * UNIT_U,
    capHeight: size * 0.17,
  };
});

/**
 * 局部坐标 `(along, across)` → 组件内部绘图坐标（已处理 `orientation` 与 `mirror`）
 *
 * @param along 沿外壳长度的坐标（吊环端 0 → 挂钩端）
 * @param across 横跨外壳宽度的坐标（0 → S）
 * @returns 组件内部绘图坐标
 */
const mapPoint = (along: number, across: number): Point => {
  const mapped = mirror ? geo.value.baseAxisSpan - along : along;

  return isVertical.value ? { x: across, y: mapped } : { x: mapped, y: across };
};

/**
 * 局部坐标 `(along, across)` → 父级 `<svg>` 全局坐标（加上 `x, y` 偏移，供 `defineExpose` 暴露给外部连线或对齐）
 *
 * @param along 沿外壳长度的坐标（吊环端 0 → 挂钩端）
 * @param across 横跨外壳宽度的坐标（0 → S）
 * @returns 父级 `<svg>` 坐标系下的点
 */
const toWorldPoint = (along: number, across: number): Point => {
  const point = mapPoint(along, across);

  return { x: x + point.x, y: y + point.y };
};

const localTransform = computed(() => {
  const span = geo.value.baseAxisSpan;

  if (isVertical.value) return mirror ? `matrix(1 0 0 -1 0 ${span})` : "matrix(1 0 0 1 0 0)";

  return mirror ? `matrix(0 1 -1 0 ${span} 0)` : `matrix(0 1 1 0 0 0)`;
});

const tickValues = computed(() => {
  const step = division > 0 ? division : safeMax.value;
  const count = Math.floor(safeMax.value / step + 1e-9);
  const values: number[] = [];

  for (let index = 0; index <= count; index++) values.push(index * step);

  const last = values[values.length - 1] ?? 0;

  if (last < safeMax.value - 1e-9) values.push(safeMax.value);

  return values;
});

const labelStep = computed(
  () => LABEL_STEPS.find((step) => safeMax.value / step <= 6) ?? safeMax.value,
);

const decimals = computed(() => decimalCount(labelStep.value));

const ticks = computed(() => {
  const { scaleSpan, scaleTop, size } = geo.value;
  const step = division > 0 ? division : safeMax.value;
  const spacing = scaleSpan / Math.max(1, safeMax.value / step);
  const skip = Math.max(1, Math.ceil(2.8 / Math.max(spacing, 1e-6)));
  const halfStep = labelStep.value / 2;

  return tickValues.value
    .map((value, index) => {
      const major = Math.abs(value / labelStep.value - Math.round(value / labelStep.value)) < 1e-6;
      const isHalf = !major && Math.abs(value / halfStep - Math.round(value / halfStep)) < 1e-6;
      const tickLength = major ? size * TICK_MAJOR : isHalf ? size * TICK_HALF : size * TICK_MINOR;

      return {
        key: `tick-${index}`,
        index,
        major,
        isHalf,
        value,
        along: scaleTop + (value / safeMax.value) * scaleSpan,
        tickLength,
      };
    })
    .filter((tick) => tick.major || tick.isHalf || tick.index % skip === 0);
});

const numberFontSize = computed(() => {
  const { size } = geo.value;
  const longest = ticks.value
    .filter((tick) => tick.major)
    .reduce((max, tick) => Math.max(max, tick.value.toFixed(decimals.value).length), 1);

  return Math.min(size * 0.17, (size * NUMBER_WIDTH) / (0.62 * longest));
});

const numbers = computed(() => {
  if (!showNumbers) return [];

  const dims = geo.value;
  const across = numberSide === "left" ? dims.numberV : dims.size - dims.numberV;

  return ticks.value
    .filter((tick) => tick.major)
    .map((tick) => {
      const pos = mapPoint(tick.along, across);

      return {
        key: `num-${tick.index}`,
        text: tick.value.toFixed(decimals.value),
        x: pos.x,
        y: pos.y,
      };
    });
});

const unit = computed(() => {
  const dims = geo.value;
  const across = numberSide === "left" ? dims.numberV : dims.size - dims.numberV;

  return mapPoint(dims.unitU, across);
});

const pointer = computed(() => {
  const { scaleSpan, scaleTop, size } = geo.value;
  const along = scaleTop + forceRatio.value * scaleSpan;
  const over = force > safeMax.value + 1e-9 || force < -1e-9;
  const v0 = size * NEEDLE_V0;
  const v1 = size * NEEDLE_V1;
  const grooveStart = size * GROOVE_V0;
  const grooveEnd = size * GROOVE_V1;
  const half = size * NEEDLE_HALF;

  return {
    along,
    over,
    /** 左右双翼三角形指针对准两侧刻度列，中间为凹槽滑块 */
    leftWing: `M ${v0} ${along} L ${grooveStart + size * 0.02} ${along - half} L ${grooveStart + size * 0.02} ${along + half} Z`,
    rightWing: `M ${v1} ${along} L ${grooveEnd - size * 0.02} ${along - half} L ${grooveEnd - size * 0.02} ${along + half} Z`,
    /** 凹槽滑块的 `x / y / width / height`；圆角 `rx` 由模板直接写（`rx` 这个短键名会踩 id-length） */
    carriage: {
      x: grooveStart + size * 0.015,
      y: along - half * 1.15,
      width: grooveEnd - grooveStart - size * 0.03,
      height: half * 2.3,
    },
    color: over ? "var(--c-danger)" : accent,
  };
});

/** 凹槽内部的动态螺旋弹簧路径： 从上端固定锚点 `springTop` 延伸到当前游标指针 `pointer.along`，随拉力 `force` 真实拉伸！ */
const springCoilPath = computed(() => {
  const { bodyTop, size, scaleTop } = geo.value;
  const center = size / 2;
  const springTop = bodyTop + size * 0.24;
  const leadTop = scaleTop - size * 0.14;
  const springBottom = Math.max(leadTop + size * 0.06, pointer.value.along - size * 0.04);
  const span = springBottom - leadTop;
  const turns = 11;
  const step = span / turns;
  const amp = size * 0.095;

  const cmds: string[] = [`M ${center} ${springTop}`, `L ${center} ${leadTop}`];

  for (let i = 0; i < turns; i++) {
    const coilA = leadTop + (i + 0.25) * step;
    const coilB = leadTop + (i + 0.75) * step;
    const coilC = leadTop + (i + 1) * step;
    cmds.push(`L ${center - amp} ${coilA} L ${center + amp} ${coilB} L ${center} ${coilC}`);
  }

  cmds.push(`L ${center} ${pointer.value.along}`);
  return cmds.join(" ");
});

/**
 * 随拉力动态外伸的居中相切 `?` 形挂钩路径（局部坐标，一条 C¹ 连续 path 连到底）：
 *
 * 1. 从外壳底部轴套沿着中心线 `across = S/2` 竖直向下延伸至 `stemEnd`（含随力外伸量 `extension`）；
 * 2. 以 `(center + elbowR, stemEnd)` 为圆心、半径 `elbowR` 逆时针走一段过渡圆弧至外切点 `(tangentX, tangentY)`；
 * 3. 以 `(center, hookCy)`（严格位于中轴线！）为圆心、半径 `hookR` 顺时针扫过主钩圆弧， 经过右侧极点、正下方中轴线最远承力点 `(center, hookCy +
 *    hookR)`、左侧极点，收尾于左上方钩尖。
 */
const hookPath = computed(() => {
  const { bodyBottom, elbowRadius: elbowR, hookRadius: hookR, hookCy, size, stemEnd } = geo.value;
  const center = size / 2;
  const stemStart = bodyBottom - size * 0.02;
  const dy = hookCy - stemEnd;

  // 两圆外切点 P (将两圆心连线按 elbowR : hookR 内分)
  const tangentX = center + (elbowR * hookR) / (elbowR + hookR);
  const tangentY = stemEnd + (dy * elbowR) / (elbowR + hookR);

  // 钩尖收尾在主钩圆左上方约 22° 处，开口朝向挂杆一侧
  const tipAngle = (22 * Math.PI) / 180;
  const tipX = center - hookR * Math.cos(tipAngle);
  const tipY = hookCy - hookR * Math.sin(tipAngle);

  return [
    `M ${center} ${stemStart}`,
    `L ${center} ${stemEnd}`,
    `A ${elbowR} ${elbowR} 0 0 0 ${tangentX} ${tangentY}`,
    `A ${hookR} ${hookR} 0 1 1 ${tipX} ${tipY}`,
  ].join(" ");
});

const readout = computed(() => {
  if (label === "") return null;

  const { scaleBottom, scaleTop, size } = geo.value;
  const fontSize = size * 0.26;
  const span = [...label].length * fontSize * 0.58 + fontSize * 1.2;
  const bar = fontSize * 1.75;
  const center = Math.min(
    Math.max(pointer.value.along, scaleTop + span / 2),
    scaleBottom - span / 2,
  );
  const inner = numberSide === "left" ? -size * 0.16 : size * 1.16;
  const outer = numberSide === "left" ? inner - bar : inner + bar;
  const vLo = Math.min(inner, outer);
  const vHi = Math.max(inner, outer);
  const text = mapPoint(center, (vLo + vHi) / 2);
  const boxWidth = vHi - vLo;
  /** 竖直模式下读数上下纵向排列（上行数值、下行单位 N），字号按盒子宽度自适应防溢出 */
  const vertValueSize = Math.min(
    fontSize * 0.9,
    (boxWidth * 0.82) / Math.max(1, [...label].length * 0.52),
  );
  const vertUnitSize = fontSize * 0.8;

  return {
    fontSize,
    vertValueSize,
    vertUnitSize,
    rect: { x: vLo, y: center - span / 2, width: boxWidth, height: span },
    connector: {
      x1: size / 2,
      y1: pointer.value.along,
      x2: numberSide === "left" ? vHi : vLo,
      y2: center,
    },
    textX: text.x,
    textY: text.y,
    color: pointer.value.over ? "var(--c-danger)" : accent,
  };
});

const labelFont = computed(() =>
  /^-?\d+(?:\.\d+)?$/u.test(label.trim()) ? "KaTeX_Main" : "KaTeX_Math",
);
const labelItalic = computed(() => labelFont.value === "KaTeX_Math");

/** ==================== 对外暴露的关键几何坐标（父级 <svg> 坐标系） ==================== */
/** 挂钩主圆弧的圆心坐标 `{ x, y }` */
const hookCenter = computed<Point>(() => toWorldPoint(geo.value.hookCy, geo.value.size / 2));
/** 挂钩最远端（外极点）坐标 `{ x, y }` —— 两个测力计对拉咬合或挂接细绳时应对齐此点 */
const hookEnd = computed<Point>(() => toWorldPoint(geo.value.hookTail, geo.value.size / 2));
/** 挂钩直拉杆末端（进入弯钩前）坐标 `{ x, y }` */
const hookNeck = computed<Point>(() => toWorldPoint(geo.value.stemEnd, geo.value.size / 2));
/** 顶部吊环圆心坐标 `{ x, y }` */
const ringCenter = computed<Point>(() => toWorldPoint(geo.value.ringRadius, geo.value.size / 2));
/** 顶部吊环最外端极点坐标 `{ x, y }` */
const ringEnd = computed<Point>(() => toWorldPoint(0, geo.value.size / 2));
/** 当前游标指针中心坐标 `{ x, y }` */
const pointerPos = computed<Point>(() => toWorldPoint(pointer.value.along, geo.value.size / 2));
/** 当前挂钩随拉力外伸的位移量（viewBox 用户单位） */
const extension = computed<number>(() => geo.value.extension);
/** 挂钩圆弧半径（viewBox 用户单位） */
const hookRadius = computed<number>(() => geo.value.hookRadius);

defineExpose({
  hookCenter,
  hookEnd,
  hookNeck,
  ringCenter,
  ringEnd,
  pointerPos,
  extension,
  hookRadius,
});
</script>

<template>
  <g
    class="spring-scale"
    :transform="`translate(${x},${y})`"
    role="img"
    :aria-label="`弹簧测力计，量程 ${safeMax} N，分度值 ${division} N，示数 ${force} N`"
  >
    <defs>
      <!-- 表身拉丝金属质感横向渐变（严格使用无空格 rgba 避免 UnoCSS attributify 误解析） -->
      <linearGradient :id="caseGradId" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(148,163,184,0.22)" />
        <stop offset="22%" stop-color="rgba(226,232,240,0.16)" />
        <stop offset="50%" stop-color="rgba(148,163,184,0.11)" />
        <stop offset="78%" stop-color="rgba(226,232,240,0.16)" />
        <stop offset="100%" stop-color="rgba(100,116,139,0.24)" />
      </linearGradient>
      <!-- 上下金属护套端盖渐变 -->
      <linearGradient :id="capGradId" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(100,116,139,0.42)" />
        <stop offset="50%" stop-color="rgba(148,163,184,0.25)" />
        <stop offset="100%" stop-color="rgba(71,85,105,0.45)" />
      </linearGradient>
      <!-- 中央凹槽内腔阴影渐变 -->
      <linearGradient :id="grooveGradId" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(2,6,23,0.78)" />
        <stop offset="50%" stop-color="rgba(15,23,42,0.58)" />
        <stop offset="100%" stop-color="rgba(2,6,23,0.78)" />
      </linearGradient>
    </defs>

    <g class="spring-scale-parts" :transform="localTransform">
      <!-- ==================== 底部居中相切挂钩与轴套（随拉力动态外伸） ==================== -->
      <g v-if="hook" class="spring-scale-hook">
        <!-- 挂钩主金属杆 -->
        <path
          :d="hookPath"
          fill="none"
          :stroke="color"
          :stroke-width="geo.size * 0.072"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <!-- 挂钩表面高光细线，增强圆柱金属立体感 -->
        <path
          :d="hookPath"
          fill="none"
          stroke="var(--c-text)"
          :stroke-width="geo.size * 0.02"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity="0.35"
        />
        <!-- 外壳底部出杆金属轴套 (Bottom Collar，固定在外壳底端) -->
        <rect
          :x="geo.size * 0.36"
          :y="geo.bodyBottom - geo.size * 0.01"
          :width="geo.size * 0.28"
          :height="geo.size * 0.075"
          :rx="geo.size * 0.025"
          :fill="`url(#${capGradId})`"
          :stroke="color"
          :stroke-width="geo.size * 0.02"
        />
      </g>

      <!-- ==================== 顶部调零吊环与螺母轴套 ==================== -->
      <g v-if="ring" class="spring-scale-ring">
        <!-- 吊环连接杆 -->
        <line
          :x1="geo.size / 2"
          :y1="geo.ringRadius * 2"
          :x2="geo.size / 2"
          :y2="geo.bodyTop + geo.size * 0.02"
          :stroke="color"
          :stroke-width="geo.size * 0.072"
          stroke-linecap="round"
        />
        <!-- 顶部调零螺母轴套 (Top Swivel Collar) -->
        <rect
          :x="geo.size * 0.34"
          :y="geo.bodyTop - geo.size * 0.08"
          :width="geo.size * 0.32"
          :height="geo.size * 0.09"
          :rx="geo.size * 0.025"
          :fill="`url(#${capGradId})`"
          :stroke="color"
          :stroke-width="geo.size * 0.02"
        />
        <!-- 顶部圆形吊环 -->
        <circle
          :cx="geo.size / 2"
          :cy="geo.ringRadius"
          :r="geo.ringRadius"
          fill="none"
          :stroke="color"
          :stroke-width="geo.size * 0.075"
        />
        <circle
          :cx="geo.size / 2"
          :cy="geo.ringRadius"
          :r="geo.ringRadius"
          fill="none"
          stroke="var(--c-text)"
          :stroke-width="geo.size * 0.02"
          opacity="0.35"
        />
      </g>

      <!-- ==================== 测力计主壳体与上下金属端盖 ==================== -->
      <!-- 主体面板 -->
      <rect
        class="spring-scale-case"
        :x="0"
        :y="geo.bodyTop"
        :width="geo.size"
        :height="geo.body"
        :rx="geo.size * 0.13"
        :fill="`url(#${caseGradId})`"
        :stroke="color"
        :stroke-width="geo.size * 0.026"
      />

      <!-- 上端金属护盖 -->
      <rect
        :x="geo.size * 0.013"
        :y="geo.bodyTop + geo.size * 0.013"
        :width="geo.size * 0.974"
        :height="geo.capHeight"
        :rx="geo.size * 0.11"
        :fill="`url(#${capGradId})`"
      />
      <line
        :x1="geo.size * 0.02"
        :y1="geo.bodyTop + geo.capHeight"
        :x2="geo.size * 0.98"
        :y2="geo.bodyTop + geo.capHeight"
        :stroke="color"
        :stroke-width="geo.size * 0.016"
        opacity="0.65"
      />

      <!-- 下端金属护盖 -->
      <rect
        :x="geo.size * 0.013"
        :y="geo.bodyBottom - geo.capHeight - geo.size * 0.013"
        :width="geo.size * 0.974"
        :height="geo.capHeight"
        :rx="geo.size * 0.11"
        :fill="`url(#${capGradId})`"
      />
      <line
        :x1="geo.size * 0.02"
        :y1="geo.bodyBottom - geo.capHeight"
        :x2="geo.size * 0.98"
        :y2="geo.bodyBottom - geo.capHeight"
        :stroke="color"
        :stroke-width="geo.size * 0.016"
        opacity="0.65"
      />

      <!-- 四角固定小铆钉 -->
      <g :fill="color" opacity="0.65">
        <circle
          :cx="geo.size * 0.15"
          :cy="geo.bodyTop + geo.capHeight * 0.52"
          :r="geo.size * 0.022"
        />
        <circle
          :cx="geo.size * 0.85"
          :cy="geo.bodyTop + geo.capHeight * 0.52"
          :r="geo.size * 0.022"
        />
        <circle
          :cx="geo.size * 0.15"
          :cy="geo.bodyBottom - geo.capHeight * 0.52"
          :r="geo.size * 0.022"
        />
        <circle
          :cx="geo.size * 0.85"
          :cy="geo.bodyBottom - geo.capHeight * 0.52"
          :r="geo.size * 0.022"
        />
      </g>

      <!-- ==================== 中央导向凹槽、内置弹簧与中心拉杆 ==================== -->
      <rect
        class="spring-scale-groove"
        :x="geo.size * GROOVE_V0"
        :y="geo.bodyTop + geo.size * 0.19"
        :width="geo.size * (GROOVE_V1 - GROOVE_V0)"
        :height="geo.body - geo.size * 0.38"
        :rx="geo.size * 0.055"
        :fill="`url(#${grooveGradId})`"
        stroke="rgba(148,163,184,0.34)"
        :stroke-width="geo.size * 0.014"
      />

      <!-- 指针下方的金属拉杆（穿过凹槽直通底部轴套与挂钩） -->
      <line
        :x1="geo.size / 2"
        :y1="pointer.along"
        :x2="geo.size / 2"
        :y2="geo.bodyBottom - geo.size * 0.19"
        :stroke="color"
        :stroke-width="geo.size * 0.036"
        stroke-linecap="round"
        opacity="0.7"
      />

      <!-- 指针上方的螺旋弹簧（随示数动态拉伸） -->
      <path
        :d="springCoilPath"
        fill="none"
        :stroke="color"
        :stroke-width="geo.size * 0.024"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.82"
      />
      <!-- 弹簧顶部固定销钉 -->
      <circle
        :cx="geo.size / 2"
        :cy="geo.bodyTop + geo.size * 0.24"
        :r="geo.size * 0.028"
        :fill="color"
      />

      <!-- ==================== 左右对称刻度线 ==================== -->
      <g class="spring-scale-ticks" stroke-linecap="round">
        <line
          v-for="tick in ticks"
          :key="`left-${tick.key}`"
          :x1="geo.size * TICK_V0"
          :y1="tick.along"
          :x2="geo.size * TICK_V0 + tick.tickLength"
          :y2="tick.along"
          :stroke="tick.major ? 'var(--c-text)' : color"
          :stroke-width="tick.major ? geo.size * 0.026 : geo.size * 0.017"
          :opacity="tick.major ? 0.95 : tick.isHalf ? 0.8 : 0.62"
        />
        <line
          v-for="tick in ticks"
          :key="`right-${tick.key}`"
          :x1="geo.size - geo.size * TICK_V0"
          :y1="tick.along"
          :x2="geo.size - geo.size * TICK_V0 - tick.tickLength"
          :y2="tick.along"
          :stroke="tick.major ? 'var(--c-text)' : color"
          :stroke-width="tick.major ? geo.size * 0.026 : geo.size * 0.017"
          :opacity="tick.major ? 0.95 : tick.isHalf ? 0.8 : 0.62"
        />
      </g>

      <!-- ==================== 双翼游标指针 ==================== -->
      <g v-if="showPointer" class="spring-scale-pointer">
        <!-- 凹槽中央滑块 -->
        <rect
          v-bind="pointer.carriage"
          :rx="geo.size * 0.02"
          :fill="pointer.color"
          stroke="#0f1425"
          :stroke-width="geo.size * 0.014"
        />
        <!-- 左右指向刻度尖翼 -->
        <path
          :d="pointer.leftWing"
          :fill="pointer.color"
          :stroke="pointer.color"
          :stroke-width="geo.size * 0.008"
          stroke-linejoin="round"
        />
        <path
          :d="pointer.rightWing"
          :fill="pointer.color"
          :stroke="pointer.color"
          :stroke-width="geo.size * 0.008"
          stroke-linejoin="round"
        />
        <!-- 游标中心准星圆点 -->
        <circle :cx="geo.size / 2" :cy="pointer.along" :r="geo.size * 0.02" fill="#0f1425" />
      </g>

      <!-- ==================== 外部读数气泡框 ==================== -->
      <g v-if="readout" class="spring-scale-readout">
        <line
          v-bind="readout.connector"
          :stroke="readout.color"
          :stroke-width="geo.size * 0.02"
          stroke-dasharray="2 2"
          opacity="0.8"
        />
        <rect
          v-bind="readout.rect"
          :rx="readout.rect.width * 0.28"
          fill="rgba(15,20,37,0.88)"
          :stroke="readout.color"
          :stroke-width="geo.size * 0.022"
        />
      </g>
    </g>

    <!-- ==================== 刻度数字与单位 N（独立坐标映射，水平时不旋转） ==================== -->
    <g
      v-if="showNumbers"
      class="spring-scale-numbers"
      fill="var(--c-text)"
      :font-size="numberFontSize"
      font-family="KaTeX_Main"
    >
      <text
        v-for="item in numbers"
        :key="item.key"
        :x="item.x"
        :y="item.y"
        text-anchor="middle"
        dominant-baseline="central"
      >
        {{ item.text }}
      </text>
      <text
        class="spring-scale-unit"
        :x="unit.x"
        :y="unit.y"
        text-anchor="middle"
        dominant-baseline="central"
        font-weight="600"
        :fill="pointer.over ? 'var(--c-danger)' : accent"
        :font-size="geo.size * 0.175"
      >
        N
      </text>
    </g>

    <!-- 竖直模式：数值与单位 N 上下纵向排列，完美贴合竖向读数框 -->
    <text
      v-if="readout && isVertical"
      class="spring-scale-readout-text"
      :x="readout.textX"
      :y="readout.textY"
      text-anchor="middle"
      dominant-baseline="central"
      :fill="readout.color"
    >
      <tspan
        :x="readout.textX"
        :y="readout.textY - readout.fontSize * 0.48"
        :font-size="readout.vertValueSize"
        :font-family="labelFont"
        :font-style="labelItalic ? 'italic' : 'normal'"
      >
        {{ label }}
      </tspan>
      <tspan
        :x="readout.textX"
        :y="readout.textY + readout.fontSize * 0.56"
        :font-size="readout.vertUnitSize"
        font-family="KaTeX_Main"
      >
        N
      </tspan>
    </text>

    <!-- 水平模式：数值与单位 N 左右横向排列 -->
    <text
      v-else-if="readout"
      class="spring-scale-readout-text"
      :x="readout.textX"
      :y="readout.textY"
      text-anchor="middle"
      dominant-baseline="central"
      :font-size="readout.fontSize"
      :fill="readout.color"
    >
      <tspan :font-family="labelFont" :font-style="labelItalic ? 'italic' : 'normal'">
        {{ label }}
      </tspan>
      <tspan font-family="KaTeX_Main" :dx="readout.fontSize * 0.22">N</tspan>
    </text>
  </g>
</template>
