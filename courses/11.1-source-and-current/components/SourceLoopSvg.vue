<script setup lang="ts">
/** 第 4 页配图：在 A、B 之间接入装置 P，把电子从 A 搬到 B，A、B 之间的电势差得以维持（题目图常显）。 step ≥ 2 才画出"外电路电子由 B 向 A""P 内部把电子由 A 搬到 B"这两个箭头（分析标注点击后才出）。 */
const { step = 1 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 460 204" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 导体 A（正电）与 B（负电） -->
      <rect x="28" y="44" width="96" height="52" rx="9" fill="rgba(248,113,113,0.12)" stroke="var(--c-danger)" stroke-width="1.8" />
      <text x="40" y="76" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-text)">A</text>
      <text x="64" y="74" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">+</text>
      <text x="84" y="74" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">+</text>
      <text x="104" y="74" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">+</text>
      <rect x="336" y="44" width="96" height="52" rx="9" fill="rgba(96,165,250,0.12)" stroke="var(--c-accent-2)" stroke-width="1.8" />
      <text x="348" y="76" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-text)">B</text>
      <text x="372" y="74" font-family="KaTeX_Main" font-size="15" fill="var(--c-accent-2)">−</text>
      <text x="392" y="74" font-family="KaTeX_Main" font-size="15" fill="var(--c-accent-2)">−</text>
      <text x="412" y="74" font-family="KaTeX_Main" font-size="15" fill="var(--c-accent-2)">−</text>
      <!-- 上方外电路（导线 H）与下方通向装置 P 的导线 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 76 44 V 32 H 380 V 44" />
        <path d="M 76 96 V 150 H 176" />
        <path d="M 284 150 H 380 V 96" />
      </g>
      <text x="84" y="26" font-size="12" fill="var(--c-text-dim)">导线 H</text>
      <!-- 装置 P -->
      <rect x="176" y="124" width="108" height="52" rx="8" fill="rgba(226,168,70,0.1)" stroke="var(--c-accent)" stroke-width="1.8" />
      <text x="230" y="146" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">P</text>
      <!-- 分析标注：外电路电子由 B 向 A，P 内部把电子由 A 搬到 B -->
      <g v-if="step >= 2">
        <CourseArrow :from="{ x: 368, y: 32 }" :to="{ x: 96, y: 32 }" stroke="var(--c-accent-2)" :stroke-width="2.4" :head-size="10" />
        <text x="230" y="62" text-anchor="middle" font-size="13" fill="var(--c-accent-2)">自由电子由 B 向 A 移动</text>
        <CourseArrow :from="{ x: 196, y: 162 }" :to="{ x: 264, y: 162 }" stroke="var(--c-accent-2)" :stroke-width="2.2" :head-size="9" />
        <text x="230" y="196" text-anchor="middle" font-size="13" fill="var(--c-accent-2)">P 不断把电子从 A 搬运到 B</text>
      </g>
    </svg>
  </div>
</template>
