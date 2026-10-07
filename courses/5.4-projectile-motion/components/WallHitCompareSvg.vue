<script setup lang="ts">
/** 检验图（二）：同一抛出点、初速度为 v0 与 2v0 的平抛打到同一堵竖直墙面上。 水平距离 L 相同（被"锁死"）⇒ 到墙时间由初速度决定：v0 越大越早到墙、下落越少、撞得越高。 所以撞墙时的竖直分速度反而更小（2 倍速度 ⇒ 下落高度只剩 1/4）。 */
const GROUND_Y = 285;
const WALL_X = 440;
const O_SLOW = { x: 80, y: 110 };
const O_FAST = { x: 80, y: 124 };
const HIT_SLOW = { x: WALL_X, y: 250 };
const HIT_FAST = { x: WALL_X, y: 159 };

const parabola = (from: { x: number; y: number }, to: { x: number; y: number }): string =>
  `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${from.y} ${to.x} ${to.y}`;
</script>

<template>
  <div class="wall-hit">
    <svg viewBox="0 0 540 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="初速度分别为 v0 与 2v0 的平抛打到同一堵竖直墙面上">
      <SurfaceHatch :from="{ x: 40, y: GROUND_Y }" :to="{ x: WALL_X, y: GROUND_Y }" side="below" />
      <SurfaceHatch :from="{ x: WALL_X, y: 48 }" :to="{ x: WALL_X, y: GROUND_Y }" side="right" />
      <path :d="parabola(O_SLOW, HIT_SLOW)" fill="none" stroke="#60a5fa" stroke-width="3" stroke-linecap="round" />
      <path :d="parabola(O_FAST, HIT_FAST)" fill="none" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
      <CourseArrow :from="O_SLOW" :to="{ x: O_SLOW.x + 68, y: O_SLOW.y }" stroke="#60a5fa" :stroke-width="3" />
      <CourseArrow :from="O_FAST" :to="{ x: O_FAST.x + 136, y: O_FAST.y }" stroke="#e2a846" :stroke-width="3" />
      <text :x="O_SLOW.x + 74" :y="O_SLOW.y - 10" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#93c5fd">v</text>
      <text :x="O_SLOW.x + 85" :y="O_SLOW.y - 6" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#93c5fd">0</text>
      <text :x="O_FAST.x + 142" :y="O_FAST.y + 20" font-family="KaTeX_Main" font-style="normal" font-size="16" fill="#e2a846">2</text>
      <text :x="O_FAST.x + 152" :y="O_FAST.y + 20" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2a846">v</text>
      <text :x="O_FAST.x + 165" :y="O_FAST.y + 24" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#e2a846">0</text>
      <circle :cx="HIT_SLOW.x" :cy="HIT_SLOW.y" r="5.5" fill="#60a5fa" />
      <circle :cx="HIT_FAST.x" :cy="HIT_FAST.y" r="5.5" fill="#e2a846" />
      <line x1="80" y1="305" x2="440" y2="305" stroke="rgba(148,163,184,0.7)" stroke-width="1.5" />
      <line x1="80" y1="297" x2="80" y2="313" stroke="rgba(148,163,184,0.7)" stroke-width="1.5" />
      <line x1="440" y1="297" x2="440" y2="313" stroke="rgba(148,163,184,0.7)" stroke-width="1.5" />
      <text x="252" y="332" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#cbd5e1">L</text>
    </svg>
  </div>
</template>

<style scoped>
.wall-hit {
  min-width: 0;
}

.wall-hit svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
