<!-- 封面装饰：自然光经过偏振片，只留下沿透振方向振动的偏振光 -->
<template>
  <svg viewBox="0 0 320 190" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="28" cy="95" r="9" fill="#e2a846" opacity="0.85" />
    <g stroke="#8b98b8" stroke-width="1.7" opacity="0.65" fill="none">
      <g v-for="(item, index) in natural" :key="`n-${index}`">
        <path :d="item.shaft" />
        <path :d="item.headA" />
        <path :d="item.headB" />
      </g>
    </g>
    <rect x="128" y="34" width="13" height="122" rx="2" fill="#2dd4bf" fill-opacity="0.14" stroke="#2dd4bf" stroke-width="1.4" />
    <g stroke="#2dd4bf" stroke-width="1.6" opacity="0.85">
      <line x1="131" y1="46" x2="131" y2="144" />
      <line x1="134.5" y1="46" x2="134.5" y2="144" />
      <line x1="138" y1="46" x2="138" y2="144" />
    </g>
    <g stroke="#fbbf24" stroke-width="2" fill="none">
      <g v-for="(item, index) in polarized" :key="`p-${index}`">
        <path :d="item.shaft" />
        <path :d="item.headA" />
        <path :d="item.headB" />
      </g>
    </g>
    <text x="134" y="176" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="#2dd4bf">偏振片</text>
    <text x="226" y="176" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="#fbbf24">偏振光</text>
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
  const head = 5;
  const headA = `M ${x1} ${y1} L ${x1 + ux * head + nx * head * 0.6} ${y1 + uy * head + ny * head * 0.6} M ${x1} ${y1} L ${x1 + ux * head - nx * head * 0.6} ${y1 + uy * head - ny * head * 0.6}`;
  const headB = `M ${x2} ${y2} L ${x2 - ux * head + nx * head * 0.6} ${y2 - uy * head + ny * head * 0.6} M ${x2} ${y2} L ${x2 - ux * head - nx * head * 0.6} ${y2 - uy * head - ny * head * 0.6}`;
  return { shaft: `M ${x1} ${y1} L ${x2} ${y2}`, headA, headB };
};

const natural: Osc[] = [0, 45, 90, 135].map((angle) => {
  const rad = (angle * Math.PI) / 180;
  return oscillate({ cx: 78, cy: 95, dx: Math.cos(rad), dy: Math.sin(rad), half: 20 });
});

const polarized: Osc[] = [180, 214, 248].map((cx) => oscillate({ cx, cy: 95, dx: 0, dy: 1, half: 30 }));
</script>
