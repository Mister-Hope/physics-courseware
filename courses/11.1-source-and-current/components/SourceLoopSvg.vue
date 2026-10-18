<script setup lang="ts">
/** 第 4 页配图：在 A、B 之间连接装置 P（电源），外电路导线 H 中形成持续电流（干净题面常显）。 step ≥ 2 才画出 P 内部"搬运电子"与外电路电子流动的箭头（分析标注点击后才出）。 */
const { step = 1 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 460 240" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 导体 A（正电）与 B（负电） -->
      <rect x="40" y="48" width="96" height="60" rx="10" fill="rgba(248,113,113,0.12)" stroke="var(--c-danger)" stroke-width="1.8" />
      <text x="54" y="85" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text)">A</text>
      <text x="82" y="85" font-family="KaTeX_Main" font-size="17" fill="var(--c-danger)">+</text>
      <text x="104" y="85" font-family="KaTeX_Main" font-size="17" fill="var(--c-danger)">+</text>
      <text x="124" y="85" font-family="KaTeX_Main" font-size="17" fill="var(--c-danger)">+</text>
      <rect x="324" y="48" width="96" height="60" rx="10" fill="rgba(96,165,250,0.12)" stroke="var(--c-accent-2)" stroke-width="1.8" />
      <text x="338" y="85" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text)">B</text>
      <text x="366" y="85" font-family="KaTeX_Main" font-size="17" fill="var(--c-accent-2)">−</text>
      <text x="390" y="85" font-family="KaTeX_Main" font-size="17" fill="var(--c-accent-2)">−</text>
      <text x="410" y="85" font-family="KaTeX_Main" font-size="17" fill="var(--c-accent-2)">−</text>
      <!-- 导线 H（上方外电路）与通向装置 P 的导线（下方） -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 88 48 V 28" />
        <path d="M 88 28 H 372" />
        <path d="M 372 28 V 48" />
        <path d="M 88 108 V 176" />
        <path d="M 88 176 H 172" />
        <path d="M 288 176 H 372" />
        <path d="M 372 176 V 108" />
      </g>
      <text x="230" y="52" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-text-dim)">导线 H</text>
      <!-- 装置 P -->
      <rect x="172" y="146" width="116" height="60" rx="8" fill="rgba(226,168,70,0.1)" stroke="var(--c-accent)" stroke-width="1.8" />
      <text x="230" y="172" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">P</text>
      <!-- 分析标注：P 内部把电子从 A 搬到 B，外电路电子由 B 流向 A -->
      <g v-if="step >= 2">
        <CourseArrow :from="{ x: 186, y: 194 }" :to="{ x: 274, y: 194 }" stroke="var(--c-accent-2)" :stroke-width="2.4" :head-size="10" />
        <CourseArrow :from="{ x: 350, y: 28 }" :to="{ x: 110, y: 28 }" stroke="var(--c-accent-2)" :stroke-width="2.4" :head-size="10" />
        <text x="230" y="230" text-anchor="middle" font-family="KaTeX_Main" font-size="16" fill="var(--c-accent-2)">P 不断把电子从 A 搬运到 B</text>
      </g>
    </svg>
  </div>
</template>
