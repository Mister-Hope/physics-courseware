<!--
  第 13 页：沿磁场方向看线圈。磁场射入纸面（×），转轴水平。
  线圈转过 θ 后，投影高度按 cosθ 缩短；把线圈分成细条，每条都乘同一个 cosθ。
-->
<template>
  <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="沿磁场方向看，线圈转过 θ 后投影面积变为 S cosθ">
    <g opacity="0.35">
      <FieldDots :x="40" :y="30" :cols="29" :rows="8" :spacing="30" dir="in" color="var(--c-text-dim)" />
    </g>
    <text x="24" y="20" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="16">B</text>
    <text x="42" y="20" fill="var(--c-text-dim)" font-size="12">射入纸面</text>

    <g v-for="panel in panels" :key="panel.angle" :transform="`translate(${panel.cx}, 150)`">
      <line x1="-122" y1="0" x2="122" y2="0" stroke="var(--c-accent-2)" stroke-width="1.6" stroke-dasharray="7 5" opacity="0.9" />
      <text x="128" y="4" fill="var(--c-accent-2)" font-family="KaTeX_Main" font-size="11">轴</text>

      <rect
        v-if="panel.angle !== '90°'"
        :x="-80"
        :y="-80"
        width="160"
        height="160"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.2"
        stroke-dasharray="5 5"
        opacity="0.45"
      />
      <rect
        v-if="panel.angle === '0°'"
        x="-80"
        y="-80"
        width="160"
        height="160"
        fill="var(--c-accent)"
        fill-opacity="0.06"
        stroke="var(--c-accent)"
        stroke-width="3"
      />
      <rect
        v-else-if="panel.angle === '60°'"
        x="-80"
        y="-40"
        width="160"
        height="80"
        fill="var(--c-accent)"
        fill-opacity="0.08"
        stroke="var(--c-accent)"
        stroke-width="3"
      />
      <line v-else x1="-80" y1="0" x2="80" y2="0" stroke="var(--c-accent)" stroke-width="4" stroke-linecap="round" />

      <g v-if="panel.angle === '60°' && step >= 1" fill="none" stroke="var(--c-accent-2)" stroke-width="1.1" opacity="0.75">
        <line v-for="x in [-60, -40, -20, 0, 20, 40, 60]" :key="x" :x1="x" y1="-40" :x2="x" y2="40" />
      </g>
      <rect v-if="panel.angle === '60°' && step >= 1" x="-10" y="-40" width="20" height="80" fill="var(--c-accent)" fill-opacity="0.22" />
      <text
        v-if="panel.angle === '60°' && step >= 1"
        x="0"
        y="56"
        fill="var(--c-accent)"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="13"
        text-anchor="middle"
      >
        Δx
      </text>

      <text x="0" y="112" fill="var(--c-text)" font-family="KaTeX_Main" font-size="15" text-anchor="middle">{{ panel.angle }}</text>
      <text x="0" y="136" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="15" text-anchor="middle">
        <tspan>S</tspan><tspan font-family="KaTeX_Main" font-size="10" dy="4">⊥</tspan><tspan dy="-4" font-family="KaTeX_Main"> = </tspan>
        <template v-if="panel.area === 'cos'"><tspan>S</tspan><tspan font-family="KaTeX_Main"> cos</tspan><tspan>θ</tspan></template>
        <tspan v-else>{{ panel.area }}</tspan>
      </text>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

const panels = [
  { angle: "0°", cx: 150, area: "S" },
  { angle: "60°", cx: 450, area: "cos" },
  { angle: "90°", cx: 750, area: "0" },
];
</script>
