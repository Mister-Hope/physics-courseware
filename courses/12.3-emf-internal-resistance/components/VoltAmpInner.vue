<script setup lang="ts">
/**
 * 电流表内接法（相对电源内接）电路图： 电流表串在电源干路上——紧靠电源、画在开关上方（测的就是干路电流）；电压表并联在滑动变阻器两端； 开关接在电源负极一侧。滑动变阻器＝电阻线圈（两端都接入）＋
 * 侧面滑片引出的支路。 元件符号一律用共享 <Circuit*> 组件，导线手画（1.6）。 step ≥ 1 标出"电流表串在干路上"；step ≥ 2 标出"电压表并联在变阻器两端"。
 */
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 80 60 H 114" />
        <path d="M 146 60 H 400" />
        <path d="M 400 60 V 116" />
        <path d="M 400 164 V 220" />
        <path d="M 400 220 H 140" />
        <path d="M 100 220 H 80" />
        <path d="M 80 60 V 132" />
        <path d="M 80 148 V 220" />
        <path d="M 250 60 V 124" />
        <path d="M 250 156 V 220" />
        <path d="M 450 140 V 108 H 400" />
      </g>
      <circle cx="250" cy="60" r="3" fill="var(--c-text)" />
      <circle cx="250" cy="220" r="3" fill="var(--c-text)" />
      <circle cx="400" cy="108" r="3" fill="var(--c-text)" />
      <CircuitBattery :x="80" :y="140" orientation="vertical" polarity emf="E, r" />
      <CircuitSwitch :x="120" :y="220" :open="false" label="S" />
      <CircuitMeter :x="130" :y="60" kind="a" />
      <CircuitMeter :x="250" :y="140" kind="v" />
      <CircuitResistor :x="400" :y="140" orientation="vertical" label="R" />
      <CourseArrow
        :from="{ x: 450, y: 140 }"
        :to="{ x: 410, y: 140 }"
        stroke="var(--c-text)"
        :stroke-width="1.6"
        :head-size="9"
      />
      <text
        x="226"
        y="146"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="var(--c-accent-2)"
      >
        U
      </text>
      <CourseArrow
        :from="{ x: 172, y: 60 }"
        :to="{ x: 214, y: 60 }"
        stroke="var(--c-accent)"
        :stroke-width="2.4"
        label="I"
      />
      <!-- 分步标注 1：电流表串在干路上 -->
      <g v-if="step >= 1">
        <rect
          x="106"
          y="34"
          width="48"
          height="52"
          rx="8"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="2"
          stroke-dasharray="7 6"
        />
        <text x="130" y="26" text-anchor="middle" font-size="18" fill="var(--c-accent)">
          电流表串在干路上
        </text>
      </g>
      <!-- 分步标注 2：电压表并联在变阻器两端 -->
      <g v-if="step >= 2">
        <rect
          x="230"
          y="38"
          width="238"
          height="212"
          rx="10"
          fill="none"
          stroke="var(--c-accent-2)"
          stroke-width="2"
          stroke-dasharray="7 6"
        />
        <text x="349" y="272" text-anchor="middle" font-size="18" fill="var(--c-accent-2)">
          电压表并联在变阻器两端
        </text>
      </g>
    </svg>
  </div>
</template>
