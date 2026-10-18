<template>
  <!-- 第 13 页例题图（教材图 8.2-9）：小球从桌面以上 h₁ = 1.2 m 的 A 点落到地面上的 B 点，桌面高 h₂ = 0.8 m。只画题给的几何与高度，不含任何分析标注。viewBox 580×270，在左窄栏里按栏宽渲染（≈155px 高） -->
  <svg viewBox="0 0 580 270" width="100%" style="max-width: 480px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="小球从桌面以上的 A 点落到地面上的 B 点">
    <SurfaceHatch :from="{ x: 40, y: 225 }" :to="{ x: 540, y: 225 }" side="below" :thickness="12" :gap="20" />
    <rect x="86" y="158" width="240" height="8" rx="3" fill="var(--c-neutral-700)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <line x1="110" y1="166" x2="110" y2="225" stroke="var(--c-text-dim)" stroke-width="5" />
    <line x1="300" y1="166" x2="300" y2="225" stroke="var(--c-text-dim)" stroke-width="5" />

    <line x1="326" y1="160" x2="470" y2="160" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="5 5" />
    <line x1="400" y1="65" x2="400" y2="213" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="6 5" />

    <line x1="360" y1="65" x2="360" y2="160" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="351" y1="65" x2="369" y2="65" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="351" y1="160" x2="369" y2="160" stroke="var(--c-accent)" stroke-width="2.4" />
    <text x="344" y="118" font-size="20" fill="var(--c-accent)" text-anchor="end" class="fbs-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">h</tspan><tspan font-family="KaTeX_Main" font-size="13" dy="5">1</tspan>
      <tspan dy="-5" font-family="KaTeX_Main"> = 1.2 m</tspan>
    </text>
    <line x1="470" y1="160" x2="470" y2="225" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="461" y1="160" x2="479" y2="160" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="461" y1="225" x2="479" y2="225" stroke="var(--c-accent)" stroke-width="2.4" />
    <text x="486" y="198" font-size="20" fill="var(--c-accent)" class="fbs-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">h</tspan><tspan font-family="KaTeX_Main" font-size="13" dy="5">2</tspan>
      <tspan dy="-5" font-family="KaTeX_Main"> = 0.8 m</tspan>
    </text>

    <circle cx="400" cy="65" r="12" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2.2" />
    <circle cx="400" cy="213" r="4.5" fill="var(--c-accent)" />
    <text x="418" y="59" font-size="21" fill="var(--c-text)" class="fbs-lbl">A</text>
    <text x="418" y="221" font-size="21" fill="var(--c-text)" class="fbs-lbl">B</text>
  </svg>
</template>

<style scoped>
.fbs-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
