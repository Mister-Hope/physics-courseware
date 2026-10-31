<!--
  课内组件（只服务本课，不进共享层、也不跨课 import）：**平放的连续螺旋盘**线圈。
  电磁炉面板下的盘形线圈既不能画成"一叠同心椭圆"（教师要求：线圈一律画成一条连续螺旋线），
  也不能用共享 `Solenoid`（竖直放置时包围盒高 = length + 0.68·radius，塞不进面板下方约 40px 的扁平空间），
  所以本课自己画：阿基米德螺旋（极半径随转角线性增大）+ 斜投影（纵向压 squash 倍），
  屏幕上就是一条从里到外连续盘出的螺旋线。**只能在 `<svg>` 里用**（根节点是 `<g>`）。
-->
<script setup lang="ts">
import { computed } from "vue";

const {
  x = 0,
  y = 0,
  radius = 100,
  innerRatio = 0.2,
  turns = 4.5,
  squash = 0.16,
  color = "var(--c-accent)",
  lineWidth = 3,
} = defineProps<{
  /** 线圈中心（viewBox 用户单位） */
  x?: number;
  /** 线圈中心（viewBox 用户单位） */
  y?: number;
  /** 最外圈半径（水平方向，斜投影不压缩横轴） */
  radius?: number;
  /** 最内圈半径 ÷ 最外圈半径（0~1，默认 0.2） */
  innerRatio?: number;
  /** 匝数（可带小数，默认 4.5） */
  turns?: number;
  /** 斜投影的纵向压缩比（= 纵向半轴 ÷ radius，默认 0.16；越小越"平躺"） */
  squash?: number;
  /** 导线颜色（默认暖金 `--c-accent`） */
  color?: string;
  /** 导线线宽（默认 3） */
  lineWidth?: number;
}>();

const fmt = (value: number): string => String(Math.round(value * 100) / 100);

/** 连续螺旋线的折线：u ∈ [0,1] 沿导线从内圈盘到外圈，转 turns 圈 */
const path = computed(() => {
  const steps = Math.max(96, Math.round(turns * 56));
  const parts: string[] = [];

  for (let index = 0; index <= steps; index += 1) {
    const u = index / steps;
    const r = radius * (innerRatio + (1 - innerRatio) * u);
    const theta = u * turns * 2 * Math.PI;
    const px = x + r * Math.cos(theta);
    const py = y + r * Math.sin(theta) * squash;

    parts.push(`${index === 0 ? "M" : "L"} ${fmt(px)} ${fmt(py)}`);
  }

  return parts.join(" ");
});
</script>

<template>
  <g class="flat-spiral-coil">
    <path
      :d="path"
      fill="none"
      :stroke="color"
      :stroke-width="lineWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </g>
</template>
