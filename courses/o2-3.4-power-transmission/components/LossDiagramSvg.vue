<!--
  第 4 页：输电线上损耗的来源。发电站 → 两条输电线（总电阻 r）→ 用户。
  电流在闭合回路里流动，导线上用电阻符号 r 表示输电线的总电阻。
-->
<template>
  <svg viewBox="0 0 420 230" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 发电站 -->
    <rect x="14" y="66" width="88" height="96" rx="12" fill="var(--c-surface)" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <text x="58" y="108" text-anchor="middle" font-size="14" fill="var(--c-text)">发电站</text>
    <text x="58" y="130" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">交流输出</text>
    <!-- 用户 -->
    <rect x="330" y="66" width="76" height="96" rx="12" fill="var(--c-surface)" stroke="var(--c-physics)" stroke-width="1.6" />
    <text x="368" y="108" text-anchor="middle" font-size="14" fill="var(--c-text)">用户</text>
    <text x="368" y="130" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">用电器</text>
    <!-- 两条输电线（上导线在电阻处断开） -->
    <g fill="none" stroke="var(--c-neutral-300)" stroke-width="2" stroke-linecap="round">
      <path d="M 102 96 H 196" />
      <path d="M 240 96 H 330" />
      <path d="M 102 148 H 330" />
    </g>
    <CircuitResistor :x="218" :y="96" :length="44" label="r" color="var(--c-accent)" label-color="var(--c-accent)" />
    <!-- 电流方向：上导线向右、下导线向左 -->
    <CourseArrow :from="{ x: 118, y: 82 }" :to="{ x: 158, y: 82 }" stroke="var(--c-accent-2)" :stroke-width="2" label="I" />
    <CourseArrow :from="{ x: 314, y: 162 }" :to="{ x: 274, y: 162 }" stroke="var(--c-accent-2)" :stroke-width="2" label="I" :label-dy="14" />
    <text x="283" y="124" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">输电线</text>
    <text x="212" y="206" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">
      两条输电线的总电阻为
      <tspan font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">r</tspan>
    </text>
  </svg>
</template>
