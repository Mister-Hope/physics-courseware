<script setup lang="ts">
/** 第 8 / 9 页（只有重力做功时的定量关系 + 上升过程）：光滑曲面上 A、B 两点的速度与受力。 `direction="up"` 时速度箭头反向（物体由 B 上升到 A）；`showForces` 为真才画重力与支持力。 */
const { direction = "down", showForces = false } = defineProps<{
  direction?: "down" | "up";
  showForces?: boolean;
}>();
</script>

<template>
  <!-- 光滑曲面：A（h1、v1）在陡的一段，B（h2、v2）在下方平缓的一段；地面在曲面下方 -->
  <svg class="fig-smooth-track" viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg">
    <line x1="60" y1="262" x2="780" y2="262" stroke="var(--c-neutral-300)" stroke-width="3" stroke-linecap="round" />
    <SurfaceHatch :from="{ x: 60, y: 262 }" :to="{ x: 780, y: 262 }" side="below" :thickness="14" :gap="24" />
    <path d="M 100 40 C 100 170 200 210 340 210 L 760 210" fill="none" stroke="var(--c-neutral-300)" stroke-width="4.5" stroke-linecap="round" />
    <line x1="52" y1="89" x2="200" y2="89" stroke="var(--c-ok)" stroke-width="1.5" stroke-dasharray="7 6" opacity="0.5" />
    <line x1="52" y1="197" x2="620" y2="197" stroke="var(--c-ok)" stroke-width="1.5" stroke-dasharray="7 6" opacity="0.5" />
    <line x1="52" y1="89" x2="52" y2="262" stroke="var(--c-ok)" stroke-width="1.5" stroke-dasharray="7 6" opacity="0.5" />
    <text x="30" y="180" font-size="16" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">
      h
      <tspan font-size="11" dy="3">1</tspan>
    </text>
    <text x="30" y="242" font-size="16" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">
      h
      <tspan font-size="11" dy="3">2</tspan>
    </text>
    <circle cx="119" cy="89" r="14" fill="var(--c-accent-2)" fill-opacity="0.22" stroke="var(--c-accent-2)" stroke-width="3" />
    <circle cx="470" cy="197" r="14" fill="var(--c-accent-2)" fill-opacity="0.22" stroke="var(--c-accent-2)" stroke-width="3" />
    <text x="78" y="62" font-size="16" fill="var(--c-text-dim)" font-family="system-ui">A</text>
    <text x="438" y="170" font-size="16" fill="var(--c-text-dim)" font-family="system-ui">B</text>
    <CourseArrow v-if="direction === 'down'" :from="{ x: 145, y: 82 }" :to="{ x: 161, y: 140 }" stroke="var(--c-accent-2)" :stroke-width="2.4" />
    <CourseArrow v-if="direction === 'up'" :from="{ x: 161, y: 140 }" :to="{ x: 145, y: 82 }" stroke="var(--c-accent-2)" :stroke-width="2.4" />
    <text x="168" y="120" font-size="15" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">
      v
      <tspan font-size="10" dy="3">1</tspan>
    </text>
    <CourseArrow
      :from="{ x: direction === 'down' ? 500 : 562, y: 197 }"
      :to="{ x: direction === 'down' ? 562 : 500, y: 197 }"
      stroke="var(--c-accent-2)"
      :stroke-width="2.4"
    />
    <text x="518" y="180" font-size="15" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">
      v
      <tspan font-size="10" dy="3">2</tspan>
    </text>
    <g v-if="showForces">
      <CourseArrow :from="{ x: 119, y: 89 }" :to="{ x: 119, y: 141 }" stroke="var(--c-danger)" :stroke-width="2.8" />
      <text x="128" y="128" font-size="15" fill="var(--c-danger)" font-family="KaTeX_Math" font-style="italic">G</text>
      <CourseArrow :from="{ x: 119, y: 89 }" :to="{ x: 163, y: 77 }" stroke="var(--c-physics)" :stroke-width="2.8" />
      <text x="168" y="72" font-size="15" fill="var(--c-physics)" font-family="KaTeX_Math" font-style="italic">
        F
        <tspan font-size="10" dy="3">N</tspan>
      </text>
      <CourseArrow :from="{ x: 470, y: 197 }" :to="{ x: 470, y: 249 }" stroke="var(--c-danger)" :stroke-width="2.8" />
      <text x="479" y="236" font-size="15" fill="var(--c-danger)" font-family="KaTeX_Math" font-style="italic">G</text>
      <CourseArrow :from="{ x: 470, y: 197 }" :to="{ x: 470, y: 151 }" stroke="var(--c-physics)" :stroke-width="2.8" />
      <text x="479" y="160" font-size="15" fill="var(--c-physics)" font-family="KaTeX_Math" font-style="italic">
        F
        <tspan font-size="10" dy="3">N</tspan>
      </text>
    </g>
  </svg>
</template>

<style scoped>
.fig-smooth-track {
  display: block;
  width: 100%;
  height: auto;
}
</style>
