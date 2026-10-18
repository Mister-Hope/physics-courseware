<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 11 页交互（机车启动）：额定功率 P = 60 kW、阻力 F_阻 = 1800 N（教材例题 2 数据），质量 m = 1500 kg。 阶段一以恒定加速度 a 启动：牵引力 F =
 * ma + F_阻 恒定，实际功率 P实 = Fv 随 v 增大； P实 涨到额定功率后转入阶段二（恒定功率行驶，教材练习 7 的情景）：F = P/v 随 v 增大而减小、 a = (F −
 * F_阻)/m 随之减小，最终 a → 0、v → v_max = P/F_阻。 阶段二的 v(t) 按牛顿第二定律逐小段时间步进真实计算（dv/dt = (P/v − F_阻)/m）。
 */
const M = 1500; // 汽车质量（kg）
const F_FRICTION = 1800; // 行驶阻力（N）
const P_RATED = 60_000; // 额定功率（W）
const T_MAX = 45; // 横轴时长（s）
const V_MAX = P_RATED / F_FRICTION; // 最大速度 P/F_阻 ≈ 33.3 m/s
const DT = 0.02; // 阶段二积分步长（s）
const CURVE_STEP = 0.5; // 曲线采样间隔（s）

/** 阶段一的恒定加速度（m/s²） */
const accel = ref(1.5);
/** 当前时刻（s） */
const time = ref(16);

/** 换挡时刻：实际功率涨到额定功率的那一刻（牵引力、速度、时刻） */
const switchInfo = computed(() => {
  const f1 = M * accel.value + F_FRICTION;
  const v1 = P_RATED / f1;
  return { f1, v1, t1: v1 / accel.value };
});

/** 阶段二的 v(t)：从 (t1, v1) 起按 dv/dt = (P/v − F_阻)/m 逐小步积分 */
const vCurve = computed<{ x: number; y: number }[]>(() => {
  const { v1, t1 } = switchInfo.value;
  const points: { x: number; y: number }[] = [];
  let v = v1;
  let integrated = 0;
  const total = Math.round(T_MAX / CURVE_STEP);
  for (let i = 0; i <= total; i += 1) {
    const t = i * CURVE_STEP;
    if (t <= t1) {
      v = accel.value * t;
    } else {
      const target = Math.round((t - t1) / DT);
      for (; integrated < target; integrated += 1) 
        v += ((P_RATED / v - F_FRICTION) / M) * DT;
      
    }
    points.push({ x: t, y: Number(v.toFixed(3)) });
  }
  return points;
});

/** 时刻 t 的运动状态：v、F、P实、a（阶段一闭式，阶段二用上面的积分） */
const cur = computed(() => {
  const t = time.value;
  const { f1, v1, t1 } = switchInfo.value;
  if (t <= t1) {
    const v = accel.value * t;
    return { phase: 1 as const, v, f: f1, p: f1 * v, a: accel.value };
  }
  const v = vCurve.value[Math.round(t / CURVE_STEP)]?.y ?? v1;
  const f = P_RATED / v;
  return { phase: 2 as const, v, f, p: P_RATED, a: (f - F_FRICTION) / M };
});

const curves = computed(() => [
  { points: vCurve.value, stroke: "var(--c-accent)", width: 3.2 },
  {
    points: [
      { x: 0, y: V_MAX },
      { x: T_MAX, y: V_MAX },
    ],
    stroke: "var(--c-physics)",
    width: 2,
    dashed: "8 6",
  },
]);

const labels = computed(() => [
  {
    x: time.value,
    y: cur.value.v,
    tex: "v",
    dot: 6,
    halo: true,
    anchor: "top-left" as const,
    dx: 8,
    dy: -4,
  },
  {
    x: switchInfo.value.t1,
    y: switchInfo.value.v1,
    tex: "v_{1}",
    dot: 5,
    dotColor: "var(--c-accent-2)",
    color: "var(--c-accent-2)",
    anchor: "bottom-right" as const,
    dx: 6,
    dy: 4,
  },
  {
    x: T_MAX,
    y: V_MAX,
    tex: "v_{\\max}",
    color: "var(--c-physics)",
    anchor: "left" as const,
    dx: -6,
    dy: -8,
  },
]);

const vText = computed(() => cur.value.v.toFixed(1));
const fText = computed(() => cur.value.f.toFixed(0));
const pText = computed(() => (cur.value.p / 1000).toFixed(1));
const aText = computed(() => cur.value.a.toFixed(2));
</script>

<template>
  <div class="csl">
    <CoordAxes
      class="csl-fig"
      :x-range="[0, T_MAX]"
      :y-range="[0, 36]"
      :x-axis="{ quantity: 't', unit: 's' }"
      :y-axis="{ quantity: 'v', unit: 'm/s' }"
      :ticks="{ x: [10, 20, 30, 40], y: [10, 20, 30] }"
      :view="{ width: 600, height: 230 }"
      :curves="curves"
      :labels="labels"
    />
    <div class="csl-panel">
      <div class="csl-head">
        <span><Latex tex="P = 60\ \text{kW}" />　<Latex tex="F_{\text{阻}} = 1800\ \text{N}" /></span>
        <span class="csl-phase" :class="cur.phase === 1 ? 'csl-p1' : 'csl-p2'">
          {{ cur.phase === 1 ? "阶段一：恒定加速度" : "阶段二：恒定功率" }}
        </span>
      </div>
      <CourseSlider
        v-model="accel"
        :min="0.8"
        :max="2.5"
        :step="0.1"
        label="阶段一加速度"
        label-tex="a"
        label-width="6.6rem"
        layout="tight"
      >
        <template #value>{{ accel.toFixed(1) }}<Latex tex="\ \text{m/s}^2" /></template>
      </CourseSlider>
      <CourseSlider
        v-model="time"
        :min="0"
        :max="45"
        :step="0.5"
        label="时刻"
        label-tex="t"
        label-width="6.6rem"
        layout="tight"
        accent="blue"
      >
        <template #value>{{ time }}<Latex tex="\ \text{s}" /></template>
      </CourseSlider>
      <div class="csl-grid">
        <div class="csl-row">
          <Latex tex="v" /> = <b>{{ vText }}</b> <Latex tex="\text{m/s}" />
        </div>
        <div class="csl-row">
          <Latex tex="F" /> = <b>{{ fText }}</b> <Latex tex="\text{N}" />
        </div>
        <div class="csl-row">
          <Latex tex="a" /> = <b>{{ aText }}</b> <Latex tex="\text{m/s}^2" />
        </div>
        <div class="csl-row">
          <Latex tex="P_{\text{实}}" /> = <b>{{ pText }}</b> <Latex tex="\text{kW}" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.csl {
  display: flex;
  gap: 1.3rem;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.csl-fig {
  flex: 0 0 56%;
  min-width: 0;
}

.csl-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 0;
  font-size: 0.95rem;
}

.csl-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 0.5rem;

  color: var(--c-text-dim);
}

.csl-phase {
  padding: 0.1rem 0.7rem;
  border-radius: 999px;
  font-size: 0.88rem;
  white-space: nowrap;
}

.csl-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.2rem 0.9rem;
}

.csl-p1 {
  background: var(--c-accent-2-soft);
  color: var(--c-accent-2);
}

.csl-p2 {
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.csl-row {
  padding-top: 0.3rem;
  border-top: 1px solid var(--c-border);
  font-size: 1.02rem;
}

.csl-row b {
  color: var(--c-accent);
  font-size: 1.12rem;
  font-variant-numeric: tabular-nums;
}
</style>
