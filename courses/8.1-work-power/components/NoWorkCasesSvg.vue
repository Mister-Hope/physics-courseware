<script setup lang="ts">
/**
 * 辨析图（740×250，三栏）：甲 加速跑——地面摩擦力作用在脚与地面的接触点，接触点在力的方向上没有位移 ⇒ 不做功；
 * 乙 蹲起——地面支持力同样作用在脚底接触点 ⇒ 不做功；
 * 丙 缓慢拉动行李箱绕椭圆形操场一圈——力的作用点（行李箱）上，拉力与每一小段位移都成锐角（图中的 Δs）⇒ 正功。
 * 干净版（showAnalysis = false）只有鞋/人/行李箱与轨迹；分析类标注点击后才出。
 */
const { showAnalysis = false } = defineProps<{
  /** 点击后出现：接触点、力箭头与位移标注 */
  showAnalysis?: boolean;
}>();
</script>

<template>
  <svg viewBox="0 0 740 250" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="加速跑、蹲起与拉动行李箱绕操场一圈三种情形">
    <!-- ============ 甲 加速跑 ============ -->
    <text x="20" y="24" font-size="18" fill="var(--c-accent)">甲</text>
    <SurfaceHatch :from="{ x: 24, y: 205 }" :to="{ x: 240, y: 205 }" side="below" :thickness="10" :gap="18" />
    <rect x="96" y="181" width="56" height="24" rx="7" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <line x1="124" y1="181" x2="150" y2="124" stroke="var(--c-text)" stroke-width="3" stroke-linecap="round" />
    <g v-if="showAnalysis">
      <circle cx="126" cy="205" r="4.5" fill="var(--c-accent)" />
      <CourseArrow :from="{ x: 126, y: 205 }" :to="{ x: 198, y: 205 }" stroke="var(--c-force)" :stroke-width="3.2" />
      <text x="172" y="190" text-anchor="middle" font-size="18" fill="var(--c-force)" class="nwc-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="13" dy="5">f</tspan>
      </text>
      <CourseArrow :from="{ x: 176, y: 142 }" :to="{ x: 226, y: 142 }" stroke="var(--c-velocity)" :stroke-width="2.4" stroke-dasharray="7 5" label="v" :label-dy="-10" />
    </g>
    <!-- ============ 乙 蹲起 ============ -->
    <text x="262" y="24" font-size="18" fill="var(--c-accent)">乙</text>
    <SurfaceHatch :from="{ x: 266, y: 205 }" :to="{ x: 482, y: 205 }" side="below" :thickness="10" :gap="18" />
    <g fill="none" stroke="var(--c-text)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="378" cy="96" r="13" />
      <line x1="378" y1="109" x2="378" y2="156" />
      <polyline points="378 118 360 138" />
      <polyline points="378 118 396 138" />
      <polyline points="378 156 356 182 344 205" />
      <polyline points="378 156 396 182 404 205" />
    </g>
    <g v-if="showAnalysis">
      <circle cx="344" cy="205" r="4.5" fill="var(--c-accent)" />
      <CourseArrow :from="{ x: 344, y: 205 }" :to="{ x: 344, y: 140 }" stroke="var(--c-physics)" :stroke-width="3.2" />
      <text x="328" y="158" text-anchor="end" font-size="18" fill="var(--c-physics)" class="nwc-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="13" dy="5">N</tspan>
      </text>
    </g>
    <!-- ============ 丙 绕椭圆形操场拉行李箱 ============ -->
    <text x="504" y="24" font-size="18" fill="var(--c-accent)">丙</text>
    <ellipse cx="612" cy="166" rx="100" ry="58" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" stroke-dasharray="7 6" opacity="0.85" />
    <rect x="696" y="152" width="34" height="28" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <g v-if="showAnalysis">
      <CourseArrow :from="{ x: 713, y: 166 }" :to="{ x: 669, y: 122 }" stroke="var(--c-accent)" :stroke-width="3.2" />
      <text x="656" y="118" text-anchor="end" font-size="18" fill="var(--c-accent)" class="nwc-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      </text>
      <CourseArrow :from="{ x: 713, y: 166 }" :to="{ x: 713, y: 114 }" stroke="var(--c-velocity)" :stroke-width="2.4" stroke-dasharray="7 5" />
      <text x="728" y="106" text-anchor="end" font-size="17" fill="var(--c-velocity)" class="nwc-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">Δs</tspan>
      </text>
    </g>
  </svg>
</template>

<style scoped>
.nwc-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
