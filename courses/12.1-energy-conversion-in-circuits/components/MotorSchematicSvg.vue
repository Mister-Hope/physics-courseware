<script setup lang="ts">
/**
 * 例题配图（第 11、12 页共用）：电源在左、电动机在右的小方形电路（非纯电阻电路）。
 * 电源用共享 `<CircuitBattery>`：长板为正极（上）、短板为负极（下），电流自正极沿上导线向右、经电动机回到负极。
 * 电动机（圆 + M）共享组件里暂无对应符号，仍手画。
 */
</script>

<template>
  <svg viewBox="0 0 210 190" xmlns="http://www.w3.org/2000/svg">
    <!-- 回路：上导线 — 右侧（电动机支路）— 下导线 — 左侧（电源支路） -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 40 45 H 170" />
      <path d="M 170 45 V 81" />
      <path d="M 170 129 V 165" />
      <path d="M 170 165 H 40" />
      <path d="M 40 45 V 92" />
      <path d="M 40 108 V 165" />
    </g>
    <!-- 电源：长板为正极（上）、短板为负极（下）；导线止于两根极板 -->
    <CircuitBattery :x="40" :y="100" orientation="vertical" polarity />
    <!-- 电动机 -->
    <circle cx="170" cy="105" r="24" fill="color-mix(in srgb, var(--c-velocity) 8%, transparent)" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <text
      x="170"
      y="115"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="26"
      fill="var(--c-accent)"
    >
      M
    </text>
    <!-- 电流方向（与正负极一致：沿上导线向右） -->
    <CourseArrow
      :from="{ x: 58, y: 45 }"
      :to="{ x: 146, y: 45 }"
      stroke="var(--c-accent)"
      stroke-width="2.8"
      label="I"
      :label-dy="-8"
      :label-dx="6"
    />
    <!-- 电源两端的电压 U（也就是电动机两端的电压） -->
    <CourseArrow
      :from="{ x: 20, y: 158 }"
      :to="{ x: 20, y: 52 }"
      stroke="var(--c-velocity)"
      stroke-width="2.4"
      label="U"
      :label-dx="-12"
      :label-dy="0"
    />
    <!-- 用电器的名称 -->
    <text x="40" y="184" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">电源</text>
    <text x="170" y="184" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">电动机</text>
  </svg>
</template>
