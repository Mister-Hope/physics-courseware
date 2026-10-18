<!--
  猜想页（引课之后、Δv 推导之前）：匀速圆周运动的加速度可能沿哪个方向。
  物体在圆周最右端，虚线轨迹圆心为 O；三个候选方向都从物体出发（虚线箭头 = 猜测）：
  甲 —— 沿速度方向（该点切向，向下）；乙 —— 沿半径向外；丙 —— 指向圆心。
  v 标在甲箭头旁，提示甲就是速度方向；页面点击后由文字排除甲（速度大小不变）。
-->
<template>
  <svg
    viewBox="0 0 460 265"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    style="display: block; max-width: 38rem; margin: 0 auto"
    role="img"
    aria-label="加速度方向的猜想：甲沿速度方向、乙沿半径向外、丙指向圆心"
  >
    <circle cx="190" cy="150" r="95" fill="none" stroke="var(--c-physics)" stroke-width="2.4" stroke-dasharray="8 7" opacity="0.55" />
    <circle cx="190" cy="150" r="3.4" fill="var(--c-text-dim)" />
    <text x="181" y="169" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="23" fill="var(--c-text-dim)">O</text>
    <circle cx="285" cy="150" r="8" fill="var(--c-text)" stroke="var(--c-bg-soft)" stroke-width="1.6" />
    <CourseArrow :from="{ x: 285, y: 150 }" :to="{ x: 285, y: 240 }" stroke="var(--c-accent-2)" :stroke-width="3" stroke-dasharray="9 7" />
    <CourseArrow :from="{ x: 285, y: 150 }" :to="{ x: 383, y: 150 }" stroke="var(--c-accent-2)" :stroke-width="3" stroke-dasharray="9 7" />
    <CourseArrow :from="{ x: 285, y: 150 }" :to="{ x: 215, y: 150 }" stroke="var(--c-accent-2)" :stroke-width="3" stroke-dasharray="9 7" />
    <text
      x="271"
      y="192"
      text-anchor="end"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="22"
      fill="var(--c-velocity)"
      stroke="var(--c-bg-soft)"
      stroke-width="4"
      paint-order="stroke"
    >
      v
    </text>
    <text
      x="300"
      y="249"
      text-anchor="start"
      font-family="KaTeX_Main"
      font-size="24"
      fill="var(--c-accent-2)"
      stroke="var(--c-bg-soft)"
      stroke-width="4"
      paint-order="stroke"
    >
      甲
    </text>
    <text
      x="395"
      y="157"
      text-anchor="start"
      font-family="KaTeX_Main"
      font-size="24"
      fill="var(--c-accent-2)"
      stroke="var(--c-bg-soft)"
      stroke-width="4"
      paint-order="stroke"
    >
      乙
    </text>
    <text
      x="250"
      y="182"
      text-anchor="middle"
      font-family="KaTeX_Main"
      font-size="24"
      fill="var(--c-accent-2)"
      stroke="var(--c-bg-soft)"
      stroke-width="4"
      paint-order="stroke"
    >
      丙
    </text>
  </svg>
</template>
