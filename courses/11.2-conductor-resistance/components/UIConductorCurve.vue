<script setup lang="ts">
import { computed } from "vue";

/**
 * 第 3 页：导体 A、B 的 U–I 图像。 数据由真实关系 U = RI 给出（导体 A：R = 5 ohm；导体 B：R = 10 ohm，两段导体中的电流相同）。
 * 分步：先只有实验描点（学生看规律），点击后才连出两条过原点的直线。
 */
const { step = 0 } = defineProps<{ step?: number }>();

const currents = [0.1, 0.2, 0.3, 0.4, 0.5];
const rA = 5;
const rB = 10;

const rows = computed(() =>
  currents.map((current) => ({ current, uA: rA * current, uB: rB * current })),
);

/** 实验描点（常显） */
const dots = computed(() => [
  ...currents.map((current) => ({
    x: current,
    y: rA * current,
    dot: 5,
    dotColor: "var(--c-accent-2)",
    parts: [] as { tex?: string; text?: string }[],
  })),
  ...currents.map((current) => ({
    x: current,
    y: rB * current,
    dot: 5,
    dotColor: "var(--c-accent)",
    parts: [] as { tex?: string; text?: string }[],
  })),
]);

/** 点击后才出现的两条拟合直线（过原点） */
const curves = computed(() => [
  {
    points: [
      { x: 0, y: 0 },
      { x: 0.5, y: rA * 0.5 },
    ],
    stroke: "var(--c-accent-2)",
    width: 3.5,
    showAt: 1,
  },
  {
    points: [
      { x: 0, y: 0 },
      { x: 0.5, y: rB * 0.5 },
    ],
    stroke: "var(--c-accent)",
    width: 3.5,
    showAt: 1,
  },
]);
</script>

<template>
  <div class="uc-wrap">
    <table class="uc-table">
      <thead>
        <tr>
          <th><Latex tex="I/\text{A}" /></th>
          <th class="uc-th-a"><Latex tex="U_A/\text{V}" /></th>
          <th class="uc-th-b"><Latex tex="U_B/\text{V}" /></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.current">
          <td>{{ row.current.toFixed(2) }}</td>
          <td>{{ row.uA.toFixed(1) }}</td>
          <td>{{ row.uB.toFixed(1) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="uc-chart">
      <CoordAxes
        :x-range="[0, 0.56]"
        :y-range="[0, 5.6]"
        :x-axis="{ quantity: 'I', unit: 'A' }"
        :y-axis="{ quantity: 'U', unit: 'V' }"
        :curves="curves"
        :labels="dots"
        :ticks="{ x: [0.1, 0.2, 0.3, 0.4, 0.5], y: [1, 3, 5] }"
        :view="{ width: 720, height: 250 }"
        :step="step"
      />
    </div>
  </div>
</template>

<style scoped>
.uc-wrap {
  display: flex;
  gap: 1.4rem;
  align-items: center;
  min-width: 0;
}

.uc-table {
  flex: 0 0 auto;

  width: auto;
  border-collapse: collapse;

  font-size: 1.02rem;
  font-variant-numeric: tabular-nums;
}

.uc-table th,
.uc-table td {
  padding: 0.22rem 0.85rem;
  border-bottom: 1px solid var(--c-border);
  text-align: center;
}

.uc-table th {
  color: var(--c-text-dim);
  font-weight: 600;
}

.uc-table tbody tr:last-child td {
  border-bottom: none;
}

.uc-chart {
  flex: 1;
  min-width: 0;
}
</style>
