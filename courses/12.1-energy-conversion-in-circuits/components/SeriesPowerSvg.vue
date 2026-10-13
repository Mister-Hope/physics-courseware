<script setup lang="ts">
/** 第 5 页：串联电路（电池长板为正极在上，电流自上导线向右、经两个电阻后由下导线回路） */
</script>

<template>
  <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg">
    <!-- 上导线：电源正极 → R₁ → R₂ -->
    <path d="M 90 60 H 172" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 256 60 H 318" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <!-- 右侧竖线 + 下导线（电流自右向左回到负极） -->
    <path d="M 402 60 H 430 V 180 H 90" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <!-- 电源：长板为正极（上），短板为负极（下） -->
    <path d="M 90 60 V 100" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 90 140 V 180" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <line x1="82" y1="100" x2="98" y2="100" stroke="#94a3b8" stroke-width="3.4" stroke-linecap="round" />
    <line x1="86" y1="140" x2="94" y2="140" stroke="#94a3b8" stroke-width="3.4" stroke-linecap="round" />
    <text x="104" y="96" font-size="18" font-weight="700" fill="#f87171">+</text>
    <text x="104" y="150" font-size="18" font-weight="700" fill="#60a5fa">−</text>
    <!-- 两个电阻：圆角矩形，导线止于两端 -->
    <rect x="172" y="46" width="84" height="28" rx="5" fill="rgba(226,168,70,0.10)" stroke="#e2a846" stroke-width="3" />
    <rect x="318" y="46" width="84" height="28" rx="5" fill="rgba(226,168,70,0.10)" stroke="#e2a846" stroke-width="3" />
    <text x="214" y="34" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#60a5fa"><tspan>R</tspan><tspan dy="5" font-size="13">1</tspan></text>
    <text x="360" y="34" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#f87171"><tspan>R</tspan><tspan dy="5" font-size="13">2</tspan></text>
    <!-- 电流方向：与正负极一致（自上导线向右） -->
    <CourseArrow :from="{ x: 262, y: 60 }" :to="{ x: 312, y: 60 }" stroke="#e2a846" stroke-width="3" label="I" :label-dy="-8" :label-dx="6" />
    <!-- 电源两端的电压 U -->
    <CourseArrow :from="{ x: 58, y: 172 }" :to="{ x: 58, y: 68 }" stroke="#60a5fa" stroke-width="2.6" label="U" :label-dx="-16" :label-dy="0" />
  </svg>
</template>