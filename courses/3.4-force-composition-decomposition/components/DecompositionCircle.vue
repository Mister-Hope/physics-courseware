<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 已知一个分力的方向和另一个分力的大小时，解的个数由辅助圆决定。
 *
 * 合力 F 竖直向上（大小固定）；已知方向的分力 F₁ 只能落在与 F 成 θ 角的射线上， 而另一个分力 F₂ 的大小给定 ⇒ 它的末端（即 F₁ 的尖端）必须同时在射线上和"以 F
 * 末端为圆心、 F₂ 为半径"的圆上。圆与射线的交点数就是解的个数：
 *
 * - F₂ < F sinθ → 相离，0 个解
 * - F₂ = F sinθ → 相切，1 个解（此时 F₂ 最小，等于 F sinθ）
 * - F sinθ < F₂ < F → 2 个解
 * - F₂ ≥ F → 1 个解
 *
 * 交点用解析法真实求解（t = F cosθ ± √(F₂² − F²sin²θ)，只取 t > 0 的正向解），不靠目测。
 *
 * **相切吸附**：F₂ 的滑块步长 0.05 时很难正好落在 F sinθ 上，而"相切"正是要给学生看清的那一帧。 所以拖到离临界值 SNAP_RADIUS
 * 以内就自动吸到相切（读数、判定、图上只剩一个交点）， 继续拖开超过这个距离才解除吸附。
 */
const VIEW = { width: 716, height: 412 };
/** 每牛顿多少用户单位 */
const SCALE = 25;
const origin = { x: 266, y: 406 };
const F_MAG = 8;
const T = { x: origin.x, y: origin.y - F_MAG * SCALE };
const RAY_LEN = 410;

/** 吸附半径（N）：离相切临界值这么近就自动吸住 */
const SNAP_RADIUS = 0.3;
/** 判定"正好相切"的容差（N） */
const TANGENT_EPS = 1e-6;

const theta = ref(40);
const force2 = ref(6.5);

const rad = computed(() => (theta.value * Math.PI) / 180);
/** F 与已知方向之间的夹角 θ 的临界值（F 末端到射线的距离） */
const critical = computed(() => F_MAG * Math.sin(rad.value));
/** 已知方向的单位向量（与 F 成 θ 角，偏向右侧） */
const direction = computed(() => ({ x: Math.sin(rad.value), y: -Math.cos(rad.value) }));

/** 是否正好落在相切临界值上（吸附后就是 true） */
const isTangent = computed(() => Math.abs(force2.value - critical.value) <= TANGENT_EPS);

/** 射线上满足条件的解：t = F cosθ ± √(F₂² − F²sin²θ)，只保留 t > 0；相切时只有一个解 */
const farDistances = computed<number[]>(() => {
  if (isTangent.value) return [F_MAG * Math.cos(rad.value)];

  const disc = force2.value ** 2 - critical.value ** 2;

  if (disc < 0) return [];

  const d = Math.sqrt(disc);
  const near = F_MAG * Math.cos(rad.value) - d;
  const far = F_MAG * Math.cos(rad.value) + d;

  return near > 1e-6 ? [near, far] : [far];
});

/**
 * F₂ 滑块输入：靠近相切临界值时自动吸附
 *
 * 拖到临界值附近 → 值直接取临界值（相切、1 个解）；继续拖开、离临界值超过 SNAP_RADIUS 后恢复跟手。
 *
 * @param value 滑块给出的原始值
 */
const onForce2Input = (value: number): void => {
  force2.value = Math.abs(value - critical.value) <= SNAP_RADIUS ? critical.value : value;
};

const points = computed(() =>
  farDistances.value.map((t) => ({
    x: origin.x + direction.value.x * t * SCALE,
    y: origin.y + direction.value.y * t * SCALE,
    t,
  })),
);

const rayEnd = computed(() => ({
  x: origin.x + direction.value.x * RAY_LEN,
  y: origin.y + direction.value.y * RAY_LEN,
}));

/** 垂足：从 F 末端向射线作垂线的落点 */
const foot = computed(() => ({
  x: origin.x + direction.value.x * F_MAG * Math.cos(rad.value) * SCALE,
  y: origin.y + direction.value.y * F_MAG * Math.cos(rad.value) * SCALE,
}));

/** 垂线方向（从垂足指向 F 末端）的单位向量，用于画直角标记 */
const perpDir = computed(() => {
  const dx = T.x - foot.value.x;
  const dy = T.y - foot.value.y;
  const len = Math.hypot(dx, dy) || 1;

  return { x: dx / len, y: dy / len };
});

const footMark = computed(() => {
  const dirUnit = direction.value;
  const w = perpDir.value;
  const markSize = 15;
  const markA = { x: foot.value.x + dirUnit.x * markSize, y: foot.value.y + dirUnit.y * markSize };
  const markB = { x: markA.x + w.x * markSize, y: markA.y + w.y * markSize };
  const markC = { x: foot.value.x + w.x * markSize, y: foot.value.y + w.y * markSize };

  return `${markA.x},${markA.y} ${markB.x},${markB.y} ${markC.x},${markC.y}`;
});

const pct = (value: number, total: number): number => (value / total) * 100;

const verdict = computed(() => {
  if (isTangent.value) return { text: "1 个解（相切）", color: "var(--c-accent)" };
  if (force2.value < critical.value) return { text: "无解", color: "var(--c-danger)" };
  if (force2.value >= F_MAG) return { text: "1 个解", color: "var(--c-accent)" };

  return { text: "2 个解", color: "var(--c-physics)" };
});

const caseRows = computed(() => [
  {
    tex: `F_2 < F\\sin\\theta`,
    text: "无解",
    active: !isTangent.value && force2.value < critical.value,
  },
  {
    tex: `F_2 = F\\sin\\theta`,
    text: "1 个解",
    active: isTangent.value,
  },
  {
    tex: `F\\sin\\theta < F_2 < F`,
    text: "2 个解",
    active: !isTangent.value && force2.value > critical.value && force2.value < F_MAG,
  },
  { tex: `F_2 \\ge F`, text: "1 个解", active: force2.value >= F_MAG },
]);

const fmt = (v: number): string => v.toFixed(1);

const thetaTex = computed(() => `\\theta = ${theta.value}^\\circ`);
const f2Tex = computed(() => `F_2 = ${fmt(force2.value)}\\ \\text{N}`);
const criticalTex = computed(() => `F\\sin\\theta = ${fmt(critical.value)}\\ \\text{N}`);
</script>

<template>
  <div class="split-wide" style="--cols: minmax(0, 3fr) minmax(0, 2fr)">
    <div class="figure relative min-w-0">
      <svg :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`">
        <line
          :x1="origin.x"
          :y1="origin.y"
          :x2="rayEnd.x"
          :y2="rayEnd.y"
          stroke="var(--c-text-dim)"
          stroke-width="2.2"
          stroke-dasharray="8 6"
          opacity="0.7"
        />
        <circle
          :cx="T.x"
          :cy="T.y"
          :r="force2 * SCALE"
          fill="none"
          stroke="var(--c-accent-2)"
          stroke-width="2.5"
          stroke-dasharray="7 5"
          opacity="0.75"
        />
        <line
          :x1="T.x"
          :y1="T.y"
          :x2="foot.x"
          :y2="foot.y"
          stroke="var(--c-accent)"
          stroke-width="2.1"
          stroke-dasharray="5 5"
          opacity="0.85"
        />
        <polyline
          :points="footMark"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="1.9"
          opacity="0.9"
        />
        <line
          v-for="(p, i) in points"
          :key="i"
          :x1="p.x"
          :y1="p.y"
          :x2="T.x"
          :y2="T.y"
          stroke="var(--c-accent-2)"
          stroke-width="2.2"
          stroke-dasharray="6 5"
          opacity="0.7"
        />
        <CourseArrow
          :from="origin"
          :to="T"
          stroke="var(--c-physics)"
          stroke-width="5.2"
          pointer-events="none"
        />
        <CourseArrow
          v-for="(p, i) in points"
          :key="`f1-${i}`"
          :from="origin"
          :to="{ x: p.x, y: p.y }"
          stroke="var(--c-accent)"
          stroke-width="4.4"
          pointer-events="none"
        />
        <circle
          v-for="(p, i) in points"
          :key="`dot-${i}`"
          :cx="p.x"
          :cy="p.y"
          r="6.9"
          fill="var(--c-accent)"
        />
        <circle :cx="T.x" :cy="T.y" r="6.2" fill="var(--c-physics)" />
        <circle :cx="origin.x" :cy="origin.y" r="5.5" fill="var(--c-text)" />
      </svg>
      <ChartLabel
        :x-percent="pct(origin.x, VIEW.width)"
        :y-percent="pct((origin.y + T.y) / 2, VIEW.height)"
        :parts="[{ tex: 'F' }]"
        anchor="left"
        :dx="-10"
        color="var(--c-physics)"
        halo
      />
      <ChartLabel
        :x-percent="pct(rayEnd.x, VIEW.width)"
        :y-percent="pct(rayEnd.y, VIEW.height)"
        :parts="[{ text: '已知方向' }]"
        anchor="left"
        :dx="-10"
        :size="15"
        color="var(--c-text-dim)"
      />
      <ChartLabel
        :x-percent="pct((T.x + foot.x) / 2, VIEW.width)"
        :y-percent="pct((T.y + foot.y) / 2, VIEW.height)"
        :parts="[{ tex: 'F\\sin\\theta' }]"
        anchor="right"
        :dx="8"
        :size="16"
        color="var(--c-accent)"
        halo
      />
      <ChartLabel
        v-for="(p, i) in points"
        :key="`lbl-${i}`"
        :x-percent="pct((origin.x + p.x) / 2, VIEW.width)"
        :y-percent="pct((origin.y + p.y) / 2, VIEW.height)"
        :parts="[{ tex: 'F_1' }]"
        anchor="top-left"
        :dx="-4"
        :size="16"
        color="var(--c-accent)"
        halo
      />
      <ChartLabel
        :x-percent="pct(T.x + force2 * SCALE, VIEW.width)"
        :y-percent="pct(T.y, VIEW.height)"
        :parts="[{ tex: 'F_2' }]"
        anchor="top-left"
        :dx="6"
        :size="16"
        color="var(--c-accent-2)"
        halo
      />
    </div>

    <div class="demo-panel">
      <CourseSlider
        v-model="theta"
        :min="20"
        :max="70"
        :step="5"
        label-tex="\theta"
        label-width="2.5rem"
        aria-label="已知方向与合力的夹角"
      >
        <template #value><Latex :tex="thetaTex" /></template>
      </CourseSlider>
      <CourseSlider
        :model-value="force2"
        :min="0.5"
        :max="8"
        :step="0.05"
        label-tex="F_2"
        label-width="2.5rem"
        aria-label="已知大小的那个分力"
        @update:model-value="onForce2Input"
      >
        <template #value><Latex :tex="f2Tex" /></template>
      </CourseSlider>

      <div class="dec-critical">临界值：<Latex :tex="criticalTex" /></div>
      <div class="dec-verdict" :style="{ color: verdict.color }">{{ verdict.text }}</div>

      <div class="dec-cases">
        <div
          v-for="row in caseRows"
          :key="row.tex"
          class="dec-case-row"
          :class="{ 'dec-case-row-active': row.active }"
        >
          <span><Latex :tex="row.tex" /></span>
          <span class="dec-case-text">{{ row.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 左图右文走共享 .split-wide（比例在模板的 --cols 里）；控制行 / 面板走共享 .demo-* */

.dec-critical {
  color: var(--c-text-dim);
  font-size: 0.9rem;
}

.dec-verdict {
  font-weight: 700;
  font-size: 1.45rem;
  line-height: 1.3;
}

.dec-cases {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-top: 0.1rem;
}

.dec-case-row {
  display: grid;
  grid-template-columns: 8.6rem minmax(0, 1fr);
  gap: 0.5rem;
  align-items: baseline;

  color: var(--c-text-dim);

  font-size: 0.82rem;

  opacity: 0.5;

  transition: opacity 0.2s ease;
}

.dec-case-row-active {
  color: var(--c-text);
  opacity: 1;
}

.dec-case-text {
  white-space: nowrap;
}
</style>
