<script setup lang="ts">
import { computed, useAttrs, useId } from "vue";

interface Point {
  x: number;
  y: number;
}

/**
 * 课件通用矢量箭头（**只能在 `<svg>` 里用**）。
 *
 * 把「SVG 矢量箭头两条铁律」封进组件，写课件时只关心起点和终点：
 *
 * 1. 三角形 marker 自动生成（`refX/refY` 在三角形中心、`markerUnits="userSpaceOnUse"`）， 不会出现"三角形后面挂个长方形"；
 * 2. **线段终点自动回退半个箭头长**——箭头尖端一定正好落在 `to` 上，不用自己算 `shaftEnd`，也不要再手改终点坐标。
 *
 * ```html
 * <CourseArrow
 *   :from="{ x: OX, y: OY }"
 *   :to="tip"
 *   stroke="#e2a846"
 *   stroke-width="3.2"
 *   label="a"
 * />
 * <CourseArrow
 *   :from="A"
 *   :to="B"
 *   stroke="#60a5fa"
 *   stroke-width="2.6"
 *   stroke-dasharray="8 5"
 *   label="b"
 *   :label-dx="10"
 *   :label-dy="-8"
 * />
 * ```
 *
 * 约定：
 *
 * - `from` / `to` 是 **viewBox 用户单位**（不是屏幕 px）；目前只在终点画箭头，需要双头或曲线箭头时仍手写 SVG；
 * - 除 `from` / `to` / `label*` 外，其余属性**原样透传给内部 `<line>`**：`stroke`（默认 `currentColor`，line 与箭头同色）、
 *   `stroke-width`（默认 3）、`stroke-dasharray`（虚线辅助箭头）、`opacity`（半透明）、`stroke-linecap`、`class` 等；
 * - 箭头三角形长度按线宽自动取：`≤2 → 9`、`≤4 → 12`、更粗 → `3×线宽`（与 SVG 笔记里的规矩一致）。
 */
defineOptions({ inheritAttrs: false });

const {
  from,
  to,
  headSize = 0,
  label = "",
  labelDx = 8,
  labelDy = -10,
} = defineProps<{
  /** 起点（viewBox 用户单位） */
  from: Point;
  /** 终点：**箭头尖端就落在这个点上**（组件自动回退线段，别自己再算） */
  to: Point;
  /** 箭头三角形长度；`0`（默认）= 按线宽自动（≤2 → 9，≤4 → 12，更粗 → 3×线宽），只在需要对齐旧图时显式指定 */
  headSize?: number;
  /** 可选标签：画在两点中点附近，自带深色描边光晕（数学标记用斜体 KaTeX 字体） */
  label?: string;
  /** 标签相对中点的横向偏移 */
  labelDx?: number;
  /** 标签相对中点的纵向偏移 */
  labelDy?: number;
}>();

const attrs = useAttrs();

/** 箭头颜色：跟 `<line>` 的 stroke 一致；没写就用 currentColor（继承外层文字色） */
const arrowColor = computed<string>(() =>
  typeof attrs.stroke === "string" ? attrs.stroke : "currentColor",
);

/** 线宽：默认 3，用来推箭头长度 */
const lineWidth = computed<number>(() => {
  const raw = attrs["stroke-width"];
  const value = typeof raw === "number" ? raw : Number(raw ?? 3);

  return Number.isFinite(value) && value > 0 ? value : 3;
});

/** 三角形长度：显式指定优先；否则线宽 ≤2 → 9，≤4 → 12，更粗 → 3×线宽（保证三角形底边盖得住粗线头） */
const resolvedHead = computed<number>(() =>
  headSize > 0
    ? headSize
    : lineWidth.value <= 2
      ? 9
      : lineWidth.value <= 4
        ? 12
        : Math.ceil(lineWidth.value * 3),
);

/** 单位方向向量（两点重合时兜底成 1，避免除零） */
const direction = computed<Point>(() => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;

  return { x: dx / length, y: dy / length };
});

/** 半个箭头长：marker 的 refX 在三角形中心，线段回退这么多，尖端才正好落在 `to` 上 */
const back = computed<number>(() => resolvedHead.value / 2);

const shaftTo = computed<Point>(() => ({
  x: to.x - direction.value.x * back.value,
  y: to.y - direction.value.y * back.value,
}));

const labelAt = computed<Point>(() => ({
  x: (from.x + to.x) / 2 + labelDx,
  y: (from.y + to.y) / 2 + labelDy,
}));

/** 每条箭头一份 marker（同名 id 会串味，所以用实例隔离的 id） */
const markerId = `course-arrow-${useId()}`;
</script>

<template>
  <g class="course-arrow">
    <defs>
      <marker
        :id="markerId"
        :markerWidth="resolvedHead"
        :markerHeight="resolvedHead"
        :refX="resolvedHead / 2"
        :refY="resolvedHead / 2"
        orient="auto"
        markerUnits="userSpaceOnUse"
        :viewBox="`0 0 ${resolvedHead} ${resolvedHead}`"
      >
        <path
          :d="`M 0 0 L ${resolvedHead} ${resolvedHead / 2} L 0 ${resolvedHead} z`"
          :fill="arrowColor"
        />
      </marker>
    </defs>

    <line
      v-bind="attrs"
      :x1="from.x"
      :y1="from.y"
      :x2="shaftTo.x"
      :y2="shaftTo.y"
      :stroke="arrowColor"
      :marker-end="`url(#${markerId})`"
    />

    <text
      v-if="label !== ''"
      :x="labelAt.x"
      :y="labelAt.y"
      :fill="arrowColor"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="15"
      text-anchor="middle"
      stroke="#0f1425"
      stroke-width="3"
      paint-order="stroke"
    >
      {{ label }}
    </text>
  </g>
</template>
