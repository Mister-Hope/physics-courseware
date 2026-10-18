<!--
  封面装饰：条形磁铁沿轴插入线圈 —— 电磁感应的标志性画面。
  磁铁（S 蓝 / N 红）向右运动（金色箭头），右侧螺线管的两端引出导线接到电流表。
-->
<template>
  <svg viewBox="0 0 260 170" width="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 条形磁铁：左半 S、右半 N -->
    <rect x="20" y="54" width="38" height="24" rx="3" fill="var(--c-velocity)" />
    <rect x="58" y="54" width="38" height="24" rx="3" fill="var(--c-danger)" />
    <text x="39" y="71" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="var(--c-bg-soft)">S</text>
    <text x="77" y="71" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="var(--c-bg-soft)">N</text>
    <!-- 插入方向 -->
    <CourseArrow :from="{ x: 104, y: 66 }" :to="{ x: 132, y: 66 }" stroke="var(--c-accent)" :stroke-width="3.2" />
    <!-- 螺线管：5 匝 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="2.6" opacity="0.9">
      <ellipse cx="150" cy="66" rx="9" ry="24" />
      <ellipse cx="168" cy="66" rx="9" ry="24" />
      <ellipse cx="186" cy="66" rx="9" ry="24" />
      <ellipse cx="204" cy="66" rx="9" ry="24" />
      <ellipse cx="222" cy="66" rx="9" ry="24" />
    </g>
    <!-- 引线与电流表 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
      <path d="M 150 90 V 140" />
      <path d="M 150 140 H 170" />
      <path d="M 222 90 V 140" />
      <path d="M 222 140 H 202" />
    </g>
    <CircuitMeter :x="186" :y="140" kind="a" :r="16" />
  </svg>
</template>
