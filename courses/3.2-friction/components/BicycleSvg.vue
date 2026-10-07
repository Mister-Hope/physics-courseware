<template>
  <!-- 自行车前轮（从动）与后轮（驱动）受到的静摩擦力方向 -->
  <svg viewBox="0 90 400 196" class="fig-svg fig-md w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 车轮内腔径向暗角渐变，增强质感且不抢视线 -->
      <radialGradient id="wheelWellRear" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(15,20,37,0.25)" />
        <stop offset="78%" stop-color="rgba(15,20,37,0.55)" />
        <stop offset="100%" stop-color="rgba(56,189,248,0.16)" />
      </radialGradient>
      <radialGradient id="wheelWellFront" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(15,20,37,0.25)" />
        <stop offset="78%" stop-color="rgba(15,20,37,0.55)" />
        <stop offset="100%" stop-color="rgba(96,165,250,0.16)" />
      </radialGradient>
      <!-- 车轮顺时针转动方向小箭头 -->
      <marker id="rotArrowRear" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto" markerUnits="userSpaceOnUse" viewBox="0 0 6 6">
        <path d="M 0 0.5 L 5.5 3 L 0 5.5 z" fill="var(--c-accent-2)" />
      </marker>
      <marker id="rotArrowFront" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto" markerUnits="userSpaceOnUse" viewBox="0 0 6 6">
        <path d="M 0 0.5 L 5.5 3 L 0 5.5 z" fill="var(--c-physics)" />
      </marker>
    </defs>

    <!-- 水平地面与斜剖线 -->
    <SurfaceHatch :from="{ x: 12, y: 250 }" :to="{ x: 388, y: 250 }" side="below" :thickness="12" :gap="60" />

    <!-- ==================== 后轮 (驱动轮 cx=104, cy=196, r=54) ==================== -->
    <g>
      <!-- 轮胎外圈与车圈双层结构 -->
      <circle cx="104" cy="196" r="52.5" fill="url(#wheelWellRear)" stroke="rgba(148,163,184,0.28)" stroke-width="3" />
      <!-- 均匀 12 根辐条 (6 组直径线，每 30° 旋转) -->
      <g stroke="rgba(148,163,184,0.38)" stroke-width="1">
        <line x1="104" y1="147" x2="104" y2="245" />
        <line x1="104" y1="147" x2="104" y2="245" transform="rotate(30 104 196)" />
        <line x1="104" y1="147" x2="104" y2="245" transform="rotate(60 104 196)" />
        <line x1="104" y1="147" x2="104" y2="245" transform="rotate(90 104 196)" />
        <line x1="104" y1="147" x2="104" y2="245" transform="rotate(120 104 196)" />
        <line x1="104" y1="147" x2="104" y2="245" transform="rotate(150 104 196)" />
      </g>
      <!-- 亮色轮圈 -->
      <circle cx="104" cy="196" r="49" fill="none" stroke="var(--c-accent-2)" stroke-width="2.4" />
      <!-- 顺时针旋转方向示意弧 -->
      <path
        d="M 84 166 A 36 36 0 0 1 122 165"
        fill="none"
        stroke="var(--c-accent-2)"
        stroke-width="1.8"
        stroke-linecap="round"
        opacity="0.88"
        marker-end="url(#rotArrowRear)"
      />
    </g>

    <!-- ==================== 前轮 (从动轮 cx=306, cy=196, r=54) ==================== -->
    <g>
      <!-- 轮胎外圈与车圈双层结构 -->
      <circle cx="306" cy="196" r="52.5" fill="url(#wheelWellFront)" stroke="rgba(148,163,184,0.28)" stroke-width="3" />
      <!-- 均匀 12 根辐条 -->
      <g stroke="rgba(148,163,184,0.38)" stroke-width="1">
        <line x1="306" y1="147" x2="306" y2="245" />
        <line x1="306" y1="147" x2="306" y2="245" transform="rotate(30 306 196)" />
        <line x1="306" y1="147" x2="306" y2="245" transform="rotate(60 306 196)" />
        <line x1="306" y1="147" x2="306" y2="245" transform="rotate(90 306 196)" />
        <line x1="306" y1="147" x2="306" y2="245" transform="rotate(120 306 196)" />
        <line x1="306" y1="147" x2="306" y2="245" transform="rotate(150 306 196)" />
      </g>
      <!-- 亮色轮圈 -->
      <circle cx="306" cy="196" r="49" fill="none" stroke="var(--c-physics)" stroke-width="2.4" />
      <!-- 顺时针旋转方向示意弧 -->
      <path
        d="M 286 166 A 36 36 0 0 1 324 165"
        fill="none"
        stroke="var(--c-physics)"
        stroke-width="1.8"
        stroke-linecap="round"
        opacity="0.88"
        marker-end="url(#rotArrowFront)"
      />
    </g>

    <!-- ==================== 远端（左侧内层）曲柄与脚蹬 ==================== -->
    <g opacity="0.68">
      <line x1="192" y1="198" x2="178" y2="179" stroke="var(--c-text-dim)" stroke-width="2.8" stroke-linecap="round" />
      <rect x="170" y="176.6" width="15" height="4.4" rx="2.2" fill="var(--c-text)" stroke="#0f1425" stroke-width="1" />
    </g>

    <!-- ==================== 链条与齿轮传动系统 (Drivetrain) ==================== -->
    <g>
      <!-- 链条上下切线（底线 + 链节虚线纹理） -->
      <path d="M 104 187.5 L 192 184.5 M 192 211.5 L 104 204.5" stroke="var(--c-accent)" stroke-width="1.6" opacity="0.65" />
      <path
        d="M 104 187.5 L 192 184.5 M 192 211.5 L 104 204.5"
        stroke="var(--c-accent)"
        stroke-width="2.4"
        stroke-dasharray="2.5 3.5"
        stroke-linecap="round"
        opacity="0.9"
      />
      <!-- 后轮飞轮 (Rear Sprocket) -->
      <circle cx="104" cy="196" r="8.5" fill="rgba(15,20,37,0.85)" stroke="var(--c-accent)" stroke-width="2.2" stroke-dasharray="3 1.5" />
      <!-- 中轴大牙盘 (Front Chainring) -->
      <circle cx="192" cy="198" r="13.5" fill="rgba(15,20,37,0.8)" stroke="var(--c-accent)" stroke-width="2.4" />
      <circle cx="192" cy="198" r="9" fill="none" stroke="var(--c-accent)" stroke-width="1.2" stroke-dasharray="3.5 2.5" opacity="0.7" />
    </g>

    <!-- ==================== 自行车车架几何 (Diamond Frame & Fork) ==================== -->
    <!-- 座管伸出杆与把立底层 -->
    <g stroke="var(--c-text)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.78">
      <!-- 座管延伸 (Seatpost) -->
      <line x1="168" y1="126" x2="162" y2="107" />
      <!-- 把立与弯把 (Stem & Handlebar) -->
      <path d="M 274 116 L 269 101 L 284 99 C 294 99, 297 109, 286 112" />
    </g>

    <!-- 主车架双三角 + 弧形前叉 -->
    <g stroke="var(--c-text)" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.9">
      <!-- 后下叉 (Chainstay) 与 后上叉 (Seatstay) -->
      <line x1="104" y1="196" x2="192" y2="198" stroke-width="3.2" />
      <line x1="104" y1="196" x2="168" y2="126" stroke-width="3" />
      <!-- 立管 (Seat Tube) -->
      <line x1="192" y1="198" x2="168" y2="126" stroke-width="3.8" />
      <!-- 上管 (Top Tube) -->
      <line x1="168" y1="126" x2="274" y2="117" stroke-width="3.6" />
      <!-- 下管 (Down Tube：连接五通与头管下端) -->
      <line x1="192" y1="198" x2="279" y2="132" stroke-width="4" />
      <!-- 头管 (Head Tube) -->
      <line x1="273" y1="114" x2="280" y2="135" stroke-width="4.8" />
      <!-- 前叉 (Front Fork：微弧流线收窄至前轴) -->
      <path d="M 279 133 L 297 179 Q 301 188 306 196" stroke-width="3.6" />
    </g>

    <!-- 流线型车座 (Ergonomic Saddle，完整落在 y=99..109 内，绝不裁切) -->
    <path
      d="M 144 104 C 144 99.5, 154 100, 163 102.5 C 171 104.5, 179 103.5, 184 105.5 C 186 106.5, 185 109, 179 109 L 150 108.5 C 145.5 108.5, 144 106.5, 144 104 Z"
      fill="var(--c-text)"
      opacity="0.9"
    />

    <!-- ==================== 近端（右侧外层）曲柄、脚蹬与花鼓轴心 ==================== -->
    <line x1="192" y1="198" x2="206" y2="217" stroke="var(--c-text)" stroke-width="3" stroke-linecap="round" opacity="0.92" />
    <rect x="198" y="215" width="16" height="4.8" rx="2.4" fill="var(--c-accent)" stroke="#0f1425" stroke-width="1" />

    <!-- 前后轮轴心与五通轴承盖 -->
    <g fill="var(--c-text)" stroke="#0f1425" stroke-width="1.4">
      <circle cx="104" cy="196" r="4.2" />
      <circle cx="306" cy="196" r="4.2" />
      <circle cx="192" cy="198" r="3.8" />
    </g>

    <!-- 车身前进方向速度提示 (v) -->
    <CourseArrow
      :from="{ x: 196, y: 105 }"
      :to="{ x: 244, y: 105 }"
      stroke="var(--c-text-dim)"
      stroke-width="2"
      stroke-dasharray="4 3"
      label="v"
      :label-dx="0"
      :label-dy="-6"
    />

    <!-- ==================== 地面接触点与静摩擦力矢量 ==================== -->
    <!-- 触地点高亮小圆点 -->
    <circle cx="104" cy="250" r="3.5" fill="var(--c-accent)" />
    <circle cx="306" cy="250" r="3.5" fill="var(--c-danger)" />

    <!-- 后轮（驱动轮）受向前的静摩擦力 f₁ -->
    <CourseArrow :from="{ x: 104, y: 250 }" :to="{ x: 198, y: 250 }" stroke="var(--c-accent)" stroke-width="3.6" label="f₁" :label-dx="4" :label-dy="-10" />

    <!-- 前轮（从动轮）受向后的静摩擦力 f₂ -->
    <CourseArrow :from="{ x: 306, y: 250 }" :to="{ x: 212, y: 250 }" stroke="var(--c-danger)" stroke-width="3.6" label="f₂" :label-dx="-4" :label-dy="-10" />

    <!-- 底部教学标注 -->
    <text x="104" y="280" text-anchor="middle" font-size="14" font-weight="600" fill="var(--c-accent)">后轮 · 驱动轮 (动力)</text>
    <text x="306" y="280" text-anchor="middle" font-size="14" font-weight="600" fill="var(--c-danger)">前轮 · 从动轮 (阻力)</text>
  </svg>
</template>
