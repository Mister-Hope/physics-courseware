<!-- 封面装饰：小球撞墙、冲击线与回弹轨迹，呼应“冲量—动量变化”。 -->
<template>
  <svg viewBox="0 0 320 200" width="320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="cover-ball" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#ffd27a" />
        <stop offset="100%" stop-color="#d99a33" />
      </radialGradient>
    </defs>
    <path d="M 30 62 C 92 34 170 38 232 92" fill="none" stroke="var(--c-accent-2)" stroke-width="2" stroke-dasharray="5 5" opacity="0.55" />
    <path d="M 226 96 C 180 136 112 142 52 118" fill="none" stroke="var(--c-accent-2)" stroke-width="2" stroke-dasharray="5 5" opacity="0.4" />
    <line x1="252" y1="32" x2="252" y2="168" stroke="var(--c-neutral-500)" stroke-width="6" stroke-linecap="round" />
    <line x1="262" y1="32" x2="262" y2="168" stroke="var(--c-neutral-700)" stroke-width="3" stroke-linecap="round" />
    <g stroke="var(--c-accent)" stroke-width="2.4" stroke-linecap="round">
      <line x1="234" y1="90" x2="222" y2="78" />
      <line x1="234" y1="102" x2="220" y2="106" />
      <line x1="234" y1="96" x2="216" y2="96" />
    </g>
    <circle cx="96" cy="92" r="25" fill="url(#cover-ball)" stroke="#f3c56d" stroke-width="1.5" />
    <circle cx="88" cy="84" r="7" fill="#fff" opacity="0.22" />
    <g stroke="var(--c-accent-2)" stroke-width="2" stroke-linecap="round" opacity="0.7">
      <line x1="26" y1="86" x2="52" y2="86" />
      <line x1="32" y1="98" x2="58" y2="98" />
      <line x1="40" y1="110" x2="62" y2="110" />
    </g>
    <path
      d="M 20 176 C 58 168 96 184 134 176 C 172 168 210 184 248 176 C 276 171 296 176 306 174"
      fill="none"
      stroke="var(--c-neutral-700)"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>
