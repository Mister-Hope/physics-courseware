<template>
  <!-- 封面装饰：物块 + 滑动摩擦力 F_f 与速度 v 箭头 -->
  <svg viewBox="0 0 240 160" width="320" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="132" x2="230" y2="132" stroke="currentColor" stroke-width="2" opacity="0.5" />
    <g stroke="currentColor" stroke-width="1" opacity="0.25">
      <line x1="32" y1="132" x2="22" y2="144" />
      <line x1="72" y1="132" x2="62" y2="144" />
      <line x1="112" y1="132" x2="102" y2="144" />
      <line x1="152" y1="132" x2="142" y2="144" />
      <line x1="192" y1="132" x2="182" y2="144" />
    </g>
    <rect x="76" y="74" width="88" height="58" rx="7" fill="rgba(226,168,70,0.10)" stroke="#e2a846" stroke-width="2.2" />
    <CourseArrow :from="{ x: 120, y: 132 }" :to="{ x: 32, y: 132 }" stroke="#e2a846" stroke-width="3.2" />
    <CourseArrow :from="{ x: 104, y: 54 }" :to="{ x: 182, y: 54 }" stroke="#60a5fa" stroke-width="3.2" />
    <text x="30" y="124" font-size="16" fill="#e2a846">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan dy="4" font-size="10">f</tspan>
    </text>
    <text x="188" y="60" font-size="16" fill="#60a5fa" font-family="KaTeX_Math" font-style="italic">v</text>
  </svg>
</template>
