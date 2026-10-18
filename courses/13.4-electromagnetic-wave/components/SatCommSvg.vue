<!-- 第 13 页：卫星宽带通信——地面站与通信卫星之间、卫星与远处轮船之间用微波链路（电磁波）传递信息 -->
<script setup lang="ts"></script>

<template>
  <svg viewBox="0 0 640 330" width="100%" xmlns="http://www.w3.org/2000/svg">
    <CelestialEarth :x="140" :y="248" :r="82" />
    <g stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round" fill="none">
      <path d="M 176 174 L 183 150" />
      <path d="M 190 183 L 183 150" />
      <path d="M 179 165 L 186 165" />
      <path d="M 174 143 A 11 11 0 0 1 192 143" stroke="var(--c-accent)" />
    </g>
    <text x="183" y="130" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">地面站</text>
    <g>
      <rect x="452" y="64" width="26" height="24" rx="4" fill="var(--c-surface)" stroke="var(--c-accent)" stroke-width="2" />
      <rect x="418" y="68" width="30" height="16" rx="3" fill="color-mix(in srgb, var(--c-accent-2) 70%, var(--c-surface))" />
      <rect x="482" y="68" width="30" height="16" rx="3" fill="color-mix(in srgb, var(--c-accent-2) 70%, var(--c-surface))" />
      <text x="465" y="112" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">通信卫星</text>
    </g>
    <path d="M 505 252 L 585 252 L 573 272 L 517 272 Z" fill="var(--c-surface)" stroke="var(--c-text)" stroke-width="1.6" stroke-linejoin="round" />
    <line x1="545" y1="252" x2="545" y2="224" stroke="var(--c-text)" stroke-width="1.6" />
    <path d="M 545 224 L 563 230 L 545 236 Z" fill="var(--c-accent)" />
    <line x1="470" y1="272" x2="632" y2="272" stroke="var(--c-accent-2)" stroke-width="2" stroke-dasharray="9 7" />
    <text x="575" y="304" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">轮船</text>
    <CourseArrow :from="{ x: 194, y: 142 }" :to="{ x: 446, y: 72 }" stroke="var(--c-accent)" stroke-width="2.4" stroke-dasharray="9 6" />
    <CourseArrow :from="{ x: 448, y: 96 }" :to="{ x: 196, y: 160 }" stroke="var(--c-accent)" stroke-width="2.4" stroke-dasharray="9 6" />
    <CourseArrow :from="{ x: 452, y: 98 }" :to="{ x: 536, y: 244 }" stroke="var(--c-accent)" stroke-width="2.4" stroke-dasharray="9 6" />
    <text x="320" y="100" text-anchor="middle" font-size="16" fill="var(--c-accent)">电磁波链路</text>
  </svg>
</template>
