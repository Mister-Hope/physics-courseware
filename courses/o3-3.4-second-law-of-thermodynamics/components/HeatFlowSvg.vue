<!-- 第 4/5 页：热传导方向（高温→低温，反向不能自发）与冰箱的热量搬运（Q_h=Q_c+W） -->
<script setup lang="ts">
const { mode = "flow", step = 0 } = defineProps<{
  mode?: "flow" | "fridge";
  step?: number;
}>();
</script>

<template>
  <svg viewBox="0 0 840 300" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g v-if="mode === 'flow'">
      <rect x="70" y="95" width="220" height="110" rx="14" fill="rgba(248,113,113,0.12)" stroke="var(--c-danger)" stroke-width="2" />
      <rect x="550" y="95" width="220" height="110" rx="14" fill="rgba(96,165,250,0.12)" stroke="var(--c-velocity)" stroke-width="2" />
      <text x="180" y="155" text-anchor="middle" font-size="16" fill="var(--c-text)">高温物体</text>
      <text x="660" y="155" text-anchor="middle" font-size="16" fill="var(--c-text)">低温物体</text>
      <g v-if="step >= 1">
        <CourseArrow :from="{ x: 300, y: 150 }" :to="{ x: 540, y: 150 }" stroke="var(--c-accent)" :stroke-width="3" :head-size="11" />
        <text x="420" y="128" text-anchor="middle" font-size="15" fill="var(--c-accent)">热量</text>
      </g>
      <g v-if="step >= 2">
        <CourseArrow :from="{ x: 540, y: 205 }" :to="{ x: 300, y: 205 }" stroke="var(--c-text-dim)" :stroke-width="1.8" :head-size="8" stroke-dasharray="6 5" />
        <line x1="406" y1="191" x2="434" y2="219" stroke="var(--c-danger)" stroke-width="3" stroke-linecap="round" />
        <line x1="434" y1="191" x2="406" y2="219" stroke="var(--c-danger)" stroke-width="3" stroke-linecap="round" />
        <text x="420" y="250" text-anchor="middle" font-size="14" fill="var(--c-danger)">不能自发</text>
      </g>
    </g>
    <g v-else>
      <rect x="40" y="30" width="760" height="240" rx="18" fill="rgba(248,113,113,0.05)" stroke="var(--c-line)" stroke-width="1.6" stroke-dasharray="7 6" />
      <text x="62" y="60" font-size="15" fill="var(--c-text-dim)">房间（高温）</text>
      <rect x="90" y="95" width="270" height="145" rx="12" fill="rgba(96,165,250,0.10)" stroke="var(--c-velocity)" stroke-width="2" />
      <text x="112" y="124" font-size="15" fill="var(--c-text)">冰箱内（低温）</text>
      <line x1="112" y1="150" x2="338" y2="150" stroke="var(--c-line)" stroke-width="1.2" />
      <line x1="112" y1="180" x2="338" y2="180" stroke="var(--c-line)" stroke-width="1.2" />
      <g v-if="step >= 1">
        <rect x="430" y="160" width="100" height="78" rx="10" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.6" />
        <text x="480" y="205" text-anchor="middle" font-size="14" fill="var(--c-text)">压缩机</text>
        <CourseArrow :from="{ x: 358, y: 150 }" :to="{ x: 430, y: 185 }" stroke="var(--c-velocity)" :stroke-width="2.6" :head-size="9" />
        <text x="384" y="140" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-velocity)">
          Q<tspan font-size="11" dy="3">c</tspan>
        </text>
        <CourseArrow :from="{ x: 530, y: 185 }" :to="{ x: 700, y: 150 }" stroke="var(--c-danger)" :stroke-width="2.6" :head-size="9" />
        <text x="640" y="138" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-danger)">
          Q<tspan font-size="11" dy="3">h</tspan>
        </text>
        <CourseArrow :from="{ x: 480, y: 282 }" :to="{ x: 480, y: 242 }" stroke="var(--c-accent)" :stroke-width="2.4" :head-size="8" />
        <text x="502" y="274" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-accent)">W</text>
      </g>
      <g v-if="step >= 2">
        <text x="300" y="284" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-text)">
          Q<tspan font-size="11" dy="3">h</tspan><tspan font-size="16" dy="-3"> = Q</tspan><tspan font-size="11" dy="3">c</tspan
          ><tspan font-size="16" dy="-3"> + W</tspan>
        </text>
        <text x="662" y="228" text-anchor="middle" font-size="14" fill="var(--c-danger)">房间净得热量 W</text>
      </g>
    </g>
  </svg>
</template>
