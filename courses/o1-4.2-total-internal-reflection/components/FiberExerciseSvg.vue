<!-- 光纤端面入射：光从空气进入端面 AB，在侧面发生全反射 -->
<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 480 280" class="fiber-ex-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fiberExGlass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3b82f6" stop-opacity=".5" />
        <stop offset="1" stop-color="#1e3a8a" stop-opacity=".75" />
      </linearGradient>
    </defs>
    <rect x="70" y="100" width="350" height="80" rx="6" fill="url(#fiberExGlass)" stroke="#93c5fd" stroke-width="1.5" />
    <text x="86" y="140" fill="#dbeafe" font-size="15">玻璃丝</text>
    <text x="70" y="88" fill="#e2e8f0" font-size="15">A</text>
    <text x="70" y="198" fill="#e2e8f0" font-size="15">B</text>
    <g :opacity="step >= 1 ? 1 : 0">
      <line x1="5" y1="92" x2="70" y2="130" stroke="#60a5fa" stroke-width="2" />
      <line x1="70" y1="130" x2="211" y2="180" stroke="#fbbf24" stroke-width="2" />
      <line x1="70" y1="130" x2="128" y2="130" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 5" opacity=".7" />
      <path d="M 44 130 A 26 26 0 0 0 49 118" fill="none" stroke="#60a5fa" stroke-width="1.3" />
      <text x="32" y="112" fill="#60a5fa" font-size="15" font-family="KaTeX_Math" font-style="italic">i</text>
      <path d="M 96 130 A 26 26 0 0 1 94 139" fill="none" stroke="#fbbf24" stroke-width="1.3" />
      <text x="102" y="154" fill="#fbbf24" font-size="15" font-family="KaTeX_Math" font-style="italic">r</text>
    </g>
    <g :opacity="step >= 2 ? 1 : 0">
      <line x1="211" y1="180" x2="239" y2="100" stroke="#fbbf24" stroke-width="2" />
      <line x1="211" y1="180" x2="211" y2="206" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 5" opacity=".7" />
      <path d="M 211 156 A 24 24 0 0 1 233 172" fill="none" stroke="#fbbf24" stroke-width="1.3" />
      <text x="238" y="196" fill="#fbbf24" font-size="15">
        <tspan font-family="KaTeX_Math" font-style="italic">θ</tspan><tspan baseline-shift="sub" font-size="11">2</tspan>
      </text>
    </g>
    <g :opacity="step >= 3 ? 1 : 0">
      <polyline points="239,100 301,100 329,180" fill="none" stroke="#fbbf24" stroke-width="1.8" stroke-linejoin="round" />
      <line x1="301" y1="100" x2="301" y2="126" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 5" opacity=".6" />
    </g>
    <line x1="70" y1="208" x2="420" y2="208" stroke="#94a3b8" stroke-width="1" opacity=".45" />
    <text x="240" y="232" fill="#94a3b8" font-size="15" font-family="KaTeX_Math" font-style="italic">l</text>
  </svg>
</template>
