<script setup lang="ts">
import { computed } from "vue";

/**
 * 匀速运动的 v-t 图：图线下方那块矩形的面积 = 位移（第 7 页）。
 *
 * 为什么单独成组件、而不是直接写在 `slides.md` 里：矩形底边那根"时间尺寸线"画在**绘图区外面**， 而 `CoordAxes` 的曲线/填充会被裁剪到绘图区内，得用它的
 * `#overlay` 插槽按 viewBox 用户单位自己画。 其余部分（矩形填充、图线、右边缘虚线、三处标注）都是组件 props。
 */

/** 图线高度；页面不出现数值，取个画面舒服的值（m/s 口径） */
const SPEED = 6;
/** 观察时长（s 口径） */
const SPAN = 5;
/** 尺寸线离时间轴多少屏幕 px；`px2user` 再折成 viewBox 用户单位 */
const BRACKET_DROP = 20;
/** 尺寸线两端的小竖线，上下各伸 6px */
const TICK_HALF = 6;

/** 矩形：从原点铺到 (SPAN, SPEED)，面积正好是 v·t */
const rectArea = computed(() => [
  {
    points: [
      { x: 0, y: 0 },
      { x: SPAN, y: 0 },
      { x: SPAN, y: SPEED },
      { x: 0, y: SPEED },
    ],
    fill: "var(--c-accent)",
    fillOpacity: 0.16,
    stroke: "var(--c-accent)",
    width: 1.4,
    dashed: "6 4",
  },
]);

/** 图线本身（水平）与矩形右边缘的虚线 */
const rectCurves = computed(() => [
  {
    points: [
      { x: 0, y: SPEED },
      { x: SPAN, y: SPEED },
    ],
    stroke: "var(--c-accent)",
    width: 3.5,
  },
  {
    points: [
      { x: SPAN, y: 0 },
      { x: SPAN, y: SPEED },
    ],
    stroke: "var(--c-text-dim)",
    width: 1.4,
    dashed: true,
  },
]);

/** 三处标注：线高 v、矩形里的面积式子、轴下方的 t（与尺寸线对齐） */
const rectLabels = computed(() => [
  { x: SPAN, y: SPEED, tex: "v", anchor: "right" as const, color: "var(--c-accent)" },
  {
    x: SPAN / 2,
    y: SPEED / 2,
    parts: [{ text: "面积 = " }, { tex: "v \\cdot t" }],
    anchor: "center" as const,
    halo: true,
  },
  {
    x: SPAN / 2,
    y: 0,
    tex: "t",
    anchor: "center" as const,
    dy: 40,
    color: "var(--c-text-dim)",
  },
]);
</script>

<template>
  <CoordAxes
    :x-range="[0, 6.2]"
    :y-range="[0, 12]"
    :x-axis="{ quantity: 't' }"
    :y-axis="{ quantity: 'v' }"
    :view="{ width: 400, height: 300 }"
    :ticks="{ x: [], y: [] }"
    :areas="rectArea"
    :curves="rectCurves"
    :labels="rectLabels"
  >
    <!-- 轴外装饰：矩形底边对应的"时间"尺寸线（绘图区内画不出来，见组件顶部注释） -->
    <template #overlay="{ x, y, px2user }">
      <g stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.7">
        <line
          :x1="x(0)"
          :y1="y(0) + BRACKET_DROP * px2user"
          :x2="x(SPAN)"
          :y2="y(0) + BRACKET_DROP * px2user"
        />
        <line
          :x1="x(0)"
          :y1="y(0) + (BRACKET_DROP - TICK_HALF) * px2user"
          :x2="x(0)"
          :y2="y(0) + (BRACKET_DROP + TICK_HALF) * px2user"
        />
        <line
          :x1="x(SPAN)"
          :y1="y(0) + (BRACKET_DROP - TICK_HALF) * px2user"
          :x2="x(SPAN)"
          :y2="y(0) + (BRACKET_DROP + TICK_HALF) * px2user"
        />
      </g>
    </template>
  </CoordAxes>
</template>
