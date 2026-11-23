<template>
  <!-- 做一做：注射器漏出的墨汁在匀速拖动的木板上留下正弦图样 -->
  <svg viewBox="62 26 356 276" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="墨汁图样实验示意图">
    <path
      d="M110 42 H370 M120 42 L111 33 M144 42 L135 33 M168 42 L159 33 M192 42 L183 33 M216 42 L207 33 M240 42 L231 33 M264 42 L255 33 M288 42 L279 33 M312 42 L303 33 M336 42 L327 33 M360 42 L351 33"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-opacity=".4"
    />
    <line x1="110" y1="42" x2="370" y2="42" stroke="var(--c-text-dim)" stroke-width="3" stroke-linecap="round" />
    <circle cx="240" cy="42" r="4.5" fill="var(--c-text-dim)" />
    <line x1="240" y1="42" x2="240" y2="120" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" />
    <rect x="228" y="120" width="24" height="46" rx="3" fill="var(--c-bg-soft)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <line x1="240" y1="120" x2="240" y2="132" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <line x1="240" y1="166" x2="240" y2="198" stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round" />
    <text x="256" y="112" font-size="12" fill="var(--c-text-dim)">注射器（墨汁）</text>
    <rect x="70" y="224" width="340" height="48" rx="4" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.4" />
    <path d="M88 248 q20 -15 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="var(--c-accent-2)" stroke-width="2" stroke-linecap="round" />
    <text x="84" y="266" font-size="11" fill="var(--c-text-dim)">墨迹图样</text>
    <text x="352" y="218" font-size="12" fill="var(--c-text-dim)">木板</text>
    <CourseArrow :from="{ x: 250, y: 286 }" :to="{ x: 330, y: 286 }" stroke="var(--c-accent)" :stroke-width="2.2" :head-size="10" />
    <text x="246" y="291" font-size="12" fill="var(--c-accent)" text-anchor="end">匀速拖动</text>
  </svg>
</template>
