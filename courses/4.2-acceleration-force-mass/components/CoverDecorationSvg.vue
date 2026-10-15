<template>
  <!-- 封面右下角装饰：a–F 图像——过原点的拟合直线与沿线数据点（点落在直线上、带一点散布） -->
  <svg viewBox="0 0 230 170" width="300" xmlns="http://www.w3.org/2000/svg">
    <line x1="26" y1="146" x2="212" y2="146" stroke="color-mix(in srgb, var(--c-text-dim) 42%, transparent)" stroke-width="1.6" stroke-linecap="round" />
    <line x1="26" y1="146" x2="26" y2="26" stroke="color-mix(in srgb, var(--c-text-dim) 42%, transparent)" stroke-width="1.6" stroke-linecap="round" />
    <line x1="26" y1="146" x2="208" y2="32.5" stroke="color-mix(in srgb, var(--c-accent) 75%, transparent)" stroke-width="2.4" stroke-linecap="round" />
    <circle cx="62" cy="124.9" r="4.2" fill="color-mix(in srgb, var(--c-velocity) 85%, transparent)" />
    <circle cx="98" cy="99.9" r="4.2" fill="color-mix(in srgb, var(--c-velocity) 85%, transparent)" />
    <circle cx="134" cy="79.7" r="4.2" fill="color-mix(in srgb, var(--c-velocity) 85%, transparent)" />
    <circle cx="170" cy="55.2" r="4.2" fill="color-mix(in srgb, var(--c-velocity) 85%, transparent)" />
    <text x="212" y="166" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)" text-anchor="middle">F</text>
    <text x="34" y="36" font-size="15" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)" text-anchor="start">a</text>
  </svg>
</template>
