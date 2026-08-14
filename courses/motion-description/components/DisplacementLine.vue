<script setup lang="ts">
import { ref, computed } from "vue";

const x1 = ref(5);
const x2 = ref(2);

const SCALE = 26; // px per 单位
const ORIGIN = 320; // 0 在 SVG 中的 x
const AXIS_Y = 150;

const svgX = (v: number): number => ORIGIN + v * SCALE;

const dx = computed<number>(() => x2.value - x1.value);
const dxTex = computed<string>(
  () => `\\Delta x = x_2 - x_1 = ${x2.value} - ${x1.value} = ${dx.value}\\ \\text{m}`,
);
const magnitude = computed<number>(() => Math.abs(dx.value));
const direction = computed<string>(() => {
  if (dx.value > 0) return "x 轴正方向";
  if (dx.value < 0) return "x 轴负方向";
  return "位移为零";
});

const ticks = computed<number[]>(() => {
  const arr: number[] = [];
  for (let v = -10; v <= 10; v += 2) if (v !== 0) arr.push(v);
  return arr;
});

const arrowLen = computed<number>(() => Math.abs(svgX(x2.value) - svgX(x1.value)));
</script>

<template>
  <div class="disp-wrap">
    <div class="controls">
      <label class="slider">
        <span class="slider-label" style="color: #60a5fa">初位置 <Latex tex="x_1" /></span>
        <input v-model.number="x1" type="range" min="-10" max="10" step="0.5" class="range blue" />
        <span class="slider-val" style="color: #60a5fa">{{ x1 }} m</span>
      </label>
      <label class="slider">
        <span class="slider-label" style="color: #e2a846">末位置 <Latex tex="x_2" /></span>
        <input v-model.number="x2" type="range" min="-10" max="10" step="0.5" class="range gold" />
        <span class="slider-val" style="color: #e2a846">{{ x2 }} m</span>
      </label>
    </div>

    <svg viewBox="0 0 640 220" class="disp-svg">
      <!-- 坐标轴（一维） -->
      <line x1="60" y1="150" x2="580" y2="150" stroke="#64748b" stroke-width="2" />

      <!-- 刻度与标签 -->
      <g stroke="#475569" stroke-width="1.5">
        <line v-for="v in ticks" :key="v" :x1="svgX(v)" :y1="144" :x2="svgX(v)" :y2="156" />
      </g>
      <g font-size="12" fill="#94a3b8" text-anchor="middle">
        <text v-for="v in ticks" :key="v" :x="svgX(v)" y="172">{{ v }}</text>
      </g>
      <text x="580" y="198" text-anchor="end" font-size="13" fill="#94a3b8">
        <tspan font-style="italic">x</tspan>
        / m
      </text>

      <!-- 原点标记（在零点处） -->
      <circle cx="320" cy="150" r="4" fill="#94a3b8" />
      <text x="320" y="172" text-anchor="middle" font-size="13" fill="#94a3b8">O</text>

      <!-- 有向线段（初 → 末） -->
      <g v-if="arrowLen > 8">
        <line
          :x1="svgX(x1)"
          :y1="150"
          :x2="svgX(x2)"
          :y2="150"
          stroke="#e2a846"
          stroke-width="4"
          stroke-linecap="round"
        />
        <!-- 箭头 -->
        <g :transform="`translate(${svgX(x2)}, 150) ${x2 >= x1 ? '' : 'rotate(180)'}`">
          <path d="M 0 0 L -14 -8 L -14 8 Z" fill="#e2a846" />
        </g>
      </g>
      <g v-else>
        <circle :cx="svgX(x1)" cy="150" r="6" fill="#e2a846" />
      </g>

      <!-- 初末位置标记 -->
      <g v-if="arrowLen > 8">
        <line
          :x1="svgX(x1)"
          :y1="150"
          :x2="svgX(x1)"
          :y2="86"
          stroke="#60a5fa"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />
        <circle :cx="svgX(x1)" cy="150" r="5" fill="#60a5fa" />
        <text
          :x="svgX(x1)"
          y="78"
          text-anchor="middle"
          font-size="13"
          font-weight="700"
          fill="#60a5fa"
        >
          初
          <tspan font-style="italic">x</tspan>
          ₁
        </text>

        <line
          :x1="svgX(x2)"
          :y1="150"
          :x2="svgX(x2)"
          :y2="86"
          stroke="#e2a846"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />
        <circle :cx="svgX(x2)" cy="150" r="5" fill="#e2a846" />
        <text
          :x="svgX(x2)"
          y="78"
          text-anchor="middle"
          font-size="13"
          font-weight="700"
          fill="#e2a846"
        >
          末
          <tspan font-style="italic">x</tspan>
          ₂
        </text>
      </g>

      <g v-else>
        <line
          :x1="svgX(x1)"
          :y1="150"
          :x2="svgX(x1)"
          :y2="86"
          stroke="#60a5fa"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />
        <text
          :x="svgX(x1)"
          y="78"
          text-anchor="middle"
          font-size="13"
          font-weight="700"
          fill="#60a5fa"
        >
          初 / 末
          <tspan font-style="italic">x</tspan>
        </text>
      </g>
    </svg>

    <div class="result-card">
      <div class="result-row">
        <span class="k">位移</span>
        <span class="v"><Latex :tex="dxTex" /></span>
      </div>
      <div class="result-row">
        <span class="k">大小</span>
        <span class="v accent">{{ magnitude }} m</span>
      </div>
      <div class="result-row">
        <span class="k">方向</span>
        <span class="v blue">{{ direction }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.disp-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}

.slider {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.slider-label {
  font-size: 0.85rem;
  font-weight: 600;
  width: 4.6rem;
  text-align: right;
  flex-shrink: 0;
}

.slider-val {
  font-size: 0.85rem;
  font-weight: 700;
  width: 3.4rem;
}

.range {
  flex: 1;
  height: 5px;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 2rem;
  background: rgba(148, 163, 184, 0.2);
  outline: none;
  cursor: pointer;
}

.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #0f1425;
}

.range.blue::-webkit-slider-thumb {
  background: #60a5fa;
}

.range.gold::-webkit-slider-thumb {
  background: #e2a846;
}

.disp-svg {
  max-width: 720px;
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: block;
  border-radius: 1.25rem;
  border: 1px solid rgba(148, 163, 184, 0.1);
  background: rgba(15, 20, 37, 0.4);
}

.disp-svg text {
  font-family: "Times New Roman", "STIX Two Text", "Source Serif 4", Georgia, serif;
}

.result-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.6rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.result-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  background: rgba(30, 41, 59, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 1rem;
  padding: 0.5rem 0.7rem;
}

.k {
  font-size: 0.72rem;
  color: #94a3b8;
}

.v {
  font-size: 0.95rem;
  font-weight: 700;
  color: #f1f5f9;
}

.v.accent {
  color: #e2a846;
}

.v.blue {
  color: #60a5fa;
}
</style>
