<template>
  <!-- 封面装饰：四路非电学量（光、热、力、磁）输入 → 传感器芯片 → 电信号输出 -->
  <svg viewBox="0 0 360 220" width="330" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="152" cy="110" r="74" fill="none" stroke="var(--c-accent)" stroke-width="1" stroke-dasharray="4 7" opacity="0.22" />
    <g stroke-linecap="round" fill="none">
      <path d="M 8 56 H 82" stroke="var(--c-accent)" stroke-width="1.6" opacity="0.6" />
      <path d="M 8 92 H 82" stroke="var(--c-accent-2)" stroke-width="1.6" opacity="0.6" />
      <path d="M 8 128 H 82" stroke="var(--c-physics)" stroke-width="1.6" opacity="0.55" />
      <path d="M 8 164 H 82" stroke="var(--c-force)" stroke-width="1.6" opacity="0.5" />
    </g>
    <g>
      <path d="M 82 52 L 92 56 L 82 60 Z" fill="var(--c-accent)" opacity="0.85" />
      <path d="M 82 88 L 92 92 L 82 96 Z" fill="var(--c-accent-2)" opacity="0.85" />
      <path d="M 82 124 L 92 128 L 82 132 Z" fill="var(--c-physics)" opacity="0.8" />
      <path d="M 82 160 L 92 164 L 82 168 Z" fill="var(--c-force)" opacity="0.75" />
    </g>
    <g stroke="var(--c-accent)" stroke-width="1.5" stroke-linecap="round" opacity="0.55">
      <line x1="122" y1="44" x2="122" y2="58" />
      <line x1="152" y1="44" x2="152" y2="58" />
      <line x1="182" y1="44" x2="182" y2="58" />
      <line x1="122" y1="162" x2="122" y2="176" />
      <line x1="152" y1="162" x2="152" y2="176" />
      <line x1="182" y1="162" x2="182" y2="176" />
    </g>
    <rect x="96" y="58" width="112" height="104" rx="16" fill="var(--c-accent)" fill-opacity="0.07" stroke="var(--c-accent)" stroke-width="1.8" />
    <rect x="120" y="82" width="64" height="56" rx="10" fill="none" stroke="var(--c-accent-2)" stroke-width="1.4" opacity="0.9" />
    <circle cx="152" cy="110" r="4" fill="var(--c-accent)" />
    <line x1="208" y1="110" x2="226" y2="110" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="4 5" opacity="0.35" />
    <path
      d="M 226 110 H 242 V 84 H 258 V 136 H 274 V 84 H 290 V 136 H 306 V 110 H 348"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2.2"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <g fill="var(--c-accent)">
      <circle cx="242" cy="84" r="2.6" />
      <circle cx="258" cy="136" r="2.6" />
      <circle cx="274" cy="84" r="2.6" />
      <circle cx="290" cy="136" r="2.6" />
    </g>
    <g fill="var(--c-accent-2)" opacity="0.5">
      <circle cx="316" cy="52" r="2.2" />
      <circle cx="334" cy="160" r="2.6" />
      <circle cx="64" cy="196" r="1.8" />
    </g>
    <g fill="var(--c-accent)" opacity="0.4">
      <circle cx="300" cy="28" r="1.6" />
      <circle cx="40" cy="24" r="1.4" />
    </g>
  </svg>
</template>
