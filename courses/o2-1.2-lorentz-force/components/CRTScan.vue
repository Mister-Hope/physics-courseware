<!--
  显像管磁偏转（应用页，教材"电子束的磁偏转"）
  —— 电子枪射出电子束，偏转区施加磁场后电子束弯曲，光点打在荧光屏不同位置：
     step0 无磁场 → 打屏中央 O；step1 B⊙ → 打上方 A；step2 B⊗ → 打下方 B；
     step3 扫描动画：偏转磁场不断变化，光点上下扫过整个屏面（每秒 50 场）。
  意图：把"F_洛 ⊥ v 只改变运动方向"落到真实装置；先让学生思考"打上方 A 需要什么磁场"，
        再逐步看到 ⊙/⊗ 的偏转，最后以扫描动画收尾（引下节课"电子在磁场中的轨迹"）。
  几何（旧版的最大毛病）：旧版把"荧光屏"画成一块悬空的独立圆角矩形，与管颈之间没有任何过渡，
  看着像两个不相干的零件。这里按真实显像管画成**一条连续轮廓**：细管颈 → 喇叭形过渡 → 平屏面。
  待细化方向：偏转线圈形象化、扫描加水平+垂直双场、光点拖尾辉光。
-->
<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";

const { step = 0 } = defineProps({
  step: { type: Number, default: 0 },
});

/** 管颈 / 屏幕的关键坐标（轮廓与电子束共用，改这里就整体对齐） */
const GUN_X = 66;
const CENTER_Y = 200;
const SCREEN_X = 812;
const A_Y = 100;
const O_Y = 200;
const B_Y = 300;
/**
 * 偏转区（二次贝塞尔的控制点）横向位置——★ 这个数是"电子束不出管"的硬约束，别乱改。
 *
 * 束流用 `M 电子枪 Q (DEFLECT_X, 轴) (屏面, 落点)` 画：控制点在**管轴上**， 于是曲线在枪口与轴相切（管颈里是直线段），过了控制点才往落点方向掰——正好对应
 * "偏转区很短、出了偏转区就走直线"的真实显像管。
 *
 * 为什么不能像旧版那样把控制点放在 x=440、再把它的 y 抬 34px： ① x=440 还在**细管颈**里（管壁只有 ±26），曲线中点会跑到管外 66px——束流"甩到玻璃管外侧"； ②
 * 旧版按"当前是往上扫还是往下扫"给控制点 ±34 的偏移，光点每到上下端点， 控制点就整体翻到另一侧 → 曲线形状**跳变**，看起来就是"面条一样在那儿颤"。 约束推导：落点在屏上最远
 * ±100，曲线相对轴的偏移是 100·t²，而 x(t) = 66(1−t)² + 2·DEFLECT_X·t(1−t) + 812t²； 要保证"偏移达到 26（管颈半宽）时 x
 * 已经越过管颈末端 516"，解得控制点 x ≥ 578， 取 700 留足余量（实测最窄处离管壁还有 ~7px）。
 */
const DEFLECT_X = 700;

/** 扫描动画：step >= 3 后启动 rAF 循环 */
const phase = ref(0);
let raf = 0;
const frame = () => {
  phase.value += 0.016;
  raf = requestAnimationFrame(frame);
};
watch(
  () => step >= 3,
  (on) => {
    if (on && !raf) {
      raf = requestAnimationFrame(frame);
    } else if (!on && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  },
  { immediate: true },
);
onBeforeUnmount(() => raf && cancelAnimationFrame(raf));

/** 扫描时的光点位置（周期 2.4s；纯正弦 → 位置连续变化，曲线不会跳变） */
const sweep = computed(() => {
  const ph = (phase.value * 2 * Math.PI) / 2.4;
  return { tipY: CENTER_Y + 100 * Math.sin(ph) };
});

/**
 * 电子束路径：控制点固定在管轴上，落点在屏上移动
 *
 * @param tipY 光点落点的 y 坐标
 * @returns SVG path 数据
 */
const beamPath = (tipY) =>
  `M ${GUN_X} ${CENTER_Y} Q ${DEFLECT_X} ${CENTER_Y} ${SCREEN_X} ${tipY.toFixed(1)}`;

/**
 * 电子束路径 / 命中点 / 偏转磁场方向。 磁场方向跟着**光点在轴哪一侧**走（上 → B⊙ 向上偏，下 → B⊗ 向下偏）， 这样画面里的"弯向"与 ⊙/⊗
 * 记号永远自洽；旧版按"正在向上扫/向下扫"取符号，半个周期里是反的。
 */
const beam = computed(() => {
  if (step >= 3) {
    const { tipY } = sweep.value;
    return { d: beamPath(tipY), tipY, symbol: tipY < CENTER_Y ? "out" : "in" };
  }
  if (step === 2) return { d: beamPath(B_Y), tipY: B_Y, symbol: "in" };
  if (step === 1) return { d: beamPath(A_Y), tipY: A_Y, symbol: "out" };
  return { d: beamPath(O_Y), tipY: O_Y, symbol: null };
});

/**
 * 命中的目标点（容差比较，避免浮点相等判断）
 *
 * @param y 目标 y 坐标
 * @returns 当前光点是否命中该目标
 */
const hit = (y) => Math.abs(beam.value.tipY - y) < 8;

const statusText = computed(() => {
  if (step >= 3) return "偏转磁场不断变化：光点上下扫描，整个屏面发光（每秒 50 场）";
  if (step === 2) return "磁场 ⊗ 向纸面里：电子束向下偏转，光点打在屏下方 B 点";
  if (step === 1) return "磁场 ⊙ 向纸面外：电子束向上偏转，光点打在屏上方 A 点";
  return "无磁场：电子束沿直线飞行，光点打在屏中央 O 点";
});
</script>

<template>
  <div class="flex h-full min-h-0 w-full flex-col">
    <svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg" class="min-h-0 w-full flex-1">
      <!-- 显像管玻璃外壳：细管颈 → 喇叭形过渡 → 平屏面（一条连续轮廓） -->
      <path
        d="M 62 174 L 516 174 L 800 56 L 832 56 L 832 350 L 800 350 L 516 226 L 62 226 Z"
        fill="rgba(148,163,184,0.06)"
        stroke="rgba(148,163,184,0.45)"
        stroke-width="2"
      />

      <!-- 荧光屏面（覆盖在轮廓右端） -->
      <rect
        x="802"
        y="58"
        width="28"
        height="290"
        rx="6"
        fill="rgba(96,165,250,0.08)"
        stroke="rgba(96,165,250,0.5)"
        stroke-width="2"
      />

      <!-- 电子枪 -->
      <g>
        <rect
          x="18"
          y="180"
          width="48"
          height="40"
          rx="8"
          fill="rgba(30,41,59,0.85)"
          stroke="rgba(148,163,184,0.5)"
          stroke-width="1.6"
        />
        <path
          d="M 66 186 L 86 200 L 66 214 Z"
          fill="rgba(30,41,59,0.85)"
          stroke="rgba(148,163,184,0.5)"
          stroke-width="1.4"
        />
        <text x="42" y="248" text-anchor="middle" font-size="19" fill="#94a3b8">电子枪</text>
      </g>

      <!-- 三个目标点 A / O / B -->
      <g font-size="20" fill="#cbd5e1" font-family="KaTeX_Math" font-style="italic">
        <circle cx="816" cy="100" r="3.5" :fill="hit(A_Y) ? '#f8fafc' : 'rgba(148,163,184,0.45)'" />
        <circle cx="816" cy="200" r="3.5" :fill="hit(O_Y) ? '#f8fafc' : 'rgba(148,163,184,0.45)'" />
        <circle cx="816" cy="300" r="3.5" :fill="hit(B_Y) ? '#f8fafc' : 'rgba(148,163,184,0.45)'" />
        <text x="790" y="107" text-anchor="end">A</text>
        <text x="790" y="207" text-anchor="end">O</text>
        <text x="790" y="307" text-anchor="end">B</text>
      </g>

      <!-- 电子束 -->
      <path
        :d="beam.d"
        fill="none"
        stroke="#60a5fa"
        stroke-width="3"
        stroke-linecap="round"
        style="opacity: 0.92"
      />

      <!-- 偏转磁场记号（画在偏转区上方，避开电子束路径） -->
      <g v-if="beam.symbol">
        <text
          x="505"
          y="36"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="23"
          fill="#e2a846"
        >
          B
        </text>
        <g v-if="beam.symbol === 'out'">
          <circle cx="505" cy="72" r="18" fill="none" stroke="#e2a846" stroke-width="2.6" />
          <circle cx="505" cy="72" r="4.4" fill="#e2a846" />
        </g>
        <g v-else>
          <circle cx="505" cy="72" r="18" fill="none" stroke="#e2a846" stroke-width="2.6" />
          <line x1="492" y1="59" x2="518" y2="85" stroke="#e2a846" stroke-width="2.6" />
          <line x1="518" y1="59" x2="492" y2="85" stroke="#e2a846" stroke-width="2.6" />
        </g>
      </g>

      <!-- 命中光点（辉光） -->
      <circle :cx="SCREEN_X" :cy="beam.tipY" r="14" fill="rgba(96,165,250,0.22)" />
      <circle :cx="SCREEN_X" :cy="beam.tipY" r="6.5" fill="rgba(248,250,252,0.92)" />
    </svg>

    <div class="mt-1 shrink-0 text-center text-base" style="color: #cbd5e1">{{ statusText }}</div>
  </div>
</template>
