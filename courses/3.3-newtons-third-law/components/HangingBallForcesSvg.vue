<template>
  <!-- 第 10 页：单手倒挂在树枝下的猴子——树枝对猴子的拉力 F 与猴子对树枝的拉力 F′ 是一对作用力与反作用力，猴子所受拉力 F 与重力 G 是一对平衡力 -->
  <svg viewBox="0 0 460 370" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- ==================== 1. 树枝与绿叶点缀 ==================== -->
    <!-- 分叉小枝与叶片 -->
    <path d="M 118 60 Q 96 38 72 36" fill="none" stroke="#64748b" stroke-width="5" stroke-linecap="round" />
    <path d="M 72 36 C 58 28, 52 40, 68 44 Z" fill="#34d399" opacity="0.7" />
    <path d="M 348 64 Q 372 42 396 42" fill="none" stroke="#64748b" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 396 42 C 410 34, 416 46, 400 50 Z" fill="#34d399" opacity="0.7" />
    <!-- 主树干横枝（在 x=230 处中心高度恰为 y=52） -->
    <path d="M 16 74 Q 230 30 444 78" fill="none" stroke="#64748b" stroke-width="14" stroke-linecap="round" />

    <!-- ==================== 2. 单手吊在树枝下的猴子（唯一接触点 230,56；重心 230,252） ==================== -->
    <!-- 竖直共线参考暗线（贯穿单手悬挂点 x=230 与猴子重心 x=230） -->
    <line x1="230" y1="38" x2="230" y2="352" stroke="#cbd5e1" stroke-width="1.3" stroke-dasharray="4 4" opacity="0.32" />

    <!-- 猴子高举的左臂（从左肩 212,226 向上斜伸，单手抓握在树枝正中 x=230, y=56） -->
    <path d="M 212 226 Q 210 142 228 58" fill="none" stroke="#94a3b8" stroke-width="10" stroke-linecap="round" />
    <!-- 树枝上方的单手握持指节（清晰呈现唯一接触点 230, 56） -->
    <ellipse cx="230" cy="48" rx="9" ry="5.5" fill="#cbd5e1" stroke="#0f1425" stroke-width="2" />

    <!-- 猴子自然下垂的右臂（不接触树枝，确保只有单手受力） -->
    <path d="M 248 228 Q 272 246 268 278" fill="none" stroke="#94a3b8" stroke-width="9" stroke-linecap="round" />
    <circle cx="268" cy="280" r="5.5" fill="#cbd5e1" stroke="#0f1425" stroke-width="1.6" />

    <!-- 猴子自然下垂的双腿（分列于中轴线两侧，避开重力 G 箭头） -->
    <path d="M 215 278 Q 206 296 210 312" fill="none" stroke="#94a3b8" stroke-width="8.5" stroke-linecap="round" />
    <path d="M 245 278 Q 254 296 250 312" fill="none" stroke="#94a3b8" stroke-width="8.5" stroke-linecap="round" />

    <!-- 猴子卷曲长尾 -->
    <path d="M 252 268 Q 316 288 302 206" fill="none" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" />

    <!-- 猴子躯干与浅色肚皮（躯干几何中心/重心严格在 230, 252） -->
    <ellipse cx="230" cy="252" rx="26" ry="32" fill="#94a3b8" stroke="#0f1425" stroke-width="2" />
    <ellipse cx="230" cy="252" rx="16" ry="21" fill="#cbd5e1" opacity="0.75" />

    <!-- 猴子双耳与头部（中心 230, 192） -->
    <circle cx="204" cy="184" r="11" fill="#64748b" stroke="#0f1425" stroke-width="2" />
    <circle cx="256" cy="184" r="11" fill="#64748b" stroke="#0f1425" stroke-width="2" />
    <circle cx="230" cy="192" r="27" fill="#94a3b8" stroke="#0f1425" stroke-width="2" />
    <circle cx="221" cy="186" r="3.6" fill="#0f1425" />
    <circle cx="239" cy="186" r="3.6" fill="#0f1425" />
    <ellipse cx="230" cy="203" rx="12" ry="8" fill="#cbd5e1" />

    <!-- ==================== 3. 严格共线（x = 230）且等大（长均为 76px）的三个力 ==================== -->
    <!-- ① 猴子对树枝的拉力 F′：作用于树枝接触点 (230, 56)，竖直向下至 (230, 132)（长 76px） -->
    <CourseArrow :from="{ x: 230, y: 56 }" :to="{ x: 230, y: 132 }" stroke="#f87171" stroke-width="3.6" />
    <text x="248" y="104" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="25" stroke="#0f1425" stroke-width="3" paint-order="stroke">
      F'
    </text>

    <!-- ② 树枝对猴子的拉力 F：作用于猴子重心 (230, 252)，竖直向上至 (230, 176)（长 76px） -->
    <CourseArrow :from="{ x: 230, y: 252 }" :to="{ x: 230, y: 176 }" stroke="#60a5fa" stroke-width="3.6" />
    <text
      x="212"
      y="206"
      fill="#60a5fa"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="25"
      text-anchor="end"
      stroke="#0f1425"
      stroke-width="3"
      paint-order="stroke"
    >
      F
    </text>

    <!-- ③ 猴子受到的重力 G：作用于猴子重心 (230, 252)，竖直向下至 (230, 328)（长 76px） -->
    <CourseArrow :from="{ x: 230, y: 252 }" :to="{ x: 230, y: 328 }" stroke="#e2a846" stroke-width="3.6" />
    <text
      x="212"
      y="318"
      fill="#e2a846"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="25"
      text-anchor="end"
      stroke="#0f1425"
      stroke-width="3"
      paint-order="stroke"
    >
      G
    </text>

    <!-- 树枝接触作用点 (230, 56) 与猴子重心作用点 (230, 252) -->
    <circle cx="230" cy="56" r="4" fill="#f87171" stroke="#0f1425" stroke-width="1.5" />
    <circle cx="230" cy="252" r="4" fill="#e2a846" stroke="#0f1425" stroke-width="1.5" />
  </svg>
</template>
