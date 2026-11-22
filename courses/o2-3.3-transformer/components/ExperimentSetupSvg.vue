<!--
  第 7 页（P7）：J2423 可拆变压器降压探究实验装置图（完整重绘版，13-Gemini4修改清单.md §5）。
  完整包含：
  1. 12 V 交流电源（低压交流学生电源，带 12 V ~ 标注与交流正弦符号）
  2. 开关 S
  3. J2423 可拆变压器（U 形硅钢片铁芯底座 + 可拆上横轭 + 左右卡扣螺栓 + 胶木线圈骨架）
  4. 原线圈 n1 = 1400 匝（0 / 1400 接线柱）
  5. 副线圈 n2 = 100 / 400 匝抽头（0 / 100 / 400 三接线柱，实线接 100 匝，虚线示意改接 400 匝）
  6. 两只交流电压表（V~，分别并联在原线圈两端测 U1、副线圈两端测 U2）
-->
<template>
  <svg viewBox="0 0 480 272" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="p7-core-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#475569" />
        <stop offset="50%" stop-color="#334155" />
        <stop offset="100%" stop-color="#1e293b" />
      </linearGradient>
      <linearGradient id="p7-yoke-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#64748b" />
        <stop offset="100%" stop-color="#334155" />
      </linearGradient>
    </defs>

    <!-- 顶部器材总标牌：J2423 可拆变压器 -->
    <rect x="166" y="10" width="148" height="24" rx="12" fill="var(--c-surface)" stroke="var(--c-accent-border)" stroke-width="1.2" />
    <text x="240" y="26" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--c-accent)">
      <tspan font-family="KaTeX_Main">J2423 </tspan>
      <tspan>可拆变压器</tspan>
    </text>

    <!-- ================= 1. J2423 可拆变压器铁芯与骨架 ================= -->
    <!-- 下部 U 形铁芯底座 -->
    <path d="M 168 78 H 198 V 196 H 282 V 78 H 312 V 224 H 168 Z" fill="url(#p7-core-grad)" stroke="#94a3b8" stroke-width="1.8" stroke-linejoin="round" />
    <!-- 硅钢片叠片纹理细线 -->
    <path d="M 173 82 V 219 H 307 V 82 M 193 82 V 201 H 287 V 82" fill="none" stroke="#cbd5e1" stroke-width="0.6" opacity="0.35" />

    <!-- 上部可拆横轭铁芯（条形铁芯） -->
    <rect x="164" y="50" width="152" height="26" rx="4" fill="url(#p7-yoke-grad)" stroke="#cbd5e1" stroke-width="1.8" />
    <!-- 可拆接缝高亮虚线与“可拆横轭”微标 -->
    <line x1="166" y1="77" x2="200" y2="77" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="4 3" />
    <line x1="280" y1="77" x2="314" y2="77" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="4 3" />
    <!-- 左右固定压紧螺母 -->
    <circle cx="183" cy="63" r="4.2" fill="#e2e8f0" stroke="#475569" stroke-width="1.2" />
    <circle cx="297" cy="63" r="4.2" fill="#e2e8f0" stroke="#475569" stroke-width="1.2" />

    <!-- 原线圈上下胶木挡板（左支腿 x = 183） -->
    <rect x="155" y="92" width="56" height="5" rx="2" fill="#334155" stroke="#60a5fa" stroke-width="1" />
    <rect x="155" y="181" width="56" height="5" rx="2" fill="#334155" stroke="#60a5fa" stroke-width="1" />

    <!-- 副线圈上下胶木挡板（右支腿 x = 297） -->
    <rect x="269" y="92" width="56" height="5" rx="2" fill="#334155" stroke="#2dd4bf" stroke-width="1" />
    <rect x="269" y="181" width="56" height="5" rx="2" fill="#334155" stroke="#2dd4bf" stroke-width="1" />

    <!-- 原线圈（左，1400 匝，匝密） -->
    <Solenoid
      :x="183"
      :y="139"
      :length="80"
      :radius="23"
      :turns="8"
      direction="ccw"
      orientation="vertical"
      :phase="180"
      :line-width="2.5"
      :back-opacity="0.32"
      color="var(--c-accent-2)"
    />

    <!-- 副线圈（右，100 / 400 匝抽头，匝疏） -->
    <Solenoid
      :x="297"
      :y="139"
      :length="76"
      :radius="23"
      :turns="4"
      direction="cw"
      orientation="vertical"
      :phase="0"
      :line-width="2.6"
      :back-opacity="0.32"
      color="var(--c-physics)"
    />

    <!-- ================= 2. 左侧原边回路（12V 交流电源 + 开关 S + 交流电压表 V~） ================= -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <!-- 上干路：原线圈 1400 端子 (156, 101) -> 节点 (118, 101) -> 开关右端 (94, 101) -->
      <path d="M 156 101 H 94" />
      <!-- 开关左端 (54, 101) -> 电源正上方 (34, 101) -> (34, 121) -->
      <path d="M 54 101 H 34 V 121" />
      <!-- 下干路：电源下方 (34, 157) -> (34, 177) -> 原线圈 0 端子 (156, 177) -->
      <path d="M 34 157 V 177 H 156" />
      <!-- 并联交流电压表 V1 支路 (x = 116) -->
      <path d="M 116 101 V 121" />
      <path d="M 116 157 V 177" />
    </g>

    <!-- 原边并联节点与线圈接线柱 -->
    <circle cx="116" cy="101" r="3.2" fill="var(--c-text)" />
    <circle cx="116" cy="177" r="3.2" fill="var(--c-text)" />
    <circle cx="156" cy="101" r="3.6" fill="var(--c-accent-2)" stroke="#0f172a" stroke-width="1" />
    <circle cx="156" cy="177" r="3.6" fill="var(--c-accent-2)" stroke="#0f172a" stroke-width="1" />
    <text x="150" y="94" text-anchor="end" font-size="11" font-family="KaTeX_Main" fill="var(--c-accent-2)">1400</text>
    <text x="150" y="191" text-anchor="end" font-size="11" font-family="KaTeX_Main" fill="var(--c-accent-2)">0</text>

    <!-- 开关 S -->
    <CircuitSwitch :x="74" :y="101" :open="false" :span="40" label="S" />

    <!-- 12 V 低压交流电源符号 -->
    <circle cx="34" cy="139" r="18" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="2" />
    <path d="M 24 139 q 5 -8 10 0 t 10 0" fill="none" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
    <text x="44" y="205" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--c-accent-2)">
      <tspan font-family="KaTeX_Main">12 V </tspan>
      <tspan>交流电源</tspan>
    </text>

    <!-- 原边交流电压表 V~ (测 U1) -->
    <circle cx="116" cy="139" r="18" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="2" />
    <text x="116" y="138" text-anchor="middle" font-size="13.5" font-weight="700" font-family="KaTeX_Main" fill="var(--c-accent-2)">V</text>
    <path d="M 109 146 q 3.5 -4.5 7 0 t 7 0" fill="none" stroke="var(--c-accent-2)" stroke-width="1.6" stroke-linecap="round" />
    <text x="116" y="205" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--c-accent-2)">
      <tspan>测 </tspan>
      <tspan font-family="KaTeX_Math" font-style="italic">U</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Main">1</tspan>
    </text>

    <!-- ================= 3. 右侧副边回路（100 / 400 匝抽头 + 交流电压表 V~） ================= -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <!-- 400 匝上抽头（虚线：第 3 步改接 400 匝） -->
      <path d="M 324 101 H 386 V 146" stroke="var(--c-physics)" stroke-width="1.6" stroke-dasharray="5 3" opacity="0.82" />
      <!-- 100 匝中抽头（实线：第 1 步先接 100 匝 -> 交流电压表上端） -->
      <path d="M 324 146 H 416 V 121" />
      <!-- 0 匝公共端 -> 交流电压表下端 -->
      <path d="M 324 177 H 416 V 157" />
    </g>

    <!-- 副线圈三个抽头接线柱：400、100、0 -->
    <circle cx="324" cy="101" r="3.6" fill="var(--c-physics)" stroke="#0f172a" stroke-width="1" />
    <circle cx="324" cy="146" r="3.6" fill="var(--c-physics)" stroke="#0f172a" stroke-width="1" />
    <circle cx="324" cy="177" r="3.6" fill="var(--c-physics)" stroke="#0f172a" stroke-width="1" />

    <text x="332" y="95" font-size="11.5" font-weight="700" font-family="KaTeX_Main" fill="var(--c-physics)">400 匝</text>
    <text x="332" y="141" font-size="11.5" font-weight="700" font-family="KaTeX_Main" fill="var(--c-physics)">100 匝</text>
    <text x="332" y="192" font-size="11.5" font-weight="700" font-family="KaTeX_Main" fill="var(--c-physics)">0</text>

    <!-- 副边交流电压表 V~ (测 U2) -->
    <circle cx="416" cy="139" r="18" fill="var(--c-surface-solid)" stroke="var(--c-physics)" stroke-width="2" />
    <text x="416" y="138" text-anchor="middle" font-size="13.5" font-weight="700" font-family="KaTeX_Main" fill="var(--c-physics)">V</text>
    <path d="M 409 146 q 3.5 -4.5 7 0 t 7 0" fill="none" stroke="var(--c-physics)" stroke-width="1.6" stroke-linecap="round" />
    <text x="416" y="205" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--c-physics)">
      <tspan>测 </tspan>
      <tspan font-family="KaTeX_Math" font-style="italic">U</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Main">2</tspan>
    </text>

    <!-- ================= 4. 底部原、副线圈匝数铭牌 ================= -->
    <rect x="112" y="242" width="122" height="26" rx="6" fill="var(--c-accent-2-soft)" stroke="var(--c-accent-2-border)" stroke-width="1" />
    <text x="173" y="259" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--c-accent-2)">
      <tspan>原线圈 </tspan>
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Main">1</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 1400 </tspan>
      <tspan>匝</tspan>
    </text>

    <rect x="246" y="242" width="156" height="26" rx="6" fill="rgba(45, 212, 191, 0.1)" stroke="rgba(45, 212, 191, 0.38)" stroke-width="1" />
    <text x="324" y="259" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--c-physics)">
      <tspan>副线圈 </tspan>
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan>
      <tspan dy="3" font-size="10" font-family="KaTeX_Main">2</tspan>
      <tspan dy="-3" font-family="KaTeX_Main"> = 100 / 400 </tspan>
      <tspan>匝</tspan>
    </text>
  </svg>
</template>
