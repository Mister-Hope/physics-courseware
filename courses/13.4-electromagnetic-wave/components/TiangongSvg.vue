<!-- 第 18 页（习题图）：天宫一号轨道示意——地球、虚线圆轨道、天宫一号与它正下方的地面接收站，标出 r、R；点击后出现最短路径 s -->
<script setup lang="ts">
defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 480 350" width="352" height="257" xmlns="http://www.w3.org/2000/svg">
    <circle cx="240" cy="185" r="160" fill="none" stroke="var(--c-accent-2)" stroke-width="1.8" stroke-dasharray="8 6" />
    <CelestialEarth :x="240" :y="185" :r="130" label="地球" :label-size="24" />
    <circle cx="240" cy="185" r="3" fill="var(--c-text)" />
    <line x1="240" y1="185" x2="353" y2="72" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />
    <line x1="240" y1="185" x2="148" y2="277" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />
    <text
      x="268"
      y="150"
      text-anchor="end"
      font-size="19"
      fill="var(--c-text)"
      stroke="var(--c-bg)"
      stroke-width="4"
      paint-order="stroke"
      stroke-linejoin="round"
    >
      <tspan font-family="KaTeX_Math" font-style="italic">r</tspan>
      <tspan font-family="KaTeX_Main">= 6 740 km</tspan>
    </text>
    <text x="104" y="248" font-size="19" fill="var(--c-text)" stroke="var(--c-bg)" stroke-width="4" paint-order="stroke" stroke-linejoin="round">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main">= 6 400 km</tspan>
    </text>
    <g>
      <rect x="343" y="61" width="20" height="22" rx="3" fill="var(--c-surface)" stroke="var(--c-accent)" stroke-width="2" />
      <rect x="320" y="65" width="19" height="14" rx="3" fill="color-mix(in srgb, var(--c-accent-2) 70%, var(--c-surface))" />
      <rect x="367" y="65" width="19" height="14" rx="3" fill="color-mix(in srgb, var(--c-accent-2) 70%, var(--c-surface))" />
      <text
        x="353"
        y="42"
        text-anchor="middle"
        font-size="19"
        fill="var(--c-text-dim)"
        stroke="var(--c-bg)"
        stroke-width="4"
        paint-order="stroke"
        stroke-linejoin="round"
      >
        天宫一号
      </text>
    </g>
    <g>
      <rect x="326" y="88" width="12" height="5" rx="2" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.4" />
      <line x1="332" y1="93" x2="338" y2="84" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <path d="M 335 82 A 6 6 0 0 1 344 80" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" />
      <line x1="340" y1="95" x2="376" y2="108" stroke="var(--c-text-dim)" stroke-width="1.3" />
      <text x="380" y="112" font-size="18" fill="var(--c-text-dim)" stroke="var(--c-bg)" stroke-width="4" paint-order="stroke" stroke-linejoin="round">
        地面接收站
      </text>
    </g>
    <g v-if="(step ?? 0) >= 1">
      <line x1="353" y1="72" x2="332" y2="93" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
      <text x="372" y="86" font-size="20" fill="var(--c-accent)" stroke="var(--c-bg)" stroke-width="4" paint-order="stroke" stroke-linejoin="round">
        <tspan font-family="KaTeX_Math" font-style="italic">s</tspan>
      </text>
    </g>
    <text x="22" y="338" font-size="16" fill="var(--c-text-dim)">示意，未按比例</text>
  </svg>
</template>
