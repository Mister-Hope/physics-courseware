<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
const CX = 260;
const CY = 50;
const R = 190;
const theta = (20 * Math.PI) / 180;
const arcX = CX + R * Math.sin(theta);
const arcY = CY + R * Math.cos(theta);
const ballX = arcX - 14 * Math.sin(theta);
const ballY = arcY - 14 * Math.cos(theta);
const normalX = ballX - 0.342 * 48;
const normalY = ballY - 0.94 * 48;
const tangentX = ballX - 0.94 * 24;
const tangentY = ballY + 0.342 * 24;
</script>

<template>
  <svg class="em-qual-svg" viewBox="0 0 520 280" role="img" aria-label="小球在光滑圆弧面上振动">
    <path d="M 125.6 184.4 A 190 190 0 0 0 394.4 184.4" fill="none" stroke="var(--c-text-dim)" stroke-width="3.5" stroke-linecap="round" />
    <text x="244" y="258" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text-dim)">O</text>
    <circle :cx="ballX" :cy="ballY" r="14" fill="var(--c-accent-2)" />
    <circle :cx="ballX - 4" :cy="ballY - 4" r="4" fill="var(--c-text)" opacity="0.28" />
    <g v-if="showForces">
      <circle cx="260" cy="50" r="3" fill="var(--c-text-dim)" />
      <line x1="260" y1="50" x2="260" y2="240" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.65" />
      <line x1="260" y1="50" :x2="ballX" :y2="ballY" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.65" />
      <path d="M 260 90 A 40 40 0 0 1 273.7 87.6" fill="none" stroke="var(--c-accent)" stroke-width="2" />
      <text x="277" y="81" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">θ</text>
      <text x="294" y="128" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)">R</text>
      <CourseArrow :from="[ballX, ballY]" :to="[ballX, ballY + 54]" stroke="var(--c-danger)" :stroke-width="3" :head-size="9" />
      <CourseArrow :from="[ballX, ballY]" :to="[normalX, normalY]" stroke="var(--c-sky)" :stroke-width="3" :head-size="9" />
      <CourseArrow :from="[ballX, ballY]" :to="[tangentX, tangentY]" stroke="var(--c-accent)" :stroke-width="3" :head-size="8" />
      <text x="328" y="272" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-danger)">mg</text>
      <text x="282" y="164" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-sky)">N</text>
      <text x="334" y="256" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)">mg sinθ</text>
    </g>
  </svg>
</template>

<style scoped>
.em-qual-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
