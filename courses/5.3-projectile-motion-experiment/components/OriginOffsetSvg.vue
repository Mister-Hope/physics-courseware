<script setup lang="ts">
/** 第 14 页：坐标原点的两种画法。 小球有半径：球心比斜槽末端高出一个 r —— 原点是球心（右侧），不是槽口那条线（左侧）。 step 1 出左侧的错误画法（红叉），step 2 出右侧的正确画法（绿勾）。 */
const { step = 0 } = defineProps<{ step?: number }>();
/** 两侧面板的位移 */
const GROOVE_Y = 92;
const R = 10;
const LEFT = 0;
const RIGHT = 256;
const path = (offset: number): string => {
  const points = Array.from({ length: 13 }, (_, i) => {
    const t = i / 12;

    return { x: 122 + offset + 112 * t, y: GROOVE_Y + 26 * t * t };
  });

  return points.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
};
</script>

<template>
  <svg viewBox="0 0 520 300" width="100%" style="max-width: 540px" xmlns="http://www.w3.org/2000/svg">
    <line x1="260" y1="24" x2="260" y2="276" stroke="color-mix(in srgb, var(--c-text-dim) 20%, transparent)" stroke-width="1.6" stroke-dasharray="7 6" />
    <g v-for="offset in [LEFT, RIGHT]" :key="`panel-${offset}`">
      <path :d="`M ${34 + offset} 92 L ${104 + offset} 92`" fill="none" stroke="var(--c-text-dim)" stroke-width="10" stroke-linecap="round" />
      <path :d="path(offset)" fill="none" stroke="color-mix(in srgb, var(--c-velocity) 50%, transparent)" stroke-width="2" stroke-dasharray="7 6" />
      <circle
        v-for="i in 3"
        :key="`dot-${offset}-${i}`"
        :cx="122 + offset + 112 * (i / 3.6)"
        :cy="GROOVE_Y + 26 * (i / 3.6) ** 2"
        r="5"
        fill="var(--c-velocity)"
      />
      <circle :cx="86 + offset" :cy="GROOVE_Y - R" :r="R" fill="var(--c-velocity)" stroke="var(--c-velocity-light)" stroke-width="2" />
    </g>
    <line :x1="110" :y1="GROOVE_Y" :x2="238" :y2="GROOVE_Y" stroke="var(--c-force)" stroke-width="2" stroke-dasharray="8 5" />
    <line :x1="366" :y1="GROOVE_Y - R" :x2="494" :y2="GROOVE_Y - R" stroke="var(--c-physics)" stroke-width="2" stroke-dasharray="8 5" />
    <line :x1="352" :y1="GROOVE_Y - R" :x2="352" :y2="GROOVE_Y" stroke="var(--c-accent)" stroke-width="2" />
    <line :x1="345" :y1="GROOVE_Y - R" :x2="359" :y2="GROOVE_Y - R" stroke="var(--c-accent)" stroke-width="2" />
    <line :x1="345" :y1="GROOVE_Y" :x2="359" :y2="GROOVE_Y" stroke="var(--c-accent)" stroke-width="2" />
    <text x="364" y="88" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-accent)">r</text>
    <g v-if="step >= 1">
      <line x1="128" y1="72" x2="148" y2="92" stroke="var(--c-force)" stroke-width="3.4" stroke-linecap="round" />
      <line x1="148" y1="72" x2="128" y2="92" stroke="var(--c-force)" stroke-width="3.4" stroke-linecap="round" />
      <text x="158" y="86" font-size="18" fill="var(--c-force)">原点画在槽口高度</text>
    </g>
    <g v-if="step >= 2">
      <path d="M 336 76 L 346 88 L 366 64" fill="none" stroke="var(--c-physics)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" />
      <text x="374" y="60" font-size="18" fill="var(--c-physics)">原点画在球心</text>
    </g>
  </svg>
</template>
