<template>
  <!-- 第 12 页：拉伸、压缩、扭转、弯曲四种形变 -->
  <svg class="fig w-full h-auto" viewBox="0 0 640 150" style="max-width: 100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 弹性体金属/橡胶立体表面渐变（无空格 rgba 兼容 UnoCSS attributify） -->
      <linearGradient id="deformBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(226,232,240,0.32)" />
        <stop offset="50%" stop-color="rgba(148,163,184,0.16)" />
        <stop offset="100%" stop-color="rgba(71,85,105,0.34)" />
      </linearGradient>
      <!-- 扭转圆柱体立体高光渐变 -->
      <linearGradient id="torsionCylGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(203,213,225,0.38)" />
        <stop offset="35%" stop-color="rgba(148,163,184,0.18)" />
        <stop offset="100%" stop-color="rgba(30,41,59,0.55)" />
      </linearGradient>
      <!-- 扭转力偶弧线小箭头 -->
      <marker id="torqueArrowHead" markerWidth="6.5" markerHeight="6.5" refX="3.2" refY="3.2" orient="auto" markerUnits="userSpaceOnUse" viewBox="0 0 6.5 6.5">
        <path d="M 0 0.6 L 6 3.25 L 0 5.9 z" fill="#a78bfa" />
      </marker>
    </defs>

    <!-- ==================== 1. 拉伸 (Tension, x_center = 95) ==================== -->
    <g>
      <!-- 形变前原长虚线参考框 -->
      <rect x="52" y="63" width="86" height="26" rx="3" fill="none" stroke="rgba(148,163,184,0.32)" stroke-width="1.3" stroke-dasharray="3.5 3" />
      <!-- 拉伸后：两端向外伸长、中部略微缩颈的弹性杆 -->
      <path
        d="M 38 65 Q 95 68.5 152 65 A 3 3 0 0 1 155 68 L 155 84 A 3 3 0 0 1 152 87 Q 95 83.5 38 87 A 3 3 0 0 1 35 84 L 35 68 A 3 3 0 0 1 38 65 Z"
        fill="url(#deformBodyGrad)"
        stroke="#cbd5e1"
        stroke-width="2.2"
      />
      <!-- 内部被拉宽的网格刻线 -->
      <g stroke="rgba(203,213,225,0.42)" stroke-width="1.3">
        <line x1="65" y1="66.2" x2="65" y2="85.8" />
        <line x1="95" y1="66.8" x2="95" y2="85.2" />
        <line x1="125" y1="66.2" x2="125" y2="85.8" />
      </g>
      <!-- 向两侧拉开的外力箭头 -->
      <CourseArrow :from="{ x: 78, y: 40 }" :to="{ x: 30, y: 40 }" stroke="#e2a846" stroke-width="2.6" />
      <CourseArrow :from="{ x: 112, y: 40 }" :to="{ x: 160, y: 40 }" stroke="#e2a846" stroke-width="2.6" />
      <text x="95" y="128" text-anchor="middle" font-size="16" fill="#94a3b8">拉伸</text>
    </g>

    <!-- ==================== 2. 压缩 (Compression, x_center = 255) ==================== -->
    <g>
      <!-- 形变前原长虚线参考框 -->
      <rect x="202" y="65" width="106" height="22" rx="3" fill="none" stroke="rgba(148,163,184,0.32)" stroke-width="1.3" stroke-dasharray="3.5 3" />
      <!-- 压缩后：横向缩短、上下中部微鼓的弹性块 -->
      <path
        d="M 216 64 Q 255 58.5 294 64 A 3.5 3.5 0 0 1 297.5 67.5 L 297.5 84.5 A 3.5 3.5 0 0 1 294 88 Q 255 93.5 216 88 A 3.5 3.5 0 0 1 212.5 84.5 L 212.5 67.5 A 3.5 3.5 0 0 1 216 64 Z"
        fill="url(#deformBodyGrad)"
        stroke="#cbd5e1"
        stroke-width="2.2"
      />
      <!-- 内部被挤密的网格刻线 -->
      <g stroke="rgba(203,213,225,0.45)" stroke-width="1.3">
        <line x1="236" y1="62.2" x2="236" y2="89.8" />
        <line x1="255" y1="61.3" x2="255" y2="90.7" />
        <line x1="274" y1="62.2" x2="274" y2="89.8" />
      </g>
      <!-- 向中间挤压的箭头（往两侧拉开起点，尖端留出 24px 间距，绝不重叠） -->
      <CourseArrow :from="{ x: 197, y: 40 }" :to="{ x: 243, y: 40 }" stroke="#60a5fa" stroke-width="2.6" />
      <CourseArrow :from="{ x: 313, y: 40 }" :to="{ x: 267, y: 40 }" stroke="#60a5fa" stroke-width="2.6" />
      <text x="255" y="128" text-anchor="middle" font-size="16" fill="#94a3b8">压缩</text>
    </g>

    <!-- ==================== 3. 扭转 (3D Torsion Cylinder, x_center = 420) ==================== -->
    <g>
      <!-- 3D 圆柱体主体轮廓（中部因受扭产生轻微立体收束） -->
      <path d="M 374 60 Q 420 62.5 466 60 L 466 92 Q 420 89.5 374 92 Z" fill="url(#torsionCylGrad)" />
      <!-- 圆柱体右端面半椭圆（后半隐线 + 前半实线） -->
      <ellipse cx="466" cy="76" rx="7.5" ry="16" fill="rgba(30,41,59,0.75)" stroke="#cbd5e1" stroke-width="2.1" />
      <!-- 圆柱体上下母线边廓 -->
      <path d="M 374 60 Q 420 62.5 466 60 M 374 92 Q 420 89.5 466 92" fill="none" stroke="#cbd5e1" stroke-width="2.2" stroke-linecap="round" />
      <!-- 圆柱体内部截面椭圆环（辅助体现三维体积感） -->
      <path d="M 405 61.2 A 6.5 14.8 0 0 1 405 90.8" fill="none" stroke="rgba(148,163,184,0.4)" stroke-width="1.3" />
      <path d="M 435 61.2 A 6.5 14.8 0 0 1 435 90.8" fill="none" stroke="rgba(148,163,184,0.4)" stroke-width="1.3" />
      <!-- 圆柱表面原本水平的母线受扭后呈 S 形螺旋缠绕线（核心视觉特征） -->
      <g fill="none" stroke="#a78bfa" stroke-width="1.75" stroke-linecap="round" opacity="0.92">
        <path d="M 380 63 C 404 63, 434 89, 459 89" />
        <path d="M 381 76 C 406 62, 434 90, 460 76" stroke="rgba(226,232,240,0.85)" stroke-width="1.5" />
        <path d="M 380 89 C 404 89, 434 63, 459 63" stroke="rgba(167,139,250,0.55)" stroke-dasharray="3 2.5" />
      </g>
      <!-- 圆柱体左端面完整三维椭圆 + 端面径向扭转指针线 -->
      <ellipse cx="374" cy="76" rx="7.5" ry="16" fill="rgba(51,65,85,0.88)" stroke="#cbd5e1" stroke-width="2.2" />
      <line x1="374" y1="76" x2="378" y2="63" stroke="#a78bfa" stroke-width="1.8" stroke-linecap="round" />
      <line x1="466" y1="76" x2="462" y2="89" stroke="#a78bfa" stroke-width="1.8" stroke-linecap="round" />

      <!-- 左端逆时针/向上扭转 3D 弧线箭头，右端顺时针/向下扭转 3D 弧线箭头 -->
      <path d="M 358 88 C 351 79, 353 61, 366 52" fill="none" stroke="#a78bfa" stroke-width="2.2" stroke-linecap="round" marker-end="url(#torqueArrowHead)" />
      <path d="M 476 52 C 487 61, 489 79, 478 88" fill="none" stroke="#a78bfa" stroke-width="2.2" stroke-linecap="round" marker-end="url(#torqueArrowHead)" />
      <text x="420" y="128" text-anchor="middle" font-size="16" fill="#94a3b8">扭转</text>
    </g>

    <!-- ==================== 4. 弯曲 (Downward Bending, x_center = 570) ==================== -->
    <g>
      <!-- 形变前水平未弯曲虚线参考位置 -->
      <line x1="516" y1="62" x2="624" y2="62" stroke="rgba(148,163,184,0.35)" stroke-width="1.4" stroke-dasharray="3.5 3" />
      <!-- 两端支座小三角 (支点) -->
      <polygon points="518,73 512,83 524,83" fill="rgba(148,163,184,0.35)" stroke="#94a3b8" stroke-width="1.4" stroke-linejoin="round" />
      <polygon points="622,73 616,83 628,83" fill="rgba(148,163,184,0.35)" stroke="#94a3b8" stroke-width="1.4" stroke-linejoin="round" />

      <!-- 受向下压力后向下凹陷弯曲的弹性横梁（厚度 12px） -->
      <path d="M 516 58 Q 570 92 624 58 L 627 69 Q 570 104 513 69 Z" fill="url(#deformBodyGrad)" stroke="#cbd5e1" stroke-width="2.2" stroke-linejoin="round" />
      <!-- 横梁内部中性层虚线（展现上压下伸的弯曲物理本质） -->
      <path d="M 514.5 63.5 Q 570 98 625.5 63.5" fill="none" stroke="rgba(45,212,191,0.55)" stroke-width="1.3" stroke-dasharray="3 2.5" />

      <!-- 向下压在横梁中点的外力箭头（箭头尖端精准落在弯曲后的横梁上表面 y=74） -->
      <CourseArrow :from="{ x: 570, y: 26 }" :to="{ x: 570, y: 74 }" stroke="#2dd4bf" stroke-width="2.8" />
      <text x="570" y="128" text-anchor="middle" font-size="16" fill="#94a3b8">弯曲</text>
    </g>
  </svg>
</template>
