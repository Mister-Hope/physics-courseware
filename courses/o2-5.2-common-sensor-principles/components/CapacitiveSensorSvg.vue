<template>
  <!-- 电容式位移传感器：两平行极板间插入电介质板，被测物体带动电介质板左右移动，改变极板间电介质 -->
  <svg
    viewBox="0 0 460 300"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="电容式位移传感器示意图"
  >
    <g fill="var(--c-neutral-300)">
      <rect x="120" y="92" width="180" height="8" rx="1" />
      <rect x="120" y="208" width="180" height="8" rx="1" />
    </g>
    <g stroke="var(--c-text-dim)" stroke-width="1.8" stroke-linecap="round">
      <line x1="210" y1="92" x2="210" y2="64" />
      <line x1="210" y1="216" x2="210" y2="244" />
    </g>
    <g fill="var(--c-text-dim)">
      <circle cx="210" cy="58" r="3.5" />
      <circle cx="210" cy="250" r="3.5" />
    </g>
    <text x="110" y="86" text-anchor="end" font-size="10" fill="var(--c-text-dim)">极板</text>
    <rect
      :x="170 + shift"
      y="122"
      width="100"
      height="64"
      rx="2"
      fill="var(--c-physics)"
      fill-opacity="0.24"
      stroke="var(--c-physics)"
      stroke-width="1.6"
    />
    <text :x="220 + shift" y="116" text-anchor="middle" font-size="10" fill="var(--c-physics)">
      电介质板
    </text>
    <line
      :x1="270 + shift"
      y1="164"
      :x2="305 + shift"
      y2="164"
      stroke="var(--c-neutral-500)"
      stroke-width="2.6"
      stroke-linecap="round"
    />
    <rect
      :x="305 + shift"
      y="136"
      width="70"
      height="56"
      rx="4"
      fill="var(--c-surface-solid)"
      stroke="var(--c-neutral-500)"
      stroke-width="1.6"
    />
    <text :x="340 + shift" y="205" text-anchor="middle" font-size="10" fill="var(--c-text-dim)">
      被测物体
    </text>
    <g v-if="shift !== 0">
      <CourseArrow
        :from="{ x: 360, y: 120 }"
        :to="{ x: 432, y: 120 }"
        stroke="var(--c-danger)"
        :stroke-width="2.4"
        :head-size="11"
      />
      <text
        x="396"
        y="110"
        text-anchor="middle"
        font-size="10"
        font-family="KaTeX_Main"
        fill="var(--c-danger)"
      >
        位移
      </text>
    </g>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ shift?: number }>(), { shift: 0 });
</script>
