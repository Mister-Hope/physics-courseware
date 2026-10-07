<script setup lang="ts">
/** 教材例题 2：无人机水平飞行时释放小球。 题干元素常显（无人机、初速度 v0、离地高度 h、释放点 O、落点 P、水平距离 l）； showAnalysis 为 true 时才补上抛物线轨迹与落点处速度方向。 */
const { showAnalysis = false } = defineProps<{ showAnalysis?: boolean }>();
</script>

<template>
  <div class="drone-drop">
    <svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="无人机水平飞行释放小球，小球落在水平地面上的 P 点">
      <SurfaceHatch :from="{ x: 60, y: 320 }" :to="{ x: 600, y: 320 }" side="below" />
      <line x1="278" y1="70" x2="316" y2="70" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" />
      <line x1="344" y1="70" x2="382" y2="70" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" />
      <rect x="300" y="80" width="60" height="22" rx="9" fill="rgba(148,163,184,0.45)" stroke="#cbd5e1" stroke-width="1.6" />
      <CourseArrow :from="{ x: 236, y: 91 }" :to="{ x: 294, y: 91 }" stroke="#e2a846" :stroke-width="3" />
      <text x="252" y="76" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2a846">
        v
        <tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4">0</tspan>
      </text>
      <CourseArrow :from="{ x: 330, y: 250 }" :to="{ x: 330, y: 132 }" stroke="#e2a846" :stroke-width="2.4" />
      <CourseArrow :from="{ x: 330, y: 190 }" :to="{ x: 330, y: 316 }" stroke="#e2a846" :stroke-width="2.4" />
      <text x="316" y="228" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2a846">h</text>
      <circle cx="330" cy="130" r="4.5" fill="#e2e8f0" />
      <text x="316" y="122" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2e8f0">O</text>
      <circle cx="520" cy="320" r="4.5" fill="#e2e8f0" />
      <text x="534" y="313" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2e8f0">P</text>
      <line x1="330" y1="308" x2="520" y2="308" stroke="#e2a846" stroke-width="1.8" />
      <line x1="330" y1="298" x2="330" y2="318" stroke="#e2a846" stroke-width="1.8" />
      <line x1="520" y1="298" x2="520" y2="318" stroke="#e2a846" stroke-width="1.8" />
      <text x="425" y="296" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2a846">l</text>
      <g v-if="showAnalysis">
        <path d="M 330 130 Q 425 130 520 320" fill="none" stroke="rgba(148,163,184,0.7)" stroke-width="2.4" stroke-dasharray="9 6" />
        <CourseArrow :from="{ x: 500, y: 280 }" :to="{ x: 520, y: 320 }" stroke="#60a5fa" :stroke-width="3" />
        <text x="532" y="302" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#60a5fa">v</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.drone-drop {
  min-width: 0;
}

.drone-drop svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
