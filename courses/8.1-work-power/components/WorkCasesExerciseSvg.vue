<template>
  <!-- 第二课时练习图（教材图 8.1-5，与第 7 页同一套画法）：同一力 F、同一水平位移 x，三种夹角。
       位移都从物块**几何中心**起笔（虚线箭头）、与力共点；夹角弧半径 34、紧贴作用点；
       α 只写一个斜体字母、落在两箭头夹角的正中，不压箭头也不压 F 的标注。 -->
  <svg viewBox="12 30 660 202" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="力与位移夹角分别为 150 度、30 度、30 度的三种情形">
    <!-- ==================== 甲：α = 150°（F 斜向后上方） ==================== -->
    <text x="21" y="52" font-size="19" fill="var(--c-accent)">甲</text>
    <SurfaceHatch :from="{ x: 18, y: 175 }" :to="{ x: 208, y: 175 }" side="below" :thickness="12" :gap="20" />
    <rect x="79" y="131" width="68" height="44" rx="8" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
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
    <CourseArrow :from="{ x: 113, y: 153 }" :to="{ x: 55, y: 120 }" stroke="var(--c-accent)" :stroke-width="3.2" label="F" :label-dx="-4" :label-dy="-10" />
    <path d="M 147 153 A 34 34 0 0 0 83.6 136" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="124" y="112" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)">α</text>
    <!-- ==================== 乙：α = 30°（F 斜向前下方） ==================== -->
    <text x="248" y="52" font-size="19" fill="var(--c-accent)">乙</text>
    <SurfaceHatch :from="{ x: 245, y: 175 }" :to="{ x: 435, y: 175 }" side="below" :thickness="12" :gap="20" />
    <rect x="306" y="131" width="68" height="44" rx="8" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
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
    <CourseArrow :from="{ x: 340, y: 153 }" :to="{ x: 380, y: 175 }" stroke="var(--c-accent)" :stroke-width="3.2" label="F" :label-dx="16" :label-dy="-2" />
    <path d="M 374 153 A 34 34 0 0 1 369.4 170" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="379" y="163" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)">α</text>
    <!-- ==================== 丙：α = 30°（F 斜向前上方） ==================== -->
    <text x="475" y="52" font-size="19" fill="var(--c-accent)">丙</text>
    <SurfaceHatch :from="{ x: 472, y: 175 }" :to="{ x: 662, y: 175 }" side="below" :thickness="12" :gap="20" />
    <rect x="533" y="131" width="68" height="44" rx="8" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
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
    <CourseArrow :from="{ x: 567, y: 153 }" :to="{ x: 620, y: 123 }" stroke="var(--c-accent)" :stroke-width="3.2" label="F" :label-dx="10" :label-dy="-10" />
    <path d="M 601 153 A 34 34 0 0 0 596.4 136" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="602" y="144" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)">α</text>
  </svg>
</template>
