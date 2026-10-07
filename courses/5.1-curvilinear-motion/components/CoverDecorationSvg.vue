<!-- 用于第 1 页封面右下角装饰：画的是曲线上 A、B 两点间的割线（虚线）与 A 点的切线（金色实线）-->
<template>
  <svg viewBox="0 0 200 140" width="100%" xmlns="http://www.w3.org/2000/svg" opacity="0.9" color="#2dd4bf">
    <!-- 曲线：从左侧下方 (18,116) 向右上弯到右上 (188,50)（青色；根节点 color 作为 currentColor 兜底）-->
    <path d="M 18 116 C 140 35 140 70 188 50" fill="none" stroke="#2dd4bf" stroke-width="2.2" stroke-linecap="round" opacity="0.85" />
    <!-- A 点切线：方向与曲线在 A 处走向一致，向两端各延伸 58（总长约为割线 AB 的 1.7 倍）-->
    <line x1="33.8" y1="101.2" x2="138.2" y2="50.6" stroke="#e2a846" stroke-width="1.8" stroke-linecap="round" opacity="0.95" />
    <!-- 割线 AB：A(86,75.9) 到 B(150,58) 的直线段（灰色虚线）-->
    <line x1="86" y1="75.9" x2="150" y2="58" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="5 4" stroke-linecap="round" opacity="0.8" />
    <!-- A、B 两个实心圆点 -->
    <circle cx="86" cy="75.9" r="3.2" fill="#e2a846" />
    <circle cx="150" cy="58" r="3.2" fill="#60a5fa" />
    <!-- 点标注：A 在点左侧稍下、B 在点右上 -->
    <text x="73" y="80" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="#e2a846">A</text>
    <text x="158" y="50" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="#60a5fa">B</text>
    <!-- 线名：切线标在金色线右端上方，割线标在虚线中点下方 -->
    <text x="130" y="43" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="#e2a846">切线</text>
    <text x="118" y="82" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="#94a3b8">割线</text>
  </svg>
</template>
