<!-- 估算身边物体间的万有引力（第 9 页）：两个篮球之间的万有引力 F = G m^2 / r^2 与它自身重力 mg 相差十几个数量级 -->
<script setup lang="ts">
import { computed, ref } from "vue";

/** 引力常量（N m^2 / kg^2） */
const G = 6.674e-11;
/** 地面重力加速度（m/s^2） */
const G_SURFACE = 9.8;

/** 篮球质量（kg，教材取 0.6） */
const mass = ref(0.6);
/** 两球球心距离（m，教材取 0.5） */
const distance = ref(0.5);

/** 两球之间的万有引力 F = G m^2 / r^2 */
const gravity = computed(() => (G * mass.value ** 2) / distance.value ** 2);
/** 一个篮球的重力 mg */
const weight = computed(() => mass.value * G_SURFACE);
const ratio = computed(() => gravity.value / weight.value);

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

const gravityTex = computed(() => `F = G\\frac{m^2}{r^2} = ${sci(gravity.value)}\\ \\text{N}`);
const weightTex = computed(
  () =>
    `mg = ${mass.value.toFixed(1)}\\ \\text{kg} \\times 9.8\\ \\text{m/s}^2 = ${weight.value.toFixed(1)}\\ \\text{N}`,
);
const ratioTex = computed(() => `\\frac{F}{mg} = ${sci(ratio.value)}`);

/** 图上球的大小随质量变、间距随距离变（半径按 m 的立方根缩放，体积才与质量成正比） */
const ballRadius = computed(() => 26 * (mass.value / 0.6) ** (1 / 3));
const leftX = 80;
const rightX = computed(() => leftX + 70 + (distance.value / 2) * 130);
const centerY = 88;

const sliders = computed(() => [
  {
    key: "m",
    labelTex: "m",
    value: mass.value,
    min: 0.1,
    max: 5,
    step: 0.1,
    unitTex: String.raw`\text{kg}`,
    color: "var(--c-accent)",
  },
  {
    key: "r",
    labelTex: "r",
    value: distance.value,
    min: 0.1,
    max: 2,
    step: 0.1,
    unitTex: String.raw`\text{m}`,
    color: "var(--c-accent-2)",
  },
]);

const valueTex = (s: { value: number; unitTex: string }): string => `${s.value}\\ ${s.unitTex}`;

const setSlider = (key: string, raw: string): void => {
  const value = Number(raw);

  if (key === "m") mass.value = value;
  else distance.value = value;
};
</script>

<template>
  <div class="dgc-wrap">
    <div class="dgc-fig">
      <svg viewBox="0 0 340 180" xmlns="http://www.w3.org/2000/svg" role="img">
        <!-- 球心间距 -->
        <line
          :x1="leftX"
          :y1="centerY - 62"
          :x2="rightX"
          :y2="centerY - 62"
          stroke="rgba(148,163,184,0.55)"
          stroke-width="1.5"
          stroke-dasharray="6 5"
        />
        <line
          :x1="leftX"
          :y1="centerY - 68"
          :x2="leftX"
          :y2="centerY - 46"
          stroke="rgba(148,163,184,0.55)"
          stroke-width="1.5"
        />
        <line
          :x1="rightX"
          :y1="centerY - 68"
          :x2="rightX"
          :y2="centerY - 46"
          stroke="rgba(148,163,184,0.55)"
          stroke-width="1.5"
        />
        <text
          :x="(leftX + rightX) / 2"
          :y="centerY - 74"
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

        <!-- 左球 -->
        <g>
          <circle
            :cx="leftX"
            :cy="centerY"
            :r="ballRadius"
            fill="rgba(226,168,70,0.16)"
            stroke="#e2a846"
            stroke-width="2.4"
          />
          <line
            :x1="leftX"
            :y1="centerY - ballRadius"
            :x2="leftX"
            :y2="centerY + ballRadius"
            stroke="rgba(226,168,70,0.6)"
            stroke-width="1.6"
          />
          <path
            :d="`M ${leftX - ballRadius} ${centerY} Q ${leftX} ${centerY - ballRadius * 0.4} ${leftX + ballRadius} ${centerY}`"
            fill="none"
            stroke="rgba(226,168,70,0.6)"
            stroke-width="1.6"
          />
          <path
            :d="`M ${leftX - ballRadius} ${centerY} Q ${leftX} ${centerY + ballRadius * 0.4} ${leftX + ballRadius} ${centerY}`"
            fill="none"
            stroke="rgba(226,168,70,0.6)"
            stroke-width="1.6"
          />
        </g>

        <!-- 右球 -->
        <g>
          <circle
            :cx="rightX"
            :cy="centerY"
            :r="ballRadius"
            fill="rgba(226,168,70,0.16)"
            stroke="#e2a846"
            stroke-width="2.4"
          />
          <line
            :x1="rightX"
            :y1="centerY - ballRadius"
            :x2="rightX"
            :y2="centerY + ballRadius"
            stroke="rgba(226,168,70,0.6)"
            stroke-width="1.6"
          />
          <path
            :d="`M ${rightX - ballRadius} ${centerY} Q ${rightX} ${centerY - ballRadius * 0.4} ${rightX + ballRadius} ${centerY}`"
            fill="none"
            stroke="rgba(226,168,70,0.6)"
            stroke-width="1.6"
          />
          <path
            :d="`M ${rightX - ballRadius} ${centerY} Q ${rightX} ${centerY + ballRadius * 0.4} ${rightX + ballRadius} ${centerY}`"
            fill="none"
            stroke="rgba(226,168,70,0.6)"
            stroke-width="1.6"
          />
        </g>
      </svg>
    </div>

    <div class="dgc-panel">
      <div class="dgc-sliders">
        <div v-for="s in sliders" :key="s.key" class="dgc-slider">
          <div class="dgc-slider-head">
            <span class="dgc-slider-name" :style="{ color: s.color }"
              ><Latex :tex="s.labelTex"
            /></span>
            <span class="dgc-slider-val" :style="{ color: s.color }"
              ><Latex :tex="valueTex(s)"
            /></span>
          </div>
          <input
            type="range"
            :min="s.min"
            :max="s.max"
            :step="s.step"
            :value="s.value"
            class="dgc-range"
            :style="{ accentColor: s.color }"
            @input="setSlider(s.key, ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>

      <div class="dgc-rows">
        <div class="dgc-row">
          <span class="dgc-tag dgc-tag-gravity">两球间的万有引力</span>
          <Latex :tex="gravityTex" class="dgc-tex" />
        </div>
        <div class="dgc-row">
          <span class="dgc-tag dgc-tag-weight">一个篮球的重力</span>
          <Latex :tex="weightTex" class="dgc-tex" />
        </div>
      </div>

      <div class="dgc-ratio">
        <Latex :tex="ratioTex" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dgc-wrap {
  display: flex;
  gap: 1.1rem;
  align-items: center;
  width: 100%;
}

.dgc-fig {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  min-width: 0;
}

.dgc-fig svg {
  display: block;
  width: 100%;
  height: auto;
  max-height: 200px;
}

.dgc-panel {
  display: flex;
  flex: 0 0 440px;
  flex-direction: column;
  gap: 0.35rem;

  min-width: 0;
}

.dgc-sliders {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

.dgc-slider {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.dgc-slider-head {
  display: flex;
  gap: 0.4rem;
  align-items: baseline;
  justify-content: space-between;
}

.dgc-slider-name {
  font-size: 1.05rem;
}

.dgc-slider-val {
  font-weight: 800;
  font-size: 1rem;
  white-space: nowrap;
}

.dgc-range {
  width: 100%;
  height: 0.95rem;
  cursor: pointer;
}

.dgc-rows {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.dgc-row {
  display: flex;
  gap: 0.35rem;
  align-items: center;

  padding: 0.2rem 0.6rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);
}

.dgc-tag {
  flex: 0 0 auto;

  padding: 0.14rem 0.45rem;
  border-radius: var(--radius-sm);

  font-weight: 800;
  font-size: 0.8rem;
}

.dgc-tag-gravity {
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.dgc-tag-weight {
  background: var(--c-accent-2-soft);
  color: var(--c-accent-2);
}

.dgc-tex {
  font-size: 0.95rem;
  white-space: nowrap;
}

.dgc-ratio {
  font-size: 1.05rem;
  text-align: center;
}
</style>
