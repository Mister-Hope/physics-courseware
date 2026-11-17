<template>
  <!-- 第 14 页：倾斜气垫导轨，滑块上的遮光条通过光电门，用 d/Δt 求速度 -->
  <svg width="900" height="180" viewBox="0 0 900 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="150" x2="870" y2="150" stroke="var(--c-neutral-500)" stroke-width="1.5" stroke-dasharray="6 7" opacity="0.35" />
    <polygon points="60,141 840,71 840,85 60,155" fill="var(--c-surface-solid)" stroke="var(--c-neutral-500)" stroke-width="2.5" stroke-linejoin="round" />
    <g fill="var(--c-neutral-500)" opacity="0.45">
      <circle cx="160" cy="139" r="2.4" />
      <circle cx="260" cy="130" r="2.4" />
      <circle cx="360" cy="121" r="2.4" />
      <circle cx="460" cy="112" r="2.4" />
      <circle cx="560" cy="103" r="2.4" />
      <circle cx="660" cy="94" r="2.4" />
      <circle cx="760" cy="85" r="2.4" />
    </g>
    <polygon
      points="350,95 440,87 440,109 350,117"
      fill="var(--c-accent)"
      fill-opacity="0.28"
      stroke="var(--c-accent)"
      stroke-width="3"
      stroke-linejoin="round"
    />
    <rect x="428" y="76" width="9" height="34" rx="2" fill="var(--c-danger)" fill-opacity="0.8" stroke="var(--c-danger)" stroke-width="2" />
    <text x="442" y="70" font-size="13" fill="var(--c-danger)" font-family="KaTeX_Main" font-style="italic">d</text>
    <path d="M505 103 V64 H545 V96" stroke="var(--c-neutral-500)" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    <text x="525" y="54" font-size="11" fill="var(--c-text-dim)" font-family="system-ui" text-anchor="middle">光电门</text>
    <CourseArrow :from="{ x: 610, y: 94 }" :to="{ x: 700, y: 86 }" stroke="var(--c-accent-2)" :stroke-width="3.2" />
    <text x="650" y="80" font-size="15" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">v</text>
    <g stroke="var(--c-ok)" stroke-width="2">
      <line x1="855" y1="78" x2="855" y2="150" />
      <path d="M849 88 l6 -10 l6 10" fill="none" />
      <path d="M849 140 l6 10 l6 -10" fill="none" />
    </g>
    <text x="845" y="120" font-size="14" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic" text-anchor="end">Δh</text>
  </svg>
</template>
