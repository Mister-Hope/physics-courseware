<!--
  P10 左栏：教材图 13.3-4 的示意图——线圈 A 套在线圈 B 里面，磁感线穿过两个线圈。
  用途：说明"线圈 A 中电流变化 → 磁场强弱变化 → 穿过线圈 B 的磁通量变化"。
-->
<script setup lang="ts">
/** 线圈 A（内）：4 匝；中心 (300, 150)，半轴 rx 11 / ry 52 */
const COIL_A = [240, 280, 320, 360];
/** 线圈 B（外）：5 匝；中心 (300, 150)，半轴 rx 18 / ry 86 */
const COIL_B = [210, 255, 300, 345, 390];
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- 磁感线：穿过线圈内部、从外面绕回来的闭合曲线 -->
      <g fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="8 6" opacity="0.7">
        <ellipse cx="300" cy="150" rx="95" ry="38" />
        <ellipse cx="300" cy="150" rx="135" ry="65" />
        <ellipse cx="300" cy="150" rx="170" ry="95" />
      </g>
      <!-- 线圈 B（外） -->
      <g fill="none" stroke="var(--c-neutral-300)" stroke-width="2.2" opacity="0.9">
        <ellipse v-for="(x, i) in COIL_B" :key="'b' + i" :cx="x" cy="150" rx="18" ry="86" />
      </g>
      <!-- 线圈 A（内） -->
      <g fill="none" stroke="var(--c-accent-2)" stroke-width="2.6">
        <ellipse v-for="(x, i) in COIL_A" :key="'a' + i" :cx="x" cy="150" rx="11" ry="52" />
      </g>
      <!-- 标注：A 在上（引线指内圈），B 在下（引线指外圈） -->
      <g stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="4 4">
        <line x1="300" y1="34" x2="300" y2="96" />
        <line x1="300" y1="266" x2="300" y2="238" />
      </g>
      <text x="300" y="24" text-anchor="middle" font-size="20" fill="var(--c-accent-2)">线圈 A</text>
      <text x="300" y="290" text-anchor="middle" font-size="20" fill="var(--c-neutral-300)">线圈 B</text>
      <!-- 磁感线标注 -->
      <line x1="112" y1="130" x2="131" y2="143" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="4 4" />
      <text x="108" y="126" text-anchor="end" font-size="18" fill="var(--c-text-dim)">磁感线</text>
    </svg>
  </div>
</template>
