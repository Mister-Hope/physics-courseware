<script setup lang="ts">
/** 第 22 页封面装饰（第二课时·功率）：物块以速度 v 前进、牵引力 F 沿运动方向， 上方给出 P = Fv —— 这一课时讲的就是"做功的快慢"以及它与力、速度的关系。 与第一课时封面同一套画法：物块落在地面上、力从几何中心起笔、速度画在旁侧。 */
const O = { x: 62, y: 106 }; // 物块几何中心：牵引力从这里起笔
const F_LEN = 92;
const fTip = { x: O.x + F_LEN, y: O.y };
const V_FROM = { x: 74, y: 70 }; // 速度画在旁侧（不必落在物体上）
const V_LEN = 92;
const vTip = { x: V_FROM.x + V_LEN, y: V_FROM.y };
</script>

<template>
  <svg viewBox="0 0 230 150" width="205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="物体以速度 v 前进、牵引力沿运动方向，功率等于力与速度的乘积">
    <SurfaceHatch :from="{ x: 20, y: 128 }" :to="{ x: 196, y: 128 }" side="below" :thickness="10" :gap="17" />
    <rect x="36" y="84" width="52" height="44" rx="9" fill="var(--c-surface-solid)" stroke="currentColor" stroke-width="2" opacity="0.85" />
    <CourseArrow :from="O" :to="fTip" stroke="var(--c-accent)" :stroke-width="3.2" label="F" :label-dy="-12" />
    <CourseArrow :from="V_FROM" :to="vTip" stroke="var(--c-velocity)" :stroke-width="2.4" stroke-dasharray="8 6" label="v" :label-dy="-11" />
    <text x="168" y="38" text-anchor="middle" font-size="18" fill="currentColor" opacity="0.8">
      <tspan font-family="KaTeX_Math" font-style="italic">P</tspan>
      <tspan font-family="KaTeX_Main">=</tspan>
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
    </text>
  </svg>
</template>
