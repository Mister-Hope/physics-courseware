<template>
  <!-- 纸带三计数点 A、B、C 的距离标注：B 点瞬时速度由 AC 段平均速度求出 -->
  <svg width="680" height="250" viewBox="0 0 680 250" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="120" width="620" height="56" rx="10" fill="var(--c-bg-soft)" stroke="var(--c-line-strong)" stroke-width="2.5" />
    <line x1="30" y1="148" x2="650" y2="148" stroke="var(--c-line-strong)" stroke-width="1.5" opacity="0.4" />
    <circle cx="130" cy="148" r="7" fill="var(--c-ink)" />
    <circle cx="330" cy="148" r="7" fill="var(--c-ink)" />
    <circle cx="560" cy="148" r="7" fill="var(--c-ink)" />
    <text x="130" y="112" font-size="15" fill="var(--c-ink)" font-family="KaTeX_Main" text-anchor="middle" font-style="italic">A</text>
    <text x="330" y="112" font-size="15" fill="var(--c-ink)" font-family="KaTeX_Main" text-anchor="middle" font-style="italic">B</text>
    <text x="560" y="112" font-size="15" fill="var(--c-ink)" font-family="KaTeX_Main" text-anchor="middle" font-style="italic">C</text>
    <line x1="130" y1="196" x2="330" y2="196" stroke="var(--c-ok)" stroke-width="2" />
    <path d="M136 190 l-6 6 l6 6" stroke="var(--c-ok)" stroke-width="2" fill="none" />
    <path d="M324 190 l6 6 l-6 6" stroke="var(--c-ok)" stroke-width="2" fill="none" />
    <text x="230" y="220" font-size="14" fill="var(--c-ok)" font-family="KaTeX_Main" text-anchor="middle">
      <tspan font-style="italic">h</tspan>
      <tspan font-size="10" dy="3">AB</tspan>
    </text>
    <line x1="330" y1="196" x2="560" y2="196" stroke="var(--c-ok)" stroke-width="2" />
    <path d="M336 190 l-6 6 l6 6" stroke="var(--c-ok)" stroke-width="2" fill="none" />
    <path d="M554 190 l6 6 l-6 6" stroke="var(--c-ok)" stroke-width="2" fill="none" />
    <text x="445" y="220" font-size="14" fill="var(--c-ok)" font-family="KaTeX_Main" text-anchor="middle">
      <tspan font-style="italic">h</tspan>
      <tspan font-size="10" dy="3">BC</tspan>
    </text>
    <line x1="130" y1="70" x2="560" y2="70" stroke="var(--c-warn)" stroke-width="2" />
    <path d="M136 64 l-6 6 l6 6" stroke="var(--c-warn)" stroke-width="2" fill="none" />
    <path d="M554 64 l6 6 l-6 6" stroke="var(--c-warn)" stroke-width="2" fill="none" />
    <text x="345" y="54" font-size="14" fill="var(--c-warn)" font-family="KaTeX_Main" text-anchor="middle">
      <tspan font-style="italic">h</tspan>
      <tspan font-size="10" dy="3">AC</tspan>
      <tspan dy="-3">=</tspan>
      <tspan font-style="italic">h</tspan>
      <tspan font-size="10" dy="3">AB</tspan>
      <tspan dy="-3">+</tspan>
      <tspan font-style="italic">h</tspan>
      <tspan font-size="10" dy="3">BC</tspan>
    </text>
    <text x="612" y="153" font-size="12.5" fill="var(--c-ink-faint)" font-family="system-ui">下落方向</text>
    <CourseArrow :x1="620" y1="166" x2="620" y2="206" color="var(--c-ink-faint)" :width="2.2" />
  </svg>
</template>
