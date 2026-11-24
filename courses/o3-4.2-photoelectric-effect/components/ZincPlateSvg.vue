<!-- 第 2 页：锌板接验电器，紫外线照射前后指针夹角变化 -->
<template>
  <svg viewBox="0 0 440 236" width="100%" xmlns="http://www.w3.org/2000/svg">
    <g v-for="panel in panels" :key="panel.key">
      <rect
        :x="panel.cx - 56"
        y="92"
        width="112"
        height="118"
        rx="10"
        fill="rgba(148, 163, 184, 0.05)"
        stroke="var(--c-text-dim)"
        stroke-width="1.2"
        opacity="0.7"
      />
      <rect :x="panel.cx - 44" y="22" width="88" height="13" rx="3" fill="rgba(148, 163, 184, 0.32)" stroke="var(--c-text-dim)" stroke-width="1.4" />
      <line :x1="panel.cx" y1="35" :x2="panel.cx" y2="156" stroke="var(--c-text)" stroke-width="1.8" />
      <circle :cx="panel.cx" cy="50" r="10" fill="rgba(226, 168, 70, 0.18)" stroke="var(--c-accent)" stroke-width="1.5" />
      <line :x1="panel.cx" y1="156" :x2="panel.cx - panel.spread" y2="206" stroke="var(--c-accent)" stroke-width="2.4" stroke-linecap="round" />
      <line :x1="panel.cx" y1="156" :x2="panel.cx + panel.spread" y2="206" stroke="var(--c-accent)" stroke-width="2.4" stroke-linecap="round" />
      <text v-for="(dx, i) in panel.plateCharges" :key="`p${i}`" :x="panel.cx + dx" :y="32" font-size="13" fill="var(--c-velocity)" text-anchor="middle">
        −
      </text>
      <text v-for="(c, i) in panel.leafCharges" :key="`l${i}`" :x="c.x" :y="c.y" font-size="13" fill="var(--c-velocity)" text-anchor="middle">−</text>
      <text :x="panel.cx" y="230" font-size="14" fill="var(--c-text-dim)" text-anchor="middle">{{ panel.caption }}</text>
      <text :x="panel.cx - 52" y="16" font-size="12" fill="var(--c-text-dim)">锌板</text>
    </g>
    <g v-if="showUv">
      <path d="M 20 62 L 54 38" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" />
      <path d="M 54 38 L 42 40 M 54 38 L 48 48" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" />
      <path d="M 16 82 L 50 58" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" />
      <path d="M 50 58 L 38 60 M 50 58 L 44 68" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" />
      <text x="14" y="106" font-size="12" fill="var(--c-accent)">紫外线</text>
    </g>
    <g v-if="showArc">
      <path d="M 386 188 A 44 44 0 0 1 362 148" fill="none" stroke="var(--c-danger)" stroke-width="1.4" stroke-dasharray="4 4" />
      <path d="M 362 148 L 372 154 M 362 148 L 372 142" fill="none" stroke="var(--c-danger)" stroke-width="1.4" stroke-linecap="round" />
      <text x="376" y="206" font-size="12" fill="var(--c-danger)" text-anchor="middle">夹角变小</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { showArc = false, showUv = true } = defineProps<{
  showArc?: boolean;
  showUv?: boolean;
}>();

const panels = computed(() => [
  {
    key: "a",
    cx: 104,
    spread: 30,
    plateCharges: [-28, 0, 28],
    leafCharges: [
      { x: 82, y: 186 },
      { x: 126, y: 186 },
    ],
    caption: "甲　照射前",
  },
  {
    key: "b",
    cx: 318,
    spread: 10,
    plateCharges: [0],
    leafCharges: [{ x: 318, y: 192 }],
    caption: "乙　照射后",
  },
]);
</script>
