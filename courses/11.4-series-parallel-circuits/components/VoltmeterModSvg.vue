<script setup lang="ts">
/**
 * 电压表改装电路（教材图 11.4-5）：表头与分压电阻 R 串联，虚线框 = 改装后的电压表。
 * showShare = true 时标出"分到多少电压"：表头分到 U_g，串联电阻分到 U_R，两端一共 U = U_g + U_R。
 */
const { showShare = false } = defineProps<{
  /** 是否标出各段分到的电压（点击后才出） */
  showShare?: boolean;
}>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 460 170" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 40 70 H 134" />
        <path d="M 166 70 H 261" />
        <path d="M 309 70 H 420" />
      </g>
      <rect x="105" y="34" width="260" height="72" rx="8" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="7 6" />
      <CircuitMeter :x="150" :y="70" kind="a" />
      <CircuitResistor :x="285" :y="70" />
      <g v-if="showShare" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)" text-anchor="middle">
        <text x="150" y="52">
          <tspan>U</tspan>
          <tspan font-family="KaTeX_Main" font-size="15" dy="5">g</tspan>
        </text>
        <text x="285" y="52">
          <tspan>U</tspan>
          <tspan font-family="KaTeX_Main" font-size="15" dy="5">R</tspan>
        </text>
        <text x="400" y="52">U</text>
      </g>
      <text x="150" y="132" text-anchor="middle" font-size="18" fill="var(--c-text-dim)">表头</text>
      <text x="285" y="132" text-anchor="middle" font-size="18" fill="var(--c-text-dim)">分压电阻</text>
      <text x="430" y="76" font-family="KaTeX_Main" font-size="19" fill="var(--c-accent-2)">+</text>
      <text x="30" y="76" text-anchor="end" font-family="KaTeX_Main" font-size="19" fill="var(--c-text-dim)">−</text>
    </svg>
  </div>
</template>
