<script setup lang="ts">
import { computed } from "vue";

/**
 * **单个** ⊙ / ⊗ 记号（带圈：`dir="in"` ⊗ 垂直纸面向里，`dir="out"` ⊙ 垂直纸面向外）——**只能在 `<svg>` 里用** （与 `CourseArrow`
 * 同类：写成 HTML 元素什么都不显示，也不能用 ` ```comp ` 代码块）。
 *
 * 只给**图例**和**方向标注**用：图上标"磁场 B 向里/向外"这一个记号、题干图角落的 B 方向说明。 样式对齐既有画法（`o2-1.3` 带电粒子运动页）：带圈 r = 12、圈线宽
 * 2.2、⊗ 的 × 半跨距 = r × 0.67、⊙ 的圆点半径 = r × 0.25。
 *
 * **铁律（教师明确要求）：平铺遍布整个磁场区域的叉/点阵列不许用带圈记号**——那是 `<FieldDots>` 的活（裸 `×` / 裸 `·`）。 带圈 ⊙/⊗
 * 只用于"一个记号说清方向"的场合。
 *
 * ```html
 * <!-- 图例：B 垂直纸面向里 -->
 * <FieldMark :x="280" :y="40" dir="in" label="B" />
 * <!-- 只画记号不带字母 -->
 * <FieldMark :x="40" :y="40" dir="out" />
 * ```
 *
 * `(x, y)` ＝ 记号圆心；`label` 画在记号**正下方**（不与记号重叠），斜体 `KaTeX_Math`。
 */
const {
  x = 0,
  y = 0,
  dir = "in",
  r = 12,
  lineWidth = 2.2,
  color = "var(--c-accent)",
  label = "",
  labelDy = 0,
  labelSize = 16,
} = defineProps<{
  /** 记号圆心（viewBox 用户单位） */
  x?: number;
  /** 记号圆心（viewBox 用户单位） */
  y?: number;
  /** 方向：`"in"` ＝ ⊗ 向里（圆内画 ×），`"out"` ＝ ⊙ 向外（圆心一个实心点） */
  dir?: "in" | "out";
  /** 外圈半径（规范值 12） */
  r?: number;
  /** 外圈与 × 的线宽（规范值 2.2，比普通导线粗一号——单个记号要远看也清楚） */
  lineWidth?: number;
  /** 记号颜色（磁场默认暖金） */
  color?: string;
  /** 记号下方的字母（如 `"B"`），斜体 `KaTeX_Math`；不传不画 */
  label?: string;
  /** 字母相对默认位置的纵向偏移（屏幕坐标） */
  labelDy?: number;
  /** 字号（规范值 16） */
  labelSize?: number;
}>();

/** × 的半跨距 = r × 0.67、⊙ 的圆点半径 = r × 0.25（对齐既有画法） */
const half = computed(() => r * 0.67);
</script>

<template>
  <g class="field-mark">
    <circle :cx="x" :cy="y" :r="r" fill="none" :stroke="color" :stroke-width="lineWidth" />
    <template v-if="dir === 'in'">
      <line
        :x1="x - half"
        :y1="y - half"
        :x2="x + half"
        :y2="y + half"
        :stroke="color"
        :stroke-width="lineWidth"
      />
      <line
        :x1="x - half"
        :y1="y + half"
        :x2="x + half"
        :y2="y - half"
        :stroke="color"
        :stroke-width="lineWidth"
      />
    </template>
    <circle v-else :cx="x" :cy="y" :r="r * 0.25" :fill="color" stroke="none" />
    <text
      v-if="label !== ''"
      :x="x"
      :y="y + r + 16 + labelDy"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      :font-size="labelSize"
      :fill="color"
    >
      {{ label }}
    </text>
  </g>
</template>
