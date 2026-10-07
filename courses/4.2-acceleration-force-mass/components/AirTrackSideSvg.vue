<template>
  <!-- 第 22 页侧视图：气泵把压缩空气送进气垫导轨，倒 V 形骑跨滑块盖在导轨上并被气层托起 -->
  <svg viewBox="0 0 460 200" width="100%" style="max-width: 470px" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 铝合金导轨上斜面（带气孔工作面）金属渐变 -->
      <linearGradient id="atRailSlopeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(226,232,240,0.48)" />
        <stop offset="100%" stop-color="rgba(100,116,139,0.42)" />
      </linearGradient>
      <!-- 导轨下基座（带标尺刻度面）深色金属渐变 -->
      <linearGradient id="atRailBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(71,85,105,0.55)" />
        <stop offset="100%" stop-color="rgba(30,41,59,0.75)" />
      </linearGradient>
      <!-- 骑跨式滑块顶部脊梁高光渐变 -->
      <linearGradient id="atRiderSpineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(147,197,253,0.62)" />
        <stop offset="100%" stop-color="rgba(59,130,246,0.48)" />
      </linearGradient>
      <!-- 骑跨式滑块下垂侧翼裙边（向下盖住导轨斜面）渐变 -->
      <linearGradient id="atRiderSkirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(59,130,246,0.42)" />
        <stop offset="100%" stop-color="rgba(29,78,216,0.52)" />
      </linearGradient>
      <!-- 气膜（气层）发光渐变 -->
      <linearGradient id="atAirFilmGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(56,189,248,0.58)" />
        <stop offset="100%" stop-color="rgba(56,189,248,0.12)" />
      </linearGradient>
      <!-- 槽码黄铜渐变 -->
      <linearGradient id="atWeightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(226,168,70,0.38)" />
        <stop offset="48%" stop-color="rgba(251,191,36,0.58)" />
        <stop offset="100%" stop-color="rgba(180,83,9,0.42)" />
      </linearGradient>
    </defs>

    <!-- ==================== 1. 实验桌面接触面（复用 SurfaceHatch）与右侧桌沿 ==================== -->
    <SurfaceHatch :from="{ x: 8, y: 156 }" :to="{ x: 392, y: 156 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />
    <line x1="392" y1="156" x2="392" y2="192" stroke="#64748b" stroke-width="1.8" opacity="0.65" />

    <!-- ==================== 2. 左侧静音气源（气泵）与波纹输气软管 ==================== -->
    <g stroke-linecap="round" stroke-linejoin="round">
      <!-- 气泵顶部提手 -->
      <path d="M 32 108 L 32 102 L 60 102 L 60 108" fill="none" stroke="#94a3b8" stroke-width="1.8" />
      <!-- 气泵减振橡胶脚垫 -->
      <rect x="20" y="151" width="10" height="5" rx="1.5" fill="#475569" />
      <rect x="62" y="151" width="10" height="5" rx="1.5" fill="#475569" />
      <!-- 气泵主壳体 -->
      <rect x="14" y="108" width="64" height="43" rx="5" fill="rgba(30,41,59,0.85)" stroke="#94a3b8" stroke-width="1.6" />
      <!-- 气泵散热百叶窗与运行指示灯 -->
      <line x1="22" y1="118" x2="38" y2="118" stroke="#64748b" stroke-width="1.4" />
      <line x1="22" y1="123" x2="38" y2="123" stroke="#64748b" stroke-width="1.4" />
      <line x1="22" y1="128" x2="38" y2="128" stroke="#64748b" stroke-width="1.4" />
      <circle cx="64" cy="120" r="3.2" fill="rgba(56,189,248,0.28)" stroke="#38bdf8" stroke-width="1.2" />
      <text x="46" y="144" font-size="12" font-weight="500" fill="#e2e8f0" text-anchor="middle">气泵</text>

      <!-- 出气法兰嘴与波纹输气软管（带压缩空气流向虚线） -->
      <rect x="78" y="126" width="5" height="8" rx="1" fill="#64748b" stroke="#94a3b8" stroke-width="1" />
      <path d="M 83 130 C 94 130 99 131 110 131" fill="none" stroke="#94a3b8" stroke-width="5" />
      <path d="M 83 130 C 94 130 99 131 110 131" fill="none" stroke="#38bdf8" stroke-width="1.6" stroke-dasharray="3 3" />
    </g>

    <!-- ==================== 3. 气垫导轨本体（分上层三角斜面 y=118..134 与下层刻度基座 y=134..143） ==================== -->
    <g>
      <!-- 导轨左右调平支座与调节螺母 -->
      <path d="M 134 143 L 138 156 L 150 156 L 154 143 Z" fill="rgba(148,163,184,0.32)" stroke="#94a3b8" stroke-width="1.2" />
      <rect x="135" y="152" width="18" height="4" rx="1" fill="#64748b" />
      <path d="M 342 143 L 346 156 L 358 156 L 362 143 Z" fill="rgba(148,163,184,0.32)" stroke="#94a3b8" stroke-width="1.2" />
      <rect x="343" y="152" width="18" height="4" rx="1" fill="#64748b" />

      <!-- 导轨上层：倒 V 形三角工作斜面（y: 118..134，顶棱 y = 118） -->
      <rect x="110" y="118" width="274" height="16" rx="1.5" fill="url(#atRailSlopeGrad)" stroke="#94a3b8" stroke-width="1.3" />
      <!-- 导轨顶棱高光（y = 119.2） -->
      <line x1="112" y1="119.2" x2="382" y2="119.2" stroke="rgba(248,250,252,0.6)" stroke-width="1" />

      <!-- 导轨下层：底座与毫米标尺刻度带（y: 134..143，始终露在滑块侧翼裙边 y=132 下方） -->
      <rect x="110" y="134" width="274" height="9" rx="1.5" fill="url(#atRailBaseGrad)" stroke="#94a3b8" stroke-width="1.3" />
      <line x1="118" y1="138.5" x2="376" y2="138.5" stroke="rgba(203,213,225,0.5)" stroke-width="2.2" stroke-dasharray="1.5 6.5" />

      <!-- 导轨斜面上的均匀喷气小孔（位于斜面中部 y = 126.5） -->
      <g fill="#0f172a" stroke="#7dd3fc" stroke-width="1">
        <circle v-for="hx in [124, 140, 156, 172, 276, 292, 308, 324, 340, 356, 372]" :key="hx" :cx="hx" cy="126.5" r="1.5" />
      </g>

      <!-- 导轨左端封头与防撞缓冲块 -->
      <rect x="108" y="115" width="4" height="28" rx="1" fill="#64748b" stroke="#94a3b8" stroke-width="1" />

      <text x="326" y="110" font-size="12" fill="#94a3b8" text-anchor="middle">气垫导轨</text>
    </g>

    <!-- ==================== 4. 骑跨（盖在）导轨上的倒 V 形滑块与内部托举气层 ==================== -->
    <!--
      结构关键：
      - 导轨顶棱在 y = 118，导轨斜面下沿在 y = 134；
      - 滑块并非浮在 y = 118 之上，而是倒 V 形骑跨（盖）在导轨上：
        ① 滑块顶梁在 y = 104 .. 114.5（位于导轨顶棱 y = 118 上方，中间 y = 114.5 .. 118 为 3.5px 托举气层）；
        ② 滑块前侧翼裙板（Skirt）向下延伸到 y = 132，直接包覆盖住导轨上斜面（y = 118 .. 132）！
        ③ 透過半透明侧翼可见内部虚线导轨顶棱 (y = 118)、被盖住的喷气孔 (y = 126.5) 以及从裙边下沿 (y = 132) 溢出的微气流。
    -->
    <g>
      <!-- 滑块下垂侧翼裙边（y: 114.5 .. 132，向下嵌在导轨斜面 y: 118 .. 134 外侧，盖住导轨上半部！） -->
      <path
        d="M 180 114.5 L 266 114.5 L 266 130.5 A 1.5 1.5 0 0 1 264.5 132 L 181.5 132 A 1.5 1.5 0 0 1 180 130.5 Z"
        fill="url(#atRiderSkirtGrad)"
        stroke="#60a5fa"
        stroke-width="1.5"
        stroke-linejoin="round"
      />

      <!-- 滑块内顶脊与导轨顶棱 (y = 118) 之间的高压托举气层发光带（y: 114.5 .. 118.5） -->
      <rect x="181" y="114.5" width="84" height="4" fill="url(#atAirFilmGrad)" />

      <!-- 被滑块侧翼盖在里面的导轨顶棱透视虚线（y = 118），直观体现“导轨嵌在滑块内部” -->
      <line x1="180" y1="118" x2="266" y2="118" stroke="#bae6fd" stroke-width="1.3" stroke-dasharray="4 3" />

      <!-- 被滑块侧翼包覆在内部的导轨气孔（半透明透视）与向上托起滑块的气流短线 -->
      <g fill="rgba(15,23,42,0.65)" stroke="#38bdf8" stroke-width="1">
        <circle cx="192" cy="126.5" r="1.4" />
        <circle cx="208" cy="126.5" r="1.4" />
        <circle cx="223" cy="126.5" r="1.4" />
        <circle cx="238" cy="126.5" r="1.4" />
        <circle cx="254" cy="126.5" r="1.4" />
      </g>
      <g stroke="#38bdf8" stroke-width="1.2" stroke-linecap="round" opacity="0.85">
        <line x1="192" y1="125" x2="192" y2="116" />
        <line x1="208" y1="125" x2="208" y2="116" />
        <line x1="223" y1="125" x2="223" y2="116" />
        <line x1="238" y1="125" x2="238" y2="116" />
        <line x1="254" y1="125" x2="254" y2="116" />
      </g>

      <!-- 滑块侧翼裙边底沿（y = 132）与导轨斜面之间溢出的气膜亮线 -->
      <line x1="182" y1="133" x2="264" y2="133" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3 2.5" opacity="0.9" />

      <!-- 滑块顶部厚实脊梁（y: 104 .. 114.5，带左右倒角与立体折线，与下方侧翼共同构成骑跨鞍座） -->
      <path d="M 180 114.5 L 185 104 L 261 104 L 266 114.5 Z" fill="url(#atRiderSpineGrad)" stroke="#60a5fa" stroke-width="1.6" stroke-linejoin="round" />
      <!-- 滑块左右两端开口处的内凹骑跨槽口指示线（强化“像鞍子一样跨在导轨上”的立体感） -->
      <path d="M 180 132 L 184.5 118 L 180 114.5" fill="rgba(15,23,42,0.45)" stroke="#93c5fd" stroke-width="1.1" stroke-linejoin="round" />
      <path d="M 266 132 L 261.5 118 L 266 114.5" fill="rgba(15,23,42,0.45)" stroke="#93c5fd" stroke-width="1.1" stroke-linejoin="round" />

      <!-- 滑块顶部中央挡光片（遮光条）底座与窄遮光片 -->
      <rect x="217" y="100.5" width="12" height="3.5" rx="1" fill="#3b82f6" stroke="#93c5fd" stroke-width="0.9" />
      <rect x="221" y="88" width="4" height="12.5" rx="1" fill="#38bdf8" stroke="#bae6fd" stroke-width="0.9" />

      <!-- 滑块右侧牵引挂钩（位于 y = 108，与定滑轮最高点切线严格齐平） -->
      <path d="M 264 109 L 271 109 A 2.2 2.2 0 0 0 271 104.5" fill="none" stroke="#cbd5e1" stroke-width="1.6" stroke-linecap="round" />

      <text x="223" y="81" font-size="12" font-weight="600" fill="#60a5fa" text-anchor="middle">滑块</text>
    </g>

    <!-- ==================== 5. 导轨右端定滑轮支架、定滑轮、水平细绳与悬挂槽码 ==================== -->
    <g stroke-linecap="round" stroke-linejoin="round">
      <!-- 固定在导轨右端的定滑轮斜撑支架 -->
      <path d="M 380 138 L 392 138 L 408 118" fill="none" stroke="#94a3b8" stroke-width="3" />
      <path d="M 384 128 L 408 118" fill="none" stroke="#64748b" stroke-width="2" />

      <!-- 牵引细绳：从滑块挂钩 (271, 108) 严格水平切入定滑轮最高点 (408, 108)，绕过轮缘圆弧后竖直垂下至槽码 -->
      <path d="M 271 108 L 408 108 A 10 10 0 0 1 418 118 L 418 148" fill="none" stroke="#e2e8f0" stroke-width="1.6" />

      <!-- 轻质定滑轮（圆心 408, 118，半径 10，最高点切点恰好在 y = 108） -->
      <circle cx="408" cy="118" r="10" fill="rgba(15,23,42,0.85)" stroke="#cbd5e1" stroke-width="1.8" />
      <circle cx="408" cy="118" r="6" fill="none" stroke="rgba(148,163,184,0.4)" stroke-width="1" />
      <circle cx="408" cy="118" r="2.4" fill="#e2a846" />
      <text x="408" y="98" font-size="12" fill="#94a3b8" text-anchor="middle">定滑轮</text>

      <!-- 槽码挂钩与叠放的金属槽码片 -->
      <path d="M 418 148 C 415 148 415 153 418 153" fill="none" stroke="#e2a846" stroke-width="1.5" />
      <rect x="406" y="153" width="24" height="22" rx="2.5" fill="url(#atWeightGrad)" stroke="#e2a846" stroke-width="1.4" />
      <line x1="407" y1="160.3" x2="429" y2="160.3" stroke="rgba(226,168,70,0.75)" stroke-width="1.1" />
      <line x1="407" y1="167.6" x2="429" y2="167.6" stroke="rgba(226,168,70,0.75)" stroke-width="1.1" />
      <line x1="418" y1="153" x2="418" y2="175" stroke="rgba(15,23,42,0.55)" stroke-width="1.2" />
      <text x="418" y="190" font-size="12" font-weight="500" fill="#e2a846" text-anchor="middle">槽码</text>
    </g>
  </svg>
</template>
