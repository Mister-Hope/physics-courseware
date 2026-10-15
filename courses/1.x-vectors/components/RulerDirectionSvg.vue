<template>
  <!-- 第 3 页：同一把直尺横放与斜放，长度相同、指向不同 -->
  <svg viewBox="0 0 300 150" width="100%" style="max-width: 16rem" xmlns="http://www.w3.org/2000/svg">
    <text x="145" y="12" text-anchor="middle" font-size="12" fill="var(--c-accent)">5 cm</text>
    <rect x="20" y="18" width="250" height="26" rx="5" fill="color-mix(in srgb, var(--c-accent) 12%, transparent)" stroke="var(--c-accent)" stroke-width="1.3" />
    <g stroke="var(--c-accent)" stroke-width="1" opacity="0.85">
      <line x1="45" y1="18" x2="45" y2="28" />
      <line x1="70" y1="18" x2="70" y2="32" />
      <line x1="95" y1="18" x2="95" y2="28" />
      <line x1="120" y1="18" x2="120" y2="32" />
      <line x1="145" y1="18" x2="145" y2="28" />
      <line x1="170" y1="18" x2="170" y2="32" />
      <line x1="195" y1="18" x2="195" y2="28" />
      <line x1="220" y1="18" x2="220" y2="32" />
      <line x1="245" y1="18" x2="245" y2="28" />
    </g>
    <g transform="rotate(-16 145 99)">
      <rect x="20" y="86" width="250" height="26" rx="5" fill="color-mix(in srgb, var(--c-text-dim) 14%, transparent)" stroke="var(--c-text-dim)" stroke-width="1.3" />
      <g stroke="var(--c-text-dim)" stroke-width="1" opacity="0.8">
        <line x1="45" y1="86" x2="45" y2="96" />
        <line x1="70" y1="86" x2="70" y2="100" />
        <line x1="95" y1="86" x2="95" y2="96" />
        <line x1="120" y1="86" x2="120" y2="100" />
        <line x1="145" y1="86" x2="145" y2="96" />
        <line x1="170" y1="86" x2="170" y2="100" />
        <line x1="195" y1="86" x2="195" y2="96" />
        <line x1="220" y1="86" x2="220" y2="100" />
        <line x1="245" y1="86" x2="245" y2="96" />
      </g>
      <text x="145" y="104" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">还是 5 cm</text>
    </g>
    <path d="M 280 66 L 292 74 L 280 82" fill="none" stroke="var(--c-neutral-500)" stroke-width="1.5" stroke-linejoin="round" />
  </svg>
</template>
