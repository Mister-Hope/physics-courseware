<!--
  封面装饰：条形磁体稍向线圈中插入，线圈接电流表 —— 本课主题（磁通量变化 → 感应电动势）的母题。
  只作装饰，不承担教学信息。
-->
<template>
  <svg
    viewBox="0 0 280 180"
    width="320"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="磁体插入线圈，线圈接电流表"
  >
    <defs>
      <radialGradient id="fl-cover-halo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0.16" />
        <stop offset="100%" stop-color="var(--c-accent)" stop-opacity="0" />
      </radialGradient>
    </defs>

    <!-- 线圈处的柔光 -->
    <ellipse cx="150" cy="92" rx="80" ry="64" fill="url(#fl-cover-halo)" />

    <!-- 线圈（三匝） -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round">
      <ellipse cx="132" cy="92" rx="9" ry="44" opacity="0.5" />
      <ellipse cx="148" cy="92" rx="9" ry="44" opacity="0.8" />
      <ellipse cx="164" cy="92" rx="9" ry="44" />
    </g>

    <!-- 引线接电流表 -->
    <g
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.8"
      stroke-linecap="round"
      opacity="0.9"
    >
      <path d="M 132 136 V 146 H 206" />
      <path d="M 164 136 V 160 H 206" />
    </g>

    <!-- 电流表：表盘 + 偏转的指针 -->
    <circle cx="221" cy="153" r="15" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <text
      x="221"
      y="143"
      text-anchor="middle"
      font-family="KaTeX_Main, serif"
      font-size="9"
      fill="var(--c-text-dim)"
    >
      G
    </text>
    <line
      x1="221"
      y1="162"
      x2="229"
      y2="149"
      stroke="var(--c-accent)"
      stroke-width="1.8"
      stroke-linecap="round"
    />
    <circle cx="221" cy="162" r="2.2" fill="var(--c-text)" />

    <!-- 条形磁体：S 蓝、N 红 -->
    <rect x="52" y="82" width="24" height="24" rx="2" fill="var(--c-velocity)" />
    <rect x="76" y="82" width="24" height="24" rx="2" fill="var(--c-danger)" />
    <text
      x="64"
      y="99"
      text-anchor="middle"
      font-family="KaTeX_Main, serif"
      font-size="10"
      fill="var(--c-bg-soft)"
    >
      S
    </text>
    <text
      x="88"
      y="99"
      text-anchor="middle"
      font-family="KaTeX_Main, serif"
      font-size="10"
      fill="var(--c-bg-soft)"
    >
      N
    </text>

    <!-- 插入方向 -->
    <CourseArrow
      :from="{ x: 106, y: 94 }"
      :to="{ x: 120, y: 94 }"
      stroke="var(--c-text-dim)"
      :stroke-width="2"
    />
  </svg>
</template>
