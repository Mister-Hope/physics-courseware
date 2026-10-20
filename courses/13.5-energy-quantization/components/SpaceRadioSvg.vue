<script setup lang="ts">
/**
 * 第 15 页：为什么射电望远镜能"看到"更远的宇宙。
 *
 * 天体（共享 CelestialPlanet）向各个方向发出整个电磁波段的辐射；星际尘埃（半透明椭圆团） 挡住可见光，而无线电波穿得过去，最终被右侧的射电望远镜接收。 纯定性示意：不标波长、不标衰减、不做任何计算。
 *
 * 尺寸口径：本图放在约 450 px 宽的栏里（viewBox 宽 900 ⇒ 渲染约 0.5 倍）， 所以图内字号按 30–34 给（渲染后约 15–17 px），不能按 16px 体系直接写十几。
 */
</script>

<template>
  <svg
    viewBox="0 0 900 300"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="天体发出整个电磁波段的辐射，星际尘埃挡住可见光，无线电波穿透尘埃后被射电望远镜接收"
  >
    <CelestialPlanet :x="96" :y="126" :r="52" variant="amber" label="天体" label-size="30" />
    <path
      d="M 156 104 q 12 -10 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="3.2"
      stroke-linecap="round"
    />
    <text x="166" y="84" font-size="30" fill="var(--c-accent)">可见光</text>
    <path
      d="M 156 166 q 12 -10 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0"
      fill="none"
      stroke="var(--c-accent-2)"
      stroke-width="3.4"
      stroke-linecap="round"
    />
    <text x="166" y="216" font-size="30" fill="var(--c-accent-2)">无线电波</text>
    <g fill="var(--c-text-dim)" opacity="0.12">
      <ellipse cx="480" cy="132" rx="94" ry="56" />
      <ellipse cx="524" cy="158" rx="78" ry="46" />
      <ellipse cx="486" cy="110" rx="66" ry="34" />
    </g>
    <text x="492" y="266" font-size="30" text-anchor="middle" fill="var(--c-text-dim)">星际尘埃</text>
    <path d="M 720 196 Q 782 268 844 196" fill="none" stroke="var(--c-physics)" stroke-width="6.5" stroke-linecap="round" />
    <line x1="762" y1="232" x2="788" y2="168" stroke="var(--c-physics)" stroke-width="3" />
    <line x1="812" y1="232" x2="788" y2="168" stroke="var(--c-physics)" stroke-width="3" />
    <circle cx="788" cy="164" r="7" fill="var(--c-physics)" />
    <text x="790" y="294" font-size="30" text-anchor="middle" fill="var(--c-text-dim)">射电望远镜</text>
  </svg>
</template>
