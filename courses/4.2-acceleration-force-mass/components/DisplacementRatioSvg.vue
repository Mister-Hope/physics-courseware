<template>
  <!-- 位移比法实验装置（教材参考案例 2）：两辆相同小车并排，黑板擦同时按住两根尾线实现同时启动、同时停下 -->
  <svg viewBox="0 0 460 200" width="100%" style="max-width: 400px" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 实验小车金属蓝车身渐变 -->
      <linearGradient id="drsCartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(96,165,250,0.42)" />
        <stop offset="60%" stop-color="rgba(59,130,246,0.25)" />
        <stop offset="100%" stop-color="rgba(29,78,216,0.42)" />
      </linearGradient>
      <!-- 砝码盘黄铜渐变 -->
      <linearGradient id="drsPanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(226,168,70,0.38)" />
        <stop offset="48%" stop-color="rgba(251,191,36,0.58)" />
        <stop offset="100%" stop-color="rgba(180,83,9,0.42)" />
      </linearGradient>
      <!-- 黑板擦立体木质背板渐变 -->
      <linearGradient id="drsEraserWoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(217,119,6,0.55)" />
        <stop offset="35%" stop-color="rgba(245,158,11,0.68)" />
        <stop offset="70%" stop-color="rgba(180,83,9,0.58)" />
        <stop offset="100%" stop-color="rgba(120,53,15,0.65)" />
      </linearGradient>
      <!-- 黑板擦中脊凹槽握把渐变 -->
      <linearGradient id="drsEraserGrooveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(120,53,15,0.68)" />
        <stop offset="50%" stop-color="rgba(251,191,36,0.35)" />
        <stop offset="100%" stop-color="rgba(120,53,15,0.68)" />
      </linearGradient>
      <!-- 黑板擦底层深色厚毛毡擦垫渐变 -->
      <linearGradient id="drsEraserFeltGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1e293b" />
        <stop offset="100%" stop-color="#334155" />
      </linearGradient>
    </defs>

    <!-- ==================== 1. 上下两条平行轨道接触面（复用 SurfaceHatch 组件）与右端桌沿 ==================== -->
    <!-- 上轨道接触面（小车 1 导轨/木板，y = 66，x = 60..384） -->
    <SurfaceHatch :from="{ x: 60, y: 66 }" :to="{ x: 384, y: 66 }" side="below" color="#64748b" :line-width="2" :thickness="8" :gap="16" />
    <line x1="384" y1="66" x2="384" y2="82" stroke="#64748b" stroke-width="1.6" opacity="0.65" />

    <!-- 下轨道接触面（小车 2 导轨/木板，y = 146，x = 60..384） -->
    <SurfaceHatch :from="{ x: 60, y: 146 }" :to="{ x: 384, y: 146 }" side="below" color="#64748b" :line-width="2" :thickness="8" :gap="16" />
    <line x1="384" y1="146" x2="384" y2="162" stroke="#64748b" stroke-width="1.6" opacity="0.65" />

    <!-- ==================== 2. 后端两条细线（穿过黑板擦底部，并从黑板擦左侧露出线头！） ==================== -->
    <g stroke-linecap="round">
      <!-- 小车 1 后端细线：车尾挂环 (116, 48) → 黑板擦右侧 (50, 48) -->
      <line x1="116" y1="48" x2="50" y2="48" stroke="#e2e8f0" stroke-width="1.5" />
      <!-- 被黑板擦压在底下的细线暗影段 (22..50) -->
      <line x1="50" y1="48" x2="22" y2="48" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="2.5 2.5" opacity="0.45" />
      <!-- 从黑板擦左侧露出的自由线头（带自然微垂弧度 x: 22 → 5） -->
      <path d="M 22 48 L 12 48 Q 7 48 4.5 51.5" fill="none" stroke="#e2e8f0" stroke-width="1.5" />

      <!-- 小车 2 后端细线：车尾挂环 (116, 128) → 黑板擦右侧 (50, 128) -->
      <line x1="116" y1="128" x2="50" y2="128" stroke="#e2e8f0" stroke-width="1.5" />
      <!-- 被黑板擦压在底下的细线暗影段 (22..50) -->
      <line x1="50" y1="128" x2="22" y2="128" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="2.5 2.5" opacity="0.45" />
      <!-- 从黑板擦左侧露出的自由线头（带自然微垂弧度 x: 22 → 5） -->
      <path d="M 22 128 L 12 128 Q 7 128 4.5 131.5" fill="none" stroke="#e2e8f0" stroke-width="1.5" />
    </g>

    <!-- ==================== 3. 精致立体黑板擦（底层深灰厚毛毡 + 上层木质握槽背板，同时压紧两根尾线） ==================== -->
    <g>
      <!-- 黑板擦左侧底层厚毛毡擦面（直接压在两根细线 y=48 与 y=128 上，表现双层立体厚度） -->
      <rect x="21" y="37" width="26" height="103" rx="4" fill="url(#drsEraserFeltGrad)" stroke="#64748b" stroke-width="1.2" />
      <!-- 毛毡层压紧两根细线处的微凹压痕高光点 -->
      <circle cx="21.5" cy="48" r="1.6" fill="#38bdf8" opacity="0.85" />
      <circle cx="49.5" cy="48" r="1.6" fill="#38bdf8" opacity="0.85" />
      <circle cx="21.5" cy="128" r="1.6" fill="#38bdf8" opacity="0.85" />
      <circle cx="49.5" cy="128" r="1.6" fill="#38bdf8" opacity="0.85" />

      <!-- 黑板擦上层原木色立体木质背板（向右上方微偏 3px，露出左侧与底部的深灰毛毡层） -->
      <rect x="24" y="34" width="26" height="102" rx="4" fill="url(#drsEraserWoodGrad)" stroke="#f59e0b" stroke-width="1.4" />
      <!-- 木质背板中央纵向内凹人体工学握槽 -->
      <rect x="32" y="38" width="10" height="94" rx="3" fill="url(#drsEraserGrooveGrad)" stroke="rgba(251,191,36,0.4)" stroke-width="0.9" />
      <!-- 木质背板防滑横棱与高光边线 -->
      <line x1="26.5" y1="38" x2="26.5" y2="132" stroke="rgba(254,243,199,0.45)" stroke-width="1" stroke-linecap="round" />
      <g stroke="rgba(254,243,199,0.42)" stroke-width="1.1" stroke-linecap="round">
        <line x1="34" y1="52" x2="40" y2="52" />
        <line x1="34" y1="68" x2="40" y2="68" />
        <line x1="34" y1="85" x2="40" y2="85" />
        <line x1="34" y1="102" x2="40" y2="102" />
        <line x1="34" y1="118" x2="40" y2="118" />
      </g>

      <text x="36" y="162" font-size="12" font-weight="500" fill="#cbd5e1" text-anchor="middle">黑板擦</text>
    </g>

    <!-- ==================== 4. 上层装置：小车 1 + 端头定滑轮支架 + 定滑轮 + 悬挂小盘 ==================== -->
    <g>
      <text x="155" y="25" font-size="12" font-weight="600" fill="#60a5fa" text-anchor="middle">小车 1</text>

      <!-- 小车 1 车尾挂环与车头挂环 -->
      <circle cx="116.5" cy="48" r="2.2" fill="none" stroke="#93c5fd" stroke-width="1.4" />
      <circle cx="193.5" cy="48" r="2.2" fill="none" stroke="#93c5fd" stroke-width="1.4" />

      <!-- 小车 1 车体 -->
      <path
        d="M 121 36 L 129 36 L 131 40 L 179 40 L 181 36 L 188 36 A 3 3 0 0 1 191 39 L 191 56 A 2.5 2.5 0 0 1 188.5 58.5 L 121.5 58.5 A 2.5 2.5 0 0 1 119 56 L 119 39 A 3 3 0 0 1 121 36 Z"
        fill="url(#drsCartGrad)"
        stroke="#60a5fa"
        stroke-width="1.5"
      />
      <!-- 小车 1 前后车轮（cy = 59.5, r = 6.5 ⇒ 轮底 66 严格贴合上轨道表面 y = 66） -->
      <circle cx="131" cy="59.5" r="6.5" fill="#0f172a" stroke="#60a5fa" stroke-width="1.7" />
      <circle cx="131" cy="59.5" r="2.2" fill="#93c5fd" />
      <circle cx="179" cy="59.5" r="6.5" fill="#0f172a" stroke="#60a5fa" stroke-width="1.7" />
      <circle cx="179" cy="59.5" r="2.2" fill="#93c5fd" />

      <!-- 固定在上轨道右端 (384, 66) 的定滑轮夹具与斜撑支架（彻底解决原版滑轮悬空问题） -->
      <path d="M 377 65.5 L 385 65.5 L 385 73.5 L 377 73.5" fill="rgba(148,163,184,0.35)" stroke="#cbd5e1" stroke-width="1.3" stroke-linejoin="round" />
      <line x1="384" y1="67" x2="400" y2="57" stroke="#94a3b8" stroke-width="2.8" stroke-linecap="round" />
      <line x1="384" y1="72" x2="400" y2="57" stroke="#64748b" stroke-width="1.8" stroke-linecap="round" />

      <!-- 小车 1 前端牵引细线：从车头挂环 (196, 48) 水平切入定滑轮最高点 (400, 48)，绕过滑轮后竖直垂下 -->
      <path d="M 196 48 L 400 48 A 9 9 0 0 1 409 57 L 409 77" fill="none" stroke="#e2e8f0" stroke-width="1.5" stroke-linecap="round" />

      <!-- 上定滑轮（圆心 400, 57，半径 9，最高点切点恰好在 y = 48） -->
      <circle cx="400" cy="57" r="9" fill="rgba(15,23,42,0.85)" stroke="#cbd5e1" stroke-width="1.7" />
      <circle cx="400" cy="57" r="5.5" fill="none" stroke="rgba(148,163,184,0.4)" stroke-width="0.9" />
      <circle cx="400" cy="57" r="2.2" fill="#e2a846" />

      <!-- 悬挂小盘（带两侧吊绳与盘内砝码片，已按要求去掉“小盘”文字） -->
      <line x1="409" y1="77" x2="401" y2="85" stroke="#cbd5e1" stroke-width="1.2" stroke-linecap="round" />
      <line x1="409" y1="77" x2="417" y2="85" stroke="#cbd5e1" stroke-width="1.2" stroke-linecap="round" />
      <rect x="398" y="85" width="22" height="10" rx="2" fill="url(#drsPanGrad)" stroke="#e2a846" stroke-width="1.3" />
      <rect x="403" y="81.5" width="12" height="3.5" rx="1" fill="rgba(251,191,36,0.55)" stroke="#e2a846" stroke-width="1" />
    </g>

    <!-- ==================== 5. 下层装置：小车 2 + 端头定滑轮支架 + 定滑轮 + 悬挂小盘 ==================== -->
    <g>
      <text x="155" y="105" font-size="12" font-weight="600" fill="#60a5fa" text-anchor="middle">小车 2</text>

      <!-- 小车 2 车尾挂环与车头挂环 -->
      <circle cx="116.5" cy="128" r="2.2" fill="none" stroke="#93c5fd" stroke-width="1.4" />
      <circle cx="193.5" cy="128" r="2.2" fill="none" stroke="#93c5fd" stroke-width="1.4" />

      <!-- 小车 2 车体 -->
      <path
        d="M 121 116 L 129 116 L 131 120 L 179 120 L 181 116 L 188 116 A 3 3 0 0 1 191 119 L 191 136 A 2.5 2.5 0 0 1 188.5 138.5 L 121.5 138.5 A 2.5 2.5 0 0 1 119 136 L 119 119 A 3 3 0 0 1 121 116 Z"
        fill="url(#drsCartGrad)"
        stroke="#60a5fa"
        stroke-width="1.5"
      />
      <!-- 小车 2 前后车轮（cy = 139.5, r = 6.5 ⇒ 轮底 146 严格贴合下轨道表面 y = 146） -->
      <circle cx="131" cy="139.5" r="6.5" fill="#0f172a" stroke="#60a5fa" stroke-width="1.7" />
      <circle cx="131" cy="139.5" r="2.2" fill="#93c5fd" />
      <circle cx="179" cy="139.5" r="6.5" fill="#0f172a" stroke="#60a5fa" stroke-width="1.7" />
      <circle cx="179" cy="139.5" r="2.2" fill="#93c5fd" />

      <!-- 固定在下轨道右端 (384, 146) 的定滑轮夹具与斜撑支架 -->
      <path d="M 377 145.5 L 385 145.5 L 385 153.5 L 377 153.5" fill="rgba(148,163,184,0.35)" stroke="#cbd5e1" stroke-width="1.3" stroke-linejoin="round" />
      <line x1="384" y1="147" x2="400" y2="137" stroke="#94a3b8" stroke-width="2.8" stroke-linecap="round" />
      <line x1="384" y1="152" x2="400" y2="137" stroke="#64748b" stroke-width="1.8" stroke-linecap="round" />

      <!-- 小车 2 前端牵引细线：从车头挂环 (196, 128) 水平切入定滑轮最高点 (400, 128)，绕过滑轮后竖直垂下 -->
      <path d="M 196 128 L 400 128 A 9 9 0 0 1 409 137 L 409 157" fill="none" stroke="#e2e8f0" stroke-width="1.5" stroke-linecap="round" />

      <!-- 下定滑轮（圆心 400, 137，半径 9，最高点切点恰好在 y = 128） -->
      <circle cx="400" cy="137" r="9" fill="rgba(15,23,42,0.85)" stroke="#cbd5e1" stroke-width="1.7" />
      <circle cx="400" cy="137" r="5.5" fill="none" stroke="rgba(148,163,184,0.4)" stroke-width="0.9" />
      <circle cx="400" cy="137" r="2.2" fill="#e2a846" />

      <!-- 悬挂小盘（带两侧吊绳与盘内多块砝码片） -->
      <line x1="409" y1="157" x2="401" y2="165" stroke="#cbd5e1" stroke-width="1.2" stroke-linecap="round" />
      <line x1="409" y1="157" x2="417" y2="165" stroke="#cbd5e1" stroke-width="1.2" stroke-linecap="round" />
      <rect x="398" y="165" width="22" height="10" rx="2" fill="url(#drsPanGrad)" stroke="#e2a846" stroke-width="1.3" />
      <rect x="402" y="159.5" width="14" height="5.5" rx="1" fill="rgba(251,191,36,0.65)" stroke="#e2a846" stroke-width="1" />
    </g>
  </svg>
</template>
