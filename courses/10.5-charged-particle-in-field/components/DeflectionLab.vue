<script setup lang="ts">
/**
 * 第 12 页交互：电子在同一对极板间偏转，改变偏转电压 U 与板长 l，实时看到偏移 y 与 tanθ 的变化。 几何全部由真实公式算出：y = eUl²/(2mdv₀²)，tanθ =
 * eUl/(mdv₀²)（图中竖直方向放大显示）。
 */
import { computed, ref } from "vue";

const E = 1.6e-19;
const M = 9.1e-31;
const D = 0.02;
const V0 = 3e7;

const voltage = ref(200);
const plateLength = ref(6);

/** 每厘米对应的 viewBox 像素数（示意图比例，竖直方向同样取 40 px/cm） */
const PX_PER_CM = 40;
const CR = 200;
const CY = 150;

const plateLenPx = computed(() => plateLength.value * PX_PER_CM);
const exitX = computed(() => CR + plateLenPx.value);
const yCm = computed(
  () => ((E * voltage.value * (plateLength.value / 100) ** 2) / (2 * M * D * V0 ** 2)) * 100,
);
const tanTheta = computed(
  () => (E * voltage.value * (plateLength.value / 100)) / (M * D * V0 ** 2),
);
const defPx = computed(() => yCm.value * PX_PER_CM);
const exitY = computed(() => CY - defPx.value);
const trajectory = computed(
  () => `M ${CR} ${CY} Q ${CR + plateLenPx.value / 2} ${CY} ${exitX.value} ${exitY.value}`,
);
const rayEnd = computed(() => {
  const slope = (2 * defPx.value) / Math.max(plateLenPx.value, 1);
  return { x: exitX.value + 140, y: exitY.value - slope * 140 };
});
const fieldXs = computed(() => [
  CR + plateLenPx.value * 0.25,
  CR + plateLenPx.value * 0.5,
  CR + plateLenPx.value * 0.75,
]);
const yLabelY = computed(() => (exitY.value + CY) / 2 + 5);
</script>

<template>
  <div class="dfl-lab">
    <div class="dfl-fig">
      <svg
        viewBox="0 0 620 300"
        width="620"
        height="300"
        font-family="Inter, system-ui, sans-serif"
      >
        <rect
          :x="CR"
          y="104"
          :width="plateLenPx"
          height="6"
          rx="2"
          fill="var(--c-accent)"
          fill-opacity="0.3"
          stroke="var(--c-accent)"
          stroke-width="1.5"
        />
        <rect
          :x="CR"
          y="190"
          :width="plateLenPx"
          height="6"
          rx="2"
          fill="var(--c-velocity)"
          fill-opacity="0.24"
          stroke="var(--c-velocity)"
          stroke-width="1.5"
        />
        <text
          :x="CR - 10"
          y="116"
          text-anchor="end"
          fill="var(--c-accent)"
          font-size="14"
          font-weight="700"
        >
          ＋
        </text>
        <text
          :x="CR - 10"
          y="192"
          text-anchor="end"
          fill="var(--c-velocity)"
          font-size="15"
          font-weight="700"
        >
          －
        </text>
        <CourseArrow
          v-for="x in fieldXs"
          :key="x"
          :from="{ x, y: 114 }"
          :to="{ x, y: 186 }"
          stroke="var(--c-field)"
          stroke-width="1.8"
          opacity="0.7"
        />
        <line
          x1="150"
          y1="150"
          :x2="exitX"
          y2="150"
          stroke="var(--c-text-dim)"
          stroke-width="1.1"
          stroke-dasharray="6 5"
          stroke-opacity="0.45"
        />
        <CourseArrow
          :from="{ x: 78, y: 150 }"
          :to="{ x: 124, y: 150 }"
          stroke="var(--c-velocity)"
          stroke-width="2.4"
        />
        <text x="100" y="136" text-anchor="middle" fill="var(--c-velocity)" font-size="15">
          <tspan font-style="italic" font-family="KaTeX_Math">v</tspan>
          <tspan dy="4" font-size="10" font-style="italic" font-family="KaTeX_Math">0</tspan>
        </text>
        <circle
          cx="140"
          cy="150"
          r="7"
          fill="var(--c-velocity)"
          stroke="var(--c-text)"
          stroke-width="1.2"
        />
        <text
          x="140"
          y="153.5"
          text-anchor="middle"
          fill="var(--c-text)"
          font-size="10"
          font-weight="700"
        >
          −
        </text>
        <line x1="162" y1="110" x2="162" y2="190" stroke="var(--c-text-dim)" stroke-width="1.1" />
        <line x1="156" y1="110" x2="168" y2="110" stroke="var(--c-text-dim)" stroke-width="1.1" />
        <line x1="156" y1="190" x2="168" y2="190" stroke="var(--c-text-dim)" stroke-width="1.1" />
        <text
          x="172"
          y="146"
          fill="var(--c-neutral-300)"
          font-size="14"
          font-style="italic"
          font-family="KaTeX_Math"
        >
          d
        </text>
        <text
          :x="CR + plateLenPx / 2"
          y="94"
          text-anchor="middle"
          fill="var(--c-accent)"
          font-size="15"
          font-style="italic"
          font-family="KaTeX_Math"
        >
          U
        </text>
        <path
          :d="trajectory"
          fill="none"
          stroke="var(--c-physics)"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <CourseArrow
          :from="{ x: exitX, y: exitY }"
          :to="rayEnd"
          stroke="var(--c-physics)"
          stroke-width="2.6"
        />
        <line
          :x1="exitX"
          :y1="exitY"
          :x2="exitX"
          y2="150"
          stroke="var(--c-text-dim)"
          stroke-width="1.2"
          stroke-dasharray="5 4"
        />
        <text
          :x="exitX + 8"
          :y="yLabelY"
          fill="var(--c-neutral-300)"
          font-size="14"
          font-style="italic"
          font-family="KaTeX_Math"
        >
          y
        </text>
        <line
          :x1="CR"
          y1="232"
          :x2="exitX"
          y2="232"
          stroke="var(--c-text-dim)"
          stroke-width="1.2"
        />
        <line :x1="CR" y1="226" :x2="CR" y2="238" stroke="var(--c-text-dim)" stroke-width="1.2" />
        <line
          :x1="exitX"
          y1="226"
          :x2="exitX"
          y2="238"
          stroke="var(--c-text-dim)"
          stroke-width="1.2"
        />
        <text
          :x="CR + plateLenPx / 2"
          y="256"
          text-anchor="middle"
          fill="var(--c-neutral-300)"
          font-size="14"
        >
          <tspan font-style="italic" font-family="KaTeX_Math">l</tspan>
        </text>
      </svg>
    </div>
    <div class="dfl-panel">
      <CourseSlider
        v-model="voltage"
        :min="0"
        :max="400"
        :step="10"
        label="偏转电压"
        label-tex="U"
        layout="tight"
        label-width="5.2rem"
      >
        <template #value>{{ voltage }}<Latex tex="\text{ V}" /></template>
      </CourseSlider>
      <CourseSlider
        v-model="plateLength"
        :min="2"
        :max="6"
        :step="0.5"
        label="板长"
        label-tex="l"
        accent="blue"
        layout="tight"
        label-width="5.2rem"
      >
        <template #value>{{ plateLength.toFixed(1) }}<Latex tex="\text{ cm}" /></template>
      </CourseSlider>
      <div class="dfl-readout">
        <div class="dfl-read">
          <span class="dfl-read-label">偏移</span>
          <span class="dfl-read-value"
            ><Latex tex="y" /> = {{ yCm.toFixed(2) }} <Latex tex="\text{ cm}"
          /></span>
        </div>
        <div class="dfl-read">
          <span class="dfl-read-label">偏转角</span>
          <span class="dfl-read-value"><Latex tex="\tan\theta" /> = {{ tanTheta.toFixed(2) }}</span>
        </div>
      </div>
      <div class="mini-note">
        板间距 <Latex tex="d = 2.0\ \text{cm}" />，入射速度
        <Latex tex="v_0 = 3.0\times 10^7\ \text{m/s}" />。
      </div>
    </div>
  </div>
</template>

<style scoped>
.dfl-lab {
  display: flex;
  gap: 1.1rem;
  align-items: center;
  min-width: 0;
}

.dfl-fig {
  flex: 1 1 auto;
  min-width: 0;
}

.dfl-fig svg {
  display: block;
  width: 100%;
  max-width: 620px;
  height: auto;
}

.dfl-panel {
  display: flex;
  flex: 0 0 300px;
  flex-direction: column;
  gap: 0.55rem;

  min-width: 0;
}

.dfl-readout {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  margin-top: 0.2rem;
  padding: 0.55rem 0.85rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);

  backdrop-filter: blur(16px);
}

.dfl-read {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  justify-content: space-between;
}

.dfl-read-label {
  color: var(--c-text-dim);
  font-size: 0.92rem;
}

.dfl-read-value {
  color: var(--c-text);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
</style>
