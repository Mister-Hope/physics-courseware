<script setup lang="ts">
/** 理想轨迹与有空气阻力的实际轨迹对比： 两条轨迹从同一点、沿同一初速度方向出发，实际轨迹的弯曲更快、落点更近、末段更陡。 */
const { showReal = false } = defineProps<{ showReal?: boolean }>();

/** 抛出点（左上角）与水平方向下落的总高度 */
const START = { x: 80, y: 60 };
const FALL = 240;
/** 初速度方向：每水平 4 格、竖直 1 格 */
const SLOPE = 0.25;
/** 两条轨迹的水平射程：不计阻力 480，有阻力 350（落点更近） */
const IDEAL_SPAN = 480;
const REAL_SPAN = 350;
const SAMPLES = 28;
// 抛物线 y = y0 + SLOPE·dx + k·dx² 的弯曲系数，由"总高度 FALL 在射程末端落完"定出
const curveK = (span: number): number => (FALL - SLOPE * span) / (span * span);
const buildPath = (span: number): string =>
  Array.from({ length: SAMPLES + 1 }, (_, i) => {
    const dx = (span * i) / SAMPLES;
    const x = (START.x + dx).toFixed(1);
    const y = (START.y + SLOPE * dx + curveK(span) * dx * dx).toFixed(1);

    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");
const idealPath = buildPath(IDEAL_SPAN);
const realPath = buildPath(REAL_SPAN);
</script>

<template>
  <div class="air-drag-compare">
    <svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="不计空气阻力与有空气阻力时抛体轨迹的对比">
      <line x1="40" y1="300" x2="610" y2="300" stroke="rgba(148,163,184,0.5)" stroke-width="2" stroke-dasharray="10 8" />
      <CourseArrow :from="START" :to="{ x: 176, y: 84 }" stroke="#60a5fa" :stroke-width="3" />
      <text x="130" y="54" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#60a5fa">
        v
        <tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4">0</tspan>
      </text>
      <path :d="idealPath" fill="none" stroke="#e2a846" stroke-width="2.6" />
      <text x="492" y="198" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#e2a846">不计阻力</text>
      <g v-if="showReal">
        <path :d="realPath" fill="none" stroke="#f87171" stroke-width="2.6" />
        <text x="330" y="258" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#f87171">有阻力</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.air-drag-compare {
  min-width: 0;
}

.air-drag-compare svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
