<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 第 13 页「带电体为什么能吸引轻小物体」：左格金属屑、右格纸屑。
 * 页面 clicks: 2 —— ① 出"被吸起"的受力箭头 ② 出两组不同的结果（金属屑弹开 / 纸屑被吸住）。
 */
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value, 2)));
</script>

<template>
  <svg viewBox="0 0 620 300" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- 左格：金属屑 -->
    <rect x="16" y="20" width="288" height="256" rx="14" fill="var(--c-surface)" fill-opacity="0.28" stroke="var(--c-border)" stroke-width="1.4" />
    <circle cx="66" cy="168" r="24" fill="var(--c-danger)" fill-opacity="0.88" />
    <text x="66" y="168" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="24" fill="#0c1122">+</text>
    <text x="66" y="216" text-anchor="middle" font-size="16" fill="var(--c-danger)">带电体</text>

    <g fill="var(--c-accent)" fill-opacity="0.75" stroke="var(--c-accent)" stroke-width="1.4">
      <rect x="168" y="62" width="26" height="14" rx="4" />
      <rect x="214" y="52" width="22" height="14" rx="4" />
      <rect x="246" y="72" width="26" height="14" rx="4" />
    </g>
    <text x="220" y="118" text-anchor="middle" font-size="16" fill="var(--c-accent)">金属屑</text>

    <!-- 金属屑：只在第 1 击显示"被吸起"，第 2 击它已经被排斥，吸引力箭头必须撤掉 -->
    <g v-if="step === 1">
      <CourseArrow :from="{ x: 180, y: 156 }" :to="{ x: 180, y: 92 }" stroke="var(--c-accent-2)" stroke-width="3" />
      <CourseArrow :from="{ x: 224, y: 148 }" :to="{ x: 224, y: 82 }" stroke="var(--c-accent-2)" stroke-width="3" />
      <CourseArrow :from="{ x: 260, y: 160 }" :to="{ x: 260, y: 100 }" stroke="var(--c-accent-2)" stroke-width="3" />
    </g>
    <g v-if="step >= 2">
      <text x="180" y="58" text-anchor="middle" font-family="KaTeX_Main" font-size="19" fill="var(--c-danger)">+</text>
      <text x="224" y="46" text-anchor="middle" font-family="KaTeX_Main" font-size="19" fill="var(--c-danger)">+</text>
      <text x="260" y="68" text-anchor="middle" font-family="KaTeX_Main" font-size="19" fill="var(--c-danger)">+</text>
      <CourseArrow :from="{ x: 200, y: 76 }" :to="{ x: 164, y: 32 }" stroke="var(--c-danger)" stroke-width="3" />
      <CourseArrow :from="{ x: 248, y: 66 }" :to="{ x: 284, y: 28 }" stroke="var(--c-danger)" stroke-width="3" />
      <text x="150" y="252" text-anchor="middle" font-size="16" fill="var(--c-danger)">接触后带同种电荷 → 被排斥</text>
    </g>

    <!-- 右格：纸屑 -->
    <rect x="316" y="20" width="288" height="256" rx="14" fill="var(--c-surface)" fill-opacity="0.28" stroke="var(--c-border)" stroke-width="1.4" />
    <circle cx="366" cy="168" r="24" fill="var(--c-danger)" fill-opacity="0.88" />
    <text x="366" y="168" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="24" fill="#0c1122">+</text>
    <text x="366" y="216" text-anchor="middle" font-size="16" fill="var(--c-danger)">带电体</text>

    <g fill="var(--c-text-dim)" fill-opacity="0.6" stroke="var(--c-text-dim)" stroke-width="1.4">
      <rect x="470" y="62" width="24" height="16" rx="3" />
      <rect x="514" y="52" width="20" height="16" rx="3" />
      <rect x="546" y="72" width="24" height="16" rx="3" />
    </g>
    <text x="522" y="118" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">纸屑</text>

    <g v-if="step >= 1">
      <CourseArrow :from="{ x: 480, y: 156 }" :to="{ x: 480, y: 92 }" stroke="var(--c-accent-2)" stroke-width="3" />
      <CourseArrow :from="{ x: 524, y: 148 }" :to="{ x: 524, y: 82 }" stroke="var(--c-accent-2)" stroke-width="3" />
      <CourseArrow :from="{ x: 558, y: 160 }" :to="{ x: 558, y: 100 }" stroke="var(--c-accent-2)" stroke-width="3" />
    </g>
    <g v-if="step >= 2">
      <text x="452" y="252" text-anchor="middle" font-size="16" fill="var(--c-accent-2)">几乎不导电 → 被吸住</text>
    </g>
  </svg>
</template>
