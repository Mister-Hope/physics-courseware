<!--
  第 13 页全页交互：最大速度和最大动能由什么决定
  —— 左：D 形盒俯视 + 粒子螺旋到最外圈（半径 = 盒半径 R），圆心到盒边缘标 R（双箭头）
  —— 右：B / R / U 三个滑块 + 三个读数
  真实计算（computed）：
      E_k,max = q²B²R²/(2m)、n = E_k,max/(qU)、t = (n−1)·T/2 = (n−1)πm/(qB)
  教学点（靠公式里有没有 U 自己就能看出来，数字跟着动）：
      E_k,max 只由 B、R 决定 —— 拖 U 时 E_k,max **不变**，只有 n 与 t 变；
      拖 B 或 R 时 E_k,max 跟着变（B、R 越大、动能越大，与 U 无关）。
  版面：图在左、控件在右（页面给的是 max-w-[720px] 的窄框，横向排布最省高度）。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";

const M_P = 1.67e-27; // 质子质量 kg
const Q_P = 1.6e-19; // 质子电荷量 C
const J_PER_MEV = 1.6e-13; // 1 MeV = 1.6×10⁻¹³ J

/** 磁感应强度 B（T）、盒半径 R（m）、加速电压 U（kV） */
const b = ref(0.5);
const r = ref(0.5);
const u = ref(5);

/** 最大动能 E_k,max = q²B²R²/(2m)（J）—— 与 U 无关 */
const ekMax = computed(() => (Q_P * Q_P * b.value * b.value * r.value * r.value) / (2 * M_P));
/** 加速次数 n = E_k,max/(qU) */
const nAcc = computed(() => Math.max(1, Math.round(ekMax.value / (Q_P * u.value * 1e3))));
/** 加速 n 次共走过 n−1 个半周期：t = (n−1)·T/2 = (n−1)πm/(qB)（s） */
const totalT = computed(() => (Math.max(0, nAcc.value - 1) * Math.PI * M_P) / (Q_P * b.value));

/** 拖 B / R → 动的是 E_k,max；拖 U → 动的是 n 与 t（读数框亮一下，把这条线索点出来） */
const pulse = ref<"ek" | "nt" | "">("");
let timer: ReturnType<typeof globalThis.setTimeout> | undefined;
const mark = (which: "ek" | "nt"): void => {
  pulse.value = which;
  if (timer) globalThis.clearTimeout(timer);
  timer = globalThis.setTimeout(() => {
    pulse.value = "";
  }, 1100);
};
watch([b, r], () => mark("ek"));
watch(u, () => mark("nt"));
onBeforeUnmount(() => {
  if (timer) globalThis.clearTimeout(timer);
});

/* ── 画布几何 ── */
const CX = 200;
const CY = 205;
const GAP = 7;
/** 盒半径在画布上的长度：跟着 R 一起变大，直观体现「R 越大、动能越大」 */
const RP = computed(() => 110 + (55 * (r.value - 0.2)) / 0.8);
const DEE_LEFT = computed(
  () =>
    `M ${CX - GAP} ${CY - RP.value} A ${RP.value} ${RP.value} 0 0 0 ${CX - GAP} ${CY + RP.value} Z`,
);
const DEE_RIGHT = computed(
  () =>
    `M ${CX + GAP} ${CY - RP.value} A ${RP.value} ${RP.value} 0 0 1 ${CX + GAP} ${CY + RP.value} Z`,
);
/** 盒内匀强磁场（裸 × 铺满），阵列按盒的大小居中 */
const dots = computed(() => {
  const cols = Math.ceil((2 * RP.value) / 18);
  const span = (cols - 1) * 18;
  return { x: CX - span / 2, y: CY - span / 2, cols, rows: cols };
});

/** 螺旋：11 条半径递增的半圆（r_k = R·√(k/K)），最外一条以盒心为圆心、半径 = 盒半径 R，其余由它向前反向逐条拼接 */
const K = 11;
const geom = computed(() => {
  const radius = (k: number): number => RP.value * Math.sqrt(k / K);
  /** 端点偏移 us[k]：第 k 条半圆末端（缝线上）相对盒心的偏移，向上为负、向下为正 */
  const us = Array.from({ length: K + 1 }, () => 0);
  us[K] = RP.value; // 最外那条半圆的两个端点：缝线与盒边界的交点
  for (let k = K; k >= 1; k -= 1) {
    // 半圆左右交替：与最外那条同一侧的一半取 u_{k-1} = u_k − 2r_k，另一半取 +
    const dr = 2 * radius(k);
    us[k - 1] = (us[k] ?? 0) + (k % 2 === K % 2 ? -dr : dr);
  }
  return { us, rs: Array.from({ length: K }, (_, i) => radius(i + 1)) };
});

const spiralPath = computed(() => {
  const { us, rs } = geom.value;
  let d = `M ${CX} ${CY + (us[0] ?? 0)}`;
  for (let i = 0; i < K; i += 1) {
    const rad = rs[i] ?? 0;
    d += ` A ${rad} ${rad} 0 0 1 ${CX} ${CY + (us[i + 1] ?? 0)}`;
  }
  return d;
});

/** 粒子源 A：最内那条半圆的端点（靠近盒心） */
const sourceY = computed(() => CY + (geom.value.us[0] ?? 0));

/** 粒子停在最外那条半圆的端点（缝线上的盒边界处） */
const endPoint = computed(() => ({ x: CX, y: CY + (geom.value.us[K] ?? RP.value) }));

/* ── 盒半径 R 的双箭头（圆心 → 盒边缘） ── */
interface Pt {
  x: number;
  y: number;
}

interface DblArrow {
  shaft: { x1: number; y1: number; x2: number; y2: number };
  headA: string;
  headB: string;
}

/**
 * 双头箭头（CourseArrow 只画单头）：三角形长 12，箭杆两端各回退 12，尖端正好落在端点上
 *
 * @param a 起点
 * @param b 终点
 * @returns 箭杆两端坐标与两个三角形顶点串
 */
const dblArrow = (from: Pt, to: Pt): DblArrow => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;
  const head = 12;
  const half = 5.5;
  return {
    shaft: {
      x1: from.x + ux * head,
      y1: from.y + uy * head,
      x2: to.x - ux * head,
      y2: to.y - uy * head,
    },
    headA: `${from.x},${from.y} ${from.x + ux * head + nx * half},${from.y + uy * head + ny * half} ${from.x + ux * head - nx * half},${from.y + uy * head - ny * half}`,
    headB: `${to.x},${to.y} ${to.x - ux * head + nx * half},${to.y - uy * head + ny * half} ${to.x - ux * head - nx * half},${to.y - uy * head - ny * half}`,
  };
};

const rArrow = computed(() => dblArrow({ x: CX, y: CY }, { x: CX + RP.value, y: CY }));

/* ── 读数文本 ── */
const bTex = computed(() => `B = ${b.value.toFixed(2)}\\ \\text{T}`);
const rTex = computed(() => `R = ${r.value.toFixed(2)}\\ \\text{m}`);
const uTex = computed(() => `U = ${u.value.toFixed(0)}\\ \\text{kV}`);
const ekTex = computed(
  () =>
    `E_{k\\max} = \\dfrac{q^2B^2R^2}{2m} = ${(ekMax.value / J_PER_MEV).toFixed(2)}\\ \\text{MeV}`,
);
const nTex = computed(() => `n = \\frac{E_{k\\max}}{qU} = ${nAcc.value}`);
const tTex = computed(
  () => `t = \\frac{(n-1)\\pi m}{qB} = ${(totalT.value * 1e6).toFixed(1)}\\ \\mu\\text{s}`,
);

/**
 * 滑块已走过比例，交给 CSS 变量 --ce-pct 染轨道左半段
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
  <div class="ce-wrap">
    <div class="ce-fig">
      <svg class="ce-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="ce-dees">
            <path :d="DEE_LEFT" />
            <path :d="DEE_RIGHT" />
          </clipPath>
        </defs>
        <path class="ce-dee" :d="DEE_LEFT" />
        <path class="ce-dee" :d="DEE_RIGHT" />
        <g clip-path="url(#ce-dees)">
          <FieldDots
            :x="dots.x"
            :y="dots.y"
            :cols="dots.cols"
            :rows="dots.rows"
            dir="in"
            :opacity="0.6"
          />
        </g>
        <path class="ce-trail" :d="spiralPath" />
        <circle class="ce-source" :cx="CX" :cy="sourceY" r="6" />
        <circle class="ce-particle" :cx="endPoint.x" :cy="endPoint.y" r="9" />
        <line class="ce-r-halo" :x1="CX" :y1="CY" :x2="CX + RP" :y2="CY" :stroke-width="11" />
        <line
          class="ce-r-shaft"
          :x1="rArrow.shaft.x1"
          :y1="rArrow.shaft.y1"
          :x2="rArrow.shaft.x2"
          :y2="rArrow.shaft.y2"
        />
        <polygon class="ce-r-head" :points="rArrow.headA" />
        <polygon class="ce-r-head" :points="rArrow.headB" />
        <text class="ce-rlabel" :x="CX + RP / 2" :y="CY - 18">
          <tspan class="ce-math">R</tspan>
        </text>
        <text class="ce-tag" :x="CX + 18" :y="sourceY + 14">A</text>
        <text class="ce-tag" :x="CX - RP * 0.56" :y="CY + RP * 0.62">
          <tspan class="ce-math">D</tspan>
          <tspan class="ce-sub" dy="4">1</tspan>
        </text>
        <text class="ce-tag" :x="CX + RP * 0.56" :y="CY + RP * 0.62">
          <tspan class="ce-math">D</tspan>
          <tspan class="ce-sub" dy="4">2</tspan>
        </text>
        <text class="ce-field-tag" :x="CX + RP + 20" :y="CY - RP + 18">B</text>
      </svg>
    </div>

    <div class="ce-panel">
      <div class="ce-sliders">
        <div class="ce-slider">
          <div class="ce-slider-head">
            <span class="ce-slider-name"><Latex tex="B" /></span>
            <span class="ce-slider-val"><Latex :tex="bTex" /></span>
          </div>
          <input
            v-model.number="b"
            class="ce-range"
            type="range"
            min="0.2"
            max="1"
            step="0.05"
            :style="{ '--ce-accent': 'var(--c-accent)', '--ce-pct': pct(b, 0.2, 1) }"
            aria-label="磁感应强度"
          />
        </div>

        <div class="ce-slider">
          <div class="ce-slider-head">
            <span class="ce-slider-name"><Latex tex="R" /></span>
            <span class="ce-slider-val"><Latex :tex="rTex" /></span>
          </div>
          <input
            v-model.number="r"
            class="ce-range"
            type="range"
            min="0.2"
            max="1"
            step="0.05"
            :style="{ '--ce-accent': 'var(--c-physics)', '--ce-pct': pct(r, 0.2, 1) }"
            aria-label="盒半径"
          />
        </div>

        <div class="ce-slider">
          <div class="ce-slider-head">
            <span class="ce-slider-name"><Latex tex="U" /></span>
            <span class="ce-slider-val"><Latex :tex="uTex" /></span>
          </div>
          <input
            v-model.number="u"
            class="ce-range"
            type="range"
            min="1"
            max="10"
            step="1"
            :style="{ '--ce-accent': 'var(--c-accent-2)', '--ce-pct': pct(u, 1, 10) }"
            aria-label="加速电压"
          />
        </div>
      </div>

      <div class="ce-board">
        <div class="ce-row" :class="{ 'ce-pulse': pulse === 'ek' }">
          <Latex class="ce-tex" :tex="ekTex" />
        </div>
        <div class="ce-row" :class="{ 'ce-pulse': pulse === 'nt' }">
          <Latex class="ce-tex" :tex="nTex" />
        </div>
        <div class="ce-row" :class="{ 'ce-pulse': pulse === 'nt' }">
          <Latex class="ce-tex" :tex="tTex" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ce-wrap {
  display: flex;
  flex: 1 1 auto;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 0;
  min-height: 0;
}

.ce-fig {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  min-width: 0;
}

/* 方形图：宽度跟栏走（约 240），高度按比例 —— 页面 fig-h-* 的上限依然生效 */
.ce-svg {
  display: block;
  width: 100%;
  height: auto;
}

.ce-dee {
  fill: color-mix(in srgb, var(--c-accent-2) 7%, transparent);
  stroke: var(--c-text-dim);
  stroke-width: 2.2;
}

.ce-trail {
  fill: none;
  stroke: var(--c-velocity);
  stroke-linecap: round;
  stroke-width: 2.6;
}

.ce-source {
  fill: var(--c-neutral-300);
}

.ce-particle {
  fill: var(--c-accent);
}

.ce-r-halo {
  opacity: 0.85;
  stroke: var(--c-bg-soft);
  stroke-linecap: round;
}

.ce-r-shaft {
  stroke: var(--c-accent);
  stroke-linecap: round;
  stroke-width: 2.6;
}

.ce-r-head {
  fill: var(--c-accent);
}

.ce-rlabel {
  font-size: 26px;

  paint-order: stroke;

  fill: var(--c-accent);
  stroke: var(--c-bg-soft);
  stroke-width: 5;
  text-anchor: middle;
}

.ce-tag,
.ce-field-tag {
  font-size: 26px;
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 5;
}

.ce-tag {
  fill: var(--c-text-dim);
}

.ce-field-tag {
  font-style: italic;
  fill: var(--c-accent);
  text-anchor: middle;
}

.ce-math {
  font-style: italic;
  font-family: "KaTeX_Math", serif;
}

.ce-sub {
  font-size: 19px;
  font-family: "KaTeX_Main", serif;
}

.ce-panel {
  display: flex;
  flex: 0 0 21rem;
  flex-direction: column;
  gap: 0.55rem;

  min-width: 0;
}

.ce-sliders {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
}

.ce-slider {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.ce-slider-head {
  display: flex;
  gap: 0.3rem;
  align-items: baseline;
  justify-content: space-between;
}

.ce-slider-name {
  color: var(--c-text-dim);
}

.ce-slider-val {
  color: var(--c-text);
  font-weight: 700;
  font-size: 0.9rem;
  white-space: nowrap;
}

.ce-range {
  --ce-accent: var(--c-accent);
  --ce-pct: 0%;

  width: 100%;
  height: 8px;
  border-radius: 999px;

  background: linear-gradient(
    to right,
    var(--ce-accent) 0%,
    var(--ce-accent) var(--ce-pct),
    color-mix(in srgb, var(--c-neutral-500) 45%, transparent) var(--ce-pct),
    color-mix(in srgb, var(--c-neutral-500) 45%, transparent) 100%
  );
  outline: none;

  cursor: pointer;

  appearance: none;
}

.ce-range::-moz-range-track {
  height: 8px;
  border-radius: 999px;
  background: transparent;
}

.ce-range::-webkit-slider-thumb {
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 3px solid var(--ce-accent);
  border-radius: 50%;

  background: var(--c-neutral-50);
  box-shadow: 0 0 8px var(--c-bg);

  appearance: none;
}

.ce-range::-moz-range-thumb {
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 3px solid var(--ce-accent);
  border-radius: 50%;

  background: var(--c-neutral-50);
}

.ce-board {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  padding: 0.35rem 0.6rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);
}

.ce-row {
  padding: 0.1rem 0.35rem;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  transition:
    border-color 0.2s ease,
    background 0.2s ease;
}

.ce-pulse {
  border-color: var(--c-accent);
  background: var(--c-accent-soft);
}

.ce-tex {
  font-size: 0.95rem;
}
</style>
