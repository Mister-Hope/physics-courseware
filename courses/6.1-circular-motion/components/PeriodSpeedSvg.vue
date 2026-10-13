<script setup lang="ts">
/** 6.1 周期与转速（第 7 页）：小球绕圆一周（弧长 2πr）用时 T；转速 n 是单位时间内转过的圈数。 */
interface Pt {
  x: number;
  y: number;
}

const O = { x: 158, y: 130 };
const R = 82;
const toXY = (deg: number, r: number): Pt => {
  const a = (deg * Math.PI) / 180;
  return { x: O.x + r * Math.cos(a), y: O.y - r * Math.sin(a) };
};

const ball = toXY(90, R);
/** "转一周"的弧线箭头（顺时针，画在圆外）：折线 + 末端三角 */
const rotation = Array.from({ length: 41 }, (_, i): Pt => toXY(150 - (110 * i) / 40, R + 16));
const rotationD = rotation.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
const headPts = ((): string => {
  const p = rotation[rotation.length - 1];
  const q = rotation[rotation.length - 2];
  const ang = Math.atan2(p.y - q.y, p.x - q.x);
  const ux = Math.cos(ang);
  const uy = Math.sin(ang);
  const bx = p.x - 13 * ux;
  const by = p.y - 13 * uy;
  return `${p.x.toFixed(1)},${p.y.toFixed(1)} ${(bx + 6 * -uy).toFixed(1)},${(by + 6 * ux).toFixed(1)} ${(bx - 6 * -uy).toFixed(1)},${(by - 6 * ux).toFixed(1)}`;
})();
const rLabel = { x: (O.x + ball.x) / 2 + 13, y: (O.y + ball.y) / 2 };
</script>

<template>
  <svg viewBox="66 24 186 194" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle :cx="O.x" :cy="O.y" :r="R" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="6 6" opacity="0.28" />
    <path :d="rotationD" fill="none" stroke="#e2a846" stroke-width="3.2" stroke-linecap="round" />
    <polygon :points="headPts" fill="#e2a846" />
    <line :x1="O.x" :y1="O.y" :x2="ball.x" :y2="ball.y" stroke="currentColor" stroke-width="1.8" opacity="0.8" />
    <circle :cx="ball.x" :cy="ball.y" r="6" fill="#e2a846" />
    <circle :cx="O.x" :cy="O.y" r="3.5" fill="currentColor" opacity="0.8" />
    <text :x="O.x - 8" :y="O.y + 19" text-anchor="middle" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="currentColor">O</text>
    <text :x="rLabel.x" :y="rLabel.y" text-anchor="middle" font-size="19" font-family="KaTeX_Math" font-style="italic" fill="currentColor">r</text>
  </svg>
</template>
