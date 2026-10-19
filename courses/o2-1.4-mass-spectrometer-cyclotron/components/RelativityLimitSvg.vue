<!--
  P12 为什么存在能量上限（静态图，无 props）
  左右两组节拍对比（都不出现具体数值）：
    左（低速）：三圈的"半圆用时"都等于电源半周期 T/2，逐条对齐 → 同步（--c-ok）；
    右（高速）：电源半周期条不变，半圆用时逐圈变长，第三圈已明显越过 T/2 标记线 → 失步（--c-danger）。
-->
<script setup lang="ts">
interface Panel {
  key: "slow" | "fast";
  title: string;
  status: string;
  statusColor: string;
  statusSoft: string;
  /** 条左侧文字的右端、条形起点、组标题中心 */
  labelX: number;
  barX: number;
  titleX: number;
}

/** 电源半周期条的基准长度；半圆用时条拿它做参照 */
const SLOT = 130;
const BAR_H = 15;
/** 三圈的条形顶端纵坐标；每圈一对（上＝半圆用时、下＝电源半周期） */
const PAIR_TOPS = [60, 108, 156];

/** 半圆用时（相对电源半周期）：低速三圈等长；高速逐圈变长，第三圈明显错位 */
const RUNS: Record<Panel["key"], number[]> = {
  slow: [1, 1, 1],
  fast: [1, 1.075, 1.2],
};

const PANELS: Panel[] = [
  {
    key: "slow",
    title: "低速",
    status: "同步",
    statusColor: "var(--c-ok)",
    statusSoft: "var(--c-ok-soft)",
    labelX: 100,
    barX: 110,
    titleX: 175,
  },
  {
    key: "fast",
    title: "高速",
    status: "失步",
    statusColor: "var(--c-danger)",
    statusSoft: "var(--c-danger-soft)",
    labelX: 440,
    barX: 450,
    titleX: 515,
  },
];
</script>

<template>
  <svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" class="rl-svg" role="img" aria-label="低速时半圆用时与电源半周期逐圈对齐，高速时逐圈变长而失步">
    <template v-for="panel in PANELS" :key="panel.key">
      <!-- T/2 标记线：电源半周期条正好画到这条线 -->
      <line
        :x1="panel.barX + SLOT"
        y1="46"
        :x2="panel.barX + SLOT"
        y2="196"
        stroke="var(--c-text-dim)"
        stroke-width="1.4"
        stroke-dasharray="5 5"
        opacity="0.5"
      />
      <text :x="panel.barX + SLOT + 7" y="52" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-text-dim)">T/2</text>
      <text :x="panel.titleX" y="34" text-anchor="middle" font-size="19" font-weight="600" fill="var(--c-text)">
        {{ panel.title }}
      </text>
      <!-- 第一对条左侧标出两种条的含义（其余各对同此） -->
      <text :x="panel.labelX" y="71" text-anchor="end" font-size="15" fill="var(--c-accent)">半圆用时</text>
      <text :x="panel.labelX" y="90" text-anchor="end" font-size="15" fill="var(--c-accent-2)">电源半周期</text>
      <!-- 三圈：每圈一对条，同一起点对齐 -->
      <template v-for="(top, index) in PAIR_TOPS" :key="index">
        <rect :x="panel.barX" :y="top" :width="RUNS[panel.key][index] * SLOT" :height="BAR_H" rx="4" fill="var(--c-accent)" opacity="0.85" />
        <rect :x="panel.barX" :y="top + 19" :width="SLOT" :height="BAR_H" rx="4" fill="var(--c-accent-2)" opacity="0.5" />
      </template>
      <rect :x="panel.titleX - 34" y="206" width="68" height="30" rx="10" :fill="panel.statusSoft" />
      <text :x="panel.titleX" y="227" text-anchor="middle" font-size="18" font-weight="700" :fill="panel.statusColor">
        {{ panel.status }}
      </text>
    </template>
  </svg>
</template>

<style scoped>
.rl-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
