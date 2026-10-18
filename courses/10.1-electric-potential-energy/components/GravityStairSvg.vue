<!-- 第 3 页重力类比图：同一物体从 A 到 B 的两条路径（先下后右 / 先右后下），高度差 h 与水平距离 l -->
<template>
  <svg viewBox="0 0 560 225" width="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M 80 45 L 80 175 L 430 175" fill="none" stroke="var(--c-accent)" stroke-width="2.2" stroke-dasharray="9 6" opacity="0.8" />
    <path d="M 80 45 L 430 45 L 430 175" fill="none" stroke="var(--c-velocity)" stroke-width="2.2" stroke-dasharray="9 6" opacity="0.8" />
    <CourseArrow :from="{ x: 170, y: 58 }" :to="{ x: 170, y: 112 }" stroke="var(--c-physics)" stroke-width="2.6" label="g" />
    <CourseArrow :from="{ x: 300, y: 72 }" :to="{ x: 300, y: 126 }" stroke="var(--c-physics)" stroke-width="2.6" />
    <g stroke="var(--c-text-dim)" stroke-width="1.3" stroke-dasharray="4 4">
      <line x1="50" y1="45" x2="50" y2="175" />
      <line x1="42" y1="45" x2="58" y2="45" />
      <line x1="42" y1="175" x2="58" y2="175" />
      <line x1="80" y1="202" x2="430" y2="202" />
      <line x1="80" y1="194" x2="80" y2="210" />
      <line x1="430" y1="194" x2="430" y2="210" />
    </g>
    <text x="40" y="114" text-anchor="end" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="14">h</text>
    <text x="255" y="218" text-anchor="middle" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="14">l</text>
    <circle cx="80" cy="45" r="5" fill="var(--c-accent)" />
    <text x="68" y="38" text-anchor="end" fill="var(--c-accent)" font-size="14">A</text>
    <circle cx="430" cy="175" r="5" fill="var(--c-accent)" />
    <text x="442" y="190" fill="var(--c-accent)" font-size="14">B</text>
  </svg>
</template>
