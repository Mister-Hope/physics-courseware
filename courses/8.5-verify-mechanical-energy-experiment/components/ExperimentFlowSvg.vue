<template>
  <!-- 课堂小结：从装置到结论的四步流程 -->
  <svg width="840" height="180" viewBox="0 0 840 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="40" width="180" height="100" rx="16" fill="var(--c-info)" fill-opacity="0.1" stroke="var(--c-info)" stroke-width="2.5" />
    <text x="100" y="84" font-size="15" fill="var(--c-info)" font-family="system-ui" text-anchor="middle">选方案定器材</text>
    <text x="100" y="110" font-size="13" fill="var(--c-ink-faint)" font-family="system-ui" text-anchor="middle">重物自由下落 / 气垫导轨</text>
    <CourseArrow :x1="200" y1="90" x2="236" y2="90" color="var(--c-ink-faint)" :width="2.5" />
    <rect x="246" y="40" width="180" height="100" rx="16" fill="var(--c-ok)" fill-opacity="0.1" stroke="var(--c-ok)" stroke-width="2.5" />
    <text x="336" y="84" font-size="15" fill="var(--c-ok)" font-family="system-ui" text-anchor="middle">测 h 与 v</text>
    <text x="336" y="110" font-size="13" fill="var(--c-ink-faint)" font-family="system-ui" text-anchor="middle">刻度尺 + 打点计时器</text>
    <CourseArrow :x1="436" y1="90" x2="472" y2="90" color="var(--c-ink-faint)" :width="2.5" />
    <rect x="482" y="40" width="170" height="100" rx="16" fill="var(--c-warn)" fill-opacity="0.1" stroke="var(--c-warn)" stroke-width="2.5" />
    <text x="567" y="84" font-size="15" fill="var(--c-warn)" font-family="system-ui" text-anchor="middle">
      算 ΔE
      <tspan font-size="11" dy="3">p</tspan>
      <tspan dy="-3">与 ΔE</tspan>
      <tspan font-size="11" dy="3">k</tspan>
    </text>
    <text x="567" y="110" font-size="13" fill="var(--c-ink-faint)" font-family="KaTeX_Main" text-anchor="middle">
      <tspan font-style="italic">mgh</tspan>
      <tspan font-size="10" dy="3">B</tspan>
      <tspan dy="-3">与</tspan>
      <tspan font-style="italic">mv</tspan>
      <tspan font-size="10" dy="3">B</tspan>
      <tspan font-size="10" dy="-3">2</tspan>
      <tspan dy="-3">/2</tspan>
    </text>
    <CourseArrow :x1="662" y1="90" x2="698" y2="90" color="var(--c-ink-faint)" :width="2.5" />
    <rect x="708" y="40" width="122" height="100" rx="16" fill="var(--c-danger)" fill-opacity="0.08" stroke="var(--c-danger)" stroke-width="2.5" />
    <text x="769" y="84" font-size="15" fill="var(--c-danger)" font-family="system-ui" text-anchor="middle">比较</text>
    <text x="769" y="110" font-size="13" fill="var(--c-ink-faint)" font-family="system-ui" text-anchor="middle">在误差内相等</text>
  </svg>
</template>
