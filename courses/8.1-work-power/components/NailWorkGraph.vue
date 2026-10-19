<script setup lang="ts">
import { computed } from "vue";

/**
 * 第二课时「钉钉子」答案页图：阻力与钉入深度成正比 F = kx，每一锤做的功就是 F-x 图线上的梯形面积。
 * 每次做功相同 ⇒ 各梯形面积相等 ⇒ 第 n 锤后深度 x_n = √n · x_1，
 * 所以每次前进的距离之比是 1 : (√2−1) : (√3−√2) : … : (√N − √(N−1))。
 * 分步：step ≥ 1 出四块等面积梯形，step ≥ 2 出深度的 √n 关系与虚线。
 */
const { step = 0 } = defineProps<{
  /** 当前点击步数（页面传 $clicks） */
  step?: number;
}>();

/** 四次锤击后的深度（单位深度 ×1，k 取 1，纵轴 F = kx） */
const XS = [1, Math.SQRT2, Math.sqrt(3), 2];

/** 每一锤对应的梯形（面积都是 ½k(x_n² − x_{n−1}²) = ½，四块相等） */
const areas = computed(() =>
  XS.map((x1, i) => {
    const x0 = i === 0 ? 0 : XS[i - 1];
    return {
      points:
        i === 0
          ? [
              { x: 0, y: 0 },
              { x: x1, y: x1 },
              { x: x1, y: 0 },
            ]
          : [
              { x: x0, y: 0 },
              { x: x0, y: x0 },
              { x: x1, y: x1 },
              { x: x1, y: 0 },
            ],
      fill: i % 2 === 0 ? "var(--c-accent)" : "var(--c-accent-2)",
      fillOpacity: 0.24,
      stroke: i % 2 === 0 ? "var(--c-accent)" : "var(--c-accent-2)",
      width: 1.6,
      showAt: 1,
    };
  }),
);

/** 深度位置的竖向虚线（点击后才出） */
const guides = computed(() =>
  XS.map((x) => ({
    points: [
      { x, y: 0 },
      { x, y: x },
    ],
    stroke: "var(--c-text-dim)",
    width: 1.4,
    dashed: "5 4",
    opacity: 0.7,
    showAt: 2,
  })),
);

const curve = [{ formula: (x: number) => x, stroke: "var(--c-physics)", width: 3.2 }];

const labels = computed(() => [
  { x: 1, y: 0, tex: "x_1", anchor: "bottom-left" as const, size: 16, color: "var(--c-text-dim)", showAt: 2 },
  { x: Math.SQRT2, y: 0, tex: "x_2", anchor: "bottom-left" as const, size: 16, color: "var(--c-text-dim)", showAt: 2 },
  { x: Math.sqrt(3), y: 0, tex: "x_3", anchor: "bottom-left" as const, size: 16, color: "var(--c-text-dim)", showAt: 2 },
  { x: 2, y: 0, tex: "x_4", anchor: "bottom-left" as const, size: 16, color: "var(--c-text-dim)", showAt: 2 },
  { x: 0.5, y: 0.42, tex: "W_0", size: 17, color: "var(--c-accent)", showAt: 1 },
  { x: 1.2, y: 0.42, tex: "W_0", size: 17, color: "var(--c-accent-2)", showAt: 1 },
  { x: 1.56, y: 0.42, tex: "W_0", size: 17, color: "var(--c-accent)", showAt: 1 },
  { x: 1.86, y: 0.42, tex: "W_0", size: 17, color: "var(--c-accent-2)", showAt: 1 },
]);
</script>

<template>
  <CoordAxes
    :x-range="[0, 2.42]"
    :y-range="[0, 2.6]"
    :x-axis="{ quantity: 'x', unit: '' }"
    :y-axis="{ quantity: 'F', unit: '' }"
    :ticks="{ labels: false }"
    :curves="curve"
    :areas="areas"
    :labels="labels"
    :view="{ width: 620, height: 330 }"
    :step="step"
  />
</template>
