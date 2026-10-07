<template>
  <!-- 第 11 页：滑梯斜面与匀速下滑的小孩：重力 G 及其分量 G_x、G_y，支持力 F_N 与摩擦力 F_f -->
  <svg viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg">
    <!-- ==================== 1. 地面接触面与斜剖线 ==================== -->
    <SurfaceHatch :from="{ x: 14, y: 210 }" :to="{ x: 326, y: 210 }" side="below" :thickness="9" :gap="22" color="#64748b" :line-width="2.2" />

    <!-- ==================== 2. 滑梯最高点 (300, 114) 到地面 (300, 210) 的高度虚线 h 与直角垂足 ==================== -->
    <!-- 竖直高度虚线 h -->
    <line x1="300" y1="114" x2="300" y2="210" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="5 4" />
    <!-- 垂足 (300, 210) 处的直角符号 -->
    <polyline points="289,210 289,199 300,199" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linejoin="round" />
    <!-- 高度 h 标注（直接标在高度虚线右侧） -->
    <text x="310" y="168" fill="#cbd5e1" font-family="KaTeX_Math" font-style="italic" font-size="16">h</text>

    <!-- ==================== 3. 具象化滑梯结构（顶部平台小护栏 + 倾斜滑道 l + 底部水平缓冲延伸段） ==================== -->
    <!-- 滑梯板厚度底层（由底部水平段 22,210 → 斜面底端 60,210 → 斜面顶端 300,114 → 顶部小平台 314,114） -->
    <path d="M 22 210 L 60 210 L 300 114 L 314 114 L 314 120.5 L 301.2 120.5 L 61.5 216.4 L 22 216.4 A 3.2 3.2 0 0 1 22 210 Z" fill="#0f1425" />
    <path
      d="M 22 210 L 60 210 L 300 114 L 314 114 L 314 120.5 L 301.2 120.5 L 61.5 216.4 L 22 216.4 A 3.2 3.2 0 0 1 22 210 Z"
      fill="rgba(148,163,184,0.24)"
      stroke="#94a3b8"
      stroke-width="1.6"
      stroke-linejoin="round"
    />
    <!-- 滑梯顶部安全扶手弧栏 -->
    <path
      d="M 294 116.4 L 294 103 A 5 5 0 0 1 299 98 L 311 98 A 4 4 0 0 1 315 102 L 315 114"
      fill="none"
      stroke="#94a3b8"
      stroke-width="2"
      stroke-linecap="round"
    />
    <!-- 滑梯上表面高亮滑道线（水平延伸段 22,210 → 60,210 与主斜面段 60,210 → 300,114） -->
    <polyline points="22,210 60,210 300,114 314,114" fill="none" stroke="#cbd5e1" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
    <!-- 最高点与斜面底端转折点标记 -->
    <circle cx="300" cy="114" r="2.6" fill="#cbd5e1" />
    <circle cx="60" cy="210" r="2.6" fill="#e2a846" />

    <!-- ==================== 4. 倾角 θ 圆弧与几何尺寸 b、l 标注 ==================== -->
    <!-- 倾角 θ 扇形与圆弧（以斜面底端 60, 210 为圆心，r=38） -->
    <path d="M 60 210 L 98 210 A 38 38 0 0 0 95.3 195.9 Z" fill="rgba(226,168,70,0.15)" />
    <path d="M 98 210 A 38 38 0 0 0 95.3 195.9" fill="none" stroke="#e2a846" stroke-width="1.8" stroke-linecap="round" />
    <text x="109" y="205" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="16" text-anchor="middle">θ</text>

    <!-- 水平底边跨度 b（从斜面底端 x=60 到最高点垂足 x=300） -->
    <line x1="60" y1="228" x2="300" y2="228" stroke="#64748b" stroke-width="1.3" stroke-dasharray="5 4" />
    <line x1="60" y1="222" x2="60" y2="234" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="300" y1="222" x2="300" y2="234" stroke="#94a3b8" stroke-width="1.5" />
    <text x="180" y="247" fill="#cbd5e1" font-family="KaTeX_Math" font-style="italic" font-size="16" text-anchor="middle">b</text>

    <!-- 斜面长 l 标注 -->
    <text x="148" y="164" fill="#cbd5e1" font-family="KaTeX_Math" font-style="italic" font-size="16">l</text>

    <!-- ==================== 5. 沿滑梯坐姿下滑的小孩（贴合滑道接触点 240,138，质心恰在 235.2,125.9） ==================== -->
    <g transform="translate(240, 138) rotate(-21.8)" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <!-- 臀部下方滑板坐垫（贴合滑梯上表面 y=0） -->
      <rect x="-12" y="-3" width="19" height="2.4" rx="1.2" fill="rgba(226,168,70,0.35)" stroke="#e2a846" stroke-width="1.2" />
      <!-- 远端内侧腿 -->
      <path d="M 1.5 -4.5 L -9 -9 L -19 -3.5 L -21 -6.5" stroke="#64748b" stroke-width="2.6" />
      <!-- 坐姿微后仰躯干（经过质心 0, -13） -->
      <line x1="1.5" y1="-4.5" x2="4" y2="-20" stroke="#60a5fa" stroke-width="4.2" />
      <!-- 近端前侧腿 -->
      <path d="M 1.5 -4.5 L -7.5 -7.5 L -17.5 -2.2 L -19.8 -5.5" stroke="#e2e8f0" stroke-width="3" />
      <!-- 头部 -->
      <circle cx="5" cy="-26.5" r="5.2" fill="rgba(96,165,250,0.28)" stroke="#60a5fa" stroke-width="2" />
      <!-- 手臂自然扶膝 -->
      <path d="M 3.5 -18.5 L -1.5 -12.5 L -7 -8.2" stroke="#e2e8f0" stroke-width="2.4" />
    </g>

    <!-- ==================== 6. 重力正交分解矩形虚线与各力矢量（共点于质心 235.2, 125.9） ==================== -->
    <!-- 点击 2：三个力；点击 3：重力的正交分解 -->
    <g v-click="3">
      <line x1="211.1" y1="135.5" x2="235.2" y2="195.9" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.65" />
      <line x1="259.3" y1="186.2" x2="235.2" y2="195.9" stroke="#f87171" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.65" />
    </g>

    <g v-click="2">
      <!-- 重力 G（竖直向下，长 70px） -->
      <CourseArrow :from="{ x: 235.2, y: 125.9 }" :to="{ x: 235.2, y: 195.9 }" :head-size="10" stroke="#f87171" stroke-width="3" />
      <!-- 支持力 F_N（垂直滑梯向上，与 G_y 严格等长 65px） -->
      <CourseArrow :from="{ x: 235.2, y: 125.9 }" :to="{ x: 211.1, y: 65.6 }" :head-size="10" stroke="#2dd4bf" stroke-width="3" />
      <!-- 滑动摩擦力 F_f（沿滑梯向上，与 G_x 严格等长 26px） -->
      <CourseArrow :from="{ x: 235.2, y: 125.9 }" :to="{ x: 259.3, y: 116.3 }" :head-size="10" stroke="#c084fc" stroke-width="3" />
    </g>

    <g v-click="3">
      <!-- 重力沿斜面向下分力 G_x -->
      <CourseArrow :from="{ x: 235.2, y: 125.9 }" :to="{ x: 211.1, y: 135.5 }" :head-size="9" stroke="#f87171" stroke-width="2.2" stroke-dasharray="6 4" />
      <!-- 重力垂直斜面向下分力 G_y -->
      <CourseArrow :from="{ x: 235.2, y: 125.9 }" :to="{ x: 259.3, y: 186.2 }" :head-size="9" stroke="#f87171" stroke-width="2.2" stroke-dasharray="6 4" />
    </g>

    <!-- 质心共点圆点与三个力（点击 2 出现） -->
    <g v-click="2">
      <circle cx="235.2" cy="125.9" r="3" fill="#f8fafc" stroke="#0f1425" stroke-width="1.2" />
      <!-- ==================== 7. 力符号标注 ==================== -->
      <text x="238" y="205" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="15">G</text>
      <text x="195" y="62" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
      <text x="204" y="65" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="10">N</text>
      <text x="265" y="114" fill="#c084fc" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
      <text x="274" y="117" fill="#c084fc" font-family="KaTeX_Math" font-style="italic" font-size="10">f</text>
    </g>

    <!-- 重力的两个分力（点击 3 出现） -->
    <g v-click="3">
      <text x="188" y="148" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="14">G</text>
      <text x="198" y="151" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="10">x</text>
      <text x="265" y="192" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="14">G</text>
      <text x="275" y="195" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="10">y</text>
    </g>
  </svg>
</template>
