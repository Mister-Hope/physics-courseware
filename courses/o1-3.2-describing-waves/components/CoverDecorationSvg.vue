<template>
  <!-- 封面装饰：一列正弦波，标出相邻两个同相点的间距，即一个波长 λ -->
  <svg viewBox="0 0 340 220" width="330" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="24" y1="125" x2="316" y2="125" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5 6" opacity="0.25" />
    <path
      d="M 24 125 C 48 65 72 65 96 125 C 120 185 144 185 168 125 C 192 65 216 65 240 125 C 264 185 288 185 312 125"
      fill="none"
      stroke="#e2a846"
      stroke-width="2.6"
      stroke-linecap="round"
      opacity="0.9"
    />
    <circle cx="60" cy="80" r="4.5" fill="#e2a846" />
    <circle cx="132" cy="170" r="4" fill="#60a5fa" opacity="0.8" />
    <circle cx="204" cy="80" r="4.5" fill="#e2a846" />
    <g stroke="#e2a846" stroke-width="1.3" opacity="0.65">
      <line x1="60" y1="190" x2="204" y2="190" />
      <line x1="60" y1="183" x2="60" y2="197" />
      <line x1="204" y1="183" x2="204" y2="197" />
    </g>
    <text x="132" y="211" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#e2a846">λ</text>
    <text x="60" y="66" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="#94a3b8">波峰</text>
  </svg>
</template>
