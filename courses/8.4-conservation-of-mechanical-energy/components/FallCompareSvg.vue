<template>
  <!-- 第 6 页（两种下落）：左为真空中的自由下落，只受重力；右为有空气阻力的下落，重力之外还有阻力。
       两球都从 h1 落到 h2——重力做的功相同，而动能的变化不同。定性示意，不标数值。 -->
  <svg class="fig-fall-compare" viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="12" width="388" height="236" rx="16" fill="none" stroke="var(--c-border)" stroke-width="1.6" />
    <rect x="418" y="12" width="388" height="236" rx="16" fill="none" stroke="var(--c-border)" stroke-width="1.6" />
    <text x="208" y="42" font-size="16" fill="var(--c-text-dim)" font-family="system-ui" text-anchor="middle">真空中下落</text>
    <text x="612" y="42" font-size="16" fill="var(--c-text-dim)" font-family="system-ui" text-anchor="middle">空气中下落（有阻力）</text>
    <line x1="70" y1="62" x2="368" y2="62" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="8 6" opacity="0.45" />
    <line x1="70" y1="186" x2="368" y2="186" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="8 6" opacity="0.45" />
    <line x1="474" y1="62" x2="772" y2="62" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="8 6" opacity="0.45" />
    <line x1="474" y1="186" x2="772" y2="186" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="8 6" opacity="0.45" />
    <line x1="208" y1="62" x2="208" y2="226" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 6" opacity="0.35" />
    <line x1="612" y1="62" x2="612" y2="226" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 6" opacity="0.35" />
    <circle cx="208" cy="78" r="14" fill="var(--c-accent-2)" fill-opacity="0.22" stroke="var(--c-accent-2)" stroke-width="3" />
    <circle cx="208" cy="174" r="14" fill="none" stroke="var(--c-accent-2)" stroke-width="2" stroke-dasharray="5 5" opacity="0.55" />
    <circle cx="612" cy="78" r="14" fill="var(--c-accent-2)" fill-opacity="0.22" stroke="var(--c-accent-2)" stroke-width="3" />
    <circle cx="612" cy="174" r="14" fill="none" stroke="var(--c-accent-2)" stroke-width="2" stroke-dasharray="5 5" opacity="0.55" />
    <CourseArrow :from="{ x: 208, y: 78 }" :to="{ x: 208, y: 140 }" stroke="var(--c-danger)" :stroke-width="3" />
    <text x="220" y="130" font-size="15" fill="var(--c-danger)" font-family="KaTeX_Math" font-style="italic">G</text>
    <CourseArrow :from="{ x: 612, y: 78 }" :to="{ x: 612, y: 140 }" stroke="var(--c-danger)" :stroke-width="3" />
    <text x="624" y="132" font-size="15" fill="var(--c-danger)" font-family="KaTeX_Math" font-style="italic">G</text>
    <CourseArrow :from="{ x: 612, y: 78 }" :to="{ x: 612, y: 34 }" stroke="var(--c-physics)" :stroke-width="3" />
    <text x="622" y="52" font-size="15" fill="var(--c-physics)" font-family="KaTeX_Math" font-style="italic">
      F<tspan font-size="10" dy="3">f</tspan>
    </text>
    <line x1="70" y1="226" x2="368" y2="226" stroke="var(--c-neutral-300)" stroke-width="3" stroke-linecap="round" />
    <line x1="474" y1="226" x2="772" y2="226" stroke="var(--c-neutral-300)" stroke-width="3" stroke-linecap="round" />
    <text x="52" y="58" font-size="15" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">
      h<tspan font-size="10" dy="3">1</tspan>
    </text>
    <text x="52" y="190" font-size="15" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">
      h<tspan font-size="10" dy="3">2</tspan>
    </text>
  </svg>
</template>

<style scoped>
.fig-fall-compare {
  display: block;
  width: 100%;
  height: auto;
}
</style>
