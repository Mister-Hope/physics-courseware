<script setup lang="ts">
import { computed } from "vue";

/**
 * 灵敏电流计表盘（零点居中、指针可左右偏）——**只能在 `<svg>` 里用**（根节点是 `<g>`，写成 HTML 元素页面上什么都不显示， 也不能用 ` ```comp `
 * 代码块）。教师点名统一：**不要再各图手画"圆 + 一根红线 + 轴心点"**。
 *
 * 画法与接线约定（全仓共用这一套，教师要求"明确电流从哪里进、指针从哪里偏"）：
 *
 * - **电流从表盘左右两侧的接线柱进**（9 点 / 3 点，组件画两个小圆点）：导线沿**水平方向**止于 `(x − r, y)` 与 `(x + r, y)`； 表盘串在竖直导线里时（如 U
 *   形导轨回路的左端）用 `terminals="vertical"`，导线沿**竖直方向**止于 `(x, y − r)` 与 `(x, y + r)`。
 * - **指针绕表盘圆心偏转**：零位竖直向上（`angle = 0`），正角 = 顺时针（向屏幕右偏）；刻度弧在上半部、零点居中，左右各约 50°。
 * - 表盘字母默认 `G`（灵敏电流计）；画电流表可传 `"A"`。刻度、指针长度、轴心都随 `r` 等比缩放。
 * - 组件**不画引线、不含交互**：`angle` 由页面绑定的值驱动（如 `:angle="angle"`）。
 *
 * ```html
 * <!-- 无电流：指针居中；两条导线止于左右接线柱 (408,150) / (452,150) -->
 * <Galvanometer :x="430" :y="150" :r="22" :angle="0" />
 * <!-- 有电流：指针顺时针偏 30° -->
 * <Galvanometer :x="430" :y="150" :r="22" :angle="30" />
 * <!-- 表盘串在竖直导线里：导线止于 (236,140) / (236,188) -->
 * <Galvanometer :x="236" :y="164" :r="24" terminals="vertical" :angle="0" />
 * ```
 */
const {
  x = 0,
  y = 0,
  r = 24,
  angle = 0,
  letter = "G",
  terminals = "sides",
  color = "var(--c-text)",
  needleColor = "var(--c-danger)",
  fill = "none",
  lineWidth = 1.8,
} = defineProps<{
  /** 表盘圆心（viewBox 用户单位） */
  x?: number;
  /** 表盘圆心（viewBox 用户单位） */
  y?: number;
  /** 表盘半径（规范值 24，即直径 48 ≈ 电阻长 48） */
  r?: number;
  /** 指针偏角（度）：0 = 竖直向上，正 = 顺时针（向屏幕右偏） */
  angle?: number;
  /** 表盘内的字母：灵敏电流计 `G`（默认）、电流表 `A` */
  letter?: string;
  /** 接线柱位置：`sides` ＝ 左右（9 点 / 3 点，默认）；`vertical` ＝ 上下（12 点 / 6 点，表盘串在竖直导线里时用） */
  terminals?: "sides" | "vertical";
  /** 表壳、刻度线、字母、轴心、接线柱的颜色 */
  color?: string;
  /** 指针颜色 */
  needleColor?: string;
  /** 表壳填充；默认 `none`（组件不画底色） */
  fill?: string;
  /** 表壳线宽 */
  lineWidth?: number;
}>();

const DEG = Math.PI / 180;
// 极坐标 → SVG 坐标（相对表盘圆心）：0° 竖直向上，正角顺时针
const polar = (radius: number, deg: number): { x: number; y: number } => ({
  x: x + radius * Math.sin(deg * DEG),
  y: y - radius * Math.cos(deg * DEG),
});

/** 刻度弧半径（表壳内留一点边） */
const scaleR = computed(() => r * 0.82);
/** 刻度弧与刻度线：从 −50° 到 +50°，共 9 条（零点居中） */
const TICK_ANGLES = [-50, -37.5, -25, -12.5, 0, 12.5, 25, 37.5, 50];
const ticks = computed(() =>
  TICK_ANGLES.map((deg) => ({
    outer: polar(scaleR.value, deg),
    inner: polar(scaleR.value - (deg === 0 ? r * 0.16 : r * 0.1), deg),
  })),
);
/** 刻度弧的路径（从左上到右上，经过顶部） */
const arc = computed(() => {
  const start = polar(scaleR.value, -54);
  const end = polar(scaleR.value, 54);
  return `M ${start.x} ${start.y} A ${scaleR.value} ${scaleR.value} 0 0 1 ${end.x} ${end.y}`;
});
/** 指针尖端（长度 = 0.72r，随 angle 转动） */
const needleTip = computed(() => polar(r * 0.72, angle));
const needleWidth = computed(() => Math.max(1.8, r * 0.09));
/** 接线柱（= 引线端点）：左右两侧或上下两端 */
const terminalPoints = computed(() =>
  terminals === "vertical"
    ? [
        { x, y: y - r },
        { x, y: y + r },
      ]
    : [
        { x: x - r, y },
        { x: x + r, y },
      ],
);
const terminalRadius = computed(() => Math.max(1.5, r * 0.09));
</script>

<template>
  <g class="galvanometer">
    <circle :cx="x" :cy="y" :r="r" :fill="fill" :stroke="color" :stroke-width="lineWidth" />
    <!-- 刻度弧与刻度线（上半部，零点居中） -->
    <path
      :d="arc"
      fill="none"
      :stroke="color"
      :stroke-width="lineWidth * 0.7"
      stroke-linecap="round"
      opacity="0.55"
    />
    <line
      v-for="(tick, index) in ticks"
      :key="'tick' + index"
      :x1="tick.outer.x"
      :y1="tick.outer.y"
      :x2="tick.inner.x"
      :y2="tick.inner.y"
      :stroke="color"
      :stroke-width="lineWidth * 0.7"
      stroke-linecap="round"
      opacity="0.55"
    />
    <!-- 接线柱（电流进 / 出的两个点）：导线止于这里 -->
    <circle
      v-for="(point, index) in terminalPoints"
      :key="'terminal' + index"
      :cx="point.x"
      :cy="point.y"
      :r="terminalRadius"
      :fill="color"
    />
    <!-- 指针（红色，绕表盘圆心转动），轴心盖在上面 -->
    <line
      :x1="x"
      :y1="y"
      :x2="needleTip.x"
      :y2="needleTip.y"
      :stroke="needleColor"
      :stroke-width="needleWidth"
      stroke-linecap="round"
    />
    <circle :cx="x" :cy="y" :r="r * 0.1" :fill="color" />
    <!-- 表盘字母 -->
    <text
      :x="x"
      :y="y + r * 0.62"
      text-anchor="middle"
      font-family="KaTeX_Main"
      :font-size="r * 0.52"
      :fill="color"
    >
      {{ letter }}
    </text>
  </g>
</template>
