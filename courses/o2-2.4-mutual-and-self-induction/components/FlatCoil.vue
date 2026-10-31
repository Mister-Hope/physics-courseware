<!--
  本课内的扁平螺旋线圈（无线充电的充电板线圈 / 手机内线圈）——**只能在 `<svg>` 里用**（根节点是 `<g>`）。
  教师要求线圈必须是**一条连续螺旋线**，所以这里用极坐标参数方程直接画整条螺旋：
  屏幕 `X = x + r·cos φ`、`Y = y + squash·r·sin φ`，r 随 φ 从 innerRadius 线性长到 outerRadius。
  squash 是斜视时平面被压扁的比例（0.18 ≈ 俯视小角度）；方向只决定绕行方向（图上不标电流，两处取同一值）。
-->
<script setup lang="ts">
import { computed } from "vue";

const {
  x = 0,
  y = 0,
  innerRadius = 10,
  outerRadius = 30,
  turns = 3,
  direction = "cw",
  squash = 0.18,
  color = "var(--c-accent)",
  lineWidth = 2,
} = defineProps<{
  /** 螺旋中心（viewBox 用户单位） */
  x?: number;
  /** 螺旋中心（viewBox 用户单位） */
  y?: number;
  /** 内端半径（默认 10） */
  innerRadius?: number;
  /** 外端半径（默认 30） */
  outerRadius?: number;
  /** 匝数（默认 3） */
  turns?: number;
  /** 绕行方向（屏幕角度增大为 `cw`，默认 `cw`） */
  direction?: "cw" | "ccw";
  /** 斜视压扁比例：屏幕纵向半径 ÷ 横向半径（默认 0.18） */
  squash?: number;
  /** 导线颜色（默认暖金 `--c-accent`） */
  color?: string;
  /** 导线线宽（默认 2） */
  lineWidth?: number;
}>();

const DEG = Math.PI / 180;
/** 保留两位小数，路径字符串短一点 */
const fmt = (value: number): string => String(Math.round(value * 100) / 100);

const d = computed(() => {
  const spin = direction === "cw" ? 1 : -1;
  const total = turns * 360;
  const steps = Math.max(48, Math.round(turns * 48));
  const parts: string[] = [];

  for (let index = 0; index <= steps; index += 1) {
    const u = index / steps;
    const phi = spin * total * DEG * u;
    const radius = innerRadius + (outerRadius - innerRadius) * u;
    const px = x + radius * Math.cos(phi);
    const py = y + squash * radius * Math.sin(phi);

    parts.push(`${index === 0 ? "M" : "L"} ${fmt(px)} ${fmt(py)}`);
  }

  return parts.join(" ");
});
</script>

<template>
  <g class="flat-coil">
    <path :d="d" fill="none" :stroke="color" :stroke-width="lineWidth" stroke-linecap="round" />
  </g>
</template>
