<template>
  <!-- 第 11 页练习二：A、B 两板间的匀强电场，C 点距 B 板 3 cm、D 点距 A 板 2 cm -->
  <svg viewBox="0 0 420 300" width="420" height="300" font-family="Inter, system-ui, sans-serif">
    <defs>
      <marker id="pp-f" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#f87171" />
      </marker>
      <marker id="pp-d1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#94a3b8" />
      </marker>
    </defs>
    <rect x="70" y="34" width="300" height="14" rx="3" fill="#e2a846" fill-opacity="0.3" stroke="#e2a846" stroke-width="1.5" />
    <text x="60" y="45" text-anchor="end" fill="#e2a846" font-size="12.5" font-weight="700">A</text>
    <text x="60" y="60" text-anchor="end" fill="#e2a846" font-size="13" font-weight="700">+</text>
    <rect x="70" y="252" width="300" height="14" rx="3" fill="#60a5fa" fill-opacity="0.22" stroke="#60a5fa" stroke-width="1.5" />
    <text x="60" y="263" text-anchor="end" fill="#60a5fa" font-size="12.5" font-weight="700">B</text>
    <text x="60" y="278" text-anchor="end" fill="#60a5fa" font-size="13.5" font-weight="700">−</text>
    <g stroke="var(--c-field)" stroke-width="1.5" stroke-opacity="0.65">
      <line x1="120" y1="56" x2="120" y2="250" />
      <line x1="220" y1="56" x2="220" y2="250" />
      <line x1="320" y1="56" x2="320" y2="250" />
    </g>
    <g fill="var(--c-field)" fill-opacity="0.8">
      <path d="M 115 146 L 125 146 L 120 157 Z" />
      <path d="M 215 146 L 225 146 L 220 157 Z" />
      <path d="M 315 146 L 325 146 L 320 157 Z" />
    </g>
    <circle cx="170" cy="189" r="6" fill="#e2e8f0" />
    <text x="156" y="193" text-anchor="end" fill="#e2e8f0" font-size="12.5">C</text>
    <circle cx="280" cy="78" r="6" fill="#e2e8f0" />
    <text x="292" y="82" fill="#e2e8f0" font-size="12.5">D</text>
    <text x="352" y="156" text-anchor="end" fill="#cbd5e1" font-size="11" font-style="italic" font-family="KaTeX_Math">E</text>
    <g v-if="showAnalysis">
      <line x1="100" y1="189" x2="164" y2="189" stroke="#94a3b8" stroke-width="1.1" marker-end="url(#pp-d1)" />
      <text x="132" y="206" text-anchor="middle" fill="#cbd5e1" font-size="10.5" font-family="KaTeX_Main">3 cm</text>
      <line x1="300" y1="78" x2="360" y2="78" stroke="#94a3b8" stroke-width="1.1" marker-end="url(#pp-d1)" />
      <text x="330" y="95" text-anchor="middle" fill="#cbd5e1" font-size="10.5" font-family="KaTeX_Main">2 cm</text>
      <line x1="220" y1="78" x2="220" y2="189" stroke="#f87171" stroke-width="2.4" marker-end="url(#pp-f)" />
      <text x="232" y="140" fill="#f87171" font-size="11">
        <tspan font-style="italic" font-family="KaTeX_Math">d</tspan>
        <tspan font-family="KaTeX_Main">= 5 cm</tspan>
      </text>
      <text x="296" y="60" fill="#e2c07a" font-size="10.5" font-style="italic" font-family="KaTeX_Math">
        φ
        <tspan font-size="8" dy="3">D</tspan>
      </text>
      <text x="156" y="212" text-anchor="end" fill="#e2c07a" font-size="10.5" font-style="italic" font-family="KaTeX_Math">
        φ
        <tspan font-size="8" dy="3">C</tspan>
      </text>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ showAnalysis?: boolean }>();
</script>
