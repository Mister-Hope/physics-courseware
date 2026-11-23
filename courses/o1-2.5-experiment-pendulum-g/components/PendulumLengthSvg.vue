<script setup lang="ts">
// 第 7 页：摆长的量法（悬点到球心），右侧放大画小球，标出直径 d 与半径 r
</script>

<template>
  <svg viewBox="0 0 760 300" role="img" aria-label="摆长的测量：悬点到球心的距离">
    <line x1="424" y1="28" x2="424" y2="280" stroke="var(--c-border)" stroke-width="1.2" stroke-dasharray="3 7" />
    <rect x="206" y="16" width="80" height="16" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-border)" stroke-width="1.4" />
    <circle cx="246" cy="34" r="4" fill="var(--c-text-dim)" />
    <text x="258" y="30" font-size="15" fill="var(--c-text-dim)">悬点</text>
    <line x1="150" y1="34" x2="246" y2="34" stroke="var(--c-text-dim)" stroke-width="1.1" stroke-dasharray="4 5" opacity="0.45" />
    <line x1="150" y1="34" x2="150" y2="258" stroke="var(--c-accent)" stroke-width="2" />
    <path d="M 150 34 L 145 48 L 155 48 Z" fill="var(--c-accent)" />
    <path d="M 150 258 L 145 244 L 155 244 Z" fill="var(--c-accent)" />
    <text x="130" y="152" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">l</text>
    <line x1="246" y1="34" x2="246" y2="242" stroke="var(--c-text)" stroke-width="1.6" />
    <line x1="150" y1="258" x2="340" y2="258" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="4 5" opacity="0.7" />
    <circle cx="246" cy="258" r="17" fill="var(--c-accent)" opacity="0.12" />
    <circle cx="246" cy="258" r="16" fill="var(--c-accent)" stroke="var(--c-accent-glow)" stroke-width="1.2" />
    <circle cx="246" cy="258" r="3" fill="var(--c-bg)" />
    <text x="246" y="292" font-size="14" fill="var(--c-text-dim)" text-anchor="middle">球心</text>
    <circle cx="600" cy="150" r="64" fill="var(--c-accent)" opacity="0.16" />
    <circle cx="600" cy="150" r="64" fill="none" stroke="var(--c-accent)" stroke-width="1.4" opacity="0.8" />
    <circle cx="600" cy="150" r="3.4" fill="var(--c-text)" />
    <line x1="536" y1="150" x2="664" y2="150" stroke="var(--c-accent-2)" stroke-width="1.6" stroke-dasharray="5 4" />
    <text x="600" y="136" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-accent-2)" text-anchor="middle">d</text>
    <line x1="600" y1="150" x2="645" y2="105" stroke="var(--c-accent-2)" stroke-width="2" />
    <text x="652" y="100" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-accent-2)">r</text>
    <text x="600" y="246" font-size="14" fill="var(--c-text-dim)" text-anchor="middle">小球（放大）</text>
  </svg>
</template>
