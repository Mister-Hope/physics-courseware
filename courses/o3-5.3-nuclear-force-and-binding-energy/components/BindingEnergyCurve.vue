<!-- 5.3 P9/P10：比结合能曲线（实测数据折线）—— curve 模式标出 ⁴He / ⁵⁶Fe / ²³⁵U 三点；trend 模式叠加"裂变、聚变都向峰值靠拢"的方向箭头 -->
<script setup lang="ts">
const { step = 0, mode = "curve" } = defineProps<{
  step?: number;
  mode?: "curve" | "trend";
}>();

interface CurvePoint {
  x: number;
  y: number;
}

/** 实测比结合能（MeV）：横轴质量数 A，纵轴结合能与核子数之比 */
const POINTS: CurvePoint[] = [
  { x: 2, y: 1.11 },
  { x: 3, y: 2.57 },
  { x: 4, y: 7.07 },
  { x: 6, y: 5.33 },
  { x: 7, y: 5.61 },
  { x: 9, y: 6.46 },
  { x: 12, y: 7.68 },
  { x: 14, y: 7.48 },
  { x: 16, y: 7.98 },
  { x: 20, y: 8.03 },
  { x: 24, y: 8.26 },
  { x: 28, y: 8.45 },
  { x: 32, y: 8.49 },
  { x: 40, y: 8.55 },
  { x: 56, y: 8.79 },
  { x: 62, y: 8.79 },
  { x: 84, y: 8.72 },
  { x: 107, y: 8.55 },
  { x: 120, y: 8.5 },
  { x: 140, y: 8.38 },
  { x: 197, y: 7.92 },
  { x: 208, y: 7.87 },
  { x: 235, y: 7.59 },
  { x: 238, y: 7.57 },
];

/** 曲线上的点标注：第一次点击后才出现 */
const labels = [
  {
    x: 4,
    y: 7.07,
    tex: String.raw`{}^{4}\text{He}`,
    anchor: "right",
    dx: 2,
    dy: -14,
    size: 16,
    dot: 6,
    dotColor: "var(--c-accent)",
    color: "var(--c-text)",
    halo: true,
    showAt: 1,
  },
  {
    x: 56,
    y: 8.79,
    tex: String.raw`{}^{56}\text{Fe}`,
    anchor: "top",
    dx: 0,
    dy: -2,
    size: 16,
    dot: 6,
    dotColor: "var(--c-accent)",
    color: "var(--c-text)",
    halo: true,
    showAt: 1,
  },
  {
    x: 235,
    y: 7.59,
    tex: String.raw`{}^{235}\text{U}`,
    anchor: "top",
    dx: -6,
    dy: -2,
    size: 16,
    dot: 6,
    dotColor: "var(--c-accent)",
    color: "var(--c-text)",
    halo: true,
    showAt: 1,
  },
];
</script>

<template>
  <div class="nb-curve">
    <CoordAxes
      :x-range="[0, 270]"
      :y-range="[0, 10.4]"
      :x-axis="{ quantity: 'A' }"
      :y-axis="{ quantity: '比结合能', unit: 'MeV' }"
      :ticks="{ x: [50, 100, 150, 200, 250], y: [2, 4, 6, 8] }"
      :curves="[{ points: POINTS, color: 'var(--c-accent)', width: 3.2 }]"
      :labels="labels"
      :view="{ width: 880, height: 278 }"
      :font-scale="1.1"
      :step="step"
    >
      <template #overlay="{ x, y, px2user }">
        <g v-if="mode === 'trend' && step >= 1">
          <CourseArrow
            :from="{ x: x(18), y: y(9.55) }"
            :to="{ x: x(88), y: y(9.55) }"
            stroke="var(--c-physics)"
            :stroke-width="2.4 * px2user"
            :head-size="11 * px2user"
          />
          <CourseArrow
            :from="{ x: x(252), y: y(9.55) }"
            :to="{ x: x(182), y: y(9.55) }"
            stroke="var(--c-accent-2)"
            :stroke-width="2.4 * px2user"
            :head-size="11 * px2user"
          />
          <text
            :x="x(70)"
            :y="y(9.55) - 9 * px2user"
            text-anchor="middle"
            :font-size="14 * px2user"
            font-family="KaTeX_Main, ui-sans-serif, system-ui"
            fill="var(--c-physics)"
          >
            聚变
          </text>
          <text
            :x="x(217)"
            :y="y(9.55) - 9 * px2user"
            text-anchor="middle"
            :font-size="14 * px2user"
            font-family="KaTeX_Main, ui-sans-serif, system-ui"
            fill="var(--c-accent-2)"
          >
            裂变
          </text>
        </g>
      </template>
    </CoordAxes>
  </div>
</template>

<style scoped>
.nb-curve {
  width: 100%;
  min-width: 0;
}
</style>
