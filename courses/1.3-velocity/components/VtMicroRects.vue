<script setup lang="ts">
import { computed } from "vue";

/**
 * 微元法扩展页：把整段时间等分成 3 / 8 / 24 小段，
 * 每小段内把速度看作不变，用一排小矩形（面积 v·Δt）去逼近 v-t 图线与 t 轴围成的面积。
 *
 * 图线取 v = 0.4 + t²/8（真实函数采样，不是手摆的折线）——只为让"越分越贴合"看得清楚。
 */
/**
 * 图线上的瞬时速度（真实函数采样，不是手摆折线）。
 * @param t 时刻（秒）
 * @returns 该时刻的速度（m/s）
 */
const vOf = (t: number): number => 0.4 + (t * t) / 8;
const T_MAX = 5;
const SPLIT = [3, 8, 24];

const curvePoints = computed(() =>
  Array.from({ length: 41 }, (_, i) => {
    const t = (T_MAX * i) / 40;

    return { x: t, y: vOf(t) };
  }),
);

const panels = computed(() =>
  SPLIT.map((n) => {
    const dt = T_MAX / n;
    const areas = Array.from({ length: n }, (_, i) => {
      const t0 = i * dt;
      const t1 = t0 + dt;
      const v = vOf((t0 + t1) / 2);

      return {
        points: [
          { x: t0, y: 0 },
          { x: t1, y: 0 },
          { x: t1, y: v },
          { x: t0, y: v },
        ],
        fill: "var(--c-accent-2)",
        fillOpacity: 0.22,
      };
    });

    return { n, areas };
  }),
);
</script>

<template>
  <!-- 微元法：等分成 3 / 8 / 24 段，一排小矩形的面积和逼近图线下的面积 -->
  <div class="vt-micro">
    <div v-for="p in panels" :key="p.n" class="vt-micro-cell">
      <CoordAxes
        :x-range="[0, 5.6]"
        :y-range="[0, 4.1]"
        :x-axis="{ quantity: 't', unit: 's', side: 'above' }"
        :y-axis="{ quantity: 'v', unit: 'm/s' }"
        :ticks="{ x: [], y: [] }"
        :areas="p.areas"
        :curves="[{ points: curvePoints, stroke: 'var(--c-accent)', width: 3.4 }]"
        :view="{ width: 300, height: 184 }"
      />
      <div class="vt-micro-cap">等分成 {{ p.n }} 段</div>
    </div>
  </div>
</template>

<style scoped>
.vt-micro {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
}

.vt-micro-cell {
  min-width: 0;
}

.vt-micro-cap {
  margin-top: 0.2rem;
  color: var(--c-text-dim);
  font-size: 0.85rem;
  text-align: center;
}
</style>
