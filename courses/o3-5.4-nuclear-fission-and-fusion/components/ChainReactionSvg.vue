<script setup lang="ts">
interface TreeNode {
  x: number;
  y: number;
  gen: number;
}

interface TreeEdge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  gen: number;
}

const { step = 0 } = defineProps<{ step?: number }>();

const nodes: TreeNode[] = [
  { x: 450, y: 58, gen: 1 },
  { x: 330, y: 128, gen: 2 },
  { x: 570, y: 128, gen: 2 },
  { x: 270, y: 198, gen: 3 },
  { x: 390, y: 198, gen: 3 },
  { x: 510, y: 198, gen: 3 },
  { x: 630, y: 198, gen: 3 },
  { x: 240, y: 268, gen: 4 },
  { x: 300, y: 268, gen: 4 },
  { x: 360, y: 268, gen: 4 },
  { x: 420, y: 268, gen: 4 },
  { x: 480, y: 268, gen: 4 },
  { x: 540, y: 268, gen: 4 },
  { x: 600, y: 268, gen: 4 },
  { x: 660, y: 268, gen: 4 },
];

const edges: TreeEdge[] = [
  { x1: 450, y1: 58, x2: 330, y2: 128, gen: 2 },
  { x1: 450, y1: 58, x2: 570, y2: 128, gen: 2 },
  { x1: 330, y1: 128, x2: 270, y2: 198, gen: 3 },
  { x1: 330, y1: 128, x2: 390, y2: 198, gen: 3 },
  { x1: 570, y1: 128, x2: 510, y2: 198, gen: 3 },
  { x1: 570, y1: 128, x2: 630, y2: 198, gen: 3 },
  { x1: 270, y1: 198, x2: 240, y2: 268, gen: 4 },
  { x1: 270, y1: 198, x2: 300, y2: 268, gen: 4 },
  { x1: 390, y1: 198, x2: 360, y2: 268, gen: 4 },
  { x1: 390, y1: 198, x2: 420, y2: 268, gen: 4 },
  { x1: 510, y1: 198, x2: 480, y2: 268, gen: 4 },
  { x1: 510, y1: 198, x2: 540, y2: 268, gen: 4 },
  { x1: 630, y1: 198, x2: 600, y2: 268, gen: 4 },
  { x1: 630, y1: 198, x2: 660, y2: 268, gen: 4 },
];

const reveal = (gen: number): { visibility: "visible" | "hidden" } => ({
  visibility: step >= gen - 1 ? "visible" : "hidden",
});

const midX = (edge: TreeEdge): number => (edge.x1 + edge.x2) / 2;

const midY = (edge: TreeEdge): number => (edge.y1 + edge.y2) / 2;
</script>

<template>
  <!-- 第 6 页：链式反应示意图。一个中子引发一次裂变，每次裂变放出 2 个中子（示意），逐代增加 -->
  <svg viewBox="0 0 840 300" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="链式反应逐代增加示意图">
    <text x="20" y="62" font-size="12" fill="var(--c-text-dim)">第 1 代</text>
    <text x="20" y="132" font-size="12" fill="var(--c-text-dim)">第 2 代</text>
    <text x="20" y="202" font-size="12" fill="var(--c-text-dim)">第 3 代</text>
    <text x="20" y="272" font-size="12" fill="var(--c-text-dim)">第 4 代</text>
    <text x="720" y="62" font-size="12" fill="var(--c-text-dim)">1 次裂变</text>
    <text x="720" y="132" font-size="12" fill="var(--c-text-dim)">2 次</text>
    <text x="720" y="202" font-size="12" fill="var(--c-text-dim)">4 次</text>
    <text x="720" y="272" font-size="12" fill="var(--c-text-dim)">8 次</text>
    <circle cx="450" cy="22" r="4" fill="var(--c-velocity)" />
    <CourseArrow :from="{ x: 450, y: 28 }" :to="{ x: 450, y: 45 }" stroke="var(--c-velocity)" stroke-width="2" />
    <text x="462" y="27" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-velocity)">n</text>
    <g v-for="edge in edges" :key="`edge-${edge.gen}-${edge.x2}`">
      <line :x1="edge.x1" :y1="edge.y1" :x2="edge.x2" :y2="edge.y2" stroke="var(--c-line)" stroke-width="1.3" :style="reveal(edge.gen)" />
      <circle :cx="midX(edge)" :cy="midY(edge)" r="2.2" fill="var(--c-velocity)" :style="reveal(edge.gen)" />
    </g>
    <g v-for="node in nodes" :key="`node-${node.x}-${node.y}`">
      <circle
        :cx="node.x"
        :cy="node.y"
        :r="node.gen === 1 ? 10 : 8.5"
        fill="var(--c-accent-soft)"
        stroke="var(--c-accent)"
        stroke-width="1.6"
        :style="reveal(node.gen)"
      />
      <circle :cx="node.x" :cy="node.y" r="2.6" fill="var(--c-accent)" :style="reveal(node.gen)" />
    </g>
  </svg>
</template>
