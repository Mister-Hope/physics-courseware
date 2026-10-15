<template>
  <!-- 第 4 页：实验装置示意图，打点计时器、限位孔、纸带、小车、滑轮与配重的安装关系 -->
  <svg viewBox="0 0 400 180" width="100%" style="max-width: 400px" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 长木板立体表面渐变（无空格 rgba 兼容 UnoCSS attributify） -->
      <linearGradient id="boardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="color-mix(in srgb, var(--c-neutral-300) 28%, transparent)" />
        <stop offset="45%" stop-color="color-mix(in srgb, var(--c-text-dim) 18%, transparent)" />
        <stop offset="100%" stop-color="color-mix(in srgb, var(--c-neutral-600) 32%, transparent)" />
      </linearGradient>
      <!-- 电火花打点计时器外壳渐变 -->
      <linearGradient id="timerCaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="color-mix(in srgb, var(--c-accent) 22%, transparent)" />
        <stop offset="100%" stop-color="color-mix(in srgb, var(--c-accent) 8%, transparent)" />
      </linearGradient>
      <!-- 墨粉纸盘立体渐变 -->
      <linearGradient id="inkDiscGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="color-mix(in srgb, var(--c-accent) 75%, transparent)" />
        <stop offset="50%" stop-color="color-mix(in srgb, var(--c-accent-light) 92%, transparent)" />
        <stop offset="100%" stop-color="rgba(217,119,6,0.75)" />
      </linearGradient>
      <!-- 实验小车金属蓝车身渐变 -->
      <linearGradient id="cartBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="color-mix(in srgb, var(--c-velocity) 34%, transparent)" />
        <stop offset="60%" stop-color="color-mix(in srgb, var(--c-accent-2) 20%, transparent)" />
        <stop offset="100%" stop-color="rgba(29,78,216,0.36)" />
      </linearGradient>
      <!-- 配重钩码金属渐变 -->
      <linearGradient id="weightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="color-mix(in srgb, var(--c-accent) 35%, transparent)" />
        <stop offset="45%" stop-color="color-mix(in srgb, var(--c-accent-light) 52%, transparent)" />
        <stop offset="100%" stop-color="rgba(180,83,9,0.38)" />
      </linearGradient>
    </defs>
    <!-- ==================== 1. 水平长木板与底座支撑 ==================== -->
    <g>
      <!-- 实验台面参考暗线 -->
      <line x1="8" y1="120" x2="352" y2="120" stroke="color-mix(in srgb, var(--c-text-dim) 20%, transparent)" stroke-width="1" stroke-dasharray="4 3" />
      <!-- 木板底部橡胶垫脚 -->
      <rect x="34" y="116" width="16" height="4" rx="1" fill="color-mix(in srgb, var(--c-text-dim) 38%, transparent)" />
      <rect x="314" y="116" width="16" height="4" rx="1" fill="color-mix(in srgb, var(--c-text-dim) 38%, transparent)" />
      <!-- 放平的长木板主体 -->
      <rect
        x="18"
        y="104"
        width="334"
        height="12"
        rx="2.5"
        fill="url(#boardGrad)"
        stroke="color-mix(in srgb, var(--c-text-dim) 48%, transparent)"
        stroke-width="1.2"
      />
      <!-- 木板上表面高光轨道线 -->
      <line x1="19" y1="104.5" x2="351" y2="104.5" stroke="color-mix(in srgb, var(--c-neutral-200) 45%, transparent)" stroke-width="1" />
      <text x="188" y="136" font-size="12" fill="var(--c-text-dim)" text-anchor="middle">木板（放平）</text>
    </g>
    <!-- ==================== 2. 电火花打点计时器底层壳体与承纸台 ==================== -->
    <g>
      <!-- 计时器紧固底座（贴合木板上表面 y=104） -->
      <rect
        x="24"
        y="98"
        width="68"
        height="6"
        rx="1.5"
        fill="color-mix(in srgb, var(--c-accent) 28%, transparent)"
        stroke="var(--c-accent)"
        stroke-width="1.2"
      />
      <!-- 计时器透视主壳体（内部剖视展现纸带穿行与墨盘压紧关系） -->
      <rect x="27" y="48" width="62" height="50" rx="5" fill="url(#timerCaseGrad)" stroke="var(--c-accent)" stroke-width="1.5" />
      <!-- 内部放电承纸底板（位于纸带正下方 y=80..83.5，支撑纸带与墨盘） -->
      <rect x="34" y="79.5" width="48" height="3.5" rx="1" fill="color-mix(in srgb, var(--c-text-dim) 35%, transparent)" />
      <text x="58" y="37" font-size="13" font-weight="600" fill="var(--c-accent)" text-anchor="middle">打点计时器</text>
    </g>
    <!-- ==================== 3. 贯穿限位孔并压在墨盘下的纸带 ==================== -->
    <g>
      <!-- 纸带主体：从左侧穿入 -> 穿过左限位孔 -> 压在墨盘正下方 (y=75.5..79.5) -> 穿过右限位孔 -> 连接小车尾部 -->
      <path
        d="M 8 79 Q 16 76 24 76 L 222 76 L 222 79.5 L 24 79.5 Q 16 79.5 8 82.5 Z"
        fill="color-mix(in srgb, var(--c-neutral-50) 88%, transparent)"
        stroke="color-mix(in srgb, var(--c-neutral-300) 95%, transparent)"
        stroke-width="0.8"
      />
      <!-- 纸带上已打出的电火花点迹（小车向右加速：靠近小车处为初始密集点，靠近计时器处间距逐渐增大） -->
      <g fill="var(--c-neutral-900)">
        <circle cx="78" cy="77.7" r="1.05" />
        <circle cx="96" cy="77.7" r="1.05" />
        <circle cx="117" cy="77.7" r="1.05" />
        <circle cx="136" cy="77.7" r="1.05" />
        <circle cx="153" cy="77.7" r="1.05" />
        <circle cx="168" cy="77.7" r="1.05" />
        <circle cx="181" cy="77.7" r="1.05" />
        <circle cx="192" cy="77.7" r="1.05" />
        <circle cx="201" cy="77.7" r="1.05" />
        <circle cx="208" cy="77.7" r="1.05" />
      </g>
      <!-- 纸带标注与引线 -->
      <text x="156" y="61" font-size="12" fill="var(--c-neutral-300)" text-anchor="middle">纸带</text>
      <line x1="156" y1="64" x2="156" y2="74.5" stroke="color-mix(in srgb, var(--c-text-dim) 55%, transparent)" stroke-width="1" />
    </g>
    <!-- ==================== 4. 压在纸带正上方的墨粉纸盘（墨盘）与放电针 ==================== -->
    <!-- 图层在纸带之上：清晰呈现“纸带压在墨盘下”的物理层次 -->
    <g>
      <!-- 墨盘中心转轴支架 -->
      <line x1="58" y1="53" x2="58" y2="67" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" />
      <circle cx="58" cy="53" r="2.2" fill="var(--c-accent)" />
      <!-- 墨粉纸盘（压紧在纸带上表面 y=76 处，带立体椭圆顶面与厚边） -->
      <rect x="39" y="68" width="38" height="8" rx="2" fill="url(#inkDiscGrad)" stroke="var(--c-accent-glow)" stroke-width="1.1" />
      <!-- 墨盘下缘与纸带压合阴影线（强调墨盘压在纸带上方） -->
      <line x1="39.5" y1="76" x2="76.5" y2="76" stroke="#78350f" stroke-width="1.3" />
      <!-- 放电电极尖端与电火花示意点 -->
      <line x1="68" y1="56" x2="64" y2="67.5" stroke="var(--c-neutral-300)" stroke-width="1.4" stroke-linecap="round" />
      <circle cx="64" cy="75.8" r="1.8" fill="var(--c-physics-light)" opacity="0.9" />
      <text x="58" y="93" font-size="11" font-weight="500" fill="var(--c-accent-light)" text-anchor="middle">墨盘</text>
    </g>
    <!-- ==================== 5. 左右限位孔（上下夹口环抱纸带） ==================== -->
    <g>
      <!-- 左限位孔（进纸端 x=27）：上夹耳与下夹耳之间留出 y=75..80 供纸带穿过 -->
      <rect x="24" y="70.5" width="6" height="5" rx="1.2" fill="var(--c-neutral-300)" stroke="var(--c-neutral-900)" stroke-width="0.8" />
      <rect x="24" y="79.8" width="6" height="5" rx="1.2" fill="var(--c-neutral-300)" stroke="var(--c-neutral-900)" stroke-width="0.8" />
      <!-- 右限位孔（出纸端 x=89）：上夹耳与下夹耳环抱纸带 -->
      <rect x="86" y="70.5" width="6.5" height="5" rx="1.2" fill="var(--c-neutral-200)" stroke="var(--c-neutral-900)" stroke-width="0.8" />
      <rect x="86" y="79.8" width="6.5" height="5" rx="1.2" fill="var(--c-neutral-200)" stroke="var(--c-neutral-900)" stroke-width="0.8" />
      <!-- 限位孔指示引线与文字 -->
      <polyline
        points="89.2,70 95,53 101,53"
        fill="none"
        stroke="color-mix(in srgb, var(--c-text-dim) 70%, transparent)"
        stroke-width="1.1"
        stroke-linecap="round"
      />
      <text x="103" y="56" font-size="11" fill="var(--c-neutral-300)">限位孔</text>
    </g>
    <!-- ==================== 6. 实验小车（带尾部纸带夹与贴轨车轮） ==================== -->
    <g>
      <!-- 小车尾部固定纸带的金属夹头 -->
      <rect x="219" y="73.5" width="5" height="8.5" rx="1.2" fill="var(--c-text-dim)" stroke="var(--c-neutral-300)" stroke-width="1" />
      <!-- 小车车体（带顶部配重槽凹口与倒角车头） -->
      <path
        d="M 224 69 L 234 69 L 236 72 L 274 72 L 276 69 L 288 69 A 4 4 0 0 1 292 73 L 292 91 A 3 3 0 0 1 289 94 L 227 94 A 3 3 0 0 1 224 91 Z"
        fill="url(#cartBodyGrad)"
        stroke="var(--c-velocity)"
        stroke-width="1.5"
      />
      <!-- 车头右侧栓绳挂环 -->
      <circle cx="294.5" cy="78" r="2.4" fill="none" stroke="var(--c-velocity-light)" stroke-width="1.5" />
      <!-- 前后车轮（cy=96.5, r=7.5 -> 底部 96.5+7.5=104，刚好与木板上表面相切！） -->
      <g>
        <circle cx="240" cy="96.5" r="7.5" fill="var(--c-neutral-900)" stroke="var(--c-velocity)" stroke-width="1.8" />
        <circle cx="240" cy="96.5" r="2.5" fill="var(--c-velocity-light)" />
        <circle cx="276" cy="96.5" r="7.5" fill="var(--c-neutral-900)" stroke="var(--c-velocity)" stroke-width="1.8" />
        <circle cx="276" cy="96.5" r="2.5" fill="var(--c-velocity-light)" />
      </g>
      <text x="258" y="58" font-size="13" font-weight="600" fill="var(--c-velocity)" text-anchor="middle">小车</text>
    </g>
    <!-- ==================== 7. 细绳、定滑轮支架与悬挂配重 ==================== -->
    <g>
      <!-- 滑轮固定支架（从木板右端夹具斜伸至滑轮轴心 372,89） -->
      <path
        d="M 346 104 L 352 104 L 352 116 L 346 116 Z"
        fill="color-mix(in srgb, var(--c-text-dim) 45%, transparent)"
        stroke="var(--c-text-dim)"
        stroke-width="1"
      />
      <line x1="351" y1="106" x2="372" y2="89" stroke="var(--c-text-dim)" stroke-width="2.8" stroke-linecap="round" />
      <!-- 牵引细绳：水平段 (y=78) 与滑轮顶部相切 -> 绕过滑轮右上 1/4 圆弧 -> 从滑轮最右侧切点 (x=383) 竖直下垂 -->
      <path d="M 297 78 L 372 78 A 11 11 0 0 1 383 89 L 383 131" fill="none" stroke="var(--c-neutral-300)" stroke-width="1.5" stroke-linecap="round" />
      <!-- 定滑轮（cx=372, cy=89, r=11，上缘 89-11=78 严格相切水平细绳，右缘 372+11=383 严格相切竖直细绳） -->
      <circle cx="372" cy="89" r="11" fill="color-mix(in srgb, var(--c-neutral-900) 75%, transparent)" stroke="var(--c-neutral-300)" stroke-width="1.8" />
      <circle cx="372" cy="89" r="7.5" fill="none" stroke="color-mix(in srgb, var(--c-text-dim) 40%, transparent)" stroke-width="1" stroke-dasharray="2.5 2" />
      <circle cx="372" cy="89" r="2.4" fill="var(--c-neutral-200)" />
      <text x="396" y="68" font-size="12" fill="var(--c-text-dim)" text-anchor="end">滑轮</text>
      <!-- 配重（钩码：挂钩 + 双层金属砝码盘，悬挂于竖直细绳正下方 x=383） -->
      <path d="M 383 131 L 383 135" stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round" />
      <rect x="372" y="135" width="22" height="21" rx="3" fill="url(#weightGrad)" stroke="var(--c-accent)" stroke-width="1.4" />
      <!-- 钩码分层刻槽线 -->
      <line x1="373" y1="142" x2="393" y2="142" stroke="color-mix(in srgb, var(--c-accent) 65%, transparent)" stroke-width="1" />
      <line x1="373" y1="149" x2="393" y2="149" stroke="color-mix(in srgb, var(--c-accent) 65%, transparent)" stroke-width="1" />
      <text x="380" y="171" font-size="12" font-weight="500" fill="var(--c-accent)" text-anchor="middle">配重</text>
    </g>
  </svg>
</template>
