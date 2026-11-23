<!-- 第 13 页：消声器的原理：声波分成两路，到 b 处相遇，路程差满足半波长奇数倍时相互抵消 -->
<template>
  <svg viewBox="10 18 640 150" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="24" y="82" width="52" height="46" rx="8" fill="none" stroke="var(--c-accent)" stroke-width="2" />
    <text x="50" y="112" text-anchor="middle" font-size="14" fill="var(--c-accent)">声源</text>
    <path :d="upper" fill="none" stroke="var(--c-accent)" stroke-width="2.2" />
    <path :d="lower" fill="none" stroke="var(--c-physics)" stroke-width="2.2" />
    <circle cx="150" cy="105" r="4.5" fill="var(--c-text)" />
    <circle cx="520" cy="105" r="4.5" fill="var(--c-text)" />
    <text x="150" y="88" text-anchor="middle" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">a</text>
    <text x="520" y="88" text-anchor="middle" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">b</text>
    <CourseArrow :from="{ x: 540, y: 105 }" :to="{ x: 628, y: 105 }" stroke="var(--c-text-dim)" :stroke-width="2" :head-size="9" />
    <text x="584" y="94" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">出口</text>
    <text x="334" y="30" text-anchor="middle" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">
      s<tspan dy="4" font-size="10">1</tspan>
    </text>
    <text x="334" y="160" text-anchor="middle" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="var(--c-physics)">
      s<tspan dy="4" font-size="10">2</tspan>
    </text>
  </svg>
</template>

<script setup lang="ts">
const upper = "M 76 92 L 150 92 L 150 34 L 520 34 L 520 105 L 560 105";
const lower = "M 76 118 L 150 118 L 150 105 L 520 105 L 560 105";
</script>
