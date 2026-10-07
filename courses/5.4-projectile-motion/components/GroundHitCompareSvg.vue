<script setup lang="ts">
/** 检验图（一）：同一高度、初速度为 v0 与 2v0 的平抛落到水平面上。 两条轨迹从同一高度出发、落到同一条地面线上——下落高度相同 ⇒ 落地时间相同； 初速度 2 倍 ⇒ 水平距离 2 倍。两支初速度箭头一长一短、上下错开一点以便看清。 */
const GROUND_Y = 282;
/** 两个抛出点只做很小的上下错开，避免两支箭头完全重叠（图上仍表示"同一高度"） */
const O_SLOW = { x: 92, y: 104 };
const O_FAST = { x: 92, y: 118 };
const LAND_SLOW = { x: 250, y: GROUND_Y };
const LAND_FAST = { x: 408, y: GROUND_Y };

/**
 * 抛体轨迹在抛出点切线水平：用二次贝塞尔时控制点取水平中点，即得抛物线
 *
 * @param from 抛出点坐标
 * @param to 落点坐标
 * @returns 这条轨迹的 path 数据
 */
const parabola = (from: { x: number; y: number }, to: { x: number; y: number }): string =>
  `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${from.y} ${to.x} ${to.y}`;
</script>

<template>
  <div class="ground-hit">
    <svg viewBox="0 0 540 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="同一高度、初速度分别为 v0 与 2v0 的平抛落到水平面上">
      <SurfaceHatch :from="{ x: 40, y: GROUND_Y }" :to="{ x: 500, y: GROUND_Y }" side="below" />
      <line :x1="62" :y1="O_SLOW.y" :x2="62" :y2="GROUND_Y" stroke="rgba(148,163,184,0.6)" stroke-width="1.5" stroke-dasharray="6 6" />
      <line x1="52" y1="104" x2="72" y2="104" stroke="rgba(148,163,184,0.75)" stroke-width="1.5" />
      <line x1="52" y1="118" x2="72" y2="118" stroke="rgba(148,163,184,0.75)" stroke-width="1.5" />
      <line x1="52" y1="282" x2="72" y2="282" stroke="rgba(148,163,184,0.75)" stroke-width="1.5" />
      <text x="30" y="204" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#94a3b8">h</text>
      <path :d="parabola(O_SLOW, LAND_SLOW)" fill="none" stroke="#60a5fa" stroke-width="3" stroke-linecap="round" />
      <path :d="parabola(O_FAST, LAND_FAST)" fill="none" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
      <CourseArrow :from="O_SLOW" :to="{ x: O_SLOW.x + 76, y: O_SLOW.y }" stroke="#60a5fa" :stroke-width="3" />
      <CourseArrow :from="O_FAST" :to="{ x: O_FAST.x + 152, y: O_FAST.y }" stroke="#e2a846" :stroke-width="3" />
      <text :x="O_SLOW.x + 82" :y="O_SLOW.y - 10" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#93c5fd">v</text>
      <text :x="O_SLOW.x + 93" :y="O_SLOW.y - 6" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#93c5fd">0</text>
      <text :x="O_FAST.x + 158" :y="O_FAST.y + 20" font-family="KaTeX_Main" font-style="normal" font-size="16" fill="#e2a846">2</text>
      <text :x="O_FAST.x + 168" :y="O_FAST.y + 20" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2a846">v</text>
      <text :x="O_FAST.x + 181" :y="O_FAST.y + 24" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#e2a846">0</text>
      <circle :cx="LAND_SLOW.x" :cy="LAND_SLOW.y" r="5.5" fill="#60a5fa" />
      <circle :cx="LAND_FAST.x" :cy="LAND_FAST.y" r="5.5" fill="#e2a846" />
      <text x="240" y="308" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#93c5fd">P</text>
      <text x="249" y="312" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#93c5fd">1</text>
      <text x="398" y="308" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2a846">P</text>
      <text x="407" y="312" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#e2a846">2</text>
    </svg>
  </div>
</template>

<style scoped>
.ground-hit {
  min-width: 0;
}

.ground-hit svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
