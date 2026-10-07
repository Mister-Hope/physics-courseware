<template>
  <!-- 第 3 页：手拉弹簧，弹簧也拉手——手对弹簧的拉力与弹簧对手的拉力方向相反 -->
  <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- ==================== 1. 右侧：固定竖直墙面与斜剖线 ==================== -->
    <SurfaceHatch :from="{ x: 168, y: 24 }" :to="{ x: 168, y: 106 }" side="right" :thickness="9" :gap="16" color="#cbd5e1" :line-width="3" />

    <!-- ==================== 2. 中央：极简物理螺旋弹簧与左端拉环 ==================== -->
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- 弹簧固定端与折线线圈 -->
      <path d="M 76 65 L 86 65 L 92 48 L 104 82 L 116 48 L 128 82 L 140 48 L 152 82 L 158 65 L 168 65" stroke="#cbd5e1" stroke-width="2.3" />
      <!-- 弹簧左端金属拉环 -->
      <circle cx="71" cy="65" r="5" stroke="#e2a846" stroke-width="2.2" fill="rgba(226,168,70,0.15)" />
    </g>

    <!-- ==================== 3. 左侧：共享手部组件 <GripHand> 捏住弹簧拉环 ==================== -->
    <GripHand :x="66" :y="65" side="left" color="#60a5fa" fill="rgba(96,165,250,0.22)" />

    <!-- ==================== 4. 挂钩交界处 (68, 65) 的等长反向拉力箭头 ==================== -->
    <CourseArrow :from="{ x: 68, y: 65 }" :to="{ x: 24, y: 65 }" stroke="#60a5fa" stroke-width="3.2" />
    <CourseArrow :from="{ x: 68, y: 65 }" :to="{ x: 112, y: 65 }" stroke="#e2a846" stroke-width="3.2" />
    <circle cx="68" cy="65" r="3" fill="#e2e8f0" stroke="#0f1425" stroke-width="1.2" />
  </svg>
</template>
