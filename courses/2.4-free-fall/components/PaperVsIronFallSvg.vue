<template>
  <!-- 第 4 页：同一高度同时落下——平铺纸片受阻力微拱飘落最慢、揉皱纸团居中、高光铁球最快 -->
  <svg viewBox="0 0 320 226" width="100%" style="display: block; max-width: 21rem; margin: 0 auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 铁球 3D 球面金属渐变（左上高光 → 深灰钢球阴影） -->
      <radialGradient id="iron-ball-grad" cx="34%" cy="30%" r="68%" fx="30%" fy="26%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="28%" stop-color="var(--c-neutral-200)" />
        <stop offset="68%" stop-color="var(--c-text-dim)" />
        <stop offset="100%" stop-color="var(--c-neutral-700)" />
      </radialGradient>
      <!-- 纸片立体光影渐变 -->
      <linearGradient id="sheet-paper-grad" x1="54" y1="114" x2="86" y2="132" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="rgba(253,230,138,0.42)" />
        <stop offset="52%" stop-color="color-mix(in srgb, var(--c-accent) 22%, transparent)" />
        <stop offset="100%" stop-color="color-mix(in srgb, var(--c-accent) 38%, transparent)" />
      </linearGradient>
      <!-- 纸团立体基底渐变 -->
      <radialGradient id="crumpled-paper-grad" cx="38%" cy="35%" r="65%">
        <stop offset="0%" stop-color="rgba(253,230,138,0.52)" />
        <stop offset="65%" stop-color="color-mix(in srgb, var(--c-accent) 34%, transparent)" />
        <stop offset="100%" stop-color="rgba(180,118,32,0.45)" />
      </radialGradient>
    </defs>
    <!-- 同一释放高度基准线与地面线 -->
    <line x1="14" y1="26" x2="306" y2="26" stroke="color-mix(in srgb, var(--c-text-dim) 35%, transparent)" stroke-width="1.4" stroke-dasharray="5 4" />
    <line x1="14" y1="204" x2="306" y2="204" stroke="var(--c-neutral-600)" stroke-width="2" />
    <!-- ================= 1. 平铺纸片（左右摇摆飘落 + 受气流微拱弯曲变形） ================= -->
    <path
      d="M 70 32 C 46 52 92 66 64 84 C 44 96 90 104 70 116"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.3"
      stroke-dasharray="4 4"
      opacity="0.7"
    />
    <g transform="rotate(-14 70 124)">
      <!-- 纸片受空气阻力向上微弯翘曲的透视四边形曲面 -->
      <path
        d="M 54 119 Q 70 113.5 86 117.5 L 83 131.5 Q 69 125.5 57 130.5 Z"
        fill="url(#sheet-paper-grad)"
        stroke="var(--c-accent)"
        stroke-width="1.45"
        stroke-linejoin="round"
      />
      <!-- 纸面中部轻微折痕与弯曲纹理线 -->
      <path d="M 60 123.5 Q 70 119.5 81 123" fill="none" stroke="var(--c-accent)" stroke-width="0.85" opacity="0.55" />
      <line x1="69.5" y1="116" x2="68.5" y2="128" stroke="#fef08a" stroke-width="0.75" opacity="0.45" />
    </g>
    <!-- ================= 2. 纸团（揉成一团的多边形棱角与内部折皱线） ================= -->
    <path d="M 160 32 C 152 76 168 128 158 180" fill="none" stroke="var(--c-text-dim)" stroke-width="1.3" stroke-dasharray="4 4" opacity="0.7" />
    <g transform="translate(158, 190)">
      <!-- 纸团外轮廓：不规则多折角团状结构 -->
      <path
        d="M -8.5 -2.5 L -6 -7.8 L -0.5 -9.2 L 5.8 -7.4 L 9.2 -2.2 L 7.8 4.2 L 3.2 8.6 L -3.5 8.8 L -8.2 4.8 Z"
        fill="url(#crumpled-paper-grad)"
        stroke="var(--c-accent)"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <!-- 纸团内部揉皱折痕切面线（呈现团成一团的立体折纸感） -->
      <path
        d="M -6 -7.8 L -1.2 -1.8 L 5.8 -7.4 M -8.5 -2.5 L -1.2 -1.8 L -3.5 8.8 M -1.2 -1.8 L 7.8 4.2 M 0.8 2.4 L 9.2 -2.2 M -8.2 4.8 L 0.8 2.4 L 3.2 8.6"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.05"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.85"
      />
      <!-- 纸团受光面亮棱高光 -->
      <path d="M -5.2 -6.2 L -1.2 -1.8 L 4.2 -6" fill="none" stroke="#fef08a" stroke-width="0.85" stroke-linecap="round" opacity="0.6" />
    </g>
    <!-- ================= 3. 铁球（笔直快速下落 + 金属球面渐变与高光反光） ================= -->
    <line x1="250" y1="32" x2="250" y2="186" stroke="var(--c-text-dim)" stroke-width="1.3" stroke-dasharray="4 4" opacity="0.7" />
    <g>
      <!-- 铁球主体 -->
      <circle cx="250" cy="195" r="8.5" fill="url(#iron-ball-grad)" stroke="var(--c-text-dim)" stroke-width="0.9" />
      <!-- 左上主高光点 + 弧形反光带 -->
      <ellipse cx="247.2" cy="191.8" rx="2.5" ry="1.5" transform="rotate(-28 247.2 191.8)" fill="#ffffff" opacity="0.92" />
      <circle cx="245.5" cy="194.2" r="0.8" fill="#ffffff" opacity="0.7" />
      <!-- 右下边缘环境反光弧 -->
      <path d="M 248.5 201.5 A 6.5 6.5 0 0 0 256.2 196.2" fill="none" stroke="var(--c-neutral-200)" stroke-width="1" stroke-linecap="round" opacity="0.45" />
    </g>
    <!-- 顶部名称与底部落地先后序号 -->
    <text x="70" y="18" text-anchor="middle" font-size="14" fill="var(--c-accent)">纸片</text>
    <text x="158" y="18" text-anchor="middle" font-size="14" fill="var(--c-accent)">纸团</text>
    <text x="250" y="18" text-anchor="middle" font-size="14" fill="var(--c-neutral-300)">铁球</text>
    <text x="70" y="222" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">③</text>
    <text x="158" y="222" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">②</text>
    <text x="250" y="222" text-anchor="middle" font-size="14" fill="var(--c-accent)">①</text>
  </svg>
</template>
