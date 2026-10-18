<template>
  <!-- 第 1 页封面装饰：左边一条黑体辐射的强度—波长曲线（峰值靠在中段），右边一组能级横线 + 一次向下的跃迁 + 一道光子波浪线（纯图形，不放文字） -->
  <svg viewBox="0 0 286 126" width="276" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="16" y1="112" x2="150" y2="112" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5 5" opacity="0.35" />
    <path
      d="M 18 112 C 44 112 54 34 82 34 C 106 34 116 88 146 96"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2.2"
      stroke-linecap="round"
      opacity="0.85"
    />
    <line x1="176" y1="100" x2="270" y2="100" stroke="currentColor" stroke-width="1.6" opacity="0.45" />
    <line x1="176" y1="70" x2="270" y2="70" stroke="currentColor" stroke-width="1.6" opacity="0.45" />
    <line x1="176" y1="48" x2="270" y2="48" stroke="currentColor" stroke-width="1.6" opacity="0.45" />
    <line x1="176" y1="32" x2="270" y2="32" stroke="currentColor" stroke-width="1.6" opacity="0.45" />
    <CourseArrow :from="{ x: 204, y: 48 }" :to="{ x: 204, y: 98 }" stroke="var(--c-accent)" stroke-width="2.4" />
    <path d="M 216 74 q 8 -10 16 0 t 16 0 t 16 0 t 16 0" fill="none" stroke="var(--c-accent-2)" stroke-width="2.1" stroke-linecap="round" opacity="0.95" />
    <circle cx="204" cy="48" r="3.4" fill="var(--c-accent)" />
  </svg>
</template>
