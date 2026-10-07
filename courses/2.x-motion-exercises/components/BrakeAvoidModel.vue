<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 三车避碰（第 ④ 题）——老师确认的车序：**丙在最前、乙在中间、甲在最后**，相邻车距均为 d = 5 m， 速度分别为 v丙 = 6、v乙 = 8、v甲 = 9 m/s；甲车以 a甲 = 1
 * m/s² 制动（给定），乙、丙同时开始制动。 求乙、丙制动加速度要满足的条件：滑块分别调 a乙、a丙，图上看相邻两车的 x–t 轨迹会不会相交。
 *
 * ── 物理 ── 每辆车按 x = x₀ + v₀t − ½at² 运动，速度减到 0 后**停在原地、不倒车**： t_stop = v₀/a，t > t_stop 时 x 取
 * v₀²/(2a) 处的停车位置。 相邻两车安全 ⇔ 后车追上前车之前，相对速度已经减到 0（临界＝速度相等时恰好接触）： 后车必须比前车多制动
 * (Δv)²/(2d)。**反过来也成立**：后车若刹得比前车狠太多，相对速度反而变大， 前车会被后车追上——所以这是"上下两条界线"，本题的坑正在这里（见课件"刹车陷阱"页）。
 *
 * ── 交互 ── 两个滑块就是"乙、丙各刹多狠"；车距用真实公式扫描 + 二分细化首次相撞时刻，车距越过 0 即判追尾。
 */

/** 相邻车距（m） */
const GAP = 5;
/** 三车初位置：丙最前（10 m）、乙居中（5 m）、甲最后（0 m） */
const POS_C = 2 * GAP;
const POS_B = GAP;
const POS_A = 0;
/** 三车初速度（m/s）：丙 6、乙 8、甲 9 */
const V_C = 6;
const V_B = 8;
const V_A = 9;
/** 甲车的制动加速度（题目给定） */
const BRAKE_A = 1;
const BRAKE_MIN = 0.1;
const BRAKE_MAX = 1.2;
const BRAKE_STEP = 0.05;
/** 图的时间量程（s） */
const T_MAX = 10;
const T_SCAN = 60;
const STEPS = 3000;

const brakeB = ref(0.5);
const brakeC = ref(0.2);

// 匀减速位移：速度减到 0 后停在原地、不倒车（t_stop = v/a）
const position = (x0: number, v: number, a: number, t: number): number => {
  const tUsed = Math.min(t, v / a);
  return x0 + v * tUsed - 0.5 * a * tUsed * tUsed;
};

const posA = (t: number): number => position(POS_A, V_A, BRAKE_A, t);
const posB = (t: number): number => position(POS_B, V_B, brakeB.value, t);
const posC = (t: number): number => position(POS_C, V_C, brakeC.value, t);

/** 三车的刹停时间（刹车陷阱那一页要用） */
const stopA = V_A / BRAKE_A;
const stopB = computed<number>(() => V_B / brakeB.value);
const stopC = computed<number>(() => V_C / brakeC.value);

// 前车 − 后车的车距；返回最小值与首次越过 0 的时刻
const gapInfo = (
  rear: (t: number) => number,
  front: (t: number) => number,
): { min: number; hit: number } => {
  let min = Number.POSITIVE_INFINITY;
  let crossFrom = Number.NaN;
  let crossTo = Number.NaN;
  let prevT = 0;
  let prevG = front(0) - rear(0);
  for (let i = 1; i <= STEPS; i += 1) {
    const t = (T_SCAN * i) / STEPS;
    const g = front(t) - rear(t);
    if (g < min) min = g;
    if (Number.isNaN(crossFrom) && g < 0 && prevG >= 0) {
      crossFrom = prevT;
      crossTo = t;
    }
    prevT = t;
    prevG = g;
  }
  let hit = Number.NaN;
  if (!Number.isNaN(crossFrom)) {
    let lowT = crossFrom;
    let highT = crossTo;
    for (let k = 0; k < 40; k += 1) {
      const mid = (lowT + highT) / 2;
      if (front(mid) - rear(mid) >= 0) lowT = mid;
      else highT = mid;
    }
    hit = (lowT + highT) / 2;
  }
  return { min, hit };
};

/** 甲–乙（乙在前）与乙–丙（丙在前） */
const gapBA = computed(() => gapInfo(posA, posB));
const gapCB = computed(() => gapInfo(posB, posC));

const crashText = computed<string>(() => {
  if (gapBA.value.hit > 0) return `甲追尾乙：t ≈ ${gapBA.value.hit.toFixed(2)} s`;
  if (gapCB.value.hit > 0) return `乙追尾丙：t ≈ ${gapCB.value.hit.toFixed(2)} s`;
  return "全程安全，没有追尾";
});

const sampling = (valueAt: (t: number) => number): { x: number; y: number }[] =>
  Array.from({ length: 121 }, (_, i) => ({ x: (T_MAX * i) / 120, y: valueAt((T_MAX * i) / 120) }));

const curves = computed(() => [
  { points: sampling(posA), stroke: "var(--c-accent)", width: 3.2 },
  { points: sampling(posB), stroke: "var(--c-accent-2)", width: 3.2 },
  { points: sampling(posC), stroke: "var(--c-physics)", width: 3.2 },
]);

/** 三条曲线挨得很近，名字不写在图上（会互相压住）；只在追尾时刻标一个点 */
const labels = computed(() => {
  const out: Record<string, unknown>[] = [];
  if (gapCB.value.hit > 0) {
    out.push({
      x: gapCB.value.hit,
      y: posB(gapCB.value.hit),
      tex: String.raw`\text{追尾}`,
      dot: 5,
      anchor: "top-right",
      halo: true,
      color: "var(--c-danger)",
    });
  } else if (gapBA.value.hit > 0) {
    out.push({
      x: gapBA.value.hit,
      y: posA(gapBA.value.hit),
      tex: String.raw`\text{追尾}`,
      dot: 5,
      anchor: "top-right",
      halo: true,
      color: "var(--c-danger)",
    });
  }
  return out;
});

const fmtGap = (gap: number, hit: number): string =>
  hit > 0 ? `已在 t ≈ ${hit.toFixed(2)} s 撞上` : `${gap.toFixed(2)} m`;
</script>

<template>
  <div class="ba">
    <div class="ba-plot">
      <CoordAxes
        :x-range="[0, T_MAX]"
        :y-range="[0, 75]"
        :x-axis="{ quantity: 't', unit: 's' }"
        :y-axis="{ quantity: 'x', unit: 'm' }"
        :ticks="{ x: [2, 4, 6, 8], y: [20, 40, 60] }"
        :curves="curves"
        :labels="labels"
        :view="{ width: 520, height: 460 }"
      />
    </div>
    <div class="ba-side stack-tight">
      <div class="ba-line">
        <b class="ba-c-c">丙</b>（最前）<Latex tex="6\ \text{m/s}" /> ｜
        <b class="ba-c-b">乙</b>（中间） <Latex tex="8\ \text{m/s}" /> ｜
        <b class="ba-c-a">甲</b>（最后）<Latex tex="9\ \text{m/s}" />
      </div>
      <div class="ba-line">
        甲以 <Latex tex="a_\text{甲} = 1\ \text{m/s}^2" /> 制动（给定）｜ 刹停：甲
        <Latex :tex="`${stopA.toFixed(1)}\\ \\text{s}`" />、乙
        <Latex :tex="`${stopB.toFixed(1)}\\ \\text{s}`" />、丙
        <Latex :tex="`${stopC.toFixed(1)}\\ \\text{s}`" />
      </div>
      <div class="ba-line">
        <b class="ba-c-a">甲</b>–<b class="ba-c-b">乙</b>最近车距：<b
          :class="gapBA.hit > 0 ? 'ba-bad' : 'ba-ok'"
          >{{ fmtGap(gapBA.min, gapBA.hit) }}</b
        >
      </div>
      <div class="ba-line">
        <b class="ba-c-b">乙</b>–<b class="ba-c-c">丙</b>最近车距：<b
          :class="gapCB.hit > 0 ? 'ba-bad' : 'ba-ok'"
          >{{ fmtGap(gapCB.min, gapCB.hit) }}</b
        >
      </div>
      <div class="ba-badge" :class="{ 'ba-badge-off': gapBA.hit <= 0 && gapCB.hit <= 0 }">
        {{ crashText }}
      </div>
      <label class="ba-slider">
        <span><b class="ba-c-b">乙</b>的制动 <Latex tex="a_\text{乙}" /></span>
        <input
          v-model.number="brakeB"
          type="range"
          :min="BRAKE_MIN"
          :max="BRAKE_MAX"
          :step="BRAKE_STEP"
        />
        <b class="text-accent-2"><Latex :tex="`${brakeB.toFixed(2)}\\ \\text{m/s}^2`" /></b>
      </label>
      <label class="ba-slider">
        <span><b class="ba-c-c">丙</b>的制动 <Latex tex="a_\text{丙}" /></span>
        <input
          v-model.number="brakeC"
          type="range"
          :min="BRAKE_MIN"
          :max="BRAKE_MAX"
          :step="BRAKE_STEP"
        />
        <b class="text-accent-2"><Latex :tex="`${brakeC.toFixed(2)}\\ \\text{m/s}^2`" /></b>
      </label>
    </div>
  </div>
</template>

<style scoped>
.ba {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: center;

  width: 100%;
}

.ba-plot,
.ba-side {
  min-width: 0;
}

.ba-line {
  font-size: 0.95rem;
  line-height: 1.5;
}

.ba-bad {
  color: var(--c-danger);
}

.ba-ok {
  color: var(--c-accent);
}

.ba-c-a {
  color: var(--c-accent);
}

.ba-c-b {
  color: var(--c-accent-2);
}

.ba-c-c {
  color: var(--c-physics);
}

.ba-badge {
  align-self: flex-start;

  padding: 0.2rem 0.7rem;
  border: 1px solid var(--c-border-glow);
  border-radius: 999px;

  background: rgb(226 168 70 / 12%);
  color: var(--c-accent);

  font-weight: 700;
  font-size: 0.95rem;
}

.ba-badge-off {
  border-color: rgb(248 113 113 / 45%);
  background: rgb(248 113 113 / 10%);
  color: var(--c-danger);
}

.ba-slider {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 0.6rem;
  align-items: center;

  font-size: 0.9rem;
}

.ba-slider input {
  min-width: 0;
  accent-color: var(--c-accent);
}
</style>
