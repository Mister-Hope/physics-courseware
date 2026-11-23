<script setup lang="ts">
// 共振曲线：受迫振动振幅随驱动力频率变化，f=f0 时振幅最大
import { computed, ref } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

const freq = ref(0.7);
const F0 = 1;
const ZETA = 0.18;

const ampAt = (f: number, zeta: number) =>
  1 / Math.sqrt((1 - (f / F0) ** 2) ** 2 + (2 * zeta * f / F0) ** 2);

const mainCurve = computed(() => ({
  formula: (f: number) => ampAt(f, ZETA) / ampAt(F0, ZETA),
  color: "var(--c-accent)",
  width: 2.6,
}));
const lightCurve = computed(() => ({
  formula: (f: number) => ampAt(f, 0.08) / ampAt(F0, 0.08),
  color: "var(--c-sky)",
  width: 1.8,
  dashed: true,
  showAt: 1,
}));
const f0Line = {
  points: [
    { x: F0, y: 0 },
    { x: F0, y: 1.08 },
  ],
  color: "var(--c-text-dim)",
  width: 1,
  dashed: true,
};

const current = computed(() => ampAt(freq.value, ZETA) / ampAt(F0, ZETA));
const status = computed(() => {
  const delta = Math.abs(freq.value - F0);
  if (delta < 0.03) return "共振";
  if (delta < 0.15) return "接近共振";
  return "远离共振";
});
const statusColor = computed(() =>
  status.value === "共振" ? "var(--c-accent)" : "var(--c-text-dim)",
);
const labels = computed(() => [
  { x: F0, y: 1.02, tex: "f_0", anchor: "top" as const, size: 13, color: "var(--c-text)", halo: true },
  { x: freq.value, y: current.value, text: "当前", anchor: "top" as const, size: 11, color: "var(--c-accent)", halo: true, dot: true, dotColor: "var(--c-accent)" },
  { x: 1.3, y: 0.66, text: "阻尼更小", anchor: "center" as const, size: 11, color: "var(--c-sky)", halo: true, showAt: 1 },
]);
</script>

<template>
  <div class="fw-explorer">
    <div class="fw-chart">
      <CoordAxes
        :x-range="[0.3, 1.9]"
        :y-range="[0, 1.12]"
        :x-axis="{ quantity: 'f', unit: 'Hz' }"
        :y-axis="{ quantity: 'A' }"
        :curves="[mainCurve, lightCurve, f0Line]"
        :labels="labels"
        :ticks="{ x: [0.5, 1, 1.5], y: [0.5, 1], labels: true, origin: false }"
        :view="{ width: 720, height: 340 }"
        :step="step"
      />
    </div>
    <div class="fw-controls">
      <CourseSlider
        v-model="freq"
        :min="0.4"
        :max="1.8"
        :step="0.02"
        label="驱动力频率"
        label-tex="f"
        accent="gold"
        layout="tight"
      />
      <div class="fw-values">
        <div><Latex tex="f" /> = {{ freq.toFixed(2) }} <Latex tex="\text{Hz}" /></div>
        <div><Latex tex="A/A_0" /> = {{ current.toFixed(2) }}</div>
      </div>
      <div class="fw-status" :style="{ color: statusColor }">状态：{{ status }}</div>
      <div class="fw-formula"><Latex tex="f=f_0\ \text{时振幅最大}" /></div>
    </div>
  </div>
</template>
