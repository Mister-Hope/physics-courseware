<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
</script>

<template>
  <!-- 第 12 页 物块沿粗糙斜面下滑的受力图：速度 v 沿斜面向下、画在物块旁侧；点击后从物块几何中心 (184,124) 画出重力 G（竖直向下）、支持力 F_N（垂直斜面向上）、滑动摩擦力 F_f（沿斜面向上，与下滑方向相反），以及青色虚线的重力分力 mg sinθ（沿斜面向下）、mg cosθ（垂直斜面向下） -->
  <svg viewBox="0 0 380 250" width="100%" style="max-width: 420px" xmlns="http://www.w3.org/2000/svg">
    <path d="M 60 210 L 340 210 L 340 60 Z" fill="rgba(148,163,184,0.14)" stroke="rgba(148,163,184,0.5)" stroke-width="1.6" />
    <SurfaceHatch :from="{ x: 52, y: 210 }" :to="{ x: 348, y: 210 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <g transform="translate(60,210) rotate(-28.2)">
      <SurfaceHatch :from="{ x: 0, y: 0 }" :to="{ x: 317, y: 0 }" side="below" color="#64748b" :line-width="1.6" :thickness="7" :gap="20" />
    </g>
    <path d="M 105 210 A 45 45 0 0 0 99.7 188.7" fill="none" stroke="#94a3b8" stroke-width="1.6" />
    <text x="100" y="199" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#e2e8f0" text-anchor="middle">θ</text>
    <g transform="translate(60,210) rotate(-28.2)">
      <rect x="127" y="-34" width="46" height="34" rx="4" fill="rgba(30,41,59,0.85)" stroke="#e2a846" stroke-width="2" />
    </g>
    <text x="188" y="106" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#f1f5f9" text-anchor="middle">M</text>
    <text x="316" y="95" font-size="12" fill="#94a3b8" text-anchor="middle">粗糙</text>
    <CourseArrow :from="{ x: 152, y: 111 }" :to="{ x: 112, y: 133 }" stroke="#60a5fa" :stroke-width="2.8" />
    <text x="126" y="110" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="#60a5fa" text-anchor="middle">v</text>
    <g v-if="showForces">
      <CourseArrow :from="{ x: 184, y: 124 }" :to="{ x: 119, y: 159 }" stroke="#2dd4bf" :stroke-width="2.6" stroke-dasharray="7 5" />
      <text
        x="118"
        y="170"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="13"
        fill="#2dd4bf"
        text-anchor="end"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        <tspan>mg</tspan>
        <tspan dx="4" font-family="KaTeX_Main" font-style="normal">sin</tspan>
        <tspan dx="1" font-family="KaTeX_Math" font-style="italic">θ</tspan>
      </text>
      <CourseArrow :from="{ x: 184, y: 124 }" :to="{ x: 211, y: 175 }" stroke="#2dd4bf" :stroke-width="2.6" stroke-dasharray="7 5" />
      <text
        x="218"
        y="184"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="13"
        fill="#2dd4bf"
        text-anchor="start"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        <tspan>mg</tspan>
        <tspan dx="4" font-family="KaTeX_Main" font-style="normal">cos</tspan>
        <tspan dx="1" font-family="KaTeX_Math" font-style="italic">θ</tspan>
      </text>
      <CourseArrow :from="{ x: 184, y: 124 }" :to="{ x: 184, y: 200 }" stroke="#f87171" :stroke-width="3.2" label="G" :label-dx="-16" :label-dy="8" />
      <CourseArrow :from="{ x: 184, y: 124 }" :to="{ x: 227, y: 101 }" stroke="#f87171" :stroke-width="3.2" />
      <text
        x="219"
        y="88"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        fill="#f87171"
        text-anchor="middle"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        <tspan>F</tspan>
        <tspan dy="3" font-size="10">f</tspan>
      </text>
      <CourseArrow :from="{ x: 184, y: 124 }" :to="{ x: 157, y: 73 }" stroke="#e2a846" :stroke-width="3" />
      <text
        x="150"
        y="62"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        fill="#e2a846"
        text-anchor="end"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        <tspan>F</tspan>
        <tspan dy="3" font-size="10">N</tspan>
      </text>
    </g>
  </svg>
</template>
