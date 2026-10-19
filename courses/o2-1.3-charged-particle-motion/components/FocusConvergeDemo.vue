<!--
  选必2 1.x《复合场中的配速法与摆线运动》「磁汇聚」动效演示

  一束平行带电粒子（同种、同速，沿 +x）射入圆形匀强磁场（半径 R，垂直纸面向外）：
    · 每条粒子的回旋半径 r 由滑块给出（r/R 从 0.4 到 1.8，接近 1 时自动吸附）；
    · 入点 A = 水平线与圆周左半侧的交点，轨迹圆心 C 在 A 正下方 r 处，屏幕顺时针转；
    · 出射点 P 严格解出：两圆（磁场圆 R、轨迹圆 r）的第二个交点沿顺时针方向第一次到达的位置；
    · r = R 时所有出射点都落在磁场圆最低点 P（磁汇聚）；r ≠ R 时出射点沿边界散开。

  红点流沿整条路径（入射直线 → 场内圆弧 → 出场直线）流动，用 stroke-dasharray + dashoffset 实现；
  所有路径都用**用户单位**的同一 dash 周期 ⟹ 各条粒子在图上以相同的真实速率前进（不靠缩放糊弄）。
-->
<script setup lang="ts">
import { computed, ref, watch } from "vue";

/** 画布：1000 × 410 */
const W = 1000;
const H = 410;

/** 磁场圆心与半径（viewBox 用户单位） */
const OX = 612;
const OY = 158;
const K = 138;

/** 平行束各条射线的入射高度（以 R 为单位） */
const BEAM = [-0.78, -0.52, -0.26, 0, 0.26, 0.52, 0.78];

/** 入射直线的起点横坐标 */
const X0 = 24;
/** 出场直线的最长长度（用户单位；再长就被画布裁掉） */
const OUT_MAX = 230;
/** 圆弧采样段数 */
const ARC_STEPS = 56;

interface Point {
  x: number;
  y: number;
}

interface Ray {
  /** 入射高度（以 R 为单位），同时也是列表 key */
  k: number;
  /** 完整路径：入射直线 + 场内圆弧 + 出场直线 */
  d: string;
  /** 只有场内那一段圆弧（高亮用） */
  arcD: string;
  /** 出射点 */
  exit: Point;
}

/** 回旋半径与磁场半径之比（滑块） */
const ratio = ref(1);
/** 回旋半径（用户单位） */
const rPx = computed(() => ratio.value * K);

/**
 * 从 from 沿 dir 射出，裁到画布内（并限制最长 OUT_MAX）
 *
 * @param from 起点
 * @param dir 单位方向向量
 * @returns 线段终点
 */
const clipRay = (from: Point, dir: Point): Point => {
  const pad = 12;
  const limits: number[] = [OUT_MAX];

  if (dir.x > 1e-6) limits.push((W - pad - from.x) / dir.x);
  if (dir.x < -1e-6) limits.push((pad - from.x) / dir.x);
  if (dir.y > 1e-6) limits.push((H - pad - from.y) / dir.y);
  if (dir.y < -1e-6) limits.push((pad - from.y) / dir.y);

  const t = Math.min(...limits.filter((value) => value > 0));
  return { x: from.x + dir.x * t, y: from.y + dir.y * t };
};

/** 每条粒子的几何：入点、轨迹圆心、出射点、完整路径 */
const rays = computed<Ray[]>(() => {
  const r = rPx.value;

  return BEAM.map((k) => {
    const entry: Point = { x: OX - Math.sqrt(1 - k * k) * K, y: OY - k * K };
    /** 洛伦兹力向下（+y）⟹ 轨迹圆心在入点正下方 r 处 */
    const center: Point = { x: entry.x, y: entry.y + r };

    // 屏幕坐标系（y 向下）：φ = −90° 是 A（轨迹圆最高点），φ 增大即顺时针
    const phiA = -Math.PI / 2;
    const phiExit = 2 * Math.atan2(center.y - OY, center.x - OX) + Math.PI / 2;
    let swept = (phiExit - phiA) % (Math.PI * 2);
    if (swept < 0) swept += Math.PI * 2;

    const exit: Point = {
      x: center.x + r * Math.cos(phiExit),
      y: center.y + r * Math.sin(phiExit),
    };
    // 出射时速度沿轨迹切线（顺时针）
    const dir: Point = { x: -Math.sin(phiExit), y: Math.cos(phiExit) };
    const outEnd = clipRay(exit, dir);

    const arcPts: string[] = [];
    for (let i = 0; i <= ARC_STEPS; i += 1) {
      const phi = phiA + (swept * i) / ARC_STEPS;
      arcPts.push(
        `${(center.x + r * Math.cos(phi)).toFixed(1)} ${(center.y + r * Math.sin(phi)).toFixed(1)}`,
      );
    }

    return {
      k,
      d: [
        `M ${X0} ${entry.y.toFixed(1)}`,
        `L ${entry.x.toFixed(1)} ${entry.y.toFixed(1)}`,
        ...arcPts.map((point) => `L ${point}`),
        `L ${outEnd.x.toFixed(1)} ${outEnd.y.toFixed(1)}`,
      ].join(" "),
      arcD: [`M ${arcPts[0]}`, ...arcPts.slice(1).map((point) => `L ${point}`)].join(" "),
      exit,
    };
  });
});

/** 出射点的最大间距（以 R 为单位）：r = R 时严格为 0 */
const spread = computed(() => {
  const points = rays.value.map((ray) => ray.exit);
  let max = 0;

  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1)
      max = Math.max(max, Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y));
  }

  return max / K;
});

/** 是否所有粒子都交于同一点 P */
const converged = computed(() => spread.value < 0.02);

/** 汇聚点 P：磁场圆最低点（圆心正下方 R 处） */
const P: Point = { x: OX, y: OY + K };

// 拖到 1 附近自动吸附到 r = R —— 让"严格汇聚"这一档一定能被取到
watch(ratio, (value) => {
  if (value !== 1 && Math.abs(value - 1) < 0.031) ratio.value = 1;
});

const MATH = "KaTeX_Math, 'Times New Roman', serif";
const HALO = { stroke: "var(--c-bg)", "stroke-width": 3.8, "paint-order": "stroke" } as const;
</script>

<template>
  <div class="fig-focus-demo">
    <!-- 演示画布 -->
    <div class="mf-stage">
      <svg
        :viewBox="`0 0 ${W} ${H}`"
        class="fig-svg select-none"
        role="img"
        aria-label="平行带电粒子束射入圆形匀强磁场，回旋半径等于磁场半径时全部汇聚于最低点"
      >
        <defs>
          <clipPath id="mf-field">
            <circle :cx="OX" :cy="OY" :r="K" />
          </clipPath>
          <filter id="mf-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- 磁场区域：只在圆内（裸 · ＝ 垂直纸面向外） -->
        <g clip-path="url(#mf-field)">
          <FieldDots
            :x="OX - 140"
            :y="OY - 140"
            :cols="11"
            :rows="11"
            :spacing="28"
            :size="5.5"
            :line-width="1.2"
            :opacity="0.36"
            dir="out"
          />
        </g>
        <circle
          :cx="OX"
          :cy="OY"
          :r="K"
          fill="color-mix(in srgb, var(--c-accent) 6%, transparent)"
          stroke="var(--c-accent)"
          stroke-width="2.6"
        />

        <!-- 圆心 O 与竖直向下的半径 R（P 就在这条半径的末端） -->
        <line
          :x1="OX"
          :y1="OY"
          :x2="P.x"
          :y2="P.y"
          stroke="var(--c-accent)"
          stroke-width="1.8"
          stroke-dasharray="8 7"
          opacity="0.75"
        />
        <circle :cx="OX" :cy="OY" r="4" fill="var(--c-accent)" />
        <text
          :x="OX - 16"
          :y="OY + 8"
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
          :x="OX + 14"
          :y="OY + 74"
          font-size="23"
          text-anchor="start"
          fill="var(--c-accent)"
          :font-family="MATH"
          font-style="italic"
          :style="HALO"
        >
          R
        </text>

        <!-- 带电粒子：入射直线 → 场内圆弧（高亮）→ 出场直线；红点流沿整条路径前进 -->
        <g v-for="ray in rays" :key="ray.k">
          <path :d="ray.d" fill="none" stroke="var(--c-force)" stroke-width="1.6" opacity="0.3" />
          <path
            :d="ray.arcD"
            fill="none"
            stroke="var(--c-force)"
            stroke-width="3.4"
            stroke-linecap="round"
            opacity="0.85"
          />
          <path
            class="mf-stream-halo"
            :d="ray.d"
            fill="none"
            stroke="var(--c-force)"
            stroke-width="14"
            stroke-linecap="round"
            stroke-dasharray="0.01 46"
            opacity="0.16"
          />
          <path
            class="mf-stream"
            :d="ray.d"
            fill="none"
            stroke="var(--c-force)"
            stroke-width="7.5"
            stroke-linecap="round"
            stroke-dasharray="0.01 46"
          />
        </g>

        <!-- r ≠ R 时：出射点沿边界散开 -->
        <g v-if="!converged">
          <circle
            v-for="ray in rays"
            :key="`exit-${ray.k}`"
            :cx="ray.exit.x"
            :cy="ray.exit.y"
            r="5"
            fill="var(--c-bg)"
            stroke="var(--c-text-dim)"
            stroke-width="2.2"
          />
        </g>

        <!-- 汇聚点 P -->
        <g v-if="converged">
          <circle
            class="mf-pulse"
            :cx="P.x"
            :cy="P.y"
            r="10"
            fill="none"
            stroke="var(--c-ok)"
            stroke-width="2.6"
          />
          <circle :cx="P.x" :cy="P.y" r="7" fill="var(--c-ok)" filter="url(#mf-glow)" />
        </g>
        <circle
          v-else
          :cx="P.x"
          :cy="P.y"
          r="6"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="2"
          stroke-dasharray="5 5"
        />
        <text
          :x="P.x - 28"
          :y="P.y + 8"
          font-size="24"
          text-anchor="end"
          :fill="converged ? 'var(--c-ok)' : 'var(--c-text-dim)'"
          :font-family="MATH"
          font-style="italic"
          :style="HALO"
        >
          P
        </text>
      </svg>
    </div>

    <!-- 交互控件：回旋半径 r 与磁场半径 R 的比值（滑块用共享的 CourseSlider） -->
    <div class="ui-bar ui-bar-row">
      <CourseSlider
        v-model="ratio"
        :min="0.4"
        :max="1.8"
        :step="0.02"
        label-tex="r/R"
        label-width="3.4rem"
      />

      <div class="ui-read text-lg">
        <span class="ui-item">出射点间距 <Latex :tex="`= ${spread.toFixed(2)}R`" /></span>
        <span class="ui-tag text-lg" :class="converged ? 'ui-tag-ok' : 'ui-tag-off'">
          {{ converged ? "全部交于 P" : "出射点分散" }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fig-focus-demo {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--page-gap);

  min-width: 0;
  min-height: 0;
}

/* 画布占满控件以外的全部高度；preserveAspectRatio 默认 meet ⟹ 永不溢出 */
.mf-stage {
  display: block;
  flex: 1 1 auto;

  min-height: 0;
}

.fig-focus-demo .fig-svg {
  width: 100%;
  height: 100%;
  max-width: none;
}

/* 沿路径流动的粒子流：同一 dash 周期、同一时长 ⟹ 各条速率严格相同 */
.mf-stream,
.mf-stream-halo {
  animation: mf-flow 0.42s linear infinite;
}

@keyframes mf-flow {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -46;
  }
}

/* 汇聚点亮环：周期性向外扩散 */
.mf-pulse {
  transform-box: fill-box;
  transform-origin: center;
  animation: mf-pulse 1.6s ease-out infinite;
}

@keyframes mf-pulse {
  from {
    opacity: 0.9;
    transform: scale(0.6);
  }

  to {
    opacity: 0;
    transform: scale(1.8);
  }
}
</style>
