<script setup lang="ts">
// 第 22 页：一般的曲线运动可以分割成许多很短的小段，每段都看作圆周运动的一部分。
// 曲线 M 150 350 Q 480 40 810 350 在每一点都有自己的"密切圆"（曲率半径随位置变化）：
// step ≥ 1 画出各点的局部圆弧；step ≥ 2 高亮中间那一段，为下一页引出曲率半径 ρ。
// 只取 3 个采样点、半弧长 85：相邻圆弧不重叠，才看得出"这是分开的一小段一小段"。
const { step = 0 } = defineProps<{ step?: number }>();

const xOf = (s: number): number => 150 + 660 * s;
const yOf = (s: number): number => 350 - 620 * s + 620 * s * s;
const dyOf = (s: number): number => -620 + 1240 * s;
/** 局部圆弧的半弧长（用户单位）：远小于相邻采样点间距的一半，保证圆弧之间留出空隙 */
const L = 62;

interface Arc {
  P: { x: number; y: number };
  d: string;
}

const arcs: Arc[] = [0.22, 0.5, 0.78].map((s) => {
  const P = { x: xOf(s), y: yOf(s) };
  const dy = dyOf(s);
  const dx = 660;
  const len = Math.hypot(dx, dy);
  // 密切圆圆心：在曲线的凹侧（屏幕下方）
  let nx = -dy / len;
  let ny = dx / len;
  if (ny < 0) {
    nx = -nx;
    ny = -ny;
  }
  // 二次贝塞尔（P0=150,350 / 控制点 480,40 / P2=810,350）的曲率：R = (x'² + y'²)^1.5 / |x'y''|
  const R = (435600 + dy * dy) ** 1.5 / 818400;
  const C = { x: P.x + nx * R, y: P.y + ny * R };
  const phi = L / R;
  const cos = Math.cos(phi);
  const sin = Math.sin(phi);
  const vx = P.x - C.x;
  const vy = P.y - C.y;
  const A = { x: C.x + vx * cos - vy * sin, y: C.y + vx * sin + vy * cos };
  const B = { x: C.x + vx * cos + vy * sin, y: C.y - vx * sin + vy * cos };
  const Q = { x: 2 * P.x - (A.x + B.x) / 2, y: 2 * P.y - (A.y + B.y) / 2 };

  return { P, d: `M ${A.x.toFixed(1)} ${A.y.toFixed(1)} Q ${Q.x.toFixed(1)} ${Q.y.toFixed(1)} ${B.x.toFixed(1)} ${B.y.toFixed(1)}` };
});

/** 中间那个采样点：step ≥ 2 时高亮它的一段，为下一页引出曲率半径 ρ */
const [, mid] = arcs;
</script>

<template>
  <svg viewBox="130 185 700 185" width="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M 150 350 Q 480 40 810 350" fill="none" stroke="#f1f5f9" stroke-width="3.4" stroke-linecap="round" />
    <g v-if="step >= 1">
      <path
        v-for="(arc, index) in arcs"
        :key="index"
        :d="arc.d"
        fill="none"
        :stroke="step >= 2 && index === 1 ? '#e2a846' : '#2dd4bf'"
        :stroke-width="step >= 2 && index === 1 ? 4 : 3"
        stroke-dasharray="12 8"
        stroke-linecap="round"
        :opacity="step >= 2 && index !== 1 ? 0.35 : 0.95"
      />
      <circle v-for="(arc, index) in arcs" :key="`p${index}`" :cx="arc.P.x" :cy="arc.P.y" r="5" fill="#f1f5f9" />
    </g>
    <g v-if="step >= 2">
      <circle :cx="mid.P.x" :cy="mid.P.y" r="12" fill="none" stroke="#e2a846" stroke-width="2.4" />
      <text
        :x="mid.P.x + 36"
        :y="mid.P.y + 52"
        font-family="KaTeX_Main"
        font-size="19"
        fill="#e2a846"
        text-anchor="start"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        这一小段
      </text>
    </g>
  </svg>
</template>
