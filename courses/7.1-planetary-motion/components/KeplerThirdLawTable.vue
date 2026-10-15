<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 6 页：开普勒第三定律的数据表——八大行星真实的半长轴 a 与公转周期 T， 每行的比值 k = a³/T² 都用公式实时算出（表里 a 以天文单位计、T 以年计，所以各行的比值都接近
 * 1）。 点某一行可选中该行星，下方读数同步给出它的计算过程。
 */
interface Planet {
  name: string;
  /** 半长轴，单位：天文单位 */
  a: number;
  /** 公转周期，单位：年 */
  T: number;
}

/** 八大行星（人教版教材配套的常用数据） */
const PLANETS: Planet[] = [
  { name: "水星", a: 0.387, T: 0.241 },
  { name: "金星", a: 0.723, T: 0.615 },
  { name: "地球", a: 1, T: 1 },
  { name: "火星", a: 1.524, T: 1.881 },
  { name: "木星", a: 5.203, T: 11.86 },
  { name: "土星", a: 9.537, T: 29.45 },
  { name: "天王星", a: 19.19, T: 84.02 },
  { name: "海王星", a: 30.07, T: 164.8 },
];

const selected = ref("木星");
const current = computed(() => PLANETS.find((item) => item.name === selected.value) ?? PLANETS[4]);
/**
 * 开普勒第三定律：k = a³/T²
 *
 * @param planet 一行行星数据
 * @returns 该行星的 a³/T²
 */
const ratioOf = (planet: Planet): number => planet.a ** 3 / planet.T ** 2;
const detail = computed(() => {
  const planet = current.value;

  return `${planet.a.toFixed(3)}^{3} \\div ${planet.T.toFixed(3)}^{2} = ${ratioOf(planet).toFixed(3)}`;
});
</script>

<template>
  <div class="kt">
    <table class="data-table kt-table">
      <thead>
        <tr>
          <th>行星</th>
          <th><Latex tex="a" /></th>
          <th><Latex tex="T" /></th>
          <th><Latex tex="a^3/T^2" /></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="planet in PLANETS"
          :key="planet.name"
          :class="{ hl: planet.name === selected }"
          tabindex="0"
          @click="selected = planet.name"
          @keydown.enter="selected = planet.name"
        >
          <td>{{ planet.name }}</td>
          <td>{{ planet.a.toFixed(3) }}</td>
          <td>{{ planet.T.toFixed(3) }}</td>
          <td>{{ ratioOf(planet).toFixed(3) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="kt-readout">
      <span class="kt-name">{{ current.name }}</span>
      <span><Latex :tex="detail" /></span>
    </div>
    <div class="kt-note">a 以天文单位计，T 以年计。</div>
  </div>
</template>

<style scoped>
.kt {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  width: 100%;
  min-width: 0;
}

/* 8 行数据要在一屏里放完，压紧行距（字号仍走共享 .data-table 的 0.85rem） */
.kt-table {
  width: 100%;
}

.kt-table th,
.kt-table td {
  padding: 0.12rem 0.5rem;
}

.kt-table tbody tr {
  cursor: pointer;
}

.kt-readout {
  display: flex;
  gap: 0.5rem;
  align-items: center;

  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
}

.kt-name {
  color: var(--c-accent);
  font-weight: 700;
  white-space: nowrap;
}

.kt-note {
  color: var(--c-text-dim);
  font-size: 0.8rem;
}
</style>
