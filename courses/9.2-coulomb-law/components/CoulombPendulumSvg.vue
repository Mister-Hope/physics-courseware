<script setup lang="ts">
/**
 * 第 12 页（练习一）：两根绝缘细线悬挂于同一点的两个相同带电小球。
 *
 * **常显（干净题目图）**：天花板 + 同一悬点 $O$ + 两根长 $L = 13\ \text{cm}$ 的细线 + 两个带同种电荷的小球，
 * 标出球心间距 $d = 10\ \text{cm}$。
 * `showForces` → 右侧小球的三力（都从**球心**出发）：重力 $mg$ 竖直向下、拉力 $F_T$ 沿细线指向悬点、库仑力 $F$ 水平向外；
 * `showGeometry` → 几何辅助虚线：悬点到球心的竖直距离 $h = 12\ \text{cm}$、半间距 $\dfrac{d}{2}$（$5$–$12$–$13$ 直角三角形）。
 *
 * 尺寸：`#fig` 按 `width: max-content` 排版，⛔ 根 `<svg>` 必须给固有 `width`/`height`，否则图栏塌成 0。
 */
const { showForces = false, showGeometry = false } = defineProps<{
  showForces?: boolean;
  showGeometry?: boolean;
}>();

const VB_W = 420;
/** 只显示「有内容的这一段」：内容纵跨 y≈29…359，上下各留 5 单位的余量，
 *  所以 viewBox 取 y ∈ [24, 364]。绘制尺度（px / 用户单位）与原来完全一致，只是不再留空白。 */
const VB_Y0 = 24;
const VB_H = 340;
const R = 16;

/** 悬点与「1 cm = 20 px」的换算：L = 13 cm、半间距 5 cm、竖直距离 h = 12 cm */
const O = { x: 210, y: 44 };
const LEFT = { x: O.x - 100, y: O.y + 240 };
const RIGHT = { x: O.x + 100, y: O.y + 240 };

const pct = (x: number, y: number) => ({
  xPercent: (x / VB_W) * 100,
  yPercent: ((y - VB_Y0) / VB_H) * 100,
});
</script>

<template>
  <div class="cps-host">
    <svg width="269" height="218" viewBox="0 24 420 340" xmlns="http://www.w3.org/2000/svg">
      <SurfaceHatch :from="{ x: 30, y: 44 }" :to="{ x: 390, y: 44 }" side="above" :thickness="14" :gap="24" :line-width="1.8" />
      <line :x1="O.x" :y1="O.y" :x2="LEFT.x" :y2="LEFT.y" stroke="var(--c-text-dim)" stroke-width="1.5" />
      <line :x1="O.x" :y1="O.y" :x2="RIGHT.x" :y2="RIGHT.y" stroke="var(--c-text-dim)" stroke-width="1.5" />
      <line :x1="LEFT.x" :y1="LEFT.y" :x2="RIGHT.x" :y2="RIGHT.y" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.9" />
      <circle :cx="LEFT.x" :cy="LEFT.y" :r="R" fill="var(--c-danger)" fill-opacity="0.85" />
      <text
        :x="LEFT.x"
        :y="LEFT.y + 1"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="17"
        fill="#0c1122"
      >
        +
      </text>
      <circle :cx="RIGHT.x" :cy="RIGHT.y" :r="R" fill="var(--c-danger)" fill-opacity="0.85" />
      <text
        :x="RIGHT.x"
        :y="RIGHT.y + 1"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="17"
        fill="#0c1122"
      >
        +
      </text>
      <g v-if="showGeometry">
        <line :x1="O.x" :y1="O.y" :x2="O.x" :y2="RIGHT.y" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.9" />
      </g>
      <g v-if="showForces">
        <CourseArrow :from="RIGHT" :to="{ x: RIGHT.x, y: RIGHT.y + 60 }" stroke="var(--c-force)" stroke-width="2.8" />
        <CourseArrow :from="RIGHT" :to="{ x: RIGHT.x - 30, y: RIGHT.y - 72 }" stroke="var(--c-force)" stroke-width="2.8" />
        <CourseArrow :from="RIGHT" :to="{ x: RIGHT.x + 66, y: RIGHT.y }" stroke="var(--c-force)" stroke-width="2.8" />
      </g>
    </svg>
    <ChartLabel v-bind="pct(O.x, O.y)" :parts="[{ tex: 'O' }]" anchor="left" :dx="16" :dy="18" :size="17" color="var(--c-text)" />
    <ChartLabel
      v-bind="pct(272, 164)"
      :parts="[{ tex: 'L = 13\\ \\text{cm}' }]"
      anchor="left"
      :size="16"
      color="var(--c-text-dim)"
      halo
    />
    <ChartLabel
      v-bind="pct((LEFT.x + RIGHT.x) / 2, 320)"
      :parts="[{ tex: 'd = 10\\ \\text{cm}' }]"
      :size="16"
      color="var(--c-text-dim)"
    />
    <ChartLabel
      v-bind="pct(322, 346)"
      :parts="[{ tex: 'mg' }]"
      :visible="showForces"
      anchor="left"
      :size="17"
      color="var(--c-force)"
      halo
    />
    <ChartLabel
      v-bind="pct(272, 206)"
      :parts="[{ tex: 'F_T' }]"
      :visible="showForces"
      anchor="right"
      :size="17"
      color="var(--c-force)"
      halo
    />
    <ChartLabel
      v-bind="pct(372, 264)"
      :parts="[{ tex: 'F' }]"
      :visible="showForces"
      anchor="right"
      :size="17"
      color="var(--c-force)"
      halo
    />
    <ChartLabel
      v-bind="pct(224, 250)"
      :parts="[{ tex: 'h = 12\\ \\text{cm}' }]"
      :visible="showGeometry"
      anchor="left"
      :size="16"
      color="var(--c-accent)"
      halo
    />
    <ChartLabel
      v-bind="pct(258, 262)"
      :parts="[{ tex: '\\dfrac{d}{2}' }]"
      :visible="showGeometry"
      :size="16"
      color="var(--c-accent)"
      halo
    />
  </div>
</template>

<style scoped>
/* `exercise-split` 的 `#fig` 是 width: max-content ⇒ 必须给固有尺寸，否则整张图静默消失。
   高度受「图 | 右栏」的 flex 行高约束（**行高取更高的一侧**）：274 时整页顶出 22.7px；
   压到 246 后行高交回右栏，但右栏又超出 5.6px ⇒ 两侧都略收：
   ① 右栏解析块 gap 收到 `.stack-tight`（0.5rem）；② 这里把 viewBox 的上下空白裁掉
   （y 24…364，绘制尺度不变、图内元素一个不裁），高度 246 → **218**。
   注意 `pct()` 已按新的 viewBox 起点换算，标注位置不受裁剪影响。 */
.cps-host {
  position: relative;

  width: 269px;
  height: 218px;
}

.cps-host > svg {
  display: block;
}
</style>
