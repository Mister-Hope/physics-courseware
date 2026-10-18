<template>
  <!--
    第 14 页（练习 3）题目图：教材图 13.2-8
    —— 匀强磁场 B 沿 x 轴正方向（左上→右下的平行磁感线）；长方体框架顶点 M、N、C、D、E、F：
       MN = DC = 0.4 m（竖直），NC = EF = MD = NE = CF = 0.3 m（水平 / 进深）。
    —— 题干常显（干净图）：showFace1 = 面 MNCD（⊥B）；showFace2 = 面 NEFC（∥B）；
       showFace3 = 面 MEFD（斜面）+ 它在垂直 B 方向上的投影虚线（投影恰为面 MNCD）。
  -->
  <svg viewBox="30 70 265 258" width="340" height="329" xmlns="http://www.w3.org/2000/svg">
    <g v-for="(line, i) in FIELD" :key="i">
      <CourseArrow :from="line.from" :to="line.to" stroke="var(--c-accent)" stroke-width="1.8" :opacity="0.45" />
    </g>
    <text x="242" y="168" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-accent)">B</text>
    <polygon v-if="showFace1" :points="pts([M, N, C, D])" fill="rgba(226,168,70,0.16)" />
    <polygon v-if="showFace2" :points="pts([N, E, F, C])" fill="rgba(96,165,250,0.16)" />
    <polygon v-if="showFace3" :points="pts([M, E, F, D])" fill="rgba(56,189,248,0.16)" />
    <g fill="none" stroke="var(--c-text)" stroke-width="1.7" stroke-linejoin="round">
      <polygon :points="pts([M, N, C, D])" />
      <polygon :points="pts([N, E, F, C])" />
      <line :x1="M.x" :y1="M.y" :x2="E.x" :y2="E.y" />
      <line :x1="D.x" :y1="D.y" :x2="F.x" :y2="F.y" />
    </g>
    <g v-if="showFace3" fill="none" stroke="var(--c-accent)" stroke-width="1.4" stroke-dasharray="6 5">
      <line :x1="E.x" :y1="E.y" :x2="N.x" :y2="N.y" />
      <line :x1="F.x" :y1="F.y" :x2="C.x" :y2="C.y" />
    </g>
    <g font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-text)">
      <text x="142" y="296" text-anchor="end">M</text>
      <text x="142" y="180" text-anchor="end">N</text>
      <text x="216" y="178">C</text>
      <text x="216" y="296">D</text>
      <text x="170" y="216">E</text>
      <text x="250" y="212">F</text>
    </g>
    <g font-family="KaTeX_Main" font-size="13" fill="var(--c-text-dim)">
      <text x="138" y="238" text-anchor="end">0.4 m</text>
      <text x="180" y="174" text-anchor="middle">0.3 m</text>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  /** 第 1 次点击：高亮面 MNCD（与 B 垂直） */
  showFace1: { type: Boolean, default: false },
  /** 第 2 次点击：高亮面 NEFC（与 B 平行） */
  showFace2: { type: Boolean, default: false },
  /** 第 3 次点击：高亮斜面 MEFD 与它在垂直 B 方向上的投影 */
  showFace3: { type: Boolean, default: false },
});

/** 顶点（viewBox 用户单位）：N 为上角，MN 竖直 0.4 m、NC 水平 0.3 m、NE 进深 0.3 m */
const N = { x: 150, y: 184 };
const M = { x: 150, y: 280 };
const C = { x: 210, y: 184 };
const D = { x: 210, y: 280 };
const E = { x: 183.8, y: 196.3 };
const F = { x: 243.8, y: 196.3 };

/** B 沿 +x（进深方向）：四条平行磁感线 */
const FIELD = [
  { from: { x: 40, y: 90 }, to: { x: 235, y: 160.9 } },
  { from: { x: 40, y: 140 }, to: { x: 235, y: 210.9 } },
  { from: { x: 40, y: 190 }, to: { x: 235, y: 260.9 } },
  { from: { x: 40, y: 240 }, to: { x: 235, y: 310.9 } },
];

/**
 * 顶点序列 → polygon 的 points 字符串
 *
 * @param verts 顶点数组
 * @returns Points 字符串
 */
const pts = (verts) => verts.map((v) => `${v.x},${v.y}`).join(" ");
</script>
