<!--
  第 5 页应用图之三：无线输电。
  教师整改要求：送电端、受电端各给两个"接线头"（引线末端是空心小圆），同一侧两个接线头之间画双向箭头，
  分别标 U_in / U_out，代替原来的"旋转虚线椭圆"（虚线弧容易被读成磁感线）。
  两只线圈用共享 Solenoid（连续螺旋线）：同轴横放、4 匝，phase=180 ⇒ 两端引线都从管截面下侧接出；
  引线竖直向下、止于空心圆接线头的上沿，两个接线头之间就是这一侧的端电压（双向箭头 + 符号标注）。
  两侧之间的耦合仍用柔和光区（课程样式 .coupling-glow），全图不出现任何虚线。
-->
<template>
  <svg viewBox="0 0 280 200" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="wp-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0.3" />
        <stop offset="55%" stop-color="var(--c-accent)" stop-opacity="0.12" />
        <stop offset="100%" stop-color="var(--c-accent)" stop-opacity="0" />
      </radialGradient>
    </defs>
    <!-- 两线圈之间的柔和光区（表示这一片有不均匀变化的磁场），不画线形 -->
    <g class="coupling-glow">
      <ellipse cx="140" cy="66" rx="62" ry="34" fill="url(#wp-glow)" />
    </g>
    <!-- 送电端线圈：4 匝、半径 40，从右端看顺时针；两端引线在下侧 (49,106) / (99,106) -->
    <Solenoid :x="74" :y="66" :length="50" :radius="40" :turns="4" direction="cw" :phase="180" :line-width="2.6" :back-opacity="0.32" />
    <!-- 受电端线圈：与送电端同轴、同绕向；两端引线在下侧 (181,106) / (231,106) -->
    <Solenoid
      :x="206"
      :y="66"
      :length="50"
      :radius="40"
      :turns="4"
      direction="cw"
      :phase="180"
      :line-width="2.6"
      :back-opacity="0.32"
      color="var(--c-accent-2)"
    />
    <!-- 引线：从线圈两端竖直向下，止于空心圆接线头的上沿 (y=137.4) -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
      <path d="M 49 106 V 137.4" />
      <path d="M 99 106 V 137.4" />
      <path d="M 181 106 V 137.4" />
      <path d="M 231 106 V 137.4" />
    </g>
    <!-- 接线头：引线末端的空心圆（r=4.2），端子间电压就跨在两个圆之间 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6">
      <circle cx="49" cy="141.6" r="4.2" />
      <circle cx="99" cy="141.6" r="4.2" />
      <circle cx="181" cy="141.6" r="4.2" />
      <circle cx="231" cy="141.6" r="4.2" />
    </g>
    <!-- 双向箭头：两个接线头之间（CourseArrow 只画单头，两根对向拼成双头） -->
    <CourseArrow :from="{ x: 74, y: 141.6 }" :to="{ x: 92, y: 141.6 }" stroke="var(--c-text-dim)" :stroke-width="1.8" :head-size="7" />
    <CourseArrow :from="{ x: 74, y: 141.6 }" :to="{ x: 56, y: 141.6 }" stroke="var(--c-text-dim)" :stroke-width="1.8" :head-size="7" />
    <CourseArrow :from="{ x: 206, y: 141.6 }" :to="{ x: 224, y: 141.6 }" stroke="var(--c-text-dim)" :stroke-width="1.8" :head-size="7" />
    <CourseArrow :from="{ x: 206, y: 141.6 }" :to="{ x: 188, y: 141.6 }" stroke="var(--c-text-dim)" :stroke-width="1.8" :head-size="7" />
    <!-- 端电压：U 用 KaTeX_Math 斜体（量），下标 in / out 用 KaTeX_Main 正体 -->
    <text x="74" y="167" text-anchor="middle" font-size="16" fill="var(--c-accent)">
      <tspan font-family="KaTeX_Math" font-style="italic">U</tspan>
      <tspan font-family="KaTeX_Main" font-size="10" dy="3.4">in</tspan>
    </text>
    <text x="206" y="167" text-anchor="middle" font-size="16" fill="var(--c-accent-2)">
      <tspan font-family="KaTeX_Math" font-style="italic">U</tspan>
      <tspan font-family="KaTeX_Main" font-size="10" dy="3.4">out</tspan>
    </text>
    <text x="74" y="190" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">送电端</text>
    <text x="206" y="190" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">受电端</text>
  </svg>
</template>
