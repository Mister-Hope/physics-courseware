<!--
  第 5 页配图：三维电磁波传播与交替激发演示（3D 动画精修版 · EmWaveChain）
  物理逻辑与视觉规约：
    1. 真实三维透视投影 + 深度排序（Painter's Algorithm）：
       - 传播方向沿 +x 轴向右前方延伸；
       - 变化的电场 E 沿竖直 y 轴（x-y 平面，珊瑚红 var(--c-danger)），变化的磁场 B 沿水平纵深 z 轴（x-z 平面，天青蓝 #60a5fa）；
       - 严格遵循麦克斯韦电磁理论与右手法则：E ⊥ B ⊥ v，且自由空间行波中 E 与 B 同相位（sin(kx - ωt)）；
       - 动态按摄像机深度 camZ 排序渲染各半波波瓣、场强矢量箭头与传播轴，前叶遮挡后叶、穿过交线严密真实；
    2. 振源与物理联动（60FPS 流畅行波动画）：
       - 左侧振源电荷沿偶极振子杆做简谐振动 y(t) = A·sin(-ωt)，与 x=0 处电场严格同相，向外辐射近场脉冲弧；
       - 空间各固定点上的 E、B 矢量箭头原地交替伸长、缩短与反向（体现横波质点/场矢不随波迁移，波形与能量由近及远传播）；
    3. 完美适配 Slidev 分步讲解（:step="$clicks"，支持 1 → 2 → 3 → 4 平滑展开）：
       - step 1~3（分步静态因果链）：波形静止于标准相位，标注与波峰毫厘不差地精准对齐：
         · step >= 1: 振源处竖直平面内变化的电场 E；
         · step >= 2: 变化的电场 E 激起与之垂直的水平面内变化的磁场 B（含 3D 正交平面切片与 90° 直角标）；
         · step >= 3: 变化的磁场 B 又激起新的变化的电场 E；
       - step >= 4（第 4 次点击）：电磁波以 60fps 由近及远连续传播，呈现动态波长标尺 λ、速度方向 v 与“由近及远传播”。
    4. 支持鼠标/触屏拖拽 3D 旋转观察正交空间结构（普通点击不拦截事件，确保 Slidev $clicks 正常推进），双击复位视角。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { A_B, A_E, LAMBDA, TOTAL_LEN, buildScenePrimitives, createProjector } from "./emWaveScene";
import type { Projector, RenderPrimitive } from "./emWaveScene";

const { step = 4, paused = false } = defineProps<{
  /** Slidev 点击步数 (1~4)；默认 4 显示完整三维电磁波传播 */
  step?: number;
  /** 是否暂停动画 */
  paused?: boolean;
}>();

// ══════════════ 视口与 3D 物理常数 ══════════════
const VIEW_W = 880;
const VIEW_H = 352;

const PERIOD_MS = 3400; // 行波周期（沉稳清晰，便于课堂观察相位传播）

const DEFAULT_YAW = -0.35;
const DEFAULT_PITCH = 0.36;

// 文字深色描边光晕（杜绝与网格或波瓣轮廓冲突）
const HALO = {
  stroke: "var(--c-bg)",
  "stroke-width": 3.8,
  "paint-order": "stroke",
} as const;

// ══════════════ 交互视角状态 ══════════════
const yaw = ref(DEFAULT_YAW);
const pitch = ref(DEFAULT_PITCH);

// 投影函数依赖视角：yaw / pitch 变化时重建（三角函数只预算一次）
const projector = computed(() => createProjector(yaw.value, pitch.value));
const project: Projector = (wx, wy, wz) => projector.value(wx, wy, wz);

let dragging = false;
let dragMoved = false;
let startX = 0;
let startY = 0;
let startYaw = DEFAULT_YAW;
let startPitch = DEFAULT_PITCH;

const onPointerDown = (e: PointerEvent): void => {
  dragging = true;
  dragMoved = false;
  startX = e.clientX;
  startY = e.clientY;
  startYaw = yaw.value;
  startPitch = pitch.value;
};

const onPointerMove = (e: PointerEvent): void => {
  if (!dragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  if (Math.hypot(dx, dy) > 4) dragMoved = true;

  if (!dragMoved) return;
  yaw.value = Math.max(-0.88, Math.min(0.45, startYaw + dx * 0.0045));
  pitch.value = Math.max(-0.55, Math.min(0.75, startPitch + dy * 0.0045));
};

const onPointerUp = (): void => {
  dragging = false;
};

const onSvgClick = (e: MouseEvent): void => {
  // 仅当发生拖拽旋转时拦截点击，保证 Slidev 普通点击正常推进 $clicks
  if (dragMoved) {
    e.stopPropagation();
    dragMoved = false;
  }
};

const resetView = (): void => {
  yaw.value = DEFAULT_YAW;
  pitch.value = DEFAULT_PITCH;
};

defineExpose({ resetView });

// ══════════════ 动画时间轴与分步平滑展开状态 ══════════════
// step 1~3 采用静态基准相位 0（波峰严格落在 x=56, 168, 280），step >= 4 开启连续行波传播
const phase = ref(0);
const isAnimatingWave = computed(() => step >= 4);

const targetReach = computed(() => {
  const current = step;

  if (current <= 0) return 0;
  if (current === 1) return 118 / TOTAL_LEN; // 第一正半波 E₁（峰在 x=56，于 x=112 节点收束）
  if (current === 2) return 232 / TOTAL_LEN; // 完整第一波长 E₁ & B₁（0..224）
  if (current === 3) return 344 / TOTAL_LEN; // 激起新的正波峰 E₂（峰在 x=280，至 x=336 收束）
  return 1;
});
const targetBAlpha = computed(() => (step >= 2 ? 1 : 0));

const currentReach = ref(targetReach.value);
const currentBAlpha = ref(targetBAlpha.value);

let raf = 0;
let lastNow = 0;
let prefersReducedMotion = false;

const tick = (now: number): void => {
  if (lastNow === 0) lastNow = now;
  const dt = Math.min(now - lastNow, 64);
  lastNow = now;

  if (isAnimatingWave.value) {
    if (!paused && !prefersReducedMotion)
      phase.value = (phase.value + (dt / PERIOD_MS) * 2 * Math.PI) % (2 * Math.PI);
  } else if (phase.value !== 0) {
    // 退回 step 1~3 静态讲解时平滑回归基准相位 0，确保标签与波峰严格对齐
    const distToZero = phase.value > Math.PI ? phase.value - 2 * Math.PI : phase.value;
    const stepBack = distToZero * Math.min(1, dt * 0.015);
    phase.value = (phase.value - stepBack + 2 * Math.PI) % (2 * Math.PI);
    if (Math.abs(distToZero) < 0.01) phase.value = 0;
  }

  // 分步平滑展开插值
  const lerpFactor = Math.min(1, dt * 0.009);
  currentReach.value += (targetReach.value - currentReach.value) * lerpFactor;
  currentBAlpha.value += (targetBAlpha.value - currentBAlpha.value) * lerpFactor;

  if (Math.abs(targetReach.value - currentReach.value) < 0.001)
    currentReach.value = targetReach.value;

  if (Math.abs(targetBAlpha.value - currentBAlpha.value) < 0.001)
    currentBAlpha.value = targetBAlpha.value;

  raf = requestAnimationFrame(tick);
};

watch(
  () => [step, paused],
  () => {
    if (prefersReducedMotion) {
      if (!isAnimatingWave.value) phase.value = 0;
      currentReach.value = targetReach.value;
      currentBAlpha.value = targetBAlpha.value;
    }
  },
);

onMounted(() => {
  prefersReducedMotion =
    globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  if (prefersReducedMotion) {
    currentReach.value = targetReach.value;
    currentBAlpha.value = targetBAlpha.value;
  }
  globalThis.addEventListener("pointermove", onPointerMove);
  globalThis.addEventListener("pointerup", onPointerUp);
  raf = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  globalThis.removeEventListener("pointermove", onPointerMove);
  globalThis.removeEventListener("pointerup", onPointerUp);
});

// ══════════════ 3D 参考底面网格（水平 x-z 磁平面基准） ══════════════
const horizontalGrid = computed(() => {
  const reachLen = currentReach.value * TOTAL_LEN;
  if (reachLen < 8 || currentBAlpha.value < 0.05) return null;

  const maxX = Math.max(20, reachLen);
  const bBound = A_B + 4;
  const p0 = project(0, 0, -bBound);
  const p1 = project(maxX, 0, -bBound);
  const p2 = project(maxX, 0, bBound);
  const p3 = project(0, 0, bBound);

  const outline = `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} L ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} L ${p3.x.toFixed(1)} ${p3.y.toFixed(1)} Z`;

  // 纵向参考线（四分之一波长刻度横梁，强化水平纵深立体感）
  const crossLines: { x1: number; y1: number; x2: number; y2: number; key: number }[] = [];
  const stepX = LAMBDA / 4; // 56
  for (let x = 0; x <= maxX; x += stepX) {
    const a = project(x, 0, -bBound);
    const b = project(x, 0, bBound);
    crossLines.push({ key: x, x1: a.x, y1: a.y, x2: b.x, y2: b.y });
  }

  return { outline, crossLines, opacity: currentBAlpha.value };
});

// ══════════════ 正交横截面切片与 90° 垂直标记（x = 56） ══════════════
const orthogonalSlice = computed(() => {
  if (step < 2 || currentBAlpha.value < 0.08) return null;
  const xRef = 56;
  const h = A_E + 8;
  const w = A_B + 8;

  // y-z 正交截面框
  const c1 = project(xRef, h, -w);
  const c2 = project(xRef, h, w);
  const c3 = project(xRef, -h, w);
  const c4 = project(xRef, -h, -w);
  const framePath = `M ${c1.x.toFixed(1)} ${c1.y.toFixed(1)} L ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} L ${c3.x.toFixed(1)} ${c3.y.toFixed(1)} L ${c4.x.toFixed(1)} ${c4.y.toFixed(1)} Z`;

  // 3D 直角标记 ⦜：沿 +E (+y) 与 +B (+z)
  const arm = 18;
  const po = project(xRef, 0, 0);
  const pe = project(xRef, arm, 0);
  const pb = project(xRef, 0, arm);
  const pc = project(xRef, arm, arm);
  const rightAnglePath = `M ${pe.x.toFixed(1)} ${pe.y.toFixed(1)} L ${pc.x.toFixed(1)} ${pc.y.toFixed(1)} L ${pb.x.toFixed(1)} ${pb.y.toFixed(1)}`;

  // 垂直轴与水平轴延长线
  const eTop = project(xRef, h, 0);
  const eBot = project(xRef, -h, 0);
  const bFront = project(xRef, 0, w);
  const bBack = project(xRef, 0, -w);

  return {
    framePath,
    rightAnglePath,
    origin: po,
    eTop,
    eBot,
    bFront,
    bBack,
    opacity: currentBAlpha.value,
  };
});

// ══════════════ 振源（step 1~3 静态示意；step >= 4 简谐振荡与近场脉冲） ══════════════
const sourceOscillator = computed(() => {
  const sx = -76;
  const top = project(sx, 54, 0);
  const bot = project(sx, -54, 0);
  // 与 x=0 处电场 E(0, t) = A_E * sin(-phase) 严格同相
  const yVal = 44 * Math.sin(-phase.value);
  const charge = project(sx, yVal, 0);
  const labelPos = project(sx, -84, 0);

  // 两道辐射波纹弧：静态模式下呈现柔和定格波纹，动画模式下向外脉冲传播
  const pulse = isAnimatingWave.value ? (phase.value / (2 * Math.PI)) % 1 : 0.28;
  const r1 = 16 + pulse * 30;
  const r2 = 16 + ((pulse + 0.5) % 1) * 30;
  const op1 = isAnimatingWave.value ? (1 - pulse) * 0.55 : 0.42;
  const op2 = isAnimatingWave.value ? (1 - ((pulse + 0.5) % 1)) * 0.55 : 0.24;

  const mid = project(sx, 0, 0);
  const arcPath = (radius: number): string => {
    const aTop = project(sx + radius * 0.65, radius * 0.85, 0);
    const aMid = project(sx + radius * 1.15, 0, 0);
    const aBot = project(sx + radius * 0.65, -radius * 0.85, 0);
    return `M ${aTop.x.toFixed(1)} ${aTop.y.toFixed(1)} Q ${aMid.x.toFixed(1)} ${aMid.y.toFixed(1)} ${aBot.x.toFixed(1)} ${aBot.y.toFixed(1)}`;
  };

  return {
    top,
    bot,
    mid,
    charge,
    labelPos,
    arc1: { d: arcPath(r1), opacity: op1 },
    arc2: { d: arcPath(r2), opacity: op2 },
  };
});

// ══════════════ 核心：深度排序（Painter's Algorithm）三维电磁波绘制列表 ══════════════
const scenePrimitives = computed<RenderPrimitive[]>(() =>
  buildScenePrimitives({
    reachLen: currentReach.value * TOTAL_LEN,
    bAlpha: currentBAlpha.value,
    phase: phase.value,
    step,
    project: projector.value,
  }),
);

// ══════════════ 3D 锚点文字标牌与因果链引导（step 1~3 静态精准对齐，step >= 4 切换至动态波长 λ 与传播标识） ══════════════
const annotations = computed(() => {
  const s = step;
  const showCausal = s >= 1 && s <= 3;

  // 第一波峰（x=56）：变化的电场 E
  const e1Label = project(56, 112, 0);
  const e1Anchor = project(56, 78, 0);

  // 第一磁波前瓣（x=56）：变化的磁场 B
  const b1Label = project(56, -32, 108);
  const b1Anchor = project(56, 0, 72);

  // 因果激起弧 1（E₁ → B₁，step 2~3 静态展示）
  const ex1From = project(68, 56, 8);
  const ex1To = project(72, 10, 62);
  const ex1Mid = project(86, 40, 44);
  const ex1Text = project(98, 48, 46);

  // 因果激起弧 2（B₁ → E₂，step 3 静态展示）
  const ex2From = project(176, 6, -60);
  const ex2To = project(262, 56, -6);
  const ex2Mid = project(208, 46, -42);
  const ex2Text = project(196, 56, -44);

  // 第二正波峰（x=280）：新的变化的电场 E
  const e2Label = project(286, 112, 0);
  const e2Anchor = project(280, 78, 0);

  // 传播轴末端的速度方向标注 v
  const vTip = project(TOTAL_LEN + 50, 0, 0);

  // step >= 4 实时追踪一对相邻 +E 波峰的波长 λ 尺标，周期边缘柔和淡入淡出
  const u = (((phase.value / (2 * Math.PI)) % 1) + 1) % 1;
  const lamX1 = 56 + u * LAMBDA;
  const lamX2 = lamX1 + LAMBDA;
  const lamTop1 = project(lamX1, 82, 0);
  const lamBot1 = project(lamX1, 106, 0);
  const lamTop2 = project(lamX2, 82, 0);
  const lamBot2 = project(lamX2, 106, 0);
  const lamMid = project((lamX1 + lamX2) / 2, 118, 0);
  const lamOpacity =
    (paused || prefersReducedMotion) && u < 0.01
      ? 0.88
      : Math.min(1, Math.min(u, 1 - u) / 0.12) * 0.88;

  return {
    step: s,
    showCausal,
    e1Label,
    e1Anchor,
    b1Label,
    b1Anchor,
    ex1From,
    ex1To,
    ex1Mid,
    ex1Text,
    ex2From,
    ex2To,
    ex2Mid,
    ex2Text,
    e2Label,
    e2Anchor,
    vTip,
    lamTop1,
    lamBot1,
    lamTop2,
    lamBot2,
    lamMid,
    lamOpacity,
  };
});
</script>

<template>
  <svg
    :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="电磁波三维传播示意图：变化的电场与变化的磁场在相互垂直的平面内交替激发、由近及远传播"
    class="select-none overflow-visible cursor-grab active:cursor-grabbing"
    style="display: block; margin: 0 auto"
    @pointerdown="onPointerDown"
    @click="onSvgClick"
    @dblclick.stop="resetView"
  >
    <defs>
      <!-- 电场 E 珊瑚红波瓣半透明纵向渐变 -->
      <linearGradient id="em-e-fill" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(248, 113, 113, 0.34)" />
        <stop offset="50%" stop-color="rgba(248, 113, 113, 0.10)" />
        <stop offset="100%" stop-color="rgba(248, 113, 113, 0.34)" />
      </linearGradient>

      <!-- 磁场 B 天青蓝波瓣半透明纵深渐变 -->
      <linearGradient id="em-b-fill" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(59, 130, 246, 0.32)" />
        <stop offset="50%" stop-color="rgba(96, 165, 250, 0.12)" />
        <stop offset="100%" stop-color="rgba(59, 130, 246, 0.32)" />
      </linearGradient>

      <!-- 振源发光球体径向渐变 -->
      <radialGradient id="em-source-glow" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#fef3c7" />
        <stop offset="50%" stop-color="#fbbf24" />
        <stop offset="100%" stop-color="#d97706" />
      </radialGradient>

      <!-- 因果激发弧箭头标记 -->
      <marker
        id="em-causal-head"
        markerWidth="7"
        markerHeight="7"
        refX="5.5"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0,0.5 6.5,3.5 0,6.5 1.5,3.5" fill="var(--c-accent)" />
      </marker>
    </defs>

    <!-- ════════════════════════════════════════════════
         1. 右上角精简图例（无多余框线，干净呈现正交关系 E ⊥ B ⊥ v）
    ════════════════════════════════════════════════ -->
    <g font-size="13" font-weight="500">
      <line
        x1="590"
        y1="22"
        x2="606"
        y2="22"
        stroke="var(--c-danger)"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <text x="612" y="26" fill="var(--c-danger)" :style="HALO">
        电场 <tspan font-family="KaTeX_Math, serif" font-style="italic">E</tspan>（竖直面）
      </text>

      <line
        x1="726"
        y1="22"
        x2="742"
        y2="22"
        stroke="var(--c-velocity)"
        stroke-width="2.4"
        stroke-linecap="round"
        :opacity="step >= 2 ? 1 : 0.35"
      />
      <text x="748" y="26" fill="var(--c-velocity)" :opacity="step >= 2 ? 1 : 0.35" :style="HALO">
        磁场 <tspan font-family="KaTeX_Math, serif" font-style="italic">B</tspan>（水平面）
      </text>
    </g>

    <!-- ════════════════════════════════════════════════
         2. 水平 x-z 磁场参考平面网格（强化“水平与竖直垂直”三维纵深感知）
    ════════════════════════════════════════════════ -->
    <g v-if="horizontalGrid" :opacity="horizontalGrid.opacity">
      <path
        :d="horizontalGrid.outline"
        fill="rgba(59, 130, 246, 0.045)"
        stroke="rgba(96, 165, 250, 0.22)"
        stroke-width="1"
        stroke-dasharray="4 4"
      />
      <line
        v-for="cl in horizontalGrid.crossLines"
        :key="`gx-${cl.key}`"
        :x1="cl.x1"
        :y1="cl.y1"
        :x2="cl.x2"
        :y2="cl.y2"
        stroke="rgba(96, 165, 250, 0.16)"
        stroke-width="0.9"
      />
    </g>

    <!-- ════════════════════════════════════════════════
         3. 正交横截面切片与 3D 垂直直角标（E ⊥ B）
    ════════════════════════════════════════════════ -->
    <g v-if="orthogonalSlice" :opacity="orthogonalSlice.opacity">
      <!-- 横截面框（垂直于传播方向） -->
      <path
        :d="orthogonalSlice.framePath"
        fill="rgba(148, 163, 184, 0.04)"
        stroke="rgba(148, 163, 184, 0.24)"
        stroke-width="1"
        stroke-dasharray="4 3"
      />
      <!-- 截面十字准星 -->
      <line
        :x1="orthogonalSlice.eTop.x"
        :y1="orthogonalSlice.eTop.y"
        :x2="orthogonalSlice.eBot.x"
        :y2="orthogonalSlice.eBot.y"
        stroke="rgba(248, 113, 113, 0.25)"
        stroke-width="1"
        stroke-dasharray="3 3"
      />
      <line
        :x1="orthogonalSlice.bFront.x"
        :y1="orthogonalSlice.bFront.y"
        :x2="orthogonalSlice.bBack.x"
        :y2="orthogonalSlice.bBack.y"
        stroke="rgba(96, 165, 250, 0.28)"
        stroke-width="1"
        stroke-dasharray="3 3"
      />
      <!-- 3D 直角标 ⦜ -->
      <path
        :d="orthogonalSlice.rightAnglePath"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.5"
        stroke-linejoin="round"
        opacity="0.88"
      />
    </g>

    <!-- ════════════════════════════════════════════════
         4. 左侧振源（周期性简谐振荡电荷 + 近场辐射波纹）
    ════════════════════════════════════════════════ -->
    <g v-if="step >= 1">
      <!-- 振子导杆 -->
      <line
        :x1="sourceOscillator.top.x"
        :y1="sourceOscillator.top.y"
        :x2="sourceOscillator.bot.x"
        :y2="sourceOscillator.bot.y"
        stroke="var(--c-text-dim)"
        stroke-width="2"
        stroke-linecap="round"
        opacity="0.55"
      />
      <!-- 导杆上下端点帽 -->
      <circle
        :cx="sourceOscillator.top.x"
        :cy="sourceOscillator.top.y"
        r="2.6"
        fill="var(--c-text-dim)"
        opacity="0.7"
      />
      <circle
        :cx="sourceOscillator.bot.x"
        :cy="sourceOscillator.bot.y"
        r="2.6"
        fill="var(--c-text-dim)"
        opacity="0.7"
      />
      <!-- 平衡位置虚点 -->
      <circle
        :cx="sourceOscillator.mid.x"
        :cy="sourceOscillator.mid.y"
        r="2"
        fill="var(--c-accent)"
        opacity="0.5"
      />

      <!-- 近场辐射波纹弧 -->
      <path
        :d="sourceOscillator.arc1.d"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.5"
        stroke-linecap="round"
        :opacity="sourceOscillator.arc1.opacity"
      />
      <path
        :d="sourceOscillator.arc2.d"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.3"
        stroke-linecap="round"
        :opacity="sourceOscillator.arc2.opacity"
      />

      <!-- 振动发光点电荷 -->
      <circle
        :cx="sourceOscillator.charge.x"
        :cy="sourceOscillator.charge.y"
        r="9.5"
        fill="rgba(226, 168, 70, 0.24)"
      />
      <circle
        :cx="sourceOscillator.charge.x"
        :cy="sourceOscillator.charge.y"
        r="5.6"
        fill="url(#em-source-glow)"
        stroke="#fef3c7"
        stroke-width="1"
      />

      <!-- 振源标注 -->
      <text
        :x="sourceOscillator.labelPos.x"
        :y="sourceOscillator.labelPos.y"
        text-anchor="middle"
        font-size="14"
        font-weight="600"
        fill="var(--c-accent)"
        :style="HALO"
      >
        振源
      </text>
    </g>

    <!-- ════════════════════════════════════════════════
         5. 深度排序渲染的 3D 电磁波主体（波瓣 + 场矢量 + 传播轴）
    ════════════════════════════════════════════════ -->
    <g v-if="step >= 1">
      <template v-for="prim in scenePrimitives" :key="prim.key">
        <!-- 传播中心轴分段 -->
        <g v-if="prim.kind === 'axis-seg'">
          <line
            :x1="prim.x1"
            :y1="prim.y1"
            :x2="prim.x2"
            :y2="prim.y2"
            stroke="var(--c-text-dim)"
            stroke-width="1.6"
            stroke-linecap="round"
            opacity="0.72"
          />
          <polygon
            v-if="prim.isTip && prim.headPoints"
            :points="prim.headPoints"
            fill="var(--c-accent)"
          />
        </g>

        <!-- 电场 E / 磁场 B 三维半波波瓣 -->
        <g v-else-if="prim.kind === 'lobe'" :opacity="prim.opacity">
          <path
            :d="prim.fillPath"
            :fill="prim.field === 'E' ? 'url(#em-e-fill)' : 'url(#em-b-fill)'"
          />
          <path
            :d="prim.strokePath"
            fill="none"
            :stroke="prim.field === 'E' ? 'var(--c-danger)' : 'var(--c-velocity)'"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>

        <!-- 固定空间格点 E / B 场强矢量箭头 -->
        <g v-else-if="prim.kind === 'arrow'" :opacity="prim.opacity">
          <line
            :x1="prim.x1"
            :y1="prim.y1"
            :x2="prim.x2"
            :y2="prim.y2"
            :stroke="prim.field === 'E' ? 'var(--c-danger)' : 'var(--c-velocity)'"
            :stroke-width="prim.strokeWidth"
            stroke-linecap="round"
          />
          <polygon
            :points="prim.headPoints"
            :fill="prim.field === 'E' ? 'var(--c-danger)' : 'var(--c-velocity)'"
          />
        </g>
      </template>
    </g>

    <!-- ════════════════════════════════════════════════
         6. 教学引导标注与因果链（step 1~3 静态精准指向波峰，step >= 4 切换为动态波长与传播标识）
    ════════════════════════════════════════════════ -->
    <!-- Step 1~3：变化的电场 E -->
    <g v-if="annotations.showCausal && annotations.step >= 1">
      <line
        :x1="annotations.e1Label.x"
        :y1="annotations.e1Label.y + 6"
        :x2="annotations.e1Anchor.x"
        :y2="annotations.e1Anchor.y"
        stroke="var(--c-danger)"
        stroke-width="1.1"
        stroke-dasharray="3 3"
        opacity="0.55"
      />
      <text
        :x="annotations.e1Label.x"
        :y="annotations.e1Label.y"
        text-anchor="middle"
        font-size="15"
        font-weight="600"
        fill="var(--c-text)"
        :style="HALO"
      >
        变化的电场
        <tspan font-family="KaTeX_Math, serif" font-style="italic" fill="var(--c-danger)">E</tspan>
      </text>
    </g>

    <!-- Step 2~3：激起变化的磁场 B（垂直平面） -->
    <g v-if="annotations.showCausal && annotations.step >= 2">
      <!-- 因果弧 E → B -->
      <path
        :d="`M ${annotations.ex1From.x.toFixed(1)} ${annotations.ex1From.y.toFixed(1)} Q ${annotations.ex1Mid.x.toFixed(1)} ${annotations.ex1Mid.y.toFixed(1)} ${annotations.ex1To.x.toFixed(1)} ${annotations.ex1To.y.toFixed(1)}`"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.6"
        stroke-dasharray="4 3"
        marker-end="url(#em-causal-head)"
        opacity="0.88"
      />
      <text
        :x="annotations.ex1Text.x"
        :y="annotations.ex1Text.y"
        text-anchor="start"
        font-size="13"
        font-weight="600"
        fill="var(--c-accent)"
        :style="HALO"
      >
        激起
      </text>

      <!-- 磁场标签 -->
      <line
        :x1="annotations.b1Label.x"
        :y1="annotations.b1Label.y - 14"
        :x2="annotations.b1Anchor.x"
        :y2="annotations.b1Anchor.y"
        stroke="var(--c-velocity)"
        stroke-width="1.1"
        stroke-dasharray="3 3"
        opacity="0.55"
      />
      <text
        :x="annotations.b1Label.x"
        :y="annotations.b1Label.y"
        text-anchor="middle"
        font-size="15"
        font-weight="600"
        fill="var(--c-text)"
        :style="HALO"
      >
        变化的磁场
        <tspan font-family="KaTeX_Math, serif" font-style="italic" fill="var(--c-velocity)"
          >B</tspan
        >
      </text>
    </g>

    <!-- Step 3：磁场 B 又激起新的变化的电场 E -->
    <g v-if="annotations.showCausal && annotations.step >= 3">
      <!-- 因果弧 B → E' -->
      <path
        :d="`M ${annotations.ex2From.x.toFixed(1)} ${annotations.ex2From.y.toFixed(1)} Q ${annotations.ex2Mid.x.toFixed(1)} ${annotations.ex2Mid.y.toFixed(1)} ${annotations.ex2To.x.toFixed(1)} ${annotations.ex2To.y.toFixed(1)}`"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.6"
        stroke-dasharray="4 3"
        marker-end="url(#em-causal-head)"
        opacity="0.88"
      />
      <text
        :x="annotations.ex2Text.x"
        :y="annotations.ex2Text.y"
        text-anchor="middle"
        font-size="13"
        font-weight="600"
        fill="var(--c-accent)"
        :style="HALO"
      >
        激起
      </text>

      <!-- 新的变化的电场标签 -->
      <line
        :x1="annotations.e2Label.x"
        :y1="annotations.e2Label.y + 6"
        :x2="annotations.e2Anchor.x"
        :y2="annotations.e2Anchor.y"
        stroke="var(--c-danger)"
        stroke-width="1.1"
        stroke-dasharray="3 3"
        opacity="0.55"
      />
      <text
        :x="annotations.e2Label.x"
        :y="annotations.e2Label.y"
        text-anchor="middle"
        font-size="15"
        font-weight="600"
        fill="var(--c-text)"
        :style="HALO"
      >
        新的变化的电场
        <tspan font-family="KaTeX_Math, serif" font-style="italic" fill="var(--c-danger)">E</tspan>
      </text>
    </g>

    <!-- Step >= 4：波长 λ 尺标 · 传播速度 v · 由近及远传播总结箭头 -->
    <g v-if="annotations.step >= 4">
      <!-- 传播轴末端速度标注 -->
      <text
        :x="annotations.vTip.x"
        :y="annotations.vTip.y + 4"
        text-anchor="start"
        font-family="KaTeX_Math, serif"
        font-style="italic"
        font-size="16"
        font-weight="600"
        fill="var(--c-accent)"
        :style="HALO"
      >
        v
      </text>

      <!-- 波长 λ 尺标（随相邻两 +E 波峰同步移动） -->
      <g :opacity="annotations.lamOpacity">
        <line
          :x1="annotations.lamTop1.x"
          :y1="annotations.lamTop1.y"
          :x2="annotations.lamBot1.x"
          :y2="annotations.lamBot1.y"
          stroke="var(--c-text-dim)"
          stroke-width="1"
          stroke-dasharray="3 2.5"
        />
        <line
          :x1="annotations.lamTop2.x"
          :y1="annotations.lamTop2.y"
          :x2="annotations.lamBot2.x"
          :y2="annotations.lamBot2.y"
          stroke="var(--c-text-dim)"
          stroke-width="1"
          stroke-dasharray="3 2.5"
        />
        <line
          :x1="annotations.lamBot1.x"
          :y1="annotations.lamBot1.y"
          :x2="annotations.lamBot2.x"
          :y2="annotations.lamBot2.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.2"
        />
        <text
          :x="annotations.lamMid.x"
          :y="annotations.lamMid.y"
          text-anchor="middle"
          font-family="KaTeX_Math, serif"
          font-style="italic"
          font-size="15"
          fill="var(--c-text-dim)"
          :style="HALO"
        >
          λ
        </text>
      </g>

      <!-- 底部“由近及远传播”主传播矢量箭头 -->
      <CourseArrow
        :from="{ x: 96, y: 332 }"
        :to="{ x: 784, y: 332 }"
        stroke="var(--c-accent)"
        :stroke-width="2.6"
      />
      <text
        x="440"
        y="320"
        text-anchor="middle"
        font-size="15"
        font-weight="600"
        fill="var(--c-accent)"
        :style="HALO"
      >
        由近及远传播（电磁波
        <tspan font-family="KaTeX_Math, serif" font-style="italic">E</tspan>
        ⊥
        <tspan font-family="KaTeX_Math, serif" font-style="italic">B</tspan>
        ⊥
        <tspan font-family="KaTeX_Math, serif" font-style="italic">v</tspan>）
      </text>
    </g>
  </svg>
</template>
