<template>
  <!-- 第 13 页练习图（教材图 8.1-5）：同一位移 l、同一力 F，三种夹角——甲 150°、乙 30°（斜向右下）、丙 30°（斜向右上） -->
  <svg viewBox="10 34 700 206" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="力与位移夹角分别为 150 度、30 度、30 度的三种情形">
    <text x="30" y="56" font-size="19" fill="var(--c-accent)">甲</text>
    <SurfaceHatch :from="{ x: 16, y: 180 }" :to="{ x: 216, y: 180 }" side="below" :thickness="13" :gap="21" />
    <rect x="84" y="136" width="64" height="44" rx="8" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <path d="M 168 158 A 52 52 0 0 0 71 132" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <text x="134" y="92" font-family="KaTeX_Main" font-size="17" fill="var(--c-text-dim)">
      150
      <tspan font-size="12" dy="-7">∘</tspan>
    </text>
    <CourseArrow :from="{ x: 116, y: 158 }" :to="{ x: 40, y: 114 }" stroke="var(--c-accent)" :stroke-width="3.2" />
    <text x="24" y="104" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">F</text>
    <CourseArrow
      :from="{ x: 76, y: 218 }"
      :to="{ x: 178, y: 218 }"
      stroke="var(--c-velocity)"
      :stroke-width="2.6"
      stroke-dasharray="7 5"
      label="l"
      :label-dy="-10"
    />
    <text x="364" y="56" font-size="19" fill="var(--c-accent)">乙</text>
    <SurfaceHatch :from="{ x: 250, y: 180 }" :to="{ x: 450, y: 180 }" side="below" :thickness="13" :gap="21" />
    <rect x="318" y="136" width="64" height="44" rx="8" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <path d="M 396 158 A 46 46 0 0 0 390 181" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <text x="386" y="184" font-family="KaTeX_Main" font-size="17" fill="var(--c-text-dim)">
      30
      <tspan font-size="12" dy="-7">∘</tspan>
    </text>
    <CourseArrow :from="{ x: 350, y: 158 }" :to="{ x: 416, y: 196 }" stroke="var(--c-accent)" :stroke-width="3.2" />
    <text x="428" y="196" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">F</text>
    <CourseArrow
      :from="{ x: 310, y: 218 }"
      :to="{ x: 412, y: 218 }"
      stroke="var(--c-velocity)"
      :stroke-width="2.6"
      stroke-dasharray="7 5"
      label="l"
      :label-dy="-10"
    />
    <text x="598" y="56" font-size="19" fill="var(--c-accent)">丙</text>
    <SurfaceHatch :from="{ x: 484, y: 180 }" :to="{ x: 684, y: 180 }" side="below" :thickness="13" :gap="21" />
    <rect x="552" y="136" width="64" height="44" rx="8" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <path d="M 636 158 A 52 52 0 0 0 627 132" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <text x="648" y="138" font-family="KaTeX_Main" font-size="17" fill="var(--c-text-dim)">
      30
      <tspan font-size="12" dy="-7">∘</tspan>
    </text>
    <CourseArrow :from="{ x: 584, y: 158 }" :to="{ x: 660, y: 114 }" stroke="var(--c-accent)" :stroke-width="3.2" />
    <text x="672" y="106" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">F</text>
    <CourseArrow
      :from="{ x: 544, y: 218 }"
      :to="{ x: 646, y: 218 }"
      stroke="var(--c-velocity)"
      :stroke-width="2.6"
      stroke-dasharray="7 5"
      label="l"
      :label-dy="-10"
    />
  </svg>
</template>
