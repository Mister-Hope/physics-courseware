<!--
  选必二 1.x 复合场（例 4）· 配图：在赤道处向东水平抛出带电小球（侧视，纸面取"东西—竖直"平面）
  ── 题干（由 slides.md 给出，本组件只画图）──
     在赤道处，将一小球向东水平抛出，落地点为 a（不带电的参照过程）；给小球带上电荷后，
     仍以原来的速度抛出，考虑地磁场的影响。赤道处地磁场水平向北，在"东西—竖直"这个侧视图里
     正好垂直纸面向里 —— 铺满的裸 × 阵列（不再单独画带圈的 ⊗B 图例）。
  ── 分步 ——
     showAnalysis=false：干净题目图 = 裸 × 磁场阵列 + 地面 + 抛出点小球 + 初速度 v（向东）
                        + 不带电的参照轨迹（落到 a）+ 落地点 a（空心圈）+ 右上角「西 → 东」方向标注；
     showAnalysis=true ：点击之后才出现分析标注 = 带正电的轨迹（落在 a 的东侧，末梢画实心点）
                        + 沿轨迹循环运动的小球 + 沿轨迹切线的速度 v + 始终竖直向上的洛伦兹力 F_洛。
     注意：题里的 a 是"不带电时"的落点。洛伦兹力竖直向上 ⟹ 等效重力变小、空中时间变长 ⟹ 带正电时落在
       a 的东侧；所以 a 画在偏西的参照轨迹末端（空心圈），带电后的落点用实心点标在它东边，与讲解文字一致。
  ── 动画（本次改动的重点）──
     requestAnimationFrame 驱动循环进度 p ∈ [0, 1)：一个周期 3 s，小球到达地面后立刻从抛出点重来。
     小球位置 x = x₀ + R p、y = y₀ + H p²（水平匀速 + 竖直匀加速，切线越来越陡）；
     速度箭头沿轨迹切线、长度 ∝ 真实速率（p = 0 处与抛出点的静止 v 箭头一样长），
     洛伦兹力箭头恒竖直向上、长度固定。只在 showAnalysis 为 true 时启动 rAF，
     该 prop 转 false 或组件卸载时 cancelAnimationFrame。
  ── 渲染（图栏宽约 393 CSS px）──
     svg 定宽 380px、渲染高 ≈ 242px（缩放 ≈ 0.58）：viewBox 660×420 与所有坐标都不动，
     只把"尺寸类"数值按 1.7× 放大（font-size / 圆 r / stroke-width / 箭头三角 head-size /
     FieldDots 的 size 与 line-width / 阴影带 thickness 与线宽），否则图内字号只剩七八像素。
  ── 几何（viewBox 用户单位；x 向右 = 东，y 向下 = 更低）──
     抛出点 (196, 210)：小球空心圆 r = 15；地面 y = 352、从 x = 110 铺到 610；落差 H = 142。
     两条轨迹都是同一条参数化抛物线 x = x₀ + R p、y = y₀ + H p²（在 p 上采样成折线）：
       不带电（参照）：水平射程 R = 204 ⟹ 落到 a = (400, 352)；
       带正电（运动小球走这条）：R = 274 ⟹ 落到 (470, 352)，在 a 东侧 70 处。
     裸 × 阵列 5 列 × 4 行、间距 103（见 FIELD）：横向 87 → 499、纵向 53 → 362，都在地面以上。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

interface Point {
  x: number;
  y: number;
}

const { showAnalysis = false } = defineProps<{
  /** 点击出分析之后才画带电后的轨迹、运动小球、速度 / 洛伦兹力箭头与落点对照；干净题目图时传 false */
  showAnalysis?: boolean;
}>();

/* ── 画布与几何（viewBox 用户单位；x 向右 = 东，y 向下 = 更低）── */
const W = 660;
const H = 420;
/** 抛出点（小球球心） */
const THROW: Point = { x: 196, y: 210 };
/** 地面 */
const GROUND_Y = 352;
const GROUND_FROM: Point = { x: 110, y: GROUND_Y };
const GROUND_TO: Point = { x: 610, y: GROUND_Y };
/** 小球半径 */
const BALL_R = 15;
/** 不带电（参照）的落地点 a：题目给定的落点，轨迹就是普通平抛抛物线 */
const REF_LAND: Point = { x: 400, y: GROUND_Y };
/** 带正电后的落点：洛伦兹力竖直向上 ⟹ 等效重力变小、空中时间变长 ⟹ 落在 a 的东侧 */
const CHARGED_LAND: Point = { x: 470, y: GROUND_Y };
/** 竖直落差，以及两条轨迹各自的水平射程 */
const DROP = GROUND_Y - THROW.y;
const REF_RANGE = REF_LAND.x - THROW.x;
const CHARGED_RANGE = CHARGED_LAND.x - THROW.x;

/** 裸 × 阵列：5 列 × 4 行、间距 103 ⟹ 横向 87→499、纵向 53→362，全在地面以上，一眼看出"一片磁场" */
const FIELD = {
  x: 87,
  y: 53,
  cols: 5,
  rows: 4,
  spacing: 103,
  size: 12,
  lineWidth: 3.1,
  opacity: 0.9,
};
/** 「西 → 东」方向标注 */
const WEST_LABEL: Point = { x: 410, y: 56 };
const EAST_LABEL: Point = { x: 550, y: 56 };
const EAST_FROM: Point = { x: 430, y: 50 };
const EAST_TO: Point = { x: 526, y: 50 };
/** 落地点 a 的字母标注 */
const LAND_LABEL: Point = { x: REF_LAND.x + 14, y: REF_LAND.y + 32 };

/**
 * 抛物线：水平匀速 + 竖直匀加速 ⟹ 用 p = t / 总时长 参数化时 x 线性、y 二次
 *
 * @param p 归一化时间 0…1
 * @param range 水平射程
 * @returns 该时刻抛体所在位置
 */
const archAt = (p: number, range: number): Point => ({
  x: THROW.x + range * p,
  y: THROW.y + DROP * p * p,
});

/**
 * 把抛物线采样成折线路径：动画小球走的是同一条曲线，不会"跑偏"
 *
 * @param range 水平射程
 * @param samples 采样段数
 * @returns SVG 折线的 `d`
 */
const sampleArch = (range: number, samples = 48): string =>
  Array.from({ length: samples + 1 }, (_, index) => {
    const point = archAt(index / samples, range);

    return `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
  }).join(" ");

/** 不带电的参照轨迹（常显）与带正电的轨迹（点击后才出，运动小球走这条） */
const REF_TRAJECTORY = sampleArch(REF_RANGE);
const CHARGED_TRAJECTORY = sampleArch(CHARGED_RANGE);

/* ── 动画：小球沿带电轨迹循环运动，到地面后回到抛出点重来，一个周期 3 s ── */
const PERIOD = 3000;
/** 循环进度 p ∈ [0, 1) */
const progress = ref(0);
let rafId = 0;
let startedAt = 0;

const step = (now: number): void => {
  if (startedAt === 0) startedAt = now;

  progress.value = ((now - startedAt) / PERIOD) % 1;
  rafId = requestAnimationFrame(step);
};

const stop = (): void => {
  if (rafId !== 0) cancelAnimationFrame(rafId);

  rafId = 0;
  startedAt = 0;
};

const start = (): void => {
  if (rafId === 0) rafId = requestAnimationFrame(step);
};

/** 动画只在"点击出分析"之后才跑；该 prop 转 false 或组件卸载时停掉 rAF */
watch(
  () => showAnalysis === true,
  (active) => {
    if (active) start();
    else stop();
  },
);
onMounted(() => {
  if (showAnalysis === true) start();
});
onBeforeUnmount(stop);

/* ── 随小球走的箭头 ── */
/** 初速度箭头长度：抛出点那个静止的 v 箭头与运动小球在 p = 0 处的 v 箭头取同一个长度，两处对得上 */
const V0_LEN = 58;
const V0_TIP: Point = { x: THROW.x + V0_LEN, y: THROW.y };
/** 洛伦兹力箭头长度（恒竖直向上、恒定不变） */
const FORCE_LEN = 118;

/** 小球当前位置 */
const ball = computed<Point>(() => archAt(progress.value, CHARGED_RANGE));

/** 速度箭头：起点在球心、方向沿轨迹切线（竖直分量 = 2·H·p 随 p 线性增大 ⟹ 越来越陡），长度 ∝ 真实速率 */
const velocityArrow = computed<{ from: Point; to: Point }>(() => {
  const p = progress.value;
  const vy = 2 * DROP * p;
  const length = V0_LEN * Math.hypot(1, vy / CHARGED_RANGE);
  const norm = Math.hypot(CHARGED_RANGE, vy) || 1;
  const origin = archAt(p, CHARGED_RANGE);

  return {
    from: origin,
    to: { x: origin.x + (CHARGED_RANGE / norm) * length, y: origin.y + (vy / norm) * length },
  };
});

/** 洛伦兹力箭头：赤道处 v 向东、B 向北 ⟹ 正电荷受力始终竖直向上，大小不变 */
const forceArrow = computed<{ from: Point; to: Point }>(() => ({
  from: ball.value,
  to: { x: ball.value.x, y: ball.value.y - FORCE_LEN },
}));

/** F_洛 的标签：贴在箭头右侧、跟着小球走 */
const forceLabel = computed<Point>(() => ({
  x: ball.value.x + 15,
  y: ball.value.y - FORCE_LEN * 0.62,
}));

/** 上屏文字统一加深色光晕；带中文下标的字光晕收细，免得汉字被描边涂成实心块 */
const halo = { stroke: "var(--c-bg)", "stroke-width": 6, "paint-order": "stroke" };
const haloSub = { stroke: "var(--c-bg)", "stroke-width": 2.4, "paint-order": "stroke" };
/** 符号铁律：量用 KaTeX_Math 斜体；中文、数字用 KaTeX_Main */
const MATH = "KaTeX_Math, 'Times New Roman', serif";
const MAIN = "KaTeX_Main, 'Times New Roman', serif";
</script>

<template>
  <div class="equator-throw">
    <svg :viewBox="`0 0 ${W} ${H}`" class="equator-throw-svg" xmlns="http://www.w3.org/2000/svg">
      <FieldDots
        :x="FIELD.x"
        :y="FIELD.y"
        :cols="FIELD.cols"
        :rows="FIELD.rows"
        :spacing="FIELD.spacing"
        :size="FIELD.size"
        :line-width="FIELD.lineWidth"
        :opacity="FIELD.opacity"
        dir="in"
      />
      <SurfaceHatch
        :from="GROUND_FROM"
        :to="GROUND_TO"
        side="below"
        :thickness="26"
        :line-width="4"
        :hatch-width="2"
      />
      <path
        :d="REF_TRAJECTORY"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="3.4"
        stroke-linecap="round"
      />
      <circle
        :cx="THROW.x"
        :cy="THROW.y"
        :r="BALL_R"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text)"
        stroke-width="3"
      />
      <CourseArrow
        :from="THROW"
        :to="V0_TIP"
        stroke="var(--c-text)"
        :stroke-width="4.4"
        :head-size="18"
        label="v"
      />
      <circle
        :cx="REF_LAND.x"
        :cy="REF_LAND.y"
        r="11"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="3.4"
      />
      <text
        :x="LAND_LABEL.x"
        :y="LAND_LABEL.y"
        font-size="31"
        :font-family="MATH"
        font-style="italic"
        fill="var(--c-text-dim)"
        text-anchor="middle"
        :style="halo"
      >
        a
      </text>
      <text
        :x="WEST_LABEL.x"
        :y="WEST_LABEL.y"
        font-size="29"
        :font-family="MAIN"
        fill="var(--c-text-dim)"
        text-anchor="middle"
        :style="halo"
      >
        西
      </text>
      <CourseArrow
        :from="EAST_FROM"
        :to="EAST_TO"
        stroke="var(--c-text-dim)"
        :stroke-width="3.1"
        :head-size="12"
      />
      <text
        :x="EAST_LABEL.x"
        :y="EAST_LABEL.y"
        font-size="29"
        :font-family="MAIN"
        fill="var(--c-text-dim)"
        text-anchor="middle"
        :style="halo"
      >
        东
      </text>
      <g v-if="showAnalysis">
        <path
          :d="CHARGED_TRAJECTORY"
          fill="none"
          stroke="var(--c-text)"
          stroke-width="3.4"
          stroke-linecap="round"
        />
        <circle :cx="CHARGED_LAND.x" :cy="CHARGED_LAND.y" r="9" fill="var(--c-text)" />
        <CourseArrow
          :from="forceArrow.from"
          :to="forceArrow.to"
          stroke="var(--c-force)"
          :stroke-width="4.6"
          :head-size="17"
        />
        <text
          :x="forceLabel.x"
          :y="forceLabel.y"
          font-size="31"
          :font-family="MATH"
          font-style="italic"
          fill="var(--c-force)"
          text-anchor="start"
          :style="haloSub"
        >
          F
          <tspan :font-family="MAIN" font-size="20" dy="4">洛</tspan>
        </text>
        <CourseArrow
          :from="velocityArrow.from"
          :to="velocityArrow.to"
          stroke="var(--c-text)"
          :stroke-width="4"
          :head-size="15"
          label="v"
        />
        <circle
          :cx="ball.x"
          :cy="ball.y"
          :r="BALL_R"
          fill="var(--c-surface-solid)"
          stroke="var(--c-text)"
          stroke-width="3"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.equator-throw {
  width: 100%;
}

.equator-throw-svg {
  display: block;
  width: 380px;
  max-width: 100%;
  height: auto;
}

/* CourseArrow 的标签字号写死在共享组件里（15），这里按同一个 1.7× 台阶调到 31 */
.equator-throw-svg :deep(.course-arrow text) {
  font-size: 31px;
  stroke-width: 6px;
}
</style>
