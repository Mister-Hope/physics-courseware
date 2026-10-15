<!-- 引课页：燃料一路转化下去的能量链（化学能 → 内能 → 机械能 → 电能 → 光能、内能），说明"能量没消失，只是在换形式" -->
<template>
  <svg viewBox="0 0 660 118" width="100%" xmlns="http://www.w3.org/2000/svg">
    <g v-for="node in nodes" :key="node.title">
      <rect
        :x="node.x"
        y="32"
        width="110"
        height="52"
        rx="12"
        fill="color-mix(in srgb, var(--c-surface-solid) 75%, transparent)"
        stroke="color-mix(in srgb, var(--c-text-dim) 28%, transparent)"
      />
      <text :x="node.x + 55" y="55" text-anchor="middle" font-size="15" fill="var(--c-text)">{{ node.title }}</text>
      <text :x="node.x + 55" y="73" text-anchor="middle" font-size="11" fill="var(--c-text-dim)">{{ node.sub }}</text>
    </g>
    <CourseArrow
      v-for="(node, i) in nodes.slice(0, -1)"
      :key="`arrow-${i}`"
      :from="{ x: node.x + 113, y: 58 }"
      :to="{ x: nodes[i + 1].x - 3, y: 58 }"
      stroke="var(--c-accent)"
      :stroke-width="2.2"
    />
  </svg>
</template>

<script setup lang="ts">
const nodes = [
  { x: 12, title: "化学能", sub: "燃料" },
  { x: 144, title: "内能", sub: "燃烧" },
  { x: 276, title: "机械能", sub: "汽轮机" },
  { x: 408, title: "电能", sub: "发电机" },
  { x: 540, title: "光能、内能", sub: "灯泡" },
];
</script>
