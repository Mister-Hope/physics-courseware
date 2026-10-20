<template>
  <!--
    第 15 页（练习 3）题目图：教材图 13.2-8 的长方体（0.4 m × 0.3 m × 0.3 m）+ 斜截面 MEFD。
    几何约定：前表面 MNCD 在纸面内（MN = DC = 0.4 m 竖直、NC = MD = 0.3 m 水平）；
    NE、CF 是进深边 0.3 m，EF 是后上方的水平边；NE ∥ x 轴，B 沿进深方向穿入纸面。
    于是 MNCD ⊥ B、NEFC 含 B 的方向、MEFD 是斜截面（它在垂直 B 方向的投影正是 MNCD）。
    初始态只画框架、斜截面轮廓、尺寸与 B 箭头；三个面的填充与投影虚线随点击出现。
  -->
  <svg viewBox="30 70 265 258" width="340" height="329" xmlns="http://www.w3.org/2000/svg">
    <!-- 磁场（沿进深方向 = +x） -->
    <g>
      <CourseArrow
        v-for="(y0, i) in FIELD_Y"
        :key="`b${i}`"
        :from="{ x: 36, y: y0 }"
        :to="{ x: 232, y: y0 + 70.3 }"
        stroke="var(--c-accent)"
        :stroke-width="2"
        :opacity="0.45"
      />
      <text x="40" y="88" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-accent)">B</text>
    </g>
    <!-- 三个面的填充（点击后才出） -->
    <polygon v-if="step >= 1" :points="pts([M, N, C, D])" fill="var(--c-accent-soft)" />
    <polygon v-if="step >= 2" :points="pts([N, E, F, C])" fill="var(--c-accent-2-soft)" />
    <polygon v-if="step >= 3" :points="pts([M, E, F, D])" fill="var(--c-physics)" fill-opacity="0.18" />
    <!-- 长方体框架：可见棱 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linejoin="round">
      <polygon :points="pts([M, N, C, D])" />
      <polyline :points="pts([N, E, F, C])" />
      <line :x1="D.x" :y1="D.y" :x2="P.x" :y2="P.y" />
      <line :x1="P.x" :y1="P.y" :x2="F.x" :y2="F.y" />
    </g>
    <!-- 不可见的棱：虚线 -->
    <g fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.45">
      <line :x1="M.x" :y1="M.y" :x2="Q.x" :y2="Q.y" />
      <line :x1="Q.x" :y1="Q.y" :x2="P.x" :y2="P.y" />
      <line :x1="Q.x" :y1="Q.y" :x2="E.x" :y2="E.y" />
    </g>
    <!-- 斜截面 MEFD 的轮廓（M—E、F—D；另外两条边就是 EF 与 MD） -->
    <g fill="none" stroke="var(--c-physics)" stroke-width="2.2" stroke-linejoin="round">
      <line :x1="M.x" :y1="M.y" :x2="E.x" :y2="E.y" />
      <line :x1="F.x" :y1="F.y" :x2="D.x" :y2="D.y" />
    </g>
    <!-- 投影虚线 E→N、F→C（第 3 击后） -->
    <g v-if="step >= 3" fill="none" stroke="var(--c-accent)" stroke-width="1.4" stroke-dasharray="6 5">
      <line :x1="E.x" :y1="E.y" :x2="N.x" :y2="N.y" />
      <line :x1="F.x" :y1="F.y" :x2="C.x" :y2="C.y" />
    </g>
    <!-- 顶点 -->
    <g font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-text)">
      <text :x="M.x - 8" :y="M.y + 6" text-anchor="end">M</text>
      <text :x="N.x - 8" :y="N.y - 4" text-anchor="end">N</text>
      <text :x="C.x + 8" :y="C.y - 4">C</text>
      <text :x="D.x + 8" :y="D.y + 6">D</text>
      <text :x="E.x - 8" :y="E.y + 4" text-anchor="end">E</text>
      <text :x="F.x + 8" :y="F.y + 4">F</text>
    </g>
    <!-- 尺寸 -->
    <g font-family="KaTeX_Main" font-size="13" fill="var(--c-text-dim)">
      <text :x="M.x - 14" :y="(M.y + N.y) / 2 + 4" text-anchor="end">0.4 m</text>
      <text :x="(N.x + C.x) / 2" :y="N.y - 10" text-anchor="middle">0.3 m</text>
    </g>
    <!-- x 轴方向提示 -->
    <CourseArrow :from="{ x: 36, y: 292 }" :to="{ x: 108, y: 318 }" stroke="var(--c-text-dim)" :stroke-width="1.6" />
    <text x="114" y="322" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-text-dim)">x</text>
  </svg>
</template>

<script setup lang="ts">
/** 顶点（viewBox 用户单位）：前表面 MNCD，后表面（后上方）E、F，隐藏的两角 Q、P */
const N = { x: 150, y: 184 }
const M = { x: 150, y: 280 }
const C = { x: 210, y: 184 }
const D = { x: 210, y: 280 }
const E = { x: 183.8, y: 196.3 }
const F = { x: 243.8, y: 196.3 }
const P = { x: 243.8, y: 292.3 }
const Q = { x: 183.8, y: 292.3 }

const { step = 0 } = defineProps<{ /** 1 = 高亮 MNCD；2 = 高亮 NEFC；3 = 高亮 MEFD 并给出投影虚线 */ step?: number }>()

/** 磁感线的起始纵坐标（沿进深方向 4 条） */
const FIELD_Y = [96, 146, 196, 246]

/**
 * 顶点序列 → polygon points
 *
 * @param verts 顶点数组
 * @returns points 字符串
 */
const pts = (verts: { x: number; y: number }[]): string => verts.map((v) => `${v.x},${v.y}`).join(' ')
</script>
