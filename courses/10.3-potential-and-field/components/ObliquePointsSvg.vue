<template>
  <!-- 第 5 页：A、B 不在同一条电场线上，用"平移等势面 + 逐差"把路径接起来 -->
  <svg viewBox="0 0 440 268" width="440" height="268" font-family="Inter, system-ui, sans-serif">
    <defs>
      <marker id="ob-f" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#f87171" />
      </marker>
    </defs>
    <rect x="40" y="30" width="370" height="13" rx="3" fill="#e2a846" fill-opacity="0.3" stroke="#e2a846" stroke-width="1.4" />
    <rect x="40" y="225" width="370" height="13" rx="3" fill="#60a5fa" fill-opacity="0.22" stroke="#60a5fa" stroke-width="1.4" />
    <g stroke="var(--c-field)" stroke-width="1.6" stroke-opacity="0.8">
      <line x1="75" y1="47" x2="75" y2="222" />
      <line x1="150" y1="47" x2="150" y2="222" />
      <line x1="225" y1="47" x2="225" y2="222" />
      <line x1="300" y1="47" x2="300" y2="222" />
      <line x1="375" y1="47" x2="375" y2="222" />
    </g>
    <g fill="var(--c-field)">
      <path d="M 70 82 L 80 82 L 75 93 Z" />
      <path d="M 145 82 L 155 82 L 150 93 Z" />
      <path d="M 220 82 L 230 82 L 225 93 Z" />
      <path d="M 295 82 L 305 82 L 300 93 Z" />
      <path d="M 370 82 L 380 82 L 375 93 Z" />
    </g>
    <circle cx="150" cy="96" r="9" fill="var(--c-force)" fill-opacity="0.9" stroke="#ffffff" stroke-width="1.5" />
    <text x="150" y="100" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">+</text>
    <text x="150" y="79" text-anchor="middle" fill="#f8c0c0" font-size="12">A</text>
    <circle cx="300" cy="196" r="9" fill="var(--c-force)" fill-opacity="0.9" stroke="#ffffff" stroke-width="1.5" />
    <text x="300" y="200" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">+</text>
    <text x="300" y="182" text-anchor="middle" fill="#f8c0c0" font-size="12">B</text>
    <g v-if="showAnalysis">
      <line x1="100" y1="96" x2="350" y2="96" stroke="#e2a846" stroke-width="1.5" stroke-dasharray="6 5" stroke-opacity="0.85" />
      <text x="120" y="89" fill="#e2a846" font-size="10.5">过 A 的等势面</text>
      <line x1="100" y1="196" x2="350" y2="196" stroke="#e2a846" stroke-width="1.5" stroke-dasharray="6 5" stroke-opacity="0.85" />
      <text x="100" y="214" fill="#e2a846" font-size="10.5">过 B 的等势面</text>
      <line x1="150" y1="96" x2="208" y2="96" stroke="#f87171" stroke-width="2.5" marker-end="url(#ob-f)" />
      <line x1="208" y1="96" x2="208" y2="196" stroke="#f87171" stroke-width="2.5" marker-end="url(#ob-f)" />
      <line x1="208" y1="196" x2="300" y2="196" stroke="#f87171" stroke-width="2.5" marker-end="url(#ob-f)" />
      <circle cx="208" cy="96" r="3.5" fill="#e2e8f0" />
      <circle cx="208" cy="196" r="3.5" fill="#e2e8f0" />
      <line x1="300" y1="140" x2="300" y2="190" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 4" />
      <line x1="286" y1="196" x2="300" y2="196" stroke="#94a3b8" stroke-width="1.2" />
      <line x1="286" y1="96" x2="300" y2="96" stroke="#94a3b8" stroke-width="1.2" />
      <line x1="300" y1="96" x2="300" y2="140" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 4" />
      <text x="309" y="150" fill="#cbd5e1" font-size="10.5" font-style="italic" font-family="KaTeX_Math">d</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ showAnalysis?: boolean }>();
</script>
