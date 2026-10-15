<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
</script>

<template>
  <!-- 第 8 页 例③：光滑斜面上物块下滑，重力 G、支持力 F_N、沿斜面向下的 mg sinθ、垂直斜面向下的 mg cosθ 四个力都从物块几何中心 (184,124) 出发；
       物块不脱离也不嵌入斜面 ⇒ 垂直斜面方向平衡，所以 F_N 与 mg cosθ 等长、方向相反（F_N 终点 = 中心沿 cosθ 方向反向等长平移 27,51）（受力分析部分受 showForces 控制） -->
  <svg viewBox="0 0 380 250" width="100%" style="max-width: 420px" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 60 210 L 340 210 L 340 60 Z"
      fill="color-mix(in srgb, var(--c-text-dim) 14%, transparent)"
      stroke="color-mix(in srgb, var(--c-text-dim) 50%, transparent)"
      stroke-width="1.6"
    />
    <SurfaceHatch :from="{ x: 52, y: 210 }" :to="{ x: 348, y: 210 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <path d="M 105 210 A 45 45 0 0 0 99.7 188.7" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="100" y="199" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-neutral-200)" text-anchor="middle">θ</text>
    <g transform="translate(60,210) rotate(-28.2)">
      <rect
        x="127"
        y="-34"
        width="46"
        height="34"
        rx="4"
        fill="color-mix(in srgb, var(--c-surface-solid) 85%, transparent)"
        stroke="var(--c-accent)"
        stroke-width="2"
      />
    </g>
    <text x="197" y="117" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-text)" text-anchor="middle">m</text>
    <text x="285" y="84" font-size="12" fill="var(--c-text-dim)" text-anchor="middle">光滑</text>
    <g v-if="showForces">
      <CourseArrow :from="{ x: 184, y: 124 }" :to="{ x: 122, y: 157 }" stroke="var(--c-physics)" :stroke-width="2.6" stroke-dasharray="7 5" />
      <text
        x="118"
        y="170"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="13"
        fill="var(--c-physics)"
        text-anchor="end"
        stroke="var(--c-bg-soft)"
        stroke-width="3"
        paint-order="stroke"
      >
        <tspan>mg</tspan>
        <tspan dx="4" font-family="KaTeX_Main" font-style="normal">sin</tspan>
        <tspan dx="1" font-family="KaTeX_Math" font-style="italic">θ</tspan>
      </text>
      <CourseArrow :from="{ x: 184, y: 124 }" :to="{ x: 211, y: 175 }" stroke="var(--c-physics)" :stroke-width="2.6" stroke-dasharray="7 5" />
      <text
        x="218"
        y="184"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="13"
        fill="var(--c-physics)"
        text-anchor="start"
        stroke="var(--c-bg-soft)"
        stroke-width="3"
        paint-order="stroke"
      >
        <tspan>mg</tspan>
        <tspan dx="4" font-family="KaTeX_Main" font-style="normal">cos</tspan>
        <tspan dx="1" font-family="KaTeX_Math" font-style="italic">θ</tspan>
      </text>
      <CourseArrow :from="{ x: 184, y: 124 }" :to="{ x: 184, y: 190 }" stroke="var(--c-force)" :stroke-width="3.5" label="G" :label-dx="-16" :label-dy="8" />
      <CourseArrow :from="{ x: 184, y: 124 }" :to="{ x: 157, y: 73 }" stroke="var(--c-accent)" :stroke-width="3" />
      <text
        x="150"
        y="62"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        fill="var(--c-accent)"
        text-anchor="end"
        stroke="var(--c-bg-soft)"
        stroke-width="3"
        paint-order="stroke"
      >
        <tspan>F</tspan>
        <tspan dy="3" font-size="10">N</tspan>
      </text>
    </g>
  </svg>
</template>
