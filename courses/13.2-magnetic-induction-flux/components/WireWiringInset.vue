<template>
  <!-- 俯视接线小图：三块磁体并排，接线柱 1/2/3/4；金色通电段随 t 变长（t=0 接 2、3，t=1 接 1、4） -->
  <div class="wwi">
    <svg viewBox="0 0 380 108" width="100%" xmlns="http://www.w3.org/2000/svg">
      <g fill="rgba(148,163,184,0.16)" stroke="var(--c-text-dim)" stroke-width="1.4">
        <rect x="88" y="30" width="40" height="40" rx="6" />
        <rect x="144" y="30" width="40" height="40" rx="6" />
        <rect x="200" y="30" width="40" height="40" rx="6" />
      </g>
      <line x1="30" y1="50" x2="352" y2="50" stroke="var(--c-text)" stroke-width="2.2" stroke-linecap="round" />
      <line :x1="segL" y1="50" :x2="segR" y2="50" stroke="var(--c-accent)" stroke-width="6" stroke-linecap="round" />
      <g fill="var(--c-surface-solid)" stroke="var(--c-text)" stroke-width="1.8">
        <circle :cx="T1" cy="50" r="4.6" />
        <circle :cx="T2" cy="50" r="4.6" />
        <circle :cx="T3" cy="50" r="4.6" />
        <circle :cx="T4" cy="50" r="4.6" />
      </g>
      <g font-family="KaTeX_Main" font-size="13" fill="var(--c-text-dim)" text-anchor="middle">
        <text :x="T1" y="76">1</text>
        <text :x="T2" y="20">2</text>
        <text :x="T3" y="20">3</text>
        <text :x="T4" y="76">4</text>
      </g>
      <text :x="(segL + segR) / 2" y="94" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)">l</text>
      <CourseArrow :from="{ x: 352, y: 50 }" :to="{ x: 374, y: 50 }" stroke="var(--c-accent-2)" :stroke-width="2" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { t = 0 } = defineProps<{ /** 0 = 接 2、3（l 最小）；1 = 接 1、4（l 最大） */ t?: number }>()

const T1 = 60
const T2 = 136
const T3 = 192
const T4 = 268
const segL = computed(() => T2 + (T1 - T2) * t)
const segR = computed(() => T3 + (T4 - T3) * t)
</script>

<style scoped>
.wwi {
  width: 100%;
  min-width: 0;
}

.wwi svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
