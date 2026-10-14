<script setup lang="ts">
import { computed } from "vue";

/**
 * 电源符号（两根平行线：**一长细＝正极、一短粗＝负极**）——**只能在 `<svg>` 里用**（与 `CourseArrow` / `SpringScale` 同类：写成 HTML
 * 元素什么都不显示，也不能用 ` ```comp ` 代码块）。
 *
 * 给电路图页统一画电源：串并联电路、闭合电路欧姆定律、测电源电动势与内阻（安阻法 / 伏阻法）等——**不要再各课手画两根线**。
 * 组件只画符号本身，**不画任何背景/底板**；导线由页面手画、**止于两根极板**。
 *
 * ```html
 * <!-- 水平导线上的电源：默认长板（正极）在左；加极性标注 + 电动势标签 -->
 * <CircuitBattery :x="120" :y="70" polarity emf="E" />
 * <!-- 竖直导线上的电源：长板（正极）在上；flip 让长板换到下端 -->
 * <CircuitBattery :x="80" :y="130" orientation="vertical" polarity emf="ℰ" />
 * ```
 *
 * 本地坐标约定（所有电路共享组件都一样）：`u` 沿导线、`v` 垂直导线（`v > 0` 指向屏幕**上方**（水平导线）/ **右方**（竖直导线））。极性 `+` / `−` 画在 `v >
 * 0` 一侧、电动势标签画在 `v < 0` 一侧，互不打架。
 */
const {
  x = 0,
  y = 0,
  orientation = "horizontal",
  flip = false,
  lineWidth = 1.6,
  color = "var(--c-text)",
  plateGap = 16,
  longPlate = 30,
  shortPlate = 15,
  polarity = false,
  emf = "",
  labelColor = "",
} = defineProps<{
  /** 符号中心（导线轴线的中点，viewBox 用户单位） */
  x?: number;
  /** 符号中心（导线轴线的中点，viewBox 用户单位） */
  y?: number;
  /** 导线方向：`horizontal` = 导线左右走（极板竖直），`vertical` = 导线上下走（极板水平） */
  orientation?: "horizontal" | "vertical";
  /** 沿导线方向镜像：长板（正极）换到另一端（电路里正极朝右时用） */
  flip?: boolean;
  /** 细板（正极）线宽；粗板（负极）自动 = `2 × lineWidth` */
  lineWidth?: number;
  /** 极板与极性标注的颜色 */
  color?: string;
  /** 两根极板的中心距（沿导线方向） */
  plateGap?: number;
  /** 长板（正极、细）的长度（垂直导线方向） */
  longPlate?: number;
  /** 短板（负极、粗）的长度（垂直导线方向） */
  shortPlate?: number;
  /** 是否标 `+` / `−` 极性（画在长板 / 短板一侧，同一行） */
  polarity?: boolean;
  /** 电动势标签：传 `"E"` 或 `"ℰ"`，不传不画；斜体 `KaTeX_Math`（量的写法） */
  emf?: string;
  /** 电动势标签颜色；不传跟随 `color` */
  labelColor?: string;
}>();

const horizontal = computed(() => orientation === "horizontal");

/**
 * 本地坐标 → 屏幕坐标：`u` 沿导线、`v` 垂直导线（`v > 0` = 屏幕上方（水平导线）/ 右方（竖直导线））
 *
 * @param u 沿导线方向的位移
 * @param v 垂直导线方向的位移
 * @returns 屏幕坐标
 */
const at = (u: number, v: number): { x: number; y: number } =>
  horizontal.value ? { x: x + u, y: y - v } : { x: x + v, y: y + u };

/**
 * 文字锚点：基线比视觉中心下移 5（字号 15~16 的竖直居中经验值）
 *
 * @param u 沿导线方向的位移
 * @param v 垂直导线方向的位移
 * @returns 文字基线的屏幕坐标
 */
const textAt = (u: number, v: number): { x: number; y: number } => {
  const point = at(u, v);
  return { x: point.x, y: point.y + 5 };
};

/** 长板（正极、细）与短板（负极、粗）的中心（沿导线的本地坐标） */
const longU = computed(() => (flip ? plateGap / 2 : -plateGap / 2));
const shortU = computed(() => (flip ? -plateGap / 2 : plateGap / 2));

const longLine = computed(() => {
  const a = at(longU.value, -longPlate / 2);
  const b = at(longU.value, longPlate / 2);
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
});

const shortLine = computed(() => {
  const a = at(shortU.value, -shortPlate / 2);
  const b = at(shortU.value, shortPlate / 2);
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
});

/** 极性标注那一行（贴着长板外侧再让 6）与电动势标签（画在另一侧） */
const signV = computed(() => longPlate / 2 + 6);
const plusAt = computed(() => textAt(longU.value, signV.value));
const minusAt = computed(() => textAt(shortU.value, signV.value));
const emfAt = computed(() => textAt(0, -signV.value));

const signAnchor = computed(() => (horizontal.value ? "middle" : "start"));
const emfAnchor = computed(() => (horizontal.value ? "middle" : "end"));
const labelFill = computed(() => labelColor || color);
</script>

<template>
  <g class="circuit-battery">
    <line
      :x1="longLine.x1"
      :y1="longLine.y1"
      :x2="longLine.x2"
      :y2="longLine.y2"
      :stroke="color"
      :stroke-width="lineWidth"
      stroke-linecap="round"
    />
    <line
      :x1="shortLine.x1"
      :y1="shortLine.y1"
      :x2="shortLine.x2"
      :y2="shortLine.y2"
      :stroke="color"
      :stroke-width="lineWidth * 2"
      stroke-linecap="round"
    />
    <text
      v-if="polarity"
      :x="plusAt.x"
      :y="plusAt.y"
      :text-anchor="signAnchor"
      font-family="KaTeX_Main"
      font-size="15"
      :fill="color"
    >
      +
    </text>
    <text
      v-if="polarity"
      :x="minusAt.x"
      :y="minusAt.y"
      :text-anchor="signAnchor"
      font-family="KaTeX_Main"
      font-size="15"
      :fill="color"
    >
      −
    </text>
    <text
      v-if="emf !== ''"
      :x="emfAt.x"
      :y="emfAt.y"
      :text-anchor="emfAnchor"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="16"
      :fill="labelFill"
    >
      {{ emf }}
    </text>
  </g>
</template>
