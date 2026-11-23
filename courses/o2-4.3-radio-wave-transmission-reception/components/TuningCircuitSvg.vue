<!--
  第 10 页示意图：收音机的调谐电路。
  接收天线把电磁波变成感应电流，线圈 L 与可变电容器 C 组成调谐电路；
  改变 C 使电路的固有频率与要接收的电磁波频率相同，发生电谐振。
-->
<template>
  <svg viewBox="0 40 760 280" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 地面 -->
    <line x1="80" y1="290" x2="680" y2="290" stroke="var(--c-text-dim)" stroke-width="1.3" opacity="0.55" />
    <g stroke="var(--c-text-dim)" stroke-width="1.1" opacity="0.3">
      <line x1="420" y1="290" x2="412" y2="299" />
      <line x1="470" y1="290" x2="462" y2="299" />
      <line x1="520" y1="290" x2="512" y2="299" />
      <line x1="570" y1="290" x2="562" y2="299" />
      <line x1="620" y1="290" x2="612" y2="299" />
      <line x1="120" y1="290" x2="112" y2="299" />
      <line x1="170" y1="290" x2="162" y2="299" />
    </g>
    <!-- 接收天线 -->
    <line x1="200" y1="250" x2="200" y2="70" stroke="var(--c-accent)" stroke-width="2.4" stroke-linecap="round" />
    <circle cx="200" cy="70" r="3.2" fill="var(--c-accent)" />
    <!-- 入射电磁波 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.5" stroke-linecap="round" opacity="0.6">
      <path d="M 162 90 A 22 22 0 0 1 162 134" />
      <path d="M 146 80 A 34 34 0 0 1 146 144" opacity="0.5" />
    </g>
    <text x="96" y="82" font-size="12" fill="var(--c-text-dim)">电磁波</text>
    <!-- 调谐回路：上边导线 + 右边可变电容 + 下边线圈 + 左边天线/地线 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
      <path d="M 200 150 H 520" />
      <path d="M 520 150 V 205" />
      <path d="M 520 221 V 250" />
      <path d="M 520 250 H 440" />
      <path d="M 280 250 H 200" />
      <path d="M 200 250 V 290" />
    </g>
    <circle cx="200" cy="150" r="3" fill="var(--c-text)" />
    <circle cx="200" cy="250" r="3" fill="var(--c-text)" />
    <!-- 可变电容器：两平行板 + 斜箭头 -->
    <g stroke="var(--c-accent-2)" stroke-width="2.6" stroke-linecap="round">
      <line x1="496" y1="205" x2="544" y2="205" />
      <line x1="496" y1="221" x2="544" y2="221" />
    </g>
    <line x1="486" y1="238" x2="550" y2="188" stroke="var(--c-accent-2)" stroke-width="1.8" stroke-linecap="round" />
    <path d="M 550 188 L 540 190 M 550 188 L 548 198" fill="none" stroke="var(--c-accent-2)" stroke-width="1.8" stroke-linecap="round" />
    <!-- 线圈：连续半圆 -->
    <path
      d="M 280 250 A 20 20 0 0 1 320 250 A 20 20 0 0 1 360 250 A 20 20 0 0 1 400 250 A 20 20 0 0 1 440 250"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2.6"
      stroke-linecap="round"
    />
    <!-- 接地符号 -->
    <g stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round">
      <line x1="180" y1="296" x2="220" y2="296" />
      <line x1="187" y1="303" x2="213" y2="303" />
      <line x1="194" y1="310" x2="206" y2="310" />
    </g>
    <!-- 标注 -->
    <text x="214" y="64" font-size="14" font-weight="700" fill="var(--c-accent)">接收天线</text>
    <text x="360" y="284" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">线圈 L</text>
    <text x="536" y="214" font-size="14" fill="var(--c-text-dim)">可变电容 C</text>
    <text x="174" y="278" text-anchor="end" font-size="14" fill="var(--c-text-dim)">地线</text>
    <!-- 回路中心提示 -->
    <text x="360" y="192" text-anchor="middle" font-size="13" fill="var(--c-text-dim)" opacity="0.85">调谐电路</text>
  </svg>
</template>
