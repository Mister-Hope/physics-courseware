<!--
  3.2 封面装饰：一个周期的正弦波形，标出周期 T 与峰值；
  用暖金与蓝色区分正、负半周。
-->
<template>
  <svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="ac32-cover-wave" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--c-accent-2)" stop-opacity="0.35" />
        <stop offset="48%" stop-color="var(--c-accent)" />
        <stop offset="100%" stop-color="var(--c-accent-2)" stop-opacity="0.35" />
      </linearGradient>
    </defs>
    <line
      x1="24"
      y1="105"
      x2="296"
      y2="105"
      stroke="var(--c-text-dim)"
      stroke-width="1"
      stroke-dasharray="5 5"
      opacity="0.5"
    />
    <line
      x1="46"
      y1="44"
      x2="46"
      y2="166"
      stroke="var(--c-text-dim)"
      stroke-width="1"
      stroke-dasharray="5 5"
      opacity="0.35"
    />
    <line
      x1="252"
      y1="44"
      x2="252"
      y2="166"
      stroke="var(--c-text-dim)"
      stroke-width="1"
      stroke-dasharray="5 5"
      opacity="0.35"
    />
    <path
      d="M 46 105 C 72 45 98 45 124 105 C 150 165 176 165 202 105 C 228 45 254 45 280 105"
      fill="none"
      stroke="url(#ac32-cover-wave)"
      stroke-width="3.4"
      stroke-linecap="round"
    />
    <circle cx="149" cy="43" r="4.5" fill="var(--c-accent)" />
    <circle cx="149" cy="167" r="4.5" fill="var(--c-accent-2)" />
    <line x1="46" y1="174" x2="252" y2="174" stroke="var(--c-accent)" stroke-width="1.2" />
    <line x1="46" y1="169" x2="46" y2="179" stroke="var(--c-accent)" stroke-width="1.2" />
    <line x1="252" y1="169" x2="252" y2="179" stroke="var(--c-accent)" stroke-width="1.2" />
    <text
      x="149"
      y="188"
      fill="var(--c-accent)"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="13"
      text-anchor="middle"
    >
      T
    </text>
  </svg>
</template>
