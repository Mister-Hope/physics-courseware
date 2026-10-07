<script setup lang="ts">
import { computed } from "vue";

/**
 * 正交分解示意图：把一个力沿 x、y 两个方向分解（坐标轴/刻度/字号全部交给共享 `CoordAxes`）。
 *
 * - `angle`：力 F 与 x 轴正方向的夹角（度，逆时针为正，符合书本上的数学约定）；
 * - `extras`：从原点出发、不参与分解的其它力（画在同一坐标系里，`len` 是它在图上的长度）；
 * - 分力由 `computed` 真实计算：F_x = F·cosθ、F_y = F·sinθ。
 */
const {
  angle,
  tex = "F",
  color = "var(--c-accent)",
  extras = [],
} = defineProps<{
  angle: number;
  tex?: string;
  color?: string;
  extras?: { angle: number; tex: string; len: number; color?: string }[];
}>();

/** F 在图上画多长（数据单位） */
const F_LEN = 4;

const rad = computed<number>(() => (angle * Math.PI) / 180);
const forceX = computed<number>(() => F_LEN * Math.cos(rad.value));
const forceY = computed<number>(() => F_LEN * Math.sin(rad.value));

const extraItems = computed(() =>
  extras.map((item) => ({
    angle: item.angle,
    tex: item.tex,
    len: item.len,
    color: item.color,
    x: item.len * Math.cos((item.angle * Math.PI) / 180),
    y: item.len * Math.sin((item.angle * Math.PI) / 180),
  })),
);

/** 力的标注放在箭头的哪一侧（跟着象限走，别压住箭头） */
const tipAnchor = computed<"top-right" | "top-left" | "bottom-right" | "bottom-left">(() => {
  const right = forceX.value >= 0;
  const top = forceY.value >= 0;

  return `${top ? "top" : "bottom"}-${right ? "right" : "left"}`;
});

const fxAnchor = computed<"top-right" | "top-left" | "bottom-right" | "bottom-left">(() =>
  forceX.value >= 0 ? "bottom-right" : "bottom-left",
);
const fyAnchor = computed<"top-right" | "top-left" | "bottom-right" | "bottom-left">(() =>
  forceY.value >= 0 ? "top-left" : "bottom-left",
);

/** 直角符号的边长（viewBox 用户单位）与朝向 */
const MARK = 11;
const signX = computed<number>(() => (forceX.value >= 0 ? 1 : -1));
const signY = computed<number>(() => (forceY.value >= 0 ? 1 : -1));

/** 虚线投影：从箭头尖端落到两条轴上 */
const guideCurves = computed(() => [
  {
    points: [
      { x: forceX.value, y: forceY.value },
      { x: forceX.value, y: 0 },
    ],
    stroke: "var(--c-text-dim)",
    width: 1.4,
    dashed: true,
    opacity: 0.7,
  },
  {
    points: [
      { x: forceX.value, y: forceY.value },
      { x: 0, y: forceY.value },
    ],
    stroke: "var(--c-text-dim)",
    width: 1.4,
    dashed: true,
    opacity: 0.7,
  },
]);

const labels = computed(() => [
  { x: forceX.value, y: forceY.value, tex, color, size: 19, anchor: tipAnchor.value, halo: true },
  { x: forceX.value, y: 0, tex: "F_x", color, size: 16, anchor: fxAnchor.value, halo: true },
  { x: 0, y: forceY.value, tex: "F_y", color, size: 16, anchor: fyAnchor.value, halo: true },
]);
</script>

<template>
  <CoordAxes
    :x-range="[-6.5, 6.5]"
    :y-range="[-5.6, 5.6]"
    :x-axis="{ quantity: 'x' }"
    :y-axis="{ quantity: 'y' }"
    :ticks="{ x: [], y: [], labels: false }"
    :curves="guideCurves"
    :labels="labels"
    :view="{ width: 430, height: 350 }"
  >
    <template #overlay="{ x, y }">
      <g v-for="(item, index) in extraItems" :key="index">
        <CourseArrow
          :from="{ x: x(0), y: y(0) }"
          :to="{ x: x(item.x), y: y(item.y) }"
          :head-size="10"
          :stroke="item.color ?? 'var(--c-accent-2)'"
          stroke-width="3"
          pointer-events="none"
        />
      </g>
      <CourseArrow
        :from="{ x: x(0), y: y(0) }"
        :to="{ x: x(forceX), y: y(0) }"
        :head-size="9"
        :stroke="color"
        stroke-width="2.6"
        stroke-dasharray="8 5"
        opacity="0.9"
        pointer-events="none"
      />
      <CourseArrow
        :from="{ x: x(0), y: y(0) }"
        :to="{ x: x(0), y: y(forceY) }"
        :head-size="9"
        :stroke="color"
        stroke-width="2.6"
        stroke-dasharray="8 5"
        opacity="0.9"
        pointer-events="none"
      />
      <CourseArrow
        :from="{ x: x(0), y: y(0) }"
        :to="{ x: x(forceX), y: y(forceY) }"
        :head-size="11"
        :stroke="color"
        stroke-width="3.4"
        pointer-events="none"
      />
      <path
        :d="`M ${x(forceX)} ${y(0) - signY * MARK} L ${x(forceX) - signX * MARK} ${y(0) - signY * MARK} L ${x(forceX) - signX * MARK} ${y(0)}`"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.3"
        pointer-events="none"
      />
    </template>
  </CoordAxes>
</template>
