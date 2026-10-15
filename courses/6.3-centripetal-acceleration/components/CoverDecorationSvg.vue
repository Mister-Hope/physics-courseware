<!-- 封面右下角装饰：匀速圆周运动的小球 —— 速度沿切线（蓝），加速度指向圆心（金）。 -->
<!-- 几何：圆心 O(90,70)、r=44；小球位于圆上 P(122.1,39.9)（OP 方向单位向量 ≈ (0.730,-0.684)）。 -->
<!-- 两个箭头均自 P 起、长 28、互相垂直：v 沿切线 (0.684,0.730)，a 沿半径指向 O（离 O 尚余约 16 单位，不压 O 与圆心点）。 -->
<template>
  <svg viewBox="0 0 200 140" width="100%" xmlns="http://www.w3.org/2000/svg" opacity="0.9" role="img" aria-label="匀速圆周运动：速度沿切线，加速度指向圆心">
    <circle cx="90" cy="70" r="44" fill="none" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="6 6" opacity="0.6" />
    <CourseArrow
      :from="{ x: 122.1, y: 39.9 }"
      :to="{ x: 141.3, y: 60.3 }"
      stroke="var(--c-velocity)"
      :stroke-width="2.2"
      :head-size="10"
      stroke-linecap="round"
    />
    <CourseArrow
      :from="{ x: 122.1, y: 39.9 }"
      :to="{ x: 101.7, y: 59.1 }"
      stroke="var(--c-accent)"
      :stroke-width="2.2"
      :head-size="10"
      stroke-linecap="round"
    />
    <circle cx="122.1" cy="39.9" r="5.2" fill="var(--c-accent)" />
    <circle cx="90" cy="70" r="2.8" fill="var(--c-text-dim)" />
    <text
      x="81"
      y="84"
      text-anchor="end"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="17"
      fill="var(--c-text-dim)"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      O
    </text>
    <text
      x="150"
      y="67"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="17"
      fill="var(--c-velocity)"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      v
    </text>
    <text
      x="92"
      y="52"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="17"
      fill="var(--c-accent)"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      a
    </text>
  </svg>
</template>
