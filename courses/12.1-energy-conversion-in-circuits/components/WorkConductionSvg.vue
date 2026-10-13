<script setup lang="ts">
/** 电流做功的实质：恒定电场对自由电荷的静电力做功 —— 一段电路，电荷从左向右定向移动 */
</script>

<template>
  <svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
    <!-- 电势差 U：两端双箭头 -->
    <line x1="46" y1="48" x2="514" y2="48" stroke="#60a5fa" stroke-width="2" stroke-dasharray="6 4" />
    <polygon points="46,48 54,43 54,53" fill="#60a5fa" />
    <polygon points="514,48 506,43 506,53" fill="#60a5fa" />
    <text x="280" y="40" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#60a5fa">U</text>

    <!-- 静电力 F 箭头 -->
    <line x1="150" y1="82" x2="385" y2="82" stroke="#f87171" stroke-width="3" stroke-linecap="round" />
    <polygon points="397,82 383,76 383,88" fill="#f87171" />
    <text x="266" y="74" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#f87171">F</text>
    <text x="410" y="80" font-size="13" fill="#f87171" opacity="0.85">静电力</text>

    <!-- 导体 -->
    <rect x="50" y="112" width="460" height="50" rx="14" fill="rgba(96,165,250,0.07)" stroke="#64748b" stroke-width="2" />
    <text x="58" y="132" font-size="20" font-weight="700" fill="#f87171">+</text>
    <text x="493" y="132" font-size="22" font-weight="700" fill="#60a5fa">−</text>

    <!-- 定向移动的正电荷 q -->
    <g>
      <circle v-for="cx in [96, 162, 228, 294, 360, 426, 490]" :key="cx" :cx="cx" cy="137" r="10" fill="#0f172a" stroke="#e2a846" stroke-width="1.6" />
      <text
        v-for="cx in [96, 162, 228, 294, 360, 426, 490]"
        :key="'t' + cx"
        :x="cx"
        y="142"
        text-anchor="middle"
        font-size="14"
        font-weight="800"
        fill="#e2a846"
      >
        +
      </text>
      <!-- 每个电荷上方的小运动箭头 -->
      <g v-for="cx in [96, 162, 228, 294, 360, 426, 490]" :key="'m' + cx" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round">
        <line :x1="cx" :y1="104" :x2="cx + 14" y2="104" />
        <polygon :points="`${cx + 14},104 ${cx + 8},100 ${cx + 8},108`" fill="#94a3b8" stroke="none" />
      </g>
    </g>

    <!-- 电流方向 I -->
    <line x1="180" y1="200" x2="340" y2="200" stroke="#e2a846" stroke-width="3" stroke-linecap="round" />
    <polygon points="352,200 338,194 338,206" fill="#e2a846" />
    <text x="262" y="192" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#e2a846">I</text>
  </svg>
</template>
