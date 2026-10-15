<template>
  <!-- 第 1 页封面右下角装饰：弹簧悬挂重物，旁边是竖直向下的重力 G -->
  <svg viewBox="0 0 220 150" width="320" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.35">
      <SurfaceHatch :from="{ x: 26, y: 16 }" :to="{ x: 150, y: 16 }" side="above" :thickness="10" :gap="30" color="currentColor" :line-width="2" />
    </g>
    <path
      d="M 74 16 L 74 26 L 62 32 L 86 44 L 62 56 L 86 68 L 62 80 L 74 86 L 74 96"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2.6"
      stroke-linecap="round"
    />
    <rect x="62" y="96" width="24" height="18" rx="4" fill="color-mix(in srgb, var(--c-accent) 35%, transparent)" />
    <CourseArrow :from="{ x: 160, y: 26 }" :to="{ x: 160, y: 122 }" stroke="currentColor" stroke-width="2.4" opacity="0.65" />
    <text x="172" y="80" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)">G</text>
    <circle cx="74" cy="105" r="3" fill="var(--c-force)" />
  </svg>
</template>
