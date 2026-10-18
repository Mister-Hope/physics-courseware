<template>
  <!-- 第 10 页：电场线上 P 点的切线方向就是该点电场方向 -->
  <svg viewBox="0 0 340 190" class="w-full h-full">
    <defs>
      <marker id="ft-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-force)" />
      </marker>
    </defs>
    <path d="M 56 130 C 120 70 220 64 300 96" stroke="var(--c-field)" stroke-width="2.6" fill="none" stroke-opacity="0.85" />
    <circle cx="197" cy="100" r="5.5" fill="var(--c-gold)" />
    <line x1="130" y1="131" x2="262" y2="71" stroke="var(--c-text-mute)" stroke-opacity="0.5" stroke-width="1.6" stroke-dasharray="5 5" />
    <line x1="197" y1="100" x2="255" y2="74" stroke="var(--c-force)" stroke-width="3" marker-end="url(#ft-arrow)" />
    <text x="266" y="66" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-force)">E</text>
    <text x="184" y="120" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-gold)">P</text>
  </svg>
</template>
