<template>
  <!-- 第 14 页：高铁以约 300 km/h 匀速飞驰——速度很大但 a = 0（复兴号流线型车头 + 受电弓电火花 + 轨枕飞驰） -->
  <svg viewBox="0 0 420 206" style="width: 100%; max-width: 420px; height: auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="hsr-rail-clip">
        <rect x="16" y="130" width="388" height="26" />
      </clipPath>
      <clipPath id="hsr-body-clip">
        <path d="M 52 54 L 248 54 C 288 54 316 64 342 84 C 362 99 384 108 394 115 C 397 117 397 121 392 122 L 52 122 Z" />
      </clipPath>
      <!-- 复兴号银白金属车身渐变 -->
      <linearGradient id="hsr-body-grad" x1="0" y1="54" x2="0" y2="122" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#f1f5f9" stop-opacity="0.96" />
        <stop offset="52%" stop-color="#cbd5e1" stop-opacity="0.92" />
        <stop offset="84%" stop-color="#94a3b8" stop-opacity="0.88" />
        <stop offset="100%" stop-color="#475569" stop-opacity="0.92" />
      </linearGradient>
      <!-- 金色腰线与飞龙流线彩带渐变 -->
      <linearGradient id="hsr-gold-stripe" x1="52" y1="0" x2="386" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#d97706" stop-opacity="0.85" />
        <stop offset="55%" stop-color="#f59e0b" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#fbbf24" stop-opacity="1" />
      </linearGradient>
      <!-- 车窗深色墨晶渐变 -->
      <linearGradient id="hsr-window-grad" x1="0" y1="68" x2="0" y2="96" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="65%" stop-color="#1e293b" />
        <stop offset="100%" stop-color="#334155" />
      </linearGradient>
      <!-- 前照灯光束渐变 -->
      <linearGradient id="hsr-headlight-beam" x1="378" y1="112" x2="420" y2="112" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#fef08a" stop-opacity="0.7" />
        <stop offset="100%" stop-color="#fef08a" stop-opacity="0" />
      </linearGradient>
      <!-- 轨道两端渐隐遮罩 -->
      <linearGradient id="hsr-track-fade" x1="12" y1="0" x2="408" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.08" />
        <stop offset="10%" stop-color="#94a3b8" stop-opacity="0.65" />
        <stop offset="90%" stop-color="#94a3b8" stop-opacity="0.65" />
        <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.08" />
      </linearGradient>
    </defs>

    <!-- ================= 1. 高压接触网系统 (Overhead Catenary) ================= -->
    <!-- 承力索（上悬链线）与吊弦 -->
    <path d="M 14 11 Q 112 20 210 12 Q 308 20 406 11" fill="none" stroke="rgba(148,163,184,0.28)" stroke-width="1.3" />
    <g stroke="rgba(148,163,184,0.22)" stroke-width="1">
      <line x1="62" y1="15" x2="62" y2="22" />
      <line x1="112" y1="18" x2="112" y2="22" />
      <line x1="162" y1="15" x2="162" y2="22" />
      <line x1="210" y1="12" x2="210" y2="22" />
      <line x1="260" y1="15" x2="260" y2="22" />
      <line x1="308" y1="18" x2="308" y2="22" />
      <line x1="358" y1="15" x2="358" y2="22" />
    </g>
    <!-- 接触线（主导线 y = 22） -->
    <line x1="14" y1="22" x2="406" y2="22" stroke="rgba(203,213,225,0.52)" stroke-width="2" />

    <!-- 单臂折叠受电弓（位于车顶后上方 x ≈ 190，向左折臂贴合接触网） -->
    <g>
      <!-- 车顶绝缘子底座 -->
      <rect x="178" y="50" width="24" height="4.5" rx="2" fill="#475569" stroke="#94a3b8" stroke-width="1" />
      <!-- 下臂杆 + 上臂杆（单臂 Z 字折叠） -->
      <polyline points="190,50 172,35 194,23.5" fill="none" stroke="#cbd5e1" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 阻尼拉杆 -->
      <line x1="184" y1="50" x2="176" y2="36" stroke="#64748b" stroke-width="1.4" />
      <!-- 碳滑板弓头 -->
      <path d="M 183 25 L 187 22.5 L 201 22.5 L 205 25" fill="none" stroke="#e2e8f0" stroke-width="2.4" stroke-linecap="round" />
      <!-- 弓网接触点微光与电弧星芒 -->
      <circle cx="194" cy="22" r="4.5" fill="rgba(56,189,248,0.28)" />
      <circle cx="194" cy="22" r="2" fill="#e0f2fe" />
    </g>

    <!-- ================= 2. 尾部气流线与左端车厢连接速度感 ================= -->
    <g stroke="#60a5fa" stroke-linecap="round" opacity="0.55">
      <line x1="10" y1="64" x2="44" y2="64" stroke-width="1.8" stroke-dasharray="10 6" />
      <line x1="4" y1="84" x2="42" y2="84" stroke-width="2.2" stroke-dasharray="14 7" />
      <line x1="14" y1="104" x2="44" y2="104" stroke-width="1.8" stroke-dasharray="8 6" />
    </g>

    <!-- ================= 3. 转向架与车轮系统 (Bogies & Wheels) ================= -->
    <!-- 后转向架 (x = 76 ~ 148) -->
    <g>
      <rect x="76" y="119" width="72" height="10" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1.2" />
      <!-- 前后两组钢轮（底部精准落在上轨面 y = 136） -->
      <circle cx="94" cy="128.5" r="7.5" fill="#334155" stroke="#94a3b8" stroke-width="1.8" />
      <circle cx="94" cy="128.5" r="2.6" fill="#cbd5e1" />
      <circle cx="130" cy="128.5" r="7.5" fill="#334155" stroke="#94a3b8" stroke-width="1.8" />
      <circle cx="130" cy="128.5" r="2.6" fill="#cbd5e1" />
      <!-- 二系悬挂减振横梁 -->
      <rect x="103" y="122" width="18" height="5" rx="1.5" fill="#475569" />
    </g>

    <!-- 前转向架 (x = 248 ~ 320) -->
    <g>
      <rect x="248" y="119" width="72" height="10" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1.2" />
      <circle cx="266" cy="128.5" r="7.5" fill="#334155" stroke="#94a3b8" stroke-width="1.8" />
      <circle cx="266" cy="128.5" r="2.6" fill="#cbd5e1" />
      <circle cx="302" cy="128.5" r="7.5" fill="#334155" stroke="#94a3b8" stroke-width="1.8" />
      <circle cx="302" cy="128.5" r="2.6" fill="#cbd5e1" />
      <rect x="275" y="122" width="18" height="5" rx="1.5" fill="#475569" />
    </g>

    <!-- ================= 4. 复兴号流线型车体 (Bullet Train Body) ================= -->
    <g clip-path="url(#hsr-body-clip)">
      <!-- 银白金属主车体 -->
      <rect x="50" y="52" width="350" height="72" fill="url(#hsr-body-grad)" />

      <!-- 车顶深灰空气动力学导流涂装 -->
      <path d="M 50 54 L 270 54 C 296 54 316 59 332 68 L 50 61 Z" fill="#475569" opacity="0.65" />

      <!-- 底部深色整流裙板 (Skirt) -->
      <rect x="50" y="112" width="350" height="12" fill="#1e293b" opacity="0.9" />
      <!-- 转向架处裙板弧形切口阴影 -->
      <rect x="72" y="113" width="80" height="10" rx="4" fill="#0f172a" />
      <rect x="244" y="113" width="80" height="10" rx="4" fill="#0f172a" />

      <!-- 复兴号标志性金橙色流线飞龙彩带：从车头鼻锥发散向后延伸为腰线 -->
      <path d="M 50 103 L 288 103 C 322 103 348 108 394 117 L 394 113 C 350 103 324 98 288 98 L 50 98 Z" fill="url(#hsr-gold-stripe)" />
      <!-- 车头上部副流线金带 -->
      <path d="M 246 54 C 282 56 318 70 356 96 L 347 98 C 312 74 278 60 236 56 Z" fill="url(#hsr-gold-stripe)" opacity="0.9" />

      <!-- 车厢左侧风挡连接槽与客室门 -->
      <line x1="58" y1="54" x2="58" y2="112" stroke="#334155" stroke-width="2" />
      <rect x="65" y="65" width="18" height="45" rx="2.5" fill="rgba(15,23,42,0.18)" stroke="#64748b" stroke-width="1.2" />
      <rect x="69" y="71" width="10" height="18" rx="2" fill="url(#hsr-window-grad)" stroke="#94a3b8" stroke-width="0.9" />

      <!-- 连续黑晶乘客窗带 + 独立圆角车窗 -->
      <rect x="92" y="69" width="178" height="22" rx="11" fill="url(#hsr-window-grad)" stroke="#475569" stroke-width="1.2" />
      <!-- 车窗内独立亮面玻璃窗格 -->
      <g fill="rgba(148,163,184,0.16)" stroke="rgba(203,213,225,0.28)" stroke-width="0.8">
        <rect x="102" y="72.5" width="32" height="15" rx="3.5" />
        <rect x="142" y="72.5" width="32" height="15" rx="3.5" />
        <rect x="182" y="72.5" width="32" height="15" rx="3.5" />
        <rect x="222" y="72.5" width="32" height="15" rx="3.5" />
      </g>
      <!-- 玻璃斜向反光条 -->
      <g stroke="rgba(255,255,255,0.22)" stroke-width="1.4" stroke-linecap="round">
        <line x1="110" y1="85" x2="120" y2="75" />
        <line x1="150" y1="85" x2="160" y2="75" />
        <line x1="190" y1="85" x2="200" y2="75" />
        <line x1="230" y1="85" x2="240" y2="75" />
      </g>

      <!-- 驾驶室全景前风挡玻璃 (Cockpit Windshield) -->
      <path
        d="M 284 68 L 316 70 C 334 79 348 89 358 97 L 316 95 C 296 94 284 85 284 68 Z"
        fill="url(#hsr-window-grad)"
        stroke="#64748b"
        stroke-width="1.2"
        stroke-linejoin="round"
      />
      <!-- 驾驶室玻璃高光 -->
      <path d="M 292 72 L 314 73.5 C 326 80 336 87 343 92.5 L 335 92.5 C 326 85 314 78 292 75 Z" fill="rgba(186,230,253,0.25)" />

      <!-- LED 鹰眼大灯 -->
      <path d="M 366 104 L 385 111 L 374 114 L 362 108 Z" fill="#fef08a" stroke="#f59e0b" stroke-width="1" />
    </g>

    <!-- 车体外轮廓高亮描边（右侧鸭嘴兽流线鼻锥 + 左侧平整车厢连接面） -->
    <path
      d="M 52 54 L 248 54 C 288 54 316 64 342 84 C 362 99 384 108 394 115 C 397 117 397 121 392 122 L 52 122 Z"
      fill="none"
      stroke="#cbd5e1"
      stroke-width="1.8"
      stroke-linejoin="round"
    />

    <!-- 前照灯刺破空气光束 -->
    <polygon points="382,109 418,102 418,120 382,114" fill="url(#hsr-headlight-beam)" />

    <!-- ================= 5. 高速铁轨与动态飞驰轨枕 (Track & Scrolling Sleepers) ================= -->
    <!-- 道砟路基阴影 -->
    <rect x="16" y="136" width="388" height="16" rx="2" fill="rgba(30,41,59,0.55)" />

    <!-- 飞驰滚动的混凝土轨枕（保留类名 .hsr-rails 以兼容原有 CSS 动画，同时内置 SVG animateTransform 保证独立滚动） -->
    <g class="hsr-rails" clip-path="url(#hsr-rail-clip)">
      <g stroke="rgba(148,163,184,0.42)" stroke-width="4.5" stroke-linecap="butt">
        <line x1="-2" y1="137" x2="-2" y2="151" />
        <line x1="34" y1="137" x2="34" y2="151" />
        <line x1="70" y1="137" x2="70" y2="151" />
        <line x1="106" y1="137" x2="106" y2="151" />
        <line x1="142" y1="137" x2="142" y2="151" />
        <line x1="178" y1="137" x2="178" y2="151" />
        <line x1="214" y1="137" x2="214" y2="151" />
        <line x1="250" y1="137" x2="250" y2="151" />
        <line x1="286" y1="137" x2="286" y2="151" />
        <line x1="322" y1="137" x2="322" y2="151" />
        <line x1="358" y1="137" x2="358" y2="151" />
        <line x1="394" y1="137" x2="394" y2="151" />
        <line x1="430" y1="137" x2="430" y2="151" />
        <animateTransform attributeName="transform" type="translate" from="0 0" to="-36 0" dur="0.28s" repeatCount="indefinite" />
      </g>
    </g>

    <!-- 上下两条钢轨高光面 -->
    <line x1="14" y1="136.5" x2="406" y2="136.5" stroke="url(#hsr-track-fade)" stroke-width="2.4" stroke-linecap="round" />
    <line x1="14" y1="150.5" x2="406" y2="150.5" stroke="url(#hsr-track-fade)" stroke-width="2.8" stroke-linecap="round" />

    <!-- ================= 6. 物理量标注：a = 0 与 v ≈ 300 km/h ================= -->
    <!-- 车顶上方：加速度 a = 0（匀速直线运动） -->
    <text x="115" y="43" text-anchor="middle" font-size="19" font-weight="600" fill="#e2a846">
      <tspan font-family="KaTeX_Math" font-style="italic">a</tspan>
      <tspan font-family="KaTeX_Main">= 0</tspan>
    </text>

    <!-- 轨道下方：高速向右的 v 矢量箭头与数值换算 -->
    <g>
      <line x1="96" y1="173" x2="294" y2="173" stroke="#e2a846" stroke-width="3.4" stroke-linecap="round" />
      <path d="M 304 173 L 290 166.5 L 290 179.5 Z" fill="#e2a846" />
      <text x="200" y="197" text-anchor="middle" font-size="15.5" font-weight="600" fill="#e2a846">
        <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
        <tspan font-family="KaTeX_Main">≈ 300 km/h ≈ 83 m/s</tspan>
      </text>
    </g>
  </svg>
</template>
