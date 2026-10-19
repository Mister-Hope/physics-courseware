<script setup lang="ts">
/**
 * 电流表改装电路（教材图 11.4-6）：表头与分流电阻 R 并联，虚线框 = 改装后的电流表。
 * showShare = true 时标出"分到多少电流"：表头通过 I_g，并联电阻分走 I_R，干路一共 I = I_g + I_R。
 */
const { showShare = false } = defineProps<{
  /** 是否标出各支路分到的电流（点击后才出） */
  showShare?: boolean;
}>();
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 440 230" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 30 60 H 410" />
        <path d="M 30 180 H 410" />
        <path d="M 160 60 V 104" />
        <path d="M 160 136 V 180" />
        <path d="M 300 60 V 96" />
        <path d="M 300 144 V 180" />
      </g>
      <circle cx="160" cy="60" r="3" fill="var(--c-text)" />
      <circle cx="300" cy="60" r="3" fill="var(--c-text)" />
      <circle cx="160" cy="180" r="3" fill="var(--c-text)" />
      <circle cx="300" cy="180" r="3" fill="var(--c-text)" />
      <rect x="120" y="38" width="220" height="152" rx="8" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="7 6" />
      <CircuitMeter :x="160" :y="120" kind="a" />
      <CircuitResistor :x="300" :y="120" orientation="vertical" />
      <g v-if="showShare">
        <text x="96" y="48" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent)">I</text>
        <text x="144" y="94" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent-2)">
          <tspan>I</tspan>
          <tspan font-family="KaTeX_Main" font-size="15" dy="5">g</tspan>
        </text>
        <text x="326" y="94" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-accent-2)">
          <tspan>I</tspan>
          <tspan font-family="KaTeX_Main" font-size="15" dy="5">R</tspan>
        </text>
      </g>
      <text x="160" y="222" text-anchor="middle" font-size="18" fill="var(--c-text-dim)">表头</text>
      <text x="300" y="222" text-anchor="middle" font-size="18" fill="var(--c-text-dim)">分流电阻</text>
      <text x="28" y="48" font-family="KaTeX_Main" font-size="19" fill="var(--c-accent-2)">+</text>
      <text x="28" y="202" font-family="KaTeX_Main" font-size="19" fill="var(--c-text-dim)">−</text>
    </svg>
  </div>
</template>
