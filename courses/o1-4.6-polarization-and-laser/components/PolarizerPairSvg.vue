<!-- 第 5 页：两片偏振片，透振方向平行时透射最强，垂直时几乎不透过 -->
<template>
  <svg viewBox="0 0 660 226" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <text x="330" y="24" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="#c8d3ea">
      {{ step >= 1 ? "两片的透振方向垂直" : "两片的透振方向平行" }}
    </text>
    <g v-for="(item, index) in natural" :key="`n-${index}`" stroke="#8b98b8" stroke-width="1.6" opacity="0.6">
      <path :d="item.shaft" />
      <path :d="item.headA" />
      <path :d="item.headB" />
    </g>
    <rect x="150" y="46" width="16" height="132" rx="3" fill="#2dd4bf" fill-opacity="0.14" stroke="#2dd4bf" stroke-width="1.5" />
    <g stroke="#2dd4bf" stroke-width="2">
      <line x1="154" y1="58" x2="154" y2="166" />
      <line x1="158" y1="58" x2="158" y2="166" />
      <line x1="162" y1="58" x2="162" y2="166" />
    </g>
    <text x="158" y="198" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="#2dd4bf">P</text>
    <g v-for="(item, index) in between" :key="`b-${index}`" stroke="#fbbf24" stroke-width="1.8">
      <path :d="item.shaft" />
      <path :d="item.headA" />
      <path :d="item.headB" />
    </g>
    <rect x="386" y="46" width="16" height="132" rx="3" fill="#2dd4bf" fill-opacity="0.14" stroke="#2dd4bf" stroke-width="1.5" />
    <g v-if="step === 0" stroke="#2dd4bf" stroke-width="2">
      <line x1="390" y1="58" x2="390" y2="166" />
      <line x1="394" y1="58" x2="394" y2="166" />
      <line x1="398" y1="58" x2="398" y2="166" />
    </g>
    <g v-else stroke="#2dd4bf" stroke-width="2">
      <line x1="390" y1="76" x2="398" y2="76" />
      <line x1="390" y1="112" x2="398" y2="112" />
      <line x1="390" y1="148" x2="398" y2="148" />
    </g>
    <text x="394" y="198" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="#2dd4bf">Q</text>
    <g v-for="(item, index) in after" :key="`a-${index}`" stroke="#fbbf24" stroke-width="1.8">
      <path :d="item.shaft" />
      <path :d="item.headA" />
      <path :d="item.headB" />
    </g>
    <text v-if="step >= 1" x="500" y="118" text-anchor="middle" font-family="KaTeX_Main" font-size="15" fill="#8b98b8">几乎没有光透过</text>
    <text v-else x="500" y="206" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="#fbbf24">透射光最强</text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

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
  return oscillate({ cx: 64, cy: 112, dx: Math.cos(rad), dy: Math.sin(rad), half: 26 });
});

const between: Osc[] = [210, 280, 350].map((cx) => oscillate({ cx, cy: 112, dx: 0, dy: 1, half: 34 }));

const after = computed<Osc[]>(() => (step >= 1 ? [] : [446, 516, 586].map((cx) => oscillate({ cx, cy: 112, dx: 0, dy: 1, half: 34 }))));
</script>
