<script setup lang="ts">
/** 第 3–4 页：并联电路图（教材图 11.4-2 的结构）：两个电阻 R₁、R₂ 并列接在两根导轨之间， 干路与支路上标 0、1、2、3 四个点（0 在干路，1、2 在两条支路，3 在下方干路）。 step ≥1 画出干路与各支路的电流方向箭头。 */
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 70 70 V 147" />
        <path d="M 70 163 V 200" />
        <path d="M 70 70 H 490" />
        <path d="M 70 200 H 490" />
        <path d="M 490 70 V 200" />
        <path d="M 240 70 V 131" />
        <path d="M 240 179 V 200" />
        <path d="M 390 70 V 131" />
        <path d="M 390 179 V 200" />
      </g>
      <circle cx="240" cy="70" r="3" fill="var(--c-text)" />
      <circle cx="390" cy="70" r="3" fill="var(--c-text)" />
      <circle cx="240" cy="200" r="3" fill="var(--c-text)" />
      <circle cx="390" cy="200" r="3" fill="var(--c-text)" />
      <CircuitBattery :x="70" :y="155" orientation="vertical" polarity />
      <CircuitResistor :x="240" :y="155" orientation="vertical" />
      <CircuitResistor :x="390" :y="155" orientation="vertical" />
      <text x="262" y="150" font-size="17" fill="var(--c-text)">
        <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
        <tspan font-family="KaTeX_Main" font-size="13" dy="4">1</tspan>
      </text>
      <text x="412" y="150" font-size="17" fill="var(--c-text)">
        <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
        <tspan font-family="KaTeX_Main" font-size="13" dy="4">2</tspan>
      </text>
      <g font-family="KaTeX_Main" font-size="16" fill="var(--c-text-dim)" text-anchor="middle">
        <circle cx="150" cy="70" r="3.5" fill="var(--c-text-dim)" />
        <text x="150" y="56">0</text>
        <circle cx="240" cy="190" r="3.5" fill="var(--c-text-dim)" />
        <text x="224" y="196" text-anchor="end">1</text>
        <circle cx="390" cy="190" r="3.5" fill="var(--c-text-dim)" />
        <text x="374" y="196" text-anchor="end">2</text>
        <circle cx="320" cy="200" r="3.5" fill="var(--c-text-dim)" />
        <text x="320" y="222">3</text>
      </g>
      <g v-if="step >= 1">
        <CourseArrow :from="{ x: 95, y: 70 }" :to="{ x: 138, y: 70 }" stroke="var(--c-accent)" :stroke-width="2.4" />
        <text x="116" y="56" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">I</text>
        <CourseArrow :from="{ x: 240, y: 78 }" :to="{ x: 240, y: 122 }" stroke="var(--c-accent-2)" :stroke-width="2.4" />
        <text x="222" y="92" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent-2)">
          <tspan>I</tspan>
          <tspan font-family="KaTeX_Main" font-size="13" dy="4">1</tspan>
        </text>
        <CourseArrow :from="{ x: 390, y: 78 }" :to="{ x: 390, y: 122 }" stroke="var(--c-accent-2)" :stroke-width="2.4" />
        <text x="372" y="92" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent-2)">
          <tspan>I</tspan>
          <tspan font-family="KaTeX_Main" font-size="13" dy="4">2</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>
