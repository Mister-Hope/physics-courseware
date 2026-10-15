<script setup lang="ts">
/**
 * 汽车通过拱形桥（桥顶）—— 6.4 生活中的圆周运动（第 7 页）
 *
 * 干净版（`showForces = false`）只画拱形路面、两侧桥墩、地面与停在桥顶的汽车； 点击后（`showForces = true`）再补上重力 G、桥面支持力 F_N、合力 F合（= G − F_N）与半径 r。 分步用 visibility 占位（只隐藏不删除），已画出的内容不会位移。
 */
const { showForces = false } = defineProps<{
  /** 点击后出现：G、F_N、F合 与半径 r */
  showForces?: boolean;
}>();

interface Pt {
  x: number;
  y: number;
}

const pt = (p: Pt): string => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`;

/** 桥面圆弧：圆心 O 在桥下，圆弧最高点（桥顶）落在 (230, 120) */
const R = 180;
const O: Pt = { x: 230, y: 300 };
/** 圆弧半张角：左右各 46° */
const HALF = (46 * Math.PI) / 180;
/** 桥顶 —— 汽车正好坐在圆弧顶点上 */
const APEX: Pt = { x: 230, y: 120 };
/** 汽车的几何中心：三个力都从这里出发 */
const CAR: Pt = { x: 230, y: 90 };

/** 三个力的终点：都竖直，长度 G > F_N > F合（且 G = F_N + F合） */
const G_TIP: Pt = { x: CAR.x, y: 186 };
const N_TIP: Pt = { x: CAR.x, y: 24 };
/** 合力与 G 同方向（竖直向下），平行侧移一点画出，才看得见、标签也不打架 */
const F_X = 294;
const F_TAIL: Pt = { x: F_X, y: CAR.y };
const F_TIP: Pt = { x: F_X, y: 120 };

/** 桥面板竖直厚度 / 桥墩宽度 / 地面高度 */
const DECK_T = 16;
const PILLAR_W = 26;
const GROUND_Y = 320;
/** 半径辅助线的偏角：略向左偏，绕开竖直的力箭头（否则与 G 重叠成一条线） */
const RADIUS_ANGLE = (11 * Math.PI) / 180;

const at = (angle: number, radius: number): Pt => ({
  x: O.x + radius * Math.sin(angle),
  y: O.y - radius * Math.cos(angle),
});

const sample = (radius: number, from: number, to: number, n: number): Pt[] =>
  Array.from({ length: n }, (_, i) => at(from + ((to - from) * i) / (n - 1), radius));

const move = (pts: Pt[]): string => pts.map((p, i) => `${i === 0 ? "M" : "L"} ${pt(p)}`).join(" ");

const outerArc = sample(R, -HALF, HALF, 41);
const [first] = outerArc;
const last = outerArc[outerArc.length - 1];

/**
 * 桥面板下缘：外弧整体下移一个板厚
 *
 * @param p 外弧（路面上缘）上的点
 * @returns 下缘上与之竖直对应的点
 */
const deckBottom = (p: Pt): Pt => ({ x: p.x, y: p.y + DECK_T });

/** 桥面：外弧 + 两端竖直切边围成的板带 —— 是一条"桥面板"，不是"一座山" */
const deckPath = `${move(outerArc)} L ${pt(deckBottom(last))} L ${pt(deckBottom(first))} Z`;
/** 路面轮廓：单独再描一条亮线，勾出汽车行走的那一面 */
const surfacePath = move(outerArc);

/** 桥面板下缘的高度：桥面板是一段水平底边（两端连线），桥墩顶面与它齐平才严丝合缝 */
const DECK_BOTTOM_Y = O.y - R * Math.cos(HALF) + DECK_T;

/**
 * 桥墩：顶面是一段与桥面板下缘齐平的水平线（不留缝、也不戳进桥面板）、外缘与桥面端点对齐，直落到地面（左右对称）
 *
 * @param xOuter 桥墩外缘的横坐标
 * @returns 桥墩的 SVG 路径
 */
const pillarPath = (xOuter: number): string => {
  const xInner = xOuter + PILLAR_W;

  return `M ${xOuter} ${GROUND_Y + 2} L ${xOuter} ${DECK_BOTTOM_Y} L ${xInner} ${DECK_BOTTOM_Y} L ${xInner} ${GROUND_Y + 2} Z`;
};

const leftPillar = pillarPath(first.x);
const rightPillar = pillarPath(2 * O.x - first.x - PILLAR_W);

/** 半径 r 的辅助虚线：从圆心指向桥顶附近的路面 */
const radiusEnd = at(-RADIUS_ANGLE, R);
</script>

<template>
  <div>
    <svg viewBox="16 12 428 332" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="汽车通过拱形桥桥顶，受力分析">
      <SurfaceHatch :from="{ x: 28, y: 320 }" :to="{ x: 432, y: 320 }" side="below" />

      <path :d="leftPillar" fill="color-mix(in srgb, var(--c-text-dim) 16%, transparent)" stroke="var(--c-text-dim)" stroke-width="2" stroke-linejoin="round" />
      <path :d="rightPillar" fill="color-mix(in srgb, var(--c-text-dim) 16%, transparent)" stroke="var(--c-text-dim)" stroke-width="2" stroke-linejoin="round" />
      <path :d="deckPath" fill="color-mix(in srgb, var(--c-text-dim) 20%, transparent)" stroke="var(--c-text-dim)" stroke-width="2" />
      <path :d="surfacePath" fill="none" stroke="var(--c-neutral-300)" stroke-width="2" stroke-linecap="round" />

      <g :class="{ 'bridge-hidden': !showForces }">
        <line :x1="O.x" :y1="O.y" :x2="radiusEnd.x" :y2="radiusEnd.y" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="9 8" opacity="0.85" />
        <text x="194" y="222" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text-dim)">r</text>
        <circle :cx="O.x" :cy="O.y" r="4.4" fill="var(--c-text-dim)" opacity="0.9" />
        <text x="216" y="294" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text-dim)">O</text>
        <line :x1="CAR.x" :y1="CAR.y" :x2="F_X" :y2="CAR.y" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 6" opacity="0.5" />
      </g>

      <g :transform="`translate(${APEX.x} ${APEX.y})`">
        <rect x="-48" y="-34" width="96" height="26" rx="9" fill="color-mix(in srgb, var(--c-accent-2) 30%, transparent)" stroke="var(--c-velocity)" stroke-width="2.4" />
        <path d="M -30 -34 L -19 -54 L 19 -54 L 30 -34 Z" fill="color-mix(in srgb, var(--c-accent-2) 22%, transparent)" stroke="var(--c-velocity)" stroke-width="2.2" stroke-linejoin="round" />
        <path d="M -22 -36 L -14 -50 L -1 -50 L -1 -36 Z" fill="rgba(191,219,254,0.55)" />
        <path d="M 1 -36 L 1 -50 L 14 -50 L 22 -36 Z" fill="rgba(191,219,254,0.55)" />
        <circle cx="-26" cy="-9" r="9" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
        <circle cx="-26" cy="-9" r="3.2" fill="var(--c-text-dim)" />
        <circle cx="26" cy="-9" r="9" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
        <circle cx="26" cy="-9" r="3.2" fill="var(--c-text-dim)" />
      </g>

      <g :class="{ 'bridge-hidden': !showForces }">
        <CourseArrow :from="CAR" :to="G_TIP" stroke="var(--c-force)" :stroke-width="3.2" />
        <CourseArrow :from="CAR" :to="N_TIP" stroke="var(--c-physics)" :stroke-width="3.2" />
        <CourseArrow :from="F_TAIL" :to="F_TIP" stroke="var(--c-accent)" :stroke-width="3.4" />

        <text x="243" y="182" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-force)">G</text>
        <text x="243" y="46" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-physics)">F</text>
        <text x="256" y="60" font-family="KaTeX_Main" font-size="13" fill="var(--c-physics)">N</text>
        <text x="307" y="112" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">F</text>
        <text x="320" y="126" font-family="KaTeX_Main" font-size="13" fill="var(--c-accent)">合</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.bridge-hidden {
  visibility: hidden;
}
</style>
