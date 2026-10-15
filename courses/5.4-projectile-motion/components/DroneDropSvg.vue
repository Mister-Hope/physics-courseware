<script setup lang="ts">
/** 教材例题 2：无人机水平飞行时释放小球。 题干元素常显（无人机、初速度 v0、离地高度 h、释放点 O、落点 P、水平距离 l）； showAnalysis 为 true 时才补上抛物线轨迹与落点处速度方向。 */
const { showAnalysis = false } = defineProps<{ showAnalysis?: boolean }>();
</script>

<template>
  <div class="drone-drop">
    <svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="无人机水平飞行释放小球，小球落在水平地面上的 P 点">
      <SurfaceHatch :from="{ x: 60, y: 320 }" :to="{ x: 600, y: 320 }" side="below" />
      <line x1="278" y1="70" x2="316" y2="70" stroke="var(--c-neutral-300)" stroke-width="3" stroke-linecap="round" />
      <line x1="344" y1="70" x2="382" y2="70" stroke="var(--c-neutral-300)" stroke-width="3" stroke-linecap="round" />
      <rect
        x="300"
        y="80"
        width="60"
        height="22"
        rx="9"
        fill="color-mix(in srgb, var(--c-text-dim) 45%, transparent)"
        stroke="var(--c-neutral-300)"
        stroke-width="1.6"
      />
      <CourseArrow :from="{ x: 236, y: 91 }" :to="{ x: 294, y: 91 }" stroke="var(--c-accent)" :stroke-width="3" />
      <text x="252" y="76" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">
        v
        <tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4">0</tspan>
      </text>
      <CourseArrow :from="{ x: 330, y: 250 }" :to="{ x: 330, y: 132 }" stroke="var(--c-accent)" :stroke-width="2.4" />
      <CourseArrow :from="{ x: 330, y: 190 }" :to="{ x: 330, y: 316 }" stroke="var(--c-accent)" :stroke-width="2.4" />
      <text x="316" y="228" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">h</text>
      <circle cx="330" cy="130" r="4.5" fill="var(--c-neutral-200)" />
      <text x="316" y="122" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-neutral-200)">O</text>
      <circle cx="520" cy="320" r="4.5" fill="var(--c-neutral-200)" />
      <text x="534" y="313" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-neutral-200)">P</text>
      <line x1="330" y1="308" x2="520" y2="308" stroke="var(--c-accent)" stroke-width="1.8" />
      <line x1="330" y1="298" x2="330" y2="318" stroke="var(--c-accent)" stroke-width="1.8" />
      <line x1="520" y1="298" x2="520" y2="318" stroke="var(--c-accent)" stroke-width="1.8" />
      <text x="425" y="296" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">l</text>
      <g v-if="showAnalysis">
        <path
          d="M 330 130 Q 425 130 520 320"
          fill="none"
          stroke="color-mix(in srgb, var(--c-text-dim) 70%, transparent)"
          stroke-width="2.4"
          stroke-dasharray="9 6"
        />
        <CourseArrow :from="{ x: 500, y: 280 }" :to="{ x: 520, y: 320 }" stroke="var(--c-velocity)" :stroke-width="3" />
        <text x="532" y="302" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-velocity)">v</text>
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
