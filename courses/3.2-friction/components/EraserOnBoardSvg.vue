<template>
  <!-- 板擦在黑板上滑动：摩擦力与速度反向 -->
  <svg viewBox="0 0 300 230" class="fig-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- 1. 黑板外框与深绿灰板面 -->
    <rect x="16" y="20" width="268" height="174" rx="10" fill="color-mix(in srgb, var(--c-surface-solid) 75%, transparent)" stroke="color-mix(in srgb, var(--c-text-dim) 45%, transparent)" stroke-width="2" />
    <rect x="24" y="28" width="252" height="156" rx="6" fill="rgba(15,28,36,0.88)" stroke="color-mix(in srgb, var(--c-text-dim) 22%, transparent)" stroke-width="1.2" />

    <!-- 黑板左上角微弱标题装饰与板面粉笔字残迹 -->
    <text x="36" y="48" font-size="12" fill="var(--c-text-dim)" opacity="0.55">黑板面</text>
    <!-- 右侧尚未擦除的浅色粉笔字迹线条 -->
    <g stroke="color-mix(in srgb, var(--c-neutral-200) 22%, transparent)" stroke-width="2" stroke-linecap="round">
      <line x1="212" y1="98" x2="256" y2="98" />
      <line x1="218" y1="112" x2="248" y2="112" />
      <line x1="210" y1="142" x2="252" y2="142" />
    </g>

    <!-- 2. 板擦向右滑过的擦拭轨迹带（直观体现相对运动方向） -->
    <rect x="38" y="90" width="70" height="56" rx="4" fill="color-mix(in srgb, var(--c-physics-light) 6%, transparent)" />
    <line x1="38" y1="90" x2="104" y2="90" stroke="color-mix(in srgb, var(--c-text-dim) 32%, transparent)" stroke-width="1.3" stroke-dasharray="4 4" />
    <line x1="38" y1="146" x2="104" y2="146" stroke="color-mix(in srgb, var(--c-text-dim) 32%, transparent)" stroke-width="1.3" stroke-dasharray="4 4" />

    <!-- 3. 双层立体板擦（底层深色毛毡擦面 + 上层蓝色握柄外壳 + 防滑凹槽） -->
    <!-- 底层贴合黑板的毛毡垫 -->
    <rect x="100" y="87" width="100" height="62" rx="9" fill="color-mix(in srgb, var(--c-neutral-900) 92%, transparent)" stroke="color-mix(in srgb, var(--c-text-dim) 50%, transparent)" stroke-width="1.6" />
    <!-- 上层板擦握柄壳体 -->
    <rect x="104" y="91" width="92" height="54" rx="7" fill="color-mix(in srgb, var(--c-physics-light) 20%, transparent)" stroke="var(--c-accent-2)" stroke-width="2.2" />
    <!-- 握柄上下侧内凹防滑棱线 -->
    <line x1="116" y1="97" x2="184" y2="97" stroke="color-mix(in srgb, var(--c-physics-light) 38%, transparent)" stroke-width="1.4" stroke-linecap="round" />
    <line x1="116" y1="139" x2="184" y2="139" stroke="color-mix(in srgb, var(--c-physics-light) 38%, transparent)" stroke-width="1.4" stroke-linecap="round" />

    <!-- 板擦名称（置于重心点上方，与受力线留足呼吸间距） -->
    <text x="150" y="113" text-anchor="middle" font-size="15" font-weight="600" fill="var(--c-text)">板擦</text>

    <!-- 4. 滑动摩擦力 F_f（从板擦中心作用点水平向左） -->
    <CourseArrow :from="{ x: 150, y: 127 }" :to="{ x: 36, y: 127 }" stroke="var(--c-accent)" stroke-width="3.2" />
    <!-- 受力作用点圆心 -->
    <circle cx="150" cy="127" r="3.6" fill="var(--c-accent)" stroke="var(--c-bg-soft)" stroke-width="1.4" />
    <text x="48" y="113" text-anchor="middle" font-size="16" fill="var(--c-accent)" stroke="var(--c-bg-soft)" stroke-width="3" paint-order="stroke">
      <tspan font-family="KaTeX_Math, serif" font-style="italic">F</tspan>
      <tspan dy="4" font-size="11" font-family="KaTeX_Main, sans-serif">f</tspan>
    </text>

    <!-- 5. 运动速度矢量 v（板擦正上方水平向右，与受力线上下分离、方向对比鲜明） -->
    <CourseArrow :from="{ x: 114, y: 66 }" :to="{ x: 194, y: 66 }" stroke="var(--c-physics)" stroke-width="3" />
    <text
      x="204"
      y="71"
      font-size="16"
      fill="var(--c-physics)"
      font-family="KaTeX_Math, serif"
      font-style="italic"
      stroke="var(--c-bg-soft)"
      stroke-width="3"
      paint-order="stroke"
    >
      v
    </text>

    <!-- 6. 黑板底部粉笔槽与粉笔细节 -->
    <rect x="10" y="192" width="280" height="9" rx="3" fill="color-mix(in srgb, var(--c-neutral-600) 65%, transparent)" stroke="color-mix(in srgb, var(--c-text-dim) 50%, transparent)" stroke-width="1.5" />
    <!-- 粉笔槽上的两截粉笔 -->
    <rect x="64" y="188" width="22" height="4.5" rx="1.8" fill="color-mix(in srgb, var(--c-neutral-50) 85%, transparent)" />
    <rect x="92" y="188" width="16" height="4.5" rx="1.8" fill="color-mix(in srgb, var(--c-accent-glow) 85%, transparent)" />
  </svg>
</template>
