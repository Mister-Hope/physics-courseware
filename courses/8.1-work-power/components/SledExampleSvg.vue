<script setup lang="ts">
/** 第 7 页例题图（教材图 8.1-3）：水平地面上的雪橇，受与水平成 37° 的拉力 F 与阻力 F_阻。 干净版只画题干给出的量（F、37°、F_阻、位移 l）；点击后再补上重力 G、支持力 F_N 与拉力的两个分力。 */
const { showForces = false } = defineProps<{
  /** 点击后出现：G、F_N 与拉力的水平分力 F_x、竖直分力 F_y */
  showForces?: boolean;
}>();

/** 雪橇的几何中心：三个力与两个分力都从这里出发 */
const C = { x: 210, y: 224 };
const F_TIP = { x: 362, y: 110 };
const FOOT = { x: 362, y: 224 };
</script>

<template>
  <svg viewBox="20 80 520 230" width="340" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="雪橇受斜向拉力与阻力在水平地面上移动">
    <SurfaceHatch :from="{ x: 24, y: 250 }" :to="{ x: 536, y: 250 }" side="below" :thickness="14" :gap="23" />
    <rect x="150" y="198" width="120" height="52" rx="8" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <path d="M 268 224 A 58 58 0 0 0 256.3 189.1" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <text x="274" y="203" font-family="KaTeX_Main" font-size="16" fill="var(--c-text-dim)" class="sel-lbl">
      37
      <tspan font-size="12" dy="-7">∘</tspan>
    </text>
    <CourseArrow
      :from="{ x: 300, y: 300 }"
      :to="{ x: 520, y: 300 }"
      stroke="var(--c-velocity)"
      :stroke-width="2.8"
      stroke-dasharray="8 6"
      label="x"
      :label-dy="-11"
    />
    <CourseArrow :from="C" :to="F_TIP" stroke="var(--c-accent)" :stroke-width="3.4" label="F" :label-dx="10" :label-dy="-12" />
    <CourseArrow :from="C" :to="{ x: 60, y: 224 }" stroke="var(--c-force)" :stroke-width="3" />
    <text x="128" y="208" font-size="19" fill="var(--c-force)" class="sel-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Main" font-size="13" dy="5">阻</tspan>
    </text>
    <g v-if="showForces">
      <CourseArrow :from="C" :to="{ x: 210, y: 308 }" stroke="var(--c-force)" :stroke-width="3" />
      <CourseArrow :from="C" :to="{ x: 210, y: 140 }" stroke="var(--c-physics)" :stroke-width="3" />
      <CourseArrow :from="C" :to="FOOT" stroke="var(--c-accent)" :stroke-width="2.8" stroke-dasharray="9 6" />
      <CourseArrow :from="FOOT" :to="F_TIP" stroke="var(--c-accent)" :stroke-width="2.8" stroke-dasharray="9 6" />
      <path d="M 340 224 L 340 202 L 362 202" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
      <text x="222" y="302" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-force)" class="sel-lbl">G</text>
      <text x="222" y="152" font-size="19" fill="var(--c-physics)" class="sel-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="13" dy="5">N</tspan>
      </text>
      <text x="272" y="248" font-size="19" fill="var(--c-accent)" class="sel-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="13" dy="5">x</tspan>
      </text>
      <text x="374" y="176" font-size="19" fill="var(--c-accent)" class="sel-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="13" dy="5">y</tspan>
      </text>
    </g>
  </svg>
</template>

<style scoped>
.sel-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
