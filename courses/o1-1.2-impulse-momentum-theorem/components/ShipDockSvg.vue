<!-- 第 3 页：船靠岸，码头边挂着旧轮胎；只画情境，不画受力分析。 -->
<template>
  <svg viewBox="0 0 420 220" width="420" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 0 170 C 30 164 60 176 90 170 C 120 164 150 176 180 170 C 210 164 240 176 270 170 C 300 164 330 176 360 170 C 380 166 400 170 420 168"
      fill="none"
      stroke="var(--c-neutral-700)"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M 0 182 C 30 176 60 188 90 182 C 120 176 150 188 180 182 C 210 176 240 188 270 182 C 300 176 330 188 360 182 C 380 178 400 182 420 180"
      fill="none"
      stroke="var(--c-neutral-700)"
      stroke-width="1.5"
      stroke-linecap="round"
      opacity="0.6"
    />
    <rect x="300" y="96" width="104" height="78" rx="4" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.5" />
    <line x1="300" y1="96" x2="300" y2="174" stroke="var(--c-border-glow)" stroke-width="2" />
    <rect x="310" y="174" width="8" height="26" fill="var(--c-neutral-700)" />
    <rect x="380" y="174" width="8" height="26" fill="var(--c-neutral-700)" />
    <line x1="334" y1="80" x2="308" y2="106" stroke="var(--c-accent)" stroke-width="1.4" stroke-dasharray="3 3" />
    <text x="338" y="76" fill="var(--c-accent)" font-family="system-ui, sans-serif" font-size="12">旧轮胎</text>
    <text x="338" y="190" fill="var(--c-text-dim)" font-family="system-ui, sans-serif" font-size="12">码头</text>
    <g fill="none" stroke="var(--c-text)" stroke-width="5">
      <circle cx="300" cy="112" r="11" />
      <circle cx="300" cy="138" r="11" />
      <circle cx="300" cy="164" r="11" />
    </g>
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.3">
      <circle cx="300" cy="112" r="11" />
      <circle cx="300" cy="138" r="11" />
      <circle cx="300" cy="164" r="11" />
    </g>
    <path d="M 40 122 L 250 122 L 232 166 L 58 166 Z" fill="var(--c-surface-solid)" stroke="var(--c-border-glow)" stroke-width="1.6" />
    <rect x="92" y="82" width="80" height="40" rx="6" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.4" />
    <rect x="104" y="94" width="18" height="12" rx="2" fill="var(--c-physics)" opacity="0.55" />
    <rect x="132" y="94" width="18" height="12" rx="2" fill="var(--c-physics)" opacity="0.55" />
    <line x1="92" y1="122" x2="172" y2="122" stroke="var(--c-accent)" stroke-width="2" opacity="0.6" />
    <CourseArrow :from="{ x: 150, y: 62 }" :to="{ x: 252, y: 62 }" stroke="var(--c-accent-2)" :stroke-width="2.2" :dasharray="5" />
    <text x="186" y="50" fill="var(--c-accent-2)" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">靠岸</text>
  </svg>
</template>
