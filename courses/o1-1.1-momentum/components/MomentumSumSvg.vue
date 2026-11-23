<!-- 第 16 页：A 向东、B 向西。v 常显；p_A、p_B 与矢量求和点击后出现。 -->
<script setup>
defineProps({
  showP: { type: Boolean, default: false },
  showSum: { type: Boolean, default: false },
});
</script>

<template>
  <svg viewBox="0 0 480 360" width="480" height="360" class="course-fig" role="img" aria-label="A 向东、B 向西运动，下方为两个动量的矢量求和">
    <text x="48" y="78" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="17">A</text>
    <circle cx="94" cy="70" r="16" fill="#94a3b8" opacity="0.5" />
    <CourseArrow :from="{ x: 118, y: 56 }" :to="{ x: 218, y: 56 }" stroke="var(--c-velocity)" :stroke-width="2.4" />
    <text x="168" y="40" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="17" text-anchor="middle">
      v<tspan baseline-shift="sub" font-size="11">A</tspan>
    </text>

    <text x="432" y="78" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="17" text-anchor="end">B</text>
    <circle cx="386" cy="70" r="16" fill="#94a3b8" opacity="0.5" />
    <CourseArrow :from="{ x: 362, y: 56 }" :to="{ x: 262, y: 56 }" stroke="var(--c-velocity)" :stroke-width="2.4" />
    <text x="312" y="40" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="17" text-anchor="middle">
      v<tspan baseline-shift="sub" font-size="11">B</tspan>
    </text>

    <line v-show="showP" x1="40" y1="128" x2="440" y2="128" stroke="var(--c-line)" stroke-width="1.2" opacity="0.35" />

    <g v-show="showP">
      <circle cx="250" cy="200" r="3.5" fill="var(--c-accent)" />
      <CourseArrow :from="{ x: 250, y: 200 }" :to="{ x: 322, y: 200 }" stroke="var(--c-accent)" :stroke-width="2.4" />
      <text x="286" y="182" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="16" text-anchor="middle">
        p<tspan baseline-shift="sub" font-size="11">A</tspan> = +6
      </text>
      <CourseArrow :from="{ x: 250, y: 200 }" :to="{ x: 106, y: 200 }" stroke="var(--c-accent)" :stroke-width="2.4" />
      <text x="178" y="226" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="16" text-anchor="middle">
        p<tspan baseline-shift="sub" font-size="11">B</tspan> = -12
      </text>
    </g>

    <g v-show="showSum">
      <circle cx="250" cy="300" r="3.5" fill="var(--c-accent-2)" />
      <CourseArrow :from="{ x: 250, y: 300 }" :to="{ x: 178, y: 300 }" stroke="var(--c-accent-2)" :stroke-width="2.6" />
      <text x="214" y="282" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic" font-size="16" text-anchor="middle">
        p<tspan baseline-shift="sub" font-size="11">A</tspan> + p<tspan baseline-shift="sub" font-size="11">B</tspan> = -6
      </text>
    </g>
  </svg>
</template>
