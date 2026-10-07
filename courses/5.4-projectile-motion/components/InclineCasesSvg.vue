<script setup lang="ts">
/**
 * 平抛与斜面：三种典型情形的示意图（一个组件，三个变体）。
 *
 * - Variant=1：从斜面上方沿水平方向抛出，**垂直落到斜面上**（落点速度与斜面垂直）；
 * - Variant=2：从斜面**顶端**沿水平方向抛出，**又落回斜面**（位移沿斜面、落点速度方向固定）；
 * - Variant=3：从斜面上方抛出，落到斜面上时**位移与斜面垂直**。
 *
 * 干净状态（showAnalysis=false）只画题干元素：斜面、倾角 θ、抛出点 O 与水平初速度、落点 P。 分析标注（轨迹、落点速度、位移线、直角标记）全部包在 `<g v-if="showAnalysis">` 里，由页面点击后出现。
 */
const { variant = 1, showAnalysis = false } = defineProps<{
  variant?: 1 | 2 | 3;
  showAnalysis?: boolean;
}>();

/** 平面直角坐标中的点（SVG 用户单位） */
interface Vec {
  x: number;
  y: number;
}
/** 速度方向的单位向量 */
interface Velocity {
  dx: number;
  dy: number;
}
/** 斜面几何：两端点与倾角（单位：度） */
interface SlopeSurface {
  from: Vec;
  to: Vec;
  theta: number;
}

const deg = (d: number): number => (d * Math.PI) / 180;

/**
 * 屏幕坐标下的角弧（0° 向右、90° 向下）
 *
 * @param cx 圆心 x 坐标
 * @param cy 圆心 y 坐标
 * @param r 圆弧半径
 * @param fromDeg 起始角度（度）
 * @param toDeg 终止角度（度）
 * @returns 圆弧的 SVG path 字符串
 */
// 位置化数学助手：五个参数 (cx, cy, r, fromDeg, toDeg) 刻意保持位置化签名，便于与几何写法一一对应
// eslint-disable-next-line max-params
const arc = (cx: number, cy: number, r: number, fromDeg: number, toDeg: number): string => {
  const start = { x: cx + r * Math.cos(deg(fromDeg)), y: cy + r * Math.sin(deg(fromDeg)) };
  const end = { x: cx + r * Math.cos(deg(toDeg)), y: cy + r * Math.sin(deg(toDeg)) };
  const sweep = toDeg > fromDeg ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 0 ${sweep} ${end.x} ${end.y}`;
};

/**
 * 沿某方向的单位向量
 *
 * @param dx X 方向分量
 * @param dy Y 方向分量
 * @returns 该方向的单位向量
 */
const unit = (dx: number, dy: number): Velocity => {
  const len = Math.hypot(dx, dy);
  return { dx: dx / len, dy: dy / len };
};

/**
 * 从 O 到 P 的抛物线：用二次贝塞尔，控制点取两条切线的交点
 *
 * @param from 抛物线起点
 * @param to 抛物线终点
 * @param control 二次贝塞尔控制点
 * @returns 抛物线的 SVG path 字符串
 */
const parabola = (from: Vec, to: Vec, control: Vec): string => `M ${from.x} ${from.y} Q ${control.x} ${control.y} ${to.x} ${to.y}`;

// ── 三种情形的几何（手工定标，保证图占满且落点在斜面上） ────────────────
/** 上坡（右高）：顶端在右，倾角 25° */
const RISE: SlopeSurface = { from: { x: 140, y: 330 }, to: { x: 560, y: 134 }, theta: 25 };
/** 下坡（右低）：顶端在左，倾角 30° */
const FALL: SlopeSurface = { from: { x: 140, y: 110 }, to: { x: 560, y: 352 }, theta: 30 };

const RISE_LAUNCH = { x: 200, y: 90 };
const RISE_V0_END = { x: 300, y: 90 };
/** 情形 1 的落点：速度垂直斜面（切线与斜面法线方向一致） */
const RISE1_LANDING = { x: 420, y: 199 };
const RISE1_CONTROL = { x: 369, y: 90 };
const RISE1_VEL = unit(0.423, 0.906);

const FALL_LAUNCH = FALL.from;
const FALL_V0_END = { x: 240, y: 110 };
const FALL_LANDING = { x: 440, y: 283 };
const FALL_CONTROL = { x: 290, y: 110 };
const FALL_VEL = unit(0.655, 0.756);

const RISE3_LAUNCH = { x: 250, y: 70 };
const RISE3_V0_END = { x: 350, y: 70 };
const RISE3_LANDING = { x: 330, y: 241 };
const RISE3_CONTROL = { x: 290, y: 70 };
const RISE3_VEL = unit(0.227, 0.974);

const surface = (): SlopeSurface => (variant === 2 ? FALL : RISE);
const launch = (): Vec => (variant === 1 ? RISE_LAUNCH : variant === 2 ? FALL_LAUNCH : RISE3_LAUNCH);
const v0End = (): Vec => (variant === 1 ? RISE_V0_END : variant === 2 ? FALL_V0_END : RISE3_V0_END);
const landing = (): Vec => (variant === 1 ? RISE1_LANDING : variant === 2 ? FALL_LANDING : RISE3_LANDING);
const control = (): Vec => (variant === 1 ? RISE1_CONTROL : variant === 2 ? FALL_CONTROL : RISE3_CONTROL);
const velocity = (): Velocity => (variant === 1 ? RISE1_VEL : variant === 2 ? FALL_VEL : RISE3_VEL);

/**
 * θ 的顶点与角弧：情形 1/3 在上坡的左端，情形 2 在下坡的右端
 *
 * @returns θ 的顶点坐标
 */
const thetaVertex = (): Vec => (variant === 2 ? FALL.to : RISE.from);
const thetaArc = (): string => (variant === 2 ? arc(FALL.to.x, FALL.to.y, 52, 180, 210) : arc(RISE.from.x, RISE.from.y, 46, -25, 0));
const thetaLabel = (): Vec => (variant === 2 ? { x: FALL.to.x - 62, y: FALL.to.y - 16 } : { x: RISE.from.x + 30, y: RISE.from.y - 14 });

/**
 * 落点速度箭头（长 52，方向沿速度）
 *
 * @returns 速度箭头的终点坐标
 */
const velTip = (): Vec => {
  const v = velocity();
  const point = landing();
  return { x: point.x + v.dx * 52, y: point.y + v.dy * 52 };
};

/**
 * 情形 2：位移沿斜面（O→P 就是斜面上的线段）；情形 3：位移垂直斜面
 *
 * @returns 位移线段的起点与终点
 */
const displacement = (): { from: Vec; to: Vec } => ({ from: launch(), to: landing() });
</script>

<template>
  <div class="incline-case">
    <svg viewBox="120 40 480 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="平抛与斜面的三种情形">
      <SurfaceHatch :from="surface().from" :to="surface().to" side="below" />
      <line
        :x1="thetaVertex().x"
        :y1="thetaVertex().y"
        :x2="thetaVertex().x + (variant === 2 ? -96 : 96)"
        :y2="thetaVertex().y"
        stroke="rgba(148,163,184,0.7)"
        stroke-width="1.6"
        stroke-dasharray="7 6"
      />
      <path :d="thetaArc()" fill="none" stroke="var(--c-accent)" stroke-width="2" />
      <text :x="thetaLabel().x" :y="thetaLabel().y" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2a846">θ</text>
      <circle :cx="launch().x" :cy="launch().y" r="5.5" fill="#e2e8f0" />
      <text :x="launch().x - 26" :y="launch().y - 12" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2e8f0">O</text>
      <CourseArrow :from="launch()" :to="v0End()" stroke="#e2a846" :stroke-width="3" />
      <text :x="(launch().x + v0End().x) / 2 - 6" :y="launch().y - 14" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#e2a846">
        v
        <tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4">0</tspan>
      </text>
      <circle :cx="landing().x" :cy="landing().y" r="5.5" fill="#f87171" />
      <text :x="landing().x + 12" :y="landing().y + 20" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#f87171">P</text>
      <g v-if="showAnalysis">
        <path :d="parabola(launch(), landing(), control())" fill="none" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
        <line
          v-if="variant === 3"
          :x1="displacement().from.x"
          :y1="displacement().from.y"
          :x2="displacement().to.x"
          :y2="displacement().to.y"
          stroke="#f87171"
          stroke-width="2.6"
          stroke-dasharray="8 6"
        />
        <line
          v-if="variant === 2"
          :x1="displacement().from.x"
          :y1="displacement().from.y"
          :x2="displacement().to.x"
          :y2="displacement().to.y"
          stroke="#f87171"
          stroke-width="2.6"
          stroke-dasharray="8 6"
        />
        <CourseArrow :from="landing()" :to="velTip()" stroke="#f87171" :stroke-width="3.2" />
        <text :x="velTip().x + 8" :y="velTip().y + 6" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#fca5a5">v</text>
        <path
          v-if="variant === 1"
          :d="`M ${landing().x + 18} ${landing().y + 4} L ${landing().x + 12} ${landing().y + 22} L ${landing().x - 6} ${landing().y + 14}`"
          fill="none"
          stroke="rgba(226,168,70,0.85)"
          stroke-width="1.8"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.incline-case {
  min-width: 0;
}

.incline-case svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
