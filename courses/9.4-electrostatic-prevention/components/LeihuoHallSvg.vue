<script setup lang="ts">
// 第 13 页：科学漫步 雷火炼殿 —— 云层与金殿之间的电弧、少尖结构、避雷设施
defineProps<{ step: number }>();
</script>

<template>
  <svg viewBox="0 0 460 280" class="w-full" xmlns="http://www.w3.org/2000/svg" style="height: 200px">
    <!-- 云层 -->
    <path
      d="M 52 78 C 52 54 76 42 98 50 C 108 28 142 26 156 46 C 184 42 204 60 198 82 C 194 100 170 108 150 102 L 72 102 C 58 100 50 92 52 78 Z"
      fill="var(--c-line)"
      fill-opacity="0.7"
      stroke="var(--c-text-mute)"
      stroke-opacity="0.5"
    />
    <text x="96" y="84" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">−</text>
    <text x="128" y="92" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">−</text>
    <text x="158" y="80" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">−</text>
    <!-- 天柱峰 -->
    <path
      d="M 40 262 L 190 96 L 250 176 L 330 262 Z"
      fill="var(--c-line)"
      fill-opacity="0.5"
      stroke="var(--c-text-mute)"
      stroke-opacity="0.5"
      stroke-width="2"
    />
    <!-- 金殿 -->
    <rect x="152" y="118" width="76" height="44" rx="4" fill="var(--c-accent)" fill-opacity="0.75" stroke="var(--c-accent)" stroke-width="2" />
    <path d="M 142 118 L 238 118 L 190 94 Z" fill="var(--c-accent)" fill-opacity="0.9" />
    <template v-if="step >= 1">
      <text x="166" y="74" font-family="KaTeX_Main" font-size="15" fill="var(--c-accent-2)">+</text>
      <text x="196" y="78" font-family="KaTeX_Main" font-size="15" fill="var(--c-accent-2)">+</text>
      <path
        d="M 168 84 L 184 118 L 174 122 L 196 158 L 186 160 L 208 194"
        fill="none"
        stroke="var(--c-field)"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <text x="248" y="150" font-family="KaTeX_Main" font-size="12" fill="var(--c-field)">空气电离 → 电弧</text>
      <text x="248" y="172" font-family="KaTeX_Main" font-size="12" fill="var(--c-field)">空气膨胀 → 看似火球</text>
    </template>
    <template v-if="step >= 2">
      <rect x="142" y="90" width="96" height="32" rx="6" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="6 4" />
      <text x="292" y="112" font-family="KaTeX_Main" font-size="12" fill="var(--c-accent)">屋顶少尖 → 不易放电</text>
      <text x="292" y="134" font-family="KaTeX_Main" font-size="12" fill="var(--c-accent)">电压升得更高</text>
    </template>
    <template v-if="step >= 3">
      <line x1="190" y1="94" x2="190" y2="42" stroke="var(--c-accent-2)" stroke-width="3.4" stroke-linecap="round" />
      <path d="M 190 118 L 190 250" fill="none" stroke="var(--c-accent-2)" stroke-width="2.4" />
      <text x="196" y="30" font-family="KaTeX_Main" font-size="12" fill="var(--c-accent-2)">加装避雷设施</text>
      <text x="300" y="220" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">此后奇观消失</text>
    </template>
  </svg>
</template>
