<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 12 页交互：换零势能面，看哪些量变、哪些量不变。
 *
 * 物体 A 在 h_A = 4.0 m 高处，落到地面上的 B 点（h_B = 0）；零势能面高度 h₀ 由滑块给出（−2 m ～ 8 m）。
 * E_pA = mg(h_A − h₀)、E_pB = mg(h_B − h₀)、W_G = mg(h_A − h_B)、ΔE_p = E_pB − E_pA = −W_G。
 * 取 m = 1.0 kg、g = 10 m/s²：E_p 的读数随 h₀ 变，W_G 与 ΔE_p 始终不变。
 *
 * 版面：图 viewBox 600×160，按 380px 宽渲染（≈101px 高）。
 * 读数一律走 <Latex>（含单位 m / J），滑块的读数也用 #value 槽写成 h₀ = 0.00 m。
 */

const M = 1;
const G = 10;
const H_A = 4;
const H_B = 0;
const H_MIN = -2;
const H_MAX = 8;
const TOP = 20;
const BOTTOM = 140;

/** 零势能面的高度（m） */
const h0 = ref(0);

const epA = computed(() => M * G * (H_A - h0.value));
const epB = computed(() => M * G * (H_B - h0.value));
const wG = computed(() => M * G * (H_A - H_B));
const dEp = computed(() => epB.value - epA.value);

/** 高度 → 图上的 y 坐标 */
const y = (h: number) => BOTTOM - ((h - H_MIN) / (H_MAX - H_MIN)) * (BOTTOM - TOP);

const jTex = (lhs: string, value: number) => `${lhs} = ${value.toFixed(1)}\\ \\text{J}`;
const epATex = computed(() => jTex("E_{pA}", epA.value));
const epBTex = computed(() => jTex("E_{pB}", epB.value));
const wGTex = computed(() => jTex("W_G", wG.value));
const dEpTex = computed(() => jTex("\\Delta E_p", dEp.value));

/** 滑块的读数：带单位 */
const h0Tex = computed(() => `${h0.value.toFixed(2)}\\ \\text{m}`);
</script>

<template>
  <div class="rpl">
    <svg viewBox="0 0 600 160" width="100%" style="max-width: 380px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="改变零势能面高度时两点重力势能与重力做功的变化">
      <SurfaceHatch :from="{ x: 60, y: y(0) }" :to="{ x: 540, y: y(0) }" side="below" :thickness="10" :gap="18" />
      <line :x1="330" :y1="y(H_A)" :x2="330" :y2="y(H_B)" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="5 5" />
      <line :x1="60" :y1="y(h0)" :x2="540" :y2="y(h0)" stroke="var(--c-accent)" stroke-width="2.6" stroke-dasharray="10 7" />
      <text :x="150" :y="y(h0) - 7" font-size="15" fill="var(--c-accent)" text-anchor="middle" class="rpl-lbl">
        <tspan font-family="KaTeX_Main">零势能面</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic" dx="6">h</tspan><tspan font-family="KaTeX_Main" font-size="11" dy="4">0</tspan>
        <tspan dy="-4" font-family="KaTeX_Main"> = {{ h0.toFixed(2) }} m</tspan>
      </text>
      <circle :cx="330" :cy="y(H_A)" r="10" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="2.2" />
      <circle :cx="330" :cy="y(H_B)" r="10" fill="var(--c-surface-solid)" stroke="var(--c-physics)" stroke-width="2.2" />
      <text :x="306" :y="y(H_A) + 6" font-size="16" font-family="KaTeX_Main" fill="var(--c-text-dim)" text-anchor="end" class="rpl-lbl">{{ H_A.toFixed(2) }} m</text>
      <text :x="306" :y="y(H_B) + 6" font-size="16" font-family="KaTeX_Main" fill="var(--c-text-dim)" text-anchor="end" class="rpl-lbl">{{ H_B.toFixed(2) }} m</text>
      <text :x="350" :y="y(H_A) + 6" font-size="20" fill="var(--c-text)" class="rpl-lbl">A</text>
      <text :x="350" :y="y(H_B) + 6" font-size="20" fill="var(--c-text)" class="rpl-lbl">B</text>
    </svg>

    <CourseSlider v-model="h0" :min="H_MIN" :max="H_MAX" :step="0.25" label="零势能面高度" label-tex="h_0" accent="gold">
      <template #value>
        <Latex :tex="h0Tex" />
      </template>
    </CourseSlider>

    <div class="rpl-out">
      <Latex :tex="epATex" />
      <Latex :tex="epBTex" />
      <Latex :tex="wGTex" />
      <Latex :tex="dEpTex" />
    </div>
  </div>
</template>

<style scoped>
.rpl {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  align-items: center;

  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: var(--c-surface);
}

.rpl-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}

.rpl-out {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.6rem;

  width: 100%;

  text-align: center;
}
</style>
