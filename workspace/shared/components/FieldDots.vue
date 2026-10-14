<script setup lang="ts">
import { computed } from "vue";

/**
 * 磁场区域**平铺阵列**（裸 `×` ＝ 垂直纸面向里，裸 `·` ＝ 垂直纸面向外）——**只能在 `<svg>` 里用**（与 `CourseArrow` 同类：写成 HTML
 * 元素什么都不显示，也不能用 ` ```comp ` 代码块）。
 *
 * 给磁场 / 带电粒子运动页铺满一片匀强磁场区域：洛伦兹力、带电粒子的圆周运动、质谱仪等。
 *
 * **铁律（教师明确要求）：平铺遍布空间的叉/点一律不加外圈**，直接裸 `×` / 裸 `·`；带圈的 ⊙/⊗ 只用于**单个** 图例 / 方向标注记号，那是 `<FieldMark>`
 * 的活。
 *
 * ```html
 * <!-- 10 列 × 7 行、间距 18 的向里磁场，铺在 (40, 40) 起的区域里 -->
 * <FieldDots :x="40" :y="40" :cols="10" :rows="7" dir="in" />
 * ```
 *
 * `(x, y)` ＝ **第一个（左上角）记号的中心**；阵列向右、向下展开，占位 ＝ `(cols − 1) × spacing` × `(rows − 1) × spacing`。
 * 想让阵列在某个区域里居中：`x = 区域左 + (区域宽 − (cols − 1) × spacing) / 2`。
 */
const {
  x = 0,
  y = 0,
  dir = "in",
  cols = 8,
  rows = 5,
  spacing = 18,
  size = 4,
  lineWidth = 1.4,
  color = "var(--c-accent)",
  opacity = 1,
} = defineProps<{
  /** 第一个（左上角）记号的中心（viewBox 用户单位） */
  x?: number;
  /** 第一个（左上角）记号的中心（viewBox 用户单位） */
  y?: number;
  /** 方向：`"in"` ＝ 垂直纸面向里（裸 `×`），`"out"` ＝ 垂直纸面向外（裸 `·`） */
  dir?: "in" | "out";
  /** 列数（沿 x 方向） */
  cols?: number;
  /** 行数（沿 y 方向） */
  rows?: number;
  /** 相邻记号的间距（规范值 18；16～24 之间按区域大小调） */
  spacing?: number;
  /** `×` 的半跨距（笔画端点到中心的距离，规范值 4）；`·` 的半径自动取它的一半 */
  size?: number;
  /** `×` 的线宽（规范值 1.4） */
  lineWidth?: number;
  /** 记号颜色（磁场默认暖金） */
  color?: string;
  /** 整体透明度（要压淡背景层时用） */
  opacity?: number;
}>();

/** 阵列格点：`(x, y)` 是第一个记号中心，向右 cols 列、向下 rows 行，间距 spacing */
const cells = computed(() => {
  const points: { key: string; x: number; y: number }[] = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      points.push({
        key: `${row}-${col}`,
        x: x + col * spacing,
        y: y + row * spacing,
      });
    }
  }
  return points;
});
</script>

<template>
  <g
    class="field-dots"
    :stroke="color"
    :stroke-width="lineWidth"
    stroke-linecap="round"
    :opacity="opacity"
  >
    <template v-for="cell in cells" :key="cell.key">
      <template v-if="dir === 'in'">
        <line :x1="cell.x - size" :y1="cell.y - size" :x2="cell.x + size" :y2="cell.y + size" />
        <line :x1="cell.x - size" :y1="cell.y + size" :x2="cell.x + size" :y2="cell.y - size" />
      </template>
      <circle v-else :cx="cell.x" :cy="cell.y" :r="size / 2" :fill="color" stroke="none" />
    </template>
  </g>
</template>
