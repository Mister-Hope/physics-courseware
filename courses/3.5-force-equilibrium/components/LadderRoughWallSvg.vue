<template>
  <!-- 第 26 页：墙粗糙、地面光滑：墙的弹力 F_N 水平指向远离墙面，墙的摩擦力 f 竖直向上，地面只有支持力 N（无摩擦） -->
  <svg viewBox="0 0 340 280" xmlns="http://www.w3.org/2000/svg">
    <!-- 左侧粗糙墙面 -->
    <rect x="40" y="20" width="20" height="240" rx="2" fill="rgba(148,163,184,0.14)" />
    <line x1="60" y1="20" x2="60" y2="260" stroke="#94a3b8" stroke-width="2.4" />
    <line x1="40" y1="70" x2="26" y2="56" stroke="#64748b" stroke-width="1.6" />
    <line x1="40" y1="130" x2="26" y2="116" stroke="#64748b" stroke-width="1.6" />
    <line x1="40" y1="190" x2="26" y2="176" stroke="#64748b" stroke-width="1.6" />
    <text x="70" y="34" fill="#94a3b8" font-size="14">粗糙</text>
    <!-- 光滑地面（只画一条线） -->
    <line x1="30" y1="260" x2="330" y2="260" stroke="#64748b" stroke-width="2.4" />
    <text x="266" y="280" fill="#94a3b8" font-size="14">光滑</text>
    <!-- 梯子 -->
    <line x1="60" y1="120" x2="170" y2="260" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" />
    <line x1="115" y1="190" x2="115" y2="120" stroke="#64748b" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.8" />
    <text x="140" y="252" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="16">θ</text>
    <!-- 四个力 -->
    <CourseArrow :from="{ x: 115, y: 190 }" :to="{ x: 115, y: 245 }" :head-size="10" stroke="#f87171" stroke-width="3" />
    <text x="122" y="240" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="15">G</text>
    <CourseArrow :from="{ x: 60, y: 120 }" :to="{ x: 105, y: 120 }" :head-size="10" stroke="#2dd4bf" stroke-width="3" />
    <text x="84" y="112" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
    <text x="93" y="115" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="10">N</text>
    <CourseArrow :from="{ x: 60, y: 120 }" :to="{ x: 60, y: 76 }" :head-size="10" stroke="#c084fc" stroke-width="3" />
    <text x="30" y="90" fill="#c084fc" font-family="KaTeX_Math" font-style="italic" font-size="15">f</text>
    <CourseArrow :from="{ x: 170, y: 260 }" :to="{ x: 170, y: 205 }" :head-size="10" stroke="#e2a846" stroke-width="3" />
    <text x="178" y="204" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="15">N</text>
    <!-- 下端必然向右滑开 -->
    <CourseArrow :from="{ x: 186, y: 244 }" :to="{ x: 244, y: 244 }" :head-size="9" stroke="#f87171" stroke-width="2.2" stroke-dasharray="6 4" />
    <text x="196" y="236" fill="#f87171" font-size="13">向右滑开</text>
    <!-- 水平方向只有 F_N -->
    <line x1="60" y1="150" x2="300" y2="150" stroke="#f87171" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.55" />
    <text x="196" y="166" fill="#f87171" font-size="13">水平方向只有 F_N</text>
  </svg>
</template>
