<!--
  第 8 页框图：无线电发射装置。
  信号源 → 调制器 → 天线；振荡器产生高频载波送入调制器。
  step 累加高亮：1 = 振荡器产生载波，2 = 调制器把信号加到载波上，3 = 天线辐射。
-->
<script setup lang="ts">
defineProps<{
  /** 0 = 只显示装置；1/2/3 = 依次高亮振荡器、调制器、天线 */
  step?: number;
}>();
</script>

<template>
  <svg viewBox="0 0 880 260" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 信号源 -->
    <g>
      <rect x="70" y="60" width="160" height="56" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.2" opacity="0.6" />
      <text x="150" y="84" text-anchor="middle" font-size="16" font-weight="700" fill="var(--c-text)">信号源</text>
      <text x="150" y="104" text-anchor="middle" font-size="11.5" fill="var(--c-text-dim)">声音、图像 → 电信号</text>
    </g>
    <!-- 调制器 -->
    <g>
      <rect v-if="(step ?? 0) >= 2" x="342" y="52" width="176" height="72" rx="18" fill="none" stroke="var(--c-accent)" stroke-width="6" opacity="0.22" />
      <rect
        x="350"
        y="60"
        width="160"
        height="56"
        rx="14"
        fill="var(--c-surface)"
        :stroke="(step ?? 0) >= 2 ? 'var(--c-accent)' : 'var(--c-border)'"
        :stroke-width="(step ?? 0) >= 2 ? 2.2 : 1.2"
        opacity="0.6"
      />
      <text x="430" y="84" text-anchor="middle" font-size="16" font-weight="700" :fill="(step ?? 0) >= 2 ? 'var(--c-accent)' : 'var(--c-text)'">调制器</text>
      <text x="430" y="104" text-anchor="middle" font-size="11.5" fill="var(--c-text-dim)">信号加到载波上</text>
      <circle v-if="(step ?? 0) >= 2" cx="350" cy="60" r="11" fill="var(--c-accent)" />
      <text v-if="(step ?? 0) >= 2" x="350" y="64.5" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c-bg)">2</text>
    </g>
    <!-- 振荡器 -->
    <g>
      <rect v-if="(step ?? 0) >= 1" x="342" y="162" width="176" height="72" rx="18" fill="none" stroke="var(--c-accent)" stroke-width="6" opacity="0.22" />
      <rect
        x="350"
        y="170"
        width="160"
        height="56"
        rx="14"
        fill="var(--c-surface)"
        :stroke="(step ?? 0) >= 1 ? 'var(--c-accent)' : 'var(--c-border)'"
        :stroke-width="(step ?? 0) >= 1 ? 2.2 : 1.2"
        opacity="0.6"
      />
      <text x="430" y="194" text-anchor="middle" font-size="16" font-weight="700" :fill="(step ?? 0) >= 1 ? 'var(--c-accent)' : 'var(--c-text)'">振荡器</text>
      <text x="430" y="214" text-anchor="middle" font-size="11.5" fill="var(--c-text-dim)">产生高频载波</text>
      <circle v-if="(step ?? 0) >= 1" cx="350" cy="170" r="11" fill="var(--c-accent)" />
      <text v-if="(step ?? 0) >= 1" x="350" y="174.5" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c-bg)">1</text>
    </g>
    <!-- 天线 -->
    <g>
      <rect v-if="(step ?? 0) >= 3" x="652" y="52" width="176" height="72" rx="18" fill="none" stroke="var(--c-accent)" stroke-width="6" opacity="0.22" />
      <rect
        x="660"
        y="60"
        width="160"
        height="56"
        rx="14"
        fill="var(--c-surface)"
        :stroke="(step ?? 0) >= 3 ? 'var(--c-accent)' : 'var(--c-border)'"
        :stroke-width="(step ?? 0) >= 3 ? 2.2 : 1.2"
        opacity="0.6"
      />
      <text x="740" y="84" text-anchor="middle" font-size="16" font-weight="700" :fill="(step ?? 0) >= 3 ? 'var(--c-accent)' : 'var(--c-text)'">天线</text>
      <text x="740" y="104" text-anchor="middle" font-size="11.5" fill="var(--c-text-dim)">向空间辐射电磁波</text>
      <circle v-if="(step ?? 0) >= 3" cx="660" cy="60" r="11" fill="var(--c-accent)" />
      <text v-if="(step ?? 0) >= 3" x="660" y="64.5" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c-bg)">3</text>
      <g v-if="(step ?? 0) >= 3" fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 826 76 A 18 18 0 0 1 826 100" opacity="0.7" />
        <path d="M 834 68 A 30 30 0 0 1 834 108" opacity="0.45" />
        <path d="M 842 60 A 42 42 0 0 1 842 116" opacity="0.25" />
      </g>
    </g>
    <!-- 连线：信号源 → 调制器 -->
    <CourseArrow :from="{ x: 232, y: 88 }" :to="{ x: 346, y: 88 }" stroke="var(--c-text-dim)" :stroke-width="1.8" :head-size="8" />
    <text x="289" y="78" text-anchor="middle" font-size="11.5" fill="var(--c-text-dim)">声音、图像信号</text>
    <!-- 连线：调制器 → 天线 -->
    <CourseArrow :from="{ x: 512, y: 88 }" :to="{ x: 656, y: 88 }" stroke="var(--c-text-dim)" :stroke-width="1.8" :head-size="8" />
    <text v-if="(step ?? 0) >= 2" x="584" y="78" text-anchor="middle" font-size="11.5" fill="var(--c-accent)">高频已调波</text>
    <!-- 连线：振荡器 → 调制器 -->
    <CourseArrow :from="{ x: 430, y: 168 }" :to="{ x: 430, y: 120 }" stroke="var(--c-text-dim)" :stroke-width="1.8" :head-size="8" />
    <text v-if="(step ?? 0) >= 1" x="440" y="146" font-size="11.5" fill="var(--c-accent)">高频载波</text>
  </svg>
</template>
