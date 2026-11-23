<template>
  <!-- P14 霍尔元件：半导体薄片，E、F 间通电流 I，B 垂直穿过薄片，M、N 两电极间得到霍尔电压 U_H -->
  <svg viewBox="0 0 440 280" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="霍尔元件示意图">
    <rect x="110" y="90" width="220" height="100" rx="3" fill="var(--c-neutral-700)" fill-opacity="0.5" stroke="var(--c-neutral-500)" stroke-width="1.8" />
    <g fill="var(--c-neutral-300)">
      <rect x="94" y="126" width="16" height="28" rx="2" />
      <rect x="330" y="126" width="16" height="28" rx="2" />
      <rect x="200" y="74" width="28" height="16" rx="2" />
      <rect x="200" y="190" width="28" height="16" rx="2" />
    </g>
    <g stroke="var(--c-text)" stroke-width="2.2" stroke-linecap="round">
      <line x1="30" y1="140" x2="94" y2="140" />
      <line x1="346" y1="140" x2="410" y2="140" />
    </g>
    <g stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round">
      <line x1="214" y1="74" x2="214" y2="46" />
      <line x1="214" y1="206" x2="214" y2="234" />
    </g>
    <g fill="var(--c-text-dim)">
      <circle cx="214" cy="42" r="3" />
      <circle cx="214" cy="238" r="3" />
    </g>
    <CourseArrow :from="{ x: 20, y: 140 }" :to="{ x: 86, y: 140 }" stroke="var(--c-accent-2)" :stroke-width="2.4" :head-size="10" />
    <text x="40" y="128" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-2)">I</text>
    <text x="86" y="120" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)" text-anchor="end">E</text>
    <text x="354" y="120" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">F</text>
    <text x="236" y="70" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">M</text>
    <text x="236" y="252" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">N</text>
    <CourseArrow :from="{ x: 58, y: 38 }" :to="{ x: 108, y: 82 }" stroke="var(--c-accent)" :stroke-width="2.2" :head-size="9" />
    <text x="44" y="34" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">B</text>
    <CourseArrow :from="{ x: 300, y: 140 }" :to="{ x: 300, y: 96 }" stroke="var(--c-accent)" :stroke-width="1.6" :head-size="6" />
    <CourseArrow :from="{ x: 300, y: 140 }" :to="{ x: 300, y: 184 }" stroke="var(--c-accent)" :stroke-width="1.6" :head-size="6" />
    <text x="278" y="144" font-size="12" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)" text-anchor="end">
      U<tspan dy="3" font-size="8">H</tspan>
    </text>
    <text x="220" y="28" font-size="10" fill="var(--c-text-dim)" text-anchor="middle">半导体薄片（如砷化铟）</text>
  </svg>
</template>
