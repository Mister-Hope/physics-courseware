<!--
  第 10 页：吊起的铝环与靠近 / 移开磁体。
  `mode="approach"` 磁体从右侧靠近（运动箭头向左），铝环受斥力向左；
  `mode="away"` 磁体向右移开，铝环受引力向右。
  条形磁体用共享 BarMagnet（左端 N 面向铝环）。
  图按 16px 体系绘制（viewBox 280×200）。
-->
<script setup lang="ts">
import { computed } from "vue";

const { mode = "approach" } = defineProps<{
  /** 磁体靠近（Φ 增大）还是移开（Φ 减小） */
  mode?: "approach" | "away";
}>();

/** 磁体左端 x：靠近时更近，移开时退到右侧 */
const magnetX = computed<number>(() => (mode === "approach" ? 150 : 200));
</script>

<template>
  <svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" class="ring-svg">
    <!-- 细线 -->
    <line x1="108" y1="8" x2="108" y2="54" stroke="var(--c-neutral-500)" stroke-width="1.4" />

    <!-- 铝环 -->
    <ellipse cx="108" cy="104" rx="26" ry="50" fill="none" stroke="var(--c-neutral-300)" stroke-width="3.6" />

    <!-- 条形磁体：左端 N 面向铝环 -->
    <BarMagnet :x="magnetX + 35" :y="104" :length="70" :width="24" n-side="left" />

    <!-- 磁体的运动方向 -->
    <CourseArrow
      :from="{ x: mode === 'approach' ? 220 : 200, y: 78 }"
      :to="{ x: mode === 'approach' ? 166 : 254, y: 78 }"
      stroke="var(--c-text-dim)"
      :stroke-width="2"
      :head-size="8"
    />

    <!-- 铝环受到的力：靠近时被推开、移开时被吸回 -->
    <CourseArrow
      :from="{ x: mode === 'approach' ? 76 : 146, y: 104 }"
      :to="{ x: mode === 'approach' ? 30 : 192, y: 104 }"
      stroke="var(--c-danger)"
      :stroke-width="2.6"
      :head-size="9"
    />
    <text :x="mode === 'approach' ? 53 : 169" y="92" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="11" fill="var(--c-danger)">
      F
    </text>
  </svg>
</template>
