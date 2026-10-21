<script setup lang="ts">
/** 第 5 页：电荷 q 从 A 点移到 B 点，静电力做功 W_AB 等于 A、B 两点的电势能之差。电势能标注点击后出现。 */
defineProps<{
  /** 显示 A、B 两点的电势能标注 E_pA、E_pB */
  showEnergy?: boolean;
}>();
</script>

<template>
  <svg viewBox="0 0 360 280" width="360" height="280">
    <line x1="20" y1="80" x2="340" y2="80" stroke="var(--c-field)" stroke-width="1.8" opacity="0.4" />
    <line x1="20" y1="140" x2="340" y2="140" stroke="var(--c-field)" stroke-width="1.8" opacity="0.4" />
    <line x1="20" y1="200" x2="340" y2="200" stroke="var(--c-field)" stroke-width="1.8" opacity="0.4" />
    <CourseArrow :from="{ x: 250, y: 80 }" :to="{ x: 312, y: 80 }" stroke="var(--c-field)" stroke-width="1.8" opacity="0.8" />
    <CourseArrow :from="{ x: 250, y: 140 }" :to="{ x: 312, y: 140 }" stroke="var(--c-field)" stroke-width="1.8" opacity="0.8" />
    <CourseArrow :from="{ x: 250, y: 200 }" :to="{ x: 312, y: 200 }" stroke="var(--c-field)" stroke-width="1.8" opacity="0.8" />
    <CourseArrow :from="{ x: 88, y: 140 }" :to="{ x: 296, y: 140 }" stroke="var(--c-velocity)" stroke-width="2.2" stroke-dasharray="7 5" />
    <circle cx="70" cy="140" r="13" fill="var(--c-force)" stroke="var(--c-neutral-50)" stroke-width="1.6" />
    <text x="70" y="145" text-anchor="middle" fill="var(--c-neutral-50)" font-size="15" font-weight="700">+</text>
    <text x="70" y="172" text-anchor="middle" fill="var(--c-text-dim)" font-size="14" font-style="italic" font-family="KaTeX_Math">A</text>
    <circle cx="312" cy="140" r="5.5" fill="var(--c-neutral-200)" />
    <text x="312" y="172" text-anchor="middle" fill="var(--c-text-dim)" font-size="14" font-style="italic" font-family="KaTeX_Math">B</text>
    <text x="70" y="112" text-anchor="middle" fill="var(--c-text)" font-size="15" font-style="italic" font-family="KaTeX_Math">
      φ
      <tspan font-size="10" dy="3">A</tspan>
    </text>
    <text x="312" y="112" text-anchor="middle" fill="var(--c-text)" font-size="15" font-style="italic" font-family="KaTeX_Math">
      φ
      <tspan font-size="10" dy="3">B</tspan>
    </text>
    <text x="182" y="250" text-anchor="middle" fill="var(--c-velocity)" font-size="13" font-style="italic" font-family="KaTeX_Math">
      W
      <tspan font-size="9" dy="2">AB</tspan>
      <tspan dx="4" font-family="KaTeX_Main" font-style="normal">= ?</tspan>
    </text>
    <g v-if="showEnergy">
      <text x="70" y="226" text-anchor="middle" fill="var(--c-physics)" font-size="14" font-style="italic" font-family="KaTeX_Math">
        E
        <tspan font-size="10" dy="3">pA</tspan>
      </text>
      <text x="312" y="226" text-anchor="middle" fill="var(--c-physics)" font-size="14" font-style="italic" font-family="KaTeX_Math">
        E
        <tspan font-size="10" dy="3">pB</tspan>
      </text>
    </g>
  </svg>
</template>
