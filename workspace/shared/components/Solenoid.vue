<script setup lang="ts">
import { computed } from "vue";

/**
 * 直螺线管（**一条连续螺旋线**，不是一叠独立的椭圆/圆环）——**只能在 `<svg>` 里用**（根节点是 `<g>`，写成 HTML 元素页面上什么都不显示，也不能用 ` ```comp
 * ` 代码块）。
 *
 * 教师点名：线圈一律画成螺旋线。画法用斜投影的参数方程——沿轴 `s`、截面角 `θ`： 屏幕 `X = 轴坐标 + 0.34·radius·sin θ`、`Y = −radius·cos
 * θ`（竖放时整幅顺时针转 90°）； 按 `sin θ` 的符号把一条螺旋拆成**正面段（实线）与背面段（`backOpacity` 虚淡 / `backDash` 虚线）**，
 * 看得出导线绕到后面去了。
 *
 * **绕向 `direction` 的语义（本组件最要紧的一条）**：`cw` / `ccw` 说的是 **从 +x 端（右端）沿轴看回去**，电流沿导线绕行的方向（`cw` =
 * 顺时针，`ccw` = 逆时针）。 换句话说：把导线从 −x 端（左端）走到 +x 端（右端）当作电流方向时，从右端看到的是 `cw` 还是 `ccw`。
 * 同一条绕线从两端看方向相反——竖放时参考端是**下端**（`orientation="vertical"` 相当于把横放图顺时针转 90°）， 要从上端看就把 `direction`
 * 反过来传。
 *
 * **接线端位置**（页面画引线用；导线就止在这两点上）：`phase` 决定导线在截面上的起止角。 横放：起端 `(x − length/2 + 0.34·radius·sin φ, y −
 * radius·cos φ)`；末端把 `−length/2` 换成 `+length/2`、 `φ` 换成 `phase + 绕向·turns·360°`。`phase = 0` =
 * 起止点在截面**上端**（`y − radius`）、`phase = 180` = **下端**； `phase = 0 / 180`
 * 处螺旋切线是**水平**的，引线横着接出去最自然。⚠️ `turns` 取**整数**时两端在同一个截面位置（都上/都下，引线好接）；
 * 取**半整数**时一端在上、一端在下——两条引线都往下走的图必须用整数匝。
 *
 * ```html
 * <!-- 横放 4 匝（整数），从右端看顺时针；phase 180 ⇒ 两端都在下端 (146,89) / (226,89)，引线从这里往下接 -->
 * <Solenoid
 *   :x="186"
 *   :y="64"
 *   :length="80"
 *   :radius="25"
 *   :turns="4"
 *   direction="cw"
 *   :phase="180"
 *   back-dash
 * />
 * <!-- 横放 4.5 匝，从右端看逆时针；左端在上、右端在下 -->
 * <Solenoid
 *   :x="226"
 *   :y="250"
 *   :length="72"
 *   :radius="30"
 *   :turns="4.5"
 *   direction="ccw"
 *   :line-width="2.2"
 * />
 * <!-- 竖放（相当于把横放图顺时针转 90°，参考端变下端），3 匝 -->
 * <Solenoid :x="120" :y="90" :length="100" :radius="22" :turns="3" orientation="vertical" />
 * ```
 */
const {
  x = 0,
  y = 0,
  length = 120,
  radius = 26,
  turns = 4.5,
  direction = "cw",
  orientation = "horizontal",
  color = "var(--c-accent)",
  lineWidth = 2.4,
  backOpacity = 0.32,
  backDash = false,
  phase = 0,
} = defineProps<{
  /** 螺线管包围盒中心（viewBox 用户单位） */
  x?: number;
  /** 螺线管包围盒中心（viewBox 用户单位） */
  y?: number;
  /** 沿轴的长度（含两端螺旋的轴向跨度，默认 120） */
  length?: number;
  /** 螺线管半径（截面圆半径，默认 26） */
  radius?: number;
  /** 匝数（可以带小数，如 4.5；默认 4.5） */
  turns?: number;
  /** 绕向：**从 +x 端（右端）沿轴看**，电流沿导线是 `cw` 顺时针 / `ccw` 逆时针 */
  direction?: "cw" | "ccw";
  /** 朝向：`horizontal` 轴线左右（默认）/ `vertical` 轴线上下（等于把横放图顺时针转 90°，参考端变成下端） */
  orientation?: "horizontal" | "vertical";
  /** 导线颜色（默认暖金 `--c-accent`） */
  color?: string;
  /** 导线线宽（默认 2.4） */
  lineWidth?: number;
  /** 背面半圈的不透明度（默认 0.32；正面恒为实线） */
  backOpacity?: number;
  /** 背面半圈是否画成虚线（默认 `false` = 只虚淡；要更强调"绕到后面"时打开） */
  backDash?: boolean;
  /** 导线起止点在截面上的角度（度，默认 0 = 上端；`180` = 下端；决定接线端位置） */
  phase?: number;
}>();

const DEG = Math.PI / 180;
/** 截面椭圆的压扁比例（短半轴 ÷ 半径）：斜投影下"绕到侧后面"的程度 */
const DEPTH_RATIO = 0.34;

/** 绕向符号：`ccw` = +1（从 +x 端看逆时针），`cw` = −1 */
const spin = computed<1 | -1>(() => (direction === "ccw" ? 1 : -1));

/** 深度方向的投影量（截面椭圆短半轴） */
const depthOffset = computed(() => radius * DEPTH_RATIO);

/** 整条螺旋的角增量（弧度） */
const turnAngle = computed(() => spin.value * turns * 2 * Math.PI);

/** 起始截面角（弧度） */
const theta0 = computed(() => phase * DEG);

interface Point {
  x: number;
  y: number;
}

// 参数 u ∈ [0, 1] 处的导线点（u = 0 在 −轴端，u = 1 在 +轴端）
const pointAt = (u: number): Point => {
  const theta = theta0.value + turnAngle.value * u;
  const along = -length / 2 + length * u;
  const sway = depthOffset.value * Math.sin(theta);
  const across = -radius * Math.cos(theta);

  // 横放：s 沿屏幕 +x、深度（sway）也沿 +x 投影、across 沿屏幕 +y；
  // 竖放：整幅顺时针转 90°（s 沿 +y、sway 沿 +y、across 沿 −x 的反向 ⇒ x − across）
  return orientation === "horizontal"
    ? { x: x + along + sway, y: y + across }
    : { x: x - across, y: y + along + sway };
};

// 保留两位小数，路径字符串不至于过长
const fmt = (value: number): string => String(Math.round(value * 100) / 100);

interface HelixSegment {
  /** 这一段的折线路径 */
  d: string;
  /** 是否在朝向观察者的一面（背面段虚淡） */
  front: boolean;
}

const segments = computed<HelixSegment[]>(() => {
  const delta = turnAngle.value;
  const start = theta0.value;

  if (Math.abs(delta) < 1e-6) return [];

  // 在 sin θ = 0（θ = mπ）处切开：正面段 sin θ > 0、背面段 sin θ < 0
  const low = Math.min(start, start + delta);
  const high = Math.max(start, start + delta);
  const cuts: number[] = [0, 1];

  for (let m = Math.ceil(low / Math.PI); m <= Math.floor(high / Math.PI); m += 1) {
    const u = (m * Math.PI - start) / delta;

    if (u > 1e-4 && u < 1 - 1e-4) cuts.push(u);
  }

  cuts.sort((a, b) => a - b);

  const result: HelixSegment[] = [];
  const steps = 10;

  for (let index = 0; index < cuts.length - 1; index += 1) {
    const from = cuts[index] ?? 0;
    const to = cuts[index + 1] ?? 1;
    const thetaMid = start + delta * ((from + to) / 2);
    const parts: string[] = [];

    for (let step = 0; step <= steps; step += 1) {
      const point = pointAt(from + ((to - from) * step) / steps);

      parts.push(`${step === 0 ? "M" : "L"} ${fmt(point.x)} ${fmt(point.y)}`);
    }

    result.push({ d: parts.join(" "), front: Math.sin(thetaMid) > 0 });
  }

  return result;
});

const backSegments = computed(() => segments.value.filter((segment) => !segment.front));
const frontSegments = computed(() => segments.value.filter((segment) => segment.front));
</script>

<template>
  <g class="solenoid">
    <!-- 背面半圈：虚淡（backDash 打开时画虚线），体现"绕到后面去了" -->
    <g
      fill="none"
      :stroke="color"
      :stroke-width="lineWidth"
      stroke-linecap="round"
      :stroke-dasharray="backDash ? '5 4' : undefined"
      :opacity="backOpacity"
    >
      <path v-for="(segment, index) in backSegments" :key="`back-${index}`" :d="segment.d" />
    </g>
    <!-- 正面半圈：实线 -->
    <g fill="none" :stroke="color" :stroke-width="lineWidth" stroke-linecap="round">
      <path v-for="(segment, index) in frontSegments" :key="`front-${index}`" :d="segment.d" />
    </g>
  </g>
</template>
