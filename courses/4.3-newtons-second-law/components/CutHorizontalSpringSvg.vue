<template>
  <!-- 第 23 页：模型 4 —— 斜轻弹簧吊住小球、水平轻绳拉向左侧墙，水平绳在中点被剪断 -->
  <svg viewBox="0 0 380 330" width="100%" style="max-width: 400px" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="30" x2="330" y2="30" stroke="#94a3b8" stroke-width="3" />
    <line x1="70" y1="30" x2="56" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="130" y1="30" x2="116" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="190" y1="30" x2="176" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="250" y1="30" x2="236" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="310" y1="30" x2="296" y2="16" stroke="#64748b" stroke-width="1.6" />
    <SurfaceHatch :from="{ x: 40, y: 30 }" :to="{ x: 40, y: 280 }" side="left" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <path
      d="M 200 30 190,36.6 203.2,49.3 185.4,53.9 198.6,66.6 180.9,71.1 194.1,83.9 176.4,88.4 189.6,101.1 171.8,105.7 185,118.4 167.3,123 180.5,135.7 162.7,140.2 175.9,152.9 158.2,157.5 171.4,170.2 153.6,174.8 166.8,187.5 149.1,192.1 162.3,204.8 144.5,209.3 150,220"
      fill="none"
      stroke="#e2a846"
      stroke-width="2.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <text x="138" y="120" text-anchor="end" font-size="13" fill="#e2a846">弹簧</text>
    <line x1="200" y1="30" x2="200" y2="200" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="7 5" />
    <path d="M 200 100 A 70 70 0 0 1 182.2 97.7" fill="none" stroke="#94a3b8" stroke-width="1.4" />
    <text
      x="189"
      y="110"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="15"
      fill="#94a3b8"
      stroke="#0f1425"
      stroke-width="3"
      paint-order="stroke"
    >
      θ
    </text>
    <line x1="132" y1="220" x2="40" y2="220" stroke="#94a3b8" stroke-width="2.2" />
    <line x1="78" y1="212" x2="94" y2="228" stroke="#f87171" stroke-width="2.6" />
    <line x1="94" y1="212" x2="78" y2="228" stroke="#f87171" stroke-width="2.6" />
    <circle cx="150" cy="220" r="18" fill="rgba(30,41,59,0.85)" stroke="#60a5fa" stroke-width="2.2" />
    <text x="150" y="225" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="#f1f5f9">m</text>
  </svg>
</template>
