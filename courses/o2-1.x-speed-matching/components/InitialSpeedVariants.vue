<!--
  选必2 1.x《复合场中的配速法与摆线运动》「任意初速度」页交互图（精修美化版）
  
  物理数学解析：
    初速度拆分为：v_平 = mg/(qB)（水平向右，1个单位）＋ v_圆0 = v_初 − v_平
    在无量纲单位下，解析精确解为：
      x(t) = t + (kx − 1)·sin(t) − ky·(1 − cos(t))
      y(t) = (kx − 1)·(1 − cos(t)) + ky·sin(t)
    圆心漂移线高度严格为：y_drift = kx − 1
    圆半径：R = |v_圆0| / v_平 = √((kx − 1)² + ky²)
  
  交互设计：
    1. 保持原版简洁直观的控件结构；
    2. 放大控件尺寸与触控面积，便于教师白板拖拽与课堂演示；
    3. 清晰标识各滑块对应的物理量（向右分量 vx、向上分量 vy）；
    4. 彻底剔除多余提示文字与描述性噪点，界面极致纯粹明了。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const { showRollingCircle = true, showDecomposition = true } = defineProps<{
  /** 是否展示圆心平移圆与半径连线 */
  showRollingCircle?: boolean;
  /** 是否展示初速度矢量分解 (v_平 + v_圆0) */
  showDecomposition?: boolean;
}>();

const W = 1000;
const H = 340;
/** 1 个单位（= 1R 对应 mg/qB）所占像素 */
const K = 36;
/** 出发点在画布上的位置 */
const SX = 100;
const CY = 100;

const px = (x: number): number => SX + x * K;
/** 世界 y 向上为正 ⟹ 屏幕 y 向下翻转 */
/**
 * 世界 y 向上为正 ⟹ 屏幕 y 向下翻转
 *
 * @param y 世界坐标 y
 * @returns 屏幕坐标 y
 */
const py = (y: number): number => CY - y * K;

/** 初速度分量（以 v_平 = mg/(qB) 为单位） */
const kx = ref(0);
const ky = ref(0);

/** 圆周分速度初值 v_圆0 = v_初 − v_平 */
const wx = computed(() => kx.value - 1);
const wy = computed(() => ky.value);
/** 圆周运动半径 R = |v_圆0| / v_平 */
const R = computed(() => Math.hypot(wx.value, wy.value));

/**
 * 精确解析解（绝对物理守恒） x(t) = t + wx·sin(t) − wy·(1 − cos(t)) y(t) = wx·(1 − cos(t)) + wy·sin(t)
 *
 * @param t 无量纲时间（ωt）
 * @returns 该时刻的位置
 */
const getTrajectoryPos = (t: number): { x: number; y: number } => {
  const sinT = Math.sin(t);
  const cosT = Math.cos(t);
  const oneMinusCos = 1 - cosT;

  return {
    x: t + wx.value * sinT - wy.value * oneMinusCos,
    y: wx.value * oneMinusCos + wy.value * sinT,
  };
};

/** 采样生成整条轨迹（3 个周期） */
const SAMPLES = 260;
const T_MAX = 3 * 2 * Math.PI;

const pathD = computed(() => {
  const pts: string[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const t = (i / SAMPLES) * T_MAX;
    const p = getTrajectoryPos(t);
    pts.push(`${i === 0 ? "M" : "L"} ${px(p.x).toFixed(1)} ${py(p.y).toFixed(1)}`);
  }
  return pts.join(" ");
});

const START = { x: px(0), y: py(0) };

/** 动画循环（沿解析解平滑巡航） */
const CYCLE_MS = 8000;
const animPhase = ref(0);
let frame = 0;
let t0 = 0;

const tick = (now: number): void => {
  if (t0 === 0) t0 = now;
  animPhase.value = ((now - t0) / CYCLE_MS) % 1;
  frame = requestAnimationFrame(tick);
};

onMounted(() => {
  frame = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  if (frame !== 0) cancelAnimationFrame(frame);
});

/** 当前质点即时屏幕位置 */
const currentT = computed(() => animPhase.value * T_MAX);
const currentWorldPos = computed(() => getTrajectoryPos(currentT.value));
const ball = computed(() => ({
  x: px(currentWorldPos.value.x),
  y: py(currentWorldPos.value.y),
}));

/** 圆心水平漂移线 y_drift = kx − 1 */
const driftYWorld = computed(() => kx.value - 1);
const driftYScreen = computed(() => py(driftYWorld.value));

/** 当前时刻圆心在屏幕上的位置 */
const activeCenterScreen = computed(() => ({
  x: px(currentT.value - ky.value),
  y: driftYScreen.value,
}));

/** 初速度矢量 */
const V_SCALE = 1.3;
const vInitTip = computed(() => ({
  x: START.x + kx.value * K * V_SCALE,
  y: START.y - ky.value * K * V_SCALE,
}));

// 分速度 v_平 矢量终点
const vFlatTip = computed(() => ({
  x: START.x + Number(K) * V_SCALE,
  y: START.y,
}));

/** 轨迹形态判据（仅输出纯粹的形态名称，零多余提示词） */
const regime = computed(() => {
  if (R.value < 0.03) return { name: "匀速直线" };
  if (Math.abs(R.value - 1) < 0.05 && Math.abs(ky.value) < 0.05) return { name: "尖点摆线" };

  if (R.value < 1) return { name: "波浪线" };
  return { name: "结环摆线" };
});

const HALO = {
  stroke: "var(--c-bg, #0f172a)",
  "stroke-width": 3.6,
  "paint-order": "stroke",
} as const;
const MATH = "KaTeX_Math, 'Times New Roman', serif";
const MAIN = "KaTeX_Main, 'Times New Roman', serif";
</script>

<template>
  <div class="fig-variants">
    <!-- 主画布展台 -->
    <div class="ui-stage">
      <svg
        :viewBox="`0 0 ${W} ${H}`"
        class="fig-svg select-none overflow-visible"
        role="img"
        aria-label="任意初速度下的带电小球在复合场中的运动轨迹"
      >
        <defs>
          <filter id="isv-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- 1. 背景匀强磁场点阵 -->
        <FieldDots
          :x="24"
          :y="18"
          :cols="18"
          :rows="6"
          :spacing="55"
          :size="6"
          :line-width="2"
          :opacity="0.22"
          color="var(--c-accent, #e2a846)"
          dir="in"
        />

        <!-- 2. 出发水平线 (y = 0 基准线) -->
        <line
          x1="12"
          :y1="py(0)"
          :x2="W - 12"
          :y2="py(0)"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="8 6"
          opacity="0.45"
        />

        <!-- 3. 圆心水平漂移线 y_drift = kx − 1 -->
        <line
          v-if="R > 0.05"
          x1="12"
          :y1="driftYScreen"
          :x2="W - 12"
          :y2="driftYScreen"
          stroke="var(--c-velocity)"
          stroke-width="1.4"
          stroke-dasharray="4 5"
          opacity="0.45"
        />

        <!-- 4. 复合运动轨迹曲线 -->
        <path
          :d="pathD"
          fill="none"
          stroke="var(--c-neutral-900)"
          stroke-width="6"
          stroke-linecap="round"
          opacity="0.8"
        />
        <path
          :d="pathD"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="3.4"
          stroke-linecap="round"
          filter="url(#isv-glow)"
        />

        <!-- 5. 瞬时滚动圆与半径连线 -->
        <g v-if="showRollingCircle && R > 0.08">
          <circle
            :cx="activeCenterScreen.x"
            :cy="activeCenterScreen.y"
            :r="R * K"
            fill="none"
            stroke="var(--c-velocity)"
            stroke-width="1.4"
            stroke-dasharray="4 4"
            opacity="0.4"
          />
          <circle
            :cx="activeCenterScreen.x"
            :cy="activeCenterScreen.y"
            r="3"
            fill="var(--c-velocity)"
          />
          <line
            :x1="activeCenterScreen.x"
            :y1="activeCenterScreen.y"
            :x2="ball.x"
            :y2="ball.y"
            stroke="var(--c-velocity)"
            stroke-width="1.6"
            opacity="0.7"
          />
        </g>

        <!-- 6. 出发基准点 -->
        <circle
          :cx="START.x"
          :cy="START.y"
          r="4.5"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="2"
        />

        <!-- 初速度矢量分解 (v_平 + v_圆0) -->
        <g v-if="showDecomposition && Math.hypot(kx, ky) > 0.08">
          <CourseArrow
            :from="START"
            :to="vFlatTip"
            stroke="var(--c-velocity)"
            :stroke-width="2.8"
            :head-size="12"
          />
          <line
            :x1="vFlatTip.x"
            :y1="vFlatTip.y"
            :x2="vInitTip.x"
            :y2="vInitTip.y"
            stroke="var(--c-accent-glow)"
            stroke-width="1.8"
            stroke-dasharray="3 3"
            stroke-linecap="round"
          />
        </g>

        <!-- 初速度总矢量 v_初 -->
        <g v-if="Math.hypot(kx, ky) > 0.05">
          <CourseArrow
            :from="START"
            :to="vInitTip"
            stroke="var(--c-velocity)"
            :stroke-width="4.2"
            :head-size="15"
          />
          <text
            :x="vInitTip.x + (vInitTip.x >= START.x ? 12 : -12)"
            :y="vInitTip.y - 8"
            font-size="18"
            :text-anchor="vInitTip.x >= START.x ? 'start' : 'end'"
            dominant-baseline="central"
            fill="var(--c-velocity)"
            :font-family="MATH"
            font-style="italic"
            :style="HALO"
          >
            v
            <tspan :font-family="MAIN" font-style="normal" font-size="12" dy="4">初</tspan>
          </text>
        </g>

        <!-- 7. 沿轨迹运动的小球（红色实心带加粗白十字） -->
        <circle
          :cx="ball.x"
          :cy="ball.y"
          r="9"
          fill="var(--c-force)"
          stroke="var(--c-neutral-900)"
          stroke-width="2"
        />
        <line
          :x1="ball.x - 4"
          :y1="ball.y"
          :x2="ball.x + 4"
          :y2="ball.y"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linecap="round"
        />
        <line
          :x1="ball.x"
          :y1="ball.y - 4"
          :x2="ball.x"
          :y2="ball.y + 4"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <!-- 交互调控面板：保持原有控件布局，按教学需求做大做清晰，去掉多余说明词 -->
    <div class="ui-bar">
      <!-- 水平分量滑块 -->
      <label class="ui-row">
        <span class="ui-name text-lg">
          向右分量
          <span class="ui-sym text-xl"
            ><i>v</i><sub><i>x</i></sub></span
          >
        </span>
        <input
          v-model.number="kx"
          class="ui-slider"
          type="range"
          min="-1.5"
          max="2.5"
          step="0.05"
        />
        <span class="ui-val text-xl">{{ (kx >= 0 ? "+" : "") + kx.toFixed(2) }}</span>
      </label>

      <!-- 竖直分量滑块 -->
      <label class="ui-row">
        <span class="ui-name text-lg">
          向上分量
          <span class="ui-sym text-xl"
            ><i>v</i><sub><i>y</i></sub></span
          >
        </span>
        <input
          v-model.number="ky"
          class="ui-slider"
          type="range"
          min="-1.5"
          max="1.5"
          step="0.05"
        />
        <span class="ui-val text-xl">{{ (ky >= 0 ? "+" : "") + ky.toFixed(2) }}</span>
      </label>

      <!-- 物理读数与形态标签 -->
      <div class="ui-read text-lg">
        <span class="ui-item">
          <Latex tex="|v_{\text{圆0}}| / v_{\text{平}} = " />
          <strong class="text-xl">{{ R.toFixed(2) }}</strong>
        </span>
        <span class="ui-tag text-lg">{{ regime.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── 图与控件两层：fig-variants 只管图的宽度上限（svg 挂共享的 .fig-svg），ui-* 是滑块控件 ── */
.fig-variants {
  --fig-max: 1000px;
  width: 100%;
}

/* 画布展台：把 svg 撑满可用高度 */
.fig-variants .fig-svg {
  height: 100%;
}

.ui-stage {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: min(320px, 36vh);
}

/* ═══════════ 原有控件风格的大号教学优化版 ═══════════ */
.ui-bar {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  width: 100%;
  max-width: 920px;
  margin: 0.5rem auto 0;
  padding: 0.25rem 0.5rem;
}

.ui-row {
  display: flex;
  gap: 1.25rem;
  align-items: center;
  user-select: none;
}

/* 字号一律走共享阶梯（.text-lg / .text-xl，写在模板上），这里只管版式 */
.ui-name {
  display: flex;
  flex: 0 0 auto;
  gap: 0.4rem;
  align-items: baseline;

  width: 8.8rem;

  color: var(--c-text-dim);

  font-weight: 500;
}

.ui-sym {
  color: var(--c-velocity);
  font-style: italic;
  font-family: "KaTeX_Math", "Times New Roman", serif;
}

.ui-sym sub {
  font-style: normal;
  font-size: 0.85rem;
  font-family: "KaTeX_Main", "Times New Roman", serif;
}

.ui-val {
  flex: 0 0 auto;

  width: 5rem;

  color: var(--c-text);

  font-weight: 600;
  font-family: "JetBrains Mono", monospace;
  text-align: right;
}

/* 大号拖拽滑块，专为电子白板与教师演示优化 */
.ui-slider {
  flex: 1 1 auto;

  min-width: 0;
  height: 32px;

  background: transparent;

  cursor: pointer;

  accent-color: var(--c-accent);
}

.ui-slider::-webkit-slider-runnable-track {
  height: 10px;
  border-radius: 999px;
  background: var(--c-neutral-700);
}

.ui-slider::-webkit-slider-thumb {
  width: 24px;
  height: 24px;
  margin-top: -7px;
  border: 2px solid var(--c-neutral-900);
  border-radius: 50%;

  background: var(--c-accent);
  box-shadow: 0 0 8px color-mix(in srgb, var(--c-accent) 40%, transparent);

  cursor: grab;

  appearance: none;

  transition: transform 0.12s ease;
}

.ui-slider::-webkit-slider-thumb:hover,
.ui-slider::-webkit-slider-thumb:active {
  cursor: grabbing;
  transform: scale(1.15);
}

.ui-slider::-moz-range-track {
  height: 10px;
  border-radius: 999px;
  background: var(--c-neutral-700);
}

.ui-slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border: 2px solid var(--c-neutral-900);
  border-radius: 50%;

  background: var(--c-accent);
  box-shadow: 0 0 8px color-mix(in srgb, var(--c-accent) 40%, transparent);

  cursor: grab;
}

.ui-read {
  display: flex;
  gap: 1.5rem;
  align-items: center;

  padding-top: 0.2rem;

  color: var(--c-text-dim);
}

.ui-item strong {
  color: var(--c-accent);
  font-family: "JetBrains Mono", monospace;
}

.ui-tag {
  margin-left: auto;
  padding: 0.2rem 1rem;
  border: 1.5px solid var(--c-accent);
  border-radius: 999px;

  background: var(--c-accent-soft);
  color: var(--c-accent);

  font-weight: 600;
}
</style>
