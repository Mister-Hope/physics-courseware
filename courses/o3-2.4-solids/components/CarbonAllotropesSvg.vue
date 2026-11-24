<script setup lang="ts">
interface Hex {
  key: string;
  points: string;
}
interface Atom {
  key: string;
  x: number;
  y: number;
}
interface Bond {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const LAYER_YS = [80, 145, 210];
const WEAK_X = [120, 175, 230];
const GRAPHITE_SIZE = 17;

const buildGraphiteHexes = (): Hex[] => {
  const result: Hex[] = [];
  for (const [layerIndex, y] of LAYER_YS.entries()) {
    for (let col = 0; col < 5; col += 1) {
      const cx = 112 + col * GRAPHITE_SIZE * 1.5;
      const cy = y + (col % 2 === 0 ? 0 : GRAPHITE_SIZE * 0.866);
      const points: string[] = [];
      for (let k = 0; k < 6; k += 1) {
        const angle = (Math.PI / 3) * k;
        points.push(`${(cx + GRAPHITE_SIZE * Math.cos(angle)).toFixed(1)},${(cy + GRAPHITE_SIZE * Math.sin(angle)).toFixed(1)}`);
      }
      result.push({ key: `g${layerIndex}-${col}`, points: points.join(" ") });
    }
  }
  return result;
};
const graphiteHexes = buildGraphiteHexes();

const DIAMOND_ROWS = [
  { y: 88, xs: [480, 540, 600, 660] },
  { y: 150, xs: [510, 570, 630] },
  { y: 212, xs: [480, 540, 600, 660] },
];

const buildDiamondAtoms = (): Atom[] => {
  const result: Atom[] = [];
  for (const [rowIndex, row] of DIAMOND_ROWS.entries())
    for (const [colIndex, x] of row.xs.entries()) result.push({ key: `a${rowIndex}-${colIndex}`, x, y: row.y });
  return result;
};
const diamondAtoms = buildDiamondAtoms();

const buildDiamondBonds = (): Bond[] => {
  const result: Bond[] = [];
  const [top, mid, bottom] = DIAMOND_ROWS;
  for (const [colIndex, x] of top.xs.entries()) {
    if (colIndex < mid.xs.length) result.push({ key: `t${colIndex}`, x1: x, y1: top.y, x2: mid.xs[colIndex], y2: mid.y });

    if (colIndex > 0) result.push({ key: `t2-${colIndex}`, x1: x, y1: top.y, x2: mid.xs[colIndex - 1], y2: mid.y });
  }
  for (const [colIndex, x] of mid.xs.entries()) {
    if (colIndex < bottom.xs.length) result.push({ key: `b${colIndex}`, x1: x, y1: mid.y, x2: bottom.xs[colIndex], y2: bottom.y });

    if (colIndex > 0) result.push({ key: `b2-${colIndex}`, x1: x, y1: mid.y, x2: bottom.xs[colIndex - 1], y2: bottom.y });
  }
  result.push({ key: "b-last", x1: mid.xs[mid.xs.length - 1], y1: mid.y, x2: bottom.xs[bottom.xs.length - 1], y2: bottom.y });
  return result;
};
const diamondBonds = buildDiamondBonds();
</script>

<template>
  <svg viewBox="0 0 840 280" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <text x="50" y="40" font-size="19" font-weight="600" fill="var(--c-text)">石墨</text>
    <g>
      <template v-for="(x, xi) in WEAK_X" :key="`weak-x-${xi}`">
        <line
          v-for="(y, index) in LAYER_YS.slice(0, 2)"
          :key="`weak-${xi}-${index}`"
          :x1="x"
          :y1="y + 22"
          :x2="x"
          :y2="LAYER_YS[index + 1] - 22"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="4 5"
        />
      </template>
      <polygon v-for="hex in graphiteHexes" :key="hex.key" :points="hex.points" fill="none" stroke="var(--c-sky)" stroke-width="1.8" />
    </g>

    <text x="470" y="40" font-size="19" font-weight="600" fill="var(--c-text)">金刚石</text>
    <g>
      <line v-for="bond in diamondBonds" :key="bond.key" :x1="bond.x1" :y1="bond.y1" :x2="bond.x2" :y2="bond.y2" stroke="var(--c-accent)" stroke-width="2" />
      <circle v-for="atom in diamondAtoms" :key="atom.key" :cx="atom.x" :cy="atom.y" r="7" fill="var(--c-accent)" stroke="var(--c-bg)" stroke-width="1.4" />
    </g>

    <text x="50" y="262" font-size="15" fill="var(--c-text-dim)">层与层之间作用力弱</text>
    <text x="470" y="262" font-size="15" fill="var(--c-text-dim)">碳原子间作用力强</text>
  </svg>
</template>
