<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 第 16 页「电荷守恒定律」：一个高能光子打到原子核上，产生一个正电子和一个负电子； 一对正、负电子又可以同时湮没、转化为一对光子——带电粒子总是成对产生或湮没， 两个粒子带电数量相等、电性相反，光子不带电，所以电荷的代数和仍然不变（教材行 65）。 页面 clicks: 3 —— 常显只有光子与原子核，第 3
 * 击才出电子对与湮没。
 */
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value, 3)));
</script>

<template>
  <svg viewBox="0 0 620 220" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- 常显：入射光子 + 原子核 -->
    <path d="M 30 110 C 45 78 60 142 75 110 C 90 78 105 142 120 110 C 128 92 136 92 142 110" fill="none" stroke="var(--c-accent)" stroke-width="2.6" />
    <text x="86" y="72" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="22" fill="var(--c-accent)">γ</text>
    <CourseArrow :from="{ x: 150, y: 110 }" :to="{ x: 208, y: 110 }" stroke="var(--c-accent)" stroke-width="2.6" />

    <circle cx="238" cy="96" r="13" fill="var(--c-danger)" fill-opacity="0.85" />
    <text x="238" y="96" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="16" fill="#0c1122">+</text>
    <circle cx="262" cy="96" r="13" fill="var(--c-neutral-600)" />
    <circle cx="250" cy="118" r="13" fill="var(--c-danger)" fill-opacity="0.85" />
    <text x="250" y="118" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="16" fill="#0c1122">+</text>
    <circle cx="274" cy="118" r="13" fill="var(--c-neutral-600)" />
    <text x="256" y="158" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">原子核</text>

    <!-- 第 3 击：成对产生、成对湮没 -->
    <g v-if="step >= 3">
      <CourseArrow :from="{ x: 292, y: 110 }" :to="{ x: 330, y: 70 }" stroke="var(--c-velocity)" stroke-width="2.4" />
      <CourseArrow :from="{ x: 292, y: 110 }" :to="{ x: 330, y: 150 }" stroke="var(--c-danger)" stroke-width="2.4" />

      <circle cx="362" cy="64" r="17" fill="var(--c-velocity)" fill-opacity="0.9" />
      <text x="362" y="64" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="20" fill="#0c1122">−</text>
      <text x="362" y="26" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-velocity)">e</text>

      <circle cx="362" cy="156" r="17" fill="var(--c-danger)" fill-opacity="0.9" />
      <text x="362" y="156" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="20" fill="#0c1122">+</text>
      <text x="362" y="200" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-danger)">e</text>

      <path d="M 410 64 C 424 34 438 94 452 64 C 466 34 480 94 494 64" fill="none" stroke="var(--c-accent)" stroke-width="2.4" />
      <path d="M 410 156 C 424 126 438 186 452 156 C 466 126 480 186 494 156" fill="none" stroke="var(--c-accent)" stroke-width="2.4" />
      <text x="452" y="26" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">γ</text>
      <text x="452" y="200" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">γ</text>

      <text x="362" y="112" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">成对产生</text>
      <text x="536" y="112" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">成对湮没</text>
      <CourseArrow :from="{ x: 386, y: 64 }" :to="{ x: 404, y: 64 }" stroke="var(--c-text-dim)" stroke-width="2" />
      <CourseArrow :from="{ x: 386, y: 156 }" :to="{ x: 404, y: 156 }" stroke="var(--c-text-dim)" stroke-width="2" />
    </g>
  </svg>
</template>
