<!--
  第 12 页：把线框和速度画在一起。AB、CD 是平行于转轴的两条边，
  它们绕轴转动，速度 v 与 B 成 θ 角；图中只画这两条边的速度。
-->
<template>
  <svg viewBox="0 0 420 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="矩形线圈 ABCD 绕水平轴转动，AB 和 CD 两边的速度与磁场 B 成 θ 角">
    <g opacity="0.55">
      <CourseArrow
        v-for="x in magneticLines"
        :key="x"
        :from="{ x, y: 34 }"
        :to="{ x, y: 296 }"
        stroke="var(--c-text-dim)"
        stroke-width="1.2"
        stroke-dasharray="6 6"
      />
    </g>
    <text x="126" y="28" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="15">B</text>

    <line x1="48" y1="165" x2="368" y2="165" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="7 6" />
    <text x="374" y="170" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="13">O′</text>

    <polygon points="90,100 330,100 350,240 70,240" fill="var(--c-accent)" fill-opacity="0.04" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <line x1="90" y1="100" x2="330" y2="100" stroke="var(--c-accent)" stroke-width="4" stroke-linecap="round" />
    <line x1="70" y1="240" x2="350" y2="240" stroke="var(--c-accent)" stroke-width="4" stroke-linecap="round" />

    <text x="78" y="94" fill="var(--c-text)" font-family="KaTeX_Math" font-style="italic" font-size="14">A</text>
    <text x="338" y="94" fill="var(--c-text)" font-family="KaTeX_Math" font-style="italic" font-size="14">B</text>
    <text x="358" y="254" fill="var(--c-text)" font-family="KaTeX_Math" font-style="italic" font-size="14">C</text>
    <text x="54" y="254" fill="var(--c-text)" font-family="KaTeX_Math" font-style="italic" font-size="14">D</text>

    <text x="210" y="88" fill="var(--c-accent)" font-size="13" text-anchor="middle">AB 边</text>
    <text x="210" y="258" fill="var(--c-accent)" font-size="13" text-anchor="middle">CD 边</text>

    <CourseArrow :from="{ x: 210, y: 100 }" :to="{ x: 270, y: 140 }" stroke="var(--c-accent-2)" stroke-width="3" label="v" :label-dx="8" :label-dy="-4" />
    <CourseArrow :from="{ x: 210, y: 240 }" :to="{ x: 150, y: 200 }" stroke="var(--c-accent-2)" stroke-width="3" label="v" :label-dx="-18" :label-dy="-6" />

    <path d="M 210 150 A 50 50 0 0 1 247 143" fill="none" stroke="var(--c-accent)" stroke-width="2" />
    <text x="228" y="166" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="15">θ</text>

    <text x="210" y="318" fill="var(--c-text-dim)" font-size="12" text-anchor="middle">线圈绕 OO′ 转动，AB、CD 的速度方向与 B 成 θ 角</text>
  </svg>
</template>

<script setup lang="ts">
const magneticLines = [140, 210, 280];
</script>
