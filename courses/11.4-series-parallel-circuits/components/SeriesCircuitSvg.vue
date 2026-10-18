<script setup lang="ts">
/** 第 3–4 页：串联电路图（教材图 11.4-1 的结构）：电源、开关不画，两个电阻 R₁、R₂ 首尾相接， 电路上标 0、1、2、3 四个点（0–1 之间是 R₁，1–2 之间是导线，2 经右侧回到 3）。 step ≥1 画出电流方向箭头 I。 */
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 70 70 V 127" />
        <path d="M 70 143 V 200" />
        <path d="M 70 70 H 176" />
        <path d="M 224 70 H 346" />
        <path d="M 394 70 H 490" />
        <path d="M 490 70 V 200" />
        <path d="M 490 200 H 70" />
      </g>
      <CircuitBattery :x="70" :y="135" orientation="vertical" polarity />
      <CircuitResistor :x="200" :y="70" />
      <CircuitResistor :x="370" :y="70" />
      <text x="200" y="50" text-anchor="middle" font-size="17" fill="var(--c-text)">
        <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
        <tspan font-family="KaTeX_Main" font-size="13" dy="4">1</tspan>
      </text>
      <text x="370" y="50" text-anchor="middle" font-size="17" fill="var(--c-text)">
        <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
        <tspan font-family="KaTeX_Main" font-size="13" dy="4">2</tspan>
      </text>
      <g font-family="KaTeX_Main" font-size="16" fill="var(--c-text-dim)" text-anchor="middle">
        <circle cx="120" cy="70" r="3.5" fill="var(--c-text-dim)" />
        <text x="120" y="96">0</text>
        <circle cx="285" cy="70" r="3.5" fill="var(--c-text-dim)" />
        <text x="285" y="96">1</text>
        <circle cx="445" cy="70" r="3.5" fill="var(--c-text-dim)" />
        <text x="445" y="96">2</text>
        <circle cx="280" cy="200" r="3.5" fill="var(--c-text-dim)" />
        <text x="280" y="186">3</text>
      </g>
      <g v-if="step >= 1">
        <CourseArrow :from="{ x: 455, y: 200 }" :to="{ x: 395, y: 200 }" stroke="var(--c-accent)" :stroke-width="2.4" />
        <text x="425" y="186" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent)">I</text>
      </g>
    </svg>
  </div>
</template>
