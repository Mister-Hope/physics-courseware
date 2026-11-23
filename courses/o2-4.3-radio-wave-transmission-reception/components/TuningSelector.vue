<!--
  第 11 页交互：调谐选台。
  L 固定为 200 μH，滑块改变调谐电容 C；用真实公式 f = 1/(2π√(LC)) 计算
  调谐电路的固有频率。谐振曲线随固有频率左右移动，峰值对准哪个电台，
  哪个电台在天线中激起的感应电流就最强（电谐振）。
-->
<script setup lang="ts">
import { computed, ref } from "vue";

const L = 200e-6; // H
const K = 0.045; // 谐振曲线的相对半宽（只用于示意，不引入 Q 值）
const C = ref(200); // pF

/** 调谐电路的固有频率，单位 kHz */
const f0 = computed(() => 1 / (2 * Math.PI * Math.sqrt(L * C.value * 1e-12)) / 1000);

const stations = [
  { name: "甲台", freq: 640, color: "var(--c-sky)" },
  { name: "乙台", freq: 990, color: "var(--c-accent)" },
  { name: "丙台", freq: 1215, color: "var(--c-physics)" },
];

/** 频率为 f 的电磁波在调谐电路中激起的相对电流（峰值 1，半宽随 f0 变化） */
const responseAt = (f: number) => 1 / (1 + ((f - f0.value) / (K * f0.value)) ** 2);

const rows = computed(() =>
  stations.map((station) => {
    const response = responseAt(station.freq);

    return { ...station, response, tuned: response >= 0.5 };
  }),
);

const tunedStation = computed(() => rows.value.find((row) => row.tuned) ?? null);

const curve = computed(() => [
  {
    formula: (f: number) => 1 / (1 + ((f - f0.value) / (K * f0.value)) ** 2),
    samples: 600,
    color: "var(--c-accent)",
    width: 2.4,
  },
]);

const stationLines = computed(() =>
  stations.map((station) => ({
    points: [
      { x: station.freq, y: 0 },
      { x: station.freq, y: 1.02 },
    ],
    color: station.color,
    width: 1.2,
    dashed: true,
    opacity: 0.55,
  })),
);

const chartLabels = computed(() => [
  ...stations.map((station) => ({
    x: station.freq,
    y: 1.06,
    text: String(station.freq),
    anchor: "top" as const,
    size: 11.5,
    color: station.color,
  })),
  { x: f0.value, y: 1, dot: 5, dotColor: "var(--c-accent)" },
]);
</script>

<template>
  <div class="rw-tuner">
    <div class="rw-tuner-chart">
      <CoordAxes
        :x-range="[540, 1520]"
        :y-range="[0, 1.12]"
        :x-axis="{ quantity: 'f', unit: 'kHz' }"
        :y-axis="{ quantity: 'I' }"
        :curves="[...stationLines, ...curve]"
        :labels="chartLabels"
        :ticks="{ x: [600, 800, 1000, 1200, 1400], y: [0.5, 1], origin: false }"
        :view="{ width: 620, height: 370 }"
      />
    </div>
    <div class="rw-tuner-panel">
      <div class="rw-tuner-readout">
        <span class="rw-tuner-readout-label">固有频率 <Latex tex="f" /></span>
        <span class="rw-tuner-f">{{ f0.toFixed(1) }}</span>
        <Latex tex="\text{kHz}" />
      </div>
      <div class="rw-slider-head">
        <span>调谐电容 <Latex tex="C" /></span>
        <span class="rw-c-value">{{ C.toFixed(1) }} <Latex tex="\text{pF}" /></span>
      </div>
      <CourseSlider
        v-model="C"
        :min="60"
        :max="400"
        :step="0.5"
        layout="bare"
        aria-label="调谐电容"
      />
      <div class="rw-formula">
        <Latex tex="f=\dfrac{1}{2\pi\sqrt{LC}}" />
        <span class="rw-formula-note"><Latex tex="L=200\ \mu\text{H}" /> 固定</span>
      </div>
      <div class="rw-stations">
        <div
          v-for="row in rows"
          :key="row.name"
          class="rw-station"
          :class="{ 'is-tuned': row.tuned }"
        >
          <span class="rw-station-name">{{ row.name }}</span>
          <span class="rw-station-freq">{{ row.freq }} <Latex tex="\text{kHz}" /></span>
          <span class="rw-bar">
            <span
              class="rw-bar-fill"
              :style="{ width: `${row.response * 100}%`, background: row.color }"
            ></span>
          </span>
          <span class="rw-badge" :class="{ 'is-on': row.tuned }">收到</span>
        </div>
      </div>
      <div class="rw-status" :class="{ 'is-tuned': tunedStation }">
        <template v-if="tunedStation">电谐振：{{ tunedStation.name }}的信号最强</template>
        <template v-else>还未对准任何电台</template>
      </div>
    </div>
  </div>
</template>
