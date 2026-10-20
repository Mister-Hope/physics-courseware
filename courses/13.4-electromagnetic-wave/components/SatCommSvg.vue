<!-- 第 15 页：卫星宽带通信——地面站与通信卫星、卫星与轮船/飞机之间用微波链路传递信息 -->
<template>
  <svg viewBox="0 0 640 330" width="100%" xmlns="http://www.w3.org/2000/svg">
    <CelestialEarth :x="130" :y="200" :r="78" label="地球" :label-size="26" />
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
      <path d="M 186 146 L 198 134" />
      <path d="M 192 152 L 204 140" />
    </g>
    <path d="M 196 132 A 9 9 0 0 1 212 130" fill="none" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
    <text
      x="212"
      y="174"
      font-size="21"
      fill="var(--c-text-dim)"
      stroke="var(--c-bg)"
      stroke-width="4"
      paint-order="stroke"
      stroke-linejoin="round"
    >
      地面站
    </text>
    <g>
      <rect x="462" y="62" width="20" height="22" rx="3" fill="var(--c-surface)" stroke="var(--c-accent)" stroke-width="2" />
      <rect x="436" y="66" width="22" height="14" rx="3" fill="color-mix(in srgb, var(--c-accent-2) 70%, var(--c-surface))" />
      <rect x="490" y="66" width="22" height="14" rx="3" fill="color-mix(in srgb, var(--c-accent-2) 70%, var(--c-surface))" />
      <text x="472" y="46" text-anchor="middle" font-size="21" fill="var(--c-text-dim)">通信卫星</text>
    </g>
    <path d="M 500 280 L 600 280 L 588 300 L 512 300 Z" fill="var(--c-surface)" stroke="var(--c-text)" stroke-width="1.6" stroke-linejoin="round" />
    <line x1="550" y1="280" x2="550" y2="262" stroke="var(--c-text)" stroke-width="1.6" />
    <path d="M 550 262 L 566 268 L 550 274 Z" fill="var(--c-accent)" />
    <line x1="480" y1="302" x2="630" y2="302" stroke="var(--c-accent-2)" stroke-width="2" stroke-dasharray="9 7" />
    <text x="550" y="322" text-anchor="middle" font-size="21" fill="var(--c-text-dim)">轮船</text>
    <g>
      <path d="M 548 154 L 566 148 L 580 154 L 566 160 Z" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.4" />
      <line x1="560" y1="142" x2="560" y2="166" stroke="var(--c-text-dim)" stroke-width="2.2" />
      <text x="584" y="160" font-size="21" fill="var(--c-text-dim)">飞机</text>
    </g>
    <CourseArrow :from="{ x: 208, y: 136 }" :to="{ x: 436, y: 78 }" stroke="var(--c-accent)" stroke-width="2.2" stroke-dasharray="8 6" />
    <CourseArrow :from="{ x: 440, y: 90 }" :to="{ x: 212, y: 150 }" stroke="var(--c-accent)" stroke-width="2.2" stroke-dasharray="8 6" />
    <CourseArrow :from="{ x: 460, y: 92 }" :to="{ x: 532, y: 268 }" stroke="var(--c-accent)" stroke-width="2.2" stroke-dasharray="8 6" />
    <CourseArrow :from="{ x: 486, y: 90 }" :to="{ x: 554, y: 148 }" stroke="var(--c-accent)" stroke-width="2.2" stroke-dasharray="8 6" />
    <text x="300" y="58" text-anchor="middle" font-size="22" fill="var(--c-accent)">微波链路</text>
  </svg>
</template>
