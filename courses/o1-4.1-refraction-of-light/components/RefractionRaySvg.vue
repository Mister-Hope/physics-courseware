<!-- 4.1 光的折射：空气—介质界面的入射光线、折射光线、法线与两个角 -->
<template>
  <svg viewBox="0 0 460 300" width="460" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ray-medium" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#60a5fa" stop-opacity="0.16" />
        <stop offset="1" stop-color="#3b82f6" stop-opacity="0.06" />
      </linearGradient>
    </defs>
    <rect x="0" y="150" width="460" height="150" fill="url(#ray-medium)" />
    <line x1="0" y1="150" x2="460" y2="150" stroke="var(--c-neutral-300)" stroke-width="1.5" opacity="0.65" />
    <line x1="230" y1="18" x2="230" y2="282" stroke="var(--c-text-mute)" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.8" />
    <text x="238" y="32" fill="var(--c-text-mute)" font-size="11">法线</text>
    <text x="20" y="30" fill="var(--c-text-dim)" font-size="12">空气</text>
    <text x="20" y="172" fill="var(--c-text-dim)" font-size="12">{{ mediumLabel }}</text>
    <path :d="arcIncident" fill="none" stroke="var(--c-accent)" stroke-width="1.4" />
    <g v-if="showRefracted">
      <path :d="arcRefracted" fill="none" stroke="var(--c-accent-2)" stroke-width="1.4" />
      <CourseArrow :from="{ x: 230, y: 150 }" :to="refractedEnd" stroke="var(--c-accent-2)" :stroke-width="2" />
    </g>
    <CourseArrow :from="incidentStart" :to="{ x: 230, y: 150 }" stroke="var(--c-accent)" :stroke-width="2" />
    <circle cx="230" cy="150" r="3.4" fill="var(--c-text)" />
    <text x="230" y="166" fill="var(--c-text)" font-size="11" text-anchor="middle">O</text>
    <text :x="incidentLabel.x" :y="incidentLabel.y" fill="var(--c-accent)" font-size="12" text-anchor="end">{{ incidentLabelText }}</text>
    <text v-if="showRefracted" :x="refractedLabel.x" :y="refractedLabel.y" fill="var(--c-accent-2)" font-size="12">{{ refractedLabelText }}</text>
    <text :x="theta1Label.x" :y="theta1Label.y" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="15" text-anchor="middle">
      θ₁
    </text>
    <text
      v-if="showRefracted"
      :x="theta2Label.x"
      :y="theta2Label.y"
      fill="var(--c-accent-2)"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="15"
      text-anchor="middle"
    >
      θ₂
    </text>
    <line x1="230" y1="150" x2="230" y2="190" stroke="var(--c-text)" stroke-width="2" opacity="0.7" />
    <line x1="230" y1="150" x2="230" y2="110" stroke="var(--c-text)" stroke-width="2" opacity="0.7" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Direction = "air-to-water" | "water-to-air";

const {
  direction = "air-to-water",
  theta1 = 50,
  n1 = 1,
  n2 = 1.33,
  mediumLabel = "水",
  showRefracted = true,
} = defineProps<{
  direction?: Direction;
  theta1?: number;
  n1?: number;
  n2?: number;
  mediumLabel?: string;
  showRefracted?: boolean;
}>();

const toRad = (deg: number): number => (deg * Math.PI) / 180;
const toDeg = (rad: number): number => (rad * 180) / Math.PI;

const theta2 = computed(() => {
  const s = (n1 * Math.sin(toRad(theta1))) / n2;
  return toDeg(Math.asin(Math.min(1, Math.max(-1, s))));
});

const incidentStart = computed(() => {
  const rad = toRad(theta1);
  return {
    x: 230 - Math.sin(rad) * 132,
    y: direction === "air-to-water" ? 150 - Math.cos(rad) * 132 : 150 + Math.cos(rad) * 132,
  };
});

const refractedEnd = computed(() => {
  const rad = toRad(theta2.value);
  return {
    x: 230 + Math.sin(rad) * 132,
    y: direction === "air-to-water" ? 150 + Math.cos(rad) * 132 : 150 - Math.cos(rad) * 132,
  };
});

const arcIncident = computed(() => {
  const r = 42;
  const rad = toRad(theta1);
  const from = direction === "air-to-water" ? { x: 230, y: 150 - r } : { x: 230, y: 150 + r };
  const to = {
    x: 230 - Math.sin(rad) * r,
    y: direction === "air-to-water" ? 150 - Math.cos(rad) * r : 150 + Math.cos(rad) * r,
  };
  const sweep = direction === "air-to-water" ? 0 : 1;
  return `M ${from.x} ${from.y} A ${r} ${r} 0 0 ${sweep} ${to.x} ${to.y}`;
});

const arcRefracted = computed(() => {
  const r = 48;
  const rad = toRad(theta2.value);
  const from = direction === "air-to-water" ? { x: 230, y: 150 + r } : { x: 230, y: 150 - r };
  const to = {
    x: 230 + Math.sin(rad) * r,
    y: direction === "air-to-water" ? 150 + Math.cos(rad) * r : 150 - Math.cos(rad) * r,
  };
  const sweep = direction === "air-to-water" ? 1 : 0;
  return `M ${from.x} ${from.y} A ${r} ${r} 0 0 ${sweep} ${to.x} ${to.y}`;
});

const incidentLabel = computed(() => {
  const p = incidentStart.value;
  return { x: p.x - 4, y: p.y - 6 };
});

const refractedLabel = computed(() => {
  const p = refractedEnd.value;
  return { x: p.x + 8, y: p.y + (direction === "air-to-water" ? 14 : -6) };
});

const incidentLabelText = computed(() => "入射光线");
const refractedLabelText = computed(() => "折射光线");

const theta1Label = computed(() => {
  const r = 62;
  const rad = toRad(theta1);
  return {
    x: 230 - Math.sin(rad) * r - 6,
    y: direction === "air-to-water" ? 150 - Math.cos(rad) * r + 4 : 150 + Math.cos(rad) * r + 4,
  };
});

const theta2Label = computed(() => {
  const r = 68;
  const rad = toRad(Math.max(theta2.value, 6));
  return {
    x: 230 + Math.sin(rad) * r + 6,
    y: direction === "air-to-water" ? 150 + Math.cos(rad) * r + 4 : 150 - Math.cos(rad) * r + 4,
  };
});
</script>
