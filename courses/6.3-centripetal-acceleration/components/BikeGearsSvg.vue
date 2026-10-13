<!--
  第 6 页「思考与讨论」（教材图 6.3-2）：自行车的大齿轮（A）、小齿轮（B）、后轮（C）。
  大齿轮与小齿轮用链条相连 —— A、B 线速度大小相等；小齿轮与后轮同轴 —— B、C 角速度相等。
  几何：大齿轮圆心 (46,208) r=40，小齿轮/后轮圆心 (254,208)，r=22 / r=150；两轴距 d=208。
  链条画成两圆的「外公切线段」：单位法向 n = ((r大-r小)/d, -√(1-((r大-r小)/d)²))，
  切点 P = 圆心 + r·n（上切线）、P' = 圆心 + r·(n 关于 y=208 的镜像)（下切线），
  故两切线关于水平中心线 y=208 对称、且各与两圆相切。
-->
<template>
  <svg
    viewBox="0 0 412 372"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    style=" display: block;max-width: 30rem; margin: 0 auto"
    role="img"
    aria-label="自行车：后轮最大，大齿轮边缘 A 点、小齿轮边缘 B 点由链条相连（线速度大小相等），小齿轮与后轮同轴，后轮边缘为 C 点"
  >
    <line x1="254" y1="58" x2="254" y2="358" stroke="#60a5fa" stroke-width="1.4" opacity="0.35" />
    <line x1="104" y1="208" x2="404" y2="208" stroke="#60a5fa" stroke-width="1.4" opacity="0.35" />
    <line x1="49.46" y1="168.15" x2="255.90" y2="186.08" stroke="#94a3b8" stroke-width="2.6" stroke-dasharray="10 7" opacity="0.85" />
    <line x1="49.46" y1="247.85" x2="255.90" y2="229.92" stroke="#94a3b8" stroke-width="2.6" stroke-dasharray="10 7" opacity="0.85" />
    <circle cx="254" cy="208" r="150" fill="none" stroke="#60a5fa" stroke-width="3.4" />
    <circle cx="46" cy="208" r="40" fill="none" stroke="#2dd4bf" stroke-width="3.4" />
    <circle cx="254" cy="208" r="22" fill="none" stroke="#2dd4bf" stroke-width="3.4" />
    <circle cx="254" cy="208" r="4.5" fill="#94a3b8" />
    <circle cx="46" cy="208" r="4.5" fill="#94a3b8" />
    <circle cx="46" cy="168" r="8" fill="#e2a846" stroke="#0f1425" stroke-width="1.6" />
    <circle cx="254" cy="186" r="8" fill="#e2a846" stroke="#0f1425" stroke-width="1.6" />
    <circle cx="254" cy="58" r="8" fill="#e2a846" stroke="#0f1425" stroke-width="1.6" />
    <text
      x="46"
      y="142"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="26"
      fill="#e2a846"
      stroke="#0f1425"
      stroke-width="5"
      paint-order="stroke"
    >
      A
    </text>
    <text
      x="254"
      y="160"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="26"
      fill="#e2a846"
      stroke="#0f1425"
      stroke-width="5"
      paint-order="stroke"
    >
      B
    </text>
    <text
      x="254"
      y="34"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="26"
      fill="#e2a846"
      stroke="#0f1425"
      stroke-width="5"
      paint-order="stroke"
    >
      C
    </text>
    <text x="46" y="280" text-anchor="middle" font-family="KaTeX_Main" font-size="19" fill="#5eead4" stroke="#0f1425" stroke-width="4" paint-order="stroke">
      大齿轮
    </text>
    <text x="254" y="264" text-anchor="middle" font-family="KaTeX_Main" font-size="19" fill="#5eead4" stroke="#0f1425" stroke-width="4" paint-order="stroke">
      小齿轮
    </text>
    <text x="384" y="338" text-anchor="middle" font-family="KaTeX_Main" font-size="19" fill="#93c5fd" stroke="#0f1425" stroke-width="4" paint-order="stroke">
      后轮
    </text>
    <text x="178" y="156" text-anchor="middle" font-family="KaTeX_Main" font-size="19" fill="#94a3b8" stroke="#0f1425" stroke-width="4" paint-order="stroke">
      链条
    </text>
  </svg>
</template>
