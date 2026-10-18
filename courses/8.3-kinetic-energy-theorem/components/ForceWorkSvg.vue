<script setup lang="ts">
const { showWork = false } = defineProps<{ showWork?: boolean }>();
</script>

<template>
  <!-- 第 3 页推导图：光滑水平面上，物块在与运动方向相同的恒力 F 作用下发生位移 l，速度由 v₁ 增到 v₂（图 8.3-1 的示意）；
       v₁、v₂、F、l 都是题目给出的量，常显；showWork 打开后补出"W = Fl"的标注 -->
  <svg
    viewBox="0 0 640 300"
    width="100%"
    style="max-width: 760px"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="光滑水平面上物块在恒力作用下发生一段位移"
  >
    <SurfaceHatch :from="{ x: 30, y: 210 }" :to="{ x: 610, y: 210 }" side="below" :thickness="14" :gap="22" color="var(--c-text-dim)" :line-width="2.2" />
    <text x="600" y="196" font-size="15" fill="var(--c-text-dim)" text-anchor="end">光滑水平面</text>
    <rect x="90" y="158" width="64" height="52" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-accent)" stroke-width="2.2" />
    <text x="122" y="190" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text)" text-anchor="middle">m</text>
    <rect x="440" y="158" width="64" height="52" rx="6" fill="none" stroke="var(--c-accent)" stroke-width="2.2" stroke-dasharray="8 6" stroke-opacity="0.7" />
    <CourseArrow :from="{ x: 472, y: 184 }" :to="{ x: 578, y: 184 }" stroke="var(--c-force)" :stroke-width="3.4" label="F" :label-dy="-12" />
    <CourseArrow :from="{ x: 84, y: 132 }" :to="{ x: 156, y: 132 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
    <text
      x="120"
      y="116"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="18"
      fill="var(--c-velocity)"
      text-anchor="middle"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      <tspan>v</tspan>
      <tspan dy="4" font-family="KaTeX_Main" font-style="normal" font-size="13">1</tspan>
    </text>
    <CourseArrow :from="{ x: 434, y: 132 }" :to="{ x: 546, y: 132 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
    <text
      x="490"
      y="116"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="18"
      fill="var(--c-velocity)"
      text-anchor="middle"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      <tspan>v</tspan>
      <tspan dy="4" font-family="KaTeX_Main" font-style="normal" font-size="13">2</tspan>
    </text>
    <line x1="122" y1="214" x2="122" y2="252" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="5 5" />
    <line x1="472" y1="214" x2="472" y2="252" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="5 5" />
    <line x1="122" y1="252" x2="472" y2="252" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="122" y1="244" x2="122" y2="260" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="472" y1="244" x2="472" y2="260" stroke="var(--c-accent)" stroke-width="2.4" />
    <text
      x="297"
      y="243"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="20"
      fill="var(--c-accent)"
      text-anchor="middle"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      l
    </text>
    <g v-if="showWork">
      <text x="297" y="284" font-size="17" fill="var(--c-text)" text-anchor="middle">
        <tspan font-family="KaTeX_Math" font-style="italic">W</tspan>
        <tspan font-family="KaTeX_Main" font-style="normal">=</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic">Fl</tspan>
      </text>
    </g>
  </svg>
</template>
