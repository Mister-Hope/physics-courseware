<!--
  第 11 页（例 2）题目配图：回旋加速器俯视 —— 干净版，只有题目给的东西
  —— D 形盒（两个半圆，中间一条窄缝）+ 粒子从 A 出发、半径递增的螺旋（9 条半圆，约 4.5 圈）
  —— 螺旋的画法：最外那条半圆以盒心为圆心、半径 = 盒半径 R（两端点落在缝线上的盒边界处），其余半圆由它向前反向逐条拼接（相邻半圆共用缝线上的同一个端点、
     圆心都在缝线上、半径按 r_k = R·√(k/K) 递增），整条链向盒心收拢 —— 视觉上居中，不会一侧顶死、一侧空一大截
  —— 最外圈的半径：盒心 → 盒边缘的双箭头，标 R
  —— 出口：螺旋终点（缝线上的盒边界处）沿切线方向指出去的箭头
  题目页第一眼必须是「干净题干 + 干净题目图」：不画受力、不画速度箭头、不铺磁场记号、不标 B。
-->
<script setup lang="ts">
import { computed } from "vue";

/* ── 画布几何（俯视，x 向右、y 向下）── */
const CX = 220;
const CY = 190;
const RP = 165; // D 形盒半径在画布上的长度
const GAP = 7; // 缝隙半宽
const K = 9; // 半圆条数（约 4.5 圈）

const DEE_LEFT = `M ${CX - GAP} ${CY - RP} A ${RP} ${RP} 0 0 0 ${CX - GAP} ${CY + RP} Z`;
const DEE_RIGHT = `M ${CX + GAP} ${CY - RP} A ${RP} ${RP} 0 0 1 ${CX + GAP} ${CY + RP} Z`;

/**
 * 螺旋轨迹：第 k 条半圆半径 r_k = R·√(k/K)、圆心都落在缝线上。
 *
 * 从最外那条半圆开始构造：它必须以盒心为圆心、半径 = 盒半径 R，于是它的两个端点就是缝线与盒边界的交点（相对盒心 ±R）。其余半圆由这条向前反向逐条拼接 ——
 * 相邻两条半圆共用缝线上的同一个端点，圆心取该直径的中点（必在缝线上），左右交替。半径由内向外递增，所以整条链顺势向盒心收拢，视觉上居中，
 * 不会像「从盒心正向逐条画」那样单向漂移、把最外圈顶在盒子下侧。
 */
const geom = computed(() => {
  const radius = (k: number): number => RP * Math.sqrt(k / K);
  /** 端点偏移 us[k]：第 k 条半圆末端（缝线上）相对盒心的偏移，向上为负、向下为正 */
  const us = Array.from({ length: K + 1 }, () => 0);
  us[K] = RP; // 最外那条半圆的两个端点：缝线上的盒边界处
  for (let k = K; k >= 1; k -= 1) {
    // 半圆左右交替：与最外那条同一侧的一半取 u_{k-1} = u_k − 2r_k，另一半取 +
    const dr = 2 * radius(k);
    us[k - 1] = (us[k] ?? 0) + (k % 2 === K % 2 ? -dr : dr);
  }
  return { us, rs: Array.from({ length: K }, (_, i) => radius(i + 1)) };
});

const spiralPath = computed(() => {
  const { us, rs } = geom.value;
  let d = `M ${CX} ${CY + (us[0] ?? 0)}`;
  for (let i = 0; i < K; i += 1) {
    const rad = rs[i] ?? 0;
    d += ` A ${rad} ${rad} 0 0 1 ${CX} ${CY + (us[i + 1] ?? 0)}`;
  }
  return d;
});

/** 粒子源 A：最内那条半圆的端点（靠近盒心） */
const sourceY = computed(() => CY + (geom.value.us[0] ?? 0));

/** 出口：最外那条半圆的下端点（缝线上的盒边界处），粒子在这里沿切线方向（向左）射出 */
const exitY = computed(() => CY + (geom.value.us[K] ?? RP));

/* ── 盒半径 R 的双箭头（圆心 → 盒边缘） ── */
interface Pt {
  x: number;
  y: number;
}

interface DblArrow {
  shaft: { x1: number; y1: number; x2: number; y2: number };
  headA: string;
  headB: string;
}

/**
 * 双头箭头（CourseArrow 只画单头）：三角形长 12，箭杆两端各回退 12，尖端正好落在端点上
 *
 * @param a 起点
 * @param b 终点
 * @returns 箭杆两端坐标与两个三角形顶点串
 */
const dblArrow = (a: Pt, b: Pt): DblArrow => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;
  const head = 12;
  const half = 5.5;
  return {
    shaft: {
      x1: a.x + ux * head,
      y1: a.y + uy * head,
      x2: b.x - ux * head,
      y2: b.y - uy * head,
    },
    headA: `${a.x},${a.y} ${a.x + ux * head + nx * half},${a.y + uy * head + ny * half} ${a.x + ux * head - nx * half},${a.y + uy * head - ny * half}`,
    headB: `${b.x},${b.y} ${b.x - ux * head + nx * half},${b.y - uy * head + ny * half} ${b.x - ux * head - nx * half},${b.y - uy * head - ny * half}`,
  };
};

const rArrow = computed(() => dblArrow({ x: CX, y: CY }, { x: CX + RP, y: CY }));
</script>

<template>
  <div class="cf-wrap">
    <svg class="cf-svg" viewBox="0 0 440 380" xmlns="http://www.w3.org/2000/svg">
      <path class="cf-dee" :d="DEE_LEFT" />
      <path class="cf-dee" :d="DEE_RIGHT" />
      <path class="cf-trail" :d="spiralPath" />
      <line class="cf-r-halo" :x1="CX" :y1="CY" :x2="CX + RP" :y2="CY" :stroke-width="9" />
      <line
        class="cf-r-shaft"
        :x1="rArrow.shaft.x1"
        :y1="rArrow.shaft.y1"
        :x2="rArrow.shaft.x2"
        :y2="rArrow.shaft.y2"
      />
      <polygon class="cf-r-head" :points="rArrow.headA" />
      <polygon class="cf-r-head" :points="rArrow.headB" />
      <text class="cf-rlabel" :x="CX + RP / 2" :y="CY - 16">
        <tspan class="cf-math">R</tspan>
      </text>
      <CourseArrow
        :from="{ x: CX, y: exitY }"
        :to="{ x: 134, y: exitY }"
        stroke="var(--c-accent)"
        :stroke-width="3.2"
      />
      <circle class="cf-source" :cx="CX" :cy="sourceY" r="5" />
      <text class="cf-tag" :x="CX + 14" :y="sourceY + 26">A</text>
    </svg>
  </div>
</template>

<style scoped>
.cf-wrap {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 0;
}

/* #fig 栏是 width: max-content，所以给 SVG 一个明确的宽度（窄栏靠 max-width 收） */
.cf-svg {
  display: block;
  width: 340px;
  max-width: 100%;
  height: auto;
}

.cf-dee {
  fill: color-mix(in srgb, var(--c-accent-2) 6%, transparent);
  stroke: var(--c-text-dim);
  stroke-width: 2;
}

.cf-trail {
  fill: none;
  stroke: var(--c-velocity);
  stroke-linecap: round;
  stroke-width: 2.6;
}

.cf-r-halo {
  opacity: 0.85;
  stroke: var(--c-bg-soft);
  stroke-linecap: round;
}

.cf-r-shaft {
  stroke: var(--c-accent);
  stroke-linecap: round;
  stroke-width: 2.4;
}

.cf-r-head {
  fill: var(--c-accent);
}

.cf-rlabel {
  font-style: italic;
  font-size: 24px;

  paint-order: stroke;

  fill: var(--c-accent);
  stroke: var(--c-bg-soft);
  stroke-width: 4;
  text-anchor: middle;
}

.cf-source {
  fill: var(--c-neutral-300);
}

.cf-tag {
  font-size: 20px;

  paint-order: stroke;

  fill: var(--c-text-dim);
  stroke: var(--c-bg-soft);
  stroke-width: 4;
}

.cf-math {
  font-style: italic;
  font-family: "KaTeX_Math", serif;
}
</style>
