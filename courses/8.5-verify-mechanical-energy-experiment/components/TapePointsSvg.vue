<template>
  <!-- 第 9 页：A、B、C 三个连续计数点，A 到 C 的距离 h_C − h_A 与历时 2T -->
  <svg width="900" height="170" viewBox="0 0 900 170" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="60" y="30" width="780" height="42" rx="8" fill="var(--c-bg-soft)" stroke="var(--c-neutral-500)" stroke-width="2.5" />
    <line x1="70" y1="51" x2="830" y2="51" stroke="var(--c-neutral-500)" stroke-width="1.2" opacity="0.35" />
    <g stroke="var(--c-neutral-500)" stroke-width="1.2" stroke-dasharray="4 5" opacity="0.28">
      <line x1="180" y1="72" x2="180" y2="140" />
      <line x1="400" y1="72" x2="400" y2="140" />
      <line x1="650" y1="72" x2="650" y2="140" />
    </g>
    <g fill="var(--c-text)">
      <circle cx="180" cy="51" r="6" />
      <circle cx="400" cy="51" r="6" />
      <circle cx="650" cy="51" r="6" />
    </g>
    <g font-size="14" fill="var(--c-text-dim)" font-family="KaTeX_Main" font-style="italic" text-anchor="middle">
      <text x="180" y="20">A</text>
      <text x="400" y="20">B</text>
      <text x="650" y="20">C</text>
    </g>
    <g stroke="var(--c-ok)" stroke-width="2">
      <line x1="180" y1="86" x2="650" y2="86" />
      <path d="M186 80 l-6 6 l6 6" fill="none" />
      <path d="M644 80 l6 6 l-6 6" fill="none" />
    </g>
    <text x="386" y="108" font-size="14" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">h</text>
    <text x="395" y="112" font-size="10" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">C</text>
    <text x="406" y="108" font-size="14" fill="var(--c-ok)" font-family="KaTeX_Main">−</text>
    <text x="422" y="108" font-size="14" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">h</text>
    <text x="431" y="112" font-size="10" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">A</text>
    <line x1="180" y1="126" x2="650" y2="126" stroke="var(--c-neutral-500)" stroke-width="1.6" opacity="0.7" />
    <g stroke="var(--c-neutral-500)" stroke-width="1.6" opacity="0.7">
      <line x1="180" y1="120" x2="180" y2="132" />
      <line x1="400" y1="120" x2="400" y2="132" />
      <line x1="650" y1="120" x2="650" y2="132" />
    </g>
    <g font-size="12.5" fill="var(--c-text-dim)" font-family="KaTeX_Main" text-anchor="middle">
      <text x="180" y="150">0</text>
      <text x="400" y="150">T</text>
      <text x="650" y="150">2T</text>
    </g>
  </svg>
</template>
