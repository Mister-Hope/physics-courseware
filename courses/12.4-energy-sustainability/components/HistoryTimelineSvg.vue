<!-- 能源与社会发展页：人类利用能源的三个时期 + 正在过渡的多能源结构时期 -->
<template>
  <svg viewBox="0 0 660 176" width="100%" xmlns="http://www.w3.org/2000/svg">
    <line x1="24" y1="88" x2="624" y2="88" stroke="rgba(148,163,184,0.4)" stroke-width="2" />
    <CourseArrow :from="{ x: 600, y: 88 }" :to="{ x: 648, y: 88 }" stroke="rgba(148,163,184,0.6)" :stroke-width="2" />
    <g v-for="(era, i) in eras" :key="era.name">
      <circle :cx="era.x" cy="88" r="6.5" fill="#e2a846" :opacity="i < 3 ? 1 : 0" />
      <circle :cx="era.x" cy="88" r="6.5" fill="none" stroke="#e2a846" stroke-width="2.2" />
      <text :x="era.x" y="66" text-anchor="middle" font-size="14" fill="#f1f5f9">{{ era.name }}</text>
      <text :x="era.x" y="114" text-anchor="middle" font-size="12" fill="#94a3b8">{{ era.line1 }}</text>
      <text :x="era.x" y="136" text-anchor="middle" font-size="12" fill="#94a3b8">{{ era.line2 }}</text>
    </g>
    <text x="648" y="168" text-anchor="end" font-size="12" fill="#94a3b8">向多能源结构的转换还远没有完成</text>
  </svg>
</template>

<script setup lang="ts">
const eras = [
  { x: 84, name: "柴薪时期", line1: "火的利用", line2: "第一个里程碑" },
  { x: 244, name: "煤炭时期", line1: "蒸汽机 · 工业革命", line2: "大规模利用化石能源" },
  { x: 404, name: "石油时期", line1: "内燃机 · 机械化", line2: "油气消耗超过煤炭" },
  { x: 564, name: "多能源结构时期", line1: "核能与新能源", line2: "正在过渡" },
];
</script>
