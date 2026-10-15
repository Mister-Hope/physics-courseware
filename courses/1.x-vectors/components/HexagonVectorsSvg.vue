<template>
  <!-- 第 15 页：正六边形 OABCDE 与从 O 出发的五个位移矢量 -->
  <svg viewBox="0 0 300 250" width="100%" style="max-width: 19rem" xmlns="http://www.w3.org/2000/svg">
    <polygon
      points="34,130 79,52 169,52 214,130 169,208 79,208"
      fill="color-mix(in srgb, var(--c-text-dim) 6%, transparent)"
      stroke="var(--c-text-dim)"
      stroke-width="1.4"
    />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 79.32, y: 52.11 }" stroke="var(--c-accent)" stroke-width="2.4" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 169, y: 52 }" stroke="var(--c-accent)" stroke-width="2.4" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 214, y: 130 }" stroke="var(--c-accent)" stroke-width="2.4" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 169, y: 208 }" stroke="var(--c-accent)" stroke-width="2.4" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 79, y: 208 }" stroke="var(--c-accent)" stroke-width="2.4" />
    <circle cx="34" cy="130" r="3.6" fill="var(--c-accent)" />
    <g fill="var(--c-text-dim)">
      <circle cx="79" cy="52" r="3" />
      <circle cx="169" cy="52" r="3" />
      <circle cx="214" cy="130" r="3" />
      <circle cx="169" cy="208" r="3" />
      <circle cx="79" cy="208" r="3" />
    </g>
    <g font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-neutral-200)">
      <text x="60" y="44">A</text>
      <text x="176" y="44">B</text>
      <text x="220" y="134">C</text>
      <text x="176" y="224">D</text>
      <text x="58" y="224">E</text>
      <text x="10" y="146">O</text>
    </g>
    <text x="150" y="243" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">边长 1 m，外接圆半径也是 1 m</text>
  </svg>
</template>
