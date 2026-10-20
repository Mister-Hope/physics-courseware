<script setup lang="ts">
import { computed, ref } from "vue";

const r = ref(0.2);
const K = 9e9;
const Q = 2e-6;

const E = computed(() => (K * Q) / (r.value * r.value));
const E2r = computed(() => (K * Q) / (2 * r.value * (2 * r.value)));
const ratio = computed(() => E.value / E2r.value);

const sci = (v: number, digits = 1): { m: string; e: number } => {
  const e = Math.floor(Math.log10(v));
  const m = v / 10 ** e;
  return { m: m.toFixed(digits), e };
};

const eSci = computed(() => sci(E.value));
const e2rSci = computed(() => sci(E2r.value));

// 视图：点电荷在 (90,150)，r 与 2r 处的箭头按同一比例尺画，长度比恒为 4:1
const P1X = computed(() => 90 + r.value * 760);
const P2X = computed(() => 90 + 2 * r.value * 760);
const lenScale = 52 / ((K * Q) / (0.26 * 0.26));
</script>

<template>
  <div class="flex gap-6 items-stretch">
    <svg viewBox="0 0 520 260" class="flex-1 min-w-0" style="height: 250px">
      <defs>
        <marker
          id="pcf-e"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-force)" />
        </marker>
      </defs>
      <line
        x1="90"
        y1="150"
        x2="500"
        y2="150"
        stroke="var(--c-text-mute)"
        stroke-opacity="0.4"
        stroke-width="1.6"
        stroke-dasharray="4 5"
      />
      <circle cx="90" cy="150" r="20" fill="var(--c-danger)" fill-opacity="0.9" />
      <text
        x="90"
        y="150"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="20"
        fill="#fff"
      >
        +
      </text>
      <text
        x="90"
        y="196"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        fill="var(--c-danger)"
      >
        +Q
      </text>
      <circle :cx="P1X" cy="150" r="5" fill="var(--c-gold)" />
      <line
        :x1="P1X + 8"
        y1="150"
        :x2="P1X + 8 + E * lenScale"
        y2="150"
        stroke="var(--c-force)"
        stroke-width="3.4"
        marker-end="url(#pcf-e)"
      />
      <text
        :x="P1X"
        y="112"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-gold)"
      >
        r
      </text>
      <circle :cx="P2X" cy="150" r="5" fill="var(--c-gold)" />
      <line
        :x1="P2X + 8"
        y1="150"
        :x2="P2X + 8 + E2r * lenScale"
        y2="150"
        stroke="var(--c-force)"
        stroke-width="3.4"
        marker-end="url(#pcf-e)"
      />
      <text
        :x="(P1X + P2X) / 2"
        y="112"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-gold)"
      >
        r
      </text>
    </svg>
    <div class="w-64 shrink-0 flex flex-col justify-center gap-4">
      <CourseSlider v-model="r" :min="0.18" :max="0.26" :step="0.005" />
      <div class="text-[15px]">
        <Latex tex="r = " />{{ r.toFixed(3) }} <Latex tex="\text{ m}" />
      </div>
      <div class="text-[15px]">
        <Latex tex="E = k\dfrac{Q}{r^2} = " />
        {{ eSci.m }}<Latex tex="\times 10^{" />{{ eSci.e }}<Latex tex="\ \text{N/C}" />
      </div>
      <div class="text-[15px]">
        <Latex tex="E(2r) = " />{{ e2rSci.m }}<Latex tex="\times 10^{" />{{ e2rSci.e
        }}<Latex tex="\ \text{N/C}" />
      </div>
      <div class="text-[16px] text-[var(--c-gold)]">
        <Latex tex="\dfrac{E(r)}{E(2r)} = " />{{ ratio.toFixed(1) }}
      </div>
    </div>
  </div>
</template>
