<template>
  <!-- 第 7 页：先向东 3 m 再向北 4 m，用三角形法则求合位移 -->
  <svg viewBox="0 0 300 200" width="100%" style="max-width: 20rem" xmlns="http://www.w3.org/2000/svg">
    <!-- A 点直角标记（正东 ⊥ 正北） -->
    <path d="M 166 150 L 150 150 L 150 166" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.75" />
    <!-- 三段位移：OA=102(3m)、AB=136(4m)、OB=170(5m)，首尾严格对齐于 O(64,166)、A(166,166)、B(166,30) -->
    <CourseArrow :from="{ x: 166, y: 166 }" :to="{ x: 166, y: 30 }" stroke="var(--c-velocity)" stroke-width="3.2" stroke-linecap="round" />
    <CourseArrow :from="{ x: 64, y: 166 }" :to="{ x: 166, y: 166 }" stroke="var(--c-physics)" stroke-width="3.2" stroke-linecap="round" />
    <CourseArrow :from="{ x: 64, y: 166 }" :to="{ x: 166, y: 30 }" stroke="var(--c-accent)" stroke-width="3.6" stroke-linecap="round" />
    <circle cx="64" cy="166" r="4" fill="var(--c-accent)" />
    <text x="115" y="188" text-anchor="middle" font-size="13" fill="var(--c-physics)">先向东 3 m</text>
    <text x="176" y="102" font-size="13" fill="var(--c-velocity)">再向北 4 m</text>
    <text x="42" y="92" font-size="13" fill="var(--c-accent)">合位移 5 m</text>
    <text x="46" y="184" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)">O</text>
    <text x="174" y="184" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)">A</text>
    <text x="174" y="34" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)">B</text>
  </svg>
</template>
