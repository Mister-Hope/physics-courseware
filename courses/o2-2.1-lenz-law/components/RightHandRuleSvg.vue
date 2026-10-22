<!--
  第 12 页：导体棒切割磁感线（右手定则用图）。
  磁场垂直纸面向里（FieldDots），导体棒由虚线位置向右运动，
  回路中电流沿逆时针：棒中向上、上轨向左、左端向下、下轨向右。
  图按 16px 体系绘制（viewBox 340×205）。
-->
<template>
  <svg viewBox="0 0 340 205" xmlns="http://www.w3.org/2000/svg" class="rhr-svg">
    <!-- 磁场：垂直纸面向里 -->
    <FieldDots :x="40" :y="28" :cols="12" :rows="6" :spacing="24" :size="4" :opacity="0.45" />

    <!-- 导轨与左端 -->
    <g fill="none" stroke="var(--c-neutral-300)" stroke-width="2" stroke-linecap="round">
      <path d="M 60 58 H 255" />
      <path d="M 60 142 H 255" />
      <path d="M 60 58 V 142" />
    </g>

    <!-- 导体棒（虚线为运动前的位置） -->
    <line x1="150" y1="58" x2="150" y2="142" stroke="var(--c-neutral-500)" stroke-width="2" stroke-dasharray="6 4" />
    <line x1="215" y1="58" x2="215" y2="142" stroke="var(--c-neutral-200)" stroke-width="2.6" />

    <!-- 速度 -->
    <CourseArrow :from="{ x: 152, y: 170 }" :to="{ x: 215, y: 170 }" stroke="var(--c-velocity)" :stroke-width="2.4" :head-size="9" />
    <text x="183" y="163" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="11" fill="var(--c-velocity)">v</text>

    <!-- 感应电流：沿回路逆时针 -->
    <g>
      <CourseArrow :from="{ x: 215, y: 132 }" :to="{ x: 215, y: 68 }" stroke="var(--c-physics)" :stroke-width="2.2" :head-size="8" />
      <CourseArrow :from="{ x: 203, y: 58 }" :to="{ x: 74, y: 58 }" stroke="var(--c-physics)" :stroke-width="2.2" :head-size="8" />
      <CourseArrow :from="{ x: 60, y: 80 }" :to="{ x: 60, y: 122 }" stroke="var(--c-physics)" :stroke-width="2.2" :head-size="8" />
      <CourseArrow :from="{ x: 74, y: 142 }" :to="{ x: 203, y: 142 }" stroke="var(--c-physics)" :stroke-width="2.2" :head-size="8" />
    </g>
    <text x="244" y="88" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="11" fill="var(--c-physics)">I</text>
  </svg>
</template>
