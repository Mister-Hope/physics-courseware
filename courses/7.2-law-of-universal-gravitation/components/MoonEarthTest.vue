<!-- 月—地检验（第 6 页）：用真实的 r、T 由 a = 4π^2 r / T^2 算出月球的向心加速度，再与"地面 g 按平方反比减弱到 60R 处"相比 -->
<script setup lang="ts">
import { computed, ref } from "vue";

/** 地球半径（m） */
const EARTH_R = 6.4e6;
/** 地面自由落体加速度（m/s^2） */
const G_SURFACE = 9.8;
/** 一天的秒数 */
const DAY = 86_400;

/** 月球到地心的距离，以地球半径 R 为单位（真实值约 60） */
const distanceRatio = ref(60);
/** 月球公转周期（d，真实值 27.3） */
const periodDays = ref(27.3);

/** 由观测数据算出的向心加速度 a = 4π^2 r / T^2 */
const measured = computed(() => {
  const r = distanceRatio.value * EARTH_R;
  const t = periodDays.value * DAY;

  return (4 * Math.PI ** 2 * r) / t ** 2;
});

/** 由"地面 g 按平方反比减弱"预期的向心加速度 a = g R^2 / r^2 */
const predicted = computed(() => G_SURFACE / distanceRatio.value ** 2);

const ratio = computed(() => measured.value / predicted.value);
const matched = computed(() => Math.abs(ratio.value - 1) < 0.05);

/**
 * 把数值写成一个尾数乘以 10 的整数次幂的 LaTeX 形式
 *
 * @param value 待格式化的数值
 * @returns 可直接交给 KaTeX 的公式片段
 */
const sci = (value: number): string => {
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / 10 ** exponent;

  return `${mantissa.toFixed(2)} \\times 10^{${exponent}}`;
};

const measuredTex = computed(
  () => `a_{\\text{月}} = \\frac{4\\pi^2 r}{T^2} = ${sci(measured.value)}\\ \\text{m/s}^2`,
);
const predictedTex = computed(
  () => `a_{\\text{月}} = \\frac{gR^2}{r^2} = ${sci(predicted.value)}\\ \\text{m/s}^2`,
);
const ratioTex = computed(
  () => `\\frac{a_{\\text{测}}}{a_{\\text{预}}} = ${ratio.value.toFixed(2)}`,
);

/** 图上把月球摆到与 r 成比例的位置，拖动滑块时看得见距离在变 */
const moonX = computed(() => 112 + (distanceRatio.value / 90) * 300);

const sliders = computed(() => [
  {
    key: "r",
    labelTex: "r",
    value: distanceRatio.value,
    min: 30,
    max: 90,
    step: 1,
    unitTex: "R",
    color: "var(--c-accent)",
  },
  {
    key: "T",
    labelTex: "T",
    value: periodDays.value,
    min: 20,
    max: 40,
    step: 0.1,
    unitTex: "\\text{d}",
    color: "var(--c-accent-2)",
  },
]);

const valueTex = (s: { value: number; unitTex: string }): string => `${s.value}\\ ${s.unitTex}`;

const setSlider = (key: string, raw: string): void => {
  const value = Number(raw);

  if (key === "r") distanceRatio.value = value;
  else periodDays.value = value;
};
</script>

<template>
  <div class="met-wrap">
    <div class="met-fig">
      <svg viewBox="0 0 460 170" xmlns="http://www.w3.org/2000/svg" role="img">
        <!-- 地心到月心的距离 -->
        <line
          x1="88"
          y1="100"
          :x2="moonX - 9"
          y2="100"
          stroke="rgba(148,163,184,0.6)"
          stroke-width="1.6"
          stroke-dasharray="7 6"
        />
        <text
          :x="(88 + moonX - 9) / 2"
          y="86"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="#e2e8f0"
          stroke="#0f1425"
          stroke-width="4"
          paint-order="stroke"
        >
          r
        </text>

        <CelestialEarth :x="60" :y="100" :r="28" label="地球" :label-size="15" />
        <CelestialMoon :x="moonX" :y="100" :r="9" label="月球" :label-size="15" />
      </svg>
    </div>

    <div class="met-panel">
      <div class="met-sliders">
        <div v-for="s in sliders" :key="s.key" class="met-slider">
          <div class="met-slider-head">
            <span class="met-slider-name" :style="{ color: s.color }"
              ><Latex :tex="s.labelTex"
            /></span>
            <span class="met-slider-val" :style="{ color: s.color }"
              ><Latex :tex="valueTex(s)"
            /></span>
          </div>
          <input
            type="range"
            :min="s.min"
            :max="s.max"
            :step="s.step"
            :value="s.value"
            class="met-range"
            :style="{ accentColor: s.color }"
            @input="setSlider(s.key, ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>

      <div class="met-rows">
        <div class="met-row">
          <span class="met-tag met-tag-measured">由观测数据算</span>
          <Latex :tex="measuredTex" class="met-tex" />
        </div>
        <div class="met-row">
          <span class="met-tag met-tag-predicted">由平方反比算</span>
          <Latex :tex="predictedTex" class="met-tex" />
        </div>
      </div>

      <div class="met-ratio" :class="matched ? 'ok-line' : 'bad-line'">
        <Latex :tex="ratioTex" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.met-wrap {
  display: flex;
  gap: 1.1rem;
  align-items: center;
  width: 100%;
}

.met-fig {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  min-width: 0;
}

.met-fig svg {
  display: block;
  width: 100%;
  height: auto;
  max-height: 190px;
}

.met-panel {
  display: flex;
  flex: 0 0 440px;
  flex-direction: column;
  gap: 0.35rem;

  min-width: 0;
}

.met-sliders {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

.met-slider {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.met-slider-head {
  display: flex;
  gap: 0.4rem;
  align-items: baseline;
  justify-content: space-between;
}

.met-slider-name {
  font-size: 1.05rem;
}

.met-slider-val {
  font-weight: 800;
  font-size: 1rem;
  white-space: nowrap;
}

.met-range {
  width: 100%;
  height: 0.95rem;
  cursor: pointer;
}

.met-rows {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.met-row {
  display: flex;
  gap: 0.35rem;
  align-items: center;

  padding: 0.2rem 0.6rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);
}

.met-tag {
  flex: 0 0 auto;

  padding: 0.14rem 0.45rem;
  border-radius: var(--radius-sm);

  font-weight: 800;
  font-size: 0.8rem;
}

.met-tag-measured {
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.met-tag-predicted {
  background: var(--c-accent-2-soft);
  color: var(--c-accent-2);
}

.met-tex {
  font-size: 0.98rem;
  white-space: nowrap;
}

.met-ratio {
  font-size: 1.05rem;
  text-align: center;
}
</style>
