<script setup lang="ts">
/**
 * 第 6 页：并联电路 —— 元件一律用共享 `<CircuitBattery>` / `<CircuitResistor>`，导线手画（1.6、止于元件两端）。 电源、R₁、R₂ 三条支路接在**同两条**导轨之间，所以每个电阻两端的电压都等于电源电压
 * （上一版的画法把电源接在两个不同节点上，拓扑是错的）；电源长板（正极）在上。
 */
</script>

<template>
  <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg">
    <!-- 两条导轨 + 三条支路的导线（止于电源极板与电阻矩形边） -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 90 55 H 380" />
      <path d="M 90 185 H 380" />
      <path d="M 90 55 V 112" />
      <path d="M 90 128 V 185" />
      <path d="M 240 55 V 106" />
      <path d="M 240 154 V 185" />
      <path d="M 380 55 V 106" />
      <path d="M 380 154 V 185" />
    </g>
    <!-- T 形接线点（R₁ 支路与上、下导轨确实相连） -->
    <circle cx="240" cy="55" r="3" fill="var(--c-text)" />
    <circle cx="240" cy="185" r="3" fill="var(--c-text)" />
    <!-- 元件：电源（长板＝正极在上，板间距 16）、两个电阻（48×16 竖放，止于矩形两端） -->
    <CircuitBattery :x="90" :y="120" orientation="vertical" polarity />
    <CircuitResistor :x="240" :y="130" orientation="vertical" />
    <CircuitResistor :x="380" :y="130" orientation="vertical" />
    <!-- 电阻标注：R₁ / R₂（下标用 tspan，与全仓 SVG 标注口径一致） -->
    <text x="240" y="216" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-velocity)">
      <tspan>R</tspan>
      <tspan dy="5" font-size="13">1</tspan>
    </text>
    <text x="380" y="216" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-force)">
      <tspan>R</tspan>
      <tspan dy="5" font-size="13">2</tspan>
    </text>
    <!-- 电流：自正极出来沿上导轨向右，再分别向下流过两个电阻 -->
    <CourseArrow :from="{ x: 112, y: 55 }" :to="{ x: 176, y: 55 }" stroke="var(--c-accent)" stroke-width="3" label="I" :label-dy="-8" :label-dx="8" />
    <CourseArrow :from="{ x: 240, y: 62 }" :to="{ x: 240, y: 92 }" stroke="var(--c-accent)" stroke-width="3" />
    <text
      x="250"
      y="78"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="17"
      fill="var(--c-accent)"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      <tspan>I</tspan>
      <tspan dy="4" font-size="12">1</tspan>
    </text>
    <CourseArrow :from="{ x: 380, y: 62 }" :to="{ x: 380, y: 92 }" stroke="var(--c-accent)" stroke-width="3" />
    <text
      x="390"
      y="78"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="17"
      fill="var(--c-accent)"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      <tspan>I</tspan>
      <tspan dy="4" font-size="12">2</tspan>
    </text>
    <!-- 电源两端的电压 U（也就是每个电阻两端的电压） -->
    <CourseArrow :from="{ x: 58, y: 180 }" :to="{ x: 58, y: 60 }" stroke="var(--c-velocity)" stroke-width="2.6" label="U" :label-dx="-16" :label-dy="0" />
  </svg>
</template>
