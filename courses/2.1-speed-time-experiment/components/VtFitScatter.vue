<script setup lang="ts">
import { computed } from "vue";

/**
 * 十字线描点 + 拟合直线（第 11 页的 v-t 图）。
 *
 * 为什么单独成组件、而不是直接写在 `slides.md` 里：**纵轴锯齿折断线**要跨到纵轴外侧，而 `CoordAxes` 的曲线/填充会被裁剪在绘图区内，只能用它的 `#overlay`
 * 插槽按 viewBox 用户单位自己画； 8 个十字线数据点同理（比圆点更贴原图的"十字线描点"）。其余部分（轴、刻度、数字、O、轴量标签、 拟合直线）都是 `CoordAxes` 的
 * props。
 *
 * 数据与范围照搬原手写 SVG（380×250 viewBox）反推： 横轴 0–0.9 s（刻度 0.2 / 0.4 / 0.6 / 0.8）；纵轴 0.2–0.94 m/s（刻度 0.2 /
 * 0.4 / 0.6 / 0.8， 纵轴不从 0 开始，用锯齿折断线表示 0～0.2 一段被省略）；拟合直线 v = 0.80t + 0.21（斜率 0.80 就是本课示例的加速度），8
 * 个数据点仍是 4 个在直线上方、4 个在下方——与图注一致。
 */
/** 坐标范围（数据坐标） */
const X_MIN = 0;
const X_MAX = 0.9;
const Y_MIN = 0.2;
const Y_MAX = 0.94;
/** ViewBox 尺寸（只决定比例；字号由组件按实测宽度自适应） */
const VIEW_WIDTH = 380;
const VIEW_HEIGHT = 250;
/** 拟合直线 v = k·t + b，以及它在图上画到的两端时刻（反推自原图两端点） */
const LINE_SLOPE = 0.8;
const LINE_INTERCEPT = 0.21;
const LINE_FROM = 0.05;
const LINE_TO = 0.85;
/** 8 个十字线数据点（反推自原图） */
const POINTS: readonly { readonly t: number; readonly v: number }[] = [
  { t: 0.1, v: 0.294 },
  { t: 0.2, v: 0.364 },
  { t: 0.3, v: 0.455 },
  { t: 0.4, v: 0.525 },
  { t: 0.5, v: 0.611 },
  { t: 0.6, v: 0.681 },
  { t: 0.7, v: 0.771 },
  { t: 0.8, v: 0.845 },
];
/** 十字臂长与线宽（屏幕 px 口径，插槽里乘 `px2user` 折成 viewBox 用户单位） */
const CROSS_HALF = 5;
const CROSS_WIDTH = 1.6;
/** 锯齿折断线：两条平行斜线横跨纵轴；半宽 8px，右端比左端高 8px，分别离轴 12–20px、22–30px */
const BREAK_HALF = 8;
const BREAK_LINES: readonly { readonly from: number; readonly to: number }[] = [
  { from: 12, to: 20 },
  { from: 22, to: 30 },
];

/** 拟合直线（两点定一条直线） */
const curves = computed(() => [
  {
    points: [
      { x: LINE_FROM, y: LINE_SLOPE * LINE_FROM + LINE_INTERCEPT },
      { x: LINE_TO, y: LINE_SLOPE * LINE_TO + LINE_INTERCEPT },
    ],
    stroke: "var(--c-accent)",
    width: 3,
  },
]);

/** 纵轴从 0.2 起（0 不在范围内），组件的原点 `O` 不会画，这里自己补一个 */
const labels = [
  { x: X_MIN, y: Y_MIN, tex: "O", anchor: "bottom-left" as const, color: "var(--c-text-dim)" },
];
</script>

<template>
  <div class="vt-scatter">
    <CoordAxes
      :x-range="[X_MIN, X_MAX]"
      :y-range="[Y_MIN, Y_MAX]"
      :x-axis="{ quantity: 't' }"
      :y-axis="{ quantity: 'v' }"
      :ticks="{ x: [0.2, 0.4, 0.6, 0.8], y: [0.2, 0.4, 0.6, 0.8] }"
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
        <!-- 8 个数据点：十字叉 -->
        <g
          stroke="var(--c-text)"
          :stroke-width="CROSS_WIDTH * px2user"
          stroke-linecap="round"
          opacity="0.85"
        >
          <line
            v-for="point in POINTS"
            :key="`cross-h-${point.t}`"
            :x1="x(point.t) - CROSS_HALF * px2user"
            :y1="y(point.v)"
            :x2="x(point.t) + CROSS_HALF * px2user"
            :y2="y(point.v)"
          />
          <line
            v-for="point in POINTS"
            :key="`cross-v-${point.t}`"
            :x1="x(point.t)"
            :y1="y(point.v) - CROSS_HALF * px2user"
            :x2="x(point.t)"
            :y2="y(point.v) + CROSS_HALF * px2user"
          />
        </g>
      </template>
    </CoordAxes>
  </div>
</template>

<style scoped>
.vt-scatter {
  width: 100%;
  min-width: 0;
  max-width: 380px;
  margin: 0 auto;
}
</style>
