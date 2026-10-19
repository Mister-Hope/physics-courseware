<!--
  选必二 1.4 质谱仪 · 结构与轨迹示意图（P3 分步讲解 / P6 例 1 配图）
  ── 几何（与 MassSpectrometerLab.vue 共用同一套坐标与比例，改这里必须同步改另一个组件）──
     viewBox 640×340。离子沿 y = 292 水平向右、从缝 S3 垂直进入匀强磁场（裸 ×，垂直纸面向里），
     在磁场里做半圆后回到同一竖直平面 x = 214 上 —— 180° 磁谱仪：落点到缝的距离正好是轨迹直径 2r，
     所以照相底片 D 就是这条竖直平面上的长条（S3 是它留出的窄缝），两条半圆按 r ∝ √m 嵌套：
     氖-22 半径大、落点高，氖-20 半径小、落点低（真实的 r 比 = √(20/22) ≈ 0.954，两弧本来就很贴近）。
  ── 分步（P3 传 :step="$clicks"，clicks: 3；固定尺寸 SVG 内部用 v-if 不会顶跑已可见元素）──
     step ≥ 1：电离室 A + 缝 S1；step ≥ 2：两块加速极板 + U + 缝 S3；step ≥ 3：磁场区 + 两条半圆 + 落点 + 底片 D。
  ── diameters（P6 例 1）──
     两条半圆的直径画成双箭头并标 d_A / d_B，比例按例题给出的 d_A : d_B = 1.08 : 1（不是氖的同位素比）。
     题目页保持干净：只画结构与轨迹，不画受力、不给答案。
-->
<script setup lang="ts">
import { computed } from "vue";

const { step = 3, diameters = false } = defineProps<{
  /** 分步显示：0 = 空白，1 = 电离室 A + 缝 S1，2 = 加速电场 + 缝 S3，3 = 磁场区 + 两条半圆 + 落点 + 底片 D */
  step?: number;
  /** 例题 1 配图模式：两条半圆的直径画成双箭头、标 d_A / d_B */
  diameters?: boolean;
}>();

/* ── 共用几何 ───────────────────────────────────────────────────────────── */
const VB = { w: 640, h: 340 };
/** 束流高度：离子沿这条水平线进入磁场 */
const BEAM_Y = 292;
/** 底片 D / 缝 S3 所在的竖直平面（也是磁场区左边界）；离子转半圈后回到这条线上 */
const PLATE_X = 214;
/** 磁场区（匀强磁场铺满的区域） */
const FIELD = { x: 214, y: 20, w: 392, h: 306 };
/** 半圆最大可画半径：落点最高到 y = BEAM_Y − 2 × R_MAX = 32，正好落在磁场区上边界（20）以内 */
const R_MAX = 130;
/** 缝 S3 上、下唇（底片上留出的窄缝，离子从这里进入磁场） */
const SLIT_LIP_UP = { from: 274, to: 286 };
const SLIT_LIP_DOWN = { from: 298, to: 310 };

/** 半圆轨迹：从缝 S3 沿 +x 进入、向上偏转，转过 180° 回到同一竖直平面（落点 = 2r） */
const arcPath = (r: number): string =>
  `M ${PLATE_X} ${BEAM_Y} A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 0 ${PLATE_X} ${(BEAM_Y - 2 * r).toFixed(2)}`;

/** 直径双箭头（CourseArrow 只画单头，双头按规范手写：三角形底边宽 ≥ 2×线宽，线段回退半个箭头长） */
const HEAD = 9;
const HEAD_W = 5;
const diaArrow = (x: number, yTip: number): { shaft: string; up: string; down: string } => ({
  shaft: `M ${x} ${yTip + HEAD} L ${x} ${BEAM_Y - HEAD}`,
  up: `${x},${yTip} ${x - HEAD_W},${yTip + HEAD} ${x + HEAD_W},${yTip + HEAD}`,
  down: `${x},${BEAM_Y} ${x - HEAD_W},${BEAM_Y - HEAD} ${x + HEAD_W},${BEAM_Y - HEAD}`,
});

/* ── 显示与轨迹半径 ─────────────────────────────────────────────────────── */
const showChamber = computed(() => step >= 1);
const showAccel = computed(() => step >= 2);
const showField = computed(() => step >= 3);

/** 大半径那条：氖-22（diameters 模式下是例题里的 A） */
const rBig = R_MAX;
/** 小半径那条：默认取 r ∝ √m 的真实比例（氖-20 / 氖-22 = √(20/22)）；diameters 模式按例题的 d_A : d_B = 1.08 : 1 */
const rSmall = computed(() => (diameters ? R_MAX / 1.08 : R_MAX * Math.sqrt(20 / 22)));
const arcBig = computed(() => arcPath(rBig));
const arcSmall = computed(() => arcPath(rSmall.value));
/** 两条半圆在底片上的落点（离子回到 x = PLATE_X 时的高度） */
const hitBig = BEAM_Y - 2 * rBig;
const hitSmall = computed(() => BEAM_Y - 2 * rSmall.value);
/** 落点短竖线（画在底片左侧，指着落点） */
const tickHalf = 5.5;
const TICK_X = 207;
/** 例题模式的两条直径双箭头：都画在极板左侧的空档里（x < 128），互不重叠、也不压 U 与极板 */
const diaA = diaArrow(124, hitBig);
const diaB = computed(() => diaArrow(104, hitSmall.value));
/** 两条直径的引出虚线：从双箭头上端引到各自的落点（走在极板上方的空白里） */
const leadA = `M 124 ${hitBig} H ${TICK_X}`;
const leadB = computed(() => `M 104 ${hitSmall.value.toFixed(2)} H ${TICK_X}`);
</script>

<template>
  <div class="msf-wrap" :style="{ aspectRatio: `${VB.w} / ${VB.h}` }">
    <svg
      class="msf-svg"
      viewBox="0 0 640 340"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="质谱仪结构与粒子轨迹示意图"
    >
      <!-- 磁场区（step≥3）：边界 + 匀强磁场阵列（裸 × ＝ 垂直纸面向里，阵列本身已标清方向，不再画 ⊗B 图例） -->
      <template v-if="showField">
        <rect
          :x="FIELD.x"
          :y="FIELD.y"
          :width="FIELD.w"
          :height="FIELD.h"
          fill="var(--c-accent)"
          opacity="0.06"
        />
        <rect
          :x="FIELD.x"
          :y="FIELD.y"
          :width="FIELD.w"
          :height="FIELD.h"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="1.6"
          opacity="0.45"
        />
        <FieldDots :x="239" :y="40" :cols="10" :rows="8" :spacing="38" dir="in" :opacity="0.5" />
        <text
          class="msf-halo msf-math"
          x="582"
          y="54"
          text-anchor="middle"
          font-size="30"
          fill="var(--c-accent)"
        >
          B
        </text>
      </template>
      <!-- 照相底片 D（step≥3）：竖直长条，离子按半径大小打在它不同的高度上 -->
      <template v-if="showField">
        <rect
          :x="PLATE_X - 3.5"
          y="20"
          width="7"
          height="266"
          rx="3"
          fill="var(--c-neutral-200)"
          opacity="0.75"
        />
        <text
          class="msf-halo msf-math"
          :x="PLATE_X"
          y="15"
          text-anchor="middle"
          font-size="18"
          fill="var(--c-neutral-200)"
        >
          D
        </text>
      </template>
      <!-- 缝 S3（step≥2）：底片上的窄缝，离子在这里垂直进入磁场 -->
      <template v-if="showAccel">
        <line
          :x1="PLATE_X"
          :y1="SLIT_LIP_UP.from"
          :x2="PLATE_X"
          :y2="SLIT_LIP_UP.to"
          stroke="var(--c-neutral-200)"
          stroke-width="7"
          opacity="0.75"
        />
        <line
          :x1="PLATE_X"
          :y1="SLIT_LIP_DOWN.from"
          :x2="PLATE_X"
          :y2="SLIT_LIP_DOWN.to"
          stroke="var(--c-neutral-200)"
          stroke-width="7"
          opacity="0.75"
        />
        <text
          class="msf-halo msf-main"
          :x="PLATE_X - 18"
          y="318"
          text-anchor="end"
          font-size="16"
          fill="var(--c-text-dim)"
        >
          S
        </text>
        <text
          class="msf-halo msf-main"
          :x="PLATE_X - 9"
          y="322"
          text-anchor="end"
          font-size="11"
          fill="var(--c-text-dim)"
        >
          3
        </text>
      </template>
      <!-- 加速电场（step≥2）：上下两块平行极板 + 电势差 U（离子从左极板到右极板被加速） -->
      <template v-if="showAccel">
        <line x1="128" y1="252" x2="128" y2="332" stroke="var(--c-text)" stroke-width="3" />
        <line x1="180" y1="252" x2="180" y2="332" stroke="var(--c-text)" stroke-width="3" />
        <CourseArrow
          :from="{ x: 138, y: 266 }"
          :to="{ x: 170, y: 266 }"
          stroke="var(--c-accent-2)"
          :stroke-width="2.6"
        />
        <CourseArrow
          :from="{ x: 138, y: 318 }"
          :to="{ x: 170, y: 318 }"
          stroke="var(--c-accent-2)"
          :stroke-width="2.6"
        />
        <text
          class="msf-halo msf-math"
          x="154"
          y="242"
          text-anchor="middle"
          font-size="26"
          fill="var(--c-accent-2)"
        >
          U
        </text>
      </template>
      <!-- 电离室 A 与缝 S1（step≥1）：中性气体在 A 里被电离，离子从小孔 S1 飘出 -->
      <template v-if="showChamber">
        <rect
          x="22"
          y="262"
          width="56"
          height="60"
          rx="10"
          fill="var(--c-surface)"
          stroke="var(--c-text)"
          stroke-width="2.4"
        />
        <text
          x="50"
          y="303"
          text-anchor="middle"
          class="msf-math"
          font-size="26"
          fill="var(--c-neutral-50)"
        >
          A
        </text>
        <line x1="94" y1="262" x2="94" y2="286" stroke="var(--c-text-dim)" stroke-width="2.4" />
        <line x1="94" y1="298" x2="94" y2="322" stroke="var(--c-text-dim)" stroke-width="2.4" />
        <text
          class="msf-halo msf-main"
          x="88"
          y="254"
          text-anchor="end"
          font-size="16"
          fill="var(--c-text-dim)"
        >
          S
        </text>
        <text
          class="msf-halo msf-main"
          x="97"
          y="258"
          text-anchor="end"
          font-size="11"
          fill="var(--c-text-dim)"
        >
          1
        </text>
      </template>
      <!-- 束流（离子直线段）：A → S1（step≥1），S1 → S3（step≥2，穿过两块极板上的小孔） -->
      <line
        v-if="showChamber"
        x1="78"
        y1="292"
        x2="94"
        y2="292"
        stroke="var(--c-neutral-200)"
        stroke-width="2.4"
        opacity="0.85"
      />
      <line
        v-if="showAccel"
        x1="94"
        y1="292"
        :x2="PLATE_X"
        y2="292"
        stroke="var(--c-neutral-200)"
        stroke-width="2.4"
        opacity="0.85"
      />
      <!-- 两条半圆轨迹 + 落点（step≥3）：半径大的是氖-22（例题里是 A），小的是氖-20（例题里是 B） -->
      <template v-if="showField">
        <path
          :d="arcBig"
          fill="none"
          stroke="var(--c-accent-2)"
          stroke-width="3"
          stroke-linecap="round"
        />
        <path
          :d="arcSmall"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="3"
          stroke-linecap="round"
        />
        <line
          :x1="TICK_X"
          :y1="hitBig - tickHalf"
          :x2="TICK_X"
          :y2="hitBig + tickHalf"
          stroke="var(--c-accent-2)"
          stroke-width="2.6"
        />
        <line
          :x1="TICK_X"
          :y1="hitSmall - tickHalf"
          :x2="TICK_X"
          :y2="hitSmall + tickHalf"
          stroke="var(--c-accent)"
          stroke-width="2.6"
        />
      </template>
      <!-- 落点标注：默认写质量数；diameters 模式（例题 1）改画两条直径的双箭头并标 d_A / d_B -->
      <template v-if="showField && !diameters">
        <text
          class="msf-halo msf-main"
          x="201"
          :y="hitBig + 6"
          text-anchor="end"
          font-size="16"
          fill="var(--c-accent-2)"
        >
          22
        </text>
        <text
          class="msf-halo msf-main"
          x="201"
          :y="hitSmall + 22"
          text-anchor="end"
          font-size="16"
          fill="var(--c-accent)"
        >
          20
        </text>
      </template>
      <template v-if="showField && diameters">
        <!-- 两条直径都从缝 S3 所在平面量到各自的落点：箭头错开画在左侧，再用细虚线引到落点 -->
        <path :d="leadA" fill="none" stroke="var(--c-accent-2)" stroke-width="1.4" opacity="0.8" />
        <path :d="leadB" fill="none" stroke="var(--c-accent)" stroke-width="1.4" opacity="0.8" />
        <path :d="diaA.shaft" fill="none" stroke="var(--c-accent-2)" stroke-width="1.8" />
        <polygon :points="diaA.up" fill="var(--c-accent-2)" />
        <polygon :points="diaA.down" fill="var(--c-accent-2)" />
        <path :d="diaB.shaft" fill="none" stroke="var(--c-accent)" stroke-width="1.8" />
        <polygon :points="diaB.up" fill="var(--c-accent)" />
        <polygon :points="diaB.down" fill="var(--c-accent)" />
        <text
          class="msf-halo msf-math"
          x="118"
          y="150"
          text-anchor="end"
          font-size="17"
          fill="var(--c-accent-2)"
        >
          d
        </text>
        <text
          class="msf-halo msf-math"
          x="123"
          y="155"
          text-anchor="end"
          font-size="12"
          fill="var(--c-accent-2)"
        >
          A
        </text>
        <text
          class="msf-halo msf-math"
          x="98"
          y="205"
          text-anchor="end"
          font-size="17"
          fill="var(--c-accent)"
        >
          d
        </text>
        <text
          class="msf-halo msf-math"
          x="103"
          y="210"
          text-anchor="end"
          font-size="12"
          fill="var(--c-accent)"
        >
          B
        </text>
      </template>
    </svg>
  </div>
</template>

<style scoped>
.msf-wrap {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  min-width: 0;
  min-height: 0;
}

.msf-svg {
  width: auto;
  max-width: 100%;
  height: 100%;
}

/* 图内文字：深色光晕垫底，压在磁场叉点阵列上也读得清 */
.msf-halo {
  paint-order: stroke;
  stroke: var(--c-bg);
  stroke-linejoin: round;
  stroke-width: 4px;
}

.msf-math {
  font-style: italic;
  font-family: "KaTeX_Math", "Times New Roman", serif;
}

.msf-main {
  font-family: "KaTeX_Main", "Times New Roman", serif;
}
</style>
