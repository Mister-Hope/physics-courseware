<!-- 第 3 页：变化的磁场区（垂直纸面向里的磁场记号阵列）→ 周围空间产生环形电场（红色闭合电场线） -->
<script setup lang="ts">
defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 460 260" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="150"
      y="75"
      width="160"
      height="110"
      rx="10"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.6"
      stroke-dasharray="7 5"
    />
    <FieldDots
      :x="172"
      :y="95"
      :cols="6"
      :rows="4"
      :spacing="24"
      dir="in"
      color="var(--c-accent)"
    />
    <text x="230" y="214" text-anchor="middle" font-size="17" fill="var(--c-text)">
      变化的磁场
      <tspan font-family="KaTeX_Math" font-style="italic">B</tspan>
    </text>
    <g v-if="(step ?? 0) >= 1">
      <ellipse
        cx="230"
        cy="130"
        rx="112"
        ry="82"
        fill="none"
        stroke="var(--c-danger)"
        stroke-width="2.6"
      />
      <ellipse
        cx="230"
        cy="130"
        rx="140"
        ry="104"
        fill="none"
        stroke="var(--c-danger)"
        stroke-width="2.6"
        opacity="0.75"
      />
      <path d="M 250 48 L 234 41.5 L 234 54.5 Z" fill="var(--c-danger)" />
      <path d="M 210 212 L 226 205.5 L 226 218.5 Z" fill="var(--c-danger)" />
      <path d="M 250 26 L 234 19.5 L 234 32.5 Z" fill="var(--c-danger)" />
      <path d="M 210 234 L 226 227.5 L 226 240.5 Z" fill="var(--c-danger)" />
      <text x="384" y="100" font-size="17" fill="var(--c-danger)">
        感应电场
        <tspan font-family="KaTeX_Math" font-style="italic">E</tspan>
      </text>
    </g>
  </svg>
</template>
