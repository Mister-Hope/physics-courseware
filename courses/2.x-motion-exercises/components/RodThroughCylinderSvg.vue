<template>
  <!-- 第 2 页：长杆竖直下落穿过圆筒：筒长 L、杆长 l、落差 H 与筒的初速度 v0 -->
  <svg viewBox="0 0 260 350" xmlns="http://www.w3.org/2000/svg">
    <line x1="14" y1="320" x2="248" y2="320" stroke="#64748b" stroke-width="2" />
    <line x1="28" y1="323" x2="38" y2="333" stroke="#64748b" stroke-width="1.2" opacity="0.6" />
    <line x1="88" y1="323" x2="98" y2="333" stroke="#64748b" stroke-width="1.2" opacity="0.6" />
    <line x1="168" y1="323" x2="178" y2="333" stroke="#64748b" stroke-width="1.2" opacity="0.6" />
    <line x1="232" y1="323" x2="242" y2="333" stroke="#64748b" stroke-width="1.2" opacity="0.6" />
    <rect x="22" y="290" width="34" height="30" rx="2" fill="#475569" opacity="0.9" />
    <line x1="18" y1="56" x2="244" y2="56" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5 6" opacity="0.45" />
    <line x1="18" y1="150" x2="244" y2="150" stroke="#94a3b8" stroke-width="1" stroke-dasharray="5 6" opacity="0.45" />
    <line x1="34" y1="56" x2="34" y2="150" stroke="#94a3b8" stroke-width="1.2" opacity="0.7" />
    <line x1="28" y1="56" x2="40" y2="56" stroke="#94a3b8" stroke-width="1.6" opacity="0.85" />
    <line x1="28" y1="150" x2="40" y2="150" stroke="#94a3b8" stroke-width="1.6" opacity="0.85" />
    <text x="20" y="108" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="#e2a846" text-anchor="end">H</text>
    <line x1="80" y1="320" x2="80" y2="168" stroke="#94a3b8" stroke-width="3.2" stroke-linecap="round" />
    <line x1="66" y1="320" x2="94" y2="320" stroke="#94a3b8" stroke-width="3.2" stroke-linecap="round" />
    <line x1="80" y1="168" x2="106" y2="168" stroke="#94a3b8" stroke-width="2.6" stroke-linecap="round" />
    <line x1="106" y1="162" x2="106" y2="174" stroke="#94a3b8" stroke-width="2.6" stroke-linecap="round" />
    <rect x="122" y="56" width="16" height="94" rx="2" fill="#e2a846" opacity="0.9" />
    <text x="144" y="108" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">L</text>
    <line x1="106" y1="150" x2="106" y2="192" stroke="#60a5fa" stroke-width="3" stroke-linecap="round" opacity="0.95" />
    <line x1="154" y1="150" x2="154" y2="192" stroke="#60a5fa" stroke-width="3" stroke-linecap="round" opacity="0.95" />
    <text x="164" y="176" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="#60a5fa">l</text>
    <CourseArrow :from="{ x: 186, y: 188 }" :to="{ x: 186, y: 146 }" stroke="#60a5fa" stroke-width="2.6" />
    <text x="186" y="204" font-size="16" font-family="KaTeX_Math" font-style="italic" fill="#60a5fa" text-anchor="middle">
      v
      <tspan font-size="11" font-family="KaTeX_Main" font-style="normal" dy="3">0</tspan>
    </text>
  </svg>
</template>
