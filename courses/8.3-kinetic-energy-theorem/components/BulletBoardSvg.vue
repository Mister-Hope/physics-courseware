<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
</script>

<template>
  <!-- 第 13 页例题图：子弹以初速度射入固定木板、穿出后速度变小（题面给的 v₁、v₂ 与板厚常显）；
       平均阻力 F_阻 是受力分析，点击后才从板内子弹的几何中心 (370,153) 画出 -->
  <svg viewBox="0 0 620 320" width="100%" style="max-width: 600px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="子弹射穿固定木板">
    <line x1="182" y1="153" x2="320" y2="153" stroke="var(--c-text-dim)" stroke-width="1.8" stroke-dasharray="7 6" />
    <line x1="418" y1="153" x2="440" y2="153" stroke="var(--c-text-dim)" stroke-width="1.8" stroke-dasharray="7 6" />
    <rect
      x="320"
      y="60"
      width="100"
      height="200"
      rx="4"
      fill="color-mix(in srgb, var(--c-surface-solid) 82%, transparent)"
      stroke="var(--c-neutral-300)"
      stroke-width="2.2"
    />
    <path d="M 330 100 L 410 66" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <path d="M 330 160 L 410 126" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <path d="M 330 220 L 410 186" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <path d="M 330 256 L 410 222" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <text x="370" y="286" font-size="16" fill="var(--c-text-dim)" text-anchor="middle">木板</text>
    <line x1="320" y1="44" x2="420" y2="44" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="320" y1="36" x2="320" y2="52" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="420" y1="36" x2="420" y2="52" stroke="var(--c-accent)" stroke-width="2.4" />
    <text x="370" y="30" font-size="17" fill="var(--c-accent)" text-anchor="middle" stroke="var(--c-bg-soft)" stroke-width="3" paint-order="stroke">
      <tspan>5</tspan>
      <tspan dx="4" font-family="KaTeX_Main">cm</tspan>
    </text>
    <g opacity="0.55">
      <rect
        x="322"
        y="140"
        width="70"
        height="26"
        rx="13"
        fill="var(--c-surface-solid)"
        stroke="var(--c-neutral-300)"
        stroke-width="2"
        stroke-dasharray="7 5"
      />
      <path
        d="M 392 140 L 418 153 L 392 166 Z"
        fill="var(--c-surface-solid)"
        stroke="var(--c-neutral-300)"
        stroke-width="2"
        stroke-dasharray="7 5"
        stroke-linejoin="round"
      />
    </g>
    <g>
      <rect x="86" y="140" width="70" height="26" rx="13" fill="var(--c-accent)" fill-opacity="0.35" stroke="var(--c-accent)" stroke-width="2.2" />
      <path
        d="M 156 140 L 182 153 L 156 166 Z"
        fill="var(--c-accent)"
        fill-opacity="0.35"
        stroke="var(--c-accent)"
        stroke-width="2.2"
        stroke-linejoin="round"
      />
    </g>
    <g>
      <rect x="440" y="140" width="70" height="26" rx="13" fill="var(--c-accent)" fill-opacity="0.35" stroke="var(--c-accent)" stroke-width="2.2" />
      <path
        d="M 510 140 L 536 153 L 510 166 Z"
        fill="var(--c-accent)"
        fill-opacity="0.35"
        stroke="var(--c-accent)"
        stroke-width="2.2"
        stroke-linejoin="round"
      />
    </g>
    <CourseArrow :from="{ x: 196, y: 106 }" :to="{ x: 296, y: 106 }" stroke="var(--c-velocity)" :stroke-width="2.8" />
    <text x="246" y="90" font-size="17" fill="var(--c-velocity)" text-anchor="middle" stroke="var(--c-bg-soft)" stroke-width="3" paint-order="stroke">
      <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
      <tspan dy="4" font-family="KaTeX_Main" font-style="normal" font-size="12">1</tspan>
      <tspan dy="-4" dx="4" font-family="KaTeX_Main" font-style="normal">=300</tspan>
      <tspan dx="3" font-family="KaTeX_Main">m/s</tspan>
    </text>
    <CourseArrow :from="{ x: 548, y: 106 }" :to="{ x: 582, y: 106 }" stroke="var(--c-velocity)" :stroke-width="2.8" />
    <text x="565" y="90" font-size="17" fill="var(--c-velocity)" text-anchor="middle" stroke="var(--c-bg-soft)" stroke-width="3" paint-order="stroke">
      <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
      <tspan dy="4" font-family="KaTeX_Main" font-style="normal" font-size="12">2</tspan>
      <tspan dy="-4" dx="4" font-family="KaTeX_Main" font-style="normal">=100</tspan>
      <tspan dx="3" font-family="KaTeX_Main">m/s</tspan>
    </text>
    <g v-if="showForces">
      <CourseArrow :from="{ x: 370, y: 153 }" :to="{ x: 262, y: 153 }" stroke="var(--c-physics)" :stroke-width="3.4" />
      <text
        x="254"
        y="146"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="var(--c-physics)"
        text-anchor="end"
        stroke="var(--c-bg-soft)"
        stroke-width="3"
        paint-order="stroke"
      >
        <tspan>F</tspan>
        <tspan dy="4" font-size="14" font-style="normal">阻</tspan>
      </text>
    </g>
  </svg>
</template>
