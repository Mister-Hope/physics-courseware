<!--
  选必二 1.3（第二课时）· 例 5（1）配图：粒子能不能"一直待在"圆形磁场里？
  ── 题干（由 slides.md 给出，本组件只画图）──
     圆形匀强磁场区域，半径 R、磁感应强度 B。在边界上某点 P 以速率 v₀ 发射粒子。
     问：比荷满足什么条件时，粒子无法保持在磁场中运动？
  ── 分步 ——
     showSmall=false：磁场边界圆 + ⊗ + 圆心 O + 射入点 P + 半径线 OP（虚线，标 R）；
     showSmall=true ：第 1 次点击 → 情形一：r < R（画 r = 0.7R），沿与半径垂直的方向（切线）射入，
                       轨迹圆与边界内切、整个落在磁场区域里 ⟹ 粒子能一圈圈转下去、一直留在磁场里；
     showBig =true ：第 2 次点击 → 情形二：r > R（画 r = 1.5R），同样沿切线射入（这是最"省地方"的
                       射法），轨迹圆却整个跑到区域外 ⟹ 粒子立刻穿出磁场。
  ── 几何（全部按 viewBox 用户单位）──
     O = (250, 215)、R = 100；P = 圆的左端点 = (150, 215)。
     沿切线射入 ⟹ 轨迹圆心落在直线 OP 上、且 |PC| = r ⟹ C = O + (R − r)·单位(O→P)。
       情形一 r = 0.7R = 70：C₁ = (220, 215)，圆上点到 O 的最大距离 = |OC₁| + r = 30 + 70 = 100 = R
         ⟹ 与边界在 P 处内切、整个圆都在磁场区域内 ✓
       情形二 r = 1.5R = 150：C₂ = (300, 215)，圆上点到 O 的最小距离 = |r − |OC₂|| = 150 − 50 = 100 = R
         ⟹ 也在 P 处内切，但除 P 以外整个圆都在磁场区域外 ✗
     由此得判据：沿切线射入时最"省地方"，尚且要求 r ≤ R；r > R 时无论沿什么方向射入，
     轨迹圆都装不进磁场区域（因为它必须过边界上的 P 点、半径为 r，而 r > R 时
       |OC| ≥ r − R ⟹ |OC| + r ≥ 2r − R > R）⟹ 粒子一定会穿出磁场 ✓
-->
<script setup>
defineProps({
  /** 第 1 次点击：r < R、能一直留在磁场里的情形 */
  showSmall: { type: Boolean, default: false },
  /** 第 2 次点击：r > R、"装不下"的情形 */
  showBig: { type: Boolean, default: false },
});

/** 画布（viewBox 用户单位） */
const W = 620;
const H = 440;

/** 磁场圆：圆心 O、半径 R（图上只写符号） */
const O = { x: 250, y: 215 };
const R = 100;
/** P：射入点，取圆的左端点 */
const P = { x: O.x - R, y: O.y };
/** 两种情形的轨道半径 */
const R_SMALL = 0.7 * R;
const R_BIG = 1.5 * R;
/** 沿切线射入 ⟹ 轨迹圆心在直线 OP 上（u 为 O→P 的单位向量） */
const u = { x: (P.x - O.x) / R, y: (P.y - O.y) / R };
const C_SMALL = { x: O.x + (R - R_SMALL) * u.x, y: O.y + (R - R_SMALL) * u.y };
const C_BIG = { x: O.x + (R - R_BIG) * u.x, y: O.y + (R - R_BIG) * u.y };

/** 半径线 OP（虚线） */
const opPath = `M ${O.x} ${O.y} L ${P.x} ${P.y}`;
/** 情形一圆周上的一小段箭头：表示粒子在磁场里绕着转 */
const SPIN_R = 26;
const SPIN_CX = C_SMALL.x + SPIN_R;
const SPIN_CY = C_SMALL.y;

/** 磁场 ⊗ 阵列：手工挑四个位置（上下各一、右侧月牙里两个）—— 小轨迹圆几乎填满磁场区域，只有这片月牙是空的；四个位置都核过，不会压到圆与标注。 */
const MARK_R = 6.4;
const MARK_ARM = 4.5;
const MARKS = [
  { x: 250, y: 132 },
  { x: 250, y: 298 },
  { x: 322, y: 196 },
  { x: 322, y: 238 },
];

/** 图内字号与统一深色光晕 */
const FS = 24;
const MATH = "KaTeX_Math, 'Times New Roman', serif";
const HALO = { stroke: "#0f1425", "stroke-width": 4, "paint-order": "stroke" };
</script>

<template>
  <div
    class="flex min-h-0 w-full flex-1 items-center justify-center"
    :style="{ aspectRatio: `${W} / ${H}` }"
  >
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      xmlns="http://www.w3.org/2000/svg"
      class="h-full w-auto max-w-full"
    >
      <!-- 磁场区域：边界圆 + ⊗ -->
      <circle
        :cx="O.x"
        :cy="O.y"
        :r="R"
        fill="color-mix(in srgb, var(--c-accent) 7%, transparent)"
        stroke="color-mix(in srgb, var(--c-accent) 70%, transparent)"
        stroke-width="2.2"
      />
      <g
        fill="none"
        stroke="color-mix(in srgb, var(--c-accent) 50%, transparent)"
        stroke-width="1.3"
        stroke-linecap="round"
      >
        <template v-for="(m, i) in MARKS" :key="`b${i}`">
          <circle :cx="m.x" :cy="m.y" :r="MARK_R" />
          <line
            :x1="m.x - MARK_ARM"
            :y1="m.y - MARK_ARM"
            :x2="m.x + MARK_ARM"
            :y2="m.y + MARK_ARM"
          />
          <line
            :x1="m.x + MARK_ARM"
            :y1="m.y - MARK_ARM"
            :x2="m.x - MARK_ARM"
            :y2="m.y + MARK_ARM"
          />
        </template>
      </g>
      <!-- 半径线 OP（题目已给）与圆心 / 射入点 -->
      <path
        :d="opPath"
        fill="none"
        stroke="color-mix(in srgb, var(--c-neutral-300) 50%, transparent)"
        stroke-width="1.8"
        stroke-dasharray="8 7"
      />
      <circle :cx="O.x" :cy="O.y" r="4" fill="var(--c-neutral-300)" />
      <text
        v-bind="HALO"
        :x="O.x + 14"
        :y="O.y + 32"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS"
        fill="var(--c-neutral-50)"
      >
        O
      </text>
      <circle :cx="P.x" :cy="P.y" r="5.6" fill="var(--c-neutral-50)" />
      <text
        v-bind="HALO"
        :x="P.x - 14"
        :y="P.y + 34"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS"
        fill="var(--c-neutral-50)"
      >
        P
      </text>
      <text
        v-bind="HALO"
        :x="(O.x + P.x) / 2 - 6"
        :y="O.y - 14"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS"
        fill="var(--c-neutral-300)"
      >
        R
      </text>
      <!-- 情形一：r < R，轨迹圆整个在磁场区域内（能一直留下） -->
      <template v-if="showSmall">
        <circle
          :cx="C_SMALL.x"
          :cy="C_SMALL.y"
          :r="R_SMALL"
          fill="none"
          stroke="var(--c-velocity)"
          stroke-width="3.4"
        />
        <circle
          :cx="SPIN_CX"
          :cy="SPIN_CY"
          :r="SPIN_R"
          fill="none"
          stroke="color-mix(in srgb, var(--c-velocity) 35%, transparent)"
          stroke-width="1.6"
          stroke-dasharray="5 6"
        />
        <CourseArrow
          :from="{ x: SPIN_CX, y: SPIN_CY - SPIN_R }"
          :to="{ x: SPIN_CX + SPIN_R, y: SPIN_CY }"
          stroke="var(--c-velocity)"
          stroke-width="3"
        />
        <text
          v-bind="HALO"
          :x="C_SMALL.x + 10"
          :y="C_SMALL.y - R_SMALL - 12"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS"
          fill="var(--c-velocity)"
        >
          r
        </text>
      </template>
      <!-- 情形二：r > R，轨迹圆装不下（一定要穿出磁场） -->
      <template v-if="showBig">
        <circle
          :cx="C_BIG.x"
          :cy="C_BIG.y"
          :r="R_BIG"
          fill="none"
          stroke="color-mix(in srgb, var(--c-force) 85%, transparent)"
          stroke-width="3"
          stroke-dasharray="11 8"
        />
        <text
          v-bind="HALO"
          :x="C_BIG.x + 12"
          :y="C_BIG.y - R_BIG - 12"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS"
          fill="var(--c-force)"
        >
          r′
        </text>
      </template>
    </svg>
  </div>
</template>
