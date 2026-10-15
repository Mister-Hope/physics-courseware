<!--
  第 8 页全页交互：回旋加速器的结构与工作过程（俯视）
  —— 两个 D 形盒 + 窄缝（缝里闪一下就是一次加速，标 +qU）+ 匀强磁场（盒内裸 × 铺满）
      · 点「加速」：粒子从 A 出发，一条条半径递增的半圆依次画出，到 r = R 停
      · 拖动 B / U 滑块会重置演示（改参数＝另一次实验）
  真实计算（computed，全部随滑块变化）：
      E_k,max = q²B²R²/(2m)、n = E_k,max/(qU)、r_n = mv_n/(qB) = √(2mnqU)/(qB)、T/2 = πm/(qB)
  两个教学点：
      ① 每次过缝总是获得 qU 的能量、半径按 √n 增大；
      ② U 只改变「半径增长快慢与圈数（n）」、**不改变过缝的时间间隔**——节拍由 B 决定（T/2 读数与节拍条都不随 U 变）。
  画法说明：真实机器要过缝几百次（默认 599 次），逐条画出来会糊成一团；
  这里按 r_k = R·√(k/K) 画出 K 条（K ∝ 1/U，6～36 条），形状与真实轨迹同族，
  K 条中的第 k 条对应的真实加速次数 n_k = n·k/K——读数给的始终是真实值。
  螺旋的构造：最外那条半圆以盒心为圆心、半径 = 盒半径 R（两端点落在缝线上的盒边界处），其余半圆由它向前反向逐条拼接（共用缝线上的端点、圆心都在缝线上、
  半径由内向外按 r_k = R·√(k/K) 递增），整条链向盒心收拢 —— 视觉上居中，不会一侧顶死、一侧空一大截；粒子沿这条链的弧长参数方程推进。
  版面：图在左、控件在右（页面给的是 max-w-[700px] 的窄框，横向排布最省高度）。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";

const M_P = 1.67e-27; // 质子质量 kg
const Q_P = 1.6e-19; // 质子电荷量 C
const R_DEE = 0.5; // D 形盒半径 m
const J_PER_MEV = 1.6e-13; // 1 MeV = 1.6×10⁻¹³ J

/** 磁感应强度 B（T）、加速电压 U（kV） */
const b = ref(0.5);
const u = ref(5);

/** 最大动能 E_k,max = q²B²R²/(2m)（J） */
const ekMax = computed(() => (Q_P * Q_P * b.value * b.value * R_DEE * R_DEE) / (2 * M_P));
/** 加速次数 n = E_k,max/(qU)：U 越大、需要的过缝次数越少（∝ 1/U） */
const nTotal = computed(() => Math.max(1, Math.round(ekMax.value / (Q_P * u.value * 1e3))));
/** 半周期 T/2 = πm/(qB)（s）：只由 B 与粒子本身决定，与 U 无关 */
const halfT = computed(() => (Math.PI * M_P) / (Q_P * b.value));
/** 画出的半圆条数：按 n ∝ 1/U 的关系压缩到 6～36 条 */
const arcCount = computed(() => Math.min(36, Math.max(6, Math.round(60 / u.value))));
/** 每次过缝的屏幕节拍（ms）：∝ 1/B，与 U 无关 */
const beatMs = computed(() => Math.min(400, Math.max(110, 200 * (0.5 / b.value))));

/* ── 画布几何（俯视，x 向右、y 向下）── */
const CX = 200;
const CY = 210;
const RP = 155; // D 形盒半径在画布上的长度
const GAP = 7; // 缝隙半宽
const DEE_LEFT = `M ${CX - GAP} ${CY - RP} A ${RP} ${RP} 0 0 0 ${CX - GAP} ${CY + RP} Z`;
const DEE_RIGHT = `M ${CX + GAP} ${CY - RP} A ${RP} ${RP} 0 0 1 ${CX + GAP} ${CY + RP} Z`;
// 磁场阵列：教师反馈太密（原 18×18 / spacing 18）→ 拉开到 10×10 / spacing 32，只保留方向感
const DOTS = { x: CX - RP + 8, y: CY - RP + 8, cols: 11, rows: 11, spacing: 32 };

/**
 * 螺旋轨迹：第 k 条半圆半径 r_k = R·√(k/K)、圆心都落在缝线上。
 *
 * 从最外那条半圆开始构造：它必须以盒心为圆心、半径 = 盒半径 R，于是两个端点就是缝线与盒边界的交点（相对盒心 ±R）。其余半圆由它向前反向逐条拼接 ——
 * 相邻两条共用缝线上的同一个端点、圆心取该直径的中点（必在缝线上）、左右交替；半径由内向外递增，所以整条链向盒心收拢，视觉上居中， 不会像「从盒心正向逐条画」那样单向漂移、把最外圈顶在盒子一侧。
 */
const geom = computed(() => {
  const K = arcCount.value;
  const radius = (k: number): number => RP * Math.sqrt(k / K);
  /** 端点偏移 us[k]：第 k 条半圆末端（缝线上）相对盒心的偏移，向上为负、向下为正 */
  const us = Array.from({ length: K + 1 }, () => 0);
  us[K] = RP; // 最外那条半圆的两个端点：缝线上的盒边界处
  for (let k = K; k >= 1; k -= 1) {
    // 半圆左右交替：与最外那条同一侧的一半取 u_{k-1} = u_k − 2r_k，另一半取 +
    const dr = 2 * radius(k);
    us[k - 1] = (us[k] ?? 0) + (k % 2 === K % 2 ? -dr : dr);
  }
  return { K, us, rs: Array.from({ length: K }, (_, i) => radius(i + 1)) };
});

/* ── 播放：requestAnimationFrame 推进「已画出的半圆条数」── */
const progress = ref(0);
const playing = ref(false);
let rafId = 0;
let lastTs = 0;

const step = (now: number): void => {
  const dt = lastTs ? now - lastTs : 0;
  lastTs = now;
  progress.value = Math.min(geom.value.K, progress.value + dt / beatMs.value);
  if (progress.value >= geom.value.K) {
    playing.value = false;
    rafId = 0;
    return;
  }
  rafId = requestAnimationFrame(step);
};

const pause = (): void => {
  playing.value = false;
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
  lastTs = 0;
};

const play = (): void => {
  if (progress.value >= geom.value.K) progress.value = 0;
  pause();
  playing.value = true;
  rafId = requestAnimationFrame(step);
};

const toggle = (): void => {
  if (playing.value) pause();
  else play();
};

const playLabel = computed(() => {
  if (progress.value >= geom.value.K) return "重来";
  if (playing.value) return "暂停";
  return progress.value > 0 ? "继续" : "加速";
});

watch([b, u], () => {
  pause();
  progress.value = 0;
});

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
});

/** 粒子当前位置：按当前那条半圆的参数方程取点（圆心在缝线上；u 增大＝向右鼓，u 减小＝向左鼓） */
const particle = computed(() => {
  const { us, rs, K } = geom.value;
  const p = Math.min(Math.max(progress.value, 0), K);
  const i = Math.min(K - 1, Math.max(0, Math.floor(p)));
  const f = Math.min(1, Math.max(0, p - i));
  const u0 = us[i] ?? 0;
  const u1 = us[i + 1] ?? 0;
  const r = rs[i] ?? 0;
  const theta = (u1 > u0 ? -Math.PI / 2 : Math.PI / 2) + f * Math.PI;
  return { x: CX + r * Math.cos(theta), y: CY + (u0 + u1) / 2 + r * Math.sin(theta) };
});

/** 粒子源 A：最内那条半圆的端点（靠近盒心） */
const source = computed(() => ({ x: CX, y: CY + (geom.value.us[0] ?? 0) }));

/** 已经画出的轨迹（含当前这条半圆画到粒子处的那一段） */
const trail = computed(() => {
  const { us, rs, K } = geom.value;
  const p = progress.value;
  if (p <= 0.002) return "";
  const full = Math.min(Math.floor(p), K);
  let d = `M ${CX} ${CY + (us[0] ?? 0)}`;
  for (let i = 0; i < full; i += 1) {
    const rad = rs[i] ?? 0;
    d += ` A ${rad} ${rad} 0 0 1 ${CX} ${CY + (us[i + 1] ?? 0)}`;
  }
  const frac = p - full;
  if (full < K && frac > 0.002) {
    const rad = rs[full] ?? 0;
    d += ` A ${rad} ${rad} 0 0 1 ${particle.value.x} ${particle.value.y}`;
  }
  return d;
});

/** 过缝闪光强度：每条半圆的起点、终点（都在缝上）附近最亮 */
const flash = computed(() => {
  const p = progress.value;
  if (p <= 0 || p >= geom.value.K) return 0;
  const f = p - Math.floor(p);
  return Math.max(0, 1 - Math.min(f, 1 - f) / 0.16);
});

/* ── 读数：第 k 条半圆对应的真实加速次数 n_k = n·k/K ── */
const curN = computed(() =>
  Math.round((nTotal.value * Math.min(progress.value, geom.value.K)) / geom.value.K),
);
/** 真实半径 r_n = mv_n/(qB) = √(2mnqU)/(qB)（m）—— 加速次数 n = 0 时就是 0 */
const curR = computed(
  () => Math.sqrt(2 * M_P * curN.value * Q_P * u.value * 1e3) / (Q_P * b.value),
);
const curEk = computed(() => curN.value * Q_P * u.value * 1e3);

const bTex = computed(() => `${b.value.toFixed(2)}\\ \\text{T}`);
const uTex = computed(() => `${u.value.toFixed(0)}\\ \\text{kV}`);
const nTex = computed(() => `n = ${curN.value}`);
const rTex = computed(
  () => `r_n = \\frac{mv_n}{qB} = ${(curR.value * 100).toFixed(1)}\\ \\text{cm}`,
);
const ekTex = computed(() => `E_k = nqU = ${(curEk.value / J_PER_MEV).toFixed(2)}\\ \\text{MeV}`);
const halfTex = computed(
  () => `\\frac{T}{2} = \\frac{\\pi m}{qB} = ${(halfT.value * 1e9).toFixed(1)}\\ \\text{ns}`,
);

/**
 * 滑块已走过比例，交给 CSS 变量 --cr-pct 染轨道左半段（原生 range 在深色底上几乎看不见）
 *
 * @param v 当前值
 * @param min 最小值
 * @param max 最大值
 * @returns 百分比字符串
 */
const pct = (v: number, min: number, max: number): string =>
  `${(((v - min) / (max - min)) * 100).toFixed(1)}%`;
</script>

<template>
  <div class="cr-wrap">
    <div class="cr-fig">
      <svg class="cr-svg" viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="cr-dees">
            <path :d="DEE_LEFT" />
            <path :d="DEE_RIGHT" />
          </clipPath>
        </defs>
        <path class="cr-dee" :d="DEE_LEFT" />
        <path class="cr-dee" :d="DEE_RIGHT" />
        <g clip-path="url(#cr-dees)">
          <FieldDots
            :x="DOTS.x"
            :y="DOTS.y"
            :cols="DOTS.cols"
            :rows="DOTS.rows"
            :spacing="DOTS.spacing"
            dir="in"
            :opacity="0.72"
          />
        </g>
        <rect
          class="cr-gap"
          :x="CX - GAP"
          :y="CY - RP"
          :width="GAP * 2"
          :height="RP * 2"
          :opacity="flash * 0.5"
        />
        <text class="cr-flash-label" :x="CX + 24" :y="CY - RP + 54" :opacity="flash">
          +
          <tspan class="cr-math">qU</tspan>
        </text>
        <path v-if="trail" class="cr-trail" :d="trail" />
        <circle class="cr-source" :cx="source.x" :cy="source.y" r="6" />
        <circle v-if="progress > 0" class="cr-particle" :cx="particle.x" :cy="particle.y" r="9" />
        <text class="cr-tag" :x="CX + 18" :y="source.y + 34">A</text>
        <text class="cr-tag" :x="CX - RP * 0.56" :y="CY + RP * 0.6">
          <tspan class="cr-math">D</tspan>
          <tspan class="cr-sub" dy="5">1</tspan>
        </text>
        <text class="cr-tag" :x="CX + RP * 0.56" :y="CY + RP * 0.6">
          <tspan class="cr-math">D</tspan>
          <tspan class="cr-sub" dy="5">2</tspan>
        </text>
        <text class="cr-field-tag" :x="CX + RP + 22" :y="CY - RP + 22">B</text>
      </svg>
    </div>

    <div class="cr-panel">
      <div class="cr-grid">
        <div class="cr-sliders">
          <div class="cr-slider">
            <div class="cr-slider-head">
              <span class="cr-slider-name"><Latex tex="B" /></span>
              <span class="cr-slider-val"><Latex :tex="bTex" /></span>
            </div>
            <input
              v-model.number="b"
              class="cr-range"
              type="range"
              min="0.2"
              max="1"
              step="0.05"
              :style="{ '--cr-accent': 'var(--c-accent)', '--cr-pct': pct(b, 0.2, 1) }"
              aria-label="磁感应强度"
            />
          </div>
          <div class="cr-slider">
            <div class="cr-slider-head">
              <span class="cr-slider-name"><Latex tex="U" /></span>
              <span class="cr-slider-val"><Latex :tex="uTex" /></span>
            </div>
            <input
              v-model.number="u"
              class="cr-range"
              type="range"
              min="1"
              max="10"
              step="1"
              :style="{ '--cr-accent': 'var(--c-accent-2)', '--cr-pct': pct(u, 1, 10) }"
              aria-label="加速电压"
            />
          </div>
        </div>

        <div class="cr-board">
          <div class="cr-row"><Latex class="cr-tex" :tex="nTex" /></div>
          <div class="cr-row"><Latex class="cr-tex" :tex="rTex" /></div>
          <div class="cr-row"><Latex class="cr-tex" :tex="ekTex" /></div>
          <div class="cr-row cr-row-dim"><Latex class="cr-tex" :tex="halfTex" /></div>
        </div>
      </div>

      <div class="cr-foot">
        <div class="cr-ticks">
          <span
            v-for="i in geom.K"
            :key="i"
            class="cr-tick"
            :class="{
              'cr-tick-done': i <= Math.floor(progress),
              'cr-tick-now': i === Math.floor(progress) + 1 && progress < geom.K,
            }"
          ></span>
        </div>
        <button class="cr-play" type="button" @click="toggle">
          <mdi-restart v-if="progress >= geom.K" class="cr-play-icon" />
          <mdi-pause v-else-if="playing" class="cr-play-icon" />
          <mdi-play v-else class="cr-play-icon" />
          <span>{{ playLabel }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cr-wrap {
  display: flex;
  flex: 1 1 auto;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 0;
  min-height: 0;
}

.cr-fig {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  min-width: 0;
}

/* 方形图：宽度跟栏走（约 255），高度按比例 —— 页面 fig-h-* 的上限依然生效 */
.cr-svg {
  display: block;
  width: 100%;
  height: auto;
}

.cr-dee {
  fill: color-mix(in srgb, var(--c-accent-2) 7%, transparent);
  stroke: var(--c-text-dim);
  stroke-width: 2.2;
}

.cr-gap {
  fill: var(--c-accent);
}

.cr-flash-label {
  font-weight: 700;
  font-size: 26px;

  paint-order: stroke;

  fill: var(--c-accent);
  stroke: var(--c-bg-soft);
  stroke-width: 5;
}

.cr-trail {
  fill: none;
  stroke: var(--c-velocity);
  stroke-linecap: round;
  stroke-width: 2.6;
}

.cr-source {
  fill: var(--c-neutral-300);
}

.cr-particle {
  fill: var(--c-accent);
}

.cr-tag,
.cr-field-tag {
  font-size: 26px;
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 5;
}

.cr-tag {
  fill: var(--c-text-dim);
}

.cr-field-tag {
  font-style: italic;
  fill: var(--c-accent);
  text-anchor: middle;
}

.cr-math {
  font-style: italic;
  font-family: "KaTeX_Math", serif;
}

.cr-sub {
  font-size: 19px;
  font-family: "KaTeX_Main", serif;
}

.cr-panel {
  display: flex;
  flex: 0 0 19.5rem;
  flex-direction: column;
  gap: 0.45rem;

  min-width: 0;
}

.cr-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 0.8rem;
  align-items: start;
}

.cr-sliders {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.cr-slider {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.cr-slider-head {
  display: flex;
  gap: 0.3rem;
  align-items: baseline;
  justify-content: space-between;
}

.cr-slider-name {
  color: var(--c-text-dim);
}

.cr-slider-val {
  color: var(--c-text);
  font-weight: 700;
  font-size: 0.9rem;
  white-space: nowrap;
}

.cr-range {
  --cr-accent: var(--c-accent);
  --cr-pct: 0%;

  width: 100%;
  height: 8px;
  border-radius: 999px;

  background: linear-gradient(
    to right,
    var(--cr-accent) 0%,
    var(--cr-accent) var(--cr-pct),
    color-mix(in srgb, var(--c-neutral-500) 45%, transparent) var(--cr-pct),
    color-mix(in srgb, var(--c-neutral-500) 45%, transparent) 100%
  );
  outline: none;

  cursor: pointer;

  appearance: none;
}

.cr-range::-moz-range-track {
  height: 8px;
  border-radius: 999px;
  background: transparent;
}

.cr-range::-webkit-slider-thumb {
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 3px solid var(--cr-accent);
  border-radius: 50%;

  background: var(--c-neutral-50);
  box-shadow: 0 0 8px var(--c-bg);

  appearance: none;
}

.cr-range::-moz-range-thumb {
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 3px solid var(--cr-accent);
  border-radius: 50%;

  background: var(--c-neutral-50);
}

.cr-board {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  padding: 0.3rem 0.5rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);
}

.cr-row {
  display: flex;
  align-items: center;
  min-height: 1.4rem;
}

.cr-row-dim {
  color: var(--c-text-dim);
}

.cr-tex {
  font-size: 0.9rem;
}

.cr-foot {
  display: flex;
  gap: 0.7rem;
  align-items: center;
}

.cr-ticks {
  display: flex;
  flex: 1 1 auto;
  gap: 3px;
  align-items: center;

  min-width: 0;
}

.cr-tick {
  flex: 1 1 0;

  height: 12px;
  border-radius: 2px;

  background: color-mix(in srgb, var(--c-neutral-500) 45%, transparent);

  transition: background 0.12s ease;
}

.cr-tick-done {
  background: color-mix(in srgb, var(--c-accent) 45%, transparent);
}

.cr-tick-now {
  height: 18px;
  background: var(--c-accent);
}

.cr-play {
  display: flex;
  flex: 0 0 auto;
  gap: 0.35rem;
  align-items: center;
  justify-content: center;

  padding: 0.15rem 0.8rem;
  border: 1px solid var(--c-accent);
  border-radius: 999px;

  background: var(--c-accent-soft);
  color: var(--c-accent);

  font-weight: 700;
  font-size: 0.95rem;

  /* 按钮文字不许被挤成竖排（窄栏下「加速」曾一字一行） */
  white-space: nowrap;

  cursor: pointer;
}

.cr-play-icon {
  font-size: 1.2rem;
}
</style>
