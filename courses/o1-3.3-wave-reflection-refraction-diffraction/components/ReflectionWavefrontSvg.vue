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

const incidentWaves = computed(() => makeWaves({ x: 100, y: 50 }, { x: 230, y: 200 }, 4, 30));
const reflectedWaves = computed(() => makeWaves({ x: 230, y: 200 }, { x: 360, y: 50 }, 4, 30));
</script>

<template>
  <svg viewBox="0 0 460 240" width="460" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="refl-above">
        <rect x="0" y="0" width="460" height="198" />
      </clipPath>
    </defs>
    <SurfaceHatch :from="{ x: 20, y: 200 }" :to="{ x: 440, y: 200 }" side="below" />
    <line x1="20" y1="200" x2="440" y2="200" stroke="var(--c-neutral-300)" stroke-width="2" />
    <line x1="230" y1="200" x2="230" y2="42" stroke="var(--c-neutral-300)" stroke-width="1.2" stroke-dasharray="6 5" />
    <g clip-path="url(#refl-above)">
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
        v-for="(w, i) in reflectedWaves"
        :key="`rw-${i}`"
        :x1="w.x1"
        :y1="w.y1"
        :x2="w.x2"
        :y2="w.y2"
        stroke="var(--c-accent)"
        stroke-width="1.4"
        opacity="0.55"
      />
    </g>
    <CourseArrow :from="{ x: 100, y: 50 }" :to="{ x: 230, y: 200 }" stroke="var(--c-accent-2)" :stroke-width="1.8" />
    <CourseArrow :from="{ x: 230, y: 200 }" :to="{ x: 360, y: 50 }" stroke="var(--c-accent)" :stroke-width="1.8" />
    <circle cx="230" cy="200" r="3.2" fill="var(--c-text)" />
    <path d="M 230 145 A 55 55 0 0 0 194 158" fill="none" stroke="var(--c-neutral-300)" stroke-width="1" />
    <path d="M 230 145 A 55 55 0 0 1 266 158" fill="none" stroke="var(--c-neutral-300)" stroke-width="1" />
    <text x="204" y="170" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="15">i</text>
    <text x="250" y="170" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="15">r</text>
    <text x="96" y="38" fill="var(--c-accent-2)" font-size="12">入射波</text>
    <text x="338" y="38" fill="var(--c-accent)" font-size="12">反射波</text>
    <text x="238" y="62" fill="var(--c-text-mute)" font-size="12">法线</text>
  </svg>
</template>
