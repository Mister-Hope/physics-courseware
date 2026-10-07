<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 先后上抛双球相遇（第 ② 题）：A 先以 2v₀ 抛出（t = 0），Δt 后 B 以 v₀ 抛出（同一竖直线）。
 *
 * ── 物理 ── 取向上为正：h_A = 2v₀t − ½gt²（0 ≤ t ≤ 4v₀/g），h_B = v₀(t−Δt) − ½g(t−Δt)²（Δt ≤ t ≤ Δt + 2v₀/g）。
 * 两者加速度都是 −g ⇒ 相对加速度为 0，相对位移是 t 的一次函数： h_A − h_B = (v₀ − gΔt)·t + v₀Δt + ½gΔt² 令其为 0 得 t = (v₀Δt +
 * ½gΔt²)/(gΔt − v₀)（需要 gΔt > v₀ 才追得上）。 相遇还必须落在两人各自的飞行时间窗内：t ≤ Δt + 2v₀/g（B 还在空中）与 t ≤ 4v₀/g（A 还在空中）
 * ⇒ 2v₀/g < Δt < 4v₀/g。 B 的飞行时间 τ = t − Δt，B 在 τ = v₀/g 到最高点 ⇒ τ > v₀/g 时 B 正在下降， 代回可得 Δt <
 * (1+√3)v₀/g。
 *
 * ── 交互 ── 取 v₀ = 10 m/s、g = 10 m/s²，滑块只调 Δt；判据值（2 s、2.73 s、4 s）由公式实时算出。 两条抛物线只画各自的真实飞行区间（B 从 Δt
 * 开始画），避免"落地后还继续飞"的假曲线。
 */

const GRAVITY = 10;
const SPEED_B = 10; // B 的初速度，A 的是 2v₀
const SPEED_A = 2 * SPEED_B;
const DT_MIN = 1;
const DT_MAX = 4;
const DT_STEP = 0.02;

const { initialDt = 2.5 } = defineProps<{ initialDt?: number }>();

const dt = ref(initialDt);

/** A 的飞行时间 4v₀/g */
const tAEnd = (2 * SPEED_A) / GRAVITY;
/** B 的飞行时间 2v₀/g */
const tBFlight = (2 * SPEED_B) / GRAVITY;
/** 相遇下界 2v₀/g、上界 4v₀/g */
const meetLo = (2 * SPEED_B) / GRAVITY;
const meetHi = (2 * SPEED_A) / GRAVITY;
/** B 下降中相遇的上界 (1+√3)v₀/g */
const descendHi = ((1 + Math.sqrt(3)) * SPEED_B) / GRAVITY;

const denom = computed(() => GRAVITY * dt.value - SPEED_B);

/** 相遇时刻（相对运动一次方程的解） */
const tMeet = computed(() => {
  if (denom.value <= 1e-9) return Number.NaN;
  return (SPEED_B * dt.value + 0.5 * GRAVITY * dt.value * dt.value) / denom.value;
});

/** 相遇时 A、B 都还在空中 */
const inAir = computed(() => {
  const t = tMeet.value;
  if (!Number.isFinite(t)) return false;
  return t >= dt.value - 1e-9 && t <= tAEnd + 1e-9 && t <= dt.value + tBFlight + 1e-9;
});

const hMeet = computed(() =>
  inAir.value ? SPEED_A * tMeet.value - 0.5 * GRAVITY * tMeet.value * tMeet.value : Number.NaN,
);
/** 相遇时 B 已经飞了多久 */
const tauB = computed(() => (inAir.value ? tMeet.value - dt.value : Number.NaN));

const phase = computed(() => {
  if (!inAir.value) return "";
  const peak = SPEED_B / GRAVITY;
  if (tauB.value < peak - 1e-6) return "B 正在上升";
  if (tauB.value > peak + 1e-6) return "B 正在下降";
  return "B 恰在最高点";
});

const status = computed(() => {
  if (!inAir.value) return denom.value <= 0 ? "追不上：A 一直在 B 上方" : "不相遇：时间窗对不上";
  return `相遇（${phase.value}）`;
});

const sampling = (
  from: number,
  to: number,
  probe: (t: number) => number,
  count = 70,
): { x: number; y: number }[] =>
  Array.from({ length: count + 1 }, (_, i) => {
    const t = from + ((to - from) * i) / count;
    return { x: t, y: probe(t) };
  });

const curves = computed(() => [
  {
    points: sampling(0, tAEnd, (t) => SPEED_A * t - 0.5 * GRAVITY * t * t),
    stroke: "var(--c-accent)",
    width: 3.2,
  },
  {
    points: sampling(
      dt.value,
      dt.value + tBFlight,
      (t) => SPEED_B * (t - dt.value) - 0.5 * GRAVITY * (t - dt.value) ** 2,
    ),
    stroke: "var(--c-accent-2)",
    width: 3.2,
  },
]);

const labels = computed(() => {
  const tPeakB = dt.value + tBFlight;
  const out: Record<string, unknown>[] = [
    {
      x: SPEED_A / GRAVITY,
      y: (SPEED_A * SPEED_A) / (2 * GRAVITY),
      text: "A",
      anchor: "top-right",
      halo: true,
      color: "var(--c-accent)",
    },
    {
      x: tPeakB,
      y: 0,
      text: "B",
      anchor: "top-right",
      halo: true,
      color: "var(--c-accent-2)",
    },
  ];
  if (inAir.value) {
    out.push({
      x: tMeet.value,
      y: hMeet.value,
      tex: "\\text{相遇}",
      dot: 5,
      anchor: "top-right",
      halo: true,
      color: "var(--c-physics)",
    });
  }
  return out;
});
</script>

<template>
  <div class="am">
    <div class="am-plot">
      <CoordAxes
        :x-range="[0, 6.4]"
        :y-range="[0, 22]"
        :x-axis="{ quantity: 't', unit: 's' }"
        :y-axis="{ quantity: 'h', unit: 'm' }"
        :ticks="{ x: [1, 2, 3, 4, 5, 6], y: [5, 10, 15, 20] }"
        :curves="curves"
        :labels="labels"
        :view="{ width: 560, height: 360 }"
      />
    </div>
    <div class="am-side stack-tight">
      <div class="am-line">
        抛出间隔 <Latex tex="\Delta t" /> =
        <b class="text-accent">{{ dt.toFixed(2) }} <Latex tex="\text{s}" /></b>
      </div>
      <div class="am-line">
        <template v-if="inAir">
          相遇时刻 <Latex :tex="`t = ${tMeet.toFixed(2)}\\ \\text{s}`" />，高度
          <Latex :tex="`h = ${hMeet.toFixed(2)}\\ \\text{m}`" />
        </template>
        <template v-else>两球的时间窗没有交集，不会在空中相遇</template>
      </div>
      <div v-if="inAir" class="am-line">
        B 已经飞了 <Latex :tex="`\\tau = ${tauB.toFixed(2)}\\ \\text{s}`" />（到最高点要
        <Latex tex="v_0/g = 1\ \text{s}" />）⇒ {{ phase }}
      </div>
      <div class="am-badge" :class="{ 'am-badge-off': !inAir }">{{ status }}</div>
      <div class="am-rule">
        <span>相遇：<Latex tex="2\ \text{s} < \Delta t < 4\ \text{s}" /></span>
        <span>在 B 下降中相遇：<Latex tex="\Delta t < 2.73\ \text{s}" /></span>
      </div>
      <label class="am-slider">
        <span>调 <Latex tex="\Delta t" /></span>
        <input v-model.number="dt" type="range" :min="DT_MIN" :max="DT_MAX" :step="DT_STEP" />
      </label>
    </div>
  </div>
</template>

<style scoped>
.am {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 1.6rem;
  align-items: center;

  width: 100%;
}

.am-plot,
.am-side {
  min-width: 0;
}

.am-line {
  font-size: 0.95rem;
  line-height: 1.5;
}

.am-badge {
  align-self: flex-start;

  padding: 0.2rem 0.7rem;
  border: 1px solid var(--c-border-glow);
  border-radius: 999px;

  background: rgb(226 168 70 / 12%);
  color: var(--c-accent);

  font-weight: 700;
  font-size: 1rem;
}

.am-badge-off {
  border-color: rgb(248 113 113 / 45%);
  background: rgb(248 113 113 / 10%);
  color: var(--c-danger);
}

.am-rule {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  color: var(--c-text-dim);

  font-size: 0.82rem;
}

.am-slider {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.6rem;
  align-items: center;

  margin-top: 0.3rem;

  font-size: 0.9rem;
}

.am-slider input {
  min-width: 0;
  accent-color: var(--c-accent);
}
</style>
