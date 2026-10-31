<!--
  灵敏电流计读数方向说明页（新增页）：电流从哪一侧接线柱流入 → 指针往哪一侧偏。
  甲：电流从左接线柱流入 → 指针向左偏；乙：电流从右接线柱流入 → 指针向右偏（与真题口径一致：电流从哪一侧接线柱流入，指针就向那一侧偏）。
  表盘用共享 Galvanometer（接线柱在左右两侧 9/3 点、零位竖直向上、正角顺时针）。
-->
<script setup lang="ts">
const METER = { cx: 185, cy: 100, r: 28 };
/** 两个对照：从哪侧流入、指针偏角（正 = 顺时针 = 向右）、结论 */
const PANELS = [
  { x: 0, name: "甲", inflow: "left" as const, angle: -34, needle: "指针向左偏", entry: "电流从左接线柱流入" },
  { x: 450, name: "乙", inflow: "right" as const, angle: 34, needle: "指针向右偏", entry: "电流从右接线柱流入" },
];
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 900 212" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g v-for="p in PANELS" :key="p.name">
        <text :x="p.x + 24" y="30" font-size="20" fill="var(--c-text-dim)">{{ p.name }}</text>
        <!-- 引线：左右两段，止于表盘接线柱（185 ∓ 30） -->
        <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
          <path :d="`M ${p.x + 40} 100 H ${p.x + 157}`" />
          <path :d="`M ${p.x + 213} 100 H ${p.x + 330}`" />
        </g>
        <!-- 电流方向：两条引线同向（从左进、向右出 / 从右进、向左出） -->
        <CourseArrow
          :from="{ x: p.x + (p.inflow === 'left' ? 62 : 118), y: 100 }"
          :to="{ x: p.x + (p.inflow === 'left' ? 118 : 62), y: 100.1 }"
          :stroke="p.inflow === 'left' ? 'var(--c-accent)' : 'var(--c-text-dim)'"
          :stroke-width="2.6"
        />
        <CourseArrow
          :from="{ x: p.x + (p.inflow === 'left' ? 252 : 308), y: 100 }"
          :to="{ x: p.x + (p.inflow === 'left' ? 308 : 252), y: 100.1 }"
          :stroke="p.inflow === 'left' ? 'var(--c-text-dim)' : 'var(--c-accent)'"
          :stroke-width="2.6"
        />
        <!-- 灵敏电流计（指针按方向偏转） -->
        <Galvanometer :x="p.x + METER.cx" :y="METER.cy" :r="METER.r" :angle="p.angle" />
        <text :x="p.x + METER.cx" y="172" text-anchor="middle" font-size="20" fill="var(--c-text)">
          {{ p.needle }}
        </text>
        <text :x="p.x + METER.cx" y="200" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">
          {{ p.entry }}
        </text>
      </g>
    </svg>
  </div>
</template>
