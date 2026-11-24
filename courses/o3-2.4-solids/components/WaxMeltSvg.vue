<script setup lang="ts">
// 玻璃片与云母片上石蜡熔化区域的形状（示意）
</script>

<template>
  <svg viewBox="0 0 840 280" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="70" y="36" width="300" height="176" rx="12" fill="var(--c-surface-solid)" stroke="var(--c-border)" stroke-width="2" />
    <rect x="84" y="50" width="272" height="148" rx="7" fill="rgb(226 168 70 / 10%)" stroke="var(--c-border)" stroke-width="1" />
    <circle cx="220" cy="124" r="52" fill="rgb(245 158 11 / 40%)" stroke="var(--c-accent)" stroke-width="1.8" />
    <text x="220" y="242" text-anchor="middle" font-size="15" fill="var(--c-text)" font-weight="600">玻璃片</text>
    <text x="220" y="264" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">石蜡熔化区域：圆形</text>
    <rect x="470" y="36" width="300" height="176" rx="12" fill="var(--c-surface-solid)" stroke="var(--c-border)" stroke-width="2" />
    <rect x="484" y="50" width="272" height="148" rx="7" fill="rgb(226 168 70 / 10%)" stroke="var(--c-border)" stroke-width="1" />
    <ellipse cx="620" cy="124" rx="94" ry="36" fill="rgb(245 158 11 / 40%)" stroke="var(--c-accent)" stroke-width="1.8" />
    <text x="620" y="242" text-anchor="middle" font-size="15" fill="var(--c-text)" font-weight="600">云母片</text>
    <text x="620" y="264" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">石蜡熔化区域：椭圆形</text>
    <text x="420" y="124" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">石蜡</text>
  </svg>
</template>
