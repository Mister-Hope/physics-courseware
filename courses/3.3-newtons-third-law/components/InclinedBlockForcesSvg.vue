<template>
  <!-- 第 13 页：静止在粗糙斜面上的木块受力——重力 G、支持力 F_N、静摩擦力 F_f（按点击分步出现） -->
  <svg viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="40" y1="340" x2="490" y2="340" stroke="#94a3b8" stroke-width="3" opacity="0.5" />
    <line x1="70" y1="352" x2="58" y2="340" stroke="#94a3b8" stroke-width="2" opacity="0.4" />
    <line x1="130" y1="352" x2="118" y2="340" stroke="#94a3b8" stroke-width="2" opacity="0.4" />
    <line x1="190" y1="352" x2="178" y2="340" stroke="#94a3b8" stroke-width="2" opacity="0.4" />
    <line x1="250" y1="352" x2="238" y2="340" stroke="#94a3b8" stroke-width="2" opacity="0.4" />
    <line x1="310" y1="352" x2="298" y2="340" stroke="#94a3b8" stroke-width="2" opacity="0.4" />
    <line x1="370" y1="352" x2="358" y2="340" stroke="#94a3b8" stroke-width="2" opacity="0.4" />
    <line x1="430" y1="352" x2="418" y2="340" stroke="#94a3b8" stroke-width="2" opacity="0.4" />
    <path d="M 80 340 L 430 150 L 430 340 z" fill="rgba(100,116,139,0.12)" stroke="#64748b" stroke-width="3" stroke-linejoin="round" />
    <g transform="rotate(-28.5 227 226)">
      <rect x="172" y="196" width="110" height="60" rx="10" fill="none" stroke="#e2a846" stroke-width="3" />
    </g>
    <g v-click="1">
      <CourseArrow :from="{ x: 227, y: 226 }" :to="{ x: 227, y: 352 }" stroke="#e2a846" stroke-width="3.5" />
      <text
        x="200"
        y="320"
        fill="#e2a846"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="24"
        text-anchor="end"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        G
      </text>
    </g>
    <g v-click="2">
      <CourseArrow :from="{ x: 227, y: 226 }" :to="{ x: 169, y: 119 }" stroke="#60a5fa" stroke-width="3.5" />
      <text
        x="144"
        y="154"
        fill="#60a5fa"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="24"
        text-anchor="end"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        F
        <tspan font-size="17" dy="6">N</tspan>
      </text>
    </g>
    <g v-click="3">
      <CourseArrow :from="{ x: 227, y: 226 }" :to="{ x: 334, y: 168 }" stroke="#f87171" stroke-width="3.5" />
      <text x="352" y="198" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="24" stroke="#0f1425" stroke-width="3" paint-order="stroke">
        F
        <tspan font-size="17" dy="6">f</tspan>
      </text>
    </g>
  </svg>
</template>
