<script setup lang="ts">
import { computed } from "vue";

const { showLabels = true } = defineProps<{
  /** 是否显示乙醚、水、毛毡等标注 */
  showLabels?: boolean;
}>();

const labels = computed(() => showLabels);
</script>

<template>
  <!-- 饮水小鸭：甲 直立；乙 头颈前倾、尖嘴浸入水中（下球内的乙醚仍留在球底） -->
  <svg viewBox="58 78 256 202" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="duck-body-a">
        <circle cx="96" cy="196" r="32" />
      </clipPath>
      <clipPath id="duck-body-b">
        <circle cx="200" cy="202" r="32" />
      </clipPath>
    </defs>
    <line x1="58" y1="240" x2="314" y2="240" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.45" />

    <!-- 甲：直立 -->
    <g>
      <rect x="92" y="130" width="8" height="70" fill="rgba(96, 165, 250, 0.2)" stroke="var(--c-velocity)" stroke-width="1.2" />
      <circle cx="96" cy="196" r="32" fill="#0d1322" stroke="var(--c-velocity)" stroke-width="1.6" />
      <rect x="64" y="204" width="64" height="28" fill="rgba(226, 168, 70, 0.4)" clip-path="url(#duck-body-a)" />
      <circle cx="96" cy="124" r="17" fill="#0d1322" stroke="var(--c-velocity)" stroke-width="1.6" />
      <path d="M 79 124 A 17 17 0 0 1 113 124 Z" fill="rgba(226, 168, 70, 0.3)" stroke="var(--c-accent)" stroke-width="1.4" />
      <path d="M 112 126 L 127 122 L 113 134 Z" fill="var(--c-accent)" />
      <circle cx="102" cy="120" r="1.8" fill="var(--c-text-dim)" />
      <path d="M 82 226 L 82 238 M 110 226 L 110 238" stroke="var(--c-velocity)" stroke-width="2.4" stroke-linecap="round" />
      <text x="96" y="270" font-size="15" fill="var(--c-text-dim)" text-anchor="middle">甲　直立</text>
    </g>

    <!-- 乙：头颈前倾，尖嘴浸入水中 -->
    <g>
      <g transform="rotate(80 200 202)">
        <rect x="196" y="136" width="8" height="70" fill="rgba(96, 165, 250, 0.2)" stroke="var(--c-velocity)" stroke-width="1.2" />
        <circle cx="200" cy="130" r="17" fill="#0d1322" stroke="var(--c-velocity)" stroke-width="1.6" />
        <path d="M 183 130 A 17 17 0 0 1 217 130 Z" fill="rgba(226, 168, 70, 0.3)" stroke="var(--c-accent)" stroke-width="1.4" />
        <path d="M 216 132 L 231 128 L 217 140 Z" fill="var(--c-accent)" />
        <circle cx="206" cy="126" r="1.8" fill="var(--c-text-dim)" />
      </g>
      <circle cx="200" cy="202" r="32" fill="#0d1322" stroke="var(--c-velocity)" stroke-width="1.6" />
      <rect x="168" y="212" width="64" height="26" fill="rgba(226, 168, 70, 0.4)" clip-path="url(#duck-body-b)" />
      <path d="M 248 168 L 304 168 L 300 234 Q 276 240 252 234 Z" fill="rgba(96, 165, 250, 0.1)" stroke="var(--c-velocity)" stroke-width="1.6" />
      <path d="M 250 206 L 302 206 L 300 234 Q 276 240 252 234 Z" fill="rgba(96, 165, 250, 0.32)" />
      <line x1="249" y1="206" x2="303" y2="206" stroke="var(--c-velocity)" stroke-width="1.2" opacity="0.85" />
      <text x="276" y="270" font-size="15" fill="var(--c-text-dim)" text-anchor="middle">乙　倾倒</text>
    </g>

    <g v-if="labels">
      <line x1="150" y1="92" x2="116" y2="110" stroke="var(--c-accent)" stroke-width="1" opacity="0.75" />
      <text x="154" y="90" font-size="13" fill="var(--c-accent)">毛毡吸水</text>
      <line x1="146" y1="252" x2="122" y2="216" stroke="var(--c-accent)" stroke-width="1" opacity="0.75" />
      <text x="136" y="260" font-size="13" fill="var(--c-accent)">乙醚</text>
      <text x="276" y="162" font-size="13" fill="var(--c-velocity)" text-anchor="middle">水</text>
    </g>
  </svg>
</template>
