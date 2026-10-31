<!--
  封面装饰：线圈中的交变电流 → 交变磁场 → 整块金属中的一圈圈涡流。
  线圈用共享 Solenoid（连续螺旋线，不是一叠椭圆）；金属块画成板 + 板内的涡流闭合回路（回路本身就该是一圈圈闭合线）。
-->
<template>
  <svg
    viewBox="0 0 300 170"
    width="300"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="涡流"
  >
    <defs>
      <radialGradient id="ed-cover-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0.3" />
        <stop offset="100%" stop-color="var(--c-accent)" stop-opacity="0" />
      </radialGradient>
    </defs>
    <circle cx="222" cy="84" r="86" fill="url(#ed-cover-glow)" />
    <!-- 整块金属：涡流在板内一圈圈闭合 -->
    <rect
      x="158"
      y="40"
      width="130"
      height="88"
      rx="10"
      fill="rgb(148 163 184 / 10%)"
      stroke="var(--c-text-dim)"
      stroke-width="1.6"
    />
    <g fill="none" stroke="var(--c-accent-2)" stroke-width="2" stroke-dasharray="7 5" opacity="0.8">
      <ellipse cx="222" cy="84" rx="52" ry="30" />
      <ellipse cx="222" cy="84" rx="33" ry="19" />
      <ellipse cx="222" cy="84" rx="15" ry="9" />
    </g>
    <!-- 线圈的两端接出，中间是交变电流的符号 -->
    <g fill="none" stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round">
      <path d="M 12 120 V 146 H 34" />
      <path d="M 34 146 q 6 -9 12 0 q 6 9 12 0 q 6 -9 12 0 q 6 9 12 0" />
      <path d="M 82 146 H 104 V 120" />
    </g>
    <!-- 线圈：共享 Solenoid，连续螺旋线；phase 180 + 4 整匝 ⇒ 两端都落在下端 (12,120) / (104,120) -->
    <Solenoid
      :x="58"
      :y="96"
      :length="92"
      :radius="24"
      :turns="4"
      direction="ccw"
      :phase="180"
      :line-width="2.5"
      :back-opacity="0.4"
      back-dash
    />
    <!-- 交变磁场穿过金属块 -->
    <g
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="1.6"
      stroke-dasharray="4 5"
      opacity="0.45"
    >
      <path d="M 112 76 C 128 62 140 56 158 56" />
      <path d="M 112 110 C 128 124 140 130 158 130" />
    </g>
  </svg>
</template>
