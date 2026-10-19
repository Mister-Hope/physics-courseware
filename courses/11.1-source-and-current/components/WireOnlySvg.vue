<script setup lang="ts">
/** 第 3 页配图：A、B 两个带正、负电荷的导体用导线 H 相连（题目图常显）。 step ≥ 2 才画出导线中自由电子的定向移动方向（分析标注点击后才出）。 */
const { step = 1 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 460 168" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 导体 A：带正电荷 -->
      <rect x="20" y="48" width="100" height="72" rx="10" fill="rgba(248,113,113,0.12)" stroke="var(--c-danger)" stroke-width="1.8" />
      <text x="34" y="94" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text)">A</text>
      <text x="62" y="92" font-family="KaTeX_Main" font-size="18" fill="var(--c-danger)">+</text>
      <text x="84" y="92" font-family="KaTeX_Main" font-size="18" fill="var(--c-danger)">+</text>
      <text x="106" y="92" font-family="KaTeX_Main" font-size="18" fill="var(--c-danger)">+</text>
      <!-- 导体 B：带负电荷 -->
      <rect x="340" y="48" width="100" height="72" rx="10" fill="rgba(96,165,250,0.12)" stroke="var(--c-accent-2)" stroke-width="1.8" />
      <text x="354" y="94" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text)">B</text>
      <text x="382" y="92" font-family="KaTeX_Main" font-size="18" fill="var(--c-accent-2)">−</text>
      <text x="404" y="92" font-family="KaTeX_Main" font-size="18" fill="var(--c-accent-2)">−</text>
      <text x="426" y="92" font-family="KaTeX_Main" font-size="18" fill="var(--c-accent-2)">−</text>
      <!-- 导线 H：连接 A、B -->
      <line x1="120" y1="84" x2="340" y2="84" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round" />
      <text x="230" y="72" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">导线 H</text>
      <!-- 分析标注：自由电子沿导线由 B 向 A 定向移动 -->
      <g v-if="step >= 2">
        <CourseArrow :from="{ x: 330, y: 84 }" :to="{ x: 138, y: 84 }" stroke="var(--c-accent-2)" :stroke-width="2.6" :head-size="11" />
        <text x="230" y="118" text-anchor="middle" font-size="14" fill="var(--c-accent-2)">自由电子由 B 向 A 定向移动</text>
      </g>
    </svg>
  </div>
</template>
