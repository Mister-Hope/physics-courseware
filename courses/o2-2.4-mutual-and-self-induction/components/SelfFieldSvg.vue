<!--
  第 7 页示意图：线圈自身电流变化时，穿过它自己的磁场也在变。
  只画线圈、自身磁场与电流方向，不写结论。
  线圈用共享 Solenoid（竖放连续螺旋线，3.5 匝、半径 30）：接线端落在上、下轮廓 (210,93.8) / (210,156.2)。
  绕向取"从下端看逆时针"（direction=ccw）：下端引线箭头向上说明电流自下端流入线圈、在管内由下往上；
  从下端看电流顺时针 → 下端为 S、上端为 N → 管内磁场向上，正好与图中磁感线的绕向（管外自上而下）一致。
-->
<template>
  <svg viewBox="85 40 265 175" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 线圈自身的磁场：从线圈内部穿过，从两侧绕回 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.7" stroke-dasharray="12 9" class="field-flow" opacity="0.75">
      <path d="M 178 102 C 142 102, 142 140, 178 140" />
      <path d="M 178 92 C 116 92, 116 150, 178 150" />
      <path d="M 242 102 C 278 102, 278 140, 242 140" />
      <path d="M 242 92 C 304 92, 304 150, 242 150" />
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
