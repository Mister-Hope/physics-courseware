<template>
  <svg width="860" height="330" viewBox="0 0 860 330" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mce-cv-swing" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--c-warn)" />
        <stop offset="1" stop-color="var(--c-warn)" stop-opacity="0.15" />
      </linearGradient>
    </defs>
    <line x1="70" y1="64" x2="790" y2="64" stroke="var(--c-ink-faint)" stroke-width="7" stroke-linecap="round" />
    <circle cx="200" cy="64" r="7" fill="var(--c-ink-faint)" />
    <circle cx="430" cy="64" r="7" fill="var(--c-ink-faint)" />
    <circle cx="660" cy="64" r="7" fill="var(--c-ink-faint)" />
    <path d="M200 64 Q258 178 310 228" stroke="var(--c-line-strong)" stroke-width="2" stroke-dasharray="7 8" opacity="0.6" />
    <path d="M200 64 Q142 178 90 228" stroke="var(--c-line-strong)" stroke-width="2" stroke-dasharray="7 8" opacity="0.6" />
    <line x1="200" y1="64" x2="200" y2="252" stroke="var(--c-line-strong)" stroke-width="2" stroke-dasharray="7 8" opacity="0.6" />
    <line x1="90" y1="228" x2="310" y2="228" stroke="var(--c-line-strong)" stroke-width="2" stroke-dasharray="7 8" opacity="0.6" />
    <text x="94" y="218" font-size="15" fill="var(--c-ink-faint)" font-family="KaTeX_Main">A</text>
    <text x="300" y="218" font-size="15" fill="var(--c-ink-faint)" font-family="KaTeX_Main">B</text>
    <line x1="200" y1="64" x2="104" y2="221" stroke="var(--c-warn)" stroke-width="4" stroke-linecap="round" />
    <circle cx="104" cy="228" r="26" fill="url(#mce-cv-swing)" stroke="var(--c-warn)" stroke-width="4" />
    <line x1="200" y1="64" x2="200" y2="226" stroke="var(--c-line-strong)" stroke-width="3" stroke-linecap="round" />
    <circle cx="200" cy="230" r="26" fill="var(--c-warn)" fill-opacity="0.3" stroke="var(--c-warn)" stroke-width="4" />
    <line x1="200" y1="64" x2="296" y2="221" stroke="var(--c-line-strong)" stroke-width="3" stroke-linecap="round" />
    <circle cx="296" cy="228" r="26" fill="var(--c-warn)" fill-opacity="0.15" stroke="var(--c-warn)" stroke-width="4" />
    <CourseArrow :x1="200" y1="230" x2="200" y2="306" color="var(--c-info)" :width="3.5" />
    <text x="208" y="296" font-size="16" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">v</text>
    <CourseArrow :x1="104" y1="228" x2="66" y2="228" color="var(--c-info)" :width="3" />
    <text x="70" y="214" font-size="14" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">v</text>
    <CourseArrow :x1="296" y1="228" x2="334" y2="228" color="var(--c-info)" :width="3" />
    <text x="318" y="214" font-size="14" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">v</text>
    <rect x="430" y="118" width="30" height="152" rx="8" fill="var(--c-ok)" fill-opacity="0.16" stroke="var(--c-ok)" stroke-width="3" />
    <text x="445" y="106" font-size="15" fill="var(--c-ok)" font-family="KaTeX_Main" text-anchor="middle">
      E
      <tspan font-size="11" dy="3">p</tspan>
    </text>
    <rect x="490" y="198" width="30" height="72" rx="8" fill="var(--c-info)" fill-opacity="0.16" stroke="var(--c-info)" stroke-width="3" />
    <text x="505" y="186" font-size="15" fill="var(--c-info)" font-family="KaTeX_Main" text-anchor="middle">
      E
      <tspan font-size="11" dy="3">k</tspan>
    </text>
    <line x1="424" y1="270" x2="526" y2="270" stroke="var(--c-ok)" stroke-width="3" stroke-linecap="round" />
    <text x="475" y="292" font-size="14" fill="var(--c-ink-faint)" font-family="KaTeX_Main" text-anchor="middle">
      E = E
      <tspan font-size="10" dy="3">k</tspan>
      <tspan dy="-3">+ E</tspan>
      <tspan font-size="10" dy="3">p</tspan>
    </text>
  </svg>
</template>
