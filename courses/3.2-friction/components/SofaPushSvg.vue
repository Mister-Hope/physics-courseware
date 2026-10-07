<template>
  <!-- 推沙发没有推动：推力与静摩擦力二力平衡 -->
  <svg viewBox="0 60 320 160" class="fig-svg fig-fill" xmlns="http://www.w3.org/2000/svg">
    <!-- 地面与斜剖线 -->
    <SurfaceHatch :from="{ x: 18, y: 180 }" :to="{ x: 304, y: 180 }" side="below" :thickness="14" :gap="50" />
    <line x1="18" y1="180" x2="304" y2="180" stroke="#cbd5e1" stroke-width="2.2" />

    <!-- ==================== 双人软包沙发（x: 96..284, y: 78..180） ==================== -->
    <g stroke-linejoin="round" stroke-linecap="round">
      <!-- 左右实木沙发支撑脚（底边 y=180 贴合地面） -->
      <path d="M 108 168 L 120 168 L 118 180 L 110 180 Z" fill="rgba(148,163,184,0.35)" stroke="var(--c-accent-2)" stroke-width="1.8" />
      <path d="M 260 168 L 272 168 L 270 180 L 262 180 Z" fill="rgba(148,163,184,0.35)" stroke="var(--c-accent-2)" stroke-width="1.8" />

      <!-- 沙发高靠背（双靠包造型） -->
      <rect x="112" y="78" width="156" height="54" rx="12" fill="rgba(96,165,250,0.14)" stroke="var(--c-accent-2)" stroke-width="2.2" />
      <!-- 靠背中缝与拉扣细节 -->
      <line x1="190" y1="82" x2="190" y2="124" stroke="var(--c-accent-2)" stroke-width="1.5" opacity="0.5" />
      <circle cx="151" cy="102" r="2" fill="var(--c-accent-2)" opacity="0.55" />
      <circle cx="229" cy="102" r="2" fill="var(--c-accent-2)" opacity="0.55" />

      <!-- 沙发双人厚座垫 -->
      <rect x="112" y="122" width="156" height="28" rx="7" fill="rgba(96,165,250,0.22)" stroke="var(--c-accent-2)" stroke-width="2" />
      <line x1="190" y1="124" x2="190" y2="148" stroke="var(--c-accent-2)" stroke-width="1.5" opacity="0.55" />

      <!-- 沙发底部承重底座框 -->
      <rect x="102" y="150" width="176" height="18" rx="5" fill="rgba(15,20,37,0.85)" stroke="var(--c-accent-2)" stroke-width="2" />
      <rect x="102" y="150" width="176" height="18" rx="5" fill="rgba(96,165,250,0.18)" stroke="var(--c-accent-2)" stroke-width="2" />

      <!-- 左右弧形宽扶手（遮挡靠背与座垫两侧交界，形成立体包裹感） -->
      <rect x="96" y="102" width="22" height="66" rx="9" fill="#0f1425" stroke="var(--c-accent-2)" stroke-width="2.2" />
      <rect x="96" y="102" width="22" height="66" rx="9" fill="rgba(96,165,250,0.26)" stroke="var(--c-accent-2)" stroke-width="2.2" />
      <rect x="262" y="102" width="22" height="66" rx="9" fill="#0f1425" stroke="var(--c-accent-2)" stroke-width="2.2" />
      <rect x="262" y="102" width="22" height="66" rx="9" fill="rgba(96,165,250,0.26)" stroke="var(--c-accent-2)" stroke-width="2.2" />
    </g>

    <text x="190" y="164" text-anchor="middle" font-size="14" fill="var(--c-text)">沙发</text>

    <!-- ==================== 二力平衡矢量（严格等长：均为 76px） ==================== -->
    <!-- 向右的水平推力（76px：20 → 96，作用于沙发左扶手） -->
    <CourseArrow :from="{ x: 20, y: 136 }" :to="{ x: 96, y: 136 }" stroke="var(--c-accent)" stroke-width="3.4" />
    <text x="54" y="122" text-anchor="middle" font-size="15" fill="var(--c-accent)">推力</text>

    <!-- 向左的静摩擦力（76px：190 → 114，沿地面接触面阻碍相对运动趋势） -->
    <CourseArrow :from="{ x: 190, y: 180 }" :to="{ x: 114, y: 180 }" stroke="var(--c-physics)" stroke-width="3.4" />
    <text x="152" y="208" text-anchor="middle" font-size="15" fill="var(--c-physics)">静摩擦力</text>
  </svg>
</template>
