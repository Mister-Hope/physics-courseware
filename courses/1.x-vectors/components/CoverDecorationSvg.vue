<template>
  <!-- 第 1 页：封面右下角装饰图，从同一起点出发的两条矢量与它们的和 -->
  <svg viewBox="0 0 240 160" width="330" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,132 112,132 164,64 76,64" fill="rgba(226,168,70,0.06)" stroke="none" />
    <line x1="76" y1="64" x2="164" y2="64" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4" />
    <line x1="112" y1="132" x2="164" y2="64" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4" />
    <line x1="24" y1="132" x2="112" y2="132" stroke="#60a5fa" stroke-width="2.4" stroke-linecap="round" />
    <line x1="24" y1="132" x2="76" y2="64" stroke="#2dd4bf" stroke-width="2.4" stroke-linecap="round" />
    <CourseArrow :from="{ x: 24, y: 132 }" :to="{ x: 164, y: 64 }" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
    <circle cx="24" cy="132" r="3" fill="currentColor" opacity="0.7" />
    <text x="6" y="150" font-family="KaTeX_Math" font-style="italic" font-size="12" fill="#94a3b8">O</text>
    <text x="118" y="148" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="#60a5fa">a</text>
    <text x="20" y="80" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="#2dd4bf">b</text>
    <text x="126" y="52" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#e2a846">a + b</text>
  </svg>
</template>
