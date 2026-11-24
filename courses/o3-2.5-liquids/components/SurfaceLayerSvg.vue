<!-- 2.5 液体 P4–P5：表面层分子（r > r₀，引力）与表面张力方向（与液面相切、垂直于分界线） -->
<script setup lang="ts">
const { mode = "molecules", showR = false } = defineProps<{
  mode?: "molecules" | "tension";
  showR?: boolean;
}>();
</script>

<template>
  <svg v-if="mode === 'molecules'" viewBox="0 0 440 270" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="66" width="400" height="190" fill="rgba(96,165,250,0.10)" />
    <line x1="20" y1="66" x2="420" y2="66" stroke="var(--c-velocity)" stroke-width="2.4" />
    <text x="24" y="40" font-size="14" fill="var(--c-text-dim)">空气</text>
    <g fill="var(--c-accent)">
      <circle cx="60" cy="94" r="7" />
      <circle cx="130" cy="94" r="7" />
      <circle cx="200" cy="94" r="7" />
      <circle cx="270" cy="94" r="7" />
      <circle cx="340" cy="94" r="7" />
      <circle cx="410" cy="94" r="7" />
    </g>
    <g fill="var(--c-velocity)" opacity="0.8">
      <circle cx="28" cy="140" r="6" />
      <circle cx="62" cy="140" r="6" />
      <circle cx="96" cy="140" r="6" />
      <circle cx="130" cy="140" r="6" />
      <circle cx="164" cy="140" r="6" />
      <circle cx="198" cy="140" r="6" />
      <circle cx="232" cy="140" r="6" />
      <circle cx="266" cy="140" r="6" />
      <circle cx="300" cy="140" r="6" />
      <circle cx="334" cy="140" r="6" />
      <circle cx="368" cy="140" r="6" />
      <circle cx="402" cy="140" r="6" />
      <circle cx="28" cy="176" r="6" />
      <circle cx="62" cy="176" r="6" />
      <circle cx="96" cy="176" r="6" />
      <circle cx="130" cy="176" r="6" />
      <circle cx="164" cy="176" r="6" />
      <circle cx="198" cy="176" r="6" />
      <circle cx="232" cy="176" r="6" />
      <circle cx="266" cy="176" r="6" />
      <circle cx="300" cy="176" r="6" />
      <circle cx="334" cy="176" r="6" />
      <circle cx="368" cy="176" r="6" />
      <circle cx="402" cy="176" r="6" />
      <circle cx="28" cy="212" r="6" />
      <circle cx="62" cy="212" r="6" />
      <circle cx="96" cy="212" r="6" />
      <circle cx="130" cy="212" r="6" />
      <circle cx="164" cy="212" r="6" />
      <circle cx="198" cy="212" r="6" />
      <circle cx="232" cy="212" r="6" />
      <circle cx="266" cy="212" r="6" />
      <circle cx="300" cy="212" r="6" />
      <circle cx="334" cy="212" r="6" />
      <circle cx="368" cy="212" r="6" />
      <circle cx="402" cy="212" r="6" />
    </g>
    <line x1="300" y1="56" x2="300" y2="66" stroke="var(--c-accent)" stroke-width="1.4" stroke-dasharray="4 3" opacity="0.8" />
    <text x="238" y="48" font-size="15" fill="var(--c-accent)">表面层：分子较稀疏</text>
    <text x="24" y="250" font-size="14" fill="var(--c-text-dim)">液体内部：分子较密</text>
    <g v-if="showR">
      <line x1="204" y1="94" x2="266" y2="94" stroke="var(--c-danger)" stroke-width="1.6" stroke-dasharray="4 3" />
      <path d="M 204 94 L 214 88 L 214 100 Z" fill="var(--c-danger)" />
      <path d="M 266 94 L 256 88 L 256 100 Z" fill="var(--c-danger)" />
      <text x="235" y="80" font-size="16" font-family="KaTeX_Math" font-style="italic" fill="var(--c-danger)" text-anchor="middle">
        r &gt; r<tspan font-size="11" dy="5">0</tspan>
      </text>
    </g>
  </svg>
  <svg v-else viewBox="0 0 440 270" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="46" width="380" height="168" rx="8" fill="rgba(96,165,250,0.12)" stroke="rgba(96,165,250,0.45)" stroke-width="1.4" />
    <text x="30" y="30" font-size="15" fill="var(--c-text-dim)" text-anchor="middle">1</text>
    <text x="410" y="30" font-size="15" fill="var(--c-text-dim)" text-anchor="middle">2</text>
    <line x1="220" y1="34" x2="220" y2="248" stroke="var(--c-text)" stroke-width="1.8" stroke-dasharray="7 6" />
    <text x="220" y="26" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)" text-anchor="middle">M</text>
    <text x="220" y="266" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)" text-anchor="middle">N</text>
    <g stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" fill="none">
      <line x1="212" y1="96" x2="96" y2="96" />
      <line x1="228" y1="96" x2="344" y2="96" />
      <line x1="212" y1="170" x2="96" y2="170" />
      <line x1="228" y1="170" x2="344" y2="170" />
    </g>
    <g fill="var(--c-accent)">
      <path d="M 88 96 L 104 88 L 104 104 Z" />
      <path d="M 352 96 L 336 88 L 336 104 Z" />
      <path d="M 88 170 L 104 162 L 104 178 Z" />
      <path d="M 352 170 L 336 162 L 336 178 Z" />
    </g>
  </svg>
</template>
