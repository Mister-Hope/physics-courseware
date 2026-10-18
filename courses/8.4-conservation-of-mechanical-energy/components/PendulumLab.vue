<script setup lang="ts">
import { computed, ref } from "vue";

const G = 9.8;
const l = ref(1.2);
const theta = ref(60);

const lTex = computed(() => l.value.toFixed(1));
const thetaTex = computed(() => theta.value.toFixed(0));
const h = computed(() => l.value * (1 - Math.cos((theta.value * Math.PI) / 180)));
const v = computed(() => Math.sqrt(2 * G * h.value));
const ep = computed(() => 0.5 * G * h.value);
const ek = computed(() => ep.value);
const bob = computed(() => {
  const rad = (theta.value * Math.PI) / 180;
  return { x: 170 + 100 * Math.sin(rad), y: 60 + 100 * Math.cos(rad) };
});
</script>

<template>
  <div class="grid" style="grid-template-columns: 1fr 0.9fr; gap: 0 1.5rem; align-items: stretch">
    <svg
      viewBox="0 0 360 250"
      style="width: 100%; height: 100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="60"
        y1="60"
        x2="280"
        y2="60"
        stroke="var(--c-ink-faint)"
        stroke-width="6"
        stroke-linecap="round"
      />
      <path
        d="M72 160 Q170 208 268 160"
        stroke="var(--c-line-strong)"
        stroke-width="2"
        stroke-dasharray="7 7"
        fill="none"
        opacity="0.55"
      />
      <line
        x1="170"
        y1="60"
        x2="170"
        y2="160"
        stroke="var(--c-line-strong)"
        stroke-width="2"
        stroke-dasharray="6 6"
        opacity="0.5"
      />
      <line
        x1="170"
        y1="60"
        :x2="bob.x"
        :y2="bob.y"
        stroke="var(--c-line-strong)"
        stroke-width="2.5"
      />
      <circle
        :cx="bob.x"
        :cy="bob.y"
        r="15"
        fill="var(--c-warn)"
        fill-opacity="0.35"
        stroke="var(--c-warn)"
        stroke-width="4"
      />
      <line
        x1="170"
        :y1="60 + 100"
        x2="170"
        y2="230"
        stroke="var(--c-warn)"
        stroke-width="2"
        stroke-dasharray="4 5"
        opacity="0.7"
      />
      <path
        d="M170 118 A50 50 0 0 1"
        fill="none"
        stroke="var(--c-warn)"
        stroke-width="2"
        opacity="0.8"
      />
      <path
        d="M170 118 q4 -6 9 -8"
        fill="none"
        stroke="var(--c-warn)"
        stroke-width="2"
        opacity="0.8"
      />
      <text
        x="182"
        y="118"
        font-size="13"
        fill="var(--c-warn)"
        font-family="KaTeX_Math"
        font-style="italic"
      >
        θ
      </text>
      <text
        x="150"
        y="196"
        font-size="13"
        fill="var(--c-ok)"
        font-family="KaTeX_Math"
        font-style="italic"
      >
        h
      </text>
      <text x="316" y="160" font-size="13" fill="var(--c-ink-faint)" font-family="KaTeX_Main">
        A
      </text>
      <text x="160" y="238" font-size="13" fill="var(--c-ink-faint)" font-family="KaTeX_Main">
        O
      </text>
    </svg>
    <div class="flex flex-col" style="gap: 0.5rem">
      <div>
        <span style="font-size: 0.9rem"
          >摆角 <Latex tex="\theta = " /><Latex :tex="`${thetaTex}^\circ`"
        /></span>
        <CourseSlider v-model="theta" :min="10" :max="80" :step="1" />
      </div>
      <div style="height: 1px; background: var(--c-line)"></div>
      <div style="font-size: 0.95rem; display: flex; justify-content: space-between">
        <span><Latex :tex="`h = l(1-\cos\theta) = ${lTex}(1-\cos${thetaTex}^\circ)`" /></span>
        <b><Latex :tex="`${h.toFixed(3)}\ \text{m}`" /></b>
      </div>
      <div style="font-size: 0.95rem; display: flex; justify-content: space-between">
        <span><Latex tex="E_p = mgh" /></span>
        <b style="color: var(--c-ok)"><Latex :tex="`${ep.toFixed(2)}\ \text{J}\cdot m`" /></b>
      </div>
      <div style="font-size: 0.95rem; display: flex; justify-content: space-between">
        <span><Latex :tex="`v = \sqrt{2gl(1-\cos\theta)}`" /></span>
        <b style="color: var(--c-info)"><Latex :tex="`${v.toFixed(2)}\ \text{m/s}`" /></b>
      </div>
      <div style="font-size: 0.95rem; display: flex; justify-content: space-between">
        <span><Latex tex="E_k = \tfrac{1}{2}mv^2" /></span>
        <b style="color: var(--c-info)"><Latex :tex="`${ek.toFixed(2)}\ \text{J}\cdot m`" /></b>
      </div>
      <div style="height: 1px; background: var(--c-line)"></div>
      <div style="font-size: 0.9rem; color: var(--c-ink-faint)">
        释放高度越高，最低点速度越大；<Latex tex="E_k" /> 与 <Latex tex="E_p" /> 之和始终不变
      </div>
    </div>
  </div>
</template>
