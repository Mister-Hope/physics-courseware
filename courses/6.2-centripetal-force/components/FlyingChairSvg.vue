<script setup lang="ts">
// 第 3 页：空中飞椅 —— 人与座椅一起做匀速圆周运动。
// 绳的拉力 F 与重力 G 的合力水平指向圆心，这个合力就是向心力 F_n。
// 受力分析由 showForces 控制：第一眼只给学生干净的题目图。
const { showForces = false } = defineProps<{ showForces?: boolean }>();

/** 人与座椅的几何中心（也是所有力的起笔处）：位于圆周的最右端 */
const P = { x: 394, y: 191 };
/** 绳的悬挂点（吊盘边缘） */
const A = { x: 196, y: 62 };
/** 重力大小（用户单位） */
const G_LEN = 80;

const dir = ((): { x: number; y: number } => {
  const dx = A.x - P.x;
  const dy = A.y - P.y;
  const len = Math.hypot(dx, dy);

  return { x: dx / len, y: dy / len };
})();

/** 拉力 F：竖直分量必须与重力平衡（人不下沉），所以 F_y = −G_LEN */
const F = { x: P.x + (dir.x * -G_LEN) / dir.y, y: P.y - G_LEN };
/** 重力 */
const G = { x: P.x, y: P.y + G_LEN };
/** 合力（向心力）：水平指向圆心，等于 F 与 G 的矢量和 */
const N = { x: F.x, y: P.y };
</script>

<template>
  <svg viewBox="0 0 540 400" width="100%" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 40, y: 372 }" :to="{ x: 500, y: 372 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="20" />
    <rect x="141" y="62" width="18" height="310" rx="5" fill="rgba(148,163,184,0.22)" stroke="#94a3b8" stroke-width="1.6" />
    <ellipse cx="150" cy="62" rx="54" ry="12" fill="rgba(148,163,184,0.18)" stroke="#94a3b8" stroke-width="1.6" />
    <line x1="72" y1="198" x2="470" y2="198" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="7 6" opacity="0.45" />
    <line :x1="A.x" :y1="A.y" :x2="P.x" :y2="P.y" stroke="#60a5fa" stroke-width="2.2" stroke-linecap="round" />
    <circle cx="150" cy="198" r="3.6" fill="#94a3b8" />
    <text x="138" y="218" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#94a3b8" text-anchor="end">O</text>
    <rect x="412" y="166" width="9" height="44" rx="3" fill="rgba(148,163,184,0.3)" stroke="#94a3b8" stroke-width="1.4" />
    <rect x="372" y="204" width="50" height="10" rx="3" fill="rgba(148,163,184,0.3)" stroke="#94a3b8" stroke-width="1.4" />
    <rect x="380" y="174" width="28" height="34" rx="10" fill="rgba(96,165,250,0.25)" stroke="#94a3b8" stroke-width="1.4" />
    <circle cx="395" cy="164" r="10" fill="rgba(226,168,70,0.25)" stroke="#e2a846" stroke-width="1.6" />
    <g v-if="showForces">
      <line :x1="F.x" :y1="F.y" :x2="N.x" :y2="N.y" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.7" />
      <line :x1="G.x" :y1="G.y" :x2="N.x" :y2="N.y" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.7" />
      <CourseArrow :from="P" :to="F" stroke="#60a5fa" :stroke-width="3" />
      <CourseArrow :from="P" :to="G" stroke="#f87171" :stroke-width="3" />
      <CourseArrow :from="P" :to="N" stroke="#e2a846" :stroke-width="3.4" />
      <text
        :x="F.x - 16"
        :y="F.y + 25"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="19"
        fill="#60a5fa"
        text-anchor="end"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        F
      </text>
      <text
        :x="G.x + 8"
        :y="G.y + 8"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="19"
        fill="#f87171"
        text-anchor="start"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        G
      </text>
      <text
        :x="N.x + 6"
        :y="N.y + 30"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="19"
        fill="#e2a846"
        text-anchor="start"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        <tspan>F</tspan>
        <tspan dy="4" font-size="13">n</tspan>
      </text>
    </g>
  </svg>
</template>
