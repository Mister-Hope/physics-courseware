<!--
  选必2 1.x《复合场中的配速法与摆线运动》配速法专题的核心配图：动态「速度—力」示意图。
  匀强磁场垂直纸面向里、带正电 +q 的小球，除重力 mg 外只受洛伦兹力 F_洛 = qv×B。
  配速法把真实速度拆成两笔账：v_实 = v_平 + v_圆（v_平 恒定水平向右、大小 mg/(qB)；v_圆 转动）。
  洛伦兹力对速度是线性的 ⟹ 速度三角形整体逆时针转 90°（B 向里 + 正电荷）就得到力的三角形：
    v_平（恒定）→ f_平（永远竖直向上，|f_平| = qB·v_平 = mg）
    v_圆（转动）→ f_圆（永远垂直于 v_圆，|f_圆| = qB·v_圆，大小恒定）
    v_实        → F_洛 = f_平 + f_圆
  f_平 与 mg 恒等反向 ⟹ 重力被全程抵消，合力只剩永远垂直于 v_圆、大小不变的 f_圆 ⟹ 匀速圆周运动。
  动画：rAF 让 v_圆 的相位 θ 连续转动（5 s 一圈），于是 v_圆 / v_实 / f_圆 / F_洛 的方向每帧都在变，
  而 v_平 / f_平 / mg 的方向与长度始终不动 —— 这个「动与不动」的对比正是配速法要学生看到的。
  左栏 = 速度三角形，右栏 = 力的三角形（同一比例尺，所以右栏就是左栏整体转 90° 的结果）；
  中间的弧形箭头示意这次旋转。prop showCancel：把 f_平 与 mg 这一对冲的箭头一起变灰，表示重力被抵消掉。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

interface Point {
  x: number;
  y: number;
}

const { showCancel = false } = defineProps<{
  /** 是否把 f_平 与重力 mg 这一对冲的箭头一起变灰（表示重力被 f_平 抵消掉） */
  showCancel?: boolean;
}>();

/* ── 真实公式（取 qB = 1、mg = 1 的任意单位）── */
/** 磁场与电荷的组合量 qB 与重力 mg；因为 qB = 1，速度与力可以共用同一个比例尺 */
const QB = 1;
const MG = 1;
/** V_平 = mg/(qB)：只由恒力（重力）与磁场决定，全程恒定 */
const V_PAR = MG / QB;
/** V_圆：由初始条件决定的那个分速度，转起来以后大小也不变（取 0.8 v_平，箭头不会缩成一点） */
const V_CIR = 0.8 * V_PAR;
/** 1 个单位的速度 / 力画多少像素 */
const PX = 96;

/** 各矢量的像素长度：|f_平| = mg = qB·|v_平|，|f_圆| = qB·|v_圆|（qB = 1） */
const LP = V_PAR * PX;
const LC = V_CIR * PX;

/* ── 几何 ── */
const W = 880;
const H = 368;
/** 速度三角形的公共起点 O_v：也画成那个带正电的小球 */
const OV: Point = { x: 196, y: 244 };
/** 力三角形的公共起点 O_f */
const OF: Point = { x: 660, y: 244 };

/**
 * 极坐标 → 屏幕矢量：数学角（逆时针为正）换到 SVG 坐标（y 向下）
 *
 * @param len 模长
 * @param rad 数学角（弧度，逆时针为正）
 * @returns 屏幕矢量
 */
const polar = (len: number, rad: number): Point => ({
  x: len * Math.cos(rad),
  y: -len * Math.sin(rad),
});
/**
 * 屏幕矢量绕起点逆时针转 90°：F = qv×B（B 向里、正电荷）正好把 v 逆时针转 90°
 *
 * @param v 原矢量
 * @returns 逆时针转 90° 后的矢量
 */
const rot90 = (v: Point): Point => ({ x: v.y, y: -v.x });
const add = (a: Point, b: Point): Point => ({ x: a.x + b.x, y: a.y + b.y });
const tipOf = (o: Point, v: Point): Point => ({ x: o.x + v.x, y: o.y + v.y });

/* ── 动画：驱动 v_圆 的相位 θ 连续转动 ── */
/** 转动周期 5 s */
const PERIOD = 5000;
const theta = ref(0);
let rafId = 0;
let startedAt = 0;

const step = (now: number): void => {
  if (startedAt === 0) startedAt = now;

  theta.value = (((now - startedAt) / PERIOD) % 1) * Math.PI * 2;
  rafId = requestAnimationFrame(step);
};

onMounted(() => {
  rafId = requestAnimationFrame(step);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
});

/* ── 每帧都在变的量（一律用 computed）── */
/** V_平：恒定水平向右（长度、方向都不动） */
const vParVec: Point = { x: LP, y: 0 };
/** V_圆：长度恒定、方向随 θ 转动 */
const vCirVec = computed<Point>(() => polar(LC, theta.value));
/** V_实 = v_平 + v_圆（矢量和，长度随两者夹角变化） */
const vRealVec = computed<Point>(() => add(vParVec, vCirVec.value));
/** F_平 = qB·v_平：永远竖直向上，长度恰好等于 mg */
const fParVec: Point = rot90(vParVec);
/** F_圆 = qB·v_圆：永远垂直于 v_圆，长度恒定 */
const fCirVec = computed<Point>(() => rot90(vCirVec.value));
/** F_洛 = qB·v_实 = f_平 + f_圆（力也是矢量和） */
const fRealVec = computed<Point>(() => add(fParVec, fCirVec.value));
/** 重力 mg：竖直向下，与 f_平 等长反向 */
const mgVec: Point = { x: 0, y: MG * PX };

/* ── 各箭头端点 ── */
const vParTip = tipOf(OV, vParVec);
const vCirTip = computed<Point>(() => tipOf(OV, vCirVec.value));
const vRealTip = computed<Point>(() => tipOf(OV, vRealVec.value));
const fParTip = tipOf(OF, fParVec);
const mgTip = tipOf(OF, mgVec);
const fCirTip = computed<Point>(() => tipOf(OF, fCirVec.value));
const fRealTip = computed<Point>(() => tipOf(OF, fRealVec.value));

/* ── 标签位置 ── */
/**
 * 标签贴在箭头中点的一侧：沿垂直方向偏 side（负值在箭头左侧）
 *
 * @param o 箭头起点
 * @param v 箭头矢量
 * @param side 侧移量（负值在箭头左侧）
 * @returns 标签位置
 */
const sideLabel = (o: Point, v: Point, side: number): Point => {
  const len = Math.hypot(v.x, v.y) || 1;
  const ux = v.x / len;
  const uy = v.y / len;

  return { x: o.x + v.x / 2 - uy * side, y: o.y + v.y / 2 + ux * side };
};
/**
 * 标签甩在尖端斜外侧：沿箭头方向外推 out，再沿垂直方向侧移 side
 *
 * @param tip 箭头尖端
 * @param v 箭头矢量
 * @param out 沿箭头方向外推的距离
 * @param side 侧移量
 * @returns 标签位置
 */
const tipLabel = (tip: Point, v: Point, out: number, side: number): Point => {
  const len = Math.hypot(v.x, v.y) || 1;
  const ux = v.x / len;
  const uy = v.y / len;

  return { x: tip.x + ux * out - uy * side, y: tip.y + uy * out + ux * side };
};

const vCirLabelAt = computed<Point>(() => sideLabel(OV, vCirVec.value, -18));
const vRealLabelAt = computed<Point>(() => tipLabel(vRealTip.value, vRealVec.value, 14, -12));
const fCirLabelAt = computed<Point>(() => sideLabel(OF, fCirVec.value, -18));
const fRealLabelAt = computed<Point>(() => tipLabel(fRealTip.value, fRealVec.value, 14, -12));

/** 「一对冲」状态：重力被 f_平 抵消，两个箭头一起变灰 */
const cancelled = computed<boolean>(() => showCancel === true);

/** 上屏文字统一加深色光晕；带中文下标的字光晕收细，免得汉字被描边涂成实心块 */
const halo = { stroke: "var(--c-bg)", "stroke-width": 3.5, "paint-order": "stroke" };
const haloSub = { stroke: "var(--c-bg)", "stroke-width": 2.4, "paint-order": "stroke" };
/** 物理量（斜体）与单位 / 中文各自的字体栈 */
const MATH_FONT = "KaTeX_Math, 'Times New Roman', serif";
const MAIN_FONT = "KaTeX_Main, 'Times New Roman', serif";
</script>

<template>
  <div class="fig-loop">
    <svg :viewBox="`0 0 ${W} ${H}`" class="fig-svg">
      <!-- ── 左栏：速度三角形 ── -->
      <!-- v_圆 的转动轨迹：长度不变，只在圈上转 -->
      <circle
        :cx="OV.x"
        :cy="OV.y"
        :r="LC"
        fill="none"
        stroke="var(--c-velocity)"
        stroke-width="1.6"
        stroke-dasharray="4 7"
        opacity="0.2"
      />
      <!-- 平行四边形：两个分速度各自平移到对面，补出合成的 v_实 -->
      <g
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.4"
        stroke-dasharray="6 5"
        opacity="0.5"
      >
        <path :d="`M ${vCirTip.x} ${vCirTip.y} L ${vRealTip.x} ${vRealTip.y}`" />
        <path :d="`M ${vParTip.x} ${vParTip.y} L ${vRealTip.x} ${vRealTip.y}`" />
      </g>
      <CourseArrow
        :from="OV"
        :to="vParTip"
        stroke="var(--c-velocity)"
        :stroke-width="3"
        :head-size="10"
      />
      <CourseArrow
        :from="OV"
        :to="vCirTip"
        stroke="var(--c-velocity)"
        :stroke-width="3"
        :head-size="10"
      />
      <CourseArrow
        :from="OV"
        :to="vRealTip"
        stroke="var(--c-text)"
        :stroke-width="3.4"
        :head-size="11"
      />
      <!-- 带正电的小球：三条速度都从它出发 -->
      <circle
        :cx="OV.x"
        :cy="OV.y"
        r="6"
        fill="var(--c-surface-solid)"
        stroke="var(--c-force)"
        stroke-width="2.2"
      />
      <path
        :d="`M ${OV.x - 3.2} ${OV.y} H ${OV.x + 3.2} M ${OV.x} ${OV.y - 3.2} V ${OV.y + 3.2}`"
        stroke="var(--c-force)"
        stroke-width="1.8"
        stroke-linecap="round"
      />
      <text
        :x="(OV.x + vParTip.x) / 2"
        :y="OV.y + 26"
        :font-family="MATH_FONT"
        font-size="17"
        font-style="italic"
        fill="var(--c-velocity)"
        text-anchor="middle"
        :style="haloSub"
      >
        v
        <tspan :font-family="MAIN_FONT" font-size="12" dy="4">平</tspan>
      </text>
      <text
        :x="vCirLabelAt.x"
        :y="vCirLabelAt.y"
        :font-family="MATH_FONT"
        font-size="17"
        font-style="italic"
        fill="var(--c-velocity)"
        text-anchor="middle"
        :style="haloSub"
      >
        v
        <tspan :font-family="MAIN_FONT" font-size="12" dy="4">圆</tspan>
      </text>
      <text
        :x="vRealLabelAt.x"
        :y="vRealLabelAt.y"
        :font-family="MATH_FONT"
        font-size="17"
        font-style="italic"
        fill="var(--c-text)"
        text-anchor="middle"
        :style="haloSub"
      >
        v
        <tspan :font-family="MAIN_FONT" font-size="12" dy="4">实</tspan>
      </text>
      <!-- ── 中：速度三角形整体转 90° 得到力三角形 ── -->
      <path
        d="M 356 150 Q 440 70 522 150"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.8"
        stroke-dasharray="7 6"
      />
      <path d="M 531 158 L 517 153 L 526 145 Z" fill="var(--c-text-dim)" />
      <text
        x="440"
        y="84"
        :font-family="MAIN_FONT"
        font-size="16"
        fill="var(--c-text-dim)"
        text-anchor="middle"
        :style="halo"
      >
        旋转 90°
      </text>
      <!-- ── 右栏：力的三角形（同一比例尺，等于左栏逆时针转 90°）── -->
      <!-- f_圆 的转动轨迹、以及 F_洛 端点的轨迹（这个圆的圆心落在 f_平 的端点上） -->
      <circle
        :cx="OF.x"
        :cy="OF.y"
        :r="LC"
        fill="none"
        stroke="var(--c-velocity)"
        stroke-width="1.6"
        stroke-dasharray="4 7"
        opacity="0.2"
      />
      <circle
        :cx="fParTip.x"
        :cy="fParTip.y"
        :r="LC"
        fill="none"
        stroke="var(--c-velocity)"
        stroke-width="1.6"
        stroke-dasharray="4 7"
        opacity="0.2"
      />
      <!-- 平行四边形：f_平 与 f_圆 合成 F_洛 -->
      <g
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.4"
        stroke-dasharray="6 5"
        opacity="0.5"
      >
        <path :d="`M ${fCirTip.x} ${fCirTip.y} L ${fRealTip.x} ${fRealTip.y}`" />
        <path :d="`M ${fParTip.x} ${fParTip.y} L ${fRealTip.x} ${fRealTip.y}`" />
      </g>
      <!-- f_平 与 mg 等长反向的一对：showCancel 打开时一起变灰，表示重力被抵消掉 -->
      <g :opacity="cancelled ? 0.45 : 1">
        <CourseArrow
          :from="OF"
          :to="mgTip"
          stroke="var(--c-text-dim)"
          :stroke-width="2.8"
          :head-size="10"
        />
        <CourseArrow
          :from="OF"
          :to="fParTip"
          :stroke="cancelled ? 'var(--c-text-dim)' : 'var(--c-force)'"
          :stroke-width="3"
          :head-size="10"
        />
        <text
          :x="OF.x + 14"
          :y="OF.y - 50"
          :font-family="MATH_FONT"
          font-size="17"
          font-style="italic"
          :fill="cancelled ? 'var(--c-text-dim)' : 'var(--c-force)'"
          text-anchor="start"
          :style="haloSub"
        >
          f
          <tspan :font-family="MAIN_FONT" font-size="12" dy="4">平</tspan>
        </text>
        <text
          :x="OF.x - 12"
          :y="OF.y + 58"
          :font-family="MATH_FONT"
          font-size="17"
          font-style="italic"
          fill="var(--c-text-dim)"
          text-anchor="end"
          :style="halo"
        >
          m
          <tspan>g</tspan>
        </text>
      </g>
      <CourseArrow
        :from="OF"
        :to="fCirTip"
        stroke="var(--c-velocity)"
        :stroke-width="3"
        :head-size="10"
      />
      <CourseArrow
        :from="OF"
        :to="fRealTip"
        stroke="var(--c-text)"
        :stroke-width="3.4"
        :head-size="11"
      />
      <circle :cx="OF.x" :cy="OF.y" r="3.4" fill="var(--c-text-dim)" />
      <text
        :x="fCirLabelAt.x"
        :y="fCirLabelAt.y"
        :font-family="MATH_FONT"
        font-size="17"
        font-style="italic"
        fill="var(--c-velocity)"
        text-anchor="middle"
        :style="haloSub"
      >
        f
        <tspan :font-family="MAIN_FONT" font-size="12" dy="4">圆</tspan>
      </text>
      <text
        :x="fRealLabelAt.x"
        :y="fRealLabelAt.y"
        :font-family="MATH_FONT"
        font-size="17"
        font-style="italic"
        fill="var(--c-text)"
        text-anchor="middle"
        :style="haloSub"
      >
        F
        <tspan :font-family="MAIN_FONT" font-size="12" dy="4">洛</tspan>
      </text>
    </svg>
  </div>
</template>

<style scoped>
/* "速度 → 力 → 速度"闭环图：宽度上限交给共享的 .fig-svg（本课 style.css）读 --fig-max */
.fig-loop {
  --fig-max: 860px;
  width: 100%;
}
</style>
