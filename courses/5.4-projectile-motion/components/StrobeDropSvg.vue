<script setup lang="ts">
/** 频闪照片：平抛小球的 7 个闪光点（等时间间隔）。 水平间距相等、竖直间距按 1:3:5:7… 依次增大，是"水平匀速、竖直加速"的证据。 */
const COUNT = 7;
/** 第一个闪光点（释放点）在 viewBox 里的位置 */
const START = { x: 80, y: 60 };
/** 闪光间隔相同：x 随 n 线性增长，y 随 n² 增长 */
const dots = Array.from({ length: COUNT }, (_, index) => ({
  index,
  x: START.x + 46 * index,
  y: START.y + 5.5 * index * index,
}));
</script>

<template>
  <div class="strobe-drop">
    <svg viewBox="0 0 460 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="平抛运动的频闪照片：等时间间隔的闪光点">
      <line :x1="dots[0].x" :y1="dots[0].y" :x2="dots[COUNT - 1].x" :y2="dots[0].y" stroke="rgba(148,163,184,0.45)" stroke-width="1.6" stroke-dasharray="7 5" />
      <line
        :x1="dots[1].x"
        :y1="dots[1].y"
        :x2="dots[1].x"
        :y2="dots[COUNT - 1].y + 14"
        stroke="rgba(148,163,184,0.45)"
        stroke-width="1.6"
        stroke-dasharray="7 5"
      />
      <circle v-for="dot in dots" :key="dot.index" :cx="dot.x" :cy="dot.y" r="6" fill="#e2a846" />
      <text x="64" y="82" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2e8f0">O</text>
    </svg>
  </div>
</template>

<style scoped>
.strobe-drop {
  min-width: 0;
}

.strobe-drop svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
