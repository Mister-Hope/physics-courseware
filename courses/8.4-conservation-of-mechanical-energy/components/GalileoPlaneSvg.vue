<template>
  <!-- 伽利略理想斜面思想实验：右侧斜面越平缓，球滚得越远但仍回到同一高度 -->
  <svg width="720" height="360" viewBox="0 0 720 360" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="60" y1="300" x2="240" y2="96" stroke="var(--c-line-strong)" stroke-width="4" stroke-linecap="round" />
    <line x1="240" y1="300" x2="660" y2="300" stroke="var(--c-line-strong)" stroke-width="4" stroke-linecap="round" />
    <line x1="240" y1="300" x2="430" y2="152" stroke="var(--c-line-strong)" stroke-width="4" stroke-linecap="round" stroke-dasharray="10 9" opacity="0.5" />
    <line x1="64" y1="96" x2="660" y2="96" stroke="var(--c-line-strong)" stroke-width="2" stroke-dasharray="8 8" opacity="0.55" />
    <text x="46" y="90" font-size="14" fill="var(--c-ink-faint)" font-family="KaTeX_Main">h</text>
    <circle cx="92" cy="253" r="15" fill="var(--c-warn)" fill-opacity="0.35" stroke="var(--c-warn)" stroke-width="4" />
    <CourseArrow :x1="110" y1="235" x2="150" y2="191" color="var(--c-info)" :width="3" />
    <text x="132" y="222" font-size="14" fill="var(--c-info)" font-family="KaTeX_Math" font-style="italic">v</text>
    <circle cx="492" cy="214" r="15" fill="var(--c-warn)" fill-opacity="0.2" stroke="var(--c-warn)" stroke-width="4" opacity="0.7" />
    <CourseArrow :x1="504" y1="203" x2="544" y2="172" color="var(--c-info)" :width="3" opacity="0.7" />
    <circle cx="636" cy="106" r="15" fill="var(--c-warn)" fill-opacity="0.12" stroke="var(--c-warn)" stroke-width="4" opacity="0.45" />
    <text x="88" y="292" font-size="13" fill="var(--c-ink-faint)" font-family="KaTeX_Main" text-anchor="middle">释放</text>
    <text x="636" y="86" font-size="13" fill="var(--c-ink-faint)" font-family="KaTeX_Main" text-anchor="middle">同一高度</text>
  </svg>
</template>
