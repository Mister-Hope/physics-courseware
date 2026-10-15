<script setup lang="ts">
/** 第 4 页：从“天圆地方”到开普勒三定律的历史脉络。 五个节点依次是：古代中国的天圆地方 → 托勒密地心说 → 哥白尼日心说 → 第谷的精密观测 → 开普勒归纳总结出三定律； 最后一个节点用强调色，配合页面上“三定律是在第谷的观测数据上归纳总结出来的”这句考点。 */
interface Node {
  x: number;
  /** 主标题（人名与贡献） */
  main: string;
  /** 副标题（国籍与年代） */
  sub: string;
  /** 文字放在时间轴上方还是下方（上下交错，避免挤在一起） */
  above: boolean;
  /** 是否强调（开普勒节点） */
  accent?: boolean;
}

const NODES: Node[] = [
  { x: 82, main: "天圆地方", sub: "古代中国", above: true },
  { x: 266, main: "托勒密 · 地心说", sub: "古希腊，约 2 世纪", above: false },
  { x: 450, main: "哥白尼 · 日心说", sub: "波兰，1543《天体运行论》", above: true },
  { x: 634, main: "第谷 · 精密观测", sub: "丹麦，20 余年观测火星", above: false },
  { x: 818, main: "开普勒 · 三定律", sub: "德国，第谷的助手", above: true, accent: true },
];
const AXIS_Y = 150;
</script>

<template>
  <svg
    viewBox="0 55 900 190"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="历史脉络：天圆地方、托勒密地心说、哥白尼日心说、第谷精密观测、开普勒归纳总结出三定律。"
  >
    <CourseArrow :from="{ x: 50, y: AXIS_Y }" :to="{ x: 880, y: AXIS_Y }" stroke="#94a3b8" stroke-width="1.6" opacity="0.55" />
    <g v-for="node in NODES" :key="node.main">
      <circle :cx="node.x" :cy="AXIS_Y" :r="node.accent ? 9 : 6" :fill="node.accent ? '#e2a846' : '#94a3b8'" :opacity="node.accent ? 1 : 0.85" />
      <circle v-if="node.accent" :cx="node.x" :cy="AXIS_Y" r="15" fill="none" stroke="#e2a846" stroke-width="1.6" opacity="0.6" />
      <line v-if="node.above" :x1="node.x" :y1="AXIS_Y - 16" :x2="node.x" :y2="AXIS_Y - 30" stroke="#94a3b8" stroke-width="1.1" opacity="0.5" />
      <line v-else :x1="node.x" :y1="AXIS_Y + 16" :x2="node.x" :y2="AXIS_Y + 30" stroke="#94a3b8" stroke-width="1.1" opacity="0.5" />
      <template v-if="node.above">
        <text :x="node.x" :y="107" text-anchor="middle" font-size="14" fill="#94a3b8">{{ node.sub }}</text>
        <text :x="node.x" :y="133" text-anchor="middle" font-size="18" :fill="node.accent ? '#e2a846' : '#e2e8f0'" :font-weight="node.accent ? 700 : 400">
          {{ node.main }}
        </text>
      </template>
      <template v-else>
        <text :x="node.x" :y="172" text-anchor="middle" font-size="18" fill="#e2e8f0">{{ node.main }}</text>
        <text :x="node.x" :y="196" text-anchor="middle" font-size="14" fill="#94a3b8">{{ node.sub }}</text>
      </template>
    </g>
  </svg>
</template>
