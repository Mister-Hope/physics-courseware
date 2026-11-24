<!--
  4.2 P13/P14：赫兹实验装置（发射器 = 两个抛光金属球 + 很小的空气间隙，接感应圈；
  接收器 = 弯成环状的导线，两端也各有一个小球与空隙）。
  step 0 静态装置 / step 1 发射器跳火花 / step 2 电磁波传到导线环、环上小球间也跳火花。
-->
<template>
  <svg viewBox="0 0 700 168" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 感应圈与两根引线 -->
    <rect x="132" y="115" width="176" height="44" rx="9" fill="none" stroke="var(--c-border)" stroke-width="2" />
    <text x="220" y="143" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">感应圈</text>
    <path d="M160 115 V65 H193" fill="none" stroke="var(--c-text-dim)" stroke-width="2" />
    <path d="M300 115 V65 H267" fill="none" stroke="var(--c-text-dim)" stroke-width="2" />
    <!-- 发射器：两个抛光金属球，中间留很小的空气间隙 -->
    <circle cx="205" cy="65" r="12" fill="#b9c6db" stroke="#e8eef7" stroke-width="1.5" />
    <circle cx="255" cy="65" r="12" fill="#b9c6db" stroke="#e8eef7" stroke-width="1.5" />
    <circle cx="201" cy="61" r="3.4" fill="#ffffff" opacity="0.55" />
    <circle cx="251" cy="61" r="3.4" fill="#ffffff" opacity="0.55" />
    <text x="230" y="31" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">发射器</text>
    <line x1="230" y1="78" x2="230" y2="87" stroke="var(--c-text-mute)" stroke-width="1.2" />
    <text x="230" y="100" text-anchor="middle" font-size="13" fill="var(--c-text-mute)">空气间隙</text>
    <!-- 发射器火花 -->
    <g v-if="step >= 1">
      <circle cx="230" cy="65" r="26" fill="var(--c-accent-light)" opacity="0.12" />
      <polyline points="217,65 222,58 227,72 232,57 238,72 243,65" fill="none" stroke="var(--c-accent-light)" stroke-width="2.4" stroke-linejoin="round" />
    </g>
    <!-- 接收器：弯成环状的导线，两端各一个小球 -->
    <path :d="ringPath" fill="none" stroke="var(--c-text-dim)" stroke-width="2.5" stroke-linejoin="round" />
    <circle cx="532" cy="19.7" r="5" fill="#b9c6db" stroke="#e8eef7" stroke-width="1.2" />
    <circle cx="548" cy="19.7" r="5" fill="#b9c6db" stroke="#e8eef7" stroke-width="1.2" />
    <text x="596" y="70" font-size="16" fill="var(--c-text-dim)">接收器</text>
    <!-- 接收器火花 -->
    <g v-if="step >= 2">
      <circle cx="540" cy="20" r="17" fill="var(--c-accent-light)" opacity="0.12" />
      <polyline points="532,19.7 535,14 538,24 541,14 544,24 548,19.7" fill="none" stroke="var(--c-accent-light)" stroke-width="2.2" stroke-linejoin="round" />
    </g>
    <!-- 电磁波：从发射器传到导线环 -->
    <g v-if="step >= 2">
      <polyline :points="wavePoints" fill="none" stroke="var(--c-physics)" stroke-width="2.6" stroke-linejoin="round" />
      <text x="400" y="40" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">电磁波</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

/** 导线环：圆心 (540,65)、半径 46，顶部留一个很小的空隙（100° → 440°） */
const ringPoints = Array.from({ length: 46 }, (_, i) => {
  const rad = ((100 + i * (340 / 45)) * Math.PI) / 180;
  return [540 + 46 * Math.cos(rad), 65 - 46 * Math.sin(rad)];
});
const ringPath = ringPoints.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

/** 电磁波示意：发射器与导线环之间 2.5 个波长的正弦线 */
const wavePoints = Array.from({ length: 81 }, (_, i) => {
  const x = 322 + i * 2;
  return `${x},${(65 - 9 * Math.sin((2 * Math.PI * (x - 322)) / 64)).toFixed(1)}`;
}).join(" ");
</script>
