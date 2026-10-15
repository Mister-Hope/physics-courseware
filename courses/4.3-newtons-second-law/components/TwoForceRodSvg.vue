<template>
  <!-- 第 24 页：两端都是铰链的二力杆——弹力一定沿杆。（取自 3.1 轻杆模型那一页） -->
  <svg class="figure" viewBox="0 0 300 190" style="max-width: 14rem" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="6"
      y="118"
      width="32"
      height="32"
      rx="4"
      fill="color-mix(in srgb, var(--c-text-dim) 22%, transparent)"
      stroke="var(--c-neutral-300)"
      stroke-width="2.2"
    />
    <rect
      x="262"
      y="28"
      width="32"
      height="32"
      rx="4"
      fill="color-mix(in srgb, var(--c-text-dim) 22%, transparent)"
      stroke="var(--c-neutral-300)"
      stroke-width="2.2"
    />
    <line x1="38" y1="134" x2="262" y2="44" stroke="var(--c-accent)" stroke-width="6" stroke-linecap="round" />
    <circle cx="38" cy="134" r="9" fill="var(--c-bg-soft)" stroke="#7dd3fc" stroke-width="3" />
    <circle cx="262" cy="44" r="9" fill="var(--c-bg-soft)" stroke="#7dd3fc" stroke-width="3" />
    <CourseArrow :from="{ x: 262, y: 44 }" :to="{ x: 292, y: 31 }" stroke="var(--c-accent)" :stroke-width="3.4" />
  </svg>
</template>
