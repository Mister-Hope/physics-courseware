<script setup lang="ts">
import { ref, computed } from "vue";

/**
 * 串 / 并联电路中两个电阻的功率分配与总功率（真实公式实时计算） mode = "series" → 各电阻电流相同，功率与电阻成正比 mode = "parallel" →
 * 各电阻电压相同，功率与电阻成反比
 */
const { mode } = defineProps<{ mode: "series" | "parallel" }>();

const R1 = ref(4);
const R2 = ref(8);
const U = ref(6);

const isSeries = computed(() => mode === "series");

/* 串联：电流相同；并联：各支路电流 */
const I = computed(() => U.value / (R1.value + R2.value));
const I1 = computed(() => U.value / R1.value);
const I2 = computed(() => U.value / R2.value);

/* 两个电阻消耗的功率（真实公式） */
const P1 = computed(() => (isSeries.value ? I.value ** 2 * R1.value : U.value ** 2 / R1.value));
const P2 = computed(() => (isSeries.value ? I.value ** 2 * R2.value : U.value ** 2 / R2.value));
const Ptot = computed(() => P1.value + P2.value);

/* 面板上的公式（KaTeX 动态字符串） */
const currentTex = computed(() =>
  isSeries.value
    ? `I = \\dfrac{U}{R_1 + R_2} = ${I.value.toFixed(2)} \\ \\text{A}`
    : `I_1 = ${I1.value.toFixed(2)} \\ \\text{A}, \\quad I_2 = ${I2.value.toFixed(2)} \\ \\text{A}`,
);
const p1Tex = computed(() =>
  isSeries.value
    ? `P_1 = I^2 R_1 = ${P1.value.toFixed(2)} \\ \\text{W}`
    : `P_1 = \\dfrac{U^2}{R_1} = ${P1.value.toFixed(2)} \\ \\text{W}`,
);
const p2Tex = computed(() =>
  isSeries.value
    ? `P_2 = I^2 R_2 = ${P2.value.toFixed(2)} \\ \\text{W}`
    : `P_2 = \\dfrac{U^2}{R_2} = ${P2.value.toFixed(2)} \\ \\text{W}`,
);
const pTotTex = computed(() => `P = P_1 + P_2 = ${Ptot.value.toFixed(2)} \\ \\text{W}`);

/* 三个滑块的配置（符号与单位一律走 LaTeX；值用 computed 取，保证拖动时实时刷新） */
const sliders = computed(() => [
  {
    key: "R1",
    labelTex: "R_1",
    value: R1.value,
    min: 1,
    max: 10,
    step: 0.5,
    unitTex: "\\Omega",
    color: "#60a5fa",
  },
  {
    key: "R2",
    labelTex: "R_2",
    value: R2.value,
    min: 1,
    max: 10,
    step: 0.5,
    unitTex: "\\Omega",
    color: "#f87171",
  },
  {
    key: "U",
    labelTex: "U",
    value: U.value,
    min: 3,
    max: 12,
    step: 1,
    unitTex: "\\text{V}",
    color: "#e2a846",
  },
]);
const valTex = (s: { value: number; unitTex: string }): string => `${s.value}\\ ${s.unitTex}`;
const setSlider = (key: string, v: string): void => {
  const n = Number(v);
  if (key === "R1") R1.value = n;
  else if (key === "R2") R2.value = n;
  else U.value = n;
};
</script>

<template>
  <div class="cp-wrap">
    <!-- 电路图 -->
    <div class="cp-fig">
      <svg viewBox="0 0 480 270" class="cp-svg" xmlns="http://www.w3.org/2000/svg">
        <template v-if="isSeries">
          <!-- 串联回路 -->
          <path
            d="M 110 75 H 430"
            stroke="#94a3b8"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
          />
          <path
            d="M 110 195 H 430"
            stroke="#94a3b8"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
          />
          <path
            d="M 430 75 V 195"
            stroke="#94a3b8"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
          />
          <line
            x1="103"
            y1="185"
            x2="117"
            y2="185"
            stroke="#94a3b8"
            stroke-width="3.4"
            stroke-linecap="round"
          />
          <line
            x1="106"
            y1="140"
            x2="114"
            y2="140"
            stroke="#94a3b8"
            stroke-width="3.4"
            stroke-linecap="round"
          />
          <path
            d="M 110 75 V 140"
            stroke="#94a3b8"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
          />
          <text x="128" y="136" font-size="18" font-weight="700" fill="#f87171">+</text>
          <text x="128" y="194" font-size="18" font-weight="700" fill="#60a5fa">−</text>
          <!-- 两个电阻 -->
          <path
            d="M 180 75 L 188 63 L 196 87 L 204 63 L 212 87 L 220 63 L 228 87 L 236 63 L 244 75"
            stroke="#e2a846"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
          <path
            d="M 330 75 L 338 63 L 346 87 L 354 63 L 362 87 L 370 63 L 378 87 L 386 63 L 394 75"
            stroke="#e2a846"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
          <text
            x="212"
            y="50"
            text-anchor="middle"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
            fill="#60a5fa"
          >
            <tspan>R</tspan>
            <tspan dy="5" font-size="13">1</tspan>
          </text>
          <text
            x="362"
            y="50"
            text-anchor="middle"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
            fill="#f87171"
          >
            <tspan>R</tspan>
            <tspan dy="5" font-size="13">2</tspan>
          </text>
          <CourseArrow
            :from="{ x: 236, y: 195 }"
            :to="{ x: 338, y: 195 }"
            stroke="#e2a846"
            stroke-width="3"
            label="I"
            :label-dy="7"
            :label-dx="24"
          />
          <CourseArrow
            :from="{ x: 72, y: 188 }"
            :to="{ x: 72, y: 137 }"
            stroke="#60a5fa"
            stroke-width="2.6"
            label="U"
            :label-dx="-16"
            :label-dy="0"
          />
        </template>
        <template v-else>
          <!-- 并联：两条支路 + 右侧竖线 -->
          <path
            d="M 75 120 H 150"
            stroke="#94a3b8"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
          />
          <path
            d="M 75 180 H 150"
            stroke="#94a3b8"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
          />
          <path
            d="M 280 120 H 440 V 180 H 280"
            stroke="#94a3b8"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
          />
          <line
            x1="68"
            y1="172"
            x2="82"
            y2="172"
            stroke="#94a3b8"
            stroke-width="3.4"
            stroke-linecap="round"
          />
          <line
            x1="72"
            y1="128"
            x2="78"
            y2="128"
            stroke="#94a3b8"
            stroke-width="3.4"
            stroke-linecap="round"
          />
          <path
            d="M 75 120 V 128"
            stroke="#94a3b8"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
          />
          <path
            d="M 75 172 V 180"
            stroke="#94a3b8"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
          />
          <path
            d="M 150 120 L 162 108 L 174 132 L 186 108 L 198 132 L 210 108 L 222 132 L 234 108 L 246 120"
            stroke="#e2a846"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
          <path
            d="M 150 180 L 162 168 L 174 192 L 186 168 L 198 192 L 210 168 L 222 192 L 234 168 L 246 180"
            stroke="#e2a846"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
          <text
            x="198"
            y="96"
            text-anchor="middle"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
            fill="#60a5fa"
          >
            <tspan>R</tspan>
            <tspan dy="5" font-size="13">1</tspan>
          </text>
          <text
            x="198"
            y="210"
            text-anchor="middle"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
            fill="#f87171"
          >
            <tspan>R</tspan>
            <tspan dy="5" font-size="13">2</tspan>
          </text>
          <CourseArrow
            :from="{ x: 306, y: 120 }"
            :to="{ x: 400, y: 120 }"
            stroke="#e2a846"
            stroke-width="3"
            label="I_1"
            :label-dy="-12"
            :label-dx="14"
          />
          <CourseArrow
            :from="{ x: 306, y: 180 }"
            :to="{ x: 400, y: 180 }"
            stroke="#e2a846"
            stroke-width="3"
            label="I_2"
            :label-dy="22"
            :label-dx="14"
          />
          <CourseArrow
            :from="{ x: 40, y: 180 }"
            :to="{ x: 40, y: 125 }"
            stroke="#60a5fa"
            stroke-width="2.6"
            label="U"
            :label-dx="-18"
            :label-dy="0"
          />
        </template>
      </svg>
    </div>

    <!-- 控制与读数 -->
    <div class="cp-panel">
      <div class="cp-sliders">
        <div v-for="s in sliders" :key="s.key" class="cp-slider">
          <div class="cp-slider-head">
            <span class="cp-slider-name" :style="{ color: s.color }"
              ><Latex :tex="s.labelTex"
            /></span>
            <span class="cp-slider-val" :style="{ color: s.color }"
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
            class="cp-range"
            :style="{ accentColor: s.color }"
          />
        </div>
      </div>

      <div class="cp-reads">
        <div class="cp-line"><Latex :tex="currentTex" /></div>
        <div class="cp-grid">
          <div class="cp-cell">
            <Latex tex="R_1" style="color: #60a5fa" />
            <Latex :tex="p1Tex" class="cp-tex" />
          </div>
          <div class="cp-cell">
            <Latex tex="R_2" style="color: #f87171" />
            <Latex :tex="p2Tex" class="cp-tex" />
          </div>
        </div>
        <div class="cp-total"><Latex :tex="pTotTex" /></div>
      </div>

      <div class="cp-conserve">
        <mdi-check-circle class="cp-check-icon" />
        能量守恒：总功率等于各用电器功率之和
      </div>
    </div>
  </div>
</template>

<style scoped>
.cp-wrap {
  display: flex;
  gap: 1.1rem;
  align-items: stretch;
  width: 100%;
}

.cp-fig {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  min-width: 0;
  padding: 0.35rem;
  border: 1px solid rgb(100 116 139 / 25%);
  border-radius: 1rem;

  background: rgb(15 23 42 / 55%);
}

.cp-svg {
  width: 100%;
  height: 100%;
  max-height: 188px;
}

.cp-panel {
  display: flex;
  flex: 0 0 424px;
  flex-direction: column;
  gap: 0.4rem;

  min-width: 0;
}

.cp-sliders {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.6rem;
}

.cp-slider {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.cp-slider-head {
  display: flex;
  gap: 0.3rem;
  align-items: baseline;
  justify-content: space-between;
}

.cp-slider-name {
  font-weight: 700;
  font-style: italic;
  font-size: 0.98rem;
  font-family: "KaTeX_Math", serif;
}

.cp-slider-val {
  font-weight: 800;
  font-size: 0.95rem;
  white-space: nowrap;
}

.cp-range {
  width: 100%;
  height: 1.15rem;
  cursor: pointer;
  accent-color: #e2a846;
}

.cp-reads {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  padding: 0.28rem 0.55rem;
  border: 1px solid rgb(100 116 139 / 22%);
  border-radius: 0.9rem;

  background: rgb(15 23 42 / 65%);
}

.cp-line {
  font-size: 0.88rem;
}

.cp-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 0.5rem;
}

.cp-cell {
  display: flex;
  gap: 0.3rem;
  align-items: baseline;
  min-width: 0;
}

.cp-tex {
  font-size: 0.88rem;
}

.cp-total {
  padding-top: 0.2rem;
  border-top: 1px dashed rgb(100 116 139 / 35%);

  color: #e2a846;

  font-weight: 700;
  font-size: 0.92rem;
}

.cp-conserve {
  display: flex;
  gap: 0.4rem;
  align-items: center;

  color: #86efac;

  font-weight: 600;
  font-size: 0.85rem;
}

.cp-check-icon {
  color: #4ade80;
  font-size: 1.1rem;
}
</style>
