<!-- 封面装饰：气缸里的分子，同时被“热”（左侧波纹）和“功”（上方下压箭头）改变内能 -->
<template>
  <svg viewBox="0 0 380 230" width="330" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="205" cy="126" r="72" fill="var(--c-accent)" opacity=".05" />
    <line x1="30" y1="212" x2="352" y2="212" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="4 6" opacity=".35" />
    <path d="M58 108 q10 -10 20 0 q10 10 20 0 q10 -10 20 0" fill="none" stroke="var(--c-danger)" stroke-width="3" stroke-linecap="round" opacity=".55" />
    <path d="M66 130 q10 -10 20 0 q10 10 20 0 q10 -10 20 0" fill="none" stroke="var(--c-danger)" stroke-width="3" stroke-linecap="round" opacity=".4" />
    <path d="M74 152 q10 -10 20 0 q10 10 20 0" fill="none" stroke="var(--c-danger)" stroke-width="3" stroke-linecap="round" opacity=".28" />
    <rect x="150" y="70" width="110" height="116" rx="8" fill="var(--c-bg-soft)" fill-opacity=".55" stroke="var(--c-text-dim)" stroke-width="3" />
    <rect x="152" y="80" width="106" height="8" rx="3" fill="var(--c-accent-2)" opacity=".8" />
    <rect x="199" y="42" width="10" height="38" rx="4" fill="var(--c-text-dim)" opacity=".45" />
    <rect x="184" y="32" width="40" height="9" rx="4" fill="var(--c-accent-2)" opacity=".65" />
    <circle cx="172" cy="118" r="4" fill="var(--c-physics)" opacity=".8" />
    <circle cx="196" cy="130" r="4" fill="var(--c-physics)" opacity=".8" />
    <circle cx="218" cy="116" r="4" fill="var(--c-physics)" opacity=".8" />
    <circle cx="234" cy="142" r="4" fill="var(--c-physics)" opacity=".8" />
    <circle cx="178" cy="154" r="4" fill="var(--c-physics)" opacity=".8" />
    <circle cx="204" cy="168" r="4" fill="var(--c-physics)" opacity=".8" />
    <circle cx="228" cy="166" r="4" fill="var(--c-physics)" opacity=".8" />
    <circle cx="190" cy="144" r="4" fill="var(--c-physics)" opacity=".8" />
    <path d="M198 208 Q186 196 194 184 Q198 192 202 186 Q206 196 198 208 Z" fill="var(--c-danger)" opacity=".8" />
    <path d="M198 207 Q194 199 199 192 Q202 199 200 206 Z" fill="var(--c-accent)" opacity=".9" />
    <CourseArrow :from="{ x: 204, y: 10 }" :to="{ x: 204, y: 28 }" stroke="var(--c-accent)" :stroke-width="3" :head-size="9" />
    <text x="66" y="96" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="var(--c-danger)">Q</text>
    <text x="216" y="22" font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">W</text>
    <text x="272" y="150" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="var(--c-accent)">ΔU</text>
  </svg>
</template>
