<template>
  <!-- 第 7 页：正方体顶点着地时重心最高（$\sqrt{3}a/2$） -->
  <svg class="fig" viewBox="0 0 264 292" style="max-width: 11rem" xmlns="http://www.w3.org/2000/svg">
    <!-- 地面平行四边形与斜剖线 -->
    <polygon
      points="147.5,173.5 248.1,228.8 116.5,271.1 15.9,215.8"
      fill="color-mix(in srgb, var(--c-text-dim) 13%, transparent)"
      stroke="var(--c-neutral-500)"
      stroke-width="1.2"
    />
    <g stroke="var(--c-neutral-500)" stroke-width="0.7" opacity="0.35">
      <line x1="155.9" y1="178.1" x2="24.3" y2="220.4" />
      <line x1="136.6" y1="177.0" x2="237.1" y2="232.3" />
      <line x1="169.9" y1="185.8" x2="38.3" y2="228.1" />
      <line x1="118.3" y1="182.9" x2="218.8" y2="238.2" />
      <line x1="183.8" y1="193.5" x2="52.2" y2="235.7" />
      <line x1="100.0" y1="188.7" x2="200.5" y2="244.1" />
      <line x1="197.8" y1="201.1" x2="66.2" y2="243.4" />
      <line x1="81.7" y1="194.6" x2="182.3" y2="250.0" />
      <line x1="211.8" y1="208.8" x2="80.2" y2="251.1" />
      <line x1="63.5" y1="200.5" x2="164.0" y2="255.8" />
      <line x1="225.7" y1="216.5" x2="94.1" y2="258.8" />
      <line x1="45.2" y1="206.4" x2="145.7" y2="261.7" />
      <line x1="239.7" y1="224.2" x2="108.1" y2="266.5" />
      <line x1="26.9" y1="212.2" x2="127.4" y2="267.6" />
    </g>

    <!-- 后方不可见三棱（虚线汇交于后侧隐蔽顶点 (125.0, 156.3)，视角与地面俯视严格一致） -->
    <g stroke="var(--c-neutral-500)" stroke-width="1.3" stroke-dasharray="4 4">
      <line x1="125.0" y1="156.3" x2="132.0" y2="77.7" />
      <line x1="125.0" y1="156.3" x2="64.0" y2="191.8" />
      <line x1="125.0" y1="156.3" x2="193.0" y2="186.8" />
    </g>

    <!-- 三个可见面（上斜顶面、左前侧面、右前侧面，俯视立体角自然协调） -->
    <polygon points="71.0,113.2 132.0,77.7 200.0,108.2 139.0,143.7" fill="color-mix(in srgb, var(--c-velocity) 32%, transparent)" />
    <polygon points="71.0,113.2 139.0,143.7 132.0,222.3 64.0,191.8" fill="rgba(125,211,252,0.2)" />
    <polygon points="139.0,143.7 200.0,108.2 193.0,186.8 132.0,222.3" fill="color-mix(in srgb, var(--c-velocity) 24%, transparent)" />

    <!-- 正方体可见外轮廓与汇交于前侧顶点 (139.0, 143.7) 的三条可见棱 -->
    <polygon
      points="64.0,191.8 71.0,113.2 132.0,77.7 200.0,108.2 193.0,186.8 132.0,222.3"
      fill="none"
      stroke="#7dd3fc"
      stroke-width="2.2"
      stroke-linejoin="round"
    />
    <g stroke="#7dd3fc" stroke-width="2.2" stroke-linecap="round">
      <line x1="139.0" y1="143.7" x2="71.0" y2="113.2" />
      <line x1="139.0" y1="143.7" x2="200.0" y2="108.2" />
      <line x1="139.0" y1="143.7" x2="132.0" y2="222.3" />
    </g>

    <!-- 体对角线上半段（最高顶点到重心：辅助虚线） -->
    <line x1="132" y1="77.7" x2="132" y2="150" stroke="var(--c-force)" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.5" />
    <!-- 重心到地面着地顶点的高度连线（实线） -->
    <line x1="132" y1="150" x2="132" y2="222.3" stroke="var(--c-force)" stroke-width="2.2" stroke-linecap="round" />
    <!-- 地面着地顶点处直角标记 -->
    <path d="M 140.6 219.5 L 140.6 210.5 L 132 213.3" fill="none" stroke="var(--c-force)" stroke-width="1.4" stroke-linejoin="round" />
    <circle cx="132" cy="222.3" r="2.4" fill="var(--c-force)" />
    <!-- 重心红点 -->
    <circle cx="132" cy="150" r="4.6" fill="var(--c-force)" stroke="var(--c-neutral-900)" stroke-width="1.2" />

    <!-- 标准分式标注 (√3 / 2) a（紧靠实线左侧，带标准根号顶横线与分数线） -->
    <g fill="var(--c-force)">
      <!-- 分子：标准根号 √ 与顶横线 + 3 -->
      <path
        d="M 86.5 173.2 L 89.2 171.8 L 92.2 177.8 L 96.4 163.6 L 107.2 163.6"
        fill="none"
        stroke="var(--c-neutral-900)"
        stroke-width="3.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M 86.5 173.2 L 89.2 171.8 L 92.2 177.8 L 96.4 163.6 L 107.2 163.6"
        fill="none"
        stroke="var(--c-force)"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <text
        x="101.8"
        y="177.2"
        font-family="KaTeX_Main"
        font-size="14"
        text-anchor="middle"
        stroke="var(--c-neutral-900)"
        stroke-width="3"
        paint-order="stroke"
      >
        3
      </text>
      <!-- 分数线 -->
      <line x1="85.5" y1="181.5" x2="108.5" y2="181.5" stroke="var(--c-neutral-900)" stroke-width="3.6" stroke-linecap="round" />
      <line x1="85.5" y1="181.5" x2="108.5" y2="181.5" stroke="var(--c-force)" stroke-width="1.5" stroke-linecap="round" />
      <!-- 分母：2 -->
      <text x="97" y="196" font-family="KaTeX_Main" font-size="14.5" text-anchor="middle" stroke="var(--c-neutral-900)" stroke-width="3" paint-order="stroke">
        2
      </text>
      <!-- 右侧乘以边长 a（与分数线居中对齐） -->
      <text
        x="115.5"
        y="186"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="16"
        text-anchor="middle"
        stroke="var(--c-neutral-900)"
        stroke-width="3"
        paint-order="stroke"
      >
        a
      </text>
    </g>
  </svg>
</template>
