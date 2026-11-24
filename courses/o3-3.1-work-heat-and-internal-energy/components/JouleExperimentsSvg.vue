<!-- 第 4 页：焦耳的两个实验——重物搅水（机械能→内能）与电流加热（电能→内能） -->
<template>
  <svg viewBox="0 0 460 300" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="230" y1="24" x2="230" y2="276" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="3 6" opacity=".2" />
    <line x1="34" y1="30" x2="196" y2="30" stroke="var(--c-text-dim)" stroke-width="2.5" />
    <circle cx="115" cy="42" r="9" fill="none" stroke="var(--c-text-dim)" stroke-width="2" />
    <polyline points="183,64 183,34 115,34 115,33" fill="none" stroke="var(--c-text-dim)" stroke-width="1.3" opacity=".7" />
    <rect x="172" y="64" width="22" height="40" rx="2" fill="var(--c-neutral-600)" opacity=".8" />
    <CourseArrow :from="{ x: 204, y: 68 }" :to="{ x: 204, y: 104 }" stroke="var(--c-accent)" :stroke-width="2" :head-size="8" />
    <rect x="34" y="112" width="162" height="136" rx="6" fill="none" stroke="var(--c-text-dim)" stroke-width="2.5" opacity=".8" />
    <rect x="36" y="152" width="158" height="94" fill="var(--c-velocity)" opacity=".16" />
    <line x1="36" y1="152" x2="194" y2="152" stroke="var(--c-velocity)" stroke-width="1.5" opacity=".5" />
    <line x1="115" y1="51" x2="115" y2="222" stroke="var(--c-text-dim)" stroke-width="2.5" opacity=".6" />
    <line x1="99" y1="196" x2="131" y2="196" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" opacity=".75" />
    <line x1="99" y1="208" x2="131" y2="208" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" opacity=".75" />
    <line x1="99" y1="220" x2="131" y2="220" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" opacity=".75" />
    <text x="183" y="58" font-size="11" text-anchor="middle" fill="var(--c-text-dim)">重物</text>
    <text x="60" y="238" font-size="11" fill="var(--c-text-dim)">水</text>
    <text x="115" y="104" font-size="11" text-anchor="middle" fill="var(--c-text-dim)">绝热容器</text>
    <text x="115" y="286" font-size="12.5" text-anchor="middle" fill="var(--c-text)">重物下落，叶片搅水</text>
    <rect x="252" y="112" width="162" height="136" rx="6" fill="none" stroke="var(--c-text-dim)" stroke-width="2.5" opacity=".8" />
    <rect x="254" y="152" width="158" height="94" fill="var(--c-velocity)" opacity=".16" />
    <line x1="254" y1="152" x2="412" y2="152" stroke="var(--c-velocity)" stroke-width="1.5" opacity=".5" />
    <path
      d="M282 226 L296 214 L310 226 L324 214 L338 226 L352 214 L366 226"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <polyline points="282,226 282,80 320,80" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <polyline points="366,226 366,80 336,80" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <CircuitBattery :x="328" :y="80" :plate-gap="16" :long-plate="30" :short-plate="15" />
    <CourseArrow :from="{ x: 282, y: 118 }" :to="{ x: 282, y: 158 }" stroke="var(--c-velocity)" :stroke-width="2" :head-size="8" />
    <text x="292" y="142" font-size="13" font-family="KaTeX_Math" font-style="italic" fill="var(--c-velocity)">I</text>
    <path d="M296 190 q8 -8 16 0 q8 8 16 0" fill="none" stroke="var(--c-danger)" stroke-width="2" opacity=".55" />
    <path d="M330 186 q8 -8 16 0 q8 8 16 0" fill="none" stroke="var(--c-danger)" stroke-width="2" opacity=".4" />
    <text x="328" y="56" font-size="11" text-anchor="middle" fill="var(--c-text-dim)">电源</text>
    <text x="270" y="170" font-size="11" fill="var(--c-text-dim)">水</text>
    <text x="412" y="242" font-size="11" text-anchor="end" fill="var(--c-text-dim)">电阻丝</text>
    <text x="333" y="286" font-size="12.5" text-anchor="middle" fill="var(--c-text)">电流通过电阻丝加热</text>
  </svg>
</template>
