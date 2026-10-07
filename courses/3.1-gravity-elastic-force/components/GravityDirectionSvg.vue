<template>
  <!-- 第 4 页：下落的人、斜面上的物块、飞行的足球，重力都竖直向下，作用点（红点）都画在重心处 -->
  <svg class="fig" viewBox="0 0 620 98" style="max-width: 100%" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="90" x2="610" y2="90" stroke="#475569" stroke-width="2" opacity="0.6" />
    <line x1="110" y1="2" x2="110" y2="84" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.6" />
    <circle cx="110" cy="28" r="15" fill="rgba(226,168,70,0.25)" stroke="#e2a846" stroke-width="2.4" />
    <CourseArrow :from="{ x: 110, y: 28 }" :to="{ x: 110, y: 84 }" stroke="#f87171" stroke-width="3" />
    <circle cx="110" cy="28" r="4" fill="#f87171" />
    <text x="124" y="68" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#f87171">G</text>
    <SurfaceHatch :from="{ x: 230, y: 90 }" :to="{ x: 385, y: 26 }" side="below" :thickness="10" :gap="30" color="#64748b" :line-width="3" :hatch-width="1.2" />
    <rect x="294" y="21.7" width="52" height="30" rx="4" transform="rotate(-22.4 320 36.7)" fill="rgba(148,163,184,0.2)" stroke="#cbd5e1" stroke-width="2.4" />
    <CourseArrow :from="{ x: 320, y: 36.7 }" :to="{ x: 320, y: 86 }" stroke="#f87171" stroke-width="3" />
    <circle cx="320" cy="36.7" r="4" fill="#f87171" />
    <text x="334" y="68" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#f87171">G</text>
    <path d="M 435 76 Q 505 2 578 64" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="6 5" opacity="0.7" />
    <circle cx="512" cy="36" r="13" fill="rgba(148,163,184,0.2)" stroke="#cbd5e1" stroke-width="2.4" />
    <CourseArrow :from="{ x: 512, y: 36 }" :to="{ x: 512, y: 86 }" stroke="#f87171" stroke-width="3" />
    <circle cx="512" cy="36" r="4" fill="#f87171" />
    <text x="524" y="68" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#f87171">G</text>
  </svg>
</template>
