<script setup lang="ts">
/**
 * 平抛与圆弧：三种典型情形（一个组件，三个变体）。
 *
 * - Variant=1：小球平抛后**恰好沿切线进入圆弧轨道**——轨道画成"圆心在上方"的碗形圆弧， 抛物线在落点 P 处与轨道相切（切线方向＝该处速度方向）；
 * - Variant=2：从**圆心**水平抛出，落在四分之一圆弧上（求 v_0、R 与落点半径偏角 θ 的关系）；
 * - Variant=3：从半圆轨道的**同一端**以很小和很大的两个速度平抛射入——速度反向延长线交抛出高度线于 水平位移的一半，两个交点都落在圆心左侧，所以任何落点的速度方向都不可能过圆心。
 *
 * 干净状态只画题干元素；轨迹、落点速度、反向延长线都包在 `<g v-if="showAnalysis">` 里。
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

const rad = (d: number): number => (d * Math.PI) / 180;

/**
 * 圆弧 path（屏幕角度：0° 向右、90° 向下）
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
const arcPath = (cx: number, cy: number, r: number, fromDeg: number, toDeg: number): string => {
  const start = { x: cx + r * Math.cos(rad(fromDeg)), y: cy + r * Math.sin(rad(fromDeg)) };
  const end = { x: cx + r * Math.cos(rad(toDeg)), y: cy + r * Math.sin(rad(toDeg)) };
  const sweep = toDeg > fromDeg ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 0 ${sweep} ${end.x} ${end.y}`;
};

const parabola = (from: Vec, to: Vec, control: Vec): string => `M ${from.x} ${from.y} Q ${control.x} ${control.y} ${to.x} ${to.y}`;

// ── 情形 1：圆心在上方的碗形圆弧，抛物线在 P 处相切 ────────────────
const center1 = { x: 395, y: 119 };
const radius1 = 150;
const origin1 = { x: 80, y: 120 };
const ENTRY1 = { x: 289, y: 225 };
const CONTROL1 = { x: 184.5, y: 120 };
const VEL1 = { dx: 0.705, dy: 0.709 };

// ── 情形 2：从圆心水平抛出 ────────────────────────────────────────
const center2 = { x: 220, y: 180 };
const radius2 = 170;
const LANDING2 = { x: 350, y: 289 };
const CONTROL2 = { x: 285, y: 180 };
const VEL2 = { dx: 0.512, dy: 0.859 };

// ── 情形 3：同一端、两个速度；两个交点都在圆心左侧 ─────────────────
const center3 = { x: 330, y: 140 };
const radius3 = 170;
const A_SMALL = { x: 160, y: 134 };
const A_LARGE = { x: 160, y: 146 };
const LAND_SMALL = { x: 230, y: 277.5 };
const LAND_LARGE = { x: 470, y: 236.4 };
const CONTROL_SMALL = { x: 195, y: 134 };
const CONTROL_LARGE = { x: 315, y: 146 };
const MEET_SMALL = { x: 195, y: 134 };
const MEET_LARGE = { x: 315, y: 146 };
const VEL_SMALL = { dx: 0.238, dy: 0.971 };
const VEL_LARGE = { dx: 0.865, dy: 0.502 };

const tip = (point: Vec, v: Velocity, len: number): Vec => ({
  x: point.x + v.dx * len,
  y: point.y + v.dy * len,
});
</script>

<template>
  <div class="arc-case">
    <svg viewBox="60 90 480 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="平抛与圆弧的三种情形">
      <!-- 情形 1：沿切线进入（圆心在上方的碗形轨道） -->
      <g v-if="variant === 1">
        <path :d="arcPath(center1.x, center1.y, radius1, 90, 180)" fill="none" stroke="rgba(148,163,184,0.95)" stroke-width="6" stroke-linecap="round" />
        <line :x1="center1.x" :y1="center1.y" :x2="ENTRY1.x" :y2="ENTRY1.y" stroke="rgba(148,163,184,0.7)" stroke-width="1.8" stroke-dasharray="7 6" />
        <circle :cx="center1.x" :cy="center1.y" r="5" fill="none" stroke="#f87171" stroke-width="2.2" />
        <text :x="center1.x + 12" :y="center1.y + 6" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#f87171">O</text>
        <circle :cx="origin1.x" :cy="origin1.y" r="5.5" fill="#e2e8f0" />
        <text :x="origin1.x - 28" :y="origin1.y - 12" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2e8f0">A</text>
        <CourseArrow :from="origin1" :to="{ x: origin1.x + 100, y: origin1.y }" stroke="#e2a846" :stroke-width="3" />
        <text :x="origin1.x + 34" :y="origin1.y - 14" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#e2a846">v</text>
        <text :x="origin1.x + 46" :y="origin1.y - 10" font-family="KaTeX_Main" font-style="normal" font-size="13" fill="#e2a846">0</text>
        <circle :cx="ENTRY1.x" :cy="ENTRY1.y" r="5.5" fill="#f87171" />
        <text :x="ENTRY1.x - 26" :y="ENTRY1.y + 6" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#f87171">P</text>
        <g v-if="showAnalysis">
          <path :d="parabola(origin1, ENTRY1, CONTROL1)" fill="none" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
          <CourseArrow :from="ENTRY1" :to="tip(ENTRY1, VEL1, 66)" stroke="#f87171" :stroke-width="3.2" />
          <text :x="tip(ENTRY1, VEL1, 66).x + 6" :y="tip(ENTRY1, VEL1, 66).y + 4" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#fca5a5">
            v
          </text>
        </g>
      </g>

      <!-- 情形 2：从圆心水平抛出 -->
      <g v-else-if="variant === 2">
        <path :d="arcPath(center2.x, center2.y, radius2, 0, 90)" fill="none" stroke="rgba(148,163,184,0.95)" stroke-width="6" stroke-linecap="round" />
        <line
          :x1="center2.x"
          :y1="center2.y"
          :x2="center2.x + radius2"
          :y2="center2.y"
          stroke="rgba(148,163,184,0.65)"
          stroke-width="1.6"
          stroke-dasharray="7 6"
        />
        <line
          :x1="center2.x"
          :y1="center2.y"
          :x2="center2.x"
          :y2="center2.y + radius2"
          stroke="rgba(148,163,184,0.65)"
          stroke-width="1.6"
          stroke-dasharray="7 6"
        />
        <circle :cx="center2.x" :cy="center2.y" r="5.5" fill="#e2e8f0" />
        <text :x="center2.x - 30" :y="center2.y - 12" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2e8f0">O</text>
        <CourseArrow :from="center2" :to="{ x: center2.x + 104, y: center2.y }" stroke="#e2a846" :stroke-width="3" />
        <text :x="center2.x + 36" :y="center2.y - 14" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#e2a846">v</text>
        <text :x="center2.x + 48" :y="center2.y - 10" font-family="KaTeX_Main" font-style="normal" font-size="13" fill="#e2a846">0</text>
        <line :x1="center2.x" :y1="center2.y" :x2="LANDING2.x" :y2="LANDING2.y" stroke="rgba(96,165,250,0.9)" stroke-width="2.4" />
        <path :d="arcPath(center2.x, center2.y, 62, 0, 40)" fill="none" stroke="#60a5fa" stroke-width="2" />
        <text :x="center2.x + 74" :y="center2.y + 32" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#93c5fd">θ</text>
        <circle :cx="LANDING2.x" :cy="LANDING2.y" r="5.5" fill="#f87171" />
        <text :x="LANDING2.x + 12" :y="LANDING2.y + 4" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#f87171">P</text>
        <text
          :x="(center2.x + LANDING2.x) / 2 + 4"
          :y="(center2.y + LANDING2.y) / 2 + 2"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
          fill="#93c5fd"
        >
          R
        </text>
        <g v-if="showAnalysis">
          <path :d="parabola(center2, LANDING2, CONTROL2)" fill="none" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
          <CourseArrow :from="LANDING2" :to="tip(LANDING2, VEL2, 62)" stroke="#f87171" :stroke-width="3.2" />
          <text
            :x="tip(LANDING2, VEL2, 62).x + 6"
            :y="tip(LANDING2, VEL2, 62).y + 4"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
            fill="#fca5a5"
          >
            v
          </text>
        </g>
      </g>

      <!-- 情形 3：同一端两个速度，反向延长线的交点都在圆心左侧 -->
      <g v-else>
        <path :d="arcPath(center3.x, center3.y, radius3, 0, 180)" fill="none" stroke="rgba(148,163,184,0.95)" stroke-width="6" stroke-linecap="round" />
        <line x1="160" y1="140" x2="500" y2="140" stroke="rgba(148,163,184,0.6)" stroke-width="1.6" stroke-dasharray="7 6" />
        <line :x1="center3.x" y1="112" :x2="center3.x" y2="336" stroke="rgba(248,113,113,0.55)" stroke-width="1.6" stroke-dasharray="5 6" />
        <circle :cx="center3.x" :cy="center3.y" r="5" fill="none" stroke="#f87171" stroke-width="2.2" />
        <text :x="center3.x + 12" :y="center3.y - 12" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#f87171">O</text>
        <circle :cx="A_SMALL.x" :cy="A_SMALL.y" r="5.5" fill="#e2e8f0" />
        <circle :cx="A_LARGE.x" :cy="A_LARGE.y" r="5.5" fill="#e2e8f0" />
        <text :x="A_SMALL.x - 30" :y="A_SMALL.y - 6" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2e8f0">A</text>
        <CourseArrow :from="A_SMALL" :to="{ x: A_SMALL.x + 52, y: A_SMALL.y }" stroke="#60a5fa" :stroke-width="3" />
        <CourseArrow :from="A_LARGE" :to="{ x: A_LARGE.x + 120, y: A_LARGE.y }" stroke="#e2a846" :stroke-width="3" />
        <text :x="A_SMALL.x + 58" :y="A_SMALL.y - 10" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#93c5fd">v</text>
        <text :x="A_SMALL.x + 69" :y="A_SMALL.y - 7" font-family="KaTeX_Main" font-style="normal" font-size="15" fill="#93c5fd">小</text>
        <text :x="A_LARGE.x + 126" :y="A_LARGE.y + 30" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#e2a846">v</text>
        <text :x="A_LARGE.x + 137" :y="A_LARGE.y + 33" font-family="KaTeX_Main" font-style="normal" font-size="15" fill="#e2a846">大</text>
        <circle :cx="LAND_SMALL.x" :cy="LAND_SMALL.y" r="5.5" fill="#60a5fa" />
        <circle :cx="LAND_LARGE.x" :cy="LAND_LARGE.y" r="5.5" fill="#e2a846" />
        <g v-if="showAnalysis">
          <path :d="parabola(A_SMALL, LAND_SMALL, CONTROL_SMALL)" fill="none" stroke="#60a5fa" stroke-width="3" stroke-linecap="round" />
          <path :d="parabola(A_LARGE, LAND_LARGE, CONTROL_LARGE)" fill="none" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
          <CourseArrow :from="LAND_SMALL" :to="tip(LAND_SMALL, VEL_SMALL, 54)" stroke="#60a5fa" :stroke-width="3.2" />
          <CourseArrow :from="LAND_LARGE" :to="tip(LAND_LARGE, VEL_LARGE, 54)" stroke="#e2a846" :stroke-width="3.2" />
          <line
            :x1="LAND_SMALL.x"
            :y1="LAND_SMALL.y"
            :x2="MEET_SMALL.x"
            :y2="MEET_SMALL.y"
            stroke="rgba(96,165,250,0.75)"
            stroke-width="1.8"
            stroke-dasharray="8 6"
          />
          <line
            :x1="LAND_LARGE.x"
            :y1="LAND_LARGE.y"
            :x2="MEET_LARGE.x"
            :y2="MEET_LARGE.y"
            stroke="rgba(226,168,70,0.75)"
            stroke-width="1.8"
            stroke-dasharray="8 6"
          />
          <circle :cx="MEET_SMALL.x" :cy="MEET_SMALL.y" r="4.5" fill="#60a5fa" />
          <circle :cx="MEET_LARGE.x" :cy="MEET_LARGE.y" r="4.5" fill="#e2a846" />
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.arc-case {
  min-width: 0;
}

.arc-case svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
