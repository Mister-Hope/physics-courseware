<!--
  静止的两辆小车，中间夹着压缩的轻弹簧（教材图 1.3-2，第 8 页）。
  expanded：细线烧断后两车向两侧分开，画出各自的速度方向。
-->
<script setup lang="ts">
const { expanded = false } = defineProps<{
  /** 细线是否已烧断（两车分开） */
  expanded?: boolean;
}>();
</script>

<template>
  <svg viewBox="0 0 460 180" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <SurfaceHatch :from="{ x: 20, y: 152 }" :to="{ x: 440, y: 152 }" side="below" :thickness="12" :gap="22" :line-width="2" />
    <!-- 两辆小车 -->
    <rect x="70" y="102" width="112" height="50" rx="8" fill="rgba(226, 168, 70, 0.14)" stroke="var(--c-accent)" stroke-width="2" />
    <text x="126" y="134" text-anchor="middle" fill="var(--c-accent)" font-family="KaTeX_Main" font-size="19">甲</text>
    <rect x="278" y="102" width="112" height="50" rx="8" fill="rgba(96, 165, 250, 0.14)" stroke="var(--c-velocity)" stroke-width="2" />
    <text x="334" y="134" text-anchor="middle" fill="var(--c-velocity)" font-family="KaTeX_Main" font-size="19">乙</text>
    <!-- 中间被压缩的轻弹簧 -->
    <polyline
      points="182,127 192,112 204,142 216,112 228,142 240,112 250,127 278,127"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="2.2"
      stroke-linejoin="round"
    />
    <!-- 细线 -->
    <g v-if="!expanded">
      <line x1="182" y1="94" x2="278" y2="94" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="5 4" />
      <text x="230" y="86" text-anchor="middle" fill="var(--c-text-dim)" font-family="KaTeX_Main" font-size="14">细线</text>
    </g>
    <!-- 烧断后：两车向两侧分开 -->
    <g v-else>
      <CourseArrow :from="{ x: 74, y: 74 }" :to="{ x: 22, y: 74 }" stroke="var(--c-accent)" stroke-width="2.4" />
      <CourseArrow :from="{ x: 386, y: 74 }" :to="{ x: 438, y: 74 }" stroke="var(--c-velocity)" stroke-width="2.4" />
      <text x="44" y="64" text-anchor="middle" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="17">
        v<tspan dy="4" font-size="11">甲</tspan>
      </text>
      <text x="416" y="64" text-anchor="middle" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="17">
        v<tspan dy="4" font-size="11">乙</tspan>
      </text>
    </g>
  </svg>
</template>
