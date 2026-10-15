<!-- 第 26 页：光电门测瞬时速度的装置示意图（3D 轴测透视精修版） -->
<script setup lang="ts"></script>

<template>
  <svg
    viewBox="0 0 530 260"
    class="fig-svg"
    style="display: block; width: 100%; max-width: 530px; margin: 0 auto"
    role="img"
    aria-label="光电门测瞬时速度实验装置立体透视示意图"
  >
    <defs>
      <!-- 导轨金属反光渐变 -->
      <linearGradient id="pg3d-rail-top" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="var(--c-neutral-300)" />
        <stop offset="50%" stop-color="var(--c-text-dim)" />
        <stop offset="100%" stop-color="var(--c-neutral-500)" />
      </linearGradient>
      <linearGradient id="pg3d-rail-side" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--c-neutral-600)" />
        <stop offset="100%" stop-color="var(--c-surface-solid)" />
      </linearGradient>

      <!-- 小车金属质感 -->
      <linearGradient id="pg3d-cart-top" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--c-neutral-500)" />
        <stop offset="50%" stop-color="var(--c-neutral-600)" />
        <stop offset="100%" stop-color="var(--c-neutral-700)" />
      </linearGradient>
      <linearGradient id="pg3d-cart-side" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--c-neutral-700)" />
        <stop offset="100%" stop-color="var(--c-neutral-900)" />
      </linearGradient>

      <!-- 遮光板金黄色渐变 -->
      <linearGradient id="pg3d-fin-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--c-accent-light)" />
        <stop offset="50%" stop-color="var(--c-accent-glow)" />
        <stop offset="100%" stop-color="#d97706" />
      </linearGradient>

      <!-- 光电门探头工程塑料外壳 -->
      <linearGradient id="pg3d-sensor-dark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--c-neutral-700)" />
        <stop offset="100%" stop-color="var(--c-neutral-900)" />
      </linearGradient>

      <!-- 数字计时器液晶屏底色 -->
      <linearGradient id="pg3d-lcd-clean" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#022c22" />
        <stop offset="100%" stop-color="#064e3b" />
      </linearGradient>

      <!-- 速度矢量箭头标头 -->
      <marker id="pg3d-arrow-v" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <polygon points="1,1 7,4 1,7 2.5,4" fill="var(--c-physics-light)" />
      </marker>
    </defs>

    <!-- ==================== 1. 实验台桌面阴影 ==================== -->
    <polygon points="56,156 376,236 422,214 102,134" fill="color-mix(in srgb, var(--c-neutral-900) 40%, transparent)" />

    <!-- ==================== 2. 3D 立体力学导轨 ==================== -->
    <!-- 导轨前端截面 -->
    <polygon points="370,235 370,244 416,222 416,213" fill="var(--c-surface-solid)" stroke="var(--c-neutral-700)" stroke-width="1" />
    <!-- 导轨近身侧立面 -->
    <polygon points="58,156 58,165 370,244 370,235" fill="url(#pg3d-rail-side)" stroke="var(--c-neutral-700)" stroke-width="1" />
    <!-- 导轨上表面 -->
    <polygon points="58,156 370,235 416,213 104,134" fill="url(#pg3d-rail-top)" stroke="var(--c-neutral-500)" stroke-width="1" />

    <!-- 导轨轮轨凹槽线 -->
    <line x1="68" y1="151.5" x2="380" y2="230.5" stroke="var(--c-neutral-300)" stroke-width="1.5" />
    <line x1="77" y1="147.5" x2="389" y2="226.5" stroke="var(--c-neutral-600)" stroke-width="1.6" />
    <line x1="85" y1="143.5" x2="397" y2="222.5" stroke="var(--c-neutral-600)" stroke-width="1.6" />
    <line x1="94" y1="139.5" x2="406" y2="218.5" stroke="var(--c-neutral-300)" stroke-width="1.5" />

    <!-- ==================== 3. 铁架台系统 (立在导轨后侧) ==================== -->
    <g class="pg3d-stand">
      <!-- 铁架台重型底座 -->
      <polygon points="268,170 328,185 354,170 294,155" fill="var(--c-neutral-700)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
      <polygon points="268,170 268,178 328,193 328,185" fill="var(--c-surface-solid)" stroke="var(--c-neutral-700)" stroke-width="1.2" />
      <polygon points="328,185 328,193 354,178 354,170" fill="var(--c-neutral-900)" stroke="var(--c-neutral-700)" stroke-width="1.2" />

      <!-- 垂直不锈钢立杆 -->
      <line x1="312" y1="170" x2="312" y2="26" stroke="var(--c-neutral-300)" stroke-width="5.5" stroke-linecap="round" />
      <line x1="310.5" y1="170" x2="310.5" y2="26" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity="0.6" />

      <!-- 十字紧固套夹 -->
      <polygon points="304,90 322,94 322,106 304,102" fill="var(--c-surface-solid)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
      <polygon points="322,94 328,91 328,103 322,106" fill="var(--c-neutral-900)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
      <polygon points="304,90 310,87 328,91 322,94" fill="var(--c-neutral-700)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
      <!-- 紧固旋钮 -->
      <circle cx="333" cy="97" r="3.8" fill="var(--c-neutral-500)" stroke="var(--c-surface-solid)" stroke-width="1" />
      <line x1="333" y1="90" x2="333" y2="104" stroke="var(--c-neutral-300)" stroke-width="1.6" stroke-linecap="round" />

      <!-- 连接光电门的悬伸横杆 (从十字夹直通光电门后壁，无任何多余碎块) -->
      <polygon points="272,99 304,93 304,99 272,105" fill="var(--c-text-dim)" stroke="var(--c-neutral-600)" stroke-width="1" />
    </g>

    <!-- ==================== 4. 纯净统一的 3D U 型光电门探头 ==================== -->
    <g class="pg3d-photogate">
      <!-- 
        光电门探头采用严密闭合的 U 型框架：
        - 后臂 (发射端，位于导轨后方)
        - 顶梁 (平滑横跨导轨上方，悬空避开小车)
        - 前臂 (接收端，位于导轨前方)
        各面几何闭合，无任何悬空小厚度碎块！
      -->

      <!-- 1. U型探头整体顶面 (从后臂顶面经顶梁贯通至前臂顶面，一次性完整闭合封闭多边形) -->
      <polygon points="272,93 252,112 222,118 240,114 262,95 284,97" fill="var(--c-neutral-600)" stroke="var(--c-neutral-500)" stroke-width="1.2" />

      <!-- 2. U型探头近身外侧立面 (前臂与顶梁外侧，完全闭合) -->
      <polygon points="222,118 240,114 240,140 222,144" fill="url(#pg3d-sensor-dark)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
      <!-- 前臂前端倒角立面 -->
      <polygon points="240,114 252,111 252,137 240,140" fill="var(--c-neutral-900)" stroke="var(--c-neutral-700)" stroke-width="1" />

      <!-- 3. 后臂外侧立面 (完全闭合，与横杆紧密相接) -->
      <polygon points="262,95 284,97 284,122 262,119" fill="url(#pg3d-sensor-dark)" stroke="var(--c-neutral-600)" stroke-width="1.2" />

      <!-- 4. 门洞内部内侧立面 (拱门内腔) -->
      <polygon points="252,112 262,119 262,125 252,118" fill="var(--c-neutral-900)" />

      <!-- 红外对射光路：从后臂发射孔直射向前臂接收孔 (横切轨道、穿透纸面方向) -->
      <line x1="268" y1="113" x2="236" y2="134" stroke="#f43f5e" stroke-width="2.2" stroke-dasharray="3 2" />
      <!-- 发射/接收探头圆孔与光斑 -->
      <circle cx="268" cy="113" r="2.2" fill="#ef4444" stroke="#7f1d1d" stroke-width="0.8" />
      <circle cx="236" cy="134" r="2.2" fill="var(--c-physics-light)" stroke="#0369a1" stroke-width="0.8" />
      <circle cx="252" cy="123.5" r="3" fill="rgba(244,63,94,0.3)" />

      <!-- 前臂工作指示灯 (绿色小点) -->
      <circle cx="228" cy="125" r="1.8" fill="#10b981" />

      <!-- 文字标注：光电门 -->
      <text x="256" y="80" font-size="12" font-weight="700" fill="var(--c-physics-light)" text-anchor="middle">光电门</text>
      <line x1="256" y1="84" x2="256" y2="94" stroke="var(--c-physics-light)" stroke-width="1.2" stroke-dasharray="2 2" />

      <!-- 文字标注：光束 -->
      <text x="282" y="136" font-size="11" font-weight="600" fill="#fb7185">光束</text>
      <line x1="278" y1="132" x2="255" y2="124" stroke="#fb7185" stroke-width="1" stroke-dasharray="2 2" />
    </g>

    <!-- ==================== 5. 3D 小车系统 (极窄竖直鳍片遮光板) ==================== -->
    <g class="pg3d-cart">
      <!-- 4 个低阻力轴承车轮 -->
      <ellipse cx="120" cy="144" rx="4.5" ry="7" fill="var(--c-neutral-500)" stroke="var(--c-neutral-900)" stroke-width="1.2" />
      <ellipse cx="204" cy="165" rx="4.5" ry="7" fill="var(--c-neutral-500)" stroke="var(--c-neutral-900)" stroke-width="1.2" />
      <ellipse cx="106" cy="157" rx="5" ry="8" fill="var(--c-text-dim)" stroke="var(--c-neutral-900)" stroke-width="1.4" />
      <ellipse cx="106" cy="157" rx="2" ry="3.5" fill="var(--c-neutral-200)" />
      <ellipse cx="190" cy="178" rx="5" ry="8" fill="var(--c-text-dim)" stroke="var(--c-neutral-900)" stroke-width="1.4" />
      <ellipse cx="190" cy="178" rx="2" ry="3.5" fill="var(--c-neutral-200)" />

      <!-- 小车底盘主体 -->
      <polygon points="98,154 196,178.5 196,163.5 98,139" fill="url(#pg3d-cart-side)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
      <polygon points="196,178.5 220,166.5 220,151.5 196,163.5" fill="var(--c-surface-solid)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
      <polygon points="98,139 196,163.5 220,151.5 122,127" fill="url(#pg3d-cart-top)" stroke="var(--c-neutral-500)" stroke-width="1.4" />

      <!-- 
        === 极窄直立鳍片遮光板 ===
        严格缩小宽度（沿运动方向宽度仅 6px），真实呈现“狭窄薄板”特征！
      -->
      <!-- 遮光板底座卡槽 -->
      <polygon points="148,148.5 156,150.5 159,149 151,147" fill="var(--c-neutral-700)" stroke="var(--c-surface-solid)" stroke-width="1" />

      <!-- 遮光板侧立面 (超薄鳍片) -->
      <polygon points="150,149 156,150.5 156,100.5 150,99" fill="url(#pg3d-fin-grad)" stroke="#b45309" stroke-width="1.2" />
      <!-- 遮光板后侧厚度微小侧影 -->
      <polygon points="156,150.5 157.5,149.8 157.5,99.8 156,100.5" fill="#b45309" />
      <!-- 遮光板极窄顶边 -->
      <polygon points="150,99 156,100.5 157.5,99.8 151.5,98.3" fill="#fde68a" stroke="#d97706" stroke-width="0.8" />

      <!-- 遮光板顶部宽度 d 双向尺寸标注线 -->
      <g stroke="var(--c-accent-glow)" stroke-width="1.2">
        <line x1="145" y1="93" x2="161" y2="97" />
        <polygon points="145,93 149,91.5 148,95.5" fill="var(--c-accent-glow)" />
        <polygon points="161,97 157,94.5 158,98.5" fill="var(--c-accent-glow)" />
        <line x1="150" y1="99" x2="145" y2="93" stroke-dasharray="2 2" stroke-width="1" />
        <line x1="156" y1="100.5" x2="161" y2="97" stroke-dasharray="2 2" stroke-width="1" />
      </g>
      <!-- 宽度参数 d 符号 -->
      <text x="153" y="87" font-size="13" font-weight="700" font-family="KaTeX_Math, serif" font-style="italic" fill="var(--c-accent-glow)" text-anchor="middle">d</text>

      <!-- 纯净标注：遮光板 (已彻底去除多余的括号) -->
      <text x="116" y="96" font-size="12" font-weight="600" fill="var(--c-accent-glow)" text-anchor="end">遮光板</text>
      <line x1="122" y1="94" x2="147" y2="97" stroke="var(--c-accent-glow)" stroke-width="1.2" stroke-dasharray="3 2" />

      <!-- 运动速度矢量箭头 v -->
      <line x1="184" y1="142" x2="236" y2="155" stroke="var(--c-physics-light)" stroke-width="2.8" marker-end="url(#pg3d-arrow-v)" />
      <text x="220" y="142" font-size="14" font-family="KaTeX_Math, serif" font-style="italic" fill="var(--c-physics-light)">v</text>
    </g>

    <!-- ==================== 6. 数据信号连接线 (从光电门直接连通数字计时器) ==================== -->
    <path d="M 284 105 C 324 95, 350 114, 388 132" fill="none" stroke="var(--c-neutral-500)" stroke-width="2.6" stroke-linecap="round" />
    <path d="M 284 105 C 324 95, 350 114, 388 132" fill="none" stroke="var(--c-text-dim)" stroke-width="1" stroke-linecap="round" opacity="0.6" />

    <!-- ==================== 7. 纯净台式数字计时器 (去除多余Δt与按钮，突出设备本身) ==================== -->
    <g class="pg3d-timer" transform="translate(388, 114)">
      <!-- 计时器底座在桌面上的投影 -->
      <polygon points="0,52 92,52 112,40 20,40" fill="color-mix(in srgb, var(--c-neutral-900) 45%, transparent)" />

      <!-- 计时器立体外壳 (简洁现代化实验台式仪器) -->
      <!-- 侧立面 -->
      <polygon points="92,52 112,40 112,2 92,14" fill="var(--c-neutral-900)" stroke="var(--c-neutral-700)" stroke-width="1.2" />
      <!-- 前立面 -->
      <polygon points="0,52 92,52 92,14 0,14" fill="var(--c-surface-solid)" stroke="var(--c-neutral-700)" stroke-width="1.2" />
      <!-- 倾斜顶面/视窗面板 -->
      <polygon points="0,14 92,14 112,2 20,2" fill="var(--c-neutral-700)" stroke="var(--c-neutral-600)" stroke-width="1.4" />

      <!-- 纯净液晶显示窗 -->
      <polygon points="14,14 80,14 96,4 30,4" fill="url(#pg3d-lcd-clean)" stroke="#047857" stroke-width="1.2" />

      <!-- 直接清晰标明：数字计时器 (无多余Δt与繁琐按键，集中突出与光电门的连线关系) -->
      <text x="46" y="36" font-size="12" font-weight="700" fill="var(--c-neutral-200)" text-anchor="middle" letter-spacing="0.5">数字计时器</text>
    </g>
  </svg>
</template>

<style scoped>
.fig-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
