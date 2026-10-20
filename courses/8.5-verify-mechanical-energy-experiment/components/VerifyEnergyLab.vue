<script setup lang="ts">
import { computed, ref } from "vue";

const G = 9.8;
const m = ref(1);
const xA = ref(9.6);
const xB = ref(12.54);
const xC = ref(15.88);

const T = 0.02;
const vB = computed(() => (xC.value - xA.value) / 100 / (2 * T));
const hB = computed(() => xB.value / 100);
const ek = computed(() => 0.5 * m.value * vB.value ** 2);
const ep = computed(() => m.value * G * hB.value);
</script>

<template>
  <div class="grid" style="grid-template-columns: 1.1fr 0.9fr; gap: 0 1.5rem; align-items: stretch">
    <div class="flex flex-col" style="gap: 0.45rem">
      <div style="font-size: 0.92rem">
        相邻计数点时间间隔 <Latex tex="T = 0.02\ \text{s}" />（每 5 个点取一个计数点时填
        <Latex tex="0.1\ \text{s}" /> 的效果相同）
      </div>
      <div>
        <span style="font-size: 0.9rem"
          >起点距离 <Latex tex="h_A = " /><Latex :tex="`${xA.toFixed(2)}\ \text{cm}`"
        /></span>
        <CourseSlider v-model="xA" :min="5" :max="11" :step="0.01" />
      </div>
      <div>
        <span style="font-size: 0.9rem"
          >B 点距离 <Latex tex="h_B = " /><Latex :tex="`${xB.toFixed(2)}\ \text{cm}`"
        /></span>
        <CourseSlider v-model="xB" :min="10" :max="15" :step="0.01" />
      </div>
      <div>
        <span style="font-size: 0.9rem"
          >C 点距离 <Latex tex="h_C = " /><Latex :tex="`${xC.toFixed(2)}\ \text{cm}`"
        /></span>
        <CourseSlider v-model="xC" :min="13" :max="22" :step="0.01" />
      </div>
      <div>
        <span style="font-size: 0.9rem"
          >重物质量 <Latex tex="m = " /><Latex :tex="`${m.toFixed(2)}\ \text{kg}`"
        /></span>
        <CourseSlider v-model="m" :min="0.1" :max="2.0" :step="0.05" />
      </div>
      <div style="height: 1px; background: var(--c-line)"></div>
      <div style="display: flex; justify-content: space-between; font-size: 0.95rem">
        <span
          ><Latex
            :tex="`v_B = \\dfrac{h_C - h_A}{2T} = \\dfrac{${(xC - xA).toFixed(2)}\\ \\text{cm}}{0.04\\ \\text{s}}`"
        /></span>
        <b style="color: var(--c-info)"><Latex :tex="`${vB.toFixed(2)}\\ \\text{m/s}`" /></b>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.95rem">
        <span><Latex :tex="`\\Delta E_k = \\tfrac{1}{2}mv_B^2`" /></span>
        <b style="color: var(--c-info)"><Latex :tex="`${ek.toFixed(3)}\\ \\text{J}`" /></b>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.95rem">
        <span><Latex :tex="`\\Delta E_p = mgh_B`" /></span>
        <b style="color: var(--c-ok)"><Latex :tex="`${ep.toFixed(3)}\\ \\text{J}`" /></b>
      </div>
    </div>
    <svg
      viewBox="0 0 300 250"
      style="width: 100%; height: 100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="120"
        y="14"
        width="56"
        height="224"
        rx="8"
        fill="var(--c-bg-soft)"
        stroke="var(--c-line-strong)"
        stroke-width="2.5"
      />
      <line
        x1="148"
        y1="14"
        x2="148"
        y2="238"
        stroke="var(--c-line-strong)"
        stroke-width="1.5"
        opacity="0.4"
      />
      <circle cx="148" cy="40" r="5.5" fill="var(--c-ink)" />
      <circle cx="148" cy="98" r="5.5" fill="var(--c-ink)" />
      <circle cx="148" cy="168" r="5.5" fill="var(--c-ink)" />
      <circle cx="148" cy="226" r="5.5" fill="var(--c-ink)" />
      <text
        x="110"
        y="45"
        font-size="13"
        fill="var(--c-ink)"
        font-family="KaTeX_Main"
        text-anchor="end"
      >
        A
      </text>
      <text
        x="110"
        y="103"
        font-size="13"
        fill="var(--c-ink)"
        font-family="KaTeX_Main"
        text-anchor="end"
      >
        B
      </text>
      <text
        x="110"
        y="173"
        font-size="13"
        fill="var(--c-ink)"
        font-family="KaTeX_Main"
        text-anchor="end"
      >
        C
      </text>
      <text x="188" y="45" font-size="12" fill="var(--c-ok)" font-family="KaTeX_Main">
        <tspan font-style="italic">h</tspan>
        <tspan font-size="9" dy="2">A</tspan>
      </text>
      <text x="188" y="103" font-size="12" fill="var(--c-ok)" font-family="KaTeX_Main">
        <tspan font-style="italic">h</tspan>
        <tspan font-size="9" dy="2">B</tspan>
      </text>
      <text x="188" y="173" font-size="12" fill="var(--c-ok)" font-family="KaTeX_Main">
        <tspan font-style="italic">h</tspan>
        <tspan font-size="9" dy="2">C</tspan>
      </text>
      <line x1="212" y1="40" x2="212" y2="226" stroke="var(--c-warn)" stroke-width="2" />
      <path d="M206 46 l6 -6 l6 6" stroke="var(--c-warn)" stroke-width="2" fill="none" />
      <path d="M206 220 l6 6 l6 -6" stroke="var(--c-warn)" stroke-width="2" fill="none" />
      <text x="230" y="138" font-size="12" fill="var(--c-warn)" font-family="system-ui">
        下落方向
      </text>
    </svg>
  </div>
</template>
