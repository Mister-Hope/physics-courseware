<template>
  <!-- 第 1 页封面装饰：左侧铀核裂变（一个大核分成两块，放出中子），右侧两个轻核聚合成一个较重的核 -->
  <svg viewBox="0 0 286 126" width="276" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="54" cy="72" r="16" fill="var(--c-accent-soft)" stroke="var(--c-accent)" stroke-width="2" />
    <circle cx="48" cy="68" r="3" fill="var(--c-accent)" opacity="0.9" />
    <circle cx="60" cy="69" r="3" fill="var(--c-text-dim)" opacity="0.8" />
    <circle cx="54" cy="78" r="3" fill="var(--c-text-dim)" opacity="0.8" />
    <CourseArrow :from="{ x: 68, y: 64 }" :to="{ x: 94, y: 46 }" stroke="var(--c-accent)" stroke-width="1.8" />
    <CourseArrow :from="{ x: 68, y: 80 }" :to="{ x: 94, y: 98 }" stroke="var(--c-accent)" stroke-width="1.8" />
    <ellipse cx="105" cy="42" rx="9" ry="8" fill="var(--c-accent-2-soft)" stroke="var(--c-accent-2)" stroke-width="1.8" />
    <ellipse cx="105" cy="102" rx="9" ry="8" fill="var(--c-accent-2-soft)" stroke="var(--c-accent-2)" stroke-width="1.8" />
    <circle cx="80" cy="94" r="2.4" fill="var(--c-velocity)" />
    <circle cx="88" cy="82" r="2.4" fill="var(--c-velocity)" />
    <circle cx="78" cy="50" r="2.4" fill="var(--c-velocity)" />
    <line x1="136" y1="18" x2="136" y2="108" stroke="currentColor" stroke-width="1" stroke-dasharray="3 5" opacity="0.22" />
    <circle cx="180" cy="44" r="8.5" fill="var(--c-accent-2-soft)" stroke="var(--c-accent-2)" stroke-width="1.8" />
    <circle cx="180" cy="84" r="8.5" fill="var(--c-accent-2-soft)" stroke="var(--c-accent-2)" stroke-width="1.8" />
    <circle cx="178" cy="42" r="2.2" fill="var(--c-danger)" />
    <circle cx="183" cy="46" r="2.2" fill="var(--c-text-dim)" />
    <circle cx="178" cy="82" r="2.2" fill="var(--c-danger)" />
    <circle cx="183" cy="86" r="2.2" fill="var(--c-text-dim)" />
    <CourseArrow :from="{ x: 190, y: 48 }" :to="{ x: 226, y: 60 }" stroke="var(--c-accent-2)" stroke-width="1.8" />
    <CourseArrow :from="{ x: 190, y: 80 }" :to="{ x: 226, y: 68 }" stroke="var(--c-accent-2)" stroke-width="1.8" />
    <circle cx="242" cy="64" r="13" fill="var(--c-accent-soft)" stroke="var(--c-accent)" stroke-width="2" />
    <circle cx="237" cy="60" r="2.6" fill="var(--c-accent)" />
    <circle cx="247" cy="62" r="2.6" fill="var(--c-text-dim)" />
    <circle cx="241" cy="70" r="2.6" fill="var(--c-text-dim)" />
    <line x1="242" y1="51" x2="242" y2="38" stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round" opacity="0.8" />
    <line x1="255" y1="64" x2="268" y2="64" stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round" opacity="0.8" />
    <line x1="242" y1="77" x2="242" y2="90" stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round" opacity="0.8" />
    <line x1="229" y1="64" x2="216" y2="64" stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round" opacity="0.8" />
  </svg>
</template>
