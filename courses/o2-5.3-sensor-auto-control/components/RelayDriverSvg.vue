<script setup lang="ts">
// 第 13–14 页：三极管 + 继电器线圈 K + 续流二极管 D 驱动小灯泡
// step：0 = 三极管导通、线圈通电、灯亮；1 = 三极管关断瞬间（自感电动势）；2 = 自感电流经 D 释放
defineProps<{
  step?: number;
  showDiode?: boolean;
}>();

const coilOn = (s: number): boolean => (s ?? 0) === 0;
</script>

<template>
  <svg viewBox="0 0 940 430" class="relay-svg" role="img" aria-label="三极管经继电器线圈驱动小灯泡的电路">
    <!-- 导轨 -->
    <path
      d="M 80 60 L 880 60 M 80 390 L 880 390 M 80 60 L 80 209 M 80 241 L 80 390"
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
    <line x1="490" y1="205" x2="490" y2="265" stroke="var(--c-text)" stroke-width="5" stroke-linecap="round" />
    <path d="M 490 217 L 560 185 L 640 185" fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 490 253 L 560 285 L 560 390" fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    <polygon points="534.9,272.7 541.3,262.5 550,275" fill="var(--c-text)" />

    <!-- 继电器线圈 K -->
    <path d="M 640 185 L 700 185" fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round" />
    <path d="M 700 185 L 700 168 M 700 112 L 700 60" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
    <rect x="688" y="112" width="24" height="56" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-text)" stroke-width="1.6" />
    <text x="700" y="149" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text)">K</text>
    <text x="676" y="146" text-anchor="end" font-size="14" fill="var(--c-text-dim)">继电器线圈</text>

    <!-- 续流二极管 D（反接在 + 与集电极之间） -->
    <g v-if="showDiode">
      <path
        d="M 790 60 L 790 116 M 790 140 L 790 185 L 700 185"
        fill="none"
        stroke="var(--c-text)"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <polygon points="776,140 804,140 790,114" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
      <line x1="776" y1="114" x2="804" y2="114" stroke="var(--c-text)" stroke-width="1.6" />
      <text x="808" y="146" font-size="16" fill="var(--c-text)">
        <tspan font-family="KaTeX_Math" font-style="italic">D</tspan>
      </text>
      <circle cx="790" cy="60" r="3.2" fill="var(--c-text)" />
      <circle cx="700" cy="185" r="3.2" fill="var(--c-text)" />
    </g>

    <!-- 继电器触点 + 小灯泡 -->
    <path d="M 850 60 L 850 92" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
    <CircuitSwitch :x="850" :y="112" orientation="vertical" :open="!coilOn(step)" :span="40" />
    <path d="M 850 132 L 850 209" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
    <circle cx="850" cy="225" r="16" fill="var(--c-surface-solid)" :stroke="coilOn(step) ? 'var(--c-accent)' : 'var(--c-text)'" stroke-width="1.6" />
    <path d="M 838 213 L 862 237 M 862 213 L 838 237" :stroke="coilOn(step) ? 'var(--c-accent)' : 'var(--c-text)'" stroke-width="1.4" />
    <circle v-if="coilOn(step)" cx="850" cy="225" r="27" fill="var(--c-accent)" opacity="0.16" />
    <path d="M 850 241 L 850 390" fill="none" stroke="var(--c-text)" stroke-width="1.6" />
    <text x="872" y="230" font-size="14" fill="var(--c-text-dim)">小灯泡</text>
    <text x="864" y="100" font-size="14" fill="var(--c-text-dim)">K 的触点</text>

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
    <text x="504" y="300" font-size="16" fill="var(--c-text-dim)">
      <tspan font-family="KaTeX_Main">VT</tspan>
    </text>

    <!-- 自感电动势 / 释放回路 -->
    <g v-if="(step ?? 0) >= 1">
      <text x="700" y="92" text-anchor="middle" font-size="14" fill="var(--c-accent)">自感电动势</text>
      <CourseArrow :from="{ x: 790, y: 176 }" :to="{ x: 790, y: 132 }" stroke="var(--c-accent)" :head-size="9" />
    </g>
    <g v-if="(step ?? 0) >= 2">
      <path d="M 700 178 L 700 196 L 790 196 L 790 152" fill="none" stroke="var(--c-accent)" stroke-width="2.4" stroke-dasharray="7 6" />
      <CourseArrow :from="{ x: 784, y: 176 }" :to="{ x: 790, y: 148 }" stroke="var(--c-accent)" :head-size="9" />
      <text x="812" y="196" font-size="14" fill="var(--c-accent)">自感电流</text>
    </g>
  </svg>
</template>

<style scoped>
.relay-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
