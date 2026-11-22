<!--
  例 2 一原两副理想变压器示意图（常显题面图，不含答案数值，13-Gemini4修改清单.md §6 样式精修）。
  原线圈 n1 = 1100 匝接 U1 = 220 V 交流电源；
  副线圈 a（n2a = 100 匝）接 Ra = 10 Ω，副线圈 b（n2b = 200 匝）接 Rb = 20 Ω。
-->
<template>
  <svg viewBox="0 0 384 242" width="292" height="184" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="ex2-core-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#475569" />
        <stop offset="50%" stop-color="#334155" />
        <stop offset="100%" stop-color="#1e293b" />
      </linearGradient>
    </defs>

    <!-- 闭合硅钢铁芯（带圆角与内部闭合磁路虚线回路） -->
    <path
      d="M 116 26 H 248 V 208 H 116 Z M 146 54 V 180 H 218 V 54 Z"
      fill="url(#ex2-core-grad)"
      fill-rule="evenodd"
      stroke="#94a3b8"
      stroke-width="1.8"
      stroke-linejoin="round"
    />
    <rect x="131" y="40" width="102" height="154" rx="5" fill="none" stroke="var(--c-accent)" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.6" />

    <!-- 原线圈（左，1100 匝） -->
    <Solenoid
      :x="131"
      :y="117"
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
      :y="82"
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
      :y="154"
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
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 109 71 H 48 V 100" />
      <path d="M 48 134 V 163 H 109" />
    </g>
    <circle cx="109" cy="71" r="2.6" fill="var(--c-accent-2)" />
    <circle cx="109" cy="163" r="2.6" fill="var(--c-accent-2)" />

    <circle cx="48" cy="117" r="17" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="2" />
    <path d="M 39 117 q 4.5 -7 9 0 t 9 0" fill="none" stroke="var(--c-accent)" stroke-width="2.1" stroke-linecap="round" />

    <text x="48" y="186" text-anchor="middle" font-size="13" font-weight="600" fill="var(--c-accent-2)">
      <tspan font-family="KaTeX_Math" font-style="italic">U</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Main">1</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 220 V</tspan>
    </text>

    <rect x="87" y="214" width="88" height="20" rx="5" fill="var(--c-accent-2-soft)" />
    <text x="131" y="228" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--c-accent-2)">
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Main">1</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 1100</tspan>
    </text>

    <!-- 副线圈 a 回路：Ra = 10 Ω -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 253 61 H 316 V 64" />
      <path d="M 316 100 V 103 H 253" />
    </g>
    <circle cx="253" cy="61" r="2.5" fill="var(--c-physics)" />
    <circle cx="253" cy="103" r="2.5" fill="var(--c-physics)" />
    <CircuitResistor :x="316" :y="82" :length="36" orientation="vertical" color="var(--c-physics)" />
    <text x="352" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="var(--c-physics)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Math" font-style="italic">a</tspan>
    </text>
    <text x="282" y="51" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c-physics)">
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Main">2</tspan>
      <tspan font-size="10" font-family="KaTeX_Math" font-style="italic">a</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 100</tspan>
    </text>

    <!-- 副线圈 b 回路：Rb = 20 Ω -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 253 131 H 316 V 136" />
      <path d="M 316 172 V 177 H 253" />
    </g>
    <circle cx="253" cy="131" r="2.5" fill="var(--c-accent)" />
    <circle cx="253" cy="177" r="2.5" fill="var(--c-accent)" />
    <CircuitResistor :x="316" :y="154" :length="36" orientation="vertical" color="var(--c-accent)" />
    <text x="352" y="158" text-anchor="middle" font-size="13" font-weight="700" fill="var(--c-accent)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Math" font-style="italic">b</tspan>
    </text>
    <text x="282" y="198" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c-accent)">
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Main">2</tspan>
      <tspan font-size="10" font-family="KaTeX_Math" font-style="italic">b</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 200</tspan>
    </text>
  </svg>
</template>
