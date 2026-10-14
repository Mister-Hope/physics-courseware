<script setup lang="ts">
import { computed } from "vue";

/**
 * 开关符号（两个触点圆点 + 一把刀闸：`open` 断开时刀闸抬起 **30°**，闭合时与导线重合）——**只能在 `<svg>` 里用** （与 `CourseArrow` 同类：写成
 * HTML 元素什么都不显示，也不能用 ` ```comp ` 代码块）。
 *
 * 给电路图页统一画开关：串并联电路、测电源电动势与内阻（断开开关改接线）等——**不要再各课手画刀闸**。 组件只画符号本身，**不画任何背景/底板**；导线由页面手画、**止于两个触点**。
 *
 * ```html
 * <!-- 断开的开关（默认），标 S -->
 * <CircuitSwitch :x="140" :y="70" label="S" />
 * <!-- 闭合的开关（交互页把 open 绑到状态上） -->
 * <CircuitSwitch :x="140" :y="70" :open="closed" label="S" />
 * ```
 *
 * 本地坐标约定（所有电路共享组件都一样）：`u` 沿导线、`v` 垂直导线（`v > 0` 指向屏幕**上方**（水平导线）/ **右方**（竖直导线））。刀闸向 `v > 0`
 * 一侧抬起，标签默认也画在那一侧。
 */
const {
  x = 0,
  y = 0,
  orientation = "horizontal",
  open = true,
  span = 40,
  angle = 30,
  label = "",
  labelDx = 0,
  labelDy = 0,
  lineWidth = 1.6,
  color = "var(--c-text)",
  labelColor = "",
} = defineProps<{
  /** 符号中心（两个触点的中点，viewBox 用户单位） */
  x?: number;
  /** 符号中心（两个触点的中点，viewBox 用户单位） */
  y?: number;
  /** 导线方向：`horizontal` = 导线左右走，`vertical` = 导线上下走 */
  orientation?: "horizontal" | "vertical";
  /** `true`（默认）＝断开（刀闸抬起）；`false` ＝闭合（刀闸与导线重合） */
  open?: boolean;
  /** 两个触点的间距（沿导线方向，同时是刀闸长度） */
  span?: number;
  /** 断开时刀闸与导线的夹角（度，规范值 30） */
  angle?: number;
  /** 标签：开关代号（如 `"S"`、`"S₁"`），正体 `KaTeX_Main`；不传不画 */
  label?: string;
  /** 标签相对默认位置的横向偏移（屏幕坐标） */
  labelDx?: number;
  /** 标签相对默认位置的纵向偏移（屏幕坐标） */
  labelDy?: number;
  /** 导线 / 刀闸线宽（触点圆点半径固定 3） */
  lineWidth?: number;
  /** 触点、刀闸与标签的颜色 */
  color?: string;
  /** 标签颜色；不传跟随 `color` */
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

/** 刀闸支点＝左触点；刀尖：闭合时落在右触点上，断开时沿导线走 span 再抬 angle 度 */
const blade = computed(() => {
  const pivot = at(-span / 2, 0);
  const tipU = open ? -span / 2 + span * Math.cos((angle * Math.PI) / 180) : span / 2;
  const tipV = open ? span * Math.sin((angle * Math.PI) / 180) : 0;
  const tip = at(tipU, tipV);
  return { x1: pivot.x, y1: pivot.y, x2: tip.x, y2: tip.y };
});

const contacts = computed(() => [at(-span / 2, 0), at(span / 2, 0)]);

/** 标签默认在触点中点的 v > 0 一侧，离导线 span/2 + 12（不压刀尖） */
const labelAt = computed(() => {
  const point = at(0, span / 2 + 12);
  return horizontal.value
    ? { x: point.x + labelDx, y: point.y + 5 + labelDy, anchor: "middle" }
    : { x: point.x + labelDx, y: point.y + 5 + labelDy, anchor: "start" };
});

const labelFill = computed(() => labelColor || color);
</script>

<template>
  <g class="circuit-switch">
    <line
      :x1="blade.x1"
      :y1="blade.y1"
      :x2="blade.x2"
      :y2="blade.y2"
      :stroke="color"
      :stroke-width="lineWidth"
      stroke-linecap="round"
    />
    <circle
      v-for="(contact, index) in contacts"
      :key="index"
      :cx="contact.x"
      :cy="contact.y"
      r="3"
      :fill="color"
    />
    <text
      v-if="label !== ''"
      :x="labelAt.x"
      :y="labelAt.y"
      :text-anchor="labelAt.anchor"
      font-family="KaTeX_Main"
      font-size="16"
      :fill="labelFill"
    >
      {{ label }}
    </text>
  </g>
</template>
