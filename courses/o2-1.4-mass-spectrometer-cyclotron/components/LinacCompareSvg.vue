<!--
  P7 从多级加速到回旋加速（静态图，无 props）
  上部：多级直线加速器 —— 8 块垂直于束流的平行板 P₁…P₈（中间留孔径），
        粒子沿水平直线依次穿过，每个加速区里的一段行程越往后划得越长（速度越来越大）；
  下部：一条水平双向箭头标注「装置长度」；
  右侧：一条浅色虚线圆，暗示"改成回旋加速可以把装置做小"。全图不出现任何具体数值。
-->
<script setup lang="ts">
/** 8 块平行板的横坐标（垂直于束流；每块分上下两段，中间留出束流孔径） */
const PLATE_X = [110, 168, 226, 284, 342, 400, 458, 516];

/** 板间加速区里粒子的行程短划：长度逐段递增，表示每过一个加速区速度更大 */
const GAPS = PLATE_X.slice(0, -1).map((x, index) => {
  const center = (x + PLATE_X[index + 1]) / 2;
  const length = 14 + index * 5.5;

  return { x1: center - length / 2, x2: center + length / 2 };
});
</script>

<template>
  <svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg" class="lc-svg" role="img" aria-label="多级直线加速器与回旋加速的装置长度对比">
    <!-- 束流轴线：很淡的虚线，示意粒子自左侧沿轴线射入 -->
    <line x1="88" y1="86" x2="530" y2="86" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="3 8" opacity="0.35" />
    <!-- 8 块平行板（上下两段留出孔径）与编号 P₁…P₈ -->
    <g stroke="var(--c-text-dim)" stroke-width="3" stroke-linecap="round">
      <template v-for="(x, index) in PLATE_X" :key="x">
        <line :x1="x" y1="46" :x2="x" y2="74" />
        <line :x1="x" y1="98" :x2="x" y2="126" />
        <text :x="x" y="146" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-text-dim)" stroke="none">P</text>
        <text :x="x + 1" y="151" text-anchor="start" font-family="KaTeX_Main" font-size="10" fill="var(--c-text-dim)" stroke="none">
          {{ index + 1 }}
        </text>
      </template>
    </g>
    <!-- 射入的粒子与各加速区里的行程：越往后一段越长 ⇒ 速度越来越大 -->
    <circle cx="88" cy="86" r="4" fill="var(--c-velocity)" />
    <g stroke="var(--c-velocity)" stroke-width="3.4" stroke-linecap="round">
      <line v-for="(gap, index) in GAPS" :key="index" :x1="gap.x1" y1="86" :x2="gap.x2" y2="86" />
    </g>
    <!-- 装置长度：水平双向箭头（双头箭头手写，尖端精确落在两端） -->
    <line x1="80" y1="186" x2="546" y2="186" stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round" />
    <path d="M 70 186 L 81 180.5 L 81 191.5 z" fill="var(--c-text-dim)" />
    <path d="M 556 186 L 545 180.5 L 545 191.5 z" fill="var(--c-text-dim)" />
    <text x="313" y="176" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">装置长度</text>
    <!-- 虚线圆：若让粒子转圈加速，装置可以小得多 -->
    <g opacity="0.55">
      <circle cx="566" cy="88" r="30" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="6 6" />
      <path d="M 582 58 L 571 52.5 L 571 63.5 z" fill="var(--c-accent)" />
    </g>
  </svg>
</template>

<style scoped>
.lc-svg {
  display: block;

  width: 100%;
  height: auto;
}
</style>
