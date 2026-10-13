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
    color: "#e2a846",
  },
  {
    key: "I",
    labelTex: "I",
    value: I.value,
    min: 0.5,
    max: 12,
    step: 0.5,
    unitTex: "\\text{A}",
    color: "#60a5fa",
  },
  {
    key: "R",
    labelTex: "R",
    value: R.value,
    min: 1,
    max: 20,
    step: 1,
    unitTex: "\\Omega",
    color: "#f87171",
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
        <!-- 电源 -->
        <rect
          x="28"
          y="110"
          width="36"
          height="60"
          rx="8"
          fill="rgba(226,168,70,0.12)"
          stroke="#e2a846"
          stroke-width="2.4"
        />
        <text x="46" y="130" text-anchor="middle" font-size="16" font-weight="700" fill="#f87171">
          +
        </text>
        <text x="46" y="156" text-anchor="middle" font-size="16" font-weight="700" fill="#60a5fa">
          −
        </text>
        <text x="46" y="198" text-anchor="middle" font-size="13" fill="#94a3b8">电源</text>
        <path d="M 64 140 H 158" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
        <!-- 输入电能箭头 -->
        <line
          x1="88"
          y1="122"
          x2="138"
          y2="122"
          stroke="#e2a846"
          stroke-width="2.4"
          stroke-linecap="round"
        />
        <polygon points="146,122 134,117 134,127" fill="#e2a846" />
        <text x="112" y="114" text-anchor="middle" font-size="13" fill="#e2a846">输入（电能）</text>
        <!-- 电动机 -->
        <circle
          cx="200"
          cy="140"
          r="42"
          fill="rgba(96,165,250,0.08)"
          stroke="#64748b"
          stroke-width="3"
        />
        <text
          x="200"
          y="153"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="38"
          fill="#e2a846"
        >
          M
        </text>
        <text x="200" y="205" text-anchor="middle" font-size="13" fill="#94a3b8">电动机</text>
        <!-- 转轴与扇叶 -->
        <line
          x1="242"
          y1="140"
          x2="274"
          y2="112"
          stroke="#94a3b8"
          stroke-width="3.4"
          stroke-linecap="round"
        />
        <g transform="translate(284 106)">
          <ellipse
            cx="0"
            cy="-13"
            rx="4.5"
            ry="13"
            fill="none"
            stroke="#60a5fa"
            stroke-width="2.6"
          />
          <ellipse
            cx="12"
            cy="4"
            rx="4.5"
            ry="13"
            fill="none"
            stroke="#60a5fa"
            stroke-width="2.6"
            transform="rotate(120 12 4)"
          />
          <ellipse
            cx="-12"
            cy="4"
            rx="4.5"
            ry="13"
            fill="none"
            stroke="#60a5fa"
            stroke-width="2.6"
            transform="rotate(-120 -12 4)"
          />
          <circle r="5" fill="#60a5fa" />
        </g>
        <text x="312" y="140" font-size="13" fill="#60a5fa">输出（机械能）</text>
        <!-- 线圈发热 -->
        <path
          d="M 186 78 q 6 -12 12 0"
          fill="none"
          stroke="#f87171"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <path
          d="M 204 68 q 6 -12 12 0"
          fill="none"
          stroke="#f87171"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <path
          d="M 222 78 q 6 -12 12 0"
          fill="none"
          stroke="#f87171"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <text x="222" y="60" text-anchor="middle" font-size="13" fill="#f87171">发热（内能）</text>
      </svg>
    </div>

    <!-- 控制与读数 -->
    <div class="mp-panel">
      <div class="mp-mode">
        电能 → <span style="color: #60a5fa">机械能</span> + <span style="color: #f87171">内能</span>
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
          <span class="mp-card-tag" style="background: rgb(226 168 70 / 16%); color: #e2a846"
            >输入功率</span
          >
          <Latex :tex="pInTex" class="mp-tex" />
        </div>
        <div class="mp-card">
          <span class="mp-card-tag" style="background: rgb(248 113 113 / 16%); color: #f87171"
            >热损耗功率</span
          >
          <Latex :tex="pHeatTex" class="mp-tex" />
        </div>
        <div class="mp-card mp-card-out">
          <span class="mp-card-tag" style="background: rgb(96 165 250 / 16%); color: #60a5fa"
            >输出功率</span
          >
          <Latex :tex="pOutTex" class="mp-tex" />
        </div>
      </div>

      <!-- 能量分配条 -->
      <div class="mp-bar-wrap">
        <div class="mp-bar">
          <div class="mp-bar-heat" :style="{ width: heatRatio * 100 + '%' }"></div>
          <div class="mp-bar-out" :style="{ width: outRatio * 100 + '%' }"></div>
        </div>
        <div class="mp-bar-legend">
          <span><i style="background: #f87171"></i>内能 {{ (heatRatio * 100).toFixed(0) }}%</span>
          <span><i style="background: #60a5fa"></i>机械能 {{ (outRatio * 100).toFixed(0) }}%</span>
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
  border: 1px solid rgb(100 116 139 / 25%);
  border-radius: 1rem;

  background: rgb(15 23 42 / 55%);
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
  gap: 0.45rem;

  min-width: 0;
}

.mp-mode {
  color: #cbd5e1;
  font-weight: 700;
  font-size: 1rem;
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
  font-size: 0.98rem;
  font-family: "KaTeX_Math", serif;
}

.mp-slider-val {
  font-weight: 800;
  font-size: 0.95rem;
  white-space: nowrap;
}

.mp-range {
  width: 100%;
  height: 1.15rem;
  cursor: pointer;
}

.mp-cards {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.mp-card {
  display: flex;
  gap: 0.55rem;
  align-items: center;

  padding: 0.26rem 0.6rem;
  border: 1px solid rgb(100 116 139 / 22%);
  border-radius: 0.8rem;

  background: rgb(15 23 42 / 65%);
}

.mp-card-out {
  border-color: rgb(96 165 250 / 45%);
}

.mp-card-tag {
  flex: 0 0 auto;

  padding: 0.16rem 0.45rem;
  border-radius: 0.5rem;

  font-weight: 800;
  font-size: 0.78rem;
}

.mp-tex {
  font-size: 0.95rem;
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

  height: 0.9rem;
  border: 1px solid rgb(100 116 139 / 35%);
  border-radius: 0.6rem;

  background: rgb(15 23 42 / 60%);
}

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
  color: #cbd5e1;
  font-size: 0.8rem;
}

.mp-bar-legend i {
  display: inline-block;

  width: 0.7rem;
  height: 0.7rem;
  margin-right: 0.3rem;
  border-radius: 0.2rem;
}

.mp-stall {
  display: flex;
  gap: 0.4rem;
  align-items: center;

  padding: 0.3rem 0.6rem;
  border: 1px solid rgb(248 113 113 / 35%);
  border-radius: 0.6rem;

  background: rgb(248 113 113 / 10%);
  color: #fca5a5;

  font-weight: 700;
  font-size: 0.92rem;
}

.mp-stall-icon {
  color: #f87171;
  font-size: 1.05rem;
}
</style>
