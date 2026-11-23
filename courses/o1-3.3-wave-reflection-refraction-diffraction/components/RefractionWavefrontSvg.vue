<script setup lang="ts">
import { computed } from "vue";

interface Wavefront {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const makeWaves = (from: { x: number; y: number }, to: { x: number; y: number }, count: number, half: number): Wavefront[] => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  return Array.from({ length: count }, (_, i) => {
    const t = (i + 1) / (count + 1);
    const cx = from.x + dx * t;
    const cy = from.y + dy * t;
    return {
      x1: cx - px * half,
      y1: cy - py * half,
      x2: cx + px * half,
      y2: cy + py * half,
    };
  });
};

const incidentWaves = computed(() => makeWaves({ x: 100, y: 30 }, { x: 260, y: 145 }, 4, 30));
const refractedWaves = computed(() => makeWaves({ x: 260, y: 145 }, { x: 370, y: 255 }, 4, 22));
</script>

<template>
  <svg viewBox="0 0 520 270" width="520" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="145" x2="500" y2="145" stroke="var(--c-neutral-300)" stroke-width="1.6" />
    <line x1="260" y1="24" x2="260" y2="262" stroke="var(--c-neutral-300)" stroke-width="1.2" stroke-dasharray="6 5" />
    <text x="28" y="34" fill="var(--c-text-mute)" font-size="12">深水区</text>
    <text x="426" y="258" fill="var(--c-text-mute)" font-size="12">浅水区</text>
    <line
      v-for="(w, i) in incidentWaves"
      :key="`iw-${i}`"
      :x1="w.x1"
      :y1="w.y1"
      :x2="w.x2"
      :y2="w.y2"
      stroke="var(--c-accent-2)"
      stroke-width="1.4"
      opacity="0.55"
    />
    <line
      v-for="(w, i) in refractedWaves"
      :key="`rw-${i}`"
      :x1="w.x1"
      :y1="w.y1"
      :x2="w.x2"
      :y2="w.y2"
      stroke="var(--c-accent)"
      stroke-width="1.4"
      opacity="0.55"
    />
    <CourseArrow :from="{ x: 100, y: 30 }" :to="{ x: 260, y: 145 }" stroke="var(--c-accent-2)" :stroke-width="1.8" />
    <CourseArrow :from="{ x: 260, y: 145 }" :to="{ x: 370, y: 255 }" stroke="var(--c-accent)" :stroke-width="1.8" />
    <circle cx="260" cy="145" r="3.2" fill="var(--c-text)" />
    <path d="M 260 90 A 55 55 0 0 0 215 113" fill="none" stroke="var(--c-neutral-300)" stroke-width="1" />
    <path d="M 260 200 A 55 55 0 0 1 299 184" fill="none" stroke="var(--c-neutral-300)" stroke-width="1" />
    <text x="224" y="106" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="15">θ<tspan font-size="10" dy="4">1</tspan></text>
    <text x="280" y="202" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="15">θ<tspan font-size="10" dy="4">2</tspan></text>
    <text x="100" y="22" fill="var(--c-accent-2)" font-size="12">入射波</text>
    <text x="326" y="262" fill="var(--c-accent)" font-size="12">折射波</text>
    <text x="46" y="66" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic" font-size="15">v<tspan font-size="10" dy="4">1</tspan></text>
    <text x="70" y="66" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic" font-size="15">λ<tspan font-size="10" dy="4">1</tspan></text>
    <text x="426" y="210" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="15">v<tspan font-size="10" dy="4">2</tspan></text>
    <text x="450" y="210" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="15">λ<tspan font-size="10" dy="4">2</tspan></text>
  </svg>
</template>
