<!--
  第 7 页波形图：音频信号、高频载波、调幅波（AM）、调频波（FM）四行对比。
  横轴只示意时间方向，不标数值；四行共用同一时间范围。
  step：1 = 音频信号，2 = 高频载波，3 = 调幅波，4 = 调频波。
-->
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  /** 当前点击步数（1–3 逐行出现；音频信号常显） */
  step?: number;
}>();

const N = 600;
const twoPi = Math.PI * 2;

const makePoints = (f: (t: number) => number) =>
  Array.from({ length: N + 1 }, (_, index) => {
    const t = index / N;

    return { x: t, y: f(t) };
  });

const curves = computed(() => [
  {
    points: makePoints((t) => 3.55 + 0.34 * Math.sin(twoPi * 2 * t)),
    color: "var(--c-sky)",
    width: 2.4,
  },
  {
    points: makePoints((t) => 2.45 + 0.34 * Math.sin(twoPi * 24 * t)),
    color: "var(--c-text-dim)",
    width: 2.2,
    showAt: 1,
  },
  {
    points: makePoints(
      (t) => 1.35 + 0.34 * (1 + 0.55 * Math.sin(twoPi * 2 * t)) * Math.sin(twoPi * 24 * t),
    ),
    color: "var(--c-accent)",
    width: 2.4,
    showAt: 2,
  },
  {
    points: makePoints(
      (t) => 0.45 + 0.34 * Math.sin(twoPi * 24 * t + 2.4 * Math.sin(twoPi * 2 * t)),
    ),
    color: "var(--c-physics)",
    width: 2.4,
    showAt: 3,
  },
]);

const labels = computed(() => [
  {
    x: -0.245,
    y: 3.64,
    text: "音频信号",
    anchor: "right" as const,
    size: 13.5,
    color: "var(--c-sky)",
  },
  {
    x: -0.245,
    y: 3.4,
    text: "声音、图像信号",
    anchor: "right" as const,
    size: 10.5,
    color: "var(--c-text-dim)",
  },
  {
    x: -0.245,
    y: 2.54,
    text: "高频载波",
    anchor: "right" as const,
    size: 13.5,
    color: "var(--c-text-dim)",
    showAt: 1,
  },
  {
    x: -0.245,
    y: 2.3,
    text: "等幅等频",
    anchor: "right" as const,
    size: 10.5,
    color: "var(--c-text-dim)",
    showAt: 1,
  },
  {
    x: -0.245,
    y: 1.44,
    text: "调幅波（AM）",
    anchor: "right" as const,
    size: 13.5,
    color: "var(--c-accent)",
    showAt: 2,
  },
  {
    x: -0.245,
    y: 1.2,
    text: "振幅随信号变",
    anchor: "right" as const,
    size: 10.5,
    color: "var(--c-text-dim)",
    showAt: 2,
  },
  {
    x: -0.245,
    y: 0.54,
    text: "调频波（FM）",
    anchor: "right" as const,
    size: 13.5,
    color: "var(--c-physics)",
    showAt: 3,
  },
  {
    x: -0.245,
    y: 0.3,
    text: "频率随信号变",
    anchor: "right" as const,
    size: 10.5,
    color: "var(--c-text-dim)",
    showAt: 3,
  },
]);
</script>

<template>
  <CoordAxes
    :x-range="[-0.26, 1]"
    :y-range="[0, 4]"
    :x-axis="{ quantity: 't' }"
    :curves="curves"
    :labels="labels"
    :ticks="{ labels: false, arrows: false, origin: false, x: [], y: [] }"
    :view="{ width: 900, height: 340 }"
    :step="props.step ?? 0"
  />
</template>
