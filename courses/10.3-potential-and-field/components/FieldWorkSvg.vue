<template>
  <!-- 第 3 页：正电荷沿电场线从 A 移到 B（a 图），分析标注按 v-click 追加 -->
  <svg viewBox="0 0 470 300" width="470" height="300" font-family="Inter, system-ui, sans-serif">
    <defs>
      <marker id="fw-f" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#f87171" />
      </marker>
    </defs>
    <rect x="36" y="46" width="16" height="208" rx="3" fill="#e2a846" fill-opacity="0.3" stroke="#e2a846" stroke-width="1.5" />
    <text x="28" y="155" text-anchor="end" fill="#e2a846" font-size="12.5" font-weight="700">+</text>
    <rect x="425" y="46" width="16" height="208" rx="3" fill="#60a5fa" fill-opacity="0.22" stroke="#60a5fa" stroke-width="1.5" />
    <text x="450" y="155" fill="#60a5fa" font-size="13.5" font-weight="700">−</text>
    <line x1="60" y1="66" x2="414" y2="66" stroke="var(--c-field)" stroke-width="1.2" stroke-opacity="0.45" />
    <line x1="60" y1="234" x2="414" y2="234" stroke="var(--c-field)" stroke-width="1.2" stroke-opacity="0.45" />
    <g stroke="var(--c-field)" stroke-width="2" stroke-opacity="0.9">
      <line x1="160" y1="150" x2="200" y2="150" />
      <line x1="230" y1="150" x2="270" y2="150" />
      <line x1="300" y1="150" x2="340" y2="150" />
    </g>
    <path d="M 200 145 L 211 150 L 200 155 Z" fill="var(--c-field)" />
    <path d="M 270 145 L 281 150 L 270 155 Z" fill="var(--c-field)" />
    <path d="M 340 145 L 351 150 L 340 155 Z" fill="var(--c-field)" />
    <circle cx="150" cy="150" r="11" fill="var(--c-force)" fill-opacity="0.9" stroke="#ffffff" stroke-width="1.5" />
    <text x="150" y="154.5" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">+</text>
    <text x="150" y="127" text-anchor="middle" fill="#f8c0c0" font-size="12">A</text>
    <circle cx="330" cy="150" r="5" fill="#e2e8f0" />
    <text x="330" y="127" text-anchor="middle" fill="#cbd5e1" font-size="12">B</text>
    <line x1="150" y1="192" x2="330" y2="192" stroke="#94a3b8" stroke-width="1.1" />
    <line x1="150" y1="186" x2="150" y2="198" stroke="#94a3b8" stroke-width="1.1" />
    <line x1="330" y1="186" x2="330" y2="198" stroke="#94a3b8" stroke-width="1.1" />
    <text x="240" y="212" text-anchor="middle" fill="#cbd5e1" font-size="11">
      <tspan font-family="Inter, system-ui, sans-serif">沿电场线方向距离</tspan>
      <tspan font-style="italic" font-family="KaTeX_Math">d</tspan>
    </text>
    <g v-if="showAnalysis">
      <line x1="150" y1="150" x2="230" y2="150" stroke="#f87171" stroke-width="2.8" marker-end="url(#fw-f)" />
      <text x="190" y="140" text-anchor="middle" fill="#f87171" font-size="10.5" font-style="italic" font-family="KaTeX_Math">F</text>
      <text x="190" y="236" text-anchor="middle" fill="#94a3b8" font-size="11" font-style="italic" font-family="KaTeX_Math">W = qU</text>
      <text x="190" y="252" text-anchor="middle" fill="#94a3b8" font-size="11" font-style="italic" font-family="KaTeX_Math">W = qEd</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ showAnalysis?: boolean }>();
</script>
