<template>
  <!-- 第 4 页：三力汇交的反证法：F1、F2 的作用线交于 O，反设第三个力 F3 不过 O —— 它对 O 的力臂为 l -->
  <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
    <line x1="40" y1="109" x2="108" y2="33" stroke="#64748b" stroke-width="1.1" stroke-dasharray="5 4" opacity="0.75" />
    <line x1="160" y1="109" x2="92" y2="33" stroke="#64748b" stroke-width="1.1" stroke-dasharray="5 4" opacity="0.75" />
    <line x1="125" y1="148" x2="125" y2="34" stroke="#64748b" stroke-width="1.1" stroke-dasharray="5 4" opacity="0.75" />
    <rect x="35" y="104" width="130" height="10" rx="5" fill="rgba(148,163,184,0.35)" stroke="#94a3b8" stroke-width="1.4" />
    <CourseArrow :from="{ x: 40, y: 109 }" :to="{ x: 65.3, y: 80.7 }" :head-size="9" stroke="#e2a846" stroke-width="2.6" />
    <CourseArrow :from="{ x: 160, y: 109 }" :to="{ x: 134.7, y: 80.7 }" :head-size="9" stroke="#2dd4bf" stroke-width="2.6" />
    <CourseArrow :from="{ x: 125, y: 114 }" :to="{ x: 125, y: 144 }" :head-size="9" stroke="#f87171" stroke-width="2.6" />
    <line x1="100" y1="42" x2="125" y2="42" stroke="#cbd5e1" stroke-width="1.6" />
    <path d="M120 42 L120 47 L125 47" fill="none" stroke="#cbd5e1" stroke-width="1.1" />
    <circle cx="100" cy="42" r="3" fill="#94a3b8" />
    <text x="83" y="38" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="15">O</text>
    <text x="114" y="36" fill="#cbd5e1" font-family="KaTeX_Math" font-style="italic" font-size="15">l</text>
    <text x="26" y="87" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="14">F</text>
    <text x="35" y="90" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="10">1</text>
    <text x="146" y="87" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="14">F</text>
    <text x="155" y="90" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="10">2</text>
    <text x="133" y="138" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="14">F</text>
    <text x="142" y="141" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="10">3</text>
  </svg>
</template>
