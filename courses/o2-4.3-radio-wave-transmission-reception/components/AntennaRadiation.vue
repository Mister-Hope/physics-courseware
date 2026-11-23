<!--
  第 5 页示意图：实际发射装置中的开放电路。
  线圈的一端经地线与大地相连，另一端与高高架在空中的天线相连；
  天线和地线就是开放电路的两极，电磁波由天线向外辐射。
  step：0 = 只画装置，1 = 叠加辐射的电磁波。
-->
<script setup lang="ts">
defineProps<{
  /** 0 = 装置本体；≥1 = 显示天线辐射的电磁波 */
  step?: number;
}>();
</script>

<template>
  <svg viewBox="0 0 880 350" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 地面 -->
    <line
      x1="120"
      y1="300"
      x2="820"
      y2="300"
      stroke="var(--c-text-dim)"
      stroke-width="1.4"
      opacity="0.6"
    />
    <g stroke="var(--c-text-dim)" stroke-width="1.1" opacity="0.35">
      <line x1="150" y1="300" x2="142" y2="309" />
      <line x1="190" y1="300" x2="182" y2="309" />
      <line x1="230" y1="300" x2="222" y2="309" />
      <line x1="270" y1="300" x2="262" y2="309" />
      <line x1="330" y1="300" x2="322" y2="309" />
      <line x1="370" y1="300" x2="362" y2="309" />
      <line x1="410" y1="300" x2="402" y2="309" />
      <line x1="450" y1="300" x2="442" y2="309" />
      <line x1="490" y1="300" x2="482" y2="309" />
      <line x1="530" y1="300" x2="522" y2="309" />
    </g>
    <!-- 地线与接地符号 -->
    <line
      x1="300"
      y1="250"
      x2="300"
      y2="300"
      stroke="var(--c-text)"
      stroke-width="1.8"
      stroke-linecap="round"
    />
    <g stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round">
      <line x1="282" y1="306" x2="318" y2="306" />
      <line x1="288" y1="313" x2="312" y2="313" />
      <line x1="294" y1="320" x2="306" y2="320" />
    </g>
    <!-- 线圈：连续半圆 -->
    <path
      d="M 300 250 A 22.5 22.5 0 0 1 345 250 A 22.5 22.5 0 0 1 390 250 A 22.5 22.5 0 0 1 435 250 A 22.5 22.5 0 0 1 480 250"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2.6"
      stroke-linecap="round"
    />
    <!-- 天线 -->
    <g stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round">
      <line x1="480" y1="250" x2="480" y2="70" />
      <line x1="460" y1="70" x2="500" y2="70" />
    </g>
    <circle cx="480" cy="70" r="3.4" fill="var(--c-accent)" />
    <!-- 天线辐射的电磁波 -->
    <g
      v-if="(step ?? 0) >= 1"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2"
      stroke-linecap="round"
    >
      <path d="M 480 95 A 45 45 0 0 1 480 185" opacity="0.7" />
      <path d="M 480 70 A 70 70 0 0 1 480 210" opacity="0.45" />
      <path d="M 480 45 A 95 95 0 0 1 480 235" opacity="0.28" />
      <path d="M 480 95 A 45 45 0 0 0 480 185" opacity="0.28" />
      <path d="M 480 70 A 70 70 0 0 0 480 210" opacity="0.16" />
    </g>
    <!-- 标注：天线 / 线圈 / 地线 -->
    <text
      x="506"
      y="60"
      font-size="15"
      font-weight="700"
      fill="var(--c-accent)"
      font-family="KaTeX_Main"
    >
      天线
    </text>
    <text x="390" y="286" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">
      线圈（振荡电路）
    </text>
    <text x="268" y="288" text-anchor="end" font-size="14" fill="var(--c-text-dim)">地线</text>
    <!-- 地线标签引线 -->
    <line
      x1="274"
      y1="283"
      x2="294"
      y2="270"
      stroke="var(--c-text-dim)"
      stroke-width="1"
      opacity="0.55"
    />
    <!-- 底部说明 -->
    <text x="470" y="330" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">
      天线和地线是开放电路的两极
    </text>
  </svg>
</template>
