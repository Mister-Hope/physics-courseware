<!--
  《带电粒子在匀强磁场中的运动》磁控束应用页配图
  —— 四片叶形匀强磁场区：左边两片大叶（回旋半径 r3），右边两片小叶（回旋半径 r4）。
  一束宽度 d1 的平行粒子束从左边射入：左面两片叶形磁区把它会聚到 O，
  右面两片小叶形磁区再把从 O 散开的粒子变成平行束，宽度变为 d2。

  每片叶子都是「两段圆弧围成的叶形（透镜形）」：两段弧的半径都等于粒子在该区的回旋半径，
  这正是面积最小的磁区 —— 粒子在区内走的每一段轨迹弧都落在叶形之内。
  叶形 = 两个半径 r 的圆的交集：两个圆心的连线端点分别是 O 与叶尖（c1 + c2）。

  step 0：四片叶形磁区（先把"装置"摆出来）；step 1：入射束会聚到 O；step 2：出射束重新平行、宽度标注。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 演示步骤：0 装置，1 左侧会聚，2 右侧重新平行并标出两个宽度 */
  step?: number;
}>();

/** 画布：1000 × 344 */
const W = 1000;
const H = 344;

/** 会聚点 O（屏幕坐标） */
const OX = 600;
const OY = 172;

/** 左右两区粒子的回旋半径（用户单位） */
const R3 = 138;
const R4 = 52;

/** 入射 / 出射直线段的起止横坐标（物理坐标，O 为原点：负值在左、正值在右） */
const X_IN = -540;
const X_OUT = 392;

/** 宽度标注线的横坐标 */
const DIM_L = 82;
const DIM_R = 872;

interface Pt {
  x: number;
  y: number;
}

/** 物理坐标（y 向上、O 为原点）→ 屏幕坐标 */
const toScreen = (p: Pt): Pt => ({ x: OX + p.x, y: OY - p.y });

const ARC_STEPS = 40;

/** 圆上一点（物理坐标） */
const polar = (c: Pt, r: number, angle: number): Pt => ({
  x: c.x + r * Math.cos(angle),
  y: c.y + r * Math.sin(angle),
});

/** 圆弧采样（物理坐标）：圆心 c、半径 r、角度从 a0 线性变到 a1 */
const arc = (c: Pt, r: number, a0: number, a1: number): Pt[] =>
  Array.from({ length: ARC_STEPS + 1 }, (_, i) => polar(c, r, a0 + ((a1 - a0) * i) / ARC_STEPS));

/** 采样点 → SVG 路径 */
const ptsToPath = (pts: Pt[], move = true): string =>
  pts
    .map((p, i) => {
      const q = toScreen(p);
      return `${i === 0 && move ? "M" : "L"} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
    })
    .join(" ");

/**
 * 叶形路径 = 两个半径 r 的圆的交集
 *
 * 两圆心 c1、c2 到 O 的距离都是 r，另一个交点是叶尖 c1 + c2； 每段弧取「中点落在另一个圆内」的那一侧。
 */
const lensPath = (c1: Pt, c2: Pt, r: number): string => {
  const tip: Pt = { x: c1.x + c2.x, y: c1.y + c2.y };

  const pickArc = (c: Pt, other: Pt, from: Pt, to: Pt): Pt[] => {
    const a0 = Math.atan2(from.y - c.y, from.x - c.x);
    const a1 = Math.atan2(to.y - c.y, to.x - c.x);

    for (const dir of [1, -1] as const) {
      let end = a1;
      if (dir === 1 && end <= a0) end += Math.PI * 2;
      if (dir === -1 && end >= a0) end -= Math.PI * 2;

      const mid = polar(c, r, (a0 + end) / 2);
      if (Math.hypot(mid.x - other.x, mid.y - other.y) < r) return arc(c, r, a0, end);
    }

    return arc(c, r, a0, a1);
  };

  const first = pickArc(c1, c2, { x: 0, y: 0 }, tip);
  const second = pickArc(c2, c1, tip, { x: 0, y: 0 });

  return `${ptsToPath(first)} ${ptsToPath(second, false)} Z`;
};

/** 左面两片大叶：叶尖在 (-R3, ±R3) */
const lensUL = lensPath({ x: 0, y: R3 }, { x: -R3, y: 0 }, R3);
const lensLL = lensPath({ x: 0, y: -R3 }, { x: -R3, y: 0 }, R3);

/** 右面两片小叶：叶尖在 (R4, ±R4) */
const lensUR = lensPath({ x: 0, y: R4 }, { x: R4, y: 0 }, R4);
const lensLR = lensPath({ x: 0, y: -R4 }, { x: R4, y: 0 }, R4);

interface Ray {
  key: string;
  /** 入射直线 + 左区圆弧（止于 O） */
  inD: string;
  /** 右区圆弧 + 出射直线（从 O 起） */
  outD: string;
}

/** 平行束各条射线的高度（以 R3 为单位，取 1 时正好贴着叶子外侧） */
const FRACTIONS = [1 / 3, 2 / 3, 1];

const mirror = (pts: Pt[]): Pt[] => pts.map((p) => ({ x: p.x, y: -p.y }));

/**
 * 一条射线的两截路径
 *
 * 上半束：在左区顺时针转（B 向外）会聚到 O，再在右区逆时针转（B 向里）变成平行 +x。
 */
const rays: Ray[] = FRACTIONS.flatMap((f) => {
  const h = f * R3;
  const s = Math.sqrt(2 * h * R3 - h * h);

  /** 入射点（在叶子边界弧上，此处速度水平） */
  const entry: Pt = { x: -s, y: h };
  /** 左区轨迹圆心：入射点正下方 R3 */
  const c1: Pt = { x: entry.x, y: h - R3 };
  const inArc = arc(c1, R3, Math.PI / 2, Math.atan2(-c1.y, -c1.x));

  /** 到达 O 时的速度方向（与 +x 的夹角，负值朝下） */
  const alpha = Math.atan2(-s, R3 - h);
  /** 右区轨迹圆心：O 沿速度方向左转 90° 走 R4 */
  const c2: Pt = { x: -R4 * Math.sin(alpha), y: R4 * Math.cos(alpha) };
  const outArc = arc(c2, R4, Math.atan2(-c2.y, -c2.x), -Math.PI / 2);
  /** 出射点：高度 -h·R4/R3 */
  const exit: Pt = { x: (R4 * s) / R3, y: (-R4 * h) / R3 };

  const inPts: Pt[] = [{ x: X_IN, y: h }, ...inArc];
  const outPts: Pt[] = [...outArc, exit, { x: X_OUT, y: exit.y }];

  return [
    { key: `${f}`, inD: ptsToPath(inPts), outD: ptsToPath(outPts) },
    { key: `-${f}`, inD: ptsToPath(mirror(inPts)), outD: ptsToPath(mirror(outPts)) },
  ];
});

/** 沿 x 轴的一条射线：正对 O，不偏转 */
const axisRay = ptsToPath([
  { x: X_IN, y: 0 },
  { x: X_OUT, y: 0 },
]);

const MATH = "KaTeX_Math, 'Times New Roman', serif";
const HALO = { stroke: "var(--c-bg)", "stroke-width": 3.6, "paint-order": "stroke" } as const;
</script>

<template>
  <div class="fig-beam-shaper">
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      class="fig-svg"
      role="img"
      aria-label="平行粒子束经过四片叶形磁场区后宽度变窄：左边两片大叶把粒子会聚到 O，右边两片小叶把粒子重新变成平行束"
    >
      <!-- 左面两片大叶形磁区 -->
      <path
        :d="lensUL"
        fill="color-mix(in srgb, var(--c-accent) 9%, transparent)"
        stroke="var(--c-accent)"
        stroke-width="2.4"
        stroke-linejoin="round"
      />
      <path
        :d="lensLL"
        fill="color-mix(in srgb, var(--c-accent) 9%, transparent)"
        stroke="var(--c-accent)"
        stroke-width="2.4"
        stroke-linejoin="round"
      />

      <!-- 右面两片小叶形磁区 -->
      <path
        :d="lensUR"
        fill="color-mix(in srgb, var(--c-accent) 9%, transparent)"
        stroke="var(--c-accent)"
        stroke-width="2.4"
        stroke-linejoin="round"
      />
      <path
        :d="lensLR"
        fill="color-mix(in srgb, var(--c-accent) 9%, transparent)"
        stroke="var(--c-accent)"
        stroke-width="2.4"
        stroke-linejoin="round"
      />

      <!-- 磁场方向记号：上两片向外 ⊙、下两片向里 ⊗ -->
      <FieldMark
        :x="OX - R3 * 0.52"
        :y="OY - R3 * 0.52"
        dir="out"
        :r="8"
        :line-width="1.8"
        color="var(--c-accent)"
        opacity="0.8"
      />
      <FieldMark
        :x="OX - R3 * 0.52"
        :y="OY + R3 * 0.52"
        dir="in"
        :r="8"
        :line-width="1.8"
        color="var(--c-accent)"
        opacity="0.8"
      />
      <FieldMark
        :x="OX + R4 * 0.52"
        :y="OY - R4 * 0.52"
        dir="out"
        :r="7"
        :line-width="1.7"
        color="var(--c-accent)"
        opacity="0.85"
      />
      <FieldMark
        :x="OX + R4 * 0.52"
        :y="OY + R4 * 0.52"
        dir="in"
        :r="7"
        :line-width="1.7"
        color="var(--c-accent)"
        opacity="0.85"
      />

      <!-- 入射束：直线 → 左区圆弧 → 会聚于 O（点击后出现） -->
      <template v-if="step >= 1">
        <path
          v-for="ray in rays"
          :key="`in-${ray.key}`"
          :d="ray.inD"
          fill="none"
          stroke="var(--c-force)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity="0.9"
        />
        <path
          :d="axisRay"
          fill="none"
          stroke="var(--c-force)"
          stroke-width="1.6"
          stroke-linecap="round"
          opacity="0.55"
        />
      </template>

      <!-- 出射束：O → 右区圆弧 → 平行射出（点击后才出现） -->
      <template v-if="step >= 2">
        <path
          v-for="ray in rays"
          :key="`out-${ray.key}`"
          :d="ray.outD"
          fill="none"
          stroke="var(--c-force)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity="0.9"
        />
      </template>

      <!-- 会聚点 O -->
      <circle :cx="OX" :cy="OY" r="5.2" fill="var(--c-accent)" />
      <text
        :x="OX - 16"
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

      <!-- 入射束宽度 d1 -->
      <g v-if="step >= 1" class="bs-dim">
        <CourseArrow
          :from="{ x: DIM_L, y: OY }"
          :to="{ x: DIM_L, y: OY - R3 }"
          stroke="var(--c-text-dim)"
          :stroke-width="1.4"
          :head-size="9"
        />
        <CourseArrow
          :from="{ x: DIM_L, y: OY }"
          :to="{ x: DIM_L, y: OY + R3 }"
          stroke="var(--c-text-dim)"
          :stroke-width="1.4"
          :head-size="9"
        />
        <text
          :x="DIM_L - 16"
          :y="OY + 9"
          font-size="24"
          text-anchor="end"
          fill="var(--c-text)"
          :font-family="MATH"
          font-style="italic"
          :style="HALO"
        >
          d
          <tspan dx="1" dy="5" font-size="15" font-family="KaTeX_Main" font-style="normal">1</tspan>
        </text>
      </g>

      <!-- 出射束宽度 d2（点击后才出现） -->
      <g v-if="step >= 2" class="bs-dim">
        <CourseArrow
          :from="{ x: DIM_R, y: OY }"
          :to="{ x: DIM_R, y: OY - R4 }"
          stroke="var(--c-text-dim)"
          :stroke-width="1.4"
          :head-size="9"
        />
        <CourseArrow
          :from="{ x: DIM_R, y: OY }"
          :to="{ x: DIM_R, y: OY + R4 }"
          stroke="var(--c-text-dim)"
          :stroke-width="1.4"
          :head-size="9"
        />
        <text
          :x="DIM_R + 14"
          :y="OY + 9"
          font-size="24"
          text-anchor="start"
          fill="var(--c-text)"
          :font-family="MATH"
          font-style="italic"
          :style="HALO"
        >
          d
          <tspan dx="1" dy="5" font-size="15" font-family="KaTeX_Main" font-style="normal">2</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.fig-beam-shaper {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
}

.fig-beam-shaper .fig-svg {
  width: 100%;
  max-width: none;
  height: 100%;
}
</style>
