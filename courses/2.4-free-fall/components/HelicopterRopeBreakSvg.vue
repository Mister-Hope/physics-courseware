<template>
  <!-- 第 25 页：直升机匀速上升时绳断——小球先继续上升 5 m 到最高点，再下落 15 m 经 3 s 落地 -->
  <svg viewBox="0 0 340 264" width="100%" style="display: block; max-width: 21rem; margin: 0 auto" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="240" x2="322" y2="240" stroke="#475569" stroke-width="2" />
    <line x1="60" y1="14" x2="120" y2="14" stroke="#94a3b8" stroke-width="2.5" />
    <rect x="70" y="18" width="40" height="18" rx="7" fill="rgba(148,163,184,0.2)" stroke="#94a3b8" stroke-width="1.4" />
    <line x1="52" y1="27" x2="70" y2="27" stroke="#94a3b8" stroke-width="2.5" />
    <text x="12" y="56" font-size="14" fill="#94a3b8">
      直升机
      <tspan font-family="KaTeX_Main">10 m/s</tspan>
      上升
    </text>
    <line x1="90" y1="40" x2="90" y2="72" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="5 4" />
    <line x1="90" y1="92" x2="90" y2="112" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="5 4" />
    <line x1="84" y1="78" x2="96" y2="88" stroke="#f87171" stroke-width="2" />
    <line x1="84" y1="88" x2="96" y2="78" stroke="#f87171" stroke-width="2" />
    <text x="102" y="86" font-size="14" fill="#f87171">绳断</text>
    <circle cx="90" cy="120" r="7" fill="#e2a846" />
    <line x1="98" y1="120" x2="182" y2="120" stroke="rgba(226,168,70,0.45)" stroke-width="1.2" stroke-dasharray="4 4" />
    <line x1="190" y1="116" x2="190" y2="92" stroke="#e2a846" stroke-width="2.6" />
    <polygon points="190,84 184,94 196,94" fill="#e2a846" />
    <line x1="190" y1="124" x2="190" y2="206" stroke="#2dd4bf" stroke-width="2.6" />
    <polygon points="190,216 184,204 196,204" fill="#2dd4bf" />
    <circle cx="190" cy="120" r="4" fill="#e2a846" />
    <circle cx="190" cy="234" r="6" fill="#2dd4bf" />
    <text x="200" y="76" font-size="14" fill="#e2a846">
      最高点：再上升
      <tspan font-family="KaTeX_Main">5 m</tspan>
    </text>
    <text x="200" y="256" font-size="14" fill="#2dd4bf">
      <tspan font-family="KaTeX_Math" font-style="italic">t</tspan>
      <tspan font-family="KaTeX_Main">= 3 s 落地</tspan>
    </text>
    <text x="176" y="106" text-anchor="end" font-size="14" fill="#94a3b8">
      <tspan font-family="KaTeX_Main">5 m</tspan>
    </text>
    <text x="176" y="180" text-anchor="end" font-size="14" fill="#94a3b8">
      <tspan font-family="KaTeX_Main">15 m</tspan>
    </text>
  </svg>
</template>
