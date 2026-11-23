<!-- 第 2、3 页：双摆碰撞演示。step=0 显示释放前；step>=1 显示碰后。heavy 为真时左球换成质量更大的 C。 -->
<script setup>
defineProps({
  heavy: { type: Boolean, default: false },
  step: { type: Number, default: 0 },
})
</script>

<template>
  <svg
    viewBox="0 0 480 340"
    width="480"
    height="340"
    class="course-fig"
    role="img"
    aria-label="两个悬挂钢球的碰撞演示"
  >
    <line x1="80" y1="48" x2="400" y2="48" stroke="var(--c-text-dim)" stroke-width="3" stroke-linecap="round" />
    <line x1="80" y1="40" x2="80" y2="56" stroke="var(--c-text-dim)" stroke-width="2" />
    <line x1="400" y1="40" x2="400" y2="56" stroke="var(--c-text-dim)" stroke-width="2" />

    <circle cx="230" cy="58" r="4" fill="var(--c-text-dim)" />
    <circle cx="252" cy="58" r="4" fill="var(--c-text-dim)" />

    <line x1="230" y1="58" x2="129" y2="233" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <line x1="252" y1="58" x2="252" y2="260" stroke="var(--c-text-dim)" stroke-width="1.6" />

    <line
      x1="252"
      y1="58"
      :x2="heavy ? 406 : 352"
      :y2="heavy ? 188 : 233"
      stroke="var(--c-accent)"
      stroke-width="1.8"
      stroke-dasharray="5 5"
      v-show="step >= 1"
    />

    <circle cx="129" cy="233" r="10" fill="var(--c-accent)" />
    <circle cx="252" cy="260" r="10" fill="var(--c-sky)" />
    <circle cx="230" cy="260" r="10" fill="var(--c-accent)" v-show="step >= 1" />
    <circle :cx="heavy ? 406 : 352" :cy="heavy ? 188 : 233" r="10" fill="var(--c-sky)" v-show="step >= 1" />

    <g stroke="var(--c-accent-light)" stroke-width="2" stroke-linecap="round" v-show="step >= 1">
      <line x1="240" y1="260" x2="246" y2="275" />
      <line x1="240" y1="260" x2="228" y2="272" />
      <line x1="240" y1="260" x2="252" y2="248" />
    </g>

    <CourseArrow
      v-show="step >= 1 && heavy"
      :from="{ x: 244, y: 292 }"
      :to="{ x: 276, y: 292 }"
      stroke="var(--c-accent)"
      :stroke-width="2.2"
    />

    <text x="100" y="264" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="17">
      {{ heavy ? 'C' : 'A' }}
    </text>
    <text x="268" y="250" fill="var(--c-sky)" font-family="KaTeX_Math" font-style="italic" font-size="17">B</text>

    <text x="112" y="300" fill="var(--c-text-dim)" font-size="13">释放</text>
    <text
      x="224"
      y="320"
      fill="var(--c-text-dim)"
      font-size="13"
      text-anchor="middle"
      v-show="step >= 1"
    >
      {{ heavy ? 'C 继续向右' : 'A 停下' }}
    </text>
    <text
      :x="heavy ? 406 : 352"
      :y="heavy ? 168 : 213"
      fill="var(--c-sky)"
      font-size="13"
      text-anchor="middle"
      v-show="step >= 1"
    >
      {{ heavy ? 'B 摆得更高' : 'B 摆到相同高度' }}
    </text>
  </svg>
</template>
