<script setup lang="ts">
// 用于第 21 页（例题：跳水运动员头部轨迹上的速度方向，教材 §5.1 第 1 题）：
// 跳台很高，头部轨迹是一条"打着圈儿"的曲线（不是抛物线）——
// 这样的轨迹上才会出现**速度正好竖直向下**和**正好竖直向上**的位置。
// 题目图常显（虚线轨迹 + 入水处的速度 v + 轨迹上 5 个点）；
// 点击后先标出"与 v 同向"的点（切线竖直向下），再标出"与 v 反向"的点（切线竖直向上）。
// 轨迹由 6 段三次贝塞尔拼成，每个标点处的切线与"是否竖直"都由曲线本身算出（不写死）。
import { computed } from "vue";

interface Point {
  x: number;
  y: number;
}
interface Cubic {
  start: Point;
  control1: Point;
  control2: Point;
  end: Point;
}

const { step = 0 } = defineProps<{ step?: number }>();

// ① 从跳台边缘向上、向右起弧 → ② 圈的右上段 → ③ 圈右侧（竖直向下）→
// ④ 圈底（水平向左）→ ⑤ 圈左侧（竖直向上）→ ⑥ 出圈后竖直落入水中
const SEGS: Cubic[] = [
  { start: { x: 168, y: 96 }, control1: { x: 200, y: 80 }, control2: { x: 232, y: 108 }, end: { x: 270, y: 108 } },
  { start: { x: 270, y: 108 }, control1: { x: 320, y: 108 }, control2: { x: 362, y: 131 }, end: { x: 362, y: 178 } },
  { start: { x: 362, y: 178 }, control1: { x: 362, y: 225 }, control2: { x: 335, y: 240 }, end: { x: 300, y: 240 } },
  { start: { x: 300, y: 240 }, control1: { x: 265, y: 240 }, control2: { x: 238, y: 215 }, end: { x: 238, y: 178 } },
  { start: { x: 238, y: 178 }, control1: { x: 238, y: 140 }, control2: { x: 230, y: 104 }, end: { x: 275, y: 112 } },
  { start: { x: 275, y: 112 }, control1: { x: 319, y: 120 }, control2: { x: 415, y: 236 }, end: { x: 420, y: 350 } },
];

const bezier = (segment: Cubic, t: number): Point => {
  const invT = 1 - t;
  return {
    x: invT * invT * invT * segment.start.x + 3 * invT * invT * t * segment.control1.x + 3 * invT * t * t * segment.control2.x + t * t * t * segment.end.x,
    y: invT * invT * invT * segment.start.y + 3 * invT * invT * t * segment.control1.y + 3 * invT * t * t * segment.control2.y + t * t * t * segment.end.y,
  };
};

const bezierDerivative = (segment: Cubic, t: number): Point => {
  const invT = 1 - t;
  return {
    x:
      3 * invT * invT * (segment.control1.x - segment.start.x) +
      6 * invT * t * (segment.control2.x - segment.control1.x) +
      3 * t * t * (segment.end.x - segment.control2.x),
    y:
      3 * invT * invT * (segment.control1.y - segment.start.y) +
      6 * invT * t * (segment.control2.y - segment.control1.y) +
      3 * t * t * (segment.end.y - segment.control2.y),
  };
};

const unit = (point: Point): Point => {
  const len = Math.hypot(point.x, point.y) || 1;
  return { x: point.x / len, y: point.y / len };
};

/** 轨迹上的 5 个待判断位置；偏移量让编号各自摆在外侧，互不遮挡 */
const MARKS: { seg: number; t: number; off: Point }[] = [
  { seg: 0, t: 0.45, off: { x: -26, y: -14 } },
  { seg: 1, t: 0.55, off: { x: -10, y: -26 } },
  { seg: 1, t: 1, off: { x: 24, y: -6 } },
  { seg: 2, t: 1, off: { x: -8, y: 32 } },
  { seg: 3, t: 1, off: { x: -32, y: 10 } },
];

const marks = computed(() =>
  MARKS.map((m, index) => {
    const seg = SEGS[m.seg];
    const point = bezier(seg, m.t);
    const unitDir = unit(bezierDerivative(seg, m.t));
    return {
      order: index + 1,
      point,
      label: { x: point.x + m.off.x, y: point.y + m.off.y },
      vertical: Math.abs(unitDir.y) > 0.9,
      down: unitDir.y > 0,
      tip: { x: point.x + unitDir.x * 62, y: point.y + unitDir.y * 62 },
    };
  }),
);

/** 切线竖直向下的位置（速度方向与入水时相同） */
const sameMarks = computed(() => marks.value.filter((m) => m.vertical && m.down));
/** 切线竖直向上的位置（速度方向与入水时相反） */
const oppositeMarks = computed(() => marks.value.filter((m) => m.vertical && !m.down));

const waterY = 350;
const entry: Point = { x: 420, y: waterY };
const vTip: Point = { x: 420, y: 412 };

const path = SEGS.map(
  (segment) =>
    `M ${segment.start.x} ${segment.start.y} C ${segment.control1.x} ${segment.control1.y} ${segment.control2.x} ${segment.control2.y} ${segment.end.x} ${segment.end.y}`,
).join(" ");
</script>

<template>
  <svg viewBox="0 0 620 420" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="96" width="112" height="16" rx="4" fill="rgba(148,163,184,0.2)" stroke="#94a3b8" stroke-width="2" />
    <text x="44" y="86" font-family="KaTeX_Main" font-size="24" fill="#94a3b8">跳台</text>
    <line x1="60" :y1="waterY" x2="606" :y2="waterY" stroke="#60a5fa" stroke-width="2.4" opacity="0.55" />
    <text x="602" y="374" font-family="KaTeX_Main" font-size="24" fill="#94a3b8" text-anchor="end">水面</text>
    <path :d="path" fill="none" stroke="#2dd4bf" stroke-width="3.6" stroke-dasharray="11 8" />
    <CourseArrow :from="entry" :to="vTip" stroke="#60a5fa" stroke-width="3.6" label="v" :label-dx="22" :label-dy="-6" />
    <g v-for="m in marks" :key="m.order">
      <circle :cx="m.point.x" :cy="m.point.y" r="6" fill="#f1f5f9" />
      <text :x="m.label.x" :y="m.label.y" font-family="KaTeX_Main" font-size="24" fill="#94a3b8" text-anchor="middle">{{ m.order }}</text>
    </g>
    <g v-if="step >= 1">
      <g v-for="m in sameMarks" :key="`same-${m.order}`">
        <CourseArrow :from="m.point" :to="m.tip" stroke="#60a5fa" stroke-width="3.2" />
        <text :x="m.point.x + 26" :y="m.point.y - 34" font-family="KaTeX_Main" font-size="24" fill="#60a5fa">与 v 同向</text>
      </g>
    </g>
    <g v-if="step >= 2">
      <g v-for="m in oppositeMarks" :key="`opp-${m.order}`">
        <CourseArrow :from="m.point" :to="m.tip" stroke="#e2a846" stroke-width="3.2" />
        <text :x="m.point.x - 108" :y="m.point.y - 16" font-family="KaTeX_Main" font-size="24" fill="#e2a846">与 v 反向</text>
      </g>
    </g>
  </svg>
</template>
