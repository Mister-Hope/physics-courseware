<!--
  单幅实验示意图（第 5 页四格记录、第 6 页换视角共用）：螺线管 + 条形磁体。

  - `pole`：朝向线圈的那一极，画在下端；
  - `motion`：`in` 表示磁体在线圈上方（插入），`out` 表示磁体已进入线圈（抽出）——
    运动方向写在页面图注里，图内不再画速度箭头，避免与磁场箭头挤在一起；
  - `b0` / `bi` / `current` 传 `none` 时不画对应标注，页面按点击分步传入。

  线圈用共享 Solenoid（竖放：连续螺旋线、背面半圈虚淡，不是一叠椭圆）。
  绕向取 direction="ccw"（从下端沿轴看逆时针）；电流方向看俯视（从上往下看）：
  `current="ccw"`（俯视逆时针）时前方的导线上电流向右，`"cw"` 时向左。
  甲（N 极插入）= 俯视逆时针 = B_i 向上，所以图里 B_i 箭头向上。

  图按 16px 体系绘制（viewBox 200×120）；磁感应强度与电流用 KaTeX_Math 斜体，
  下标走 tspan（SVG 里嵌不了 <Latex>）。
-->
<script setup lang="ts">
import { computed } from "vue";

const {
  pole = "N",
  motion = "in",
  b0 = "none",
  bi = "none",
  current = "none",
} = defineProps<{
  /** 朝向线圈的磁极（画在下端） */
  pole?: "N" | "S";
  /** 插入（磁体在线圈上方）/ 抽出（磁体已进入线圈） */
  motion?: "in" | "out";
  /** 原磁场 $B_0$ 的方向 */
  b0?: "none" | "down" | "up";
  /** 感应电流的磁场 $B_i$ 的方向 */
  bi?: "none" | "down" | "up";
  /** 感应电流的方向（俯视）：逆时针 / 顺时针 */
  current?: "none" | "ccw" | "cw";
}>();

const CX = 100;
const CY = 84;
/** 螺线管：长 46、半径 32、4.5 匝（竖放，轴线上下） */
const COIL_LENGTH = 46;
const COIL_RADIUS = 32;

/** 条形磁体：宽 18、长 34；朝线圈的一极在下端，所以 nSide 由 pole 决定 */
const MAGNET_WIDTH = 18;
const MAGNET_LENGTH = 34;
const magnetY = computed<number>(() => (motion === "in" ? 22 : CY));
const nSide = computed<"top" | "bottom">(() => (pole === "N" ? "bottom" : "top"));

/** B0 / Bi 箭头：画在线圈孔内（轴线两侧），方向由上往下 / 由下往上 */
const FIELD_TOP = 55;
const FIELD_BOTTOM = 113;
const B0_X = 78;
const BI_X = 122;

/** 前方导线上的一小段电流箭头：底层 4.5 匝螺旋在中间半圈处的两个点（相差 70°） */
const FLOW_A = { x: 81.65, y: 96.41 };
const FLOW_B = { x: 118.35, y: 94.41 };
</script>

<template>
  <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" class="coil-magnet-svg">
    <!-- 条形磁体（先画，线圈的匝盖在上面：磁体在线圈里时就是"插在里面"） -->
    <BarMagnet :x="CX" :y="magnetY" :length="MAGNET_LENGTH" :width="MAGNET_WIDTH" :n-side="nSide" />

    <!-- 线圈（共享 Solenoid：竖放、连续螺旋线；从下端看逆时针 = 俯视逆时针时前侧电流向右） -->
    <Solenoid
      :x="CX"
      :y="CY"
      :length="COIL_LENGTH"
      :radius="COIL_RADIUS"
      :turns="4.5"
      direction="ccw"
      orientation="vertical"
      color="var(--c-neutral-300)"
      :line-width="1.5"
      :back-opacity="0.32"
    />

    <!-- 原磁场 B0 -->
    <g v-if="b0 !== 'none'">
      <CourseArrow
        :from="{ x: B0_X, y: b0 === 'down' ? FIELD_TOP : FIELD_BOTTOM }"
        :to="{ x: B0_X, y: b0 === 'down' ? FIELD_BOTTOM : FIELD_TOP }"
        stroke="var(--c-accent)"
        :stroke-width="1.8"
        :head-size="7"
      />
      <text :x="B0_X" y="50" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="10" fill="var(--c-accent)">
        B
        <tspan dy="2" font-size="7" font-family="KaTeX_Main" font-style="normal">0</tspan>
      </text>
    </g>

    <!-- 感应电流的磁场 Bi（虚线，与原磁场区分） -->
    <g v-if="bi !== 'none'">
      <CourseArrow
        :from="{ x: BI_X, y: bi === 'down' ? FIELD_TOP : FIELD_BOTTOM }"
        :to="{ x: BI_X, y: bi === 'down' ? FIELD_BOTTOM : FIELD_TOP }"
        stroke="var(--c-accent)"
        :stroke-width="1.8"
        :head-size="7"
        stroke-dasharray="5 3"
      />
      <text :x="BI_X" y="50" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="10" fill="var(--c-accent)">
        B
        <tspan dy="2" font-size="7" font-family="KaTeX_Main" font-style="normal">i</tspan>
      </text>
    </g>

    <!-- 感应电流 I：画在前方导线上（俯视逆时针 = 向右） -->
    <g v-if="current !== 'none'">
      <CourseArrow
        :from="current === 'ccw' ? FLOW_A : FLOW_B"
        :to="current === 'ccw' ? FLOW_B : FLOW_A"
        stroke="var(--c-physics)"
        :stroke-width="2.2"
        :head-size="8"
      />
      <text x="137" y="95" text-anchor="start" font-family="KaTeX_Math" font-style="italic" font-size="10" fill="var(--c-physics)">I</text>
    </g>
  </svg>
</template>
