<!--
  选必2 1.x《复合场中的配速法与摆线运动》「磁汇聚」证明页配图
  —— 平行束射入圆形匀强磁场，取 r = R 时证明"出射点恒为圆周最低点 P"。

  几何（屏幕坐标，y 向下）：磁场圆心 O(505,150)、半径 R 130；取入射高度 k = 0.35 的那条粒子：
    入射点 A、轨迹圆心 C 在 A 正下方 r = R 处、出射点 P(505,280) = 磁场圆最低点。
  四边形 O→A→C→P 四边都等于 R ⟹ 菱形 ⟹ OP = AC。

  step 0 只给磁场区域与平行入射束；1 画轨迹弧与圆心 C；2 高亮菱形四条边；3 画出 AC 与 OP 两个向量。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 演示步骤 0…3（由页面把 $clicks 传进来） */
  step?: number;
}>();

/** 画布：900 × 346 */
const W = 900;
const H = 346;

/** 磁场圆心与半径（viewBox 用户单位） */
const OX = 610;
const OY = 160;
const R = 135;

/** 选中的那条粒子的入射高度（以 R 为单位） */
const K_SEL = 0.35;
/** 一起画出来的其它平行射线（暗色，说明"这是一束里的任意一条"） */
const K_OTHER = [0.05, 0.65];

/** 所有平行粒子的出发点横坐标 */
const X0 = 20;

/**
 * 某条平行粒子的入射点
 *
 * @param k 入射高度（以 R 为单位）
 * @returns 入射点屏幕坐标
 */
const entry = (k: number): { x: number; y: number } => ({
  x: OX - Math.sqrt(1 - k * k) * R,
  y: OY - k * R,
});

const A = entry(K_SEL);
/** 轨迹圆心：洛伦兹力向下（+y），圆心在入射点正下方 r = R 处 */
const C = { x: A.x, y: A.y + R };
/** 出射点：与磁场圆最低点重合 */
const P = { x: OX, y: OY + R };

/** 出射时轨迹圆的参数角（屏幕顺时针：φ = −90° 是 A，φ 增大即顺时针） */
const PHI_EXIT = 2 * Math.atan2(C.y - OY, C.x - OX) + Math.PI / 2;
/** 出射方向（轨迹切线） */
const OUT_DIR = { x: -Math.sin(PHI_EXIT), y: Math.cos(PHI_EXIT) };
/** 出射后在场外的直线段（短一点，点明 P 是"出射点"） */
const OUT_END = { x: P.x + OUT_DIR.x * 48, y: P.y + OUT_DIR.y * 48 };

/** 轨迹圆弧路径（A → P，顺时针、扫过角 < 180°） */
const arcD = `M ${A.x} ${A.y} A ${R} ${R} 0 0 1 ${P.x} ${P.y}`;
/** 菱形 O→A→C→P */
const rhombusD = `M ${OX} ${OY} L ${A.x} ${A.y} L ${C.x} ${C.y} L ${P.x} ${P.y} Z`;

/** 四条边中点处的 R 标注（往菱形外侧挪一点，别压住边线，也别撞上轨迹弧） */
const SIDE_LABELS = [
  { x: (OX + A.x) / 2, y: (OY + A.y) / 2 - 28 },
  { x: (A.x + C.x) / 2 + 24, y: (A.y + C.y) / 2 + 2 },
  { x: (C.x + P.x) / 2, y: (C.y + P.y) / 2 - 22 },
  { x: (OX + P.x) / 2 - 22, y: (OY + P.y) / 2 + 2 },
];

/** 磁场半径标注线（圆内右下方，避开入射束与菱形） */
const radiusTip = { x: OX + R * Math.cos(Math.PI / 6), y: OY + R * Math.sin(Math.PI / 6) };

const MATH = "KaTeX_Math, 'Times New Roman', serif";
const HALO = { stroke: "var(--c-bg)", "stroke-width": 3.6, "paint-order": "stroke" } as const;
</script>

<template>
  <div class="fig-focus-proof">
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      class="fig-svg select-none"
      role="img"
      aria-label="轨迹半径等于磁场半径时，四边形 OACP 是菱形，出射点恒为圆周最低点"
    >
      <defs>
        <clipPath id="fp-field">
          <circle :cx="OX" :cy="OY" :r="R" />
        </clipPath>
        <filter id="fp-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- 磁场区域：只在圆内（裸 · ＝ 垂直纸面向外） -->
      <g clip-path="url(#fp-field)">
        <FieldDots
          :x="OX - 135"
          :y="OY - 135"
          :cols="11"
          :rows="11"
          :spacing="27"
          :size="6"
          :line-width="1.3"
          :opacity="0.4"
          dir="out"
        />
      </g>
      <circle
        :cx="OX"
        :cy="OY"
        :r="R"
        fill="color-mix(in srgb, var(--c-accent) 6%, transparent)"
        stroke="var(--c-accent)"
        stroke-width="2.6"
      />

      <!-- 磁场半径 R 与圆心 O -->
      <line
        :x1="OX"
        :y1="OY"
        :x2="radiusTip.x"
        :y2="radiusTip.y"
        stroke="var(--c-accent)"
        stroke-width="1.8"
        stroke-dasharray="7 6"
        opacity="0.9"
      />
      <text
        :x="(OX + radiusTip.x) / 2 + 4"
        :y="(OY + radiusTip.y) / 2 - 10"
        font-size="23"
        text-anchor="middle"
        fill="var(--c-accent)"
        :font-family="MATH"
        font-style="italic"
        :style="HALO"
      >
        R
      </text>
      <circle :cx="OX" :cy="OY" r="4" fill="var(--c-accent)" />
      <text
        :x="OX - 12"
        :y="OY + 30"
        font-size="24"
        text-anchor="end"
        fill="var(--c-accent)"
        :font-family="MATH"
        font-style="italic"
        :style="HALO"
      >
        O
      </text>

      <!-- 平行入射束：暗的两条说明"这是一束"，亮的是被选中的那一条 -->
      <g opacity="0.32">
        <CourseArrow
          v-for="k in K_OTHER"
          :key="`other-${k}`"
          :from="{ x: X0, y: entry(k).y }"
          :to="entry(k)"
          stroke="var(--c-force)"
          :stroke-width="2"
          :head-size="9"
        />
      </g>
      <CourseArrow
        :from="{ x: X0, y: A.y }"
        :to="A"
        stroke="var(--c-force)"
        :stroke-width="2.6"
        :head-size="11"
      />

      <!-- 入射点 A -->
      <circle :cx="A.x" :cy="A.y" r="5" fill="var(--c-force)" />
      <text
        :x="A.x - 16"
        :y="A.y - 4"
        font-size="24"
        text-anchor="end"
        fill="var(--c-force)"
        :font-family="MATH"
        font-style="italic"
        :style="HALO"
      >
        A
      </text>

      <!-- ① 轨迹圆弧与轨迹圆心 C -->
      <g v-if="step >= 1">
        <path
          :d="arcD"
          fill="none"
          stroke="var(--c-force)"
          stroke-width="3.6"
          stroke-linecap="round"
        />
        <line
          :x1="A.x"
          :y1="A.y"
          :x2="C.x"
          :y2="C.y"
          stroke="var(--c-force)"
          stroke-width="2"
          stroke-dasharray="7 6"
          opacity="0.9"
        />
        <circle :cx="C.x" :cy="C.y" r="5" fill="var(--c-force)" />
        <text
          :x="C.x - 16"
          :y="C.y + 6"
          font-size="24"
          text-anchor="end"
          fill="var(--c-force)"
          :font-family="MATH"
          font-style="italic"
          :style="HALO"
        >
          C
        </text>
        <text
          v-if="step < 2"
          :x="A.x - 16"
          :y="(A.y + C.y) / 2 + 4"
          font-size="23"
          text-anchor="end"
          fill="var(--c-force)"
          :font-family="MATH"
          font-style="italic"
          :style="HALO"
        >
          r
        </text>

        <!-- 出射后在场外仍走直线 -->
        <line
          :x1="P.x"
          :y1="P.y"
          :x2="OUT_END.x"
          :y2="OUT_END.y"
          stroke="var(--c-force)"
          stroke-width="2.4"
          stroke-dasharray="8 6"
          opacity="0.7"
        />
        <circle :cx="P.x" :cy="P.y" r="6" fill="var(--c-ok)" />
        <text
          :x="P.x + 16"
          :y="P.y + 10"
          font-size="24"
          text-anchor="start"
          fill="var(--c-ok)"
          :font-family="MATH"
          font-style="italic"
          :style="HALO"
        >
          P
        </text>
      </g>

      <!-- ② 四条边都等于 R ⟹ 菱形 -->
      <path
        v-if="step >= 2"
        :d="rhombusD"
        fill="color-mix(in srgb, var(--c-ok) 12%, transparent)"
        stroke="var(--c-ok)"
        stroke-width="3.2"
        stroke-linejoin="round"
      />
      <!-- 四边的 R 标注只在第 2 步出现（第 3 步让位给 AC / OP 两个向量） -->
      <g v-if="step === 2">
        <text
          v-for="(side, i) in SIDE_LABELS"
          :key="`side-${i}`"
          :x="side.x"
          :y="side.y"
          font-size="22"
          text-anchor="middle"
          fill="var(--c-ok)"
          :font-family="MATH"
          font-style="italic"
          :style="HALO"
        >
          R
        </text>
      </g>

      <!-- ③ 两个向量：AC 与 OP 等长且同向 ⟹ P 恒在 O 正下方 R 处 -->
      <g v-if="step >= 3">
        <CourseArrow
          :from="A"
          :to="C"
          stroke="var(--c-ok)"
          :stroke-width="5"
          :head-size="15"
          label="AC"
          :label-dx="-14"
          :label-dy="0"
        />
        <CourseArrow
          :from="{ x: OX, y: OY }"
          :to="P"
          stroke="var(--c-ok)"
          :stroke-width="5"
          :head-size="15"
          label="OP"
          :label-dx="-14"
          :label-dy="0"
        />
        <circle
          :cx="P.x"
          :cy="P.y"
          r="12"
          fill="none"
          stroke="var(--c-ok)"
          stroke-width="2.5"
          filter="url(#fp-glow)"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.fig-focus-proof {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;

  min-width: 0;
  min-height: 0;
}

/* 图随可用空间缩放（preserveAspectRatio 默认 meet，永不溢出、也不顶跑下方文字） */
.fig-focus-proof .fig-svg {
  flex: 1 1 auto;

  width: 100%;
  max-width: none;
  min-height: 0;
}
</style>
