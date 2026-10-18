<script setup lang="ts">
const ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

function makeRays(positive: boolean) {
  return ANGLES.map((deg) => {
    const a = (deg * Math.PI) / 180;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const far = positive ? 116 : 86;
    const near = positive ? 86 : 116;
    const mid = (far + near) / 2;
    return {
      x1: 70 + near * cos,
      y1: 70 + near * sin,
      x2: 70 + mid * cos,
      y2: 70 + mid * sin,
      tx: 70 + far * cos,
      ty: 70 + far * sin,
      cx: 70 + (far + 13) * cos,
      cy: 70 + (far + 13) * sin,
    };
  });
}

const plusRays = makeRays(true);
const minusRays = makeRays(false);
</script>

<template>
  <!-- 第 9 页：正、负点电荷的电场线——自电荷出发指向无穷远 / 自无穷远汇入电荷 -->
  <svg viewBox="0 0 320 150" class="w-full h-full">
    <defs>
      <marker id="pcl-plus" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-field)" />
      </marker>
      <marker id="pcl-minus" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-field)" />
      </marker>
    </defs>
    <line
      v-for="(r, i) in plusRays"
      :key="`p${i}`"
      :x1="r.x1"
      :y1="r.y1"
      :x2="r.x2"
      :y2="r.y2"
      stroke="var(--c-field)"
      stroke-opacity="0.75"
      stroke-width="2"
      :marker-end="`url(#pcl-plus)`"
    />
    <circle cx="70" cy="70" r="16" fill="var(--c-danger)" fill-opacity="0.9" />
    <text x="70" y="70" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="17" fill="#fff">+</text>
    <line
      v-for="(r, i) in minusRays"
      :key="`m${i}`"
      :x1="r.x1"
      :y1="r.y1"
      :x2="r.x2"
      :y2="r.y2"
      stroke="var(--c-field)"
      stroke-opacity="0.75"
      stroke-width="2"
      :marker-end="`url(#pcl-minus)`"
    />
    <circle cx="250" cy="70" r="16" fill="var(--c-velocity)" fill-opacity="0.9" />
    <text x="250" y="70" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="17" fill="#fff">−</text>
    <text x="70" y="142" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="var(--c-text-mute)">+Q</text>
    <text x="250" y="142" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="var(--c-text-mute)">−Q</text>
  </svg>
</template>
