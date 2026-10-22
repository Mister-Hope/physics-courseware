<!--
  第 6 页示意图：相邻电路的互感干扰。
  上面一根导线中电流变化，磁感线穿过下面的闭合回路 → 在下面激起感应电流。
-->
<template>
  <svg viewBox="30 20 380 215" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 上面的电路：电流在变化 -->
    <rect x="40" y="45" width="320" height="42" rx="10" fill="none" stroke="var(--c-text)" stroke-width="1.8" />
    <CourseArrow :from="{ x: 150, y: 45 }" :to="{ x: 230, y: 45 }" stroke="var(--c-accent-2)" :stroke-width="3" />
    <text x="190" y="33" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-accent-2)">
      I
      <tspan baseline-shift="sub" font-size="11">1</tspan>
    </text>

    <!-- 穿过去的磁场（串扰） -->
    <g fill="none" stroke="var(--c-danger)" stroke-width="1.7" stroke-dasharray="8 7" class="field-flow" opacity="0.75">
      <path d="M 120 87 C 110 108, 110 124, 120 145" />
      <path d="M 200 87 C 190 108, 190 124, 200 145" />
      <path d="M 280 87 C 270 108, 270 124, 280 145" />
    </g>
    <text x="338" y="120" text-anchor="middle" font-size="14" fill="var(--c-danger)">串扰</text>

    <!-- 下面的闭合回路：灯被"点"亮 -->
    <circle cx="200" cy="187" r="26" fill="var(--c-accent)" opacity="0.14" />
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
      <path d="M 178 187 H 50 A 10 10 0 0 1 40 177 V 155 A 10 10 0 0 1 50 145 H 350 A 10 10 0 0 1 360 155 V 177 A 10 10 0 0 1 350 187 H 222" />
    </g>
    <CircuitBulb :x="200" :y="187" :r="15" color="var(--c-accent)" fill="var(--c-bg)" :line-width="2.4" />
    <CourseArrow :from="{ x: 320, y: 168 }" :to="{ x: 250, y: 168 }" stroke="var(--c-accent)" :stroke-width="2.6" />

    <text x="200" y="222" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">另一条闭合回路</text>
  </svg>
</template>
