<script setup lang="ts">
// 练习 6 图：小球被丝线悬挂在水平天花板下，因斥力偏离竖直方向 30°
// show-forces：受力分析（G、F、F_T 均从小球几何中心出发）
defineProps<{ showForces?: boolean }>();
</script>

<template>
  <svg viewBox="0 0 480 340" width="340" height="241">
    <defs>
      <marker id="pcs-f" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-velocity)" />
      </marker>
      <marker id="pcs-g" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-physics)" />
      </marker>
      <marker id="pcs-t" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-gold)" />
      </marker>
    </defs>
    <SurfaceHatch :x="130" :y="48" :width="220" side="top" />
    <line x1="240" y1="48" x2="270" y2="142" stroke="var(--c-text-mute)" stroke-width="2.4" />
    <line x1="240" y1="48" x2="240" y2="175" stroke="var(--c-text-mute)" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 6" />
    <path d="M 240 96 A 52 52 0 0 1 255 100" fill="none" stroke="var(--c-gold)" stroke-width="2" />
    <text x="252" y="88" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-gold)">θ</text>
    <text x="243" y="40" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="var(--c-text-mute)">O</text>
    <circle cx="270" cy="175" r="26" fill="var(--c-sky)" fill-opacity="0.85" />
    <text x="270" y="175" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#fff">q</text>
    <g v-if="showForces">
      <line x1="270" y1="175" x2="270" y2="252" stroke="var(--c-physics)" stroke-width="3.2" marker-end="url(#pcs-g)" />
      <text x="282" y="244" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-physics)">G</text>
      <line x1="270" y1="175" x2="196" y2="186" stroke="var(--c-velocity)" stroke-width="3.2" marker-end="url(#pcs-f)" />
      <text x="176" y="180" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-velocity)">F</text>
      <line x1="270" y1="175" x2="232" y2="52" stroke="var(--c-gold)" stroke-width="3" marker-end="url(#pcs-t)" />
      <ChartLabel :x="222" :y="88" :font-size="15" color="var(--c-gold)">
        <Latex tex="F_T" />
      </ChartLabel>
    </g>
  </svg>
</template>
