<script setup lang="ts">
/** 第 11 页：几种电场的等势面与电场线。 左：匀强电场（平行板），等势面是垂直于电场线的一族平面； 右：正点电荷，等势面是以电荷为球心的一族球面。 showLabels 打开后显示电势数值、等势面/电场线标注与垂直标记。 */
defineProps<{
  /** 显示数值与垂直标记（点击后出现） */
  showLabels?: boolean;
}>();
</script>

<template>
  <svg viewBox="0 0 700 240" width="700" height="240">
    <rect x="26" y="34" width="12" height="186" rx="3" fill="var(--c-accent)" fill-opacity="0.28" stroke="var(--c-accent)" stroke-width="1.4" />
    <text x="18" y="132" text-anchor="end" fill="var(--c-accent)" font-size="14" font-weight="700">+</text>
    <rect x="332" y="34" width="12" height="186" rx="3" fill="var(--c-accent-2)" fill-opacity="0.24" stroke="var(--c-accent-2)" stroke-width="1.4" />
    <text x="352" y="132" fill="var(--c-accent-2)" font-size="14" font-weight="700">−</text>
    <line x1="46" y1="78" x2="326" y2="78" stroke="var(--c-field)" stroke-width="1.6" opacity="0.45" />
    <line x1="46" y1="127" x2="326" y2="127" stroke="var(--c-field)" stroke-width="1.6" opacity="0.45" />
    <line x1="46" y1="176" x2="326" y2="176" stroke="var(--c-field)" stroke-width="1.6" opacity="0.45" />
    <CourseArrow :from="{ x: 210, y: 78 }" :to="{ x: 270, y: 78 }" stroke="var(--c-field)" stroke-width="1.6" opacity="0.85" />
    <CourseArrow :from="{ x: 210, y: 127 }" :to="{ x: 270, y: 127 }" stroke="var(--c-field)" stroke-width="1.6" opacity="0.85" />
    <CourseArrow :from="{ x: 210, y: 176 }" :to="{ x: 270, y: 176 }" stroke="var(--c-field)" stroke-width="1.6" opacity="0.85" />
    <line x1="90" y1="42" x2="90" y2="212" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="6 4" />
    <line x1="170" y1="42" x2="170" y2="212" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="6 4" />
    <line x1="250" y1="42" x2="250" y2="212" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="6 4" />
    <text x="182" y="232" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">匀强电场</text>
    <line x1="368" y1="24" x2="368" y2="232" stroke="var(--c-border)" stroke-width="1.2" stroke-dasharray="5 5" />
    <circle cx="538" cy="124" r="13" fill="var(--c-field)" fill-opacity="0.25" stroke="var(--c-field)" stroke-width="1.6" />
    <text x="538" y="129" text-anchor="middle" fill="var(--c-field)" font-size="14" font-weight="700">+</text>
    <CourseArrow :from="{ x: 552, y: 124 }" :to="{ x: 646, y: 124 }" stroke="var(--c-field)" stroke-width="1.6" />
    <CourseArrow :from="{ x: 524, y: 124 }" :to="{ x: 430, y: 124 }" stroke="var(--c-field)" stroke-width="1.6" />
    <CourseArrow :from="{ x: 538, y: 110 }" :to="{ x: 538, y: 36 }" stroke="var(--c-field)" stroke-width="1.6" />
    <CourseArrow :from="{ x: 538, y: 138 }" :to="{ x: 538, y: 212 }" stroke="var(--c-field)" stroke-width="1.6" />
    <circle cx="538" cy="124" r="30" fill="none" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="6 4" />
    <circle cx="538" cy="124" r="45" fill="none" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="6 4" />
    <circle cx="538" cy="124" r="90" fill="none" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="6 4" />
    <text x="538" y="232" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">正点电荷的电场</text>
    <g v-if="showLabels">
      <text x="90" y="30" text-anchor="middle" fill="var(--c-accent-2)" font-size="12" font-family="KaTeX_Main">60 V</text>
      <text x="170" y="30" text-anchor="middle" fill="var(--c-accent-2)" font-size="12" font-family="KaTeX_Main">40 V</text>
      <text x="250" y="30" text-anchor="middle" fill="var(--c-accent-2)" font-size="12" font-family="KaTeX_Main">20 V</text>
      <text x="124" y="62" fill="var(--c-field)" font-size="12">电场线</text>
      <text x="98" y="202" fill="var(--c-physics)" font-size="12">等势面</text>
      <path d="M 90 115 L 102 115 L 102 127" fill="none" stroke="var(--c-neutral-300)" stroke-width="1.3" />
      <path d="M 170 115 L 182 115 L 182 127" fill="none" stroke="var(--c-neutral-300)" stroke-width="1.3" />
      <path d="M 250 115 L 262 115 L 262 127" fill="none" stroke="var(--c-neutral-300)" stroke-width="1.3" />
      <text x="565" y="101" fill="var(--c-physics)" font-size="12" font-family="KaTeX_Main">90 V</text>
      <text x="588" y="86" fill="var(--c-physics)" font-size="12" font-family="KaTeX_Main">60 V</text>
      <text x="622" y="58" fill="var(--c-physics)" font-size="12" font-family="KaTeX_Main">30 V</text>
    </g>
  </svg>
</template>
