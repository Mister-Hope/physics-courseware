<template>
  <!-- 第 14 页：荡秋千到达右侧最高点——瞬时速度 v = 0，但加速度 a ≠ 0（沿切线指向最低点） -->
  <svg
    viewBox="0 0 420 206"
    style="width: 100%; max-width: 420px; height: auto"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="荡秋千最高点：v = 0，但 a ≠ 0"
  >
    <!-- ================= 1. 秋千龙门支架与地面 ================= -->
    <!-- 地面虚线基座 -->
    <line
      x1="36"
      y1="194"
      x2="368"
      y2="194"
      stroke="rgba(148,163,184,0.22)"
      stroke-width="1.6"
      stroke-linecap="round"
    />

    <!-- 左右斜撑立柱 -->
    <g stroke="rgba(148,163,184,0.38)" stroke-width="6.5" stroke-linecap="round">
      <line x1="92" y1="24" x2="54" y2="194" />
      <line x1="308" y1="24" x2="346" y2="194" />
    </g>
    <!-- 横梁三角加固角铁 -->
    <path
      d="M 90 36 L 106 24 M 310 36 L 294 24"
      stroke="rgba(148,163,184,0.45)"
      stroke-width="3.2"
      stroke-linecap="round"
    />

    <!-- 顶部主横梁 -->
    <line
      x1="82"
      y1="24"
      x2="318"
      y2="24"
      stroke="#94a3b8"
      stroke-width="7.5"
      stroke-linecap="round"
    />
    <!-- 悬点轴承环 -->
    <circle cx="200" cy="24" r="5.5" fill="#1e293b" stroke="#cbd5e1" stroke-width="2.2" />

    <!-- ================= 2. 竖直平衡位置参考线与圆弧轨迹 ================= -->
    <!-- 竖直平衡位置虚线（最低点 x = 200, y = 172） -->
    <line
      x1="200"
      y1="30"
      x2="200"
      y2="176"
      stroke="rgba(148,163,184,0.3)"
      stroke-width="1.4"
      stroke-dasharray="5 5"
    />
    <!-- 最低点空心标记 -->
    <circle
      cx="200"
      cy="172"
      r="3"
      fill="#0f1425"
      stroke="rgba(148,163,184,0.5)"
      stroke-width="1.4"
    />

    <!-- 左侧对称最高点虚影摆线（θ = -35°，端点 115.1, 145.2） -->
    <line
      x1="200"
      y1="24"
      x2="115.1"
      y2="145.2"
      stroke="rgba(148,163,184,0.22)"
      stroke-width="1.3"
      stroke-dasharray="5 5"
    />
    <circle
      cx="115.1"
      cy="145.2"
      r="3"
      fill="none"
      stroke="rgba(148,163,184,0.4)"
      stroke-width="1.3"
    />

    <!-- 摆动圆弧轨迹（半径 R = 148，从左最高点 -35° 经最低点 0° 到右最高点 +35°） -->
    <path
      d="M 115.1 145.2 A 148 148 0 0 0 284.9 145.2"
      fill="none"
      stroke="rgba(148,163,184,0.42)"
      stroke-width="1.8"
      stroke-dasharray="6 4"
    />

    <!-- ================= 3. 秋千与坐在秋千上的人（静止于右侧最高点 θ = 35°） ================= -->
    <!-- 局部坐标系：原点在悬点 (200, 24)，逆时针旋转 35° 后 +y 轴指向右侧最高点座板中心 (284.9, 145.2) -->
    <g transform="translate(200, 24) rotate(-35)">
      <!-- 后侧摆绳（略暗，形成双绳前后层次） -->
      <line x1="0" y1="4" x2="-9" y2="148" stroke="#64748b" stroke-width="1.6" />

      <!-- 坐在秋千上的人（侧视自然坐姿：大腿水平放在座板上、小腿自然垂下、双手前伸抓绳） -->
      <!-- 腿部（大腿 + 小腿 + 鞋子） -->
      <path
        d="M 4 143 L -15 143 L -21 163"
        fill="none"
        stroke="#3b82f6"
        stroke-width="6.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <ellipse cx="-23.5" cy="164.5" rx="4.8" ry="2.6" fill="#cbd5e1" />

      <!-- 躯干（微向后仰靠） -->
      <path
        d="M 4 142 L 8 112"
        fill="none"
        stroke="#60a5fa"
        stroke-width="9.5"
        stroke-linecap="round"
      />

      <!-- 头部 -->
      <circle cx="9.5" cy="99" r="8.5" fill="#93c5fd" />

      <!-- 手臂（向前伸出握住摆绳） -->
      <path
        d="M 7 116 L -2 124 L -6.5 117"
        fill="none"
        stroke="#93c5fd"
        stroke-width="4.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- 前侧摆绳 -->
      <line x1="0" y1="4" x2="9" y2="148" stroke="#cbd5e1" stroke-width="1.9" />
      <!-- 手部握绳节点 -->
      <circle cx="-6.5" cy="117" r="2.6" fill="#e2e8f0" />

      <!-- 秋千木质座板 -->
      <rect
        x="-17"
        y="145.5"
        width="34"
        height="5.5"
        rx="2.75"
        fill="#e2a846"
        stroke="#fef08a"
        stroke-width="0.9"
      />
    </g>

    <!-- 右侧最高点座板中心红金标记点 (284.9, 145.2) -->
    <circle cx="284.9" cy="145.2" r="3.8" fill="#f87171" stroke="#0f1425" stroke-width="1.2" />

    <!-- ================= 4. 最高点物理量标注：v = 0 与切向加速度 a ≠ 0 ================= -->
    <!-- 加速度矢量 a：沿圆弧切线方向（左下 35°：dx = -cos35°, dy = sin35°）指向最低点 -->
    <CourseArrow
      :from="{ x: 284.9, y: 145.2 }"
      :to="{ x: 230.8, y: 183.1 }"
      :head-size="11"
      stroke="#f87171"
      stroke-width="3.4"
    />

    <!-- a ≠ 0 标注（切向箭头下方） -->
    <text x="272" y="191" text-anchor="middle" font-size="19" font-weight="600" fill="#f87171">
      <tspan font-family="KaTeX_Math" font-style="italic">a</tspan>
      <tspan font-family="KaTeX_Main">≠ 0</tspan>
    </text>

    <!-- 最高点标注 + 瞬时速度 v = 0（位于右侧最高点旁） -->
    <text x="314" y="114" font-size="14" font-weight="600" fill="#94a3b8">最高点</text>
    <text x="314" y="138" font-size="20" font-weight="600" fill="#e2a846">
      <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
      <tspan font-family="KaTeX_Main">= 0</tspan>
    </text>
  </svg>
</template>
