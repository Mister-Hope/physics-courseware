<template>
  <!-- 第 13 页例题：单摆从最大偏角处释放，标出悬点、摆长 l、偏角 θ 与最低点 O -->
  <svg width="300" height="340" viewBox="0 0 300 340" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto">
    <line x1="86" y1="36" x2="214" y2="36" stroke="var(--c-neutral-500)" stroke-width="5" stroke-linecap="round" />
    <circle cx="150" cy="36" r="4.5" fill="var(--c-text-dim)" />
    <line x1="150" y1="36" x2="150" y2="276" stroke="var(--c-neutral-500)" stroke-width="1.6" stroke-dasharray="7 7" opacity="0.38" />
    <path d="M 30 244 A 240 240 0 0 0 150 276" stroke="var(--c-neutral-500)" stroke-width="1.8" stroke-dasharray="7 7" opacity="0.5" />
    <line x1="150" y1="36" x2="30" y2="244" stroke="var(--c-neutral-500)" stroke-width="2.2" />
    <path d="M 150 78 A 42 42 0 0 1 129 72.4" stroke="var(--c-accent)" stroke-width="2" />
    <text x="136" y="96" font-size="15" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic">θ</text>
    <text x="102" y="147" font-size="15" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">l</text>
    <circle cx="30" cy="244" r="12" fill="var(--c-accent)" fill-opacity="0.3" stroke="var(--c-accent)" stroke-width="3" />
    <circle cx="150" cy="276" r="5" fill="var(--c-bg-soft)" stroke="var(--c-neutral-500)" stroke-width="2" />
    <text x="160" y="284" font-size="13" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic">O</text>
  </svg>
</template>
