<!--
  例 1 手机充电器中的降压变压器示意图（常显题面图，不含答案数值，13-Gemini4修改清单.md §6 样式精修）。
  原线圈 n1 = 1100 匝接 U1 = 220 V 交流电源；副线圈 n2 = 25 匝接 R = 5 Ω 负载电阻。
-->
<template>
  <svg viewBox="0 0 360 226" width="312" height="196" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="ex1-core-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#475569" />
        <stop offset="50%" stop-color="#334155" />
        <stop offset="100%" stop-color="#1e293b" />
      </linearGradient>
    </defs>

    <!-- 闭合硅钢铁芯（带圆角、金属光泽与内部闭合磁路虚线框） -->
    <path
      d="M 116 36 H 244 V 178 H 116 Z M 148 66 V 148 H 212 V 66 Z"
      fill="url(#ex1-core-grad)"
      fill-rule="evenodd"
      stroke="#94a3b8"
      stroke-width="1.8"
      stroke-linejoin="round"
    />
    <rect x="132" y="51" width="96" height="112" rx="5" fill="none" stroke="var(--c-accent)" stroke-width="1.3" stroke-dasharray="5 4" opacity="0.65" />

    <!-- 原线圈（左，1100 匝） -->
    <Solenoid
      :x="132"
      :y="107"
      :length="74"
      :radius="22"
      :turns="7"
      direction="ccw"
      orientation="vertical"
      :phase="180"
      :line-width="2.5"
      :back-opacity="0.32"
      color="var(--c-accent-2)"
    />

    <!-- 副线圈（右，25 匝） -->
    <Solenoid
      :x="228"
      :y="107"
      :length="62"
      :radius="22"
      :turns="3"
      direction="cw"
      orientation="vertical"
      :phase="0"
      :line-width="2.6"
      :back-opacity="0.32"
      color="var(--c-physics)"
    />

    <!-- 原线圈左侧回路：U1 = 220 V 交流源 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 110 70 H 50 V 90" />
      <path d="M 50 124 V 144 H 110" />
    </g>
    <circle cx="110" cy="70" r="2.8" fill="var(--c-accent-2)" />
    <circle cx="110" cy="144" r="2.8" fill="var(--c-accent-2)" />

    <circle cx="50" cy="107" r="17" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="2" />
    <path d="M 41 107 q 4.5 -7 9 0 t 9 0" fill="none" stroke="var(--c-accent)" stroke-width="2.1" stroke-linecap="round" />

    <text x="50" y="168" text-anchor="middle" font-size="13.5" font-weight="600" fill="var(--c-accent-2)">
      <tspan font-family="KaTeX_Math" font-style="italic">U</tspan>
      <tspan dy="3" font-size="10.5" font-family="KaTeX_Main">1</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 220 V</tspan>
    </text>

    <rect x="88" y="188" width="88" height="22" rx="5" fill="var(--c-accent-2-soft)" />
    <text x="132" y="203" text-anchor="middle" font-size="13" font-weight="700" fill="var(--c-accent-2)">
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Main">1</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 1100</tspan>
    </text>

    <!-- 副线圈右侧回路：负载 R = 5 Ω -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 250 76 H 310 V 83" />
      <path d="M 310 131 V 138 H 250" />
    </g>
    <circle cx="250" cy="76" r="2.8" fill="var(--c-physics)" />
    <circle cx="250" cy="138" r="2.8" fill="var(--c-physics)" />

    <CircuitResistor :x="310" :y="107" orientation="vertical" color="var(--c-physics)" label="R" />

    <text x="310" y="168" text-anchor="middle" font-size="13.5" font-weight="600" fill="var(--c-physics)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main"> = 5 Ω</tspan>
    </text>

    <rect x="188" y="188" width="80" height="22" rx="5" fill="rgba(45, 212, 191, 0.12)" />
    <text x="228" y="203" text-anchor="middle" font-size="13" font-weight="700" fill="var(--c-physics)">
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Main">2</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 25</tspan>
    </text>
  </svg>
</template>
