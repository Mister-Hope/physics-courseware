<script setup lang="ts">
/**
 * 封面装饰：从同一起点出发的两个互相垂直的分速度，以及它们的合速度。
 * 四个顶点 O(20,124)、vx 末端 (150,124)、vy 末端 (20,44)、合矢量末端 (150,44) 严格构成矩形，
 * 虚线补齐另外两边——这是"正交分解 / 合成"的标准图，四个顶点必须真的构成平行四边形。
 */
</script>

<template>
  <svg viewBox="0 0 210 150" width="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon
      points="20,124 150,124 150,44 20,44"
      fill="color-mix(in srgb, var(--c-accent) 6%, transparent)"
      stroke="none"
    />
    <line x1="150" y1="124" x2="150" y2="44" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4" opacity="0.5" />
    <line x1="20" y1="44" x2="150" y2="44" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4" opacity="0.5" />
    <CourseArrow :from="{ x: 20, y: 124 }" :to="{ x: 150, y: 124 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
    <CourseArrow :from="{ x: 20, y: 124 }" :to="{ x: 20, y: 44 }" stroke="var(--c-physics)" :stroke-width="2.6" />
    <CourseArrow :from="{ x: 20, y: 124 }" :to="{ x: 150, y: 44 }" stroke="var(--c-accent)" :stroke-width="3" />
    <circle cx="20" cy="124" r="3.5" fill="currentColor" opacity="0.75" />
    <text x="4" y="142" font-family="KaTeX_Math" font-style="italic" font-size="12" fill="var(--c-text-dim)">O</text>
    <text x="76" y="142" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="var(--c-velocity)">v</text>
    <text x="82" y="148" font-family="KaTeX_Math" font-style="italic" font-size="10" fill="var(--c-velocity)">x</text>
    <text x="6" y="84" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="var(--c-physics)">v</text>
    <text x="12" y="90" font-family="KaTeX_Math" font-style="italic" font-size="10" fill="var(--c-physics)">y</text>
    <text x="154" y="40" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)">v</text>
  </svg>
</template>
