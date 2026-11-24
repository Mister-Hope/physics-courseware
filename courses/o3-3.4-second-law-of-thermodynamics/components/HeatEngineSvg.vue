<!-- 第 6/9 页：热机从高温热库吸热、向低温热库放热（W<Q）；或“单一热库”的第二类永动机（不可能） -->
<script setup lang="ts">
const { mode = "engine", step = 0 } = defineProps<{
  mode?: "engine" | "perpetual";
  step?: number;
}>();
</script>

<template>
  <svg viewBox="0 0 840 340" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g v-if="mode === 'engine'">
      <rect x="300" y="28" width="240" height="58" rx="10" fill="rgba(248,113,113,0.12)" stroke="var(--c-danger)" stroke-width="2" />
      <text x="420" y="64" text-anchor="middle" font-size="16" fill="var(--c-text)">高温热库</text>
      <rect x="300" y="256" width="240" height="56" rx="10" fill="rgba(96,165,250,0.12)" stroke="var(--c-velocity)" stroke-width="2" />
      <text x="420" y="290" text-anchor="middle" font-size="16" fill="var(--c-text)">低温热库</text>
      <rect x="330" y="130" width="180" height="94" rx="12" fill="var(--c-surface)" stroke="var(--c-accent)" stroke-width="2" />
      <text x="420" y="182" text-anchor="middle" font-size="16" fill="var(--c-text)">热机</text>
      <g v-if="step >= 1">
        <CourseArrow :from="{ x: 420, y: 88 }" :to="{ x: 420, y: 126 }" stroke="var(--c-accent)" :stroke-width="2.8" :head-size="10" />
        <text x="440" y="110" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">Q</text>
        <CourseArrow :from="{ x: 420, y: 228 }" :to="{ x: 420, y: 252 }" stroke="var(--c-velocity)" :stroke-width="2.8" :head-size="10" />
        <text x="440" y="248" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-velocity)">Q′</text>
        <CourseArrow :from="{ x: 512, y: 177 }" :to="{ x: 700, y: 177 }" stroke="var(--c-physics)" :stroke-width="2.8" :head-size="10" />
        <text x="606" y="162" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-physics)">W</text>
      </g>
      <g v-if="step >= 2">
        <text x="650" y="242" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent)">W &lt; Q</text>
      </g>
    </g>
    <g v-else>
      <rect x="300" y="28" width="240" height="58" rx="10" fill="rgba(248,113,113,0.12)" stroke="var(--c-danger)" stroke-width="2" />
      <text x="420" y="64" text-anchor="middle" font-size="16" fill="var(--c-text)">单一热库</text>
      <rect x="330" y="130" width="180" height="94" rx="12" fill="var(--c-surface)" stroke="var(--c-accent)" stroke-width="2" />
      <text x="420" y="182" text-anchor="middle" font-size="16" fill="var(--c-text)">热机</text>
      <g v-if="step >= 1">
        <CourseArrow :from="{ x: 420, y: 88 }" :to="{ x: 420, y: 126 }" stroke="var(--c-accent)" :stroke-width="2.8" :head-size="10" />
        <text x="440" y="110" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">Q</text>
        <CourseArrow :from="{ x: 512, y: 177 }" :to="{ x: 700, y: 177 }" stroke="var(--c-physics)" :stroke-width="2.8" :head-size="10" />
        <text x="606" y="162" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-physics)">W</text>
        <text x="420" y="258" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)">W = Q</text>
      </g>
      <g v-if="step >= 2">
        <line x1="372" y1="238" x2="468" y2="270" stroke="var(--c-danger)" stroke-width="3.4" stroke-linecap="round" />
        <line x1="468" y1="238" x2="372" y2="270" stroke="var(--c-danger)" stroke-width="3.4" stroke-linecap="round" />
        <text x="420" y="312" text-anchor="middle" font-size="15" fill="var(--c-danger)">没有低温热库：不可能制成</text>
      </g>
    </g>
  </svg>
</template>
