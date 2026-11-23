<!-- 第 10 页：分子间引力与斥力同时存在，合力随距离改变 -->
<template>
  <svg viewBox="0 0 460 230" width="460" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="mp-a" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#93c5fd" />
        <stop offset="100%" stop-color="#3b82f6" />
      </radialGradient>
      <radialGradient id="mp-b" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#f6d48a" />
        <stop offset="100%" stop-color="#e2a846" />
      </radialGradient>
    </defs>
    <text x="222" y="26" fill="var(--c-text-dim)" font-size="11" font-family="sans-serif" text-anchor="middle">距离较大：引力 &gt; 斥力</text>
    <circle cx="180" cy="68" r="22" fill="url(#mp-a)" stroke="var(--c-accent-2)" stroke-width="1.2" />
    <circle cx="300" cy="68" r="22" fill="url(#mp-b)" stroke="var(--c-accent)" stroke-width="1.2" />
    <CourseArrow :from="{ x: 300, y: 68 }" :to="{ x: 232, y: 68 }" stroke="var(--c-accent-2)" :stroke-width="2.2" />
    <CourseArrow :from="{ x: 300, y: 68 }" :to="{ x: 346, y: 68 }" stroke="var(--c-danger)" :stroke-width="2.2" />
    <text x="258" y="54" fill="var(--c-accent-2)" font-size="11" font-family="KaTeX_Math" font-style="italic">
      F<tspan font-family="sans-serif" font-style="normal" font-size="8" dy="2">引</tspan>
    </text>
    <text x="324" y="54" fill="var(--c-danger)" font-size="11" font-family="KaTeX_Math" font-style="italic">
      F<tspan font-family="sans-serif" font-style="normal" font-size="8" dy="2">斥</tspan>
    </text>
    <text x="222" y="100" fill="var(--c-text-mute)" font-size="9" font-family="sans-serif" text-anchor="middle">合力表现为引力</text>
    <text x="222" y="132" fill="var(--c-text-dim)" font-size="11" font-family="sans-serif" text-anchor="middle">距离较小：斥力 &gt; 引力</text>
    <circle cx="190" cy="174" r="22" fill="url(#mp-a)" stroke="var(--c-accent-2)" stroke-width="1.2" />
    <circle cx="280" cy="174" r="22" fill="url(#mp-b)" stroke="var(--c-accent)" stroke-width="1.2" />
    <CourseArrow :from="{ x: 280, y: 174 }" :to="{ x: 238, y: 174 }" stroke="var(--c-accent-2)" :stroke-width="2.2" />
    <CourseArrow :from="{ x: 280, y: 174 }" :to="{ x: 342, y: 174 }" stroke="var(--c-danger)" :stroke-width="2.2" />
    <text x="254" y="160" fill="var(--c-accent-2)" font-size="11" font-family="KaTeX_Math" font-style="italic">
      F<tspan font-family="sans-serif" font-style="normal" font-size="8" dy="2">引</tspan>
    </text>
    <text x="316" y="160" fill="var(--c-danger)" font-size="11" font-family="KaTeX_Math" font-style="italic">
      F<tspan font-family="sans-serif" font-style="normal" font-size="8" dy="2">斥</tspan>
    </text>
    <text x="222" y="208" fill="var(--c-text-mute)" font-size="9" font-family="sans-serif" text-anchor="middle">合力表现为斥力</text>
  </svg>
</template>
