<template>
  <!-- 第 14 页例题图：足球被踢出后沿曲线升到最高点——已知量是最大高度 5 m 与最高点速度 20 m/s（题面给的量常显） -->
  <svg viewBox="0 0 620 340" width="100%" style="max-width: 620px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="足球被踢出后升到最高点">
    <SurfaceHatch :from="{ x: 30, y: 300 }" :to="{ x: 590, y: 300 }" side="below" :thickness="14" :gap="22" color="var(--c-text-dim)" :line-width="2.2" />
    <path d="M 116 274 Q 240 108 364 108" fill="none" stroke="var(--c-text-dim)" stroke-width="2.4" stroke-dasharray="9 7" />
    <g>
      <circle cx="90" cy="274" r="26" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2.2" />
      <path d="M 78 262 L 92 258 L 100 270 L 92 282 L 78 278 Z" fill="var(--c-neutral-700)" stroke="var(--c-neutral-300)" stroke-width="1.4" />
      <path d="M 100 270 L 112 266" stroke="var(--c-neutral-300)" stroke-width="1.6" />
      <path d="M 92 282 L 94 296" stroke="var(--c-neutral-300)" stroke-width="1.6" />
    </g>
    <g>
      <circle cx="390" cy="108" r="26" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2.2" />
      <path d="M 378 96 L 392 92 L 400 104 L 392 116 L 378 112 Z" fill="var(--c-neutral-700)" stroke="var(--c-neutral-300)" stroke-width="1.4" />
      <path d="M 400 104 L 412 100" stroke="var(--c-neutral-300)" stroke-width="1.6" />
      <path d="M 392 116 L 394 130" stroke="var(--c-neutral-300)" stroke-width="1.6" />
    </g>
    <line x1="390" y1="108" x2="478" y2="108" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="6 5" />
    <line x1="478" y1="108" x2="478" y2="300" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="470" y1="108" x2="486" y2="108" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="470" y1="300" x2="486" y2="300" stroke="var(--c-accent)" stroke-width="2.4" />
    <text x="494" y="208" font-size="19" fill="var(--c-accent)" stroke="var(--c-bg-soft)" stroke-width="3" paint-order="stroke">
      <tspan>5</tspan>
      <tspan dx="4" font-family="KaTeX_Main">m</tspan>
    </text>
    <CourseArrow :from="{ x: 424, y: 74 }" :to="{ x: 524, y: 74 }" stroke="var(--c-velocity)" :stroke-width="2.8" />
    <text x="474" y="58" font-size="17" fill="var(--c-velocity)" text-anchor="middle" stroke="var(--c-bg-soft)" stroke-width="3" paint-order="stroke">
      <tspan>20</tspan>
      <tspan dx="4" font-family="KaTeX_Main">m/s</tspan>
    </text>
  </svg>
</template>
