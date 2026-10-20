<script setup lang="ts">
/** 第 10 页配图（例题：电解液中的电流）：电解槽 + 两个电极 A、B + 溶液横截面 S（虚线）。 题目图常显、只画题目给的信息：正离子由 A 向 B 移动、负离子由 B 向 A 移动； 电流方向属于答案，不画。 */
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 360 200" width="340" height="189" xmlns="http://www.w3.org/2000/svg">
      <!-- 电解槽（U 形槽）与溶液 -->
      <path d="M 44 44 V 164 Q 44 180 60 180 H 300 Q 316 180 316 164 V 44" fill="rgba(96,165,250,0.06)" stroke="var(--c-text-dim)" stroke-width="2" />
      <line x1="46" y1="70" x2="314" y2="70" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.6" />
      <!-- 电极 A、B -->
      <rect x="107" y="36" width="7" height="130" rx="2" fill="rgba(226,168,70,0.25)" stroke="var(--c-accent)" stroke-width="1.6" />
      <rect x="246" y="36" width="7" height="130" rx="2" fill="rgba(226,168,70,0.25)" stroke="var(--c-accent)" stroke-width="1.6" />
      <text x="110" y="30" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">A</text>
      <text x="249" y="30" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">B</text>
      <!-- 溶液横截面 S -->
      <line x1="180" y1="50" x2="180" y2="176" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="7 5" />
      <text x="194" y="60" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">S</text>
      <!-- 正离子：由 A 向 B 移动 -->
      <text x="145" y="92" text-anchor="middle" font-size="13" fill="var(--c-danger)">正离子</text>
      <CourseArrow :from="{ x: 154, y: 110 }" :to="{ x: 216, y: 110 }" stroke="var(--c-danger)" :stroke-width="2.4" :head-size="9" />
      <circle cx="145" cy="110" r="8" fill="rgba(248,113,113,0.22)" stroke="var(--c-danger)" stroke-width="1.6" />
      <text x="145" y="115" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="var(--c-danger)">+</text>
      <!-- 负离子：由 B 向 A 移动 -->
      <text x="215" y="132" text-anchor="middle" font-size="13" fill="var(--c-accent-2)">负离子</text>
      <CourseArrow :from="{ x: 206, y: 150 }" :to="{ x: 144, y: 150 }" stroke="var(--c-accent-2)" :stroke-width="2.4" :head-size="9" />
      <circle cx="215" cy="150" r="8" fill="rgba(96,165,250,0.22)" stroke="var(--c-accent-2)" stroke-width="1.6" />
      <text x="215" y="155" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="var(--c-accent-2)">−</text>
    </svg>
  </div>
</template>
