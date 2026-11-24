<!-- 1.3 第 2 页：伽尔顿板（单个小球是偶然的，大量小球的分布有规律） -->
<template>
  <svg viewBox="0 0 360 252" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M148 10 H212 L198 32 H162 Z" fill="none" stroke="var(--c-text-dim)" stroke-width="2" stroke-linejoin="round" />
    <circle v-for="(peg, index) in pegs" :key="`peg-${index}`" :cx="peg.x" :cy="peg.y" r="2.8" fill="var(--c-text-dim)" opacity="0.95" />
    <line x1="78" y1="224" x2="322" y2="224" stroke="var(--c-text-dim)" stroke-width="2" opacity="0.9" />
    <line
      v-for="divider in dividers"
      :key="`div-${divider}`"
      :x1="divider"
      y1="168"
      :x2="divider"
      y2="224"
      stroke="var(--c-text-dim)"
      stroke-width="1.6"
      opacity="0.7"
    />
    <template v-if="step === 0">
      <path
        d="M180 34 L166 62 L194 86 L178 110 L200 134 L188 158 L196 176"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.6"
        stroke-dasharray="5 5"
        opacity="0.9"
      />
      <circle cx="196" cy="196" r="6.5" fill="var(--c-accent)" />
      <text x="196" y="246" font-size="14" text-anchor="middle" fill="var(--c-text-dim)">一个球：落在哪个槽是偶然的</text>
    </template>
    <template v-else>
      <circle v-for="(ball, index) in balls" :key="`ball-${index}`" :cx="ball.x" :cy="ball.y" r="4" :fill="ball.fill" opacity="0.95" />
      <text x="200" y="246" font-size="14" text-anchor="middle" fill="var(--c-text-dim)">大量球：中间多，两头少</text>
    </template>
    <text x="318" y="164" font-size="13" text-anchor="end" fill="var(--c-text-mute)">狭槽（等宽）</text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

const pegs: { x: number; y: number }[] = [];
for (let row = 0; row < 5; row += 1) {
  const count = row + 3;
  const spacing = 30;
  const startX = 180 - ((count - 1) * spacing) / 2;
  for (let index = 0; index < count; index += 1) pegs.push({ x: startX + index * spacing, y: 50 + row * 24 });
}

const dividers = computed(() => [80, 120, 160, 200, 240, 280, 320]);

const counts = [4, 12, 20, 18, 10, 4];
const balls: { x: number; y: number; fill: string }[] = [];
counts.forEach((count, bin) => {
  const centerX = 100 + bin * 40;
  for (let index = 0; index < count; index += 1) {
    const row = Math.floor(index / 4);
    const col = index % 4;
    balls.push({
      x: centerX - 13 + col * 9,
      y: 216 - row * 9,
      fill: bin % 2 === 0 ? "var(--c-accent)" : "var(--c-physics)",
    });
  }
});
</script>
