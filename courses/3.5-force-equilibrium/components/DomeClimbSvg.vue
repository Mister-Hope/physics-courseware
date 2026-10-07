<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, ref } from "vue";

interface Point {
  x: number;
  y: number;
}

const { $clicks } = useSlideContext();

/**
 * 第 27 页：人从穹顶底部爬到顶部时，支持力与摩擦力怎么变。
 *
 * 交互与分步： ① 先自己拖：按住人沿穹顶从底部往上爬 —— 只给情景； ② 点 1：出三个力（G 竖直向下、F_N 沿半径向外、f 沿穹顶切线向上）； ③ 点 2：左侧做**正确**处理 —— 把重力正交分解成"垂直穹顶"的 G₂ 与"沿穹顶向下"的 G₁； ④ 点 3：右侧展示**错误套相似三角形**的陷阱
 * —— 过 P 点的切线与竖直轴交于穹顶上方的动点 Q，构成几何直角三角形 △OQP（∠OPQ = 90°）。 虽然力直角三角形与几何直角三角形 △OQP 相似，但人往上爬时 Q 点一直向下移动（斜边 OQ = R/cosθ 一直在变短，并非定值）， 不能因为半径 OP = R 不变就误以为对应边 F_N 不变！
 * ⑤ 点 4：出解析（文字在 slides.md 里）。
 */
const step = computed<number>(() => Math.max(0, Math.min($clicks.value, 4)));

const PHI_MIN = 14; // 接近穹顶顶部
const PHI_MAX = 60; // 穹顶下部坡面（保证切线交点 Q = R/cosθ 完整落在画布内）
const phi = ref(48); // 起始位置：三力、正交分解与右侧切线交点 Q 均处于最佳观察比例

const origin: Point = { x: 126, y: 244 };
const R = 110;
const GL = 78; // 放大力矢量基准长度（原版仅 48），使各力与正交分力清晰醒目

const rad = (deg: number): number => (deg * Math.PI) / 180;
const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/** 人在穹顶上的接触点 P(x, y) */
const contactPoint = computed<Point>(() => ({
  x: origin.x + R * Math.sin(rad(phi.value)),
  y: origin.y - R * Math.cos(rad(phi.value)),
}));

/** 沿半径向外（支持力 F_N 方向）与沿穹顶切线向上（静摩擦力 f 方向）的单位矢量 */
const normalDir = computed<Point>(() => ({ x: Math.sin(rad(phi.value)), y: -Math.cos(rad(phi.value)) }));
const tUp = computed<Point>(() => ({ x: -Math.cos(rad(phi.value)), y: -Math.sin(rad(phi.value)) }));
const cosT = computed<number>(() => Math.cos(rad(phi.value)));
const sinT = computed<number>(() => Math.sin(rad(phi.value)));

const tip = (dir: Point, len: number): Point => ({
  x: contactPoint.value.x + dir.x * len,
  y: contactPoint.value.y + dir.y * len,
});

/** 左图各力与正交分力的终点坐标 */
const gTip = computed<Point>(() => tip({ x: 0, y: 1 }, GL));
const fnTip = computed<Point>(() => tip(normalDir.value, GL * cosT.value));
const fTip = computed<Point>(() => tip(tUp.value, GL * sinT.value));
const g2Tip = computed<Point>(() => tip({ x: -normalDir.value.x, y: -normalDir.value.y }, GL * cosT.value));
const g1Tip = computed<Point>(() => tip({ x: -tUp.value.x, y: -tUp.value.y }, GL * sinT.value));

/** 左图各力的外置标注坐标（沿各自方向向外偏移，互不遮挡） */
const leftLabels = computed(() => ({
  g: { x: gTip.value.x - 15, y: gTip.value.y + 2 },
  normalLabel: {
    x: fnTip.value.x + normalDir.value.x * 16 + 4,
    y: fnTip.value.y + normalDir.value.y * 13,
  },
  friction: {
    x: fTip.value.x + tUp.value.x * 14 - 4,
    y: fTip.value.y + tUp.value.y * 14,
  },
  gravity2: {
    x: g2Tip.value.x - normalDir.value.x * 15 - 8,
    y: g2Tip.value.y - normalDir.value.y * 14 + 2,
  },
  gravity1: {
    x: g1Tip.value.x - tUp.value.x * 16 + 6,
    y: g1Tip.value.y - tUp.value.y * 14,
  },
}));

/** 攀爬人物局部坐标变换（以接触点 P 为原点，沿法向向外站立并微微向坡顶俯身攀爬） */
const climberTransform = computed<string>(() => `translate(${contactPoint.value.x.toFixed(1)}, ${contactPoint.value.y.toFixed(1)}) rotate(${phi.value - 8})`);

/** 圆心角 θ 圆弧与角平分线标注 */
const arcR = 44;
const thetaArc = computed<string>(() => {
  const r = arcR;
  return `M ${origin.x} ${origin.y - r} A ${r} ${r} 0 0 1 ${origin.x + r * sinT.value} ${origin.y - r * cosT.value}`;
});
const thetaLabelPos = computed<Point>(() => {
  const half = rad(phi.value / 2);
  const r = arcR + 14;
  return {
    x: origin.x + r * Math.sin(half),
    y: origin.y - r * Math.cos(half),
  };
});

/**
 * 右图（错误套相似三角形的陷阱对比）：
 *
 * 1. 左半侧：真实首尾相接的「力矢量直角三角形」
 *
 *    - 斜边 G（恒定不变）：从 triTop (42, 72) 竖直向下到 triBot (42, 194)，长 triScale = 122
 *    - 直角边 F_N：从 triBot 沿半径方向 u 向右上到直角顶点 triMid，长 triScale * cosθ
 *    - 直角边 f：从直角顶点 triMid 沿切线方向 tUp 向左上回到 triTop，长 triScale * sinθ
 * 2. 右半侧：过 P 点切线交竖直轴于穹顶上方动点 Q 构成的「几何直角三角形 △OQP」（∠OPQ = 90°）
 *
 *    - 直角边 OP = geoR（半径恒定不变）
 *    - 直角边 PQ = geoR * tanθ（切线段，随爬升变短）
 *    - 竖直斜边 OQ = geoR / cosθ（Q 点在穹顶上方随人爬动不断向下移动，斜边 OQ 并非定长！）
 */
const triScale = 122;
const triTop: Point = { x: 42, y: 72 };
const triBot: Point = { x: 42, y: 72 + triScale }; // (42, 194)
const triMid = computed<Point>(() => ({
  x: triTop.x + triScale * sinT.value * cosT.value,
  y: triTop.y + triScale * sinT.value * sinT.value,
}));

/** 力三角形在直角顶点 triMid 处的直角符号路径 */
const forceRightAnglePath = computed<string>(() => {
  const mid = triMid.value;
  const markSize = 8.5;
  const point1: Point = { x: mid.x - normalDir.value.x * markSize, y: mid.y - normalDir.value.y * markSize };
  const point2: Point = {
    x: mid.x - normalDir.value.x * markSize + tUp.value.x * markSize,
    y: mid.y - normalDir.value.y * markSize + tUp.value.y * markSize,
  };
  const point3: Point = { x: mid.x + tUp.value.x * markSize, y: mid.y + tUp.value.y * markSize };
  return `M ${point1.x} ${point1.y} L ${point2.x} ${point2.y} L ${point3.x} ${point3.y}`;
});

/** 右半侧几何直角三角形 △OQP 顶点：Q 在穹顶顶点 geoDomeTop 正上方并随 θ 动态移动 */
const geoR = 76;
const geoO: Point = { x: 206, y: 204 };
const geoDomeTop: Point = { x: 206, y: 204 - geoR }; // 穹顶最高点 (206, 128)
const geoP = computed<Point>(() => ({
  x: geoO.x + geoR * sinT.value,
  y: geoO.y - geoR * cosT.value,
}));
const geoQ = computed<Point>(() => ({
  x: geoO.x,
  y: geoO.y - geoR / cosT.value,
}));

/** 几何直角三角形 △OQP 在切点 geoP 处的直角符号路径（OP ⊥ PQ） */
const geoRightAnglePath = computed<string>(() => {
  const point = geoP.value;
  const markSize = 8.5;
  // 从 geoP 沿 -normalDir (朝圆心 geoO) 与 tUp (沿切线朝 geoQ) 走 markSize 步构成的直角折线
  const point1: Point = { x: point.x - normalDir.value.x * markSize, y: point.y - normalDir.value.y * markSize };
  const point2: Point = {
    x: point.x - normalDir.value.x * markSize + tUp.value.x * markSize,
    y: point.y - normalDir.value.y * markSize + tUp.value.y * markSize,
  };
  const point3: Point = { x: point.x + tUp.value.x * markSize, y: point.y + tUp.value.y * markSize };
  return `M ${point1.x} ${point1.y} L ${point2.x} ${point2.y} L ${point3.x} ${point3.y}`;
});

/**
 * 三角形有向边外法线标注辅助函数：保证字母永远落在三角形外侧
 *
 * @param from 有向边起点
 * @param to 有向边终点
 * @param centroid 三角形重心
 * @param dist 沿外法线方向的偏移距离
 * @returns 标注坐标
 */
const outerEdgeLabel = (from: Point, to: Point, centroid: Point, dist: number): Point => {
  const mid: Point = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  let nx = dy / len;
  let ny = -dx / len;

  if (nx * (mid.x - centroid.x) + ny * (mid.y - centroid.y) < 0) {
    nx = -nx;
    ny = -ny;
  }

  return { x: mid.x + nx * dist, y: mid.y + ny * dist };
};

/**
 * 三角形顶点相对重心向外辐射的标注坐标：确保顶点字母永远落在三角形角外侧
 *
 * @param vertex 三角形顶点
 * @param centroid 三角形重心
 * @param dist 沿重心到顶点方向向外辐射的距离
 * @returns 标注坐标
 */
const outerVertexLabel = (vertex: Point, centroid: Point, dist: number): Point => {
  const dx = vertex.x - centroid.x;
  const dy = vertex.y - centroid.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: vertex.x + (dx / len) * dist, y: vertex.y + (dy / len) * dist };
};

const rightLabels = computed(() => {
  const triangleMid = triMid.value;
  const fCentroid: Point = {
    x: (triTop.x + triBot.x + triangleMid.x) / 3,
    y: (triTop.y + triBot.y + triangleMid.y) / 3,
  };

  const pointP = geoP.value;
  const pointQ = geoQ.value;
  const gCentroid: Point = {
    x: (geoO.x + pointQ.x + pointP.x) / 3,
    y: (geoO.y + pointQ.y + pointP.y) / 3,
  };

  return {
    g: outerEdgeLabel(triTop, triBot, fCentroid, 16),
    normalLabel: outerEdgeLabel(triBot, triangleMid, fCentroid, 17),
    friction: outerEdgeLabel(triangleMid, triTop, fCentroid, 15),
    vO: { x: geoO.x - 14, y: geoO.y + 4 },
    vQ: { x: pointQ.x - 15, y: pointQ.y + 1 },
    vP: outerVertexLabel(pointP, gCentroid, 15),
  };
});

/** 拖动：把指针相对圆心 O 的角度换算成位置角 */
const dragging = ref(false);

const drag = (event: PointerEvent): void => {
  const svg = (event.currentTarget as SVGElement).ownerSVGElement;
  if (!svg) return;
  const rect = svg.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  const userX = ((event.clientX - rect.left) / rect.width) * 320;
  const userY = ((event.clientY - rect.top) / rect.height) * 300;
  const deg = (Math.atan2(userX - origin.x, origin.y - userY) * 180) / Math.PI;

  phi.value = clamp(Math.round(deg), PHI_MIN, PHI_MAX);
};

const startDrag = (event: PointerEvent): void => {
  dragging.value = true;
  (event.currentTarget as Element).setPointerCapture(event.pointerId);
};

const moveDrag = (event: PointerEvent): void => {
  if (dragging.value) drag(event);
};

const endDrag = (): void => {
  dragging.value = false;
};
</script>

<template>
  <div class="dc-wrap">
    <!-- 左：情景 + 三力分析 + 重力正交分解 -->
    <div class="dc-fig">
      <svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
        <!-- ==================== 1. 地面接触面（复用 SurfaceHatch）与半球穹顶 ==================== -->
        <SurfaceHatch :from="{ x: 10, y: origin.y }" :to="{ x: 306, y: origin.y }" side="below" color="#64748b" :line-width="2.2" :thickness="11" :gap="18" />

        <!-- 穹顶建筑微透底色与外弧线 -->
        <path :d="`M ${origin.x - R} ${origin.y} A ${R} ${R} 0 0 1 ${origin.x + R} ${origin.y} Z`" fill="rgba(30,41,59,0.42)" />
        <path
          :d="`M ${origin.x - (R - 7)} ${origin.y} A ${R - 7} ${R - 7} 0 0 1 ${origin.x + (R - 7)} ${origin.y}`"
          fill="none"
          stroke="rgba(148,163,184,0.22)"
          stroke-width="1.4"
          stroke-dasharray="6 5"
        />
        <path :d="`M ${origin.x - R} ${origin.y} A ${R} ${R} 0 0 1 ${origin.x + R} ${origin.y}`" fill="none" stroke="#94a3b8" stroke-width="2.6" />

        <!-- 过圆心 O 的竖直基准虚线、半径 OP 与夹角 θ -->
        <line :x1="origin.x" :y1="origin.y" :x2="origin.x" :y2="origin.y - R - 24" stroke="#64748b" stroke-width="1.4" stroke-dasharray="5 4" opacity="0.8" />
        <line :x1="origin.x" :y1="origin.y" :x2="contactPoint.x" :y2="contactPoint.y" stroke="#94a3b8" stroke-width="1.8" />
        <path :d="thetaArc" fill="none" stroke="#e2a846" stroke-width="1.6" />
        <text
          :x="thetaLabelPos.x"
          :y="thetaLabelPos.y"
          fill="#e2a846"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="16"
          text-anchor="middle"
          dominant-baseline="central"
        >
          θ
        </text>
        <circle :cx="origin.x" :cy="origin.y" r="3.5" fill="#94a3b8" />
        <text :x="origin.x - 13" :y="origin.y - 8" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="14" text-anchor="middle">O</text>

        <!-- ==================== 2. 沿穹顶向上攀爬的人（具象化四肢、躯干与头部） ==================== -->
        <g :transform="climberTransform" stroke-linecap="round" stroke-linejoin="round">
          <!-- 后腿蹬踏与前腿屈膝迈步 -->
          <path d="M -2 -18 L 5 -9 L 4 0" fill="none" stroke="#cbd5e1" stroke-width="3.2" />
          <path d="M -3 -19 L -11 -11 L -7 -1" fill="none" stroke="#cbd5e1" stroke-width="3.2" />
          <!-- 俯身攀爬的蓝色夹克躯干 -->
          <path d="M -8 -34 L -2 -18" fill="none" stroke="#60a5fa" stroke-width="6.5" />
          <!-- 前伸攀扶的手臂与后摆平衡手臂 -->
          <path d="M -7 -31 L -17 -22 L -20 -13" fill="none" stroke="#e2e8f0" stroke-width="2.8" />
          <path d="M -6 -30 L 4 -24 L 9 -18" fill="none" stroke="#e2e8f0" stroke-width="2.8" />
          <!-- 头部 -->
          <circle cx="-11" cy="-43" r="7.2" fill="rgba(226,168,70,0.25)" stroke="#e2a846" stroke-width="2.2" />
        </g>

        <!-- ==================== 3. 点 2：重力的正交分解（G₁ 沿切线向下、G₂ 垂直穹顶压向圆心） ==================== -->
        <g v-click="2">
          <!-- 正交分解矩形投影虚线 -->
          <line :x1="gTip.x" :y1="gTip.y" :x2="g1Tip.x" :y2="g1Tip.y" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="4 4" opacity="0.85" />
          <line :x1="gTip.x" :y1="gTip.y" :x2="g2Tip.x" :y2="g2Tip.y" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="4 4" opacity="0.85" />

          <!-- 垂直穹顶向内的分力 G₂ = G cos θ -->
          <CourseArrow :from="contactPoint" :to="g2Tip" :head-size="9.5" stroke="#fb7185" stroke-width="2.6" stroke-dasharray="5 3" />
          <text
            :x="leftLabels.gravity2.x"
            :y="leftLabels.gravity2.y"
            fill="#fb7185"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="16"
            text-anchor="middle"
            dominant-baseline="central"
            stroke="#0f1425"
            stroke-width="3"
            paint-order="stroke"
          >
            G
            <tspan font-family="KaTeX_Main" font-style="normal" font-size="11" dy="4" dx="1">2</tspan>
          </text>

          <!-- 沿穹顶切线向下的分力 G₁ = G sin θ -->
          <CourseArrow :from="contactPoint" :to="g1Tip" :head-size="9.5" stroke="#fb7185" stroke-width="2.6" stroke-dasharray="5 3" />
          <text
            :x="leftLabels.gravity1.x"
            :y="leftLabels.gravity1.y"
            fill="#fb7185"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="16"
            text-anchor="middle"
            dominant-baseline="central"
            stroke="#0f1425"
            stroke-width="3"
            paint-order="stroke"
          >
            G
            <tspan font-family="KaTeX_Main" font-style="normal" font-size="11" dy="4" dx="1">1</tspan>
          </text>
        </g>

        <!-- ==================== 4. 点 1：三个共点力（G 竖直向下、F_N 沿半径向外、f 沿切线向上） ==================== -->
        <g v-click="1">
          <!-- 重力 G -->
          <CourseArrow :from="contactPoint" :to="gTip" :head-size="11" stroke="#f87171" stroke-width="3.4" />
          <text
            :x="leftLabels.g.x"
            :y="leftLabels.g.y"
            fill="#f87171"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="17"
            text-anchor="middle"
            dominant-baseline="central"
            stroke="#0f1425"
            stroke-width="3"
            paint-order="stroke"
          >
            G
          </text>

          <!-- 支持力 F_N -->
          <CourseArrow :from="contactPoint" :to="fnTip" :head-size="11" stroke="#2dd4bf" stroke-width="3.4" />
          <text
            :x="leftLabels.normalLabel.x"
            :y="leftLabels.normalLabel.y"
            fill="#2dd4bf"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="17"
            text-anchor="middle"
            dominant-baseline="central"
            stroke="#0f1425"
            stroke-width="3"
            paint-order="stroke"
          >
            F
            <tspan font-family="KaTeX_Math" font-size="12" dy="4" dx="1">N</tspan>
          </text>

          <!-- 静摩擦力 f -->
          <CourseArrow :from="contactPoint" :to="fTip" :head-size="11" stroke="#e2a846" stroke-width="3.4" />
          <text
            :x="leftLabels.friction.x"
            :y="leftLabels.friction.y"
            fill="#e2a846"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="17"
            text-anchor="middle"
            dominant-baseline="central"
            stroke="#0f1425"
            stroke-width="3"
            paint-order="stroke"
          >
            f
          </text>
        </g>

        <!-- 作用点 P 与拖拽热区 -->
        <circle :cx="contactPoint.x" :cy="contactPoint.y" r="4" fill="#f8fafc" stroke="#0f1425" stroke-width="1.5" />
        <circle
          :cx="contactPoint.x"
          :cy="contactPoint.y"
          r="30"
          fill="transparent"
          class="fe-grab"
          @pointerdown="startDrag"
          @pointermove="moveDrag"
          @pointerup="endDrag"
          @pointercancel="endDrag"
        />
      </svg>
    </div>

    <!-- 右：点 3 才出的错误套相似三角形警示（几何直角 △OQP 的切线交点 Q 在穹顶上方一直随 θ 移动，OQ 并非定值） -->
    <div class="dc-fig" :class="{ 'fe-hidden': step < 3 }">
      <svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
        <!-- 顶部小标题说明 -->
        <text x="72" y="28" font-size="12" font-weight="600" fill="#cbd5e1" text-anchor="middle">力的直角三角形 (G 定长)</text>
        <text x="238" y="28" font-size="12" font-weight="600" fill="#cbd5e1" text-anchor="middle">切线几何直角 △OQP (Q 动点)</text>

        <!-- ==================== 1. 左半侧：真实的力矢量直角三角形 ==================== -->
        <polygon :points="`${triTop.x},${triTop.y} ${triBot.x},${triBot.y} ${triMid.x},${triMid.y}`" fill="rgba(248,113,113,0.06)" />
        <!-- 直角符号（F_N ⊥ f） -->
        <path :d="forceRightAnglePath" fill="none" stroke="#94a3b8" stroke-width="1.5" />

        <!-- 斜边：重力 G（竖直向下，定长） -->
        <CourseArrow :from="triTop" :to="triBot" :head-size="10" stroke="#f87171" stroke-width="3" />
        <!-- 直角边：支持力 F_N（沿半径向右上） -->
        <CourseArrow :from="triBot" :to="triMid" :head-size="10" stroke="#2dd4bf" stroke-width="3" />
        <!-- 直角边：静摩擦力 f（沿切线向左上） -->
        <CourseArrow :from="triMid" :to="triTop" :head-size="10" stroke="#e2a846" stroke-width="3" />

        <text
          :x="rightLabels.g.x"
          :y="rightLabels.g.y"
          fill="#f87171"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="16"
          text-anchor="middle"
          dominant-baseline="central"
          stroke="#0f1425"
          stroke-width="3"
          paint-order="stroke"
        >
          G
        </text>
        <text
          :x="rightLabels.normalLabel.x"
          :y="rightLabels.normalLabel.y"
          fill="#2dd4bf"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="16"
          text-anchor="middle"
          dominant-baseline="central"
          stroke="#0f1425"
          stroke-width="3"
          paint-order="stroke"
        >
          F
          <tspan font-family="KaTeX_Math" font-size="11" dy="4" dx="1">N</tspan>
        </text>
        <text
          :x="rightLabels.friction.x"
          :y="rightLabels.friction.y"
          fill="#e2a846"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="16"
          text-anchor="middle"
          dominant-baseline="central"
          stroke="#0f1425"
          stroke-width="3"
          paint-order="stroke"
        >
          F
          <tspan font-family="KaTeX_Math" font-size="11" dy="4" dx="1">f</tspan>
        </text>

        <!-- ==================== 2. 中央：盲目套相似的警示符号 ==================== -->
        <g transform="translate(148, 134)">
          <circle cx="0" cy="0" r="15" fill="rgba(248,113,113,0.12)" stroke="rgba(248,113,113,0.35)" stroke-width="1.2" />
          <text x="0" y="6" fill="#cbd5e1" font-family="KaTeX_Main" font-size="21" text-anchor="middle">∽</text>
          <line x1="-9" y1="10" x2="9" y2="-10" stroke="#f87171" stroke-width="2.6" stroke-linecap="round" />
        </g>

        <!-- ==================== 3. 右半侧：过 P 点切线交竖直轴于穹顶上方 Q 点的直角 △OQP ==================== -->
        <!-- 穹顶上方的竖直轴延伸虚线（展示 Q 点在此轴上滑动） -->
        <line :x1="geoO.x" y1="40" :x2="geoO.x" :y2="geoO.y" stroke="#64748b" stroke-width="1.3" stroke-dasharray="4 4" opacity="0.7" />

        <!-- 穹顶象限圆弧参考（圆心 geoO，最高点 geoDomeTop (206, 128)，清晰展示 Q 在穹顶上方！） -->
        <path
          :d="`M ${geoDomeTop.x} ${geoDomeTop.y} A ${geoR} ${geoR} 0 0 1 ${geoO.x + geoR} ${geoO.y}`"
          fill="rgba(30,41,59,0.35)"
          stroke="rgba(148,163,184,0.45)"
          stroke-width="1.8"
          stroke-dasharray="5 4"
        />
        <!-- 穹顶最高点小标记 -->
        <circle :cx="geoDomeTop.x" :cy="geoDomeTop.y" r="2.2" fill="#64748b" />

        <!-- 几何直角三角形 △OQP 填充与切점 P 处的直角符号（OP ⊥ 切线 PQ） -->
        <polygon :points="`${geoO.x},${geoO.y} ${geoQ.x},${geoQ.y} ${geoP.x},${geoP.y}`" fill="rgba(148,163,184,0.08)" />
        <path :d="geoRightAnglePath" fill="none" stroke="#94a3b8" stroke-width="1.5" />

        <!-- 竖直斜边 OQ = R / cosθ（随 Q 移动不断变化，用琥珀红虚线高亮警示其非定值） -->
        <line :x1="geoO.x" :y1="geoO.y" :x2="geoQ.x" :y2="geoQ.y" stroke="#f87171" stroke-width="2.4" stroke-dasharray="5 3" />
        <!-- 直角边 OP = R（半径，定长） -->
        <line :x1="geoO.x" :y1="geoO.y" :x2="geoP.x" :y2="geoP.y" stroke="#2dd4bf" stroke-width="2.4" />
        <!-- 直角边 PQ = R tanθ（过 P 点的穹顶切线） -->
        <line :x1="geoP.x" :y1="geoP.y" :x2="geoQ.x" :y2="geoQ.y" stroke="#e2a846" stroke-width="2.2" />

        <!-- 三个顶点 O、P 与穹顶上方的动点 Q -->
        <circle :cx="geoO.x" :cy="geoO.y" r="3.2" fill="#94a3b8" />
        <circle :cx="geoP.x" :cy="geoP.y" r="3.6" fill="#2dd4bf" />
        <!-- 动点 Q（带发光外圈提示其随爬动上下移动） -->
        <circle :cx="geoQ.x" :cy="geoQ.y" r="6.5" fill="rgba(248,113,113,0.22)" />
        <circle :cx="geoQ.x" :cy="geoQ.y" r="3.8" fill="#f87171" stroke="#0f1425" stroke-width="1.2" />

        <text
          :x="rightLabels.vO.x"
          :y="rightLabels.vO.y"
          fill="#94a3b8"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="14"
          text-anchor="middle"
          dominant-baseline="central"
        >
          O
        </text>
        <text
          :x="rightLabels.vQ.x"
          :y="rightLabels.vQ.y"
          fill="#f87171"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="15"
          font-weight="700"
          text-anchor="middle"
          dominant-baseline="central"
        >
          Q
        </text>
        <text
          :x="rightLabels.vP.x"
          :y="rightLabels.vP.y"
          fill="#2dd4bf"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="14"
          text-anchor="middle"
          dominant-baseline="central"
        >
          P
        </text>

        <!-- ==================== 4. 底部警示结论栏 ==================== -->
        <rect x="6" y="239" width="308" height="38" rx="7" fill="rgba(248,113,113,0.1)" stroke="rgba(248,113,113,0.35)" stroke-width="1.2" />
        <text x="160" y="263" fill="#f87171" font-size="11.5" font-weight="600" text-anchor="middle">✗ 切线交点 Q 随爬升下移，斜边 OQ 在变，无定弦定角</text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.dc-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: stretch;

  width: 100%;
  min-height: 0;
}

.dc-fig {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 0;
  min-height: 0;
}

.dc-fig svg {
  width: 100%;
  height: auto;
  max-height: 100%;
}

.fe-grab {
  cursor: grab;
}

.fe-grab:active {
  cursor: grabbing;
}
</style>
