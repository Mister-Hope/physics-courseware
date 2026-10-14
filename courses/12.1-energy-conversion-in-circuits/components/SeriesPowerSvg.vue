<script setup lang="ts">
/**
 * 第 5 页：串联电路 —— 元件一律用共享 `<CircuitBattery>` / `<CircuitResistor>`，导线手画（1.6、止于元件两端）。
 * 电源长板（正极）在上，电流自上导线向右、经两个电阻后由下导线回到负极。
 */
</script>

<template>
  <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg">
    <!-- 导线：止于电源极板与两个电阻的矩形边 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 90 60 H 156" />
      <path d="M 204 60 H 276" />
      <path d="M 324 60 H 430" />
      <path d="M 430 60 V 180" />
      <path d="M 430 180 H 90" />
      <path d="M 90 60 V 112" />
      <path d="M 90 128 V 180" />
    </g>
    <!-- 元件：电源（长板＝正极在上，板间距 16 → 导线止于 y=112 / y=128）、两个电阻（48×16，止于矩形两端） -->
    <CircuitBattery :x="90" :y="120" orientation="vertical" polarity />
    <CircuitResistor :x="180" :y="60" />
    <CircuitResistor :x="300" :y="60" />
    <!-- 电阻标注：R₁ / R₂（下标用 tspan，与全仓 SVG 标注口径一致） -->
    <text
      x="180"
      y="40"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="19"
      fill="#60a5fa"
    >
      <tspan>R</tspan>
      <tspan dy="5" font-size="13">1</tspan>
    </text>
    <text
      x="300"
      y="40"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="19"
      fill="#f87171"
    >
      <tspan>R</tspan>
      <tspan dy="5" font-size="13">2</tspan>
    </text>
    <!-- 电流方向：与正负极一致（自上导线向右） -->
    <CourseArrow
      :from="{ x: 212, y: 60 }"
      :to="{ x: 268, y: 60 }"
      stroke="#e2a846"
      stroke-width="3"
      label="I"
      :label-dy="-8"
      :label-dx="6"
    />
    <!-- 电源两端的电压 U -->
    <CourseArrow
      :from="{ x: 58, y: 172 }"
      :to="{ x: 58, y: 68 }"
      stroke="#60a5fa"
      stroke-width="2.6"
      label="U"
      :label-dx="-16"
      :label-dy="0"
    />
  </svg>
</template>
