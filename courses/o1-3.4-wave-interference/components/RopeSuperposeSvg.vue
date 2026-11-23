<!-- 第 3 页：绳上两列波相向传播、相遇叠加、再彼此穿过（位移真实相加） -->
<template>
  <svg viewBox="20 84 620 108" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="30" y1="140" x2="630" y2="140" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="5 6" opacity="0.45" />
    <path v-if="step === 2" :d="ghostA" fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="4 5" opacity="0.55" />
    <path v-if="step === 2" :d="ghostB" fill="none" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="4 5" opacity="0.55" />
    <path :d="rope" fill="none" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    <circle cx="40" cy="140" r="4" fill="var(--c-accent)" />
    <circle cx="620" cy="140" r="4" fill="var(--c-physics)" />
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

const base = 140;
const sigma = 26;
const amp = 34;
const frames: [number, number][] = [
  [170, 490],
  [270, 390],
  [330, 330],
  [490, 170],
];
const [x1, x2] = frames[Math.min(step, 3)];

const bump = (x: number, c: number): number => amp * Math.exp(-(((x - c) / sigma) ** 2));

const line = (calc: (x: number) => number): string => {
  const pts: string[] = [];
  for (let x = 40; x <= 620; x += 4) pts.push(`${pts.length === 0 ? "M" : "L"} ${x} ${calc(x)}`);
  return pts.join(" ");
};

const rope = line((x) => base - bump(x, x1) - bump(x, x2));
const ghostA = line((x) => base - bump(x, x1));
const ghostB = line((x) => base - bump(x, x2));
</script>
