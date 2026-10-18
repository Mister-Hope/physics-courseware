<script setup lang="ts">
/** 第 3 页配图：A、B 两个带电导体用导线 H 相连（干净题面常显）。 step ≥ 2 才画出导线中自由电子的定向移动方向（分析标注点击后才出）。 */
const { step = 1 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 460 150" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 导体 A：带正电荷 -->
      <rect x="40" y="56" width="100" height="64" rx="10" fill="rgba(248,113,113,0.12)" stroke="var(--c-danger)" stroke-width="1.8" />
      <text x="54" y="95" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text)">A</text>
      <text x="84" y="95" font-family="KaTeX_Main" font-size="18" fill="var(--c-danger)">+</text>
      <text x="106" y="95" font-family="KaTeX_Main" font-size="18" fill="var(--c-danger)">+</text>
      <text x="128" y="95" font-family="KaTeX_Main" font-size="18" fill="var(--c-danger)">+</text>
      <!-- 导体 B：带负电荷 -->
      <rect x="320" y="56" width="100" height="64" rx="10" fill="rgba(96,165,250,0.12)" stroke="var(--c-accent-2)" stroke-width="1.8" />
      <text x="334" y="95" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text)">B</text>
      <text x="366" y="95" font-family="KaTeX_Main" font-size="18" fill="var(--c-accent-2)">−</text>
      <text x="390" y="95" font-family="KaTeX_Main" font-size="18" fill="var(--c-accent-2)">−</text>
      <text x="412" y="95" font-family="KaTeX_Main" font-size="18" fill="var(--c-accent-2)">−</text>
      <!-- 导线 H：连接 A、B -->
      <line x1="140" y1="88" x2="320" y2="88" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round" />
      <text x="230" y="72" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="var(--c-text-dim)">导线 H</text>
      <!-- 分析标注：自由电子沿导线由 B 向 A 定向移动 -->
      <g v-if="step >= 2">
        <CourseArrow :from="{ x: 312, y: 88 }" :to="{ x: 150, y: 88 }" stroke="var(--c-accent-2)" :stroke-width="2.6" :head-size="11" />
        <text x="230" y="122" text-anchor="middle" font-family="KaTeX_Main" font-size="16" fill="var(--c-accent-2)">自由电子由 B 向 A 定向移动</text>
      </g>
    </svg>
  </div>
</template>
