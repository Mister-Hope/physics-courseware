<!--
  斜面体放在光滑水平面上，小球沿斜面下滑（第 10 页）。
  小球的速度沿斜面向下，斜面体向左后退；水平方向两者动量等大反向。
-->
<template>
  <svg viewBox="0 0 460 220" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <SurfaceHatch :from="{ x: 20, y: 186 }" :to="{ x: 440, y: 186 }" side="below" :thickness="12" :gap="22" :line-width="2" />
    <!-- 斜面体 -->
    <polygon points="60,64 60,186 400,186" fill="rgba(96, 165, 250, 0.12)" stroke="var(--c-velocity)" stroke-width="2" stroke-linejoin="round" />
    <text x="250" y="176" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="20">M</text>
    <!-- 小球 -->
    <circle cx="252" cy="115" r="14" fill="rgba(226, 168, 70, 0.18)" stroke="var(--c-accent)" stroke-width="2" />
    <text x="252" y="121" text-anchor="middle" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="15">m</text>
    <!-- 小球速度（沿斜面向下） -->
    <CourseArrow :from="{ x: 264, y: 124 }" :to="{ x: 352, y: 155 }" stroke="var(--c-accent)" stroke-width="2.4" />
    <text x="342" y="140" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="20">v</text>
    <!-- 斜面体后退的速度 -->
    <CourseArrow :from="{ x: 158, y: 158 }" :to="{ x: 78, y: 158 }" stroke="var(--c-velocity)" stroke-width="2.4" />
    <text x="112" y="147" text-anchor="middle" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="20">V</text>
    <!-- 倾角 -->
    <path d="M 358 186 A 42 42 0 0 0 361 172" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" />
    <text x="374" y="176" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="17">θ</text>
  </svg>
</template>
