<!--
  封面装饰：通电导线在匀强磁场中受力（1.1 磁场对通电导线的作用力）
  —— 俯视示意：磁场垂直纸面向里（裸 × 阵列），导线中的电流 I 向右，
     由左手定则，安培力 F 竖直向上。用 FieldDots / CourseArrow 共享组件，不手画磁场点阵。
-->
<template>
  <svg viewBox="0 0 260 170" width="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect
      x="26"
      y="28"
      width="208"
      height="124"
      rx="14"
      fill="color-mix(in srgb, var(--c-accent) 6%, transparent)"
      stroke="color-mix(in srgb, var(--c-accent) 30%, transparent)"
      stroke-width="1.4"
      stroke-dasharray="7 6"
    />
    <FieldDots :x="56" :y="52" dir="in" :cols="5" :rows="3" :spacing="36" :size="3" :line-width="1.2" opacity="0.55" />
    <line x1="38" y1="92" x2="222" y2="92" stroke="var(--c-accent)" stroke-width="9" stroke-linecap="round" opacity="0.18" />
    <line x1="38" y1="92" x2="222" y2="92" stroke="var(--c-accent)" stroke-width="4.6" stroke-linecap="round" />
    <CourseArrow :from="{ x: 96, y: 92 }" :to="{ x: 146, y: 92 }" stroke="var(--c-accent-2)" :stroke-width="3.2" label="I" :label-dx="0" :label-dy="-14" />
    <CourseArrow :from="{ x: 130, y: 92 }" :to="{ x: 130, y: 34 }" stroke="var(--c-danger)" :stroke-width="3.4" label="F" :label-dx="12" :label-dy="-2" />
    <text x="206" y="164" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)" opacity="0.75">B</text>
  </svg>
</template>
