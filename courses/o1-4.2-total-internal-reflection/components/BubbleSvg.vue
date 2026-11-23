<!-- 引课：水中的气泡。光从水射向气泡（空气）时，一部分光在气泡表面发生全反射，气泡看起来明亮 -->
<template>
  <svg viewBox="0 0 480 300" class="bubble-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bubble-glow" cx=".5" cy=".45" r=".55">
        <stop offset="0" stop-color="#e2a846" stop-opacity=".18" />
        <stop offset="1" stop-color="#e2a846" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect x="10" y="10" width="460" height="280" rx="18" fill="#0b1a33" stroke="#1e3a5f" stroke-width="1.2" />
    <path d="M 28 58 Q 68 50 108 58 T 188 58 T 268 58 T 348 58 T 428 58" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity=".22" />
    <circle cx="250" cy="150" r="80" fill="url(#bubble-glow)" />
    <circle cx="250" cy="150" r="80" fill="#0f1f38" stroke="#93c5fd" stroke-width="2" />
    <circle cx="250" cy="150" r="80" fill="none" stroke="#e2a846" stroke-width="1.2" opacity=".55" />
    <CourseArrow :from="{ x: 64, y: 250 }" :to="{ x: 184, y: 196 }" stroke="#60a5fa" :stroke-width="2" :head-size="8" />
    <CourseArrow :from="{ x: 184, y: 196 }" :to="{ x: 112, y: 262 }" stroke="#e2a846" :stroke-width="2" :head-size="8" />
    <CourseArrow :from="{ x: 58, y: 150 }" :to="{ x: 170, y: 150 }" stroke="#60a5fa" :stroke-width="2" :head-size="8" />
    <CourseArrow :from="{ x: 170, y: 150 }" :to="{ x: 92, y: 176 }" stroke="#e2a846" :stroke-width="2" :head-size="8" />
    <text x="96" y="286" fill="#93c5fd" font-size="16">入射光</text>
    <text x="86" y="118" fill="#e2a846" font-size="16">反射光</text>
    <text x="348" y="76" fill="#93c5fd" font-size="17">水</text>
    <text x="270" y="142" fill="#cbd5e1" font-size="16">气泡</text>
    <text x="270" y="162" fill="#94a3b8" font-size="15">（空气）</text>
    <text x="330" y="238" fill="#e2a846" font-size="16">全反射</text>
    <text x="300" y="262" fill="#e2a846" font-size="15">→ 气泡明亮</text>
  </svg>
</template>
