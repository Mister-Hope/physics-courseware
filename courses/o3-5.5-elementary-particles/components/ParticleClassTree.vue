<!-- 5.5 P6：粒子的分类树——左边「粒子」，右边四类（强子 / 轻子 / 规范玻色子 / 希格斯玻色子），由 step 逐类展开 -->
<template>
  <svg viewBox="0 0 900 332" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="16"
      y="134"
      width="168"
      height="64"
      rx="14"
      fill="var(--c-surface)"
      stroke="var(--c-accent)"
      stroke-width="1.6"
    />
    <text
      x="100"
      y="162"
      text-anchor="middle"
      font-size="22"
      font-weight="700"
      fill="var(--c-text)"
    >
      粒子
    </text>
    <text x="100" y="184" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">
      已发现 400 多种
    </text>
    <g
      v-for="(item, index) in items"
      :key="item.name"
      :visibility="step >= index + 1 ? 'visible' : 'hidden'"
    >
      <path
        :d="`M184 166 H252 V${item.center} H326`"
        fill="none"
        stroke="var(--c-border-glow)"
        stroke-width="1.6"
      />
      <rect
        x="326"
        :y="item.center - 32"
        width="558"
        height="64"
        rx="14"
        fill="var(--c-surface)"
        stroke="var(--c-border)"
        stroke-width="1.2"
      />
      <circle cx="352" :cy="item.center" r="4.2" fill="var(--c-accent)" />
      <text x="368" :y="item.center - 4" font-size="20" font-weight="700" fill="var(--c-text)">
        {{ item.name }}
      </text>
      <text x="368" :y="item.center + 21" font-size="15" fill="var(--c-text-dim)">
        {{ item.detail }}
      </text>
    </g>
  </svg>
</template>

<script setup lang="ts">
interface TreeNode {
  name: string;
  detail: string;
  center: number;
}

const { step = 0 } = defineProps<{ step?: number }>();

const items: TreeNode[] = [
  { name: "强子", detail: "参与强相互作用：质子、中子、介子、超子", center: 40 },
  { name: "轻子", detail: "不参与强相互作用：电子、中微子等 6 种", center: 124 },
  { name: "规范玻色子", detail: "传递相互作用：光子、中间玻色子、胶子", center: 208 },
  { name: "希格斯玻色子", detail: "使基本粒子获得质量：2012 年由大型强子对撞机发现", center: 292 },
];
</script>
