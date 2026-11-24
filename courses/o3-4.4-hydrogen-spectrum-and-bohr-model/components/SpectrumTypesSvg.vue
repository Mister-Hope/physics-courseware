<!-- 4.4 P3：三种光源的光谱对比——白炽灯连续谱、氢与钠的线状谱（谱线位置按波长真实映射） -->
<script setup lang="ts">
/** 里德伯常量，单位 m⁻¹ */
const RYDBERG = 1.097e7;

/** 可见光波长范围与谱带横向映射：400–700 nm → x 130–810 */
const X_MIN = 130;
const X_MAX = 810;
const LAMBDA_MIN = 400;
const LAMBDA_MAX = 700;

/** 由巴耳末公式算波长，单位 nm */
const wavelength = (n: number): number => 1e9 / (RYDBERG * (1 / 4 - 1 / n ** 2));

/** 波长 → 谱带横坐标 */
const xOf = (lambda: number): number => X_MIN + ((lambda - LAMBDA_MIN) / (LAMBDA_MAX - LAMBDA_MIN)) * (X_MAX - X_MIN);

/** 生成一条谱线的绘图数据 */
const spectralLine = (n: number, color: string): { n: number; color: string; x: number } => ({
  n,
  color,
  x: xOf(wavelength(n)),
});

/** 氢原子可见光四条谱线：n → 2 的跃迁 */
const hydrogenLines = [
  spectralLine(3, "var(--c-danger)"),
  spectralLine(4, "var(--c-physics)"),
  spectralLine(5, "var(--c-accent-2)"),
  spectralLine(6, "var(--c-hint-important)"),
];

/** 钠原子特征谱线（589 nm 附近的黄光，双线在图上合并为一条） */
const sodiumX = xOf(589);
</script>

<template>
  <svg viewBox="0 0 860 228" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hs-spectrum-continuous" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="var(--c-hint-important)" />
        <stop offset="20%" stop-color="var(--c-accent-2)" />
        <stop offset="38%" stop-color="var(--c-physics)" />
        <stop offset="54%" stop-color="var(--c-ok)" />
        <stop offset="70%" stop-color="var(--c-accent)" />
        <stop offset="86%" stop-color="var(--c-accent)" />
        <stop offset="100%" stop-color="var(--c-danger)" />
      </linearGradient>
    </defs>
    <text x="124" y="49" text-anchor="end" font-size="13" fill="var(--c-text-dim)">白炽灯</text>
    <rect x="130" y="28" width="680" height="34" rx="3" fill="url(#hs-spectrum-continuous)" opacity="0.9" />
    <text x="818" y="49" font-size="12" fill="var(--c-text-dim)">连续谱</text>
    <text x="124" y="109" text-anchor="end" font-size="13" fill="var(--c-text-dim)">氢原子</text>
    <rect x="130" y="88" width="680" height="34" rx="3" fill="var(--c-bg-soft)" stroke="var(--c-border)" />
    <g v-for="line in hydrogenLines" :key="line.n">
      <rect :x="line.x - 5" y="95" width="10" height="20" rx="4" :fill="line.color" opacity="0.18" />
      <rect :x="line.x - 1.5" y="95" width="3" height="20" rx="1.5" :fill="line.color" />
    </g>
    <text x="818" y="109" font-size="12" fill="var(--c-text-dim)">线状谱</text>
    <text x="124" y="169" text-anchor="end" font-size="13" fill="var(--c-text-dim)">钠原子</text>
    <rect x="130" y="148" width="680" height="34" rx="3" fill="var(--c-bg-soft)" stroke="var(--c-border)" />
    <rect :x="sodiumX - 6" y="154" width="12" height="22" rx="5" fill="var(--c-accent)" opacity="0.2" />
    <rect :x="sodiumX - 2" y="154" width="4" height="22" rx="2" fill="var(--c-accent)" />
    <text x="818" y="169" font-size="12" fill="var(--c-text-dim)">线状谱</text>
    <line x1="130" y1="192" x2="810" y2="192" stroke="var(--c-border)" stroke-width="1" />
    <line x1="130" y1="188" x2="130" y2="196" stroke="var(--c-border)" stroke-width="1" />
    <line x1="356.7" y1="188" x2="356.7" y2="196" stroke="var(--c-border)" stroke-width="1" />
    <line x1="583.3" y1="188" x2="583.3" y2="196" stroke="var(--c-border)" stroke-width="1" />
    <line x1="810" y1="188" x2="810" y2="196" stroke="var(--c-border)" stroke-width="1" />
    <text x="130" y="214" text-anchor="start" font-family="KaTeX_Main" font-size="11" fill="var(--c-text-dim)">400 nm</text>
    <text x="356.7" y="214" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-text-dim)">500 nm</text>
    <text x="583.3" y="214" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-text-dim)">600 nm</text>
    <text x="810" y="214" text-anchor="end" font-family="KaTeX_Main" font-size="11" fill="var(--c-text-dim)">700 nm</text>
  </svg>
</template>
