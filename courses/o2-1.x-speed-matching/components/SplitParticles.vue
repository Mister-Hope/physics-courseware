<!-- o2-1.x-speed-matching：电中性微粒在垂直纸面向里的磁场中分裂出 a、b 两个微粒，两者半径相等、轨迹外切，环绕方向均为逆时针（精修切线与清晰分层版） -->
<script setup lang="ts">
const { showAnalysis = false } = defineProps<{ showAnalysis?: boolean }>();

interface Point {
  x: number;
  y: number;
}

/** 文字深色光晕，压住背后的磁场记号 */
const halo = {
  stroke: "var(--c-bg)",
  "stroke-width": 3.5,
  "paint-order": "stroke",
};

/** 带中文下标（洛）的文字：光晕收细，避免 3.5px 描边把汉字糊成实心块 */
const haloSub = {
  stroke: "var(--c-bg)",
  "stroke-width": 2.4,
  "paint-order": "stroke",
};

/** 圆 a：圆心 (330, 172)、半径 86（底端 (330, 258)） */
const circleA = { x: 330, y: 172, r: 86 };
/** 圆 b：圆心 (330, 344)、半径 86（顶端 (330, 258)，与圆 a 在该点外切） */
const circleB = { x: 330, y: 344, r: 86 };

const rad = (deg: number): number => (deg * Math.PI) / 180;

/**
 * 圆上一点：θ 用数学角（0° 在右、逆时针为正），屏幕 y 向下故取负
 *
 * @param c 圆心与半径
 * @param theta 角度（度）
 * @returns 圆上该角度的点
 */
const onCircle = (c: { x: number; y: number; r: number }, theta: number): Point => ({
  x: c.x + c.r * Math.cos(rad(theta)),
  y: c.y - c.r * Math.sin(rad(theta)),
});

/**
 * 洛伦兹力：从圆上一点沿半径指向圆心，长度取 122（穿过圆心强化向心指向）
 *
 * @param from 起笔点（圆上一点）
 * @param center 圆心
 * @param len 箭头长度
 * @returns 箭头终点
 */
const inward = (from: Point, center: Point, len: number): Point => {
  const dx = center.x - from.x;
  const dy = center.y - from.y;
  const dist = Math.hypot(dx, dy);

  return { x: from.x + (dx / dist) * len, y: from.y + (dy / dist) * len };
};

/** ==================== 精准数学切线速度矢量 ==================== */
// 切点位置：
// 圆 a 在约 4 点钟方向（θ = -24°）
const touchA = onCircle(circleA, -24);
// 逆时针单位切向量：θ = -24° 时，t_x = sin(24°), t_y = -cos(24°)（指向上偏右）
const tanA: Point = {
  x: Math.sin(rad(24)),
  y: -Math.cos(rad(24)),
};
// 速度箭头总长加长到 110px（后排投影清晰），切于 touchA 点，完全不割入圆内
const velAFrom: Point = {
  x: touchA.x - 15 * tanA.x,
  y: touchA.y - 15 * tanA.y,
};
const velATo: Point = {
  x: touchA.x + 95 * tanA.x,
  y: touchA.y + 95 * tanA.y,
};

// 圆 b 在 9 点钟方向（θ = 180°）
const touchB = onCircle(circleB, 180); // (244, 344)
// 逆时针单位切向量：竖直向下 (0, 1)
const velBFrom: Point = {
  x: touchB.x,
  y: touchB.y - 15,
};
const velBTo: Point = {
  x: touchB.x,
  y: touchB.y + 95,
};

/** 洛伦兹力箭头：严格从圆上切点沿半径指向圆心 */
const forceAFrom = touchA;
const forceATo = inward(forceAFrom, circleA, 122);
const forceBFrom = touchB;
const forceBTo = inward(forceBFrom, circleB, 122);
</script>

<template>
  <div class="fig-particles">
    <svg
      viewBox="0 0 640 500"
      class="fig-svg"
      role="img"
      aria-label="电中性微粒在垂直纸面向里的磁场中分裂为 a、b 两个微粒，两微粒半径相等的圆周轨迹外切，环绕方向均为逆时针"
    >
      <!-- 磁场背景（平铺 × 阵列） -->
      <FieldDots
        :x="68"
        :y="50"
        :cols="6"
        :rows="5"
        :spacing="100"
        :size="12"
        :line-width="3.1"
        :opacity="0.9"
        color="var(--c-accent, #e2a846)"
        dir="in"
      />

      <!-- 圆 a 轨迹 -->
      <circle
        :cx="circleA.x"
        :cy="circleA.y"
        :r="circleA.r"
        stroke="var(--c-text)"
        stroke-width="4"
        fill="none"
      />
      <!-- 圆 b 轨迹 -->
      <circle
        :cx="circleB.x"
        :cy="circleB.y"
        :r="circleB.r"
        stroke="var(--c-text)"
        stroke-width="4"
        fill="none"
      />

      <!-- 圆 a 切线速度箭头（长 110px，严格切于圆周，绝不割圆） -->
      <CourseArrow
        :from="velAFrom"
        :to="velATo"
        stroke="var(--c-velocity)"
        stroke-width="4"
        :head-size="16"
      />
      <!-- 速度符号 v_a：避开力和粒子标签，错落排在箭尖右上方 -->
      <text
        :x="velATo.x + 10"
        :y="velATo.y - 4"
        font-size="30"
        fill="var(--c-velocity)"
        text-anchor="start"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        :style="halo"
      >
        v
        <tspan font-family="KaTeX_Main, serif" font-style="normal" font-size="20" dy="7">a</tspan>
      </text>

      <!-- 圆 b 切线速度箭头（长 110px，竖直切于 9 点钟方向） -->
      <CourseArrow
        :from="velBFrom"
        :to="velBTo"
        stroke="var(--c-velocity)"
        stroke-width="4"
        :head-size="16"
      />
      <!-- 速度符号 v_b：排在箭尖右下方，与左侧 b 标签完全隔开 -->
      <text
        :x="velBTo.x + 14"
        :y="velBTo.y + 22"
        font-size="30"
        fill="var(--c-velocity)"
        text-anchor="start"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        :style="halo"
      >
        v
        <tspan font-family="KaTeX_Main, serif" font-style="normal" font-size="20" dy="7">b</tspan>
      </text>

      <!-- 微粒名称 a：安排在切点右下侧，与力、速度、电性徽章互不遮挡 -->
      <text
        x="444"
        y="232"
        text-anchor="middle"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        font-size="36"
        fill="var(--c-text)"
        :style="halo"
      >
        a
      </text>

      <!-- 微粒名称 b：安排在切线外左下侧，与力和速度完全分离 -->
      <text
        x="210"
        y="370"
        text-anchor="middle"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        font-size="36"
        fill="var(--c-text)"
        :style="halo"
      >
        b
      </text>

      <!-- 分析层：电性符号与洛伦兹力（严格分离排布，加粗清晰 SVG 电性微粒徽章） -->
      <g v-if="showAnalysis">
        <!-- 微粒 a 电性徽章：独立 SVG 粗线条实心徽章，远屏一眼看清，彻底告别细字 -->
        <g transform="translate(444, 186)">
          <circle
            cx="0"
            cy="0"
            r="14"
            fill="var(--c-bg)"
            stroke="var(--c-force)"
            stroke-width="2.6"
          />
          <line
            x1="-7"
            y1="0"
            x2="7"
            y2="0"
            stroke="var(--c-force)"
            stroke-width="3.2"
            stroke-linecap="round"
          />
          <line
            x1="0"
            y1="-7"
            x2="0"
            y2="7"
            stroke="var(--c-force)"
            stroke-width="3.2"
            stroke-linecap="round"
          />
        </g>

        <!-- 微粒 b 电性徽章：独立 SVG 粗线条实心徽章 -->
        <g transform="translate(210, 326)">
          <circle
            cx="0"
            cy="0"
            r="14"
            fill="var(--c-bg)"
            stroke="var(--c-force)"
            stroke-width="2.6"
          />
          <line
            x1="-7"
            y1="0"
            x2="7"
            y2="0"
            stroke="var(--c-force)"
            stroke-width="3.2"
            stroke-linecap="round"
          />
          <line
            x1="0"
            y1="-7"
            x2="0"
            y2="7"
            stroke="var(--c-force)"
            stroke-width="3.2"
            stroke-linecap="round"
          />
        </g>

        <!-- 洛伦兹力 F_洛a 箭头（垂直于速度切线，直指圆心） -->
        <CourseArrow
          :from="forceAFrom"
          :to="forceATo"
          stroke="var(--c-force)"
          stroke-width="5"
          :head-size="20"
        />
        <!-- 洛伦兹力文字 F_洛a：安排在圆内空旷处，与切点电荷完全错开 -->
        <text
          x="372"
          y="184"
          text-anchor="middle"
          font-family="KaTeX_Math, 'Times New Roman', serif"
          font-style="italic"
          font-size="34"
          fill="var(--c-force)"
          :style="haloSub"
        >
          F
          <tspan font-family="KaTeX_Main, serif" font-style="normal" font-size="22" dy="8">
            洛a
          </tspan>
        </text>

        <!-- 洛伦兹力 F_洛b 箭头（水平向右，直指圆心） -->
        <CourseArrow
          :from="forceBFrom"
          :to="forceBTo"
          stroke="var(--c-force)"
          stroke-width="5"
          :head-size="20"
        />
        <!-- 洛伦兹力文字 F_洛b：安排在力箭头上方圆内区域，不与左侧微粒挤占 -->
        <text
          x="292"
          y="328"
          text-anchor="middle"
          font-family="KaTeX_Math, 'Times New Roman', serif"
          font-style="italic"
          font-size="34"
          fill="var(--c-force)"
          :style="haloSub"
        >
          F
          <tspan font-family="KaTeX_Main, serif" font-style="normal" font-size="22" dy="8">
            洛b
          </tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
/* 三微粒分裂图：根 div 与 svg 顶部对齐；图宽上限交给共享的 .fig-svg（本课 style.css）读 --fig-max
   —— 第 5 页题目页图栏 ≈ 438px、第 6 页解析页图栏 ≈ 500px，540px 让两处都被栏宽限住 */
.fig-particles {
  --fig-max: 540px;
  display: block;
  align-self: flex-start;
  width: 100%;
}
</style>
