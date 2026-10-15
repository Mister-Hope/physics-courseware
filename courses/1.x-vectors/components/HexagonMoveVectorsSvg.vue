<template>
  <!-- 第 16 页：把 OB、OD 平移到 E、A 后分别与 OE、OA 配对成 OC -->
  <svg viewBox="0 0 300 245" width="100%" style="max-width: 14.5rem" xmlns="http://www.w3.org/2000/svg">
    <polygon points="34,130 79,52 169,52 214,130 169,208 79,208" fill="color-mix(in srgb, var(--c-text-dim) 5%, transparent)" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.8" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 79, y: 52 }" stroke="var(--c-physics)" stroke-width="2.8" />
    <CourseArrow :from="{ x: 79, y: 208 }" :to="{ x: 214, y: 130 }" stroke="var(--c-velocity)" stroke-width="2.8" stroke-dasharray="8 4" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 79, y: 208 }" stroke="var(--c-physics)" stroke-width="2.8" />
    <CourseArrow :from="{ x: 79, y: 52 }" :to="{ x: 214, y: 130 }" stroke="var(--c-accent)" stroke-width="2.8" stroke-dasharray="8 4" />
    <CourseArrow :from="{ x: 34, y: 130 }" :to="{ x: 214, y: 130 }" stroke="var(--c-accent-glow)" stroke-width="3.8" />
    <circle cx="34" cy="130" r="3.6" fill="var(--c-accent-glow)" />
    <g font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-neutral-200)">
      <text x="60" y="44">A</text>
      <text x="176" y="44">B</text>
      <text x="220" y="134">C</text>
      <text x="176" y="224">D</text>
      <text x="58" y="224">E</text>
      <text x="10" y="146">O</text>
    </g>
    <text x="84" y="114" font-size="12" fill="var(--c-velocity)">OB = EC</text>
    <text x="74" y="182" font-size="12" fill="var(--c-accent)">OD = AC</text>
    <text x="150" y="240" text-anchor="middle" font-size="12" fill="var(--c-accent-glow)">三个 OC → 6 m</text>
  </svg>
</template>
