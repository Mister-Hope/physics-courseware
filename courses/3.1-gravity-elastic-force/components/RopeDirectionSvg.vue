<template>
  <!-- 第 27 页「绳上弹力的方向：沿绳」：悬挂的绳拉一个小球，绳的拉力沿绳指向绳收缩的方向 -->
  <svg class="fig" viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 20, y: 24 }" :to="{ x: 170, y: 24 }" side="above" :thickness="10" :gap="34" color="#cbd5e1" :line-width="4" />
    <line x1="120" y1="24" x2="238" y2="126" stroke="var(--c-neutral-300)" stroke-width="2.6" />
    <circle cx="238" cy="126" r="22" fill="color-mix(in srgb, var(--c-text-dim) 20%, transparent)" stroke="var(--c-neutral-300)" stroke-width="2.4" />
    <CourseArrow :from="{ x: 238, y: 126 }" :to="{ x: 176, y: 73 }" stroke="var(--c-accent)" stroke-width="3" />
    <text x="256" y="92" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent)">F</text>
    <text x="238" y="190" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">绳的拉力沿绳</text>
  </svg>
</template>
