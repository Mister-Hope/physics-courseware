<template>
  <!-- 第 22 页截面图：中空三角导轨内部通入压缩空气，从两侧斜面气孔喷出，在导轨与滑块间形成气层托起滑块 -->
  <svg viewBox="0 0 300 250" width="100%" style="max-width: 254px" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="atsRailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(226,232,240,0.38)" />
        <stop offset="100%" stop-color="rgba(71,85,105,0.45)" />
      </linearGradient>
      <linearGradient id="atsRiderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(96,165,250,0.5)" />
        <stop offset="100%" stop-color="rgba(29,78,216,0.45)" />
      </linearGradient>
      <linearGradient id="atsAirGlow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(56,189,248,0.34)" />
        <stop offset="100%" stop-color="rgba(56,189,248,0.12)" />
      </linearGradient>
    </defs>

    <!-- ==================== 1. 实验桌面接触面（复用 SurfaceHatch）与导轨底座支脚 ==================== -->
    <SurfaceHatch :from="{ x: 32, y: 192 }" :to="{ x: 268, y: 192 }" side="below" color="#64748b" :line-width="2" :thickness="10" :gap="18" />

    <!-- 导轨左右支撑底座 -->
    <path d="M 80 168 L 76 192 L 90 192 L 94 168 Z" fill="rgba(148,163,184,0.32)" stroke="#94a3b8" stroke-width="1.2" />
    <path d="M 206 168 L 210 192 L 224 192 L 220 168 Z" fill="rgba(148,163,184,0.32)" stroke="#94a3b8" stroke-width="1.2" />

    <!-- ==================== 2. 导轨与滑块之间的高压气垫层（气层） ==================== -->
    <!--
      导轨两侧外斜面：顶点 (150, 92) → 左底 (72, 170) [x + y = 242]、右底 (228, 170) [y - x = -58]
      滑块两侧内斜面：内顶点 (150, 74) → 左下内沿 (78, 146) [x + y = 224]、右下内沿 (222, 146) [y - x = -76]
      两者之间有着均匀的 18px 竖直气垫间隙（法向厚度 12.7px），填充柔和气膜辉光
    -->
    <path d="M 78 146 L 150 74 L 222 146 L 213 155 L 150 92 L 87 155 Z" fill="url(#atsAirGlow)" />

    <!-- ==================== 3. 三角形气垫导轨横截面（带内部中空高压气室与两侧斜面贯通气孔） ==================== -->
    <!-- 导轨三角形金属外壳 -->
    <path d="M 150 92 L 72 170 L 228 170 Z" fill="url(#atsRailGrad)" stroke="#94a3b8" stroke-width="1.6" stroke-linejoin="round" />

    <!-- 导轨内部中空输气腔（高压气室），直观解释气流来源 -->
    <path d="M 150 116 L 104 160 L 196 160 Z" fill="rgba(15,23,42,0.82)" stroke="rgba(125,211,252,0.45)" stroke-width="1.3" stroke-linejoin="round" />
    <text x="150" y="151" font-size="10.5" fill="#7dd3fc" text-anchor="middle" opacity="0.9">通气腔</text>

    <!-- 两侧斜面上的贯通式喷气孔通道（垂直于 45° 斜面贯通内腔与外表面） -->
    <g stroke="#38bdf8" stroke-width="2.6" stroke-linecap="round">
      <!-- 左斜面上下两个气孔通道：外表面在 (124, 118) 与 (100, 142) -->
      <line x1="131" y1="125" x2="124" y2="118" />
      <line x1="107" y1="149" x2="100" y2="142" />
      <!-- 右斜面上下两个气孔通道：外表面在 (176, 118) 与 (200, 142) -->
      <line x1="169" y1="125" x2="176" y2="118" />
      <line x1="193" y1="149" x2="200" y2="142" />
    </g>

    <!-- 气孔外表面出口圆点 -->
    <g fill="#0f172a" stroke="#7dd3fc" stroke-width="1.3">
      <circle cx="124" cy="118" r="2.6" />
      <circle cx="100" cy="142" r="2.6" />
      <circle cx="176" cy="118" r="2.6" />
      <circle cx="200" cy="142" r="2.6" />
    </g>

    <!-- ==================== 4. 气孔喷出的托举气流箭头（严格止于滑块内壁 x+y=224，绝不刺穿滑块！） ==================== -->
    <CourseArrow :from="{ x: 124, y: 118 }" :to="{ x: 115.2, y: 109.2 }" :head-size="6.5" :head-width="5.5" stroke="#38bdf8" stroke-width="2" />
    <CourseArrow :from="{ x: 100, y: 142 }" :to="{ x: 91.2, y: 133.2 }" :head-size="6.5" :head-width="5.5" stroke="#38bdf8" stroke-width="2" />
    <CourseArrow :from="{ x: 176, y: 118 }" :to="{ x: 184.8, y: 109.2 }" :head-size="6.5" :head-width="5.5" stroke="#38bdf8" stroke-width="2" />
    <CourseArrow :from="{ x: 200, y: 142 }" :to="{ x: 208.8, y: 133.2 }" :head-size="6.5" :head-width="5.5" stroke="#38bdf8" stroke-width="2" />

    <!-- 沿气垫间隙向两侧溢出的微气流虚线 -->
    <line x1="144" y1="89" x2="80" y2="153" stroke="#7dd3fc" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.75" />
    <line x1="156" y1="89" x2="220" y2="153" stroke="#7dd3fc" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.75" />

    <!-- ==================== 5. 悬浮在气层上的倒 V 形滑块（带顶部遮光条端面） ==================== -->
    <g stroke-linejoin="round">
      <!-- 滑块倒 V 形横截面壳体：内壁顶点 (150, 74)，外壁顶点 (150, 52) -->
      <path d="M 78 124 L 150 52 L 222 124 L 222 146 L 150 74 L 78 146 Z" fill="url(#atsRiderGrad)" stroke="#60a5fa" stroke-width="1.7" />
      <!-- 滑块顶部挡光片（遮光条）与固定卡座横截面 -->
      <rect x="142" y="47" width="16" height="5" rx="1.2" fill="#3b82f6" stroke="#93c5fd" stroke-width="1" />
      <rect x="147.5" y="28" width="5" height="19" rx="1.2" fill="#38bdf8" stroke="#bae6fd" stroke-width="1" />
    </g>

    <!-- ==================== 6. 部件引线与清晰标注 ==================== -->
    <!-- 滑块标注 -->
    <text x="192" y="42" font-size="13" font-weight="600" fill="#60a5fa" text-anchor="start">滑块</text>
    <line x1="188" y1="44" x2="165" y2="62" stroke="rgba(96,165,250,0.65)" stroke-width="1.2" />

    <!-- 气层（气垫）标注 -->
    <text x="244" y="96" font-size="12" font-weight="500" fill="#38bdf8" text-anchor="start">气层</text>
    <line x1="240" y1="96" x2="181" y2="112" stroke="rgba(56,189,248,0.65)" stroke-width="1.2" />

    <!-- 气孔标注 -->
    <text x="18" y="112" font-size="12" font-weight="500" fill="#93c5fd" text-anchor="start">气孔</text>
    <line x1="46" y1="114" x2="98" y2="141" stroke="rgba(147,197,253,0.65)" stroke-width="1.2" />

    <!-- 导轨标注 -->
    <text x="276" y="156" font-size="12" fill="#94a3b8" text-anchor="end">导轨</text>
    <line x1="248" y1="154" x2="218" y2="160" stroke="rgba(148,163,184,0.65)" stroke-width="1.2" />
  </svg>
</template>
