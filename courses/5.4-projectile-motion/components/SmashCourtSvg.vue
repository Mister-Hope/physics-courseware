<script setup lang="ts">
// 临界问题（羽毛球 / 乒乓球恰好过网又不出界）的题目图，用于 5.4「平抛运动的位移与轨迹」的例题。
// 干净状态只有题干元素：地面、球网（含白色网带）、击球点 O、已给的水平初速度 v0、
// O 到网的距离 L1、网到右侧边界的距离 L2；
// showAnalysis 打开后才画"恰好擦过网顶、正好落在边界上"的抛物线并标出擦网点。图上不标任何数值。
// 说明：下标单独用一个 <text> 跟着写（不用 <tspan>）——格式化工具会把带 <tspan> 的文字断成多行，
// 行间空白会在 SVG 里渲染成 "L 1" 这样的空隙。
const { showAnalysis = false } = defineProps<{ showAnalysis?: boolean }>();

/** 地面线高度 */
const GROUND_Y = 320;
/** 击球点（也是抛物线起点） */
const origin = { x: 120, y: 120 };
/** 球网位置与网顶高度 */
const NET_X = 430;
const NET_TOP = 210;
/** 右侧边界（不出界的极限落点） */
const BOUND_X = 560;
/** 两条水平尺寸线的高度，以及尺寸线两端小竖线的半长 */
const L1_Y = 280;
const L2_Y = 300;
const TICK = 8;
/** 过 O、擦网顶、落在边界的抛物线 y = A·x² + B·x + C（由这三点解出，不写死形状） */
const netTop = { x: NET_X, y: NET_TOP };
const bound = { x: BOUND_X, y: GROUND_Y };
const slopeNear = (netTop.y - origin.y) / (netTop.x - origin.x);
const coefA = ((bound.y - origin.y) / (bound.x - origin.x) - slopeNear) / (bound.x - netTop.x);
const coefB = slopeNear - coefA * (origin.x + netTop.x);
const coefC = origin.y - coefA * origin.x * origin.x - coefB * origin.x;
const SAMPLES = 28;
const flightPath = Array.from({ length: SAMPLES + 1 }, (_, i) => {
  const x = origin.x + ((bound.x - origin.x) * i) / SAMPLES;
  const y = coefA * x * x + coefB * x + coefC;
  return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
}).join(" ");
</script>

<template>
  <div class="smash-court">
    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="击球恰好过网又不出界的题目图">
      <SurfaceHatch :from="{ x: 60, y: GROUND_Y }" :to="{ x: 600, y: GROUND_Y }" side="below" :thickness="13" />
      <line :x1="BOUND_X" :y1="GROUND_Y" :x2="BOUND_X" :y2="GROUND_Y - 36" stroke="#cbd5e1" stroke-width="2" />
      <line :x1="NET_X" :y1="GROUND_Y" :x2="NET_X" :y2="NET_TOP - 4" stroke="rgba(148,163,184,0.8)" stroke-width="2" />
      <rect :x="NET_X - 9" :y="NET_TOP - 6" width="18" height="10" rx="2" fill="#f1f5f9" />
      <CourseArrow :from="origin" :to="{ x: 270, y: 120 }" stroke="#e2a846" :stroke-width="3" />
      <text x="188" y="104" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#e2a846">v</text>
      <text x="189" y="108" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#e2a846">0</text>
      <circle :cx="origin.x" :cy="origin.y" r="4.5" fill="#e2e8f0" />
      <text :x="origin.x - 12" :y="origin.y - 12" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#e2e8f0">O</text>
      <line :x1="origin.x" :y1="L1_Y" :x2="NET_X" :y2="L1_Y" stroke="#e2a846" stroke-width="1.6" />
      <line :x1="origin.x" :y1="L1_Y - TICK" :x2="origin.x" :y2="L1_Y + TICK" stroke="#e2a846" stroke-width="1.6" />
      <line :x1="NET_X" :y1="L1_Y - TICK" :x2="NET_X" :y2="L1_Y + TICK" stroke="#e2a846" stroke-width="1.6" />
      <text x="275" y="268" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#e2a846">L</text>
      <text x="276" y="272" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#e2a846">1</text>
      <line :x1="NET_X" :y1="L2_Y" :x2="BOUND_X" :y2="L2_Y" stroke="#e2a846" stroke-width="1.6" />
      <line :x1="NET_X" :y1="L2_Y - TICK" :x2="NET_X" :y2="L2_Y + TICK" stroke="#e2a846" stroke-width="1.6" />
      <line :x1="BOUND_X" :y1="L2_Y - TICK" :x2="BOUND_X" :y2="L2_Y + TICK" stroke="#e2a846" stroke-width="1.6" />
      <text x="495" y="288" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#e2a846">L</text>
      <text x="496" y="292" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#e2a846">2</text>
      <g v-if="showAnalysis">
        <path :d="flightPath" fill="none" stroke="#e2a846" stroke-width="2.6" />
        <circle :cx="netTop.x" :cy="netTop.y" r="8" fill="none" stroke="#f87171" stroke-width="2" />
        <circle :cx="netTop.x" :cy="netTop.y" r="3.4" fill="#f87171" />
        <circle :cx="bound.x" :cy="bound.y" r="5" fill="#f87171" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.smash-court {
  min-width: 0;
}

.smash-court svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
