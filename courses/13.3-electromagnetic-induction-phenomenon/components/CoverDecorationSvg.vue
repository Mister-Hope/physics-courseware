<!--
  封面装饰：条形磁铁沿轴插入线圈 —— 电磁感应的标志性画面。
  磁铁（S 蓝 / N 红，共享 BarMagnet）向右运动（金色箭头），右侧螺线管（共享 Solenoid：连续螺旋线，
  从右端看顺时针绕向）的两端引出导线接到灵敏电流计（共享 Galvanometer，导线止于左右接线柱）。
-->
<template>
  <svg viewBox="0 0 260 170" width="360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 条形磁铁：S 在左、N 在右 -->
    <BarMagnet :x="58" :y="66" :length="76" :width="24" n-side="right" />
    <!-- 插入方向 -->
    <CourseArrow :from="{ x: 104, y: 66 }" :to="{ x: 132, y: 66 }" stroke="var(--c-accent)" :stroke-width="3.2" />
    <!-- 螺线管：从右端看顺时针；4 匝（整数）+ phase 180 ⇒ 两端都落在下端 (146,89) / (226,89) -->
    <Solenoid :x="186" :y="64" :length="80" :radius="25" :turns="4" direction="cw" :phase="180" :line-width="2.5" :back-opacity="0.4" back-dash />
    <!-- 引线与灵敏电流计（导线止于表盘左右接线柱 170 / 202） -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
      <path d="M 146 89 H 136 Q 132 89 132 93 V 140 H 170" />
      <path d="M 226 89 H 236 Q 240 89 240 93 V 140 H 202" />
    </g>
    <Galvanometer :x="186" :y="140" :r="16" :angle="0" />
  </svg>
</template>
