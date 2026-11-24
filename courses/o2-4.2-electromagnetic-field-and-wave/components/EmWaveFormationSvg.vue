<!--
  4.2 P6：电磁波的形成（分步 4 帧）
  —— 某区域的电场周期性变化 → 周围产生变化的磁场 → 较远处产生新的电场 → 再产生新的磁场……
  四张“场卡”依次点亮，未亮的是“？”，让学生先猜下一个是什么（点击只新增，不顶跑）。
  step：0 = 只有第一个电场；1 = 加磁场；2 = 加电场；3 = 加磁场 + 底部“由近及远传播”。
-->
<template>
  <svg :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="select-none" aria-hidden="true">
    <defs>
      <filter :id="glowId" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
      <linearGradient :id="cardFadeId" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--c-surface)" stop-opacity="0.95" />
        <stop offset="1" stop-color="var(--c-surface)" stop-opacity="0.55" />
      </linearGradient>
    </defs>

    <g v-for="c in cells" :key="c.cx">
      <!-- 卡片：外发光 + 渐变底 + 描边 -->
      <rect
        :x="c.cx - CARD_W / 2"
        :y="CARD_Y"
        :width="CARD_W"
        :height="CARD_H"
        rx="14"
        :fill="c.kind === 'E' ? 'var(--c-physics)' : 'var(--c-accent)'"
        opacity="0.1"
        :filter="`url(#${glowId})`"
      />
      <rect
        :x="c.cx - CARD_W / 2"
        :y="CARD_Y"
        :width="CARD_W"
        :height="CARD_H"
        rx="14"
        :fill="`url(#${cardFadeId})`"
        :stroke="c.kind === 'E' ? 'var(--c-physics)' : 'var(--c-accent)'"
        :stroke-opacity="step >= c.reveal ? 0.55 : 0.18"
        stroke-width="1.4"
      />

      <g v-if="step >= c.reveal">
        <!-- 电场：竖直方向的双向箭头（正在周期性变化） -->
        <g v-if="c.kind === 'E'">
          <CourseArrow
            :from="{ x: c.cx - 13, y: CARD_MID + 34 }"
            :to="{ x: c.cx - 13, y: CARD_MID - 34 }"
            stroke="var(--c-physics)"
            :stroke-width="2.6"
            :head-size="10"
          />
          <CourseArrow
            :from="{ x: c.cx + 13, y: CARD_MID - 34 }"
            :to="{ x: c.cx + 13, y: CARD_MID + 34 }"
            stroke="var(--c-physics)"
            :stroke-width="2.6"
            :head-size="10"
          />
        </g>
        <!-- 磁场：闭合的环形场线 + 两个指向（右手螺旋的“转”） -->
        <g v-else>
          <ellipse :cx="c.cx" :cy="CARD_MID" rx="32" ry="26" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="8 6" />
          <CourseArrow
            :from="{ x: c.cx + 32, y: CARD_MID - 8 }"
            :to="{ x: c.cx + 30, y: CARD_MID + 14 }"
            stroke="var(--c-accent)"
            :stroke-width="2"
            :head-size="8"
          />
          <CourseArrow
            :from="{ x: c.cx - 32, y: CARD_MID + 8 }"
            :to="{ x: c.cx - 30, y: CARD_MID - 14 }"
            stroke="var(--c-accent)"
            :stroke-width="2"
            :head-size="8"
          />
        </g>

        <!-- 卡内标签：E₁ / B₁ + 中文场名 -->
        <text :x="c.cx" :y="CARD_Y + CARD_H - 14" text-anchor="middle" font-size="15" :fill="c.kind === 'E' ? 'var(--c-physics)' : 'var(--c-accent)'">
          <tspan font-family="KaTeX_Math" font-style="italic" font-size="21">{{ c.kind }}</tspan>
          <tspan baseline-shift="sub" font-size="13">{{ c.index }}</tspan>
        </text>
        <text :x="c.cx" :y="CARD_Y + 27" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">
          {{ c.kind === "E" ? "电场" : "磁场" }}
        </text>
      </g>
      <text v-else :x="c.cx" :y="CARD_MID + 12" text-anchor="middle" font-size="32" fill="var(--c-text-mute)">？</text>
    </g>

    <!-- 相邻两卡之间的“激发”箭头 -->
    <g v-for="a in links" :key="`l-${a.x1}`" v-show="step >= a.reveal">
      <CourseArrow
        :from="{ x: a.x1, y: CARD_MID }"
        :to="{ x: a.x2, y: CARD_MID }"
        stroke="var(--c-text-dim)"
        :stroke-width="1.8"
        :head-size="8"
        stroke-dasharray="6 5"
      />
      <text :x="(a.x1 + a.x2) / 2" :y="CARD_MID - 16" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">激发</text>
    </g>

    <!-- 底部：由近及远的传播方向 -->
    <g v-if="step >= 3">
      <CourseArrow :from="{ x: 120, y: TRACK_Y }" :to="{ x: VIEW_W - 120, y: TRACK_Y }" stroke="var(--c-accent)" :stroke-width="2" :head-size="10" />
      <text :x="VIEW_W / 2" :y="TRACK_Y - 14" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">由近及远传播</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { useId } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

const VIEW_W = 880;
const VIEW_H = 300;
const CARD_W = 150;
const CARD_H = 124;
const CARD_Y = 46;
const CARD_MID = CARD_Y + CARD_H / 2;
const TRACK_Y = 254;

const glowId = `emf-glow-${useId()}`;
const cardFadeId = `emf-card-${useId()}`;

/** 四张场卡：cx = 中心横坐标，kind = 该处被激发的场，reveal = 第几击后点亮 */
const cells = [
  { cx: 140, kind: "E", index: 1, reveal: 0 },
  { cx: 340, kind: "B", index: 1, reveal: 1 },
  { cx: 540, kind: "E", index: 2, reveal: 2 },
  { cx: 740, kind: "B", index: 2, reveal: 3 },
] as const;

/** 场卡之间的“激发”箭头 */
const links = [
  { x1: 140 + 75 + 4, x2: 340 - 75 - 4, reveal: 1 },
  { x1: 340 + 75 + 4, x2: 540 - 75 - 4, reveal: 2 },
  { x1: 540 + 75 + 4, x2: 740 - 75 - 4, reveal: 3 },
];
</script>
