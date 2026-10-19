<script setup lang="ts">
/**
 * 第二课时：测金属丝电阻率的实验电路（伏安法）。
 *
 * 电源、开关、滑动变阻器（**限流接法：线圈一端 + 滑片**）、电流表串在干路、 电压表并联在金属丝两端（**电流表外接**）——金属丝电阻只有几欧，远小于电压表内阻， 电压表分走的电流可以忽略，所以选外接。
 *
 * 元件一律用共享 <Circuit*> 组件（滑动变阻器用 <CircuitRheostat>，不再手画"电阻 + 斜箭头"）， 导线手画（1.6），止于元件两端；滑片引出线止于滑片接线端（线圈中心 + 短边/2 + sliderLength）。
 *
 * Slider（0~1）控制滑片位置，页面可绑 <CourseSlider> 做联动演示。 step ≥1 圈出电压表与金属丝的并联关系，≥2 标出"一端 + 滑片"的限流接线。
 */
import { computed } from "vue";

const { slider = 0.7, step = 0 } = defineProps<{ slider?: number; step?: number }>();

/** 滑片接线端：线圈左端 276 + slider × 长 48，位于线圈正上方 16 处 */
const sliderX = computed(() => 276 + slider * 48);
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 70 84 H 130" />
        <path d="M 170 84 H 276" />
        <path d="M 324 84 H 570" />
        <path d="M 570 84 V 148" />
        <path d="M 570 180 V 244" />
        <path d="M 570 244 H 324" />
        <path d="M 276 244 H 70" />
        <path d="M 70 244 V 172" />
        <path d="M 70 156 V 84" />
        <path d="M 240 244 V 168 H 284" />
        <path d="M 316 168 H 360 V 244" />
        <path :d="`M ${sliderX} 60 V 46 H 240 V 84`" />
      </g>
      <circle cx="240" cy="244" r="3" fill="var(--c-text)" />
      <circle cx="360" cy="244" r="3" fill="var(--c-text)" />
      <circle cx="240" cy="84" r="3" fill="var(--c-text)" />
      <CircuitBattery :x="70" :y="164" orientation="vertical" polarity emf="E" />
      <CircuitSwitch :x="150" :y="84" :open="false" label="S" />
      <CircuitRheostat :x="300" :y="84" :slider="slider" />
      <CircuitMeter :x="570" :y="164" kind="a" />
      <CircuitMeter :x="300" :y="168" kind="v" />
      <CircuitResistor :x="300" :y="244" label="R" />
      <CourseArrow :from="{ x: 400, y: 84 }" :to="{ x: 458, y: 84 }" stroke="var(--c-accent)" :stroke-width="2.4" label="I" />
      <text x="300" y="272" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">金属丝</text>
      <text x="300" y="122" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">滑动变阻器</text>
      <text x="258" y="160" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent-2)">U</text>
      <g v-if="step >= 1">
        <rect x="230" y="146" width="140" height="98" rx="10" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="7 6" />
      </g>
      <g v-if="step >= 2">
        <path :d="`M ${sliderX} 60 V 46 H 240 V 84`" fill="none" stroke="var(--c-accent-2)" stroke-width="2.8" stroke-linecap="round" />
        <circle cx="240" cy="84" r="4.5" fill="var(--c-accent-2)" />
        <circle cx="276" cy="84" r="4.5" fill="var(--c-accent-2)" />
      </g>
    </svg>
  </div>
</template>
