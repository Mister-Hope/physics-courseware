<script setup lang="ts">
// 第 5 页：同一个气垫导轨实验能研究的三种“碰撞”
// step：1 = 碰后分开（弹性碰撞架），2 = 碰后粘连（撞针 + 橡皮泥），3 = 由静止分开（压缩弹簧 + 细线）
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 900 360" class="cc-svg" role="img" aria-label="气垫导轨上的三种碰撞情形">
    <text x="320" y="18" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">碰前</text>
    <text x="709" y="18" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">碰后</text>
    <g v-if="step >= 1">
      <text x="24" y="80" font-size="16" fill="var(--c-text)">① 碰后分开</text>
      <rect x="240" y="60" width="58" height="24" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="1.6" />
      <rect x="342" y="60" width="58" height="24" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <text x="269" y="77" text-anchor="middle" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-2)">A</text>
      <text x="371" y="77" text-anchor="middle" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)">B</text>
      <path d="M 298 72 l 5 -8 l 5 16 l 5 -16 l 5 8" fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-linejoin="round" />
      <path d="M 322 72 l 5 -8 l 5 16 l 5 -16 l 5 8" fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-linejoin="round" />
      <CourseArrow :from="{ x: 240, y: 44 }" :to="{ x: 292, y: 44 }" stroke="var(--c-accent-2)" :stroke-width="1.6" />
      <text x="252" y="36" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-2)">v1</text>
      <text x="371" y="46" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">静止</text>
      <CourseArrow :from="{ x: 528, y: 72 }" :to="{ x: 590, y: 72 }" stroke="var(--c-text-mute)" :stroke-width="1.4" />
      <rect x="600" y="60" width="58" height="24" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="1.6" />
      <rect x="700" y="60" width="58" height="24" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <text x="629" y="77" text-anchor="middle" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-2)">A</text>
      <text x="729" y="77" text-anchor="middle" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)">B</text>
      <CourseArrow :from="{ x: 658, y: 44 }" :to="{ x: 604, y: 44 }" stroke="var(--c-accent-2)" :stroke-width="1.6" />
      <CourseArrow :from="{ x: 700, y: 44 }" :to="{ x: 754, y: 44 }" stroke="var(--c-text-dim)" :stroke-width="1.6" />
      <text x="616" y="36" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-2)">v1′</text>
      <text x="712" y="36" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)">v2′</text>
    </g>
    <g v-if="step >= 2">
      <text x="24" y="194" font-size="16" fill="var(--c-text)">② 碰后粘连</text>
      <rect x="240" y="174" width="58" height="24" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="1.6" />
      <rect x="342" y="174" width="58" height="24" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <text x="269" y="191" text-anchor="middle" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-2)">A</text>
      <text x="371" y="191" text-anchor="middle" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)">B</text>
      <path d="M 298 186 H 330" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" />
      <path d="M 330 181 L 340 186 L 330 191 Z" fill="var(--c-accent)" />
      <circle cx="348" cy="186" r="7" fill="var(--c-accent)" opacity="0.45" />
      <CourseArrow :from="{ x: 240, y: 158 }" :to="{ x: 292, y: 158 }" stroke="var(--c-accent-2)" :stroke-width="1.6" />
      <text x="252" y="150" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-2)">v1</text>
      <text x="371" y="160" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">静止</text>
      <CourseArrow :from="{ x: 528, y: 186 }" :to="{ x: 590, y: 186 }" stroke="var(--c-text-mute)" :stroke-width="1.4" />
      <rect x="620" y="174" width="120" height="24" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-accent)" stroke-width="1.8" />
      <text x="680" y="191" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">A + B</text>
      <CourseArrow :from="{ x: 620, y: 158 }" :to="{ x: 700, y: 158 }" stroke="var(--c-accent)" :stroke-width="1.6" />
      <text x="638" y="150" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">v′</text>
    </g>
    <g v-if="step >= 3">
      <text x="24" y="308" font-size="16" fill="var(--c-text)">③ 由静止分开</text>
      <rect x="240" y="288" width="58" height="24" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="1.6" />
      <rect x="342" y="288" width="58" height="24" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <text x="269" y="305" text-anchor="middle" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-2)">A</text>
      <text x="371" y="305" text-anchor="middle" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)">B</text>
      <path d="M 298 300 l 6 -9 l 6 18 l 6 -18 l 6 18 l 6 -18 l 6 9" fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-linejoin="round" />
      <path d="M 298 284 H 342" stroke="var(--c-accent)" stroke-width="1.2" stroke-dasharray="4 3" />
      <text x="320" y="278" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">细线</text>
      <text x="269" y="272" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">静止</text>
      <text x="371" y="272" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">静止</text>
      <CourseArrow :from="{ x: 528, y: 300 }" :to="{ x: 590, y: 300 }" stroke="var(--c-text-mute)" :stroke-width="1.4" />
      <rect x="600" y="288" width="58" height="24" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="1.6" />
      <rect x="760" y="288" width="58" height="24" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <text x="629" y="305" text-anchor="middle" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-2)">A</text>
      <text x="789" y="305" text-anchor="middle" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)">B</text>
      <CourseArrow :from="{ x: 658, y: 272 }" :to="{ x: 604, y: 272 }" stroke="var(--c-accent-2)" :stroke-width="1.6" />
      <CourseArrow :from="{ x: 760, y: 272 }" :to="{ x: 814, y: 272 }" stroke="var(--c-text-dim)" :stroke-width="1.6" />
      <text x="612" y="264" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent-2)">v1′</text>
      <text x="772" y="264" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)">v2′</text>
    </g>
  </svg>
</template>

<style scoped>
.cc-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
