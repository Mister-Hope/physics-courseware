<template>
  <!-- 第 18 页：纸带上从第 0 点（起点）开始打出 1~5 共五个点（五段间隔越来越大），并量出第 5 个点到起点 0 的位移 -->
  <svg viewBox="0 12 1000 112" width="100%" class="fig-frame" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 纸带左右两端均渐隐（左侧对应舍去的密集点区，右侧对应后续未画全的纸带） -->
      <linearGradient id="tape-five-fill" x1="36" y1="0" x2="960" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="var(--c-text-dim)" stop-opacity="0.015" />
        <stop offset="11%" stop-color="var(--c-text-dim)" stop-opacity="0.11" />
        <stop offset="86%" stop-color="var(--c-text-dim)" stop-opacity="0.11" />
        <stop offset="100%" stop-color="var(--c-text-dim)" stop-opacity="0.015" />
      </linearGradient>
      <linearGradient id="tape-five-stroke" x1="36" y1="0" x2="960" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="var(--c-text-dim)" stop-opacity="0.05" />
        <stop offset="11%" stop-color="var(--c-text-dim)" stop-opacity="0.38" />
        <stop offset="86%" stop-color="var(--c-text-dim)" stop-opacity="0.34" />
        <stop offset="100%" stop-color="var(--c-text-dim)" stop-opacity="0.05" />
      </linearGradient>
    </defs>

    <!-- 点的序号：起点为 0，后续打出 1 ~ 5 共五个点（五段间隔） -->
    <text x="42" y="27" text-anchor="start" font-size="12" fill="var(--c-neutral-500)">点的序号</text>
    <g font-family="KaTeX_Main" font-size="13" fill="var(--c-text-dim)" text-anchor="middle">
      <text x="115" y="27" font-weight="700" fill="var(--c-velocity)">0</text>
      <text x="210" y="27">1</text>
      <text x="325" y="27">2</text>
      <text x="460" y="27">3</text>
      <text x="615" y="27">4</text>
      <text x="790" y="27" font-weight="700" fill="var(--c-accent)">5</text>
    </g>

    <!-- 纸带主体：左右两端均为锯齿撕裂形状 + 透明度渐隐 -->
    <path
      d="M 44 36 L 948 36 L 940 44 L 950 52 L 939 60 L 949 68 L 941 76 L 948 82 L 44 82 L 51 76 L 42 68 L 52 60 L 41 52 L 50 44 Z"
      fill="url(#tape-five-fill)"
      stroke="url(#tape-five-stroke)"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <!-- 左右两侧撕裂断口双层虚影线 -->
    <path
      d="M 36 36 L 43 44 L 34 52 L 44 60 L 33 68 L 42 76 L 36 82 M 956 36 L 948 44 L 958 52 L 947 60 L 957 68 L 949 76 L 956 82"
      fill="none"
      stroke="color-mix(in srgb, var(--c-text-dim) 16%, transparent)"
      stroke-width="1.2"
      stroke-dasharray="3 3"
      stroke-linejoin="round"
    />

    <!-- 第 0 点左侧：开头密集且渐隐的舍去点迹（体现“舍去开头密集点”） -->
    <g fill="var(--c-text-dim)">
      <circle cx="54" cy="59" r="1.7" opacity="0.12" />
      <circle cx="60" cy="59" r="1.8" opacity="0.17" />
      <circle cx="67" cy="59" r="1.9" opacity="0.22" />
      <circle cx="75" cy="59" r="2.1" opacity="0.28" />
      <circle cx="85" cy="59" r="2.2" opacity="0.34" />
      <circle cx="98" cy="59" r="2.4" opacity="0.4" />
    </g>

    <!-- 计数起点 0（蓝色精细墨迹点） -->
    <circle cx="115" cy="59" r="5.2" fill="color-mix(in srgb, var(--c-velocity) 22%, transparent)" />
    <circle cx="115" cy="59" r="3" fill="var(--c-velocity)" />

    <!-- 后续打出的 5 个点：1 ~ 5（共五段间隔：95, 115, 135, 155, 175，间隔越来越大） -->
    <g fill="color-mix(in srgb, var(--c-accent) 20%, transparent)">
      <circle cx="210" cy="59" r="5" />
      <circle cx="325" cy="59" r="5" />
      <circle cx="460" cy="59" r="5" />
      <circle cx="615" cy="59" r="5" />
      <circle cx="790" cy="59" r="5.4" />
    </g>
    <g fill="var(--c-accent)">
      <circle cx="210" cy="59" r="2.9" />
      <circle cx="325" cy="59" r="2.9" />
      <circle cx="460" cy="59" r="2.9" />
      <circle cx="615" cy="59" r="2.9" />
      <circle cx="790" cy="59" r="3.1" />
    </g>
    <!-- 第 5 点右侧未标号的后续渐隐点迹（呼应纸带右侧尚未显示全） -->
    <circle cx="912" cy="59" r="2.4" fill="var(--c-text-dim)" opacity="0.22" />

    <!-- 第 5 个点的重点标记外环 -->
    <circle cx="790" cy="59" r="9.5" fill="none" stroke="var(--c-accent)" stroke-width="1.7" opacity="0.9" />

    <!-- 从起点 0 与第 5 点中心直接向下引出的对齐虚线与端线（靠近纸带） -->
    <line x1="115" y1="65" x2="115" y2="108" stroke="var(--c-velocity)" stroke-width="1.35" stroke-dasharray="4 3" opacity="0.8" />
    <line x1="790" y1="69" x2="790" y2="108" stroke="var(--c-accent)" stroke-width="1.35" stroke-dasharray="4 3" opacity="0.8" />
    <line x1="115" y1="101" x2="115" y2="115" stroke="var(--c-velocity)" stroke-width="1.8" stroke-linecap="round" />
    <line x1="790" y1="101" x2="790" y2="115" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" />

    <!-- 起点 0 到第 5 点的双向测量箭头（紧贴纸带下方 y = 108） -->
    <line x1="124" y1="108" x2="781" y2="108" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" />
    <path d="M 115.8 108 L 125.5 103.2 L 125.5 112.8 Z" fill="var(--c-accent)" />
    <path d="M 789.2 108 L 779.5 103.2 L 779.5 112.8 Z" fill="var(--c-accent)" />

    <text x="452" y="99" text-anchor="middle" font-size="13" font-weight="700" fill="var(--c-accent)" stroke="var(--c-bg-soft)" stroke-width="3.5" paint-order="stroke">
      量出第 5 个点到起点的距离 → 这段位移
    </text>
  </svg>
</template>
