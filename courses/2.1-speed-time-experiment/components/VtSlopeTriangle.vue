<script setup lang="ts">
import { computed } from "vue";

/**
 * 直线斜率的含义：在 v-t 图上取两个相距较远的点量 Δt、Δv（第 13 页）。
 *
 * 为什么单独成组件、而不是直接写在 `slides.md` 里：**纵轴锯齿折断线**要跨到纵轴外侧，而 `CoordAxes` 的曲线/填充会被裁剪在绘图区内，只能用它的 `#overlay`
 * 插槽自己画；两个量点的圆点 与空心直角点也在插槽里。其余部分（轴、刻度、数字、O、轴量标签、拟合直线、Δt/Δv 直角边、 两处文字标注）都是 `CoordAxes` 的 props。
 *
 * 范围照搬原手写 SVG（400×320 viewBox）反推：横轴 0–0.92 s（刻度 0.2 / 0.4 / 0.6 / 0.8）、 纵轴 0.19–0.74 m/s（刻度 0.30 /
 * 0.40 / 0.50 / 0.60 / 0.70，纵轴不从 0 开始，用锯齿折断线 表示省略）；拟合直线 v = 0.5468t + 0.20 与两个量点 t = 0.2 s、0.7 s
 * 同样反推自原图。
 */

/** 坐标范围（数据坐标） */
const X_MIN = 0;
const X_MAX = 0.92;
const Y_MIN = 0.19;
const Y_MAX = 0.74;
/** ViewBox 尺寸（只决定比例；字号由组件按实测宽度自适应） */
const VIEW_WIDTH = 400;
const VIEW_HEIGHT = 320;
/** 拟合直线 v = k·t + b（反推自原图两端点 (0, 0.20) 与 (0.86, 0.67)），以及画到的两端时刻 */
const LINE_SLOPE = 0.5468;
const LINE_INTERCEPT = 0.2;
const LINE_FROM = X_MIN;
const LINE_TO = 0.86;
// 在两个相距较远处取值求斜率；两点必须**落在直线上**（页面正文："在直线上取两个相距较远的点"），
// 所以纵坐标由直线方程算出，不手抄。
const onLine = (time: number): number => LINE_SLOPE * time + LINE_INTERCEPT;
const pointA = { t: 0.2, v: onLine(0.2) };
const pointB = { t: 0.7, v: onLine(0.7) };
/** 图线、Δt / Δv 两条直角虚线 */
const curves = computed(() => [
  {
    points: [
      { x: LINE_FROM, y: onLine(LINE_FROM) },
      { x: LINE_TO, y: onLine(LINE_TO) },
    ],
    stroke: "var(--c-accent)",
    width: 2.6,
  },
  {
    points: [
      { x: pointA.t, y: pointA.v },
      { x: pointB.t, y: pointA.v },
    ],
    stroke: "var(--c-accent-2)",
    width: 1.6,
    dashed: "6 5",
  },
  {
    points: [
      { x: pointB.t, y: pointA.v },
      { x: pointB.t, y: pointB.v },
    ],
    stroke: "var(--c-accent-2)",
    width: 1.6,
    dashed: "6 5",
  },
]);
/** 两处文字标注：Δt 画在水平直角边下方、Δv 画在竖直直角边左侧（与原图一致） */
const labels = computed(() => [
  {
    x: (pointA.t + pointB.t) / 2,
    y: pointA.v,
    tex: "\\Delta t = 0.50\\ \\text{s}",
    anchor: "center" as const,
    dy: 18,
    size: 15,
    color: "var(--c-accent-2)",
  },
  {
    x: pointB.t,
    y: (pointA.v + pointB.v) / 2,
    tex: "\\Delta v = 0.40\\ \\text{m/s}",
    anchor: "left" as const,
    dx: -3,
    size: 15,
    color: "var(--c-accent-2)",
  },
  { x: X_MIN, y: Y_MIN, tex: "O", anchor: "bottom-left" as const, color: "var(--c-text-dim)" },
]);
/** 锯齿折断线：半宽 8px，右端比左端高 8px，分别离轴 12–20px、22–30px */
const BREAK_HALF = 8;
const BREAK_LINES: readonly { readonly from: number; readonly to: number }[] = [
  { from: 12, to: 20 },
  { from: 22, to: 30 },
];
</script>

<template>
  <div class="vt-slope">
    <CoordAxes
      :x-range="[X_MIN, X_MAX]"
      :y-range="[Y_MIN, Y_MAX]"
      :x-axis="{ quantity: 't' }"
      :y-axis="{ quantity: 'v' }"
      :ticks="{ x: [0.2, 0.4, 0.6, 0.8], y: [0.3, 0.4, 0.5, 0.6, 0.7] }"
      :view="{ width: VIEW_WIDTH, height: VIEW_HEIGHT }"
      :curves="curves"
      :labels="labels"
    >
      <template #overlay="{ x, y, plot, px2user }">
        <!-- 纵轴锯齿折断线（跨到轴外，绘图区里画不出来） -->
        <g stroke="var(--c-accent)" :stroke-width="2.4 * px2user" stroke-linecap="round">
          <line
            v-for="(segment, index) in BREAK_LINES"
            :key="`break-${index}`"
            :x1="x(X_MIN) - BREAK_HALF * px2user"
            :y1="plot.bottom - segment.from * px2user"
            :x2="x(X_MIN) + BREAK_HALF * px2user"
            :y2="plot.bottom - segment.to * px2user"
          />
        </g>
        <!-- 两个量点（实心）与它们构成的直角点（空心） -->
        <circle :cx="x(pointA.t)" :cy="y(pointA.v)" :r="5 * px2user" fill="var(--c-accent-2)" />
        <circle :cx="x(pointB.t)" :cy="y(pointB.v)" :r="5 * px2user" fill="var(--c-accent-2)" />
        <circle
          :cx="x(pointB.t)"
          :cy="y(pointA.v)"
          :r="4 * px2user"
          fill="none"
          stroke="var(--c-accent-2)"
          :stroke-width="1.6 * px2user"
        />
      </template>
    </CoordAxes>
  </div>
</template>

<style scoped>
.vt-slope {
  width: 100%;
  min-width: 0;
  max-width: 400px;
  margin: 0 auto;
}
</style>
