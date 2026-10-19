<script setup lang="ts">
// 第 11 页：静电屏蔽的三处应用 —— 高压线屏蔽线 / 超高压作业服 / 话筒线屏蔽层
defineProps<{ step: number }>();
</script>

<template>
  <svg viewBox="0 0 860 260" class="w-full" xmlns="http://www.w3.org/2000/svg" style="height: 200px">
    <!-- (a) 高压输电线与屏蔽线 -->
    <line x1="140" y1="40" x2="140" y2="216" stroke="var(--c-text-mute)" stroke-width="3" />
    <line x1="120" y1="92" x2="160" y2="92" stroke="var(--c-text-mute)" stroke-width="3" />
    <line x1="126" y1="140" x2="154" y2="140" stroke="var(--c-text-mute)" stroke-width="3" />
    <path d="M 20 70 C 80 96 200 96 260 70" fill="none" stroke="var(--c-text-mute)" stroke-width="3" />
    <path d="M 20 92 C 80 120 200 120 260 92" fill="none" stroke="var(--c-text-mute)" stroke-width="3" />
    <path d="M 20 114 C 80 144 200 144 260 114" fill="none" stroke="var(--c-text-mute)" stroke-width="3" />
    <path d="M 20 34 C 80 50 200 50 260 34" fill="none" stroke="var(--c-accent-2)" stroke-width="3" stroke-dasharray="7 5" />
    <path d="M 20 152 C 80 168 200 168 260 152" fill="none" stroke="var(--c-accent-2)" stroke-width="3" stroke-dasharray="7 5" />
    <line x1="140" y1="216" x2="140" y2="238" stroke="var(--c-accent-2)" stroke-width="2.4" />
    <line x1="126" y1="240" x2="154" y2="240" stroke="var(--c-accent-2)" stroke-width="2.6" />
    <text x="140" y="256" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">高压线 + 两条屏蔽线</text>
    <template v-if="step >= 1">
      <text x="196" y="24" font-family="KaTeX_Main" font-size="12" fill="var(--c-accent-2)">与大地相连，屏蔽高压线</text>
    </template>
    <!-- (b) 超高压作业服 -->
    <circle cx="430" cy="66" r="18" fill="var(--c-line)" stroke="var(--c-text-mute)" stroke-opacity="0.6" stroke-width="2" />
    <path
      d="M 404 90 L 456 90 L 466 176 L 394 176 Z"
      fill="var(--c-line)"
      fill-opacity="0.55"
      stroke="var(--c-text-mute)"
      stroke-opacity="0.5"
      stroke-width="2"
    />
    <line x1="416" y1="176" x2="410" y2="222" stroke="var(--c-text-mute)" stroke-width="6" stroke-linecap="round" />
    <line x1="444" y1="176" x2="450" y2="222" stroke="var(--c-text-mute)" stroke-width="6" stroke-linecap="round" />
    <template v-if="step >= 2">
      <path d="M 396 84 L 464 84 L 474 182 L 386 182 Z" fill="none" stroke="var(--c-accent-2)" stroke-width="2" stroke-dasharray="6 4" />
      <text x="430" y="244" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-accent-2)">金属丝织物形成导体壳，内部 E = 0</text>
    </template>
    <text v-else x="430" y="244" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">超高压带电作业服</text>
    <!-- (c) 话筒线截面 -->
    <circle cx="716" cy="130" r="66" fill="none" stroke="var(--c-text-mute)" stroke-width="2" />
    <circle cx="716" cy="130" r="54" fill="none" stroke="var(--c-text-mute)" stroke-width="2" />
    <circle cx="716" cy="130" r="40" fill="none" stroke="var(--c-text-mute)" stroke-width="2" />
    <circle cx="716" cy="130" r="10" fill="var(--c-accent)" fill-opacity="0.7" />
    <text x="716" y="222" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">话筒线截面</text>
    <template v-if="step >= 3">
      <circle cx="716" cy="130" r="54" fill="none" stroke="var(--c-accent-2)" stroke-width="4" stroke-dasharray="6 4" />
      <text x="716" y="34" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-accent-2)">金属屏蔽层把干扰电场挡在外面</text>
    </template>
  </svg>
</template>
