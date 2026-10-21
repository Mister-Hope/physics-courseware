<!-- 第 10 页：匀强电场中，正的试探电荷沿电场线方向由 A 移向 O -->
<template>
  <svg
    viewBox="0 0 440 210"
    width="440"
    height="210"
    xmlns="http://www.w3.org/2000/svg"
    font-family="Inter, system-ui, sans-serif"
    role="img"
    aria-label="匀强电场中正电荷沿电场线方向由 A 点移向 O 点，静电力做正功"
  >
    <CourseArrow v-for="y in [48, 105, 162]" :key="y" :from="{ x: 44, y }" :to="{ x: 400, y }" stroke="var(--c-field)" stroke-width="1.5" opacity="0.5" />
    <text x="412" y="44" text-anchor="end" fill="var(--c-accent)" font-size="19" font-style="italic" font-family="KaTeX_Math">E</text>
    <circle cx="105" cy="105" r="10" fill="var(--c-force)" fill-opacity="0.22" stroke="var(--c-force)" stroke-width="2.2" />
    <path d="M 99 105 H 111 M 105 99 V 111" stroke="var(--c-force)" stroke-width="1.8" stroke-linecap="round" />
    <CourseArrow :from="{ x: 105, y: 105 }" :to="{ x: 180, y: 105 }" stroke="var(--c-force)" stroke-width="3" />
    <text
      x="144"
      y="91"
      text-anchor="middle"
      fill="var(--c-force)"
      font-size="19"
      font-family="KaTeX_Math"
      font-style="italic"
      stroke="var(--c-bg)"
      stroke-width="3"
      paint-order="stroke"
    >
      F
    </text>
    <circle cx="330" cy="105" r="5" fill="none" stroke="var(--c-accent)" stroke-width="2" />
    <text x="105" y="134" text-anchor="middle" fill="var(--c-accent)" font-size="20" font-family="KaTeX_Math" font-style="italic">A</text>
    <text x="330" y="134" text-anchor="middle" fill="var(--c-accent)" font-size="20" font-family="KaTeX_Math" font-style="italic">O</text>
  </svg>
</template>
