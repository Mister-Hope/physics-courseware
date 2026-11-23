<script setup lang="ts">
// 第 9 页：R1 与 RG 串联分压，把 RG 的阻值变化变成基极电压 U_b
</script>

<template>
  <svg viewBox="0 0 520 350" class="vd-svg" role="img" aria-label="R1 与光敏电阻 RG 串联分压电路">
    <!-- 导轨 -->
    <path
      d="M 50 70 L 330 70 M 50 330 L 330 330 M 50 70 L 50 182 M 50 218 L 50 330"
      fill="none"
      stroke="var(--c-text)"
      stroke-width="1.6"
      stroke-linecap="round"
    />
    <CircuitBattery :x="50" :y="200" orientation="vertical" polarity emf="E" />

    <!-- R1（可调） -->
    <path d="M 330 70 L 330 96" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
    <CircuitRheostat :x="330" :y="120" orientation="vertical" :slider="0.5" />
    <path d="M 330 144 L 330 190" fill="none" stroke="var(--c-text)" stroke-width="1.6" />

    <!-- 分压点 b -->
    <circle cx="330" cy="190" r="3.6" fill="var(--c-text)" />

    <!-- RG -->
    <CircuitResistor :x="330" :y="240" orientation="vertical" />
    <path d="M 330 264 L 330 330" fill="none" stroke="var(--c-text)" stroke-width="1.6" />

    <!-- b 点接三极管基极 -->
    <CourseArrow :from="{ x: 330, y: 190 }" :to="{ x: 452, y: 190 }" stroke="var(--c-accent-2)" :head-size="9" />

    <!-- U_b：RG 两端电压 -->
    <path d="M 300 190 L 318 190 M 300 330 L 318 330 M 300 190 L 300 330" fill="none" stroke="var(--c-accent)" stroke-width="1.2" stroke-dasharray="5 5" />

    <!-- 标注 -->
    <text x="308" y="262" text-anchor="end" font-size="17" fill="var(--c-accent)">
      <tspan font-family="KaTeX_Math" font-style="italic">U</tspan>
      <tspan font-family="KaTeX_Main" font-size="12" baseline-shift="sub">b</tspan>
    </text>
    <text x="362" y="126" font-size="16" fill="var(--c-text)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main" font-size="11" baseline-shift="sub">1</tspan>
    </text>
    <text x="348" y="246" font-size="16" fill="var(--c-text)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main" font-size="11" baseline-shift="sub">G</tspan>
    </text>
    <text x="462" y="196" font-size="15" fill="var(--c-text-dim)">基极</text>
  </svg>
</template>

<style scoped>
.vd-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
