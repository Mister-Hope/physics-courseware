<template>
  <div class="serve-court">
    <!-- 引课图：排球在左场区被沿水平方向击出、飞过球网（只给场景，不画轨迹、不做分析） -->
    <svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="排球从左场区沿水平方向击出、飞向球网">
      <SurfaceHatch :from="{ x: 40, y: 250 }" :to="{ x: 420, y: 250 }" side="below" />
      <line x1="70" y1="250" x2="70" y2="220" stroke="color-mix(in srgb, var(--c-text-dim) 45%, transparent)" stroke-width="1.8" stroke-dasharray="6 5" />
      <line x1="400" y1="250" x2="400" y2="220" stroke="color-mix(in srgb, var(--c-text-dim) 45%, transparent)" stroke-width="1.8" stroke-dasharray="6 5" />
      <line x1="231" y1="250" x2="231" y2="120" stroke="color-mix(in srgb, var(--c-neutral-300) 55%, transparent)" stroke-width="1.6" />
      <line x1="239" y1="250" x2="239" y2="120" stroke="color-mix(in srgb, var(--c-neutral-300) 55%, transparent)" stroke-width="1.6" />
      <rect x="224" y="113" width="22" height="7" rx="2" fill="var(--c-neutral-200)" />
      <circle cx="150" cy="105" r="7" fill="var(--c-text)" stroke="var(--c-text-dim)" stroke-width="1.5" />
      <CourseArrow :from="{ x: 150, y: 105 }" :to="{ x: 250, y: 105 }" stroke="var(--c-accent)" :stroke-width="3" />
      <text x="200" y="88" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">
        v
        <tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4">0</tspan>
      </text>
    </svg>
  </div>
</template>

<style scoped>
.serve-court {
  min-width: 0;
}

.serve-court svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
