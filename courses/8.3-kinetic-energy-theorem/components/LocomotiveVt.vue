<script setup lang="ts">
/**
 * 机车启动题的 v-t 图像（题目页与两页解析共用，按 `annotate` 决定是否带分析标注）。
 *
 * 图像按题目给的三个特征画：
 *
 * - 0–10 s：过原点的直线（匀加速，斜率 0.8 m/s²），到 (10 s, 8 m/s)；
 * - 10–18 s：恒定功率段——速度趋于 10 m/s，曲线在 18 s 处切线水平；
 * - 18 s 后：匀速，v = 10 m/s。
 *
 * 坐标轴由共享组件 `CoordAxes` 画（本仓禁止手写坐标轴 SVG），这里只提供数据与标注。
 */
import { computed } from "vue";

const { annotate = false, viewHeight = 200 } = defineProps<{
  /** 是否显示"匀加速 / 恒定功率 / 额定功率 / 最大速度"等分析标注 */
  annotate?: boolean;
  /** 图形比例高度（CoordAxes 的 view.height，只决定比例） */
  viewHeight?: number;
}>();

/** 0–10 s：匀加速（过原点的直线） */
const uniformAccel = [
  { x: 0, y: 0 },
  { x: 10, y: 8 },
];

/** 10–18 s：恒定功率，速度单调增大、趋于 10 m/s，末端切线水平 */
const constantPower = Array.from({ length: 25 }, (_, index) => {
  const t = 10 + (8 * index) / 24;
  const k = (t - 18) / 8;

  return { x: t, y: 10 - 2 * k * k };
});

/** 18 s 之后：匀速 */
const uniformMotion = [
  { x: 18, y: 10 },
  { x: 22, y: 10 },
];

/** 两个已知点向两轴作虚线（题目原图就有，属"读图"信息，常显） */
const guides = [
  [
    { x: 10, y: 0 },
    { x: 10, y: 8 },
  ],
  [
    { x: 0, y: 8 },
    { x: 10, y: 8 },
  ],
  [
    { x: 18, y: 0 },
    { x: 18, y: 10 },
  ],
  [
    { x: 0, y: 10 },
    { x: 18, y: 10 },
  ],
].map((points) => ({ points, dashed: true, width: 1.5, stroke: "var(--c-text-dim)" }));

const curves = computed(() => [
  { points: uniformAccel, stroke: "var(--c-accent)", width: 3.4 },
  { points: constantPower, stroke: "var(--c-accent)", width: 3.4 },
  { points: uniformMotion, stroke: "var(--c-accent)", width: 3.4 },
  ...guides,
]);

const labels = computed(() => [
  {
    x: 10,
    y: 8,
    dot: 5,
    ...(annotate ? { tex: String.raw`P_{\text{额}}`, anchor: "top-left" as const, size: 16 } : {}),
  },
  {
    x: 18,
    y: 10,
    dot: 5,
    ...(annotate ? { tex: String.raw`v_{\max}`, anchor: "top-left" as const, size: 16 } : {}),
  },
  ...(annotate
    ? [
        { x: 4.4, y: 5.8, tex: String.raw`\text{匀加速}`, size: 16, color: "var(--c-text-dim)" },
        {
          x: 13.2,
          y: 11.1,
          tex: String.raw`\text{恒定功率}`,
          size: 16,
          color: "var(--c-text-dim)",
        },
      ]
    : []),
]);
</script>

<template>
  <div class="loco-vt">
    <CoordAxes
      :x-range="[0, 22]"
      :y-range="[0, 12]"
      :x-axis="{ quantity: 't', unit: 's' }"
      :y-axis="{ quantity: 'v', unit: '(m/s)' }"
      :view="{ width: 760, height: viewHeight }"
      :ticks="{ x: [10, 18], y: [8, 10] }"
      :curves="curves"
      :labels="labels"
    />
  </div>
</template>

<style scoped>
.loco-vt {
  width: 100%;
  max-width: 760px;
  margin-inline: auto;
}
</style>
