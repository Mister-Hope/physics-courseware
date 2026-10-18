<script setup lang="ts">
import { computed, ref } from "vue";

const q = ref(1e-8);
const K = 9e9;
const Q = 1e-3;
const R = 0.3;

const E = computed(() => (K * Q) / (R * R));
const F = computed(() => E.value * q.value);
const ratio = computed(() => F.value / q.value);

function sci(v: number, digits = 1) {
  const e = Math.floor(Math.log10(v));
  const m = v / 10 ** e;
  return { m: m.toFixed(digits), e };
}
const qSci = computed(() => sci(q.value));
const fSci = computed(() => sci(F.value));
const eSci = computed(() => sci(E.value));
</script>

<template>
  <div class="flex gap-6 items-stretch">
    <svg viewBox="0 0 420 240" class="flex-1 min-w-0" style="height: 230px">
      <defs>
        <marker
          id="pcd-f"
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
      <circle cx="90" cy="120" r="14" fill="var(--c-danger)" fill-opacity="0.9" />
      <text
        x="90"
        y="120"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="15"
        fill="#fff"
      >
        +
      </text>
      <text
        x="90"
        y="164"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-danger)"
      >
        +Q
      </text>
      <circle cx="90" cy="120" r="58" fill="none" stroke="var(--c-line)" stroke-dasharray="4 6" />
      <line
        x1="90"
        y1="120"
        x2="148"
        y2="120"
        stroke="var(--c-text-mute)"
        stroke-opacity="0.5"
        stroke-width="1.6"
      />
      <text
        x="116"
        y="110"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="13"
        fill="var(--c-text-mute)"
      >
        r
      </text>
      <circle cx="166" cy="120" r="9" fill="var(--c-gold)" fill-opacity="0.9" />
      <text
        x="166"
        y="120"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="11"
        fill="#fff"
      >
        +
      </text>
      <line
        x1="178"
        y1="120"
        :x2="178 + (F.value / 4e-7) * 60"
        y2="120"
        stroke="var(--c-force)"
        stroke-width="3.4"
        marker-end="url(#pcd-f)"
      />
      <text
        x="196"
        y="98"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-force)"
      >
        F
      </text>
      <line
        v-for="i in 8"
        :key="i"
        :x1="90 + Math.cos((i - 1) * 0.7854) * 34"
        :y1="120 + Math.sin((i - 1) * 0.7854) * 34"
        :x2="90 + Math.cos((i - 1) * 0.7854) * 48"
        :y2="120 + Math.sin((i - 1) * 0.7854) * 48"
        stroke="var(--c-field)"
        stroke-opacity="0.55"
        stroke-width="2"
      />
    </svg>
    <div class="w-64 shrink-0 flex flex-col justify-center gap-4">
      <CourseSlider v-model="q" :min="0.4e-8" :max="3e-8" :step="0.1e-8" />
      <div class="text-[15px]">
        <Latex tex="q = " />{{ qSci.m }}<Latex tex="\times 10^{" />{{ qSci.e
        }}<Latex tex="\ \text{C}" />
      </div>
      <div class="text-[15px]">
        <Latex tex="F = Eq = " />{{ fSci.m }}<Latex tex="\times 10^{" />{{ fSci.e
        }}<Latex tex="\ \text{N}" />
      </div>
      <div class="text-[15px] text-[var(--c-gold)]">
        <Latex tex="\dfrac{F}{q} = " />{{ (ratio.value / 1e5).toFixed(2)
        }}<Latex tex="\times 10^5\ \text{N/C}" />
      </div>
      <div class="text-[13px] text-[var(--c-text-mute)] leading-relaxed">
        <Latex tex="E = k\dfrac{Q}{r^2} = " />{{ eSci.m }}<Latex tex="\times 10^{" />{{ eSci.e
        }}<Latex tex="\ \text{N/C}" />，与检验电荷无关
      </div>
    </div>
  </div>
</template>
