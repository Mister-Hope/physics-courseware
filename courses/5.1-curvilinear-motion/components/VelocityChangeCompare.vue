<!--
  用于第 17 页（曲线运动是变速运动）：物体沿弯曲轨迹运动、速率始终不变，
  取两个时刻的速度 v₁、v₂（长度都是 100、方向不同），点击后补出速度的变化量 Δv。
  几何：轨迹取半径 200 的一段圆弧（圆心角 90°），P₁ = (169,159)、P₂ = (451,159) 都在弧上，
  两处切线互相垂直，所以 Δv = v₂ − v₁ 不为零（|Δv| = 2 × 100 × sin45° ≈ 141）。
  Δv 的作图用平行四边形表示：把 v₁ 平移到 P₂（虚线箭头）、再把"起点→起点""终点→终点"连起来（虚线边），
  从平移后的 v₁ 末端指向 v₂ 末端的那条边就是 Δv。
-->
<template>
  <svg
    viewBox="0 0 620 420"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="曲线运动：两个时刻的速度矢量长度相同、方向不同，用平行四边形作出速度的变化量"
  >
    <path
      d="M 169 159 A 200 200 0 0 1 451 159"
      fill="none"
      stroke="#2dd4bf"
      stroke-width="3.4"
      stroke-linecap="round"
    />
    <CourseArrow
      :from="{ x: 169, y: 159 }"
      :to="{ x: 240, y: 88.5 }"
      stroke="#60a5fa"
      :stroke-width="3.4"
    />
    <CourseArrow
      :from="{ x: 451, y: 159 }"
      :to="{ x: 522, y: 229.5 }"
      stroke="#60a5fa"
      :stroke-width="3.4"
    />
    <g v-click="1">
      <line
        x1="169"
        y1="159"
        x2="451"
        y2="159"
        stroke="#94a3b8"
        stroke-width="2.2"
        stroke-dasharray="7 6"
        opacity="0.65"
      />
      <line
        x1="240"
        y1="88.5"
        x2="522"
        y2="88.5"
        stroke="#94a3b8"
        stroke-width="2.2"
        stroke-dasharray="7 6"
        opacity="0.65"
      />
      <CourseArrow
        :from="{ x: 451, y: 159 }"
        :to="{ x: 522, y: 88.5 }"
        stroke="#94a3b8"
        :stroke-width="2.6"
        stroke-dasharray="7 5"
      />
      <CourseArrow
        :from="{ x: 522, y: 88.5 }"
        :to="{ x: 522, y: 229.5 }"
        stroke="#e2a846"
        :stroke-width="3.4"
      />
      <text
        x="536"
        y="166"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="28"
        fill="#e2a846"
        stroke="#0f1425"
        stroke-width="5"
        paint-order="stroke"
      >
        Δv
      </text>
    </g>
    <circle cx="169" cy="159" r="4" fill="#f1f5f9" />
    <circle cx="451" cy="159" r="4" fill="#f1f5f9" />
    <text
      x="196"
      y="112"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="28"
      fill="#60a5fa"
      text-anchor="middle"
      stroke="#0f1425"
      stroke-width="5"
      paint-order="stroke"
    >
      v
      <tspan font-family="KaTeX_Main" font-style="normal" font-size="18" dy="6">1</tspan>
    </text>
    <text
      x="506"
      y="258"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="28"
      fill="#60a5fa"
      text-anchor="middle"
      stroke="#0f1425"
      stroke-width="5"
      paint-order="stroke"
    >
      v
      <tspan font-family="KaTeX_Main" font-style="normal" font-size="18" dy="6">2</tspan>
    </text>
    <text
      x="310"
      y="398"
      font-family="KaTeX_Main"
      font-size="22"
      fill="#94a3b8"
      text-anchor="middle"
    >
      速率没变，速度也变了 —— Δv 不为零
    </text>
  </svg>
</template>
