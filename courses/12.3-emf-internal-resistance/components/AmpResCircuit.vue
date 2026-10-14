<script setup lang="ts">
/**
 * 安阻法（电流表 + 电阻箱）电路图：没有电压表，电流表串在干路上（紧靠电源、画在开关上方）测干路电流， 外电阻由电阻箱给出。电阻箱用可调电阻符号画：<CircuitResistor> 矩形电阻 +
 * 左下→右上的斜箭头； 开关接在电源负极一侧。元件符号一律用共享 <Circuit*> 组件，导线手画（1.6）。 step ≥ 1 标出"电流表读数就是干路电流"。
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
      </g>
      <CircuitBattery :x="80" :y="140" orientation="vertical" polarity emf="E, r" />
      <CircuitSwitch :x="120" :y="220" :open="false" label="S" />
      <CircuitMeter :x="130" :y="60" kind="a" />
      <CircuitResistor :x="400" :y="140" orientation="vertical" label="R" />
      <!-- 可调电阻：从左下到右上的斜箭头插在电阻上 -->
      <CourseArrow
        :from="{ x: 356, y: 180 }"
        :to="{ x: 444, y: 100 }"
        stroke="var(--c-text)"
        :stroke-width="1.6"
        :head-size="10"
      />
      <text x="400" y="198" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">
        电阻箱
      </text>
      <CourseArrow
        :from="{ x: 280, y: 60 }"
        :to="{ x: 320, y: 60 }"
        stroke="var(--c-accent)"
        :stroke-width="2.4"
        label="I"
      />
      <g v-if="step >= 1">
        <rect
          x="56"
          y="38"
          width="144"
          height="212"
          rx="10"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="2"
          stroke-dasharray="7 6"
        />
        <text x="128" y="272" text-anchor="middle" font-size="18" fill="var(--c-accent)">
          电流表读数就是干路电流
        </text>
      </g>
    </svg>
  </div>
</template>
