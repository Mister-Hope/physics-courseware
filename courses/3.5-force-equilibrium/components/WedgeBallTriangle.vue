<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, ref } from "vue";

/**
 * 墙与斜劈夹球：按住斜劈顶点拖动改变斜面倾角 θ，左侧受力图与右侧闭合矢量三角形同步重画。
 *
 * 物理（全部由 `computed` 真实计算，不写死数值）： 球受重力 G、墙的水平支持力 F_N1、斜面支持力 F_N2（沿斜面法线指向球心）。 三力作用线都过球心 ⇒
 * 闭合矢量三角形是直角三角形（G ⊥ F_N1），F_N2 与竖直方向夹角为 θ： F_N1 = G·tanθ，F_N2 = G / cosθ。
 *
 * 拖动：**必须按住再拖**（pointerdown 才进入拖动状态），避免鼠标划过就改角度。 力的大小直接由箭头长度体现，不再给读数。
 *
 * 版面：左图占 2/3（横向画幅做宽，箭头才画得长）、右侧 1/3 放矢量三角形。
 */
const { $clicks } = useSlideContext();
const step = computed<number>(() => Math.max(0, Math.min($clicks.value, 3)));

/** 斜面倾角 θ 的可调范围：下限保证 G 的箭头不穿到地面下，上限保证 F_N2 不出画幅 */
const THETA_MIN = 34;
const THETA_MAX = 56;

/** 受力图几何（viewBox 用户单位）。墙 + 斜劈放在画幅中部，左上方留给 F_N2 */
const VIEW = { x: 66, y: 18, width: 452, height: 190 };
const WALL_X = 200; // 竖直墙面
const GROUND_Y = 172; // 地面
const BALL_R = 30; // 球半径
const WEDGE_L = 160; // 斜面长度
const SCALE = 50; // 力的箭头长度比例（G 画成 SCALE 长）

/** 矢量三角形的几何（另一块 viewBox，紧贴三边） */
const TRI = { width: 300, height: 200 };
const TRI_ORIGIN = { x: 44, y: 24 }; // 三角形的起点（G 的起点）
const TRI_G = 130; // G 在三角形里的边长

const theta = ref(40);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const rad = computed<number>(() => (theta.value * Math.PI) / 180);

/** 斜劈顶点（拖动它改变 θ） */
const apex = computed(() => ({
  x: WALL_X + WEDGE_L * Math.cos(rad.value),
  y: GROUND_Y - WEDGE_L * Math.sin(rad.value),
}));

/**
 * 球心：球与墙面相切（x = WALL_X + BALL_R），且与斜面（过墙角底点、倾角 θ）相切。 由点到直线距离 = BALL_R 解出球心高度：y = GROUND_Y −
 * BALL_R(1 + sinθ) / cosθ。
 */
const ball = computed(() => ({
  x: WALL_X + BALL_R,
  y: GROUND_Y - (BALL_R * (1 + Math.sin(rad.value))) / Math.cos(rad.value),
}));

/** 两个弹力与 G 的比值（真实物理公式） */
const fn1Ratio = computed<number>(() => Math.tan(rad.value));
const fn2Ratio = computed<number>(() => 1 / Math.cos(rad.value));

/** 受力图里的三个力箭头：起点都在球心，长度 = 比例 × SCALE */
const forceTips = computed(() => ({
  g: { x: ball.value.x, y: ball.value.y + SCALE },
  normal1: { x: ball.value.x + SCALE * fn1Ratio.value, y: ball.value.y },
  normal2: {
    x: ball.value.x - SCALE * fn2Ratio.value * Math.sin(rad.value),
    y: ball.value.y - SCALE * fn2Ratio.value * Math.cos(rad.value),
  },
}));

/** θ 角的弧线（墙角底点处，从地面转到斜面） */
const thetaArc = computed(() => {
  const r = 28;

  return `M ${WALL_X + r} ${GROUND_Y} A ${r} ${r} 0 0 0 ${WALL_X + r * Math.cos(rad.value)} ${GROUND_Y - r * Math.sin(rad.value)}`;
});

/** 闭合矢量三角形的三个顶点（A 是 G 的起点，直角在 B，θ 在 A） */
const tri = computed(() => {
  const vertexB = { x: TRI_ORIGIN.x, y: TRI_ORIGIN.y + TRI_G };
  const vertexC = { x: TRI_ORIGIN.x + TRI_G * fn1Ratio.value, y: vertexB.y };

  return { vertexA: TRI_ORIGIN, vertexB, vertexC };
});

/** 三角形里 θ 的弧线（顶点 A 处，从竖直的 G 边转到斜边 F_N2） */
const triThetaArc = computed(() => {
  const r = 30;
  const { x, y } = TRI_ORIGIN;

  return `M ${x} ${y + r} A ${r} ${r} 0 0 0 ${x + r * Math.sin(rad.value)} ${y + r * Math.cos(rad.value)}`;
});

/** 按住顶点才进入拖动状态：鼠标只是划过不会改角度 */
const dragging = ref(false);

/**
 * 拖动斜劈顶点：把指针位置换算成 viewBox 用户单位，再取它相对墙角底点的极角
 *
 * @param event 指针事件（提供 clientX / clientY）
 */
const drag = (event: PointerEvent): void => {
  const svg = (event.currentTarget as SVGElement).ownerSVGElement;

  if (!svg) return;

  const rect = svg.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) return;

  const userX = VIEW.x + ((event.clientX - rect.left) / rect.width) * VIEW.width;
  const userY = VIEW.y + ((event.clientY - rect.top) / rect.height) * VIEW.height;
  const deg = (Math.atan2(GROUND_Y - userY, userX - WALL_X) * 180) / Math.PI;

  theta.value = clamp(Math.round(deg), THETA_MIN, THETA_MAX);
};

const startDrag = (event: PointerEvent): void => {
  dragging.value = true;
  (event.currentTarget as Element).setPointerCapture(event.pointerId);
};

const moveDrag = (event: PointerEvent): void => {
  if (!dragging.value) return;

  drag(event);
};

const endDrag = (): void => {
  dragging.value = false;
};
</script>

<template>
  <div class="wb-wrap">
    <div class="wb-fig">
      <svg
        :viewBox="`${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`"
        xmlns="http://www.w3.org/2000/svg"
      >
        <SurfaceHatch
          :from="{ x: 80, y: GROUND_Y }"
          :to="{ x: 500, y: GROUND_Y }"
          side="below"
          color="#64748b"
          :line-width="2.4"
          :thickness="12"
          :gap="20"
        />
        <SurfaceHatch
          :from="{ x: WALL_X, y: 32 }"
          :to="{ x: WALL_X, y: GROUND_Y }"
          side="left"
          color="#94a3b8"
          :line-width="2.6"
          :thickness="12"
          :gap="20"
        />
        <polygon
          :points="`${WALL_X},${GROUND_Y} ${apex.x},${apex.y} ${apex.x},${GROUND_Y}`"
          fill="rgba(148,163,184,0.14)"
          stroke="#94a3b8"
          stroke-width="1.8"
        />
        <path :d="thetaArc" fill="none" stroke="#e2a846" stroke-width="1.8" />
        <text
          :x="WALL_X + 34"
          :y="GROUND_Y - 8"
          fill="#e2a846"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
        >
          θ
        </text>
        <circle
          :cx="ball.x"
          :cy="ball.y"
          :r="BALL_R"
          fill="rgba(96,165,250,0.22)"
          stroke="#60a5fa"
          stroke-width="2.4"
        />
        <circle :cx="ball.x" :cy="ball.y" r="3.4" fill="#60a5fa" />
        <g v-click="1">
          <CourseArrow
            :from="{ x: ball.x, y: ball.y }"
            :to="forceTips.g"
            :head-size="12"
            stroke="#f87171"
            stroke-width="3.6"
          />
          <text
            :x="forceTips.g.x + 9"
            :y="forceTips.g.y - 5"
            fill="#f87171"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="20"
          >
            G
          </text>
          <CourseArrow
            :from="{ x: ball.x, y: ball.y }"
            :to="forceTips.normal1"
            :head-size="12"
            stroke="#e2a846"
            stroke-width="3.6"
          />
          <text
            :x="forceTips.normal1.x + 7"
            :y="forceTips.normal1.y - 10"
            fill="#e2a846"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="20"
          >
            F
          </text>
          <text
            :x="forceTips.normal1.x + 20"
            :y="forceTips.normal1.y - 5"
            fill="#e2a846"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="13"
          >
            N1
          </text>
          <CourseArrow
            :from="{ x: ball.x, y: ball.y }"
            :to="forceTips.normal2"
            :head-size="12"
            stroke="#2dd4bf"
            stroke-width="3.6"
          />
          <text
            :x="forceTips.normal2.x - 42"
            :y="forceTips.normal2.y + 20"
            fill="#2dd4bf"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="20"
          >
            F
          </text>
          <text
            :x="forceTips.normal2.x - 29"
            :y="forceTips.normal2.y + 25"
            fill="#2dd4bf"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="13"
          >
            N2
          </text>
        </g>
        <circle
          :cx="apex.x"
          :cy="apex.y"
          r="26"
          fill="transparent"
          class="fe-grab"
          @pointerdown="startDrag"
          @pointermove="moveDrag"
          @pointerup="endDrag"
          @pointercancel="endDrag"
        />
        <circle :cx="apex.x" :cy="apex.y" r="9" fill="#e2a846" opacity="0.85" />
      </svg>
    </div>

    <div class="wb-tri" :class="{ 'fe-hidden': step < 2 }">
      <svg :viewBox="`0 0 ${TRI.width} ${TRI.height}`" xmlns="http://www.w3.org/2000/svg">
        <CourseArrow
          :from="tri.vertexA"
          :to="tri.vertexB"
          :head-size="12"
          stroke="#f87171"
          stroke-width="3.6"
        />
        <CourseArrow
          :from="tri.vertexB"
          :to="tri.vertexC"
          :head-size="12"
          stroke="#e2a846"
          stroke-width="3.6"
        />
        <CourseArrow
          :from="tri.vertexC"
          :to="tri.vertexA"
          :head-size="12"
          stroke="#2dd4bf"
          stroke-width="3.6"
        />
        <path :d="triThetaArc" fill="none" stroke="#e2a846" stroke-width="1.6" />
        <text
          x="16"
          y="96"
          fill="#f87171"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
        >
          G
        </text>
        <text
          :x="(tri.vertexB.x + tri.vertexC.x) / 2 - 14"
          :y="tri.vertexB.y + 30"
          fill="#e2a846"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
        >
          F
        </text>
        <text
          :x="(tri.vertexB.x + tri.vertexC.x) / 2 - 1"
          :y="tri.vertexB.y + 34"
          fill="#e2a846"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="13"
        >
          N1
        </text>
        <text
          :x="(tri.vertexA.x + tri.vertexC.x) / 2 + 8"
          :y="(tri.vertexA.y + tri.vertexC.y) / 2 - 12"
          fill="#2dd4bf"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
        >
          F
        </text>
        <text
          :x="(tri.vertexA.x + tri.vertexC.x) / 2 + 21"
          :y="(tri.vertexA.y + tri.vertexC.y) / 2 - 7"
          fill="#2dd4bf"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="13"
        >
          N2
        </text>
        <path
          :d="`M ${tri.vertexB.x + 14} ${tri.vertexB.y} L ${tri.vertexB.x + 14} ${tri.vertexB.y - 14} L ${tri.vertexB.x} ${tri.vertexB.y - 14}`"
          fill="none"
          stroke="#94a3b8"
          stroke-width="1.5"
        />
        <text
          :x="TRI_ORIGIN.x + 40"
          :y="TRI_ORIGIN.y + 22"
          fill="#e2a846"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
        >
          θ
        </text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.wb-wrap {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.2rem;
  align-items: center;
}

.wb-fig,
.wb-tri {
  min-width: 0;
}
</style>
