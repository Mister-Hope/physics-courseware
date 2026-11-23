<!--
  第 4 页示意图：开放电路的三步演化。
  甲：闭合 LC 电路，电场集中在极板间、磁场集中在线圈内；
  乙：拉开极板、减小正对面积，电场和磁场扩展到外部；
  丙：开放电路，最终可以演化成一条导线（天线）。
  step：0 = 只显示甲，1 = 显示乙，2 = 显示丙。
-->
<script setup lang="ts">
defineProps<{
  /** 当前点击步数：0 = 甲，≥1 = 乙，≥2 = 丙 */
  step?: number;
}>();
</script>

<template>
  <svg viewBox="0 0 880 320" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 甲：闭合电路 -->
    <g>
      <rect
        x="20"
        y="30"
        width="260"
        height="210"
        rx="14"
        fill="var(--c-surface)"
        stroke="var(--c-border)"
        stroke-width="1.2"
        opacity="0.55"
      />
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 60 90 H 100" />
        <path d="M 120 90 H 200 V 118" />
        <path d="M 200 208 V 210 H 60 V 90" />
      </g>
      <!-- 电容器：两平行板 -->
      <g stroke="var(--c-accent-2)" stroke-width="2.4" stroke-linecap="round">
        <line x1="102" y1="76" x2="102" y2="104" />
        <line x1="118" y1="76" x2="118" y2="104" />
      </g>
      <!-- 极板间的电场 -->
      <g stroke="var(--c-accent)" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.75">
        <line x1="104" y1="83" x2="116" y2="83" />
        <line x1="104" y1="90" x2="116" y2="90" />
        <line x1="104" y1="97" x2="116" y2="97" />
      </g>
      <!-- 线圈：连续半圆，不是一叠椭圆 -->
      <path
        d="M 200 118 A 15 15 0 0 1 200 148 A 15 15 0 0 1 200 178 A 15 15 0 0 1 200 208"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <!-- 线圈周围的磁场 -->
      <g
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.1"
        stroke-dasharray="4 4"
        opacity="0.3"
      >
        <ellipse cx="200" cy="163" rx="27" ry="46" />
        <ellipse cx="200" cy="163" rx="39" ry="58" />
      </g>
      <text
        x="150"
        y="260"
        text-anchor="middle"
        font-size="16"
        font-weight="700"
        fill="var(--c-accent)"
      >
        甲　闭合电路
      </text>
      <text x="150" y="282" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">
        电场集中在极板间，磁场集中在线圈内
      </text>
      <text x="150" y="300" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">
        辐射的电磁波很少
      </text>
    </g>
    <!-- 乙：拉开极板、减小正对面积 -->
    <g v-if="(step ?? 0) >= 1">
      <rect
        x="310"
        y="30"
        width="260"
        height="210"
        rx="14"
        fill="var(--c-surface)"
        stroke="var(--c-border)"
        stroke-width="1.2"
        opacity="0.55"
      />
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 350 90 H 380" />
        <path d="M 420 90 H 490 V 118" />
        <path d="M 490 208 V 210 H 350 V 90" />
      </g>
      <!-- 极板被拉开、正对面积变小 -->
      <g stroke="var(--c-accent-2)" stroke-width="2.4" stroke-linecap="round">
        <line x1="382" y1="80" x2="382" y2="100" />
        <line x1="418" y1="80" x2="418" y2="100" />
      </g>
      <!-- 电场线向外部扩展 -->
      <g
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.2"
        stroke-dasharray="3 3"
        opacity="0.7"
      >
        <path d="M 384 84 C 394 70, 406 70, 416 84" />
        <path d="M 384 90 H 416" />
        <path d="M 384 96 C 394 110, 406 110, 416 96" />
        <path d="M 378 76 C 390 54, 410 54, 422 76" opacity="0.45" />
        <path d="M 378 104 C 390 126, 410 126, 422 104" opacity="0.45" />
      </g>
      <!-- 线圈与扩大的磁场 -->
      <path
        d="M 490 118 A 15 15 0 0 1 490 148 A 15 15 0 0 1 490 178 A 15 15 0 0 1 490 208"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <g
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.1"
        stroke-dasharray="4 4"
        opacity="0.28"
      >
        <ellipse cx="490" cy="163" rx="34" ry="52" />
        <ellipse cx="490" cy="163" rx="48" ry="66" />
      </g>
      <text
        x="440"
        y="260"
        text-anchor="middle"
        font-size="16"
        font-weight="700"
        fill="var(--c-accent)"
      >
        乙　拉开极板
      </text>
      <text x="440" y="282" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">
        电场和磁场扩展到外部
      </text>
      <text x="440" y="300" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">
        辐射本领增强
      </text>
    </g>
    <!-- 丙：开放电路 -->
    <g v-if="(step ?? 0) >= 2">
      <rect
        x="600"
        y="30"
        width="260"
        height="210"
        rx="14"
        fill="var(--c-surface)"
        stroke="var(--c-border)"
        stroke-width="1.2"
        opacity="0.55"
      />
      <!-- 一条导线，顶部的“极板”展开成天线 -->
      <g fill="none" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round">
        <path d="M 720 210 V 80" />
        <path d="M 680 80 H 760" />
      </g>
      <circle cx="720" cy="80" r="3" fill="var(--c-accent)" />
      <!-- 向外辐射的电磁波 -->
      <g
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.5"
        stroke-linecap="round"
        opacity="0.55"
      >
        <path d="M 740 90 A 30 30 0 0 1 740 150" />
        <path d="M 700 90 A 30 30 0 0 0 700 150" />
        <path d="M 758 72 A 48 48 0 0 1 758 168" opacity="0.4" />
        <path d="M 682 72 A 48 48 0 0 0 682 168" opacity="0.4" />
      </g>
      <text
        x="730"
        y="260"
        text-anchor="middle"
        font-size="16"
        font-weight="700"
        fill="var(--c-accent)"
      >
        丙　开放电路
      </text>
      <text x="730" y="282" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">
        电场和磁场分散到空间
      </text>
      <text x="730" y="300" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">
        有效辐射电磁波
      </text>
    </g>
    <!-- 演化箭头：下一步出现时才画 -->
    <CourseArrow
      v-if="(step ?? 0) >= 1"
      :from="{ x: 282, y: 135 }"
      :to="{ x: 307, y: 135 }"
      stroke="var(--c-text-dim)"
      :stroke-width="1.8"
      :head-size="7"
    />
    <CourseArrow
      v-if="(step ?? 0) >= 2"
      :from="{ x: 572, y: 135 }"
      :to="{ x: 597, y: 135 }"
      stroke="var(--c-text-dim)"
      :stroke-width="1.8"
      :head-size="7"
    />
  </svg>
</template>
