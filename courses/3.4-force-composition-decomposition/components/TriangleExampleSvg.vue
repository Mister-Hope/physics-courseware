<template>
  <!--
    第 11 页：例题图——两个互相垂直的力按三角形法则首尾相接。

    F₁ = 24 N 水平向右（O→A），F₂ = 7 N 从 A 竖直向上（A→B），合力 F 从 O 指向 B。
    24 : 7 按真实比例画（每牛顿 22 用户单位，viewBox 600×200），图上就是一个直角三角形，
    学生用初中的勾股定理就能读出斜边 25 N。
  -->
  <div class="te-figure">
    <svg viewBox="0 0 600 200">
      <path d="M 116,175 A 76,76 0 0 0 112.96,153.71" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" opacity="0.8" />
      <polyline points="554,175 554,161 568,161" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" opacity="0.8" />
      <CourseArrow :from="{ x: 40, y: 175 }" :to="{ x: 568, y: 175 }" stroke="var(--c-accent)" stroke-width="3.2" pointer-events="none" />
      <CourseArrow :from="{ x: 568, y: 175 }" :to="{ x: 568, y: 21 }" stroke="var(--c-accent-2)" stroke-width="3.2" pointer-events="none" />
      <CourseArrow :from="{ x: 40, y: 175 }" :to="{ x: 568, y: 21 }" stroke="var(--c-physics)" stroke-width="3.6" pointer-events="none" />
      <circle cx="40" cy="175" r="3.6" fill="var(--c-text)" />
    </svg>
    <ChartLabel :x-percent="50.67" :y-percent="87.5" :parts="[{ tex: 'F_1 = 24\\ \\text{N}' }]" anchor="bottom-right" :dy="12" color="var(--c-accent)" halo />
    <ChartLabel :x-percent="94.67" :y-percent="49" :parts="[{ tex: 'F_2 = 7\\ \\text{N}' }]" anchor="left" :dx="-12" color="var(--c-accent-2)" halo />
    <ChartLabel
      :x-percent="50.67"
      :y-percent="49"
      :parts="[{ tex: 'F = 25\\ \\text{N}' }]"
      anchor="top-right"
      :dx="-16"
      :dy="-10"
      color="var(--c-physics)"
      halo
    />
    <ChartLabel :x-percent="20.86" :y-percent="81.42" :parts="[{ tex: '\\alpha' }]" anchor="right" :dx="6" :size="16" color="var(--c-text-dim)" />
  </div>
</template>

<style scoped>
.te-figure {
  position: relative;
  min-width: 0;
}

.te-figure svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
