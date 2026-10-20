<script setup lang="ts">
import { computed, ref } from "vue";

const h = ref(110);
const K = 9e9;
const Q1 = 4e-8;
const Q2 = -1e-8;
const d = 300;
const SCALE = 0.0625; // svg 单位 / (N/C)

const r1 = computed(() => Math.hypot(h.value, d / 2));
const r2 = computed(() => Math.hypot(h.value, d / 2));
const e1 = computed(() => (K * Q1) / (r1.value * r1.value));
const e2 = computed(() => (K * Q2) / (r2.value * r2.value));
const ex = computed(
  () => e1.value * (d / 2 / r1.value) + e2.value * (d / 2 / r2.value),
);
const ey = computed(() => e1.value * (-h.value / r1.value) + e2.value * (h.value / r2.value));
const eMag = computed(() => Math.hypot(ex.value, ey.value));

const px = 450;
const py = computed(() => 270 - h.value);
const e1Len = computed(() => e1.value * SCALE);
const e2Len = computed(() => e2.value * SCALE);
const eLen = computed(() => eMag.value * SCALE);

const sci = (v: number, digits = 1): { m: string; e: number } => {
  const e = Math.floor(Math.log10(v));
  const m = v / 10 ** e;
  return { m: m.toFixed(digits), e };
};
const eSci = computed(() => sci(eMag.value));
const e1Sci = computed(() => sci(e1.value));
const e2Sci = computed(() => sci(Math.abs(e2.value)));

const e1End = computed(() => {
  const ux = 150 / r1.value;
  const uy = -h.value / r1.value;
  return [px + ux * e1Len.value, py.value + uy * e1Len.value] as const;
});
const e2End = computed(() => {
  const ux = 150 / r2.value;
  const uy = h.value / r2.value;
  return [px + ux * e2Len.value, py.value + uy * e2Len.value] as const;
});
const eEnd = computed(() => {
  const ux = ex.value / eMag.value;
  const uy = ey.value / eMag.value;
  return [px + ux * eLen.value, py.value + uy * eLen.value] as const;
});
</script>

<template>
  <div class="flex gap-6 items-stretch">
    <svg viewBox="0 0 560 340" class="flex-1 min-w-0" style="height: 290px">
      <defs>
        <marker
          id="sf-e1"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-danger)" />
        </marker>
        <marker
          id="sf-e2"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-velocity)" />
        </marker>
        <marker
          id="sf-e"
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
        x1="50"
        y1="270"
        x2="510"
        y2="270"
        stroke="var(--c-text-mute)"
        stroke-opacity="0.35"
        stroke-width="1.6"
        stroke-dasharray="4 6"
      />
      <line
        :x1="px"
        :y1="py"
        :x2="px"
        y2="270"
        stroke="var(--c-text-mute)"
        stroke-opacity="0.5"
        stroke-width="1.6"
        stroke-dasharray="4 6"
      />
      <line
        x1="150"
        y1="270"
        :x2="px"
        :y2="py"
        stroke="var(--c-line)"
        stroke-width="1.4"
        stroke-dasharray="5 5"
      />
      <text
        :x="(px + 150) / 2 - 14"
        :y="(py + 270) / 2"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-text-mute)"
      >
        r
      </text>
      <circle cx="150" cy="270" r="18" fill="var(--c-danger)" fill-opacity="0.9" />
      <text
        x="150"
        y="270"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="19"
        fill="#fff"
      >
        +
      </text>
      <text
        x="150"
        y="308"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-danger)"
      >
        Q₁
      </text>
      <circle cx="450" cy="270" r="18" fill="var(--c-velocity)" fill-opacity="0.9" />
      <text
        x="450"
        y="270"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="19"
        fill="#fff"
      >
        −
      </text>
      <text
        x="450"
        y="308"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-velocity)"
      >
        Q₂
      </text>
      <circle :cx="px" :cy="py" r="6" fill="var(--c-gold)" />
      <text
        :x="px - 18"
        :y="py - 10"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        fill="var(--c-gold)"
      >
        P
      </text>
      <line
        :x1="px"
        :y1="py"
        :x2="e1End[0]"
        :y2="e1End[1]"
        stroke="var(--c-danger)"
        stroke-width="3"
        marker-end="url(#sf-e1)"
      />
      <line
        :x1="px"
        :y1="py"
        :x2="e2End[0]"
        :y2="e2End[1]"
        stroke="var(--c-velocity)"
        stroke-width="3"
        marker-end="url(#sf-e2)"
      />
      <line
        :x1="px"
        :y1="py"
        :x2="eEnd[0]"
        :y2="eEnd[1]"
        stroke="var(--c-force)"
        stroke-width="3.6"
        marker-end="url(#sf-e)"
      />
      <line
        :x1="e1End[0]"
        :y1="e1End[1]"
        :x2="eEnd[0]"
        :y2="eEnd[1]"
        stroke="var(--c-text-mute)"
        stroke-opacity="0.55"
        stroke-width="1.5"
        stroke-dasharray="5 5"
      />
      <line
        :x1="e2End[0]"
        :y1="e2End[1]"
        :x2="eEnd[0]"
        :y2="eEnd[1]"
        stroke="var(--c-text-mute)"
        stroke-opacity="0.55"
        stroke-width="1.5"
        stroke-dasharray="5 5"
      />
    </svg>
    <div class="w-60 shrink-0 flex flex-col justify-center gap-3">
      <CourseSlider v-model="h" :min="60" :max="150" :step="5" />
      <div class="text-[15px]"><Latex tex="h = " />{{ h }} <Latex tex="\text{ cm}" /></div>
      <div class="text-[14px]">
        <Latex tex="E_1 = " />{{ e1Sci.m }}<Latex tex="\times 10^{" />{{ e1Sci.e
        }}<Latex tex="\ \text{N/C}" />
      </div>
      <div class="text-[14px]">
        <Latex tex="E_2 = " />{{ e2Sci.m }}<Latex tex="\times 10^{" />{{ e2Sci.e
        }}<Latex tex="\ \text{N/C}" />
      </div>
      <div class="text-[15px] text-[var(--c-gold)]">
        <Latex tex="E = " />{{ eSci.m }}<Latex tex="\times 10^{" />{{ eSci.e
        }}<Latex tex="\ \text{N/C}" />
      </div>
    </div>
  </div>
</template>
