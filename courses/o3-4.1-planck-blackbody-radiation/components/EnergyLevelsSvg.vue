<!-- 4.1 P12：微观能量量子化（台阶）与宏观弹簧振子能量连续（可任意取值）的对比 -->
<template>
  <svg viewBox="0 0 440 250" width="100%" xmlns="http://www.w3.org/2000/svg">
    <line x1="220" y1="44" x2="220" y2="216" stroke="var(--c-border)" stroke-width="1.2" stroke-dasharray="5 5" />
    <text x="112" y="30" text-anchor="middle" font-size="13" fill="var(--c-accent)">微观：分立</text>
    <line x1="54" y1="196" x2="176" y2="196" stroke="var(--c-accent)" stroke-width="2.2" />
    <line x1="54" y1="156" x2="176" y2="156" stroke="var(--c-accent)" stroke-width="2.2" />
    <line x1="54" y1="116" x2="176" y2="116" stroke="var(--c-accent)" stroke-width="2.2" />
    <line x1="54" y1="76" x2="176" y2="76" stroke="var(--c-accent)" stroke-width="2.2" />
    <text x="48" y="200" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="var(--c-text-dim)">E0</text>
    <text x="48" y="160" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="var(--c-text-dim)">ε</text>
    <text x="48" y="120" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="var(--c-text-dim)">2ε</text>
    <text x="48" y="80" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="var(--c-text-dim)">3ε</text>
    <CourseArrow :from="{ x: 150, y: 190 }" :to="{ x: 150, y: 162 }" stroke="var(--c-text-dim)" :stroke-width="1.2" :head-size="6" />
    <text x="160" y="180" font-family="KaTeX_Math" font-style="italic" font-size="12" fill="var(--c-text-dim)">ε</text>
    <text x="112" y="232" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">只能取 ε 的整数倍</text>
    <text x="330" y="30" text-anchor="middle" font-size="13" fill="var(--c-velocity)">宏观：连续</text>
    <rect x="324" y="76" width="12" height="120" rx="6" fill="var(--c-velocity)" fill-opacity="0.18" />
    <circle cx="330" cy="132" r="7" fill="var(--c-velocity)" />
    <circle cx="330" cy="132" r="13" fill="var(--c-velocity)" fill-opacity="0.16" />
    <CourseArrow :from="{ x: 366, y: 196 }" :to="{ x: 366, y: 76 }" stroke="var(--c-velocity)" :stroke-width="1.2" :head-size="6" />
    <CourseArrow :from="{ x: 366, y: 76 }" :to="{ x: 366, y: 196 }" stroke="var(--c-velocity)" :stroke-width="1.2" :head-size="6" />
    <text x="330" y="232" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">能量可取任意值</text>
  </svg>
</template>
