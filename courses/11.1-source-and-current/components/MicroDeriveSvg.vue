<script setup lang="ts">
/**
 * 第 10 页配图：I = neSv 的推导图 —— 截面左侧长 vt 的一段柱体内共有 nSvt 个自由电子，
 * 它们在时间 t 内全部通过横截面，所以 q = neSvt。step ≥ 2 才画出柱体与 nSvt 的标注（推导中间步骤点击后才出）。
 */
const { step = 1 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 460 240" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 导体（圆柱形，侧视） -->
      <rect x="30" y="76" width="400" height="88" rx="6" fill="rgba(96,165,250,0.06)" stroke="var(--c-text)" stroke-width="1.6" />
      <ellipse cx="30" cy="120" rx="9" ry="44" fill="rgba(96,165,250,0.06)" stroke="var(--c-text)" stroke-width="1.6" />
      <ellipse cx="430" cy="120" rx="9" ry="44" fill="rgba(96,165,250,0.06)" stroke="var(--c-text)" stroke-width="1.6" />
      <!-- 自由电子数密度 n -->
      <text x="62" y="126" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent-2)">n</text>
      <!-- 横截面 S -->
      <line x1="336" y1="66" x2="336" y2="174" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="7 5" />
      <text x="352" y="118" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">S</text>
      <text x="352" y="142" font-size="13" fill="var(--c-text-dim)">横截面</text>
      <!-- 定向移动的平均速率 v -->
      <CourseArrow :from="{ x: 150, y: 58 }" :to="{ x: 230, y: 58 }" stroke="var(--c-accent)" :stroke-width="2.4" label="v" />
      <!-- 推导中间步骤：柱体与其中的自由电子数 -->
      <g v-if="step >= 2">
        <rect x="186" y="76" width="150" height="88" fill="rgba(226,168,70,0.1)" />
        <line x1="186" y1="76" x2="186" y2="164" stroke="var(--c-accent)" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.7" />
        <text x="261" y="62" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">nSvt</text>
        <line x1="186" y1="196" x2="336" y2="196" stroke="var(--c-text-dim)" stroke-width="1.2" />
        <line x1="186" y1="190" x2="186" y2="202" stroke="var(--c-text-dim)" stroke-width="1.2" />
        <line x1="336" y1="190" x2="336" y2="202" stroke="var(--c-text-dim)" stroke-width="1.2" />
        <text x="261" y="222" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-accent)">
          vt
        </text>
      </g>
      <!-- 电子（画在箭头之上） -->
      <g>
        <CourseArrow :from="{ x: 215, y: 128 }" :to="{ x: 248, y: 128 }" stroke="var(--c-accent)" :stroke-width="2.2" :head-size="8" />
        <CourseArrow :from="{ x: 272, y: 104 }" :to="{ x: 305, y: 104 }" stroke="var(--c-accent)" :stroke-width="2.2" :head-size="8" />
        <CourseArrow :from="{ x: 320, y: 148 }" :to="{ x: 356, y: 148 }" stroke="var(--c-accent)" :stroke-width="2.2" :head-size="8" />
        <circle cx="215" cy="128" r="7" fill="rgba(96,165,250,0.25)" stroke="var(--c-accent-2)" stroke-width="1.6" />
        <text x="215" y="132" text-anchor="middle" font-family="KaTeX_Main" font-size="10" fill="var(--c-accent-2)">−</text>
        <circle cx="272" cy="104" r="7" fill="rgba(96,165,250,0.25)" stroke="var(--c-accent-2)" stroke-width="1.6" />
        <text x="272" y="108" text-anchor="middle" font-family="KaTeX_Main" font-size="10" fill="var(--c-accent-2)">−</text>
        <circle cx="320" cy="148" r="7" fill="rgba(96,165,250,0.25)" stroke="var(--c-accent-2)" stroke-width="1.6" />
        <text x="320" y="152" text-anchor="middle" font-family="KaTeX_Main" font-size="10" fill="var(--c-accent-2)">−</text>
      </g>
    </svg>
  </div>
</template>
