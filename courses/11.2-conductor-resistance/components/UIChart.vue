<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 4 页交互：同一个导体的 U–I 图线。 两条直线是两个导体本身（A：R = 5 ohm，B：R = 10 ohm，固定不变）； 滑块只改工作点电流 I，U 由真实关系 U = RI 算出
 * —— 比值 U/I 恒等于 A 的电阻，与 I、U 取多少无关。
 */
const current = ref(0.3);

const rA = 5;
const rB = 10;

const u = computed(() => rA * current.value);
const ratio = computed(() => u.value / current.value);

const curves = [
  {
    points: [
      { x: 0, y: 0 },
      { x: 0.5, y: rA * 0.5 },
    ],
    color: "var(--c-accent-2)",
    width: 3.5,
  },
  {
    points: [
      { x: 0, y: 0 },
      { x: 0.5, y: rB * 0.5 },
    ],
    color: "var(--c-accent)",
    width: 3.5,
  },
];

const point = computed(() => ({
  x: current.value,
  y: u.value,
  math: "P",
  color: "var(--c-physics)",
  labelAt: "top-right" as const,
}));
</script>

<template>
  <div class="res-ui">
    <div class="res-ui-chart">
      <SimpleAxis
        :x-max="0.56"
        :y-max="5.6"
        :x-axis="{ quantity: 'I', unit: 'A' }"
        :y-axis="{ quantity: 'U', unit: 'V' }"
        :curves="curves"
        :point="point"
        :guides="{ color: 'var(--c-physics)' }"
        :ticks="{ x: [0.1, 0.2, 0.3, 0.4, 0.5], y: [1, 2, 3, 4, 5] }"
        :view="{ width: 480, height: 500 }"
      >
        <template #overlay="{ x, y }">
          <g font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-text-dim)">
            <line
              :x1="x(0.26)"
              :y1="y(0.42)"
              :x2="x(0.33)"
              :y2="y(0.42)"
              stroke="var(--c-accent-2)"
              stroke-width="2.6"
              stroke-linecap="round"
            />
            <text :x="x(0.345)" :y="y(0.42) + 5">A</text>
            <line
              :x1="x(0.4)"
              :y1="y(0.42)"
              :x2="x(0.47)"
              :y2="y(0.42)"
              stroke="var(--c-accent)"
              stroke-width="2.6"
              stroke-linecap="round"
            />
            <text :x="x(0.485)" :y="y(0.42) + 5">B</text>
          </g>
        </template>
      </SimpleAxis>
    </div>
    <div class="res-ui-panel">
      <CourseSlider
        v-model="current"
        :min="0.1"
        :max="0.5"
        :step="0.02"
        label="电流"
        label-tex="I"
        accent="blue"
        label-width="3.4rem"
      >
        <template #value>{{ current.toFixed(2) }}<Latex tex="\ \text{A}" /></template>
      </CourseSlider>
      <div class="res-readout">
        <div class="res-cell">
          <span class="res-k"><Latex tex="I" /></span>
          <span class="res-v">{{ current.toFixed(2) }}<Latex tex="\ \text{A}" /></span>
        </div>
        <div class="res-cell">
          <span class="res-k"><Latex tex="U" /></span>
          <span class="res-v">{{ u.toFixed(2) }}<Latex tex="\ \text{V}" /></span>
        </div>
        <div class="res-cell">
          <span class="res-k"><Latex tex="U/I" /></span>
          <span class="res-v">{{ ratio.toFixed(1) }}<Latex tex="\ \Omega" /></span>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.res-ui {
  display: flex;
  gap: 1.4rem;
  align-items: center;

  min-width: 0;
  height: 100%;
}

.res-ui-chart {
  flex: 1;
  min-width: 0;
}

.res-ui-panel {
  display: grid;
  gap: 0.7rem;
  align-content: center;
  width: 21rem;
}

.res-readout {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.4rem;
}

.res-cell {
  display: flex;
  gap: 0.45rem;
  align-items: baseline;
}

.res-k {
  color: var(--c-text-dim);
}

.res-v {
  font-size: 1.05rem;
  font-variant-numeric: tabular-nums;
}
</style>
