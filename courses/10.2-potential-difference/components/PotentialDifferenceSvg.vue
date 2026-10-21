<script setup lang="ts">
/** 第 4 页电势差定义：电场线上的 A、B 两点，U_AB = φ_A − φ_B 与 U_BA = φ_B − φ_A 两个方向相反的差。 */
defineProps<{
  /** 显示 U_AB 方向箭头（A → B） */
  showUab?: boolean;
  /** 显示 U_BA 方向箭头（B → A） */
  showUba?: boolean;
}>();
</script>

<template>
  <svg viewBox="0 0 360 250" width="360" height="250">
    <line x1="22" y1="92" x2="338" y2="92" stroke="var(--c-field)" stroke-width="1.8" opacity="0.4" />
    <CourseArrow :from="{ x: 34, y: 92 }" :to="{ x: 66, y: 92 }" stroke="var(--c-field)" stroke-width="1.8" opacity="0.8" />
    <CourseArrow :from="{ x: 190, y: 92 }" :to="{ x: 222, y: 92 }" stroke="var(--c-field)" stroke-width="1.8" opacity="0.8" />
    <circle cx="95" cy="92" r="5.5" fill="var(--c-neutral-200)" />
    <text x="95" y="66" text-anchor="middle" fill="var(--c-text)" font-size="15" font-style="italic" font-family="KaTeX_Math">
      φ
      <tspan font-size="10" dy="3">A</tspan>
    </text>
    <text x="95" y="118" text-anchor="middle" fill="var(--c-text-dim)" font-size="15" font-style="italic" font-family="KaTeX_Math">A</text>
    <circle cx="265" cy="92" r="5.5" fill="var(--c-neutral-200)" />
    <text x="265" y="66" text-anchor="middle" fill="var(--c-text)" font-size="15" font-style="italic" font-family="KaTeX_Math">
      φ
      <tspan font-size="10" dy="3">B</tspan>
    </text>
    <text x="265" y="118" text-anchor="middle" fill="var(--c-text-dim)" font-size="15" font-style="italic" font-family="KaTeX_Math">B</text>
    <g v-if="showUab">
      <CourseArrow :from="{ x: 95, y: 152 }" :to="{ x: 265, y: 152 }" stroke="var(--c-accent)" stroke-width="2.4" />
      <text x="180" y="143" text-anchor="middle" fill="var(--c-accent)" font-size="14" font-style="italic" font-family="KaTeX_Math">
        U
        <tspan font-size="10" dy="3">AB</tspan>
      </text>
      <text x="180" y="176" text-anchor="middle" fill="var(--c-text-dim)" font-size="13" font-style="italic" font-family="KaTeX_Math">
        φ
        <tspan font-size="9" dy="2">A</tspan>
        <tspan dx="2">−</tspan>
        <tspan dx="2">φ</tspan>
        <tspan font-size="9" dy="2">B</tspan>
      </text>
    </g>
    <g v-if="showUba">
      <CourseArrow :from="{ x: 265, y: 208 }" :to="{ x: 95, y: 208 }" stroke="var(--c-accent-2)" stroke-width="2.4" />
      <text x="180" y="199" text-anchor="middle" fill="var(--c-accent-2)" font-size="14" font-style="italic" font-family="KaTeX_Math">
        U
        <tspan font-size="10" dy="3">BA</tspan>
      </text>
      <text x="180" y="232" text-anchor="middle" fill="var(--c-text-dim)" font-size="13" font-style="italic" font-family="KaTeX_Math">
        φ
        <tspan font-size="9" dy="2">B</tspan>
        <tspan dx="2">−</tspan>
        <tspan dx="2">φ</tspan>
        <tspan font-size="9" dy="2">A</tspan>
      </text>
    </g>
  </svg>
</template>
