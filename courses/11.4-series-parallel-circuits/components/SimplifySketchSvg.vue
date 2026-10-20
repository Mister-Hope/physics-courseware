<script setup lang="ts">
/**
 * 口诀页四张局部示意图（只画"一段导线 + 该设备 + 处理后的等效"，不画电源、不画完整回路）： branch —— 两条端点之间已经有一根导线直接相连，另挂一条含电阻的支路 ⇒ 去掉后只剩导线； node —— 一根导线连起来的两个点是同一个点 ⇒ 合并成一点（两侧连线保留）； meter ——
 * 理想电流表串在导线上（自身相当于一段导线）；理想电压表并在两点间（支路消失、两点不再相连，用淡虚线留住原位置）； cap —— 同一支路的两个阶段：充电瞬间电容处等效成导线；稳定后电容处断开。 图上不写判断句，结论留给教师讲。固有尺寸 250×76，直接放进 250px 宽的栏里。
 */
defineProps<{ variant: "branch" | "node" | "meter" | "cap" }>();
const ACCENT = "#60a5fa";
const FAINT = "rgba(148, 163, 184, 0.5)";
</script>

<template>
  <svg viewBox="0 0 340 104" width="250" height="76" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="var(--c-text)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <template v-if="variant === 'branch'">
        <path d="M 6 50 H 34 M 106 50 H 148" />
        <path d="M 34 50 H 106" />
        <path d="M 34 50 V 22 H 46 M 94 22 H 106 V 50" />
        <path d="M 176 50 H 334" />
        <text x="160" y="56" font-size="18" fill="var(--c-text-dim)">⇒</text>
      </template>

      <template v-if="variant === 'node'">
        <path d="M 6 52 H 148" />
        <path d="M 52 52 V 80 M 104 52 V 80" />
        <path d="M 176 52 H 262 M 262 52 H 334" />
        <path d="M 262 52 V 80 M 262 80 H 234 M 262 80 H 290" />
        <text x="160" y="58" font-size="18" fill="var(--c-text-dim)">⇒</text>
      </template>

      <template v-if="variant === 'meter'">
        <path d="M 6 30 H 26 M 66 30 H 148" />
        <path d="M 176 30 H 334" />
        <text x="160" y="36" font-size="18" fill="var(--c-text-dim)">⇒</text>
        <path d="M 6 84 H 30 M 130 84 H 148" />
        <path d="M 30 84 V 60 H 50 M 94 60 H 130 V 84" />
        <text x="160" y="90" font-size="18" fill="var(--c-text-dim)">⇒</text>
        <path d="M 176 84 H 236 M 268 84 H 334" />
        <path :stroke="FAINT" stroke-dasharray="4 4" d="M 236 84 V 68 M 268 84 V 68" />
      </template>

      <template v-if="variant === 'cap'">
        <path d="M 6 30 H 64 M 78 30 H 148" />
        <path d="M 64 14 V 46 M 78 14 V 46" />
        <path d="M 176 30 H 334" />
        <text x="160" y="36" font-size="18" fill="var(--c-text-dim)">⇒</text>
        <text x="258" y="14" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">充电瞬间</text>
        <path d="M 6 84 H 64 M 78 84 H 148" />
        <path d="M 64 68 V 100 M 78 68 V 100" />
        <path d="M 176 84 H 232 M 268 84 H 334" />
        <text x="160" y="90" font-size="18" fill="var(--c-text-dim)">⇒</text>
        <text x="258" y="68" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">稳定后</text>
      </template>
    </g>
    <template v-if="variant === 'meter'">
      <CircuitMeter :x="46" :y="30" kind="a" />
      <CircuitMeter :x="72" :y="60" kind="v" />
    </template>
    <CircuitResistor v-if="variant === 'branch'" :x="70" :y="22" />
    <g fill="var(--c-text)">
      <template v-if="variant === 'branch'">
        <circle cx="34" cy="50" r="3" />
        <circle cx="106" cy="50" r="3" />
      </template>
      <template v-if="variant === 'meter'">
        <circle cx="30" cy="84" r="3" />
        <circle cx="130" cy="84" r="3" />
        <circle cx="236" cy="84" r="3" />
        <circle cx="268" cy="84" r="3" />
      </template>
    </g>
    <g :fill="ACCENT">
      <circle v-if="variant === 'node'" cx="52" cy="52" r="3.6" />
      <circle v-if="variant === 'node'" cx="104" cy="52" r="3.6" />
      <circle v-if="variant === 'node'" cx="262" cy="52" r="3.6" />
    </g>
    <g :fill="ACCENT" font-family="KaTeX_Main" font-size="13" text-anchor="middle">
      <text v-if="variant === 'node'" x="52" y="44">①</text>
      <text v-if="variant === 'node'" x="104" y="44">①</text>
      <text v-if="variant === 'node'" x="262" y="44">①</text>
    </g>
  </svg>
</template>
