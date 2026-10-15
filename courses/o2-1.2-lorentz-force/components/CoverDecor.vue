<!--
  封面装饰：电子束在磁场中偏转的抽象图（精修版）
  —— 电子束自左侧水平射入磁场区（9个金色实心点均布 3×3 点阵，严谨体现"垂直纸面向外"的匀强磁场）；
     运动轨迹全程采用灰色虚线；单粒子在磁场中向上偏转；青色洛伦兹力 F 用 CourseArrow 垂直指向圆心。
-->
<template>
  <svg
    viewBox="0 0 260 170"
    width="300"
    xmlns="http://www.w3.org/2000/svg"
    class="fig-svg"
    role="img"
    aria-label="电子束在磁场中偏转"
  >
    <defs>
      <!-- 匀强磁场区域半透明柔和底色渐变 -->
      <linearGradient id="ed-b-field" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="color-mix(in srgb, var(--c-accent) 8%, transparent)" />
        <stop offset="100%" stop-color="color-mix(in srgb, var(--c-accent) 3%, transparent)" />
      </linearGradient>

      <!-- 立体球状电子质感径向渐变 -->
      <radialGradient id="ed-electron-3d" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="var(--c-velocity-light)" />
        <stop offset="35%" stop-color="var(--c-velocity)" />
        <stop offset="75%" stop-color="var(--c-accent-2-glow)" />
        <stop offset="100%" stop-color="#1e40af" />
      </radialGradient>

      <!-- 电子微观光晕效果 -->
      <filter id="ed-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- ==================== 1. 匀强磁场区（虚线框 + 均匀 9 个黄色实心点表示垂直纸面向外） ==================== -->
    <!-- 磁场边界虚线圆角框 (x: 104~248, y: 24~160) -->
    <rect
      x="104"
      y="24"
      width="144"
      height="136"
      rx="14"
      fill="url(#ed-b-field)"
      stroke="color-mix(in srgb, var(--c-accent) 38%, transparent)"
      stroke-width="1.6"
      stroke-dasharray="7 6"
    />

    <!-- 磁感应强度 B 标识 (右上角) -->
    <text
      x="236"
      y="42"
      text-anchor="end"
      font-family="KaTeX_Math, serif"
      font-style="italic"
      font-size="14"
      font-weight="700"
      fill="var(--c-accent)"
    >
      B
    </text>

    <!-- 
      严格均布的 3 行 × 3 列实心黄点点阵（无外圈，纯净表达匀强磁场出纸方向）：
      列 X: 136, 176, 216
      行 Y: 50, 92, 134
    -->
    <g fill="var(--c-accent)">
      <!-- 行 1 -->
      <circle cx="136" cy="50" r="3.2" />
      <circle cx="176" cy="50" r="3.2" />
      <circle cx="216" cy="50" r="3.2" />
      <!-- 行 2 -->
      <circle cx="136" cy="92" r="3.2" />
      <circle cx="176" cy="92" r="3.2" />
      <circle cx="216" cy="92" r="3.2" />
      <!-- 行 3 -->
      <circle cx="136" cy="134" r="3.2" />
      <circle cx="176" cy="134" r="3.2" />
      <circle cx="216" cy="134" r="3.2" />
    </g>

    <!-- ==================== 2. 运动轨迹（全程灰色虚线：水平射入 + 向上圆弧偏转） ==================== -->
    <!-- 入射水平灰色虚线段 (x: 10 ~ 104, y = 142) -->
    <line
      x1="10"
      y1="142"
      x2="104"
      y2="142"
      stroke="var(--c-text-dim)"
      stroke-width="2.4"
      stroke-dasharray="6 5"
      stroke-linecap="round"
      opacity="0.85"
    />

    <!-- 磁场区内向上偏转的标准圆弧灰色虚线 (R = 103, 圆心 (104, 39)，在 (104, 142) 处严格水平相切) -->
    <path
      d="M 104 142 A 103 103 0 0 0 200 76"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="2.4"
      stroke-dasharray="6 5"
      stroke-linecap="round"
      opacity="0.85"
    />

    <!-- ==================== 3. 洛伦兹力 F 矢量箭头（CourseArrow） ==================== -->
    <!-- 弧段中点位于 (161, 124)，严格沿法向指向曲率中心 (104, 39)，垂直于瞬时切线速度 -->
    <CourseArrow
      :from="{ x: 161, y: 124 }"
      :to="{ x: 132, y: 81 }"
      stroke="var(--c-physics)"
      :stroke-width="3.4"
    />
    <text
      x="122"
      y="75"
      text-anchor="end"
      font-family="KaTeX_Math, serif"
      font-style="italic"
      font-size="18"
      font-weight="700"
      fill="var(--c-physics)"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      F
    </text>

    <!-- ==================== 4. 磁场中飞行的单电子（立体微球质感 + 高光 + 负电荷「−」） ==================== -->
    <g transform="translate(161, 124)">
      <!-- 柔和微光外晕 -->
      <circle
        cx="0"
        cy="0"
        r="8.5"
        fill="color-mix(in srgb, var(--c-velocity) 30%, transparent)"
        filter="url(#ed-glow)"
      />
      <!-- 球体本体 (带径向立体球状明暗) -->
      <circle
        cx="0"
        cy="0"
        r="6"
        fill="url(#ed-electron-3d)"
        stroke="var(--c-velocity-light)"
        stroke-width="0.9"
      />
      <!-- 球面偏心高光点 -->
      <circle cx="-2" cy="-2" r="1.6" fill="#ffffff" opacity="0.9" />
      <!-- 负电荷「−」符号 -->
      <line
        x1="-2.6"
        y1="0"
        x2="2.6"
        y2="0"
        stroke="#ffffff"
        stroke-width="1.3"
        stroke-linecap="round"
        opacity="0.95"
      />
    </g>
  </svg>
</template>

<style scoped>
.fig-svg {
  display: block;
  margin: 0 auto;
}
</style>
