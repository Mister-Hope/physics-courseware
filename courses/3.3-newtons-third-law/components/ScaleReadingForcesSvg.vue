<template>
  <!-- 第 9 页：物体静止在台秤上——重力 G、秤面对物体的支持力 F_N、物体对秤面的压力 F_N′ -->
  <svg viewBox="0 0 460 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- ==================== 1. 水平桌面与斜剖线（y = 325） ==================== -->
    <SurfaceHatch :from="{ x: 50, y: 325 }" :to="{ x: 410, y: 325 }" side="below" :thickness="12" :gap="28" color="#64748b" :line-width="2.4" />

    <!-- ==================== 2. 具象化指针式台秤（秤盘 + 传力立柱 + 梯形机身 + 刻度表盘 + 底座垫脚） ==================== -->
    <g stroke-linecap="round" stroke-linejoin="round">
      <!-- 台秤底部橡胶支脚（贴合桌面 y=325） -->
      <rect x="148" y="317" width="24" height="6.5" rx="2" fill="#334155" stroke="#64748b" stroke-width="1.5" />
      <rect x="288" y="317" width="24" height="6.5" rx="2" fill="#334155" stroke="#64748b" stroke-width="1.5" />

      <!-- 台秤底座宽边 -->
      <rect x="132" y="307" width="196" height="10" rx="4" fill="rgba(51,65,85,0.65)" stroke="#94a3b8" stroke-width="2.2" />

      <!-- 梯形台秤主壳体（上窄下宽：上沿 x=156..304, y=212；下沿 x=140..320, y=307） -->
      <path
        d="M 162 212 L 298 212 A 6 6 0 0 1 304 217 L 318 307 L 142 307 L 156 217 A 6 6 0 0 1 162 212 Z"
        fill="rgba(30,41,59,0.75)"
        stroke="#94a3b8"
        stroke-width="2.4"
      />

      <!-- 秤盘下方传力支座颈部（y: 196..212） -->
      <path d="M 196 196 L 264 196 L 256 212 L 204 212 Z" fill="rgba(71,85,105,0.55)" stroke="#94a3b8" stroke-width="2" />

      <!-- 金属弧边托盘（秤面 y=190，两端微翘护边，承托上方物块） -->
      <path
        d="M 142 184 Q 147 190 156 190 L 304 190 Q 313 190 318 184 L 315 196 L 145 196 Z"
        fill="rgba(148,163,184,0.28)"
        stroke="#cbd5e1"
        stroke-width="2.4"
      />

      <!-- 圆形刻度表盘（圆心 230, 262，半径 r=39） -->
      <circle cx="230" cy="262" r="39" fill="#0f1425" stroke="#94a3b8" stroke-width="2.4" />
      <circle cx="230" cy="262" r="34" fill="none" stroke="rgba(148,163,184,0.28)" stroke-width="1" />

      <!-- 表盘上半圈均匀刻度线 -->
      <g stroke="#94a3b8" stroke-width="1.6">
        <line x1="196.2" y1="242.5" x2="201.4" y2="245.5" />
        <line x1="210.5" y1="228.2" x2="213.5" y2="233.4" />
        <line x1="230" y1="223" x2="230" y2="229" />
        <line x1="249.5" y1="228.2" x2="246.5" y2="233.4" />
        <line x1="263.8" y1="242.5" x2="258.6" y2="245.5" />
        <line x1="191.5" y1="262" x2="197" y2="262" />
        <line x1="268.5" y1="262" x2="263" y2="262" />
      </g>

      <!-- 表盘偏转读数指针（受压后顺时针偏转指向右上刻度，避开中轴线） -->
      <line x1="230" y1="262" x2="254" y2="239" stroke="#38bdf8" stroke-width="2.4" />
    </g>

    <!-- ==================== 3. 静止在秤面上的物块（居中于 x=230，重心恰在 230, 145） ==================== -->
    <!-- 物块下外沿 186.5 + 1.5 = 188，与秤面 y=190 留出清晰分界不重叠 -->
    <rect x="176" y="104" width="108" height="82.5" rx="10" fill="rgba(226,168,70,0.16)" stroke="#e2a846" stroke-width="3" />

    <!-- ==================== 4. 严格共线（x = 230）且等大（长均为 82px）的三个力 ==================== -->
    <!-- ① 秤面对物体的支持力 F_N：从物块重心 (230, 145) 竖直向上至 (230, 63) -->
    <CourseArrow :from="{ x: 230, y: 145 }" :to="{ x: 230, y: 63 }" stroke="#60a5fa" stroke-width="3.6" />
    <text x="246" y="82" fill="#60a5fa" font-family="KaTeX_Math" font-style="italic" font-size="20" stroke="#0f1425" stroke-width="3" paint-order="stroke">
      F
      <tspan font-size="14" dy="5">N</tspan>
    </text>

    <!-- ③ 物体对秤面的压力 F_N′：从秤面接触中心 (230, 190) 竖直向下至 (230, 272) -->
    <CourseArrow :from="{ x: 230, y: 190 }" :to="{ x: 230, y: 272 }" stroke="#f87171" stroke-width="3.6" />
    <text x="246" y="274" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="20" stroke="#0f1425" stroke-width="3" paint-order="stroke">
      F
      <tspan font-size="14" dy="5">N</tspan>
      <tspan dy="-5">'</tspan>
    </text>

    <!-- ② 物体的重力 G：从物块几何中心/重心 (230, 145) 竖直向下至 (230, 227)（绘于上层并带深色描边光晕，与 F_N′ 箭头清晰错开 45px） -->
    <CourseArrow :from="{ x: 230, y: 145 }" :to="{ x: 230, y: 227 }" stroke="#e2a846" stroke-width="3.6" />
    <text
      x="212"
      y="224"
      fill="#e2a846"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="20"
      text-anchor="end"
      stroke="#0f1425"
      stroke-width="3"
      paint-order="stroke"
    >
      G
    </text>

    <!-- 物块重心作用点 (230, 145) 与秤面接触作用点 (230, 190) -->
    <circle cx="230" cy="145" r="4" fill="#e2a846" stroke="#0f1425" stroke-width="1.5" />
    <circle cx="230" cy="190" r="4" fill="#f87171" stroke="#0f1425" stroke-width="1.5" />
  </svg>
</template>
