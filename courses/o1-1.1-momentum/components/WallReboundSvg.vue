<!-- 第 9 页：钢球撞墙反弹。碰前、碰后两行；v 常显，p 与 p' 分别点击后出现。 -->
<script setup>
defineProps({
  showP: { type: Boolean, default: false },
  showPAfter: { type: Boolean, default: false },
});
</script>

<template>
  <svg viewBox="0 0 480 290" width="480" height="290" class="course-fig" role="img" aria-label="钢球撞墙前后的速度与动量方向">
    <line x1="392" y1="36" x2="392" y2="250" stroke="var(--c-text-dim)" stroke-width="5" />
    <g stroke="var(--c-text-dim)" stroke-width="2" opacity="0.5">
      <line x1="398" y1="46" x2="414" y2="30" />
      <line x1="398" y1="86" x2="414" y2="70" />
      <line x1="398" y1="126" x2="414" y2="110" />
      <line x1="398" y1="166" x2="414" y2="150" />
      <line x1="398" y1="206" x2="414" y2="190" />
      <line x1="398" y1="246" x2="414" y2="230" />
    </g>
    <text x="404" y="272" fill="var(--c-text-dim)" font-size="13">墙</text>

    <text x="60" y="58" fill="var(--c-text-dim)" font-size="13">碰前</text>
    <circle cx="150" cy="92" r="18" fill="#94a3b8" opacity="0.5" />
    <CourseArrow :from="{ x: 178, y: 92 }" :to="{ x: 330, y: 92 }" stroke="var(--c-velocity)" :stroke-width="2.4" />
    <text x="254" y="78" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="17">v</text>
    <CourseArrow v-show="showP" :from="{ x: 178, y: 126 }" :to="{ x: 330, y: 126 }" stroke="var(--c-accent)" :stroke-width="2.4" />
    <text v-show="showP" x="254" y="148" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="17">p</text>

    <text x="60" y="166" fill="var(--c-text-dim)" font-size="13">碰后</text>
    <circle cx="150" cy="200" r="18" fill="#94a3b8" opacity="0.5" />
    <CourseArrow :from="{ x: 122, y: 200 }" :to="{ x: 24, y: 200 }" stroke="var(--c-velocity)" :stroke-width="2.4" />
    <text x="72" y="186" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="17">v'</text>
    <CourseArrow v-show="showPAfter" :from="{ x: 122, y: 234 }" :to="{ x: 24, y: 234 }" stroke="var(--c-accent)" :stroke-width="2.4" />
    <text v-show="showPAfter" x="72" y="256" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="17">p'</text>
  </svg>
</template>
