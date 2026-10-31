<!--
  第 5 页应用图之一：变压器。
  同一铁芯上的原、副线圈，靠互感把能量从原线圈传到副线圈。
  矩形闭合铁芯的直腿上用共享 Solenoid（竖放）作连续螺旋绕组：5 匝，半径 12 刚好把 12 宽的芯柱包住；
  原线圈的接线端落在芯柱左侧 (98,70)/(98,126)，副线圈落在右侧 (212,70)/(212,126)，引线从这两处接出。
  原线圈绕向取"从下端看逆时针"（竖放时 direction=ccw），副线圈取反向的 cw：两柱是镜像对称的两条腿，
  取相反绕向只是让两段绕组的螺旋走向看起来对称（图上不标电流，副线圈实际绕向由工艺决定）。
-->
<template>
  <svg viewBox="0 0 320 230" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 铁芯（闭合矩形）：左柱中心 x=110、右柱中心 x=200，柱宽 12 -->
    <rect x="110" y="50" width="90" height="110" rx="4" fill="none" stroke="var(--c-neutral-600)" stroke-width="12" />
    <!-- 原线圈：5 匝连续绕组，接线端在左侧 (98,70) / (98,126) -->
    <Solenoid
      :x="110"
      :y="98"
      :length="56"
      :radius="12"
      :turns="5"
      direction="ccw"
      orientation="vertical"
      :phase="180"
      :line-width="2.6"
      :back-opacity="0.32"
    />
    <!-- 副线圈：5 匝连续绕组，接线端在右侧 (212,70) / (212,126) -->
    <Solenoid
      :x="200"
      :y="98"
      :length="56"
      :radius="12"
      :turns="5"
      direction="cw"
      orientation="vertical"
      :phase="0"
      :line-width="2.6"
      :back-opacity="0.32"
      color="var(--c-accent-2)"
    />
    <!-- 原线圈回路：交流电源 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.7" stroke-linecap="round">
      <path d="M 98 70 H 70 V 126" />
      <path d="M 70 154 V 180 H 98 V 126" />
    </g>
    <circle cx="70" cy="140" r="13" fill="none" stroke="var(--c-text)" stroke-width="1.7" />
    <path d="M 61 140 q 4.5 -7 9 0 t 9 0" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" />
    <!-- 副线圈回路：灯泡 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.7" stroke-linecap="round">
      <path d="M 212 70 H 250 V 107" />
      <path d="M 250 133 V 180 H 212 V 126" />
    </g>
    <CircuitBulb :x="250" :y="120" :r="12" />
    <!-- 标签 -->
    <text x="110" y="208" text-anchor="middle" font-size="14" fill="var(--c-text)">原线圈</text>
    <text x="200" y="208" text-anchor="middle" font-size="14" fill="var(--c-text)">副线圈</text>
    <text x="155" y="110" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">铁芯</text>
  </svg>
</template>
