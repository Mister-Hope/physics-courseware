<!--
  4.2 P7：电磁波是横波（三矢量正交示意）
  —— 传播方向沿水平虚线；电场 E 在竖直平面内做正弦变化，磁场 B 在斜投影的平面内做正弦变化，
     两者都与传播方向垂直、并且互相垂直。
  常显（无分步）；E 用 --c-physics，B 用 --c-accent。
-->
<template>
  <svg viewBox="0 0 720 250" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <CourseArrow :from="{ x: 40, y: axisY }" :to="{ x: 672, y: axisY }" stroke="var(--c-text-dim)" :stroke-width="1.6" :head-size="9" stroke-dasharray="7 6" />
    <path :d="ePath" fill="none" stroke="var(--c-physics)" :stroke-width="3" />
    <path :d="bPath" fill="none" stroke="var(--c-accent)" :stroke-width="3" />
    <g v-for="x in peaks" :key="`a-${x}`">
      <CourseArrow
        :from="{ x, y: axisY }"
        :to="{ x, y: axisY - ampE * Math.sin(((x - x0) / lambda) * 2 * Math.PI) }"
        stroke="var(--c-physics)"
        :stroke-width="2.2"
        :head-size="9"
      />
      <CourseArrow :from="{ x, y: axisY }" :to="bPoint(x)" stroke="var(--c-accent)" :stroke-width="2.2" :head-size="9" />
    </g>
    <text :x="130" :y="axisY - ampE - 6" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="var(--c-physics)">E</text>
    <text :x="184" :y="axisY + 66" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="var(--c-accent)">B</text>
    <text :x="684" :y="axisY + 8" font-family="KaTeX_Math" font-style="italic" font-size="22" fill="var(--c-text-dim)">c</text>
  </svg>
</template>

<script setup lang="ts">
/** 传播轴：y = axisY，从 x0 到 x1，波长 lambda */
const axisY = 125;
const x0 = 60;
const x1 = 620;
const lambda = 280;
const ampE = 84;
const ampB = 62;
/** B 的振动平面用 45° 斜投影表示：单位方向 (0.71, 0.71) */
const dirB = { x: 0.71, y: 0.71 };

const sample = (): number[] => {
  const out: number[] = [];
  for (let x = x0; x <= x1; x += 8) out.push(x);
  return out;
};

const ePath = sample()
  .map((x, i) => {
    const s = Math.sin(((x - x0) / lambda) * 2 * Math.PI);
    return `${i === 0 ? "M" : "L"}${x},${(axisY - ampE * s).toFixed(1)}`;
  })
  .join(" ");

const bPath = sample()
  .map((x, i) => {
    const s = Math.sin(((x - x0) / lambda) * 2 * Math.PI);
    return `${i === 0 ? "M" : "L"}${(x + ampB * s * dirB.x).toFixed(1)},${(axisY + ampB * s * dirB.y).toFixed(1)}`;
  })
  .join(" ");

/** 波峰 / 波谷所在的 x（一个波长两个极值） */
const peaks = [130, 270, 410, 550];

const bPoint = (x: number): { x: number; y: number } => {
  const s = Math.sin(((x - x0) / lambda) * 2 * Math.PI);
  return { x: x + ampB * s * dirB.x, y: axisY + ampB * s * dirB.y };
};
</script>
