<template>
  <!-- 第 6 页：相邻等势线电势差固定为 20 V，电场强度越大等势线越密 -->
  <div class="eqlab">
    <svg viewBox="0 0 560 360" width="560" height="360" font-family="Inter, system-ui, sans-serif">
      <defs>
        <marker
          id="eq-f"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#60a5fa" />
        </marker>
        <marker
          id="eq-d1"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5.5"
          markerHeight="5.5"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#94a3b8" />
        </marker>
      </defs>
      <rect
        x="44"
        y="36"
        width="13"
        height="268"
        rx="3"
        fill="#e2a846"
        fill-opacity="0.3"
        stroke="#e2a846"
        stroke-width="1.4"
      />
      <text x="38" y="175" text-anchor="end" fill="#e2a846" font-size="12" font-weight="700">
        +
      </text>
      <rect
        x="504"
        y="36"
        width="13"
        height="268"
        rx="3"
        fill="#60a5fa"
        fill-opacity="0.22"
        stroke="#60a5fa"
        stroke-width="1.4"
      />
      <text x="524" y="175" fill="#60a5fa" font-size="12.5" font-weight="700">−</text>
      <g stroke="#60a5fa" stroke-width="2" stroke-opacity="0.75">
        <line x1="66" y1="80" x2="492" y2="80" />
        <line x1="66" y1="175" x2="492" y2="175" />
        <line x1="66" y1="270" x2="492" y2="270" />
      </g>
      <g fill="#60a5fa" fill-opacity="0.9">
        <path d="M 196 75 L 208 80 L 196 85 Z" />
        <path d="M 336 75 L 348 80 L 336 85 Z" />
        <path d="M 196 170 L 208 175 L 196 180 Z" />
        <path d="M 336 170 L 348 175 L 336 180 Z" />
        <path d="M 196 265 L 208 270 L 196 275 Z" />
        <path d="M 336 265 L 348 270 L 336 275 Z" />
      </g>
      <g v-for="(x, i) in eqXs" :key="i">
        <line
          :x1="x"
          y1="42"
          :x2="x"
          y2="300"
          stroke="var(--c-physics)"
          stroke-width="1.8"
          stroke-opacity="0.9"
        />
        <text
          v-if="showLabels"
          :x="x"
          y="34"
          text-anchor="middle"
          fill="#e2c07a"
          font-size="10.5"
          font-family="KaTeX_Main"
        >
          {{ 100 - 20 * i }} V
        </text>
      </g>
      <line
        :x1="eqXs[0]"
        y1="314"
        :x2="eqXs[1]"
        y2="314"
        stroke="#94a3b8"
        stroke-width="1.2"
        marker-start="url(#eq-d1)"
        marker-end="url(#eq-d1)"
      />
      <text :x="(eqXs[0] + eqXs[1]) / 2" y="332" text-anchor="middle" fill="#cbd5e1" font-size="11">
        <tspan font-family="Inter, system-ui, sans-serif">间距</tspan>
        <tspan font-family="KaTeX_Main">{{ spacingM }} m</tspan>
      </text>
    </svg>
    <div class="eqpanel">
      <CourseSlider
        v-model="eField"
        :min="20"
        :max="60"
        :step="10"
        label="电场强度"
        label-tex="E"
        accent="blue"
      />
      <div class="eqrow">
        <span>相邻等势线间距</span
        ><span class="eqv"><Latex tex="d = \dfrac{\Delta U}{E}" /> = {{ spacingM }} m</span>
      </div>
      <div class="eqnote">
        板间共画 {{ eqXs.length }} 条等势线，相邻两条电势差都是 20 V；板间电势差 = E × 板间距离 =
        {{ plateU }} V
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const eField = ref(20);
/** 每伏对应的像素数：间距 px = ΔU / E × PPM = 1200 / E */
const PPM = 60;
const START = 80;
const LIMIT = 480;

const spacingPx = computed(() => (20 / eField.value) * PPM);
const spacingM = computed(() => (20 / eField.value).toFixed(2));
const eqXs = computed(() => {
  const out: number[] = [];
  for (let x = START; x <= LIMIT + 0.01; x += spacingPx.value) out.push(Math.round(x * 10) / 10);
  return out;
});
const showLabels = computed(() => spacingPx.value >= 39);
/** 板间距离固定 440 px = 440 / PPM m */
const plateU = computed(() => Math.round(eField.value * (440 / PPM)));
</script>

<style scoped>
.eqlab {
  display: flex;
  gap: 1.4rem;
  align-items: center;
  min-width: 0;
}
.eqlab svg {
  flex: none;
}
.eqpanel {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.eqrow {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.6rem;
  font-size: 0.72rem;
  color: var(--c-text-dim);
}
.eqv {
  color: var(--c-text);
  font-size: 0.8rem;
  white-space: nowrap;
}
.eqnote {
  font-size: 0.66rem;
  color: var(--c-text-dim);
}
</style>
