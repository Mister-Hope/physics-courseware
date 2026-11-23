<!-- 水平弹簧振子示意图：本课 P3/P4/P6 共用；x 为归一化位移（-1~1），showForce 显示回复力箭头 -->
<script setup lang="ts">
import { computed } from "vue";

const {
  x = null,
  side = "right",
  showForce = false,
  showX = false,
  showPoints = true,
} = defineProps<{
  x?: number | null;
  side?: "left" | "right";
  showForce?: boolean;
  showX?: boolean;
  showPoints?: boolean;
}>();

const EQ_X = 250;
const AMP_X = 95;
const BALL_Y = 100;
const BALL_R = 15;
const WALL_X = 30;

const pos = computed((): number => x ?? (side === "left" ? -0.72 : 0.72));
const ballX = computed((): number => EQ_X + pos.value * AMP_X);
const sign = computed((): number => Math.sign(pos.value));
const pointLabel = computed((): string => (sign.value < 0 ? "Q" : "P"));
const springPath = computed((): string => {
  const start = WALL_X + 2;
  const end = ballX.value - BALL_R - 3;
  const coils = 14;
  const amp = 9;
  const parts: string[] = [`M ${start} ${BALL_Y}`];
  for (let i = 1; i < coils; i += 1) {
    const px = start + ((end - start) * i) / coils;
    const py = BALL_Y + (i % 2 === 0 ? -amp : amp);
    parts.push(`L ${px} ${py}`);
  }
  parts.push(`L ${end} ${BALL_Y}`);
  return parts.join(" ");
});
const forceLen = computed((): number => Math.abs(pos.value) * 72);
const forceTo = computed((): { x: number; y: number } => ({
  x: ballX.value - sign.value * forceLen.value,
  y: BALL_Y,
}));
</script>

<template>
  <svg viewBox="0 0 520 200" class="em-spring-svg" role="img" aria-label="水平弹簧振子示意图">
    <line x1="30" y1="100" x2="492" y2="100" stroke="var(--c-border)" stroke-width="1.2" stroke-dasharray="6 6" opacity="0.5" />
    <SurfaceHatch :from="{ x: WALL_X, y: 64 }" :to="{ x: WALL_X, y: 136 }" side="left" />
    <rect x="18" y="64" width="12" height="72" rx="2" fill="var(--c-text-mute)" opacity="0.75" />
    <path :d="springPath" fill="none" stroke="var(--c-accent-2)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
    <line :x1="ballX" y1="72" :x2="ballX" y2="128" stroke="var(--c-text-mute)" stroke-width="1" stroke-dasharray="4 4" opacity="0.45" />
    <CourseArrow v-if="showForce && Math.abs(pos) > 0.02" :from="{ x: ballX, y: BALL_Y }" :to="forceTo" stroke="var(--c-danger)" stroke-width="3" label="F" :label-dx="0" :label-dy="-12" />
    <circle :cx="ballX" cy="100" :r="BALL_R" fill="var(--c-accent)" stroke="var(--c-accent-light)" stroke-width="2" />
    <text x="250" y="151" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-text-dim)">O</text>
    <text v-if="showPoints" :x="ballX" y="151" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-accent)">{{ pointLabel }}</text>
    <CourseArrow v-if="showX && Math.abs(pos) > 0.02" :from="{ x: EQ_X, y: 172 }" :to="{ x: ballX, y: 172 }" stroke="var(--c-physics)" stroke-width="2.4" label="x" :label-dx="0" :label-dy="16" />
  </svg>
</template>

<style scoped>
.em-spring-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
