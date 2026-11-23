<!-- 光疏 / 光密：左 光疏→光密 折射角小于入射角；右 光密→光疏 折射角大于入射角 -->
<template>
  <svg viewBox="0 0 560 280" class="medium-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- 左：空气 → 水 -->
    <rect x="12" y="16" width="256" height="112" fill="#0b1a33" stroke="#1e3a5f" stroke-width="1.2" />
    <rect x="12" y="128" width="256" height="136" fill="#0f2a4a" stroke="#1e3a5f" stroke-width="1.2" />
    <line x1="12" y1="128" x2="268" y2="128" stroke="#93c5fd" stroke-width="1.6" />
    <line x1="140" y1="40" x2="140" y2="252" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="5 6" opacity=".55" />
    <CourseArrow :from="{ x: 76, y: 40 }" :to="{ x: 140, y: 128 }" stroke="#60a5fa" :stroke-width="2" :head-size="8" />
    <CourseArrow :from="{ x: 140, y: 128 }" :to="{ x: 180, y: 238 }" stroke="#e2a846" :stroke-width="2" :head-size="8" />
    <path d="M 140 84 A 44 44 0 0 0 119 111" fill="none" stroke="#60a5fa" stroke-width="1.4" />
    <text x="96" y="96" fill="#60a5fa" font-family="KaTeX_Math" font-style="italic" font-size="18">θ<tspan baseline-shift="sub" font-size="12">1</tspan></text>
    <path d="M 140 172 A 44 44 0 0 0 157 163" fill="none" stroke="#e2a846" stroke-width="1.4" />
    <text x="156" y="194" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="18">
      θ<tspan baseline-shift="sub" font-size="12">2</tspan>
    </text>
    <text x="140" y="34" fill="#cbd5e1" font-size="16" text-anchor="middle">光疏 → 光密</text>
    <text x="236" y="72" fill="#94a3b8" font-size="16">空气</text>
    <text x="236" y="220" fill="#93c5fd" font-size="16">水</text>
    <text x="24" y="252" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="17">
      n<tspan baseline-shift="sub" font-size="11">1</tspan> &lt; n<tspan baseline-shift="sub" font-size="11">2</tspan>
    </text>

    <!-- 右：水 → 空气 -->
    <rect x="292" y="16" width="256" height="112" fill="#0f2a4a" stroke="#1e3a5f" stroke-width="1.2" />
    <rect x="292" y="128" width="256" height="136" fill="#0b1a33" stroke="#1e3a5f" stroke-width="1.2" />
    <line x1="292" y1="128" x2="548" y2="128" stroke="#93c5fd" stroke-width="1.6" />
    <line x1="420" y1="40" x2="420" y2="252" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="5 6" opacity=".55" />
    <CourseArrow :from="{ x: 356, y: 40 }" :to="{ x: 420, y: 128 }" stroke="#60a5fa" :stroke-width="2" :head-size="8" />
    <CourseArrow :from="{ x: 420, y: 128 }" :to="{ x: 506, y: 208 }" stroke="#e2a846" :stroke-width="2" :head-size="8" />
    <path d="M 420 84 A 44 44 0 0 0 399 111" fill="none" stroke="#60a5fa" stroke-width="1.4" />
    <text x="376" y="96" fill="#60a5fa" font-family="KaTeX_Math" font-style="italic" font-size="18">θ<tspan baseline-shift="sub" font-size="12">1</tspan></text>
    <path d="M 420 172 A 44 44 0 0 0 449 155" fill="none" stroke="#e2a846" stroke-width="1.4" />
    <text x="444" y="192" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="18">
      θ<tspan baseline-shift="sub" font-size="12">2</tspan>
    </text>
    <text x="420" y="34" fill="#cbd5e1" font-size="16" text-anchor="middle">光密 → 光疏</text>
    <text x="516" y="72" fill="#93c5fd" font-size="16">水</text>
    <text x="516" y="220" fill="#94a3b8" font-size="16">空气</text>
    <text x="304" y="252" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="17">
      n<tspan baseline-shift="sub" font-size="11">1</tspan> &gt; n<tspan baseline-shift="sub" font-size="11">2</tspan>
    </text>
  </svg>
</template>
