<script setup lang="ts">
/**
 * 第 9 页配图：一段金属导体的微观图景（自由电子 + 无规则热运动）。
 * step ≥ 3 才叠加定向移动的箭头，并标出"自由电子定向移动方向与电流方向相反"（分析标注点击后才出）。
 */
const { step = 1 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 460 250" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 导体（圆柱形，侧视） -->
      <rect x="40" y="70" width="380" height="100" rx="6" fill="rgba(96,165,250,0.06)" stroke="var(--c-text)" stroke-width="1.6" />
      <ellipse cx="40" cy="120" rx="9" ry="50" fill="rgba(96,165,250,0.06)" stroke="var(--c-text)" stroke-width="1.6" />
      <ellipse cx="420" cy="120" rx="9" ry="50" fill="rgba(96,165,250,0.06)" stroke="var(--c-text)" stroke-width="1.6" />
      <text x="230" y="54" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">自由电子的无规则热运动</text>
      <!-- 自由电子的无规则热运动 -->
      <g opacity="0.65">
        <CourseArrow :from="{ x: 105, y: 100 }" :to="{ x: 88, y: 80 }" stroke="var(--c-accent-2)" :stroke-width="1.8" :head-size="6" />
        <CourseArrow :from="{ x: 170, y: 145 }" :to="{ x: 156, y: 166 }" stroke="var(--c-accent-2)" :stroke-width="1.8" :head-size="6" />
        <CourseArrow :from="{ x: 240, y: 95 }" :to="{ x: 258, y: 78 }" stroke="var(--c-accent-2)" :stroke-width="1.8" :head-size="6" />
        <CourseArrow :from="{ x: 305, y: 150 }" :to="{ x: 320, y: 168 }" stroke="var(--c-accent-2)" :stroke-width="1.8" :head-size="6" />
        <CourseArrow :from="{ x: 368, y: 108 }" :to="{ x: 385, y: 92 }" stroke="var(--c-accent-2)" :stroke-width="1.8" :head-size="6" />
      </g>
      <!-- 分析标注：叠加定向移动，并标出与电流方向相反 -->
      <g v-if="step >= 3">
        <CourseArrow :from="{ x: 110, y: 100 }" :to="{ x: 148, y: 100 }" stroke="var(--c-accent)" :stroke-width="2.4" :head-size="9" />
        <CourseArrow :from="{ x: 175, y: 145 }" :to="{ x: 213, y: 145 }" stroke="var(--c-accent)" :stroke-width="2.4" :head-size="9" />
        <CourseArrow :from="{ x: 245, y: 95 }" :to="{ x: 283, y: 95 }" stroke="var(--c-accent)" :stroke-width="2.4" :head-size="9" />
        <CourseArrow :from="{ x: 310, y: 150 }" :to="{ x: 348, y: 150 }" stroke="var(--c-accent)" :stroke-width="2.4" :head-size="9" />
        <CourseArrow :from="{ x: 373, y: 108 }" :to="{ x: 408, y: 108 }" stroke="var(--c-accent)" :stroke-width="2.4" :head-size="9" />
        <CourseArrow :from="{ x: 330, y: 200 }" :to="{ x: 170, y: 200 }" stroke="var(--c-accent)" :stroke-width="2.4" label="I" :label-dy="-12" />
        <text x="230" y="234" text-anchor="middle" font-size="16">
          <tspan fill="var(--c-accent-2)">自由电子定向移动方向</tspan>
          <tspan fill="var(--c-text-dim)">与</tspan>
          <tspan fill="var(--c-accent)">电流方向</tspan>
          <tspan fill="var(--c-text-dim)">相反</tspan>
        </text>
      </g>
      <!-- 电子（画在箭头之上） -->
      <g>
        <circle cx="105" cy="100" r="8" fill="rgba(96,165,250,0.25)" stroke="var(--c-accent-2)" stroke-width="1.6" />
        <text x="105" y="104" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-accent-2)">−</text>
        <circle cx="170" cy="145" r="8" fill="rgba(96,165,250,0.25)" stroke="var(--c-accent-2)" stroke-width="1.6" />
        <text x="170" y="149" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-accent-2)">−</text>
        <circle cx="240" cy="95" r="8" fill="rgba(96,165,250,0.25)" stroke="var(--c-accent-2)" stroke-width="1.6" />
        <text x="240" y="99" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-accent-2)">−</text>
        <circle cx="305" cy="150" r="8" fill="rgba(96,165,250,0.25)" stroke="var(--c-accent-2)" stroke-width="1.6" />
        <text x="305" y="154" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-accent-2)">−</text>
        <circle cx="368" cy="108" r="8" fill="rgba(96,165,250,0.25)" stroke="var(--c-accent-2)" stroke-width="1.6" />
        <text x="368" y="112" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-accent-2)">−</text>
      </g>
    </svg>
  </div>
</template>
