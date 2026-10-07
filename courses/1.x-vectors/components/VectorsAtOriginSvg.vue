<template>
  <!-- 第 6 页：把它们的起点都平移到原点 O -->
  <svg viewBox="0 0 260 140" width="100%" style="max-width: 19rem" xmlns="http://www.w3.org/2000/svg">
    <text x="130" y="16" text-anchor="middle" font-size="13" fill="#e2a846">起点都平移到原点 O</text>
    <line x1="60" y1="118" x2="110" y2="118" stroke="#475569" stroke-width="1.4" />
    <line x1="60" y1="118" x2="60" y2="38" stroke="#475569" stroke-width="1.4" />
    <path d="M 56 43 L 60 36 L 64 43" fill="none" stroke="#475569" stroke-width="1.4" stroke-linejoin="round" />
    <CourseArrow :from="{ x: 60, y: 118 }" :to="{ x: 120.34, y: 109.24 }" stroke="#e2a846" stroke-width="2.2" />
    <CourseArrow :from="{ x: 60, y: 118 }" :to="{ x: 119.89, y: 106.24 }" stroke="#e2a846" stroke-width="2.2" />
    <CourseArrow :from="{ x: 60, y: 118 }" :to="{ x: 128.62, y: 61.17 }" stroke="#e2a846" stroke-width="2.2" />
    <CourseArrow :from="{ x: 60, y: 118 }" :to="{ x: 196.95, y: 100.23 }" stroke="#e2a846" stroke-width="2.2" />
    <circle cx="60" cy="118" r="3.6" fill="#e2a846" />
    <text x="44" y="134" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="#94a3b8">O</text>
  </svg>
</template>
