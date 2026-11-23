<!-- 第 1 页封面装饰：一组做无规则运动的分子与碰撞轨迹 -->
<template>
  <svg viewBox="0 0 320 200" width="320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="cover-mol-gold" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#f6d48a" />
        <stop offset="100%" stop-color="#e2a846" />
      </radialGradient>
      <radialGradient id="cover-mol-teal" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#7ff0df" />
        <stop offset="100%" stop-color="#2dd4bf" />
      </radialGradient>
      <radialGradient id="cover-mol-blue" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#93c5fd" />
        <stop offset="100%" stop-color="#3b82f6" />
      </radialGradient>
    </defs>
    <rect x="10" y="22" width="300" height="156" rx="22" fill="rgba(15,23,42,0.55)" stroke="var(--c-border)" />
    <path
      d="M 42 144 C 74 118 92 152 122 128 C 152 104 168 142 198 112 C 226 84 246 122 278 92"
      fill="none"
      stroke="var(--c-accent-2)"
      stroke-width="1.4"
      stroke-dasharray="5 6"
      opacity="0.55"
    />
    <path
      d="M 38 72 C 70 94 96 56 128 78 C 156 98 178 62 210 82 C 238 100 260 68 284 74"
      fill="none"
      stroke="var(--c-neutral-500)"
      stroke-width="1.2"
      stroke-dasharray="3 7"
      opacity="0.5"
    />
    <circle cx="58" cy="150" r="14" fill="url(#cover-mol-teal)" opacity="0.9" />
    <circle cx="116" cy="54" r="11" fill="url(#cover-mol-blue)" opacity="0.9" />
    <circle cx="168" cy="138" r="17" fill="url(#cover-mol-gold)" opacity="0.95" />
    <circle cx="224" cy="72" r="12" fill="url(#cover-mol-teal)" opacity="0.9" />
    <circle cx="274" cy="144" r="9" fill="url(#cover-mol-blue)" opacity="0.9" />
    <circle cx="196" cy="40" r="6" fill="url(#cover-mol-gold)" opacity="0.8" />
    <path d="M 58 150 L 78 136" stroke="var(--c-accent-2)" stroke-width="1.8" stroke-linecap="round" />
    <path d="M 168 138 L 190 120" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" />
    <path d="M 224 72 L 244 60" stroke="var(--c-physics)" stroke-width="1.8" stroke-linecap="round" />
    <circle cx="78" cy="136" r="2.5" fill="var(--c-accent-2)" />
    <circle cx="190" cy="120" r="2.5" fill="var(--c-accent)" />
    <circle cx="244" cy="60" r="2.5" fill="var(--c-physics)" />
    <line x1="28" y1="172" x2="292" y2="172" stroke="var(--c-neutral-600)" stroke-width="1" opacity="0.5" />
  </svg>
</template>
