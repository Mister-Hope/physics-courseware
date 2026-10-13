<script setup lang="ts">
/** 例题配图：电源 + 电动机 的简单电路示意（非纯电阻电路） */
</script>

<template>
  <svg viewBox="0 0 440 190" xmlns="http://www.w3.org/2000/svg">
    <!-- 回路：上导线 — 电动机 — 右侧竖线 — 下导线 -->
    <path d="M 60 70 H 226" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 274 70 H 390 V 110 H 60" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <!-- 电源（电池）：短板为正极，长板为负极 -->
    <path d="M 60 70 V 84" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 60 96 V 110" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" fill="none" />
    <line x1="56" y1="84" x2="64" y2="84" stroke="#94a3b8" stroke-width="3.4" stroke-linecap="round" />
    <line x1="53" y1="96" x2="67" y2="96" stroke="#94a3b8" stroke-width="3.4" stroke-linecap="round" />
    <text x="78" y="82" font-size="16" font-weight="700" fill="#f87171">+</text>
    <text x="78" y="104" font-size="16" font-weight="700" fill="#60a5fa">−</text>
    <!-- 电压 U：跨电源（也就是电动机两端）的双箭头 -->
    <line x1="34" y1="72" x2="34" y2="108" stroke="#60a5fa" stroke-width="2.2" stroke-dasharray="5 3" />
    <polygon points="34,72 29,80 39,80" fill="#60a5fa" />
    <polygon points="34,108 29,100 39,100" fill="#60a5fa" />
    <text x="26" y="94" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#60a5fa">U</text>
    <!-- 电动机符号 -->
    <circle cx="250" cy="70" r="24" fill="rgba(96,165,250,0.08)" stroke="#64748b" stroke-width="3" />
    <text x="250" y="79" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="26" fill="#e2a846">M</text>
    <text x="250" y="136" text-anchor="middle" font-size="13" fill="#94a3b8">电动机</text>
    <!-- 电流 I -->
    <line x1="140" y1="110" x2="230" y2="110" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
    <polygon points="242,110 228,104 228,116" fill="#e2a846" />
    <text x="180" y="100" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#e2a846">I</text>
  </svg>
</template>
