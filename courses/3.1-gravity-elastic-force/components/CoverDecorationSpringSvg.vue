<template>
  <!-- 第 11 页（第 2 课时封面）右下角装饰：弹簧被向上的拉力 F 拉伸 -->
  <svg viewBox="0 0 220 150" width="320" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.35">
      <SurfaceHatch :from="{ x: 26, y: 16 }" :to="{ x: 150, y: 16 }" side="above" :thickness="10" :gap="30" color="currentColor" :line-width="2" />
    </g>
    <path d="M 74 16 L 74 26 L 62 32 L 86 44 L 62 56 L 86 68 L 62 80 L 74 86 L 74 96" fill="none" stroke="#e2a846" stroke-width="2.6" stroke-linecap="round" />
    <rect x="62" y="96" width="24" height="18" rx="4" fill="rgba(226,168,70,0.35)" />
    <CourseArrow :from="{ x: 160, y: 118 }" :to="{ x: 160, y: 44 }" stroke="#60a5fa" stroke-width="2.6" opacity="0.8" />
    <text x="172" y="52" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#60a5fa">F</text>
  </svg>
</template>
