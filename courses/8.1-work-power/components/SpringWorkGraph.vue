<script setup lang="ts">
import { computed } from "vue";

/**
 * 把弹簧从原长压缩 `L` 的过程中，**手的推力**做了多少功。
 * 纵轴＝手的推力大小（= kx），横轴＝压缩量 L；两条轴都只用符号、不标数字。
 * 分步（页面传 `:step="$clicks"`）：
 *   step ≥ 1：出直线 F = kx（F 随压缩量线性增大）
 *   step ≥ 2：把压缩量分成许多小段，每段里 F 可看作恒力——出现一排小条，
 *             每条的面积 F_iΔx 就是这一小段做的功（微元法，不出现微积分符号）
 *   step ≥ 3：小条合成一个三角形（面积 W = ½kL²），并用虚线向两条轴作垂线、标出 L 与 kL
 * 坐标轴用共享 CoordAxes（禁止手写坐标轴 SVG）；view 用 700×320 压高度。
 */
const { step = 0 } = defineProps<{
  /** 当前点击步数（页面传 $clicks） */
  step?: number;
}>();

const L = 5; // 图上的压缩量（用户坐标，只表示"一段压缩量"）
const BAR_COUNT = 12;
const barWidth = L / BAR_COUNT;

/** 每小段取中点高度：F 在该段内可看作恒力 */
const bars = computed(() =>
  Array.from({ length: BAR_COUNT }, (_, index) => {
    const x0 = index * barWidth;
    const x1 = x0 + barWidth;
    const h = (x0 + x1) / 2;
    return {
      points: [
        { x: x0, y: 0 },
        { x: x1, y: 0 },
        { x: x1, y: h },
        { x: x0, y: h },
      ],
      fill: "var(--c-physics)",
      fillOpacity: 0.3,
      showAt: 2,
    };
  }),
);

const curves = computed(() => [
  {
    points: [
      { x: 0, y: 0 },
      { x: L, y: L },
    ],
    width: 3,
    stroke: "var(--c-accent)",
  },
  // 两条虚线：由图线上的点向横轴、纵轴作垂线
  {
    points: [
      { x: L, y: 0 },
      { x: L, y: L },
    ],
    width: 1.4,
    dashed: true,
    stroke: "var(--c-text-dim)",
    opacity: 0.8,
    showAt: 3,
  },
  {
    points: [
      { x: 0, y: L },
      { x: L, y: L },
    ],
    width: 1.4,
    dashed: true,
    stroke: "var(--c-text-dim)",
    opacity: 0.8,
    showAt: 3,
  },
]);

const areas = computed(() => [
  ...bars.value,
  {
    points: [
      { x: 0, y: 0 },
      { x: L, y: 0 },
      { x: L, y: L },
    ],
    fill: "var(--c-accent)",
    fillOpacity: 0.22,
    showAt: 3,
  },
]);

const labels = computed(() => [
  { x: L, y: 0, tex: "L", anchor: "bottom-left" as const, showAt: 3 },
  { x: L, y: L, tex: "kL", anchor: "left" as const, showAt: 3 },
]);
</script>

<template>
  <CoordAxes
    :x-range="[0, 6.2]"
    :y-range="[0, 6.2]"
    :x-axis="{ quantity: 'L' }"
    :y-axis="{ quantity: 'F' }"
    :ticks="{ labels: false }"
    :view="{ width: 700, height: 280 }"
    :curves="curves"
    :areas="areas"
    :labels="labels"
    :step="step"
  />
</template>
