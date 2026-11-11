<!--
  第 15 页「自感的防治」之一：安全开关（大电感断电打火）。
  大电感线圈与开关串成一个回路（沿用本课既有画法：不画电源，只画线圈 + 开关）；
  开关断开瞬间，线圈的自感电动势很高，刀闸刀尖与右触点之间打出红色电弧。
  viewBox 420×84 与同页另外三张图一致。
-->
<template>
  <svg viewBox="0 0 420 84" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 铁芯（先画，线圈盖在上面） -->
    <rect x="355" y="35" width="10" height="42" rx="2" fill="var(--c-neutral-700)" opacity="0.55" />
    <!-- 大电感线圈：竖放连续螺旋线 3 匝；接线端在左缘 (346,36) / (346,76) -->
    <Solenoid
      :x="360"
      :y="56"
      :length="40"
      :radius="14"
      :turns="3"
      orientation="vertical"
      direction="cw"
      :phase="180"
      :line-width="2.8"
      :back-opacity="0.3"
    />
    <!-- 导线：线圈与开关串成一个回路 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="2" stroke-linecap="round">
      <path d="M 64 36 H 188" />
      <path d="M 232 36 H 346" />
      <path d="M 64 76 H 346" />
      <path d="M 64 36 V 76" />
    </g>
    <!-- 开关：断开状态（刀闸抬起 28°） -->
    <CircuitSwitch :x="210" :y="36" open :span="44" :angle="28" :line-width="2" />
    <!-- 断开瞬间触点间的电弧：从刀尖 (226.9,15.3) 锯齿连到右触点 (232,36) -->
    <path
      d="M 227 15 L 234 20 L 225 24 L 235 28 L 226 32 L 232 36"
      fill="none"
      stroke="var(--c-danger)"
      stroke-width="3.2"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <text x="250" y="20" font-size="16" fill="var(--c-danger)">打火</text>
  </svg>
</template>
