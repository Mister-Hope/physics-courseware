<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
</script>

<template>
  <!-- 第 9 页例题三：小车上倒 L 形支架悬挂单摆。支架抬高、小球挂在车身前方上方，
       球与车厢不接触（重力的箭头也落在车厢之外）；受力与加速度箭头受 showForces 控制 -->
  <svg viewBox="0 0 400 300" width="100%" style="max-width: 440px" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 16, y: 252 }" :to="{ x: 384, y: 252 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <rect x="140" y="180" width="190" height="44" rx="8" fill="color-mix(in srgb, var(--c-surface-solid) 85%, transparent)" stroke="var(--c-accent)" stroke-width="2.2" />
    <circle cx="180" cy="236" r="16" fill="color-mix(in srgb, var(--c-surface-solid) 90%, transparent)" stroke="var(--c-text-dim)" stroke-width="2" />
    <circle cx="290" cy="236" r="16" fill="color-mix(in srgb, var(--c-surface-solid) 90%, transparent)" stroke="var(--c-text-dim)" stroke-width="2" />
    <circle cx="180" cy="236" r="4.5" fill="var(--c-text-dim)" />
    <circle cx="290" cy="236" r="4.5" fill="var(--c-text-dim)" />
    <line x1="170" y1="180" x2="170" y2="56" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" />
    <line x1="170" y1="56" x2="72" y2="56" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" />
    <line x1="72" y1="56" x2="108" y2="155" stroke="var(--c-neutral-300)" stroke-width="2.2" />
    <line x1="72" y1="56" x2="72" y2="192" stroke="color-mix(in srgb, var(--c-text-dim) 55%, transparent)" stroke-width="1.4" stroke-dasharray="7 5" />
    <path d="M 72 102 A 46 46 0 0 1 87.7 99.2" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="62" y="106" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-neutral-200)">θ</text>
    <circle cx="108" cy="155" r="14" fill="var(--c-velocity)" stroke="var(--c-velocity-light)" stroke-width="2" />
    <text x="126" y="161" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-velocity)">m</text>
    <g v-if="showForces">
      <CourseArrow :from="{ x: 108, y: 155 }" :to="{ x: 108, y: 215 }" stroke="var(--c-force)" :stroke-width="3.4" />
      <text x="100" y="209" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-force)">mg</text>
      <CourseArrow :from="{ x: 108, y: 155 }" :to="{ x: 86.1, y: 95 }" stroke="var(--c-physics)" :stroke-width="3.4" />
      <text x="98" y="118" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-physics)">
        <tspan>F</tspan>
        <tspan dy="3" font-size="11">T</tspan>
      </text>
      <line x1="108" y1="215" x2="86.1" y2="155" stroke="color-mix(in srgb, var(--c-text-dim) 50%, transparent)" stroke-width="1.4" stroke-dasharray="6 4" />
      <line x1="86.1" y1="95" x2="86.1" y2="155" stroke="color-mix(in srgb, var(--c-text-dim) 50%, transparent)" stroke-width="1.4" stroke-dasharray="6 4" />
      <CourseArrow :from="{ x: 108, y: 155 }" :to="{ x: 86.1, y: 155 }" stroke="var(--c-velocity)" :stroke-width="3.4" />
      <text x="78" y="160" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-velocity)">
        <tspan>F</tspan>
        <tspan dy="3" font-size="11">合</tspan>
      </text>
      <CourseArrow :from="{ x: 198, y: 150 }" :to="{ x: 148, y: 150 }" stroke="var(--c-velocity)" :stroke-width="3" label="a" :label-dx="2" :label-dy="-13" />
    </g>
  </svg>
</template>
