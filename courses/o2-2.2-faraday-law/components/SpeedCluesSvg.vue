<!--
  P2 引课：同一块磁体、同一个线圈，慢插与快插时电流表指针偏角不同。
  两幅小图并排（左慢右快），指针偏角与插入速度对应；
  分步只控制“哪一幅先出现”，图内几何固定。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 1 = 出现慢插，2 = 出现快插并给出对比结论 */
  step?: number;
}>();

interface Scene {
  x: number;
  title: string;
  arrowLen: number;
  angle: number;
  verdict: string;
  big: boolean;
}

const scenes: Scene[] = [
  { x: 155, title: "慢速插入", arrowLen: 24, angle: 12, verdict: "偏角小", big: false },
  { x: 465, title: "快速插入", arrowLen: 38, angle: 32, verdict: "偏角大", big: true },
];

/** 指针尖端坐标（表盘中心 (120,150)，支点在下方 (120,166)） */
const needle = (angle: number): { x: number; y: number } => {
  const rad = (angle * Math.PI) / 180;

  return {
    x: 120 + 18 * Math.sin(rad),
    y: 166 - 18 * Math.cos(rad),
  };
};
</script>

<template>
  <svg viewBox="0 0 620 215" xmlns="http://www.w3.org/2000/svg" class="w-full">
    <g v-for="(s, i) in scenes" :key="s.title" :transform="`translate(${s.x} 0)`">
      <!-- 小标题：常显 -->
      <text x="0" y="18" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">
        {{ s.title }}
      </text>

      <!-- 装置：常显 -->
      <g>
        <!-- 条形磁体（下极 N，正对线圈） -->
        <rect x="-24" y="34" width="48" height="17" rx="2" fill="var(--c-velocity)" />
        <rect x="-24" y="51" width="48" height="17" rx="2" fill="var(--c-danger)" />
        <text x="0" y="47" text-anchor="middle" font-family="KaTeX_Main, serif" font-size="9" fill="var(--c-bg-soft)">S</text>
        <text x="0" y="64" text-anchor="middle" font-family="KaTeX_Main, serif" font-size="9" fill="var(--c-bg-soft)">N</text>

        <!-- 线圈：三匝水平圆环（轴向竖直） -->
        <g fill="none" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round">
          <ellipse cx="0" cy="118" rx="44" ry="9" opacity="0.55" />
          <ellipse cx="0" cy="130" rx="44" ry="9" opacity="0.8" />
          <ellipse cx="0" cy="142" rx="44" ry="9" />
        </g>

        <!-- 引线到电流表 -->
        <g fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" stroke-linecap="round">
          <path d="M 44 130 H 84 V 144 H 96" />
          <path d="M 44 142 H 72 V 158 H 96" />
        </g>

        <!-- 电流表：表盘与支点常显 -->
        <circle cx="120" cy="150" r="24" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
        <text x="120" y="133" text-anchor="middle" font-family="KaTeX_Main, serif" font-size="10" fill="var(--c-text-dim)">G</text>
        <circle cx="120" cy="166" r="2.6" fill="var(--c-text)" />
      </g>

      <!-- 按步揭示：速度箭头、指针偏角、结论 -->
      <g v-if="step >= i + 1">
        <CourseArrow :from="{ x: 0, y: 72 }" :to="{ x: 0, y: 72 + s.arrowLen }" stroke="var(--c-velocity)" :stroke-width="2.4" />
        <text x="12" :y="80 + s.arrowLen / 2" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="var(--c-velocity)">v</text>
        <line x1="120" y1="166" :x2="needle(s.angle).x" :y2="needle(s.angle).y" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
        <text x="120" y="196" text-anchor="middle" font-size="14" :fill="s.big ? 'var(--c-accent)' : 'var(--c-text-dim)'">
          {{ s.verdict }}
        </text>
      </g>
    </g>
  </svg>
</template>
