<!-- 第 4–6 页：两辆小车碰撞实验示意。step=0 碰前；step>=1 碰后粘在一起。 -->
<script setup>
defineProps({
  step: { type: Number, default: 0 },
})
</script>

<template>
  <svg
    viewBox="0 0 480 280"
    width="480"
    height="280"
    class="course-fig"
    role="img"
    aria-label="两辆小车碰撞实验装置"
  >
    <line x1="36" y1="222" x2="444" y2="222" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <line x1="36" y1="228" x2="444" y2="228" stroke="var(--c-text-dim)" stroke-width="1" opacity="0.5" />

    <rect x="54" y="92" width="92" height="56" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-line)" stroke-width="1.4" />
    <rect x="62" y="100" width="76" height="26" rx="3" fill="var(--c-bg-soft)" stroke="var(--c-text-dim)" stroke-width="1" />
    <text x="100" y="168" fill="var(--c-text-dim)" font-size="12" text-anchor="middle">数字计时器</text>

    <g>
      <rect x="132" y="182" width="70" height="30" rx="4" fill="var(--c-accent)" opacity="0.85" />
      <circle cx="148" cy="216" r="6" fill="var(--c-text-dim)" />
      <circle cx="186" cy="216" r="6" fill="var(--c-text-dim)" />
    </g>
    <g v-show="step < 1">
      <rect x="300" y="182" width="70" height="30" rx="4" fill="var(--c-sky)" opacity="0.85" />
      <circle cx="316" cy="216" r="6" fill="var(--c-text-dim)" />
      <circle cx="354" cy="216" r="6" fill="var(--c-text-dim)" />
    </g>

    <CourseArrow
      v-show="step < 1"
      :from="{ x: 128, y: 156 }"
      :to="{ x: 202, y: 156 }"
      stroke="var(--c-velocity)"
      :stroke-width="2.4"
    />
    <text x="164" y="142" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="17">v</text>
    <text x="156" y="174" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="13" text-anchor="middle">m<tspan baseline-shift="sub" font-size="9">1</tspan></text>
    <text x="324" y="174" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="13" text-anchor="middle">m<tspan baseline-shift="sub" font-size="9">2</tspan></text>

    <g v-show="step >= 1">
      <rect x="300" y="182" width="140" height="30" rx="4" fill="var(--c-accent)" opacity="0.85" />
      <circle cx="316" cy="216" r="6" fill="var(--c-text-dim)" />
      <circle cx="354" cy="216" r="6" fill="var(--c-text-dim)" />
      <circle cx="386" cy="216" r="6" fill="var(--c-text-dim)" />
      <circle cx="424" cy="216" r="6" fill="var(--c-text-dim)" />
      <CourseArrow
        :from="{ x: 352, y: 156 }"
        :to="{ x: 420, y: 156 }"
        stroke="var(--c-velocity)"
        :stroke-width="2.4"
      />
      <text x="386" y="142" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="17">v'</text>
      <text x="370" y="174" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="13" text-anchor="middle">m<tspan baseline-shift="sub" font-size="9">1</tspan> + m<tspan baseline-shift="sub" font-size="9">2</tspan></text>
    </g>
  </svg>
</template>
