<script setup lang="ts">
import { computed } from "vue";

/**
 * 环形线圈（绕组**连续**绕在铁环上，不是若干条径向短线）——**只能在 `<svg>` 里用**（根节点是 `<g>`）。
 *
 * P4 法拉第铁环实验的两侧绕组用它：导线沿环中心圆前进的同时绕管截面转圈，于是屏幕上呈现 "从带外缘爬到带内缘、再从内缘爬回外缘"的连续折返（每匝一次）。
 * 环面朝向观察者（铁环画在屏幕平面里）时分两层：
 *
 * - **正面**（`sin φ > 0`，绕在靠近观察者的半边管壁上）实线；
 * - **背面**（`sin φ < 0`，绕到铁环后面去）`backOpacity` 虚淡，看着才知道导线是连续绕过去的。
 *
 * **本组件只画绕组、不画铁环本体**：铁环（环带 + 颜色 + 线宽）由页面自己画，绕组叠在环带上面；
 * 需要"背面绕组藏到环体后面"时，把页面画环带的元素放在本组件之后即可（环带不透明就盖住了）。
 *
 * **方向与接线端**：`wrapCenter` / `wrapSpan` 说绕组绕在环中心圆的哪一段； `direction="cw"` 表示**从环的正面向里看（屏幕坐标，角度增大 =
 * 顺时针）**沿环前进， 起端在 `wrapCenter − wrapSpan/2`、末端在 `wrapCenter + wrapSpan/2`；`ccw` 则反过来。 两端都落在管截面角为
 * `phase`（默认 0 = **带外缘**）的位置，`turns` 取整数时两端都在带外缘 —— 引线就接在这两个点上：起端 `(x + (ringRadius +
 * tubeRadius·cos φ0)·cos α0, y + (…)·sin α0)`。
 *
 * ```html
 * <!-- 铁环中心 (290,150)、环中心圆半径 63、带宽 ±13；左侧 4 匝绕组（150°…210°） -->
 * <RingCoil
 *   :x="290"
 *   :y="150"
 *   :ring-radius="63"
 *   :tube-radius="13"
 *   :wrap-center="180"
 *   :wrap-span="60"
 *   :turns="4"
 * />
 * <!-- 右侧 4 匝绕组（−30°…30°） -->
 * <RingCoil
 *   :x="290"
 *   :y="150"
 *   :ring-radius="63"
 *   :tube-radius="13"
 *   :wrap-center="0"
 *   :wrap-span="60"
 *   :turns="4"
 * />
 * ```
 */
const {
  x = 0,
  y = 0,
  ringRadius = 63,
  tubeRadius = 13,
  wrapCenter = 180,
  wrapSpan = 60,
  turns = 4,
  direction = "cw",
  phase = 0,
  color = "var(--c-accent)",
  lineWidth = 3.4,
  backOpacity = 0.22,
} = defineProps<{
  /** 铁环圆心（viewBox 用户单位） */
  x?: number;
  /** 铁环圆心（viewBox 用户单位） */
  y?: number;
  /** 环中心圆的半径（默认 63） */
  ringRadius?: number;
  /** 环带宽的一半 = 管截面半径（默认 13，即环带宽 26） */
  tubeRadius?: number;
  /** 绕组中心角（度；屏幕坐标 0° = +x，角度增大 = 顺时针；默认 180 = 环的左侧） */
  wrapCenter?: number;
  /** 绕组的角跨度（度，默认 60） */
  wrapSpan?: number;
  /** 匝数（默认 4；整数匝时两端都落在带外缘） */
  turns?: number;
  /** 绕组沿环推进的方向：`cw` = 屏幕角度增大（顺时针，默认）/ `ccw` = 反向 */
  direction?: "cw" | "ccw";
  /** 导线在管截面上的起始角（度，默认 0 = 带外缘；180 = 带内缘） */
  phase?: number;
  /** 导线颜色（默认暖金 `--c-accent`） */
  color?: string;
  /** 导线线宽（默认 3.4） */
  lineWidth?: number;
  /** 背面（绕到铁环后面）绕组的不透明度（默认 0.22） */
  backOpacity?: number;
}>();

const DEG = Math.PI / 180;

// 起端 / 末端的环中心角（弧度）；cw = 屏幕角度增大
const startAngle = computed(
  () => (wrapCenter + (direction === "cw" ? -wrapSpan / 2 : wrapSpan / 2)) * DEG,
);
const endAngle = computed(
  () => (wrapCenter + (direction === "cw" ? wrapSpan / 2 : -wrapSpan / 2)) * DEG,
);

// 管截面角：每前进一整圈环，绕管 `turns` 圈
const tubeAngleAt = (u: number): number => phase * DEG + turns * 2 * Math.PI * u;

// 参数 u 处的导线点：ρ = 环中心圆半径 + 管截面偏移；α = 环中心角
const pointAt = (u: number): { x: number; y: number } => {
  const alpha = startAngle.value + (endAngle.value - startAngle.value) * u;
  const radius = ringRadius + tubeRadius * Math.cos(tubeAngleAt(u));

  return { x: x + radius * Math.cos(alpha), y: y + radius * Math.sin(alpha) };
};

// 两位小数，路径字符串短一点
const fmt = (value: number): string => String(Math.round(value * 100) / 100);

interface WindingSegment {
  d: string;
  front: boolean;
}

const segments = computed<WindingSegment[]>(() => {
  const turnAngle = turns * 2 * Math.PI;

  if (Math.abs(turnAngle) < 1e-6) return [];

  // 在 sin φ = 0（φ = mπ，即导线绕到管壁的里 / 外轮廓处）切开：
  // 正面段 sin φ > 0（朝向观察者），背面段 sin φ < 0（绕到铁环后面）
  const phi0 = phase * DEG;
  const low = Math.min(phi0, phi0 + turnAngle);
  const high = Math.max(phi0, phi0 + turnAngle);
  const cuts: number[] = [0, 1];

  for (let m = Math.ceil(low / Math.PI); m <= Math.floor(high / Math.PI); m += 1) {
    const u = (m * Math.PI - phi0) / turnAngle;

    if (u > 1e-4 && u < 1 - 1e-4) cuts.push(u);
  }

  cuts.sort((a, b) => a - b);

  const result: WindingSegment[] = [];
  const steps = 12;

  for (let index = 0; index < cuts.length - 1; index += 1) {
    const from = cuts[index] ?? 0;
    const to = cuts[index + 1] ?? 1;
    const phiMid = phi0 + turnAngle * ((from + to) / 2);
    const parts: string[] = [];

    for (let step = 0; step <= steps; step += 1) {
      const point = pointAt(from + ((to - from) * step) / steps);

      parts.push(`${step === 0 ? "M" : "L"} ${fmt(point.x)} ${fmt(point.y)}`);
    }

    result.push({ d: parts.join(" "), front: Math.sin(phiMid) > 0 });
  }

  return result;
});

const backSegments = computed(() => segments.value.filter((segment) => !segment.front));
const frontSegments = computed(() => segments.value.filter((segment) => segment.front));
</script>

<template>
  <g class="ring-coil">
    <!-- 绕到铁环后面的部分：虚淡（页面把铁环环带画在本组件之前 / 之后都能看） -->
    <g
      fill="none"
      :stroke="color"
      :stroke-width="lineWidth"
      stroke-linecap="round"
      :opacity="backOpacity"
    >
      <path v-for="(segment, index) in backSegments" :key="`back-${index}`" :d="segment.d" />
    </g>
    <!-- 绕在铁环正面（朝向观察者的半边管壁）的部分：实线 -->
    <g fill="none" :stroke="color" :stroke-width="lineWidth" stroke-linecap="round">
      <path v-for="(segment, index) in frontSegments" :key="`front-${index}`" :d="segment.d" />
    </g>
  </g>
</template>
