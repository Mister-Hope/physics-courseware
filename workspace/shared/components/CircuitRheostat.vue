<script setup lang="ts">
import { computed } from "vue";

/**
 * 滑动变阻器符号（**长方形线圈 + 滑片箭头**，人教版）——**只能在 `<svg>` 里用**（与 `CourseArrow` 同类： 写成 HTML 元素什么都不显示，也不能用 `
 * ```comp ` 代码块）。
 *
 * 测电阻率、测电源电动势与内阻、限流/分压接法等页统一用它，**不要再各课手画"电阻 + 一根斜线 + 箭头"**。 组件只画**线圈 + 滑片**（滑片的引出端留 `stub`
 * 长的一小段线头）；**接线由页面手画**： 限流接法接"一端 + 滑片"，分压接法接"两端 + 滑片"——这正是两种接法的区别所在，不该由组件替页面决定。
 *
 * ```html
 * <!-- 水平导线上的滑动变阻器，滑片在 70% 处，标 R -->
 * <CircuitRheostat :x="300" :y="60" :slider="0.7" label="R" />
 * <!-- 竖直放置（如 12.3 内接法电路），滑片朝右侧引出，标 R -->
 * <CircuitRheostat :x="400" :y="140" orientation="vertical" label="R" />
 * ```
 *
 * 本地坐标约定（与其它电路共享组件一致）：`u` 沿导线、`v` 垂直导线（`v > 0` 指向屏幕**上方**（水平导线）/ **右方**（竖直导线））。 滑片默认画在 `v > 0` 一侧，用
 * `sliderSide="-1"` 换到另一侧。
 */
const {
  x = 0,
  y = 0,
  orientation = "horizontal",
  length: size = 48,
  slider = 0.5,
  label = "",
  labelDx = 0,
  labelDy = 0,
  lineWidth = 1.6,
  color = "var(--c-text)",
  labelColor = "",
  fill = "none",
} = defineProps<{
  /** 线圈中心（导线轴线的中点，viewBox 用户单位） */
  x?: number;
  /** 线圈中心（导线轴线的中点，viewBox 用户单位） */
  y?: number;
  /** 导线方向：`horizontal` = 导线左右走（线圈横放），`vertical` = 导线上下走（线圈竖放） */
  orientation?: "horizontal" | "vertical";
  /** 线圈沿导线方向的长边（默认 48） */
  length?: number;
  /**
   * 滑片：数字 = 位置（`0` 长边起点 ~ `1` 长边终点）；也可写成对象精调： `{ at?: number; side?: 1 | -1; length?: number
   * }`（`side` 默认 `1` = `v > 0` 侧，`length` 默认 16）。
   */
  slider?: number | { at?: number; side?: 1 | -1; length?: number };
  /** 标签：符号（`"R"`、`"R₁"`）或阻值（`"20"`）；纯数字走正体 `KaTeX_Main`，其余走斜体 `KaTeX_Math` */
  label?: string;
  /** 标签相对默认位置的横向偏移（屏幕坐标） */
  labelDx?: number;
  /** 标签相对默认位置的纵向偏移（屏幕坐标） */
  labelDy?: number;
  /** 描边线宽 */
  lineWidth?: number;
  /** 描边颜色 */
  color?: string;
  /** 标签颜色；不传跟随 `color` */
  labelColor?: string;
  /** 线圈填充；默认 `none`（组件不画底色）。导线若必须穿过，传页面底色如 `"rgba(9,13,26,0.85)"` */
  fill?: string;
}>();

const horizontal = computed(() => orientation === "horizontal");
/** 垂直导线方向的短边（锁定长宽比 3:1，与 `CircuitResistor` 一致） */
const cross = computed(() => size / 3);

/** 滑片参数（数字/对象两种写法归一） */
const sliderAt = computed(() => (typeof slider === "number" ? slider : (slider.at ?? 0.5)));
const sliderSide = computed<1 | -1>(() => (typeof slider === "number" ? 1 : (slider.side ?? 1)));
const sliderLength = computed(() => (typeof slider === "number" ? 16 : (slider.length ?? 16)));

/** 线圈长方形：横放时宽 = size、竖放时高 = size，都以 (x, y) 为中心；圆角固定 2px（规范值） */
const rect = computed(() => {
  const width = horizontal.value ? size : cross.value;
  const height = horizontal.value ? cross.value : size;

  return { x: x - width / 2, y: y - height / 2, width, height };
});

/** `u` 轴（沿导线）上的滑片位置：横放取屏幕 x、竖放取屏幕 y */
const sliderU = computed(() => (horizontal.value ? x : y) - size / 2 + sliderAt.value * size);

/** 箭头尖端（落在线圈靠 `v > 0` 的那条长边上）与尾巴（引出线头起点） */
const sliderArrow = computed(() => {
  const edge = sliderSide.value * (cross.value / 2);
  const tip = horizontal.value
    ? { x: sliderU.value, y: y - edge }
    : { x: x + edge, y: sliderU.value };
  // 箭头从外侧指向线圈：接线端在 v 更外侧，尖端贴在长边上
  const terminal = horizontal.value
    ? { x: sliderU.value, y: y - edge - sliderSide.value * sliderLength.value }
    : { x: x + edge + sliderSide.value * sliderLength.value, y: sliderU.value };

  return { tip, terminal };
});

/**
 * 标签画在**滑片的另一侧**（贴线圈外侧 6）。
 *
 * ⛔ 不要和滑片同侧：竖直放置时会与滑片箭头、接线端挤在一起（12.3 p4 真踩过）， 水平放置也会压住箭头。想微调就用 `labelDx` / `labelDy`。
 */
const labelSide = computed<1 | -1>(() => (sliderSide.value === 1 ? -1 : 1));

const labelAt = computed(() => {
  const offset = labelSide.value * (cross.value / 2 + 6);

  return horizontal.value
    ? { x: x + labelDx, y: y - offset + labelDy, anchor: "middle" }
    : {
        x: x + offset + labelDx,
        y: y + 5 + labelDy,
        anchor: labelSide.value === 1 ? "start" : "end",
      };
});

const numeric = computed(() => /^[\d.,]+$/u.test(label));
const labelFill = computed(() => labelColor || color);
</script>

<template>
  <g class="circuit-rheostat">
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
    <!-- 滑片：一根从接线端指向线圈长边的箭头（尖端落在长边上；箭头样式与全库一致，用共享 CourseArrow） -->
    <CourseArrow
      :from="sliderArrow.terminal"
      :to="sliderArrow.tip"
      :stroke="color"
      :stroke-width="lineWidth"
      :head-size="9"
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
