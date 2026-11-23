<template>
  <!-- 封面装饰：左侧是被测量的输入波纹，中间是传感器芯片，右侧是转换后的电信号波形 -->
  <svg viewBox="0 0 340 220" width="330" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="95" cy="110" r="48" fill="none" stroke="#e2a846" stroke-width="1" stroke-dasharray="4 7" opacity="0.28" />
    <g fill="none" stroke="#60a5fa" stroke-linecap="round">
      <path d="M 50 88 A 30 30 0 0 0 50 132" stroke-width="1.6" opacity="0.7" />
      <path d="M 40 80 A 40 40 0 0 0 40 140" stroke-width="1.4" opacity="0.45" />
      <path d="M 30 72 A 50 50 0 0 0 30 148" stroke-width="1.2" opacity="0.25" />
    </g>
    <g stroke="#e2a846" stroke-width="1.5" stroke-linecap="round" opacity="0.85">
      <line x1="52" y1="94" x2="64" y2="94" />
      <line x1="52" y1="110" x2="64" y2="110" />
      <line x1="52" y1="126" x2="64" y2="126" />
      <line x1="126" y1="94" x2="138" y2="94" />
      <line x1="126" y1="110" x2="138" y2="110" />
      <line x1="126" y1="126" x2="138" y2="126" />
      <line x1="79" y1="67" x2="79" y2="79" />
      <line x1="95" y1="67" x2="95" y2="79" />
      <line x1="111" y1="67" x2="111" y2="79" />
      <line x1="79" y1="141" x2="79" y2="153" />
      <line x1="95" y1="141" x2="95" y2="153" />
      <line x1="111" y1="141" x2="111" y2="153" />
    </g>
    <rect x="64" y="79" width="62" height="62" rx="12" fill="rgba(226,168,70,0.08)" stroke="#e2a846" stroke-width="1.8" />
    <rect x="82" y="97" width="26" height="26" rx="6" fill="none" stroke="#e2a846" stroke-width="1.2" opacity="0.8" />
    <line x1="138" y1="110" x2="326" y2="110" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5 6" opacity="0.2" />
    <path
      d="M 138 110 H 166 L 174 84 L 182 136 L 190 98 L 198 122 L 206 110 H 238 L 246 92 L 254 128 L 262 102 L 270 118 L 278 110 H 326"
      fill="none"
      stroke="#e2a846"
      stroke-width="2.2"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <g fill="#e2a846">
      <circle cx="174" cy="84" r="2.4" />
      <circle cx="182" cy="136" r="2.4" />
      <circle cx="246" cy="92" r="2.4" />
      <circle cx="254" cy="128" r="2.4" />
    </g>
    <g fill="#60a5fa" opacity="0.55">
      <circle cx="292" cy="62" r="2" />
      <circle cx="314" cy="152" r="2.6" />
      <circle cx="270" cy="42" r="1.4" />
    </g>
    <g fill="#e2a846" opacity="0.4">
      <circle cx="242" cy="166" r="2" />
      <circle cx="306" cy="186" r="1.5" />
    </g>
  </svg>
</template>
