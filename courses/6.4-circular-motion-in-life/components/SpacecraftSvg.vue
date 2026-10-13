<script setup lang="ts">
import { useId } from "vue";

/**
 * 航天器绕地球做匀速圆周运动 —— 6.4 生活中的圆周运动 干净版：地球（局部弧线 + 大气层光晕 + 云带）、飞船（舱体 / 舷窗 / 舱内航天员）与切向速度 v。 `showForces` 打开后再补上：沿半径指向地心的引力 mg（长）、背离地心的座舱支持力 F_N（短）， 以及由地心 O 指向飞船的半径 R
 * 虚线（O 点同时标出）。 分步用 visibility 占位（只隐藏、不删除），点击时已画出的内容不会位移。
 */
const { showForces = false } = defineProps<{
  /** 点击后出现：mg、F_N、半径 R 与地心 O */
  showForces?: boolean;
}>();

const uid = useId();
const earthFillId = `craft-earth-${uid}`;
const earthClipId = `craft-earth-clip-${uid}`;

/* ── 地球：一个圆，下半部分超出画布被裁掉，只露出上部一段弧（行星边缘） ── */
const O = { x: 200, y: 310 };
const R_EARTH = 166;

/* ── 轨道虚线圆与飞船：飞船恰在轨道最高点，此处半径方向正好竖直 ── */
const R_ORBIT = 240;
const ship = { x: 200, y: O.y - R_ORBIT };

/* ── 两力都从飞船几何中心出发、沿半径共线：mg 指向地心（长），F_N 背离地心（短） ── */
const G_LEN = 54;
const N_LEN = 36;
const gTip = { x: ship.x, y: ship.y + G_LEN };
const nTip = { x: ship.x, y: ship.y - N_LEN };

/* ── 切向速度：垂直于半径方向（水平），从舱体右缘外起画 ── */
const vFrom = { x: ship.x + 52, y: ship.y };
const vTo = { x: ship.x + 122, y: ship.y };

/** 背景星点（位置已避开飞船、箭头与地球） */
const stars = [
  { x: 54, y: 58, r: 1.6, o: 0.55 },
  { x: 96, y: 26, r: 1.1, o: 0.4 },
  { x: 130, y: 100, r: 1.4, o: 0.5 },
  { x: 292, y: 30, r: 1.5, o: 0.55 },
  { x: 344, y: 68, r: 1.1, o: 0.4 },
  { x: 372, y: 126, r: 1.4, o: 0.5 },
  { x: 26, y: 152, r: 1.5, o: 0.5 },
  { x: 26, y: 238, r: 1.2, o: 0.45 },
  { x: 374, y: 266, r: 1.3, o: 0.45 },
];
</script>

<template>
  <div class="craft">
    <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="航天器绕地球做匀速圆周运动，航天员受力分析">
      <defs>
        <!-- 地球球体：受光面偏左上，边缘渐暗出球感（颜色一律无空格，避免 UnoCSS attributify 误解析） -->
        <radialGradient :id="earthFillId" cx="0.38" cy="0.2" r="0.92">
          <stop offset="0" stop-color="rgba(96,165,250,0.46)" />
          <stop offset="0.45" stop-color="rgba(59,130,246,0.32)" />
          <stop offset="1" stop-color="rgba(29,78,216,0.2)" />
        </radialGradient>
        <clipPath :id="earthClipId">
          <circle :cx="O.x" :cy="O.y" :r="R_EARTH" />
        </clipPath>
      </defs>
      <!-- 背景星点 -->
      <g fill="#e2e8f0">
        <circle v-for="s in stars" :key="`${s.x}-${s.y}`" :cx="s.x" :cy="s.y" :r="s.r" :opacity="s.o" />
      </g>
      <!-- 地球：球体 + 云带（裁在球内） + 大气层光晕 + 行星边缘 -->
      <circle :cx="O.x" :cy="O.y" :r="R_EARTH" :fill="`url(#${earthFillId})`" />
      <g :clip-path="`url(#${earthClipId})`" fill="rgba(226,232,240,0.085)">
        <ellipse cx="150" cy="212" rx="64" ry="13" />
        <ellipse cx="264" cy="256" rx="72" ry="15" />
        <ellipse cx="196" cy="182" rx="42" ry="9" />
      </g>
      <circle :cx="O.x" :cy="O.y" :r="R_EARTH" fill="none" stroke="rgba(96,165,250,0.14)" stroke-width="14" />
      <circle :cx="O.x" :cy="O.y" :r="R_EARTH" fill="none" stroke="rgba(147,197,253,0.6)" stroke-width="4" />
      <circle :cx="O.x" :cy="O.y" :r="R_EARTH" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.85" />
      <text x="114" y="232" font-size="20" fill="#bfdbfe">地球</text>
      <!-- 飞船的圆形轨道（虚线圆，飞船在其最高点） -->
      <circle :cx="O.x" :cy="O.y" :r="R_ORBIT" fill="none" stroke="rgba(148,163,184,0.34)" stroke-width="1.8" stroke-dasharray="7 8" />
      <!-- 半径 R 与地心 O：点击后出现；画在飞船之下，上半段被舱体自然遮住 -->
      <g :class="{ 'vp-hidden': !showForces }">
        <line :x1="O.x" :y1="O.y" :x2="ship.x" :y2="ship.y" stroke="rgba(203,213,225,0.55)" stroke-width="1.8" stroke-dasharray="9 7" />
        <text x="214" y="238" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#cbd5e1">R</text>
        <circle :cx="O.x" :cy="O.y" r="7" fill="none" stroke="rgba(226,232,240,0.5)" stroke-width="1.4" />
        <circle :cx="O.x" :cy="O.y" r="4.2" fill="#e2e8f0" opacity="0.9" />
        <text x="176" y="313" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#cbd5e1">O</text>
      </g>
      <!-- 飞船：舱体 + 尾部喷口 + 舷窗 + 舱内航天员（几何中心即受力点） -->
      <g :transform="`translate(${ship.x} ${ship.y})`">
        <line x1="-34" y1="-20" x2="-42" y2="-38" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" />
        <circle cx="-42" cy="-38" r="2.8" fill="#e2a846" />
        <path d="M -46 -8 L -56 -13 L -56 13 L -46 8 Z" fill="rgba(148,163,184,0.45)" stroke="#94a3b8" stroke-width="1.8" stroke-linejoin="round" />
        <rect x="-46" y="-23" width="92" height="46" rx="17" fill="rgba(30,41,59,0.85)" stroke="#cbd5e1" stroke-width="2.4" />
        <circle cx="0" cy="0" r="16" fill="rgba(96,165,250,0.16)" stroke="#93c5fd" stroke-width="2" />
        <circle cx="0" cy="-4" r="5" fill="#f1f5f9" />
        <path d="M -6.5 8 A 6.5 6.5 0 0 1 6.5 8 Z" fill="#f1f5f9" />
      </g>
      <!-- 航天员受到的力：mg（指向地心，长）与座舱支持力 F_N（背离地心，短） -->
      <g :class="{ 'vp-hidden': !showForces }">
        <CourseArrow :from="ship" :to="gTip" stroke="#f87171" :stroke-width="3.2" />
        <CourseArrow :from="ship" :to="nTip" stroke="#2dd4bf" :stroke-width="3.2" />
        <text :x="gTip.x + 13" :y="gTip.y - 4" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#f87171">mg</text>
        <text :x="nTip.x + 13" :y="nTip.y + 8" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#2dd4bf">F</text>
        <text :x="nTip.x + 29" :y="nTip.y + 14" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="#2dd4bf">N</text>
      </g>
      <!-- 切向速度 -->
      <CourseArrow :from="vFrom" :to="vTo" stroke="#60a5fa" :stroke-width="3" label="v" />
    </svg>
  </div>
</template>

<style scoped>
.craft {
  min-width: 0;
}

.craft svg {
  display: block;
  width: 100%;
  height: auto;
}

.vp-hidden {
  visibility: hidden;
}
</style>
