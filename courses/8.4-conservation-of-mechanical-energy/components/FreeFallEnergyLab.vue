<script setup lang="ts">
import { computed, ref } from "vue";

const G = 9.8;
const m = ref(0.5);
const h = ref(2);

const g = computed(() => G.toFixed(1));
const hTex = computed(() => h.value.toFixed(1));
const mTex = computed(() => m.value.toFixed(2));
const ep = computed(() => m.value * G * h.value);
const v = computed(() => Math.sqrt(2 * G * h.value));
const ek = computed(() => 0.5 * m.value * v.value ** 2);
const total = computed(() => ep.value + ek.value);
const ballY = computed(() => 40 + (2.3 - h.value) * 82);
const vLen = computed(() => 12 + v.value * 10);
</script>

<template>
  <div
    class="grid"
    style="grid-template-columns: 1.15fr 0.85fr; gap: 0 1.5rem; align-items: stretch"
  >
    <svg
      viewBox="0 0 320 250"
      style="width: 100%; height: 100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="30" y1="230" x2="300" y2="230" stroke="var(--c-line-strong)" stroke-width="3" />
      <line
        x1="56"
        y1="40"
        x2="56"
        y2="230"
        stroke="var(--c-line-strong)"
        stroke-width="2"
        stroke-dasharray="7 7"
        opacity="0.6"
      />
      <text
        x="44"
        y="140"
        font-size="13"
        fill="var(--c-ok)"
        font-family="KaTeX_Math"
        font-style="italic"
      >
        h
      </text>
      <circle
        cx="150"
        :cy="ballY"
        r="15"
        fill="var(--c-info)"
        fill-opacity="0.3"
        stroke="var(--c-info)"
        stroke-width="3.5"
      />
      <line
        x1="150"
        :y1="ballY + 16"
        x2="150"
        :y2="ballY + 16 + vLen"
        stroke="var(--c-info)"
        stroke-width="3.5"
        stroke-linecap="round"
      />
      <path :d="`M150 ${ballY + 17 + vLen} l-6.5 -12 l13 0 z`" :fill="'var(--c-info)'" />
      <text
        x="164"
        :y="ballY + 30"
        font-size="13"
        fill="var(--c-info)"
        font-family="KaTeX_Math"
        font-style="italic"
      >
        v
      </text>
      <text x="220" y="66" font-size="13" fill="var(--c-ok)" font-family="KaTeX_Main">
        E
        <tspan font-size="9.5" dy="3">p</tspan>
      </text>
      <text x="220" y="216" font-size="13" fill="var(--c-info)" font-family="KaTeX_Main">
        E
        <tspan font-size="9.5" dy="3">k</tspan>
      </text>
      <line
        x1="206"
        y1="70"
        x2="206"
        :y2="ballY - 15"
        stroke="var(--c-ok)"
        stroke-width="2"
        stroke-dasharray="5 6"
        opacity="0.7"
      />
    </svg>
    <div class="flex flex-col" style="gap: 0.5rem">
      <div>
        <span style="font-size: 0.9rem"
          >高度 <Latex tex="h = " /><Latex :tex="`${hTex}\ \text{m}`"
        /></span>
        <CourseSlider v-model="h" :min="0.2" :max="2.3" :step="0.05" />
      </div>
      <div>
        <span style="font-size: 0.9rem"
          >质量 <Latex tex="m = " /><Latex :tex="`${mTex}\ \text{kg}`"
        /></span>
        <CourseSlider v-model="m" :min="0.1" :max="2.0" :step="0.05" />
      </div>
      <div style="height: 1px; background: var(--c-line)"></div>
      <div style="display: flex; justify-content: space-between; font-size: 0.95rem">
        <span><Latex :tex="`E_p = mgh = ${mTex} \times ${g} \times ${hTex}`" /></span>
        <b style="color: var(--c-ok)"><Latex :tex="`${ep.toFixed(1)}\ \text{J}`" /></b>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.95rem">
        <span><Latex :tex="`v = \sqrt{2gh} = ${v.toFixed(2)}\ \text{m/s}`" /></span>
        <span style="color: var(--c-ink-faint); font-size: 0.85rem">（由自由落体规律算出）</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.95rem">
        <span><Latex :tex="`E_k = \tfrac{1}{2}mv^2`" /></span>
        <b style="color: var(--c-info)"><Latex :tex="`${ek.toFixed(1)}\ \text{J}`" /></b>
      </div>
      <div style="height: 1px; background: var(--c-line)"></div>
      <div
        style="
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          font-size: 1.08rem;
        "
      >
        <span><Latex tex="E_k + E_p" /></span>
        <b style="color: var(--c-warn)"><Latex :tex="`${total.toFixed(1)}\ \text{J}`" /></b>
      </div>
    </div>
  </div>
</template>
