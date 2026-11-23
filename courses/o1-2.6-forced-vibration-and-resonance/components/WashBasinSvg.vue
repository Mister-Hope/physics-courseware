<script setup lang="ts">
// 洗盆示意图：水面、涟漪，点击后出现水花
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 360 240" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M 70 100 C 70 180 112 216 180 216 C 248 216 290 180 290 100" fill="var(--c-accent)" opacity="0.12" stroke="var(--c-accent)" stroke-width="2.4" />
    <ellipse cx="180" cy="100" rx="110" ry="18" fill="none" stroke="var(--c-accent)" stroke-width="2.6" />
    <ellipse cx="180" cy="106" rx="102" ry="13" fill="var(--c-sky-soft)" stroke="var(--c-sky)" stroke-width="1.4" />
    <ellipse cx="180" cy="106" rx="22" ry="4" fill="none" stroke="var(--c-sky)" stroke-width="1.4" />
    <ellipse cx="180" cy="106" rx="44" ry="6" fill="none" stroke="var(--c-sky)" stroke-width="1.4" opacity="0.8" />
    <ellipse cx="180" cy="106" rx="66" ry="8" fill="none" stroke="var(--c-sky)" stroke-width="1.4" opacity="0.55" />
    <circle cx="62" cy="100" r="12" fill="none" stroke="var(--c-accent)" stroke-width="2.4" />
    <circle cx="298" cy="100" r="12" fill="none" stroke="var(--c-accent)" stroke-width="2.4" />
    <path d="M 112 216 L 136 228 L 224 228 L 248 216" fill="none" stroke="var(--c-accent)" stroke-width="2.4" stroke-linejoin="round" />
    <g v-if="step >= 1">
      <circle cx="148" cy="68" r="3.2" fill="var(--c-physics)" />
      <circle cx="166" cy="52" r="3.6" fill="var(--c-physics)" />
      <circle cx="182" cy="44" r="4" fill="var(--c-physics)" />
      <circle cx="198" cy="52" r="3.6" fill="var(--c-physics)" />
      <circle cx="216" cy="68" r="3.2" fill="var(--c-physics)" />
      <path d="M 138 88 Q 160 74 180 86 Q 200 74 222 88" fill="none" stroke="var(--c-physics)" stroke-width="1.6" opacity="0.8" />
      <path d="M 154 98 Q 170 88 186 96 Q 202 88 216 98" fill="none" stroke="var(--c-sky)" stroke-width="1.4" opacity="0.7" />
    </g>
  </svg>
</template>
