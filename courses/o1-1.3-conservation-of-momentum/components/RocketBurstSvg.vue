<!--
  火箭沿水平方向飞行、炸裂成两部分（教材图 1.3-4，第 14 页）。
  上半：炸裂前整体以 v 向右飞行；下半：m₁ 向左、其余部分向右。
-->
<template>
  <svg viewBox="0 0 440 260" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 炸裂前 -->
    <text x="20" y="52" fill="var(--c-text-dim)" font-family="KaTeX_Main" font-size="15">炸裂前</text>
    <rect x="120" y="30" width="120" height="34" rx="17" fill="rgba(226, 168, 70, 0.16)" stroke="var(--c-accent)" stroke-width="2" />
    <text x="180" y="53" text-anchor="middle" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="19">m</text>
    <CourseArrow :from="{ x: 250, y: 47 }" :to="{ x: 330, y: 47 }" stroke="var(--c-accent)" stroke-width="2.4" />
    <text x="334" y="53" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="19">v</text>
    <!-- 炸裂处 -->
    <line x1="40" y1="108" x2="400" y2="108" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="6 6" opacity="0.5" />
    <!-- 炸裂后 -->
    <text x="20" y="142" fill="var(--c-text-dim)" font-family="KaTeX_Main" font-size="15">炸裂后</text>
    <rect x="92" y="150" width="80" height="30" rx="15" fill="rgba(248, 113, 113, 0.16)" stroke="var(--c-danger)" stroke-width="2" />
    <text x="132" y="171" text-anchor="middle" fill="var(--c-danger)" font-family="KaTeX_Math" font-style="italic" font-size="17">
      m<tspan dy="4" font-size="11">1</tspan>
    </text>
    <CourseArrow :from="{ x: 88, y: 165 }" :to="{ x: 16, y: 165 }" stroke="var(--c-danger)" stroke-width="2.4" />
    <text x="52" y="158" text-anchor="middle" fill="var(--c-danger)" font-family="KaTeX_Math" font-style="italic" font-size="17">
      v<tspan dy="4" font-size="11">1</tspan>
    </text>
    <rect x="210" y="150" width="150" height="30" rx="15" fill="rgba(226, 168, 70, 0.16)" stroke="var(--c-accent)" stroke-width="2" />
    <text x="285" y="171" text-anchor="middle" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="17">
      m − m<tspan dy="4" font-size="11">1</tspan>
    </text>
    <CourseArrow :from="{ x: 366, y: 165 }" :to="{ x: 420, y: 165 }" stroke="var(--c-accent)" stroke-width="2.4" />
    <text x="396" y="196" text-anchor="middle" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="17">
      v<tspan dy="4" font-size="11">2</tspan>
    </text>
  </svg>
</template>
