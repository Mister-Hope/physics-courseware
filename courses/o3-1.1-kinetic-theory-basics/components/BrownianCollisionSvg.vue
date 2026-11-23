<!-- 第 7 页：液体分子从各方向撞击悬浮微粒，撞击不平衡 -->
<template>
  <svg viewBox="0 0 440 240" width="440" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="28" y="24" width="384" height="192" rx="14" fill="rgba(15,23,42,0.42)" stroke="var(--c-border)" stroke-width="1.4" />
    <circle cx="220" cy="120" r="34" fill="var(--c-neutral-500)" opacity="0.8" stroke="var(--c-neutral-300)" stroke-width="1.5" />
    <circle cx="220" cy="120" r="44" fill="none" stroke="var(--c-accent)" stroke-width="1" stroke-dasharray="4 5" opacity="0.6" />
    <text x="220" y="124" fill="var(--c-text)" font-size="11" font-family="sans-serif" text-anchor="middle">小炭粒</text>
    <g fill="var(--c-accent-2)">
      <circle cx="98" cy="66" r="4" />
      <circle cx="78" cy="156" r="4" />
      <circle cx="138" cy="200" r="4" />
      <circle cx="340" cy="62" r="4" />
      <circle cx="356" cy="152" r="4" />
      <circle cx="300" cy="204" r="4" />
      <circle cx="160" cy="52" r="3.4" />
      <circle cx="338" cy="204" r="3.4" />
    </g>
    <CourseArrow :from="{ x: 104, y: 72 }" :to="{ x: 190, y: 104 }" stroke="var(--c-accent-2)" :stroke-width="1.8" />
    <CourseArrow :from="{ x: 84, y: 152 }" :to="{ x: 188, y: 130 }" stroke="var(--c-accent-2)" :stroke-width="1.8" />
    <CourseArrow :from="{ x: 140, y: 194 }" :to="{ x: 198, y: 146 }" stroke="var(--c-accent-2)" :stroke-width="1.8" />
    <CourseArrow :from="{ x: 334, y: 68 }" :to="{ x: 252, y: 102 }" stroke="var(--c-accent-2)" :stroke-width="1.8" />
    <CourseArrow :from="{ x: 350, y: 148 }" :to="{ x: 252, y: 130 }" stroke="var(--c-accent-2)" :stroke-width="1.8" />
    <CourseArrow :from="{ x: 294, y: 198 }" :to="{ x: 242, y: 146 }" stroke="var(--c-accent-2)" :stroke-width="1.8" />
    <text x="96" y="44" fill="var(--c-text-dim)" font-size="11" font-family="sans-serif">液体分子</text>
    <text x="220" y="232" fill="var(--c-text-mute)" font-size="10" font-family="sans-serif" text-anchor="middle">某一瞬间，某个方向的撞击更强</text>
  </svg>
</template>
