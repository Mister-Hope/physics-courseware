<!-- 第 3 页：横波穿狭缝（平行能过、垂直不能过）与纵波穿狭缝（都能过），按 step 依次显示 -->
<template>
  <svg viewBox="0 0 460 200" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <text x="230" y="22" text-anchor="middle" font-family="KaTeX_Main" font-size="16" :fill="current.color">{{ current.title }}</text>
    <path
      v-for="(d, index) in current.waves"
      :key="`w-${index}`"
      :d="d"
      fill="none"
      :stroke="current.color"
      stroke-width="2.6"
      :opacity="index === 0 ? 1 : current.afterOpacity"
    />
    <g v-if="current.slot === 'vertical'">
      <rect x="184" y="44" width="31" height="112" rx="2" fill="#c8d3ea" opacity="0.78" />
      <rect x="253" y="44" width="23" height="112" rx="2" fill="#c8d3ea" opacity="0.78" />
    </g>
    <g v-else>
      <rect x="184" y="44" width="92" height="38" rx="2" fill="#c8d3ea" opacity="0.78" />
      <rect x="184" y="118" width="92" height="38" rx="2" fill="#c8d3ea" opacity="0.78" />
    </g>
    <text x="230" y="188" text-anchor="middle" font-family="KaTeX_Main" font-size="16" :fill="current.noteColor">{{ current.note }}</text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

const sine = (from: number, to: number, amp: number, period: number): string => {
  const points: string[] = [];
  for (let x = from; x <= to; x += 3) {
    const y = 100 + amp * Math.sin(((x - from) / period) * Math.PI * 2);
    points.push(`${x} ${y.toFixed(1)}`);
  }
  return `M ${points.join(" L ")}`;
};

const flat = (from: number, to: number): string => `M ${from} 100 L ${to} 100`;

const particles = (from: number, to: number): string => {
  const pieces: string[] = [];
  const count = 11;
  const gap = (to - from) / (count - 1);
  for (let index = 0; index < count; index += 1) {
    const shift = 3.2 * Math.sin((index / 3.5) * Math.PI * 2);
    const x = from + gap * index + shift;
    pieces.push(`M ${x.toFixed(1)} 84 L ${x.toFixed(1)} 116`);
  }
  return pieces.join(" ");
};

const panels = [
  {
    slot: "vertical",
    color: "#2dd4bf",
    title: "甲  横波，缝与振动方向平行",
    waves: [sine(96, 364, 26, 50)],
    afterOpacity: 1,
    note: "波能通过",
    noteColor: "#2dd4bf",
  },
  {
    slot: "horizontal",
    color: "#2dd4bf",
    title: "乙  横波，缝与振动方向垂直",
    waves: [sine(96, 236, 26, 50), flat(276, 364)],
    afterOpacity: 0.5,
    note: "波不能通过",
    noteColor: "#f87171",
  },
  {
    slot: "vertical",
    color: "#e2a846",
    title: "丙  纵波",
    waves: [particles(96, 364)],
    afterOpacity: 1,
    note: "无论缝怎样放，波都能通过",
    noteColor: "#e2a846",
  },
];

const current = computed(() => panels[Math.min(Math.max(step, 0), 2)]);
</script>
