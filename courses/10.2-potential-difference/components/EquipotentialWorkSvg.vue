<script setup lang="ts">
/** 第 10 页：在等势面上移动电荷，静电力不做功 ⇒ 等势面与电场线垂直。 正点电荷的电场中取一段圆弧等势面，P 点的静电力沿半径向外，位移沿切线，两者垂直。 */
defineProps<{
  /** 显示静电力、位移与直角标记（点击第 2 步后出现） */
  showAnalysis?: boolean;
}>();
</script>

<template>
  <svg viewBox="0 0 360 300" width="360" height="300">
    <circle cx="80" cy="170" r="14" fill="var(--c-field)" fill-opacity="0.25" stroke="var(--c-field)" stroke-width="1.6" />
    <text x="80" y="175" text-anchor="middle" fill="var(--c-field)" font-size="15" font-weight="700">+</text>
    <path d="M 187 80 A 140 140 0 0 1 187 260" fill="none" stroke="var(--c-physics)" stroke-width="1.8" stroke-dasharray="7 5" />
    <text x="236" y="208" fill="var(--c-physics)" font-size="13">等势面</text>
    <CourseArrow :from="{ x: 113, y: 147 }" :to="{ x: 226, y: 72 }" stroke="var(--c-field)" stroke-width="1.8" />
    <CourseArrow :from="{ x: 124, y: 170 }" :to="{ x: 258, y: 170 }" stroke="var(--c-field)" stroke-width="1.8" />
    <CourseArrow :from="{ x: 113, y: 193 }" :to="{ x: 226, y: 268 }" stroke="var(--c-field)" stroke-width="1.8" />
    <circle cx="212" cy="122" r="8" fill="var(--c-force)" stroke="var(--c-neutral-50)" stroke-width="1.4" />
    <text x="212" y="126.5" text-anchor="middle" fill="var(--c-neutral-50)" font-size="12" font-weight="700">+</text>
    <circle cx="212" cy="218" r="5" fill="var(--c-neutral-300)" />
    <text x="194" y="112" text-anchor="end" fill="var(--c-text-dim)" font-size="15" font-style="italic" font-family="KaTeX_Math">P</text>
    <text x="194" y="232" text-anchor="end" fill="var(--c-text-dim)" font-size="15" font-style="italic" font-family="KaTeX_Math">Q</text>
    <g v-if="showAnalysis">
      <CourseArrow :from="{ x: 212, y: 122 }" :to="{ x: 272, y: 100 }" stroke="var(--c-force)" stroke-width="2.4" />
      <text x="282" y="102" fill="var(--c-force)" font-size="15" font-style="italic" font-family="KaTeX_Math">F</text>
      <CourseArrow :from="{ x: 212, y: 122 }" :to="{ x: 232, y: 176 }" stroke="var(--c-velocity)" stroke-width="2.4" stroke-dasharray="6 4" />
      <text x="240" y="190" fill="var(--c-velocity)" font-size="15" font-style="italic" font-family="KaTeX_Math">s</text>
      <path d="M 225 117 L 230 130 L 217 135" fill="none" stroke="var(--c-neutral-300)" stroke-width="1.6" />
    </g>
  </svg>
</template>
