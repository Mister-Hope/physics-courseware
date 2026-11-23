<!-- 2.1 竖直弹簧振子：上端固定、下端悬挂钢球，标注平衡位置与形变方向 -->
<script setup lang="ts">
import { computed } from "vue";

const { displacement = 0, showForces = false } = defineProps<{
  displacement?: number;
  showForces?: boolean;
}>();

const EQ_Y = 152;
const TRAVEL = 42;
const ballY = computed(() => EQ_Y + displacement * TRAVEL);
const springPts = computed(() => {
  const top = 40;
  const bottom = ballY.value - 22;
  const coils = 7;
  const step = (bottom - top) / coils;
  const amp = 16;
  const pts: string[] = [`150,${top}`];
  for (let i = 0; i < coils; i += 1) {
    const y = top + step * (i + 0.5);
    pts.push(`${150 + (i % 2 === 0 ? amp : -amp)},${y}`);
  }
  pts.push(`150,${bottom}`);
  return pts.join(" ");
});
</script>

<template>
  <svg viewBox="0 0 300 250" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="ceil-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="var(--c-neutral-500)" stroke-width="1.6" />
      </pattern>
    </defs>
    <rect x="60" y="20" width="180" height="10" fill="url(#ceil-hatch)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <line x1="60" y1="30" x2="240" y2="30" stroke="var(--c-text-dim)" stroke-width="2" />
    <polyline :points="springPts" fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    <circle :cx="150" :cy="ballY" r="21" fill="rgba(226,168,70,.16)" stroke="var(--c-accent)" stroke-width="2.2" />
    <text :x="150" :y="ballY + 7" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">m</text>
    <line x1="86" :y1="EQ_Y" x2="228" :y2="EQ_Y" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />
    <text x="234" :y="EQ_Y + 5" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-dim)">平衡位置</text>
    <g v-if="showForces">
      <line :x1="150" :y1="EQ_Y" x2="150" :y2="ballY" stroke="var(--c-velocity)" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.7" />
      <line x1="176" :y1="ballY" x2="176" :y2="EQ_Y" stroke="var(--c-danger)" stroke-width="2.6" marker-end="url(#arrow-up)" />
      <text x="184" :y="(ballY + EQ_Y) / 2 + 4" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-danger)">F</text>
    </g>
    <defs>
      <marker id="arrow-up" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-danger)" />
      </marker>
    </defs>
  </svg>
</template>
