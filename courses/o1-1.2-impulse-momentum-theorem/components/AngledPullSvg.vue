<!-- 第 14 页：水平地面上的物体受斜向上恒力 F，力与水平方向成 θ 角；不画摩擦力等分析量。 -->
<template>
  <svg viewBox="0 0 420 220" width="420" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 20, y: 180 }" :to="{ x: 400, y: 180 }" side="below" />
    <rect x="150" y="120" width="70" height="60" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-border-glow)" stroke-width="1.6" />
    <line x1="185" y1="150" x2="292" y2="150" stroke="var(--c-text-mute)" stroke-width="1.2" stroke-dasharray="4 4" />
    <path d="M 235 150 Q 232 134 227 123" fill="none" stroke="var(--c-accent)" stroke-width="1.5" />
    <text x="242" y="139" fill="var(--c-accent)" font-family="KaTeX_Math, serif" font-size="16" font-style="italic">θ</text>
    <CourseArrow :from="{ x: 185, y: 150 }" :to="{ x: 280, y: 90 }" stroke="var(--c-accent)" :stroke-width="2.6" label="F" :label-dy="-10" />
  </svg>
</template>
