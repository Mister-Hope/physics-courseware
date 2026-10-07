<script setup lang="ts">
/**
 * 第 10 页：小锤击打弹性金属片，A 球水平抛出、B 球同时自由下落（教材图 5.3-2）。 点图重放：两球同时落地（竖直方向的运动完全相同）。位置都由真实公式算出： A：x 匀速、y ∝
 * t²；B：y ∝ t（t 就是动画进度）。
 */
import { computed, onBeforeUnmount, ref } from "vue";

const DURATION = 900;
const progress = ref(0);
let frame = 0;
let startedAt = 0;

const play = (): void => {
  cancelAnimationFrame(frame);
  startedAt = performance.now();
  progress.value = 0;
  const tick = (now: number): void => {
    const progressValue = Math.min(1, (now - startedAt) / DURATION);
    progress.value = progressValue;
    if (progressValue < 1) frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
};
onBeforeUnmount(() => cancelAnimationFrame(frame));

/** 抛出点高度、地面（球心落地处）与水平射程（viewBox 用户单位） */
const START_Y = 67;
const CONTACT_Y = 251;
const FALL = CONTACT_Y - START_Y;
const A_START = { x: 226, y: START_Y };
const B_START = { x: 132, y: START_Y };
const RANGE = 116;
const ballA = computed(() => ({
  x: A_START.x + RANGE * progress.value,
  y: START_Y + FALL * progress.value ** 2,
}));
const ballB = computed(() => ({ x: B_START.x, y: START_Y + FALL * progress.value }));
/** A 球的完整轨迹（虚线预告） */
const pathD = ((): string => {
  const points = Array.from({ length: 25 }, (_, i) => {
    const t = i / 24;

    return { x: A_START.x + RANGE * t, y: START_Y + FALL * t * t };
  });

  return points
    .map((point, i) => `${i === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
})();
</script>

<template>
  <svg
    viewBox="0 0 440 320"
    width="100%"
    style="max-width: 460px; cursor: pointer"
    xmlns="http://www.w3.org/2000/svg"
    role="button"
    aria-label="点击重放：小锤击打弹性金属片，两球同时落地"
    @click="play"
  >
    <SurfaceHatch
      :from="{ x: 26, y: 262 }"
      :to="{ x: 414, y: 262 }"
      side="below"
      color="#64748b"
      :line-width="2"
      :thickness="12"
      :gap="20"
    />
    <rect x="96" y="40" width="14" height="222" rx="6" fill="rgba(148,163,184,0.4)" />
    <line
      x1="103"
      y1="78"
      x2="240"
      y2="78"
      stroke="#e2a846"
      stroke-width="5"
      stroke-linecap="round"
    />
    <rect x="158" y="38" width="30" height="17" rx="5" fill="#94a3b8" />
    <line
      x1="188"
      y1="46"
      x2="226"
      y2="14"
      stroke="#94a3b8"
      stroke-width="5"
      stroke-linecap="round"
    />
    <path
      :d="pathD"
      fill="none"
      stroke="rgba(226,168,70,0.55)"
      stroke-width="2"
      stroke-dasharray="8 6"
    />
    <line
      :x1="B_START.x"
      :y1="B_START.y"
      :x2="B_START.x"
      :y2="CONTACT_Y"
      stroke="rgba(96,165,250,0.55)"
      stroke-width="2"
      stroke-dasharray="8 6"
    />
    <line
      :x1="A_START.x + RANGE - 12"
      y1="262"
      :x2="A_START.x + RANGE + 12"
      y2="262"
      stroke="#e2a846"
      stroke-width="2.4"
    />
    <line
      :x1="B_START.x - 12"
      y1="262"
      :x2="B_START.x + 12"
      y2="262"
      stroke="#60a5fa"
      stroke-width="2.4"
    />
    <circle :cx="ballA.x" :cy="ballA.y" r="11" fill="#e2a846" stroke="#f5d08a" stroke-width="2" />
    <circle :cx="ballB.x" :cy="ballB.y" r="11" fill="#60a5fa" stroke="#93c5fd" stroke-width="2" />
    <text :x="ballA.x + 17" :y="ballA.y + 7" font-size="18" font-weight="700" fill="#e2a846">
      A
    </text>
    <text :x="ballB.x - 29" :y="ballB.y + 7" font-size="18" font-weight="700" fill="#60a5fa">
      B
    </text>
    <text x="132" y="292" text-anchor="middle" font-size="16" fill="#94a3b8">同时落地</text>
  </svg>
</template>
