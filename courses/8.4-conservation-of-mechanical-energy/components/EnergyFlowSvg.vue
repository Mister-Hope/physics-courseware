<template>
  <!-- 课堂小结：动能与势能的双向转化，只有重力（弹力）做功时机械能守恒 -->
  <svg width="820" height="260" viewBox="0 0 820 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="70" width="240" height="120" rx="18" fill="var(--c-info)" fill-opacity="0.1" stroke="var(--c-info)" stroke-width="3" />
    <text x="160" y="122" font-size="18" fill="var(--c-info)" font-family="KaTeX_Main" text-anchor="middle">
      动能
      <tspan font-size="14"></tspan>
      <tspan font-style="italic">E</tspan>
      <tspan font-size="11" dy="4">k</tspan>
    </text>
    <text x="160" y="158" font-size="16" fill="var(--c-ink-faint)" font-family="KaTeX_Main" text-anchor="middle">
      <tspan font-style="italic">mv</tspan>
      <tspan font-size="11" dy="4">2</tspan>
      <tspan dy="-4">/2</tspan>
    </text>
    <rect x="540" y="70" width="240" height="120" rx="18" fill="var(--c-ok)" fill-opacity="0.1" stroke="var(--c-ok)" stroke-width="3" />
    <text x="660" y="122" font-size="18" fill="var(--c-ok)" font-family="KaTeX_Main" text-anchor="middle">
      势能
      <tspan font-size="14"></tspan>
      <tspan font-style="italic">E</tspan>
      <tspan font-size="11" dy="4">p</tspan>
    </text>
    <text x="660" y="158" font-size="16" fill="var(--c-ink-faint)" font-family="KaTeX_Main" text-anchor="middle"><tspan font-style="italic">mgh</tspan></text>
    <CourseArrow :x1="300" y1="104" x2="520" y2="104" color="var(--c-warn)" :width="3.5" />
    <text x="410" y="88" font-size="14" fill="var(--c-warn)" font-family="system-ui" text-anchor="middle">下落：重力做正功</text>
    <CourseArrow :x1="520" y1="156" x2="300" y2="156" color="var(--c-warn)" :width="3.5" />
    <text x="410" y="184" font-size="14" fill="var(--c-warn)" font-family="system-ui" text-anchor="middle">上升：重力做负功</text>
    <text x="410" y="228" font-size="15" fill="var(--c-ink)" font-family="system-ui" text-anchor="middle">
      只有重力（或系统内弹力）做功时，
      <tspan font-family="KaTeX_Main" font-style="italic">E</tspan>
      <tspan font-size="11" dy="4">k</tspan>
      <tspan dy="-4">+</tspan>
      <tspan font-style="italic">E</tspan>
      <tspan font-size="11" dy="4">p</tspan>
      <tspan dy="-4">保持不变</tspan>
    </text>
  </svg>
</template>
