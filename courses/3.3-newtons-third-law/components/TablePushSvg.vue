<template>
  <!-- 第 3 页：人推桌子，桌子也推人——推力与反推力方向相反、大小相等 -->
  <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 地面与斜剖线 -->
    <SurfaceHatch :from="{ x: 10, y: 112 }" :to="{ x: 190, y: 112 }" side="below" :thickness="8" :gap="22" color="#cbd5e1" :line-width="3" />
    <line x1="10" y1="112" x2="190" y2="112" stroke="#cbd5e1" stroke-width="2" />

    <!-- ==================== 1. 左侧：奥运图标风弓步推桌火柴人 ==================== -->
    <g stroke-linecap="round" stroke-linejoin="round" fill="none">
      <!-- 远端后侧推桌手臂与后蹬腿 -->
      <path d="M 48 47 L 70 55 L 95 58" stroke="#64748b" stroke-width="2.6" />
      <path d="M 35 78 L 22 95 L 15 111" stroke="#64748b" stroke-width="3" />

      <!-- 头部 -->
      <circle cx="52" cy="29" r="9.5" fill="rgba(96,165,250,0.2)" stroke="#60a5fa" stroke-width="2.4" />
      <!-- 前倾发力躯干 -->
      <line x1="49" y1="42" x2="35" y2="78" stroke="#e2e8f0" stroke-width="3.8" />
      <!-- 前侧屈膝弓步支撑腿 -->
      <path d="M 35 78 L 55 90 L 53 111" stroke="#e2e8f0" stroke-width="3.4" />
      <!-- 前侧推桌手臂 -->
      <path d="M 48 47 L 68 60 L 95 60" stroke="#e2e8f0" stroke-width="3.2" />
    </g>

    <!-- ==================== 2. 右侧：极简几何桌子 ==================== -->
    <g stroke-linecap="round" stroke-linejoin="round">
      <!-- 桌面与横档 -->
      <rect x="96" y="53" width="84" height="7" rx="2.5" fill="rgba(226,168,70,0.2)" stroke="#e2a846" stroke-width="2" />
      <line x1="105" y1="68" x2="171" y2="68" stroke="#64748b" stroke-width="1.8" />
      <!-- 桌腿 -->
      <line x1="105" y1="60" x2="105" y2="111" stroke="#cbd5e1" stroke-width="2.8" />
      <line x1="171" y1="60" x2="171" y2="111" stroke="#cbd5e1" stroke-width="2.8" />
    </g>

    <!-- ==================== 3. 接触点 (96, 60) 与等长反向推力箭头 ==================== -->
    <CourseArrow :from="{ x: 96, y: 60 }" :to="{ x: 140, y: 60 }" stroke="#e2a846" stroke-width="3.2" />
    <CourseArrow :from="{ x: 96, y: 60 }" :to="{ x: 52, y: 60 }" stroke="#60a5fa" stroke-width="3.2" />
    <circle cx="96" cy="60" r="3" fill="#e2e8f0" stroke="#0f1425" stroke-width="1.2" />
  </svg>
</template>
