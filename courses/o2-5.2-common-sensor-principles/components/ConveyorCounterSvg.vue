<template>
  <!-- 流水线计数：A 发光、B（光敏电阻）接收；物品经过时光束被挡住 -->
  <svg
    viewBox="0 0 460 250"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="流水线计数装置示意图"
  >
    <g stroke="var(--c-neutral-500)" stroke-width="3" fill="none">
      <path d="M 80 162 H 212" />
      <path d="M 80 198 H 212" />
      <path d="M 238 162 H 380" />
      <path d="M 238 198 H 380" />
    </g>
    <circle cx="80" cy="180" r="18" fill="var(--c-neutral-700)" stroke="var(--c-neutral-500)" stroke-width="2.5" />
    <circle cx="380" cy="180" r="18" fill="var(--c-neutral-700)" stroke="var(--c-neutral-500)" stroke-width="2.5" />
    <line
      x1="225"
      y1="58"
      x2="225"
      y2="212"
      stroke="var(--c-accent)"
      stroke-width="2.2"
      stroke-dasharray="6 6"
      opacity="0.9"
    />
    <rect
      x="200"
      y="28"
      width="50"
      height="26"
      rx="6"
      fill="var(--c-surface-solid)"
      stroke="var(--c-accent)"
      stroke-width="1.8"
    />
    <text
      x="225"
      y="46"
      text-anchor="middle"
      font-family="KaTeX_Main"
      font-size="13"
      fill="var(--c-text)"
    >A</text>
    <rect
      x="200"
      y="214"
      width="50"
      height="26"
      rx="6"
      fill="var(--c-surface-solid)"
      stroke="var(--c-accent-2)"
      stroke-width="1.8"
    />
    <text
      x="225"
      y="232"
      text-anchor="middle"
      font-family="KaTeX_Main"
      font-size="13"
      fill="var(--c-text)"
    >B</text>
    <g fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="1.8">
      <rect x="122" y="136" width="34" height="26" rx="3" />
      <rect x="292" y="136" width="34" height="26" rx="3" />
      <rect v-if="blocked" x="208" y="136" width="34" height="26" rx="3" />
    </g>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ blocked?: boolean }>(), { blocked: false });
</script>
