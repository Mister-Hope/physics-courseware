<!-- 封面装饰：两个钢球相碰，左侧标速度 v，右侧标动量 p。 -->
<template>
  <svg
    viewBox="0 0 260 170"
    width="300"
    class="course-fig"
    role="img"
    aria-label="两个钢球碰撞，球旁标出速度和动量箭头"
  >
    <line x1="22" y1="150" x2="238" y2="150" stroke="var(--c-line)" stroke-width="1.2" opacity="0.5" />
    <circle cx="84" cy="118" r="13" fill="#94a3b8" opacity="0.45" />
    <circle cx="172" cy="118" r="12" fill="var(--c-accent)" opacity="0.9" />
    <CourseArrow
      :from="{ x: 38, y: 82 }"
      :to="{ x: 74, y: 82 }"
      stroke="var(--c-velocity)"
      :stroke-width="2.4"
    />
    <CourseArrow
      :from="{ x: 186, y: 82 }"
      :to="{ x: 222, y: 82 }"
      stroke="var(--c-accent)"
      :stroke-width="2.4"
    />
    <text
      x="56"
      y="70"
      fill="var(--c-velocity)"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="16"
    >
      v
    </text>
    <text
      x="204"
      y="70"
      fill="var(--c-accent)"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="16"
    >
      p
    </text>
    <g stroke="var(--c-accent-light)" stroke-width="2" stroke-linecap="round" opacity="0.85">
      <line x1="122" y1="106" x2="116" y2="96" />
      <line x1="130" y1="100" x2="126" y2="88" />
      <line x1="138" y1="106" x2="144" y2="96" />
    </g>
  </svg>
</template>
