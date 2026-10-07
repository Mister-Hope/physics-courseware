<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 6 页：伽利略斜面实验的装置——拖滑杆改变倾角 θ（15°–90°），也可以换用不同的球。
 *
 * 图上只有装置本身，几何严格按 θ 画：水平地面、倾角为 θ 的光滑斜面（底端在顶点，斜面从地面斜着立起来）、
 * **贴着斜面的小球**（球心沿斜面法线偏移一个半径，不是"串"在斜面上的）、标在夹角内部的 θ 圆弧、 沿着斜面量出的位移 x。θ 拉到 90° 时斜面立成竖直，图里会给出"斜面立成竖直 ⇒
 * 自由落体"的提示。
 *
 * 默认 θ = 20°（讲"涂油斜面把下落放慢、才测得准"）；讲"倾角一直加大"时教师把滑杆拖到 90°，如果想让某页 直接从 90° 开始，传 `start-angle = 90` 即可。
 */

/** 可以换的球：材料与大小不同（质量不同），但运动规律一样 */
const BALLS = [
  { id: "wood", name: "木球", radius: 12.5, fill: "#c98a4b" },
  { id: "copper", name: "铜球", radius: 9.5, fill: "#e2a846" },
  { id: "iron", name: "铁球", radius: 7, fill: "#a8b3c4" },
] as const;

const { startAngle = 20 } = defineProps<{ startAngle?: number }>();

/** 当前倾角（度）：滑杆 15°–90°、5° 一档（再小夹角就太扁，θ 标注挤不下） */
const angle = ref(Math.min(90, Math.max(15, startAngle)));
/** 当前选中的球 */
const ballId = ref<(typeof BALLS)[number]["id"]>("copper");

const ball = computed(() => BALLS.find((item) => item.id === ballId.value) ?? BALLS[1]);

/* ── 装置几何（viewBox 用户单位，y 向下） ── */
/** 斜面底端（与地面的交点） */
const BASE = { x: 74, y: 236 };
/** 斜面长度（沿斜面量） */
const LENGTH = 200;
/** 球停在离底端这么远的地方（沿斜面量）——即"已经滚下的位移 x"的终点 */
const BALL_S = 16;
/** θ 圆弧的半径 */
const ARC_R = 42;

/** 倾角（弧度） */
const rad = computed(() => (angle.value * Math.PI) / 180);
/** 沿斜面向上（底端 → 顶端）的单位向量 */
const axis = computed(() => ({ x: Math.cos(rad.value), y: -Math.sin(rad.value) }));
/** 斜面外侧（左上）的单位法向量：球心沿它偏移一个半径，球才是"贴着"斜面 */
const normal = computed(() => ({ x: -Math.sin(rad.value), y: -Math.cos(rad.value) }));

/**
 * 斜面上的一点：沿斜面走 along、再沿法线往外偏 offset
 *
 * @param along 沿斜面走的距离（0 = 底端）
 * @param offset 沿法线向外的偏移（正数 = 斜面外侧）
 * @returns 画布坐标
 */
const pointAt = (along: number, offset = 0): { x: number; y: number } => ({
  x: BASE.x + axis.value.x * along + normal.value.x * offset,
  y: BASE.y + axis.value.y * along + normal.value.y * offset,
});

/** 斜面顶端（释放点） */
const topPoint = computed(() => pointAt(LENGTH));
/** 球心 */
const ballPoint = computed(() => ({ ...pointAt(BALL_S, ball.value.radius) }));
/** 位移 x 的尺寸线两端与中点（都在斜面外侧） */
const dimOut = computed(() => ball.value.radius + 16);
const dimFrom = computed(() => pointAt(0, dimOut.value));
const dimTo = computed(() => pointAt(LENGTH, dimOut.value));
const dimMid = computed(() => pointAt(LENGTH / 2, dimOut.value));
/** X 标签（再往外挪一点） */
const xLabelAt = computed(() => pointAt(LENGTH / 2, ball.value.radius + 40));
/** 释放点的短划线（垂直于斜面） */
const startTick = computed(() => ({ from: pointAt(LENGTH, -6), to: pointAt(LENGTH, 10) }));

/** θ 圆弧：采样成折线，避免大弧标志位写错方向 */
const arcPath = computed(() => {
  const points: string[] = [];

  for (let index = 0; index <= 12; index += 1) {
    const phi = (rad.value * index) / 12;

    points.push(
      `${Math.round(BASE.x + ARC_R * Math.cos(phi))},${Math.round(BASE.y - ARC_R * Math.sin(phi))}`,
    );
  }

  return `M ${points.join(" L ")}`;
});

/** θ 标签：画在角平分线上、圆弧外侧（保证"落在夹角里"） */
const thetaLabelAt = computed(() => {
  const half = rad.value / 2;

  return {
    x: Math.round(BASE.x + 64 * Math.cos(half)),
    y: Math.round(BASE.y - 64 * Math.sin(half) + 5),
  };
});

/** 无障碍说明 */
const aria = computed(
  () =>
    `光滑斜面倾角 θ 为 ${angle.value} 度，顶端到球的位置沿斜面量出位移 x；` +
    `球是${ball.value.name}，贴着斜面由静止滚下；${
      angle.value >= 90 ? "斜面立成竖直，物体只受重力，就是自由落体" : "可以换球、换倾角"
    }`,
);
</script>

<template>
  <div class="gi">
    <svg
      class="gi-svg"
      viewBox="0 0 385 262"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-label="aria"
    >
      <line x1="16" :y1="BASE.y" x2="372" :y2="BASE.y" stroke="#475569" stroke-width="2" />
      <line
        :x1="BASE.x"
        :y1="BASE.y"
        :x2="topPoint.x"
        :y2="topPoint.y"
        stroke="#94a3b8"
        stroke-width="2.2"
      />
      <line
        :x1="BASE.x"
        :y1="BASE.y"
        :x2="topPoint.x"
        :y2="topPoint.y"
        stroke="rgba(226,168,70,0.3)"
        stroke-width="7"
      />
      <line
        :x1="startTick.from.x"
        :y1="startTick.from.y"
        :x2="startTick.to.x"
        :y2="startTick.to.y"
        stroke="rgba(148,163,184,0.6)"
        stroke-width="1.4"
      />
      <path :d="arcPath" fill="none" stroke="#94a3b8" stroke-width="1.6" />
      <text
        :x="thetaLabelAt.x"
        :y="thetaLabelAt.y"
        fill="#94a3b8"
        font-size="21"
        font-family="KaTeX_Math"
        font-style="italic"
        class="gi-halo"
      >
        θ
      </text>
      <CourseArrow
        :from="{ x: dimMid.x, y: dimMid.y }"
        :to="{ x: dimTo.x, y: dimTo.y }"
        stroke="#e2a846"
        stroke-width="2.2"
      />
      <CourseArrow
        :from="{ x: dimMid.x, y: dimMid.y }"
        :to="{ x: dimFrom.x, y: dimFrom.y }"
        stroke="#e2a846"
        stroke-width="2.2"
      />
      <text
        :x="xLabelAt.x"
        :y="xLabelAt.y"
        fill="#e2a846"
        font-size="21"
        font-family="KaTeX_Math"
        font-style="italic"
        text-anchor="middle"
        class="gi-halo"
      >
        x
      </text>
      <circle
        :cx="ballPoint.x"
        :cy="ballPoint.y"
        :r="ball.radius"
        :fill="ball.fill"
        class="gi-ball-dot"
      />
      <text v-if="angle >= 90" x="120" y="52" fill="#2dd4bf" font-size="16" class="gi-halo">
        斜面立成竖直 ⇒ 自由落体
      </text>
    </svg>

    <div class="gi-panel">
      <div class="gi-row">
        <span class="gi-label">倾角 <Latex tex="\theta" /></span>
        <input v-model.number="angle" class="gi-range" type="range" min="15" max="90" step="5" />
        <b class="gi-value">{{ angle }}°</b>
      </div>
      <div class="gi-balls">
        <button
          v-for="item in BALLS"
          :key="item.id"
          type="button"
          class="gi-ball"
          :class="{ 'is-on': item.id === ballId }"
          @click="ballId = item.id"
        >
          {{ item.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gi {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;

  width: 100%;
  min-width: 0;
}

.gi-svg {
  display: block;
  width: 100%;
  height: auto;
}

/* 图内文字压在斜面/地面/尺寸线上时加描边光晕，保证读得清 */
.gi-halo {
  paint-order: stroke;
  stroke: #0f1425;
  stroke-width: 3.4px;
}

/* 球加一点高光，看着是个"球"而不是一个圆点 */
.gi-ball-dot {
  stroke: rgb(15 20 37 / 55%);
  stroke-width: 1.2;
}

.gi-panel {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.gi-row {
  display: flex;
  gap: 0.6rem;
  align-items: center;

  color: var(--c-text-dim);

  font-size: 0.82rem;
}

.gi-label {
  white-space: nowrap;
}

.gi-range {
  flex: 1;
  min-width: 0;
  accent-color: var(--c-accent);
}

.gi-value {
  color: var(--c-accent);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.gi-balls {
  display: flex;
  gap: 0.5rem;
}

.gi-ball {
  flex: 1;

  min-width: 0;
  padding: 0.22rem 0.2rem;
  border: 1px solid var(--c-border);
  border-radius: 0.6rem;

  background: var(--c-surface);
  color: var(--c-text-dim);

  font-size: 0.75rem;
  font-family: inherit;
  line-height: 1.25;
  white-space: nowrap;

  cursor: pointer;

  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease;
}

.gi-ball.is-on {
  border-color: var(--c-accent);
  color: var(--c-accent);
}
</style>
