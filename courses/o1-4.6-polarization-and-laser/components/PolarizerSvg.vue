<!-- 第 4 页：自然光通过一片偏振片后，只留下沿透振方向振动的偏振光 -->
<template>
  <svg viewBox="0 0 660 210" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g v-for="(item, index) in natural" :key="`n-${index}`" stroke="#8b98b8" stroke-width="1.7" opacity="0.7">
      <path :d="item.shaft" />
      <path :d="item.headA" />
      <path :d="item.headB" />
    </g>
    <text x="80" y="182" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="#8b98b8">自然光</text>
    <rect x="176" y="34" width="16" height="140" rx="3" fill="#2dd4bf" fill-opacity="0.14" stroke="#2dd4bf" stroke-width="1.6" />
    <g stroke="#2dd4bf" stroke-width="2" opacity="0.9">
      <line x1="180" y1="46" x2="180" y2="162" />
      <line x1="184" y1="46" x2="184" y2="162" />
      <line x1="188" y1="46" x2="188" y2="162" />
    </g>
    <text x="184" y="204" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="#2dd4bf">偏振片 P</text>
    <g v-for="(item, index) in polarized" :key="`p-${index}`" stroke="#fbbf24" stroke-width="1.9">
      <path :d="item.shaft" />
      <path :d="item.headA" />
      <path :d="item.headB" />
    </g>
    <text x="420" y="182" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="#fbbf24">偏振光：只沿透振方向振动</text>
  </svg>
</template>

<script setup lang="ts">
interface Osc {
  shaft: string;
  headA: string;
  headB: string;
}

const oscillate = ({ cx, cy, dx, dy, half }: { cx: number; cy: number; dx: number; dy: number; half: number }): Osc => {
  const length = Math.hypot(dx, dy);
  const ux = dx / length;
  const uy = dy / length;
  const x1 = cx - ux * half;
  const y1 = cy - uy * half;
  const x2 = cx + ux * half;
  const y2 = cy + uy * half;
  const nx = -uy;
  const ny = ux;
  const head = 6;
  const headA = `M ${x1} ${y1} L ${x1 + ux * head + nx * head * 0.55} ${y1 + uy * head + ny * head * 0.55} M ${x1} ${y1} L ${x1 + ux * head - nx * head * 0.55} ${y1 + uy * head - ny * head * 0.55}`;
  const headB = `M ${x2} ${y2} L ${x2 - ux * head + nx * head * 0.55} ${y2 - uy * head + ny * head * 0.55} M ${x2} ${y2} L ${x2 - ux * head - nx * head * 0.55} ${y2 - uy * head - ny * head * 0.55}`;
  return { shaft: `M ${x1} ${y1} L ${x2} ${y2}`, headA, headB };
};

const natural: Osc[] = [0, 30, 60, 90, 120, 150].map((angle) => {
  const rad = (angle * Math.PI) / 180;
  return oscillate({ cx: 80, cy: 108, dx: Math.cos(rad), dy: Math.sin(rad), half: 30 });
});

const polarized: Osc[] = [252, 330, 408, 486, 564].map((cx) => oscillate({ cx, cy: 108, dx: 0, dy: 1, half: 36 }));
</script>
