<script setup lang="ts">
defineProps<{ step?: number }>();
</script>

<template>
  <!-- 机械能守恒条件判断：四幅小场景，点击逐个揭示是否守恒（step>=1..4） -->
  <svg width="840" height="400" viewBox="0 0 840 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="400" height="180" rx="14" stroke="var(--c-line)" stroke-width="1.5" />
    <circle cx="90" cy="60" r="13" fill="var(--c-warn)" fill-opacity="0.3" stroke="var(--c-warn)" stroke-width="3.5" />
    <CourseArrow :x1="90" y1="80" x2="90" y2="140" color="var(--c-info)" :width="3" />
    <text x="104" y="116" font-size="13" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">v</text>
    <text x="150" y="62" font-size="14" fill="var(--c-ink)" font-family="system-ui">自由落体的小球</text>
    <text v-if="step >= 1" x="150" y="90" font-size="13.5" fill="var(--c-ok)" font-family="system-ui">✓ 只有重力做功 · 守恒</text>
    <rect x="430" y="10" width="400" height="180" rx="14" stroke="var(--c-line)" stroke-width="1.5" />
    <line x1="470" y1="160" x2="600" y2="60" stroke="var(--c-line-strong)" stroke-width="3.5" stroke-linecap="round" />
    <SurfaceHatch x1="470" y1="160" x2="600" y2="60" />
    <rect
      x="524"
      y="88"
      width="24"
      height="20"
      rx="4"
      fill="var(--c-warn)"
      fill-opacity="0.3"
      stroke="var(--c-warn)"
      stroke-width="3"
      transform="rotate(-37.6 536 98)"
    />
    <text x="640" y="62" font-size="14" fill="var(--c-ink)" font-family="system-ui">沿光滑斜面下滑的物块</text>
    <text v-if="step >= 2" x="640" y="90" font-size="13.5" fill="var(--c-ok)" font-family="system-ui">✓ 只有重力做功 · 守恒</text>
    <rect x="10" y="210" width="400" height="180" rx="14" stroke="var(--c-line)" stroke-width="1.5" />
    <line x1="50" y1="360" x2="180" y2="260" stroke="var(--c-line-strong)" stroke-width="3.5" stroke-linecap="round" />
    <SurfaceHatch x1="50" y1="360" x2="180" y2="260" />
    <rect
      x="104"
      y="288"
      width="24"
      height="20"
      rx="4"
      fill="var(--c-warn)"
      fill-opacity="0.3"
      stroke="var(--c-warn)"
      stroke-width="3"
      transform="rotate(-37.6 116 298)"
    />
    <g stroke="var(--c-danger)" stroke-width="2.4" opacity="0.85">
      <line x1="118" y1="284" x2="128" y2="274" />
      <line x1="126" y1="292" x2="136" y2="282" />
      <line x1="134" y1="300" x2="144" y2="290" />
    </g>
    <text x="220" y="262" font-size="14" fill="var(--c-ink)" font-family="system-ui">沿粗糙斜面下滑的物块</text>
    <text v-if="step >= 3" x="220" y="290" font-size="13.5" fill="var(--c-danger)" font-family="system-ui">✗ 摩擦生热 · 不守恒</text>
    <rect x="430" y="210" width="400" height="180" rx="14" stroke="var(--c-line)" stroke-width="1.5" />
    <rect x="586" y="290" width="40" height="30" rx="5" fill="var(--c-warn)" fill-opacity="0.3" stroke="var(--c-warn)" stroke-width="3" />
    <line x1="606" y1="290" x2="606" y2="248" stroke="var(--c-line-strong)" stroke-width="2.5" />
    <CourseArrow :x1="606" y1="244" x2="606" y2="226" color="var(--c-info)" :width="3" />
    <text x="616" y="238" font-size="13" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">F</text>
    <text x="630" y="244" font-size="10" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">T</text>
    <text x="646" y="300" font-size="14" fill="var(--c-ink)" font-family="system-ui">被吊起的货物（匀速）</text>
    <text v-if="step >= 4" x="646" y="328" font-size="13.5" fill="var(--c-danger)" font-family="system-ui">✗ 拉力做正功 · 不守恒</text>
  </svg>
</template>
