<script setup lang="ts">
// 水平弹簧振子：平衡位置 O、两侧 M/M′，可选中物块位置与振幅箭头
import { computed } from "vue";

const {
  blockAt = "o",
  leftLabel = "M′",
  rightLabel = "M",
  showAmplitude = false,
  showLabels = true,
} = defineProps<{
  blockAt?: "o" | "left" | "right";
  leftLabel?: string;
  rightLabel?: string;
  showAmplitude?: boolean;
  showLabels?: boolean;
}>();

const O = 320;
const LEFT = 230;
const RIGHT = 410;
const BLOCK_W = 54;
const BLOCK_H = 46;
const BASE = 132;
const SPRING_Y = 109;
const WALL_X = 40;

const center = computed(() => (blockAt === "left" ? LEFT : blockAt === "right" ? RIGHT : O));
const blockLeft = computed(() => center.value - BLOCK_W / 2);
const blockTop = computed(() => BASE - BLOCK_H);

const springPath = computed(() => {
  const start = { x: WALL_X, y: SPRING_Y };
  const end = { x: blockLeft.value, y: SPRING_Y };
  const segments = 18;
  const step = (end.x - start.x) / segments;
  const points: string[] = [`M ${start.x} ${start.y}`];
  for (let i = 1; i < segments; i += 1) {
    const x = start.x + step * i;
    const y = SPRING_Y + (i % 2 === 1 ? -8 : 8);
    points.push(`L ${x.toFixed(1)} ${y}`);
  }
  points.push(`L ${end.x.toFixed(1)} ${end.y}`);
  return points.join(" ");
});
</script>

<template>
  <svg viewBox="0 0 620 170" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <SurfaceHatch
      :from="{ x: 30, y: BASE }"
      :to="{ x: 590, y: BASE }"
      side="below"
      :thickness="10"
      :gap="24"
      color="var(--c-text-dim)"
      :line-width="2.2"
      :hatch-width="1.1"
    />
    <SurfaceHatch
      :from="{ x: WALL_X, y: 58 }"
      :to="{ x: WALL_X, y: BASE }"
      side="left"
      :thickness="9"
      :gap="14"
      color="var(--c-text-dim)"
      :line-width="2.2"
      :hatch-width="1.1"
    />
    <line
      v-if="showLabels"
      v-for="x in [LEFT, O, RIGHT]"
      :key="x"
      :x1="x"
      y1="54"
      :x2="x"
      :y2="BASE"
      stroke="var(--c-line)"
      stroke-width="1"
      stroke-dasharray="4 5"
    />
    <path :d="springPath" fill="none" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    <rect :x="blockLeft" :y="blockTop" :width="BLOCK_W" :height="BLOCK_H" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="2" />
    <line :x1="center" :y1="blockTop" :x2="center" :y2="BASE" stroke="var(--c-accent-2)" stroke-width="1" opacity="0.35" />
    <g v-if="showLabels">
      <text :x="LEFT" y="38" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-text)">{{ leftLabel }}</text>
      <text :x="O" y="38" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-text)">O</text>
      <text :x="RIGHT" y="38" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-text)">{{ rightLabel }}</text>
    </g>
    <g v-if="showAmplitude">
      <CourseArrow :from="{ x: O, y: 70 }" :to="{ x: LEFT, y: 70 }" stroke="var(--c-accent)" :stroke-width="2.2" :head-size="8" />
      <CourseArrow :from="{ x: O, y: 70 }" :to="{ x: RIGHT, y: 70 }" stroke="var(--c-accent)" :stroke-width="2.2" :head-size="8" />
      <text x="274" y="63" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)">A</text>
      <text x="366" y="63" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)">A</text>
    </g>
  </svg>
</template>
