<template>
  <!--
    用于第 9 页（物体做曲线运动的条件）：画的是轨迹、速度方向与合力方向的关系。
    物体沿一条向右上方弯曲的轨迹（青色、凹侧朝上）运动，取轨迹中段的 P 点：
    在 P 画出沿切线前进方向的速度 v（蓝）与指向轨迹凹侧的合力 F（金）；
    再用淡色虚线把 v 延长、用一段淡圆弧标出 v 与 F 的夹角，说明轨迹夹在 v 与 F 之间。
    布局（viewBox 700 × 420）：轨迹为三次贝塞尔 M 65 352 C 230 344, 480 312, 648 122；
    取 t = 0.5 的点 P = (355.4, 305.2)，此处切线方向 (0.954, -0.300)、凹侧法向 (-0.300, -0.954)。
  -->
  <svg
    viewBox="0 0 700 420"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="曲线运动：P 点的速度沿切线方向，合力指向轨迹凹的一侧，轨迹夹在 v 与 F 之间"
  >
    <path d="M 65 352 C 230 344, 480 312, 648 122" fill="none" stroke="#2dd4bf" stroke-width="3.4" stroke-linecap="round" opacity="0.92" />
    <CourseArrow :from="{ x: 95.6, y: 350.3 }" :to="{ x: 150.1, y: 345.8 }" stroke="#2dd4bf" stroke-width="3.4" stroke-linecap="round" opacity="0.92" />
    <line x1="355.4" y1="305.2" x2="546.2" y2="245.2" stroke="rgba(148,163,184,0.5)" stroke-width="2" stroke-dasharray="7 5" />
    <path d="M 498.5 260.2 A 150 150 0 0 0 310.4 162.1" fill="none" stroke="rgba(148,163,184,0.35)" stroke-width="2" />
    <CourseArrow :from="{ x: 355.4, y: 305.2 }" :to="{ x: 468, y: 269.9 }" stroke="#60a5fa" stroke-width="3.4" stroke-linecap="round" />
    <CourseArrow :from="{ x: 355.4, y: 305.2 }" :to="{ x: 322, y: 198.4 }" stroke="#e2a846" stroke-width="3.4" stroke-linecap="round" />
    <circle cx="355.4" cy="305.2" r="5.5" fill="#2dd4bf" />
    <text x="406" y="269" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="26" fill="#60a5fa" class="pb-label">v</text>
    <text x="330" y="264" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="26" fill="#e2a846" class="pb-label">F</text>
    <text x="368" y="332" text-anchor="start" font-family="KaTeX_Math" font-style="italic" font-size="26" fill="#2dd4bf" class="pb-label">P</text>
    <text x="438" y="152" text-anchor="middle" font-family="KaTeX_Main" font-size="21" fill="#94a3b8" class="pb-label">
      轨迹夹在
      <tspan font-family="KaTeX_Math" font-style="italic" fill="#60a5fa">v</tspan>
      与
      <tspan font-family="KaTeX_Math" font-style="italic" fill="#e2a846">F</tspan>
      之间
    </text>
    <text x="350" y="400" text-anchor="middle" font-family="KaTeX_Main" font-size="20" fill="#94a3b8" class="pb-label">轨迹向合力所指的一侧弯曲</text>
  </svg>
</template>

<style scoped>
/* 图上文字压在曲线/箭头上时加描边光晕 */
.pb-label {
  paint-order: stroke;
  stroke: #0f1425;
  stroke-width: 3px;
}
</style>
