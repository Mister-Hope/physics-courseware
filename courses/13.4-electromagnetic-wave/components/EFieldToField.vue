<!-- 第 4 页：变化的电场区（红色竖直电场线）→ 产生环绕它的磁场（蓝色虚线圆环，左端垂直纸面向外、右端向里） -->
<script setup lang="ts">
defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 460 260" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="170"
      y="60"
      width="120"
      height="140"
      rx="10"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.6"
      stroke-dasharray="7 5"
    />
    <g stroke="var(--c-danger)" stroke-width="2.6" stroke-linecap="round">
      <line x1="192" y1="176" x2="192" y2="94" />
      <line x1="216" y1="176" x2="216" y2="94" />
      <line x1="244" y1="176" x2="244" y2="94" />
      <line x1="268" y1="176" x2="268" y2="94" />
    </g>
    <path d="M 192 86 L 186 98 L 198 98 Z" fill="var(--c-danger)" />
    <path d="M 216 86 L 210 98 L 222 98 Z" fill="var(--c-danger)" />
    <path d="M 244 86 L 238 98 L 250 98 Z" fill="var(--c-danger)" />
    <path d="M 268 86 L 262 98 L 274 98 Z" fill="var(--c-danger)" />
    <text x="230" y="234" text-anchor="middle" font-size="17" fill="var(--c-text)">
      变化的电场
      <tspan font-family="KaTeX_Math" font-style="italic">E</tspan>
    </text>
    <g v-if="(step ?? 0) >= 1">
      <ellipse
        cx="230"
        cy="130"
        rx="170"
        ry="46"
        fill="none"
        stroke="var(--c-accent-2)"
        stroke-width="2.6"
        stroke-dasharray="9 7"
      />
      <FieldMark :x="60" :y="130" dir="out" :r="13" label="B" color="var(--c-accent-2)" />
      <FieldMark :x="400" :y="130" dir="in" :r="13" color="var(--c-accent-2)" />
      <text x="230" y="72" text-anchor="middle" font-size="17" fill="var(--c-accent-2)">
        环绕的磁场
        <tspan font-family="KaTeX_Math" font-style="italic">B</tspan>
      </text>
    </g>
  </svg>
</template>
