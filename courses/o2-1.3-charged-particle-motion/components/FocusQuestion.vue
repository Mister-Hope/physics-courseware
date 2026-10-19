<!--
  选必2 1.x《复合场中的配速法与摆线运动》「磁汇聚」提问页配图
  —— 一束平行带电粒子（红色，带正电）水平射入一个圆形匀强磁场区域（半径 R）。

  磁场只存在于圆内：裸 · 点阵（垂直纸面向外）铺满圆内、圆外是场外区域；
  圆外只有水平的入射直线。图上**不给任何偏转结果**（先问后答，答案在下一页）。
-->
<script setup lang="ts">
/** 画布：1000 × 430 */
const W = 1000;
const H = 430;

/** 磁场圆心与半径（viewBox 用户单位） */
const OX = 600;
const OY = 215;
const R = 170;

/** 平行束各条射线的高度（以 R 为单位，上下对称） */
const BEAM = [-0.7, -0.35, 0, 0.35, 0.7];

/** 所有平行粒子共同的出发点横坐标 */
const X0 = 24;

/**
 * 某条平行粒子的入射点：高度 y 的水平线与磁场圆左半侧的交点
 *
 * @param k 入射高度（以 R 为单位，|k| < 1）
 * @returns 入射点（屏幕坐标）
 */
const entry = (k: number): { x: number; y: number } => ({
  x: OX - Math.sqrt(1 - k * k) * R,
  y: OY - k * R,
});

/** 半径标注线的末端（圆内右下方，避开入射束） */
const radiusTip = { x: OX + R * Math.cos(Math.PI / 5.2), y: OY + R * Math.sin(Math.PI / 5.2) };

const MATH = "KaTeX_Math, 'Times New Roman', serif";
const HALO = { stroke: "var(--c-bg)", "stroke-width": 3.6, "paint-order": "stroke" } as const;
</script>

<template>
  <div class="fig-focus-ask">
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      class="fig-svg select-none"
      role="img"
      aria-label="一束平行带电粒子水平射入圆形匀强磁场区域"
    >
      <defs>
        <clipPath id="fq-field">
          <circle :cx="OX" :cy="OY" :r="R" />
        </clipPath>
      </defs>

      <!-- 磁场区域：只存在于圆内（裸 · ＝ 垂直纸面向外） -->
      <g clip-path="url(#fq-field)">
        <FieldDots
          :x="OX - 170"
          :y="OY - 170"
          :cols="11"
          :rows="11"
          :spacing="34"
          :size="7"
          :line-width="1.4"
          :opacity="0.5"
          dir="out"
        />
      </g>
      <circle
        :cx="OX"
        :cy="OY"
        :r="R"
        fill="color-mix(in srgb, var(--c-accent) 7%, transparent)"
        stroke="var(--c-accent)"
        stroke-width="2.6"
      />

      <!-- 半径与圆心 -->
      <line
        :x1="OX"
        :y1="OY"
        :x2="radiusTip.x"
        :y2="radiusTip.y"
        stroke="var(--c-accent)"
        stroke-width="1.8"
        stroke-dasharray="7 6"
        opacity="0.85"
      />
      <circle :cx="OX" :cy="OY" r="4" fill="var(--c-accent)" />
      <text
        :x="OX - 13"
        :y="OY + 28"
        font-size="24"
        text-anchor="end"
        fill="var(--c-accent)"
        :font-family="MATH"
        font-style="italic"
        :style="HALO"
      >
        O
      </text>
      <text
        :x="(OX + radiusTip.x) / 2 - 14"
        :y="(OY + radiusTip.y) / 2 - 6"
        font-size="24"
        text-anchor="middle"
        fill="var(--c-accent)"
        :font-family="MATH"
        font-style="italic"
        :style="HALO"
      >
        R
      </text>

      <!-- 平行入射的带电粒子束：每条都水平射向圆周左半侧 -->
      <CourseArrow
        v-for="k in BEAM"
        :key="`beam-${k}`"
        :from="{ x: X0, y: entry(k).y }"
        :to="entry(k)"
        stroke="var(--c-force)"
        :stroke-width="2.6"
        :head-size="11"
      />
      <circle
        v-for="k in BEAM"
        :key="`dot-${k}`"
        :cx="entry(k).x"
        :cy="entry(k).y"
        r="5"
        fill="var(--c-force)"
      />

      <!-- 入射速度方向标注 -->
      <text
        x="190"
        :y="OY - 16"
        font-size="24"
        text-anchor="middle"
        fill="var(--c-force)"
        :font-family="MATH"
        font-style="italic"
        :style="HALO"
      >
        v
      </text>
    </svg>
  </div>
</template>

<style scoped>
.fig-focus-ask {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;

  min-width: 0;
  min-height: 0;
}

/* 图随可用空间缩放（preserveAspectRatio 默认 meet，永不溢出、也不顶跑别的内容） */
.fig-focus-ask .fig-svg {
  flex: 1 1 auto;
  width: 100%;
  max-width: none;
  min-height: 0;
}
</style>
