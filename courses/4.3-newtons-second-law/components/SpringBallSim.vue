<script setup lang="ts">
// 第 15 页：轻质托盘弹簧小球下落的交互演示 —— 小球下落的同时，右侧真实地画出 v-t 图线。
// 小球运动全程由真实公式计算：g 取 10、自由下落高度 h 取 0.20、k/m 取 100（简谐角频率 ω 为 10）
//   ① 接触前：自由落体 v = gt
//   ② 接触后：ma = mg - kx，做简谐运动，v(τ) = v_contact cos ωτ + x_eq ω sin ωτ
//   ③ 回到弹簧原长（x = 0，弹力为零）时脱离托盘，做竖直上抛
// 这一页只做定性分析：图上不出现任何数字，底部读数也只给随阶段变化的定性说明
import { computed, onUnmounted, ref } from "vue";

const GRAVITY = 10;
const HEIGHT = 0.2;
const OMEGA = 10;
const X_EQ = GRAVITY / (OMEGA * OMEGA);
const V_CONTACT = Math.sqrt(2 * GRAVITY * HEIGHT);
/** 接触托盘时刻 */
const T_CONTACT = V_CONTACT / GRAVITY;
/** 脱离托盘（回到弹簧原长）时刻 */
const T_RELEASE = T_CONTACT + 4.0688879 / OMEGA;
/** 回到释放高度的时刻 */
const T_APEX = T_RELEASE + V_CONTACT / GRAVITY;
/** 接触托盘后 kx = mg（合力换向、加速度开始变小）的时刻 */
const T_FORCE_BALANCE = T_CONTACT + Math.atan((X_EQ * OMEGA) / V_CONTACT) / OMEGA;
/** 压缩到最低点（v = 0）的时刻：接触段前后半程对称 */
const T_LOWEST = T_CONTACT + (T_RELEASE - T_CONTACT) / 2;
/** 慢放倍率：真实全程 0.81 s，拉长到约 5 s 便于课堂观察 */
const SLOW_RATIO = 0.16;

/** 舞台几何（viewBox 用户单位） */
const GROUND_Y = 280;
const NATURAL_TOP = 160;
const SCALE = 200;
const BALL_RADIUS = 18;
const AXIS_X = 180;

const simTime = ref(0);
const playing = ref(false);
let frameId = 0;
let lastStamp = 0;
let elapsed = 0;

/** 当前状态：drop 为球相对释放点的位移，squash 为弹簧压缩量，v 与 a 向下为正 */
const phase = computed(() => {
  const timeNow = simTime.value;

  if (timeNow <= T_CONTACT) {
    return {
      drop: 0.5 * GRAVITY * timeNow * timeNow,
      squash: 0,
      v: GRAVITY * timeNow,
      a: GRAVITY,
      contact: false,
    };
  }

  if (timeNow <= T_RELEASE) {
    const tau = timeNow - T_CONTACT;
    const squash =
      X_EQ + (V_CONTACT / OMEGA) * Math.sin(OMEGA * tau) - X_EQ * Math.cos(OMEGA * tau);

    return {
      drop: HEIGHT + squash,
      squash,
      v: V_CONTACT * Math.cos(OMEGA * tau) + X_EQ * OMEGA * Math.sin(OMEGA * tau),
      a: GRAVITY - OMEGA * OMEGA * squash,
      contact: true,
    };
  }

  const afterRelease = timeNow - T_RELEASE;

  return {
    drop: HEIGHT - V_CONTACT * afterRelease + 0.5 * GRAVITY * afterRelease * afterRelease,
    squash: 0,
    v: -V_CONTACT + GRAVITY * afterRelease,
    a: GRAVITY,
    contact: false,
  };
});

const trayTop = computed(() => NATURAL_TOP + phase.value.squash * SCALE);
const ballY = computed(() =>
  phase.value.contact
    ? trayTop.value - BALL_RADIUS
    : NATURAL_TOP - BALL_RADIUS - (HEIGHT - phase.value.drop) * SCALE,
);

/** 弹簧：顶端接托盘下沿、底端落在地面，压缩时自动变短 */
const springPoints = computed(() => {
  const top = trayTop.value + 10;
  const bottom = GROUND_Y - 6;
  const span = bottom - top;
  const coils = 7;
  const points = [`${AXIS_X},${top}`];

  for (let index = 1; index < coils * 2; index++) {
    const y = top + (span * index) / (coils * 2);

    points.push(`${index % 2 === 0 ? AXIS_X - 15 : AXIS_X + 15},${y.toFixed(1)}`);
  }

  points.push(`${AXIS_X},${bottom}`);

  return points.join(" ");
});

/** 速度箭头：长度正比于速率，方向随速度正负翻转 */
const velocityArrow = computed(() => {
  const { v: speedNow } = phase.value;
  const arrowLength = Math.min(72, Math.abs(speedNow) * 32);

  if (arrowLength < 8) return null;

  return {
    from: { x: AXIS_X, y: ballY.value },
    to: { x: AXIS_X, y: ballY.value + (speedNow > 0 ? arrowLength : -arrowLength) },
  };
});

const speedAt = (time: number): number => {
  if (time <= T_CONTACT) return GRAVITY * time;

  if (time <= T_RELEASE) {
    const tau = time - T_CONTACT;

    return V_CONTACT * Math.cos(OMEGA * tau) + X_EQ * OMEGA * Math.sin(OMEGA * tau);
  }

  return -V_CONTACT + GRAVITY * (time - T_RELEASE);
};

/** 已走过的部分：随演示推进而变长 */
const trace = computed(() => {
  const count = Math.max(1, Math.ceil((simTime.value / T_APEX) * 160));

  return Array.from({ length: count + 1 }, (_, index) => {
    const time = (T_APEX * index) / count;

    return { x: time, y: speedAt(time) };
  });
});

// 只画"已经走过"的图线：全过程不给提示，小球落到哪、图线就画到哪；
// 再用两条虚线把接触托盘的拐点（v 的正向最大值）对到 v 轴与 t 轴上——虚线会被裁在绘图区内，正好只落在图里
const curves = computed(() => {
  const guides = [
    {
      points: [
        { x: 0, y: V_CONTACT },
        { x: T_CONTACT, y: V_CONTACT },
      ],
      stroke: "var(--c-text-dim)",
      width: 1.6,
      dashed: true,
    },
    {
      points: [
        { x: T_CONTACT, y: 0 },
        { x: T_CONTACT, y: V_CONTACT },
      ],
      stroke: "var(--c-text-dim)",
      width: 1.6,
      dashed: true,
    },
  ];
  const traced =
    simTime.value > 0.01
      ? [{ points: trace.value, stroke: "var(--c-accent)", width: 3.5, dashed: false }]
      : [];

  return [...traced, ...guides];
});

/** 底部读数：按 simTime 落在哪一段给定性说明，只讲趋势、不出现任何数字 */
const phaseNote = computed<{ text?: string; tex?: string }[]>(() => {
  const timeNow = simTime.value;

  if (timeNow <= T_CONTACT) {
    return [
      { text: "只受重力，" },
      { tex: "a = g" },
      { text: " 不变，" },
      { tex: "v" },
      { text: " 向下均匀增大" },
    ];
  }

  if (timeNow <= T_FORCE_BALANCE)
    return [{ text: "合力仍向下但在减小，" }, { tex: "v" }, { text: " 继续增大" }];

  if (timeNow <= T_LOWEST) return [{ text: "合力向上，" }, { tex: "v" }, { text: " 开始减小" }];

  if (timeNow <= T_RELEASE) return [{ tex: "v" }, { text: " 向上，先增大后减小" }];

  return [{ text: "只受重力，" }, { tex: "v" }, { text: " 向上均匀减小" }];
});

const dotLabel = computed(() => [
  { x: simTime.value, y: phase.value.v, dot: 6, dotColor: "var(--c-accent-2)" },
]);

const step = (now: number): void => {
  const delta = Math.min(0.05, (now - lastStamp) / 1000);

  lastStamp = now;
  elapsed += delta;
  simTime.value = Math.min(T_APEX, elapsed * SLOW_RATIO);

  if (simTime.value >= T_APEX) {
    playing.value = false;

    return;
  }

  frameId = requestAnimationFrame(step);
};

const play = (): void => {
  if (playing.value) return;

  cancelAnimationFrame(frameId);
  elapsed = 0;
  simTime.value = 0;
  playing.value = true;
  lastStamp = performance.now();
  frameId = requestAnimationFrame(step);
};

onUnmounted(() => cancelAnimationFrame(frameId));
</script>

<template>
  <div class="sim">
    <div class="sim-bar">
      <button class="sim-btn" type="button" @click="play">
        {{ playing ? "演示中…" : simTime > 0 ? "重新演示" : "开始演示" }}
      </button>
      <div class="sim-readout">
        <span class="sim-note">
          <template v-for="(part, index) in phaseNote" :key="index">
            <Latex v-if="part.tex" :tex="part.tex" />
            <span v-else>{{ part.text }}</span>
          </template>
        </span>
        <span class="mini-note">向下为正</span>
      </div>
    </div>
    <div class="sim-main">
      <div class="sim-stage">
        <svg
          viewBox="0 0 360 320"
          width="100%"
          style="max-width: 380px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <SurfaceHatch
            :from="{ x: 12, y: GROUND_Y }"
            :to="{ x: 348, y: GROUND_Y }"
            side="below"
            color="#64748b"
            :line-width="2"
            :thickness="10"
            :gap="18"
          />
          <line
            x1="60"
            y1="120"
            x2="300"
            y2="120"
            stroke="rgba(148,163,184,0.45)"
            stroke-width="1.2"
            stroke-dasharray="6 6"
          />
          <text x="304" y="124" font-size="12" fill="#94a3b8">释放点</text>
          <line
            x1="60"
            y1="160"
            x2="300"
            y2="160"
            stroke="rgba(148,163,184,0.28)"
            stroke-width="1.2"
            stroke-dasharray="6 6"
          />
          <text x="304" y="164" font-size="12" fill="#94a3b8">弹簧原长</text>
          <rect
            x="164"
            y="272"
            width="32"
            height="8"
            rx="2"
            fill="rgba(148,163,184,0.35)"
            stroke="rgba(148,163,184,0.6)"
            stroke-width="1"
          />
          <polyline
            :points="springPoints"
            fill="none"
            stroke="#e2a846"
            stroke-width="2.6"
            stroke-linejoin="round"
            stroke-linecap="round"
          />
          <rect
            x="135"
            :y="trayTop"
            width="90"
            height="10"
            rx="3"
            fill="rgba(148,163,184,0.28)"
            stroke="rgba(203,213,225,0.7)"
            stroke-width="1.3"
          />
          <text x="252" :y="trayTop + 9" font-size="12" fill="#94a3b8">轻质托盘</text>
          <text x="222" y="252" font-size="12" fill="#e2a846">轻弹簧</text>
          <CourseArrow
            v-if="velocityArrow"
            :from="velocityArrow.from"
            :to="velocityArrow.to"
            stroke="#60a5fa"
            :stroke-width="3"
            label="v"
          />
          <circle
            :cx="AXIS_X"
            :cy="ballY"
            :r="BALL_RADIUS"
            fill="rgba(96,165,250,0.35)"
            stroke="#60a5fa"
            stroke-width="2"
          />
          <text
            :x="AXIS_X"
            :y="ballY + 6"
            font-size="15"
            fill="#f1f5f9"
            text-anchor="middle"
            font-family="KaTeX_Math"
            font-style="italic"
          >
            m
          </text>
          <CourseArrow
            :from="{ x: AXIS_X, y: ballY }"
            :to="{ x: AXIS_X, y: ballY + 60 }"
            stroke="#f87171"
            :stroke-width="2.6"
            label="G"
            :label-dx="-14"
          />
        </svg>
      </div>
      <div class="sim-plot">
        <CoordAxes
          :x-range="[0, 0.88]"
          :y-range="[-2.5, 2.9]"
          :x-axis="{ quantity: 't', unit: 's' }"
          :y-axis="{ quantity: 'v', unit: '(m/s)' }"
          :ticks="{ x: [], y: [] }"
          :curves="curves"
          :labels="dotLabel"
          :view="{ width: 620, height: 470 }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sim {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 0.6rem;

  min-height: 0;
}

.sim-main {
  display: grid;
  flex: 1 1 auto;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.8rem;
  align-items: center;

  min-height: 0;
}

.sim-stage,
.sim-plot {
  display: flex;
  justify-content: center;
  min-width: 0;
}

.sim-bar {
  display: flex;
  gap: 1.4rem;
  align-items: center;
  justify-content: center;
}

.sim-btn {
  padding: 0.5rem 1.5rem;
  border: 1px solid var(--c-border-glow);
  border-radius: var(--radius-md);

  background: var(--c-surface);
  color: var(--c-accent);

  font-weight: 700;
  font-size: 1.05rem;

  cursor: pointer;

  transition: all 0.25s ease;
}

.sim-btn:hover {
  border-color: rgb(226 168 70 / 45%);
  background: rgb(30 41 59 / 85%);
}

.sim-readout {
  display: flex;
  gap: 1.2rem;
  align-items: baseline;

  color: var(--c-text);

  font-size: 1rem;
}
</style>
