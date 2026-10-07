<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 追及相遇次数（第 ③ 题）：甲车从原点出发、初速度 v₀、加速度 a₁；乙车在正前方 d 处由静止起步、加速度 a₂。
 *
 * ── 物理 ── x甲 = v₀t + ½a₁t²，x乙 = d + ½a₂t²；相遇 ⇔ ½(a₂−a₁)t² − v₀t + d = 0， 判别式 Δ = v₀² −
 * 2(a₂−a₁)d。注意「方程有实根」≠「真的相遇过」：还要检查根 t > 0 （甲车出发时在乙后方，只有正根才是追上的时刻）。两根为正 ⇔ a₁ < a₂（韦达： t₁+t₂ =
 * 2v₀/(a₂−a₁) > 0、t₁t₂ = 2d/(a₂−a₁) > 0）。
 *
 * ── 交互 ── 滑块只调 a₁（a₂ = 3 m/s²、v₀ = 4 m/s、d = 4 m 都是题目给定的）， a₁ 的两条分界是 a₁ = a₂ − v₀²/(2d) = 1（相切，1
 * 次）与 a₁ = a₂ = 3（方程退化为一次，1 次）。 a₁ ≥ 0 保证甲车不停车，曲线不会出现「倒车」，与实际位移一致。
 *
 * ── 图 ── 时间/位置量程固定（0–5 s、0–45 m），滑块只让两条曲线动；a₂ 取得较大，乙的弯曲更明显。
 */

const SPEED_A = 4;
const START_GAP = 4;
const ACCEL_B = 3;
const T_MAX = 5;
const X_MAX = 45;
const A1_MIN = 0;
const A1_MAX = 4;
const A1_STEP = 0.025;
const SAMPLES = 90;

const accelA = ref(1.5);

/** 二次项系数 ½(a₂−a₁) */
const quad = computed(() => 0.5 * (ACCEL_B - accelA.value));
/** 判别式 Δ = v₀² − 2(a₂−a₁)d */
const disc = computed(() => SPEED_A * SPEED_A - 2 * (ACCEL_B - accelA.value) * START_GAP);
/** 相切分界 a₁* = a₂ − v₀²/(2d) */
const tangent = computed(() => ACCEL_B - (SPEED_A * SPEED_A) / (2 * START_GAP));

/** 方程的全部实根（不做正负筛选） */
const roots = computed<number[]>(() => {
  if (Math.abs(quad.value) < 1e-12) return [START_GAP / SPEED_A];
  if (disc.value < 0) return [];
  const sqrtDisc = Math.sqrt(disc.value);
  const r1 = (SPEED_A - sqrtDisc) / (2 * quad.value);
  const r2 = (SPEED_A + sqrtDisc) / (2 * quad.value);
  return [r1, r2].sort((x, y) => x - y);
});

/** 真正发生过的相遇：t > 0 的根 */
const hits = computed(() => roots.value.filter((t) => t > 1e-9));
const hitCount = computed(() => hits.value.length);

const regime = computed(() => {
  if (hitCount.value === 0) return "相遇 0 次";
  if (hitCount.value >= 2) return "相遇 2 次";
  return Math.abs(disc.value) < 1e-9 ? "相遇 1 次（相切）" : "相遇 1 次";
});

const discText = computed(() => {
  if (disc.value > 1e-9) return "Δ > 0 ⇒ 两个不等实根";
  if (disc.value < -1e-9) return "Δ < 0 ⇒ 无实根";
  return "Δ = 0 ⇒ 两个相等实根";
});

const fmt = (value: number): string => value.toFixed(2);

/** 实根的 LaTeX（含负根，照实显示） */
const rootTex = computed(() => {
  if (roots.value.length === 0) return "";
  if (roots.value.length === 1) return `t = ${fmt(roots.value[0])}\\ \\text{s}`;
  return `t_1 = ${fmt(roots.value[0])}\\ \\text{s},\\quad t_2 = ${fmt(roots.value[1])}\\ \\text{s}`;
});

/** 正根的个数说明（数学上的根 ≠ 真的追上过） */
const rootNote = computed(() => {
  if (roots.value.length === 0) return "方程无实根，永不相遇";
  if (hits.value.length === 0) return "两根都不为正，出发前就已错过";
  if (roots.value.length === 1) return "唯一的根为正，相遇 1 次";
  return hits.value.length === 2 ? "两根都为正，两次相遇" : "只有一根为正，相遇 1 次";
});

const sampling = (probe: (t: number) => number): { x: number; y: number }[] =>
  Array.from({ length: SAMPLES + 1 }, (_, i) => {
    const t = (i / SAMPLES) * T_MAX;
    return { x: t, y: probe(t) };
  });

const curves = computed(() => [
  {
    points: sampling((t) => SPEED_A * t + 0.5 * accelA.value * t * t),
    stroke: "var(--c-accent)",
    width: 3.2,
  },
  {
    points: sampling((t) => START_GAP + 0.5 * ACCEL_B * t * t),
    stroke: "var(--c-accent-2)",
    width: 3.2,
  },
]);

const labels = computed(() => {
  const out: Record<string, unknown>[] = [];
  const tJia = 3.6;
  const tYi = 0.7;
  out.push(
    {
      x: tJia,
      y: SPEED_A * tJia + 0.5 * accelA.value * tJia * tJia,
      text: "甲",
      anchor: "top-right",
      halo: true,
      color: "var(--c-accent)",
    },
    {
      x: tYi,
      y: START_GAP + 0.5 * ACCEL_B * tYi * tYi,
      text: "乙",
      anchor: "bottom-left",
      halo: true,
      color: "var(--c-accent-2)",
    },
  );
  hits.value.slice(0, 2).forEach((t, i) => {
    if (t > T_MAX) return;
    out.push({
      x: t,
      y: SPEED_A * t + 0.5 * accelA.value * t * t,
      tex: i === 0 ? "t_1" : "t_2",
      dot: 5,
      anchor: "top-right",
      halo: true,
      color: "var(--c-physics)",
    });
  });
  return out;
});

/**
 * 区间条上的位置（百分比）
 *
 * @param v 加速度值
 * @returns 该值在区间条上的百分比位置
 */
const pct = (v: number): number => ((v - A1_MIN) / (A1_MAX - A1_MIN)) * 100;
</script>

<template>
  <div class="mc">
    <div class="mc-plot">
      <CoordAxes
        :x-range="[0, T_MAX]"
        :y-range="[0, X_MAX]"
        :x-axis="{ quantity: 't', unit: 's' }"
        :y-axis="{ quantity: 'x', unit: 'm' }"
        :ticks="{ x: [1, 2, 3, 4], y: [10, 20, 30, 40] }"
        :curves="curves"
        :labels="labels"
        :view="{ width: 520, height: 450 }"
      />
    </div>
    <div class="mc-side stack-tight">
      <div class="mc-line">
        <Latex tex="\Delta = v_0^2 - 2(a_2 - a_1)d" /> =
        <b class="text-accent">{{ disc.toFixed(2) }}</b>
      </div>
      <div class="mc-line mc-dim">{{ discText }}</div>
      <div class="mc-line">
        <template v-if="rootTex"><Latex :tex="rootTex" /></template>
        <span v-else class="mc-dim">方程无实根</span>
        <span class="mc-dim"> · {{ rootNote }}</span>
      </div>
      <div class="mc-badge">{{ regime }}</div>
      <div class="mc-zones">
        <div class="mc-zone mc-z0" :style="{ width: `${pct(tangent)}%` }">0 次</div>
        <div class="mc-zone mc-z2" :style="{ width: `${pct(ACCEL_B) - pct(tangent)}%` }">2 次</div>
        <div class="mc-zone mc-z1" :style="{ width: `${100 - pct(ACCEL_B)}%` }">1 次</div>
        <div class="mc-marker" :style="{ left: `${pct(accelA)}%` }" />
      </div>
      <div class="mc-scale">
        <span class="mc-tick" :style="{ left: `${pct(tangent)}%` }">
          <Latex tex="a_1 = a_2 - \dfrac{v_0^2}{2d} = 1" />
        </span>
        <span class="mc-tick" :style="{ left: `${pct(ACCEL_B)}%` }">
          <Latex tex="a_1 = a_2 = 3" />
        </span>
      </div>
      <label class="mc-slider">
        <span>调甲的加速度 <Latex tex="a_1" /></span>
        <input v-model.number="accelA" type="range" :min="A1_MIN" :max="A1_MAX" :step="A1_STEP" />
        <b class="text-accent">{{ accelA.toFixed(3) }} <Latex tex="\text{m/s}^2" /></b>
      </label>
    </div>
  </div>
</template>

<style scoped>
.mc {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 1.6rem;
  align-items: center;

  width: 100%;
}

.mc-plot,
.mc-side {
  min-width: 0;
}

.mc-line {
  font-size: 0.95rem;
  line-height: 1.45;
}

.mc-dim {
  color: var(--c-text-dim);
  font-size: 0.85rem;
}

.mc-badge {
  align-self: flex-start;

  padding: 0.2rem 0.7rem;
  border: 1px solid var(--c-border-glow);
  border-radius: 999px;

  background: rgb(226 168 70 / 12%);
  color: var(--c-accent);

  font-weight: 700;
  font-size: 1rem;
}

.mc-zones {
  position: relative;

  display: flex;

  overflow: hidden;

  height: 1.45rem;
  margin-top: 0.75rem;
  border: 1px solid var(--c-border);
  border-radius: 0.5rem;
}

.mc-zone {
  display: flex;
  align-items: center;
  justify-content: center;

  color: #0b1020;

  font-weight: 700;
  font-size: 0.72rem;
}

.mc-z0 {
  background: rgb(148 163 184 / 55%);
}

.mc-z2 {
  background: rgb(45 212 191 / 70%);
}

.mc-z1 {
  background: rgb(226 168 70 / 75%);
}

.mc-marker {
  position: absolute;
  top: -0.18rem;
  bottom: -0.18rem;

  width: 3px;
  margin-left: -1.5px;
  border-radius: 2px;

  background: #f1f5f9;
  box-shadow: 0 0 6px rgb(241 245 249 / 70%);
}

.mc-scale {
  position: relative;
  height: 1.1rem;
  font-size: 0.72rem;
}

.mc-tick {
  position: absolute;
  top: 0;

  color: var(--c-text-dim);

  white-space: nowrap;

  transform: translateX(-50%);
}

.mc-slider {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 0.6rem;
  align-items: center;

  margin-top: 0.4rem;

  font-size: 0.9rem;
}

.mc-slider input {
  min-width: 0;
  accent-color: var(--c-accent);
}
</style>
