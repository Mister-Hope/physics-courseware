<!--
  P6 配图：n 匝线圈串联 —— 穿过每匝的磁通量相同，整个线圈的电动势是单匝的 n 倍。
  线圈用共享 Solenoid（轴水平、一条连续螺旋线；4 匝整数 ⇒ 两端都在上端 (77,40) / (149,40)）。
-->
<template>
  <svg viewBox="0 0 240 170" xmlns="http://www.w3.org/2000/svg" class="w-full">
    <!-- 磁通量方向 -->
    <line x1="28" y1="80" x2="190" y2="80" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />
    <CourseArrow :from="{ x: 190, y: 80 }" :to="{ x: 216, y: 80 }" stroke="var(--c-text-dim)" :stroke-width="1.4" />
    <text x="202" y="70" text-anchor="middle" font-family="KaTeX_Math, serif" font-style="italic" font-size="15" fill="var(--c-text-dim)">Φ</text>

    <!-- 线圈：4 匝（共享 Solenoid，连续螺旋线） -->
    <Solenoid :x="113" :y="80" :length="72" :radius="40" :turns="4" direction="cw" :phase="0" :line-width="3" :back-opacity="0.35" />

    <text x="113" y="140" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">
      <tspan font-family="KaTeX_Math, serif" font-style="italic" font-size="17" fill="var(--c-accent)">n</tspan>
      <tspan dx="2">匝</tspan>
    </text>
    <text x="120" y="160" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">每匝磁通量相同</text>
  </svg>
</template>
