<!--
  第 10 / 11 页右栏共用：通电导线的微观图像（电流的微观模型）
  —— 一根长 L、横截面积 S 的导线（有立体感的柱体：侧视为矩形 + 左端面椭圆就是横截面 S），
     内部画正电荷（红点，正向定向移动，微箭头指向左），因此定向移动速度 v 与电流 I 同向左：
       · 推导一（第 10 页，mode="micro"，clicks: 4）
         step ≥ 1：高亮"长 v（单位时间 1 s 走过）的那一小段电荷柱"——它的右端离截面正好 v，
                   即"单位时间通过横截面的电荷量"，对应 I = nqvS；
         step ≥ 2：整根导线（长 L）高亮——这段导线里的电荷总数 N = nSL；
         step 3 / 4 是页面上的安培力与结论，图上不再加东西、也绝不重画（显隐只切 visibility）。
       · 推导二（第 11 页，mode="definition"，clicks: 3）
         step ≥ 1：整根电荷柱（长 L = vt）高亮——这段电荷恰好全部通过左端横截面，用时 t，
                   对应 Q = Nq、I = Q/t；step 2 / 3 保持"柱体通过截面"的定格。
  ★ 物理方向自洽：电流方向与正电荷定向移动方向相同，两者都指向左端横截面，
    且"截面 + 长 L 的电荷柱"始终是画面焦点。
  ★ 图上不出现具体数值（避免与学生被要求自洽的典型值打架），符号一律走 KaTeX 字体。
-->
<script setup lang="ts">
import { computed } from "vue";

const { mode = "micro", step = 0 } = defineProps<{
  /** `micro` = 推导一（I = nqvS，第 10 页）；`definition` = 推导二（I = Q/t，第 11 页） */
  mode?: "micro" | "definition";
  /** 当前点击步（页面里传 :step="$clicks"） */
  step?: number;
}>();

const s = computed(() => Math.max(0, step));
const isMicro = computed(() => mode === "micro");

/** 导线（柱体）几何：左端面就是横截面 S，自由电荷向左定向移动 */
const AXIS_Y = 190; // 柱体轴线
const WIRE_TOP = 130;
const WIRE_BOTTOM = 250;
const SEC_X = 84; // 横截面（左端面）圆心横坐标
const SEC_RX = 20; // 端面椭圆短半轴（透视压缩）
const SEC_RY = 60; // 端面椭圆长半轴（= 导线半径）
const WIRE_END = 448; // 柱体右端
const SLAB_X = 164; // 单位时间（1 s）内走过距离 v 的电荷柱右端

/** 整根电荷柱（长 L）轮廓：左右两端都是椭圆端面 */
const columnPath = `M ${SEC_X} ${WIRE_TOP} L ${WIRE_END} ${WIRE_TOP} A ${SEC_RX} ${SEC_RY} 0 0 1 ${WIRE_END} ${WIRE_BOTTOM} L ${SEC_X} ${WIRE_BOTTOM} A ${SEC_RX} ${SEC_RY} 0 0 1 ${SEC_X} ${WIRE_TOP} Z`;
/** 单位时间内通过截面的那一小段（长 v）：左端同样是截面椭圆 */
const slabPath = `M ${SEC_X} ${WIRE_TOP} L ${SLAB_X} ${WIRE_TOP} L ${SLAB_X} ${WIRE_BOTTOM} L ${SEC_X} ${WIRE_BOTTOM} A ${SEC_RX} ${SEC_RY} 0 0 1 ${SEC_X} ${WIRE_TOP} Z`;

/** 自由电荷（正电荷）：3 行 × 6 列，均匀分布在导线内部 */
const CHARGE_ROWS = [152, 190, 228];
const CHARGE_COLS = [137, 192, 247, 302, 357, 412];
const CHARGES = CHARGE_ROWS.flatMap((y) => CHARGE_COLS.map((x) => ({ x, y })));

/** "单位体积"示意框：框住一小段导线，标注自由电荷数密度 n */
const N_BOX = { x: 274, y: 138, w: 56, h: 104, cx: 302 };

/** 推导一 step ≥ 1：高亮"长 v 的电荷柱"（单位时间通过截面） */
const showSlab = computed(() => isMicro.value && s.value >= 1);
/** 推导一 step ≥ 2：整根导线高亮（N = nSL）；推导二 step ≥ 1：整段电荷柱通过截面 */
const showColumn = computed(() => (isMicro.value ? s.value >= 2 : s.value >= 1));

/**
 * 分步显隐：只切 opacity / visibility，元素始终留在 DOM 里（v-if 真删真插会顶跑已有元素）
 *
 * @param on 该元素在当前 step 是否应当可见
 * @returns 内联样式（隐藏时仍占位，不改变任何元素的位置）
 */
const fade = (on: boolean): { opacity: number; visibility: "visible" | "hidden" } => ({
  opacity: on ? 1 : 0,
  visibility: on ? "visible" : "hidden",
});
</script>

<template>
  <div class="flex min-h-0 w-full flex-1 flex-col">
    <div class="flex min-h-0 w-full flex-1 items-center justify-center">
      <svg
        viewBox="0 0 500 400"
        xmlns="http://www.w3.org/2000/svg"
        class="h-full w-full select-none"
        role="img"
        aria-label="通电导线的微观图像：横截面积 S、自由电荷数密度 n、定向移动速度 v、电流 I"
      >
        <defs>
          <linearGradient id="cmm-wire" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stop-color="color-mix(in srgb, var(--c-neutral-700) 50%, transparent)"
            />
            <stop
              offset="30%"
              stop-color="color-mix(in srgb, var(--c-surface-solid) 72%, transparent)"
            />
            <stop
              offset="72%"
              stop-color="color-mix(in srgb, var(--c-neutral-900) 88%, transparent)"
            />
            <stop
              offset="100%"
              stop-color="color-mix(in srgb, var(--c-surface-solid) 55%, transparent)"
            />
          </linearGradient>
          <linearGradient id="cmm-section" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="color-mix(in srgb, var(--c-accent) 45%, transparent)" />
            <stop offset="100%" stop-color="color-mix(in srgb, var(--c-accent) 16%, transparent)" />
          </linearGradient>
          <linearGradient id="cmm-column" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="color-mix(in srgb, var(--c-accent) 6%, transparent)" />
            <stop offset="45%" stop-color="color-mix(in srgb, var(--c-accent) 20%, transparent)" />
            <stop offset="100%" stop-color="color-mix(in srgb, var(--c-accent) 10%, transparent)" />
          </linearGradient>
          <radialGradient id="cmm-charge" cx="34%" cy="32%" r="72%">
            <stop offset="0%" stop-color="#fecaca" />
            <stop offset="45%" stop-color="var(--c-force)" />
            <stop offset="100%" stop-color="#b91c1c" />
          </radialGradient>
        </defs>
        <!-- ── 导线柱体（侧视为矩形 + 两端椭圆端面） ── -->
        <path
          :d="columnPath"
          fill="url(#cmm-wire)"
          stroke="color-mix(in srgb, var(--c-text-dim) 50%, transparent)"
          stroke-width="1.8"
        />
        <line
          :x1="SEC_X + 8"
          :y1="WIRE_TOP + 4"
          :x2="WIRE_END - 8"
          :y2="WIRE_TOP + 4"
          stroke="rgba(255,255,255,0.14)"
          stroke-width="1.4"
        />
        <!-- ── 推导一 step ≥ 2 / 推导二 step ≥ 1：整根电荷柱（长 L）高亮 ── -->
        <g :style="fade(showColumn)">
          <path
            :d="columnPath"
            fill="url(#cmm-column)"
            stroke="color-mix(in srgb, var(--c-accent) 75%, transparent)"
            stroke-width="2.2"
          />
        </g>
        <!-- ── 推导一 step ≥ 1：单位时间内通过截面的那一小段（长 v） ── -->
        <g :style="fade(showSlab)">
          <path
            :d="slabPath"
            fill="color-mix(in srgb, var(--c-velocity) 20%, transparent)"
            stroke="color-mix(in srgb, var(--c-velocity) 90%, transparent)"
            stroke-width="2"
          />
          <g stroke="color-mix(in srgb, var(--c-velocity) 90%, transparent)" stroke-width="1.6">
            <line :x1="SEC_X" y1="280" :x2="SEC_X" y2="292" />
            <line :x1="SLAB_X" y1="280" :x2="SLAB_X" y2="292" />
            <line :x1="SEC_X" y1="286" :x2="SLAB_X" y2="286" />
          </g>
          <text
            :x="(SEC_X + SLAB_X) / 2"
            y="276"
            text-anchor="middle"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="24"
            fill="var(--c-velocity-light)"
          >
            v
          </text>
        </g>
        <!-- ── 横截面 S（左端面）：全图焦点，始终加一圈暖金光晕 ── -->
        <ellipse
          :cx="SEC_X"
          :cy="AXIS_Y"
          :rx="SEC_RX"
          :ry="SEC_RY"
          fill="color-mix(in srgb, var(--c-accent) 18%, transparent)"
          stroke="color-mix(in srgb, var(--c-accent) 35%, transparent)"
          stroke-width="8"
        />
        <ellipse
          :cx="SEC_X"
          :cy="AXIS_Y"
          :rx="SEC_RX"
          :ry="SEC_RY"
          fill="url(#cmm-section)"
          stroke="var(--c-accent)"
          stroke-width="2.6"
        />
        <line
          :x1="SEC_X"
          y1="126"
          :x2="SEC_X"
          y2="114"
          stroke="color-mix(in srgb, var(--c-accent) 80%, transparent)"
          stroke-width="1.6"
        />
        <text
          :x="SEC_X"
          y="102"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="30"
          fill="var(--c-accent)"
        >
          S
        </text>
        <!-- ── 自由电荷数密度 n：框出"单位体积"的一小段导线 ── -->
        <rect
          :x="N_BOX.x"
          :y="N_BOX.y"
          :width="N_BOX.w"
          :height="N_BOX.h"
          rx="5"
          fill="color-mix(in srgb, var(--c-text-dim) 7%, transparent)"
          stroke="color-mix(in srgb, var(--c-text-dim) 60%, transparent)"
          stroke-width="1.4"
          stroke-dasharray="6 5"
        />
        <line
          :x1="N_BOX.cx"
          y1="136"
          :x2="N_BOX.cx"
          y2="124"
          stroke="color-mix(in srgb, var(--c-text-dim) 65%, transparent)"
          stroke-width="1.4"
        />
        <text
          :x="N_BOX.cx"
          y="112"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="26"
          fill="var(--c-neutral-300)"
        >
          n
        </text>
        <!-- ── 自由电荷（正电荷）：红点 + 向左的定向移动微箭头 ── -->
        <g v-for="(c, idx) in CHARGES" :key="`cmm-charge-${idx}`">
          <path
            :d="`M ${c.x - 7} ${c.y} H ${c.x - 22} l 3.6 -2.6 m -3.6 2.6 l 3.6 2.6`"
            fill="none"
            stroke="var(--c-velocity)"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle
            :cx="c.x"
            :cy="c.y"
            r="5.5"
            fill="url(#cmm-charge)"
            stroke="#fecaca"
            stroke-width="0.9"
          />
          <g stroke="#fff1f2" stroke-width="1.3" stroke-linecap="round" opacity="0.9">
            <line :x1="c.x - 2.6" :y1="c.y" :x2="c.x + 2.6" :y2="c.y" />
            <line :x1="c.x" :y1="c.y - 2.6" :x2="c.x" :y2="c.y + 2.6" />
          </g>
        </g>
        <!-- ── 定向移动速度 v（与电流同向，指向横截面） ── -->
        <CourseArrow
          :from="{ x: 254, y: 64 }"
          :to="{ x: 142, y: 64 }"
          stroke="var(--c-velocity)"
          stroke-width="4.5"
        />
        <text
          x="126"
          y="76"
          text-anchor="end"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="30"
          fill="var(--c-velocity-light)"
        >
          v
        </text>
        <!-- ── 柱体长度 L = vt：截面到柱体末端 ── -->
        <g stroke="color-mix(in srgb, var(--c-neutral-300) 75%, transparent)" stroke-width="1.6">
          <line :x1="SEC_X" y1="302" :x2="SEC_X" y2="318" />
          <line :x1="WIRE_END" y1="302" :x2="WIRE_END" y2="318" />
          <line :x1="SEC_X + 8" y1="310" :x2="218" y2="310" />
          <line x1="318" y1="310" :x2="WIRE_END - 8" y2="310" />
        </g>
        <text
          x="268"
          y="319"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="26"
          fill="var(--c-neutral-200)"
        >
          L = vt
        </text>
        <!-- ── 电流方向 I（与正电荷定向移动方向相同） ── -->
        <CourseArrow
          :from="{ x: 436, y: 364 }"
          :to="{ x: 104, y: 364 }"
          stroke="var(--c-accent)"
          stroke-width="5"
        />
        <text
          x="88"
          y="376"
          text-anchor="end"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="30"
          fill="var(--c-accent)"
        >
          I
        </text>
      </svg>
    </div>
  </div>
</template>
