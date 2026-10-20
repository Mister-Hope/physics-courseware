<script setup lang="ts">
/**
 * 第 16 页：FAST（中国天眼）结构示意——抛物面反射面（天线）+ 悬在焦点的接收系统， 下方一条口径尺寸线标出 500 m（与反射面同宽，是「口径 = 反射面直径」的直观表达）。
 *
 * Step 0：只画反射面轮廓；step 1：标出「天线」「接收系统」；step 2：出现口径尺寸线。 只作结构示意：支撑结构不按真实几何比例，尺寸线用刻度线而不是箭头（测量线不画箭头）。
 *
 * 尺寸口径：本图放在约 480 px 宽的栏里（viewBox 宽 900 ⇒ 渲染约 0.53 倍）， 图内字号按 32–34 给（渲染后约 17 px），不能按 16px 体系直接写十几。
 */
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg
    viewBox="0 0 900 330"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="500 米口径球面射电望远镜的结构示意：抛物面反射面作为天线，焦点处悬挂接收系统"
  >
    <path
      d="M 120 160 Q 450 305 780 160"
      fill="color-mix(in srgb, var(--c-physics) 10%, transparent)"
      stroke="var(--c-text-dim)"
      stroke-width="7"
      stroke-linecap="round"
    />
    <line x1="285" y1="214" x2="450" y2="126" stroke="var(--c-physics)" stroke-width="3" />
    <line x1="615" y1="214" x2="450" y2="126" stroke="var(--c-physics)" stroke-width="3" />
    <rect x="424" y="102" width="52" height="30" rx="6" fill="var(--c-physics)" opacity="0.85" />
    <g v-if="step >= 1">
      <text x="140" y="128" font-size="32" fill="var(--c-text)">天线</text>
      <text x="498" y="120" font-size="32" fill="var(--c-text)">接收系统</text>
    </g>
    <g v-if="step >= 2">
      <line x1="120" y1="300" x2="780" y2="300" stroke="var(--c-text-dim)" stroke-width="2.4" />
      <line x1="120" y1="290" x2="120" y2="310" stroke="var(--c-text-dim)" stroke-width="2.4" />
      <line x1="780" y1="290" x2="780" y2="310" stroke="var(--c-text-dim)" stroke-width="2.4" />
      <text x="450" y="282" font-size="30" text-anchor="middle" fill="var(--c-text-dim)">
        <tspan>口径</tspan>
        <tspan font-family="KaTeX_Main" font-style="normal" dx="10">500</tspan>
        <tspan font-family="KaTeX_Main" font-style="normal" dx="6">m</tspan>
      </text>
    </g>
  </svg>
</template>
