<script setup lang="ts">
/**
 * 整页示意图（820×240，五个情形排两行，横向拉长压高度）：作用力与反作用力做的功没有必然关系。 颜色约定：绿＝正功（--c-ok）、红＝负功（--c-danger）、灰＝不做功（--c-text-dim）。 甲 一对静摩擦力（叠放物块一起加速）：一正一负 乙 两块磁铁 N 极相斥、松手后各自远离：都做正功 丙
 * 按住一块磁铁、只放另一块：一个做正功、一个不做功 丁 两物块相互压紧、被反向拉开：它们之间的滑动摩擦力都做负功 戊 拉着桌子在地面上拖行：地面对桌子的摩擦力做负功、桌子对地面的摩擦力不做功 分步（页面传 `:step="$clicks"`）：step ≥ 1 出甲，step ≥ 2 出乙丙，step ≥ 3
 * 出丁戊。 力都从各物体的几何中心出发（成对摩擦力求清楚各自作用在哪个物块上）。
 */
const { step = 0 } = defineProps<{
  /** 当前点击步数（页面传 $clicks） */
  step?: number;
}>();
</script>

<template>
  <svg viewBox="0 0 820 240" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="五组作用力与反作用力做功情形的示意图">
    <!-- ==================== 甲：一对静摩擦力（叠放一起加速） ==================== -->
    <g v-if="step >= 1">
      <text x="22" y="22" font-size="18" fill="var(--c-accent)">甲</text>
      <SurfaceHatch :from="{ x: 30, y: 112 }" :to="{ x: 230, y: 112 }" side="below" :thickness="7" :gap="14" />
      <rect x="72" y="82" width="90" height="30" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
      <rect x="84" y="52" width="66" height="30" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
      <CourseArrow :from="{ x: 34, y: 38 }" :to="{ x: 70, y: 38 }" stroke="var(--c-velocity)" :stroke-width="2.4" stroke-dasharray="7 5" />
      <CourseArrow :from="{ x: 117, y: 67 }" :to="{ x: 173, y: 67 }" stroke="var(--c-ok)" :stroke-width="3.2" />
      <CourseArrow :from="{ x: 117, y: 97 }" :to="{ x: 61, y: 97 }" stroke="var(--c-danger)" :stroke-width="3.2" />
    </g>
    <!-- ==================== 乙：两磁铁 N 极相斥、松手 ==================== -->
    <g v-if="step >= 2">
      <text x="292" y="22" font-size="18" fill="var(--c-accent)">乙</text>
      <rect x="350" y="54" width="46" height="30" rx="5" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
      <rect x="416" y="54" width="46" height="30" rx="5" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
      <text x="390" y="75" text-anchor="middle" font-family="KaTeX_Main" font-size="18" fill="var(--c-accent-2)">N</text>
      <text x="424" y="75" text-anchor="middle" font-family="KaTeX_Main" font-size="18" fill="var(--c-accent-2)">N</text>
      <CourseArrow :from="{ x: 373, y: 69 }" :to="{ x: 319, y: 69 }" stroke="var(--c-ok)" :stroke-width="3.2" />
      <CourseArrow :from="{ x: 439, y: 69 }" :to="{ x: 493, y: 69 }" stroke="var(--c-ok)" :stroke-width="3.2" />
    </g>
    <!-- ==================== 丙：按住一块磁铁 ==================== -->
    <g v-if="step >= 2">
      <text x="562" y="22" font-size="18" fill="var(--c-accent)">丙</text>
      <rect x="620" y="52" width="46" height="30" rx="5" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
      <rect x="686" y="52" width="46" height="30" rx="5" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
      <text x="660" y="73" text-anchor="middle" font-family="KaTeX_Main" font-size="18" fill="var(--c-accent-2)">N</text>
      <text x="694" y="73" text-anchor="middle" font-family="KaTeX_Main" font-size="18" fill="var(--c-accent-2)">N</text>
      <line x1="643" y1="14" x2="643" y2="38" stroke="var(--c-text-dim)" stroke-width="3" />
      <line x1="628" y1="38" x2="658" y2="38" stroke="var(--c-text-dim)" stroke-width="3.6" />
      <CourseArrow :from="{ x: 643, y: 67 }" :to="{ x: 589, y: 67 }" stroke="var(--c-text-dim)" :stroke-width="3" />
      <CourseArrow :from="{ x: 709, y: 67 }" :to="{ x: 763, y: 67 }" stroke="var(--c-ok)" :stroke-width="3.2" />
    </g>
    <!-- ==================== 丁：两物块被反向拉开（滑动摩擦力都做负功） ==================== -->
    <g v-if="step >= 3">
      <text x="152" y="150" font-size="18" fill="var(--c-accent)">丁</text>
      <SurfaceHatch :from="{ x: 146, y: 228 }" :to="{ x: 350, y: 228 }" side="below" :thickness="7" :gap="14" />
      <rect x="200" y="170" width="66" height="58" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
      <rect x="266" y="170" width="66" height="58" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
      <CourseArrow :from="{ x: 200, y: 185 }" :to="{ x: 156, y: 185 }" stroke="var(--c-text-dim)" :stroke-width="2.4" />
      <CourseArrow :from="{ x: 332, y: 185 }" :to="{ x: 376, y: 185 }" stroke="var(--c-text-dim)" :stroke-width="2.4" />
      <CourseArrow :from="{ x: 233, y: 209 }" :to="{ x: 289, y: 209 }" stroke="var(--c-danger)" :stroke-width="3.2" />
      <CourseArrow :from="{ x: 299, y: 188 }" :to="{ x: 243, y: 188 }" stroke="var(--c-danger)" :stroke-width="3.2" />
    </g>
    <!-- ==================== 戊：拉桌子在地面拖行 ==================== -->
    <g v-if="step >= 3">
      <text x="432" y="150" font-size="18" fill="var(--c-accent)">戊</text>
      <SurfaceHatch :from="{ x: 412, y: 228 }" :to="{ x: 616, y: 228 }" side="below" :thickness="7" :gap="14" />
      <rect x="500" y="170" width="100" height="42" rx="8" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
      <line x1="514" y1="212" x2="514" y2="228" stroke="var(--c-text-dim)" stroke-width="3" />
      <line x1="586" y1="212" x2="586" y2="228" stroke="var(--c-text-dim)" stroke-width="3" />
      <CourseArrow
        :from="{ x: 592, y: 160 }"
        :to="{ x: 638, y: 160 }"
        stroke="var(--c-velocity)"
        :stroke-width="2.4"
        stroke-dasharray="7 5"
        label="v"
        :label-dy="-10"
      />
      <CourseArrow :from="{ x: 514, y: 228 }" :to="{ x: 464, y: 228 }" stroke="var(--c-danger)" :stroke-width="3.2" />
      <CourseArrow :from="{ x: 586, y: 236 }" :to="{ x: 636, y: 236 }" stroke="var(--c-text-dim)" :stroke-width="3" />
    </g>
  </svg>
</template>
