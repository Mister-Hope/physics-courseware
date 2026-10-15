<script setup lang="ts">
import { ref, computed } from "vue";

/** 电动机的能量转化：输入功率 P入 = UI，热损耗 P热 = I²R，输出 P出 = P入 − P热 拖动 U / I / R 实时计算；I·R ≥ U 时提示堵转（电能全部转化为内能）。 */
const U = ref(220);
const I = ref(5);
const R = ref(6);

const PIn = computed(() => U.value * I.value);
const PHeat = computed(() => I.value ** 2 * R.value);
const stalled = computed(() => I.value * R.value >= U.value);
const POut = computed(() => (stalled.value ? 0 : PIn.value - PHeat.value));

const pInTex = computed(() => `P_{\\text{入}} = U I = ${PIn.value.toFixed(0)} \\ \\text{W}`);
const pHeatTex = computed(() => `P_{\\text{热}} = I^2 R = ${PHeat.value.toFixed(0)} \\ \\text{W}`);
const pOutTex = computed(() =>
  stalled.value
    ? `P_{\\text{出}} = P_{\\text{入}} - P_{\\text{热}} = 0 \\ \\text{W}`
    : `P_{\\text{出}} = P_{\\text{入}} - P_{\\text{热}} = ${POut.value.toFixed(0)} \\ \\text{W}`,
);

/* 能量分配条：热 / 出 占输入的比例 */
const heatRatio = computed(() => Math.min(1, PHeat.value / PIn.value));
const outRatio = computed(() => Math.max(0, 1 - heatRatio.value));

const sliders = computed(() => [
  {
    key: "U",
    labelTex: "U",
    value: U.value,
    min: 50,
    max: 300,
    step: 10,
    unitTex: "\\text{V}",
    color: "var(--c-accent)",
  },
  {
    key: "I",
    labelTex: "I",
    value: I.value,
    min: 0.5,
    max: 12,
    step: 0.5,
    unitTex: "\\text{A}",
    color: "var(--c-accent-2)",
  },
  {
    key: "R",
    labelTex: "R",
    value: R.value,
    min: 1,
    max: 20,
    step: 1,
    unitTex: "\\Omega",
    color: "var(--c-danger)",
  },
]);
const valTex = (s: { value: number; unitTex: string }): string => `${s.value}\\ ${s.unitTex}`;
const setSlider = (key: string, v: string): void => {
  const n = Number(v);
  if (key === "U") U.value = n;
  else if (key === "I") I.value = n;
  else R.value = n;
};
</script>

<template>
  <div class="mp-wrap">
    <!-- 电动机示意 -->
    <div class="mp-fig">
      <svg viewBox="0 0 520 280" class="mp-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- 电源：共享电源符号（长板＝正极在上）；两根导线分别接电动机上、下两端 -->
        <CircuitBattery :x="46" :y="140" orientation="vertical" polarity />
        <path
          d="M 46 132 V 105 H 120"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.6"
          stroke-linecap="round"
        />
        <path
          d="M 46 148 V 175 H 120"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.6"
          stroke-linecap="round"
        />
        <text x="46" y="196" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">
          电源
        </text>
        <!-- 输入电能（画在接正极的那根导线上，箭头指向电动机） -->
        <line
          x1="62"
          y1="105"
          x2="98"
          y2="105"
          stroke="var(--c-accent)"
          stroke-width="2.4"
          stroke-linecap="round"
        />
        <polygon points="110,105 98,100 98,110" fill="var(--c-accent)" />
        <text x="86" y="96" text-anchor="middle" font-size="13" fill="var(--c-accent)">
          输入（电能）
        </text>
        <!-- 电动机：立体小圆柱 -->
        <ellipse
          cx="250"
          cy="140"
          rx="17"
          ry="35"
          fill="color-mix(in srgb, var(--c-velocity) 7%, transparent)"
          stroke="var(--c-neutral-500)"
          stroke-width="3"
        />
        <rect
          x="120"
          y="105"
          width="130"
          height="70"
          fill="color-mix(in srgb, var(--c-velocity) 10%, transparent)"
        />
        <path
          d="M 120 105 H 250"
          stroke="var(--c-neutral-500)"
          stroke-width="3"
          stroke-linecap="round"
        />
        <path
          d="M 120 175 H 250"
          stroke="var(--c-neutral-500)"
          stroke-width="3"
          stroke-linecap="round"
        />
        <line
          x1="152"
          y1="107"
          x2="152"
          y2="173"
          stroke="var(--c-neutral-500)"
          stroke-width="1.2"
          opacity="0.45"
        />
        <line
          x1="172"
          y1="107"
          x2="172"
          y2="173"
          stroke="var(--c-neutral-500)"
          stroke-width="1.2"
          opacity="0.45"
        />
        <line
          x1="192"
          y1="107"
          x2="192"
          y2="173"
          stroke="var(--c-neutral-500)"
          stroke-width="1.2"
          opacity="0.45"
        />
        <line
          x1="212"
          y1="107"
          x2="212"
          y2="173"
          stroke="var(--c-neutral-500)"
          stroke-width="1.2"
          opacity="0.45"
        />
        <line
          x1="232"
          y1="107"
          x2="232"
          y2="173"
          stroke="var(--c-neutral-500)"
          stroke-width="1.2"
          opacity="0.45"
        />
        <ellipse
          cx="120"
          cy="140"
          rx="17"
          ry="35"
          fill="color-mix(in srgb, var(--c-velocity) 22%, transparent)"
          stroke="var(--c-neutral-500)"
          stroke-width="3"
        />
        <text
          x="185"
          y="153"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="34"
          fill="var(--c-accent)"
        >
          M
        </text>
        <text x="185" y="204" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">
          电动机
        </text>
        <!-- 背面转轴 -->
        <line
          x1="267"
          y1="140"
          x2="298"
          y2="140"
          stroke="var(--c-text-dim)"
          stroke-width="5"
          stroke-linecap="round"
        />
        <!-- 扇叶 -->
        <g transform="translate(316 140)">
          <ellipse
            cx="0"
            cy="-20"
            rx="7"
            ry="20"
            fill="color-mix(in srgb, var(--c-velocity) 18%, transparent)"
            stroke="var(--c-velocity)"
            stroke-width="2.4"
          />
          <ellipse
            cx="17"
            cy="10"
            rx="7"
            ry="20"
            fill="color-mix(in srgb, var(--c-velocity) 18%, transparent)"
            stroke="var(--c-velocity)"
            stroke-width="2.4"
            transform="rotate(120 17 10)"
          />
          <ellipse
            cx="-17"
            cy="10"
            rx="7"
            ry="20"
            fill="color-mix(in srgb, var(--c-velocity) 18%, transparent)"
            stroke="var(--c-velocity)"
            stroke-width="2.4"
            transform="rotate(-120 -17 10)"
          />
          <circle r="8" fill="var(--c-velocity)" />
        </g>
        <text x="322" y="204" text-anchor="middle" font-size="13" fill="var(--c-velocity)">
          输出（机械能）
        </text>
        <!-- 线圈发热 -->
        <path
          d="M 152 88 q 6 -12 12 0"
          fill="none"
          stroke="var(--c-force)"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <path
          d="M 174 78 q 6 -12 12 0"
          fill="none"
          stroke="var(--c-force)"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <path
          d="M 196 88 q 6 -12 12 0"
          fill="none"
          stroke="var(--c-force)"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <text x="190" y="66" text-anchor="middle" font-size="13" fill="var(--c-force)">
          发热（内能）
        </text>
      </svg>
    </div>

    <!-- 控制与读数 -->
    <div class="mp-panel">
      <div class="mp-mode">
        电能 → <span style="color: var(--c-accent-2)">机械能</span> +
        <span style="color: var(--c-danger)">内能</span>
      </div>

      <div class="mp-sliders">
        <div v-for="s in sliders" :key="s.key" class="mp-slider">
          <div class="mp-slider-head">
            <span class="mp-slider-name" :style="{ color: s.color }"
              ><Latex :tex="s.labelTex"
            /></span>
            <span class="mp-slider-val" :style="{ color: s.color }"
              ><Latex :tex="valTex(s)"
            /></span>
          </div>
          <input
            type="range"
            :min="s.min"
            :max="s.max"
            :step="s.step"
            :value="s.value"
            @input="setSlider(s.key, ($event.target as HTMLInputElement).value)"
            class="mp-range"
            :style="{ accentColor: s.color }"
          />
        </div>
      </div>

      <div class="mp-cards">
        <div class="mp-card">
          <span class="mp-tag mp-tag-in mini-note">输入功率</span>
          <Latex :tex="pInTex" class="mp-tex" />
        </div>
        <div class="mp-card">
          <span class="mp-tag mp-tag-heat mini-note">热损耗功率</span>
          <Latex :tex="pHeatTex" class="mp-tex" />
        </div>
        <div class="mp-card mp-card-out">
          <span class="mp-tag mp-tag-out mini-note">输出功率</span>
          <Latex :tex="pOutTex" class="mp-tex" />
        </div>
      </div>

      <!-- 能量分配条 -->
      <div class="mp-bar-wrap">
        <div class="mp-bar">
          <div class="mp-bar-heat" :style="{ width: heatRatio * 100 + '%' }"></div>
          <div class="mp-bar-out" :style="{ width: outRatio * 100 + '%' }"></div>
        </div>
        <div class="mp-bar-legend mini-note">
          <span
            ><i style="background: var(--c-danger)"></i>内能
            {{ (heatRatio * 100).toFixed(0) }}%</span
          >
          <span
            ><i style="background: var(--c-accent-2)"></i>机械能
            {{ (outRatio * 100).toFixed(0) }}%</span
          >
        </div>
      </div>

      <div v-if="stalled" class="mp-stall">
        <mdi-alert-circle class="mp-stall-icon" />
        当 <Latex tex="I = \dfrac{U}{R}" /> 时即为堵转：电能全部转化为内能，线圈迅速升温
      </div>
    </div>
  </div>
</template>

<style scoped>
.mp-wrap {
  display: flex;
  gap: 1.1rem;
  align-items: stretch;
  width: 100%;
}

.mp-fig {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  min-width: 0;
  padding: 0.3rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: var(--c-surface);
}

.mp-svg {
  width: 100%;
  height: 100%;
  max-height: 232px;
}

.mp-panel {
  display: flex;
  flex: 0 0 432px;
  flex-direction: column;
  gap: 0.4rem;

  min-width: 0;
}

.mp-mode {
  color: var(--c-text);
  font-weight: 700;
}

.mp-sliders {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.6rem;
}

.mp-slider {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.mp-slider-head {
  display: flex;
  gap: 0.3rem;
  align-items: baseline;
  justify-content: space-between;
}

.mp-slider-name {
  font-weight: 700;
  font-style: italic;
  font-family: "KaTeX_Math", serif;
}

.mp-slider-val {
  font-weight: 800;
  white-space: nowrap;
}

.mp-range {
  width: 100%;
  height: 1rem;
  cursor: pointer;
}

.mp-cards {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mp-card {
  display: flex;
  gap: 0.55rem;
  align-items: center;

  padding: 0.1rem 0.6rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);
}

.mp-card-out {
  border-color: var(--c-accent-2);
}

.mp-tag {
  flex: 0 0 auto;
  padding: 0.16rem 0.45rem;
  border-radius: var(--radius-sm);
  font-weight: 800;
}

.mp-tag-in {
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.mp-tag-heat {
  background: var(--c-danger-soft);
  color: var(--c-danger);
}

.mp-tag-out {
  background: var(--c-accent-2-soft);
  color: var(--c-accent-2);
}

.mp-tex {
  white-space: nowrap;
}

.mp-bar-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mp-bar {
  display: flex;

  overflow: hidden;

  height: 0.8rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);

  background: var(--c-surface);
}

/* 能量分配条：热 / 机械各一段，红色系与蓝色系取自设计系统的正负语义色 */
.mp-bar-heat {
  background: linear-gradient(90deg, rgb(248 113 113 / 75%), rgb(248 113 113 / 40%));
  transition: width 0.2s ease;
}

.mp-bar-out {
  background: linear-gradient(90deg, rgb(96 165 250 / 40%), rgb(96 165 250 / 75%));
  transition: width 0.2s ease;
}

.mp-bar-legend {
  display: flex;
  gap: 1.2rem;
}

.mp-bar-legend i {
  display: inline-block;

  width: 0.7rem;
  height: 0.7rem;
  margin-right: 0.3rem;
  border-radius: 50%;
}

.mp-stall {
  display: flex;
  gap: 0.4rem;
  align-items: center;

  padding: 0.3rem 0.6rem;
  border: 1px solid var(--c-danger);
  border-radius: var(--radius-md);

  background: var(--c-danger-soft);
  color: var(--c-danger);

  font-weight: 700;
}

.mp-stall-icon {
  color: var(--c-danger);
}
</style>
