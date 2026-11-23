<template>
  <!-- 应变式力传感器：弹簧钢梁一端固定，自由端受力弯曲，上下表面各贴一片应变片 -->
  <svg
    viewBox="0 0 460 300"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="应变式力传感器结构示意图"
  >
    <rect
      x="396"
      y="96"
      width="26"
      height="126"
      fill="var(--c-surface-solid)"
      stroke="var(--c-neutral-600)"
      stroke-width="1.4"
    />
    <g stroke="var(--c-neutral-500)" stroke-width="1.2" opacity="0.55">
      <line x1="396" y1="122" x2="422" y2="108" />
      <line x1="396" y1="152" x2="422" y2="138" />
      <line x1="396" y1="182" x2="422" y2="168" />
      <line x1="396" y1="212" x2="422" y2="198" />
    </g>
    <line
      v-if="bent"
      x1="56"
      y1="150"
      x2="398"
      y2="150"
      stroke="var(--c-neutral-500)"
      stroke-width="2"
      stroke-dasharray="6 6"
      opacity="0.35"
    />
    <path
      :d="bent ? 'M 56 168 C 150 196 300 150 398 150' : 'M 56 150 L 398 150'"
      fill="none"
      stroke="var(--c-neutral-300)"
      :stroke-width="bent ? 6 : 7"
      stroke-linecap="round"
    />
    <CourseArrow
      :from="{ x: 56, y: 60 }"
      :to="{ x: 56, y: bent ? 164 : 146 }"
      stroke="var(--c-danger)"
      :stroke-width="3"
      :head-size="12"
    />
    <text
      x="30"
      y="104"
      text-anchor="middle"
      font-size="15"
      font-family="KaTeX_Math"
      font-style="italic"
      fill="var(--c-danger)"
    >
      F
    </text>
    <rect
      x="180"
      :y="bent ? 162 : 140"
      width="36"
      height="7"
      rx="1.5"
      fill="var(--c-accent)"
    />
    <rect
      x="180"
      :y="bent ? 177 : 153"
      width="36"
      height="7"
      rx="1.5"
      fill="var(--c-accent)"
    />
    <g stroke="var(--c-text-dim)" stroke-width="1" stroke-linecap="round" opacity="0.8">
      <line x1="244" y1="130" x2="218" :y2="bent ? 166 : 145" />
      <line x1="244" y1="206" x2="218" :y2="bent ? 181 : 158" />
    </g>
    <text x="248" y="126" font-size="11" fill="var(--c-text-dim)">上应变片</text>
    <text x="248" y="210" font-size="11" fill="var(--c-text-dim)">下应变片</text>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ bent?: boolean }>(), { bent: false });
</script>
