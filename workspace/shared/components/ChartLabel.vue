<script setup lang="ts">
import { computed } from "vue";

import type { ChartLabelAnchor, ChartLabelPart } from "./label-text";
import Latex from "./Latex.vue";

/**
 * 图内标注（HTML 覆盖层版）——**SVG 里写不了 LaTeX，标注就交给它**。
 *
 * 为什么不用 SVG `<text>`：SVG 里嵌不了 `<Latex>`，`½`、`v₀` 这类只能靠 `KaTeX_Math` 字体硬凑，
 * 分式（`\frac{1}{2}`）根本画不出来（会退化成 Unicode `½` 那个怪字形）。
 *
 * 用法：父组件把标注点的位置按**容器百分比**给它（`xPercent = screenX / viewBox 宽 × 100`）， 放在一个 `position: relative`
 * 的容器里、盖在 SVG 上层即可（`CoordAxes` 就是这么做的）。 因为 SVG 是 `width: 100%; height: auto`，百分比正好等于 viewBox 坐标。
 *
 * 字号 / 偏移都是**屏幕 px 口径**（不受 viewBox 缩放影响），跟三个坐标组件的约定一致。
 */

const {
  xPercent,
  yPercent,
  parts,
  anchor = "center",
  dx = 0,
  dy = 0,
  size = 17,
  color = "var(--c-text)",
  halo = false,
  visible = true,
} = defineProps<{
  /** 标注点横向位置（相对容器的百分比，0–100） */
  xPercent: number;
  /** 标注点纵向位置（相对容器的百分比，0–100） */
  yPercent: number;
  /** 标注内容：`{ tex }` 与 `{ text }` 可任意顺序混排，如 `[{ tex: "v_0" }, { text: "t" }]` */
  parts: ChartLabelPart[];
  /**
   * 文字画在点的哪个方位，默认 `"center"`（压在点上）
   *
   * `left` / `right` 是"正左 / 正右、纵向对齐"——标一条竖直的测量线（如 Δv）时用它。
   */
  anchor?: ChartLabelAnchor;
  /** 方位之外再偏移（屏幕 px 口径） */
  dx?: number;
  /** 方位之外再偏移（屏幕 px 口径） */
  dy?: number;
  /** 字号（屏幕 px 口径），默认 17 */
  size?: number;
  /** 文字色，默认 `var(--c-text)` */
  color?: string;
  /** 加深色描边光晕（压在曲线上也读得清），默认关 */
  halo?: boolean;
  /** 是否可见（分步用：`false` 只隐藏、不删不插，跟组件其它元素一致） */
  visible?: boolean;
}>();

/**
 * 方位 → [方向 x, 方向 y, 横向平移, 纵向平移]
 *
 * 横向平移用百分比（`-100%` = 右边缘贴点），与内容宽度无关；纵向平移用 em（`-0.8em` ≈ 一行文字
 * 基线到行顶的距离），这样**带分式的标注也不会跑到天上**——分式会把行框撑高，百分比平移会跟着放大。
 */
const ANCHOR_STYLE: Record<ChartLabelAnchor, [number, number, string, string]> = {
  center: [0, 0, "-50%", "-50%"],
  left: [-1, 0, "-100%", "-50%"],
  right: [1, 0, "0", "-50%"],
  "top-left": [-1, -1, "-100%", "-0.8em"],
  "top-right": [1, -1, "0", "-0.8em"],
  "bottom-left": [-1, 1, "-100%", "0"],
  "bottom-right": [1, 1, "0", "0"],
};

const round2 = (value: number): number => Math.round(value * 100) / 100;

const style = computed(() => {
  const [dirX, dirY, shiftX, shiftY] = ANCHOR_STYLE[anchor];
  // 角标注离点半个字，别贴着圆点
  const inset = dirX === 0 && dirY === 0 ? 0 : size * 0.5;

  return {
    left: `calc(${xPercent}% + ${round2(dirX * inset + dx)}px)`,
    top: `calc(${yPercent}% + ${round2(dirY * inset + dy)}px)`,
    transform: `translate(${shiftX}, ${shiftY})`,
    fontSize: `${size}px`,
    color,
    visibility: visible ? "visible" : "hidden",
  } as Record<string, string>;
});
</script>

<template>
  <div class="chart-label" :class="{ 'chart-label-halo': halo }" :style="style">
    <template v-for="(part, index) in parts" :key="index">
      <Latex v-if="'tex' in part" :tex="part.tex" />
      <span v-else>{{ part.text }}</span>
    </template>
  </div>
</template>

<style scoped>
.chart-label {
  position: absolute;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
}

/* 相邻片段之间留一点缝：`{ text: '剪掉' }` + `{ tex: '32\\text{ m}' }` 不该挤成"剪掉32 m" */
.chart-label > * + * {
  margin-left: 0.25em;
}

/* common.css 给 .katex 上了 `font-size: 1.15rem !important`，这里必须按标注字号走 */
.chart-label :deep(.katex) {
  font-size: 1em !important;
}

/* 光晕：SVG 版是 paint-order: stroke，这里用四向描边 + 一点模糊，压线也读得清 */
.chart-label-halo {
  text-shadow:
    0 0 3px var(--c-bg-soft),
    0 0 2px var(--c-bg-soft),
    1px 0 0 var(--c-bg-soft),
    -1px 0 0 var(--c-bg-soft),
    0 1px 0 var(--c-bg-soft),
    0 -1px 0 var(--c-bg-soft);
}
</style>
