<!-- 第 4 页：重叠处质点的位移等于两列波单独引起的位移之矢量和 -->
<template>
  <svg viewBox="0 66 660 136" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g v-for="item in panels" :key="item.title">
      <line :x1="item.cx - 76" :y1="base" :x2="item.cx + 76" :y2="base" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="5 6" opacity="0.5" />
      <CourseArrow
        :from="{ x: item.cx - 38, y: base }"
        :to="{ x: item.cx - 38, y: base - item.a * unit }"
        stroke="var(--c-accent)"
        :stroke-width="2.8"
        :head-size="9"
      />
      <CourseArrow
        :from="{ x: item.cx - 12, y: base }"
        :to="{ x: item.cx - 12, y: base - item.b * unit }"
        stroke="var(--c-physics)"
        :stroke-width="2.8"
        :head-size="9"
      />
      <CourseArrow
        v-if="item.a + item.b !== 0"
        :from="{ x: item.cx + 44, y: base }"
        :to="{ x: item.cx + 44, y: base - (item.a + item.b) * unit }"
        stroke="var(--c-text)"
        :stroke-width="3.2"
        :head-size="10"
      />
      <circle v-else :cx="item.cx + 44" :cy="base" r="4.5" fill="var(--c-text)" />
      <text :x="item.cx - 46" :y="base - 8" text-anchor="end" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">
        y<tspan dy="4" font-size="10">1</tspan>
      </text>
      <text :x="item.cx - 20" :y="base - 8" text-anchor="end" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-physics)">
        y<tspan dy="4" font-size="10">2</tspan>
      </text>
      <text v-if="item.a + item.b !== 0" :x="item.cx + 54" :y="base - 8" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">
        y
      </text>
      <text :x="item.cx" :y="base + 40" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">{{ item.title }}</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
const base = 148;
const unit = 20;

const panels = [
  { cx: 110, a: 2, b: 2, title: "波峰与波峰" },
  { cx: 330, a: 2, b: -2, title: "波峰与波谷" },
  { cx: 550, a: 3, b: -1, title: "一般情形" },
];
</script>
