<template>
  <!-- 第 11 页 题干图：粗糙斜面上的物块 M 既可能沿斜面向上滑、也可能沿斜面向下滑，两支蓝色速度箭头分别画在物块两侧（上滑、下滑），本页不画任何力 -->
  <svg viewBox="0 0 380 250" width="100%" style="max-width: 420px" xmlns="http://www.w3.org/2000/svg">
    <path d="M 60 210 L 340 210 L 340 60 Z" fill="rgba(148,163,184,0.14)" stroke="rgba(148,163,184,0.5)" stroke-width="1.6" />
    <SurfaceHatch :from="{ x: 52, y: 210 }" :to="{ x: 348, y: 210 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <g transform="translate(60,210) rotate(-28.2)">
      <SurfaceHatch :from="{ x: 0, y: 0 }" :to="{ x: 317, y: 0 }" side="below" color="#64748b" :line-width="1.6" :thickness="7" :gap="20" />
    </g>
    <path d="M 105 210 A 45 45 0 0 0 99.7 188.7" fill="none" stroke="#94a3b8" stroke-width="1.6" />
    <text x="100" y="199" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#e2e8f0" text-anchor="middle">θ</text>
    <g transform="translate(60,210) rotate(-28.2)">
      <rect x="127" y="-34" width="46" height="34" rx="4" fill="rgba(30,41,59,0.85)" stroke="#e2a846" stroke-width="2" />
    </g>
    <text x="188" y="106" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#f1f5f9" text-anchor="middle">M</text>
    <text x="316" y="95" font-size="12" fill="#94a3b8" text-anchor="middle">粗糙</text>
    <CourseArrow :from="{ x: 152, y: 111 }" :to="{ x: 112, y: 133 }" stroke="#60a5fa" :stroke-width="2.8" />
    <text x="126" y="110" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="#60a5fa" text-anchor="middle">v</text>
    <text x="92" y="146" font-size="12" fill="#60a5fa" text-anchor="middle">下滑</text>
    <CourseArrow :from="{ x: 194, y: 88 }" :to="{ x: 235, y: 66 }" stroke="#60a5fa" :stroke-width="2.8" />
    <text x="208" y="66" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="#60a5fa" text-anchor="middle">v</text>
    <text x="256" y="58" font-size="12" fill="#60a5fa" text-anchor="middle">上滑</text>
  </svg>
</template>
