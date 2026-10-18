<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 第 3 页「两种电荷」：玻璃棒与丝绸、橡胶棒与毛皮摩擦后各带什么电（初中结论），
 * 以及同种电荷相斥、异种电荷相吸。页面 clicks: 3 —— ① 出电性标记 ③ 出相互作用箭头。
 */
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value, 3)));
</script>

<template>
  <svg viewBox="0 0 640 330" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- 左格：玻璃棒 + 丝绸 -->
    <rect x="20" y="24" width="290" height="132" rx="14" fill="var(--c-surface)" fill-opacity="0.28" stroke="var(--c-border)" stroke-width="1.4" />
    <rect x="52" y="58" width="112" height="16" rx="8" fill="var(--c-accent)" fill-opacity="0.55" />
    <rect x="188" y="52" width="102" height="34" rx="12" fill="var(--c-accent-2)" fill-opacity="0.35" />
    <text x="108" y="104" text-anchor="middle" font-size="16" fill="var(--c-accent)">玻璃棒</text>
    <text x="239" y="104" text-anchor="middle" font-size="16" fill="var(--c-accent-2)">丝绸</text>
    <g v-if="step >= 1">
      <circle cx="108" cy="66" r="11" fill="var(--c-danger)" fill-opacity="0.92" />
      <text x="108" y="66" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="15" fill="#0c1122">+</text>
      <circle cx="239" cy="69" r="11" fill="var(--c-velocity)" fill-opacity="0.92" />
      <text x="239" y="69" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="15" fill="#0c1122">−</text>
    </g>

    <!-- 右格：橡胶棒 + 毛皮 -->
    <rect x="330" y="24" width="290" height="132" rx="14" fill="var(--c-surface)" fill-opacity="0.28" stroke="var(--c-border)" stroke-width="1.4" />
    <rect x="362" y="58" width="112" height="16" rx="8" fill="var(--c-neutral-600)" />
    <rect x="498" y="52" width="102" height="34" rx="12" fill="var(--c-neutral-700)" />
    <text x="418" y="104" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">橡胶棒</text>
    <text x="549" y="104" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">毛皮</text>
    <g v-if="step >= 1">
      <circle cx="418" cy="66" r="11" fill="var(--c-velocity)" fill-opacity="0.92" />
      <text x="418" y="66" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="15" fill="#0c1122">−</text>
      <circle cx="549" cy="69" r="11" fill="var(--c-danger)" fill-opacity="0.92" />
      <text x="549" y="69" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="15" fill="#0c1122">+</text>
    </g>

    <!-- 相互作用：同种相斥 / 异种相吸（第 3 击） -->
    <g v-if="step >= 3">
      <circle cx="112" cy="216" r="17" fill="var(--c-danger)" fill-opacity="0.85" />
      <text x="112" y="216" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="19" fill="#0c1122">+</text>
      <circle cx="192" cy="216" r="17" fill="var(--c-danger)" fill-opacity="0.85" />
      <text x="192" y="216" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="19" fill="#0c1122">+</text>
      <CourseArrow :from="{ x: 82, y: 216 }" :to="{ x: 44, y: 216 }" stroke="var(--c-accent)" stroke-width="3" />
      <CourseArrow :from="{ x: 222, y: 216 }" :to="{ x: 260, y: 216 }" stroke="var(--c-accent)" stroke-width="3" />
      <text x="152" y="278" text-anchor="middle" font-size="16" fill="var(--c-accent)">同种电荷相互排斥</text>

      <circle cx="412" cy="216" r="17" fill="var(--c-danger)" fill-opacity="0.85" />
      <text x="412" y="216" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="19" fill="#0c1122">+</text>
      <circle cx="492" cy="216" r="17" fill="var(--c-velocity)" fill-opacity="0.85" />
      <text x="492" y="216" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="19" fill="#0c1122">−</text>
      <CourseArrow :from="{ x: 436, y: 206 }" :to="{ x: 468, y: 206 }" stroke="var(--c-accent)" stroke-width="3" />
      <CourseArrow :from="{ x: 468, y: 226 }" :to="{ x: 436, y: 226 }" stroke="var(--c-accent)" stroke-width="3" :head-size="9" />
      <text x="452" y="278" text-anchor="middle" font-size="16" fill="var(--c-accent)">异种电荷相互吸引</text>
    </g>
  </svg>
</template>
