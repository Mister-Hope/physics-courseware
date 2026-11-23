<!-- 光密介质射向光疏介质：可调入射角的折射图（例题/练习复用） -->
<script setup lang="ts">
import { computed } from "vue";

const {
  angle = 40,
  n = 1.5,
  showCritical = false,
} = defineProps<{
  angle?: number;
  n?: number;
  showCritical?: boolean;
}>();

const rad = (d: number): number => (d * Math.PI) / 180;
const deg = (r: number): number => (r * 180) / Math.PI;
const L = 150;
const origin = { x: 250, y: 205 };

const theta2 = computed(() => {
  const s = n * Math.sin(rad(angle));
  return s <= 1 ? deg(Math.asin(s)) : null;
});
const critical = computed(() => deg(Math.asin(1 / n)));
const incStart = computed(() => ({
  x: origin.x - L * Math.sin(rad(angle)),
  y: origin.y + L * Math.cos(rad(angle)),
}));
const refEnd = computed(() => ({
  x: origin.x + L * Math.sin(rad(angle)),
  y: origin.y + L * Math.cos(rad(angle)),
}));
const refrEnd = computed(() =>
  theta2.value == null
    ? null
    : {
        x: origin.x + L * Math.sin(rad(theta2.value)),
        y: origin.y - L * Math.cos(rad(theta2.value)),
      },
);
const critEnd = computed(() => ({
  x: origin.x + L * Math.sin(rad(critical.value)),
  y: origin.y - L * Math.cos(rad(critical.value)),
}));
const label1 = computed(() => {
  const phi = rad(90 + angle / 2);
  return { x: origin.x + 54 * Math.cos(phi), y: origin.y + 54 * Math.sin(phi) };
});
const label2 = computed(() => {
  const phi = rad(-90 + (theta2.value ?? 60) / 2);
  return { x: origin.x + 54 * Math.cos(phi), y: origin.y + 54 * Math.sin(phi) };
});
const arc1 = computed(() => {
  const a = rad(angle);
  return `M ${origin.x} ${origin.y + 44} A 44 44 0 0 1 ${origin.x - 44 * Math.sin(a)} ${origin.y + 44 * Math.cos(a)}`;
});
const arc2 = computed(() => {
  const t = rad(theta2.value ?? 0);
  return `M ${origin.x} ${origin.y - 44} A 44 44 0 0 1 ${origin.x + 44 * Math.sin(t)} ${origin.y - 44 * Math.cos(t)}`;
});
</script>

<template>
  <svg viewBox="0 0 500 320" class="ray-svg" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="480" height="195" fill="#0b1a33" stroke="#1e3a5f" stroke-width="1.2" />
    <rect x="10" y="205" width="480" height="105" fill="#0f2a4a" stroke="#1e3a5f" stroke-width="1.2" />
    <line x1="10" y1="205" x2="490" y2="205" stroke="#93c5fd" stroke-width="1.6" />
    <line x1="250" y1="32" x2="250" y2="300" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="5 6" opacity=".55" />
    <CourseArrow :from="incStart" :to="origin" stroke="#60a5fa" :stroke-width="2.2" :head-size="9" />
    <CourseArrow :from="origin" :to="refEnd" stroke="#93c5fd" :stroke-width="2" :head-size="8" />
    <CourseArrow v-if="refrEnd" :from="origin" :to="refrEnd" stroke="#e2a846" :stroke-width="2.2" :head-size="9" />
    <line v-if="showCritical" :x1="origin.x" :y1="origin.y" :x2="critEnd.x" :y2="critEnd.y" stroke="#f87171" stroke-width="1.4" stroke-dasharray="6 5" />
    <path :d="arc1" fill="none" stroke="#60a5fa" stroke-width="1.3" opacity=".8" />
    <path :d="arc2" fill="none" stroke="#e2a846" stroke-width="1.3" opacity=".8" />
    <text :x="label1.x" :y="label1.y" fill="#60a5fa" font-family="KaTeX_Math" font-style="italic" font-size="18" text-anchor="middle">
      θ<tspan baseline-shift="sub" font-size="12">1</tspan>
    </text>
    <text v-if="theta2 !== null" :x="label2.x" :y="label2.y" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="18" text-anchor="middle">
      θ<tspan baseline-shift="sub" font-size="12">2</tspan>
    </text>
    <text v-if="showCritical" :x="critEnd.x + 8" :y="critEnd.y + 4" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="17">C</text>
    <text x="34" y="58" fill="#94a3b8" font-size="16">空气</text>
    <text x="34" y="292" fill="#93c5fd" font-size="16">介质</text>
    <text x="258" y="226" fill="#64748b" font-size="15">O</text>
    <text x="258" y="56" fill="#64748b" font-size="15">法线</text>
    <text x="54" y="232" fill="#60a5fa" font-size="16">入射光</text>
    <text x="356" y="286" fill="#93c5fd" font-size="16">反射光</text>
    <text v-if="refrEnd" x="366" y="158" fill="#e2a846" font-size="16">折射光</text>
  </svg>
</template>
