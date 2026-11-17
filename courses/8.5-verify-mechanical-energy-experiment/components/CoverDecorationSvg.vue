<template>
  <svg width="860" height="320" viewBox="0 0 860 320" fill="none" xmlns="http://www.w3.org/2000/svg" class="fig-cover">
    <defs>
      <linearGradient id="mce85-cv-tape" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--c-bg-soft)" />
        <stop offset="1" stop-color="var(--c-surface)" />
      </linearGradient>
    </defs>
    <rect x="150" y="40" width="120" height="250" rx="10" fill="url(#mce85-cv-tape)" stroke="var(--c-neutral-500)" stroke-width="3" />
    <line x1="210" y1="40" x2="210" y2="290" stroke="var(--c-neutral-500)" stroke-width="2" opacity="0.5" />
    <circle cx="210" cy="76" r="5.5" fill="var(--c-text)" />
    <circle cx="210" cy="98" r="5.5" fill="var(--c-text)" />
    <circle cx="210" cy="128" r="5.5" fill="var(--c-text)" />
    <circle cx="210" cy="166" r="5.5" fill="var(--c-text)" />
    <circle cx="210" cy="212" r="5.5" fill="var(--c-text)" />
    <circle cx="210" cy="266" r="5.5" fill="var(--c-text)" />
    <text x="238" y="80" font-size="13" fill="var(--c-text-dim)" font-family="KaTeX_Main">O</text>
    <text x="238" y="270" font-size="13" fill="var(--c-text-dim)" font-family="KaTeX_Main">A</text>
    <line x1="232" y1="266" x2="300" y2="266" stroke="var(--c-neutral-500)" stroke-width="2" stroke-dasharray="5 6" opacity="0.6" />
    <CourseArrow :from="{ x: 300, y: 266 }" :to="{ x: 300, y: 200 }" stroke="var(--c-accent-2)" :stroke-width="3.2" />
    <text x="310" y="238" font-size="15" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">v</text>
    <rect x="430" y="70" width="180" height="34" rx="8" fill="var(--c-ok)" fill-opacity="0.14" stroke="var(--c-ok)" stroke-width="3" />
    <text x="520" y="92" font-size="15" fill="var(--c-ok)" font-family="system-ui" text-anchor="middle">重力势能的减少量</text>
    <rect x="430" y="140" width="180" height="34" rx="8" fill="var(--c-accent-2)" fill-opacity="0.14" stroke="var(--c-accent-2)" stroke-width="3" />
    <text x="520" y="162" font-size="15" fill="var(--c-accent-2)" font-family="system-ui" text-anchor="middle">动能的增加量</text>
    <text x="520" y="218" font-size="18" fill="var(--c-accent)" font-family="system-ui" text-anchor="middle">相等吗？</text>
    <CourseArrow :from="{ x: 340, y: 290 }" :to="{ x: 410, y: 176 }" stroke="var(--c-text-dim)" :stroke-width="2.5" />
    <CourseArrow :from="{ x: 340, y: 290 }" :to="{ x: 410, y: 106 }" stroke="var(--c-text-dim)" :stroke-width="2.5" />
  </svg>
</template>

<style scoped>
.fig-cover {
  display: block;
  width: 100%;
  max-width: 460px;
  height: auto;
}
</style>
