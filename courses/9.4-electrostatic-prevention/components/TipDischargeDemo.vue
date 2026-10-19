<script setup lang="ts">
// 第 6 页：尖端放电 —— 只保留曲率半径 r 一个主导滑块（U 固定 10 kV）；E尖 = U/r 只用于内部判断，屏幕只给读数与状态
import { computed, ref } from "vue";

const { step } = defineProps<{ step: number }>();

const U = 10; // kV，固定档
const r = ref(1); // mm
const Eb = 3e6; // V/m

const etip = computed(() => (U / r.value) * 1e6);
const discharging = computed(() => etip.value >= Eb);
const etipTex = computed(() => {
  const e = Math.floor(Math.log10(etip.value));
  const m = etip.value / 10 ** e;
  return `${m.toFixed(1)}\\times10^{${e}}\\ \\text{V/m}`;
});
const shown = computed(() => step >= 1 && discharging.value);
const molecules = [
  { x: 258, y: 92 },
  { x: 300, y: 120 },
  { x: 272, y: 146 },
  { x: 320, y: 82 },
];
</script>

<template>
  <div class="stack">
    <svg
      viewBox="0 0 420 250"
      class="w-full"
      xmlns="http://www.w3.org/2000/svg"
      style="height: 200px"
    >
      <path
        d="M 178 210 L 236 210 L 222 92 L 196 92 Z"
        fill="var(--c-line)"
        fill-opacity="0.65"
        stroke="var(--c-text-mute)"
        stroke-opacity="0.5"
        stroke-width="2"
      />
      <line
        x1="205"
        y1="92"
        x2="205"
        y2="30"
        stroke="var(--c-text-mute)"
        stroke-width="4"
        stroke-linecap="round"
      />
      <text
        x="205"
        y="234"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="13"
        fill="var(--c-text-mute)"
      >
        尖端导体（带正电）
      </text>
      <template v-for="(m, i) in molecules" :key="`m${i}`">
        <circle
          :cx="m.x"
          :cy="m.y"
          r="7"
          fill="none"
          stroke="var(--c-text-mute)"
          stroke-opacity="0.6"
          stroke-width="1.6"
        />
        <template v-if="shown">
          <text
            :x="m.x - 10"
            :y="m.y"
            text-anchor="middle"
            dominant-baseline="central"
            font-family="KaTeX_Main"
            font-size="13"
            fill="var(--c-velocity)"
          >
            −
          </text>
          <text
            :x="m.x + 10"
            :y="m.y"
            text-anchor="middle"
            dominant-baseline="central"
            font-family="KaTeX_Main"
            font-size="13"
            fill="var(--c-danger)"
          >
            +
          </text>
        </template>
      </template>
      <template v-if="shown && step >= 2">
        <template v-for="i in 3" :key="`a${i}`">
          <circle
            :cx="300 + i * 16"
            :cy="40 + i * 18"
            r="6"
            fill="none"
            stroke="var(--c-text-mute)"
            stroke-opacity="0.5"
            stroke-width="1.4"
          />
          <text
            :x="300 + i * 16 - 9"
            :y="40 + i * 18"
            text-anchor="middle"
            dominant-baseline="central"
            font-family="KaTeX_Main"
            font-size="12"
            fill="var(--c-velocity)"
          >
            −
          </text>
          <text
            :x="300 + i * 16 + 9"
            :y="40 + i * 18"
            text-anchor="middle"
            dominant-baseline="central"
            font-family="KaTeX_Main"
            font-size="12"
            fill="var(--c-danger)"
          >
            +
          </text>
        </template>
      </template>
      <template v-if="shown && step >= 3">
        <CourseArrow
          :from="{ x: 262, y: 96 }"
          :to="{ x: 208, y: 44 }"
          stroke="var(--c-velocity)"
          stroke-width="2"
        />
        <CourseArrow
          :from="{ x: 318, y: 112 }"
          :to="{ x: 214, y: 52 }"
          stroke="var(--c-velocity)"
          stroke-width="2"
        />
        <CourseArrow
          :from="{ x: 286, y: 150 }"
          :to="{ x: 212, y: 62 }"
          stroke="var(--c-velocity)"
          stroke-width="2"
        />
        <text x="120" y="60" font-family="KaTeX_Main" font-size="12" fill="var(--c-velocity)">
          异种电荷奔向尖端中和
        </text>
      </template>
    </svg>
    <CourseSlider
      v-model="r"
      :min="0.5"
      :max="5"
      :step="0.1"
      label="曲率半径"
      label-tex="r"
      label-width="6.4rem"
    >
      <template #value>{{ r.toFixed(1) }} <Latex tex="\text{mm}" /></template>
    </CourseSlider>
    <div
      class="text-[0.95rem] whitespace-nowrap tabular-nums"
      :style="{ visibility: step >= 1 ? 'visible' : 'hidden' }"
    >
      <Latex tex="U=10\ \text{kV}" />　<Latex tex="E_{\text{尖}}=" /><Latex :tex="etipTex" />　
      <span :class="discharging ? 'text-accent' : 'text-dim'">{{
        discharging ? "放电中" : "未电离"
      }}</span>
    </div>
  </div>
</template>
