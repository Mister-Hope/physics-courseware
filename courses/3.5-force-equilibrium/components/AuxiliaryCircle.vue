<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, ref, watch } from "vue";

interface Point {
  x: number;
  y: number;
}

/**
 * 两绳提水桶（两只手各拉一根绳）：**两绳夹角保持不变**，把这一对绳整体转动时，两绳的拉力怎么变。
 *
 * 布局：整体限定在左侧 2/3 的紧凑 3:2 区域内 —— 上方左图（双手提水桶）与右图（辅助圆与力的矢量三角形）并排等高， 下方居中放置两个紧凑滑块（「两绳夹角 θ」和「整体转动」），右侧
 * 1/3 留给课件正文。
 */
const { $clicks } = useSlideContext();
const step = computed<number>(() => Math.max(0, Math.min($clicks.value, 3)));

const rad = (deg: number): number => (deg * Math.PI) / 180;
const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/** 两绳夹角范围；每根绳至少离竖直方向这么远（否则拉力发散） */
const THETA_MIN = 60;
const THETA_MAX = 120;
/** 转动到两端时，其中一根绳刚好竖直（再转那根绳就松了）——留 1.5° 避免图形退化 */
const MARGIN = 1.5;

/** 左侧受力图（双手提水桶）几何：紧凑且留足双手旋转空间 */
const VIEW = { width: 260, height: 220 };
const K: Point = { x: 130, y: 120 }; // 绳结（水桶弧形提梁顶端）
const ROPE = 70;

/** 右侧矢量三角形（含大号辅助圆）几何：与左图等高 260×220 */
const TRI = { width: 260, height: 220 };

/** θ（两绳夹角，滑块）与整体转动角 t（滑块 / 拖动手部） */
const thetaDeg = ref(76);
const tiltDeg = ref(0);

const theta = computed<number>(() => thetaDeg.value);
/** T 的可调范围：保证两根绳都还在"往上拉"（α、β > MARGIN） */
const tiltMax = computed<number>(() => Math.max(4, theta.value / 2 - MARGIN));
const tilt = computed<number>(() => clamp(tiltDeg.value, -tiltMax.value, tiltMax.value));

/** 两绳与竖直方向的夹角：左绳 α、右绳 β，θ = α + β 恒定 */
const alpha = computed<number>(() => theta.value / 2 - tilt.value);
const beta = computed<number>(() => theta.value / 2 + tilt.value);

watch(thetaDeg, () => {
  tiltDeg.value = clamp(tiltDeg.value, -tiltMax.value, tiltMax.value);
});

/** 两绳拉力与 G 的比值（正弦定理 / 正交分解结果） */
const f1Ratio = computed<number>(() => Math.sin(rad(beta.value)) / Math.sin(rad(theta.value)));
const f2Ratio = computed<number>(() => Math.sin(rad(alpha.value)) / Math.sin(rad(theta.value)));

/** 直径 2R 与 G 的比 = 1 / sinθ：拉力上限 */
const diaRatio = computed<number>(() => 1 / Math.sin(rad(theta.value)));

const f1Max = computed<boolean>(
  () => Math.abs(f1Ratio.value - diaRatio.value) < 0.05 && theta.value > 95,
);
const f2Max = computed<boolean>(
  () => Math.abs(f2Ratio.value - diaRatio.value) < 0.05 && theta.value > 95,
);

/** 绳端位置（两只手捏住绳端的位置） */
const endL = computed<Point>(() => ({
  x: K.x - ROPE * Math.sin(rad(alpha.value)),
  y: K.y - ROPE * Math.cos(rad(alpha.value)),
}));
const endR = computed<Point>(() => ({
  x: K.x + ROPE * Math.sin(rad(beta.value)),
  y: K.y - ROPE * Math.cos(rad(beta.value)),
}));

/** θ 圆弧半径：随夹角张开 */
const arcR = computed<number>(() => 22 + 0.12 * theta.value);

/** θ 标注的位置：沿两条绳的角平分线、贴在圆弧外侧 */
const thetaLabel = computed<Point>(() => {
  const d = arcR.value + 13;

  return { x: K.x + d * Math.sin(rad(tilt.value)), y: K.y - d * Math.cos(rad(tilt.value)) };
});

/** θ 圆弧（绳结处，从左绳转到右绳） */
const thetaArc = computed<string>(() => {
  const r = arcR.value;

  return `M ${K.x - r * Math.sin(rad(alpha.value))} ${K.y - r * Math.cos(rad(alpha.value))} A ${r} ${r} 0 0 1 ${K.x + r * Math.sin(rad(beta.value))} ${K.y - r * Math.cos(rad(beta.value))}`;
});

/**
 * 右图大号辅助圆与矢量三角形： 让辅助圆直径 2R = G / sinθ 充分舒展（约 142~162px），并将辅助圆圆心稳定居中在右图中央附近， 转动绳子（tilt 变化）时重力弦 AB
 * 与辅助圆完全静止，顶点 C 沿圆弧平滑移动。
 */
const triG = computed<number>(() => Math.min(138, 160 * Math.sin(rad(theta.value))));

const tri = computed(() => {
  const g = triG.value;
  const halfOffset = g / (2 * Math.tan(rad(theta.value)));
  const ax = clamp(138 + halfOffset, 108, 194);
  const ay = (TRI.height - g) / 2 - 2;
  const vertexA: Point = { x: ax, y: ay };
  const vertexB: Point = { x: ax, y: ay + g };
  const vertexC: Point = {
    x: vertexB.x - g * f1Ratio.value * Math.sin(rad(alpha.value)),
    y: vertexB.y - g * f1Ratio.value * Math.cos(rad(alpha.value)),
  };

  return { vertexA, vertexB, vertexC };
});

/** 三角形外接圆（= 辅助圆）：弦 AB 固定，顶点 C 在圆上 */
const circle = computed(() => {
  const a = tri.value.vertexA;
  const b = tri.value.vertexB;
  const c = tri.value.vertexC;
  const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));

  if (Math.abs(d) < 1e-6) return null;

  const ux =
    ((a.x * a.x + a.y * a.y) * (b.y - c.y) +
      (b.x * b.x + b.y * b.y) * (c.y - a.y) +
      (c.x * c.x + c.y * c.y) * (a.y - b.y)) /
    d;
  const uy =
    ((a.x * a.x + a.y * a.y) * (c.x - b.x) +
      (b.x * b.x + b.y * b.y) * (a.x - c.x) +
      (c.x * c.x + c.y * c.y) * (b.x - a.x)) /
    d;

  return { x: ux, y: uy, r: Math.hypot(ux - a.x, uy - a.y) };
});

/**
 * 计算三角形某条有向边 (from → to) 的外法线方向中点偏移坐标： 通过与三角形重心 centroid 点积校验，严格保证字母永远落在三角形外侧！
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

  // 若法向量指向三角形重心一侧（内侧），则立即反向，确保严格朝向三角形外侧
  if (nx * (mid.x - centroid.x) + ny * (mid.y - centroid.y) < 0) {
    nx = -nx;
    ny = -ny;
  }

  return { x: mid.x + nx * dist, y: mid.y + ny * dist };
};

/** 三个力 G、F₁、F₂ 的自适应外侧标注位置 */
const forceLabels = computed(() => {
  const { vertexA: a, vertexB: b, vertexC: c } = tri.value;
  const centroid: Point = {
    x: (a.x + b.x + c.x) / 3,
    y: (a.y + b.y + c.y) / 3,
  };

  return {
    g: outerEdgeLabel(a, b, centroid, 16),
    f1: outerEdgeLabel(b, c, centroid, 17),
    f2: outerEdgeLabel(c, a, centroid, 17),
  };
});

/** ψ 小弧与自适应角平分线标注（顶点 C 处，夹在两条拉力之间） */
const psiRadius = computed<number>(() => {
  const { vertexA: a, vertexB: b, vertexC: c } = tri.value;
  const lenCA = Math.hypot(a.x - c.x, a.y - c.y);
  const lenCB = Math.hypot(b.x - c.x, b.y - c.y);

  return clamp(Math.min(lenCA, lenCB) * 0.36, 12, 22);
});

const psiArc = computed<string>(() => {
  const r = psiRadius.value;
  const c = tri.value.vertexC;
  const toA = Math.atan2(tri.value.vertexA.y - c.y, tri.value.vertexA.x - c.x);
  const toB = Math.atan2(tri.value.vertexB.y - c.y, tri.value.vertexB.x - c.x);
  const start = { x: c.x + r * Math.cos(toA), y: c.y + r * Math.sin(toA) };
  const end = { x: c.x + r * Math.cos(toB), y: c.y + r * Math.sin(toB) };

  return `M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`;
});

const psiLabel = computed<Point>(() => {
  const { vertexA: a, vertexB: b, vertexC: c } = tri.value;
  const lenCA = Math.hypot(a.x - c.x, a.y - c.y) || 1;
  const lenCB = Math.hypot(b.x - c.x, b.y - c.y) || 1;
  const ux = (a.x - c.x) / lenCA + (b.x - c.x) / lenCB;
  const uy = (a.y - c.y) / lenCA + (b.y - c.y) / lenCB;
  const uLen = Math.hypot(ux, uy) || 1;
  const d = psiRadius.value + 11;

  return { x: c.x + (ux / uLen) * d, y: c.y + (uy / uLen) * d };
});

/** 支持拖动任一只手让这一对绳整体转动（夹角保持不变） */
const draggingSide = ref<"left" | "right" | null>(null);

const drag = (event: PointerEvent): void => {
  if (!draggingSide.value) return;

  const svg = (event.currentTarget as SVGElement).ownerSVGElement;

  if (!svg) return;

  const rect = svg.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) return;

  const userX = ((event.clientX - rect.left) / rect.width) * VIEW.width;
  const userY = ((event.clientY - rect.top) / rect.height) * VIEW.height;
  const deg = (Math.atan2(userX - K.x, K.y - userY) * 180) / Math.PI;
  const nextTilt = draggingSide.value === "left" ? theta.value / 2 + deg : deg - theta.value / 2;

  tiltDeg.value = clamp(Math.round(nextTilt), -tiltMax.value, tiltMax.value);
};

const startDrag = (event: PointerEvent, side: "left" | "right"): void => {
  draggingSide.value = side;
  (event.currentTarget as Element).setPointerCapture(event.pointerId);
};

const moveDrag = (event: PointerEvent): void => {
  if (!draggingSide.value) return;

  drag(event);
};

const endDrag = (): void => {
  draggingSide.value = null;
};
</script>

<template>
  <div class="ac-wrap">
    <!-- 上方并排双图：左图（双手提水桶）+ 右图（立式辅助圆与力三角形） -->
    <div class="ac-stage">
      <!-- 左图：双手各拉一根绳提水桶 -->
      <div class="ac-fig">
        <svg :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`" xmlns="http://www.w3.org/2000/svg">
          <!-- 两根绷紧的轻绳（夹角 θ 固定，随整体方向旋转） -->
          <line
            :x1="K.x"
            :y1="K.y"
            :x2="endL.x"
            :y2="endL.y"
            stroke="#cbd5e1"
            stroke-width="2.4"
            stroke-linecap="round"
          />
          <line
            :x1="K.x"
            :y1="K.y"
            :x2="endR.x"
            :y2="endR.y"
            stroke="#cbd5e1"
            stroke-width="2.4"
            stroke-linecap="round"
          />

          <!-- 两绳夹角 θ 圆弧与标签 -->
          <path :d="thetaArc" fill="none" stroke="#e2a846" stroke-width="1.8" />
          <text
            :x="thetaLabel.x"
            :y="thetaLabel.y"
            fill="#e2a846"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="18"
            text-anchor="middle"
            dominant-baseline="central"
          >
            θ
          </text>

          <!-- ==================== 具象化水桶（弧形提梁 + 桶耳 + 椭圆桶口 + 桶内水面 + 桶身） ==================== -->
          <!-- 水桶弧形金属提梁（两端连接桶耳，顶点汇于绳结 K） -->
          <path
            :d="`M ${K.x - 28} ${K.y + 30} A 28 30 0 0 1 ${K.x + 28} ${K.y + 30}`"
            fill="none"
            stroke="#cbd5e1"
            stroke-width="2.2"
          />

          <!-- 水桶梯形桶身底色 -->
          <path
            :d="`M ${K.x - 28} ${K.y + 30} L ${K.x - 21} ${K.y + 78} Q ${K.x} ${K.y + 83} ${K.x + 21} ${K.y + 78} L ${K.x + 28} ${K.y + 30} Z`"
            fill="rgba(148,163,184,0.16)"
            stroke="#94a3b8"
            stroke-width="2"
            stroke-linejoin="round"
          />

          <!-- 桶内盛装的清水（半透明蔚蓝水体 + 微波液面线） -->
          <path
            :d="`M ${K.x - 24.8} ${K.y + 49} Q ${K.x - 12} ${K.y + 46.5} ${K.x} ${K.y + 49} T ${K.x + 24.8} ${K.y + 49} L ${K.x + 21} ${K.y + 78} Q ${K.x} ${K.y + 83} ${K.x - 21} ${K.y + 78} Z`"
            fill="rgba(56,189,248,0.2)"
          />
          <path
            :d="`M ${K.x - 24.8} ${K.y + 49} Q ${K.x - 12} ${K.y + 46.5} ${K.x} ${K.y + 49} T ${K.x + 24.8} ${K.y + 49}`"
            fill="none"
            stroke="#38bdf8"
            stroke-width="1.5"
            opacity="0.75"
          />

          <!-- 桶身加固箍线 -->
          <path
            :d="`M ${K.x - 23} ${K.y + 62} Q ${K.x} ${K.y + 66} ${K.x + 23} ${K.y + 62}`"
            fill="none"
            stroke="rgba(148,163,184,0.4)"
            stroke-width="1.3"
          />

          <!-- 水桶椭圆桶口（立体俯视口沿）与两侧桶耳 -->
          <ellipse
            :cx="K.x"
            :cy="K.y + 30"
            rx="28"
            ry="5.5"
            fill="#1e293b"
            stroke="#cbd5e1"
            stroke-width="2"
          />
          <circle
            :cx="K.x - 28"
            :cy="K.y + 30"
            r="2.8"
            fill="#cbd5e1"
            stroke="#0f1425"
            stroke-width="1.2"
          />
          <circle
            :cx="K.x + 28"
            :cy="K.y + 30"
            r="2.8"
            fill="#cbd5e1"
            stroke="#0f1425"
            stroke-width="1.2"
          />

          <!-- 绳结连接环 -->
          <circle :cx="K.x" :cy="K.y" r="4.2" fill="#f8fafc" stroke="#0f1425" stroke-width="1.5" />

          <!-- ==================== 两绳末端的两只手（采用共享组件 <GripHand>） ==================== -->
          <!-- 左手：捏住左绳末端 endL，沿左绳方向向上拉（支持拖动旋转） -->
          <g
            :transform="`translate(${endL.x}, ${endL.y}) rotate(${-90 - alpha})`"
            class="fe-grab"
            @pointerdown="startDrag($event, 'left')"
            @pointermove="moveDrag"
            @pointerup="endDrag"
            @pointercancel="endDrag"
          >
            <circle cx="14" cy="0" r="24" fill="transparent" />
            <GripHand :scale="0.68" flip color="#2dd4bf" fill="rgba(45,212,191,0.2)" />
          </g>

          <!-- 右手：捏住右绳末端 endR，沿右绳方向向上拉（同样支持拖动旋转） -->
          <g
            :transform="`translate(${endR.x}, ${endR.y}) rotate(${beta - 90})`"
            class="fe-grab"
            @pointerdown="startDrag($event, 'right')"
            @pointermove="moveDrag"
            @pointerup="endDrag"
            @pointercancel="endDrag"
          >
            <circle cx="14" cy="0" r="24" fill="transparent" />
            <GripHand :scale="0.68" color="#e2a846" fill="rgba(226,168,70,0.2)" />
          </g>
        </svg>
      </div>

      <!-- 右图：立式辅助圆与力矢量三角形（圆放大居中，G、F₁、F₂ 自适应置于三角形外侧） -->
      <div class="ac-tri" :class="{ 'fe-hidden': step < 1 }">
        <svg :viewBox="`0 0 ${TRI.width} ${TRI.height}`" xmlns="http://www.w3.org/2000/svg">
          <!-- 大号辅助圆 -->
          <circle
            v-if="circle"
            :cx="circle.x"
            :cy="circle.y"
            :r="circle.r"
            fill="rgba(148,163,184,0.03)"
            stroke="#64748b"
            stroke-width="1.5"
            stroke-dasharray="6 5"
            opacity="0.88"
          />

          <!-- 圆周角 ψ 弧线与自适应角平分线标签 -->
          <path :d="psiArc" fill="none" stroke="#94a3b8" stroke-width="1.6" />
          <text
            :x="psiLabel.x"
            :y="psiLabel.y"
            fill="#94a3b8"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="15"
            text-anchor="middle"
            dominant-baseline="central"
          >
            ψ
          </text>

          <!-- 重力 G（定弦 AB，竖直向下） -->
          <CourseArrow
            :from="tri.vertexA"
            :to="tri.vertexB"
            :head-size="11"
            stroke="#f87171"
            stroke-width="3.4"
          />

          <!-- 左绳拉力 F₁（B → C） -->
          <CourseArrow
            :from="tri.vertexB"
            :to="tri.vertexC"
            :head-size="11"
            :stroke="f1Max ? '#facc15' : '#2dd4bf'"
            stroke-width="3.4"
          />

          <!-- 右绳拉力 F₂（C → A） -->
          <CourseArrow
            :from="tri.vertexC"
            :to="tri.vertexA"
            :head-size="11"
            :stroke="f2Max ? '#facc15' : '#e2a846'"
            stroke-width="3.4"
          />

          <!-- 三个力的自适应外侧标注（严格通过外法线计算置于三角形外侧） -->
          <text
            :x="forceLabels.g.x"
            :y="forceLabels.g.y"
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

          <text
            :x="forceLabels.f1.x"
            :y="forceLabels.f1.y"
            :fill="f1Max ? '#facc15' : '#2dd4bf'"
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
            <tspan font-family="KaTeX_Main" font-style="normal" font-size="12" dy="4">1</tspan>
          </text>

          <text
            :x="forceLabels.f2.x"
            :y="forceLabels.f2.y"
            :fill="f2Max ? '#facc15' : '#e2a846'"
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
            <tspan font-family="KaTeX_Main" font-style="normal" font-size="12" dy="4">2</tspan>
          </text>

          <text
            v-if="f1Max || f2Max"
            :x="TRI.width / 2"
            :y="TRI.height - 8"
            fill="#facc15"
            font-family="KaTeX_Main"
            font-size="13"
            text-anchor="middle"
          >
            此时成为直径，拉力最大
          </text>
        </svg>
      </div>
    </div>

    <!-- 下方紧凑双滑条（限制最大宽度，不拉得过长） -->
    <div class="ac-sliders">
      <label class="ac-slider">
        <span class="ac-lab">两绳夹角 <Latex tex="\theta" /></span>
        <input v-model.number="thetaDeg" type="range" :min="THETA_MIN" :max="THETA_MAX" step="1" />
        <span class="ac-val">{{ thetaDeg }}°</span>
      </label>
      <label class="ac-slider">
        <span class="ac-lab">整体转动</span>
        <input v-model.number="tiltDeg" type="range" :min="-tiltMax" :max="tiltMax" step="1" />
        <span class="ac-val">{{ tilt }}°</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.ac-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  justify-content: space-between;

  width: 100%;
}

.ac-stage {
  display: grid;
  flex: 1;

  /* 左图（水桶）压窄一点，右图（立式辅助圆）加宽一点 */
  grid-template-columns: 1fr 1.28fr;
  gap: 0.75rem;
  align-items: stretch;

  min-height: 0;
}

.ac-fig,
.ac-tri {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 0;
  min-height: 0;
}

.ac-fig svg,
.ac-tri svg {
  width: 100%;
  height: 100%;
  max-height: 100%;
}

.fe-grab {
  cursor: grab;
}

.fe-grab:active {
  cursor: grabbing;
}

.ac-sliders {
  display: flex;
  flex-direction: column;
  gap: 0.32rem;

  width: 100%;
  max-width: 21rem;
  margin: 0 auto;

  color: var(--c-text-dim, #94a3b8);

  font-size: 0.8rem;
}

.ac-slider {
  display: grid;
  grid-template-columns: 4.8rem 1fr 2.4rem;
  gap: 0.5rem;
  align-items: center;
}

.ac-lab {
  display: inline-flex;
  gap: 0.25rem;
  align-items: center;
  white-space: nowrap;
}

.ac-math {
  font-style: italic;
  font-family: "KaTeX_Math", serif;
}

.ac-val {
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.ac-slider input {
  width: 100%;
  accent-color: var(--c-accent, #e2a846);
}
</style>
