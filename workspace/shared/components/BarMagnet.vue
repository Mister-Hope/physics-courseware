<script setup lang="ts">
import { computed } from "vue";

/**
 * 条形磁体（S 蓝 / N 红）——**只能在 `<svg>` 里用**（根节点是 `<g>`，写成 HTML 元素页面上什么都不显示， 也不能用 ` ```comp `
 * 代码块）。**不要再各图手画"S/N 两个矩形"**（教师点名统一，各课磁体要长一个样）。
 *
 * 画法：整块磁体只有**最外端两个角是圆角**、S/N 分界处是直角；两半各填 S 蓝 / N 红，字母正体 `KaTeX_Main` 居中。 传 `x` / `y`（磁体几何中心）与
 * `length`（沿磁轴）/ `width`（垂直磁轴），`nSide` 决定 N 极朝哪边（同时决定横放还是竖放）。
 *
 * ```html
 * <!-- 横放：S 在左、N 在右（封面、P3 对照图） -->
 * <BarMagnet :x="74" :y="250" :length="92" :width="28" n-side="right" />
 * <!-- 竖放：S 在上、N 在下 -->
 * <BarMagnet :x="120" :y="34" :length="52" :width="26" n-side="bottom" />
 * ```
 */
const {
  x = 0,
  y = 0,
  length = 96,
  width = 30,
  nSide = "right",
  nColor = "var(--c-danger)",
  sColor = "var(--c-velocity)",
  labelColor = "var(--c-bg-soft)",
  labelSize = 0,
  showLabels = true,
  corner = 3,
} = defineProps<{
  /** 磁体几何中心（viewBox 用户单位） */
  x?: number;
  /** 磁体几何中心（viewBox 用户单位） */
  y?: number;
  /** 沿磁轴的长度（N–S 方向） */
  length?: number;
  /** 垂直磁轴的宽度 */
  width?: number;
  /** N 极朝向：`right` / `left` 横放，`bottom` / `top` 竖放 */
  nSide?: "right" | "left" | "top" | "bottom";
  /** N 极颜色（默认正电红） */
  nColor?: string;
  /** S 极颜色（默认负电蓝） */
  sColor?: string;
  /** N / S 字母颜色（默认深底色，压在彩色磁体上） */
  labelColor?: string;
  /** 字母字号；`0` = 自动（`width × 0.62`，随磁体宽度缩放） */
  labelSize?: number;
  /** 是否画 N / S 字母（纯示意、太小看不清时可关掉） */
  showLabels?: boolean;
  /** 最外端圆角半径 */
  corner?: number;
}>();

/** N 极朝向 → 磁轴相对 +x 的旋转角（局部坐标：u 沿磁轴指向 N、v 垂直磁轴） */
const DEG = Math.PI / 180;
const rotateDeg = computed(() => ({ right: 0, bottom: 90, left: 180, top: 270 })[nSide] ?? 0);
const cos = computed(() => Math.cos(rotateDeg.value * DEG));
const sin = computed(() => Math.sin(rotateDeg.value * DEG));
// 局部坐标 (u, v) → SVG 坐标
const map = (u: number, v: number): { x: number; y: number } => ({
  x: x + u * cos.value - v * sin.value,
  y: y + u * sin.value + v * cos.value,
});

const halfLength = computed(() => length / 2);
const halfWidth = computed(() => width / 2);
/** 圆角不能超过半宽 / 半长，否则路径自交 */
const radius = computed(() => Math.max(0, Math.min(corner, halfWidth.value, halfLength.value)));

const S_PATH = computed(() => {
  const h = halfLength.value;
  const w = halfWidth.value;
  const r = radius.value;
  return `M 0 ${-w} H ${-h + r} A ${r} ${r} 0 0 0 ${-h} ${-w + r} V ${w - r} A ${r} ${r} 0 0 0 ${-h + r} ${w} H 0 Z`;
});
const N_PATH = computed(() => {
  const h = halfLength.value;
  const w = halfWidth.value;
  const r = radius.value;
  return `M 0 ${-w} H ${h - r} A ${r} ${r} 0 0 1 ${h} ${-w + r} V ${w - r} A ${r} ${r} 0 0 1 ${h - r} ${w} H 0 Z`;
});

/** 字母字号：默认随磁体宽度缩放 */
const fontSize = computed(() => labelSize || Math.max(9, Math.round(width * 0.62)));
/** 字母位置：各自半边的中心（不随磁体旋转，字母保持正立） */
const sLabel = computed(() => map(-length / 4, 0));
const nLabel = computed(() => map(length / 4, 0));
const labelBaselineDy = computed(() => fontSize.value * 0.36);
</script>

<template>
  <g class="bar-magnet">
    <g :transform="`translate(${x} ${y}) rotate(${rotateDeg})`">
      <path :d="S_PATH" :fill="sColor" />
      <path :d="N_PATH" :fill="nColor" />
    </g>
    <template v-if="showLabels">
      <text
        :x="sLabel.x"
        :y="sLabel.y + labelBaselineDy"
        text-anchor="middle"
        font-family="KaTeX_Main"
        :font-size="fontSize"
        :fill="labelColor"
      >
        S
      </text>
      <text
        :x="nLabel.x"
        :y="nLabel.y + labelBaselineDy"
        text-anchor="middle"
        font-family="KaTeX_Main"
        :font-size="fontSize"
        :fill="labelColor"
      >
        N
      </text>
    </template>
  </g>
</template>
