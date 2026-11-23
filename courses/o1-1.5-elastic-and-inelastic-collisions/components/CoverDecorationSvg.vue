<script setup lang="ts">
/** 封面装饰（第 1 页）：两球正碰——左侧金球带速度箭头撞向右侧青球， 碰撞点画放射状火花，右侧青球以更大速度飞出。 */
</script>

<template>
  <svg viewBox="0 0 320 190" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="16" y1="112" x2="304" y2="112" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="7 6" opacity="0.35" />
    <circle cx="100" cy="112" r="28" fill="var(--c-accent)" opacity="0.92" />
    <circle cx="91" cy="103" r="8" fill="#fff" opacity="0.16" />
    <circle cx="190" cy="112" r="17" fill="var(--c-physics)" opacity="0.92" />
    <circle cx="185" cy="107" r="4.5" fill="#fff" opacity="0.16" />
    <g stroke="var(--c-accent-light)" stroke-width="2" stroke-linecap="round" opacity="0.85">
      <line x1="149" y1="105" x2="149" y2="93" />
      <line x1="155.5" y1="106.5" x2="163.5" y2="98.5" />
      <line x1="157" y1="112" x2="169" y2="112" />
      <line x1="155.5" y1="117.5" x2="163.5" y2="125.5" />
      <line x1="149" y1="119" x2="149" y2="131" />
      <line x1="142.5" y1="117.5" x2="134.5" y2="125.5" />
      <line x1="141" y1="112" x2="129" y2="112" />
      <line x1="142.5" y1="106.5" x2="134.5" y2="98.5" />
    </g>
    <CourseArrow :from="{ x: 26, y: 54 }" :to="{ x: 88, y: 54 }" stroke="var(--c-accent)" :stroke-width="2.4" :head-size="9" />
    <CourseArrow :from="{ x: 214, y: 54 }" :to="{ x: 300, y: 54 }" stroke="var(--c-physics)" :stroke-width="2.4" :head-size="9" />
    <text x="57" y="44" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-accent)" text-anchor="middle">v</text>
    <text x="257" y="44" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-physics)" text-anchor="middle">v′</text>
  </svg>
</template>
