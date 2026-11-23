<script setup lang="ts">
// 封面装饰：被测量 → 传感器 → 控制电路 → 执行装置 的信号链
</script>

<template>
  <svg
    viewBox="0 0 340 200"
    width="330"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="传感器到执行装置的信号链"
  >
    <path
      d="M 8 126 H 332"
      stroke="var(--c-border)"
      stroke-width="1.4"
      stroke-dasharray="5 6"
    />
    <!-- ① 传感器：干簧管 -->
    <circle cx="62" cy="126" r="40" fill="var(--c-accent-2)" opacity="0.05" />
    <circle
      cx="62"
      cy="126"
      r="40"
      fill="none"
      stroke="var(--c-accent-2)"
      stroke-width="1.4"
      opacity="0.4"
    />
    <rect
      x="36"
      y="112"
      width="52"
      height="28"
      rx="13"
      fill="none"
      stroke="var(--c-accent-2)"
      stroke-width="1.8"
      opacity="0.9"
    />
    <path
      d="M 40 126 H 56"
      stroke="var(--c-text)"
      stroke-width="3"
      stroke-linecap="round"
      opacity="0.75"
    />
    <path
      d="M 84 126 H 68"
      stroke="var(--c-text)"
      stroke-width="3"
      stroke-linecap="round"
      opacity="0.75"
    />
    <path
      d="M 22 126 H 36"
      stroke="var(--c-text-dim)"
      stroke-width="1.8"
      stroke-linecap="round"
    />
    <path
      d="M 88 126 H 102"
      stroke="var(--c-text-dim)"
      stroke-width="1.8"
      stroke-linecap="round"
    />
    <!-- 信号箭头 -->
    <line
      x1="106"
      y1="126"
      x2="148"
      y2="126"
      stroke="var(--c-accent)"
      stroke-width="1.6"
      stroke-dasharray="5 4"
      opacity="0.8"
    />
    <path
      d="M 150 120 L 160 126 L 150 132 Z"
      fill="var(--c-accent)"
      opacity="0.9"
    />
    <!-- ② 控制电路：继电器 -->
    <rect
      x="160"
      y="100"
      width="58"
      height="52"
      rx="12"
      fill="var(--c-surface)"
      stroke="var(--c-border-glow)"
      stroke-width="1.6"
    />
    <rect
      x="174"
      y="116"
      width="10"
      height="20"
      rx="2"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="1.6"
    />
    <line
      x1="188"
      y1="122"
      x2="204"
      y2="114"
      stroke="var(--c-accent)"
      stroke-width="1.6"
      stroke-linecap="round"
    />
    <circle cx="188" cy="122" r="2" fill="var(--c-accent)" />
    <circle cx="204" cy="114" r="2" fill="var(--c-accent)" />
    <line
      x1="204"
      y1="114"
      x2="204"
      y2="106"
      stroke="var(--c-accent)"
      stroke-width="1.2"
      opacity="0.7"
    />
    <!-- ③ 执行装置：蜂鸣器 -->
    <line
      x1="222"
      y1="126"
      x2="262"
      y2="126"
      stroke="var(--c-accent)"
      stroke-width="1.6"
      stroke-dasharray="5 4"
      opacity="0.8"
    />
    <path
      d="M 264 120 L 274 126 L 264 132 Z"
      fill="var(--c-accent)"
      opacity="0.9"
    />
    <path
      d="M 278 140 L 280 128 A 12 12 0 0 1 304 128 L 306 140 Z"
      fill="var(--c-accent)"
      opacity="0.12"
    />
    <path
      d="M 278 140 L 280 128 A 12 12 0 0 1 304 128 L 306 140 Z"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="1.8"
      opacity="0.85"
    />
    <line
      x1="274"
      y1="140"
      x2="310"
      y2="140"
      stroke="var(--c-accent)"
      stroke-width="1.8"
      stroke-linecap="round"
      opacity="0.85"
    />
    <line
      x1="292"
      y1="118"
      x2="292"
      y2="112"
      stroke="var(--c-accent)"
      stroke-width="1.6"
      stroke-linecap="round"
      opacity="0.7"
    />
    <circle cx="292" cy="146" r="2.6" fill="var(--c-accent)" opacity="0.85" />
    <path
      d="M 316 118 A 18 18 0 0 1 316 142"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="1.4"
      opacity="0.5"
    />
    <path
      d="M 325 110 A 30 30 0 0 1 325 150"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="1.4"
      opacity="0.28"
    />
    <circle cx="62" cy="126" r="3" fill="var(--c-accent)" />
    <circle cx="160" cy="126" r="3" fill="var(--c-accent)" />
    <circle cx="262" cy="126" r="3" fill="var(--c-accent)" />
  </svg>
</template>
