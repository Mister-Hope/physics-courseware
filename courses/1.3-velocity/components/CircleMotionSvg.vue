<script setup lang="ts">
/**
 * 第 11 页「例题：匀速圆周运动」的示意图（右侧）。
 *
 * 干净状态只给：圆周、起点 A、顺时针方向； `step >= 1`（第一次点击）标出「4 s 回到 A」； `step >= 2`（第二次点击）再标出 t = 2 s 的位置 C、位移 C→A = 2R 与第 2 个 2 s 走的半圈。
 */
defineProps<{ step?: number }>();
</script>

<template>
  <!-- 匀速圆周运动示意图：圆 + 起点 A + 顺时针；点击后依次标出「回到 A」与 C/2R/半圈 -->
  <svg viewBox="0 0 420 240" style="display: block; width: 100%; max-width: 420px; margin: 0 auto">
    <circle cx="210" cy="118" r="76" fill="none" stroke="color-mix(in srgb, var(--c-text-dim) 75%, transparent)" stroke-width="2.4" />
    <circle cx="210" cy="118" r="2.6" fill="color-mix(in srgb, var(--c-text-dim) 75%, transparent)" />
    <CourseArrow :from="{ x: 178, y: 30 }" :to="{ x: 248, y: 30 }" stroke="var(--c-accent)" stroke-width="3" />
    <text x="256" y="35" font-size="15" fill="var(--c-accent)">顺时针</text>
    <circle cx="286" cy="118" r="5.5" fill="var(--c-accent)" />
    <text x="298" y="125" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">A</text>
    <g v-if="step >= 1">
      <circle cx="286" cy="118" r="10" fill="none" stroke="var(--c-accent)" stroke-width="2" opacity="0.9" />
      <text x="210" y="214" text-anchor="middle" font-size="14" fill="var(--c-accent)" stroke="var(--c-bg-soft)" stroke-width="3" paint-order="stroke">4 s 回到 A</text>
    </g>
    <g v-if="step >= 2">
      <path d="M 134 118 A 76 76 0 0 1 286 118" fill="none" stroke="var(--c-velocity)" stroke-width="4" stroke-linecap="round" opacity="0.9" />
      <line x1="134" y1="118" x2="286" y2="118" stroke="color-mix(in srgb, var(--c-text-dim) 85%, transparent)" stroke-width="2" stroke-dasharray="6 5" />
      <circle cx="134" cy="118" r="5.5" fill="var(--c-velocity)" />
      <text x="122" y="125" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-velocity)" text-anchor="end">C</text>
      <text
        x="210"
        y="141"
        font-size="16"
        font-family="KaTeX_Math"
        font-style="italic"
        fill="var(--c-text-dim)"
        text-anchor="middle"
        stroke="var(--c-bg-soft)"
        stroke-width="3"
        paint-order="stroke"
      >
        2R
      </text>
      <text x="210" y="234" text-anchor="middle" font-size="14" fill="var(--c-velocity)" stroke="var(--c-bg-soft)" stroke-width="3" paint-order="stroke">第 2 个 2 s：C → A</text>
    </g>
  </svg>
</template>
