<script setup lang="ts">
// 第 16 页：打点计时器纸带上的五个计数点（碰前点距均匀、碰撞段突变、碰后均匀）
// step：1 = 标出碰前可用段 B→C，2 = 标出碰后可用段 D→E，3 = 标出不能用的碰撞段 C→D
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 900 200" class="ts-svg" role="img" aria-label="打点计时器纸带">
    <rect x="56" y="74" width="788" height="46" rx="6" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.4" />
    <g fill="var(--c-text)">
      <circle cx="110" cy="97" r="4.6" />
      <circle cx="270" cy="97" r="4.6" />
      <circle cx="430" cy="97" r="4.6" />
      <circle cx="564" cy="97" r="4.6" />
      <circle cx="671" cy="97" r="4.6" />
    </g>
    <g font-size="14" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)" text-anchor="middle">
      <text x="110" y="62">A</text>
      <text x="270" y="62">B</text>
      <text x="430" y="62">C</text>
      <text x="564" y="62">D</text>
      <text x="671" y="62">E</text>
    </g>
    <g stroke="var(--c-text-mute)" stroke-width="1.1">
      <path d="M 110 122 V 132 M 270 122 V 132 M 430 122 V 132 M 564 122 V 132 M 671 122 V 132" />
      <path d="M 110 128 H 270 M 270 128 H 430 M 430 128 H 564 M 564 128 H 671" />
    </g>
    <g font-size="13" font-family="KaTeX_Main" fill="var(--c-text-dim)" text-anchor="middle">
      <text x="190" y="150">5.00 cm</text>
      <text x="350" y="150">5.00 cm</text>
      <text x="497" y="150">4.2 cm</text>
      <text x="617" y="150">3.35 cm</text>
    </g>
    <text x="450" y="184" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">相邻计数点时间间隔 T = 0.1 s（50 Hz，每 5 个间隔取一点）</text>
    <g v-if="step >= 1">
      <rect x="256" y="64" width="188" height="66" rx="9" fill="none" stroke="var(--c-accent-2)" stroke-width="1.8" stroke-dasharray="6 5" />
      <text x="350" y="42" text-anchor="middle" font-size="14" fill="var(--c-accent-2)">碰前可用：v = 0.50 m/s</text>
    </g>
    <g v-if="step >= 2">
      <rect x="550" y="64" width="135" height="66" rx="9" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="6 5" />
      <text x="671" y="42" text-anchor="middle" font-size="14" fill="var(--c-accent)">碰后可用：v = 0.335 m/s</text>
    </g>
    <g v-if="step >= 3">
      <rect x="442" y="64" width="110" height="66" rx="9" fill="none" stroke="var(--c-danger)" stroke-width="1.8" stroke-dasharray="6 5" />
      <text x="497" y="42" text-anchor="middle" font-size="14" fill="var(--c-danger)">碰撞中，不能用</text>
    </g>
  </svg>
</template>

<style scoped>
.ts-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
