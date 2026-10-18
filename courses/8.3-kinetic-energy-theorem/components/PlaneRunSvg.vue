<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
</script>

<template>
  <!-- 第 9 页例题图：喷气式飞机在跑道上从静止滑跑，已知位移 l 与起飞速度 v（题干给的量常显）；
       牵引力 F_牵 与阻力 F_阻 是受力分析，点击后才从飞机几何中心 (245,175) 画出 -->
  <svg viewBox="0 0 620 320" width="100%" style="max-width: 640px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="飞机在跑道上滑跑">
    <SurfaceHatch :from="{ x: 30, y: 245 }" :to="{ x: 590, y: 245 }" side="below" :thickness="14" :gap="22" color="var(--c-text-dim)" :line-width="2.2" />
    <rect x="130" y="152" width="230" height="46" rx="23" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2.2" />
    <path d="M 360 152 L 404 175 L 360 198 Z" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2.2" stroke-linejoin="round" />
    <path
      d="M 140 152 L 158 114 L 190 114 L 194 152 Z"
      fill="var(--c-surface-solid)"
      stroke="var(--c-neutral-300)"
      stroke-width="2.2"
      stroke-linejoin="round"
    />
    <path
      d="M 252 198 L 284 230 L 308 230 L 280 198 Z"
      fill="var(--c-surface-solid)"
      stroke="var(--c-neutral-300)"
      stroke-width="2.2"
      stroke-linejoin="round"
    />
    <circle cx="190" cy="234" r="11" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2.2" />
    <circle cx="342" cy="234" r="11" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2.2" />
    <circle cx="168" cy="168" r="7" fill="var(--c-bg-soft)" stroke="var(--c-neutral-300)" stroke-width="1.6" />
    <circle cx="196" cy="168" r="7" fill="var(--c-bg-soft)" stroke="var(--c-neutral-300)" stroke-width="1.6" />
    <circle cx="224" cy="168" r="7" fill="var(--c-bg-soft)" stroke="var(--c-neutral-300)" stroke-width="1.6" />
    <CourseArrow :from="{ x: 414, y: 136 }" :to="{ x: 512, y: 136 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
    <text
      x="463"
      y="120"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="19"
      fill="var(--c-velocity)"
      text-anchor="middle"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      v
    </text>
    <line x1="130" y1="252" x2="130" y2="288" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="5 5" />
    <line x1="520" y1="252" x2="520" y2="288" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="5 5" />
    <line x1="130" y1="288" x2="520" y2="288" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="130" y1="280" x2="130" y2="296" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="520" y1="280" x2="520" y2="296" stroke="var(--c-accent)" stroke-width="2.4" />
    <text
      x="325"
      y="279"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="21"
      fill="var(--c-accent)"
      text-anchor="middle"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      l
    </text>
    <g v-if="showForces">
      <CourseArrow :from="{ x: 245, y: 175 }" :to="{ x: 455, y: 175 }" stroke="var(--c-accent)" :stroke-width="3.4" />
      <text
        x="462"
        y="168"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="var(--c-accent)"
        stroke="var(--c-bg-soft)"
        stroke-width="3"
        paint-order="stroke"
      >
        <tspan>F</tspan>
        <tspan dy="4" font-size="14" font-style="normal">牵</tspan>
      </text>
      <CourseArrow :from="{ x: 245, y: 175 }" :to="{ x: 55, y: 175 }" stroke="var(--c-physics)" :stroke-width="3.4" />
      <text
        x="48"
        y="168"
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
