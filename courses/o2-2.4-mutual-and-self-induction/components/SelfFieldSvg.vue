<!--
  第 7 页示意图：线圈自身电流变化时，穿过它自己的磁场也在变。
  只画线圈、自身磁场与电流方向，不写结论。
  线圈用共享 Solenoid（竖放连续螺旋线，3.5 匝、半径 30）：接线端落在上、下轮廓 (210,93.8) / (210,156.2)。
  绕向取"从下端看逆时针"（direction=ccw）：下端引线箭头向上说明电流自下端流入线圈、在管内由下往上；
  从下端看电流顺时针 → 下端为 S、上端为 N → 管内磁场向上。
  磁感线画成真正的闭合回环：管内竖直向上、从一端绕出、管外竖直向下、另一端绕回（不再画横向扁椭圆）。
-->
<template>
  <svg viewBox="80 40 270 180" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="self-field-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0.4" />
        <stop offset="100%" stop-color="var(--c-accent)" stop-opacity="0" />
      </radialGradient>
    </defs>

    <!-- 管内磁场：柔和光区 -->
    <ellipse cx="210" cy="125" rx="36" ry="52" fill="url(#self-field-glow)" opacity="0.85" />

    <!-- 闭合磁感线：从管内向上穿出，绕到管外向下，再从下端绕回 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.7" stroke-dasharray="10 8" opacity="0.7">
      <path d="M 202 150 V 100 C 202 78, 156 78, 156 125 C 156 172, 202 172, 202 150" />
      <path d="M 218 150 V 100 C 218 78, 264 78, 264 125 C 264 172, 218 172, 218 150" />
      <path d="M 196 152 V 98 C 196 64, 130 64, 130 125 C 130 186, 196 186, 196 152" />
      <path d="M 224 152 V 98 C 224 64, 290 64, 290 125 C 290 186, 224 186, 224 152" />
    </g>

    <!-- 线圈：竖放连续螺旋线；phase 270 + 半整数匝 ⇒ 两端接线点正好落在上、下轮廓上 (210,93.8) / (210,156.2) -->
    <Solenoid
      :x="210"
      :y="125"
      :length="42"
      :radius="30"
      :turns="3.5"
      direction="ccw"
      orientation="vertical"
      :phase="270"
      :line-width="2.8"
      :back-opacity="0.32"
    />

    <!-- 管内磁场方向：竖直向上 -->
    <CourseArrow :from="{ x: 210, y: 150 }" :to="{ x: 210, y: 104 }" stroke="var(--c-accent)" :stroke-width="2.4" opacity="0.9" />

    <!-- 引线：从接线端 (210,93.8) / (210,156.2) 接出 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
      <path d="M 210 93.8 V 48" />
      <path d="M 210 156.2 V 206" />
    </g>
    <!-- 电流方向：画在下引线上，向上流入线圈 -->
    <CourseArrow :from="{ x: 210, y: 196 }" :to="{ x: 210, y: 160 }" stroke="var(--c-accent-2)" :stroke-width="3.4" />
    <text x="224" y="186" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent-2)">I</text>
  </svg>
</template>
