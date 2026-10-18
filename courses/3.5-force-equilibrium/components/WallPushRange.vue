<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, ref } from "vue";

interface Point {
  x: number;
  y: number;
}

const { $clicks } = useSlideContext();

/**
 * 斜推力作用下物体贴墙平衡的受力分析与正交分解（配合 Slidev 点击逐步呈现）：
 *
 * - Step = 0（初始）：展示粗糙竖直墙面（SurfaceHatch）、滑块、从滑块几何中心出发斜向左上方的推力 F 与夹角 θ；
 * - Step = 1（第 1 次点击）：从滑块几何中心补齐完整受力分析（重力 G、墙面支持力 F_N、静摩擦力 F_f）；
 * - Step = 2（第 2 次点击）：展示推力 F 的完整正交分解（水平分力 F sin θ、竖直分力 F cos θ 与正交投影虚线矩形）。
 *
 * 右侧仅保留缩短后的三个紧凑滑块与运动状态提示，删除所有近似数值计算，将版面空间留给理论推导。
 */
const step = computed<number>(() => Math.max(0, Math.min($clicks.value, 2)));

const fRatio = ref(1.6); // F / G
const thetaDeg = ref(35); // 推力与竖直方向的夹角 θ
const muCoeff = ref(0.4); // 动摩擦因数 μ

const rad = computed<number>(() => (thetaDeg.value * Math.PI) / 180);
const sinT = computed<number>(() => Math.sin(rad.value));
const cosT = computed<number>(() => Math.cos(rad.value));

/** 各力与 G 的比值（全部由物理公式实时解算） */
const fnRatio = computed<number>(() => fRatio.value * sinT.value);
const fMaxRatio = computed<number>(() => muCoeff.value * fnRatio.value);
const needed = computed<number>(() => 1 - fRatio.value * cosT.value);

const state = computed<"down" | "ok" | "up">(() => {
  if (Math.abs(needed.value) <= fMaxRatio.value + 1e-9) return "ok";
  return needed.value > 0 ? "down" : "up";
});

const stateLabel = computed<string>(() => {
  if (state.value === "ok") return "平衡";
  return state.value === "down" ? "向下滑动" : "向上滑动";
});

const thetaTex = computed<string>(() => `${thetaDeg.value}^\\circ`);

/** 受力图几何：所有力的作用点严格共点于滑块几何中心 CENTER */
const VIEW = { width: 350, height: 310 };
const FACE = 114; // 竖直墙面 x 坐标
const BLOCK = { x1: 114, y1: 136, x2: 190, y2: 212 };
const CENTER: Point = {
  x: (BLOCK.x1 + BLOCK.x2) / 2, // 152
  y: (BLOCK.y1 + BLOCK.y2) / 2, // 174
};

/** 放大后的力矢量基准像素长度（1G 对应 74px，使各力与正交分力清晰醒目） */
const G_LEN = 76;
const SCALE = 74;

const fLen = computed<number>(() => Math.min(138, Math.max(52, SCALE * fRatio.value)));

/** 推力 F 终点（指向左上方，与竖直向上方向夹角为 θ） */
const fTip = computed<Point>(() => ({
  x: CENTER.x - fLen.value * sinT.value,
  y: CENTER.y - fLen.value * cosT.value,
}));

/** 正交分解的两个分力终点：水平向左分力 F_x = F sin θ，竖直向上分力 F_y = F cos θ */
const fxTip = computed<Point>(() => ({
  x: fTip.value.x,
  y: CENTER.y,
}));
const fyTip = computed<Point>(() => ({
  x: CENTER.x,
  y: fTip.value.y,
}));

/** 重力 G 终点（竖直向下） */
const gTip: Point = {
  x: CENTER.x,
  y: CENTER.y + G_LEN,
};

/** 墙面支持力 F_N 终点（水平向右） */
const fnLen = computed<number>(() => Math.min(142, Math.max(26, SCALE * fnRatio.value)));
const fnTip = computed<Point>(() => ({
  x: CENTER.x + fnLen.value,
  y: CENTER.y,
}));

/** 墙面摩擦力 F_f 终点（沿竖直方向：needed > 0 时向上，needed < 0 时向下） */
const ffUp = computed<boolean>(() => needed.value >= 0);
const ffMag = computed<number>(() => Math.min(Math.abs(needed.value), fMaxRatio.value));
const ffLen = computed<number>(() => {
  if (ffMag.value < 0.02) return 0;
  return Math.min(108, Math.max(30, 18 + SCALE * ffMag.value));
});
const ffTip = computed<Point>(() => ({
  x: CENTER.x,
  y: ffUp.value ? CENTER.y - ffLen.value : CENTER.y + ffLen.value,
}));

/** 夹角 θ 圆弧与角平分线标注位置（以几何中心 CENTER 为圆心，在竖直向上虚线与推力 F 之间） */
const arcR = computed<number>(() => Math.min(40, Math.max(26, fLen.value * 0.36)));
const angleArc = computed<string>(() => {
  const r = arcR.value;
  const sx = CENTER.x;
  const sy = CENTER.y - r;
  const ex = CENTER.x - r * sinT.value;
  const ey = CENTER.y - r * cosT.value;
  return `M ${sx} ${sy} A ${r} ${r} 0 0 0 ${ex} ${ey}`;
});

const thetaLabelPos = computed<Point>(() => {
  const half = rad.value / 2;
  const r = arcR.value + 13;
  return {
    x: CENTER.x - r * Math.sin(half),
    y: CENTER.y - r * Math.cos(half),
  };
});

/** 推力 F 标注坐标：置于箭头尖端左上方外侧，避开正交分解矩形虚线 */
const fLabelPos = computed<Point>(() => ({
  x: fTip.value.x - 11 * sinT.value - 8 * cosT.value,
  y: fTip.value.y - 11 * cosT.value + 8 * sinT.value,
}));
</script>

<template>
  <div class="wp-wrap">
    <div class="wp-fig">
      <svg :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`" xmlns="http://www.w3.org/2000/svg">
        <!-- ==================== 1. 粗糙竖直墙面（复用 SurfaceHatch 组件）与滑块 ==================== -->
        <SurfaceHatch
          :from="{ x: FACE, y: 18 }"
          :to="{ x: FACE, y: 292 }"
          side="left"
          color="#64748b"
          :line-width="2.6"
          :thickness="14"
          :gap="20"
        />

        <!-- 贴墙滑块 -->
        <rect
          :x="BLOCK.x1"
          :y="BLOCK.y1"
          :width="BLOCK.x2 - BLOCK.x1"
          :height="BLOCK.y2 - BLOCK.y1"
          rx="4"
          fill="color-mix(in srgb, var(--c-velocity) 16%, transparent)"
          stroke="var(--c-velocity)"
          stroke-width="2.2"
        />

        <!-- 过滑块几何中心的竖直向上基准虚线（用于标定夹角 θ 与竖直正交轴） -->
        <line
          :x1="CENTER.x"
          :y1="CENTER.y"
          :x2="CENTER.x"
          y2="24"
          stroke="var(--c-neutral-500)"
          stroke-width="1.4"
          stroke-dasharray="5 4"
          opacity="0.8"
        />

        <!-- ==================== 2. Step 2：推力 F 的正交分解（F sin θ 与 F cos θ 及投影矩形） ==================== -->
        <g v-show="step >= 2">
          <!-- 正交投影虚线（从 F 箭头尖端分别投射到水平轴与竖直轴） -->
          <line
            :x1="fTip.x"
            :y1="fTip.y"
            :x2="fyTip.x"
            :y2="fyTip.y"
            stroke="var(--c-text-dim)"
            stroke-width="1.4"
            stroke-dasharray="4 4"
            opacity="0.85"
          />
          <line
            :x1="fTip.x"
            :y1="fTip.y"
            :x2="fxTip.x"
            :y2="fxTip.y"
            stroke="var(--c-text-dim)"
            stroke-width="1.4"
            stroke-dasharray="4 4"
            opacity="0.85"
          />

          <!-- 水平向左分力 F_x = F sin θ -->
          <CourseArrow
            :from="CENTER"
            :to="fxTip"
            :head-size="10"
            stroke="var(--c-physics-light)"
            stroke-width="2.8"
            stroke-dasharray="5 3"
          />
          <text
            :x="(CENTER.x + fxTip.x) / 2 - 6"
            :y="CENTER.y + 18"
            fill="var(--c-physics-light)"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="14"
            text-anchor="middle"
            dominant-baseline="central"
            stroke="var(--c-bg-soft)"
            stroke-width="3"
            paint-order="stroke"
          >
            F
            <tspan font-family="KaTeX_Main" font-style="normal" dx="2">sin</tspan>
            <tspan dx="2">θ</tspan>
          </text>

          <!-- 竖直向上分力 F_y = F cos θ -->
          <CourseArrow
            :from="CENTER"
            :to="fyTip"
            :head-size="10"
            stroke="var(--c-physics-light)"
            stroke-width="2.8"
            stroke-dasharray="5 3"
          />
          <text
            :x="CENTER.x + 32"
            :y="fyTip.y + 2"
            fill="var(--c-physics-light)"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="14"
            text-anchor="middle"
            dominant-baseline="central"
            stroke="var(--c-bg-soft)"
            stroke-width="3"
            paint-order="stroke"
          >
            F
            <tspan font-family="KaTeX_Main" font-style="normal" dx="2">cos</tspan>
            <tspan dx="2">θ</tspan>
          </text>
        </g>

        <!-- ==================== 3. Step 1：完整受力分析（重力 G、墙面支持力 F_N、静摩擦力 F_f） ==================== -->
        <g v-show="step >= 1">
          <!-- 重力 G（从中心竖直向下） -->
          <CourseArrow
            :from="CENTER"
            :to="gTip"
            :head-size="11"
            stroke="var(--c-force)"
            stroke-width="3.4"
          />
          <text
            :x="gTip.x + 15"
            :y="gTip.y - 4"
            fill="var(--c-force)"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="17"
            text-anchor="middle"
            dominant-baseline="central"
            stroke="var(--c-bg-soft)"
            stroke-width="3"
            paint-order="stroke"
          >
            G
          </text>

          <!-- 墙面支持力 F_N（从中心水平向右） -->
          <CourseArrow
            :from="CENTER"
            :to="fnTip"
            :head-size="11"
            stroke="var(--c-physics)"
            stroke-width="3.4"
          />
          <text
            :x="fnTip.x + 17"
            :y="fnTip.y"
            fill="var(--c-physics)"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="17"
            text-anchor="middle"
            dominant-baseline="central"
            stroke="var(--c-bg-soft)"
            stroke-width="3"
            paint-order="stroke"
          >
            F
            <tspan font-family="KaTeX_Math" font-size="12" dy="4" dx="1">N</tspan>
          </text>

          <!-- 墙面静摩擦力 F_f（从中心沿竖直方向向上或向下） -->
          <template v-if="ffLen > 0">
            <CourseArrow
              :from="CENTER"
              :to="ffTip"
              :head-size="11"
              stroke="#c084fc"
              stroke-width="3.4"
            />
            <text
              :x="ffUp ? CENTER.x + 20 : CENTER.x - 19"
              :y="ffTip.y"
              fill="#c084fc"
              font-family="KaTeX_Math"
              font-style="italic"
              font-size="17"
              text-anchor="middle"
              dominant-baseline="central"
              stroke="var(--c-bg-soft)"
              stroke-width="3"
              paint-order="stroke"
            >
              F
              <tspan font-family="KaTeX_Math" font-size="12" dy="4" dx="1">f</tspan>
            </text>
          </template>
        </g>

        <!-- ==================== 4. Step 0（始终显示）：斜向左上方的推力 F 与夹角 θ ==================== -->
        <!-- 夹角 θ 圆弧与角平分线标注 -->
        <path :d="angleArc" fill="none" stroke="var(--c-accent)" stroke-width="1.6" />
        <text
          :x="thetaLabelPos.x"
          :y="thetaLabelPos.y"
          fill="var(--c-accent)"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="16"
          text-anchor="middle"
          dominant-baseline="central"
          stroke="var(--c-bg-soft)"
          stroke-width="3"
          paint-order="stroke"
        >
          θ
        </text>

        <!-- 斜推力 F（从滑块几何中心指向左上方） -->
        <CourseArrow
          :from="CENTER"
          :to="fTip"
          :head-size="11"
          stroke="var(--c-accent)"
          stroke-width="3.6"
        />
        <text
          :x="fLabelPos.x"
          :y="fLabelPos.y"
          fill="var(--c-accent)"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="18"
          text-anchor="middle"
          dominant-baseline="central"
          stroke="var(--c-bg-soft)"
          stroke-width="3"
          paint-order="stroke"
        >
          F
        </text>

        <!-- 滑块几何中心共点作用点圆点 -->
        <circle
          :cx="CENTER.x"
          :cy="CENTER.y"
          r="4"
          fill="var(--c-neutral-50)"
          stroke="var(--c-bg-soft)"
          stroke-width="1.6"
        />
      </svg>
    </div>

    <!-- 右侧紧凑滑块区（滑条走共享 CourseSlider，删除近似数值计算，留出理论推导空间） -->
    <div class="wp-side">
      <CourseSlider
        v-model="fRatio"
        :min="0.6"
        :max="3"
        :step="0.05"
        label-tex="F/G"
        label-width="2.5rem"
      />
      <CourseSlider
        v-model="thetaDeg"
        :min="5"
        :max="80"
        :step="1"
        label-tex="\theta"
        label-width="2.5rem"
      >
        <template #value><Latex :tex="thetaTex" /></template>
      </CourseSlider>
      <CourseSlider
        v-model="muCoeff"
        :min="0.1"
        :max="0.9"
        :step="0.05"
        label-tex="\mu"
        label-width="2.5rem"
      />

      <div :class="`wp-state wp-state-${state}`">{{ stateLabel }}</div>
    </div>
  </div>
</template>

<style scoped>
.wp-wrap {
  display: inline-flex;
  gap: 1rem;
  align-items: center;
  max-width: 100%;
}

.wp-fig {
  /* 图幅收到 14.5rem：本页 题干 + 图 + 结论气泡 竖向超界，图按比例收窄后 360→283px，
     图内标注仍按最后一排看得清给足（渲染 ≈ 0.91 倍用户单位） */
  flex: 0 0 14.5rem;
  min-width: 0;
}

.wp-fig svg {
  display: block;
  width: 100%;
  height: auto;
}

/* 滑条走共享 CourseSlider（标签列 2.5rem + 读数列 5rem + 两处 1.25rem 行内间距），
   故侧栏比原来的自绘版式宽一些，滑轨长度才与原版相当 */
.wp-side {
  display: flex;
  flex: 0 0 15.4rem;
  flex-direction: column;
  gap: 0.45rem;

  min-width: 0;
}

.wp-math {
  font-style: italic;
  font-family: "KaTeX_Math", serif;
}

.wp-state {
  margin-top: 0.15rem;
  font-weight: 700;
  font-size: 0.96rem;
}

.wp-state-ok {
  color: var(--c-accent, #e2a846);
}

.wp-state-down {
  color: var(--c-danger, #f87171);
}

.wp-state-up {
  color: var(--c-accent-2, #2dd4bf);
}
</style>
