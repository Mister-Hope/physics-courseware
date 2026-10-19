<script setup lang="ts">
// 第 6 页：电场中同一点，放入电荷量不同的试探电荷，所受静电力不同。
// 常显：电荷量 q 的试探电荷与它受的力 F；
// showSecond（第 1 击）：同一位置换成 2q，受力为 2F —— 长度比严格 1 : 2。
// 物理：F = kQq/r²，同一点 r 不变 ⇒ F ∝ q。
defineProps<{ showSecond?: boolean }>();

const Q = { x: 80, y: 140 };
const P = { x: 250, y: 140 };
const L1 = 48;
const L2 = 96;
</script>

<template>
  <svg viewBox="0 0 420 280" class="w-full h-full">
    <line :x1="Q.x" :y1="Q.y" :x2="P.x" :y2="P.y" stroke="var(--c-neutral-500)" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="4 6" />
    <text :x="(Q.x + P.x) / 2 - 6" :y="Q.y - 12" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-neutral-500)">r</text>
    <circle :cx="Q.x" :cy="Q.y" r="16" fill="var(--c-danger)" fill-opacity="0.9" />
    <text :x="Q.x" :y="Q.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="16" fill="#fff">+</text>
    <text :x="Q.x" :y="Q.y + 44" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-danger)">Q</text>
    <template v-if="showSecond">
      <circle :cx="P.x" :cy="P.y" r="16" fill="none" stroke="var(--c-accent)" stroke-width="2" />
      <text :x="P.x" :y="P.y - 30" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)">2q</text>
      <CourseArrow :from="P" :to="{ x: P.x + L2, y: P.y }" stroke="var(--c-force)" :stroke-width="3" />
      <text :x="P.x + L2 / 2" :y="P.y - 14" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-force)">2F</text>
    </template>
    <circle :cx="P.x" :cy="P.y" r="9" fill="var(--c-accent)" fill-opacity="0.9" />
    <text :x="P.x" :y="P.y + 34" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)">q</text>
    <CourseArrow :from="P" :to="{ x: P.x + L1, y: P.y }" stroke="var(--c-force)" :stroke-width="3" />
    <text :x="P.x + L1 / 2" :y="P.y + 44" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-force)">F</text>
  </svg>
</template>
