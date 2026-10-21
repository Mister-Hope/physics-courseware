<!-- 第 2 页引课图：匀强电场中只受静电力的正电荷由 A 点运动到 B 点，F 沿电场方向 -->
<template>
  <svg
    viewBox="0 0 440 260"
    width="440"
    height="260"
    xmlns="http://www.w3.org/2000/svg"
    font-family="Inter, system-ui, sans-serif"
    role="img"
    aria-label="匀强电场中的正电荷从 A 点运动到 B 点，静电力 F 沿电场方向"
  >
    <rect x="22" y="42" width="12" height="176" rx="3" fill="var(--c-force)" fill-opacity="0.16" stroke="var(--c-force)" stroke-width="1.6" />
    <text x="28" y="34" text-anchor="middle" fill="var(--c-force)" font-size="20" font-family="KaTeX_Main">+</text>
    <rect x="406" y="42" width="12" height="176" rx="3" fill="var(--c-velocity)" fill-opacity="0.15" stroke="var(--c-velocity)" stroke-width="1.6" />
    <text x="412" y="34" text-anchor="middle" fill="var(--c-velocity)" font-size="20" font-family="KaTeX_Main">−</text>
    <CourseArrow v-for="y in [62, 120, 178]" :key="y" :from="{ x: 46, y }" :to="{ x: 396, y }" stroke="var(--c-field)" stroke-width="1.5" opacity="0.5" />
    <text x="220" y="50" text-anchor="middle" fill="var(--c-accent)" font-size="19" font-style="italic" font-family="KaTeX_Math">E</text>
    <path d="M 105 186 C 110 108 210 80 332 80" fill="none" stroke="var(--c-neutral-300)" stroke-width="2.2" stroke-dasharray="8 6" opacity="0.8" />
    <CourseArrow :from="{ x: 298, y: 84 }" :to="{ x: 338, y: 80 }" stroke="var(--c-neutral-300)" stroke-width="2.2" />
    <circle cx="95" cy="195" r="10" fill="var(--c-force)" fill-opacity="0.22" stroke="var(--c-force)" stroke-width="2.2" />
    <path d="M 89 195 H 101 M 95 189 V 201" stroke="var(--c-force)" stroke-width="1.8" stroke-linecap="round" />
    <CourseArrow :from="{ x: 95, y: 195 }" :to="{ x: 172, y: 195 }" stroke="var(--c-force)" stroke-width="3" />
    <text
      x="137"
      y="180"
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
    <text x="95" y="226" text-anchor="middle" fill="var(--c-accent)" font-size="20" font-family="KaTeX_Math" font-style="italic">A</text>
    <circle cx="340" cy="80" r="5" fill="none" stroke="var(--c-accent)" stroke-width="2" />
    <text x="352" y="74" fill="var(--c-accent)" font-size="20" font-family="KaTeX_Math" font-style="italic">B</text>
    <text x="74" y="200" text-anchor="end" fill="var(--c-force)" font-size="18" font-family="KaTeX_Math" font-style="italic">q</text>
  </svg>
</template>
