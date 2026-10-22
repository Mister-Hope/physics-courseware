<!--
  第 12 页示意图：磁场能量的"存入 / 放出"。
  通电：电源把能量送进线圈的磁场；断电：磁场把能量送给灯泡。
  step 由页面传入：≥1 时出现"断电"那一条。
-->
<script setup lang="ts">
defineProps<{
  /** 当前点击步数：0 = 只显示通电，≥1 = 也显示断电 */
  step?: number;
}>();
</script>

<template>
  <svg viewBox="5 35 610 115" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 三个环节 -->
    <rect x="20" y="46" width="140" height="68" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.4" />
    <text x="90" y="86" text-anchor="middle" font-size="17" fill="var(--c-text)">电源</text>

    <rect x="235" y="46" width="150" height="68" rx="14" fill="var(--c-accent-soft)" stroke="var(--c-accent)" stroke-width="1.4" />
    <text x="310" y="86" text-anchor="middle" font-size="17" fill="var(--c-accent)">线圈的磁场</text>

    <rect x="460" y="46" width="140" height="68" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.4" />
    <text x="530" y="86" text-anchor="middle" font-size="17" fill="var(--c-text)">灯泡</text>

    <!-- 通电：电源 → 磁场 -->
    <CourseArrow :from="{ x: 170, y: 72 }" :to="{ x: 230, y: 72 }" stroke="var(--c-accent)" :stroke-width="3" />
    <text x="200" y="62" text-anchor="middle" font-size="13" fill="var(--c-accent)">通电</text>

    <!-- 断电：磁场 → 灯泡 -->
    <g v-if="(step ?? 0) >= 1">
      <CourseArrow :from="{ x: 390, y: 88 }" :to="{ x: 455, y: 88 }" stroke="var(--c-accent-2)" :stroke-width="3" />
      <text x="422" y="106" text-anchor="middle" font-size="13" fill="var(--c-accent-2)">断电</text>
    </g>
  </svg>
</template>
