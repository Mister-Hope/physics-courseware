<script setup lang="ts">
import { computed } from "vue";

/**
 * 电表符号（圆 + 正体字母：`kind="a"` 电流表 **A**、`kind="v"` 电压表 **V**）——**只能在 `<svg>` 里用**（与 `CourseArrow`
 * 同类：写成 HTML 元素什么都不显示，也不能用 ` ```comp ` 代码块）。
 *
 * 给电路图页统一画电表：测电源电动势与内阻（安阻法 / 伏阻法 / 内外接法）、串并联电路等——**不要再各课手画圆和字母**。
 * 组件只画符号本身，**不画任何背景/底板**；导线由页面手画、**止于圆周**（电表圆对称，横竖导线都直接停在圆边即可）。
 *
 * ```html
 * <!-- 电流表串在干路上 -->
 * <CircuitMeter :x="400" :y="130" kind="a" />
 * <!-- 电压表并联在电阻两端 -->
 * <CircuitMeter :x="240" :y="70" kind="v" />
 * ```
 */
const {
  x = 0,
  y = 0,
  kind = "a",
  r = 16,
  lineWidth = 1.6,
  color = "var(--c-text)",
  fill = "none",
} = defineProps<{
  /** 圆心（导线轴线上的点，viewBox 用户单位） */
  x?: number;
  /** 圆心（导线轴线上的点，viewBox 用户单位） */
  y?: number;
  /** 表的种类：`"a"` ＝ 电流表 A，`"v"` ＝ 电压表 V */
  kind?: "a" | "v";
  /** 圆半径（规范值 16，即直径 32 ≈ 电阻长 48 的 2/3） */
  r?: number;
  /** 圆的线宽 */
  lineWidth?: number;
  /** 圆与字母的颜色 */
  color?: string;
  /** 圆的填充；默认 `none`（组件不画底色）。导线若必须穿过，传页面底色如 `"rgba(9,13,26,0.85)"` */
  fill?: string;
}>();

/** 字母：正体 KaTeX_Main（电表是仪器代号，不用数学斜体）；基线下移 7 做竖直居中 */
const letter = computed(() => (kind === "v" ? "V" : "A"));
const letterY = computed(() => y + Math.round(r * 0.44));
</script>

<template>
  <g class="circuit-meter">
    <circle :cx="x" :cy="y" :r="r" :fill="fill" :stroke="color" :stroke-width="lineWidth" />
    <text
      :x="x"
      :y="letterY"
      text-anchor="middle"
      font-family="KaTeX_Main"
      font-size="20"
      :fill="color"
    >
      {{ letter }}
    </text>
  </g>
</template>
