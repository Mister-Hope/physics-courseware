<script setup lang="ts">
const { showDecomp = false } = defineProps<{ showDecomp?: boolean }>();
</script>

<template>
  <!-- 第 6 页：物块所受合外力 F 的正交分解——合力 F 与两个分力 F1 / F2 一律用金色、都从物块几何中心出发，虚线矩形表示分解关系；
       红色加速度 a 与分加速度 a1 / a2 与对应力箭头严格平行、起点都是物块中心右上的 (113,82)，长度按对应力箭头的 70% 缩短，
       箭头更细更淡，不与金色力箭头糊在一起。
       合力 F 属题干常显；两个分力、虚线矩形与全部加速度箭头由 showDecomp 控制（点击后才出）。
       带下角标的标签一律写成「字母紧跟 <tspan>」的同一行，并用 prettier-ignore 挡住 oxfmt 的换行（换行会在字母与角标之间渲染出一个空格）。 -->
  <svg viewBox="0 0 420 320" width="100%" style="max-width: 420px" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="60" y="60" width="90" height="60" rx="6" fill="rgba(30,41,59,0.85)" stroke="#e2a846" stroke-width="2" />
    <text x="105" y="78" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#f1f5f9" text-anchor="middle">m</text>
    <CourseArrow :from="{ x: 105, y: 90 }" :to="{ x: 338, y: 245 }" stroke="#e2a846" :stroke-width="3.4" />
    <text
      x="300"
      y="242"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="22"
      fill="#e2a846"
      text-anchor="middle"
      stroke="#0f1425"
      stroke-width="3"
      paint-order="stroke"
    >
      F
    </text>
    <g v-if="showDecomp">
      <path d="M 105 90 L 338 90 L 338 245 L 105 245 Z" fill="none" stroke="rgba(148,163,184,0.5)" stroke-width="1.6" stroke-dasharray="7 5" />
      <CourseArrow :from="{ x: 105, y: 90 }" :to="{ x: 338, y: 90 }" stroke="#e2a846" :stroke-width="2.8" />
      <CourseArrow :from="{ x: 105, y: 90 }" :to="{ x: 105, y: 245 }" stroke="#e2a846" :stroke-width="2.8" />
      <CourseArrow :from="{ x: 113, y: 82 }" :to="{ x: 276, y: 82 }" stroke="#f87171" :stroke-width="2.2" opacity="0.9" />
      <CourseArrow :from="{ x: 113, y: 82 }" :to="{ x: 113, y: 191 }" stroke="#f87171" :stroke-width="2.2" opacity="0.9" />
      <CourseArrow :from="{ x: 113, y: 82 }" :to="{ x: 276, y: 191 }" stroke="#f87171" :stroke-width="2.4" opacity="0.9" />
      <!-- prettier-ignore -->
      <text
        x="300"
        y="112"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#e2a846"
        text-anchor="middle"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >F<tspan font-size="14" dy="4">1</tspan></text>
      <!-- prettier-ignore -->
      <text
        x="88"
        y="195"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#e2a846"
        text-anchor="end"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >F<tspan font-size="14" dy="4">2</tspan></text>
      <!-- prettier-ignore -->
      <text
        x="230"
        y="68"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#f87171"
        text-anchor="middle"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >a<tspan font-size="14" dy="4">1</tspan></text>
      <!-- prettier-ignore -->
      <text
        x="126"
        y="165"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#f87171"
        text-anchor="start"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >a<tspan font-size="14" dy="4">2</tspan></text>
      <text
        x="285"
        y="178"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#f87171"
        text-anchor="middle"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        a
      </text>
    </g>
  </svg>
</template>
