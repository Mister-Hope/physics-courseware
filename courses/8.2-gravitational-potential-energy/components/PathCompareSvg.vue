<template>
  <!-- 第 4 页结论图：同一物体从 A 到 B 的三条路径（竖直下落 / 沿斜面 / 沿曲面），两条等高虚线 → 三者的高度差相同。viewBox 580×220，按 400px 宽渲染（≈152px 高） -->
  <svg viewBox="0 0 580 220" width="100%" style="max-width: 380px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="竖直下落、沿斜面、沿曲面三条路径的高度差相同">
    <SurfaceHatch :from="{ x: 40, y: 160 }" :to="{ x: 540, y: 160 }" side="below" :thickness="12" :gap="20" />
    <line x1="60" y1="45" x2="520" y2="45" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="6 5" />
    <text x="556" y="38" font-size="21" fill="var(--c-text-dim)" text-anchor="end" class="pcs-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">h</tspan><tspan font-family="KaTeX_Main" font-size="14" dy="5">1</tspan>
    </text>
    <text x="556" y="153" font-size="21" fill="var(--c-text-dim)" text-anchor="end" class="pcs-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">h</tspan><tspan font-family="KaTeX_Main" font-size="14" dy="5">2</tspan>
    </text>

    <path d="M 270 45 L 270 160" fill="none" stroke="var(--c-velocity)" stroke-width="3" stroke-linecap="round" />
    <path d="M 270 45 L 120 160 L 270 160" fill="none" stroke="var(--c-physics)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" />
    <path d="M 270 45 C 450 80 450 130 270 160" fill="none" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />

    <circle cx="270" cy="45" r="6.5" fill="var(--c-accent)" />
    <circle cx="270" cy="160" r="6.5" fill="var(--c-accent)" />
    <text x="256" y="38" font-size="21" fill="var(--c-text)" text-anchor="end" class="pcs-lbl">A</text>
    <text x="286" y="180" font-size="21" fill="var(--c-text)" class="pcs-lbl">B</text>
  </svg>
</template>

<style scoped>
.pcs-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
