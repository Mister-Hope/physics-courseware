<template>
  <!-- 教材图 8.1-2（680×226）：甲 重力、支持力与位移垂直；乙 拉力与位移成锐角；丙 拉力与位移成钝角。
       三格里位移都从物块的几何中心起笔画（与力的作用点共点），并标出夹角 α 的弧。 -->
  <svg viewBox="12 30 660 202" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="力与位移成不同角度时的三种情形">
    <!-- ==================== 甲：α = π/2 ==================== -->
    <text x="21" y="52" font-size="19" fill="var(--c-accent)">甲</text>
    <SurfaceHatch :from="{ x: 18, y: 175 }" :to="{ x: 208, y: 175 }" side="below" :thickness="12" :gap="20" />
    <rect x="79" y="131" width="68" height="44" rx="8" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <CourseArrow :from="{ x: 113, y: 153 }" :to="{ x: 113, y: 222 }" stroke="var(--c-force)" :stroke-width="3" />
    <CourseArrow :from="{ x: 113, y: 153 }" :to="{ x: 113, y: 92 }" stroke="var(--c-physics)" :stroke-width="3" />
    <CourseArrow
      :from="{ x: 113, y: 153 }"
      :to="{ x: 185, y: 153 }"
      stroke="var(--c-velocity)"
      :stroke-width="2.6"
      stroke-dasharray="7 5"
      label="x"
      :label-dx="20"
      :label-dy="-8"
    />
    <path d="M 147 153 A 34 34 0 0 0 113 119" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="150" y="120" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)">α</text>
    <text x="124" y="212" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-force)">G</text>
    <text x="124" y="104" font-size="19" fill="var(--c-physics)">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Main" font-size="13" dy="5">N</tspan>
    </text>
    <!-- ==================== 乙：锐角 ==================== -->
    <text x="248" y="52" font-size="19" fill="var(--c-accent)">乙</text>
    <SurfaceHatch :from="{ x: 245, y: 175 }" :to="{ x: 435, y: 175 }" side="below" :thickness="12" :gap="20" />
    <rect x="306" y="131" width="68" height="44" rx="8" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <CourseArrow :from="{ x: 340, y: 153 }" :to="{ x: 387, y: 123 }" stroke="var(--c-accent)" :stroke-width="3.2" label="F" :label-dx="8" :label-dy="-12" />
    <CourseArrow
      :from="{ x: 340, y: 153 }"
      :to="{ x: 412, y: 153 }"
      stroke="var(--c-velocity)"
      :stroke-width="2.6"
      stroke-dasharray="7 5"
      label="x"
      :label-dx="18"
      :label-dy="-8"
    />
    <path d="M 374 153 A 34 34 0 0 0 368.5 134.5" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="386" y="141" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)">α</text>
    <!-- ==================== 丙：钝角 ==================== -->
    <text x="475" y="52" font-size="19" fill="var(--c-accent)">丙</text>
    <SurfaceHatch :from="{ x: 472, y: 175 }" :to="{ x: 662, y: 175 }" side="below" :thickness="12" :gap="20" />
    <rect x="533" y="131" width="68" height="44" rx="8" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <CourseArrow :from="{ x: 567, y: 153 }" :to="{ x: 520, y: 123 }" stroke="var(--c-accent)" :stroke-width="3.2" label="F" :label-dx="-8" :label-dy="-12" />
    <CourseArrow
      :from="{ x: 567, y: 153 }"
      :to="{ x: 639, y: 153 }"
      stroke="var(--c-velocity)"
      :stroke-width="2.6"
      stroke-dasharray="7 5"
      label="x"
      :label-dx="20"
      :label-dy="-8"
    />
    <path d="M 601 153 A 34 34 0 0 0 539.8 132.5" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="580" y="106" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)">α</text>
  </svg>
</template>
