<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
</script>

<template>
  <!-- 第 9 页例题三：小车上倒 L 形支架悬挂单摆。支架抬高、小球挂在车身前方上方，
       球与车厢不接触（重力的箭头也落在车厢之外）；受力与加速度箭头受 showForces 控制 -->
  <svg viewBox="0 0 400 300" width="100%" style="max-width: 440px" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 16, y: 252 }" :to="{ x: 384, y: 252 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <rect x="140" y="180" width="190" height="44" rx="8" fill="rgba(30,41,59,0.85)" stroke="#e2a846" stroke-width="2.2" />
    <circle cx="180" cy="236" r="16" fill="rgba(30,41,59,0.9)" stroke="#94a3b8" stroke-width="2" />
    <circle cx="290" cy="236" r="16" fill="rgba(30,41,59,0.9)" stroke="#94a3b8" stroke-width="2" />
    <circle cx="180" cy="236" r="4.5" fill="#94a3b8" />
    <circle cx="290" cy="236" r="4.5" fill="#94a3b8" />
    <line x1="170" y1="180" x2="170" y2="56" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />
    <line x1="170" y1="56" x2="72" y2="56" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />
    <line x1="72" y1="56" x2="108" y2="155" stroke="#cbd5e1" stroke-width="2.2" />
    <line x1="72" y1="56" x2="72" y2="192" stroke="rgba(148,163,184,0.55)" stroke-width="1.4" stroke-dasharray="7 5" />
    <path d="M 72 102 A 46 46 0 0 1 87.7 99.2" fill="none" stroke="#94a3b8" stroke-width="1.6" />
    <text x="62" y="106" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#e2e8f0">θ</text>
    <circle cx="108" cy="155" r="14" fill="#60a5fa" stroke="#93c5fd" stroke-width="2" />
    <text x="126" y="161" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#60a5fa">m</text>
    <g v-if="showForces">
      <CourseArrow :from="{ x: 108, y: 155 }" :to="{ x: 108, y: 215 }" stroke="#f87171" :stroke-width="3.4" />
      <text x="100" y="209" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#f87171">mg</text>
      <CourseArrow :from="{ x: 108, y: 155 }" :to="{ x: 86.1, y: 95 }" stroke="#2dd4bf" :stroke-width="3.4" />
      <text x="98" y="118" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#2dd4bf">
        <tspan>F</tspan>
        <tspan dy="3" font-size="11">T</tspan>
      </text>
      <line x1="108" y1="215" x2="86.1" y2="155" stroke="rgba(148,163,184,0.5)" stroke-width="1.4" stroke-dasharray="6 4" />
      <line x1="86.1" y1="95" x2="86.1" y2="155" stroke="rgba(148,163,184,0.5)" stroke-width="1.4" stroke-dasharray="6 4" />
      <CourseArrow :from="{ x: 108, y: 155 }" :to="{ x: 86.1, y: 155 }" stroke="#60a5fa" :stroke-width="3.4" />
      <text x="78" y="160" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#60a5fa">
        <tspan>F</tspan>
        <tspan dy="3" font-size="11">合</tspan>
      </text>
      <CourseArrow :from="{ x: 198, y: 150 }" :to="{ x: 148, y: 150 }" stroke="#60a5fa" :stroke-width="3" label="a" :label-dx="2" :label-dy="-13" />
    </g>
  </svg>
</template>
