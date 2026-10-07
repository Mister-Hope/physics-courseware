<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
</script>

<template>
  <!-- 第 11 页 例⑤：光滑斜面上 m2 在上、m1 在下用轻绳相连，对下方的 m1 沿斜面向下施加外力 F（外力属题干、常显，
       箭尾起在 m1 物块下沿之外、箭身不压物块）；两物块沿斜面向下的加速度箭头属分析标注，从各自物块几何中心沿斜面外法线
       外移同样的距离后平行于斜面画出（两支到斜面的垂直距离相等），受 showForces 控制（默认不显示）
       带下角标的标签写成「字母紧跟 <tspan>」的同一行，并用 prettier-ignore 挡住 oxfmt 的换行（换行会在字母与角标之间渲染出一个空格）。 -->
  <svg viewBox="0 0 380 270" width="100%" style="max-width: 420px" xmlns="http://www.w3.org/2000/svg">
    <path d="M 60 220 L 340 220 L 340 70 Z" fill="rgba(148,163,184,0.14)" stroke="rgba(148,163,184,0.5)" stroke-width="1.6" />
    <SurfaceHatch :from="{ x: 52, y: 220 }" :to="{ x: 348, y: 220 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <path d="M 105 220 A 45 45 0 0 0 99.7 198.7" fill="none" stroke="#94a3b8" stroke-width="1.6" />
    <text x="100" y="209" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#e2e8f0" text-anchor="middle">θ</text>
    <g transform="translate(60,220) rotate(-28.2)">
      <rect x="107" y="-30" width="46" height="30" rx="4" fill="rgba(30,41,59,0.85)" stroke="#e2a846" stroke-width="2" />
      <rect x="177" y="-30" width="46" height="30" rx="4" fill="rgba(30,41,59,0.85)" stroke="#e2a846" stroke-width="2" />
      <line x1="153" y1="-15" x2="177" y2="-15" stroke="#cbd5e1" stroke-width="1.6" />
    </g>
    <!-- prettier-ignore -->
    <text x="157" y="112" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#f1f5f9" text-anchor="middle">m<tspan dy="3" font-size="10">1</tspan></text>
    <!-- prettier-ignore -->
    <text x="222" y="84" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#f1f5f9" text-anchor="middle">m<tspan dy="3" font-size="10">2</tspan></text>
    <CourseArrow :from="{ x: 141.9, y: 159.1 }" :to="{ x: 73, y: 196 }" stroke="#e2a846" :stroke-width="3.5" label="F" />
    <g v-if="showForces">
      <CourseArrow :from="{ x: 141.8, y: 122.8 }" :to="{ x: 103, y: 143.6 }" stroke="#2dd4bf" :stroke-width="2.6" label="a" :label-dx="-6" :label-dy="-12" />
      <CourseArrow :from="{ x: 203.5, y: 89.7 }" :to="{ x: 164.7, y: 110.5 }" stroke="#2dd4bf" :stroke-width="2.6" label="a" :label-dx="-6" :label-dy="-12" />
    </g>
    <text x="295" y="82" font-size="12" fill="#94a3b8" text-anchor="middle">光滑</text>
  </svg>
</template>
