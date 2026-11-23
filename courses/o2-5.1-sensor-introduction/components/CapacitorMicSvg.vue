<script setup lang="ts">
/** 5.1 认识传感器 · 电容式话筒：振动膜片与固定电极构成电容器，声波使膜片振动， 电容变化经转换电路在电阻 R 两端产生变化的电压信号。 step 0 结构｜1 声波使膜片振动｜2 电容变化｜3 转换电路输出信号 */
const { step = 0 } = defineProps<{ step?: number }>();

const plateFill = (active: boolean): string => (active ? "var(--c-accent)" : "var(--c-text-dim)");
const wireStroke = (active: boolean): string => (active ? "var(--c-accent)" : "var(--c-text)");
</script>

<template>
  <svg viewBox="0 0 420 320" class="cap-mic-svg" role="img" aria-label="电容式话筒原理：振动膜片、固定电极与转换电路">
    <g :opacity="step >= 1 ? 1 : 0.5">
      <path d="M 26 66 A 16 16 0 0 1 26 98" fill="none" :stroke="step >= 1 ? 'var(--c-accent)' : 'var(--c-text-dim)'" stroke-width="2" stroke-linecap="round" />
      <path
        d="M 38 58 A 24 24 0 0 1 38 106"
        fill="none"
        :stroke="step >= 1 ? 'var(--c-accent)' : 'var(--c-text-dim)'"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M 50 50 A 32 32 0 0 1 50 114"
        fill="none"
        :stroke="step >= 1 ? 'var(--c-accent)' : 'var(--c-text-dim)'"
        stroke-width="2"
        stroke-linecap="round"
      />
      <text x="8" y="42" font-size="11" fill="var(--c-text-dim)">声波</text>
    </g>
    <CourseArrow
      v-if="step >= 1"
      :from="{ x: 58, y: 86 }"
      :to="{ x: 92, y: 86 }"
      stroke="var(--c-accent)"
      :stroke-width="1.4"
      stroke-dasharray="4 4"
      :head-size="6"
    />
    <rect x="97" y="50" width="6" height="110" rx="3" :fill="plateFill(step >= 2)" />
    <rect x="119" y="50" width="6" height="110" rx="3" :fill="plateFill(step >= 2)" />
    <text x="86" y="38" font-size="11" fill="var(--c-text-dim)" text-anchor="middle">振动膜片</text>
    <text x="154" y="38" font-size="11" fill="var(--c-text-dim)" text-anchor="middle">固定电极</text>
    <text x="111" y="178" font-size="10" fill="var(--c-text-dim)" text-anchor="middle">几十微米</text>
    <text v-if="step >= 2" x="111" y="194" font-size="10" fill="var(--c-accent)" text-anchor="middle">电容变化</text>
    <text x="111" y="210" font-size="11" fill="var(--c-text-dim)" text-anchor="middle">电容器</text>
    <g :opacity="step >= 3 ? 1 : 0.35">
      <path d="M 100 160 V 230 H 40 V 290 H 102" fill="none" :stroke="wireStroke(step >= 3)" stroke-width="1.6" stroke-linecap="round" />
      <path d="M 118 290 H 186" fill="none" :stroke="wireStroke(step >= 3)" stroke-width="1.6" stroke-linecap="round" />
      <path d="M 234 290 H 330 V 230 H 120 V 160" fill="none" :stroke="wireStroke(step >= 3)" stroke-width="1.6" stroke-linecap="round" />
      <CircuitBattery :x="110" :y="290" :color="wireStroke(step >= 3)" :line-width="1.6" />
      <CircuitResistor :x="210" :y="290" label="R" :color="wireStroke(step >= 3)" :line-width="1.6" />
      <text x="110" y="314" font-size="10" fill="var(--c-text-dim)" text-anchor="middle">电源</text>
      <text x="286" y="222" font-size="11" fill="var(--c-text-dim)" text-anchor="middle">转换电路</text>
      <text x="290" y="314" font-size="10" fill="var(--c-text-dim)" text-anchor="middle">
        R 两端电压
        <tspan font-family="KaTeX_Math" font-style="italic" font-size="12">U</tspan>
      </text>
    </g>
  </svg>
</template>

<style scoped>
.cap-mic-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
