<!--
  单幅实验示意图（第 5 页四格记录、第 6 页换视角共用）：螺线管 + 条形磁体。

  - `pole`：朝向线圈的那一极，画在下半段；
  - `motion`：`in` 表示磁体在线圈上方（插入），`out` 表示磁体已进入线圈（抽出）——
    运动方向写在页面图注里，图内不再画速度箭头，避免与磁场箭头挤在一起；
  - `b0` / `bi` / `current` 传 `none` 时不画对应标注，页面按点击分步传入。

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
  /** 朝向线圈的磁极（画在下半段） */
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

const CX = 92;
const CY = 72;
const RINGS = [
  { rx: 44, ry: 19 },
  { rx: 35, ry: 15 },
  { rx: 27, ry: 11 },
];

/** 磁体：宽 21、长 44 */
const MAGNET_X = 81.5;
const MAGNET_W = 21;
const MAGNET_H = 44;
const magnetY = computed<number>(() => (motion === "in" ? 4 : 50));

/** 朝下（对着线圈）的一极在下面，另一端在上 */
const upperPole = computed<"N" | "S">(() => (pole === "N" ? "S" : "N"));
const poleColor = (p: "N" | "S"): string => (p === "N" ? "var(--c-danger)" : "var(--c-velocity)");

/** 磁场箭头：从线圈上沿外侧穿到下方 */
const FIELD_TOP = 52;
const FIELD_BOTTOM = 94;
</script>

<template>
  <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" class="coil-magnet-svg">
    <!-- 条形磁体（先画，线圈的匝盖在上面） -->
    <g>
      <rect :x="MAGNET_X" :y="magnetY" :width="MAGNET_W" :height="MAGNET_H / 2" rx="2" :fill="poleColor(upperPole)" />
      <rect :x="MAGNET_X" :y="magnetY + MAGNET_H / 2" :width="MAGNET_W" :height="MAGNET_H / 2" rx="2" :fill="poleColor(pole)" />
      <text :x="CX" :y="magnetY + 15" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-bg)">
        {{ upperPole }}
      </text>
      <text :x="CX" :y="magnetY + 37" text-anchor="middle" font-family="KaTeX_Main" font-size="11" fill="var(--c-bg)">
        {{ pole }}
      </text>
    </g>

    <!-- 线圈 -->
    <g fill="none" stroke="var(--c-neutral-300)" stroke-width="1.5">
      <ellipse v-for="r in RINGS" :key="r.rx" :cx="CX" :cy="CY" :rx="r.rx" :ry="r.ry" />
    </g>

    <!-- 原磁场 B0 -->
    <g v-if="b0 !== 'none'">
      <CourseArrow
        :from="{ x: 68, y: b0 === 'down' ? FIELD_TOP : FIELD_BOTTOM }"
        :to="{ x: 68, y: b0 === 'down' ? FIELD_BOTTOM : FIELD_TOP }"
        stroke="var(--c-accent)"
        :stroke-width="1.8"
        :head-size="7"
      />
      <text x="68" y="47" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="10" fill="var(--c-accent)">
        B
        <tspan dy="2" font-size="7" font-family="KaTeX_Main" font-style="normal">0</tspan>
      </text>
    </g>

    <!-- 感应电流的磁场 Bi（虚线，与原磁场区分） -->
    <g v-if="bi !== 'none'">
      <CourseArrow
        :from="{ x: 116, y: bi === 'down' ? FIELD_TOP : FIELD_BOTTOM }"
        :to="{ x: 116, y: bi === 'down' ? FIELD_BOTTOM : FIELD_TOP }"
        stroke="var(--c-accent)"
        :stroke-width="1.8"
        :head-size="7"
        stroke-dasharray="5 3"
      />
      <text x="116" y="47" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="10" fill="var(--c-accent)">
        B
        <tspan dy="2" font-size="7" font-family="KaTeX_Main" font-style="normal">i</tspan>
      </text>
    </g>

    <!-- 感应电流 I：画在近侧导线旁，向右为俯视逆时针 -->
    <g v-if="current !== 'none'">
      <CourseArrow
        :from="{ x: current === 'ccw' ? 64 : 120, y: 99 }"
        :to="{ x: current === 'ccw' ? 120 : 64, y: 99 }"
        stroke="var(--c-physics)"
        :stroke-width="1.8"
        :head-size="7"
      />
      <text x="92" y="114" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="10" fill="var(--c-physics)">I</text>
    </g>
  </svg>
</template>
