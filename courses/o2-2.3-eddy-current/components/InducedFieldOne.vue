<!--
  感生电场（第 5、6 页）：匀强磁场垂直纸面向里，周围激发环形的感生电场。
  mode="up"  —— 磁感应强度增强：感应电流的磁场向外，感生电场逆时针；
  mode="down"—— 磁感应强度减弱：感应电流的磁场向里，感生电场顺时针。
  图中只有方向，没有任何数值。
-->
<script setup lang="ts">
const { mode = "up" } = defineProps<{
  /** 磁场的变化：增强 up / 减弱 down */
  mode?: "up" | "down";
}>();
</script>

<template>
  <svg
    class="fig-svg"
    viewBox="0 0 380 300"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="变化的磁场激发感生电场"
  >
    <defs>
      <radialGradient id="ief-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgb(226 168 70 / 14%)" />
        <stop offset="100%" stop-color="rgb(226 168 70 / 3%)" />
      </radialGradient>
    </defs>
    <circle
      cx="190"
      cy="140"
      r="92"
      fill="url(#ief-core)"
      stroke="rgb(226 168 70 / 40%)"
      stroke-width="1.4"
      stroke-dasharray="6 6"
    />
    <FieldDots :x="118" :y="68" :cols="5" :rows="5" :spacing="36" dir="in" />
    <g fill="none" stroke="#60a5fa" stroke-width="1.8" stroke-dasharray="7 7" opacity="0.78">
      <circle cx="190" cy="140" r="104" />
      <circle cx="190" cy="140" r="78" />
      <circle cx="190" cy="140" r="52" />
    </g>
    <g v-if="mode === 'up'">
      <CourseArrow
        :from="{ x: 204, y: 36 }"
        :to="{ x: 176, y: 36 }"
        stroke="#60a5fa"
        stroke-width="3"
      />
      <CourseArrow
        :from="{ x: 294, y: 154 }"
        :to="{ x: 294, y: 126 }"
        stroke="#60a5fa"
        stroke-width="3"
      />
      <CourseArrow
        :from="{ x: 176, y: 244 }"
        :to="{ x: 204, y: 244 }"
        stroke="#60a5fa"
        stroke-width="3"
      />
      <CourseArrow
        :from="{ x: 86, y: 126 }"
        :to="{ x: 86, y: 154 }"
        stroke="#60a5fa"
        stroke-width="3"
      />
    </g>
    <g v-else>
      <CourseArrow
        :from="{ x: 176, y: 36 }"
        :to="{ x: 204, y: 36 }"
        stroke="#60a5fa"
        stroke-width="3"
      />
      <CourseArrow
        :from="{ x: 294, y: 126 }"
        :to="{ x: 294, y: 154 }"
        stroke="#60a5fa"
        stroke-width="3"
      />
      <CourseArrow
        :from="{ x: 204, y: 244 }"
        :to="{ x: 176, y: 244 }"
        stroke="#60a5fa"
        stroke-width="3"
      />
      <CourseArrow
        :from="{ x: 86, y: 154 }"
        :to="{ x: 86, y: 126 }"
        stroke="#60a5fa"
        stroke-width="3"
      />
    </g>
    <text
      x="190"
      y="136"
      text-anchor="middle"
      font-family="KaTeX_Math, serif"
      font-style="italic"
      font-size="30"
      fill="var(--c-accent)"
    >
      B
    </text>
    <text
      x="190"
      y="166"
      text-anchor="middle"
      font-size="16"
      :fill="mode === 'up' ? '#f87171' : '#60a5fa'"
    >
      {{ mode === "up" ? "正在增强" : "正在减弱" }}
    </text>
    <text x="190" y="288" text-anchor="middle" font-size="16" fill="#60a5fa">感生电场</text>
  </svg>
</template>
