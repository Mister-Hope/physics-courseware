<!-- 注射器实验装置：封闭空气柱、柱塞、压力表、橡胶套；volume 0~1 控制活塞位置 -->
<script setup lang="ts">
import { computed } from "vue";

const {
  volume = 0.62,
  showLabels = false,
  showLength = false,
} = defineProps<{
  /** 活塞位置 0（压到底）~1（拉到最外） */
  volume?: number;
  /** 显示标注（研究对象、柱塞、压力表、橡胶套） */
  showLabels?: boolean;
  /** 显示长度 l 的测量线 */
  showLength?: boolean;
}>();

const pistonY = computed(() => 168 - volume * 96);
const airTop = computed(() => pistonY.value + 9);
</script>

<template>
  <svg viewBox="0 0 420 250" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- 压力表 -->
    <circle cx="330" cy="132" r="31" fill="rgba(148,163,184,0.08)" stroke="var(--c-text-dim)" stroke-width="2" />
    <path d="M 330 132 L 346 112" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" />
    <circle cx="330" cy="132" r="3.4" fill="var(--c-text-dim)" />
    <text x="330" y="182" text-anchor="middle" font-family="KaTeX_Main" font-size="16" fill="var(--c-text-dim)">压力表</text>
    <path d="M 204 208 C 250 208 288 178 300 146" fill="none" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" />
    <!-- 注射器筒身 -->
    <rect x="140" y="46" width="100" height="150" rx="7" fill="rgba(148,163,184,0.06)" stroke="var(--c-text-dim)" stroke-width="2" />
    <!-- 封闭空气柱 -->
    <rect x="143" :y="airTop" width="94" :height="190 - airTop" rx="4" fill="rgba(96,165,250,0.22)" />
    <!-- 柱塞 + 拉杆 -->
    <rect x="143" :y="pistonY" width="94" height="10" rx="3" fill="var(--c-text-dim)" />
    <line x1="190" :y1="pistonY" x2="190" y2="24" stroke="var(--c-text-dim)" stroke-width="2.6" />
    <line x1="158" y1="24" x2="222" y2="24" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" />
    <!-- 下端橡胶套 -->
    <rect x="166" y="196" width="48" height="18" rx="4" fill="var(--c-text-dim)" opacity="0.65" />
    <!-- 筒身刻度 -->
    <g stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.7">
      <line x1="240" y1="70" x2="250" y2="70" />
      <line x1="240" y1="94" x2="250" y2="94" />
      <line x1="240" y1="118" x2="250" y2="118" />
      <line x1="240" y1="142" x2="250" y2="142" />
      <line x1="240" y1="166" x2="250" y2="166" />
    </g>
    <!-- 长度 l 的测量 -->
    <g v-if="showLength" stroke="var(--c-velocity)" stroke-width="1.6" stroke-dasharray="5 4">
      <line x1="112" :y1="airTop" x2="140" :y2="airTop" />
      <line x1="112" y1="190" x2="140" y2="190" />
      <line x1="112" :y1="airTop" x2="112" y2="190" />
    </g>
    <text
      v-if="showLength"
      x="98"
      :y="(airTop + 190) / 2 + 6"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="19"
      fill="var(--c-velocity)"
    >
      l
    </text>
    <!-- 标注 -->
    <g v-if="showLabels" font-family="KaTeX_Main" font-size="16" fill="var(--c-text-dim)">
      <line x1="86" y1="150" x2="138" y2="150" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <text x="82" y="155" text-anchor="end">研究对象</text>
      <line x1="240" y1="24" x2="278" y2="24" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <text x="282" y="29">柱塞</text>
      <line x1="216" y1="216" x2="258" y2="228" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <text x="262" y="233">橡胶套</text>
    </g>
  </svg>
</template>
