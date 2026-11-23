<script setup lang="ts">
// 第 11 页：光控开关整机电路（光敏电阻 RG + 三极管 VT + R2、LED）
// step：1 = 框出传感器 RG；2 = 框出控制电路 VT；3 = 框出执行装置 LED
defineProps<{
  step?: number;
}>();
</script>

<template>
  <svg
    viewBox="0 0 900 430"
    class="lc-svg"
    role="img"
    aria-label="光控开关电路：光敏电阻、三极管与发光二极管"
  >
    <!-- 导轨 -->
    <path
      d="M 80 60 L 700 60 M 80 390 L 560 390 M 80 60 L 80 209 M 80 241 L 80 390"
      fill="none"
      stroke="var(--c-text)"
      stroke-width="1.6"
      stroke-linecap="round"
    />
    <CircuitBattery :x="80" :y="225" orientation="vertical" polarity emf="E" />

    <!-- 分压：R1 + RG -->
    <path d="M 330 60 L 330 91" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
    <CircuitRheostat :x="330" :y="115" orientation="vertical" :slider="0.5" />
    <path d="M 330 139 L 330 235" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
    <circle cx="330" cy="235" r="3.6" fill="var(--c-text)" />
    <CircuitResistor :x="330" :y="295" orientation="vertical" />
    <path d="M 330 319 L 330 390" fill="none" stroke="var(--c-text)" stroke-width="1.6" />

    <!-- 基极 -->
    <path d="M 330 235 L 470 235" fill="none" stroke="var(--c-text)" stroke-width="1.6" />

    <!-- 三极管 VT -->
    <line
      x1="490"
      y1="205"
      x2="490"
      y2="265"
      stroke="var(--c-text)"
      stroke-width="5"
      stroke-linecap="round"
    />
    <path
      d="M 490 217 L 560 185 L 640 185"
      fill="none"
      stroke="var(--c-text)"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M 490 253 L 560 285 L 560 390"
      fill="none"
      stroke="var(--c-text)"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <polygon points="534.9,272.7 541.3,262.5 550,275" fill="var(--c-text)" />

    <!-- 集电极负载：R2 + LED -->
    <path d="M 700 60 L 700 88" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
    <polygon points="686,88 714,88 700,110" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
    <line x1="686" y1="112" x2="714" y2="112" stroke="var(--c-text)" stroke-width="1.6" />
    <path d="M 700 112 L 700 126" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
    <CircuitResistor :x="700" :y="150" orientation="vertical" />
    <path d="M 700 174 L 700 185 L 640 185" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
    <circle cx="700" cy="100" r="26" fill="var(--c-accent)" opacity="0.14" />

    <!-- 标注 -->
    <text x="348" y="121" font-size="16" fill="var(--c-text)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main" font-size="11" baseline-shift="sub">1</tspan>
    </text>
    <text x="348" y="301" font-size="16" fill="var(--c-text)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main" font-size="11" baseline-shift="sub">G</tspan>
    </text>
    <text x="316" y="227" text-anchor="end" font-size="16" fill="var(--c-text)">
      <tspan font-family="KaTeX_Math" font-style="italic">b</tspan>
    </text>

    <text x="666" y="84" text-anchor="end" font-size="15" fill="var(--c-text-dim)">LED</text>
    <text x="720" y="156" font-size="16" fill="var(--c-text)">
      <tspan font-family="KaTeX_Math" font-style="italic">R</tspan>
      <tspan font-family="KaTeX_Main" font-size="11" baseline-shift="sub">2</tspan>
    </text>

    <!-- 分步框 -->
    <rect
      v-if="(step ?? 0) >= 1"
      x="294"
      y="254"
      width="92"
      height="92"
      rx="10"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="1.6"
      stroke-dasharray="7 6"
    />
    <rect
      v-if="(step ?? 0) >= 2"
      x="462"
      y="194"
      width="116"
      height="104"
      rx="10"
      fill="none"
      stroke="var(--c-accent-2)"
      stroke-width="1.6"
      stroke-dasharray="7 6"
    />
    <text v-if="(step ?? 0) >= 1" x="346" y="356" font-size="15" fill="var(--c-accent)">
      传感器
    </text>
    <text
      v-if="(step ?? 0) >= 2"
      x="520"
      y="330"
      text-anchor="middle"
      font-size="15"
      fill="var(--c-accent-2)"
    >
      控制电路
    </text>
    <rect
      v-if="(step ?? 0) >= 3"
      x="662"
      y="52"
      width="76"
      height="140"
      rx="10"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="1.6"
      stroke-dasharray="7 6"
    />
    <text
      v-if="(step ?? 0) >= 3"
      x="700"
      y="222"
      text-anchor="middle"
      font-size="15"
      fill="var(--c-accent)"
    >
      执行装置
    </text>
    <circle cx="330" cy="60" r="3.2" fill="var(--c-text)" />
    <circle cx="330" cy="390" r="3.2" fill="var(--c-text)" />
  </svg>
</template>

<style scoped>
.lc-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
