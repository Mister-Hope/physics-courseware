<template>
  <!-- 第 7 页例题：带电粒子在 M、N 两板间由静止加速，d 标在底部 -->
  <svg viewBox="0 0 420 280" width="420" height="280" font-family="Inter, system-ui, sans-serif">
    <defs>
      <marker id="ep-f" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#f87171" />
      </marker>
      <marker id="ep-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#e2e8f0" />
      </marker>
    </defs>
    <rect x="36" y="36" width="15" height="200" rx="3" fill="#e2a846" fill-opacity="0.3" stroke="#e2a846" stroke-width="1.5" />
    <text x="28" y="140" text-anchor="end" fill="#e2a846" font-size="12.5" font-weight="700">M</text>
    <text x="28" y="156" text-anchor="end" fill="#e2a846" font-size="13" font-weight="700">+</text>
    <rect x="372" y="36" width="15" height="200" rx="3" fill="#60a5fa" fill-opacity="0.22" stroke="#60a5fa" stroke-width="1.5" />
    <text x="396" y="140" fill="#60a5fa" font-size="12.5" font-weight="700">N</text>
    <text x="396" y="156" fill="#60a5fa" font-size="13.5" font-weight="700">−</text>
    <g stroke="var(--c-field)" stroke-width="1.6" stroke-opacity="0.7">
      <line x1="62" y1="80" x2="362" y2="80" />
      <line x1="62" y1="200" x2="362" y2="200" />
    </g>
    <g fill="var(--c-field)" fill-opacity="0.85">
      <path d="M 186 75 L 198 80 L 186 85 Z" />
      <path d="M 286 75 L 298 80 L 286 85 Z" />
      <path d="M 186 195 L 198 200 L 186 205 Z" />
      <path d="M 286 195 L 298 200 L 286 205 Z" />
    </g>
    <line x1="72" y1="140" x2="362" y2="140" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5 5" stroke-opacity="0.55" />
    <circle cx="78" cy="140" r="10" fill="var(--c-force)" fill-opacity="0.92" stroke="#ffffff" stroke-width="1.5" />
    <text x="78" y="144.5" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700">+</text>
    <text x="78" y="120" text-anchor="middle" fill="#f8c0c0" font-size="11">粒子</text>
    <line x1="51" y1="252" x2="372" y2="252" stroke="#94a3b8" stroke-width="1.1" />
    <line x1="51" y1="246" x2="51" y2="258" stroke="#94a3b8" stroke-width="1.1" />
    <line x1="372" y1="246" x2="372" y2="258" stroke="#94a3b8" stroke-width="1.1" />
    <text x="211" y="271" text-anchor="middle" fill="#cbd5e1" font-size="11">
      <tspan font-style="italic" font-family="KaTeX_Math">d</tspan>
      <tspan font-family="KaTeX_Main">= 0.04 m</tspan>
    </text>
    <text x="211" y="26" text-anchor="middle" fill="#cbd5e1" font-size="11.5">
      <tspan font-style="italic" font-family="KaTeX_Math">U</tspan>
      <tspan font-family="KaTeX_Main">= 200 V</tspan>
    </text>
    <g v-if="showAnalysis">
      <line x1="78" y1="140" x2="190" y2="140" stroke="#f87171" stroke-width="2.8" marker-end="url(#ep-f)" />
      <text x="134" y="130" text-anchor="middle" fill="#f87171" font-size="10.5" font-style="italic" font-family="KaTeX_Math">F</text>
      <line x1="230" y1="172" x2="330" y2="172" stroke="#e2e8f0" stroke-width="2.2" marker-end="url(#ep-v)" />
      <text x="280" y="192" text-anchor="middle" fill="#e2e8f0" font-size="11" font-style="italic" font-family="KaTeX_Math">v</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ showAnalysis?: boolean }>();
</script>
