<template>
  <!-- 第 4 页（动能与重力势能的相互转化）：左为小球由 h1 落到 h2；右侧是同一小球在两个位置的能量条——
       重力势能（绿）随下落减少、动能（蓝）等量增加，两条柱的顶边同落在"总机械能"虚线上。 -->
  <svg class="fig-fall-energy" viewBox="0 0 820 250" xmlns="http://www.w3.org/2000/svg">
    <line x1="40" y1="214" x2="320" y2="214" stroke="var(--c-neutral-300)" stroke-width="3" stroke-linecap="round" />
    <SurfaceHatch :from="{ x: 40, y: 214 }" :to="{ x: 320, y: 214 }" side="below" :thickness="14" :gap="22" />
    <line x1="150" y1="40" x2="150" y2="214" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.4" />
    <line x1="36" y1="58" x2="304" y2="58" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="8 6" opacity="0.45" />
    <line x1="36" y1="176" x2="304" y2="176" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="8 6" opacity="0.45" />
    <circle cx="150" cy="70" r="15" fill="var(--c-accent-2)" fill-opacity="0.22" stroke="var(--c-accent-2)" stroke-width="3" />
    <circle cx="150" cy="164" r="15" fill="var(--c-accent-2)" fill-opacity="0.22" stroke="var(--c-accent-2)" stroke-width="3" />
    <CourseArrow :from="{ x: 182, y: 92 }" :to="{ x: 182, y: 146 }" stroke="var(--c-accent-2)" :stroke-width="2.6" stroke-dasharray="8 6" />
    <text x="194" y="124" font-size="15" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">v</text>
    <text x="90" y="128" font-size="15" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">
      h<tspan font-size="10" dy="3">1</tspan>
    </text>
    <text x="90" y="206" font-size="15" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">
      h<tspan font-size="10" dy="3">2</tspan>
    </text>
    <line x1="404" y1="58" x2="792" y2="58" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="8 6" opacity="0.55" />
    <text x="694" y="46" font-size="15" fill="var(--c-accent)" font-family="system-ui">总机械能</text>
    <rect x="424" y="58" width="120" height="156" fill="var(--c-ok)" fill-opacity="0.18" stroke="var(--c-ok)" stroke-width="2.4" />
    <text x="452" y="144" font-size="18" fill="var(--c-ok)" font-family="KaTeX_Main">
      E<tspan font-size="12" dy="4">p</tspan>
    </text>
    <rect x="624" y="152" width="120" height="62" fill="var(--c-ok)" fill-opacity="0.18" stroke="var(--c-ok)" stroke-width="2.4" />
    <text x="650" y="190" font-size="18" fill="var(--c-ok)" font-family="KaTeX_Main">
      E<tspan font-size="12" dy="4">p</tspan>
    </text>
    <rect x="624" y="58" width="120" height="94" fill="var(--c-accent-2)" fill-opacity="0.18" stroke="var(--c-accent-2)" stroke-width="2.4" />
    <text x="650" y="112" font-size="18" fill="var(--c-accent-2)" font-family="KaTeX_Main">
      E<tspan font-size="12" dy="4">k</tspan>
    </text>
    <text x="190" y="242" font-size="15" fill="var(--c-text-dim)" font-family="system-ui" text-anchor="middle">下落过程</text>
    <text x="584" y="242" font-size="15" fill="var(--c-text-dim)" font-family="system-ui" text-anchor="middle">两个位置的能量条</text>
  </svg>
</template>

<style scoped>
.fig-fall-energy {
  display: block;
  width: 100%;
  height: auto;
}
</style>
