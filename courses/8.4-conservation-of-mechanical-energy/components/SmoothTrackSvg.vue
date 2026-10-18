<template>
  <!-- 光滑曲面下滑的机械能守恒推导：A 点 mgh = ½mv² 到 B 点 -->
  <svg width="660" height="330" viewBox="0 0 660 330" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M70 40 C70 220 150 264 300 264 L610 264" stroke="var(--c-line-strong)" stroke-width="4" stroke-linecap="round" fill="none" />
    <SurfaceHatch x1="70" y1="264" x2="610" y2="264" />
    <circle cx="112" cy="98" r="16" fill="var(--c-warn)" fill-opacity="0.3" stroke="var(--c-warn)" stroke-width="4" />
    <circle cx="450" cy="248" r="16" fill="var(--c-warn)" fill-opacity="0.3" stroke="var(--c-warn)" stroke-width="4" />
    <CourseArrow :x1="470" y1="248" x2="530" y2="248" color="var(--c-info)" :width="3.5" />
    <text x="504" y="234" font-size="15" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">v</text>
    <text x="96" y="76" font-size="14" fill="var(--c-ink-faint)" font-family="KaTeX_Main">A</text>
    <text x="440" y="226" font-size="14" fill="var(--c-ink-faint)" font-family="KaTeX_Main">B</text>
    <line x1="70" y1="98" x2="112" y2="98" stroke="var(--c-line-strong)" stroke-width="2" stroke-dasharray="6 6" opacity="0.6" />
    <line x1="70" y1="98" x2="70" y2="264" stroke="var(--c-line-strong)" stroke-width="2" stroke-dasharray="6 6" opacity="0.6" />
    <text x="52" y="186" font-size="14" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">h</text>
    <text x="100" y="128" font-size="12.5" fill="var(--c-ok)" font-family="KaTeX_Main" text-anchor="middle">
      <tspan font-style="italic">E</tspan>
      <tspan font-size="9" dy="3">p</tspan>
      <tspan dy="-3">=</tspan>
      <tspan font-style="italic">mgh</tspan>
    </text>
    <text x="100" y="148" font-size="12.5" fill="var(--c-ink-faint)" font-family="KaTeX_Main" text-anchor="middle">
      <tspan font-style="italic">E</tspan>
      <tspan font-size="9" dy="3">k</tspan>
      <tspan dy="-3">= 0</tspan>
    </text>
    <text x="470" y="290" font-size="12.5" fill="var(--c-ok)" font-family="KaTeX_Main" text-anchor="middle">
      <tspan font-style="italic">E</tspan>
      <tspan font-size="9" dy="3">p</tspan>
      <tspan dy="-3">= 0</tspan>
    </text>
    <text x="470" y="308" font-size="12.5" fill="var(--c-info)" font-family="KaTeX_Main" text-anchor="middle">
      <tspan font-style="italic">E</tspan>
      <tspan font-size="9" dy="3">k</tspan>
      <tspan dy="-3">=</tspan>
      <tspan font-style="italic">mv</tspan>
      <tspan font-size="9" dy="3">2</tspan>
      <tspan dy="-3">/2</tspan>
    </text>
    <path d="M180 60 Q330 30 480 60" stroke="var(--c-warn)" stroke-width="2.5" stroke-dasharray="8 8" fill="none" opacity="0.7" />
    <text x="330" y="42" font-size="13" fill="var(--c-warn)" font-family="KaTeX_Main" text-anchor="middle">只有重力做功</text>
  </svg>
</template>
