<template>
  <!-- 第 26 页「绳上的弹力：张力」：左图绳被拉紧、两端物体都被绳往中间拉；右图两端靠得更近、绳松弛、张力为 0 -->
  <svg class="fig" viewBox="0 44 640 146" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="70" width="34" height="60" rx="8" fill="rgba(148,163,184,0.2)" stroke="#cbd5e1" stroke-width="2.4" />
    <rect x="266" y="70" width="34" height="60" rx="8" fill="rgba(148,163,184,0.2)" stroke="#cbd5e1" stroke-width="2.4" />
    <line x1="74" y1="100" x2="266" y2="100" stroke="#e2a846" stroke-width="3" />
    <CourseArrow :from="{ x: 74, y: 100 }" :to="{ x: 118, y: 100 }" stroke="#e2a846" stroke-width="3.4" />
    <CourseArrow :from="{ x: 266, y: 100 }" :to="{ x: 222, y: 100 }" stroke="#e2a846" stroke-width="3.4" />
    <text x="132" y="88" text-anchor="middle" font-size="18" fill="#e2a846">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Main" font-size="12" dy="4">T</tspan>
    </text>
    <text x="244" y="88" text-anchor="middle" font-size="18" fill="#e2a846">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Main" font-size="12" dy="4">T</tspan>
    </text>
    <text x="170" y="170" text-anchor="middle" font-size="16" fill="#94a3b8">被拉紧：两端都被往中间拉</text>

    <rect x="380" y="70" width="34" height="60" rx="8" fill="rgba(148,163,184,0.16)" stroke="#64748b" stroke-width="2.4" />
    <rect x="546" y="70" width="34" height="60" rx="8" fill="rgba(148,163,184,0.16)" stroke="#64748b" stroke-width="2.4" />
    <path d="M 414 100 Q 480 168 546 100" fill="none" stroke="#64748b" stroke-width="3" stroke-linecap="round" />
    <circle cx="470" cy="112" r="4" fill="#64748b" />
    <text x="480" y="170" text-anchor="middle" font-size="16" fill="#94a3b8">两端靠得更近：绳松弛，张力为 0</text>
  </svg>
</template>

<style scoped>
.fig {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}
</style>
