<script setup lang="ts">
// 第 8 页（习题 4）：点火器的钉尖电极 + 验电器的金属球 —— 装置常显，分析标注点击后才出
defineProps<{ tipAnalysis?: boolean; ballAnalysis?: boolean }>();
</script>

<template>
  <svg viewBox="0 0 420 280" class="w-full" xmlns="http://www.w3.org/2000/svg" style="height: 270px">
    <text x="112" y="26" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="var(--c-text-mute)">点火器</text>
    <rect x="32" y="86" width="44" height="28" rx="5" fill="var(--c-line)" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <path d="M 76 100 L 100 100" stroke="var(--c-text)" stroke-width="2.4" />
    <path d="M 100 100 L 92 96 L 92 104 Z" fill="var(--c-text)" />
    <rect x="164" y="86" width="44" height="28" rx="5" fill="var(--c-line)" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <path d="M 164 100 L 140 100" stroke="var(--c-text)" stroke-width="2.4" />
    <path d="M 140 100 L 148 96 L 148 104 Z" fill="var(--c-text)" />
    <path d="M 101 100 L 107 92 L 112 108 L 118 94 L 124 100 L 131 95 L 139 100" fill="none" stroke="var(--c-field)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <text x="120" y="78" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-field)">电火花</text>
    <template v-if="tipAnalysis">
      <circle cx="100" cy="100" r="14" fill="none" stroke="var(--c-field)" stroke-width="1.6" stroke-dasharray="4 3" />
      <path d="M 108 88 L 134 74 M 108 112 L 134 126" stroke="var(--c-field)" stroke-width="1.4" stroke-opacity="0.7" />
      <text x="216" y="90" text-anchor="start" font-family="KaTeX_Main" font-size="11" fill="var(--c-field)">尖端：电荷密度大</text>
      <text x="216" y="106" text-anchor="start" font-family="KaTeX_Main" font-size="11" fill="var(--c-field)">→ 场强强</text>
    </template>
    <text x="120" y="140" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">钉尖电极</text>
    <circle cx="320" cy="62" r="18" fill="var(--c-line)" stroke="var(--c-text)" stroke-opacity="0.7" stroke-width="1.6" />
    <path d="M 320 80 L 320 142" stroke="var(--c-text)" stroke-width="3" />
    <path d="M 320 142 L 317 188 M 320 142 L 323 188" stroke="var(--c-text)" stroke-width="2" />
    <rect x="286" y="128" width="68" height="88" rx="8" fill="none" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <rect x="284" y="216" width="72" height="10" rx="3" fill="var(--c-line)" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <text x="320" y="30" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">金属球</text>
    <text x="320" y="252" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">验电器</text>
    <template v-if="ballAnalysis">
      <circle cx="320" cy="62" r="24" fill="none" stroke="var(--c-field)" stroke-width="1.6" stroke-dasharray="4 3" />
      <text x="320" y="272" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-field)">球面：电荷密度小 → 场强弱</text>
    </template>
  </svg>
</template>
