<!-- 第 7 页：动量的定义。球向右运动，v 箭头常显，p 箭头点击后出现。 -->
<script setup>
defineProps({
  showP: { type: Boolean, default: false },
});
</script>

<template>
  <svg viewBox="0 0 480 240" width="480" height="240" class="course-fig" role="img" aria-label="运动的钢球与速度、动量箭头">
    <line x1="60" y1="196" x2="420" y2="196" stroke="var(--c-line)" stroke-width="1.2" opacity="0.6" />
    <circle cx="164" cy="152" r="26" fill="#94a3b8" opacity="0.5" />
    <circle cx="164" cy="152" r="26" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" opacity="0.7" />
    <CourseArrow :from="{ x: 202, y: 128 }" :to="{ x: 336, y: 128 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
    <text x="266" y="114" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="19">v</text>
    <CourseArrow v-show="showP" :from="{ x: 202, y: 168 }" :to="{ x: 336, y: 168 }" stroke="var(--c-accent)" :stroke-width="2.6" />
    <text v-show="showP" x="266" y="190" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="19">p</text>
  </svg>
</template>
