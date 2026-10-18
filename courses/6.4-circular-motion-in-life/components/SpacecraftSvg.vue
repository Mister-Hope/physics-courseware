<script setup lang="ts">

/**
 * 航天器绕地球做匀速圆周运动 —— 6.4 生活中的圆周运动：地球（共享天体图元 CelestialEarth）、
 * 飞船（舱体 / 舷窗 / 舱内航天员）与切向速度 v。 `showForces` 打开后再补上：沿半径指向地心的
 * 引力 mg（长）、背离地心的座舱支持力 F_N（短），以及由地心 O 指向飞船的半径 R
 * 虚线（O 点同时标出）。 分步用 visibility 占位（只隐藏、不删除），点击时已画出的内容不会位移。
 */
const { showForces = false } = defineProps<{
  /** 点击后出现：mg、F_N、半径 R 与地心 O */
  showForces?: boolean;
}>();

/* ── 画布：与下面 <svg> 的 viewBox 一致 ──
   地球球心与轨道圆心都取在画布下方，只露出上缘一段弧；
   SVG 视口按 overflow:hidden 裁掉画布外的部分（SVG 内部元素不参与版面越界检查）。 */
const VB = { w: 400, h: 320 };

/* ── 地球：共享天体图元（球心在画布下方，视口里只露出上缘弧） ── */
const O = { x: 200, y: 310 };
const R_EARTH = 166;

/* ── 轨道虚线圆与飞船：飞船恰在轨道最高点，此处半径方向正好竖直（可见部分 = 画布内那一段上弧） ── */
const R_ORBIT = 240;
const ship = { x: 200, y: O.y - R_ORBIT };
/** 轨道圆与画布左右边（x = 0 / x = VB.w）的上交点 */
const ORBIT_Y = Number((O.y - Math.sqrt(R_ORBIT ** 2 - O.x ** 2)).toFixed(2));
const ORBIT_ARC = `M 0 ${ORBIT_Y} A ${R_ORBIT} ${R_ORBIT} 0 0 1 ${VB.w} ${ORBIT_Y}`;

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
  <div>
    <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="航天器绕地球做匀速圆周运动，航天员受力分析">
      <!-- 背景星点 -->
      <g fill="var(--c-neutral-200)">
        <circle v-for="s in stars" :key="`${s.x}-${s.y}`" :cx="s.x" :cy="s.y" :r="s.r" :opacity="s.o" />
      </g>
      <!-- 地球：共享天体图元（球心在画布下方，视口里只露出上缘一段弧） -->
      <CelestialEarth :x="O.x" :y="O.y" :r="R_EARTH" />
      <text x="114" y="232" font-size="20" fill="#bfdbfe">地球</text>
      <!-- 飞船的圆形轨道（虚线弧，飞船在其最高点；只画画布内那一段） -->
      <path :d="ORBIT_ARC" fill="none" stroke="color-mix(in srgb, var(--c-text-dim) 34%, transparent)" stroke-width="1.8" stroke-dasharray="7 8" />
      <!-- 半径 R 与地心 O：点击后出现；画在飞船之下，上半段被舱体自然遮住 -->
      <g :class="{ 'orbit-hidden': !showForces }">
        <line
          :x1="O.x"
          :y1="O.y"
          :x2="ship.x"
          :y2="ship.y"
          stroke="color-mix(in srgb, var(--c-neutral-300) 55%, transparent)"
          stroke-width="1.8"
          stroke-dasharray="9 7"
        />
        <text x="214" y="238" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-neutral-300)">R</text>
        <circle :cx="O.x" :cy="O.y" r="7" fill="none" stroke="color-mix(in srgb, var(--c-neutral-200) 50%, transparent)" stroke-width="1.4" />
        <circle :cx="O.x" :cy="O.y" r="4.2" fill="var(--c-neutral-200)" opacity="0.9" />
        <text x="176" y="313" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-neutral-300)">O</text>
      </g>
      <!-- 飞船：舱体 + 尾部喷口 + 舷窗 + 舱内航天员（几何中心即受力点） -->
      <g :transform="`translate(${ship.x} ${ship.y})`">
        <line x1="-34" y1="-20" x2="-42" y2="-38" stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round" />
        <circle cx="-42" cy="-38" r="2.8" fill="var(--c-accent)" />
        <path
          d="M -46 -8 L -56 -13 L -56 13 L -46 8 Z"
          fill="color-mix(in srgb, var(--c-text-dim) 45%, transparent)"
          stroke="var(--c-text-dim)"
          stroke-width="1.8"
          stroke-linejoin="round"
        />
        <rect
          x="-46"
          y="-23"
          width="92"
          height="46"
          rx="17"
          fill="color-mix(in srgb, var(--c-surface-solid) 85%, transparent)"
          stroke="var(--c-neutral-300)"
          stroke-width="2.4"
        />
        <circle cx="0" cy="0" r="16" fill="color-mix(in srgb, var(--c-velocity) 16%, transparent)" stroke="var(--c-velocity-light)" stroke-width="2" />
        <circle cx="0" cy="-4" r="5" fill="var(--c-text)" />
        <path d="M -6.5 8 A 6.5 6.5 0 0 1 6.5 8 Z" fill="var(--c-text)" />
      </g>
      <!-- 航天员受到的力：mg（指向地心，长）与座舱支持力 F_N（背离地心，短） -->
      <g :class="{ 'orbit-hidden': !showForces }">
        <CourseArrow :from="ship" :to="gTip" stroke="var(--c-force)" :stroke-width="3.2" />
        <CourseArrow :from="ship" :to="nTip" stroke="var(--c-physics)" :stroke-width="3.2" />
        <text :x="gTip.x + 13" :y="gTip.y - 4" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="var(--c-force)">mg</text>
        <text :x="nTip.x + 13" :y="nTip.y + 8" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="var(--c-physics)">F</text>
        <text :x="nTip.x + 29" :y="nTip.y + 14" font-family="KaTeX_Main" font-style="normal" font-size="14" fill="var(--c-physics)">N</text>
      </g>
      <!-- 切向速度 -->
      <CourseArrow :from="vFrom" :to="vTo" stroke="var(--c-velocity)" :stroke-width="3" label="v" />
    </svg>
  </div>
</template>

<style scoped>
.orbit-hidden {
  visibility: hidden;
}
</style>
