<script setup lang="ts">
// 第 4 页：静电平衡 —— 点击分步（无滑块）：第 1 击弱外电场下 E′ 从 0 长到 E₀；第 2 击换成更强的一档，E内 仍回到 0
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps<{ step: number }>();

const E0 = computed(() => (props.step >= 2 ? 100 : 60));
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
    if (s >= 1) run();
  },
);
onMounted(() => {
  if (props.step >= 1) run();
});

const Eprime = computed(() => eta.value * E0.value);
const EIn = computed(() => E0.value - Eprime.value);
const nCharge = computed(() => Math.max(1, Math.round(1 + eta.value * (E0.value / 18))));
const strong = computed(() => E0.value >= 100);
const e0Txt = computed(() => String(Math.round(E0.value)).padStart(3, " "));
const epTxt = computed(() => String(Math.round(Eprime.value)).padStart(3, " "));
const einTxt = computed(() => String(Math.round(EIn.value)).padStart(3, " "));
const ys = [64, 98, 132, 166, 200];
const chargeY = [86, 120, 154, 188];
</script>

<template>
  <div class="stack">
    <svg
      viewBox="0 0 420 240"
      class="w-full"
      xmlns="http://www.w3.org/2000/svg"
      style="height: 185px"
    >
      <CourseArrow
        v-for="y in ys"
        :key="`fl${y}`"
        :from="{ x: 20, y }"
        :to="{ x: 144, y }"
        stroke="var(--c-field)"
        :stroke-width="strong ? 2.4 : 1.6"
        :opacity="strong ? 0.95 : 0.7"
      />
      <CourseArrow
        v-for="y in ys"
        :key="`fr${y}`"
        :from="{ x: 282, y }"
        :to="{ x: 400, y }"
        stroke="var(--c-field)"
        :stroke-width="strong ? 2.4 : 1.6"
        :opacity="strong ? 0.95 : 0.7"
      />
      <rect
        x="150"
        y="54"
        width="124"
        height="140"
        rx="8"
        fill="var(--c-line)"
        fill-opacity="0.55"
        stroke="var(--c-text-mute)"
        stroke-opacity="0.5"
        stroke-width="2"
      />
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
          fill="var(--c-velocity)"
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
          fill="var(--c-danger)"
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
        <circle
          v-for="(y, i) in [78, 106, 138, 166]"
          :key="`el${i}`"
          :cx="248 - eta * 84"
          :cy="y"
          r="5"
          fill="var(--c-velocity)"
          fill-opacity="0.8"
        />
        <text
          x="212"
          y="222"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="11"
          fill="var(--c-text-mute)"
        >
          自由电子
        </text>
        <text
          v-if="step >= 2 && eta >= 1"
          x="212"
          y="158"
          text-anchor="middle"
          dominant-baseline="central"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="15"
          paint-order="stroke"
          stroke="#0f1425"
          stroke-width="4"
          stroke-linejoin="round"
          fill="var(--c-accent)"
        >
          E
          <tspan baseline-shift="sub" font-size="10">内</tspan>
          = 0
        </text>
      </template>
      <text
        x="212"
        y="30"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        fill="var(--c-field)"
      >
        E
        <tspan baseline-shift="sub" font-size="10">0</tspan>
      </text>
    </svg>
    <div
      class="text-[0.95rem]"
      style="align-self: stretch; width: 100%; text-align: left"
      :style="{ visibility: step >= 1 ? 'visible' : 'hidden' }"
    >
      <div
        style="
          display: grid;
          grid-template-columns: auto minmax(3.6ch, max-content) auto auto;
          align-items: baseline;
          column-gap: 0.35rem;
        "
      >
        <Latex tex="E_0=" />
        <span class="tabular-nums" style="white-space: pre">{{ e0Txt }}</span>
        <Latex tex="\text{N/C}" />
        <span>（{{ strong ? "强" : "弱" }}）</span>
      </div>
      <div
        style="
          display: grid;
          grid-template-columns:
            auto minmax(3.6ch, max-content) auto auto minmax(3.6ch, max-content)
            auto;
          align-items: baseline;
          column-gap: 0.35rem;
        "
      >
        <Latex tex="E'=" />
        <span class="tabular-nums" style="white-space: pre">{{ epTxt }}</span>
        <Latex tex="\text{N/C}" />
        <Latex tex="E_{\text{内}}=" />
        <span class="tabular-nums" style="white-space: pre">{{ einTxt }}</span>
        <Latex tex="\text{N/C}" />
      </div>
    </div>
  </div>
</template>
