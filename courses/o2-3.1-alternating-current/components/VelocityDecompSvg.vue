<!--
  第 11 页：AB 边速度的分解。B 竖直向下，v 与 B 成 θ 角；
  水平分量 v⊥ 垂直于 B，就是切割磁感线的有效速度 v sinθ。
-->
<template>
  <svg viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="速度 v 与磁场 B 成 θ 角，垂直 B 的分量为 v sinθ">
    <CourseArrow :from="{ x: 118, y: 34 }" :to="{ x: 118, y: 216 }" stroke="var(--c-text-dim)" stroke-width="2" label="B" :label-dx="-20" :label-dy="10" />
    <CourseArrow :from="{ x: 118, y: 70 }" :to="{ x: 268, y: 190 }" stroke="var(--c-accent-2)" stroke-width="3" label="v" :label-dx="8" :label-dy="14" />
    <line x1="118" y1="70" x2="268" y2="70" stroke="var(--c-accent-2)" stroke-width="1.8" stroke-dasharray="6 5" opacity="0.8" />
    <line x1="268" y1="190" x2="268" y2="70" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.7" />
    <path d="M 118 132 A 62 62 0 0 1 166 109" fill="none" stroke="var(--c-accent)" stroke-width="2" />
    <text x="142" y="152" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="15">θ</text>
    <text x="198" y="58" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic" font-size="14">
      <tspan>v</tspan><tspan font-size="10" dy="4">⊥</tspan>
    </text>
    <text x="284" y="196" fill="var(--c-text-dim)" font-family="KaTeX_Main" font-size="13">
      <tspan font-family="KaTeX_Math" font-style="italic">v</tspan><tspan font-family="KaTeX_Math" font-style="italic" font-size="10" dy="4">⊥</tspan
      ><tspan dy="-4"> = </tspan><tspan font-family="KaTeX_Math" font-style="italic">v</tspan><tspan> sin</tspan
      ><tspan font-family="KaTeX_Math" font-style="italic">θ</tspan>
    </text>
  </svg>
</template>
