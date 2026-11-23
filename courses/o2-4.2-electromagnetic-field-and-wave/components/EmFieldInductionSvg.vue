<!--
  4.2 P3：变化的磁场产生电场（教材图 4.2-1 的口径）
  —— 左：闭合电路中的感应电流；右：撤去电路后，同一片变化的磁场在空间里仍产生电场。
  颜色：磁场 = 金（--c-accent），电场 = 青绿（--c-physics）。
  step >= 1 才显示“没有闭合电路”的右半部分（点击只新增，不顶跑）。
-->
<template>
  <svg viewBox="0 0 360 210" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <text x="86" y="28" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">有闭合电路</text>
    <text x="266" y="28" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">没有闭合电路</text>
    <rect x="16" y="46" width="140" height="118" rx="3" fill="none" stroke="var(--c-text)" stroke-width="2.4" />
    <FieldDots :x="47" :y="66" :cols="4" :rows="4" :spacing="26" dir="in" />
    <text x="162" y="66" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent)">B</text>
    <CourseArrow :from="{ x: 156, y: 86 }" :to="{ x: 156, y: 128 }" stroke="var(--c-danger)" :stroke-width="2.4" :head-size="9" />
    <text x="164" y="114" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-danger)">I</text>
    <g v-if="step >= 1">
      <rect x="196" y="46" width="140" height="118" rx="3" fill="none" stroke="var(--c-text-mute)" stroke-width="1.5" stroke-dasharray="6 6" />
      <FieldDots :x="227" :y="66" :cols="4" :rows="4" :spacing="26" dir="in" />
      <ellipse cx="266" cy="105" rx="62" ry="52" fill="none" stroke="var(--c-physics)" stroke-width="1.8" stroke-dasharray="8 7" opacity="0.9" />
      <CourseArrow :from="{ x: 328, y: 117 }" :to="{ x: 328, y: 93 }" stroke="var(--c-physics)" :stroke-width="2" :head-size="8" />
      <CourseArrow :from="{ x: 280, y: 53 }" :to="{ x: 252, y: 53 }" stroke="var(--c-physics)" :stroke-width="2" :head-size="8" />
      <CourseArrow :from="{ x: 204, y: 93 }" :to="{ x: 204, y: 117 }" stroke="var(--c-physics)" :stroke-width="2" :head-size="8" />
      <CourseArrow :from="{ x: 252, y: 157 }" :to="{ x: 280, y: 157 }" stroke="var(--c-physics)" :stroke-width="2" :head-size="8" />
      <text x="342" y="110" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-physics)">E</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>
