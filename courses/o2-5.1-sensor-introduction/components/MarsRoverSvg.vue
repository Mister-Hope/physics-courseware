<template>
  <!-- 引课页：祝融号在火星表面巡视，摄像头、天线与避障传感器分别向外发出探测信号 -->
  <svg viewBox="0 0 520 336" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="#94a3b8" opacity="0.5">
      <circle cx="42" cy="42" r="1.5" />
      <circle cx="112" cy="72" r="1" />
      <circle cx="418" cy="46" r="1.5" />
      <circle cx="470" cy="92" r="1" />
      <circle cx="342" cy="30" r="1" />
      <circle cx="498" cy="142" r="1" />
    </g>
    <path d="M 10 290 Q 74 252 138 290" fill="rgba(226,168,70,0.05)" />
    <line x1="10" y1="290" x2="510" y2="290" stroke="rgba(226,168,70,0.5)" stroke-width="2" />
    <SurfaceHatch :from="{ x: 10, y: 290 }" :to="{ x: 510, y: 290 }" side="below" color="rgba(226,168,70,0.32)" :thickness="10" :gap="22" />
    <path d="M 60 290 L 72 274 L 84 290 Z" fill="rgba(148,163,184,0.18)" />
    <path d="M 440 290 L 452 276 L 466 290 Z" fill="rgba(148,163,184,0.14)" />
    <polygon points="185,138 360,90 360,180" fill="rgba(226,168,70,0.06)" />
    <line x1="185" y1="138" x2="360" y2="90" stroke="#e2a846" stroke-width="1.2" stroke-dasharray="5 6" opacity="0.35" />
    <line x1="185" y1="138" x2="360" y2="180" stroke="#e2a846" stroke-width="1.2" stroke-dasharray="5 6" opacity="0.35" />
    <text x="366" y="98" fill="#e2a846" font-size="15">观察</text>
    <g fill="none" stroke="#60a5fa" stroke-linecap="round">
      <path d="M 334.7 192.1 A 26 26 0 0 1 334.7 231.9" stroke-width="1.8" opacity="0.7" />
      <path d="M 343.7 181.4 A 40 40 0 0 1 343.7 242.6" stroke-width="1.5" opacity="0.45" />
      <path d="M 352.7 170.6 A 54 54 0 0 1 352.7 253.4" stroke-width="1.2" opacity="0.25" />
    </g>
    <text x="360" y="258" fill="#60a5fa" font-size="15">感知障碍</text>
    <g stroke="#94a3b8" stroke-width="3" stroke-linecap="round">
      <line x1="160" y1="238" x2="150" y2="258" />
      <line x1="205" y1="240" x2="205" y2="258" />
      <line x1="250" y1="238" x2="260" y2="258" />
    </g>
    <g fill="#0f1725" stroke="#94a3b8" stroke-width="2.4">
      <circle cx="150" cy="260" r="18" />
      <circle cx="205" cy="260" r="18" />
      <circle cx="260" cy="260" r="18" />
    </g>
    <g fill="none" stroke="#e2a846" stroke-width="1.6">
      <circle cx="150" cy="260" r="7" />
      <circle cx="205" cy="260" r="7" />
      <circle cx="260" cy="260" r="7" />
    </g>
    <rect x="128" y="195" width="172" height="45" rx="10" fill="rgba(30,41,59,0.9)" stroke="#e2a846" stroke-width="2.2" />
    <line x1="175" y1="195" x2="175" y2="152" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />
    <rect x="161" y="132" width="28" height="20" rx="5" fill="#1e293b" stroke="#e2a846" stroke-width="1.8" />
    <g fill="#60a5fa">
      <circle cx="169" cy="142" r="3" />
      <circle cx="181" cy="142" r="3" />
    </g>
    <rect x="120" y="176" width="188" height="16" rx="4" fill="rgba(96,165,250,0.22)" stroke="#60a5fa" stroke-width="1.6" />
    <g stroke="#60a5fa" stroke-width="1" opacity="0.6">
      <line x1="157" y1="178" x2="157" y2="190" />
      <line x1="194" y1="178" x2="194" y2="190" />
      <line x1="231" y1="178" x2="231" y2="190" />
      <line x1="268" y1="178" x2="268" y2="190" />
    </g>
    <path d="M 268 172 Q 285 155 302 172" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" stroke-width="2" />
    <line x1="285" y1="172" x2="285" y2="195" stroke="#94a3b8" stroke-width="2" />
    <circle cx="285" cy="172" r="2.6" fill="#60a5fa" />
    <rect x="300" y="205" width="18" height="14" rx="3" fill="#1e293b" stroke="#e2a846" stroke-width="1.5" />
    <text x="230" y="320" text-anchor="middle" fill="#94a3b8" font-size="16">祝融号火星车</text>
  </svg>
</template>
