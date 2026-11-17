<template>
  <!-- 第 8 页：从起始点 O 起，纸带上 A、B、C、D 各点到 O 的距离 h_A、h_B、h_C -->
  <svg width="900" height="170" viewBox="0 0 900 170" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="60" y="30" width="780" height="42" rx="8" fill="var(--c-bg-soft)" stroke="var(--c-neutral-500)" stroke-width="2.5" />
    <line x1="70" y1="51" x2="830" y2="51" stroke="var(--c-neutral-500)" stroke-width="1.2" opacity="0.35" />
    <g stroke="var(--c-neutral-500)" stroke-width="1.2" stroke-dasharray="4 5" opacity="0.28">
      <line x1="90" y1="72" x2="90" y2="140" />
      <line x1="180" y1="72" x2="180" y2="140" />
      <line x1="300" y1="72" x2="300" y2="140" />
      <line x1="450" y1="72" x2="450" y2="140" />
      <line x1="630" y1="72" x2="630" y2="140" />
    </g>
    <g fill="var(--c-text)">
      <circle cx="90" cy="51" r="6" />
      <circle cx="180" cy="51" r="6" />
      <circle cx="300" cy="51" r="6" />
      <circle cx="450" cy="51" r="6" />
      <circle cx="630" cy="51" r="6" />
    </g>
    <g font-size="14" fill="var(--c-text-dim)" font-family="KaTeX_Main" font-style="italic" text-anchor="middle">
      <text x="90" y="20">O</text>
      <text x="180" y="20">A</text>
      <text x="300" y="20">B</text>
      <text x="450" y="20">C</text>
      <text x="630" y="20">D</text>
    </g>
    <g stroke="var(--c-ok)" stroke-width="2">
      <line x1="90" y1="88" x2="180" y2="88" />
      <path d="M96 82 l-6 6 l6 6" fill="none" />
      <path d="M174 82 l6 6 l-6 6" fill="none" />
    </g>
    <text x="126" y="108" font-size="14" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">h</text>
    <text x="135" y="112" font-size="10" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">A</text>
    <g stroke="var(--c-accent)" stroke-width="2">
      <line x1="90" y1="112" x2="300" y2="112" />
      <path d="M96 106 l-6 6 l6 6" fill="none" />
      <path d="M294 106 l6 6 l-6 6" fill="none" />
    </g>
    <text x="186" y="132" font-size="14" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic">h</text>
    <text x="195" y="136" font-size="10" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic">B</text>
    <g stroke="var(--c-accent-2)" stroke-width="2">
      <line x1="90" y1="136" x2="450" y2="136" />
      <path d="M96 130 l-6 6 l6 6" fill="none" />
      <path d="M444 130 l6 6 l-6 6" fill="none" />
    </g>
    <text x="261" y="156" font-size="14" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">h</text>
    <text x="270" y="160" font-size="10" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">C</text>
  </svg>
</template>
