<script setup lang="ts">
/**
 * 「测量小灯泡的电压」页配图（第 6 页）：用直流电压挡测小灯泡两端的电压——多用电表**并联**在小灯泡两端，红表笔接电势高的一端。
 *
 * 基础回路与 `MultimeterCurrentSvg.vue` 完全相同（左竖线 x=80、右竖线 x=480、上横线 y=70、下横线 y=280）， 两张图方便学生对照"并联测电压 / 串联测电流"。电源正极朝上（竖直放置的电池默认长板＝正极在上，无需 flip）。
 *
 * - `showMeter`：出现并联在小灯泡两端的电压表支路（灯泡上端 T 形接点 → 电表 → 灯泡下端 T 形接点）；
 * - `showProbes`：支路两段导线改色（接高电势那半段红、接低电势那半段灰）并加表笔标注。
 */
const { showMeter = false, showProbes = false } = defineProps<{
  /** 第 1 步：出现并联在小灯泡两端的电压表支路 */
  showMeter?: boolean;
  /** 第 2 步：标出红 / 黑表笔各接在哪一端（接高电势的那半段导线改红） */
  showProbes?: boolean;
}>();
</script>

<template>
  <div class="mv-fig">
    <svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg">
      <text x="350" y="28" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">多用电表（直流电压挡）并联在小灯泡两端</text>
      <g v-if="showMeter || showProbes">
        <rect x="445" y="44" width="215" height="256" rx="16" fill="rgba(226,168,70,0.05)" stroke="var(--c-accent)" stroke-width="1.2" stroke-dasharray="6 5" />
        <text x="548" y="36" text-anchor="middle" font-size="12" font-family="KaTeX_Main" fill="var(--c-accent)">并联</text>
      </g>
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 80 70 V 167" />
        <path d="M 80 183 V 280" />
        <path d="M 80 70 H 180" />
        <path d="M 220 70 H 480" />
        <path d="M 480 70 V 163" />
        <path d="M 480 187 V 280" />
        <path d="M 480 280 H 80" />
      </g>
      <g v-if="showMeter || showProbes" fill="none" stroke-width="1.6" stroke-linecap="round">
        <path d="M 480 70 H 620 V 159" :stroke="showProbes ? '#f87171' : 'var(--c-text)'" />
        <path d="M 620 191 V 280 H 480" :stroke="showProbes ? '#94a3b8' : 'var(--c-text)'" />
      </g>
      <CircuitBattery :x="80" :y="175" orientation="vertical" polarity emf="E" />
      <CircuitSwitch :x="200" :y="70" label="S" :open="false" />
      <CircuitBulb :x="480" :y="175" orientation="vertical" label="L" :r="12" />
      <CircuitMeter v-if="showMeter || showProbes" kind="v" :x="620" :y="175" />
      <circle v-if="showMeter || showProbes" cx="480" cy="70" r="3" fill="var(--c-text)" />
      <circle v-if="showMeter || showProbes" cx="480" cy="280" r="3" fill="var(--c-text)" />
      <g v-if="showProbes">
        <text x="550" y="60" text-anchor="middle" font-size="12" font-family="KaTeX_Main" fill="#f87171">红表笔（+）接高电势</text>
        <text x="550" y="266" text-anchor="middle" font-size="12" font-family="KaTeX_Main" fill="#94a3b8">黑表笔（−）接低电势</text>
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
