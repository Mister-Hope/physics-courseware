<template>
  <!-- 第 1 页封面装饰：匀强磁场（垂直纸面向里的 ⊗ 阵列）中，一个与磁场斜交的线圈（侧视）与它在垂直磁场方向上的投影 -->
  <svg viewBox="0 0 260 170" width="300" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="12"
      y="16"
      width="236"
      height="138"
      rx="14"
      fill="rgba(226,168,70,0.05)"
      stroke="rgba(226,168,70,0.34)"
      stroke-width="1.4"
      stroke-dasharray="7 6"
    />
    <FieldDots :x="46" :y="46" :cols="9" :rows="5" :spacing="19" dir="in" :opacity="0.55" />
    <line :x1="CX" :y1="CY - PROJ" :x2="CX" :y2="CY + PROJ" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="6 5" opacity="0.85" />
    <text x="164" y="44" font-family="KaTeX_Main" font-size="14" fill="var(--c-accent)">S'</text>
    <g stroke="var(--c-physics)" stroke-width="3.2" stroke-linecap="round">
      <line :x1="P1.x" :y1="P1.y" :x2="P2.x" :y2="P2.y" />
      <line :x1="P1.x + OFF.x" :y1="P1.y + OFF.y" :x2="P2.x + OFF.x" :y2="P2.y + OFF.y" />
    </g>
    <text x="82" y="138" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-physics)">S</text>
    <line :x1="CX" :y1="CY" :x2="CX + NEND.x" :y2="CY + NEND.y" stroke="var(--c-accent-2)" stroke-width="1.8" />
    <path :d="NTIP" fill="var(--c-accent-2)" />
  </svg>
</template>

<script setup>
/** 线圈中心（viewBox 用户单位） */
const CX = 130;
const CY = 85;
/** 线圈（侧视）：与竖直方向成 35°，半长 47 —— 竖直投影半长 = 47·cos35° ≈ 38.5 */
const U = { x: 0.574, y: -0.819 };
const HALF = 47;
const PROJ = 38.5;
const P1 = { x: CX - HALF * U.x, y: CY - HALF * U.y };
const P2 = { x: CX + HALF * U.x, y: CY + HALF * U.y };
/** 第二条线（线圈的另一侧边）沿法线偏移 5 */
const OFF = { x: 4.1, y: 2.9 };
/** 法线箭头：从线圈中心沿法线 (0.822, 0.568) 伸出，箭头尖端正好落在终点上 */
const NEND = { x: 24, y: 16.6 };
const TIPX = CX + NEND.x;
const TIPY = CY + NEND.y;
const NTIP = `M ${TIPX} ${TIPY} L ${(TIPX - 7.7).toFixed(1)} ${(TIPY + 2.9).toFixed(1)} L ${(TIPX - 3.8).toFixed(1)} ${(TIPY - 6.9).toFixed(1)} Z`;
</script>
