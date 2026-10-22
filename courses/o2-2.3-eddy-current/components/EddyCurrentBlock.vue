<!--
  涡流（第 8 页）：整块金属板处在交变磁场中，板内出现一圈圈闭合的感应电流。
  磁场垂直纸面向里且增强，故涡流沿逆时针方向；虚线沿环形流动。
-->
<template>
  <svg
    class="fig-svg"
    viewBox="0 0 520 340"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="金属板中的涡流"
  >
    <defs>
      <linearGradient id="ecb-plate" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgb(203 213 225 / 20%)" />
        <stop offset="100%" stop-color="rgb(148 163 184 / 10%)" />
      </linearGradient>
      <radialGradient id="ecb-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#e2a846" stop-opacity="0.16" />
        <stop offset="100%" stop-color="#e2a846" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect
      x="70"
      y="56"
      width="380"
      height="224"
      rx="10"
      fill="url(#ecb-plate)"
      stroke="#94a3b8"
      stroke-width="2"
    />
    <ellipse cx="260" cy="168" rx="190" ry="130" fill="url(#ecb-glow)" />
    <FieldDots :x="128" :y="82" :cols="7" :rows="5" :spacing="44" dir="in" />
    <g
      fill="none"
      stroke="#e2a846"
      stroke-width="3.2"
      stroke-linecap="round"
      stroke-dasharray="14 10"
      class="ecb-flow"
    >
      <ellipse cx="260" cy="168" rx="120" ry="76" />
      <ellipse cx="260" cy="168" rx="82" ry="52" />
      <ellipse cx="260" cy="168" rx="44" ry="28" />
    </g>
    <CourseArrow
      :from="{ x: 284, y: 92 }"
      :to="{ x: 236, y: 92 }"
      stroke="#e2a846"
      stroke-width="3"
    />
    <CourseArrow
      :from="{ x: 236, y: 244 }"
      :to="{ x: 284, y: 244 }"
      stroke="#e2a846"
      stroke-width="3"
    />
    <CourseArrow
      :from="{ x: 380, y: 190 }"
      :to="{ x: 380, y: 146 }"
      stroke="#e2a846"
      stroke-width="3"
    />
    <CourseArrow
      :from="{ x: 140, y: 146 }"
      :to="{ x: 140, y: 190 }"
      stroke="#e2a846"
      stroke-width="3"
    />
    <text x="260" y="36" text-anchor="middle" font-size="20" fill="#e2a846">
      穿过金属板的磁通量在变化
    </text>
    <text x="260" y="316" text-anchor="middle" font-size="20" fill="var(--c-text-dim)">
      整块金属导体
    </text>
  </svg>
</template>

<style scoped>
.ecb-flow {
  animation: ecb-dash 2.8s linear infinite;
}

@keyframes ecb-dash {
  to {
    stroke-dashoffset: 48;
  }
}
</style>
