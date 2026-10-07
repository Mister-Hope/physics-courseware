<script setup lang="ts">
// 第 15 页：全过程 v-t 图像（定性）。图上不出现任何数值：
// 轴只留 t、v/(m/s) 两个符号，曲线按"点击一步、多出一段"逐段出现，
// 关键点用「半透明磨砂气泡 + 虚线指点」标注，气泡可以离曲线远一点，不压线。
// 数值只用于作图（g = 10 m/s²、h = 0.20 m、k/m = 100 s⁻²），一律不上屏。
import { computed } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

const GRAVITY = 10;
const OMEGA = 10;
const X_EQ = GRAVITY / (OMEGA * OMEGA);
const V_CONTACT = 2;
const T_CONTACT = 0.2;
const T_EQ = 0.24636476;
const T_LOWEST = 0.40344439;
const T_RELEASE = 0.60688879;
const T_APEX = 0.80688879;
const V_MAX = OMEGA * Math.sqrt(X_EQ * X_EQ + (V_CONTACT / OMEGA) * (V_CONTACT / OMEGA));

// v(t)：自由落体段 / 接触后的简谐段 / 脱离后的竖直上抛段
const speedAt = (time: number): number => {
  if (time <= T_CONTACT) return GRAVITY * time;

  if (time <= T_RELEASE) {
    const tau = time - T_CONTACT;

    return V_CONTACT * Math.cos(OMEGA * tau) + X_EQ * OMEGA * Math.sin(OMEGA * tau);
  }

  return -V_CONTACT + GRAVITY * (time - T_RELEASE);
};

const sample = (from: number, to: number, count = 36): { x: number; y: number }[] =>
  Array.from({ length: count + 1 }, (_, index) => {
    const time = from + ((to - from) * index) / count;

    return { x: time, y: speedAt(time) };
  });

/** 五段运动：每段在第 k 次点击时出现 */
const SEGMENTS = [
  [0, T_CONTACT],
  [T_CONTACT, T_EQ],
  [T_EQ, T_LOWEST],
  [T_LOWEST, T_RELEASE],
  [T_RELEASE, T_APEX],
];

const curves = computed(() => [
  // 先把拐点（接触托盘）向两轴的虚线垂线铺在底层，再画曲线
  {
    points: [
      { x: T_CONTACT, y: 0 },
      { x: T_CONTACT, y: V_CONTACT },
    ],
    stroke: "var(--c-text-dim)",
    width: 1.4,
    dashed: true,
    opacity: 0.75,
    showAt: 1,
  },
  {
    points: [
      { x: 0, y: V_CONTACT },
      { x: T_CONTACT, y: V_CONTACT },
    ],
    stroke: "var(--c-text-dim)",
    width: 1.4,
    dashed: true,
    opacity: 0.75,
    showAt: 1,
  },
  ...SEGMENTS.map(([from, to], index) => ({
    points: sample(from, to),
    stroke: "var(--c-accent)",
    width: 3.5,
    showAt: index + 1,
  })),
]);

/** 气泡：point 是曲线上的点，center 是气泡位置（数据坐标，选在空白处），w/h 是屏幕 px 尺寸 */
const BUBBLES = [
  {
    key: 1,
    text: "接触托盘",
    point: { x: T_CONTACT, y: V_CONTACT },
    center: { x: 0.14, y: 2.6 },
    w: 94,
    h: 32,
  },
  {
    key: 2,
    text: "速度最大",
    point: { x: T_EQ, y: V_MAX },
    center: { x: 0.53, y: 2.45 },
    w: 94,
    h: 32,
  },
  {
    key: 3,
    text: "最低点",
    point: { x: T_LOWEST, y: 0 },
    center: { x: 0.33, y: -1.3 },
    w: 76,
    h: 32,
  },
  {
    key: 4,
    text: "脱离托盘",
    point: { x: T_RELEASE, y: -V_CONTACT },
    center: { x: 0.7, y: 0.5 },
    w: 94,
    h: 32,
  },
  {
    key: 5,
    text: "回到原高度",
    point: { x: T_APEX, y: 0 },
    center: { x: 0.72, y: 1.55 },
    w: 110,
    h: 32,
  },
];

const labels = computed(() =>
  BUBBLES.map((bubble) => ({
    x: bubble.center.x,
    y: bubble.center.y,
    parts: [{ text: bubble.text }],
    anchor: "center" as const,
    size: 17,
    showAt: bubble.key,
  })),
);
</script>

<template>
  <CoordAxes
    :x-range="[0, 0.88]"
    :y-range="[-2.5, 2.9]"
    :x-axis="{ quantity: 't', unit: 's' }"
    :y-axis="{ quantity: 'v', unit: '(m/s)' }"
    :ticks="{ x: [], y: [] }"
    :curves="curves"
    :labels="labels"
    :view="{ width: 620, height: 470 }"
    :step="step"
  >
    <template #overlay="{ x, y, px2user }">
      <g v-for="bubble in BUBBLES" :key="bubble.text">
        <template v-if="step >= bubble.key">
          <line
            :x1="x(bubble.point.x)"
            :y1="y(bubble.point.y)"
            :x2="x(bubble.center.x)"
            :y2="y(bubble.center.y)"
            stroke="rgba(148,163,184,0.6)"
            stroke-width="1.4"
            stroke-dasharray="6 5"
          />
          <rect
            :x="x(bubble.center.x) - (bubble.w * px2user) / 2"
            :y="y(bubble.center.y) - (bubble.h * px2user) / 2"
            :width="bubble.w * px2user"
            :height="bubble.h * px2user"
            rx="9"
            fill="rgba(15,23,42,0.88)"
            stroke="rgba(148,163,184,0.4)"
            stroke-width="1.2"
          />
        </template>
      </g>
    </template>
  </CoordAxes>
</template>
