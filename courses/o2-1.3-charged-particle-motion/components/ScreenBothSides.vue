<!--
  选必二 1.3 · 例 9 配图：粒子源 O 向各方向发射，薄光屏 PQ 的两侧都要整段被打中
  ── 题干 ──
     垂直纸面向外的匀强磁场 B；O 处粒子源向纸面内各方向以相同速率发射正粒子；
     薄光屏与纸面的交线为 PQ：OQ = L、PQ = 2L、OQ ⊥ PQ（Q 处直角），OQ 不是挡板。
     要让 PQ 左、右两侧所有点都能被粒子打中，求速率 v 的范围。
  ── 关键几何（以 L 为单位）──
     轨迹都是半径 R = mv/(qB)、过 O 的圆（B 向外、带正电 ⟹ 顺时针）。
     左（朝向 O 的一面）：各方向轨迹圆的并集 = 以 O 为圆心、半径 2R 的圆（可达区域），
        整条 PQ 都落在其中；屏上离 O 最远的是 P（OP = √5 L）⟹ 2R ≥ √5 L ⟹ R ≥ √5L/2；
        临界轨迹 = 以 OP 为直径的圆（也过 Q）。
     右（背面）：必须绕过 P 端；临界轨迹与屏相切于 P，圆心 C 在过 P 的屏垂线上，
        且 CP = CO = R ⟹ (R − L)² + (2L)² = R² ⟹ R = 5L/2。
  ── 分步 ──
     setup：题干图（磁场点阵、光屏、O、L 与 2L、直角）—— 试卷上本来就有的，常显
     left ：step ≥1 可达区域（半径 2R 的圆把整条 PQ 包住、边界恰好过 P），这一面整段发亮；
            step ≥2 打到 P 的临界轨迹（直径 OP）与 OP 连线
     right：step ≥1 相切于 P 的临界圆（圆心 C、CP = CO = R）；step ≥2 几何直角三角形
-->
<script setup lang="ts">
const { mode = "setup", step = 0 } = defineProps<{
  /** Setup = 题干图；left = 朝向 O 的一面；right = 背面 */
  mode?: "setup" | "left" | "right";
  /** 分步（只对 left / right 有意义）：0 = 仍只有题干图 */
  step?: number;
}>();

interface Pt {
  x: number;
  y: number;
}

/** 每个状态自己一套画布：左侧那页要装下半径 2R 的可达区域，背面那页要装下半径 2.5L 的临界圆 */
const VIEW = {
  setup: { x: 22, y: 50, w: 356, h: 300 },
  left: { x: 24, y: 96, w: 390, h: 400 },
  right: { x: 22, y: 50, w: 356, h: 300 },
} as const;
const VB = VIEW[mode];

/** 长度单位 L（用户单位）：题干图与左侧那页只画屏附近，取大一档；背面那页要画下整个临界圆，取小一档 */
const L = mode === "right" ? 52 : 84;

/** Q 为屏的近端、P 为远端，O 在 Q 左侧 L 处 */
const Q: Pt = { x: 300, y: 300 };
const P: Pt = { x: Q.x, y: Q.y - 2 * L };
const O: Pt = { x: Q.x - L, y: Q.y };

/** 背面临界圆：圆心 C 在过 P 的屏垂线上，半径 R = 5L/2 */
const C: Pt = { x: Q.x - 2.5 * L, y: P.y };
const R = 2.5 * L;
/** C 正下方、与 O 同高的构造点（CA = 2L，AO = R − L，CO = R） */
const A: Pt = { x: C.x, y: Q.y };

/** 朝向 O 那面的临界轨迹：以 OP 为直径 */
const M: Pt = { x: (O.x + P.x) / 2, y: (O.y + P.y) / 2 };
const OP_HALF = Math.hypot(P.x - O.x, P.y - O.y) / 2;
/** 可达区域半径 2R：临界时恰好等于 OP，圆边界正好过 P */
const DISK_R = 2 * OP_HALF;
const a0 = Math.atan2(O.y - M.y, O.x - M.x);

/** 以圆心 c、半径 r，从 from 扫到 to 的圆弧（SVG 坐标，y 向下） */
const arc = (c: Pt, r: number, from: number, to: number): string =>
  Array.from({ length: 65 }, (_, i) => {
    const a = from + ((to - from) * i) / 64;
    return `${i === 0 ? "M" : "L"} ${(c.x + r * Math.cos(a)).toFixed(1)} ${(c.y + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

/** 粒子从 O 出发、经屏上方绕到 P 的这段半圆（顺时针） */
const LEFT_ARC = arc(M, OP_HALF, a0, a0 + Math.PI);

/** 直角标记：顶点 corner，两条边沿 dirA、dirB 方向（单位向量） */
const rightAngle = (corner: Pt, dirA: Pt, dirB: Pt, size: number): string => {
  const p1 = { x: corner.x + dirA.x * size, y: corner.y + dirA.y * size };
  const p2 = { x: p1.x + dirB.x * size, y: p1.y + dirB.y * size };
  const p3 = { x: corner.x + dirB.x * size, y: corner.y + dirB.y * size };
  return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y}`;
};

/** Q 处：QO 与 QP 的直角；P 处：相切 ⟹ CP 与屏垂直；A 处：CA 与 AO 垂直 */
const MARK = Math.round(L * 0.17);
const ANGLE_Q = rightAngle(Q, { x: -1, y: 0 }, { x: 0, y: -1 }, MARK);
const ANGLE_P = `M ${P.x - MARK} ${P.y} L ${P.x - MARK} ${P.y + MARK} L ${Q.x} ${P.y + MARK}`;
const ANGLE_A = rightAngle(A, { x: 0, y: -1 }, { x: 1, y: 0 }, MARK);

/** 可达区域半径的标注位置（贴着圆的左下方边界） */
const DISK_LABEL: Pt = { x: 108, y: 416 };

const MATH = "KaTeX_Math, 'Times New Roman', serif";
const HALO = { stroke: "var(--c-bg)", "stroke-width": 3.6, "paint-order": "stroke" } as const;
</script>

<template>
  <div class="fig-screen">
    <svg
      :viewBox="`${VB.x} ${VB.y} ${VB.w} ${VB.h}`"
      class="fig-svg"
      role="img"
      aria-label="垂直纸面向外的匀强磁场中，粒子源 O 向纸面内各方向发射正粒子；薄光屏与纸面的交线为 PQ，OQ 等于 L，PQ 等于 2L，OQ 垂直 PQ；要使 PQ 两侧所有点都被粒子打中，求速率范围"
    >
      <!-- 磁场：垂直纸面向外（裸 ·） -->
      <FieldDots
        :x="44"
        :y="62"
        :cols="14"
        :rows="16"
        :spacing="28"
        :size="6"
        dir="out"
        :opacity="0.3"
      />

      <!-- ── 朝向 O 的一面：能打到的区域是以 O 为圆心、半径 2R 的圆（整条 PQ 都在里面）── -->
      <template v-if="mode === 'left' && step >= 1">
        <circle
          :cx="O.x"
          :cy="O.y"
          :r="DISK_R"
          fill="color-mix(in srgb, var(--c-accent) 7%, transparent)"
          stroke="var(--c-accent)"
          stroke-width="2"
          stroke-dasharray="10 8"
          stroke-opacity="0.55"
        />
        <text
          :x="DISK_LABEL.x"
          :y="DISK_LABEL.y"
          font-size="18"
          text-anchor="middle"
          :font-family="MATH"
          font-style="italic"
          fill="var(--c-accent)"
          :style="HALO"
        >
          2R
        </text>
      </template>

      <!-- 光屏 PQ（题干图常显） -->
      <rect
        :x="Q.x"
        :y="P.y"
        :width="8"
        :height="Q.y - P.y"
        rx="3"
        fill="color-mix(in srgb, var(--c-text) 62%, transparent)"
      />

      <!-- 这一面整段都会被打亮：从 Q 到 P 没有一处暗 -->
      <line
        v-if="mode === 'left' && step >= 1"
        :x1="Q.x"
        :y1="P.y"
        :x2="Q.x"
        :y2="Q.y"
        stroke="var(--c-accent)"
        stroke-width="4"
        stroke-linecap="round"
      />

      <!-- 这一页讲的是哪一面 -->
      <text
        v-if="mode === 'left' && step >= 1"
        :x="Q.x - 10"
        :y="Q.y - 8"
        font-size="14"
        text-anchor="end"
        fill="var(--c-text-dim)"
        :style="HALO"
      >
        这一面
      </text>

      <!-- OQ 与 L、屏长 2L -->
      <line :x1="O.x" :y1="O.y" :x2="Q.x" :y2="Q.y" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <line
        :x1="Q.x + 22"
        :y1="P.y"
        :x2="Q.x + 22"
        :y2="Q.y"
        stroke="var(--c-line)"
        stroke-width="1.4"
      />
      <text
        :x="Q.x + 30"
        :y="(P.y + Q.y) / 2 + 6"
        font-size="17"
        :font-family="MATH"
        font-style="italic"
        fill="var(--c-text-dim)"
        :style="HALO"
      >
        2L
      </text>
      <text
        :x="(O.x + Q.x) / 2 - 2"
        :y="O.y + 21"
        font-size="17"
        text-anchor="middle"
        :font-family="MATH"
        font-style="italic"
        fill="var(--c-text-dim)"
        :style="HALO"
      >
        L
      </text>

      <!-- Q 处直角（OQ ⊥ PQ） -->
      <path :d="ANGLE_Q" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" />

      <!-- 粒子源 O -->
      <circle :cx="O.x" :cy="O.y" r="5.5" fill="var(--c-accent)" />
      <text
        :x="O.x + 2"
        :y="O.y + 24"
        font-size="18"
        text-anchor="middle"
        :font-family="MATH"
        font-style="italic"
        fill="var(--c-accent)"
        :style="HALO"
      >
        O
      </text>

      <!-- P、Q 标注与光屏说明 -->
      <text
        :x="P.x - 14"
        :y="P.y - 12"
        font-size="18"
        text-anchor="middle"
        :font-family="MATH"
        font-style="italic"
        fill="var(--c-text)"
        :style="HALO"
      >
        P
      </text>
      <text
        :x="Q.x + 10"
        :y="Q.y + 22"
        font-size="18"
        :font-family="MATH"
        font-style="italic"
        fill="var(--c-text)"
        :style="HALO"
      >
        Q
      </text>
      <text :x="Q.x + 22" :y="P.y - 22" font-size="15" fill="var(--c-text-dim)" :style="HALO">
        光屏
      </text>

      <!-- ── 朝向 O 的一面：连 OP（屏上离 O 最远的点）── -->
      <template v-if="mode === 'left' && step >= 2">
        <line
          :x1="O.x"
          :y1="O.y"
          :x2="P.x"
          :y2="P.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="7 6"
        />
        <circle :cx="P.x" :cy="P.y" r="4.5" fill="var(--c-accent)" />
        <text
          :x="(O.x + P.x) / 2 - 32"
          :y="(O.y + P.y) / 2 + 14"
          font-size="17"
          text-anchor="middle"
          :font-family="MATH"
          font-style="italic"
          fill="var(--c-text-dim)"
          :style="HALO"
        >
          OP
        </text>
      </template>

      <!-- ── 朝向 O 的一面：以 OP 为直径的临界轨迹（顺时针，经屏上方到 P）── -->
      <path
        v-if="mode === 'left' && step >= 2"
        :d="LEFT_ARC"
        fill="none"
        stroke="var(--c-force)"
        stroke-width="2.6"
        stroke-linecap="round"
      />

      <!-- ── 背面：与屏相切于 P 的临界轨迹 ── -->
      <template v-if="mode === 'right' && step >= 1">
        <circle :cx="C.x" :cy="C.y" :r="R" fill="none" stroke="var(--c-force)" stroke-width="2.6" />
        <!-- 圆心 C、两条半径 -->
        <circle :cx="C.x" :cy="C.y" r="4.5" fill="var(--c-accent)" />
        <text
          :x="C.x - 10"
          :y="C.y - 12"
          font-size="18"
          text-anchor="end"
          :font-family="MATH"
          font-style="italic"
          fill="var(--c-text)"
          :style="HALO"
        >
          C
        </text>
        <path
          :d="`M ${C.x} ${C.y} L ${P.x} ${P.y} M ${C.x} ${C.y} L ${O.x} ${O.y}`"
          stroke="var(--c-accent)"
          stroke-width="1.8"
        />
        <text
          :x="(C.x + P.x) / 2"
          :y="C.y - 12"
          font-size="17"
          text-anchor="middle"
          :font-family="MATH"
          font-style="italic"
          fill="var(--c-accent)"
          :style="HALO"
        >
          R
        </text>
        <text
          :x="(C.x + O.x) / 2 - 13"
          :y="(C.y + O.y) / 2 + 10"
          font-size="17"
          text-anchor="middle"
          :font-family="MATH"
          font-style="italic"
          fill="var(--c-accent)"
          :style="HALO"
        >
          R
        </text>
        <!-- 相切 ⟹ CP ⊥ 屏 -->
        <path :d="ANGLE_P" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" />
      </template>

      <!-- ── 背面：构造直角三角形 CAO（2L、R − L、R）── -->
      <template v-if="mode === 'right' && step >= 2">
        <path
          :d="`M ${C.x} ${C.y} L ${A.x} ${A.y} M ${A.x} ${A.y} L ${O.x} ${O.y}`"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="7 6"
        />
        <path :d="ANGLE_A" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" />
        <text
          :x="C.x - 12"
          :y="(C.y + A.y) / 2 + 6"
          font-size="17"
          text-anchor="end"
          :font-family="MATH"
          font-style="italic"
          fill="var(--c-text-dim)"
          :style="HALO"
        >
          2L
        </text>
        <text
          :x="(A.x + O.x) / 2 - 6"
          :y="A.y - 12"
          font-size="17"
          text-anchor="middle"
          :font-family="MATH"
          font-style="italic"
          fill="var(--c-text-dim)"
          :style="HALO"
        >
          R-L
        </text>
      </template>
    </svg>
  </div>
</template>

<style scoped>
.fig-screen {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
}

.fig-screen .fig-svg {
  width: 100%;
  max-width: none;
  height: 100%;
}
</style>
