<script setup lang="ts">
import { computed } from "vue";

/**
 * 人站在体重计上的受力/运动示意（§4.6 全课通用）
 *
 * - 受力（重力 mg 向下、支持力 F_N 向上）**都从人的几何中心 (160, 248) 出发**，长度随 fnRatio 变化；
 * - 速度 v / 加速度 a 用略小一号的箭头画在人**旁侧**（左侧），避免与力箭头叠在一起；
 * - `enclosure="elevator"` 时加画轿厢与缆绳（例题用）；
 * - `reading` 有值时在秤的显示屏上写出示数（视重）。
 */
const {
  fnRatio = 1,
  forceLen = 85,
  accelDir = "none",
  speedDir = "none",
  showForces = false,
  showMotion = false,
  enclosure = "none",
  reading = null,
} = defineProps<{
  /** 视重 / 重力：决定支持力箭头长度（1 = 等重，<1 失重，>1 超重） */
  fnRatio?: number;
  /** 重力箭头长度基准（viewBox 用户单位） */
  forceLen?: number;
  /** 加速度方向；none 表示 a = 0 */
  accelDir?: "down" | "up" | "none";
  /** 速度方向；none 表示静止 */
  speedDir?: "down" | "up" | "none";
  /** 是否显示受力箭头 */
  showForces?: boolean;
  /** 是否显示速度 / 加速度箭头 */
  showMotion?: boolean;
  /** 画不画电梯轿厢 */
  enclosure?: "none" | "elevator";
  /** 秤的示数（N）；不传则不显示 */
  reading?: number | null;
}>();

/** 人的几何中心：重力与支持力都从这里起笔 */
const CO = { x: 160, y: 248 };

const viewBox = computed(() => (enclosure === "elevator" ? "0 0 320 400" : "60 118 200 282"));

const mgEnd = computed(() => ({ x: CO.x, y: CO.y + forceLen }));
const fnEnd = computed(() => ({ x: CO.x, y: CO.y - forceLen * fnRatio }));

/**
 * 速度 / 加速度箭头的起止点：长度 62，绕 y = CO.y 对称画在人左侧
 *
 * @param dir 箭头方向；`none` 表示静止、不画
 * @param x 箭头所在竖线的横坐标
 * @returns 箭头的起止点；方向为 `none` 时返回 null
 */
const motion = (dir: "down" | "up" | "none", x: number): { from: { x: number; y: number }; to: { x: number; y: number } } | null => {
  if (dir === "none") return null;

  return dir === "down" ? { from: { x, y: CO.y - 31 }, to: { x, y: CO.y + 31 } } : { from: { x, y: CO.y + 31 }, to: { x, y: CO.y - 31 } };
};

const speedArrow = computed(() => motion(speedDir, 110));
const accelArrow = computed(() => motion(accelDir, 82));
</script>

<template>
  <svg :viewBox="viewBox" width="100%" style="max-width: 240px" xmlns="http://www.w3.org/2000/svg">
    <!-- 地板 -->
    <SurfaceHatch :from="{ x: 34, y: 372 }" :to="{ x: 286, y: 372 }" side="below" color="#64748b" :line-width="2" :thickness="9" :gap="16" />
    <line x1="34" y1="372" x2="286" y2="372" stroke="rgba(148,163,184,0.55)" stroke-width="1.6" />

    <!-- 电梯轿厢（例题用） -->
    <g v-if="enclosure === 'elevator'" stroke="rgba(148,163,184,0.5)" stroke-width="2" fill="none">
      <line x1="34" y1="42" x2="286" y2="42" />
      <line x1="34" y1="42" x2="34" y2="372" />
      <line x1="286" y1="42" x2="286" y2="372" />
      <line x1="160" y1="0" x2="160" y2="42" />
    </g>

    <!-- 体重计 -->
    <rect x="100" y="330" width="120" height="12" rx="4" fill="rgba(148,163,184,0.22)" stroke="rgba(148,163,184,0.6)" stroke-width="1.4" />
    <rect x="116" y="342" width="88" height="30" rx="6" fill="rgba(30,41,59,0.92)" stroke="rgba(148,163,184,0.5)" stroke-width="1.4" />
    <rect x="132" y="346" width="56" height="22" rx="4" fill="#0b1220" stroke="rgba(148,163,184,0.4)" stroke-width="1.2" />
    <text v-if="reading !== null" x="160" y="362" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="#e2a846">{{ reading }} N</text>

    <!-- 人（深色剪影，受力箭头压在上面仍看得清） -->
    <g>
      <circle cx="160" cy="196" r="17" fill="#334155" stroke="#94a3b8" stroke-width="1.6" />
      <rect x="132" y="214" width="56" height="98" rx="24" fill="#334155" stroke="#94a3b8" stroke-width="1.6" />
      <line x1="147" y1="308" x2="144" y2="330" stroke="#94a3b8" stroke-width="9" stroke-linecap="round" />
      <line x1="173" y1="308" x2="176" y2="330" stroke="#94a3b8" stroke-width="9" stroke-linecap="round" />
    </g>

    <!-- 速度 / 加速度：画在人左侧，略小一号 -->
    <g v-if="showMotion">
      <CourseArrow v-if="speedArrow" :from="speedArrow.from" :to="speedArrow.to" stroke="#60a5fa" :stroke-width="2.6" label="v" :label-dx="-13" />
      <CourseArrow v-if="accelArrow" :from="accelArrow.from" :to="accelArrow.to" stroke="#2dd4bf" :stroke-width="2.6" label="a" :label-dx="-13" />
    </g>

    <!-- 受力：一律从几何中心出发 -->
    <g v-if="showForces">
      <CourseArrow :from="CO" :to="mgEnd" stroke="#f87171" :stroke-width="3.4" />
      <text
        :x="CO.x - 12"
        :y="mgEnd.y - 6"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="16"
        fill="#f87171"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        mg
      </text>
      <CourseArrow :from="CO" :to="fnEnd" stroke="#e2a846" :stroke-width="3.4" />
      <text
        :x="CO.x - 12"
        :y="fnEnd.y + 5"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="16"
        fill="#e2a846"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        <tspan>F</tspan>
        <tspan dy="4" font-size="11">N</tspan>
      </text>
    </g>
  </svg>
</template>
