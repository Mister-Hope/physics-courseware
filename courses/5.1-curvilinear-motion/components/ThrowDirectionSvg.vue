<template>
  <!-- 用于第 3 页（引课提问页）：同一个抛出点 O 出发的五种抛出方向（竖直上抛 / 竖直下抛 / 平抛 / 斜上抛 / 斜下抛） -->
  <svg viewBox="0 0 880 470" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ftpBallGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="45%" stop-color="#e2a846" />
        <stop offset="100%" stop-color="#b45309" />
      </radialGradient>
    </defs>

    <!-- 过抛出点 O(150,250) 的水平与竖直基准参考虚线 -->
    <line x1="64" y1="250" x2="816" y2="250" stroke="#94a3b8" stroke-width="1.6" opacity="0.38" stroke-dasharray="6 6" />
    <line x1="150" y1="44" x2="150" y2="444" stroke="#94a3b8" stroke-width="1.4" opacity="0.22" stroke-dasharray="5 6" />

    <!-- 右上角重力方向提示（只受重力 g 作用） -->
    <g opacity="0.88">
      <CourseArrow :from="{ x: 786, y: 54 }" :to="{ x: 786, y: 112 }" stroke="#e2a846" stroke-width="2.6" />
      <text x="802" y="90" font-family="KaTeX_Math, 'Times New Roman', serif" font-style="italic" font-size="22" fill="#e2a846">g</text>
    </g>

    <!-- 1. 斜上抛：严格的对称二次贝塞尔真抛物线（顶点 460,110，两端切线关于 x=460 对称） -->
    <path d="M 150 250 Q 460 -30 770 250" fill="none" stroke="#2dd4bf" stroke-width="3.2" opacity="0.92" stroke-linecap="round" />
    <CourseArrow :from="{ x: 749.2, y: 231.2 }" :to="{ x: 770, y: 250 }" stroke="#2dd4bf" stroke-width="3.2" />

    <!-- 2. 平抛：起点 O 处切线严格水平（控制点 y=250），向下弯曲的真抛物线 -->
    <path d="M 150 250 Q 405 250 660 420" fill="none" stroke="#2dd4bf" stroke-width="3.2" opacity="0.92" stroke-linecap="round" />
    <CourseArrow :from="{ x: 636.7, y: 404.5 }" :to="{ x: 660, y: 420 }" stroke="#2dd4bf" stroke-width="3.2" />

    <!-- 3. 斜下抛：起点沿右下方（切线指向控制点 335,305），受重力持续向下弯曲的真抛物线（消除原版 S 形拐点） -->
    <path d="M 150 250 Q 335 305 520 420" fill="none" stroke="#2dd4bf" stroke-width="3.2" opacity="0.92" stroke-linecap="round" />
    <CourseArrow :from="{ x: 496.2, y: 405.2 }" :to="{ x: 520, y: 420 }" stroke="#2dd4bf" stroke-width="3.2" />

    <!-- 4. 竖直上抛 与 5. 竖直下抛（直线轨迹） -->
    <CourseArrow :from="{ x: 150, y: 250 }" :to="{ x: 150, y: 74 }" stroke="#38bdf8" stroke-width="3.2" />
    <CourseArrow :from="{ x: 150, y: 250 }" :to="{ x: 150, y: 426 }" stroke="#38bdf8" stroke-width="3.2" />

    <!-- 曲线轨迹上的中间频闪小球虚影（增强抛体运动视觉直觉） -->
    <circle cx="460" cy="110" r="5.5" fill="rgba(45,212,191,0.28)" stroke="#2dd4bf" stroke-width="1.6" />
    <circle cx="405" cy="292.5" r="5.5" fill="rgba(45,212,191,0.28)" stroke="#2dd4bf" stroke-width="1.6" />
    <circle cx="335" cy="320" r="5.5" fill="rgba(45,212,191,0.28)" stroke="#2dd4bf" stroke-width="1.6" />

    <!-- 公共抛出点 O -->
    <circle cx="150" cy="250" r="14" fill="rgba(226,168,70,0.18)" />
    <circle cx="150" cy="250" r="8.5" fill="url(#ftpBallGrad)" stroke="#fef08a" stroke-width="1.5" />
    <text
      x="120"
      y="242"
      font-family="KaTeX_Math, 'Times New Roman', serif"
      font-style="italic"
      font-size="24"
      fill="#e2a846"
      stroke="#0f1425"
      stroke-width="3.5"
      paint-order="stroke"
    >
      O
    </text>

    <!-- 五种抛体运动名称标注（带深色描边防遮挡） -->
    <text
      x="168"
      y="86"
      font-family="KaTeX_Main, sans-serif"
      font-size="22"
      font-weight="600"
      fill="#bae6fd"
      stroke="#0f1425"
      stroke-width="3.5"
      paint-order="stroke"
    >
      竖直上抛
    </text>
    <text
      x="168"
      y="426"
      font-family="KaTeX_Main, sans-serif"
      font-size="22"
      font-weight="600"
      fill="#bae6fd"
      stroke="#0f1425"
      stroke-width="3.5"
      paint-order="stroke"
    >
      竖直下抛
    </text>
    <text
      x="460"
      y="90"
      text-anchor="middle"
      font-family="KaTeX_Main, sans-serif"
      font-size="22"
      font-weight="600"
      fill="#e2e8f0"
      stroke="#0f1425"
      stroke-width="3.5"
      paint-order="stroke"
    >
      斜上抛
    </text>
    <text
      x="676"
      y="424"
      font-family="KaTeX_Main, sans-serif"
      font-size="22"
      font-weight="600"
      fill="#e2e8f0"
      stroke="#0f1425"
      stroke-width="3.5"
      paint-order="stroke"
    >
      平抛
    </text>
    <text
      x="534"
      y="424"
      font-family="KaTeX_Main, sans-serif"
      font-size="22"
      font-weight="600"
      fill="#e2e8f0"
      stroke="#0f1425"
      stroke-width="3.5"
      paint-order="stroke"
    >
      斜下抛
    </text>
  </svg>
</template>
