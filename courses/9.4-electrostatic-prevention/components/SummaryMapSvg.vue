<script setup lang="ts">
// 第 19 页：两条线索 —— 导体（静电平衡）与带电微粒（静电力）
defineProps<{ step: number }>();
</script>

<template>
  <svg viewBox="0 0 760 300" class="w-full" xmlns="http://www.w3.org/2000/svg" style="height: 300px">
    <!-- 左：导体 -->
    <rect
      x="30"
      y="40"
      width="320"
      height="220"
      rx="16"
      fill="var(--c-line)"
      fill-opacity="0.28"
      stroke="var(--c-text-mute)"
      stroke-opacity="0.35"
      stroke-width="2"
    />
    <template v-if="step >= 1">
      <text x="190" y="76" text-anchor="middle" font-family="KaTeX_Main" font-size="17" fill="var(--c-accent)">导体：静电平衡</text>
      <text x="190" y="108" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-text)">
        内部 E = 0；净电荷只在外表面
      </text>
    </template>
    <template v-if="step >= 2">
      <rect x="70" y="140" width="240" height="46" rx="10" fill="var(--c-line)" fill-opacity="0.5" stroke="var(--c-text-mute)" stroke-opacity="0.4" />
      <text x="190" y="169" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="var(--c-text)">尖端放电（电荷密度大 → 场强大）</text>
      <rect x="70" y="198" width="240" height="46" rx="10" fill="var(--c-line)" fill-opacity="0.5" stroke="var(--c-text-mute)" stroke-opacity="0.4" />
      <text x="190" y="227" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="var(--c-text)">静电屏蔽（壳内 E = 0）</text>
    </template>
    <!-- 右：带电微粒 -->
    <rect
      x="410"
      y="40"
      width="320"
      height="220"
      rx="16"
      fill="var(--c-line)"
      fill-opacity="0.28"
      stroke="var(--c-text-mute)"
      stroke-opacity="0.35"
      stroke-width="2"
    />
    <template v-if="step >= 3">
      <text x="570" y="76" text-anchor="middle" font-family="KaTeX_Main" font-size="17" fill="var(--c-accent-2)">带电微粒：静电力</text>
      <text x="570" y="108" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-text)">F = qE → 向电极运动</text>
    </template>
    <template v-if="step >= 4">
      <rect x="450" y="140" width="240" height="34" rx="10" fill="var(--c-line)" fill-opacity="0.5" stroke="var(--c-text-mute)" stroke-opacity="0.4" />
      <text x="570" y="163" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="var(--c-text)">静电除尘</text>
      <rect x="450" y="182" width="240" height="34" rx="10" fill="var(--c-line)" fill-opacity="0.5" stroke="var(--c-text-mute)" stroke-opacity="0.4" />
      <text x="570" y="205" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="var(--c-text)">静电喷漆</text>
      <rect x="450" y="224" width="240" height="34" rx="10" fill="var(--c-line)" fill-opacity="0.5" stroke="var(--c-text-mute)" stroke-opacity="0.4" />
      <text x="570" y="247" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="var(--c-text)">静电复印</text>
    </template>
  </svg>
</template>
