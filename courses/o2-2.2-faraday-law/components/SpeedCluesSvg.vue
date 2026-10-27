<!--
  P2 引课：同一块磁体、同一个线圈，慢插与快插时灵敏电流计指针偏角不同。
  两幅小图并排（左慢右快），指针偏角与插入速度对应；分步只控制“哪一幅先出现”，图内几何固定。
  图元用共享组件：磁体 BarMagnet（S 上、N 下，向下插入）、线圈 Solenoid（轴竖直，连续螺旋线）、
  表盘 Galvanometer（导线分别止于左 / 右接线柱；两幅是同一装置、同一绕向，感应电流方向相同，
  故指针同侧偏，只差偏角大小 —— 本页只讲“偏角大小”，不讲方向）。
  指针方向按教师约定（电流从哪侧接线柱流入，指针就向同侧偏）：下引线接右接线柱，读数取正角＝向右偏；
  与绕向自洽——N 极朝下靠近，穿过线圈的向下磁通量增大，感应电流的磁场向上，线圈中电流自上而下
  （direction="ccw" 的绕向下，右手螺旋给出向上的 B），故电流从下引线流入右接线柱 → 指针向右偏。
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
  /** 指针偏角（度）：正 = 向右偏；两幅同向、只差大小 */
  angle: number;
  verdict: string;
  big: boolean;
}

const scenes: Scene[] = [
  { x: 155, title: "慢速插入", arrowLen: 22, angle: 12, verdict: "偏角小", big: false },
  { x: 465, title: "快速插入", arrowLen: 34, angle: 32, verdict: "偏角大", big: true },
];
</script>

<template>
  <svg viewBox="0 0 620 215" xmlns="http://www.w3.org/2000/svg" class="w-full">
    <g v-for="(s, i) in scenes" :key="s.title" :transform="`translate(${s.x} 0)`">
      <!-- 小标题：常显 -->
      <text x="0" y="18" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">
        {{ s.title }}
      </text>

      <!-- 条形磁体：S 在上、N 在下，正对线圈 -->
      <BarMagnet :x="0" :y="48" :length="34" :width="48" n-side="bottom" :label-size="11" />

      <!-- 线圈：轴竖直（上下放置的圆环）；3 匝整数 ⇒ 两端都在右侧 (42,116) / (42,152) -->
      <Solenoid :x="0" :y="134" :length="36" :radius="42" :turns="3" orientation="vertical" direction="ccw" :phase="0" :line-width="2.6" :back-opacity="0.35" />

      <!-- 引线：上引线水平进左接线柱，下引线绕过表盘下方水平进右接线柱（表盘圆心 120,134、r=24 ⇒ 96 / 144） -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path d="M 42 116 H 70 V 134 H 96" />
        <path d="M 42 152 H 62 V 182 H 152 V 134 H 144" />
      </g>

      <!-- 灵敏电流计：表盘常显，指针按步偏转 -->
      <Galvanometer :x="120" :y="134" :r="24" :angle="step >= i + 1 ? s.angle : 0" />

      <!-- 按步揭示：速度箭头、结论 -->
      <g v-if="step >= i + 1">
        <CourseArrow :from="{ x: 0, y: 69 }" :to="{ x: 0, y: 69 + s.arrowLen }" stroke="var(--c-velocity)" :stroke-width="2.4" />
        <text x="12" :y="77 + s.arrowLen / 2" font-family="KaTeX_Math, serif" font-style="italic" font-size="16" fill="var(--c-velocity)">v</text>
        <text x="120" y="206" text-anchor="middle" font-size="14" :fill="s.big ? 'var(--c-accent)' : 'var(--c-text-dim)'">
          {{ s.verdict }}
        </text>
      </g>
    </g>
  </svg>
</template>
