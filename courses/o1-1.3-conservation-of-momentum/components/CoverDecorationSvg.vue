<!--
  封面装饰：光滑水平面上的两个物体相向接近、碰撞后交换动量，上方一条总动量长箭头标示"总动量不变"。
  动量箭头长度按示意值给出，不参与计算。
-->
<template>
  <svg viewBox="0 0 340 200" width="340" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 水平面 -->
    <line x1="24" y1="152" x2="316" y2="152" stroke="var(--c-neutral-500)" stroke-width="2" stroke-linecap="round" />
    <!-- 总动量（不变）：上方长箭头 -->
    <CourseArrow :from="{ x: 96, y: 34 }" :to="{ x: 244, y: 34 }" stroke="var(--c-text-dim)" stroke-width="2" stroke-dasharray="7 5" opacity="0.7" />
    <text x="170" y="24" text-anchor="middle" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="15">p</text>
    <!-- 物体 A（金）与 B（蓝） -->
    <g>
      <rect x="196" y="106" width="76" height="46" rx="8" fill="rgba(226, 168, 70, 0.16)" stroke="var(--c-accent)" stroke-width="2" />
      <text x="234" y="136" text-anchor="middle" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="20">A</text>
      <rect x="68" y="106" width="76" height="46" rx="8" fill="rgba(96, 165, 250, 0.16)" stroke="var(--c-velocity)" stroke-width="2" />
      <text x="106" y="136" text-anchor="middle" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="20">B</text>
    </g>
    <!-- 碰后速度示意：A 变快、B 变慢 -->
    <g stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" fill="none">
      <path d="M 204 90 H 268" />
      <path d="M 262 84 L 270 90 L 262 96" />
      <path d="M 76 90 H 116" />
      <path d="M 110 84 L 118 90 L 110 96" />
    </g>
    <!-- 碰撞闪光 -->
    <g stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round" opacity="0.65">
      <path d="M 170 62 v -12" />
      <path d="M 170 130 v 12" />
      <path d="M 158 70 l -8 -8" />
      <path d="M 182 70 l 8 -8" />
    </g>
  </svg>
</template>
