<script setup lang="ts">
/** 第 7–8 页：测金属丝电阻率的实验电路。电源、开关、滑动变阻器（限流接法）、 电流表串在干路、电压表并联在金属丝两端（电流表外接法，金属丝电阻小，电压表分流可忽略）。 元件一律用共享 <Circuit*> 组件，导线手画（1.6），止于元件两端。 */
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 70 60 V 132" />
        <path d="M 70 148 V 240" />
        <path d="M 70 60 H 130" />
        <path d="M 170 60 H 306" />
        <path d="M 354 60 H 514" />
        <path d="M 530 60 V 124" />
        <path d="M 530 156 V 240" />
        <path d="M 530 240 H 324" />
        <path d="M 276 240 H 70" />
        <path d="M 220 240 V 144 H 284" />
        <path d="M 316 144 H 380 V 240" />
      </g>
      <circle cx="220" cy="240" r="3" fill="var(--c-text)" />
      <circle cx="380" cy="240" r="3" fill="var(--c-text)" />
      <CircuitBattery :x="70" :y="140" orientation="vertical" polarity emf="E" />
      <CircuitSwitch :x="150" :y="60" label="S" />
      <CircuitResistor :x="330" :y="60" />
      <CircuitMeter :x="530" :y="140" kind="a" />
      <CircuitResistor :x="300" :y="240" label="R" />
      <CircuitMeter :x="300" :y="144" kind="v" />
      <CourseArrow :from="{ x: 410, y: 28 }" :to="{ x: 356, y: 52 }" stroke="var(--c-text)" :stroke-width="1.6" :head-size="9" />
      <text x="418" y="26" font-size="15" fill="var(--c-text-dim)">滑片</text>
      <text x="330" y="98" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">滑动变阻器</text>
      <text x="300" y="274" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">金属丝</text>
      <text x="258" y="152" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent-2)">U</text>
      <CourseArrow :from="{ x: 205, y: 60 }" :to="{ x: 285, y: 60 }" stroke="var(--c-accent)" :stroke-width="2.4" label="I" />
    </svg>
  </div>
</template>
