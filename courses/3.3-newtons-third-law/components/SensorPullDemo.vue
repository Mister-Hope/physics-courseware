<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

/**
 * 手拉力传感器时，拉力随时间的变化（单位 N）。 真实关系：两只互钩的传感器在任何时刻都满足 F' = -F（大小相等、方向相反），
 * 所以下面两条图线由同一个函数生成，只是取正、取负——手拉的力怎么变，它们都严格对称。
 *
 * @param t 时间，单位 s
 * @returns 该时刻的拉力大小，单位 N
 */
const pullForce = (t: number): number => 2.6 + 1.4 * Math.sin((2 * Math.PI * t) / 5);

const T_MAX = 5.5;
const STEP = 0.05;

const t = ref(2.5);
const playing = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;

const force = computed<number>(() => pullForce(t.value));

const curves = computed(() => [
  {
    formula: (x: number): number => pullForce(x),
    samples: 160,
    stroke: "var(--c-accent)",
    width: 3.2,
  },
  {
    formula: (x: number): number => -pullForce(x),
    samples: 160,
    stroke: "var(--c-accent-2)",
    width: 3.2,
  },
  {
    points: [
      { x: t.value, y: -4.4 },
      { x: t.value, y: 4.4 },
    ],
    stroke: "var(--c-text-dim)",
    width: 1.4,
    dashed: true,
  },
]);

const labels = computed(() => [
  {
    x: 0.1,
    y: pullForce(0.1) + 0.8,
    text: "传感器 A",
    anchor: "right",
    size: 15,
    color: "var(--c-accent)",
  },
  {
    x: 0.1,
    y: -pullForce(0.1) - 0.8,
    text: "传感器 B",
    anchor: "right",
    size: 15,
    color: "var(--c-accent-2)",
  },
  {
    x: t.value,
    y: force.value,
    tex: "F",
    anchor: "top-right",
    dx: 7,
    dy: -7,
    dot: 5,
    halo: true,
    color: "var(--c-accent)",
  },
  {
    x: t.value,
    y: -force.value,
    tex: "F'",
    anchor: "bottom-right",
    dx: 7,
    dy: 7,
    dot: 5,
    halo: true,
    color: "var(--c-accent-2)",
  },
]);

const readTex = computed(
  () => `F=${force.value.toFixed(2)}\\text{ N}\\quad F'=-${force.value.toFixed(2)}\\text{ N}`,
);

const toggle = (): void => {
  if (playing.value) {
    playing.value = false;
    if (timer != null) clearInterval(timer);

    timer = null;

    return;
  }

  playing.value = true;
  timer = setInterval(() => {
    t.value = t.value >= T_MAX - 1e-6 ? 0 : Math.round((t.value + STEP) * 100) / 100;
  }, 60);
};

onBeforeUnmount(() => {
  if (timer != null) clearInterval(timer);
});
</script>

<template>
  <div class="sensor-demo">
    <CoordAxes
      :x-range="[0, 5.7]"
      :y-range="[-4.8, 4.8]"
      :x-axis="{ quantity: 't', unit: 's' }"
      :y-axis="{ quantity: 'F', unit: 'N' }"
      :curves="curves"
      :labels="labels"
      :ticks="{ x: [1, 2, 3, 4, 5], y: [-4, -2, 2, 4] }"
      :view="{ width: 900, height: 300 }"
    />
    <div class="sensor-bar">
      <button class="sensor-btn" type="button" @click="toggle">
        {{ playing ? "暂停" : "播放" }}
      </button>
      <input
        v-model.number="t"
        class="sensor-range"
        type="range"
        :min="0"
        :max="T_MAX"
        :step="STEP"
        aria-label="拖动查看任意时刻"
      />
      <div class="sensor-read"><Latex :tex="readTex" /></div>
    </div>
  </div>
</template>

<style scoped>
.sensor-demo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: 100%;
  min-width: 0;
}

.sensor-bar {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.sensor-btn {
  padding: 0.25rem 1.15rem;
  border: 1px solid rgb(226 168 70 / 45%);
  border-radius: 2rem;

  background: rgb(226 168 70 / 12%);
  color: #e2a846;

  font-weight: 700;
  font-size: 0.8rem;

  cursor: pointer;

  transition: filter 0.2s ease;
}

.sensor-btn:hover {
  filter: brightness(1.18);
}

.sensor-range {
  flex: 1 1 auto;
  max-width: 24rem;
  cursor: pointer;
  accent-color: #e2a846;
}

.sensor-read {
  color: #f1f5f9;
  font-size: 0.95rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
</style>
