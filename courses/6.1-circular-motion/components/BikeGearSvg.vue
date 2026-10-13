<script setup lang="ts">
/** 6.1 引课（第 2 页，自行车传动）：一大一小两个齿轮用链条相连，标出大齿轮边缘的 A、小齿轮边缘的 B，以及大齿轮上到转轴一半的 C。 */
interface Pt {
  x: number;
  y: number;
}
interface Gear {
  x: number;
  y: number;
  r: number;
}
interface Tick {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const G1 = { x: 108, y: 126, r: 58 };
const G2 = { x: 268, y: 126, r: 29 };

const toXY = (g: { x: number; y: number }, deg: number, r: number): Pt => {
  const a = (deg * Math.PI) / 180;
  return { x: g.x + r * Math.cos(a), y: g.y - r * Math.sin(a) };
};
/**
 * 轮齿：均匀分布一圈朝外的小短线
 *
 * @param g 齿轮（圆心与半径）
 * @param n 齿数
 * @returns 每根齿的线段坐标
 */
const teeth = (g: Gear, n: number): Tick[] =>
  Array.from({ length: n }, (_, i): Tick => {
    const inner = toXY(g, (i * 360) / n, g.r);
    const outer = toXY(g, (i * 360) / n, g.r + 5);

    return { x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y };
  });
const teeth1 = teeth(G1, 18);
const teeth2 = teeth(G2, 9);

/** 链条的公切线切点：法线 n 满足 n·(C2−C1) = R1−R2，取 n = (K, −√(1−K²))；第二条切线用 n' = (K, +√(1−K²)) */
const K = (G1.r - G2.r) / (G2.x - G1.x);
const NORMAL_Y = Math.sqrt(1 - K * K);
const P1 = { x: G1.x + G1.r * K, y: G1.y - G1.r * NORMAL_Y };
const P2 = { x: G2.x + G2.r * K, y: G2.y - G2.r * NORMAL_Y };
const P1b = { x: G1.x + G1.r * K, y: G1.y + G1.r * NORMAL_Y };
const P2b = { x: G2.x + G2.r * K, y: G2.y + G2.r * NORMAL_Y };

/** 三个待比较的点：A 在大齿轮边缘、B 在小齿轮边缘、C 在大齿轮半径中点 */
const A = toXY(G1, 160, G1.r);
const C = toXY(G1, 160, G1.r / 2);
const B = toXY(G2, 22, G2.r);

/** 链条包角：与两条公切线同在节圆（半径 = r）上，接成闭环；齿伸到链条外侧，读作"链条骑在轮齿上" */
const TH = (Math.atan2(NORMAL_Y, K) * 180) / Math.PI;
const chainPts = (g: Gear, a1: number, a2: number, n = 48): Pt[] => Array.from({ length: n + 1 }, (_, i): Pt => toXY(g, a1 + ((a2 - a1) * i) / n, g.r));
const chainWrap1 = chainPts(G1, TH, 360 - TH)
  .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
  .join(" ");
const chainWrap2 = chainPts(G2, TH, -TH, 32)
  .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
  .join(" ");
</script>

<template>
  <svg viewBox="26 58 302 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle :cx="G1.x" :cy="G1.y" :r="G1.r" fill="none" stroke="currentColor" stroke-width="2.2" opacity="0.6" />
    <line v-for="(t, i) in teeth1" :key="`t1-${i}`" :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2" stroke="currentColor" stroke-width="1.4" opacity="0.4" />
    <circle :cx="G2.x" :cy="G2.y" :r="G2.r" fill="none" stroke="currentColor" stroke-width="2.2" opacity="0.6" />
    <line v-for="(t, i) in teeth2" :key="`t2-${i}`" :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2" stroke="currentColor" stroke-width="1.4" opacity="0.4" />
    <line :x1="P1.x" :y1="P1.y" :x2="P2.x" :y2="P2.y" stroke="#60a5fa" stroke-width="3" opacity="0.85" />
    <line :x1="P1b.x" :y1="P1b.y" :x2="P2b.x" :y2="P2b.y" stroke="#60a5fa" stroke-width="3" opacity="0.85" />
    <path :d="chainWrap1" fill="none" stroke="#60a5fa" stroke-width="3" opacity="0.85" stroke-linecap="round" />
    <path :d="chainWrap2" fill="none" stroke="#60a5fa" stroke-width="3" opacity="0.85" stroke-linecap="round" />
    <circle :cx="G1.x" :cy="G1.y" r="2.8" fill="currentColor" opacity="0.45" />
    <circle :cx="G2.x" :cy="G2.y" r="2.4" fill="currentColor" opacity="0.45" />
    <line :x1="G1.x" :y1="G1.y" :x2="A.x" :y2="A.y" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.5" />
    <circle :cx="A.x" :cy="A.y" r="5" fill="#e2a846" />
    <circle :cx="B.x" :cy="B.y" r="4.5" fill="#60a5fa" />
    <circle :cx="C.x" :cy="C.y" r="4.5" fill="currentColor" opacity="0.95" />
    <text
      :x="A.x - 19"
      :y="A.y + 5"
      font-size="17"
      font-family="KaTeX_Math"
      font-style="italic"
      fill="#e2a846"
      stroke="#0d1220"
      stroke-width="3.5"
      stroke-linejoin="round"
      paint-order="stroke"
    >
      A
    </text>
    <text
      :x="B.x + 10"
      :y="B.y + 5"
      font-size="17"
      font-family="KaTeX_Math"
      font-style="italic"
      fill="#60a5fa"
      stroke="#0d1220"
      stroke-width="3.5"
      stroke-linejoin="round"
      paint-order="stroke"
    >
      B
    </text>
    <text
      :x="C.x - 17"
      :y="C.y + 13"
      font-size="17"
      font-family="KaTeX_Math"
      font-style="italic"
      fill="currentColor"
      stroke="#0d1220"
      stroke-width="3.5"
      stroke-linejoin="round"
      paint-order="stroke"
    >
      C
    </text>
  </svg>
</template>
