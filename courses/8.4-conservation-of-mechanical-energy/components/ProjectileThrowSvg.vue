<template>
  <!-- 第 15 页例题：从 h 高处以 30° 斜向上抛出的石块，标出抛出点、初速度方向、仰角与落地点 -->
  <svg width="340" height="320" viewBox="0 0 340 320" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto">
    <line x1="20" y1="290" x2="330" y2="290" stroke="var(--c-neutral-500)" stroke-width="3" />
    <SurfaceHatch :from="{ x: 24, y: 290 }" :to="{ x: 326, y: 290 }" side="below" :thickness="14" :gap="22" />
    <line x1="100" y1="80" x2="330" y2="80" stroke="var(--c-neutral-500)" stroke-width="1.4" stroke-dasharray="7 7" opacity="0.3" />
    <path d="M 100 80 Q 210 10 300 290" stroke="var(--c-accent-2)" stroke-width="2.2" stroke-dasharray="7 6" opacity="0.85" />
    <CourseArrow :from="{ x: 100, y: 80 }" :to="{ x: 180, y: 33.8 }" stroke="var(--c-accent-2)" :stroke-width="3" />
    <path d="M 145 80 A 45 45 0 0 0 139 57.5" stroke="var(--c-accent-2)" stroke-width="1.8" />
    <text x="152" y="70" font-size="13" fill="var(--c-accent-2)" font-family="KaTeX_Main">30°</text>
    <text x="184" y="30" font-size="14" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">v</text>
    <text x="194" y="34" font-size="10" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">0</text>
    <line x1="55" y1="80" x2="55" y2="290" stroke="var(--c-ok)" stroke-width="2" />
    <path d="M 49 90 l6 -10 l6 10" stroke="var(--c-ok)" stroke-width="2" fill="none" />
    <path d="M 49 280 l6 10 l6 -10" stroke="var(--c-ok)" stroke-width="2" fill="none" />
    <text x="62" y="182" font-size="15" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">h</text>
    <text x="74" y="182" font-size="13" fill="var(--c-ok)" font-family="KaTeX_Main">= 10 m</text>
    <circle cx="300" cy="290" r="5" fill="var(--c-accent-2)" />
  </svg>
</template>
