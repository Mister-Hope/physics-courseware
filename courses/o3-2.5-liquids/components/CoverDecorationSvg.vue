<!-- 封面装饰：水滴（表面张力方向）+ 毛细管中上升的液面 -->
<template>
  <svg viewBox="0 0 340 210" width="320" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="drop-fill" cx="38%" cy="34%" r="72%">
        <stop offset="0%" stop-color="rgba(96,165,250,0.55)" />
        <stop offset="100%" stop-color="rgba(59,130,246,0.18)" />
      </radialGradient>
    </defs>
    <path
      d="M 118 46 C 148 78 172 100 172 122 A 54 54 0 1 1 64 122 C 64 100 88 78 118 46 Z"
      fill="url(#drop-fill)"
      stroke="var(--c-velocity)"
      stroke-width="2.4"
      stroke-linejoin="round"
    />
    <circle cx="100" cy="108" r="9" fill="rgba(241,245,249,0.55)" />
    <line x1="56" y1="152" x2="56" y2="124" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" />
    <path d="M 56 120 L 50 133 L 62 133 Z" fill="var(--c-accent)" />
    <line x1="180" y1="152" x2="180" y2="124" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" />
    <path d="M 180 120 L 174 133 L 186 133 Z" fill="var(--c-accent)" />
    <path d="M 226 55 L 226 172 M 262 55 L 262 172" stroke="var(--c-neutral-300)" stroke-width="2.4" stroke-linecap="round" fill="none" />
    <path d="M 226 84 Q 244 106 262 84 L 262 172 L 226 172 Z" fill="rgba(96,165,250,0.28)" stroke="var(--c-velocity)" stroke-width="1.4" />
    <line x1="206" y1="124" x2="286" y2="124" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.55" />
    <line x1="226" y1="84" x2="226" y2="124" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="4 4" />
    <path d="M 226 122 L 221 112 L 231 112 Z" fill="var(--c-accent)" />
    <text x="290" y="86" font-size="13" fill="var(--c-text-dim)" font-family="KaTeX_Main">h</text>
  </svg>
</template>
