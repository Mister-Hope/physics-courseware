<!--
  第 12 页（P12）：例 2 一原两副理想变压器示意图（常显题面图，不含答案数值）。
  原线圈 n1 = 1100 匝接 U1 = 220 V 交流电源；
  副线圈 a（n2a = 100 匝）接 Ra = 10 Ω，副线圈 b（n2b = 200 匝）接 Rb = 20 Ω。
-->
<template>
  <svg viewBox="0 0 380 240" width="286" height="180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 闭合铁芯 -->
    <path
      d="M 116 28 H 248 V 212 H 116 Z M 146 56 V 184 H 218 V 56 Z"
      fill="var(--c-surface-solid)"
      fill-rule="evenodd"
      stroke="var(--c-neutral-500)"
      stroke-width="2"
    />
    <!-- 原线圈（左，1100 匝） -->
    <Solenoid
      :x="131"
      :y="120"
      :length="92"
      :radius="22"
      :turns="7"
      direction="ccw"
      orientation="vertical"
      :phase="180"
      :line-width="2.5"
      :back-opacity="0.32"
      color="var(--c-accent-2)"
    />
    <!-- 副线圈 a（右上，100 匝） -->
    <Solenoid
      :x="233"
      :y="84"
      :length="42"
      :radius="20"
      :turns="3"
      direction="cw"
      orientation="vertical"
      :phase="0"
      :line-width="2.4"
      :back-opacity="0.32"
      color="var(--c-physics)"
    />
    <!-- 副线圈 b（右下，200 匝） -->
    <Solenoid
      :x="233"
      :y="156"
      :length="46"
      :radius="20"
      :turns="4"
      direction="cw"
      orientation="vertical"
      :phase="0"
      :line-width="2.4"
      :back-opacity="0.32"
      color="var(--c-accent)"
    />
    <!-- 原线圈回路：U1 = 220 V -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 109 74 H 50 V 104" />
      <path d="M 50 136 V 166 H 109" />
    </g>
    <circle cx="50" cy="120" r="16" fill="none" stroke="var(--c-accent-2)" stroke-width="1.8" />
    <path d="M 41 120 q 4.5 -7 9 0 t 9 0" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" />
    <text x="50" y="190" text-anchor="middle" font-size="13" fill="var(--c-accent-2)">
      <tspan font-family="KaTeX_Math" font-style="italic">U</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Main">1</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 220 V</tspan>
    </text>
    <text x="131" y="230" text-anchor="middle" font-size="13" fill="var(--c-accent-2)">
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Main">1</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 1100</tspan>
    </text>
    <!-- 副线圈 a 回路：Ra = 10 Ω -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.5" stroke-linecap="round">
      <path d="M 253 63 H 314 V 66" />
      <path d="M 314 102 V 105 H 253" />
    </g>
    <CircuitResistor :x="314" :y="84" :length="36" orientation="vertical" color="var(--c-physics)" />
    <text x="348" y="88" text-anchor="middle" font-size="13" fill="var(--c-physics)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Math" font-style="italic">a</tspan>
    </text>
    <text x="278" y="54" text-anchor="middle" font-size="12" fill="var(--c-physics)">
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Main">2</tspan>
      <tspan font-size="10" font-family="KaTeX_Math" font-style="italic">a</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 100</tspan>
    </text>
    <!-- 副线圈 b 回路：Rb = 20 Ω -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.5" stroke-linecap="round">
      <path d="M 253 133 H 314 V 138" />
      <path d="M 314 174 V 179 H 253" />
    </g>
    <CircuitResistor :x="314" :y="156" :length="36" orientation="vertical" color="var(--c-accent)" />
    <text x="348" y="160" text-anchor="middle" font-size="13" fill="var(--c-accent)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Math" font-style="italic">b</tspan>
    </text>
    <text x="278" y="200" text-anchor="middle" font-size="12" fill="var(--c-accent)">
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Main">2</tspan>
      <tspan font-size="10" font-family="KaTeX_Math" font-style="italic">b</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 200</tspan>
    </text>
  </svg>
</template>
