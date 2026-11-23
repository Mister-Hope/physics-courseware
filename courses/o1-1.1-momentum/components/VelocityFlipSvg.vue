<!-- 第 15 页：同一物体先向东、后向西。v 常显，p 与 p' 点击后出现。 -->
<script setup>
defineProps({
  showP: { type: Boolean, default: false },
});
</script>

<template>
  <svg viewBox="0 0 480 300" width="480" height="300" class="course-fig" role="img" aria-label="物体先向东运动、后向西运动，标出速度与动量">
    <text x="60" y="48" fill="var(--c-text-dim)" font-size="15">碰前</text>
    <circle cx="140" cy="90" r="18" fill="#94a3b8" opacity="0.5" />
    <CourseArrow :from="{ x: 168, y: 76 }" :to="{ x: 288, y: 76 }" stroke="var(--c-velocity)" :stroke-width="2.4" />
    <text x="228" y="60" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="17">v</text>
    <CourseArrow v-show="showP" :from="{ x: 168, y: 108 }" :to="{ x: 288, y: 108 }" stroke="var(--c-accent)" :stroke-width="2.4" />
    <text v-show="showP" x="228" y="132" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="17">p</text>

    <text x="60" y="200" fill="var(--c-text-dim)" font-size="15">碰后</text>
    <circle cx="340" cy="242" r="18" fill="#94a3b8" opacity="0.5" />
    <CourseArrow :from="{ x: 312, y: 228 }" :to="{ x: 192, y: 228 }" stroke="var(--c-velocity)" :stroke-width="2.4" />
    <text x="252" y="212" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="17">v'</text>
    <CourseArrow v-show="showP" :from="{ x: 312, y: 260 }" :to="{ x: 192, y: 260 }" stroke="var(--c-accent)" :stroke-width="2.4" />
    <text v-show="showP" x="252" y="284" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="17">p'</text>
  </svg>
</template>
