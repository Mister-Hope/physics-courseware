<template>
  <!-- 第 21 页「练一练」：两块砖斜搭成倒 V（上端棱对棱接触，接触处看不到"面"，所以法线方向不能由接触形状确定）。
       整个图形左右对称 ⇒ 两砖互相给的弹力只能是水平的；答案层给出接触点与水平向左的弹力。 -->
  <svg class="fig" viewBox="30 20 400 160" style="max-width: 30rem" xmlns="http://www.w3.org/2000/svg">
    <!-- 地面 -->
    <line x1="40" y1="160" x2="420" y2="160" stroke="#cbd5e1" stroke-width="3" />

    <!-- 左右两块砖：长 180、厚 40，各倾斜 30°，上端内侧的棱接触于 (230,70) -->
    <rect
      x="-180"
      y="-20"
      width="180"
      height="40"
      rx="3"
      transform="translate(220,52.7) rotate(-30)"
      fill="rgba(148,163,184,0.2)"
      stroke="#cbd5e1"
      stroke-width="2.4"
    />
    <rect
      x="0"
      y="-20"
      width="180"
      height="40"
      rx="3"
      transform="translate(240,52.7) rotate(30)"
      fill="rgba(148,163,184,0.2)"
      stroke="#cbd5e1"
      stroke-width="2.4"
    />

    <!-- 接触点（常显） -->
    <circle cx="230" cy="70" r="4" fill="#e2a846" />

    <g v-if="showForces">
      <!-- 左右对称 ⇒ 这对弹力只能是水平方向 -->
      <line x1="130" y1="70" x2="330" y2="70" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="6 5" />
      <CourseArrow :from="{ x: 230, y: 70 }" :to="{ x: 140, y: 70 }" stroke="#e2a846" stroke-width="3" />
      <text x="192" y="60" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#e2a846">F</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  /** 是否显示弹力（题面只给两块砖与接触点） */
  showForces?: boolean;
}>();
</script>
