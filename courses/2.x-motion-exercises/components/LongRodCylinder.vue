<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";

/**
 * 长杆穿筒（第 ① 题）——本课的"着重做的动画"。
 *
 * ── 尺度（老师要求：用真实尺度）── 筒长 l = 0.3 m、杆长 L = 0.6 m、杆下端到筒上端 H = 0.5 m。 真实尺度下自由落体是"一闪而过"的：筒固定时穿筒只要 0.21
 * s、整体 0.53 s——这才像自由落体； 常速播放就是真实快慢，课堂上需要看清过程时再点"慢放 ×8"。
 *
 * ── 场景（老师要求重画）── 筒**不放地上**：由铁架台的侧面夹子夹在空中（筒底离地 1.35 m）， 杆穿完筒后仍在地面之上。地面 + 桌子 + 柜子 +
 * 铁架台一起画出来充当"大地"参照物： **以杆为参考系时杆不动，整个大地整体向上加速 g**（位移 ½gt²），而筒相对杆以 v₀ 匀速上升——
 * 匀速与"加速上升"两种运动直接同屏对比。杆画细（8 用户单位，屏幕上约 7px）。
 *
 * ── 物理 ── ① 筒固定：杆下端到达筒上端 t₁ = √(2H/g) ≈ 0.32 s；杆上端离开筒下端时杆下落 H+L+l， t₂ = √(2(H+L+l)/g) ≈ 0.53
 * s，穿筒时间 Δt = t₂ − t₁ ≈ 0.21 s。 ② 筒上抛：h₁ = ½gt²、h₂ = v₀t − ½gt²，两者加速度同为 g ⇒ 相对加速度 0、相对位移 X = h₁+h₂
 * = v₀t； 完全穿出要求 X = H+L+l ⇒ t = (H+L+l)/v₀。成立条件：筒不能落回抛出点以下，t ≤ 2v₀/g ⇒ v₀ ≥ √(g(H+L+l)/2) ≈ 2.65
 * m/s（滑块允许调低并给红字提示）。 ③ 以杆为参考系：杆不动，筒以 v₀ 匀速上升（X = v₀t），地面/桌子/柜子/铁架台整体加速上升。
 *
 * ── 交互 ── 三个模式切换 + 释放/暂停/重放 + 慢放 ×8。按钮与滑块都是"点它一下就该动"的直接交互（@click）， 不占翻页的点击步；一条
 * requestAnimationFrame 时间轴驱动全部物体，位置全部由公式实时算。
 */

const GRAVITY = 10;
/** 杆下端到筒上端的高度 H（m） */
const H_GAP = 0.5;
/** 杆长 L（m） */
const ROD_LEN = 0.6;
/** 筒长 l（m） */
const CYL_LEN = 0.3;
/** 完全穿出所需的相对位移 H+L+l */
const TARGET = H_GAP + ROD_LEN + CYL_LEN;
const SLOW_FACTOR = 8;

/** SVG 画布与边距（viewBox 用户单位） */
const VB_W = 300;
const VB_H = 380;
const PAD = 24;
/** 杆、筒、铁架台的中轴线（viewBox 用户单位） */
const AXIS_X = 150;
/** 世界坐标窗口（m）：地面 0 在内；以杆为参考系时筒顶最高到 3.05 m */
const Y_MIN = -0.15;
const Y_MAX = 3.2;
/** 筒底初始高度（m） */
const CYL_BOTTOM0 = 1.35;
/** 桌面高、柜子高（m）：大地的参照物 */
const TABLE_H = 0.55;
const CABINET_H = 0.45;
/** 杆下端初始高度：筒顶再往上 H */
const ROD_LOWER0 = CYL_BOTTOM0 + CYL_LEN + H_GAP;

type Mode = "fixed" | "thrown" | "rod";

const { initialMode = "thrown" } = defineProps<{ initialMode?: Mode }>();

const mode = ref<Mode>(initialMode);
const v0 = ref(3);
const elapsed = ref(0);
const running = ref(false);
const slow = ref(true);

/** 筒固定：杆下端到达筒上端 */
const tEnter = Math.sqrt((2 * H_GAP) / GRAVITY);
/** 筒固定：杆上端离开筒下端（穿完） */
const tPass = Math.sqrt((2 * TARGET) / GRAVITY);
/** 筒固定时的穿筒时间 */
const dtFixed = tPass - tEnter;

/** 一步公式给出的时间 t = (H+L+l)/v₀ */
const tRelative = computed<number>(() => TARGET / v0.value);
/** 筒的飞行时间 2v₀/g：一步公式要求 tRelative ≤ 2v₀/g */
const tFlight = computed<number>(() => (2 * v0.value) / GRAVITY);
const valid = computed<boolean>(() => tRelative.value <= tFlight.value + 1e-9);
/** 本模式动画要跑多久（参数越界时跑到筒落回抛出点为止） */
const duration = computed<number>(() =>
  mode.value === "fixed" ? tPass : valid.value ? tRelative.value : tFlight.value,
);

let frame = 0;
let lastTs = 0;
const stopFrame = (): void => {
  if (frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
};

const tick = (nowMs: number): void => {
  if (!lastTs) lastTs = nowMs;
  const step = Math.min((nowMs - lastTs) / 1000, 0.05);
  lastTs = nowMs;
  elapsed.value += step / (slow.value ? SLOW_FACTOR : 1);
  if (elapsed.value >= duration.value) {
    elapsed.value = duration.value;
    running.value = false;
    frame = 0;
    return;
  }
  frame = requestAnimationFrame(tick);
};

const play = (): void => {
  stopFrame();
  if (elapsed.value >= duration.value) elapsed.value = 0;
  running.value = true;
  lastTs = 0;
  frame = requestAnimationFrame(tick);
};

const toggleRun = (): void => {
  if (running.value) {
    stopFrame();
    running.value = false;
  } else {
    play();
  }
};

const setMode = (nextMode: Mode): void => {
  mode.value = nextMode;
};

watch([mode, v0], () => {
  stopFrame();
  running.value = false;
  elapsed.value = 0;
});

onUnmounted(stopFrame);

/** 当前时刻的几何（世界坐标，单位 m，向上为正） */
const scene = computed(() => {
  const t = elapsed.value;
  /** 杆自由下落的位移 ½gt² */
  const fallH = 0.5 * GRAVITY * t * t;
  /** 筒上升的高度 v₀t − ½gt²（筒固定时为 0） */
  const riseH = mode.value === "fixed" ? 0 : v0.value * t - 0.5 * GRAVITY * t * t;
  /** 相对位移 X = h₁ + h₂ = v₀t */
  const x = fallH + riseH;
  /** 以杆为参考系时：地面、桌子、柜子、铁架台整体上升 ½gt² */
  const groundShift = mode.value === "rod" ? fallH : 0;
  const cylBottom = mode.value === "fixed" ? CYL_BOTTOM0 : CYL_BOTTOM0 + x;
  const rodLower = mode.value === "rod" ? ROD_LOWER0 : ROD_LOWER0 - fallH;
  return {
    fallH,
    riseH,
    x,
    groundShift,
    cylBottom,
    cylTop: cylBottom + CYL_LEN,
    rodLower,
    rodUpper: rodLower + ROD_LEN,
  };
});

/** 世界坐标 → SVG 像素（viewBox 用户单位） */
const draw = computed(() => {
  const view = scene.value;
  const k = (VB_H - 2 * PAD) / (Y_MAX - Y_MIN);
  const toY = (y: number): number => PAD + (Y_MAX - y) * k;
  const groundY = toY(view.groundShift);
  const cylTopY = toY(view.cylTop);
  const cylBottomY = toY(view.cylBottom);
  const rodTopY = toY(view.rodUpper);
  const rodBottomY = toY(view.rodLower);
  return {
    view,
    groundY,
    tableTopY: toY(view.groundShift + TABLE_H),
    tableLeftX: AXIS_X - 92,
    tableRightX: AXIS_X - 34,
    tableLegY: groundY,
    cabinetTopY: toY(view.groundShift + CABINET_H),
    cabinetX: 22,
    cabinetW: 32,
    postX: AXIS_X - 26,
    postTopY: toY(view.groundShift + 1.95),
    clampY: (cylTopY + cylBottomY) / 2,
    wallLeftX: AXIS_X - 9,
    wallRightX: AXIS_X + 9,
    rodX: AXIS_X - 4,
    rodW: 8,
    rodTopY,
    rodH: Math.max(3, rodBottomY - rodTopY),
    cylTopY,
    cylBottomY,
    dimTopY: toY(view.cylTop),
    dimBottomY: toY(ROD_LOWER0),
    launchY: toY(CYL_BOTTOM0),
    velX: AXIS_X + 42,
  };
});

const pct = computed<number>(() => Math.min(100, (scene.value.x / TARGET) * 100));

const formulaTex = computed<string>(() => {
  if (mode.value === "fixed") return String.raw`h_1 = \tfrac{1}{2}gt^2`;
  if (mode.value === "thrown") return "h_1 + h_2 = v_0 t";
  return "X = v_0 t";
});

const done = computed<boolean>(() => elapsed.value >= duration.value - 1e-9);
</script>

<template>
  <div class="lrc">
    <div class="lrc-stage">
      <svg :viewBox="`0 0 ${VB_W} ${VB_H}`" xmlns="http://www.w3.org/2000/svg" class="lrc-svg">
        <rect
          x="4"
          y="4"
          width="292"
          height="372"
          rx="14"
          fill="rgba(148,163,184,0.05)"
          stroke="rgba(148,163,184,0.16)"
        />
        <line
          x1="24"
          :y1="draw.dimBottomY"
          x2="276"
          :y2="draw.dimBottomY"
          stroke="#94a3b8"
          stroke-width="1"
          stroke-dasharray="5 6"
          opacity="0.45"
        />
        <line
          x1="24"
          :y1="draw.dimTopY"
          x2="276"
          :y2="draw.dimTopY"
          stroke="#94a3b8"
          stroke-width="1"
          stroke-dasharray="5 6"
          opacity="0.45"
        />
        <line
          x1="46"
          :y1="draw.dimBottomY"
          x2="46"
          :y2="draw.dimTopY"
          stroke="#94a3b8"
          stroke-width="1.2"
          opacity="0.7"
        />
        <line
          x1="40"
          :y1="draw.dimBottomY"
          x2="52"
          :y2="draw.dimBottomY"
          stroke="#94a3b8"
          stroke-width="1.6"
          opacity="0.85"
        />
        <line
          x1="40"
          :y1="draw.dimTopY"
          x2="52"
          :y2="draw.dimTopY"
          stroke="#94a3b8"
          stroke-width="1.6"
          opacity="0.85"
        />
        <text
          x="38"
          :y="(draw.dimTopY + draw.dimBottomY) / 2 + 5"
          font-size="16"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="#e2a846"
          text-anchor="end"
        >
          H
        </text>
        <line
          x1="12"
          :y1="draw.groundY"
          x2="288"
          :y2="draw.groundY"
          stroke="#64748b"
          stroke-width="2"
        />
        <line
          x1="30"
          :y1="draw.groundY + 3"
          x2="40"
          :y2="draw.groundY + 13"
          stroke="#64748b"
          stroke-width="1.2"
          opacity="0.6"
        />
        <line
          x1="90"
          :y1="draw.groundY + 3"
          x2="100"
          :y2="draw.groundY + 13"
          stroke="#64748b"
          stroke-width="1.2"
          opacity="0.6"
        />
        <line
          x1="170"
          :y1="draw.groundY + 3"
          x2="180"
          :y2="draw.groundY + 13"
          stroke="#64748b"
          stroke-width="1.2"
          opacity="0.6"
        />
        <line
          x1="250"
          :y1="draw.groundY + 3"
          x2="260"
          :y2="draw.groundY + 13"
          stroke="#64748b"
          stroke-width="1.2"
          opacity="0.6"
        />
        <rect
          :x="draw.cabinetX"
          :y="draw.cabinetTopY"
          :width="draw.cabinetW"
          :height="Math.max(4, draw.groundY - draw.cabinetTopY)"
          rx="2"
          fill="#475569"
          opacity="0.9"
        />
        <line
          :x1="draw.tableLeftX"
          :y1="draw.tableTopY"
          :x2="draw.tableRightX"
          :y2="draw.tableTopY"
          stroke="#64748b"
          stroke-width="3"
          stroke-linecap="round"
        />
        <line
          :x1="draw.tableLeftX + 10"
          :y1="draw.tableTopY"
          :x2="draw.tableLeftX + 10"
          :y2="draw.tableLegY"
          stroke="#64748b"
          stroke-width="2"
          opacity="0.85"
        />
        <line
          :x1="draw.tableRightX - 10"
          :y1="draw.tableTopY"
          :x2="draw.tableRightX - 10"
          :y2="draw.tableLegY"
          stroke="#64748b"
          stroke-width="2"
          opacity="0.85"
        />
        <line
          :x1="draw.postX"
          :y1="draw.groundY"
          :x2="draw.postX"
          :y2="draw.postTopY"
          stroke="#94a3b8"
          stroke-width="3.4"
          stroke-linecap="round"
        />
        <line
          :x1="draw.postX - 13"
          :y1="draw.groundY"
          :x2="draw.postX + 13"
          :y2="draw.groundY"
          stroke="#94a3b8"
          stroke-width="3.4"
          stroke-linecap="round"
        />
        <line
          :x1="draw.postX"
          :y1="draw.clampY"
          :x2="draw.wallLeftX"
          :y2="draw.clampY"
          stroke="#94a3b8"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <line
          :x1="draw.wallLeftX"
          :y1="draw.clampY - 5"
          :x2="draw.wallLeftX"
          :y2="draw.clampY + 5"
          stroke="#94a3b8"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <template v-if="mode !== 'fixed'">
          <CourseArrow
            :from="{ x: draw.velX, y: draw.launchY - 3 }"
            :to="{ x: draw.velX, y: draw.launchY - 40 }"
            stroke="#60a5fa"
            stroke-width="2.6"
          />
          <text
            :x="draw.velX"
            :y="draw.launchY - 48"
            font-size="15"
            font-family="KaTeX_Math"
            font-style="italic"
            fill="#60a5fa"
            text-anchor="middle"
          >
            v
            <tspan font-size="11" font-family="KaTeX_Main" font-style="normal" dy="3">0</tspan>
          </text>
        </template>
        <rect
          :x="draw.rodX"
          :y="draw.rodTopY"
          :width="draw.rodW"
          :height="draw.rodH"
          rx="2"
          fill="#e2a846"
          opacity="0.92"
        />
        <text
          :x="draw.rodX + draw.rodW + 10"
          :y="draw.rodTopY + draw.rodH / 2 + 5"
          font-size="16"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="#e2a846"
        >
          L
        </text>
        <line
          :x1="draw.wallLeftX"
          :y1="draw.cylTopY"
          :x2="draw.wallLeftX"
          :y2="draw.cylBottomY"
          stroke="#60a5fa"
          stroke-width="2.6"
          stroke-linecap="round"
          opacity="0.95"
        />
        <line
          :x1="draw.wallRightX"
          :y1="draw.cylTopY"
          :x2="draw.wallRightX"
          :y2="draw.cylBottomY"
          stroke="#60a5fa"
          stroke-width="2.6"
          stroke-linecap="round"
          opacity="0.95"
        />
        <text
          :x="draw.wallRightX + 10"
          :y="(draw.cylTopY + draw.cylBottomY) / 2 + 5"
          font-size="16"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="#60a5fa"
        >
          l
        </text>
      </svg>
    </div>
    <div class="lrc-side">
      <div class="lrc-head">
        <div class="lrc-tabs">
          <button type="button" :class="{ 'lrc-on': mode === 'fixed' }" @click="setMode('fixed')">
            筒固定
          </button>
          <button type="button" :class="{ 'lrc-on': mode === 'thrown' }" @click="setMode('thrown')">
            筒上抛
          </button>
          <button type="button" :class="{ 'lrc-on': mode === 'rod' }" @click="setMode('rod')">
            以杆为参考系
          </button>
        </div>
        <button type="button" class="lrc-play" @click="toggleRun">
          <mdi-pause v-if="running" />
          <mdi-replay v-else-if="done" />
          <mdi-play v-else />
          <span>{{ running ? "暂停" : done ? "重放" : "释放" }}</span>
        </button>
        <button type="button" class="lrc-slow" :class="{ 'lrc-on': slow }" @click="slow = !slow">
          慢放 <Latex tex="\times 8" />
        </button>
      </div>
      <div class="lrc-formula">
        <Latex :tex="formulaTex" />
        <span v-if="mode !== 'fixed'" class="lrc-dim"
          >（成立条件 <Latex tex="t \le 2v_0/g" />）</span
        >
        <span v-if="mode === 'rod'" class="lrc-dim">杆不动，地面相对杆向上加速</span>
      </div>
      <div class="lrc-grid">
        <div class="lrc-cell">
          <span>经历时间 <Latex tex="t" /></span>
          <b><Latex :tex="`${elapsed.toFixed(2)}\\ \\text{s}`" /></b>
        </div>
        <div v-if="mode !== 'rod'" class="lrc-cell">
          <span>杆下落 <Latex tex="h_1" /></span>
          <b><Latex :tex="`${scene.fallH.toFixed(2)}\\ \\text{m}`" /></b>
        </div>
        <div v-else class="lrc-cell">
          <span>地面上升 <Latex tex="\tfrac{1}{2}gt^2" /></span>
          <b><Latex :tex="`${scene.groundShift.toFixed(2)}\\ \\text{m}`" /></b>
        </div>
        <div v-if="mode === 'thrown'" class="lrc-cell">
          <span>筒上升 <Latex tex="h_2" /></span>
          <b><Latex :tex="`${scene.riseH.toFixed(2)}\\ \\text{m}`" /></b>
        </div>
        <div class="lrc-cell">
          <span>相对位移 <Latex tex="X" /></span>
          <b class="text-accent"><Latex :tex="`${scene.x.toFixed(2)}\\ \\text{m}`" /></b>
        </div>
      </div>
      <div class="lrc-bar-row">
        <div class="lrc-bar">
          <div class="lrc-bar-fill" :style="{ width: `${pct}%` }" />
        </div>
        <span class="lrc-dim">目标 <Latex tex="X = H+L+l = 1.4\ \text{m}" /></span>
      </div>
      <div v-if="mode === 'fixed'" class="lrc-concl">
        <Latex :tex="`t_1 = ${tEnter.toFixed(2)}\\ \\text{s}`" />（杆下端到筒上端）、
        <Latex :tex="`t_2 = ${tPass.toFixed(2)}\\ \\text{s}`" />（杆上端离开筒下端）⇒
        <Latex :tex="`\\Delta t = ${dtFixed.toFixed(2)}\\ \\text{s}`" />
      </div>
      <div v-else class="lrc-concl">
        <Latex :tex="`t = \\frac{H + L + l}{v_0} = ${tRelative.toFixed(2)}\\ \\text{s}`" />
      </div>
      <label v-if="mode !== 'fixed'" class="lrc-slider">
        <span>筒的初速度 <Latex tex="v_0" /></span>
        <input v-model.number="v0" type="range" min="2" max="6" step="0.1" />
        <b class="text-accent"><Latex :tex="`${v0.toFixed(1)}\\ \\text{m/s}`" /></b>
      </label>
      <div v-if="mode !== 'fixed' && !valid" class="lrc-warn">
        筒在杆穿完前就落回抛出点以下（<Latex tex="t > 2v_0/g" />），一步公式不再成立
      </div>
    </div>
  </div>
</template>

<style scoped>
.lrc {
  display: grid;
  grid-template-columns: 270px minmax(0, 1fr);
  gap: 1.5rem;
  align-items: center;

  width: 100%;
}

.lrc-stage {
  width: 270px;
  min-width: 0;
}

.lrc-svg {
  display: block;
  width: 100%;
  height: auto;
}

.lrc-side {
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  min-width: 0;
}

.lrc-head {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.lrc-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.lrc-tabs button,
.lrc-slow,
.lrc-play {
  display: inline-flex;
  gap: 0.35rem;
  align-items: center;

  padding: 0.22rem 0.7rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  background: rgb(148 163 184 / 8%);
  color: var(--c-text-dim);

  font-size: 0.88rem;

  cursor: pointer;
}

.lrc-tabs button.lrc-on,
.lrc-slow.lrc-on {
  border-color: var(--c-border-glow);
  background: rgb(226 168 70 / 14%);
  color: var(--c-accent);
}

.lrc-play {
  border-color: rgb(45 212 191 / 45%);
  background: rgb(45 212 191 / 12%);
  color: var(--c-physics);
  font-weight: 700;
}

.lrc-formula {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: baseline;

  font-size: 1.05rem;
}

.lrc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
  gap: 0.4rem;
}

.lrc-cell {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  padding: 0.22rem 0.45rem;
  border: 1px solid var(--c-border);
  border-radius: 0.55rem;

  background: rgb(148 163 184 / 6%);

  font-size: 0.72rem;
}

.lrc-cell span {
  color: var(--c-text-dim);
}

.lrc-cell b {
  font-size: 0.9rem;
}

.lrc-bar-row {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.lrc-bar {
  flex: 1 1 auto;

  overflow: hidden;

  height: 0.5rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  background: rgb(148 163 184 / 10%);
}

.lrc-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--c-accent-2), var(--c-accent));
}

.lrc-dim {
  flex: 0 0 auto;
  color: var(--c-text-dim);
  font-size: 0.82rem;
}

.lrc-concl {
  font-size: 0.92rem;
  line-height: 1.45;
}

.lrc-slider {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 0.6rem;
  align-items: center;

  font-size: 0.9rem;
}

.lrc-slider input {
  min-width: 0;
  accent-color: var(--c-accent);
}

.lrc-warn {
  color: var(--c-danger);
  font-size: 0.88rem;
}
</style>
