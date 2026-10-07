<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, ref } from "vue";

/**
 * 斜拉单摆的极小力：小球位置固定（悬线与竖直方向夹角 θ 固定），外力 F 的方向可拖， 大小由平衡条件实时算出：F = G·sinθ / sinφ（φ 为 F 与悬线的夹角）⇒ φ = 90°
 * 时 F 最小，F_min = G·sinθ（方向垂直于悬线）。
 *
 * 全部由 `computed` 真实计算；拖动**必须按住**（pointerdown 才生效）。力的大小直接由箭头长度体现，不给读数； 拖到 F ⊥ 悬线时，右侧力的三角形里冒出"此时 F
 * 最小"。
 *
 * 版面：左图占 2/3（横向画幅做宽，力才画得长）、右侧 1/3 放矢量三角形。
 */
const { $clicks } = useSlideContext();
const step = computed<number>(() => Math.max(0, Math.min($clicks.value, 3)));

/** 悬线与竖直方向的夹角（题目给定，固定） */
const THETA = 30;

/** F 的方向角（屏幕角，度；−90° 为正上方）。范围保证 φ 不接近 0/180（否则 F 发散） */
const A_MIN = -85;
const A_MAX = 30;

/** 受力图几何（viewBox 用户单位）：横向画幅，力才画得长 */
const VIEW = { x: 40, y: 46, width: 512, height: 190 };
const PIVOT = { x: 300, y: 64 }; // 悬点
const ROPE_LEN = 110; // 悬线长
const BALL_R = 18; // 球半径
const G_PX = 62; // G 的箭头长度
const ARC_R = 46; // θ 圆弧半径（贴近悬点，弧短）

/** 矢量三角形的几何 */
const TRI = { width: 300, height: 200 };
const TRI_A = { x: 44, y: 24 }; // G 的起点
const TRI_G = 130; // G 在三角形里的边长

const dirDeg = ref(-70);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const thetaRad = (THETA * Math.PI) / 180;
const sinTh = Math.sin(thetaRad);
const cosTh = Math.cos(thetaRad);

const dirRad = computed<number>(() => (dirDeg.value * Math.PI) / 180);

/** 外力方向单位矢量（屏幕坐标，y 向下） */
const forceDir = computed(() => ({ x: Math.cos(dirRad.value), y: Math.sin(dirRad.value) }));

/** 垂直于悬线、指向"右上方"的单位矢量：F 取它时最小 */
const nMin = { x: cosTh, y: -sinTh };

/** U·nMin = sinφ（φ 为 F 与悬线的夹角） */
const sinPhi = computed<number>(() => forceDir.value.x * nMin.x + forceDir.value.y * nMin.y);

/** F / G 与 T / G：由 G + T·r + F·u = 0 解出（r 为悬线方向，由球指向悬点） */
const fRatio = computed<number>(() => sinTh / sinPhi.value);
const tRatio = computed<number>(() => forceDir.value.x / sinPhi.value);

const phiDeg = computed<number>(() => {
  const value = (Math.asin(clamp(sinPhi.value, -1, 1)) * 180) / Math.PI;

  return sinPhi.value >= 0 ? value : 180 - value;
});

/** 球心位置：从悬点沿悬线方向（右下方）走 ROPE_LEN */
const ball = computed(() => ({
  x: PIVOT.x + ROPE_LEN * sinTh,
  y: PIVOT.y + ROPE_LEN * cosTh,
}));

/** 悬线方向（由球指向悬点） */
const ropeDir = { x: -sinTh, y: -cosTh };

const tips = computed(() => ({
  g: { x: ball.value.x, y: ball.value.y + G_PX },
  t: {
    x: ball.value.x + G_PX * tRatio.value * ropeDir.x,
    y: ball.value.y + G_PX * tRatio.value * ropeDir.y,
  },
  force: {
    x: ball.value.x + G_PX * fRatio.value * forceDir.value.x,
    y: ball.value.y + G_PX * fRatio.value * forceDir.value.y,
  },
}));

/** θ 角的弧线（悬点处，从竖直虚线转到悬线） */
const thetaArc = `M ${PIVOT.x} ${PIVOT.y + ARC_R} A ${ARC_R} ${ARC_R} 0 0 1 ${PIVOT.x + ARC_R * sinTh} ${PIVOT.y + ARC_R * cosTh}`;

/** 闭合矢量三角形：G（A→B）、T（B→C）、F（C→A） */
const tri = computed(() => {
  const vertexB = { x: TRI_A.x, y: TRI_A.y + TRI_G };
  const vertexC = {
    x: vertexB.x + TRI_G * tRatio.value * ropeDir.x,
    y: vertexB.y + TRI_G * tRatio.value * ropeDir.y,
  };

  return { vertexA: TRI_A, vertexB, vertexC };
});

/** F 与悬线垂直（φ = 90°）时高亮，三角形里提示"此时 F 最小" */
const atMin = computed<boolean>(() => Math.abs(phiDeg.value - 90) <= 3);

/** 按住箭头尖端才进入拖动状态：鼠标只是划过不会改方向 */
const dragging = ref(false);

const drag = (event: PointerEvent): void => {
  const svg = (event.currentTarget as SVGElement).ownerSVGElement;

  if (!svg) return;

  const rect = svg.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) return;

  const userX = VIEW.x + ((event.clientX - rect.left) / rect.width) * VIEW.width;
  const userY = VIEW.y + ((event.clientY - rect.top) / rect.height) * VIEW.height;
  const deg = (Math.atan2(userY - ball.value.y, userX - ball.value.x) * 180) / Math.PI;

  dirDeg.value = clamp(Math.round(deg), A_MIN, A_MAX);
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
  <div class="mf-wrap">
    <div class="mf-fig">
      <svg
        :viewBox="`${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`"
        xmlns="http://www.w3.org/2000/svg"
      >
        <SurfaceHatch
          :from="{ x: 60, y: 64 }"
          :to="{ x: 540, y: 64 }"
          side="above"
          color="#94a3b8"
          :line-width="3"
          :thickness="12"
          :gap="30"
        />
        <line
          :x1="PIVOT.x"
          :y1="PIVOT.y"
          :x2="ball.x"
          :y2="ball.y"
          stroke="#94a3b8"
          stroke-width="2.4"
        />
        <line
          :x1="PIVOT.x"
          :y1="PIVOT.y"
          :x2="PIVOT.x"
          :y2="PIVOT.y + ARC_R + 8"
          stroke="#64748b"
          stroke-width="1.3"
          stroke-dasharray="5 4"
          opacity="0.85"
        />
        <path :d="thetaArc" fill="none" stroke="#94a3b8" stroke-width="1.6" />
        <text
          :x="PIVOT.x + 10"
          :y="PIVOT.y + 30"
          fill="#94a3b8"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
        >
          θ
        </text>
        <circle :cx="PIVOT.x" :cy="PIVOT.y" r="4" fill="#94a3b8" />
        <circle
          :cx="ball.x"
          :cy="ball.y"
          :r="BALL_R"
          fill="rgba(96,165,250,0.22)"
          stroke="#60a5fa"
          stroke-width="2.4"
        />
        <CourseArrow
          :from="{ x: ball.x, y: ball.y }"
          :to="tips.g"
          :head-size="12"
          stroke="#f87171"
          stroke-width="3.6"
        />
        <text
          :x="tips.g.x + 9"
          :y="tips.g.y - 5"
          fill="#f87171"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
        >
          G
        </text>
        <CourseArrow
          :from="{ x: ball.x, y: ball.y }"
          :to="tips.t"
          :head-size="12"
          stroke="#2dd4bf"
          stroke-width="3.6"
        />
        <text
          :x="tips.t.x - 38"
          :y="tips.t.y - 10"
          fill="#2dd4bf"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
        >
          F
        </text>
        <text
          :x="tips.t.x - 25"
          :y="tips.t.y - 5"
          fill="#2dd4bf"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="13"
        >
          T
        </text>
        <CourseArrow
          :from="{ x: ball.x, y: ball.y }"
          :to="tips.force"
          :head-size="12"
          stroke="#e2a846"
          stroke-width="3.6"
        />
        <text
          :x="tips.force.x + 8"
          :y="tips.force.y + 6"
          fill="#e2a846"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
        >
          F
        </text>
        <circle
          :cx="tips.force.x"
          :cy="tips.force.y"
          r="22"
          fill="transparent"
          class="fe-grab"
          @pointerdown="startDrag"
          @pointermove="moveDrag"
          @pointerup="endDrag"
          @pointercancel="endDrag"
        />
        <circle :cx="tips.force.x" :cy="tips.force.y" r="7" fill="#e2a846" opacity="0.85" />
      </svg>
    </div>

    <div class="mf-tri" :class="{ 'fe-hidden': step < 1 }">
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
          stroke="#2dd4bf"
          stroke-width="3.6"
        />
        <CourseArrow
          :from="tri.vertexC"
          :to="tri.vertexA"
          :head-size="12"
          stroke="#e2a846"
          stroke-width="3.6"
        />
        <text
          :x="tri.vertexA.x - 22"
          :y="(tri.vertexA.y + tri.vertexB.y) / 2 + 6"
          fill="#f87171"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
        >
          G
        </text>
        <text
          :x="(tri.vertexB.x + tri.vertexC.x) / 2 - 10"
          :y="(tri.vertexB.y + tri.vertexC.y) / 2 + 8"
          fill="#2dd4bf"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
        >
          F
        </text>
        <text
          :x="(tri.vertexB.x + tri.vertexC.x) / 2 + 3"
          :y="(tri.vertexB.y + tri.vertexC.y) / 2 + 13"
          fill="#2dd4bf"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="13"
        >
          T
        </text>
        <text
          :x="(tri.vertexA.x + tri.vertexC.x) / 2 + 12"
          :y="(tri.vertexA.y + tri.vertexC.y) / 2 - 6"
          fill="#e2a846"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
        >
          F
        </text>
        <text
          v-if="atMin"
          :x="TRI.width / 2"
          :y="TRI.height - 10"
          fill="#e2a846"
          font-family="KaTeX_Main"
          font-size="16"
          text-anchor="middle"
        >
          此时 F 最小
        </text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.mf-wrap {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.2rem;
  align-items: center;
}

.mf-fig,
.mf-tri {
  min-width: 0;
}
</style>
