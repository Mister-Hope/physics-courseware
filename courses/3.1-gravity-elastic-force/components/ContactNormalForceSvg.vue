<template>
  <!-- 第 19 页：面接触、点接触、曲面接触时弹力垂直于接触面 -->
  <svg class="fig" viewBox="0 0 660 196" style="max-width: 33rem" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="130" x2="200" y2="130" stroke="#cbd5e1" stroke-width="3" />
    <rect x="60" y="80" width="100" height="50" rx="5" fill="rgba(148,163,184,0.2)" stroke="#cbd5e1" stroke-width="2.4" />
    <text x="110" y="168" text-anchor="middle" font-size="15" fill="#94a3b8">面接触</text>
    <line x1="230" y1="160" x2="420" y2="108" stroke="#cbd5e1" stroke-width="3" />
    <circle cx="336" cy="106" r="24" fill="rgba(148,163,184,0.2)" stroke="#cbd5e1" stroke-width="2.4" />
    <circle cx="342" cy="129.6" r="4" fill="#e2a846" />
    <text x="326" y="184" text-anchor="middle" font-size="15" fill="#94a3b8">点接触</text>
    <path d="M 435 20 A 100 100 0 0 0 635 20" fill="none" stroke="#cbd5e1" stroke-width="3.4" />
    <line x1="535" y1="20" x2="535" y2="120" stroke="#60a5fa" stroke-width="1.2" stroke-dasharray="5 4" />
    <circle cx="535" cy="20" r="4" fill="#64748b" />
    <circle cx="535" cy="94" r="26" fill="rgba(148,163,184,0.2)" stroke="#cbd5e1" stroke-width="2.4" />
    <text x="535" y="156" text-anchor="middle" font-size="15" fill="#94a3b8">曲面接触</text>
    <g v-click="2">
      <CourseArrow :from="{ x: 110, y: 130 }" :to="{ x: 110, y: 60 }" stroke="#e2a846" stroke-width="3" />
      <path d="M 110 122 L 119 122 L 119 130" fill="none" stroke="#f87171" stroke-width="1.8" />
      <text x="124" y="82" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#e2a846">F</text>
      <CourseArrow :from="{ x: 342, y: 129.6 }" :to="{ x: 331, y: 86 }" stroke="#e2a846" stroke-width="3" />
      <path d="M 351.7 127 L 349.2 117.3 L 339.5 119.9" fill="none" stroke="#f87171" stroke-width="1.8" />
      <text x="352" y="74" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#e2a846">F</text>
      <line x1="462" y1="120" x2="608" y2="120" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5" />
      <CourseArrow :from="{ x: 535, y: 120 }" :to="{ x: 535, y: 84 }" stroke="#e2a846" stroke-width="3" />
      <path d="M 545 120 L 545 111 L 536 111" fill="none" stroke="#f87171" stroke-width="1.8" />
      <text x="548" y="96" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#e2a846">F</text>
      <text x="604" y="114" font-size="14" fill="#94a3b8" text-anchor="end">切线</text>
    </g>
  </svg>
</template>
