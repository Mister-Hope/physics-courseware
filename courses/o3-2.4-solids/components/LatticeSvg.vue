<script setup lang="ts">
import { computed } from "vue";

type Mode = "nacl" | "amorphous" | "graphene" | "grains";
interface Ion {
  key: string;
  x: number;
  y: number;
  plus: boolean;
}
interface Bond {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
interface Hex {
  key: string;
  points: string;
}
interface Grain {
  key: string;
  points: string;
  color: string;
}
interface Point {
  key: string;
  x: number;
  y: number;
}

const { mode = "nacl", showCell = false } = defineProps<{
  mode?: Mode;
  showCell?: boolean;
}>();

const SPACING = 46;
const COLS = 13;
const ROWS = 6;
const X0 = 100;
const Y0 = 40;

const buildIons = (): Ion[] => {
  const result: Ion[] = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      result.push({
        key: `${row}-${col}`,
        x: X0 + col * SPACING,
        y: Y0 + row * SPACING,
        plus: (row + col) % 2 === 0,
      });
    }
  }
  return result;
};

const buildBonds = (): Bond[] => {
  const result: Bond[] = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      if (col < COLS - 1) {
        result.push({
          key: `h${row}-${col}`,
          x1: X0 + col * SPACING,
          y1: Y0 + row * SPACING,
          x2: X0 + (col + 1) * SPACING,
          y2: Y0 + row * SPACING,
        });
      }
      if (row < ROWS - 1) {
        result.push({
          key: `v${row}-${col}`,
          x1: X0 + col * SPACING,
          y1: Y0 + row * SPACING,
          x2: X0 + col * SPACING,
          y2: Y0 + (row + 1) * SPACING,
        });
      }
    }
  }
  return result;
};

const ions = computed(buildIons);
const bonds = computed(buildBonds);

const buildAmorphous = (): Point[] => {
  let seed = 20240524;
  const result: Point[] = [];
  for (let i = 0; i < 110; i += 1) {
    seed = (seed * 48271) % 2147483647;
    const x = 70 + (seed / 2147483647) * 700;
    seed = (seed * 48271) % 2147483647;
    const y = 40 + (seed / 2147483647) * 200;
    result.push({ key: `p${i}`, x, y });
  }
  return result;
};
const amorphousPoints = computed(buildAmorphous);

const buildHexagons = (): Hex[] => {
  const size = 26;
  const stepX = size * 1.5;
  const stepY = size * Math.sqrt(3);
  const result: Hex[] = [];
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 14; col += 1) {
      const cx = 100 + col * stepX;
      const cy = 70 + row * stepY + (col % 2 === 0 ? 0 : stepY / 2);
      const points: string[] = [];
      for (let k = 0; k < 6; k += 1) {
        const angle = (Math.PI / 3) * k;
        points.push(`${(cx + size * Math.cos(angle)).toFixed(1)},${(cy + size * Math.sin(angle)).toFixed(1)}`);
      }
      result.push({ key: `${row}-${col}`, points: points.join(" ") });
    }
  }
  return result;
};
const hexagons = computed(buildHexagons);

const buildGrains = (): Grain[] => [
  { key: "g1", points: "54,64 150,38 238,76 214,170 112,192 44,132", color: "var(--c-sky)" },
  { key: "g2", points: "238,76 330,52 404,96 378,184 286,196 214,170", color: "var(--c-accent)" },
  { key: "g3", points: "404,96 492,60 566,104 538,190 448,208 378,184", color: "var(--c-physics)" },
  { key: "g4", points: "566,104 654,72 726,118 700,204 610,214 538,190", color: "var(--c-sky)" },
  { key: "g5", points: "112,192 214,170 286,196 262,254 156,262 58,236", color: "var(--c-physics)" },
  { key: "g6", points: "286,196 378,184 448,208 424,264 318,268 262,254", color: "var(--c-accent)" },
  { key: "g7", points: "448,208 538,190 610,214 586,264 480,270 424,264", color: "var(--c-sky)" },
  { key: "g8", points: "610,214 700,204 744,236 724,268 586,264", color: "var(--c-physics)" },
];
const grains = buildGrains();
</script>

<template>
  <svg :viewBox="showCell ? '0 0 320 200' : '0 0 840 280'" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g v-if="mode === 'nacl'">
      <line v-for="bond in bonds" :key="bond.key" :x1="bond.x1" :y1="bond.y1" :x2="bond.x2" :y2="bond.y2" stroke="var(--c-line)" stroke-width="1.2" />
      <circle
        v-for="ion in ions"
        :key="ion.key"
        :cx="ion.x"
        :cy="ion.y"
        r="8"
        :fill="ion.plus ? 'var(--c-force)' : 'var(--c-velocity)'"
        stroke="var(--c-bg)"
        stroke-width="1.5"
      />
      <g v-if="showCell">
        <rect x="92" y="32" width="62" height="62" rx="3" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="6 4" />
        <line x1="100" y1="40" x2="146" y2="86" stroke="var(--c-accent)" stroke-width="2" />
        <text x="123" y="26" text-anchor="middle" font-size="22" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">a/2</text>
        <text x="152" y="72" font-size="22" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">d</text>
      </g>
      <g v-if="!showCell">
        <circle cx="742" cy="58" r="7" fill="var(--c-force)" stroke="var(--c-bg)" stroke-width="1.5" />
        <text x="758" y="65" font-size="19" font-family="KaTeX_Main" fill="var(--c-text)">Na⁺</text>
        <circle cx="742" cy="92" r="7" fill="var(--c-velocity)" stroke="var(--c-bg)" stroke-width="1.5" />
        <text x="758" y="99" font-size="19" font-family="KaTeX_Main" fill="var(--c-text)">Cl⁻</text>
      </g>
    </g>

    <g v-else-if="mode === 'amorphous'">
      <circle v-for="point in amorphousPoints" :key="point.key" :cx="point.x" :cy="point.y" r="5" fill="var(--c-text-dim)" opacity="0.75" />
    </g>

    <g v-else-if="mode === 'graphene'">
      <polygon v-for="hex in hexagons" :key="hex.key" :points="hex.points" fill="none" stroke="var(--c-accent-2)" stroke-width="1.8" />
    </g>

    <g v-else>
      <polygon v-for="grain in grains" :key="grain.key" :points="grain.points" fill="none" :stroke="grain.color" stroke-width="2.4" stroke-linejoin="round" />
    </g>
  </svg>
</template>
