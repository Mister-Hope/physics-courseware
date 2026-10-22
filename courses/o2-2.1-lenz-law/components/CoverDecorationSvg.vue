<!--
  封面装饰：条形磁体（上 S 下 N）从上方插入螺线管，线圈渗出感应电流。
  图按 16px 体系绘制（viewBox 240×150），放在封面右下角。
-->
<template>
  <svg viewBox="0 0 240 150" width="270" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 螺线管：三匝同心椭圆 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="2.4" opacity="0.85">
      <ellipse cx="120" cy="98" rx="66" ry="28" />
      <ellipse cx="120" cy="98" rx="53" ry="22" />
      <ellipse cx="120" cy="98" rx="40" ry="17" />
    </g>

    <!-- 条形磁体：上 S 下 N -->
    <rect x="107" y="8" width="26" height="26" rx="3" fill="var(--c-velocity)" />
    <rect x="107" y="34" width="26" height="26" rx="3" fill="var(--c-danger)" />
    <text x="120" y="27" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="var(--c-bg)">S</text>
    <text x="120" y="53" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="var(--c-bg)">N</text>

    <!-- 插入方向 -->
    <CourseArrow :from="{ x: 158, y: 16 }" :to="{ x: 158, y: 50 }" stroke="var(--c-text-dim)" :stroke-width="2" :head-size="8" />

    <!-- 感应电流：沿线圈上下两侧的切向箭头（近侧向右、远侧向左） -->
    <CourseArrow :from="{ x: 84, y: 132 }" :to="{ x: 150, y: 132 }" stroke="var(--c-physics)" :stroke-width="2.6" :head-size="8" />
    <CourseArrow :from="{ x: 156, y: 64 }" :to="{ x: 90, y: 64 }" stroke="var(--c-physics)" :stroke-width="2.6" :head-size="8" />
  </svg>
</template>
