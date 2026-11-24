<script setup lang="ts"></script>

<template>
  <!-- 封面装饰：机械能、内能、电能之间的相互转化（闭环） -->
  <svg viewBox="0 0 340 200" width="330" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="cover-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0 0 L8 4 L0 8 Z" fill="var(--c-accent)" />
      </marker>
    </defs>
    <line x1="98" y1="50" x2="244" y2="50" stroke="var(--c-accent)" stroke-width="1.8" marker-end="url(#cover-arrow)" opacity="0.9" />
    <line x1="268" y1="74" x2="206" y2="146" stroke="var(--c-accent)" stroke-width="1.8" marker-end="url(#cover-arrow)" opacity="0.9" />
    <line x1="126" y1="148" x2="78" y2="76" stroke="var(--c-accent)" stroke-width="1.8" marker-end="url(#cover-arrow)" opacity="0.9" />
    <rect x="24" y="34" width="66" height="28" rx="8" fill="rgba(226, 168, 70, 0.14)" stroke="var(--c-accent)" stroke-width="1.4" />
    <text x="57" y="53" font-size="15" fill="var(--c-accent)" text-anchor="middle">机械能</text>
    <rect x="252" y="34" width="66" height="28" rx="8" fill="rgba(96, 165, 250, 0.14)" stroke="var(--c-velocity)" stroke-width="1.4" />
    <text x="285" y="53" font-size="15" fill="var(--c-velocity)" text-anchor="middle">内能</text>
    <rect x="126" y="152" width="66" height="28" rx="8" fill="rgba(45, 212, 191, 0.14)" stroke="var(--c-physics)" stroke-width="1.4" />
    <text x="159" y="171" font-size="15" fill="var(--c-physics)" text-anchor="middle">电能</text>
    <circle cx="173" cy="108" r="26" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.55" />
    <text x="173" y="113" font-size="16" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)" text-anchor="middle">E</text>
  </svg>
</template>
