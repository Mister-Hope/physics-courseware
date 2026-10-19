<!--
  速度选择器（选必二 §1.4「洛伦兹力与现代科技」专题 · 第二课时）
  P15：mode="lab" —— 原理 + 交互，页面写 <SpeedSelectorDevice mode="lab" :step="$clicks" />（clicks: 2）
       step 0：干净结构 + 滑块与电荷按钮（默认 v = E/B = 1000 m/s，粒子沿中线直线穿过）
       step ≥ 1：从粒子几何中心画出电场力 qE 与洛伦兹力 qvB（长度正比于大小）+ 面板里两条大小对比条
       （本页的落点结论写在 slides.md 的 .key 里，组件内不再重复一次）
  P16：mode="figure" —— 例 3 的干净题目图，页面写 <SpeedSelectorDevice mode="figure" />
       只画结构：两块极板（+ / −）、竖直向下的 E 箭头、垂直纸面向里的磁场阵列、
       沿中线的虚线路径、粒子、标注（v / E / B）；不画受力、不画偏转。
  ── 几何（viewBox 640×300，用户单位，按 16px 体系给字号）──
     上极板 y = 92（+）、下极板 y = 214（−），x 从 172 到 556；板间中线 y = 153；
     粒子几何中心固定在板间入口 (176, 153) —— 两个受力箭头都从这一点出发（高中只研究受力，不研究转动）；
     板间 4 个竖直向下的 E 箭头；磁场用 <FieldDots dir="in"> 铺满（有阵列就不再画 ⊗B 图例）。
  ── 物理（全部由公式在 computed 里算，不写死结果）──
     E = 500 V/m、B = 0.5 T、q = 1.6×10⁻¹⁹ C ⟹ 平衡速度 E/B = 1000 m/s；
     电场力 F_E = qE = 8.0×10⁻¹⁷ N（E 由正极板指向负极板，正电荷受力向下、负电荷向上）；
     洛伦兹力 F_B = qvB（v 向右、B 垂直纸面向里，正电荷受力向上、负电荷向下）；
     两者方向恒相反、大小相等 ⟹ v = E/B ⟹ 粒子严格沿中线直线穿过；v ≠ E/B 时净力偏向大的一方。
  ── 轨迹为什么这样弯（示意图口径）──
     净力 F_净 = q(vB − E) ∝ (v − E/B)，横向位移取"沿板方向的横向匀加速"口径 Δy ∝ F_净·ξ²
     （ξ = 已走过的板长比例）⟹ 出口偏移 = −s·(v − E/B)/(E/B)·BEND_MAX（s = 电荷符号，屏幕 y 向下为正）。
     不做真实回旋线的原因：真实参数下回旋角频率 ω = qB/m ≈ 4.8×10⁷ rad/s，粒子穿过 0.38 m 要转上万圈，
     按真实比例根本画不出来。本图只表达"等速直线 / 偏向哪一侧、偏多少"，
     偏转方向与"v = E/B"这个临界条件（s·(v − E/B) 的符号）是严格正确的。
-->
<script setup lang="ts">
import { computed, ref } from "vue";

const { mode = "lab", step = 0 } = defineProps<{
  /** `lab` = 第 15 页交互演示（滑块 + 电荷按钮 + 受力箭头）；`figure` = 第 16 页例题的干净结构图 */
  mode?: "figure" | "lab";
  /** 当前点击步（页面里传 :step="$clicks"） */
  step?: number;
}>();

/* ── 装置参数（板间匀强电场与匀强磁场，本课统一给定） ── */
/** 板间电场强度（V/m），方向由正极板指向负极板（竖直向下） */
const E_FIELD = 500;
/** 板间磁感应强度（T），方向垂直纸面向里 */
const B_FIELD = 0.5;
/** 元电荷（C） */
const CHARGE = 1.6e-19;
/** 平衡速度 v = E/B（m/s）：电场力与洛伦兹力等大反向的临界速度 */
const V_BALANCE = E_FIELD / B_FIELD;
/** 速率滑块范围（m/s，步长 50 ⟹ 1000 m/s 恰好在滑块上可取到） */
const V_MIN = 500;
const V_MAX = 2000;
const V_STEP = 50;

/* ── 画布几何 ── */
const VB_W = 640;
const VB_H = 300;
/** 极板两端横坐标 */
const PLATE_X0 = 172;
const PLATE_X1 = 556;
/** 上（+）/ 下（−）极板纵坐标 */
const PLATE_TOP_Y = 92;
const PLATE_BOTTOM_Y = 214;
const PLATE_W = 7;
/** 板间中线：粒子从左端中线射入 */
const AXIS_Y = 153;
/** 粒子几何中心：所有受力箭头都从这一点起笔 */
const PX = 176;
/** 板间电场箭头（竖直向下）的横坐标与纵向跨度 */
const E_ARROW_XS = [280, 350, 420, 490];
const E_ARROW_Y0 = 103;
const E_ARROW_Y1 = 203;
/** 磁场阵列：第一个记号的中心 + 行列数（间距 20 ⟹ 铺满 x 184…544、y 103…203） */
const DOTS_X = 184;
const DOTS_Y = 103;
const DOTS_COLS = 19;
const DOTS_ROWS = 6;
const DOTS_SPACING = 20;
/** 射入速度箭头（画在粒子上，指向右） */
const V_ARROW_LEN = 56;
/** 力的箭头长度基准：取 v = 2000 m/s 时的洛伦兹力，对应最长箭头 */
const F_REF = CHARGE * V_MAX * B_FIELD;
const F_ARROW_MAX = 40;
/** 出口处最大横向偏移（v ≠ E/B 时，用户单位）：板间半间距约 58，留足余量不出极板 */
const BEND_MAX = 44;
/** 轨迹采样点数 */
const TRAIL_SAMPLES = 48;

/* ── 字号 ── */
/** 极板极性、E / B / v 标注的字号（图内字号会随缩放缩水，给足） */
const LABEL_FONT = 32;
/** 受力标注的字号 */
const FORCE_FONT = 26;

/* ── 状态 ── */
/** 粒子速率（m/s） */
const speed = ref(V_BALANCE);
/** 电荷符号：+1 = 正电荷、−1 = 负电荷 */
const sign = ref<1 | -1>(1);

const isLab = computed(() => mode === "lab");
const currentStep = computed(() => Math.max(0, step));
/** 分步第一步（step ≥ 1）：两个受力箭头 + 面板里的两条大小对比条 */
const showForces = computed(() => isLab.value && currentStep.value >= 1);
/* ── 受力（真实公式，随滑块与电荷符号实时变化） ── */
/** 电场力大小 F_E = qE（与 v 无关） */
const eForce = CHARGE * E_FIELD;
/** 洛伦兹力大小 F_B = qvB（随 v 线性变化） */
const bForce = computed(() => CHARGE * speed.value * B_FIELD);

/**
 * 力的箭头长度：正比于力的大小（以 v = 2000 m/s 时的洛伦兹力为满量程）
 *
 * @param force 力的大小（N）
 * @returns 箭头长度（viewBox 用户单位）
 */
const forceLength = (force: number): number => (force / F_REF) * F_ARROW_MAX;
const eForceLen = forceLength(eForce);
const bForceLen = computed(() => forceLength(bForce.value));

/* 方向（屏幕 y 向下为正）：E 竖直向下 ⟹ 正电荷受电场力向下；v 向右、B 向里 ⟹ 正电荷受洛伦兹力向上。
   切到 −q 时两个力同时反向，大小关系与结论都不变。 */
const eDir = computed(() => sign.value);
const bDir = computed(() => -sign.value);
/** 电场力箭头终点（起点恒为粒子几何中心） */
const eTip = computed(() => ({ x: PX, y: AXIS_Y + eDir.value * eForceLen }));
/** 洛伦兹力箭头终点 */
const bTip = computed(() => ({ x: PX, y: AXIS_Y + bDir.value * bForceLen.value }));

/**
 * 受力标注位置：一律画在箭头尖端左侧（板外空白处），锚点右对齐
 *
 * @param tipY 箭头终点的纵坐标
 * @returns 文字基线锚点
 */
const forceLabelAt = (tipY: number): { x: number; y: number } => ({ x: PX - 12, y: tipY + 9 });
const eLabel = computed(() => forceLabelAt(eTip.value.y));
const bLabel = computed(() => forceLabelAt(bTip.value.y));

/** 出口处的横向偏移（屏幕坐标，y 向下为正）：由净力方向 s·(v − E/B) 决定 */
const bend = computed(() => -sign.value * ((speed.value - V_BALANCE) / V_BALANCE) * BEND_MAX);

/** 实际轨迹：入口切线水平（ξ = 0 处斜率为 0），横向偏移按 ξ² 增长；v = E/B 时退化成严格水平直线 */
const trailPath = computed(() => {
  const points: string[] = [];

  for (let i = 0; i <= TRAIL_SAMPLES; i += 1) {
    const xi = i / TRAIL_SAMPLES;
    const x = PX + xi * (PLATE_X1 - PX);
    const y = AXIS_Y + bend.value * xi * xi;

    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return `M ${points.join(" L ")}`;
});

/** 粒子上显示的电荷符号 */
const signGlyph = computed(() => (sign.value === 1 ? "+" : "−"));

/** 分步显隐：只切 visibility、元素始终留在 DOM 里（真删真插会把已可见元素顶跑） */
const fade = (on: boolean): { visibility: "visible" | "hidden" } => ({
  visibility: on ? "visible" : "hidden",
});

/* ── 面板读数（公式与数值都由上面的物理量算出来） ── */
const speedTex = computed(() => `${speed.value}\\ \\text{m/s}`);
/** 力读数统一以 10⁻¹⁷ N 为单位，方便两条对比条与数字对照 */
const forceTex = (force: number): string =>
  `${(force / 1e-17).toFixed(1)} \\times 10^{-17}\\ \\text{N}`;
const eForceTex = forceTex(eForce);
const bForceTex = computed(() => forceTex(bForce.value));
/** 对比条宽度：以满量程力为 100% */
const eBarWidth = `${((eForce / F_REF) * 100).toFixed(1)}%`;
const bBarWidth = computed(() => `${((bForce.value / F_REF) * 100).toFixed(1)}%`);

/**
 * 滑块输入：把速率写回响应式状态（受力箭头、对比条、轨迹随之真变）
 *
 * @param event 滑块输入事件
 */
const onSpeedInput = (event: Event): void => {
  speed.value = Number((event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="ss-root" :class="isLab ? 'ss-root-lab' : 'ss-root-figure'">
    <div class="ss-fig" :class="{ 'ss-fig-lab': isLab }">
      <svg
        :viewBox="`0 0 ${VB_W} ${VB_H}`"
        xmlns="http://www.w3.org/2000/svg"
        class="ss-svg"
        role="img"
        :aria-label="
          isLab
            ? '速度选择器：平行板间的匀强电场与垂直纸面向里的匀强磁场，粒子从板间入口沿中线射入'
            : '速度选择器结构图：上极板带正电、下极板带负电，板间有竖直向下的电场与垂直纸面向里的磁场，粒子从左端沿虚线射入'
        "
      >
        <!-- 磁场：垂直纸面向里的裸 × 平铺阵列（有阵列就不再画 ⊗B 图例） -->
        <FieldDots
          :x="DOTS_X"
          :y="DOTS_Y"
          :cols="DOTS_COLS"
          :rows="DOTS_ROWS"
          :spacing="DOTS_SPACING"
          :opacity="0.8"
          dir="in"
        />
        <!-- 电场：板间竖直向下的匀强电场 -->
        <CourseArrow
          v-for="x in E_ARROW_XS"
          :key="`ss-e-${x}`"
          :from="{ x, y: E_ARROW_Y0 }"
          :to="{ x, y: E_ARROW_Y1 }"
          stroke="var(--c-physics)"
          :stroke-width="2.6"
        />
        <!-- 上下极板：上板为正极、下板为负极 -->
        <line
          :x1="PLATE_X0"
          :y1="PLATE_TOP_Y"
          :x2="PLATE_X1"
          :y2="PLATE_TOP_Y"
          stroke="var(--c-neutral-300)"
          :stroke-width="PLATE_W"
          stroke-linecap="round"
        />
        <line
          :x1="PLATE_X0"
          :y1="PLATE_BOTTOM_Y"
          :x2="PLATE_X1"
          :y2="PLATE_BOTTOM_Y"
          stroke="var(--c-neutral-300)"
          :stroke-width="PLATE_W"
          stroke-linecap="round"
        />
        <text
          x="196"
          y="79"
          text-anchor="middle"
          :font-size="LABEL_FONT"
          font-family="KaTeX_Main"
          fill="var(--c-danger)"
          stroke="var(--c-bg)"
          stroke-width="4"
          paint-order="stroke"
        >
          +
        </text>
        <text
          x="196"
          y="245"
          text-anchor="middle"
          :font-size="LABEL_FONT"
          font-family="KaTeX_Main"
          fill="var(--c-velocity)"
          stroke="var(--c-bg)"
          stroke-width="4"
          paint-order="stroke"
        >
          −
        </text>
        <!-- 中线：例题页就是从入口到出口的这条虚线路径；实验页再叠一条更淡的参考中线 -->
        <line
          :x1="isLab ? PX : 140"
          :y1="AXIS_Y"
          :x2="isLab ? PLATE_X1 : 588"
          :y2="AXIS_Y"
          stroke="var(--c-text-dim)"
          stroke-width="2"
          :stroke-dasharray="isLab ? '8 7' : '11 8'"
          :opacity="isLab ? 0.35 : 0.75"
        />
        <!-- 实际轨迹：v = E/B 时与中线重合（严格水平直线），v 偏大 / 偏小向两侧弯 -->
        <path
          v-if="isLab"
          :d="trailPath"
          fill="none"
          stroke="var(--c-velocity)"
          stroke-width="3.5"
          stroke-linecap="round"
        />
        <!-- 射入速度 v（画在粒子上、沿中线指向右） -->
        <CourseArrow
          :from="{ x: PX, y: AXIS_Y }"
          :to="{ x: PX + V_ARROW_LEN, y: AXIS_Y }"
          stroke="var(--c-velocity)"
          :stroke-width="4"
        />
        <!-- 粒子：实验页用正负电语义色 + 符号，例题页保持中立（题目没说电荷正负） -->
        <circle
          :cx="PX"
          :cy="AXIS_Y"
          r="9"
          :fill="
            isLab ? (sign === 1 ? 'var(--c-danger)' : 'var(--c-velocity)') : 'var(--c-neutral-50)'
          "
          stroke="var(--c-bg)"
          stroke-width="1.6"
        />
        <text
          v-if="isLab"
          :x="PX"
          :y="AXIS_Y + 6"
          text-anchor="middle"
          :font-size="18"
          font-family="KaTeX_Main"
          fill="var(--c-bg)"
        >
          {{ signGlyph }}
        </text>
        <!-- 两个受力箭头：都从粒子几何中心出发，长度正比于大小、方向恒定相反 -->
        <g :style="fade(showForces)">
          <CourseArrow
            :from="{ x: PX, y: AXIS_Y }"
            :to="eTip"
            stroke="var(--c-force)"
            :stroke-width="4.5"
          />
          <CourseArrow
            :from="{ x: PX, y: AXIS_Y }"
            :to="bTip"
            stroke="var(--c-force)"
            :stroke-width="4.5"
          />
          <text
            :x="eLabel.x"
            :y="eLabel.y"
            text-anchor="end"
            :font-size="FORCE_FONT"
            font-family="KaTeX_Math"
            font-style="italic"
            fill="var(--c-force)"
            stroke="var(--c-bg)"
            stroke-width="4"
            paint-order="stroke"
          >
            qE
          </text>
          <text
            :x="bLabel.x"
            :y="bLabel.y"
            text-anchor="end"
            :font-size="FORCE_FONT"
            font-family="KaTeX_Math"
            font-style="italic"
            fill="var(--c-force)"
            stroke="var(--c-bg)"
            stroke-width="4"
            paint-order="stroke"
          >
            qvB
          </text>
        </g>
        <!-- 图内标注：v（速度）、B（磁场方向）、E（电场方向） -->
        <text
          x="204"
          y="141"
          text-anchor="middle"
          :font-size="LABEL_FONT"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="var(--c-velocity)"
          stroke="var(--c-bg)"
          stroke-width="4"
          paint-order="stroke"
        >
          v
        </text>
        <text
          x="238"
          y="125"
          :font-size="LABEL_FONT"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="var(--c-accent)"
          stroke="var(--c-bg)"
          stroke-width="4"
          paint-order="stroke"
        >
          B
        </text>
        <text
          x="238"
          y="193"
          :font-size="LABEL_FONT"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="var(--c-physics)"
          stroke="var(--c-bg)"
          stroke-width="4"
          paint-order="stroke"
        >
          E
        </text>
      </svg>
    </div>

    <div v-if="isLab" class="ss-panel">
      <div class="ss-speed">
        <div class="ss-speed-head">
          <span class="ss-speed-name"><Latex tex="v" /></span>
          <span class="ss-speed-val"><Latex :tex="speedTex" /></span>
        </div>
        <input
          class="ss-range"
          type="range"
          :min="V_MIN"
          :max="V_MAX"
          :step="V_STEP"
          :value="speed"
          @input="onSpeedInput"
        />
      </div>

      <div class="ss-charge">
        <span class="ss-charge-name mini-note">电荷</span>
        <button
          type="button"
          class="ss-chip"
          :class="{ 'ss-chip-on': sign === 1 }"
          @click="sign = 1"
        >
          <Latex tex="+q" />
        </button>
        <button
          type="button"
          class="ss-chip"
          :class="{ 'ss-chip-on': sign === -1 }"
          @click="sign = -1"
        >
          <Latex tex="-q" />
        </button>
      </div>

      <div class="ss-consts mini-note">
        <Latex tex="E = 500\ \text{V/m}" />
        <span class="ss-dot">·</span>
        <Latex tex="B = 0.5\ \text{T}" />
      </div>

      <!-- 力的大小对比：step ≥ 1 出现（占位保留，切换时不动版面） -->
      <div class="ss-forces" :class="{ 'ss-hidden': !showForces }">
        <div class="ss-force">
          <div class="ss-force-head">
            <span class="ss-force-name"><Latex tex="qE" /></span>
            <span class="ss-force-val mini-note"><Latex :tex="eForceTex" /></span>
          </div>
          <div class="ss-bar">
            <div class="ss-bar-fill" :style="{ width: eBarWidth }"></div>
          </div>
        </div>
        <div class="ss-force">
          <div class="ss-force-head">
            <span class="ss-force-name"><Latex tex="qvB" /></span>
            <span class="ss-force-val mini-note"><Latex :tex="bForceTex" /></span>
          </div>
          <div class="ss-bar">
            <div class="ss-bar-fill" :style="{ width: bBarWidth }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ss-root {
  min-width: 0;
}

/* 实验页：图在左、控制与读数在右（横向装置图 + 侧栏读数，两边都不挤） */
.ss-root-lab {
  display: flex;
  gap: 1.1rem;
  align-items: center;
  width: 100%;
}

/* 例题页：只出图，保持干净 */
.ss-root-figure {
  display: block;
}

.ss-fig {
  min-width: 0;
}

.ss-fig-lab {
  flex: 1 1 auto;
}

.ss-svg {
  display: block;
  height: auto;
}

.ss-root-lab .ss-svg {
  width: 100%;
}

.ss-root-figure .ss-svg {
  width: 720px;
  max-width: 100%;
  margin: 0 auto;
}

.ss-panel {
  display: flex;
  flex: 0 0 336px;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 0;
}

.ss-hidden {
  visibility: hidden;
}

.ss-speed {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.ss-speed-head {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  justify-content: space-between;
}

.ss-speed-name {
  color: var(--c-velocity);
  font-weight: 700;
}

.ss-speed-val {
  color: var(--c-text);
  font-weight: 700;
}

.ss-range {
  width: 100%;
  height: 1.1rem;
  cursor: pointer;
  accent-color: var(--c-velocity);
}

.ss-charge {
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.ss-charge-name {
  color: var(--c-text-dim);
}

.ss-chip {
  padding: 0.12rem 0.7rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  background: transparent;
  color: var(--c-text-dim);

  font: inherit;

  cursor: pointer;

  transition:
    border-color 0.15s ease,
    background 0.15s ease,
    color 0.15s ease;
}

.ss-chip-on {
  border-color: var(--c-accent);
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.ss-consts {
  display: flex;
  gap: 0.35rem;
  align-items: baseline;
  color: var(--c-text-dim);
}

.ss-dot {
  opacity: 0.6;
}

.ss-forces {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  padding-top: 0.5rem;
  border-top: 1px solid var(--c-border);
}

.ss-force {
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
}

.ss-force-head {
  display: flex;
  gap: 0.6rem;
  align-items: baseline;
  justify-content: space-between;
}

.ss-force-name {
  color: var(--c-force);
  font-weight: 700;
}

.ss-force-val {
  color: var(--c-text);
  white-space: nowrap;
}

.ss-bar {
  overflow: hidden;

  height: 0.55rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);

  background: var(--c-surface);
}

.ss-bar-fill {
  height: 100%;
  background: var(--c-force);
  transition: width 0.15s ease;
}
</style>
