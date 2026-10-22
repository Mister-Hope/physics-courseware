<!--
  第 5 页应用图之一：变压器。
  同一铁芯上的原、副线圈，靠互感把能量从原线圈传到副线圈。
-->
<template>
  <svg viewBox="0 0 320 230" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 铁芯（闭合矩形） -->
    <rect x="110" y="50" width="90" height="110" rx="4" fill="none" stroke="var(--c-neutral-600)" stroke-width="12" />

    <!-- 原线圈 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="2.6">
      <ellipse cx="110" cy="70" rx="11" ry="5" />
      <ellipse cx="110" cy="84" rx="11" ry="5" />
      <ellipse cx="110" cy="98" rx="11" ry="5" />
      <ellipse cx="110" cy="112" rx="11" ry="5" />
      <ellipse cx="110" cy="126" rx="11" ry="5" />
    </g>

    <!-- 副线圈 -->
    <g fill="none" stroke="var(--c-accent-2)" stroke-width="2.6">
      <ellipse cx="200" cy="70" rx="11" ry="5" />
      <ellipse cx="200" cy="84" rx="11" ry="5" />
      <ellipse cx="200" cy="98" rx="11" ry="5" />
      <ellipse cx="200" cy="112" rx="11" ry="5" />
      <ellipse cx="200" cy="126" rx="11" ry="5" />
    </g>

    <!-- 原线圈回路：交流电源 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.7" stroke-linecap="round">
      <path d="M 110 64 H 70 V 126" />
      <path d="M 70 154 V 180 H 110 V 132" />
    </g>
    <circle cx="70" cy="140" r="13" fill="none" stroke="var(--c-text)" stroke-width="1.7" />
    <path d="M 61 140 q 4.5 -7 9 0 t 9 0" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" />

    <!-- 副线圈回路：灯泡 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.7" stroke-linecap="round">
      <path d="M 200 64 H 250 V 107" />
      <path d="M 250 133 V 180 H 200 V 132" />
    </g>
    <CircuitBulb :x="250" :y="120" :r="12" />

    <!-- 标签 -->
    <text x="110" y="208" text-anchor="middle" font-size="14" fill="var(--c-text)">原线圈</text>
    <text x="200" y="208" text-anchor="middle" font-size="14" fill="var(--c-text)">副线圈</text>
    <text x="155" y="110" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">铁芯</text>
  </svg>
</template>
