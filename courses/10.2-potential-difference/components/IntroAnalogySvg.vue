<script setup lang="ts">
/** 第 2 页引课：左边是从 6 楼走到 8 楼（做功只看高度差），右边是电场中的 A、B 两点（静电力做功看什么？）。 */
</script>

<template>
  <svg viewBox="0 0 620 240" width="620" height="240">
    <path d="M 40 205 H 120 V 165 H 180 V 125 H 240 V 85 H 300" fill="none" stroke="var(--c-neutral-300)" stroke-width="3" stroke-linejoin="round" />
    <text x="36" y="228" fill="var(--c-text-dim)" font-size="13">6 楼</text>
    <text x="292" y="72" fill="var(--c-text-dim)" font-size="13" text-anchor="middle">8 楼</text>
    <line x1="300" y1="205" x2="356" y2="205" stroke="var(--c-neutral-500)" stroke-width="1.2" stroke-dasharray="4 4" />
    <line x1="300" y1="85" x2="356" y2="85" stroke="var(--c-neutral-500)" stroke-width="1.2" stroke-dasharray="4 4" />
    <CourseArrow :from="{ x: 360, y: 205 }" :to="{ x: 360, y: 85 }" stroke="var(--c-accent)" stroke-width="2.4" />
    <text x="372" y="150" fill="var(--c-accent)" font-size="13">高度差</text>
    <line x1="440" y1="28" x2="440" y2="222" stroke="var(--c-border)" stroke-width="1.2" stroke-dasharray="5 5" />
    <line x1="470" y1="80" x2="600" y2="80" stroke="var(--c-field)" stroke-width="1.8" opacity="0.55" />
    <line x1="470" y1="130" x2="600" y2="130" stroke="var(--c-field)" stroke-width="1.8" opacity="0.55" />
    <line x1="470" y1="180" x2="600" y2="180" stroke="var(--c-field)" stroke-width="1.8" opacity="0.55" />
    <CourseArrow :from="{ x: 470, y: 80 }" :to="{ x: 605, y: 80 }" stroke="var(--c-field)" stroke-width="1.8" />
    <CourseArrow :from="{ x: 470, y: 130 }" :to="{ x: 605, y: 130 }" stroke="var(--c-field)" stroke-width="1.8" />
    <CourseArrow :from="{ x: 470, y: 180 }" :to="{ x: 605, y: 180 }" stroke="var(--c-field)" stroke-width="1.8" />
    <circle cx="505" cy="130" r="5.5" fill="var(--c-neutral-200)" />
    <text x="505" y="104" text-anchor="middle" fill="var(--c-text)" font-size="15" font-style="italic" font-family="KaTeX_Math">
      φ
      <tspan font-size="10" dy="3">A</tspan>
    </text>
    <text x="505" y="156" text-anchor="middle" fill="var(--c-text-dim)" font-size="15" font-style="italic" font-family="KaTeX_Math">A</text>
    <circle cx="575" cy="130" r="5.5" fill="var(--c-neutral-200)" />
    <text x="575" y="104" text-anchor="middle" fill="var(--c-text)" font-size="15" font-style="italic" font-family="KaTeX_Math">
      φ
      <tspan font-size="10" dy="3">B</tspan>
    </text>
    <text x="575" y="156" text-anchor="middle" fill="var(--c-text-dim)" font-size="15" font-style="italic" font-family="KaTeX_Math">B</text>
    <text x="537" y="222" text-anchor="middle" fill="var(--c-text-dim)" font-size="13">电场中的 A、B 两点</text>
    <text x="360" y="228" text-anchor="middle" fill="var(--c-text-dim)" font-size="13">两层楼的高度差</text>
  </svg>
</template>
