<!-- 第 8 页：动量是矢量。上排球向东，下排球向西；v 常显，p 与正负号点击后出现。 -->
<script setup>
defineProps({
  showP: { type: Boolean, default: false },
  showSign: { type: Boolean, default: false },
});
</script>

<template>
  <svg viewBox="0 0 480 280" width="480" height="280" class="course-fig" role="img" aria-label="向东和向西运动的两个物体，标出速度与动量的方向">
    <line x1="50" y1="140" x2="430" y2="140" stroke="var(--c-line)" stroke-width="1.2" opacity="0.5" />
    <text x="430" y="132" fill="var(--c-text-dim)" font-size="13">东</text>
    <text x="50" y="132" fill="var(--c-text-dim)" font-size="13" text-anchor="end">西</text>

    <circle cx="120" cy="72" r="18" fill="#94a3b8" opacity="0.5" />
    <CourseArrow :from="{ x: 148, y: 58 }" :to="{ x: 268, y: 58 }" stroke="var(--c-velocity)" :stroke-width="2.4" />
    <text x="208" y="44" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="17">v</text>
    <CourseArrow v-show="showP" :from="{ x: 148, y: 88 }" :to="{ x: 268, y: 88 }" stroke="var(--c-accent)" :stroke-width="2.4" />
    <text v-show="showP" x="208" y="110" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="17">p</text>
    <text v-show="showSign" x="286" y="92" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="17">+6</text>

    <circle cx="360" cy="208" r="18" fill="#94a3b8" opacity="0.5" />
    <CourseArrow :from="{ x: 332, y: 194 }" :to="{ x: 212, y: 194 }" stroke="var(--c-velocity)" :stroke-width="2.4" />
    <text x="272" y="180" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="17">v</text>
    <CourseArrow v-show="showP" :from="{ x: 332, y: 224 }" :to="{ x: 212, y: 224 }" stroke="var(--c-accent)" :stroke-width="2.4" />
    <text v-show="showP" x="272" y="246" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="17">p</text>
    <text v-show="showSign" x="194" y="228" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="17">-6</text>
  </svg>
</template>
