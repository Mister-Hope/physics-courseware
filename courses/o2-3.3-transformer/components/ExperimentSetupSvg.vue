<!--
  第 5 页（P5）：J2423 可拆变压器降压演示实验接线示意图。
  原线圈 0-1400 匝接 12 V 低压交流电源（并联交流电压表 V1）；
  副线圈 0-400 / 100 匝抽头接交流电压表 V2。
-->
<template>
  <svg viewBox="0 0 460 280" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 闭合铁芯（U 形底座 + 横轭可拆铁芯） -->
    <path
      d="M 164 78 H 296 V 224 H 164 Z M 196 106 V 196 H 264 V 106 Z"
      fill="var(--c-surface-solid)"
      fill-rule="evenodd"
      stroke="var(--c-neutral-500)"
      stroke-width="2"
    />
    <!-- 可拆上横轭接缝虚线 -->
    <line x1="164" y1="106" x2="196" y2="106" stroke="var(--c-accent)" stroke-width="1.4" stroke-dasharray="3 3" />
    <line x1="264" y1="106" x2="296" y2="106" stroke="var(--c-accent)" stroke-width="1.4" stroke-dasharray="3 3" />
    <text x="230" y="64" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">可拆变压器</text>
    <!-- 原线圈（左，1400 匝） -->
    <Solenoid
      :x="180"
      :y="151"
      :length="72"
      :radius="24"
      :turns="6"
      direction="ccw"
      orientation="vertical"
      :phase="180"
      :line-width="2.6"
      :back-opacity="0.32"
      color="var(--c-accent-2)"
    />
    <!-- 副线圈（右，400 / 100 匝抽头） -->
    <Solenoid
      :x="280"
      :y="151"
      :length="66"
      :radius="24"
      :turns="4"
      direction="cw"
      orientation="vertical"
      :phase="0"
      :line-width="2.6"
      :back-opacity="0.32"
      color="var(--c-physics)"
    />
    <!-- 原边电路：低压交流电源 + 开关 + 电压表 V1 并联 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 156 115 H 96" />
      <path d="M 56 115 H 36 V 135" />
      <path d="M 36 167 V 187 H 156" />
      <path d="M 118 115 V 135" />
      <path d="M 118 167 V 187" />
    </g>
    <circle cx="118" cy="115" r="3" fill="var(--c-text)" />
    <circle cx="118" cy="187" r="3" fill="var(--c-text)" />
    <CircuitSwitch :x="76" :y="115" :open="false" :span="40" label="S" />
    <!-- 低压交流电源符号 -->
    <circle cx="36" cy="151" r="16" fill="none" stroke="var(--c-accent-2)" stroke-width="1.8" />
    <path d="M 27 151 q 4.5 -7 9 0 t 9 0" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" />
    <CircuitMeter :x="118" :y="151" kind="v" color="var(--c-accent-2)" />
    <text x="36" y="214" text-anchor="middle" font-size="14" fill="var(--c-accent-2)">
      <tspan font-family="KaTeX_Math" font-style="italic">u</tspan>
      <tspan dy="3" font-size="11" font-family="KaTeX_Main">in</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 12 V ~</tspan>
    </text>
    <!-- 副边电路：0 / 100 / 400 抽头 + 电压表 V2 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 304 118 H 396 V 135" />
      <path d="M 396 167 V 184 H 304" />
      <!-- 中间 100 匝抽头虚线示意 -->
      <path d="M 304 162 H 352" stroke="var(--c-physics)" stroke-dasharray="4 3" />
    </g>
    <circle cx="304" cy="118" r="3" fill="var(--c-physics)" />
    <circle cx="304" cy="162" r="3" fill="var(--c-physics)" />
    <circle cx="304" cy="184" r="3" fill="var(--c-physics)" />
    <text x="314" y="113" font-size="12" font-family="KaTeX_Main" fill="var(--c-physics)">400</text>
    <text x="356" y="166" font-size="12" font-family="KaTeX_Main" fill="var(--c-physics)">100</text>
    <text x="314" y="199" font-size="12" font-family="KaTeX_Main" fill="var(--c-physics)">0</text>
    <CircuitMeter :x="396" :y="151" kind="v" color="var(--c-physics)" />
    <text x="396" y="214" text-anchor="middle" font-size="14" fill="var(--c-physics)">
      <tspan font-family="KaTeX_Math" font-style="italic">u</tspan>
      <tspan dy="3" font-size="11" font-family="KaTeX_Main">out</tspan>
    </text>
    <!-- 底部匝数说明 -->
    <text x="152" y="252" text-anchor="middle" font-size="14" fill="var(--c-accent-2)">原线圈 0–1400 匝</text>
    <text x="312" y="252" text-anchor="middle" font-size="14" fill="var(--c-physics)">副线圈 0–400 / 100 匝</text>
  </svg>
</template>
