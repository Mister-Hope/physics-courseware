<!--
  第 13 页框图：无线电接收装置。
  天线 → 调谐 → 解调 → 放大 → 扬声器。
  step 累加高亮：1 天线接收，2 调谐选台，3 解调，4 放大，5 扬声器发声。
-->
<script setup lang="ts">
defineProps<{
  /** 0 = 只显示装置；1–5 = 依次高亮五级 */
  step?: number;
}>();
</script>

<template>
  <svg viewBox="0 0 880 220" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 入射电磁波 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round" opacity="0.7">
      <path d="M 8 88 A 14 14 0 0 1 8 108" />
      <path d="M 22 80 A 24 24 0 0 1 22 116" opacity="0.6" />
      <path d="M 36 72 A 34 34 0 0 1 36 124" opacity="0.4" />
    </g>
    <text x="10" y="62" font-size="12" fill="var(--c-text-dim)">电磁波</text>
    <!-- 天线 -->
    <g>
      <rect v-if="(step ?? 0) >= 1" x="62" y="62" width="156" height="72" rx="18" fill="none" stroke="var(--c-accent)" stroke-width="6" opacity="0.22" />
      <rect
        x="70"
        y="70"
        width="140"
        height="56"
        rx="14"
        fill="var(--c-surface)"
        :stroke="(step ?? 0) >= 1 ? 'var(--c-accent)' : 'var(--c-border)'"
        :stroke-width="(step ?? 0) >= 1 ? 2.2 : 1.2"
        opacity="0.6"
      />
      <text x="140" y="94" text-anchor="middle" font-size="16" font-weight="700" :fill="(step ?? 0) >= 1 ? 'var(--c-accent)' : 'var(--c-text)'">天线</text>
      <text x="140" y="114" text-anchor="middle" font-size="11" fill="var(--c-text-dim)">接收电磁波</text>
      <circle v-if="(step ?? 0) >= 1" cx="70" cy="70" r="11" fill="var(--c-accent)" />
      <text v-if="(step ?? 0) >= 1" x="70" y="74.5" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c-bg)">1</text>
    </g>
    <!-- 调谐 -->
    <g>
      <rect v-if="(step ?? 0) >= 2" x="242" y="62" width="156" height="72" rx="18" fill="none" stroke="var(--c-accent)" stroke-width="6" opacity="0.22" />
      <rect
        x="250"
        y="70"
        width="140"
        height="56"
        rx="14"
        fill="var(--c-surface)"
        :stroke="(step ?? 0) >= 2 ? 'var(--c-accent)' : 'var(--c-border)'"
        :stroke-width="(step ?? 0) >= 2 ? 2.2 : 1.2"
        opacity="0.6"
      />
      <text x="320" y="94" text-anchor="middle" font-size="16" font-weight="700" :fill="(step ?? 0) >= 2 ? 'var(--c-accent)' : 'var(--c-text)'">调谐</text>
      <text x="320" y="114" text-anchor="middle" font-size="11" fill="var(--c-text-dim)">选出所需频率</text>
      <circle v-if="(step ?? 0) >= 2" cx="250" cy="70" r="11" fill="var(--c-accent)" />
      <text v-if="(step ?? 0) >= 2" x="250" y="74.5" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c-bg)">2</text>
    </g>
    <!-- 解调 -->
    <g>
      <rect v-if="(step ?? 0) >= 3" x="422" y="62" width="156" height="72" rx="18" fill="none" stroke="var(--c-accent)" stroke-width="6" opacity="0.22" />
      <rect
        x="430"
        y="70"
        width="140"
        height="56"
        rx="14"
        fill="var(--c-surface)"
        :stroke="(step ?? 0) >= 3 ? 'var(--c-accent)' : 'var(--c-border)'"
        :stroke-width="(step ?? 0) >= 3 ? 2.2 : 1.2"
        opacity="0.6"
      />
      <text x="500" y="94" text-anchor="middle" font-size="16" font-weight="700" :fill="(step ?? 0) >= 3 ? 'var(--c-accent)' : 'var(--c-text)'">解调</text>
      <text x="500" y="114" text-anchor="middle" font-size="11" fill="var(--c-text-dim)">取出低频信号</text>
      <circle v-if="(step ?? 0) >= 3" cx="430" cy="70" r="11" fill="var(--c-accent)" />
      <text v-if="(step ?? 0) >= 3" x="430" y="74.5" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c-bg)">3</text>
    </g>
    <!-- 放大 -->
    <g>
      <rect v-if="(step ?? 0) >= 4" x="602" y="62" width="106" height="72" rx="18" fill="none" stroke="var(--c-accent)" stroke-width="6" opacity="0.22" />
      <rect
        x="610"
        y="70"
        width="90"
        height="56"
        rx="14"
        fill="var(--c-surface)"
        :stroke="(step ?? 0) >= 4 ? 'var(--c-accent)' : 'var(--c-border)'"
        :stroke-width="(step ?? 0) >= 4 ? 2.2 : 1.2"
        opacity="0.6"
      />
      <text x="655" y="94" text-anchor="middle" font-size="16" font-weight="700" :fill="(step ?? 0) >= 4 ? 'var(--c-accent)' : 'var(--c-text)'">放大</text>
      <text x="655" y="114" text-anchor="middle" font-size="11" fill="var(--c-text-dim)">增强信号</text>
      <circle v-if="(step ?? 0) >= 4" cx="610" cy="70" r="11" fill="var(--c-accent)" />
      <text v-if="(step ?? 0) >= 4" x="610" y="74.5" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c-bg)">4</text>
    </g>
    <!-- 扬声器 -->
    <g>
      <rect v-if="(step ?? 0) >= 5" x="742" y="62" width="126" height="72" rx="18" fill="none" stroke="var(--c-accent)" stroke-width="6" opacity="0.22" />
      <rect
        x="750"
        y="70"
        width="110"
        height="56"
        rx="14"
        fill="var(--c-surface)"
        :stroke="(step ?? 0) >= 5 ? 'var(--c-accent)' : 'var(--c-border)'"
        :stroke-width="(step ?? 0) >= 5 ? 2.2 : 1.2"
        opacity="0.6"
      />
      <text x="805" y="94" text-anchor="middle" font-size="16" font-weight="700" :fill="(step ?? 0) >= 5 ? 'var(--c-accent)' : 'var(--c-text)'">扬声器</text>
      <text x="805" y="114" text-anchor="middle" font-size="11" fill="var(--c-text-dim)">还原声音</text>
      <circle v-if="(step ?? 0) >= 5" cx="750" cy="70" r="11" fill="var(--c-accent)" />
      <text v-if="(step ?? 0) >= 5" x="750" y="74.5" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c-bg)">5</text>
      <g v-if="(step ?? 0) >= 5" fill="none" stroke="var(--c-accent)" stroke-width="1.5" stroke-linecap="round">
        <path d="M 864 86 A 12 12 0 0 1 864 110" opacity="0.7" />
        <path d="M 872 78 A 20 20 0 0 1 872 118" opacity="0.4" />
      </g>
    </g>
    <!-- 连线 -->
    <CourseArrow :from="{ x: 212, y: 98 }" :to="{ x: 246, y: 98 }" stroke="var(--c-text-dim)" :stroke-width="1.8" :head-size="7" />
    <CourseArrow :from="{ x: 392, y: 98 }" :to="{ x: 426, y: 98 }" stroke="var(--c-text-dim)" :stroke-width="1.8" :head-size="7" />
    <CourseArrow :from="{ x: 572, y: 98 }" :to="{ x: 606, y: 98 }" stroke="var(--c-text-dim)" :stroke-width="1.8" :head-size="7" />
    <CourseArrow :from="{ x: 702, y: 98 }" :to="{ x: 746, y: 98 }" stroke="var(--c-text-dim)" :stroke-width="1.8" :head-size="7" />
    <!-- 下方波形态标注 -->
    <text x="320" y="156" text-anchor="middle" font-size="11.5" fill="var(--c-text-dim)">挑选频率相同的信号</text>
    <text x="500" y="156" text-anchor="middle" font-size="11.5" fill="var(--c-text-dim)">高频 → 低频</text>
  </svg>
</template>
