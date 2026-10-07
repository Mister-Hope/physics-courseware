<script setup lang="ts">
import { computed } from "vue";

/**
 * 接触面（地面 / 桌面 / 墙面 / 斜面 / 天花板）：一条表面线 + 单侧的细斜线阴影。**只能在 `<svg>` 里用**（与 `CourseArrow` 同类）。
 *
 * **推荐用法：给起点和终点，再用 `side` 说清斜线阴影画在线的哪一侧**（屏幕方向，最简单）：
 *
 * ```html
 * <!-- 地面：阴影在线的下方 -->
 * <SurfaceHatch :from="{ x: 20, y: 180 }" :to="{ x: 320, y: 180 }" side="below" />
 * <!-- 天花板：阴影在线的上方 -->
 * <SurfaceHatch :from="{ x: 20, y: 40 }" :to="{ x: 320, y: 40 }" side="above" />
 * <!-- 左侧墙面：阴影在线的左边 -->
 * <SurfaceHatch :from="{ x: 24, y: 24 }" :to="{ x: 24, y: 200 }" side="left" />
 * <!-- 斜面：从 (250,170) 到 (410,106)，阴影在线的下方 -->
 * <SurfaceHatch :from="{ x: 250, y: 170 }" :to="{ x: 410, y: 106 }" side="below" />
 * ```
 *
 * 可调项（都有合理默认值，通常不用写）：
 *
 * - `side`：`below`（默认，地面）/ `above`（天花板）/ `left` / `right`，指**屏幕上**斜线阴影所在的一侧；
 * - `thickness`：阴影带深度（垂直表面方向），默认 16；`gap`：相邻斜线间距，默认 24（小 = 更密）；
 * - `color`、`lineWidth`（表面线线宽，默认 2.4）、`hatchWidth`（斜线线宽，默认 1.2）。
 *
 * 斜线统一朝表面方向的"反方向"倾斜（一眼就能认出的接触面阴影），所以没有额外旋钮要记。
 *
 * **兼容旧写法**：只给 `x` / `y` / `length` / `orientation` 时按老规则画（水平线阴影在下、竖直线阴影在左）， 已经在用旧写法的课件不用改。
 */
const {
  from = null,
  to = null,
  side = "below",
  thickness = 16,
  gap = 24,
  color = "var(--c-text-dim)",
  lineWidth = 2.4,
  hatchWidth = 1.2,
  x = 0,
  y = 0,
  length = 0,
  orientation = "horizontal",
} = defineProps<{
  /** 表面线起点（推荐与 `to` 一起用） */
  from?: { x: number; y: number } | null;
  /** 表面线终点（推荐与 `from` 一起用） */
  to?: { x: number; y: number } | null;
  /** 斜线阴影画在线条的哪一侧（屏幕方向） */
  side?: "below" | "above" | "left" | "right";
  /** 阴影带深度（垂直表面方向、向物体一侧延伸） */
  thickness?: number;
  /** 相邻斜线的间距（越小越密） */
  gap?: number;
  /** 表面线与斜线的颜色 */
  color?: string;
  /** 表面线线宽 */
  lineWidth?: number;
  /** 斜线线宽 */
  hatchWidth?: number;
  /** 兼容旧写法：表面线起点横坐标 */
  x?: number;
  /** 兼容旧写法：表面线起点纵坐标 */
  y?: number;
  /** 兼容旧写法：表面线长度 */
  length?: number;
  /** 兼容旧写法：`horizontal` = 地面（阴影在下）、`vertical` = 墙面（阴影在左） */
  orientation?: "horizontal" | "vertical";
}>();

/** 四个"屏幕方向"对应的单位向量，用来挑出正确的一侧 */
const SIDE_VECTORS = {
  below: { x: 0, y: 1 },
  above: { x: 0, y: -1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
} as const;

/** 表面线的两个端点：优先用 from / to，否则按旧写法（x、y、length、orientation）推出来 */
const endpoints = computed(() => {
  if (from && to) return { start: { x: from.x, y: from.y }, end: { x: to.x, y: to.y } };

  return orientation === "horizontal"
    ? { start: { x, y }, end: { x: x + length, y } }
    : { start: { x, y }, end: { x, y: y + length } };
});

/** 表面线方向（单位向量） */
const dir = computed(() => {
  const dx = endpoints.value.end.x - endpoints.value.start.x;
  const dy = endpoints.value.end.y - endpoints.value.start.y;
  const len = Math.hypot(dx, dy) || 1;

  return { x: dx / len, y: dy / len };
});

/** 斜线阴影延伸的法线方向：两个垂直方向里，与 `side` 更贴近的那个 */
const normal = computed(() => {
  const candidates = [
    { x: -dir.value.y, y: dir.value.x },
    { x: dir.value.y, y: -dir.value.x },
  ];
  const wanted = SIDE_VECTORS[side];

  return candidates.reduce((best, item) =>
    item.x * wanted.x + item.y * wanted.y > best.x * wanted.x + best.y * wanted.y ? item : best,
  );
});

/** 每条斜线的起点（沿表面线方向按 gap 排布） */
const positions = computed(() => {
  const total = Math.hypot(
    endpoints.value.end.x - endpoints.value.start.x,
    endpoints.value.end.y - endpoints.value.start.y,
  );
  const items: { x: number; y: number }[] = [];

  for (let step = gap; step <= total; step += gap) {
    items.push({
      x: endpoints.value.start.x + step * dir.value.x,
      y: endpoints.value.start.y + step * dir.value.y,
    });
  }

  return items;
});

/** 斜线：从表面线出发，沿法线走 thickness，再沿表面方向"反着"偏 thickness */
const hatches = computed<{ x1: number; y1: number; x2: number; y2: number }[]>(() =>
  positions.value.map((point) => ({
    x1: point.x,
    y1: point.y,
    x2: point.x + thickness * (normal.value.x - dir.value.x),
    y2: point.y + thickness * (normal.value.y - dir.value.y),
  })),
);
</script>

<template>
  <g class="surface-hatch">
    <line
      :x1="endpoints.start.x"
      :y1="endpoints.start.y"
      :x2="endpoints.end.x"
      :y2="endpoints.end.y"
      :stroke="color"
      :stroke-width="lineWidth"
    />
    <g :stroke="color" :stroke-width="hatchWidth" opacity="0.45">
      <line
        v-for="(hatch, index) in hatches"
        :key="index"
        :x1="hatch.x1"
        :y1="hatch.y1"
        :x2="hatch.x2"
        :y2="hatch.y2"
      />
    </g>
  </g>
</template>
