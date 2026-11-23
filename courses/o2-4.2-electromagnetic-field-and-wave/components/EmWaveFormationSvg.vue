<!--
  4.2 P6：电磁波的形成（分步 4 帧）
  —— 某区域的电场周期性变化 → 周围产生变化的磁场 → 较远处产生新的电场 → 再产生新的磁场……
  四个格子依次点亮，空格先显示“？”，让学生先猜下一个是什么（点击只新增，不顶跑）。
  step：0 = 只有第一个电场；1 = 加磁场；2 = 加电场；3 = 加磁场 + 传播方向。
-->
<template>
  <svg viewBox="0 0 660 210" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g v-for="c in cells" :key="c.cx">
      <rect :x="c.cx - 46" y="40" width="92" height="92" rx="12" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.4" />
      <g v-if="step >= c.reveal">
        <CourseArrow v-if="c.kind === 'E'" :from="{ x: c.cx, y: 118 }" :to="{ x: c.cx, y: 56 }" stroke="var(--c-physics)" :stroke-width="2.6" :head-size="10" />
        <g v-else>
          <ellipse :cx="c.cx" cy="86" rx="26" ry="22" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="7 6" />
          <CourseArrow :from="{ x: c.cx + 26, y: 78 }" :to="{ x: c.cx + 26, y: 94 }" stroke="var(--c-accent)" :stroke-width="1.8" :head-size="7" />
          <CourseArrow :from="{ x: c.cx - 26, y: 94 }" :to="{ x: c.cx - 26, y: 78 }" stroke="var(--c-accent)" :stroke-width="1.8" :head-size="7" />
        </g>
        <text :x="c.cx" y="160" text-anchor="middle" font-size="16" :fill="c.kind === 'E' ? 'var(--c-physics)' : 'var(--c-accent)'">
          {{ c.kind === "E" ? "电场" : "磁场" }}
          <tspan font-family="KaTeX_Math" font-style="italic">{{ c.kind }}</tspan>
        </text>
      </g>
      <text v-else :x="c.cx" y="98" text-anchor="middle" font-size="30" fill="var(--c-text-mute)">？</text>
    </g>
    <CourseArrow
      v-for="a in links"
      :key="`l-${a.x1}`"
      :from="{ x: a.x1, y: 86 }"
      :to="{ x: a.x2, y: 86 }"
      v-show="step >= a.reveal"
      stroke="var(--c-text-dim)"
      :stroke-width="1.8"
      :head-size="8"
      stroke-dasharray="6 5"
    />
    <CourseArrow v-if="step >= 3" :from="{ x: 46, y: 190 }" :to="{ x: 642, y: 190 }" stroke="var(--c-text-dim)" :stroke-width="1.8" :head-size="9" />
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

/** 四个格子：cx = 中心横坐标，kind = 该处被激发的场，reveal = 第几击后点亮 */
const cells = [
  { cx: 92, kind: "E", reveal: 0 },
  { cx: 260, kind: "B", reveal: 1 },
  { cx: 428, kind: "E", reveal: 2 },
  { cx: 596, kind: "B", reveal: 3 },
] as const;

/** 格子之间的“激发”箭头 */
const links = [
  { x1: 146, x2: 206, reveal: 1 },
  { x1: 314, x2: 374, reveal: 2 },
  { x1: 482, x2: 542, reveal: 3 },
];
</script>
