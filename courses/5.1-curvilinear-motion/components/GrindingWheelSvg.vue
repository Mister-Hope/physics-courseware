<template>
  <!-- 用于第 16 页：砂轮打磨刀具（中式菜刀），接触点 T 处飞出的炽热微粒沿切线方向（斜向左上）飞出 -->
  <svg viewBox="0 0 620 420" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 砂轮磨砂盘体径向渐变 -->
      <radialGradient id="gwsWheelGrad" cx="46%" cy="44%" r="56%">
        <stop offset="0%" stop-color="rgba(148,163,184,0.28)" />
        <stop offset="68%" stop-color="rgba(100,116,139,0.22)" />
        <stop offset="88%" stop-color="rgba(71,85,105,0.34)" />
        <stop offset="100%" stop-color="rgba(51,65,85,0.48)" />
      </radialGradient>

      <!-- 中心法兰盘金属渐变 -->
      <radialGradient id="gwsFlangeGrad" cx="38%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#94a3b8" />
        <stop offset="55%" stop-color="#475569" />
        <stop offset="100%" stop-color="#1e293b" />
      </radialGradient>

      <!-- 中式菜刀宽刀面拉丝不锈钢渐变（沿刀面法向由刀背向刃口过渡） -->
      <linearGradient id="gwsCleaverBody" x1="380" y1="88" x2="336" y2="132" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#64748b" />
        <stop offset="45%" stop-color="#94a3b8" />
        <stop offset="82%" stop-color="#cbd5e1" />
        <stop offset="100%" stop-color="#e2e8f0" />
      </linearGradient>

      <!-- 菜刀雪亮开刃刃口高光渐变 -->
      <linearGradient id="gwsCleaverEdge" x1="306" y1="91" x2="375" y2="160" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#f8fafc" />
        <stop offset="50%" stop-color="#ffffff" />
        <stop offset="100%" stop-color="#cbd5e1" />
      </linearGradient>

      <!-- 菜刀木质刀柄渐变 -->
      <linearGradient id="gwsHandleGrad" x1="413" y1="137" x2="399" y2="152" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#d97706" />
        <stop offset="50%" stop-color="#b45309" />
        <stop offset="100%" stop-color="#78350f" />
      </linearGradient>

      <!-- 接触点 T 炽热火花光晕 -->
      <radialGradient id="gwsSparkGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(254,240,138,0.95)" />
        <stop offset="42%" stop-color="rgba(245,158,11,0.55)" />
        <stop offset="100%" stop-color="rgba(245,158,11,0)" />
      </radialGradient>
    </defs>

    <!-- 砂轮主体：圆心 O(230,230)、半径 R=150 -->
    <circle cx="230" cy="230" r="150" fill="url(#gwsWheelGrad)" stroke="#94a3b8" stroke-width="3" />
    <!-- 砂轮外圈粗磨砂环带与高速旋转流线纹理 -->
    <circle cx="230" cy="230" r="138" fill="none" stroke="rgba(148,163,184,0.22)" stroke-width="1.4" stroke-dasharray="10 8" />
    <path d="M 122 184 A 118 118 0 0 1 196 117" fill="none" stroke="rgba(203,213,225,0.22)" stroke-width="2" stroke-linecap="round" />
    <path d="M 140 306 A 118 118 0 0 0 288 332" fill="none" stroke="rgba(203,213,225,0.22)" stroke-width="2" stroke-linecap="round" />
    <path
      d="M 155 155 A 106 106 0 0 0 142 288"
      fill="none"
      stroke="rgba(148,163,184,0.18)"
      stroke-width="1.6"
      stroke-dasharray="18 14"
      stroke-linecap="round"
    />

    <!-- 砂轮中心夹紧法兰盘与主轴孔 O -->
    <circle cx="230" cy="230" r="52" fill="url(#gwsFlangeGrad)" stroke="#94a3b8" stroke-width="2" opacity="0.88" />
    <circle cx="230" cy="230" r="38" fill="none" stroke="rgba(226,232,240,0.3)" stroke-width="1.2" stroke-dasharray="6 6" />
    <circle cx="230" cy="230" r="20" fill="#0f172a" stroke="#cbd5e1" stroke-width="2.4" />
    <circle cx="230" cy="230" r="5" fill="#94a3b8" />
    <text x="208" y="258" font-family="KaTeX_Math, 'Times New Roman', serif" font-style="italic" font-size="21" fill="#cbd5e1">O</text>

    <!-- 圆心 O(230,230) 到接触点 T(336,124) 的半径（淡虚线），与切线在 T 处垂直 -->
    <line x1="230" y1="230" x2="336" y2="124" stroke="#cbd5e1" stroke-width="2" opacity="0.5" stroke-dasharray="6 6" />

    <!-- T 处的直角标记：切线 ⊥ 半径 -->
    <path d="M 324.7 135.3 L 313.4 124.0 L 324.7 112.7" fill="rgba(148,163,184,0.12)" stroke="#cbd5e1" stroke-width="1.8" opacity="0.85" />

    <!-- 过 T(336,124) 的几何切线（沿斜向左上 -1,-1 方向） -->
    <line x1="208" y1="-4" x2="454" y2="242" stroke="#94a3b8" stroke-width="2" opacity="0.58" stroke-dasharray="8 6" />

    <!-- 中式菜刀：刃口沿 T 点切线斜向左上延伸，宽刀身朝右上方展开，后接金属刀箍与双铆钉木柄 -->
    <g>
      <!-- 木质菜刀柄（自刀尾向右下方延伸，带防滑弧度与两颗铜铆钉） -->
      <path
        d="M 398.9 151.6 L 413.1 137.5 L 457.5 177.8 A 9 9 0 0 1 457.8 190.8 L 449.2 199.4 A 9 9 0 0 1 436.2 199.1 Z"
        fill="url(#gwsHandleGrad)"
        stroke="#fbbf24"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <!-- 刀柄铆钉 -->
      <circle cx="420.5" cy="159.8" r="2.6" fill="#fde68a" stroke="#78350f" stroke-width="1" />
      <circle cx="438.2" cy="177.5" r="2.6" fill="#fde68a" stroke="#78350f" stroke-width="1" />

      <!-- 不锈钢刀箍（连接刀身与木柄） -->
      <polygon points="389.8,143.8 405.3,128.3 413.8,136.8 398.2,152.3" fill="#64748b" stroke="#e2e8f0" stroke-width="1.5" stroke-linejoin="round" />

      <!-- 菜刀宽阔刀身（刃口微弧贴合 T=336,124 切线，斜向左上延伸至刀头 306.7,91.1） -->
      <path
        d="M 306.7 91.1 Q 336 124 374.2 159.4 L 411.0 122.6 L 344.5 56.1 Q 325.0 72.8 306.7 91.1 Z"
        fill="url(#gwsCleaverBody)"
        stroke="#e2e8f0"
        stroke-width="2.2"
        stroke-linejoin="round"
      />

      <!-- 菜刀刃口雪亮开刃带（斜向左上，贴合切线打磨） -->
      <path d="M 306.7 91.1 Q 336 124 374.2 159.4 L 380.6 153.0 Q 342.4 117.6 313.1 84.7 Z" fill="url(#gwsCleaverEdge)" opacity="0.92" />
      <!-- 开刃分界高光细线 -->
      <path d="M 313.1 84.7 Q 342.4 117.6 380.6 153.0" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.75" />

      <!-- 菜刀加厚刀背高光线（右上方长边） -->
      <line x1="344.5" y1="56.1" x2="411.0" y2="122.6" stroke="#f8fafc" stroke-width="2.8" stroke-linecap="round" />

      <!-- 菜刀刀头经典挂孔 -->
      <circle cx="344.5" cy="73.1" r="5.2" fill="#0f1425" stroke="#cbd5e1" stroke-width="1.6" />
    </g>

    <!-- 炽热微粒束：自接触点 T(336,124) 沿刃口/切线方向（斜向左上）飞出 -->
    <g>
      <!-- 外层热辐射光晕 -->
      <line x1="336" y1="124" x2="230" y2="18" stroke="rgba(245,158,11,0.22)" stroke-width="11" stroke-linecap="round" />
      <!-- 沿切线主方向飞出的核心亮流线 -->
      <line x1="336" y1="124" x2="230" y2="18" stroke="#fbbf24" stroke-width="3.2" stroke-linecap="round" />
      <!-- 平行于切线的多条炽热微粒轨迹（位于切线与砂轮外缘一侧，不穿入菜刀刀面） -->
      <line x1="332" y1="128" x2="244" y2="40" stroke="#f59e0b" stroke-width="2.6" opacity="0.92" stroke-linecap="round" />
      <line x1="327" y1="133" x2="262" y2="68" stroke="#ea580c" stroke-width="2.4" opacity="0.88" stroke-linecap="round" />
      <line x1="338" y1="122" x2="254" y2="38" stroke="#fef08a" stroke-width="2.4" opacity="0.9" stroke-linecap="round" />
      <line x1="322" y1="138" x2="276" y2="92" stroke="#f59e0b" stroke-width="2" opacity="0.82" stroke-linecap="round" />

      <!-- 飞溅的炽热火星颗粒 -->
      <circle cx="276" cy="92" r="3" fill="#fbbf24" />
      <circle cx="262" cy="68" r="3.4" fill="#fef08a" stroke="#f59e0b" stroke-width="1.2" />
      <circle cx="254" cy="38" r="4.2" fill="#fef08a" stroke="#f59e0b" stroke-width="1.4" />
      <circle cx="244" cy="40" r="3.5" fill="#f59e0b" />
      <circle cx="230" cy="18" r="4" fill="#fef08a" stroke="#ea580c" stroke-width="1.4" />
      <circle cx="218" cy="12" r="2.5" fill="#f59e0b" />
      <circle cx="233" cy="34" r="2.3" fill="#fbbf24" />

      <!-- 沿切线飞出的速度方向指示箭头 -->
      <CourseArrow :from="{ x: 296, y: 84 }" :to="{ x: 224, y: 12 }" stroke="#fbbf24" stroke-width="3" />
    </g>

    <!-- 接触点 T 炽热白炽核 -->
    <circle cx="336" cy="124" r="15" fill="url(#gwsSparkGlow)" />
    <circle cx="336" cy="124" r="5.5" fill="#fef08a" stroke="#f59e0b" stroke-width="2" />

    <!-- 砂轮转动方向：外圈逆时针圆弧 R=172 + 末端贴合切向箭头 -->
    <path d="M 196.4 398.7 A 172 172 0 0 0 381.8 311.2" fill="none" stroke="#2dd4bf" stroke-width="3.2" stroke-linecap="round" />
    <CourseArrow :from="{ x: 378.5, y: 317.4 }" :to="{ x: 386.6, y: 301.2 }" stroke="#2dd4bf" stroke-width="3.2" />

    <!-- 文字标注 -->
    <text
      x="402"
      y="308"
      font-family="KaTeX_Main, sans-serif"
      font-size="24"
      font-weight="600"
      fill="#2dd4bf"
      stroke="#0f1425"
      stroke-width="3.5"
      paint-order="stroke"
    >
      转动方向
    </text>
    <text
      x="426"
      y="94"
      text-anchor="start"
      font-family="KaTeX_Main, sans-serif"
      font-size="24"
      font-weight="600"
      fill="#e2e8f0"
      stroke="#0f1425"
      stroke-width="3.5"
      paint-order="stroke"
    >
      刀具
    </text>
    <text
      x="456"
      y="234"
      text-anchor="start"
      font-family="KaTeX_Main, sans-serif"
      font-size="23"
      fill="#94a3b8"
      stroke="#0f1425"
      stroke-width="3.5"
      paint-order="stroke"
    >
      切线
    </text>
    <text
      x="292"
      y="36"
      text-anchor="start"
      font-family="KaTeX_Main, sans-serif"
      font-size="24"
      font-weight="600"
      fill="#fbbf24"
      stroke="#0f1425"
      stroke-width="4"
      paint-order="stroke"
    >
      微粒沿切线方向飞出
    </text>
    <text
      x="346"
      y="156"
      text-anchor="middle"
      font-family="KaTeX_Math, 'Times New Roman', serif"
      font-style="italic"
      font-size="24"
      fill="#fbbf24"
      stroke="#0f1425"
      stroke-width="3.5"
      paint-order="stroke"
    >
      T
    </text>
  </svg>
</template>
