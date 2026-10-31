<!--
  封面装饰：条形磁体向右插入螺线管，螺线管两端接灵敏电流计 —— 本课主题（磁通量变化 → 感应电动势）的母题。
  只作装饰，不承担教学信息。
  图元全部用共享组件：磁体 BarMagnet、线圈 Solenoid（一条连续螺旋线，不是一叠椭圆）、表盘 Galvanometer。
-->
<template>
  <svg
    viewBox="0 0 280 180"
    width="320"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="磁体插入线圈，线圈接灵敏电流计"
  >
    <defs>
      <radialGradient id="fl-cover-halo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0.16" />
        <stop offset="100%" stop-color="var(--c-accent)" stop-opacity="0" />
      </radialGradient>
    </defs>

    <!-- 线圈处的柔光 -->
    <ellipse cx="172" cy="80" rx="88" ry="62" fill="url(#fl-cover-halo)" />

    <!-- 条形磁体：S 在左、N 在右，沿轴插入线圈 -->
    <BarMagnet :x="58" :y="78" :length="76" :width="24" n-side="right" :label-size="15" />

    <!-- 插入方向 -->
    <CourseArrow
      :from="{ x: 102, y: 78 }"
      :to="{ x: 130, y: 78 }"
      stroke="var(--c-accent)"
      :stroke-width="3.2"
    />

    <!-- 螺线管：4 匝（整数匝 ⇒ 两端都在下端 (150,101) / (230,101)），引线从这里往下接 -->
    <Solenoid
      :x="190"
      :y="76"
      :length="80"
      :radius="25"
      :turns="4"
      direction="cw"
      :phase="180"
      :line-width="2.5"
      :back-opacity="0.4"
      back-dash
    />

    <!-- 引线与灵敏电流计（表盘圆心 188,148、r=16 ⇒ 左右接线柱 172 / 204） -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
      <path d="M 150 101 H 140 Q 136 101 136 105 V 148 H 172" />
      <path d="M 230 101 H 240 Q 244 101 244 105 V 148 H 204" />
    </g>
    <Galvanometer :x="188" :y="148" :r="16" :angle="0" />
  </svg>
</template>
