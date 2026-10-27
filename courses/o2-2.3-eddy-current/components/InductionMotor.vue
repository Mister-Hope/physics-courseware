<!--
  交流感应电动机（第 19 页）：三相绕组接三相电源，在空间中产生旋转磁场；
  转子是闭合导体，磁场相对它转动时其中产生感应电流，安培力推动转子跟着转。
  三个定子绕组用共享 Solenoid（连续螺旋线，竖向绕在极靴上），不要画成"矩形 + 几条横线"。
-->
<template>
  <svg
    class="fig-svg"
    viewBox="0 0 620 400"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="交流感应电动机的原理"
  >
    <g v-for="a in [0, 120, 240]" :key="a" :transform="`rotate(${a} 310 200)`">
      <rect
        x="278"
        y="36"
        width="64"
        height="56"
        rx="7"
        fill="rgb(148 163 184 / 12%)"
        stroke="var(--c-text-dim)"
        stroke-width="2"
      />
      <!-- 定子绕组：连续螺旋线绕在极靴上 -->
      <Solenoid
        :x="310"
        :y="64"
        :length="40"
        :radius="24"
        :turns="3"
        orientation="vertical"
        :line-width="2.2"
        :back-opacity="0.28"
      />
    </g>
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="8 7">
      <circle cx="310" cy="200" r="106" />
    </g>
    <!-- 旋转磁场的方向：圆上右侧顺时针（向下）走的箭头 -->
    <CourseArrow
      :from="{ x: 416, y: 186 }"
      :to="{ x: 416, y: 214 }"
      stroke="var(--c-accent)"
      stroke-width="2.6"
    />
    <text x="446" y="102" font-size="19" fill="var(--c-accent)">旋转磁场</text>
    <circle
      cx="310"
      cy="200"
      r="58"
      fill="rgb(148 163 184 / 10%)"
      stroke="var(--c-neutral-300)"
      stroke-width="3"
    />
    <g stroke="var(--c-neutral-300)" stroke-width="5" stroke-linecap="round">
      <line x1="310" y1="148" x2="310" y2="252" />
      <line x1="258" y1="200" x2="362" y2="200" />
    </g>
    <circle cx="310" cy="200" r="12" fill="var(--c-neutral-300)" />
    <text x="310" y="288" text-anchor="middle" font-size="19" fill="var(--c-text-dim)">转子</text>
  </svg>
</template>
