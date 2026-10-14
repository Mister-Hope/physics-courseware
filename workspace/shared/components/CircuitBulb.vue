<script setup lang="ts">
import { computed } from "vue";

/**
 * 灯泡符号（圆 + 圆内 45° 的 ×，人教版画法）——**只能在 `<svg>` 里用**（与 `CourseArrow` 同类：写成 HTML 元素 什么都不显示，也不能用 `
 * ```comp ` 代码块）。
 *
 * 给电路图页统一画小灯泡：串并联电路、测小灯泡功率、电功率分配等——**不要再各课手画圆和叉**。 组件只画符号本身，**不画任何背景/底板**；导线由页面手画、**止于圆周**（不穿过灯泡）。
 *
 * ```html
 * <!-- 水平导线上的灯泡（默认 r = 12），标 L -->
 * <CircuitBulb :x="240" :y="190" label="L" />
 * ```
 *
 * 本地坐标约定（所有电路共享组件都一样）：`u` 沿导线、`v` 垂直导线（`v > 0` 指向屏幕**上方**（水平导线）/ **右方**（竖直导线））。标签默认画在 `v > 0`
 * 一侧（水平导线时在灯泡上方）。
 */
const {
  x = 0,
  y = 0,
  orientation = "horizontal",
  r = 12,
  label = "",
  labelDx = 0,
  labelDy = 0,
  lineWidth = 1.6,
  color = "var(--c-text)",
  labelColor = "",
  fill = "none",
} = defineProps<{
  /** 圆心（导线轴线上的点，viewBox 用户单位） */
  x?: number;
  /** 圆心（导线轴线上的点，viewBox 用户单位） */
  y?: number;
  /** 导线方向（只影响标签在哪一侧；圆本身对称） */
  orientation?: "horizontal" | "vertical";
  /** 圆半径（规范值 12，即直径 24 ≈ 电阻长 48 的一半） */
  r?: number;
  /** 标签：灯泡代号（如 `"L"`），斜体 `KaTeX_Math`；不传不画 */
  label?: string;
  /** 标签相对默认位置的横向偏移（屏幕坐标） */
  labelDx?: number;
  /** 标签相对默认位置的纵向偏移（屏幕坐标） */
  labelDy?: number;
  /** 圆与 × 的线宽 */
  lineWidth?: number;
  /** 圆与 × 的颜色 */
  color?: string;
  /** 标签颜色；不传跟随 `color` */
  labelColor?: string;
  /** 圆的填充；默认 `none`（组件不画底色）。导线若必须穿过，传页面底色如 `"rgba(9,13,26,0.85)"` */
  fill?: string;
}>();

const horizontal = computed(() => orientation === "horizontal");
/** × 的端点落在圆周上（45° 方向，半跨距 = r / √2） */
const k = computed(() => r * Math.SQRT1_2);

/** 标签默认贴在圆外侧 6（v > 0 一侧：水平在上、竖直在右） */
const labelAt = computed(() =>
  horizontal.value
    ? { x: x + labelDx, y: y - r - 6 + labelDy, anchor: "middle" }
    : { x: x + r + 6 + labelDx, y: y + 5 + labelDy, anchor: "start" },
);

const labelFill = computed(() => labelColor || color);
</script>

<template>
  <g class="circuit-bulb">
    <circle :cx="x" :cy="y" :r="r" :fill="fill" :stroke="color" :stroke-width="lineWidth" />
    <line
      :x1="x - k"
      :y1="y - k"
      :x2="x + k"
      :y2="y + k"
      :stroke="color"
      :stroke-width="lineWidth"
    />
    <line
      :x1="x - k"
      :y1="y + k"
      :x2="x + k"
      :y2="y - k"
      :stroke="color"
      :stroke-width="lineWidth"
    />
    <text
      v-if="label !== ''"
      :x="labelAt.x"
      :y="labelAt.y"
      :text-anchor="labelAt.anchor"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="16"
      :fill="labelFill"
    >
      {{ label }}
    </text>
  </g>
</template>
