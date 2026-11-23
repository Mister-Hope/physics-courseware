<!-- 封面装饰：光线从光密介质射向界面，反射光占主导；右下角为全反射棱镜 -->
<template>
  <svg viewBox="0 0 340 220" width="330" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="cover-glow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#60a5fa" stop-opacity=".3" />
        <stop offset="1" stop-color="#e2a846" stop-opacity=".04" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="340" height="220" fill="url(#cover-glow)" opacity=".4" />
    <line x1="10" y1="150" x2="330" y2="150" stroke="currentColor" stroke-width="1.4" opacity=".35" />
    <line x1="170" y1="44" x2="170" y2="212" stroke="currentColor" stroke-width="1" stroke-dasharray="5 6" opacity=".35" />
    <CourseArrow :from="{ x: 62, y: 208 }" :to="{ x: 170, y: 150 }" stroke="#60a5fa" :stroke-width="2.2" :head-size="9" />
    <CourseArrow :from="{ x: 170, y: 150 }" :to="{ x: 272, y: 208 }" stroke="#e2a846" :stroke-width="2.2" :head-size="9" />
    <path d="M 170 150 A 44 44 0 0 0 141 184" fill="none" stroke="#e2a846" stroke-width="1.6" />
    <text x="124" y="186" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="19">θ</text>
    <path d="M 236 62 L 236 140 L 314 140 Z" fill="#3b82f6" fill-opacity=".16" stroke="#93c5fd" stroke-width="1.6" />
    <line x1="236" y1="102" x2="275" y2="102" stroke="#f1f5f9" stroke-width="2" />
    <line x1="275" y1="102" x2="275" y2="140" stroke="#f1f5f9" stroke-width="2" />
    <circle cx="275" cy="102" r="3.4" fill="#e2a846" />
  </svg>
</template>
