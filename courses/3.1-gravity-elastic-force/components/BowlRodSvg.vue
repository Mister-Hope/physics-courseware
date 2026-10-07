<template>
  <!-- 第 20 页「练一练」右图：直杆斜搭在半球形碗内，与碗有 A（杆端抵住碗内壁）、B（杆搭在碗口棱上）两处接触。
       干净图只给碗、杆、球心与 A/B 两点；showForces 打开后才给切线、半径与两处弹力：
       A 处沿半径指向球心；B 处接触的是碗口的棱，弹力垂直于杆、斜向左上。 -->
  <svg class="fig" viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 半球碗内壁柔和渐变（无空格 rgba 兼容 UnoCSS attributify） -->
      <radialGradient id="bowlInnerGradP20" cx="50%" cy="0%" r="100%">
        <stop offset="65%" stop-color="rgba(15,23,42,0)" />
        <stop offset="100%" stop-color="rgba(148,163,184,0.14)" />
      </radialGradient>
    </defs>

    <!-- 半球形碗：球心 O=(150,70)，半径 R=100，左沿 (50,70)、右沿 (250,70) -->
    <path d="M 50 70 A 100 100 0 0 0 250 70 Z" fill="url(#bowlInnerGradP20)" />
    <line x1="50" y1="70" x2="250" y2="70" stroke="rgba(148,163,184,0.28)" stroke-width="1.2" stroke-dasharray="4 4" />
    <path d="M 50 70 A 100 100 0 0 0 250 70" fill="none" stroke="#cbd5e1" stroke-width="3.4" stroke-linecap="round" />

    <!-- 直杆：下端抵在碗内壁 A(79.3,140.7)，斜搭过碗口 B(250,70) 后自然伸出 -->
    <line x1="81.6" y1="139.7" x2="277.7" y2="58.5" stroke="#e2a846" stroke-width="4.2" stroke-linecap="round" />

    <!-- 球心（题目已给）与两处接触点（常显） -->
    <circle cx="150" cy="70" r="4" fill="#60a5fa" />
    <text x="150" y="56" text-anchor="middle" font-size="13" fill="#60a5fa">球心</text>
    <circle cx="79.3" cy="140.7" r="4.5" fill="#f87171" />
    <text x="62" y="155" text-anchor="end" font-size="15" fill="#f87171">A</text>
    <circle cx="250" cy="70" r="4.5" fill="#f87171" />
    <text x="258" y="93" font-size="15" fill="#f87171">B</text>

    <g v-if="showForces">
      <!-- A 处的公切面与半径 -->
      <line x1="47.5" y1="108.9" x2="111.1" y2="172.5" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5" />
      <text x="44" y="102" text-anchor="end" font-size="13" fill="#94a3b8">切线</text>
      <line x1="150" y1="70" x2="79.3" y2="140.7" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="6 5" />
      <polyline points="85.7,147.1 92,140.7 85.7,134.3" fill="none" stroke="#f87171" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />

      <!-- A 处：沿半径指向球心 -->
      <CourseArrow :from="{ x: 79.3, y: 140.7 }" :to="{ x: 121.7, y: 98.3 }" stroke="#f87171" stroke-width="3" />
      <text x="110" y="112" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#f87171">F</text>

      <!-- B 处：接触的是碗口的棱，弹力垂直于杆、斜向左上 -->
      <polyline points="258.3,66.6 254.9,58.3 246.6,61.7" fill="none" stroke="#f87171" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <CourseArrow :from="{ x: 250, y: 70 }" :to="{ x: 229, y: 19.2 }" stroke="#f87171" stroke-width="3" />
      <text x="220" y="44" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="#f87171">F</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  /** 是否显示两处弹力与切线/半径标注（题面只给碗、杆与 A、B 两点） */
  showForces?: boolean;
}>();
</script>
