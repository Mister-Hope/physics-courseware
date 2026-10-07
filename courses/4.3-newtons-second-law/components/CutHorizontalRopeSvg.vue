<template>
  <!-- 第 22 页：模型 3 —— 斜轻绳吊住小球、水平轻绳拉向左侧墙，水平绳在中点被剪断 -->
  <svg viewBox="0 0 380 320" width="100%" style="max-width: 400px" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="30" x2="330" y2="30" stroke="#94a3b8" stroke-width="3" />
    <line x1="70" y1="30" x2="56" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="130" y1="30" x2="116" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="190" y1="30" x2="176" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="250" y1="30" x2="236" y2="16" stroke="#64748b" stroke-width="1.6" />
    <line x1="310" y1="30" x2="296" y2="16" stroke="#64748b" stroke-width="1.6" />
    <SurfaceHatch :from="{ x: 40, y: 30 }" :to="{ x: 40, y: 270 }" side="left" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <line x1="200" y1="30" x2="150" y2="220" stroke="#94a3b8" stroke-width="2.2" />
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
