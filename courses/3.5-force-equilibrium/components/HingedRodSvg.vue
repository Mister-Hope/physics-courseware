<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, ref } from "vue";

interface Point {
  x: number;
  y: number;
}

/**
 * 第 21 页：铰链轻杆起吊（可拖：按住杆顶 B 把杆缓缓拉起）。
 *
 * 左图装置：崖顶平台 + 站在平台上向左拉绳的人 + 定滑轮 O + 铰链 A + 轻杆 AB（杆长不变）+ 悬挂重物； 绳从 B 跨过滑轮，再从滑轮的**最高点**接出去到手。
 *
 * 右图力的三角形：与几何三角形 AOB 相似（G ∥ AO、F_N ∥ AB、F_T ∥ BO），完美居中且字母全部自适应置于三角形外侧。
 */
const { $clicks } = useSlideContext();
const step = computed<number>(() => Math.max(0, Math.min($clicks.value, 3)));

const rad = (deg: number): number => (deg * Math.PI) / 180;
const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/** 装置几何：留足左侧崖顶平台空间以舒展拉绳人物 */
const pointA: Point = { x: 88, y: 208 }; // 崖壁下方铰链 A
const pointO: Point = { x: 88, y: 60 }; // 崖顶定滑轮圆心 O
const PULLEY_R = 11.5;
const ROD = 136; // 轻杆长 AB（恒定不变）
const HAND: Point = { x: 52, y: 44 }; // 站在崖顶的人双手握绳位置

/** 杆的方向角（屏幕角，负值向上）：-15° ≈ 很低，-72° ≈ 接近竖直 */
const ROD_MIN = -72;
const ROD_MAX = -15;
const rodDeg = ref(-37);

/** 杆顶 B 坐标与两段几何距离（注意 AO 取正值 A.y - O.y = 148，彻底修复原版 AO 为负数导致力方向全反及三角形出界的 bug） */
const pointB = computed<Point>(() => ({
  x: pointA.x + ROD * Math.cos(rad(rodDeg.value)),
  y: pointA.y + ROD * Math.sin(rad(rodDeg.value)),
}));
const AO = pointA.y - pointO.y;
const BO = computed<number>(() => Math.hypot(pointB.value.x - pointO.x, pointB.value.y - pointO.y));

/** 左图结点 B 处三个力箭头的长度基准（G 画成 G_PX 长） */
const G_PX = 58;
const fnRatio = computed<number>(() => ROD / AO);
const ftRatio = computed<number>(() => BO.value / AO);

/**
 * 从某个点 p 到滑轮圆（取靠右/靠上的那个切点）
 *
 * @param point 绳上的某一点
 * @param wantTop 是否取靠上的切点（出绳为 true，进绳为 false）
 * @returns 切点坐标
 */
const tangentTo = (point: Point, wantTop: boolean): Point => {
  const dx = point.x - pointO.x;
  const dy = point.y - pointO.y;
  const d = Math.max(PULLEY_R + 0.1, Math.hypot(dx, dy));
  const psi = Math.acos(PULLEY_R / d);
  const base = Math.atan2(dy, dx);
  const candidates = [1, -1].map((sign) => ({
    x: pointO.x + PULLEY_R * Math.cos(base + sign * psi),
    y: pointO.y + PULLEY_R * Math.sin(base + sign * psi),
  }));

  // 进绳取靠右的切点；出绳取靠上的切点（绳从滑轮最高点一侧接出）
  return wantTop ? candidates.reduce((best, cur) => (cur.y < best.y ? cur : best)) : candidates.reduce((best, cur) => (cur.x > best.x ? cur : best));
};

const entry = computed<Point>(() => tangentTo(pointB.value, false));
const exit = computed<Point>(() => tangentTo(HAND, true));

/** 左图结点 B 处三个力的箭头终点（均从 B 出发：G 竖直向下，F_N 沿杆向外支持，F_T 沿绳指向滑轮） */
const tips = computed(() => {
  const dirRod: Point = { x: Math.cos(rad(rodDeg.value)), y: Math.sin(rad(rodDeg.value)) };
  const dirRope: Point = {
    x: (pointO.x - pointB.value.x) / BO.value,
    y: (pointO.y - pointB.value.y) / BO.value,
  };

  return {
    g: { x: pointB.value.x, y: pointB.value.y + G_PX },
    normal: {
      x: pointB.value.x + G_PX * fnRatio.value * dirRod.x,
      y: pointB.value.y + G_PX * fnRatio.value * dirRod.y,
    },
    t: {
      x: pointB.value.x + G_PX * ftRatio.value * dirRope.x,
      y: pointB.value.y + G_PX * ftRatio.value * dirRope.y,
    },
  };
});

/** 左图结点 B 处三个力的标注坐标（自适应跟随箭头终端外侧，互不遮挡） */
const leftLabels = computed(() => {
  const dirRod: Point = { x: Math.cos(rad(rodDeg.value)), y: Math.sin(rad(rodDeg.value)) };
  const dirRope: Point = {
    x: (pointO.x - pointB.value.x) / BO.value,
    y: (pointO.y - pointB.value.y) / BO.value,
  };

  return {
    g: { x: tips.value.g.x + 14, y: tips.value.g.y - 6 },
    normal: {
      x: tips.value.normal.x + dirRod.x * 15 + 4,
      y: tips.value.normal.y + dirRod.y * 12,
    },
    t: {
      x: tips.value.t.x + dirRope.x * 12 - 12,
      y: tips.value.t.y + dirRope.y * 12 - 4,
    },
  };
});

/** 右图：力的矢量三角形（与几何三角形 OAB 相似，缩放 S = 1.05，稳定居中于 340×270 画布中央） O → A 为重力 G（竖直向下），A → B 为轻杆支持力 F_N（沿杆向右上），B → O 为绳拉力 F_T（沿绳向左上） */
const S = 1.05;
const triO: Point = { x: 112, y: (270 - AO * S) / 2 }; // y ≈ 57.3
const triA: Point = { x: 112, y: triO.y + AO * S }; // y ≈ 212.7
const triB = computed<Point>(() => ({
  x: triA.x + ROD * S * Math.cos(rad(rodDeg.value)),
  y: triA.y + ROD * S * Math.sin(rad(rodDeg.value)),
}));

/**
 * 计算三角形某条有向边 (from → to) 的外法线中点偏移坐标： 通过与三角形重心 centroid 做点积校验，严格保证 G、F_N、F_T 永远落在三角形外侧
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
 * 计算三角形顶点相对重心向外辐射的标注坐标，确保顶点字母 O、A、B 永远在三角形角外侧
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

/** 右图三个力 G、F_N、F_T 与三个顶点 O、A、B 的自适应外侧坐标 */
const triLabels = computed(() => {
  const b = triB.value;
  const centroid: Point = {
    x: (triO.x + triA.x + b.x) / 3,
    y: (triO.y + triA.y + b.y) / 3,
  };

  return {
    g: outerEdgeLabel(triO, triA, centroid, 18),
    normalLabel: outerEdgeLabel(triA, b, centroid, 18),
    tensionLabel: outerEdgeLabel(b, triO, centroid, 18),
    vO: outerVertexLabel(triO, centroid, 15),
    vA: outerVertexLabel(triA, centroid, 15),
    vB: outerVertexLabel(b, centroid, 16),
  };
});

/** 拖动杆顶 B：把指针位置换算成它相对铰链 A 的方向角 */
const dragging = ref(false);

const drag = (event: PointerEvent): void => {
  const svg = (event.currentTarget as SVGElement).ownerSVGElement;

  if (!svg) return;

  const rect = svg.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) return;

  const userX = ((event.clientX - rect.left) / rect.width) * 340;
  const userY = ((event.clientY - rect.top) / rect.height) * 270;
  const deg = (Math.atan2(userY - pointA.y, userX - pointA.x) * 180) / Math.PI;

  rodDeg.value = clamp(Math.round(deg), ROD_MIN, ROD_MAX);
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
  <div class="hr-wrap">
    <!-- 左：装置（可拖杆顶 B） -->
    <div class="hr-fig">
      <svg viewBox="0 0 340 270" xmlns="http://www.w3.org/2000/svg">
        <!-- ==================== 1. 悬崖岩壁与崖顶平台 ==================== -->
        <!-- 崖体岩层浅底 -->
        <rect x="8" y="64" width="80" height="196" rx="2" fill="rgba(148,163,184,0.1)" />
        <!-- 崖顶水平平台表面与斜剖线 -->
        <SurfaceHatch :from="{ x: 8, y: 64 }" :to="{ x: 88, y: 64 }" side="below" color="#94a3b8" :line-width="2.4" :thickness="11" :gap="18" />
        <!-- 竖直崖壁表面与斜剖线 -->
        <SurfaceHatch :from="{ x: 88, y: 64 }" :to="{ x: 88, y: 260 }" side="left" color="#94a3b8" :line-width="2.4" :thickness="11" :gap="22" />

        <!-- ==================== 2. 站在崖顶平台上后仰用力拉绳的人（放大且具象化） ==================== -->
        <g stroke-linecap="round" stroke-linejoin="round">
          <!-- 前后蹬地的双腿（脚踩在崖顶 y = 64） -->
          <path d="M 30 44 L 21 63 L 16 63" fill="none" stroke="#cbd5e1" stroke-width="3.2" />
          <path d="M 33 44 L 44 63 L 49 63" fill="none" stroke="#cbd5e1" stroke-width="3.2" />
          <!-- 后仰发力的躯干 -->
          <path d="M 27 25 L 33 44" fill="none" stroke="#60a5fa" stroke-width="6.5" />
          <!-- 双手向前伸出握住拉绳（汇聚于 HAND 52, 44） -->
          <path d="M 29 29 L 42 39 L 52 44" fill="none" stroke="#e2e8f0" stroke-width="3" />
          <circle :cx="HAND.x" :cy="HAND.y" r="2.8" fill="#e2a846" />
          <!-- 头部 -->
          <circle cx="25" cy="15.5" r="7.5" fill="rgba(226,168,70,0.22)" stroke="#e2a846" stroke-width="2.2" />
        </g>

        <!-- ==================== 3. 轻绳、定滑轮 O、铰链 A、轻杆 AB 与悬挂重物 ==================== -->
        <!-- 竖直基准虚线 OA -->
        <line :x1="pointO.x" :y1="pointO.y" :x2="pointA.x" :y2="pointA.y" stroke="#cbd5e1" stroke-width="1.4" stroke-dasharray="5 4" opacity="0.6" />

        <!-- 轻绳：B → 滑轮右侧切点 → 绕过轮顶圆弧 → 从滑轮最高点切线接至人手 -->
        <line :x1="pointB.x" :y1="pointB.y" :x2="entry.x" :y2="entry.y" stroke="#cbd5e1" stroke-width="2.2" />
        <path :d="`M ${entry.x} ${entry.y} A ${PULLEY_R} ${PULLEY_R} 0 0 0 ${exit.x} ${exit.y}`" fill="none" stroke="#cbd5e1" stroke-width="2.2" />
        <line :x1="exit.x" :y1="exit.y" :x2="HAND.x" :y2="HAND.y" stroke="#cbd5e1" stroke-width="2.2" />

        <!-- 定滑轮固定底座与滑轮轮体 O -->
        <line :x1="pointO.x - 4" :y1="pointO.y + 4" :x2="pointO.x" :y2="pointO.y" stroke="#94a3b8" stroke-width="3.2" stroke-linecap="round" />
        <circle :cx="pointO.x" :cy="pointO.y" :r="PULLEY_R" fill="rgba(15,20,37,0.85)" stroke="#e2a846" stroke-width="2.4" />
        <circle :cx="pointO.x" :cy="pointO.y" r="3.2" fill="#e2a846" />

        <!-- 轻杆 AB（带铰链支座 A） -->
        <line :x1="pointA.x" :y1="pointA.y" :x2="pointB.x" :y2="pointB.y" stroke="#94a3b8" stroke-width="5.5" stroke-linecap="round" />
        <path d="M 88 201 L 95 208 L 88 215 Z" fill="#1e293b" stroke="#60a5fa" stroke-width="1.8" stroke-linejoin="round" />
        <circle :cx="pointA.x" :cy="pointA.y" r="4.5" fill="#60a5fa" stroke="#0f1425" stroke-width="1.4" />

        <!-- 杆顶 B 下方悬挂的重物 -->
        <line :x1="pointB.x" :y1="pointB.y" :x2="pointB.x" :y2="pointB.y + 38" stroke="#cbd5e1" stroke-width="2" />
        <rect :x="pointB.x - 22" :y="pointB.y + 38" width="44" height="28" rx="5" fill="rgba(96,165,250,0.18)" stroke="#60a5fa" stroke-width="2" />
        <text :x="pointB.x" :y="pointB.y + 56" fill="#93c5fd" font-family="KaTeX_Main" font-size="12" text-anchor="middle">重物</text>
        <circle :cx="pointB.x" :cy="pointB.y" r="4.2" fill="#f8fafc" stroke="#0f1425" stroke-width="1.5" />

        <!-- 几何顶点 A、O、B 标注 -->
        <text :x="pointA.x - 16" :y="pointA.y + 5" fill="#60a5fa" font-family="KaTeX_Math" font-style="italic" font-size="16" text-anchor="middle">A</text>
        <text :x="pointO.x + 19" :y="pointO.y - 6" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="16" text-anchor="middle">O</text>

        <!-- ==================== 4. 结点 B 的三个共点力（修正方向：G 向下、F_N 沿杆向外、F_T 沿绳向滑轮） ==================== -->
        <g v-show="step >= 1">
          <!-- 重物拉力 G（竖直向下） -->
          <CourseArrow :from="pointB" :to="tips.g" :head-size="12" stroke="#f87171" stroke-width="3.5" />
          <text
            :x="leftLabels.g.x"
            :y="leftLabels.g.y"
            fill="#f87171"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="18"
            text-anchor="middle"
            dominant-baseline="central"
            stroke="#0f1425"
            stroke-width="3"
            paint-order="stroke"
          >
            G
          </text>

          <!-- 轻杆支持力 F_N（沿 AB 指向右上） -->
          <CourseArrow :from="pointB" :to="tips.normal" :head-size="12" stroke="#2dd4bf" stroke-width="3.5" />
          <text
            :x="leftLabels.normal.x"
            :y="leftLabels.normal.y"
            fill="#2dd4bf"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="18"
            text-anchor="middle"
            dominant-baseline="central"
            stroke="#0f1425"
            stroke-width="3"
            paint-order="stroke"
          >
            F
            <tspan font-family="KaTeX_Math" font-size="12" dy="4">N</tspan>
          </text>

          <!-- 轻绳拉力 F_T（沿 BO 指向左上滑轮） -->
          <CourseArrow :from="pointB" :to="tips.t" :head-size="12" stroke="#e2a846" stroke-width="3.5" />
          <text
            :x="leftLabels.t.x"
            :y="leftLabels.t.y"
            fill="#e2a846"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="18"
            text-anchor="middle"
            dominant-baseline="central"
            stroke="#0f1425"
            stroke-width="3"
            paint-order="stroke"
          >
            F
            <tspan font-family="KaTeX_Math" font-size="12" dy="4">T</tspan>
          </text>
        </g>

        <!-- 杆顶 B 的拖拽热区（置于最上层，确保随时可顺畅拖拽） -->
        <circle
          :cx="pointB.x"
          :cy="pointB.y"
          r="24"
          fill="transparent"
          class="fe-grab"
          @pointerdown="startDrag"
          @pointermove="moveDrag"
          @pointerup="endDrag"
          @pointercancel="endDrag"
        />
      </svg>
    </div>

    <!-- 右：力的三角形（与 △OAB 相似，居中展示，三力与三顶点全部自适应置于三角形外侧） -->
    <div class="hr-tri" :class="{ 'fe-hidden': step < 1 }">
      <svg viewBox="0 0 340 270" xmlns="http://www.w3.org/2000/svg">
        <!-- 三角形内部淡淡底色衬托 -->
        <polygon :points="`${triO.x},${triO.y} ${triA.x},${triA.y} ${triB.x},${triB.y}`" fill="rgba(148,163,184,0.05)" />

        <!-- ① 重力 G（O → A，竖直向下，与定长 OA 对应） -->
        <CourseArrow :from="triO" :to="triA" :head-size="11" stroke="#f87171" stroke-width="3.4" />
        <!-- ② 轻杆支持力 F_N（A → B，沿杆向右上，与定长 AB 对应） -->
        <CourseArrow :from="triA" :to="triB" :head-size="11" stroke="#2dd4bf" stroke-width="3.4" />
        <!-- ③ 绳拉力 F_T（B → O，沿绳向左上，与可变长 BO 对应） -->
        <CourseArrow :from="triB" :to="triO" :head-size="11" stroke="#e2a846" stroke-width="3.4" />

        <!-- 三个力的外法线自适应标注（严格位于三角形外侧） -->
        <text
          :x="triLabels.g.x"
          :y="triLabels.g.y"
          fill="#f87171"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
          text-anchor="middle"
          dominant-baseline="central"
          stroke="#0f1425"
          stroke-width="3"
          paint-order="stroke"
        >
          G
        </text>
        <text
          :x="triLabels.normalLabel.x"
          :y="triLabels.normalLabel.y"
          fill="#2dd4bf"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
          text-anchor="middle"
          dominant-baseline="central"
          stroke="#0f1425"
          stroke-width="3"
          paint-order="stroke"
        >
          F
          <tspan font-family="KaTeX_Math" font-size="12" dy="4">N</tspan>
        </text>
        <text
          :x="triLabels.tensionLabel.x"
          :y="triLabels.tensionLabel.y"
          fill="#e2a846"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
          text-anchor="middle"
          dominant-baseline="central"
          stroke="#0f1425"
          stroke-width="3"
          paint-order="stroke"
        >
          F
          <tspan font-family="KaTeX_Math" font-size="12" dy="4">T</tspan>
        </text>

        <!-- 相似三角形对应顶点字母 O、A、B（沿顶点外辐射方向置于角外侧，绝不截断或压线） -->
        <text
          :x="triLabels.vO.x"
          :y="triLabels.vO.y"
          fill="#94a3b8"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="15"
          text-anchor="middle"
          dominant-baseline="central"
        >
          O
        </text>
        <text
          :x="triLabels.vA.x"
          :y="triLabels.vA.y"
          fill="#94a3b8"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="15"
          text-anchor="middle"
          dominant-baseline="central"
        >
          A
        </text>
        <text
          :x="triLabels.vB.x"
          :y="triLabels.vB.y"
          fill="#94a3b8"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="15"
          text-anchor="middle"
          dominant-baseline="central"
        >
          B
        </text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.hr-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  align-items: stretch;

  width: 100%;
  min-height: 0;
}

.hr-fig,
.hr-tri {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 0;
  min-height: 0;
}

.hr-fig svg,
.hr-tri svg {
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
