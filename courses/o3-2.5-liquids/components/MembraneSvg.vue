<!-- 2.5 液体 P3：肥皂膜与棉线实验（stage 0 松弛 → 1 刺破一侧 → 2 线圈松弛 → 3 圈内刺破） -->
<script setup lang="ts">
const { stage = 0 } = defineProps<{ stage?: 0 | 1 | 2 | 3 }>();
</script>

<template>
  <svg viewBox="0 0 440 300" xmlns="http://www.w3.org/2000/svg">
    <circle v-if="stage === 0 || stage === 2" cx="220" cy="140" r="115" fill="rgba(96,165,250,0.16)" stroke="rgba(96,165,250,0.5)" stroke-width="1.2" />
    <path
      v-if="stage === 1"
      d="M 220 25 A 115 115 0 0 0 220 255 Q 130 140 220 25 Z"
      fill="rgba(96,165,250,0.16)"
      stroke="rgba(96,165,250,0.5)"
      stroke-width="1.2"
    />
    <path
      v-if="stage === 3"
      d="M 220 25 A 115 115 0 1 0 220 255 A 115 115 0 1 0 220 25 Z M 220 84 A 56 56 0 1 1 220 196 A 56 56 0 1 1 220 84 Z"
      fill-rule="evenodd"
      fill="rgba(96,165,250,0.16)"
      stroke="rgba(96,165,250,0.5)"
      stroke-width="1.2"
    />
    <circle cx="220" cy="140" r="115" fill="none" stroke="var(--c-neutral-300)" stroke-width="3" />
    <path
      v-if="stage === 0"
      d="M 220 25 C 190 80 250 130 215 180 C 197 214 250 244 220 255"
      fill="none"
      stroke="var(--c-text)"
      stroke-width="2.2"
      stroke-linecap="round"
    />
    <path v-if="stage === 1" d="M 220 25 Q 130 140 220 255" fill="none" stroke="var(--c-text)" stroke-width="2.2" stroke-linecap="round" />
    <path
      v-if="stage === 2"
      d="M 190 120 C 205 104 245 108 248 132 C 251 156 214 166 196 152 C 182 140 180 130 190 120 Z"
      fill="none"
      stroke="var(--c-text)"
      stroke-width="2.2"
      stroke-linejoin="round"
    />
    <circle v-if="stage === 3" cx="220" cy="140" r="56" fill="none" stroke="var(--c-text)" stroke-width="2.2" />
    <g v-if="stage === 1" opacity="0.9">
      <line x1="392" y1="52" x2="350" y2="86" stroke="var(--c-neutral-500)" stroke-width="2.6" stroke-linecap="round" />
      <circle cx="348" cy="88" r="4" fill="var(--c-danger)" />
    </g>
    <g v-if="stage === 3" opacity="0.9">
      <line x1="352" y1="196" x2="300" y2="170" stroke="var(--c-neutral-500)" stroke-width="2.6" stroke-linecap="round" />
      <circle cx="298" cy="169" r="4" fill="var(--c-danger)" />
    </g>
    <text x="220" y="288" font-size="14" fill="var(--c-text-dim)" text-anchor="middle">铁丝环与肥皂膜</text>
  </svg>
</template>
