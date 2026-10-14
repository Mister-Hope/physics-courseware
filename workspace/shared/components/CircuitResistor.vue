<script setup lang="ts">
import { computed } from "vue";

/**
 * 电阻符号（**长方形，长宽比 3:1，圆角 2px**——教师点名的规范值）——**只能在 `<svg>` 里用**（与 `CourseArrow` 同类： 写成 HTML
 * 元素什么都不显示，也不能用 ` ```comp ` 代码块）。
 *
 * 给电路图页统一画定值电阻：串并联电路、闭合电路欧姆定律、测电源电动势与内阻等——**不要再各课手画长方形**。
 * 组件只画符号本身，**不画任何背景/底板**；导线由页面手画、**止于长方形两端**（不穿过电阻）。
 *
 * ```html
 * <!-- 水平导线上的电阻（默认 48×16），标 R -->
 * <CircuitResistor :x="240" :y="70" label="R" />
 * <!-- 竖直导线上的电阻，标 10（纯数字走正体），整体放大 1.25 倍 -->
 * <CircuitResistor :x="400" :y="130" orientation="vertical" :length="60" label="10" />
 * ```
 *
 * 本地坐标约定（所有电路共享组件都一样）：`u` 沿导线、`v` 垂直导线（`v > 0` 指向屏幕**上方**（水平导线）/ **右方**（竖直导线））。标签默认画在 `v > 0`
 * 一侧（水平导线时在电阻上方）。
 */
const {
  x = 0,
  y = 0,
  orientation = "horizontal",
  length: size = 48,
  thickness = 0,
  label = "",
  labelDx = 0,
  labelDy = 0,
  lineWidth = 1.6,
  color = "var(--c-text)",
  labelColor = "",
  fill = "none",
} = defineProps<{
  /** 符号中心（导线轴线的中点，viewBox 用户单位） */
  x?: number;
  /** 符号中心（导线轴线的中点，viewBox 用户单位） */
  y?: number;
  /** 导线方向：`horizontal` = 导线左右走（电阻横放），`vertical` = 导线上下走（电阻竖放） */
  orientation?: "horizontal" | "vertical";
  /** 电阻沿导线方向的长边（默认 48） */
  length?: number;
  /** 电阻垂直导线方向的短边；`0`（默认）= 自动取 `length / 3`（长宽比锁定 3:1） */
  thickness?: number;
  /** 标签：阻值（`"10"`）或符号（`"R"`、`"R₁"`）；纯数字走正体 `KaTeX_Main`，其余走斜体 `KaTeX_Math` */
  label?: string;
  /** 标签相对默认位置的横向偏移（屏幕坐标） */
  labelDx?: number;
  /** 标签相对默认位置的纵向偏移（屏幕坐标） */
  labelDy?: number;
  /** 长方形描边线宽 */
  lineWidth?: number;
  /** 长方形描边颜色 */
  color?: string;
  /** 标签颜色；不传跟随 `color` */
  labelColor?: string;
  /** 长方形填充；默认 `none`（组件不画底色）。导线若必须穿过，传页面底色如 `"rgba(9,13,26,0.85)"` */
  fill?: string;
}>();

const horizontal = computed(() => orientation === "horizontal");
/** 垂直导线方向的短边（默认锁定长宽比 3:1） */
const cross = computed(() => (thickness > 0 ? thickness : size / 3));

/** 长方形：横放时宽 = size、竖放时高 = size，都以 (x, y) 为中心；圆角固定 2px（规范值） */
const rect = computed(() => {
  const width = horizontal.value ? size : cross.value;
  const height = horizontal.value ? cross.value : size;
  return { x: x - width / 2, y: y - height / 2, width, height };
});

/** 标签默认贴在长方形外侧 6（v > 0 一侧：水平在上、竖直在右） */
const labelAt = computed(() =>
  horizontal.value
    ? { x: x + labelDx, y: y - cross.value / 2 - 6 + labelDy, anchor: "middle" }
    : { x: x + cross.value / 2 + 6 + labelDx, y: y + 5 + labelDy, anchor: "start" },
);

const numeric = computed(() => /^[\d.,]+$/u.test(label));
const labelFill = computed(() => labelColor || color);
</script>

<template>
  <g class="circuit-resistor">
    <rect
      :x="rect.x"
      :y="rect.y"
      :width="rect.width"
      :height="rect.height"
      rx="2"
      :fill="fill"
      :stroke="color"
      :stroke-width="lineWidth"
    />
    <text
      v-if="label !== ''"
      :x="labelAt.x"
      :y="labelAt.y"
      :text-anchor="labelAt.anchor"
      :font-family="numeric ? 'KaTeX_Main' : 'KaTeX_Math'"
      :font-style="numeric ? 'normal' : 'italic'"
      font-size="16"
      :fill="labelFill"
    >
      {{ label }}
    </text>
  </g>
</template>
