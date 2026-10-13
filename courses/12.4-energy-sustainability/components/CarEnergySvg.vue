<!-- 汽车能流页：70 kW 的燃料功率冲刷一辆车，真正有用的只有 9 kW（总效率约 13%）
     数据全部来自教材 12.4「STSE：汽车和能源」：70 kW → 蒸发 1 kW / 进入发动机 69 kW
     → 做功 17 kW（水箱循环与空调 5 + 传动 3 + 驱动轮 9）+ 废热与散热 52 kW
     条形宽度严格按 kW 等比（9.14px/kW），且按老师要求把「有用」放在最前、损失依次排后 -->

<script setup lang="ts">
/** 按「有效在前、无效在后」排列；条形宽度 = kW × 9.14（70 kW 铺满 640px） */
const segments = [
  { key: "wheel", x: 40, w: 83, fill: "#e2a846" },
  { key: "heat", x: 123, w: 475, fill: "rgba(148,163,184,0.3)" },
  { key: "hvac", x: 598, w: 46, fill: "rgba(96,165,250,0.35)" },
  { key: "drive", x: 644, w: 27, fill: "rgba(45,212,191,0.35)" },
  { key: "evap", x: 671, w: 9, fill: "rgba(248,113,113,0.55)" },
];

const legend = [
  { x: 40, y: 176, fill: "#e2a846", text: "驱动轮（有用）9 kW" },
  { x: 280, y: 176, fill: "rgba(148,163,184,0.3)", text: "废热与散热 52 kW" },
  { x: 500, y: 176, fill: "rgba(96,165,250,0.35)", text: "空调与水箱 5 kW" },
  { x: 40, y: 206, fill: "rgba(45,212,191,0.35)", text: "传动装置 3 kW" },
  { x: 280, y: 206, fill: "rgba(248,113,113,0.55)", text: "汽油蒸发 1 kW" },
];
</script>

<template>
  <svg viewBox="0 0 720 220" width="100%" xmlns="http://www.w3.org/2000/svg">
    <text x="40" y="26" text-anchor="start" font-size="12" fill="#94a3b8">各种汽车消耗的能量，占全部交通工具能耗总量的 73%</text>
    <text x="40" y="50" text-anchor="start" font-size="13" fill="#94a3b8">燃料提供的功率 70 kW</text>
    <text x="680" y="50" text-anchor="end" font-size="14" fill="#e2a846">总效率 ≈ 13%</text>
    <rect v-for="seg in segments" :key="seg.key" :x="seg.x" y="64" :width="seg.w" height="52" :fill="seg.fill" />
    <text x="81" y="99" text-anchor="middle" font-size="14" font-weight="bold" fill="#0f1425">9 kW</text>
    <text x="360" y="99" text-anchor="middle" font-size="14" fill="#e2e8f0">52 kW 废热与散热</text>
    <path d="M123 120 V132 H680 V120" fill="none" stroke="rgba(148,163,184,0.5)" stroke-width="1.4" />
    <text x="401" y="150" text-anchor="middle" font-size="12" fill="#cbd5e1">其余 61 kW 都是损耗</text>
    <g v-for="item in legend" :key="item.text">
      <rect :x="item.x" :y="item.y - 11" width="13" height="13" rx="3" :fill="item.fill" />
      <text :x="item.x + 21" :y="item.y" font-size="13" fill="#cbd5e1">{{ item.text }}</text>
    </g>
  </svg>
</template>
