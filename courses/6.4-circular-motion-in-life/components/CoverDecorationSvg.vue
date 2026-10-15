<!--
  封面装饰（第 1 页）：生活中的圆周运动
  —— 俯视一段圆形弯道（路面外缘 R=138、内缘 R=114、圆心在画面下方）；
     小车沿弯道行驶，蓝色速度 v 沿弯道切线（与半径垂直），
     金色向心力 F 沿半径指向圆心，虚线半径把小车与圆心连起来。
-->
<template>
  <svg viewBox="0 0 320 196" width="320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="弯道上的小车：速度沿弯道切线，向心力指向弯道圆心">
    <defs>
      <linearGradient id="cml-cover-road" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stop-color="color-mix(in srgb, var(--c-velocity) 20%, transparent)" />
        <stop offset="55%" stop-color="color-mix(in srgb, var(--c-text-dim) 10%, transparent)" />
        <stop offset="100%" stop-color="color-mix(in srgb, var(--c-text-dim) 5%, transparent)" />
      </linearGradient>
      <linearGradient id="cml-cover-car-body" x1="0" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stop-color="var(--c-neutral-50)" />
        <stop offset="100%" stop-color="#a7b6cb" />
      </linearGradient>
      <radialGradient id="cml-cover-car-glow">
        <stop offset="0%" stop-color="color-mix(in srgb, var(--c-velocity) 45%, transparent)" />
        <stop offset="100%" stop-color="rgba(96,165,250,0)" />
      </radialGradient>
    </defs>
    <path
      d="M 30.32 116.8 A 138 138 0 0 1 289.68 116.8 L 267.12 125.01 A 114 114 0 0 0 52.88 125.01 Z"
      fill="none"
      stroke="color-mix(in srgb, var(--c-velocity) 10%, transparent)"
      stroke-width="9"
      stroke-linejoin="round"
    />
    <path
      d="M 30.32 116.8 A 138 138 0 0 1 289.68 116.8 L 267.12 125.01 A 114 114 0 0 0 52.88 125.01 Z"
      fill="url(#cml-cover-road)"
      stroke="color-mix(in srgb, var(--c-text-dim) 45%, transparent)"
      stroke-width="1.4"
      stroke-linejoin="round"
    />
    <path
      d="M 41.6 120.91 A 126 126 0 0 1 278.4 120.91"
      fill="none"
      stroke="color-mix(in srgb, var(--c-neutral-200) 20%, transparent)"
      stroke-width="1.6"
      stroke-dasharray="9 9"
    />
    <line
      x1="60.49"
      y1="91.7"
      x2="154.34"
      y2="159.89"
      stroke="color-mix(in srgb, var(--c-accent) 38%, transparent)"
      stroke-width="1.4"
      stroke-dasharray="5 6"
      stroke-linecap="round"
    />
    <circle cx="160" cy="164" r="5.2" fill="none" stroke="color-mix(in srgb, var(--c-accent) 50%, transparent)" stroke-width="1.6" />
    <circle cx="160" cy="164" r="1.8" fill="color-mix(in srgb, var(--c-accent) 85%, transparent)" />
    <g transform="translate(60.49 91.7) rotate(-54)">
      <ellipse rx="19" ry="12.5" fill="url(#cml-cover-car-glow)" />
      <rect x="-13" y="-6.5" width="26" height="13" rx="4.6" fill="url(#cml-cover-car-body)" />
      <rect x="2" y="-5" width="6" height="10" rx="2" fill="color-mix(in srgb, var(--c-accent-2) 85%, transparent)" />
      <rect x="-8.8" y="-4.4" width="3.4" height="8.8" rx="1.6" fill="color-mix(in srgb, var(--c-accent-2) 40%, transparent)" />
    </g>
    <CourseArrow :from="{ x: 68.13, y: 81.19 }" :to="{ x: 82.83, y: 60.96 }" stroke="var(--c-velocity)" :stroke-width="2.8" :head-size="10" />
    <CourseArrow :from="{ x: 67.37, y: 96.7 }" :to="{ x: 112.27, y: 129.32 }" stroke="var(--c-accent)" :stroke-width="3.2" :head-size="12" />
    <text
      x="53"
      y="55"
      fill="var(--c-velocity)"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="19"
      text-anchor="middle"
      stroke="var(--c-bg-soft)"
      stroke-width="3.5"
      paint-order="stroke"
    >
      v
    </text>
    <text
      x="78.1"
      y="129.2"
      fill="var(--c-accent)"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="19"
      text-anchor="middle"
      stroke="var(--c-bg-soft)"
      stroke-width="3.5"
      paint-order="stroke"
    >
      F
    </text>
  </svg>
</template>
