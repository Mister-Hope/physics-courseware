<script setup lang="ts">
/** 第 1 页封面装饰（第一课时·功）：物块受斜向拉力 F、沿水平方向发生一段位移 x， 夹角 α 的弧画在"力的作用点＝物块几何中心"上——弧的两条边分别与位移方向、F 方向共线。 只表现"功"这一个意象（秒表 / W·t⁻¹ 之类功率内容属第二课时，不再出现在封面）。 */
const O = { x: 62, y: 106 }; // 物块几何中心：力与位移都从这里起笔
const ANG = (34 * Math.PI) / 180; // F 与位移方向的夹角
const F_LEN = 86;
const X_LEN = 92;
const R = 44; // 夹角弧半径
const fTip = { x: O.x + F_LEN * Math.cos(ANG), y: O.y - F_LEN * Math.sin(ANG) };
const xTip = { x: O.x + X_LEN, y: O.y };
const arcFrom = { x: O.x + R, y: O.y };
const arcTo = { x: O.x + R * Math.cos(ANG), y: O.y - R * Math.sin(ANG) };
const arcPath = `M ${arcFrom.x.toFixed(1)} ${arcFrom.y.toFixed(1)} A ${R} ${R} 0 0 0 ${arcTo.x.toFixed(1)} ${arcTo.y.toFixed(1)}`;
const alphaAt = { x: O.x + (R + 15) * Math.cos(ANG / 2), y: O.y - (R + 15) * Math.sin(ANG / 2) };
</script>

<template>
  <svg viewBox="0 0 230 150" width="205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="力与位移成角时做功的示意图">
    <SurfaceHatch :from="{ x: 20, y: 128 }" :to="{ x: 196, y: 128 }" side="below" :thickness="10" :gap="17" />
    <rect x="36" y="84" width="52" height="44" rx="9" fill="var(--c-surface-solid)" stroke="currentColor" stroke-width="2" opacity="0.85" />
    <CourseArrow :from="O" :to="xTip" stroke="var(--c-velocity)" :stroke-width="2.6" stroke-dasharray="8 6" label="x" :label-dy="-11" />
    <CourseArrow :from="O" :to="fTip" stroke="var(--c-accent)" :stroke-width="3.2" label="F" :label-dx="9" :label-dy="-12" />
    <path :d="arcPath" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.55" />
    <text :x="alphaAt.x" :y="alphaAt.y" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="currentColor" opacity="0.75">α</text>
  </svg>
</template>
