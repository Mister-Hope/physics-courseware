<template>
  <!-- 光敏电阻结构：绝缘板 + 硫化镉层 + 两条互不相连的梳状银电极（可叠加载流子） -->
  <svg viewBox="0 0 460 232" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="光敏电阻结构示意图">
    <g v-if="showLight">
      <g stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round">
        <line x1="150" y1="26" x2="150" y2="136" />
        <line x1="230" y1="26" x2="230" y2="136" />
        <line x1="310" y1="26" x2="310" y2="136" />
      </g>
      <g fill="var(--c-accent)">
        <path d="M 144 136 L 150 148 L 156 136 Z" />
        <path d="M 224 136 L 230 148 L 236 136 Z" />
        <path d="M 304 136 L 310 148 L 316 136 Z" />
      </g>
    </g>
    <rect x="70" y="150" width="320" height="58" rx="10" fill="var(--c-surface-solid)" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <rect x="100" y="150" width="260" height="42" rx="4" fill="var(--c-accent)" fill-opacity="0.16" stroke="var(--c-accent)" stroke-width="1.4" />
    <g fill="var(--c-velocity)">
      <circle v-for="(p, i) in visibleCarriers" :key="i" :cx="p[0]" :cy="p[1]" r="2.8" opacity="0.95" />
    </g>
    <g stroke="var(--c-neutral-300)" stroke-width="4" stroke-linecap="round" fill="none">
      <line x1="118" y1="154" x2="118" y2="190" />
      <line x1="118" y1="158" x2="224" y2="158" />
      <line x1="118" y1="169" x2="224" y2="169" />
      <line x1="118" y1="180" x2="224" y2="180" />
      <line x1="118" y1="190" x2="218" y2="190" />
      <line x1="342" y1="154" x2="342" y2="190" />
      <line x1="342" y1="163" x2="240" y2="163" />
      <line x1="342" y1="174" x2="240" y2="174" />
      <line x1="342" y1="185" x2="238" y2="185" />
    </g>
    <g stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round">
      <line x1="118" y1="172" x2="44" y2="172" />
      <line x1="342" y1="172" x2="416" y2="172" />
    </g>
    <g fill="var(--c-text-dim)">
      <circle cx="44" cy="172" r="3" />
      <circle cx="416" cy="172" r="3" />
    </g>
    <g v-if="showBadges">
      <g stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="3 4" opacity="0.6">
        <line x1="285" y1="106" x2="290" y2="153" />
        <line x1="74" y1="100" x2="118" y2="152" />
        <line x1="388" y1="198" x2="352" y2="208" />
      </g>
      <g>
        <circle cx="285" cy="96" r="10" fill="var(--c-accent)" />
        <circle cx="66" cy="96" r="10" fill="var(--c-accent)" />
        <circle cx="396" cy="198" r="10" fill="var(--c-accent)" />
      </g>
      <g fill="var(--c-bg)" font-size="11" font-weight="700" text-anchor="middle" dominant-baseline="central">
        <text x="285" y="96">1</text>
        <text x="66" y="96">2</text>
        <text x="396" y="198">3</text>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    /** 显示的光照箭头（无光照时关掉） */
    showLight?: boolean;
    /** 显示 1/2/3 结构标注（P3 用；P4 两侧对比不用） */
    showBadges?: boolean;
    /** 显示的载流子个数（0–16） */
    carriers?: number;
  }>(),
  { showLight: true, showBadges: false, carriers: 0 },
);

const points: [number, number][] = [
  [118, 160],
  [146, 177],
  [166, 157],
  [190, 184],
  [208, 162],
  [226, 176],
  [244, 155],
  [258, 184],
  [278, 166],
  [296, 180],
  [310, 157],
  [324, 172],
  [136, 186],
  [200, 172],
  [252, 169],
  [286, 157],
];

const visibleCarriers = computed(() => points.slice(0, Math.max(0, Math.min(16, props.carriers))));
</script>
