<!--
  第 20 页总览：无线电波的发射与接收全过程。
  上排：信号源 → 调制器 → 发射天线（振荡器给调制器提供高频载波）；
  下排：接收天线 → 调谐 → 解调 → 放大 → 扬声器，信号流向左。
-->
<template>
  <svg viewBox="0 0 880 320" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <text x="70" y="26" font-size="13" font-weight="700" fill="var(--c-accent)">发射端</text>
    <text x="70" y="208" font-size="13" font-weight="700" fill="var(--c-physics)">接收端</text>
    <!-- 上排：信号源 -->
    <g>
      <rect x="70" y="40" width="140" height="56" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.2" opacity="0.6" />
      <text x="140" y="64" text-anchor="middle" font-size="15" font-weight="700" fill="var(--c-text)">信号源</text>
      <text x="140" y="84" text-anchor="middle" font-size="10.5" fill="var(--c-text-dim)">声音、图像</text>
    </g>
    <!-- 上排：调制器 -->
    <g>
      <rect x="290" y="40" width="140" height="56" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.2" opacity="0.6" />
      <text x="360" y="64" text-anchor="middle" font-size="15" font-weight="700" fill="var(--c-text)">调制器</text>
      <text x="360" y="84" text-anchor="middle" font-size="10.5" fill="var(--c-text-dim)">加到载波上</text>
    </g>
    <!-- 上排：发射天线 -->
    <g>
      <rect x="510" y="40" width="140" height="56" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.2" opacity="0.6" />
      <text x="580" y="64" text-anchor="middle" font-size="15" font-weight="700" fill="var(--c-text)">发射天线</text>
      <text x="580" y="84" text-anchor="middle" font-size="10.5" fill="var(--c-text-dim)">辐射电磁波</text>
    </g>
    <!-- 振荡器 -->
    <g>
      <rect x="290" y="130" width="140" height="56" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.2" opacity="0.6" />
      <text x="360" y="154" text-anchor="middle" font-size="15" font-weight="700" fill="var(--c-text)">振荡器</text>
      <text x="360" y="174" text-anchor="middle" font-size="10.5" fill="var(--c-text-dim)">高频载波</text>
    </g>
    <!-- 上排连线 -->
    <CourseArrow :from="{ x: 214, y: 68 }" :to="{ x: 286, y: 68 }" stroke="var(--c-text-dim)" :stroke-width="1.6" :head-size="7" />
    <CourseArrow :from="{ x: 434, y: 68 }" :to="{ x: 506, y: 68 }" stroke="var(--c-text-dim)" :stroke-width="1.6" :head-size="7" />
    <CourseArrow :from="{ x: 360, y: 128 }" :to="{ x: 360, y: 100 }" stroke="var(--c-text-dim)" :stroke-width="1.6" :head-size="7" />
    <!-- 发射天线辐射弧 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.5" stroke-linecap="round" opacity="0.6">
      <path d="M 658 58 A 12 12 0 0 1 658 78" />
      <path d="M 666 50 A 20 20 0 0 1 666 86" opacity="0.5" />
    </g>
    <!-- 电磁波由发射天线到接收天线 -->
    <CourseArrow :from="{ x: 654, y: 96 }" :to="{ x: 762, y: 212 }" stroke="var(--c-accent)" :stroke-width="1.8" :head-size="8" />
    <text x="770" y="180" font-size="12.5" fill="var(--c-accent)">电磁波</text>
    <!-- 下排：接收天线 -->
    <g>
      <rect x="730" y="220" width="140" height="56" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.2" opacity="0.6" />
      <text x="800" y="244" text-anchor="middle" font-size="15" font-weight="700" fill="var(--c-text)">接收天线</text>
      <text x="800" y="264" text-anchor="middle" font-size="10.5" fill="var(--c-text-dim)">接收电磁波</text>
    </g>
    <!-- 下排：调谐 -->
    <g>
      <rect x="550" y="220" width="140" height="56" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.2" opacity="0.6" />
      <text x="620" y="244" text-anchor="middle" font-size="15" font-weight="700" fill="var(--c-text)">调谐</text>
      <text x="620" y="264" text-anchor="middle" font-size="10.5" fill="var(--c-text-dim)">选出所需频率</text>
    </g>
    <!-- 下排：解调 -->
    <g>
      <rect x="370" y="220" width="140" height="56" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.2" opacity="0.6" />
      <text x="440" y="244" text-anchor="middle" font-size="15" font-weight="700" fill="var(--c-text)">解调</text>
      <text x="440" y="264" text-anchor="middle" font-size="10.5" fill="var(--c-text-dim)">取出低频信号</text>
    </g>
    <!-- 下排：放大 -->
    <g>
      <rect x="230" y="220" width="100" height="56" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.2" opacity="0.6" />
      <text x="280" y="244" text-anchor="middle" font-size="15" font-weight="700" fill="var(--c-text)">放大</text>
      <text x="280" y="264" text-anchor="middle" font-size="10.5" fill="var(--c-text-dim)">增强信号</text>
    </g>
    <!-- 下排：扬声器 -->
    <g>
      <rect x="70" y="220" width="120" height="56" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.2" opacity="0.6" />
      <text x="130" y="244" text-anchor="middle" font-size="15" font-weight="700" fill="var(--c-text)">扬声器</text>
      <text x="130" y="264" text-anchor="middle" font-size="10.5" fill="var(--c-text-dim)">还原声音</text>
      <g fill="none" stroke="var(--c-physics)" stroke-width="1.5" stroke-linecap="round" opacity="0.6">
        <path d="M 62 236 A 12 12 0 0 1 62 260" />
        <path d="M 54 228 A 20 20 0 0 1 54 268" opacity="0.5" />
      </g>
    </g>
    <!-- 下排连线（信号流向左） -->
    <CourseArrow :from="{ x: 726, y: 248 }" :to="{ x: 694, y: 248 }" stroke="var(--c-text-dim)" :stroke-width="1.6" :head-size="7" />
    <CourseArrow :from="{ x: 546, y: 248 }" :to="{ x: 514, y: 248 }" stroke="var(--c-text-dim)" :stroke-width="1.6" :head-size="7" />
    <CourseArrow :from="{ x: 366, y: 248 }" :to="{ x: 334, y: 248 }" stroke="var(--c-text-dim)" :stroke-width="1.6" :head-size="7" />
    <CourseArrow :from="{ x: 226, y: 248 }" :to="{ x: 194, y: 248 }" stroke="var(--c-text-dim)" :stroke-width="1.6" :head-size="7" />
  </svg>
</template>
