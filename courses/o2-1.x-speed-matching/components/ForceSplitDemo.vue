<!-- 选必2 1.x《复合场中的配速法与摆线运动》核心演示（精修美化版）
     四步教学演示：
     ① 小球居中静止，只画重力 mg（竖直向下）
     ② 小球身上加一对等大反向水平速度 v₁（向右）、v₂（向左），
        各自对应洛伦兹力：f₁ 向上（与重力抵消）、f₂ 向下（与重力同向等大）
     ③ 小球左右裂开成两个子系统：
        · 左球：恒定系统（mg 向下 + f₁ 向上 + v₁ 向右，全程不动）
        · 右球：旋转系统（v₂ 向左 + f₂ 向下，初始时刻）
     ④ 左球保持不动，右球的 v₂ 与 f₂ 沿正确物理方向同步旋转（f₂ 恒垂直于 v₂）
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

const {
  step = 0,
  period = 4000,
  playing = true,
  width = 900,
} = defineProps<{
  /** 当前演示步骤 0…3 */
  step?: number;
  /** 旋转周期 (ms)，默认 4000ms */
  period?: number;
  /** 是否正在播放动画 */
  playing?: boolean;
  /** 宽度 */
  width?: number;
}>();

interface Point {
  x: number;
  y: number;
}

const spinning = computed(() => step >= 3 && playing);

/* ═══════════ 画布与几何（viewBox 900×450） ═══════════ */
const W = 900;
const H = 450;

/** 第一步：居中小球 */
const CENTER: Point = { x: 450, y: 220 };
/** 第三步之后：左球（恒定系统）与右球（旋转系统）分别落在两侧 */
const LEFT: Point = { x: 260, y: 220 };
const RIGHT: Point = { x: 640, y: 220 };

/** 矢量长度比例尺（100px） */
const PX = 100;

/** 小球半径 */
const BALL_R = 24;

/** 旋转动画 */
const theta = ref(0);
let frame = 0;
let t0 = 0;

const tick = (now: number): void => {
  if (t0 === 0) t0 = now;
  const p = period > 0 ? period : 4000;
  theta.value = (((now - t0) / p) % 1) * Math.PI * 2;
  frame = requestAnimationFrame(tick);
};

const startSpin = (): void => {
  if (frame !== 0) return;
  t0 = 0;
  frame = requestAnimationFrame(tick);
};

const stopSpin = (): void => {
  if (frame !== 0) cancelAnimationFrame(frame);
  frame = 0;
};

watch(
  spinning,
  (on) => {
    if (on) startSpin();
    else stopSpin();
  },
  { immediate: true },
);

watch(
  () => step,
  (newStep) => {
    if (newStep < 3) theta.value = 0;
  },
);

onMounted(() => {
  if (spinning.value) startSpin();
});

onBeforeUnmount(stopSpin);

/* ═══════════ 矢量计算 ═══════════ */
// 步骤 1 & 2 中重力 mg 与洛伦兹力 f2 都在下方，为避免视觉叠线：
// 重力 mg 微向左偏 5px，洛伦兹力 f2 微向右偏 5px，清晰并置
const mgTailStep1: Point = { x: CENTER.x - 7, y: CENTER.y + BALL_R };
const mgHeadStep1: Point = { x: CENTER.x - 7, y: CENTER.y + PX };

const f2TailStep1: Point = { x: CENTER.x + 7, y: CENTER.y + BALL_R };
const f2HeadStep1: Point = { x: CENTER.x + 7, y: CENTER.y + PX };

// 旋转右球矢量：
// 物理规律：正电荷在向里磁场中，v2 初始向左，所受洛伦兹力 f2 初始向下
// 沿顺时针方向转动（由于向下受力轨迹向下弯曲）
// v2 = len * (-cos(θ), sin(θ))
// f2 = len * (sin(θ), cos(θ))，满足 f2 ⊥ v2 且 f2 永远指向即时瞬时轨迹内侧
const currentV2 = computed<Point>(() => {
  const currentAngle = step >= 3 ? theta.value : 0;
  return {
    x: -PX * Math.cos(currentAngle),
    y: PX * Math.sin(currentAngle),
  };
});

const currentF2 = computed<Point>(() => {
  const currentAngle = step >= 3 ? theta.value : 0;
  return {
    x: PX * Math.sin(currentAngle),
    y: PX * Math.cos(currentAngle),
  };
});

// 计算矢量箭头起点（贴紧小球球边缘出发，避免箭头穿入球体）
const arrowTail = (center: Point, dirVec: Point, r = BALL_R): Point => {
  const len = Math.hypot(dirVec.x, dirVec.y) || 1;
  return {
    x: center.x + (dirVec.x / len) * r,
    y: center.y + (dirVec.y / len) * r,
  };
};

// 计算矢量箭头终点
const arrowHead = (center: Point, dirVec: Point): Point => ({
  x: center.x + dirVec.x,
  y: center.y + dirVec.y,
});

// 标签外扩位置（顺着矢量方向或外法线稍微向外偏移，保证绝不与箭头及小球重叠）
const labelPos = (center: Point, dirVec: Point, extraDist = 24): Point => {
  const len = Math.hypot(dirVec.x, dirVec.y) || 1;
  return {
    x: center.x + dirVec.x + (dirVec.x / len) * extraDist,
    y: center.y + dirVec.y + (dirVec.y / len) * extraDist,
  };
};

/* ═══════════ 样式常量 ═══════════ */
const HALO = {
  stroke: "#0f172a",
  "stroke-width": 3.8,
  "paint-order": "stroke",
} as const;

const MATH = "KaTeX_Math, 'Times New Roman', serif";
const MAIN = "KaTeX_Main, 'Times New Roman', serif";
</script>

<template>
  <div class="fig-split w-full flex justify-center">
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      :width="width"
      class="fig-svg select-none overflow-visible block"
      role="img"
      aria-label="复合场中的配速法与摆线运动示意图"
    >
      <defs>
        <!-- 粒子球体质感渐变 -->
        <radialGradient id="sm-ball-fill" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stop-color="var(--c-surface-solid)" />
          <stop offset="100%" stop-color="var(--c-neutral-900)" />
        </radialGradient>
      </defs>

      <!-- 1. 背景匀强磁场 (垂直纸面向里，统一清爽金黄色 ×) -->
      <FieldDots
        :x="55"
        :y="55"
        :cols="9"
        :rows="5"
        :spacing="98"
        :size="5"
        :line-width="1.6"
        :opacity="0.18"
        color="var(--c-accent, #e2a846)"
        dir="in"
      />

      <!-- ════════════════════════════════════════════════════════════════════
           Step 0：小球居中静止，只画重力 mg（竖直向下）
           ════════════════════════════════════════════════════════════════════ -->
      <g v-if="step === 0">
        <!-- 居中小球 -->
        <circle
          :cx="CENTER.x"
          :cy="CENTER.y"
          :r="BALL_R"
          fill="url(#sm-ball-fill)"
          stroke="var(--c-accent)"
          stroke-width="3"
        />
        <!-- 粗实清晰的正电荷 "+" 符号，保证后排投影一目了然 -->
        <rect
          :x="CENTER.x - 7.5"
          :y="CENTER.y - 2.5"
          width="15"
          height="5"
          rx="2.5"
          fill="var(--c-accent)"
        />
        <rect
          :x="CENTER.x - 2.5"
          :y="CENTER.y - 7.5"
          width="5"
          height="15"
          rx="2.5"
          fill="var(--c-accent)"
        />

        <!-- 重力箭头 mg (竖直向下，长 100px) -->
        <CourseArrow
          :from="{ x: CENTER.x, y: CENTER.y + BALL_R }"
          :to="{ x: CENTER.x, y: CENTER.y + PX }"
          stroke="var(--c-force)"
          :stroke-width="4"
          :head-size="15"
        />
        <!-- 重力标签 mg -->
        <text
          :x="CENTER.x + 22"
          :y="CENTER.y + 68"
          :font-size="26"
          :font-family="MATH"
          font-style="italic"
          fill="var(--c-force)"
          :style="HALO"
        >
          m
          <tspan :font-family="MATH" font-style="italic">g</tspan>
        </text>

        <!-- 教学状态说明 -->
        <text
          :x="CENTER.x"
          :y="CENTER.y + PX + 50"
          :font-size="21"
          :font-family="MAIN"
          fill="var(--c-text)"
          text-anchor="middle"
          :style="HALO"
        >
          居中静止 · 仅受重力
        </text>
      </g>

      <!-- ════════════════════════════════════════════════════════════════════
           Step 1：小球身上多出一对速度 (v1, v2) 与 两个洛伦兹力 (f1, f2)
           ════════════════════════════════════════════════════════════════════ -->
      <g v-if="step === 1">
        <!-- 居中小球 -->
        <circle
          :cx="CENTER.x"
          :cy="CENTER.y"
          :r="BALL_R"
          fill="url(#sm-ball-fill)"
          stroke="var(--c-accent)"
          stroke-width="3"
        />
        <!-- 正电荷 "+" 符号 -->
        <rect
          :x="CENTER.x - 7.5"
          :y="CENTER.y - 2.5"
          width="15"
          height="5"
          rx="2.5"
          fill="var(--c-accent)"
        />
        <rect
          :x="CENTER.x - 2.5"
          :y="CENTER.y - 7.5"
          width="5"
          height="15"
          rx="2.5"
          fill="var(--c-accent)"
        />

        <!-- 1. 速度 v1（向右 →，速度蓝） -->
        <CourseArrow
          :from="{ x: CENTER.x + BALL_R, y: CENTER.y }"
          :to="{ x: CENTER.x + PX, y: CENTER.y }"
          stroke="var(--c-velocity)"
          :stroke-width="4"
          :head-size="15"
        />
        <text
          :x="CENTER.x + PX * 0.62"
          :y="CENTER.y - 12"
          :font-size="25"
          text-anchor="middle"
          :font-family="MATH"
          font-style="italic"
          fill="var(--c-velocity)"
          :style="HALO"
        >
          v
          <tspan :font-family="MAIN" font-size="17" dy="5">1</tspan>
        </text>

        <!-- 2. 速度 v2（向左 ←，速度蓝） -->
        <CourseArrow
          :from="{ x: CENTER.x - BALL_R, y: CENTER.y }"
          :to="{ x: CENTER.x - PX, y: CENTER.y }"
          stroke="var(--c-velocity)"
          :stroke-width="4"
          :head-size="15"
        />
        <text
          :x="CENTER.x - PX * 0.62"
          :y="CENTER.y - 12"
          :font-size="25"
          text-anchor="middle"
          :font-family="MATH"
          font-style="italic"
          fill="var(--c-velocity)"
          :style="HALO"
        >
          v
          <tspan :font-family="MAIN" font-size="17" dy="5">2</tspan>
        </text>

        <!-- 3. 洛伦兹力 f1（向上 ↑，力红，与重力抵消） -->
        <CourseArrow
          :from="{ x: CENTER.x, y: CENTER.y - BALL_R }"
          :to="{ x: CENTER.x, y: CENTER.y - PX }"
          stroke="var(--c-force)"
          :stroke-width="4"
          :head-size="15"
        />
        <text
          :x="CENTER.x + 22"
          :y="CENTER.y - 58"
          :font-size="25"
          :font-family="MATH"
          font-style="italic"
          fill="var(--c-force)"
          :style="HALO"
        >
          f
          <tspan :font-family="MAIN" font-size="17" dy="5">1</tspan>
        </text>

        <!-- 4. 重力 mg 与 洛伦兹力 f2（均向下，微并置双轨，标界不互吃） -->
        <!-- mg（略偏左） -->
        <CourseArrow
          :from="mgTailStep1"
          :to="mgHeadStep1"
          stroke="var(--c-force)"
          :stroke-width="3.8"
          :head-size="14"
        />
        <text
          :x="mgTailStep1.x - 18"
          :y="CENTER.y + 68"
          :font-size="25"
          text-anchor="end"
          :font-family="MATH"
          font-style="italic"
          fill="var(--c-force)"
          :style="HALO"
        >
          m
          <tspan :font-family="MATH" font-style="italic">g</tspan>
        </text>

        <!-- f2（略偏右） -->
        <CourseArrow
          :from="f2TailStep1"
          :to="f2HeadStep1"
          stroke="var(--c-force)"
          :stroke-width="3.8"
          :head-size="14"
        />
        <text
          :x="f2TailStep1.x + 18"
          :y="CENTER.y + 68"
          :font-size="25"
          text-anchor="start"
          :font-family="MATH"
          font-style="italic"
          fill="var(--c-force)"
          :style="HALO"
        >
          f
          <tspan :font-family="MAIN" font-size="17" dy="5">2</tspan>
        </text>

        <!-- 教学说明 -->
        <text
          :x="CENTER.x"
          :y="CENTER.y + PX + 50"
          :font-size="21"
          :font-family="MAIN"
          fill="var(--c-text)"
          text-anchor="middle"
          :style="HALO"
        >
          配出一对速度 (v₁=−v₂) 产生一对洛伦兹力 (f₁=−f₂)
        </text>
      </g>

      <!-- ════════════════════════════════════════════════════════════════════
           Step 2 & 3：裂开成左右两个球（左球恒定不变，右球匀速旋转）
           ════════════════════════════════════════════════════════════════════ -->
      <g v-if="step >= 2">
        <!-- ──────────────────────── 2.1 左球：恒定系统（全程不动） ──────────────────────── -->
        <g id="left-system">
          <!-- 左球小球 -->
          <circle
            :cx="LEFT.x"
            :cy="LEFT.y"
            :r="BALL_R"
            fill="url(#sm-ball-fill)"
            stroke="var(--c-accent)"
            stroke-width="3"
          />
          <rect
            :x="LEFT.x - 7.5"
            :y="LEFT.y - 2.5"
            width="15"
            height="5"
            rx="2.5"
            fill="var(--c-accent)"
          />
          <rect
            :x="LEFT.x - 2.5"
            :y="LEFT.y - 7.5"
            width="5"
            height="15"
            rx="2.5"
            fill="var(--c-accent)"
          />

          <!-- 重力 mg（向下 ↓） -->
          <CourseArrow
            :from="{ x: LEFT.x, y: LEFT.y + BALL_R }"
            :to="{ x: LEFT.x, y: LEFT.y + PX }"
            stroke="var(--c-force)"
            :stroke-width="4"
            :head-size="15"
          />
          <text
            :x="LEFT.x - 18"
            :y="LEFT.y + 68"
            :font-size="25"
            text-anchor="end"
            :font-family="MATH"
            font-style="italic"
            fill="var(--c-force)"
            :style="HALO"
          >
            m
            <tspan :font-family="MATH" font-style="italic">g</tspan>
          </text>

          <!-- 洛伦兹力 f1（向上 ↑） -->
          <CourseArrow
            :from="{ x: LEFT.x, y: LEFT.y - BALL_R }"
            :to="{ x: LEFT.x, y: LEFT.y - PX }"
            stroke="var(--c-force)"
            :stroke-width="4"
            :head-size="15"
          />
          <text
            :x="LEFT.x - 18"
            :y="LEFT.y - 58"
            :font-size="25"
            text-anchor="end"
            :font-family="MATH"
            font-style="italic"
            fill="var(--c-force)"
            :style="HALO"
          >
            f
            <tspan :font-family="MAIN" font-size="17" dy="5">1</tspan>
          </text>

          <!-- 速度 v1（向右 →） -->
          <CourseArrow
            :from="{ x: LEFT.x + BALL_R, y: LEFT.y }"
            :to="{ x: LEFT.x + PX, y: LEFT.y }"
            stroke="var(--c-velocity)"
            :stroke-width="4"
            :head-size="15"
          />
          <text
            :x="LEFT.x + PX * 0.62"
            :y="LEFT.y - 12"
            :font-size="25"
            text-anchor="middle"
            :font-family="MATH"
            font-style="italic"
            fill="var(--c-velocity)"
            :style="HALO"
          >
            v
            <tspan :font-family="MAIN" font-size="17" dy="5">1</tspan>
          </text>

          <!-- 底部说明：全程不变，匀速直线运动 -->
          <text
            :x="LEFT.x"
            :y="LEFT.y + PX + 50"
            :font-size="22"
            :font-family="MAIN"
            font-weight="600"
            fill="var(--c-text)"
            text-anchor="middle"
            :style="HALO"
          >
            不变
          </text>
          <text
            :x="LEFT.x"
            :y="LEFT.y + PX + 78"
            :font-size="16"
            :font-family="MAIN"
            fill="var(--c-text-dim)"
            text-anchor="middle"
            :style="HALO"
          >
            f₁ 与 mg 抵消 · 匀速直线运动
          </text>
        </g>

        <!-- ──────────────────────── 2.2 右球：转动系统（一起转） ──────────────────────── -->
        <g id="right-system">
          <!-- 旋转参考虚线圆周 (半径 R = 100px) -->
          <circle
            :cx="RIGHT.x"
            :cy="RIGHT.y"
            :r="PX"
            fill="none"
            stroke="var(--c-text-dim)"
            stroke-width="1.6"
            stroke-dasharray="6 6"
            opacity="0.45"
          />

          <!-- 右球小球 -->
          <circle
            :cx="RIGHT.x"
            :cy="RIGHT.y"
            :r="BALL_R"
            fill="url(#sm-ball-fill)"
            stroke="var(--c-accent)"
            stroke-width="3"
          />
          <rect
            :x="RIGHT.x - 7.5"
            :y="RIGHT.y - 2.5"
            width="15"
            height="5"
            rx="2.5"
            fill="var(--c-accent)"
          />
          <rect
            :x="RIGHT.x - 2.5"
            :y="RIGHT.y - 7.5"
            width="5"
            height="15"
            rx="2.5"
            fill="var(--c-accent)"
          />

          <!-- 速度矢量 v2（一起转，始终与 f2 垂直） -->
          <CourseArrow
            :from="arrowTail(RIGHT, currentV2)"
            :to="arrowHead(RIGHT, currentV2)"
            stroke="var(--c-velocity)"
            :stroke-width="4"
            :head-size="15"
          />
          <text
            :x="labelPos(RIGHT, currentV2, 20).x"
            :y="labelPos(RIGHT, currentV2, 20).y"
            :font-size="25"
            text-anchor="middle"
            dominant-baseline="central"
            :font-family="MATH"
            font-style="italic"
            fill="var(--c-velocity)"
            :style="HALO"
          >
            v
            <tspan :font-family="MAIN" font-size="17" dy="5">2</tspan>
          </text>

          <!-- 洛伦兹力矢量 f2（一起转，恒指向轨迹圆心，垂直于 v2） -->
          <CourseArrow
            :from="arrowTail(RIGHT, currentF2)"
            :to="arrowHead(RIGHT, currentF2)"
            stroke="var(--c-force)"
            :stroke-width="4"
            :head-size="15"
          />
          <text
            :x="labelPos(RIGHT, currentF2, 20).x"
            :y="labelPos(RIGHT, currentF2, 20).y"
            :font-size="25"
            text-anchor="middle"
            dominant-baseline="central"
            :font-family="MATH"
            font-style="italic"
            fill="var(--c-force)"
            :style="HALO"
          >
            f
            <tspan :font-family="MAIN" font-size="17" dy="5">2</tspan>
          </text>

          <!-- 底部说明：一起转，匀速圆周运动 -->
          <text
            :x="RIGHT.x"
            :y="RIGHT.y + PX + 50"
            :font-size="22"
            :font-family="MAIN"
            font-weight="600"
            fill="var(--c-text)"
            text-anchor="middle"
            :style="HALO"
          >
            一起转
          </text>
          <text
            :x="RIGHT.x"
            :y="RIGHT.y + PX + 78"
            :font-size="16"
            :font-family="MAIN"
            fill="var(--c-text-dim)"
            text-anchor="middle"
            :style="HALO"
          >
            仅受洛伦兹力 f₂ · 匀速圆周运动
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
/* 速度分解演示图：840px（渲染高 ≈ 420px），第 14 页 `.page-grow` 可用高度 ≈ 439px，留出余量；
   宽度上限走共享 .fig-svg 读的 --fig-max */
.fig-split {
  --fig-max: 840px;
  width: 100%;
}
</style>
