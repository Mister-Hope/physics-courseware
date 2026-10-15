<template>
  <!-- 第 14 页：高铁以约 300 km/h 匀速飞驰——速度很大但 a = 0（左侧半截第 2 节车厢 + 风挡连接 + 复兴号流线型头车 + 受电弓 + 轨枕飞驰） -->
  <svg viewBox="0 0 420 206" style="width: 100%; max-width: 420px; height: auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="hsr-rail-clip">
        <rect x="16" y="130" width="388" height="26" />
      </clipPath>
      <!-- 整列动车组剪裁区：左侧从 x=14 起（包含左侧半截第 2 节车厢 + 中间风挡 + 右侧头车） -->
      <clipPath id="hsr-train-clip">
        <path d="M 14 54 L 256 54 C 294 54 322 64 348 84 C 366 99 386 108 396 115 C 399 117 399 121 394 122 L 14 122 Z" />
      </clipPath>
      <!-- 复兴号银白金属车身垂直渐变 -->
      <linearGradient id="hsr-body-grad" x1="0" y1="54" x2="0" y2="122" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="var(--c-text)" stop-opacity="0.96" />
        <stop offset="52%" stop-color="var(--c-neutral-300)" stop-opacity="0.92" />
        <stop offset="84%" stop-color="var(--c-text-dim)" stop-opacity="0.88" />
        <stop offset="100%" stop-color="var(--c-neutral-600)" stop-opacity="0.92" />
      </linearGradient>
      <!-- 左侧截断处水平渐隐遮罩（让左端半截车厢自然向画面外延伸） -->
      <linearGradient id="hsr-left-fade" x1="14" y1="0" x2="54" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="var(--c-bg-soft)" stop-opacity="0.72" />
        <stop offset="100%" stop-color="var(--c-bg-soft)" stop-opacity="0" />
      </linearGradient>
      <!-- 金色腰线与飞龙流线彩带渐变 -->
      <linearGradient id="hsr-gold-stripe" x1="14" y1="0" x2="390" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#d97706" stop-opacity="0.85" />
        <stop offset="55%" stop-color="var(--c-accent-glow)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--c-accent-light)" stop-opacity="1" />
      </linearGradient>
      <!-- 车窗深色墨晶渐变 -->
      <linearGradient id="hsr-window-grad" x1="0" y1="68" x2="0" y2="96" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="var(--c-neutral-900)" />
        <stop offset="65%" stop-color="var(--c-surface-solid)" />
        <stop offset="100%" stop-color="var(--c-neutral-700)" />
      </linearGradient>
      <!-- 前照灯光束渐变 -->
      <linearGradient id="hsr-headlight-beam" x1="382" y1="112" x2="420" y2="112" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#fef08a" stop-opacity="0.7" />
        <stop offset="100%" stop-color="#fef08a" stop-opacity="0" />
      </linearGradient>
      <!-- 轨道两端渐隐遮罩 -->
      <linearGradient id="hsr-track-fade" x1="12" y1="0" x2="408" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="var(--c-text-dim)" stop-opacity="0.08" />
        <stop offset="10%" stop-color="var(--c-text-dim)" stop-opacity="0.65" />
        <stop offset="90%" stop-color="var(--c-text-dim)" stop-opacity="0.65" />
        <stop offset="100%" stop-color="var(--c-text-dim)" stop-opacity="0.08" />
      </linearGradient>
    </defs>
    <!-- ================= 1. 高压接触网系统 (Overhead Catenary) ================= -->
    <!-- 承力索（上悬链线）与吊弦 -->
    <path d="M 14 11 Q 112 20 210 12 Q 308 20 406 11" fill="none" stroke="color-mix(in srgb, var(--c-text-dim) 28%, transparent)" stroke-width="1.3" />
    <g stroke="color-mix(in srgb, var(--c-text-dim) 22%, transparent)" stroke-width="1">
      <line x1="62" y1="15" x2="62" y2="22" />
      <line x1="112" y1="18" x2="112" y2="22" />
      <line x1="162" y1="15" x2="162" y2="22" />
      <line x1="210" y1="12" x2="210" y2="22" />
      <line x1="260" y1="15" x2="260" y2="22" />
      <line x1="308" y1="18" x2="308" y2="22" />
      <line x1="358" y1="15" x2="358" y2="22" />
    </g>
    <!-- 接触线（主导线 y = 22） -->
    <line x1="14" y1="22" x2="406" y2="22" stroke="color-mix(in srgb, var(--c-neutral-300) 52%, transparent)" stroke-width="2" />
    <!-- 单臂折叠受电弓（位于头车后上方 x ≈ 208，向左折臂贴合接触网） -->
    <g>
      <rect x="196" y="50" width="24" height="4.5" rx="2" fill="var(--c-neutral-600)" stroke="var(--c-text-dim)" stroke-width="1" />
      <polyline points="208,50 190,35 212,23.5" fill="none" stroke="var(--c-neutral-300)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="202" y1="50" x2="194" y2="36" stroke="var(--c-neutral-500)" stroke-width="1.4" />
      <path d="M 201 25 L 205 22.5 L 219 22.5 L 223 25" fill="none" stroke="var(--c-neutral-200)" stroke-width="2.4" stroke-linecap="round" />
      <circle cx="212" cy="22" r="4.5" fill="color-mix(in srgb, var(--c-physics-light) 28%, transparent)" />
      <circle cx="212" cy="22" r="2" fill="#e0f2fe" />
    </g>
    <!-- ================= 2. 转向架与车轮系统 (Bogies & Wheels) ================= -->
    <!-- 左侧第 2 节车厢的转向架（露出右半组车轮 x = 14 ~ 68） -->
    <g>
      <rect x="14" y="119" width="54" height="10" rx="2" fill="var(--c-surface-solid)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
      <circle cx="22" cy="128.5" r="7.5" fill="var(--c-neutral-700)" stroke="var(--c-text-dim)" stroke-width="1.8" />
      <circle cx="22" cy="128.5" r="2.6" fill="var(--c-neutral-300)" />
      <circle cx="52" cy="128.5" r="7.5" fill="var(--c-neutral-700)" stroke="var(--c-text-dim)" stroke-width="1.8" />
      <circle cx="52" cy="128.5" r="2.6" fill="var(--c-neutral-300)" />
      <rect x="30" y="122" width="14" height="5" rx="1.5" fill="var(--c-neutral-600)" />
    </g>
    <!-- 头车后转向架 (x = 122 ~ 190) -->
    <g>
      <rect x="122" y="119" width="68" height="10" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
      <circle cx="139" cy="128.5" r="7.5" fill="var(--c-neutral-700)" stroke="var(--c-text-dim)" stroke-width="1.8" />
      <circle cx="139" cy="128.5" r="2.6" fill="var(--c-neutral-300)" />
      <circle cx="173" cy="128.5" r="7.5" fill="var(--c-neutral-700)" stroke="var(--c-text-dim)" stroke-width="1.8" />
      <circle cx="173" cy="128.5" r="2.6" fill="var(--c-neutral-300)" />
      <rect x="148" y="122" width="16" height="5" rx="1.5" fill="var(--c-neutral-600)" />
    </g>
    <!-- 头车前转向架 (x = 260 ~ 328) -->
    <g>
      <rect x="260" y="119" width="68" height="10" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
      <circle cx="277" cy="128.5" r="7.5" fill="var(--c-neutral-700)" stroke="var(--c-text-dim)" stroke-width="1.8" />
      <circle cx="277" cy="128.5" r="2.6" fill="var(--c-neutral-300)" />
      <circle cx="311" cy="128.5" r="7.5" fill="var(--c-neutral-700)" stroke="var(--c-text-dim)" stroke-width="1.8" />
      <circle cx="311" cy="128.5" r="2.6" fill="var(--c-neutral-300)" />
      <rect x="286" y="122" width="16" height="5" rx="1.5" fill="var(--c-neutral-600)" />
    </g>
    <!-- ================= 3. 动车组车体：左侧半截第 2 节车厢 + 中间风挡 + 右侧复兴号头车 ================= -->
    <g clip-path="url(#hsr-train-clip)">
      <!-- 银白金属主车体（贯穿左侧半截车厢与右侧头车） -->
      <rect x="14" y="52" width="386" height="72" fill="url(#hsr-body-grad)" />
      <!-- 车顶深灰空气动力学导流涂装 -->
      <path d="M 14 54 L 276 54 C 302 54 322 59 338 68 L 14 61 Z" fill="var(--c-neutral-600)" opacity="0.65" />
      <!-- 底部深色整流裙板 (Skirt) -->
      <rect x="14" y="112" width="386" height="12" fill="var(--c-surface-solid)" opacity="0.9" />
      <!-- 转向架处裙板弧形切口阴影 -->
      <rect x="14" y="113" width="58" height="10" rx="3" fill="var(--c-neutral-900)" />
      <rect x="118" y="113" width="76" height="10" rx="4" fill="var(--c-neutral-900)" />
      <rect x="256" y="113" width="76" height="10" rx="4" fill="var(--c-neutral-900)" />
      <!-- 复兴号标志性金橙色流线飞龙彩带：贯穿左半截车厢、风挡与头车 -->
      <path d="M 14 103 L 294 103 C 326 103 352 108 396 117 L 396 113 C 354 103 328 98 294 98 L 14 98 Z" fill="url(#hsr-gold-stripe)" />
      <!-- 车头上部副流线金带 -->
      <path d="M 252 54 C 288 56 324 70 360 96 L 351 98 C 318 74 284 60 242 56 Z" fill="url(#hsr-gold-stripe)" opacity="0.9" />
      <!-- ── 左侧：半截第 2 节车厢 (x = 14 ~ 88) ── -->
      <!-- 第 2 节车厢的连续黑晶窗带（向左延伸出画面边界） -->
      <rect x="8" y="69" width="70" height="22" rx="6" fill="url(#hsr-window-grad)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
      <g fill="color-mix(in srgb, var(--c-text-dim) 16%, transparent)" stroke="color-mix(in srgb, var(--c-neutral-300) 28%, transparent)" stroke-width="0.8">
        <!-- 最左侧被截断的半扇车窗 + 右侧完整车窗 -->
        <rect x="6" y="72.5" width="26" height="15" rx="3" />
        <rect x="40" y="72.5" width="30" height="15" rx="3.5" />
      </g>
      <g stroke="rgba(255,255,255,0.2)" stroke-width="1.3" stroke-linecap="round">
        <line x1="16" y1="85" x2="25" y2="75" />
        <line x1="48" y1="85" x2="58" y2="75" />
      </g>
      <!-- ── 两节车厢之间的橡胶风挡连接处 (Inter-car Gangway Bellows, x = 88 ~ 98) ── -->
      <rect x="88" y="54" width="10" height="68" fill="var(--c-neutral-900)" opacity="0.88" />
      <!-- 风挡褶皱竖纹 -->
      <line x1="90.5" y1="55" x2="90.5" y2="121" stroke="var(--c-neutral-700)" stroke-width="1.1" />
      <line x1="93" y1="55" x2="93" y2="121" stroke="var(--c-neutral-600)" stroke-width="1.1" />
      <line x1="95.5" y1="55" x2="95.5" y2="121" stroke="var(--c-neutral-700)" stroke-width="1.1" />
      <!-- ── 右侧：第 1 节头车 (x = 98 ~ 396) ── -->
      <!-- 头车客室上下车门 -->
      <rect
        x="104"
        y="65"
        width="17"
        height="45"
        rx="2.5"
        fill="color-mix(in srgb, var(--c-neutral-900) 18%, transparent)"
        stroke="var(--c-neutral-500)"
        stroke-width="1.2"
      />
      <rect x="108" y="71" width="9" height="18" rx="2" fill="url(#hsr-window-grad)" stroke="var(--c-text-dim)" stroke-width="0.9" />
      <!-- 头车连续黑晶乘客窗带 + 4 扇圆角车窗 -->
      <rect x="128" y="69" width="146" height="22" rx="11" fill="url(#hsr-window-grad)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
      <g fill="color-mix(in srgb, var(--c-text-dim) 16%, transparent)" stroke="color-mix(in srgb, var(--c-neutral-300) 28%, transparent)" stroke-width="0.8">
        <rect x="136" y="72.5" width="27" height="15" rx="3.5" />
        <rect x="170" y="72.5" width="27" height="15" rx="3.5" />
        <rect x="204" y="72.5" width="27" height="15" rx="3.5" />
        <rect x="238" y="72.5" width="27" height="15" rx="3.5" />
      </g>
      <g stroke="rgba(255,255,255,0.22)" stroke-width="1.4" stroke-linecap="round">
        <line x1="143" y1="85" x2="152" y2="75" />
        <line x1="177" y1="85" x2="186" y2="75" />
        <line x1="211" y1="85" x2="220" y2="75" />
        <line x1="245" y1="85" x2="254" y2="75" />
      </g>
      <!-- 驾驶室全景前风挡玻璃 (Cockpit Windshield) -->
      <path
        d="M 288 68 L 320 70 C 338 79 352 89 362 97 L 320 95 C 300 94 288 85 288 68 Z"
        fill="url(#hsr-window-grad)"
        stroke="var(--c-neutral-500)"
        stroke-width="1.2"
        stroke-linejoin="round"
      />
      <path d="M 296 72 L 318 73.5 C 330 80 340 87 347 92.5 L 339 92.5 C 330 85 318 78 296 75 Z" fill="rgba(186,230,253,0.25)" />
      <!-- LED 鹰眼大灯 -->
      <path d="M 369 104 L 388 111 L 377 114 L 365 108 Z" fill="#fef08a" stroke="var(--c-accent-glow)" stroke-width="1" />
      <!-- 左端半截车厢边缘渐隐过渡遮罩 -->
      <rect x="14" y="52" width="38" height="72" fill="url(#hsr-left-fade)" />
    </g>
    <!-- 车体外轮廓高亮描边（顶部、右侧流线鼻锥、底部；左端开口表示车厢继续向左延伸） -->
    <path
      d="M 14 54 L 256 54 C 294 54 322 64 348 84 C 366 99 386 108 396 115 C 399 117 399 121 394 122 L 14 122"
      fill="none"
      stroke="var(--c-neutral-300)"
      stroke-width="1.8"
      stroke-linejoin="round"
    />
    <!-- 左端半截车厢的剖断虚线（直观交代左边还有后续车厢） -->
    <line x1="14" y1="50" x2="14" y2="126" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="4 3" opacity="0.65" />
    <!-- 前照灯刺破空气光束 -->
    <polygon points="385,109 418,102 418,120 385,114" fill="url(#hsr-headlight-beam)" />
    <!-- ================= 4. 高速铁轨与动态飞驰轨枕 (Track & Scrolling Sleepers) ================= -->
    <rect x="16" y="136" width="388" height="16" rx="2" fill="color-mix(in srgb, var(--c-surface-solid) 55%, transparent)" />
    <g class="p14-rails" clip-path="url(#hsr-rail-clip)">
      <g stroke="color-mix(in srgb, var(--c-text-dim) 42%, transparent)" stroke-width="4.5" stroke-linecap="butt">
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
    <!-- ================= 5. 物理量标注：a = 0 与 v ≈ 300 km/h ================= -->
    <text x="115" y="43" text-anchor="middle" font-size="19" font-weight="600" fill="var(--c-accent)">
      <tspan font-family="KaTeX_Math" font-style="italic">a</tspan>
      <tspan font-family="KaTeX_Main">= 0</tspan>
    </text>
    <g>
      <line x1="96" y1="173" x2="294" y2="173" stroke="var(--c-accent)" stroke-width="3.4" stroke-linecap="round" />
      <path d="M 304 173 L 290 166.5 L 290 179.5 Z" fill="var(--c-accent)" />
      <text x="200" y="197" text-anchor="middle" font-size="15.5" font-weight="600" fill="var(--c-accent)">
        <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
        <tspan font-family="KaTeX_Main">≈ 300 km/h ≈ 83 m/s</tspan>
      </text>
    </g>
  </svg>
</template>
