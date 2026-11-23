<!--
  4.2 封面装饰：沿水平方向传播的电磁波
  —— 电场 E 在竖直平面内振动（青绿），磁场 B 在水平面内振动（金色），
  二者互相垂直，且都与传播方向垂直；虚线为传播方向，指向 c。
-->
<template>
  <svg viewBox="0 0 320 190" width="330" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="18" y1="104" x2="284" y2="104" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="7 6" opacity="0.5" />
    <path :d="ePath" fill="none" stroke="var(--c-physics)" stroke-width="2.6" stroke-linecap="round" />
    <path :d="bPath" fill="none" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" />
    <CourseArrow
      v-for="(p, i) in eArrows"
      :key="`e-${i}`"
      :from="{ x: p.x, y: 104 }"
      :to="{ x: p.x, y: p.y }"
      stroke="var(--c-physics)"
      :stroke-width="1.4"
      :head-size="7"
    />
    <CourseArrow
      v-for="(p, i) in bArrows"
      :key="`b-${i}`"
      :from="{ x: p.x, y: 104 }"
      :to="{ x: p.x + p.dx, y: 104 + p.dy }"
      stroke="var(--c-accent)"
      :stroke-width="1.4"
      :head-size="7"
    />
    <text x="44" y="42" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-physics)">E</text>
    <text x="118" y="162" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">B</text>
    <text x="288" y="98" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)">c</text>
  </svg>
</template>

<script setup lang="ts">
/** 波沿 x 方向：x0 起点、lambda 一个波长的像素长；ampE / ampB 是两个振动的振幅 */
const x0 = 46;
const span = 230;
const lambda = 115;
const ampE = 48;
const ampB = 34;
/** B 的振动方向（水平面内的斜投影） */
const dirBX = 0.8;
const dirBY = 0.42;

function phase(x: number) {
  return ((x - x0) / lambda) * Math.PI * 2;
}

function ePointY(x: number) {
  return 104 - ampE * Math.sin(phase(x));
}

function buildPath(pointOf: (x: number) => { x: number; y: number }) {
  const steps = 120;
  let d = "";
  for (let i = 0; i <= steps; i += 1) {
    const p = pointOf(x0 + (span * i) / steps);
    d += `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
  }
  return d.trim();
}

const ePath = buildPath((x) => ({ x, y: ePointY(x) }));
const bPath = buildPath((x) => {
  const s = Math.sin(phase(x)) * ampB;
  return { x: x + s * dirBX, y: 104 + s * dirBY };
});

/** 在 E 的波峰、波谷处各画一根矢量，B 同理 */
const peaks = [0.25, 0.75, 1.25, 1.75].map((k) => x0 + k * lambda);
const eArrows = peaks.map((x) => ({ x, y: ePointY(x) }));
const bArrows = peaks.map((x) => {
  const s = Math.sin(phase(x)) * ampB;
  return { x, dx: s * dirBX, dy: s * dirBY };
});
</script>
