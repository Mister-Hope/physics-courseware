<script setup lang="ts">
/**
 * 「测量通过小灯泡的电流」页配图（第 8 页）：用直流电流挡测通过小灯泡的电流——先断开电路、在灯泡下端与回路右下角之间卸开导线， 再把多用电表**串联**进这个断口；电流从红表笔（上端）流入、从黑表笔（下端）流出。
 *
 * 基础回路与 `MultimeterVoltageSvg.vue` 完全相同（左竖线 x=80、右竖线 x=480、上横线 y=70、下横线 y=280）， 两张图方便学生对照"并联测电压 / 串联测电流"。电源正极朝上（竖直放置的电池默认长板＝正极在上，无需 flip）。
 *
 * - `showBreak`：断开开关，右竖线在 y=219~251 处留出断口（黄色虚线框 + 标注"此处卸开导线"）；
 * - `showMeter`：电流表串进断口（回路重新闭合，开关合上）；
 * - `showProbes`：画出电流方向箭头，表笔那两段导线改色（电流流入的红表笔在上端）。
 */
const {
  showBreak = false,
  showMeter = false,
  showProbes = false,
} = defineProps<{
  /** 第 1 步：断开开关，在灯泡下端与回路右下角之间留出断口 */
  showBreak?: boolean;
  /** 第 2 步：把电流表串联进断口 */
  showMeter?: boolean;
  /** 第 3 步：画电流方向，并标出电流从红表笔流入 */
  showProbes?: boolean;
}>();
</script>

<template>
  <div class="mv-fig">
    <svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg">
      <text x="350" y="28" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">断开电路，把多用电表（直流电流挡）串联进去</text>
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 80 70 V 167" />
        <path d="M 80 183 V 280" />
        <path d="M 80 70 H 180" />
        <path d="M 220 70 H 480" />
        <path d="M 480 70 V 163" />
        <path d="M 480 280 H 80" />
        <path v-if="!(showBreak || showMeter || showProbes)" d="M 480 187 V 280" />
      </g>
      <g v-if="showBreak || showMeter || showProbes" fill="none" stroke-width="1.6" stroke-linecap="round">
        <path d="M 480 187 V 219" :stroke="showProbes ? '#f87171' : 'var(--c-text)'" />
        <path d="M 480 251 V 280" :stroke="showProbes ? '#94a3b8' : 'var(--c-text)'" />
      </g>
      <g v-if="showBreak && !showMeter && !showProbes">
        <rect x="464" y="215" width="32" height="40" rx="8" fill="none" stroke="var(--c-accent)" stroke-width="1.2" stroke-dasharray="4 4" />
        <text x="508" y="240" font-size="12" font-family="KaTeX_Main" fill="var(--c-accent)">此处卸开导线</text>
      </g>
      <CircuitBattery :x="80" :y="175" orientation="vertical" polarity emf="E" />
      <CircuitSwitch :x="200" :y="70" label="S" :open="showBreak && !showMeter && !showProbes" />
      <CircuitBulb :x="480" :y="175" orientation="vertical" label="L" :r="12" />
      <CircuitMeter v-if="showMeter || showProbes" kind="a" :x="480" :y="235" />
      <g v-if="showProbes">
        <CourseArrow :from="{ x: 80, y: 255 }" :to="{ x: 80, y: 205 }" stroke="var(--c-accent)" :stroke-width="2.4" />
        <CourseArrow :from="{ x: 280, y: 70 }" :to="{ x: 380, y: 70 }" stroke="var(--c-accent)" :stroke-width="2.4" label="I" />
        <CourseArrow :from="{ x: 480, y: 90 }" :to="{ x: 480, y: 150 }" stroke="var(--c-accent)" :stroke-width="2.4" />
        <CourseArrow :from="{ x: 400, y: 280 }" :to="{ x: 300, y: 280 }" stroke="var(--c-accent)" :stroke-width="2.4" />
        <text x="498" y="205" font-size="12" font-family="KaTeX_Main" fill="#f87171">电流从红表笔流入</text>
        <text x="498" y="272" font-size="12" font-family="KaTeX_Main" fill="#94a3b8">电流从黑表笔流出</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.mv-fig {
  width: 100%;
  min-width: 0;
}

.mv-fig svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
