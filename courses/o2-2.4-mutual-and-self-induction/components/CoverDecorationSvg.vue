<!--
  封面装饰：两只线圈隔着空气相对，磁感线把能量从左边送到右边。
  线圈用共享 Solenoid（连续螺旋线）：同轴横放、4 匝，磁感线穿过两只线圈的管口。
  两只线圈都取"从右端看顺时针"（cw）、两端都落在管截面上端：封面不标电流，两圈取同一绕向只是统一画法。
-->
<template>
  <svg viewBox="0 0 300 180" width="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 磁感线：穿过两只线圈的闭合回路 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.6" opacity="0.5">
      <ellipse cx="150" cy="90" rx="118" ry="26" />
      <ellipse cx="150" cy="90" rx="126" ry="50" />
      <ellipse cx="150" cy="90" rx="132" ry="72" />
    </g>
    <!-- 左线圈（送电端）：4 匝、半径 26，从右端看顺时针 -->
    <Solenoid :x="62" :y="90" :length="40" :radius="26" :turns="4" direction="cw" :phase="180" :line-width="2.6" :back-opacity="0.32" back-dash />
    <!-- 右线圈（受电端）：与左线圈同轴、同绕向 -->
    <Solenoid
      :x="238"
      :y="90"
      :length="40"
      :radius="26"
      :turns="4"
      direction="cw"
      :phase="180"
      :line-width="2.6"
      :back-opacity="0.32"
      back-dash
      color="var(--c-accent-2)"
    />
    <!-- 空气中的能量：中心光点 -->
    <circle cx="150" cy="90" r="16" fill="var(--c-accent)" opacity="0.16" />
    <circle cx="150" cy="90" r="5.5" fill="var(--c-accent)" opacity="0.9" />
  </svg>
</template>
