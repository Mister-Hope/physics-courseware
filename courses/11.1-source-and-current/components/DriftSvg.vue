<script setup lang="ts">
/** 第 9、10 页配图：一段金属导体的微观图景（圆柱导体 + 横截面 + 自由电子）。 step ≥ 3 画出定向移动的箭头（叠加在无规则热运动之上），step ≥ 4 标出横截面 S、数密度 n、定向移动速率 v。 */
const { step = 1 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 460 240" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 圆柱导体：左端帽 + 柱身 + 右端横截面 -->
      <rect x="40" y="70" width="330" height="90" rx="6" fill="rgba(96,165,250,0.07)" stroke="var(--c-text)" stroke-width="1.6" />
      <ellipse cx="40" cy="115" rx="10" ry="45" fill="rgba(96,165,250,0.07)" stroke="var(--c-text)" stroke-width="1.6" />
      <ellipse cx="370" cy="115" rx="10" ry="45" fill="rgba(226,168,70,0.16)" stroke="var(--c-accent)" stroke-width="2" />
      <!-- 自由电子的无规则热运动 -->
      <g opacity="0.6">
        <CourseArrow :from="{ x: 104, y: 89 }" :to="{ x: 88, y: 70 }" stroke="var(--c-accent-2)" :stroke-width="1.8" :head-size="7" />
        <CourseArrow :from="{ x: 179, y: 146 }" :to="{ x: 166, y: 165 }" stroke="var(--c-accent-2)" :stroke-width="1.8" :head-size="7" />
        <CourseArrow :from="{ x: 261, y: 94 }" :to="{ x: 279, y: 76 }" stroke="var(--c-accent-2)" :stroke-width="1.8" :head-size="7" />
        <CourseArrow :from="{ x: 331, y: 146 }" :to="{ x: 345, y: 164 }" stroke="var(--c-accent-2)" :stroke-width="1.8" :head-size="7" />
      </g>
      <!-- 定向移动：静电力使电子在热运动之外整体向右移动 -->
      <g v-if="step >= 3">
        <CourseArrow :from="{ x: 118, y: 95 }" :to="{ x: 148, y: 95 }" stroke="var(--c-accent)" :stroke-width="2.4" :head-size="9" />
        <CourseArrow :from="{ x: 193, y: 140 }" :to="{ x: 223, y: 140 }" stroke="var(--c-accent)" :stroke-width="2.4" :head-size="9" />
        <CourseArrow :from="{ x: 333, y: 140 }" :to="{ x: 363, y: 140 }" stroke="var(--c-accent)" :stroke-width="2.4" :head-size="9" />
        <CourseArrow
          :from="{ x: 263, y: 100 }"
          :to="{ x: 303, y: 100 }"
          stroke="var(--c-accent)"
          :stroke-width="2.6"
          :label="step >= 4 ? 'v' : ''"
          :label-dy="-13"
        />
      </g>
      <!-- 电子本身画在箭头之上 -->
      <g>
        <circle cx="110" cy="95" r="8" fill="rgba(96,165,250,0.25)" stroke="var(--c-accent-2)" stroke-width="1.6" />
        <text x="110" y="99" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-accent-2)">−</text>
        <circle cx="185" cy="140" r="8" fill="rgba(96,165,250,0.25)" stroke="var(--c-accent-2)" stroke-width="1.6" />
        <text x="185" y="144" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-accent-2)">−</text>
        <circle cx="255" cy="100" r="8" fill="rgba(96,165,250,0.25)" stroke="var(--c-accent-2)" stroke-width="1.6" />
        <text x="255" y="104" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-accent-2)">−</text>
        <circle cx="325" cy="140" r="8" fill="rgba(96,165,250,0.25)" stroke="var(--c-accent-2)" stroke-width="1.6" />
        <text x="325" y="144" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-accent-2)">−</text>
      </g>
      <!-- 分析标注：定向移动的说明与两个微观量 -->
      <text v-if="step >= 3" x="205" y="207" text-anchor="middle" font-family="KaTeX_Main" font-size="16" fill="var(--c-accent)">
        自由电子在静电力作用下定向移动
      </text>
      <g v-if="step >= 4">
        <text x="396" y="112" font-family="KaTeX_Math" font-style="italic" font-size="22" fill="var(--c-accent)">S</text>
        <text x="396" y="136" font-family="KaTeX_Main" font-size="14" fill="var(--c-text-dim)">横截面</text>
        <text x="160" y="120" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent-2)">n</text>
      </g>
    </svg>
  </div>
</template>
