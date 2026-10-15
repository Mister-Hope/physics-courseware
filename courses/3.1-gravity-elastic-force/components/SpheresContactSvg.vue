<template>
  <!-- 第 20 页「练一练」左图：两个球面互相挤压。干净图只给两球、两球心与接触点；
       showForces 打开后才给公切面（虚线）、两球心连线（公法线）和弹力——弹力画在接触点、方向沿两球心连线。 -->
  <svg class="fig" viewBox="0 0 340 210" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 球体立体径向高光渐变（无空格 rgba 兼容 UnoCSS attributify） -->
      <radialGradient id="sphereGradP20" cx="38%" cy="35%" r="62%">
        <stop offset="0%" stop-color="color-mix(in srgb, var(--c-neutral-200) 32%, transparent)" />
        <stop offset="65%" stop-color="color-mix(in srgb, var(--c-text-dim) 18%, transparent)" />
        <stop offset="100%" stop-color="color-mix(in srgb, var(--c-neutral-700) 28%, transparent)" />
      </radialGradient>
    </defs>

    <circle cx="105" cy="95" r="52" fill="url(#sphereGradP20)" stroke="var(--c-neutral-300)" stroke-width="2.6" />
    <circle cx="209" cy="95" r="52" fill="url(#sphereGradP20)" stroke="var(--c-neutral-300)" stroke-width="2.6" />

    <!-- 两球心（题目已给）与接触点（常显，便于学生看清"交点"在哪） -->
    <circle cx="105" cy="95" r="4" fill="var(--c-velocity)" />
    <circle cx="209" cy="95" r="4" fill="var(--c-velocity)" />
    <text x="105" y="80" text-anchor="middle" font-size="13" fill="var(--c-velocity)">球心</text>
    <text x="209" y="80" text-anchor="middle" font-size="13" fill="var(--c-velocity)">球心</text>
    <circle cx="157" cy="95" r="3.5" fill="var(--c-accent)" />

    <g v-if="showForces">
      <!-- 公切面 -->
      <line x1="157" y1="30" x2="157" y2="162" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="6 5" />
      <polyline points="157,86 166,86 166,95" fill="none" stroke="var(--c-text-dim)" stroke-width="1.3" opacity="0.8" />
      <text x="164" y="34" font-size="13" fill="var(--c-text-dim)">公切面</text>

      <!-- 公法线：两球心的连线 -->
      <line x1="105" y1="95" x2="209" y2="95" stroke="var(--c-velocity)" stroke-width="1.5" stroke-dasharray="6 5" />

      <!-- 右侧球受到左侧球的弹力：作用在接触点、方向水平向右 -->
      <CourseArrow :from="{ x: 157, y: 95 }" :to="{ x: 272, y: 95 }" stroke="var(--c-accent)" stroke-width="3" />
      <text x="279" y="90" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent)">F</text>
      <!-- 球心点补画在箭头之上，别被箭杆盖住 -->
      <circle cx="209" cy="95" r="4" fill="var(--c-velocity)" />
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  /** 是否显示弹力与法线标注（题面只给干净的两球） */
  showForces?: boolean;
}>();
</script>
