<script setup lang="ts">
/**
 * 第 2 / 8 页示意图：物体竖直下落（左格）与竖直抬升（右格）。
 *
 * 干净版只画几何：地面、h₁ 与 h₂ 两条等高虚线、物体在两个位置（实心 = 初位置，虚线 = 末位置）。
 * showForces：点击后出现重力 G（从物体几何中心竖直向下）。
 * showEnergy：点击后出现 E_p1 / E_p2 标注与 W_G 的正负。
 *
 * 版面：viewBox 580×270，页面里按 400px 宽渲染（≈186px 高）。
 */
const { showForces = false, showEnergy = false } = defineProps<{
  /** 点击后出现：两个位置上的重力箭头 */
  showForces?: boolean;
  /** 点击后出现：E_p1 / E_p2 与 W_G 的正负 */
  showEnergy?: boolean;
}>();

/** 地面高度（两个格子共用同一水平线） */
const GROUND = 235;
</script>

<template>
  <svg viewBox="0 0 580 270" width="100%" style="max-width: 380px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="物体竖直下落与竖直抬升时重力做的功">
    <SurfaceHatch :from="{ x: 40, y: GROUND }" :to="{ x: 250, y: GROUND }" side="below" :thickness="12" :gap="20" />
    <SurfaceHatch :from="{ x: 330, y: GROUND }" :to="{ x: 540, y: GROUND }" side="below" :thickness="12" :gap="20" />

    <line x1="66" y1="70" x2="236" y2="70" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="6 5" />
    <line x1="66" y1="165" x2="236" y2="165" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="6 5" />
    <line x1="346" y1="70" x2="516" y2="70" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="6 5" />
    <line x1="346" y1="165" x2="516" y2="165" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="6 5" />
    <text x="60" y="64" font-size="21" fill="var(--c-text-dim)" text-anchor="end" class="vrf-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">h</tspan><tspan font-family="KaTeX_Main" font-size="14" dy="5">1</tspan>
    </text>
    <text x="60" y="159" font-size="21" fill="var(--c-text-dim)" text-anchor="end" class="vrf-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">h</tspan><tspan font-family="KaTeX_Main" font-size="14" dy="5">2</tspan>
    </text>
    <text x="340" y="64" font-size="21" fill="var(--c-text-dim)" text-anchor="end" class="vrf-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">h</tspan><tspan font-family="KaTeX_Main" font-size="14" dy="5">1</tspan>
    </text>
    <text x="340" y="159" font-size="21" fill="var(--c-text-dim)" text-anchor="end" class="vrf-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">h</tspan><tspan font-family="KaTeX_Main" font-size="14" dy="5">2</tspan>
    </text>

    <rect x="110" y="40" width="64" height="30" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <rect x="110" y="135" width="64" height="30" rx="6" fill="none" stroke="var(--c-text-dim)" stroke-width="2" stroke-dasharray="6 5" />
    <rect x="390" y="135" width="64" height="30" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <rect x="390" y="40" width="64" height="30" rx="6" fill="none" stroke="var(--c-text-dim)" stroke-width="2" stroke-dasharray="6 5" />

    <line x1="214" y1="70" x2="214" y2="165" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="205" y1="70" x2="223" y2="70" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="205" y1="165" x2="223" y2="165" stroke="var(--c-accent)" stroke-width="2.4" />
    <text x="228" y="124" font-size="20" fill="var(--c-accent)" class="vrf-lbl">
      <tspan font-family="KaTeX_Main">Δ</tspan><tspan font-family="KaTeX_Math" font-style="italic">h</tspan>
    </text>
    <line x1="494" y1="70" x2="494" y2="165" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="485" y1="70" x2="503" y2="70" stroke="var(--c-accent)" stroke-width="2.4" />
    <line x1="485" y1="165" x2="503" y2="165" stroke="var(--c-accent)" stroke-width="2.4" />
    <text x="508" y="124" font-size="20" fill="var(--c-accent)" class="vrf-lbl">
      <tspan font-family="KaTeX_Main">Δ</tspan><tspan font-family="KaTeX_Math" font-style="italic">h</tspan>
    </text>

    <g v-if="showForces">
      <CourseArrow :from="{ x: 142, y: 55 }" :to="{ x: 142, y: 118 }" stroke="var(--c-force)" :stroke-width="3" label="G" :label-dx="-16" :label-dy="2" />
      <CourseArrow :from="{ x: 422, y: 150 }" :to="{ x: 422, y: 213 }" stroke="var(--c-force)" :stroke-width="3" label="G" :label-dx="-16" :label-dy="2" />
    </g>

    <g v-if="showEnergy">
      <text x="96" y="34" font-size="21" fill="var(--c-accent)" text-anchor="end" class="vrf-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">E</tspan><tspan font-family="KaTeX_Main" font-size="14" dy="5">p1</tspan>
      </text>
      <text x="96" y="164" font-size="21" fill="var(--c-accent-2)" text-anchor="end" class="vrf-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">E</tspan><tspan font-family="KaTeX_Main" font-size="14" dy="5">p2</tspan>
      </text>
      <text x="76" y="202" font-size="19" fill="var(--c-force)" class="vrf-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">W</tspan><tspan font-family="KaTeX_Main" font-size="13" dy="4">G</tspan><tspan dy="-4" font-family="KaTeX_Main"> &gt; 0</tspan>
      </text>
      <text x="376" y="34" font-size="21" fill="var(--c-accent-2)" text-anchor="end" class="vrf-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">E</tspan><tspan font-family="KaTeX_Main" font-size="14" dy="5">p2</tspan>
      </text>
      <text x="376" y="164" font-size="21" fill="var(--c-accent)" text-anchor="end" class="vrf-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">E</tspan><tspan font-family="KaTeX_Main" font-size="14" dy="5">p1</tspan>
      </text>
      <text x="336" y="202" font-size="19" fill="var(--c-force)" class="vrf-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">W</tspan><tspan font-family="KaTeX_Main" font-size="13" dy="4">G</tspan><tspan dy="-4" font-family="KaTeX_Main"> &lt; 0</tspan>
      </text>
    </g>

    <text x="145" y="260" font-size="17" fill="var(--c-text-dim)" text-anchor="middle">竖直下落</text>
    <text x="425" y="260" font-size="17" fill="var(--c-text-dim)" text-anchor="middle">竖直抬升</text>
  </svg>
</template>

<style scoped>
.vrf-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
