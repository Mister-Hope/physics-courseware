<!--
  第 12 页波形图：解调（检波）把调幅波中的低频信号取出来。
  上行是接收到的调幅波（常显），点击 1 出现虚线包络，点击 2 在下方给出还原出的音频信号。
-->
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  /** 1 = 包络线，2 = 音频信号；调幅波常显 */
  step?: number;
}>();

const N = 600;
const twoPi = Math.PI * 2;

const makePoints = (f: (t: number) => number) =>
  Array.from({ length: N + 1 }, (_, index) => {
    const t = index / N;

    return { x: t, y: f(t) };
  });

const envelope = (t: number) => 0.34 * (1 + 0.55 * Math.sin(twoPi * 2 * t));
const am = (t: number) => 2.4 + envelope(t) * Math.sin(twoPi * 20 * t);
const audio = (t: number) => 0.8 + 0.3 * Math.sin(twoPi * 2 * t);

const curves = computed(() => [
  {
    points: makePoints(am),
    color: "var(--c-accent)",
    width: 2.4,
  },
  {
    points: makePoints((t) => 2.4 + envelope(t)),
    color: "var(--c-accent)",
    width: 1.6,
    dashed: true,
    opacity: 0.55,
    showAt: 1,
  },
  {
    points: makePoints((t) => 2.4 - envelope(t)),
    color: "var(--c-accent)",
    width: 1.6,
    dashed: true,
    opacity: 0.55,
    showAt: 1,
  },
  {
    points: makePoints(audio),
    color: "var(--c-sky)",
    width: 2.4,
    showAt: 2,
  },
]);

const labels = computed(() => [
  {
    x: -0.245,
    y: 2.54,
    text: "调幅波（AM）",
    anchor: "right" as const,
    size: 13,
    color: "var(--c-accent)",
  },
  {
    x: -0.245,
    y: 2.3,
    text: "接收到的已调波",
    anchor: "right" as const,
    size: 10.5,
    color: "var(--c-text-dim)",
  },
  {
    x: -0.245,
    y: 0.94,
    text: "音频信号",
    anchor: "right" as const,
    size: 13,
    color: "var(--c-sky)",
    showAt: 2,
  },
  {
    x: -0.245,
    y: 0.7,
    text: "解调后还原",
    anchor: "right" as const,
    size: 10.5,
    color: "var(--c-text-dim)",
    showAt: 2,
  },
]);
</script>

<template>
  <CoordAxes
    :x-range="[-0.28, 1]"
    :y-range="[0, 3.2]"
    :x-axis="{ quantity: 't' }"
    :curves="curves"
    :labels="labels"
    :ticks="{ labels: false, arrows: false, origin: false, x: [], y: [] }"
    :view="{ width: 900, height: 300 }"
    :step="props.step ?? 0"
  />
</template>
