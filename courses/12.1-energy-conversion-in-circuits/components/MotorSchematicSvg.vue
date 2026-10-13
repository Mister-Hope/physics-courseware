<script setup lang="ts">
/** 例题配图（第 11、12 页共用）：电源在左、电动机在右的小方形电路（非纯电阻电路）。 长板为正极（上）、短板为负极（下），电流自正极沿上导线向右、经电动机回到负极。 */
</script>

<template>
  <svg viewBox="0 0 210 190" xmlns="http://www.w3.org/2000/svg">
    <!-- 回路：上导线 — 右侧（电动机支路）— 下导线 — 左侧（电源支路） -->
    <path d="M 40 45 H 170" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 170 45 V 81" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 170 129 V 165" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 170 165 H 40" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 40 45 V 80" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 40 120 V 165" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <!-- 电源：长板为正极，短板为负极 -->
    <line x1="31" y1="80" x2="49" y2="80" stroke="#94a3b8" stroke-width="3.4" stroke-linecap="round" />
    <line x1="34" y1="120" x2="46" y2="120" stroke="#94a3b8" stroke-width="3.4" stroke-linecap="round" />
    <text x="56" y="76" font-size="14" font-weight="700" fill="#f87171">+</text>
    <text x="56" y="128" font-size="14" font-weight="700" fill="#60a5fa">−</text>
    <!-- 电动机 -->
    <circle cx="170" cy="105" r="24" fill="rgba(96,165,250,0.08)" stroke="#64748b" stroke-width="3" />
    <text x="170" y="115" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="26" fill="#e2a846">M</text>
    <!-- 电流方向（与正负极一致：沿上导线向右） -->
    <CourseArrow :from="{ x: 58, y: 45 }" :to="{ x: 146, y: 45 }" stroke="#e2a846" stroke-width="2.8" label="I" :label-dy="-8" :label-dx="6" />
    <!-- 电源两端的电压 U（也就是电动机两端的电压） -->
    <CourseArrow :from="{ x: 20, y: 158 }" :to="{ x: 20, y: 52 }" stroke="#60a5fa" stroke-width="2.4" label="U" :label-dx="-12" :label-dy="0" />
    <!-- 用电器的名称 -->
    <text x="40" y="184" text-anchor="middle" font-size="14" fill="#94a3b8">电源</text>
    <text x="170" y="184" text-anchor="middle" font-size="14" fill="#94a3b8">电动机</text>
  </svg>
</template>
