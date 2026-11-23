<script setup lang="ts">
// 第 4 页：气垫导轨实验装置（导轨 + 两个滑块 + 两个光电门 + 数字计时器）
// step：1 = 调水平（导轨与调平螺丝），2 = 光电门与计时器，3 = 碰撞前后各测一次
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 900 360" class="at-svg" role="img" aria-label="气垫导轨实验装置">
    <SurfaceHatch :from="{ x: 52, y: 258 }" :to="{ x: 848, y: 258 }" side="below" />
    <rect x="60" y="148" width="780" height="24" rx="12" fill="var(--c-surface)" stroke="var(--c-text)" stroke-width="1.6" />
    <line x1="78" y1="150" x2="822" y2="150" stroke="var(--c-text-mute)" stroke-width="1" />
    <g fill="var(--c-text-mute)">
      <circle v-for="i in 9" :key="i" :cx="92 + (i - 1) * 88" cy="160" r="1.5" />
    </g>
    <g stroke="var(--c-text)" stroke-width="3" stroke-linecap="round">
      <path d="M 170 172 V 250 M 730 172 V 250" />
    </g>
    <g stroke="var(--c-text)" stroke-width="2.4" stroke-linecap="round">
      <path d="M 144 250 H 196 M 704 250 H 756" />
    </g>
    <rect x="160" y="235" width="20" height="11" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-text)" stroke-width="1.4" />
    <rect x="720" y="235" width="20" height="11" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-text)" stroke-width="1.4" />
    <rect x="190" y="116" width="86" height="32" rx="5" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="1.8" />
    <rect x="512" y="116" width="86" height="32" rx="5" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <text x="233" y="139" text-anchor="middle" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-2)">A</text>
    <text x="555" y="139" text-anchor="middle" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)">B</text>
    <g stroke="var(--c-text)" stroke-width="2" stroke-linecap="round">
      <path d="M 372 146 V 104 M 372 104 H 404 M 404 104 V 146" />
      <path d="M 632 146 V 104 M 632 104 H 664 M 664 104 V 146" />
    </g>
    <rect x="366" y="90" width="44" height="14" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-text)" stroke-width="1.4" />
    <rect x="626" y="90" width="44" height="14" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-text)" stroke-width="1.4" />
    <path d="M 388 90 V 58 H 856 V 315 H 800" fill="none" stroke="var(--c-text-mute)" stroke-width="1.2" />
    <path d="M 648 90 V 58" fill="none" stroke="var(--c-text-mute)" stroke-width="1.2" />
    <rect x="556" y="286" width="244" height="58" rx="8" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.4" />
    <rect x="570" y="296" width="112" height="38" rx="4" fill="var(--c-bg-soft)" stroke="var(--c-border)" stroke-width="1" />
    <text x="626" y="322" text-anchor="middle" font-size="17" font-family="KaTeX_Main" fill="var(--c-text)">0.0083 s</text>
    <text x="700" y="322" font-size="15" fill="var(--c-text-dim)">数字计时器</text>
    <text x="86" y="200" font-size="15" fill="var(--c-text-dim)">气垫导轨</text>
    <text x="388" y="204" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">光电门 1</text>
    <text x="648" y="204" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">光电门 2</text>
    <g v-if="step >= 1" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="6 5">
      <rect x="56" y="138" width="788" height="44" rx="14" />
      <rect x="150" y="229" width="40" height="27" rx="6" />
      <rect x="710" y="229" width="40" height="27" rx="6" />
    </g>
    <g v-if="step >= 2" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="6 5">
      <rect x="358" y="84" width="60" height="70" rx="8" />
      <rect x="618" y="84" width="60" height="70" rx="8" />
      <rect x="548" y="278" width="260" height="74" rx="10" />
    </g>
    <rect v-if="step >= 3" x="178" y="106" width="432" height="50" rx="8" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="6 5" />
  </svg>
</template>

<style scoped>
.at-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
