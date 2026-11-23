<!-- 4.1 第 11 页：储油桶例题；点击后显示法线、O 点与两个角 -->
<template>
  <svg viewBox="0 0 440 320" width="380" height="276" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="oil-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#e2a846" stop-opacity="0.22" />
        <stop offset="1" stop-color="#e2a846" stop-opacity="0.10" />
      </linearGradient>
    </defs>
    <rect x="100" y="40" width="240" height="240" rx="6" fill="none" stroke="var(--c-neutral-300)" stroke-width="2" opacity="0.75" />
    <rect x="103" y="160" width="234" height="117" fill="url(#oil-fill)" />
    <line x1="103" y1="160" x2="337" y2="160" stroke="var(--c-accent)" stroke-width="1.4" opacity="0.8" />
    <line x1="100" y1="40" x2="340" y2="280" stroke="var(--c-text-mute)" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.7" />
    <circle cx="100" cy="40" r="4" fill="var(--c-accent-2)" />
    <circle cx="340" cy="280" r="4" fill="var(--c-accent-2)" />
    <circle cx="280" cy="280" r="4" fill="var(--c-accent)" />
    <text x="82" y="34" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic" font-size="15">A</text>
    <text x="352" y="292" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic" font-size="15">B</text>
    <text x="286" y="298" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="15">C</text>
    <text x="300" y="152" fill="var(--c-text-dim)" font-size="11">油面</text>
    <text x="300" y="296" fill="var(--c-text-dim)" font-size="11">桶底</text>
    <text x="118" y="220" fill="var(--c-accent)" font-size="11">油</text>
    <g v-if="showAnalysis">
      <line x1="220" y1="40" x2="220" y2="280" stroke="var(--c-text-mute)" stroke-width="1.2" stroke-dasharray="4 4" />
      <path d="M 280 280 L 220 160 L 100 40" fill="none" stroke="var(--c-physics)" stroke-width="1.8" />
      <circle cx="220" cy="160" r="3.2" fill="var(--c-physics)" />
      <text x="208" y="154" fill="var(--c-physics)" font-family="KaTeX_Math" font-style="italic" font-size="14">O</text>
      <text x="226" y="34" fill="var(--c-text-mute)" font-family="KaTeX_Math" font-style="italic" font-size="13">N</text>
      <text x="226" y="294" fill="var(--c-text-mute)" font-family="KaTeX_Math" font-style="italic" font-size="13">N′</text>
      <path d="M 220 130 A 30 30 0 0 0 198.8 138.8" fill="none" stroke="var(--c-accent)" stroke-width="1.4" />
      <path d="M 220 190 A 30 30 0 0 1 233.4 186.8" fill="none" stroke="var(--c-accent)" stroke-width="1.4" />
      <text x="192" y="132" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="14">θ₁</text>
      <text x="238" y="198" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="14">θ₂</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { showAnalysis = false } = defineProps<{ showAnalysis?: boolean }>();
</script>
