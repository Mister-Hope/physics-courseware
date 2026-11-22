<!--
  第 11 页（P11）：例 1 手机充电器中的降压变压器示意图（常显题面图，不含答案数值）。
  原线圈 n1 = 1100 匝接 U1 = 220 V 交流电源；副线圈 n2 = 25 匝接 R = 5 Ω 负载电阻。
-->
<template>
  <svg viewBox="0 0 360 220" width="310" height="190" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 闭合铁芯 -->
    <path
      d="M 118 40 H 242 V 180 H 118 Z M 148 68 V 152 H 212 V 68 Z"
      fill="var(--c-surface-solid)"
      fill-rule="evenodd"
      stroke="var(--c-neutral-500)"
      stroke-width="2"
    />
    <!-- 原线圈（左，1100 匝） -->
    <Solenoid
      :x="133"
      :y="110"
      :length="74"
      :radius="22"
      :turns="6"
      direction="ccw"
      orientation="vertical"
      :phase="180"
      :line-width="2.6"
      :back-opacity="0.32"
      color="var(--c-accent-2)"
    />
    <!-- 副线圈（右，25 匝） -->
    <Solenoid
      :x="227"
      :y="110"
      :length="64"
      :radius="22"
      :turns="3"
      direction="cw"
      orientation="vertical"
      :phase="0"
      :line-width="2.6"
      :back-opacity="0.32"
      color="var(--c-physics)"
    />
    <!-- 原线圈左侧回路：220 V 交流源 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 111 73 H 52 V 94" />
      <path d="M 52 126 V 147 H 111" />
    </g>
    <circle cx="52" cy="110" r="16" fill="none" stroke="var(--c-accent-2)" stroke-width="1.8" />
    <path d="M 43 110 q 4.5 -7 9 0 t 9 0" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" />
    <text x="52" y="172" text-anchor="middle" font-size="14" fill="var(--c-accent-2)">
      <tspan font-family="KaTeX_Math" font-style="italic">U</tspan>
      <tspan dy="3" font-size="11" font-family="KaTeX_Main">1</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 220 V</tspan>
    </text>
    <text x="133" y="202" text-anchor="middle" font-size="14" fill="var(--c-accent-2)">
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan>
      <tspan dy="3" font-size="11" font-family="KaTeX_Main">1</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 1100</tspan>
    </text>
    <!-- 副线圈右侧回路：负载 R = 5 Ω -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 249 78 H 308 V 86" />
      <path d="M 308 134 V 142 H 249" />
    </g>
    <CircuitResistor :x="308" :y="110" orientation="vertical" color="var(--c-physics)" label="R" />
    <text x="308" y="172" text-anchor="middle" font-size="14" fill="var(--c-physics)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main"> = 5 Ω</tspan>
    </text>
    <text x="227" y="202" text-anchor="middle" font-size="14" fill="var(--c-physics)">
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan>
      <tspan dy="3" font-size="11" font-family="KaTeX_Main">2</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 25</tspan>
    </text>
  </svg>
</template>
