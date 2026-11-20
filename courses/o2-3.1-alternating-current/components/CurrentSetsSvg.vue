<!--
  第 5 页：用一个集合表示全部电流，按方向是否变化一分为二；
  恒定电流是直流中“大小也不变”的那一部分。
-->
<template>
  <svg viewBox="0 0 780 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="电流分为交变电流和直流；恒定电流是直流的子集">
    <defs>
      <clipPath id="ac-set-left">
        <rect x="0" y="0" width="390" height="290" />
      </clipPath>
      <clipPath id="ac-set-right">
        <rect x="390" y="0" width="390" height="290" />
      </clipPath>
    </defs>

    <ellipse cx="390" cy="150" rx="330" ry="108" fill="var(--c-accent)" fill-opacity="0.08" clip-path="url(#ac-set-left)" />
    <ellipse cx="390" cy="150" rx="330" ry="108" fill="var(--c-accent-2)" fill-opacity="0.1" clip-path="url(#ac-set-right)" />
    <ellipse cx="390" cy="150" rx="330" ry="108" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <line x1="390" y1="42" x2="390" y2="258" stroke="var(--c-text-dim)" stroke-width="1.6" />

    <text x="230" y="96" fill="var(--c-accent)" font-size="20" font-weight="600" text-anchor="middle">交变电流</text>
    <text x="230" y="122" fill="var(--c-text-dim)" font-size="14" text-anchor="middle">方向随时间变化</text>
    <path
      d="M 140 178 C 165 148, 190 148, 215 178 S 265 208, 290 178 S 315 148, 340 178"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2.4"
      stroke-linecap="round"
    />

    <text x="555" y="96" fill="var(--c-accent-2)" font-size="20" font-weight="600" text-anchor="middle">直流</text>
    <text x="555" y="122" fill="var(--c-text-dim)" font-size="14" text-anchor="middle">方向不变</text>
    <text x="555" y="140" fill="var(--c-text-dim)" font-size="13" text-anchor="middle">大小可以变化</text>

    <circle cx="555" cy="202" r="36" fill="var(--c-accent-2)" fill-opacity="0.16" stroke="var(--c-accent-2)" stroke-width="1.5" />
    <text x="555" y="200" fill="var(--c-text)" font-size="14" font-weight="600" text-anchor="middle">恒定电流</text>
    <text x="555" y="219" fill="var(--c-text-dim)" font-size="10.5" text-anchor="middle">大小也不变</text>

    <text x="390" y="30" fill="var(--c-text-dim)" font-size="12" text-anchor="middle">所有电流</text>
  </svg>
</template>
