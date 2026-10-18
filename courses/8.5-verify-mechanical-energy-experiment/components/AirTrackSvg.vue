<template>
  <!-- 气垫导轨方案：滑块通过光电门，挡光片宽度 d 除以挡光时间得到瞬时速度 -->
  <svg width="700" height="300" viewBox="0 0 700 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="60" y="180" width="580" height="34" rx="10" fill="var(--c-surface-strong)" stroke="var(--c-line-strong)" stroke-width="3" />
    <g fill="var(--c-line-strong)" opacity="0.55">
      <circle cx="120" cy="197" r="3" />
      <circle cx="180" cy="197" r="3" />
      <circle cx="240" cy="197" r="3" />
      <circle cx="300" cy="197" r="3" />
      <circle cx="360" cy="197" r="3" />
      <circle cx="420" cy="197" r="3" />
      <circle cx="480" cy="197" r="3" />
      <circle cx="540" cy="197" r="3" />
      <circle cx="600" cy="197" r="3" />
    </g>
    <rect x="400" y="118" width="66" height="62" rx="10" fill="var(--c-warn)" fill-opacity="0.28" stroke="var(--c-warn)" stroke-width="3.5" />
    <rect x="426" y="88" width="12" height="30" rx="3" fill="var(--c-danger)" fill-opacity="0.75" stroke="var(--c-danger)" stroke-width="2.5" />
    <text x="448" y="80" font-size="13" fill="var(--c-danger)" font-family="KaTeX_Main" font-style="italic">d</text>
    <path d="M432 66 a8 8 0 0 1 16 0" stroke="var(--c-danger)" stroke-width="1.8" fill="none" opacity="0.7" />
    <line x1="330" y1="120" x2="330" y2="182" stroke="var(--c-line-strong)" stroke-width="3" stroke-linecap="round" />
    <rect x="306" y="60" width="48" height="64" rx="8" fill="var(--c-surface-strong)" stroke="var(--c-line-strong)" stroke-width="3" />
    <text x="330" y="44" font-size="12.5" fill="var(--c-ink-faint)" font-family="system-ui" text-anchor="middle">光电门</text>
    <CourseArrow :x1="500" y1="150" x2="568" y2="150" color="var(--c-info)" :width="3.5" />
    <text x="528" y="136" font-size="15" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">v</text>
    <text x="386" y="246" font-size="13.5" fill="var(--c-ink)" font-family="system-ui">挡光片</text>
    <text x="462" y="246" font-size="13.5" fill="var(--c-ok)" font-family="KaTeX_Main" font-style="italic">v = d / Δt</text>
    <line x1="60" y1="256" x2="640" y2="256" stroke="var(--c-ink-faint)" stroke-width="1.8" stroke-dasharray="6 7" opacity="0.5" />
  </svg>
</template>
