<!-- 第 8 页：电子束通过双缝，在屏上形成明暗相间的干涉条纹（示意） -->
<template>
  <svg viewBox="0 0 420 240" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="interference-right">
        <rect x="118" y="18" width="300" height="204" />
      </clipPath>
    </defs>
    <circle cx="24" cy="120" r="5" fill="var(--c-accent)" />
    <line x1="29" y1="120" x2="112" y2="120" stroke="var(--c-velocity)" stroke-width="2" stroke-linecap="round" />
    <path d="M 112 120 l -10 -5 M 112 120 l -10 5" fill="none" stroke="var(--c-velocity)" stroke-width="2" stroke-linecap="round" />
    <text x="70" y="108" font-family="KaTeX_Main" font-size="11" fill="var(--c-text-dim)" text-anchor="middle">电子束</text>
    <g fill="none" stroke="var(--c-physics)" stroke-width="1.3" opacity="0.5">
      <path d="M 42 62 q 8 10 0 20 t 0 20 t 0 20 t 0 20 t 0 20" />
      <path d="M 64 62 q 8 10 0 20 t 0 20 t 0 20 t 0 20 t 0 20" />
    </g>
    <g stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round">
      <line x1="118" y1="42" x2="118" y2="90" />
      <line x1="118" y1="106" x2="118" y2="134" />
      <line x1="118" y1="150" x2="118" y2="198" />
    </g>
    <g clip-path="url(#interference-right)" fill="none" stroke="var(--c-physics)" stroke-width="1.2" opacity="0.35">
      <circle cx="118" cy="98" r="28" />
      <circle cx="118" cy="98" r="52" />
      <circle cx="118" cy="98" r="76" />
      <circle cx="118" cy="98" r="100" />
      <circle cx="118" cy="142" r="28" />
      <circle cx="118" cy="142" r="52" />
      <circle cx="118" cy="142" r="76" />
      <circle cx="118" cy="142" r="100" />
    </g>
    <rect x="300" y="34" width="16" height="172" rx="7" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.4" />
    <g fill="var(--c-accent)">
      <rect x="301" y="52" width="14" height="6" rx="3" opacity="0.45" />
      <rect x="301" y="74" width="14" height="6" rx="3" opacity="0.7" />
      <rect x="301" y="96" width="14" height="6" rx="3" opacity="0.9" />
      <rect x="301" y="118" width="14" height="6" rx="3" opacity="1" />
      <rect x="301" y="140" width="14" height="6" rx="3" opacity="0.9" />
      <rect x="301" y="162" width="14" height="6" rx="3" opacity="0.7" />
      <rect x="301" y="184" width="14" height="6" rx="3" opacity="0.45" />
    </g>
    <text x="308" y="228" font-family="KaTeX_Main" font-size="11" fill="var(--c-text-dim)" text-anchor="middle">屏</text>
  </svg>
</template>
