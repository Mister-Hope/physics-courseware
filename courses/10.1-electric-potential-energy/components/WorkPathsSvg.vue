<!-- 第 4 页：匀强电场中把 q 由 A 沿直线 AB、沿折线 AMB 移到 B；θ 与 |AM| 按步叠加 -->
<script setup lang="ts">
defineProps<{
  /** 显示力 F 与偏角 θ（第 1 次点击） */
  showAngle?: boolean;
  /** 显示沿电场方向的距离 |AM| 与直角标记（第 2 次点击） */
  showDim?: boolean;
}>();
</script>

<template>
  <svg
    viewBox="0 0 440 250"
    width="440"
    height="250"
    xmlns="http://www.w3.org/2000/svg"
    font-family="Inter, system-ui, sans-serif"
    role="img"
    aria-label="匀强电场中从 A 到 B 的直线路径与折线路径"
  >
    <CourseArrow v-for="y in [45, 105, 195]" :key="y" :from="{ x: 44, y }" :to="{ x: 400, y }" stroke="var(--c-field)" stroke-width="1.4" opacity="0.45" />
    <text x="412" y="41" text-anchor="end" fill="var(--c-accent)" font-size="19" font-style="italic" font-family="KaTeX_Math">E</text>
    <path d="M 70 165 L 260 165" fill="none" stroke="var(--c-physics)" stroke-width="2.4" />
    <path d="M 260 165 L 260 60" fill="none" stroke="var(--c-physics)" stroke-width="2.4" stroke-dasharray="7 5" />
    <path d="M 70 165 L 260 60" fill="none" stroke="var(--c-accent-2)" stroke-width="2.4" stroke-dasharray="7 5" />
    <circle cx="260" cy="165" r="4" fill="var(--c-neutral-300)" />
    <circle cx="260" cy="60" r="5" fill="none" stroke="var(--c-accent)" stroke-width="2" />
    <circle cx="70" cy="165" r="10" fill="var(--c-force)" fill-opacity="0.22" stroke="var(--c-force)" stroke-width="2.2" />
    <path d="M 64 165 H 76 M 70 159 V 171" stroke="var(--c-force)" stroke-width="1.8" stroke-linecap="round" />
    <text x="70" y="193" text-anchor="middle" fill="var(--c-accent)" font-size="20" font-family="KaTeX_Math" font-style="italic">A</text>
    <text x="272" y="173" fill="var(--c-accent)" font-size="20" font-family="KaTeX_Math" font-style="italic">M</text>
    <text x="274" y="56" fill="var(--c-accent)" font-size="20" font-family="KaTeX_Math" font-style="italic">B</text>
    <g v-if="showAngle">
      <CourseArrow :from="{ x: 70, y: 165 }" :to="{ x: 146, y: 165 }" stroke="var(--c-force)" stroke-width="3" />
      <text
        x="140"
        y="150"
        text-anchor="middle"
        fill="var(--c-force)"
        font-size="19"
        font-family="KaTeX_Math"
        font-style="italic"
        stroke="var(--c-bg)"
        stroke-width="3"
        paint-order="stroke"
      >
        F
      </text>
      <path d="M 108 165 A 38 38 0 0 0 103.6 147.3" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" />
      <text x="118" y="158" fill="var(--c-text-dim)" font-size="19" font-style="italic" font-family="KaTeX_Math">θ</text>
    </g>
    <g v-if="showDim">
      <path d="M 250 165 L 250 155 L 260 155" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" />
      <line x1="70" y1="210" x2="260" y2="210" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <line x1="70" y1="204" x2="70" y2="216" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <line x1="260" y1="204" x2="260" y2="216" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <text x="165" y="232" text-anchor="middle" fill="var(--c-text-dim)" font-size="18">
        <tspan font-family="KaTeX_Main">|</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic">AM</tspan>
        <tspan font-family="KaTeX_Main">|</tspan>
      </text>
    </g>
  </svg>
</template>
