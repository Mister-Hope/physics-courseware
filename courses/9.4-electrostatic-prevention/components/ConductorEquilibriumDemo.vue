<script setup lang="ts">
// 第 4 页：静电平衡 —— 第 1 击触发"感应电荷 0→100%"过程动画；只保留外电场 E0 滑块
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps<{ step: number }>();

const E0 = ref(60);
const eta = ref(0);
let raf = 0;

function run() {
  if (typeof requestAnimationFrame === "undefined") {
    eta.value = 1;
    return;
  }
  if (raf) cancelAnimationFrame(raf);
  const start = performance.now();
  const dur = 1500;
  const tick = (t: number) => {
    const p = Math.min(1, (t - start) / dur);
    eta.value = p;
    if (p < 1) raf = requestAnimationFrame(tick);
  };
  eta.value = 0;
  raf = requestAnimationFrame(tick);
}

watch(
  () => props.step,
  (s) => {
    if (s >= 2) eta.value = 1;
    else if (s >= 1) run();
  },
);
onMounted(() => {
  if (props.step >= 2) eta.value = 1;
  else if (props.step >= 1) run();
});

const Eprime = computed(() => eta.value * E0.value);
const EIn = computed(() => E0.value - Eprime.value);
const nCharge = computed(() => Math.max(1, Math.round(1 + eta.value * (E0.value / 18))));
const ys = [64, 98, 132, 166, 200];
const chargeY = [86, 120, 154, 188];
</script>

<template>
  <div class="stack">
    <svg viewBox="0 0 420 240" class="w-full" xmlns="http://www.w3.org/2000/svg" style="height: 185px">
      <CourseArrow
        v-for="y in ys"
        :key="`fl${y}`"
        :from="{ x: 20, y }"
        :to="{ x: 144, y }"
        stroke="var(--c-field)"
        stroke-width="1.6"
        :opacity="0.75"
      />
      <CourseArrow
        v-for="y in ys"
        :key="`fr${y}`"
        :from="{ x: 282, y }"
        :to="{ x: 400, y }"
        stroke="var(--c-field)"
        stroke-width="1.6"
        :opacity="0.75"
      />
      <rect x="150" y="54" width="124" height="140" rx="8" fill="var(--c-line)" fill-opacity="0.55" stroke="var(--c-text-mute)" stroke-opacity="0.5" stroke-width="2" />
      <template v-if="step >= 1">
        <text
          v-for="(y, i) in chargeY.slice(0, nCharge)"
          :key="`m${i}`"
          x="166"
          :y="y"
          text-anchor="middle"
          dominant-baseline="central"
          font-family="KaTeX_Main"
          font-size="17"
          fill="var(--c-danger)"
        >
          −
        </text>
        <text
          v-for="(y, i) in chargeY.slice(0, nCharge)"
          :key="`p${i}`"
          x="258"
          :y="y"
          text-anchor="middle"
          dominant-baseline="central"
          font-family="KaTeX_Main"
          font-size="17"
          fill="var(--c-accent-2)"
        >
          +
        </text>
        <CourseArrow
          v-if="Eprime > 0"
          :from="{ x: 258, y: 124 }"
          :to="{ x: 166, y: 124 }"
          stroke="var(--c-accent)"
          stroke-width="3"
          label="E′"
        />
        <text
          v-if="step >= 2"
          x="212"
          y="124"
          text-anchor="middle"
          dominant-baseline="central"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="15"
          fill="var(--c-accent)"
        >
          E<tspan baseline-shift="sub" font-size="10">内</tspan> = 0
        </text>
      </template>
      <text x="212" y="30" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-field)">E<tspan baseline-shift="sub" font-size="10">0</tspan></text>
    </svg>
    <div class="stack">
      <CourseSlider v-model="E0" :min="20" :max="100" :step="1" label="外电场" label-tex="E_0" label-width="5.2rem">
        <template #value>{{ E0 }} <Latex tex="\text{N/C}" /></template>
      </CourseSlider>
      <div
        class="text-[0.95rem]"
        style="
          align-self: stretch;
          width: 100%;
          text-align: left;
          display: grid;
          grid-template-columns: auto minmax(3.6ch, max-content) auto auto minmax(3.6ch, max-content) auto;
          column-gap: 0.35rem;
          align-items: baseline;
        "
        :style="{ visibility: step >= 1 ? 'visible' : 'hidden' }"
      >
        <Latex tex="E'=" />
        <span class="tabular-nums" style="white-space: pre">{{ String(Math.round(Eprime)).padStart(3, " ") }}</span>
        <Latex tex="\text{N/C}" />
        <Latex tex="E_{\text{内}}=" />
        <span class="tabular-nums" style="white-space: pre">{{ String(Math.round(EIn)).padStart(3, " ") }}</span>
        <Latex tex="\text{N/C}" />
      </div>
    </div>
  </div>
</template>
