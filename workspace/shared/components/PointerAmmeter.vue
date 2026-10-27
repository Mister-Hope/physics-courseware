<script setup lang="ts">
import { computed } from "vue";

/**
 * 带指针的电流表（安培表）表盘——**只能在 `<svg>` 里用**（根节点是 `<g>`，写成 HTML 元素什么都不显示，也不能用 ` ```comp ` 代码块）。与电路图符号
 * `CircuitMeter`（圆圈 + 正体 A）分工不同：**这个画的是"能看到指针偏转"的表**，
 * 用在实验装置示意图（蹄形磁体、线圈、导轨、法拉第圆盘）里——教师要求全课统一，**不要再各图手画"圆 + 一根红线"**。
 *
 * 画法：表壳圆 + 顶部刻度弧 + 刻度线 + 红色指针（绕圆心转动）+ 轴心 + 正体字母；导线由页面手画、**止于表壳圆周**。
 * 刻度以**零点居中**（灵敏电流计式：指针可向左右两边偏），与"感应电流方向可能相反"的演示一致。
 *
 * ```html
 * <!-- 指针居中（无电流） -->
 * <PointerAmmeter :x="430" :y="150" :r="22" :angle="0" />
 * <!-- 指针偏转 30°（正 = 顺时针） -->
 * <PointerAmmeter :x="430" :y="150" :r="22" :angle="30" />
 * ```
 */
const {
  x = 0,
  y = 0,
  r = 24,
  angle = 0,
  color = "var(--c-text)",
  needleColor = "var(--c-danger)",
  fill = "none",
  lineWidth = 1.8,
  letter = "A",
} = defineProps<{
  /** 表盘圆心（导线轴线上的点，viewBox 用户单位） */
  x?: number;
  /** 表盘圆心（导线轴线上的点，viewBox 用户单位） */
  y?: number;
  /** 表盘半径（规范值 24，即直径 48 ≈ 电阻长 48） */
  r?: number;
  /** 指针偏角（度）：0 = 竖直向上，正 = 顺时针（向屏幕右偏） */
  angle?: number;
  /** 表壳、刻度线、字母、轴心的颜色 */
  color?: string;
  /** 指针颜色 */
  needleColor?: string;
  /** 表壳填充；默认 `none`（组件不画底色） */
  fill?: string;
  /** 表壳线宽 */
  lineWidth?: number;
  /** 表盘内的字母（电流表 `A`、电压表 `V`），正体 `KaTeX_Main` */
  letter?: string;
}>();

const DEG = Math.PI / 180;
// 极坐标 → SVG 坐标：0° 竖直向上，正角顺时针
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
</script>

<template>
  <g class="pointer-ammeter">
    <circle :cx="x" :cy="y" :r="r" :fill="fill" :stroke="color" :stroke-width="lineWidth" />
    <!-- 刻度弧与刻度线 -->
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
    <!-- 指针（红色），轴心盖在上面 -->
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
      :y="y + r * 0.55"
      text-anchor="middle"
      font-family="KaTeX_Main"
      :font-size="r * 0.52"
      :fill="color"
    >
      {{ letter }}
    </text>
  </g>
</template>
