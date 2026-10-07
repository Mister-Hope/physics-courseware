<template>
  <!-- 第 14 页：高铁以约 300 km/h 匀速飞驰——速度很大但 a = 0（车顶 v 箭头 + 轨枕滚动） -->
  <svg viewBox="0 0 420 206" style="width: 100%; max-width: 420px; height: auto">
    <defs>
      <clipPath id="hsr-rail-clip">
        <rect x="16" y="132" width="388" height="24" />
      </clipPath>
    </defs>
    <line x1="14" y1="22" x2="406" y2="22" stroke="rgba(148,163,184,0.35)" stroke-width="2" />
    <line x1="250" y1="50" x2="250" y2="24" stroke="#94a3b8" stroke-width="2.4" />
    <line x1="230" y1="24" x2="270" y2="24" stroke="#94a3b8" stroke-width="3.4" stroke-linecap="round" />
    <line x1="250" y1="46" x2="236" y2="26" stroke="rgba(148,163,184,0.7)" stroke-width="1.8" />
    <line x1="250" y1="46" x2="264" y2="26" stroke="rgba(148,163,184,0.7)" stroke-width="1.8" />
    <path
      d="M 76 52 L 298 52 C 330 54 352 66 368 82 C 374 87 374 89 368 94 C 352 110 330 122 298 124 L 76 124 C 58 124 52 112 52 96 C 52 76 58 52 76 52 Z"
      fill="rgba(96,165,250,0.10)"
      stroke="#94a3b8"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <rect x="92" y="120" width="76" height="13" rx="6" fill="rgba(148,163,184,0.3)" />
    <rect x="216" y="120" width="76" height="13" rx="6" fill="rgba(148,163,184,0.3)" />
    <line x1="62" y1="110" x2="300" y2="110" stroke="rgba(226,168,70,0.45)" stroke-width="2" />
    <rect x="80" y="67" width="180" height="26" rx="13" fill="rgba(96,165,250,0.22)" />
    <line x1="125" y1="69" x2="125" y2="91" stroke="rgba(15,20,37,0.85)" stroke-width="2" />
    <line x1="170" y1="69" x2="170" y2="91" stroke="rgba(15,20,37,0.85)" stroke-width="2" />
    <line x1="215" y1="69" x2="215" y2="91" stroke="rgba(15,20,37,0.85)" stroke-width="2" />
    <path d="M 300 68 L 346 86 L 334 96 L 300 82 Z" fill="rgba(96,165,250,0.28)" />
    <ellipse cx="354" cy="89" rx="6" ry="5" fill="rgba(226,168,70,0.55)" />
    <line x1="18" y1="88" x2="44" y2="88" stroke="rgba(148,163,184,0.55)" stroke-width="2.6" stroke-dasharray="7 7" stroke-linecap="round" />
    <line x1="16" y1="138" x2="404" y2="138" stroke="rgba(148,163,184,0.45)" stroke-width="2.4" />
    <line x1="16" y1="150" x2="404" y2="150" stroke="rgba(148,163,184,0.45)" stroke-width="2.4" />
    <g class="hsr-rails" clip-path="url(#hsr-rail-clip)" stroke="rgba(148,163,184,0.28)" stroke-width="3">
      <line x1="-2" y1="138" x2="-2" y2="150" />
      <line x1="34" y1="138" x2="34" y2="150" />
      <line x1="70" y1="138" x2="70" y2="150" />
      <line x1="106" y1="138" x2="106" y2="150" />
      <line x1="142" y1="138" x2="142" y2="150" />
      <line x1="178" y1="138" x2="178" y2="150" />
      <line x1="214" y1="138" x2="214" y2="150" />
      <line x1="250" y1="138" x2="250" y2="150" />
      <line x1="286" y1="138" x2="286" y2="150" />
      <line x1="322" y1="138" x2="322" y2="150" />
      <line x1="358" y1="138" x2="358" y2="150" />
      <line x1="394" y1="138" x2="394" y2="150" />
      <line x1="430" y1="138" x2="430" y2="150" />
    </g>
    <text x="132" y="44" text-anchor="middle" style="font-size: 20px" fill="#e2a846">
      <tspan font-family="KaTeX_Math" font-style="italic">a</tspan>
      = 0
    </text>
    <line x1="110" y1="176" x2="244" y2="176" stroke="#e2a846" stroke-width="3.6" stroke-linecap="round" />
    <path d="M 250 176 L 238 169 L 238 183 Z" fill="#e2a846" />
    <text x="110" y="199" style="font-size: 16px" fill="#e2a846">
      <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
      ≈ 300 km/h ≈ 83 m/s
    </text>
  </svg>
</template>
