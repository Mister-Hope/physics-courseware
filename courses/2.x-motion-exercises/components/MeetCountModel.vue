<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 追及相遇次数（第 ③ 题）：甲车从原点出发、初速度 v₀、加速度 a₁；乙车在正前方 d 处由静止起步、加速度 a₂。
 *
 * ── 物理 ── x甲 = v₀t + ½a₁t²，x乙 = d + ½a₂t²；相遇 ⇔ ½(a₂−a₁)t² − v₀t + d = 0，判别式 Δ = v₀² −
 * 2(a₂−a₁)d。「方程有实根」≠「真的相遇过」：还要检查根 t > 0（甲车出发时在乙后方，只有正根才是追上的时刻）。 两根为正 ⇔ a₁ < a₂（韦达）。两条分界：相切线 a₁ = a₂
 * − v₀²/(2d) 与退化线 a₁ = a₂。
 *
 * ── 设置（本页只定性，不给数据）── v₀ = 6、d = 5、a₂ = 5、滑杆 a₁ ∈ [0, 6]、默认 2.5： 默认时两交点都在画面里（t₁ ≈ 1.1 s、t₂ ≈ 3.7
 * s，x 分别约占画面 1/6 与 5/6）， 且乙的加速度是甲的两倍，两条抛物线曲率差明显；相切线 a₁* = 1.4 落在滑杆约 1/4 处， 0 次 / 2 次 / 1
 * 次三个区域都够宽。a₁ 靠近 a₂ 时第二个交点必然越出画面（t₂ → ∞ 是物理事实）， 此时图上只显示 t₁ 并附一行定性说明，不做成"消失得很莫名"。
 */

const SPEED_A = 6;
const START_GAP = 5;
const ACCEL_B = 5;
const T_MAX = 5;
const X_MAX = 47;
const A1_MIN = 0;
const A1_MAX = 6;
const A1_STEP = 0.025;
const SAMPLES = 90;

const accelA = ref(2.5);

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

/** 第二个交点是否还在画面里（t 与 x 都在窗口内） */
const secondInFrame = computed(() => {
  const [, t2] = hits.value;
  if (t2 === void 0) return false;
  const x2 = SPEED_A * t2 + 0.5 * accelA.value * t2 * t2;
  return t2 <= T_MAX && x2 <= X_MAX;
});

const regime = computed(() => {
  if (hitCount.value === 0) return "相遇 0 次";
  if (hitCount.value >= 2) return "相遇 2 次";
  return Math.abs(disc.value) < 1e-9 ? "相遇 1 次（相切）" : "相遇 1 次";
});

/** 一行定性说明：交点为什么是这个个数、在哪 */
const situationKind = computed<"none" | "tangent" | "degenerate" | "beyond" | "two">(() => {
  if (hitCount.value === 0) return "none";
  if (Math.abs(disc.value) < 1e-9) return "tangent";
  if (quad.value <= 0) return "degenerate";
  if (hitCount.value >= 2 && !secondInFrame.value) return "beyond";
  return "two";
});

const sampling = (probe: (t: number) => number): { x: number; y: number }[] =>
  Array.from({ length: SAMPLES + 1 }, (_, i) => {
    const t = (i / SAMPLES) * T_MAX;
    return { x: t, y: probe(t) };
  });

/** 交点向两轴作的虚线垂线（只在交点仍在画面里时画） */
const guides = computed(() => {
  const out: Record<string, unknown>[] = [];
  for (const t of hits.value.slice(0, 2)) {
    const y = SPEED_A * t + 0.5 * accelA.value * t * t;
    if (t > T_MAX || y > X_MAX) continue;
    out.push(
      {
        points: [
          [t, 0],
          [t, y],
        ],
        dashed: "4 4",
        stroke: "var(--c-text-dim)",
        width: 1.4,
        opacity: 0.85,
      },
      {
        points: [
          [0, y],
          [t, y],
        ],
        dashed: "4 4",
        stroke: "var(--c-text-dim)",
        width: 1.4,
        opacity: 0.85,
      },
    );
  }
  return out;
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
  ...guides.value,
]);

const labels = computed(() => {
  const out: Record<string, unknown>[] = [];
  const tJia = 3;
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
    const x = SPEED_A * t + 0.5 * accelA.value * t * t;
    if (t > T_MAX || x > X_MAX) return;
    out.push({
      x: t,
      y: x,
      tex: i === 0 ? "t_1" : "t_2",
      dot: 5,
      anchor: i === 0 ? "top-right" : "top-left",
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
        :ticks="{ x: [], y: [] }"
        :curves="curves"
        :labels="labels"
        :view="{ width: 520, height: 420 }"
      />
    </div>
    <div class="mc-side stack-tight">
      <div class="mc-line">
        <Latex tex="\Delta = v_0^2 - 2(a_2 - a_1)d" />
      </div>
      <div class="mc-line mc-dim">
        <template v-if="situationKind === 'none'">
          <Latex tex="\Delta < 0" />：方程无实根，永不相遇
        </template>
        <template v-else-if="situationKind === 'tangent'">
          <Latex tex="\Delta = 0" />：相切，两交点重合为一点
        </template>
        <template v-else-if="situationKind === 'degenerate'">
          只剩一个正根（另一根为负，在出发前）：恰好相遇一次
        </template>
        <template v-else-if="situationKind === 'beyond'">
          第二个交点 <Latex tex="t_2" /> 在画面外：离 <Latex tex="a_1 = a_2" /> 越近它越远
        </template>
        <template v-else>
          两个根 <Latex tex="t_1,\ t_2" /> 都为正：追上一次，再被反超一次
        </template>
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
          <Latex tex="a_1 = a_2 - \dfrac{v_0^2}{2d}" />
        </span>
        <span class="mc-tick" :style="{ left: `${pct(ACCEL_B)}%` }">
          <Latex tex="a_1 = a_2" />
        </span>
      </div>
      <label class="mc-slider">
        <span>调甲的加速度 <Latex tex="a_1" /></span>
        <input v-model.number="accelA" type="range" :min="A1_MIN" :max="A1_MAX" :step="A1_STEP" />
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

  background: var(--c-accent-soft);
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
  border-radius: var(--radius-sm);
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
  border-radius: var(--radius-sm);

  background: var(--c-text);
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
  grid-template-columns: auto minmax(0, 1fr);
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
