<template>
  <!-- 第 20 页「弹力的方向：两个曲面接触」：
       左：两个球面互相挤压，弹力沿过接触点的公法线——也就是两球心的连线；
       右：直杆斜靠在半球形碗内，接触点处的弹力垂直于切面、沿半径指向球心。 -->
  <svg class="fig" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 球体立体径向高光渐变（无空格 rgba 兼容 UnoCSS attributify） -->
      <radialGradient id="sphereGradLeft" cx="38%" cy="35%" r="62%">
        <stop offset="0%" stop-color="rgba(226,232,240,0.32)" />
        <stop offset="65%" stop-color="rgba(148,163,184,0.18)" />
        <stop offset="100%" stop-color="rgba(51,65,85,0.28)" />
      </radialGradient>
      <!-- 半球碗内壁柔和渐变 -->
      <radialGradient id="bowlInnerGrad" cx="50%" cy="0%" r="100%">
        <stop offset="65%" stop-color="rgba(15,23,42,0)" />
        <stop offset="100%" stop-color="rgba(148,163,184,0.14)" />
      </radialGradient>
    </defs>

    <!-- ==================== 左侧：两个球面互相挤压 ==================== -->
    <circle cx="110" cy="100" r="52" fill="url(#sphereGradLeft)" stroke="#cbd5e1" stroke-width="2.6" />
    <circle cx="214" cy="100" r="52" fill="url(#sphereGradLeft)" stroke="#cbd5e1" stroke-width="2.6" />

    <!-- 公切面（灰色虚线）与直角符号 -->
    <line x1="162" y1="38" x2="162" y2="162" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5" />
    <polyline points="162,91 171,91 171,100" fill="none" stroke="#94a3b8" stroke-width="1.3" opacity="0.8" />
    <text x="172" y="36" font-size="13" fill="#94a3b8">公切面</text>

    <!-- 两球心连线（公法线） -->
    <line x1="110" y1="100" x2="214" y2="100" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="6 5" />
    <circle cx="110" cy="100" r="4" fill="#60a5fa" />
    <circle cx="214" cy="100" r="4" fill="#60a5fa" />
    <circle cx="162" cy="100" r="3.5" fill="#e2a846" />
    <text x="110" y="86" text-anchor="middle" font-size="13" fill="#60a5fa">球心</text>
    <text x="214" y="86" text-anchor="middle" font-size="13" fill="#60a5fa">球心</text>

    <!-- 接触点引出线与双向弹力箭头 -->
    <line x1="162" y1="100" x2="162" y2="176" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 4" />
    <CourseArrow :from="{ x: 162, y: 176 }" :to="{ x: 116, y: 176 }" stroke="#e2a846" stroke-width="3" />
    <CourseArrow :from="{ x: 162, y: 176 }" :to="{ x: 208, y: 176 }" stroke="#e2a846" stroke-width="3" />
    <text x="104" y="170" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#e2a846">F</text>
    <text x="220" y="170" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#e2a846">F</text>
    <text x="162" y="206" text-anchor="middle" font-size="14" fill="#94a3b8">两球面：沿两球心的连线</text>

    <!-- ==================== 右侧：直杆斜靠在半球形碗内 ==================== -->
    <!--
      几何关系严格设定（3-4-5 黄金直角比例，零浮点误差）：
      - 半球碗球心 O = (588, 56)，半径 R = 118（左沿 470,56，右沿 706,56）；
      - 接触点 A 取在碗左下内壁：方向向量 u_r = (-0.6, +0.8)，
        因此接触点 A = (588 - 0.6×118, 56 + 0.8×118) = (517.2, 150.4)，严格落在 R=118 球面上！
      - 过接触点 A 的切线单位向量 u_t = (+0.8, +0.6)，与半径 OA 严格垂直；
      - 指向球心 O 的法向单位向量 n = (+0.6, -0.8)。
    -->

    <!-- 半球形碗内腔填充与碗口水平虚线 -->
    <path d="M 470 56 A 118 118 0 0 0 706 56 Z" fill="url(#bowlInnerGrad)" />
    <line x1="470" y1="56" x2="706" y2="56" stroke="rgba(148,163,184,0.28)" stroke-width="1.2" stroke-dasharray="4 4" />

    <!-- 半球形碗壁弧线 -->
    <path d="M 470 56 A 118 118 0 0 0 706 56" fill="none" stroke="#cbd5e1" stroke-width="3.4" stroke-linecap="round" />

    <!-- 过接触点 A(517.2, 150.4) 的灰色虚线切线（u_t = (0.8, 0.6)，前伸 48px、后延 48px） -->
    <line x1="478.8" y1="121.6" x2="555.6" y2="179.2" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5" />
    <text x="466" y="118" text-anchor="end" font-size="13" fill="#94a3b8">切线</text>

    <!-- 接触点 A(517.2, 150.4) 到球心 O(588, 56) 的蓝色虚线半径连线 -->
    <line x1="517.2" y1="150.4" x2="588" y2="56" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="6 5" />

    <!-- 接触点处的红色直角垂足符号（边长 s=9.5，严密贴合切线 u_t 与法线 n） -->
    <polyline points="524.8,156.1 530.5,148.5 522.9,142.8" fill="none" stroke="#f87171" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />

    <!-- 斜靠在碗内的直杆：下端(519.1, 149.4)考虑半线宽后外缘恰好抵住碗内壁 A(517.2, 150.4)，上端搭在右碗口(706, 56)并自然伸出至(726, 46) -->
    <line x1="519.1" y1="149.4" x2="726" y2="46" stroke="#e2a846" stroke-width="4.2" stroke-linecap="round" />

    <!-- 球心标记 -->
    <circle cx="588" cy="56" r="4" fill="#60a5fa" />
    <text x="588" y="42" text-anchor="middle" font-size="13" fill="#60a5fa">球心</text>

    <!-- 接触点 A 红色圆点与沿半径指向球心的弹力箭头 -->
    <circle cx="517.2" cy="150.4" r="4.5" fill="#f87171" />
    <CourseArrow :from="{ x: 517.2, y: 150.4 }" :to="{ x: 556.8, y: 97.6 }" stroke="#f87171" stroke-width="3" />
    <text x="530" y="108" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#f87171">F</text>

    <text x="588" y="206" text-anchor="middle" font-size="14" fill="#94a3b8">碗内直杆：沿半径指向球心</text>
  </svg>
</template>

<style scoped>
.fig {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}
</style>
