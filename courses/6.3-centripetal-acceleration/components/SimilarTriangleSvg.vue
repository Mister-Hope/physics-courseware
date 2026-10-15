<!--
  第 4 页：用相似三角形求向心加速度的大小。
  左：几何三角形 OAB —— OA = OB = r、弦 AB、圆心角 θ（虚线圆是物体做圆周运动的轨迹，O 是圆心）。
  右：速度三角形 —— 从共同起点作出平移来的 v_A（虚线）与 v_B，Δv 由 v_A 的箭头端指向 v_B 的箭头端；
      两条腰都是 v、顶角也是 θ。
  两个等腰三角形顶角相等 ⇒ 相似 ⇒ Δv / v = AB / r（结论不写在图上，留给课堂提问）。
  （对应边同色：腰 OA / OB ↔ v_A / v_B 用蓝 #60a5fa，底边 AB ↔ Δv 用金 #e2a846）
  几何由 node 脚本算过并核对：两图关于 x = 317.5 左右对称、大小相同、三角形外接框竖向中线对齐；
  全部标注（按墨迹框）与线段 / 圆弧 / 圆、以及标注彼此之间都不相交。
-->
<template>
  <svg
    viewBox="0 0 635 308"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    style="display: block; max-width: 46rem; margin: 0 auto"
    role="img"
    aria-label="几何三角形 OAB 与速度三角形相似，得到 Δv 比 v 等于 AB 比 r"
  >
    <circle cx="147.3" cy="143.3" r="112" fill="none" stroke="var(--c-physics)" stroke-width="2.4" stroke-dasharray="8 7" opacity="0.5" />
    <line x1="147.3" y1="143.3" x2="42" y2="104.9" stroke="var(--c-velocity)" stroke-width="3" />
    <line x1="147.3" y1="143.3" x2="108.9" y2="38" stroke="var(--c-velocity)" stroke-width="3" />
    <line x1="42" y1="104.9" x2="108.9" y2="38" stroke="var(--c-accent)" stroke-width="3" stroke-dasharray="8 6" />
    <path d="M 111.5 130.3 A 38 38 0 0 1 134.3 107.6" fill="none" stroke="var(--c-accent-light)" stroke-width="2.4" />
    <circle cx="42" cy="104.9" r="6" fill="var(--c-text)" />
    <circle cx="108.9" cy="38" r="6" fill="var(--c-text)" />
    <text x="135.3" y="173.3" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="var(--c-text-dim)">O</text>
    <text x="31" y="112.9" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="var(--c-text)">A</text>
    <text x="97.9" y="31" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="var(--c-text)">B</text>
    <text
      x="87.8"
      y="142.9"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="26"
      fill="var(--c-velocity)"
      stroke="var(--c-bg-soft)"
      stroke-width="5"
      paint-order="stroke"
    >
      r
    </text>
    <text
      x="56.4"
      y="52.4"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="24"
      fill="var(--c-accent)"
      stroke="var(--c-bg-soft)"
      stroke-width="5"
      paint-order="stroke"
    >
      AB
    </text>
    <text
      x="107.7"
      y="103.7"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="24"
      fill="var(--c-accent-light)"
      stroke="var(--c-bg-soft)"
      stroke-width="5"
      paint-order="stroke"
    >
      θ
    </text>
    <CourseArrow :from="{ x: 477.3, y: 143.3 }" :to="{ x: 515.6, y: 38 }" stroke="var(--c-velocity)" :stroke-width="3" stroke-dasharray="8 6" />
    <CourseArrow :from="{ x: 477.3, y: 143.3 }" :to="{ x: 582.5, y: 104.9 }" stroke="var(--c-velocity)" :stroke-width="3" />
    <CourseArrow :from="{ x: 515.6, y: 38 }" :to="{ x: 582.5, y: 104.9 }" stroke="var(--c-accent)" :stroke-width="3.4" />
    <path d="M 490.3 107.6 A 38 38 0 0 1 512.9 130.3" fill="none" stroke="var(--c-accent-light)" stroke-width="2.4" />
    <text
      x="505.6"
      y="33"
      text-anchor="end"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="24"
      fill="var(--c-velocity)"
      stroke="var(--c-bg-soft)"
      stroke-width="5"
      paint-order="stroke"
    >
      v
      <tspan font-family="KaTeX_Main" font-style="normal" font-size="16" dy="6">A</tspan>
    </text>
    <text
      x="593.5"
      y="108.9"
      text-anchor="start"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="24"
      fill="var(--c-velocity)"
      stroke="var(--c-bg-soft)"
      stroke-width="5"
      paint-order="stroke"
    >
      v
      <tspan font-family="KaTeX_Main" font-style="normal" font-size="16" dy="6">B</tspan>
    </text>
    <text
      x="569.5"
      y="51"
      text-anchor="start"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="24"
      fill="var(--c-accent)"
      stroke="var(--c-bg-soft)"
      stroke-width="5"
      paint-order="stroke"
    >
      Δv
    </text>
    <text
      x="516.9"
      y="103.7"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="24"
      fill="var(--c-accent-light)"
      stroke="var(--c-bg-soft)"
      stroke-width="5"
      paint-order="stroke"
    >
      θ
    </text>
    <text x="317.5" y="287.3" text-anchor="middle" font-family="KaTeX_Main" font-size="22" fill="var(--c-text-dim)">左：位置三角形　　右：速度三角形</text>
  </svg>
</template>
