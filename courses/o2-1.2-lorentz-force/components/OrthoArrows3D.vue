<!--
  三维正交示意图（洛伦兹力定义页）
  —— 表示 F_洛 与 v、B 两两垂直：v 水平、F 竖直都在"纸面"内，B 用斜向短箭头表示"垂直纸面穿出"。
  画法约定（旧版踩过的坑）：B **只画一条斜向（透视）箭头**，不再在同一张图里同时放 ⊙ 记号——
  两种约定混用会让学生误以为 B 既在纸面内又垂直纸面。附图注一行点明哪个量穿出纸面。
  意图：为左手定则做铺垫——F 垂直于由 v 与 B 决定的平面。
  待细化方向：换成可旋转的 3D 场景、加正交直角标记动画。
-->
<template>
  <svg viewBox="0 0 460 340" xmlns="http://www.w3.org/2000/svg" class="w-full">
    <!-- 公共作用点 -->
    <circle cx="150" cy="268" r="5" fill="#e2e8f0" />

    <!-- F_洛：竖直向上（teal） -->
    <CourseArrow
      :from="{ x: 150, y: 268 }"
      :to="{ x: 150, y: 78 }"
      stroke="#2dd4bf"
      stroke-width="6"
    />
    <!-- v：水平向右（蓝） -->
    <CourseArrow
      :from="{ x: 150, y: 268 }"
      :to="{ x: 412, y: 268 }"
      stroke="#60a5fa"
      stroke-width="6"
    />
    <!-- B：斜向左下 = 垂直纸面穿出（金，透视缩短） -->
    <CourseArrow
      :from="{ x: 150, y: 268 }"
      :to="{ x: 46, y: 150 }"
      stroke="#e2a846"
      stroke-width="6"
    />

    <!-- 直角标记：v ⊥ F（纸面内） -->
    <path
      d="M 164 268 L 164 254 L 150 254"
      fill="none"
      stroke="rgba(241,245,249,0.4)"
      stroke-width="1.8"
    />
    <!-- 直角标记：B 与纸面的垂直关系（小弧，示意斜向） -->
    <path
      d="M 130 250 A 34 34 0 0 0 118 240"
      fill="none"
      stroke="rgba(226,168,70,0.6)"
      stroke-width="1.8"
    />

    <!-- 标注 -->
    <text x="128" y="66" text-anchor="end" font-size="27" fill="#2dd4bf">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan dy="5" font-size="15">洛</tspan>
    </text>
    <text
      x="426"
      y="278"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="27"
      fill="#60a5fa"
    >
      v
    </text>
    <text
      x="30"
      y="140"
      text-anchor="end"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="27"
      fill="#e2a846"
    >
      B
    </text>

    <!-- 一行说明：点明哪个量在纸面内、哪个穿出纸面 -->
    <text x="230" y="322" text-anchor="middle" font-size="18" fill="#94a3b8">
      v 与
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan dy="4" font-size="12">洛</tspan>
      <tspan dy="-4">在纸面内，</tspan>
      <tspan font-family="KaTeX_Math" font-style="italic">B</tspan>
      垂直纸面穿出
    </text>
  </svg>
</template>
