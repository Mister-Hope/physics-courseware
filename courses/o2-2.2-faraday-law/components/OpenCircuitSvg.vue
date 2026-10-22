<!--
  P4：闭合 / 断开回路中的感应电动势。
  - step 1：闭合，回路中有感应电流（电流方向按楞次定律：棒向右、B 向里 → 顺时针）。
  - step 2：断开开关，电流消失。
  - step 3：棒两端仍有电势差（电压表可测），上端为 +。
  - step 4：产生电动势的这段导体相当于电源。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 1 = 闭合有电流；2 = 断开无电流；3 = 两端有电势差 */
  step?: number;
}>();
</script>

<template>
  <svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" class="w-full">
    <!-- 磁场：垂直纸面向里 -->
    <FieldDots :x="175" :y="112" :cols="8" :rows="4" :spacing="40" dir="in" />

    <!-- 导轨与右侧回路 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
      <path d="M 150 95 H 500" />
      <path d="M 150 245 H 394" />
      <path d="M 426 245 H 500" />
      <path d="M 500 95 V 106" />
      <path d="M 500 154 V 180" />
      <path d="M 500 220 V 245" />
    </g>

    <!-- 电阻、开关、电流表 -->
    <CircuitResistor :x="500" :y="130" orientation="vertical" label="R" />
    <CircuitSwitch :x="500" :y="200" orientation="vertical" :open="step >= 2" label="S" />
    <CircuitMeter :x="410" :y="245" kind="a" />

    <!-- 导体棒 -->
    <line x1="150" y1="85" x2="150" y2="255" stroke="var(--c-accent)" stroke-width="5" stroke-linecap="round" />

    <!-- 运动方向 -->
    <CourseArrow :from="{ x: 162, y: 70 }" :to="{ x: 246, y: 70 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
    <text x="256" y="76" font-family="KaTeX_Math, serif" font-style="italic" font-size="18" fill="var(--c-velocity)">v</text>

    <!-- 感应电流方向：棒中向上 → 上轨向右 → 下轨向左 -->
    <g v-if="step < 2">
      <CourseArrow :from="{ x: 150, y: 232 }" :to="{ x: 150, y: 112 }" stroke="var(--c-accent-2)" :stroke-width="3.2" label="I" :label-dx="-14" :label-dy="0" />
      <CourseArrow :from="{ x: 205, y: 95 }" :to="{ x: 350, y: 95 }" stroke="var(--c-accent-2)" :stroke-width="2.6" />
      <CourseArrow :from="{ x: 345, y: 245 }" :to="{ x: 200, y: 245 }" stroke="var(--c-accent-2)" :stroke-width="2.6" />
    </g>

    <!-- 两端电势：上端为 + -->
    <g v-if="step >= 3">
      <text x="150" y="74" text-anchor="middle" font-family="KaTeX_Main, serif" font-size="24" fill="var(--c-danger)">+</text>
      <line x1="140" y1="276" x2="160" y2="276" stroke="var(--c-velocity)" stroke-width="4" stroke-linecap="round" />
    </g>

    <!-- 电压表：接在棒两端 -->
    <g v-if="step >= 3">
      <g fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5">
        <path d="M 150 95 H 60 V 154" />
        <path d="M 150 245 H 60 V 186" />
      </g>
      <CircuitMeter :x="60" :y="170" kind="v" />
    </g>
  </svg>
</template>
