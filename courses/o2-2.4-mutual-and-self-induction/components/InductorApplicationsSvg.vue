<!--
  第 13 页示意图：自感的"用"与"防"。
  左：镇流器与灯管串联，启动时利用自感电动势；
  右：断开大电感时，开关触点间打出电火花。
-->
<template>
  <svg viewBox="40 40 550 190" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="312" y1="56" x2="312" y2="210" stroke="var(--c-border)" stroke-width="1.4" stroke-dasharray="4 6" />
    <!-- ── 左：镇流器 + 灯管 ── -->
    <rect x="62" y="104" width="28" height="62" rx="3" fill="var(--c-neutral-700)" opacity="0.5" />
    <!-- 镇流器线圈：竖放连续螺旋线 4 匝，接线端 (100,112) / (100,148) -->
    <Solenoid :x="76" :y="130" :length="36" :radius="24" :turns="4" orientation="vertical" direction="cw" :phase="0" :line-width="2.6" :back-opacity="0.32" />
    <!-- 灯管 -->
    <rect x="150" y="104" width="120" height="26" rx="13" fill="var(--c-bg-soft)" stroke="var(--c-accent)" stroke-width="1.8" />
    <line x1="164" y1="111" x2="164" y2="123" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <line x1="256" y1="111" x2="256" y2="123" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <g fill="none" stroke="var(--c-text)" stroke-width="1.7" stroke-linecap="round">
      <path d="M 100 112 V 80 H 130 V 117 H 150" />
      <path d="M 270 117 H 292 V 186 H 100 V 148" />
    </g>
    <text x="76" y="214" text-anchor="middle" font-size="15" fill="var(--c-text)">镇流器</text>
    <text x="210" y="88" text-anchor="middle" font-size="15" fill="var(--c-text)">灯管</text>
    <!-- ── 右：断开大电感 ── -->
    <rect x="360" y="104" width="28" height="62" rx="3" fill="var(--c-neutral-700)" opacity="0.5" />
    <!-- 大电感线圈：竖放连续螺旋线 4 匝，接线端 (398,112) / (398,148) -->
    <Solenoid :x="374" :y="130" :length="36" :radius="24" :turns="4" orientation="vertical" direction="cw" :phase="0" :line-width="2.6" :back-opacity="0.32" />
    <!-- 线圈引线：上引到开关左触点，右下绕回 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.7" stroke-linecap="round">
      <path d="M 398 112 V 84 H 460" />
      <path d="M 490 84 H 540 V 186 H 398 V 148" />
    </g>
    <CircuitSwitch :x="475" :y="84" open :angle="26" />
    <text x="446" y="78" font-family="KaTeX_Main" font-size="15" fill="var(--c-text)">S</text>
    <!-- 触点之间的电火花 -->
    <path
      d="M 460 96 L 466 88 L 472 100 L 478 88 L 484 100 L 490 88 L 494 96"
      fill="none"
      stroke="var(--c-danger)"
      stroke-width="1.8"
      stroke-linejoin="round"
    />
    <text x="476" y="120" text-anchor="middle" font-size="15" fill="var(--c-danger)">电火花</text>
    <text x="374" y="214" text-anchor="middle" font-size="15" fill="var(--c-text)">大电感线圈</text>
  </svg>
</template>
