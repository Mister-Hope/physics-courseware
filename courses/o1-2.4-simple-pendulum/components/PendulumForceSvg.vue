<template>
  <!-- 单摆的回复力：重力沿切向的分力，指向平衡位置 -->
  <svg viewBox="94 22 358 312" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="单摆回复力示意图">
    <path
      d="M100 36 H360 M110 36 L101 27 M134 36 L125 27 M158 36 L149 27 M182 36 L173 27 M206 36 L197 27 M230 36 L221 27 M254 36 L245 27 M278 36 L269 27 M302 36 L293 27 M326 36 L317 27 M350 36 L341 27"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-opacity=".4"
    />
    <line x1="100" y1="36" x2="360" y2="36" stroke="var(--c-text-dim)" stroke-width="3" stroke-linecap="round" />
    <circle cx="230" cy="36" r="4.5" fill="var(--c-text-dim)" />
    <line x1="230" y1="36" x2="230" y2="310" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="5 7" stroke-opacity=".45" />
    <line x1="230" y1="36" x2="333.3" y2="230.3" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
    <circle cx="333.3" cy="230.3" r="12" fill="var(--c-accent)" fill-opacity=".26" stroke="var(--c-accent)" stroke-width="2" />
    <circle cx="230" cy="256" r="4" fill="var(--c-text-dim)" />
    <text x="204" y="266" font-size="15" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic">O</text>
    <path d="M230 256 A220 220 0 0 1 333.3 230.3" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="6 6" stroke-opacity=".55" />
    <path d="M230 80 A44 44 0 0 1 250.7 74.8" fill="none" stroke="var(--c-accent)" stroke-width="1.8" />
    <text x="256" y="92" font-size="16" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic">θ</text>
    <CourseArrow :from="{ x: 333.3, y: 230.3 }" :to="{ x: 333.3, y: 310.3 }" stroke="var(--c-danger)" :stroke-width="3" :head-size="12" />
    <CourseArrow :from="{ x: 333.3, y: 230.3 }" :to="{ x: 293.4, y: 155.2 }" stroke="var(--c-velocity)" :stroke-width="3" :head-size="12" />
    <text x="344" y="322" font-size="17" fill="var(--c-danger)" font-family="KaTeX_Math" font-style="italic">G</text>
    <text x="272" y="151" font-size="17" fill="var(--c-velocity)">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan><tspan font-family="KaTeX_Main" font-size="11" dy="4">T</tspan>
    </text>
    <g v-if="step >= 1">
      <line x1="366.4" y1="292.6" x2="333.3" y2="310.3" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="4 4" stroke-opacity=".6" />
      <line x1="300.1" y1="247.9" x2="333.3" y2="310.3" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="4 4" stroke-opacity=".6" />
      <CourseArrow :from="{ x: 333.3, y: 230.3 }" :to="{ x: 366.4, y: 292.6 }" stroke="var(--c-accent)" :stroke-width="2.6" :head-size="10" />
      <CourseArrow :from="{ x: 333.3, y: 230.3 }" :to="{ x: 300.1, y: 247.9 }" stroke="var(--c-accent)" :stroke-width="2.6" :head-size="10" />
      <text x="374" y="303" font-size="12" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic">mg cosθ</text>
      <text x="292" y="234" font-size="12" fill="var(--c-accent)" text-anchor="end" font-family="KaTeX_Math" font-style="italic">mg sinθ</text>
    </g>
    <g v-if="step >= 2">
      <CourseArrow :from="{ x: 333.3, y: 230.3 }" :to="{ x: 300.1, y: 247.9 }" stroke="var(--c-accent)" :stroke-width="5" :head-size="13" />
      <text x="288" y="268" font-size="17" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic">F</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>
