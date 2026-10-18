<template>
  <!-- 打点计时器验证自由落体机械能的实验装置：铁架台、限位孔、重物与纸带 -->
  <svg width="380" height="480" viewBox="0 0 380 480" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="40" y1="452" x2="130" y2="452" stroke="var(--c-line-strong)" stroke-width="6" stroke-linecap="round" />
    <line x1="85" y1="60" x2="85" y2="452" stroke="var(--c-line-strong)" stroke-width="5" stroke-linecap="round" />
    <rect x="85" y="72" width="130" height="52" rx="10" fill="var(--c-surface-strong)" stroke="var(--c-line-strong)" stroke-width="3" />
    <circle cx="102" cy="98" r="7" fill="var(--c-info)" />
    <circle cx="124" cy="98" r="7" fill="var(--c-info)" />
    <text x="150" y="104" font-size="13" fill="var(--c-ink-faint)" font-family="system-ui">打点计时器</text>
    <line x1="102" y1="124" x2="102" y2="308" stroke="var(--c-bg-soft)" stroke-width="14" stroke-linecap="round" />
    <line x1="102" y1="124" x2="102" y2="308" stroke="var(--c-line-strong)" stroke-width="2" stroke-dasharray="4 6" opacity="0.7" />
    <circle cx="102" cy="152" r="4" fill="var(--c-ink)" />
    <circle cx="102" cy="176" r="4" fill="var(--c-ink)" />
    <circle cx="102" cy="206" r="4" fill="var(--c-ink)" />
    <circle cx="102" cy="244" r="4" fill="var(--c-ink)" />
    <text x="118" y="230" font-size="12.5" fill="var(--c-ink-faint)" font-family="system-ui">纸带</text>
    <rect x="82" y="308" width="40" height="52" rx="8" fill="var(--c-warn)" fill-opacity="0.3" stroke="var(--c-warn)" stroke-width="4" />
    <text x="136" y="340" font-size="13" fill="var(--c-ink)" font-family="system-ui">重物</text>
    <CourseArrow :x1="102" y1="376" x2="102" y2="424" color="var(--c-info)" :width="3.5" />
    <text x="112" y="410" font-size="15" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">v</text>
    <line x1="300" y1="308" x2="300" y2="360" stroke="var(--c-ok)" stroke-width="2" stroke-dasharray="5 6" opacity="0.7" />
    <path d="M294 314 l6 -8 l6 8" stroke="var(--c-ok)" stroke-width="2.5" fill="none" />
    <path d="M294 354 l6 8 l6 -8" stroke="var(--c-ok)" stroke-width="2.5" fill="none" />
    <text x="256" y="298" font-size="13" fill="var(--c-ok)" font-family="system-ui">下落高度</text>
    <text x="266" y="390" font-size="12.5" fill="var(--c-ink-faint)" font-family="system-ui">重物质量</text>
    <text x="266" y="410" font-size="13" fill="var(--c-warn)" font-family="KaTeX_Main" font-style="italic">m</text>
  </svg>
</template>
