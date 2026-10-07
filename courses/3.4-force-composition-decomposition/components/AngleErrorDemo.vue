<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 7 页：两个力的夹角为什么不能太小、也不能太大。
 *
 * 两个分力都取 F₀ = 4.0 N（大小不变），只把夹角 θ 交给滑杆：
 *
 * - 夹角越大，合力 F = 2F₀cos(θ/2) 越小；
 * - "夹角带来的差别" F₁ + F₂ − F：夹角太小时只剩 0.03 N，比测力计 0.1 N 的分度还小 —— 图上的差别被读数误差淹没；
 * - "0.1 N 读数误差占合力的比例"：夹角太大时 F 很小，同样的误差占的比例被放大。
 *
 * 两条读数都按真实公式算，滑杆一动就重算（不拍脑袋）。
 */
/** 每个分力的大小（N）、测力计分度（N）、每牛顿多少用户单位 */
const F0 = 4;
const NOISE = 0.1;
const SCALE = 32;
/** 视图框紧贴图形本身（右侧只留 F 标注的余量），图形就能占满左栏 */
const VIEW = { width: 400, height: 276 };
const origin = { x: 72, y: 138 };
/** 两条"差别 / 分度"条形的共同量程（N） */
const BAR_MAX = 3;
/** 相对误差条形的量程（%） */
const ERR_MAX = 20;

const theta = ref(90);

const rad = computed(() => (theta.value * Math.PI) / 180);
/** 两个等大的力，合力沿角平分线 */
const resultant = computed(() => 2 * F0 * Math.cos(rad.value / 2));
/** 夹角带来的差别：平行四边形的结果与"直接相加"相差多少 */
const signal = computed(() => 2 * F0 - resultant.value);
const relativeError = computed(() => (NOISE / resultant.value) * 100);

const tipOf = (deg: number): { x: number; y: number } => ({
  x: origin.x + F0 * SCALE * Math.cos((deg * Math.PI) / 180),
  y: origin.y - F0 * SCALE * Math.sin((deg * Math.PI) / 180),
});

const tip1 = computed(() => tipOf(-theta.value / 2));
const tip2 = computed(() => tipOf(theta.value / 2));
const tipF = computed(() => ({ x: origin.x + resultant.value * SCALE, y: origin.y }));

/** 夹角 θ 的圆弧：从下面那条力转到上面那条力 */
const arc = computed(() => {
  const r = 46;
  const a = (theta.value / 2) * (Math.PI / 180);

  return {
    start: { x: origin.x + r * Math.cos(a), y: origin.y + r * Math.sin(a) },
    end: { x: origin.x + r * Math.cos(a), y: origin.y - r * Math.sin(a) },
  };
});

const width = (value: number, max: number): string => `${Math.min((value / max) * 100, 100)}%`;

const barSignal = computed(() => width(signal.value, BAR_MAX));
const barNoise = computed(() => width(NOISE, BAR_MAX));
const barError = computed(() => width(relativeError.value, ERR_MAX));

const fmt = (v: number): string => v.toFixed(2);
const fmt1 = (v: number): string => v.toFixed(1);

const thetaTex = computed(() => `\\theta = ${theta.value}^\\circ`);
const forceTex = computed(() => `F = ${fmt(resultant.value)}\\ \\text{N}`);
const signalTex = computed(() => `${fmt(signal.value)}\\ \\text{N}`);
const errorTex = computed(() => `${fmt1(relativeError.value)}\\%`);

/** 差别至少是分度的 10 倍，图上才分得出来；误差占到 5% 以上就算被放大 */
const signalEnough = computed(() => signal.value >= 10 * NOISE);
const errorSmall = computed(() => relativeError.value <= 5);
const times = computed(() => signal.value / NOISE);
</script>

<template>
  <div class="ae-wrap">
    <div class="ae-figure">
      <svg :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`">
        <polygon
          :points="`${origin.x},${origin.y} ${tip1.x},${tip1.y} ${tipF.x},${tipF.y} ${tip2.x},${tip2.y}`"
          fill="rgba(226,168,70,0.07)"
          stroke="var(--c-text-dim)"
          stroke-width="1.2"
          stroke-dasharray="6 5"
        />
        <path
          :d="`M ${arc.start.x},${arc.start.y} A 46,46 0 0 0 ${arc.end.x},${arc.end.y}`"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          opacity="0.8"
        />
        <CourseArrow
          :from="origin"
          :to="tip2"
          stroke="var(--c-accent-2)"
          stroke-width="3.2"
          pointer-events="none"
        />
        <CourseArrow
          :from="origin"
          :to="tip1"
          stroke="var(--c-accent)"
          stroke-width="3.2"
          pointer-events="none"
        />
        <CourseArrow
          :from="origin"
          :to="tipF"
          stroke="var(--c-physics)"
          stroke-width="3.6"
          pointer-events="none"
        />
        <circle :cx="origin.x" :cy="origin.y" r="3.6" fill="var(--c-text)" />
      </svg>
      <ChartLabel
        :x-percent="((origin.x + tip2.x) / 2 / VIEW.width) * 100"
        :y-percent="(tip2.y / VIEW.height) * 100"
        :parts="[{ tex: 'F_2' }]"
        anchor="bottom-right"
        :dy="-6"
        color="var(--c-accent-2)"
        halo
      />
      <ChartLabel
        :x-percent="((origin.x + tip1.x) / 2 / VIEW.width) * 100"
        :y-percent="(tip1.y / VIEW.height) * 100"
        :parts="[{ tex: 'F_1' }]"
        anchor="top-right"
        :dy="6"
        color="var(--c-accent)"
        halo
      />
      <ChartLabel
        :x-percent="(tipF.x / VIEW.width) * 100"
        :y-percent="(tipF.y / VIEW.height) * 100"
        :parts="[{ tex: 'F' }]"
        anchor="left"
        :dx="10"
        color="var(--c-physics)"
        halo
      />
      <ChartLabel
        :x-percent="((origin.x + 72) / VIEW.width) * 100"
        :y-percent="((origin.y - 14) / VIEW.height) * 100"
        :parts="[{ tex: '\\theta' }]"
        anchor="left"
        :dx="2"
        :size="16"
        color="var(--c-text)"
      />
    </div>

    <div class="ae-info">
      <div class="ae-row">
        <span class="ae-name"><Latex tex="\theta" /></span>
        <input
          v-model.number="theta"
          type="range"
          min="10"
          max="170"
          step="5"
          aria-label="两力夹角"
        />
        <span class="ae-val"><Latex :tex="thetaTex" /></span>
      </div>

      <div class="ae-force"><Latex :tex="forceTex" /></div>

      <div class="ae-metric">
        <div class="ae-head">
          <span class="ae-label">夹角带来的差别 <Latex tex="F_1+F_2-F" /></span>
          <span class="ae-value"><Latex :tex="signalTex" /></span>
        </div>
        <div class="ae-bar">
          <div
            class="ae-fill"
            :class="signalEnough ? 'ae-ok' : 'ae-bad'"
            :style="{ width: barSignal }"
          />
        </div>
        <div class="ae-bar ae-bar-noise">
          <div class="ae-fill ae-dim" :style="{ width: barNoise }" />
        </div>
        <div class="ae-note" :class="signalEnough ? 'ae-ok-text' : 'ae-bad-text'">
          测力计分度 <Latex tex="0.1\ \text{N}" />：{{
            signalEnough
              ? `差别的 ${times.toFixed(0)} 倍，看得出`
              : `只有 ${times.toFixed(1)} 倍，被淹没`
          }}
        </div>
      </div>

      <div class="ae-metric">
        <div class="ae-head">
          <span class="ae-label"><Latex tex="0.1\ \text{N}" /> 占合力的比例</span>
          <span class="ae-value"><Latex :tex="errorTex" /></span>
        </div>
        <div class="ae-bar">
          <div
            class="ae-fill"
            :class="errorSmall ? 'ae-ok' : 'ae-bad'"
            :style="{ width: barError }"
          />
        </div>
        <div class="ae-note" :class="errorSmall ? 'ae-ok-text' : 'ae-bad-text'">
          {{ errorSmall ? "同样的读数误差，占合力的比例还不大" : "合力太小，同样的误差被放大" }}
        </div>
      </div>

      <div class="ae-hint">把 <Latex tex="\theta" /> 拖到 20° 和 160° 各看一次</div>
    </div>
  </div>
</template>

<style scoped>
.ae-wrap {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: 1.6rem;
  align-items: center;
}

.ae-figure {
  position: relative;
  min-width: 0;
}

.ae-figure svg {
  display: block;
  width: 100%;
  height: auto;
}

.ae-info {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  min-width: 0;
}

.ae-info :deep(.katex) {
  font-size: 1em !important;
}

.ae-row {
  display: grid;
  grid-template-columns: 2.2rem minmax(0, 1fr) 6rem;
  gap: 0.6rem;
  align-items: center;

  font-size: 1rem;
}

.ae-name {
  font-weight: 700;
  text-align: center;
}

.ae-val {
  color: var(--c-text-dim);
  font-size: 0.95rem;
  text-align: right;
  white-space: nowrap;
}

.ae-row input[type="range"] {
  min-width: 0;
  height: 4px;
  border-radius: 2rem;

  background: rgb(148 163 184 / 20%);
  outline: none;

  cursor: pointer;

  appearance: none;
}

.ae-row input[type="range"]::-webkit-slider-thumb {
  width: 14px;
  height: 14px;
  border: 2px solid var(--c-bg-soft);
  border-radius: 50%;

  background: var(--c-text-dim);

  appearance: none;
}

.ae-force {
  padding-left: 0.9rem;
  border-left: 3px solid var(--c-physics);
  font-size: 1.05rem;
}

.ae-metric {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ae-head {
  display: flex;
  gap: 0.6rem;
  align-items: baseline;
  justify-content: space-between;

  font-size: 0.95rem;
}

.ae-label {
  min-width: 0;
}

.ae-value {
  color: var(--c-text);
  font-weight: 700;
  white-space: nowrap;
}

.ae-bar {
  overflow: hidden;

  width: 100%;
  height: 8px;
  border-radius: 2rem;

  background: rgb(148 163 184 / 16%);
}

/* 下面那一条是 0.1 N 的分度，两条共用量程，长短可以直接比 */
.ae-bar-noise {
  height: 5px;
}

.ae-fill {
  height: 100%;
  border-radius: 2rem;
  transition: width 0.15s ease;
}

.ae-ok {
  background: var(--c-accent-2);
}

.ae-bad {
  background: var(--c-danger);
}

.ae-dim {
  background: var(--c-text-dim);
}

.ae-note {
  font-size: 0.85rem;
  line-height: 1.5;
}

.ae-ok-text {
  color: var(--c-text-dim);
}

.ae-bad-text {
  color: var(--c-danger);
}

.ae-hint {
  color: var(--c-text-dim);
  font-size: 0.82rem;
}
</style>
