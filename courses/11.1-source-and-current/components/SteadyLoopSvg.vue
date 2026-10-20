<script setup lang="ts">
/**
 * 第 6 页配图：电源、开关、小灯泡与电流表组成的回路（电路元件一律用共享 Circuit* 符号，不手画）。 电流表放在下方水平导线上，读数 0.30 A 写在导线外侧的正下方；电源极板间距收窄（默认 16 → 12），免得符号显得"胖"。 电流表读数保持 0.30 A ——
 * 用"指针稳定"表示恒定电流；本节不涉及欧姆定律，读数不给出计算过程。
 */
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 460 230" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 导线：手画，止于各元件两端 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 70 48 V 108" />
        <path d="M 70 120 V 170" />
        <path d="M 70 48 H 228" />
        <path d="M 252 48 H 390" />
        <path d="M 70 170 H 160" />
        <path d="M 200 170 H 294" />
        <path d="M 326 170 H 390" />
        <path d="M 390 48 V 170" />
      </g>
      <!-- 电流方向：从电源正极（上极板）流出，沿上边导线向右 -->
      <CourseArrow :from="{ x: 278, y: 48 }" :to="{ x: 366, y: 48 }" stroke="var(--c-accent)" :stroke-width="2.4" label="I" :label-dy="-12" />
      <!-- 元件 -->
      <CircuitBattery :x="70" :y="114" orientation="vertical" polarity :plate-gap="12" />
      <CircuitBulb :x="240" :y="48" label="L" />
      <CircuitSwitch :x="180" :y="170" :open="false" label="S" />
      <CircuitMeter :x="310" :y="170" kind="a" />
      <!-- 电流表读数：写在下方导线外侧 -->
      <rect x="282" y="196" width="56" height="28" rx="8" fill="rgba(226,168,70,0.12)" stroke="var(--c-accent)" stroke-width="1.2" />
      <text x="310" y="215" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="var(--c-accent)">0.30 A</text>
    </svg>
  </div>
</template>
