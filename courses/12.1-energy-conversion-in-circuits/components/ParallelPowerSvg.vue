<script setup lang="ts">
/**
 * 第 6 页：并联电路 —— 电源、R₁、R₂ 三条支路接在**同两条**导轨之间，
 * 所以每个电阻两端的电压都等于电源电压（上一版的画法把电源接在两个不同节点上，拓扑是错的）。
 */
</script>

<template>
  <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg">
    <!-- 两条导轨（上、下各一个节点） -->
    <path d="M 90 55 H 380" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 90 185 H 380" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <!-- 电源支路：长板为正极（上），短板为负极（下） -->
    <path d="M 90 55 V 100" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 90 145 V 185" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <line x1="82" y1="100" x2="98" y2="100" stroke="#94a3b8" stroke-width="3.4" stroke-linecap="round" />
    <line x1="86" y1="145" x2="94" y2="145" stroke="#94a3b8" stroke-width="3.4" stroke-linecap="round" />
    <text x="104" y="96" font-size="18" font-weight="700" fill="#f87171">+</text>
    <text x="104" y="155" font-size="18" font-weight="700" fill="#60a5fa">−</text>
    <!-- R₁ 支路 -->
    <path d="M 240 55 V 100" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 240 160 V 185" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <rect x="222" y="100" width="36" height="60" rx="5" fill="rgba(226,168,70,0.10)" stroke="#e2a846" stroke-width="3" />
    <!-- R₂ 支路 -->
    <path d="M 380 55 V 100" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 380 160 V 185" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <rect x="362" y="100" width="36" height="60" rx="5" fill="rgba(226,168,70,0.10)" stroke="#e2a846" stroke-width="3" />
    <!-- 电阻标注 -->
    <text x="240" y="216" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#60a5fa"><tspan>R</tspan><tspan dy="5" font-size="13">1</tspan></text>
    <text x="380" y="216" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#f87171"><tspan>R</tspan><tspan dy="5" font-size="13">2</tspan></text>
    <!-- 电流：自正极出来沿上导轨向右，再分别向下流过两个电阻 -->
    <CourseArrow :from="{ x: 112, y: 55 }" :to="{ x: 176, y: 55 }" stroke="#e2a846" stroke-width="3" label="I" :label-dy="-8" :label-dx="8" />
    <CourseArrow :from="{ x: 240, y: 62 }" :to="{ x: 240, y: 92 }" stroke="#e2a846" stroke-width="3" label="I_1" :label-dy="-6" :label-dx="14" />
    <CourseArrow :from="{ x: 380, y: 62 }" :to="{ x: 380, y: 92 }" stroke="#e2a846" stroke-width="3" label="I_2" :label-dy="-6" :label-dx="14" />
    <!-- 电源两端的电压 U（也就是每个电阻两端的电压） -->
    <CourseArrow :from="{ x: 58, y: 180 }" :to="{ x: 58, y: 60 }" stroke="#60a5fa" stroke-width="2.6" label="U" :label-dx="-16" :label-dy="0" />
  </svg>
</template>