<script setup lang="ts">
/**
 * 第 3 页（串、并联电路中的电流）/ 第 4 页（串、并联电路中的电压）：串联电路图（教材图 11.4-1 的结构）。 电源与两个电阻 R₁、R₂ 首尾相接，电路上标 0、1、2、3 四个点（0–1 跨 R₁，1–2 跨 R₂，2–3 走剩下的回路，3–0 跨电源）。 mode = "current"：step
 * ≥ 1 时画各处电流方向箭头（每一处都标 I，示意"处处相等"）； mode = "voltage"：step ≥ 1 时标出各点电势 φ₀…φ₃（教材用 φ 表示各点电势）。
 */
const { mode = "current", step = 0 } = defineProps<{
  /** "current" 画电流箭头；"voltage" 标各点电势 */
  mode?: "current" | "voltage";
  /** 分步：0 = 只有干净电路图，≥1 才出标注 */
  step?: number;
}>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 620 270" width="620" height="270" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 70 90 V 147" />
        <path d="M 70 163 V 220" />
        <path d="M 70 90 H 216" />
        <path d="M 264 90 H 396" />
        <path d="M 444 90 H 550" />
        <path d="M 550 90 V 220" />
        <path d="M 550 220 H 70" />
      </g>
      <CircuitBattery :x="70" :y="155" orientation="vertical" polarity />
      <CircuitResistor :x="240" :y="90" />
      <CircuitResistor :x="420" :y="90" />
      <text x="240" y="72" text-anchor="middle" font-size="20" fill="var(--c-text)">
        <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
        <tspan font-family="KaTeX_Main" font-size="15" dy="5">1</tspan>
      </text>
      <text x="420" y="72" text-anchor="middle" font-size="20" fill="var(--c-text)">
        <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
        <tspan font-family="KaTeX_Main" font-size="15" dy="5">2</tspan>
      </text>
      <g font-family="KaTeX_Main" font-size="18" fill="var(--c-text-dim)" text-anchor="middle">
        <circle cx="140" cy="90" r="3.5" fill="var(--c-text-dim)" />
        <text x="140" y="116">0</text>
        <circle cx="330" cy="90" r="3.5" fill="var(--c-text-dim)" />
        <text x="330" y="116">1</text>
        <circle cx="500" cy="90" r="3.5" fill="var(--c-text-dim)" />
        <text x="500" y="116">2</text>
        <circle cx="300" cy="220" r="3.5" fill="var(--c-text-dim)" />
        <text x="300" y="246">3</text>
      </g>
      <g v-if="mode === 'current' && step >= 1">
        <CourseArrow :from="{ x: 158, y: 90 }" :to="{ x: 200, y: 90 }" stroke="var(--c-accent)" :stroke-width="2.6" />
        <CourseArrow :from="{ x: 286, y: 90 }" :to="{ x: 322, y: 90 }" stroke="var(--c-accent)" :stroke-width="2.6" />
        <CourseArrow :from="{ x: 458, y: 90 }" :to="{ x: 494, y: 90 }" stroke="var(--c-accent)" :stroke-width="2.6" />
        <CourseArrow :from="{ x: 490, y: 220 }" :to="{ x: 400, y: 220 }" stroke="var(--c-accent)" :stroke-width="2.6" />
        <g font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)" text-anchor="middle">
          <text x="178" y="78">I</text>
          <text x="304" y="78">I</text>
          <text x="476" y="78">I</text>
          <text x="445" y="246">I</text>
        </g>
      </g>
      <g v-if="mode === 'voltage' && step >= 1" font-size="20" fill="var(--c-accent)" text-anchor="middle">
        <text x="140" y="66">
          <tspan font-family="KaTeX_Math" font-style="italic">φ</tspan>
          <tspan font-family="KaTeX_Main" font-size="15" dy="5">0</tspan>
        </text>
        <text x="330" y="66">
          <tspan font-family="KaTeX_Math" font-style="italic">φ</tspan>
          <tspan font-family="KaTeX_Main" font-size="15" dy="5">1</tspan>
        </text>
        <text x="500" y="66">
          <tspan font-family="KaTeX_Math" font-style="italic">φ</tspan>
          <tspan font-family="KaTeX_Main" font-size="15" dy="5">2</tspan>
        </text>
        <text x="300" y="196">
          <tspan font-family="KaTeX_Math" font-style="italic">φ</tspan>
          <tspan font-family="KaTeX_Main" font-size="15" dy="5">3</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>
