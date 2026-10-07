<script setup lang="ts">
// 第 16、18 页：加速度—位移图像（以释放点为位移原点，向下为正）
// 这一节做定性分析：轴上不标任何数值，只在 a = g 的高度标一个符号 g。
// 球落到托盘上（位移 x = h）是图线由水平折成倾斜的拐点，从它向两轴各作一条虚线垂线。
// 接触托盘前 a = g（水平直线）；接触后 a = g - (k/m)x（向右下方倾斜的直线），在平衡位置穿过 a = 0。
// 坐标仍按真实数值计算（取 g = 10 m/s^2、h = 0.20 m、k/m = 100 s^-2：x = 0.30 m 处过零（平衡位置），
// 最低点 x = 0.5236 m 处 a = -22.36 m/s^2；正负两块面积都是 2.5 m^2/s^2，严格相等），数值一律不上屏。
import { computed } from "vue";

const { showAreas = false } = defineProps<{ showAreas?: boolean }>();

/** 球落到托盘上（图线由水平折成倾斜）的位移：自由下落高度 h */
const HEIGHT = 0.2;
/** 平衡位置的位移：图线在这里穿过 a = 0 轴（h + 弹簧压缩量） */
const X_EQ = 0.3;
/** 最低点相对释放点的位移：h + x_eq + 振幅 */
const X_MAX = 0.5236068;
/** 自由落体阶段的加速度，正好是 g（图线水平段的高度）；图上只标符号、不标数值 */
const A_FALL = 10;
/** 最低点的加速度（负向最大） */
const A_MIN = -22.36068;

const CURVE = computed(() => [
  { x: 0, y: A_FALL },
  { x: HEIGHT, y: A_FALL },
  { x: X_MAX, y: A_MIN },
]);

const baseLabels = [
  // 纵轴上的 g：自由落体阶段的加速度就是它——只写符号，坚决不标数值
  { x: 0, y: A_FALL, tex: "g", anchor: "left", dot: 5 },
  // 拐点：球落到托盘上，图线在这里由水平折成倾斜
  { x: HEIGHT, y: A_FALL, parts: [{ text: "落到托盘" }], anchor: "top-right", dot: 5 },
  { x: X_EQ, y: 0, parts: [{ text: "平衡位置" }], anchor: "top-right", dot: 5 },
  {
    x: X_MAX,
    y: A_MIN,
    parts: [{ text: "最低点" }],
    anchor: "left",
    dot: 5,
    color: "var(--c-accent-2)",
  },
] as const;

const labels = computed(() =>
  showAreas
    ? [
        ...baseLabels,
        // 两块面积各标在自己的中部（S_2 取三角形的重心），避开图线与虚线
        { x: X_EQ / 2, y: A_FALL / 2, tex: "S_1", anchor: "center" },
        { x: (X_EQ + 2 * X_MAX) / 3, y: A_MIN / 3, tex: "S_2", anchor: "center" },
      ]
    : [...baseLabels],
);

const areas = computed(() =>
  showAreas
    ? [
        {
          points: [
            { x: 0, y: 0 },
            { x: 0, y: A_FALL },
            { x: HEIGHT, y: A_FALL },
            { x: X_EQ, y: 0 },
          ],
          fill: "var(--c-accent)",
          fillOpacity: 0.24,
        },
        {
          points: [
            { x: X_EQ, y: 0 },
            { x: X_MAX, y: A_MIN },
            { x: X_MAX, y: 0 },
          ],
          fill: "var(--c-accent-2)",
          fillOpacity: 0.24,
        },
      ]
    : [],
);

const curves = computed(() => [
  { points: CURVE.value, stroke: "var(--c-accent)", width: 3.5, showAt: 1 },
  // 拐点（球落到托盘）竖直落到 x 轴的虚线：标出它在位移轴上的位置。
  // 不画水平那条 —— 它与 a = g 的水平段完全重合，只会把实线盖脏。
  {
    points: [
      { x: HEIGHT, y: A_FALL },
      { x: HEIGHT, y: 0 },
    ],
    stroke: "var(--c-text-dim)",
    width: 1.6,
    dashed: true,
  },
]);
</script>

<template>
  <CoordAxes
    :x-range="[0, 0.58]"
    :y-range="[-26, 13]"
    :x-axis="{ quantity: 'x', unit: 'm' }"
    :y-axis="{ quantity: 'a', unit: 'm/s', sup: '2' }"
    :ticks="{ x: [], y: [] }"
    :curves="curves"
    :areas="areas"
    :labels="labels"
    :view="{ width: 620, height: 470 }"
  />
</template>
