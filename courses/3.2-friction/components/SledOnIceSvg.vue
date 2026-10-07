<template>
  <!-- 雪橇在水平冰道上匀速前进：拉力与滑动摩擦力平衡 -->
  <svg viewBox="0 0 340 230" class="fig-svg fig-md" xmlns="http://www.w3.org/2000/svg">
    <!-- ==================== 1. 水平冰道与冰面反光纹理 ==================== -->
    <line x1="18" y1="178" x2="324" y2="178" stroke="var(--c-physics)" stroke-width="2.8" stroke-linecap="round" opacity="0.7" />
    <!-- 冰层水平反光虚线 -->
    <line x1="36" y1="186" x2="108" y2="186" stroke="var(--c-physics)" stroke-width="1.4" stroke-linecap="round" opacity="0.3" />
    <line x1="138" y1="186" x2="226" y2="186" stroke="var(--c-physics)" stroke-width="1.4" stroke-linecap="round" opacity="0.3" />
    <line x1="252" y1="186" x2="306" y2="186" stroke="var(--c-physics)" stroke-width="1.4" stroke-linecap="round" opacity="0.3" />
    <text x="164" y="208" text-anchor="middle" font-size="14" fill="var(--c-physics)">冰道</text>

    <!-- ==================== 2. 载货雪橇上的木箱货物 ==================== -->
    <g stroke-linejoin="round" stroke-linecap="round">
      <!-- 左侧大货箱 -->
      <rect x="88" y="98" width="64" height="46" rx="4" fill="rgba(148,163,184,0.16)" stroke="var(--c-text-dim)" stroke-width="1.8" />
      <line x1="88" y1="121" x2="152" y2="121" stroke="var(--c-text-dim)" stroke-width="1.3" opacity="0.45" />
      <line x1="94" y1="104" x2="146" y2="138" stroke="var(--c-text-dim)" stroke-width="1.3" opacity="0.35" />

      <!-- 右侧小货箱 -->
      <rect x="156" y="112" width="48" height="32" rx="4" fill="rgba(148,163,184,0.14)" stroke="var(--c-text-dim)" stroke-width="1.8" />
      <line x1="162" y1="118" x2="198" y2="138" stroke="var(--c-text-dim)" stroke-width="1.3" opacity="0.35" />
    </g>

    <!-- ==================== 3. 具象化木质雪橇（翘头滑撬板 + 支撑立柱 + 承重底板 + 后护栏） ==================== -->
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- 雪橇后侧斜靠护栏与侧挡杆 -->
      <path d="M 80 144 L 72 96 M 75 114 L 212 114" stroke="var(--c-accent)" stroke-width="2.2" opacity="0.75" />

      <!-- 滑撬与底板之间的三根立柱与斜撑桁架 -->
      <line x1="94" y1="152" x2="94" y2="175" stroke="var(--c-accent)" stroke-width="2.6" />
      <line x1="148" y1="152" x2="148" y2="175" stroke="var(--c-accent)" stroke-width="2.6" />
      <line x1="200" y1="152" x2="200" y2="175" stroke="var(--c-accent)" stroke-width="2.6" />
      <line x1="94" y1="175" x2="148" y2="152" stroke="var(--c-accent)" stroke-width="1.5" opacity="0.55" />
      <line x1="148" y1="175" x2="200" y2="152" stroke="var(--c-accent)" stroke-width="1.5" opacity="0.55" />

      <!-- 雪橇木质承重主底板 -->
      <rect x="76" y="144" width="144" height="8" rx="3" fill="rgba(226,168,70,0.28)" stroke="var(--c-accent)" stroke-width="2.2" />

      <!-- 底部金属滑撬板（后端微翘 + 平直滑行底面 y=176 + 前端经典天鹅颈大弧度翘头卷曲） -->
      <path d="M 68 169 Q 73 176 82 176 L 208 176 C 224 176, 236 164, 234 148 C 233 140, 224 138, 221 144" stroke="var(--c-accent)" stroke-width="3.4" />
      <!-- 承重底板前端与翘头滑撬的连接横梁 -->
      <line x1="220" y1="148" x2="233" y2="148" stroke="var(--c-accent)" stroke-width="2.2" />

      <!-- 雪橇前端牵引金属挂环 -->
      <circle cx="237" cy="152" r="3.2" fill="#0f1425" stroke="var(--c-accent)" stroke-width="2" />
    </g>

    <!-- ==================== 4. 匀速平衡二力（严格等长：均为 86px） ==================== -->
    <!-- 向右的水平牵引拉力 F（86px：240 → 326） -->
    <CourseArrow :from="{ x: 240, y: 152 }" :to="{ x: 326, y: 152 }" stroke="var(--c-accent)" stroke-width="3.4" />
    <text x="286" y="138" text-anchor="middle" font-size="16" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic">F</text>

    <!-- 向左的滑动摩擦力 F_f（86px：154 → 68，沿冰道接触面） -->
    <CourseArrow :from="{ x: 154, y: 178 }" :to="{ x: 68, y: 178 }" stroke="var(--c-danger)" stroke-width="3.4" />
    <text x="50" y="168" text-anchor="middle" font-size="16" fill="var(--c-danger)">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan dy="4" font-size="11">f</tspan>
    </text>
  </svg>
</template>
