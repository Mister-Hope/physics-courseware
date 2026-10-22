<!--
  封面装饰：两只线圈隔着空气相对，磁感线把能量从左边送到右边。
-->
<template>
  <svg viewBox="0 0 300 180" width="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 磁感线：穿过两只线圈的闭合回路 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.6" opacity="0.5">
      <ellipse cx="150" cy="90" rx="118" ry="26" />
      <ellipse cx="150" cy="90" rx="126" ry="50" />
      <ellipse cx="150" cy="90" rx="132" ry="72" />
    </g>

    <!-- 左线圈（送电端） -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="2.6">
      <ellipse cx="44" cy="90" rx="7" ry="26" />
      <ellipse cx="56" cy="90" rx="7" ry="26" />
      <ellipse cx="68" cy="90" rx="7" ry="26" />
      <ellipse cx="80" cy="90" rx="7" ry="26" />
    </g>

    <!-- 右线圈（受电端） -->
    <g fill="none" stroke="var(--c-accent-2)" stroke-width="2.6">
      <ellipse cx="220" cy="90" rx="7" ry="26" />
      <ellipse cx="232" cy="90" rx="7" ry="26" />
      <ellipse cx="244" cy="90" rx="7" ry="26" />
      <ellipse cx="256" cy="90" rx="7" ry="26" />
    </g>

    <!-- 空气中的能量：中心光点 -->
    <circle cx="150" cy="90" r="16" fill="var(--c-accent)" opacity="0.16" />
    <circle cx="150" cy="90" r="5.5" fill="var(--c-accent)" opacity="0.9" />
  </svg>
</template>
