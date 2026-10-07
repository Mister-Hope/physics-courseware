<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

/**
 * 第 10 页：用三角形法则看"夹角变、合力怎么变"。
 *
 * F₁ = 3 N 大小方向都不变（从 origin 到 pointA）；F₂ = 4 N 大小不变，**起点放在 F₁ 的终点 pointA**， 绕着 pointA 旋转（转角就是两力的夹角
 * θ）。 合力 F 从 origin 指向 F₂ 的终点 —— 全程只用"首尾相接、首尾相连"这套说法，不碰余弦定理。
 *
 * 滑杆拖 θ，读数实时变；"旋转演示"把 θ 从 0° 转到 180°，让学生自己看出： 同向时最大（F₁+F₂ = 7 N）、反向时最小（|F₁−F₂| = 1
 * N），垂直时正好是直角三角形（3-4-5，斜边 5 N）。
 */
const F1 = 3;
const F2 = 4;
/** 每牛顿多少用户单位 */
const SCALE = 40;
const VIEW = { width: 470, height: 270 };
const origin = { x: 125, y: 232 };
const pointA = { x: origin.x + F1 * SCALE, y: origin.y };
/** F₂ 终点所在的圆弧半径 */
const ARC_R = F2 * SCALE;

const theta = ref(90);
const playing = ref(false);
let raf = 0;

const rad = computed(() => (theta.value * Math.PI) / 180);
const tip = computed(() => ({
  x: pointA.x + ARC_R * Math.cos(rad.value),
  y: pointA.y - ARC_R * Math.sin(rad.value),
}));
/** 合力：F₁ 与 F₂ 首尾相接后，从起点 origin 指向 F₂ 的终点 */
const resultant = computed(() => {
  const x = F1 + F2 * Math.cos(rad.value);
  const y = F2 * Math.sin(rad.value);

  return Math.hypot(x, y);
});

const fmt = (v: number): string => v.toFixed(2);

const thetaTex = computed(() => `\\theta = ${theta.value}^\\circ`);
const forceTex = computed(() => `F = ${fmt(resultant.value)}\\ \\text{N}`);

const sameTex = `F_1 + F_2 = ${fmt(F1 + F2)}\\ \\text{N}`;
const oppositeTex = `|F_1 - F_2| = ${fmt(Math.abs(F1 - F2))}\\ \\text{N}`;
const rightTex = computed(() => `\\sqrt{3^2 + 4^2} = ${fmt(Math.hypot(F1, F2))}\\ \\text{N}`);

const cases = computed(() => [
  { key: "0", label: "同向", tex: sameTex, note: "最大", active: theta.value === 0 },
  { key: "90", label: "垂直", tex: rightTex.value, note: "", active: theta.value === 90 },
  {
    key: "180",
    label: "反向",
    tex: oppositeTex,
    note: "最小",
    active: theta.value === 180,
  },
]);

/** 把 θ 从 0° 连续转到 180°，读数跟着实时变 */
const play = (): void => {
  if (playing.value) return;

  playing.value = true;
  const from = 0;
  const to = 180;
  const duration = 2400;
  const start = performance.now();

  const tick = (now: number): void => {
    const progress = Math.min((now - start) / duration, 1);

    theta.value = Math.round((from + (to - from) * progress) / 5) * 5;

    if (progress < 1) raf = requestAnimationFrame(tick);
    else playing.value = false;
  };

  raf = requestAnimationFrame(tick);
};

onUnmounted(() => {
  cancelAnimationFrame(raf);
});

const pct = (value: number, total: number): number => (value / total) * 100;
</script>

<template>
  <div class="tr-wrap">
    <div class="tr-figure">
      <svg :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`">
        <path
          :d="`M ${pointA.x - ARC_R},${pointA.y} A ${ARC_R},${ARC_R} 0 0 1 ${pointA.x + ARC_R},${pointA.y}`"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.2"
          stroke-dasharray="6 6"
          opacity="0.5"
        />
        <CourseArrow
          :from="origin"
          :to="pointA"
          stroke="var(--c-accent)"
          stroke-width="3.2"
          pointer-events="none"
        />
        <CourseArrow
          :from="pointA"
          :to="tip"
          stroke="var(--c-accent-2)"
          stroke-width="3.2"
          pointer-events="none"
        />
        <CourseArrow
          :from="origin"
          :to="tip"
          stroke="var(--c-physics)"
          stroke-width="3.6"
          pointer-events="none"
        />
        <circle :cx="origin.x" :cy="origin.y" r="3.6" fill="var(--c-text)" />
        <circle :cx="pointA.x" :cy="pointA.y" r="3.2" fill="var(--c-text-dim)" />
        <circle :cx="tip.x" :cy="tip.y" r="4.4" fill="var(--c-physics)" />
      </svg>
      <ChartLabel
        :x-percent="pct((origin.x + pointA.x) / 2, VIEW.width)"
        :y-percent="pct(origin.y, VIEW.height)"
        :parts="[{ tex: 'F_1' }]"
        anchor="bottom-left"
        :dy="12"
        color="var(--c-accent)"
        halo
      />
      <ChartLabel
        :x-percent="pct((pointA.x + tip.x) / 2, VIEW.width)"
        :y-percent="pct((pointA.y + tip.y) / 2, VIEW.height)"
        :parts="[{ tex: 'F_2' }]"
        anchor="bottom-right"
        :dx="6"
        :dy="8"
        color="var(--c-accent-2)"
        halo
      />
      <ChartLabel
        :x-percent="pct((origin.x + tip.x) / 2, VIEW.width)"
        :y-percent="pct((origin.y + tip.y) / 2, VIEW.height)"
        :parts="[{ tex: 'F' }]"
        anchor="top-left"
        :dx="-10"
        :dy="-10"
        color="var(--c-physics)"
        halo
      />
    </div>

    <div class="tr-info">
      <div class="tr-row">
        <span class="tr-name"><Latex tex="\theta" /></span>
        <input
          v-model.number="theta"
          type="range"
          min="0"
          max="180"
          step="5"
          aria-label="两力的夹角"
        />
        <span class="tr-val"><Latex :tex="thetaTex" /></span>
      </div>

      <div class="tr-current"><Latex :tex="forceTex" /></div>

      <div class="tr-cases">
        <div
          v-for="row in cases"
          :key="row.key"
          class="tr-case"
          :class="{ 'tr-active': row.active }"
        >
          <span class="tr-case-label">{{ row.label }}</span>
          <span class="tr-case-tex"><Latex :tex="row.tex" /></span>
          <span class="tr-case-note">{{ row.note }}</span>
        </div>
      </div>

      <button class="tr-play" type="button" :disabled="playing" @click="play">
        <mdi-rotate-right /> 转动 <Latex tex="F_2" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.tr-wrap {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: 1.6rem;
  align-items: center;
}

.tr-figure {
  position: relative;
  min-width: 0;
}

.tr-figure svg {
  display: block;
  width: 100%;
  height: auto;
}

.tr-info {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  min-width: 0;
}

.tr-info :deep(.katex) {
  font-size: 1em !important;
}

.tr-row {
  display: grid;
  grid-template-columns: 2.2rem minmax(0, 1fr) 6rem;
  gap: 0.6rem;
  align-items: center;

  font-size: 1rem;
}

.tr-name {
  font-weight: 700;
  text-align: center;
}

.tr-val {
  color: var(--c-text-dim);
  font-size: 0.95rem;
  text-align: right;
  white-space: nowrap;
}

.tr-row input[type="range"] {
  min-width: 0;
  height: 4px;
  border-radius: 2rem;

  background: rgb(148 163 184 / 20%);
  outline: none;

  cursor: pointer;

  appearance: none;
}

.tr-row input[type="range"]::-webkit-slider-thumb {
  width: 14px;
  height: 14px;
  border: 2px solid var(--c-bg-soft);
  border-radius: 50%;

  background: var(--c-text-dim);

  appearance: none;
}

.tr-current {
  padding-left: 0.9rem;
  border-left: 3px solid var(--c-physics);
  font-size: 1.15rem;
}

.tr-cases {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.tr-case {
  display: grid;
  grid-template-columns: 3.2rem 9.4rem minmax(0, 1fr);
  gap: 0.5rem;
  align-items: baseline;

  color: var(--c-text-dim);

  font-size: 0.88rem;

  opacity: 0.55;

  transition: opacity 0.2s ease;
}

.tr-case.tr-active {
  color: var(--c-text);
  opacity: 1;
}

.tr-case-label {
  white-space: nowrap;
}

.tr-case-tex {
  white-space: nowrap;
}

.tr-case-note {
  color: var(--c-accent);
  font-weight: 700;
  white-space: nowrap;
}

.tr-play {
  display: inline-flex;
  gap: 0.45rem;
  align-items: center;
  align-self: flex-start;

  padding: 0.35rem 0.9rem;
  border: 1px solid var(--c-border);
  border-radius: 2rem;

  background: rgb(148 163 184 / 10%);
  color: var(--c-text);

  font-size: 0.9rem;

  cursor: pointer;

  transition: background 0.2s ease;
}

.tr-play:disabled {
  opacity: 0.5;
  cursor: default;
}

.tr-play:hover:not(:disabled) {
  background: rgb(148 163 184 / 20%);
}

.tr-play :deep(.katex) {
  font-size: 1em !important;
}
</style>
