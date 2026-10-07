<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 相遇模型：A 从高处自由下落、B 从地面竖直上抛，已知**相遇时两者速度大小恰好相同（都等于 v）**， 滑块调 v 看各量怎么变。
 *
 * 取竖直向下为正（与上抛四图一致），A 下落、B 上升： A：v_A = gt， 下落距离 ½gt² B：v_B = -u + gt， 上升高度 ut - ½gt²（u 是 B 的上抛初速率）
 * 相遇时 |v_A| = |v_B| = v： gt = v ⇒ 相遇时间 t = v/g |-u + gt| = v ⇒ B 仍在上升，故 -u + gt = -v ⇒ u = 2v（若假设 B
 * 已过最高点，则 u = 0，不可能） 于是：B 的初速率 2v、相遇高度 3v²/(2g)、A 的释放高度 H_A = 2v²/g、 B 能上升的最大高度 H_Bmax = (2v)²/(2g)
 * = 2v²/g ⇒ **两者恰好相等**。
 *
 * 图是"固定刻度"的速率—时间图：横轴恒为 0–2.5 s、纵轴恒为 0–25 m/s，轴的量程不跟着滑块走—— 滑块只改两条直线的斜率、端点与交点位置，图必须肉眼可见地动（早期版本让量程跟着 v
 * 自适应， 于是两条线永远长一个样、只有右侧数字在变，教师实测反馈"图完全不动"）。
 *
 * A：v_A = gt，从原点画到 v = 25 m/s 与 t = 2.5 s 中先到的那条界； B：v_B = 2v - gt，从 (0, 2v) 画到 v = 0（最高点，t =
 * 2v/g）； 两线交于 (v/g, v)——就是"相遇时速度大小相同"的时刻。
 *
 * 滑块属于"点它一下就该动"的交互，不占用翻页点击步。
 */
const GRAVITY = 10;

/** 横轴固定量程：0–2.5 s */
const T_MAX = 2.5;
/** 纵轴固定量程：速率 0–25 m/s */
const V_MAX = 25;
/** 横轴刻度（原点不另标 0） */
const X_TICK_VALUES = [0.5, 1, 1.5, 2, 2.5];
/** 纵轴刻度（速率，单位 m/s） */
const Y_TICK_VALUES = [5, 10, 15, 20, 25];

/** 相遇时的共同速率 v（滑块可调） */
const speed = ref(5);

/** B 的上抛初速率：u = 2v */
const speedB = computed<number>(() => 2 * speed.value);
/** 相遇时间：t = v/g */
const tMeet = computed<number>(() => speed.value / GRAVITY);
/** 相遇点离地高度：3v²/(2g) */
const meetHeight = computed<number>(() => (3 * speed.value * speed.value) / (2 * GRAVITY));
/** A 的释放高度：2v²/g */
const heightA = computed<number>(() => (2 * speed.value * speed.value) / GRAVITY);
/** B 能上升的最大高度：u²/(2g) = 2v²/g */
const heightB = computed<number>(() => (speedB.value * speedB.value) / (2 * GRAVITY));
/** 相遇前 A 下落的距离：v²/(2g) */
const dropA = computed<number>(() => (speed.value * speed.value) / (2 * GRAVITY));
/** 相遇前 B 上升的距离：3v²/(2g)，与相遇点高度相等（B 从地面一路升到相遇点） */
const riseB = computed<number>(() => meetHeight.value);

/* ── 画布（viewBox 620 × 344）：刻度固定，滑块只改两条直线 ── */
const VIEW = { w: 620, h: 344 };
const PAD = { left: 56, right: 46, top: 48, bottom: 52 };
const PLOT_WIDTH = VIEW.w - PAD.left - PAD.right;
const PLOT_HEIGHT = VIEW.h - PAD.top - PAD.bottom;

/** 轴交点（原点）与两根轴的箭头尖端：横轴在 2.5 s 外再伸出一小段给轴端标签留位 */
const ORIGIN = { x: PAD.left, y: PAD.top + PLOT_HEIGHT };
const X_TIP = { x: ORIGIN.x + PLOT_WIDTH + 26, y: ORIGIN.y };
const Y_TIP = { x: ORIGIN.x, y: PAD.top - 16 };

/** 图例（线名）位置：绘图区左上角的空白带，不压任何一条线 */
const LEGEND = {
  segFrom: ORIGIN.x + 10,
  segTo: ORIGIN.x + 38,
  textX: ORIGIN.x + 46,
  rowA: PAD.top + 20,
  rowB: PAD.top + 46,
};

/**
 * 数值保留一位小数
 *
 * @param value 原始数值
 * @returns 四舍五入到 0.1 的数值
 */
const round1 = (value: number): number => Math.round(value * 10) / 10;
/**
 * 时刻 → 画布横坐标（横轴固定 0–2.5 s）
 *
 * @param time 时刻（s）
 * @returns 画布横坐标（保留一位小数）
 */
const toX = (time: number): number => round1(ORIGIN.x + (time / T_MAX) * PLOT_WIDTH);
/**
 * 速率 → 画布纵坐标（纵轴向上为正，固定 0–25 m/s）
 *
 * @param rate 速率（m/s）
 * @returns 画布纵坐标（保留一位小数）
 */
const toY = (rate: number): number => round1(ORIGIN.y - (rate / V_MAX) * PLOT_HEIGHT);

interface Mark {
  /** 时刻（s） */
  time: number;
  /** 速率（m/s） */
  rate: number;
  /** 画布横坐标 */
  x: number;
  /** 画布纵坐标 */
  y: number;
}

/**
 * 数据点 → 图上标记点（同时带上数据坐标与画布坐标）
 *
 * @param time 时刻（s）
 * @param rate 速率（m/s）
 * @returns 数据坐标与画布坐标成对的标记点
 */
const mark = (time: number, rate: number): Mark => ({
  time,
  rate,
  x: toX(time),
  y: toY(rate),
});

/** 横轴刻度：数据值与画布坐标成对 */
const X_TICKS = X_TICK_VALUES.map((time) => ({ time, x: toX(time) }));
/** 纵轴刻度：数据值与画布坐标成对 */
const Y_TICKS = Y_TICK_VALUES.map((rate) => ({ rate, y: toY(rate) }));

const geom = computed(() => {
  const rate = speed.value;

  /* A：v_A = gt，画到 v = 25 m/s 与 t = 2.5 s 中先到的那条界 */
  const tEndA = Math.min(V_MAX / GRAVITY, T_MAX);
  const aStart = mark(0, 0);
  const aEnd = mark(tEndA, GRAVITY * tEndA);

  /* B：v_B = 2v - gt，从 (0, 2v) 画到 v = 0，终点就是最高点 */
  const bStart = mark(0, 2 * rate);
  const bEnd = mark((2 * rate) / GRAVITY, 0);

  return {
    aStart,
    aEnd,
    bStart,
    bEnd,
    /* 交点：相遇时两者速度大小都是 v */
    cross: mark(tMeet.value, rate),
    aPath: `M ${aStart.x} ${aStart.y} L ${aEnd.x} ${aEnd.y}`,
    bPath: `M ${bStart.x} ${bStart.y} L ${bEnd.x} ${bEnd.y}`,
  };
});
</script>

<template>
  <div class="em">
    <div class="em-main">
      <svg
        class="em-chart"
        :viewBox="`0 0 ${VIEW.w} ${VIEW.h}`"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        :aria-label="`速率随时间变化的图像：A 自由落体的速率由 0 均匀增大，B 竖直上抛的速率由 2v 均匀减小，两条线的交点是两者速度大小相同的时刻`"
      >
        <CourseArrow :from="ORIGIN" :to="X_TIP" stroke="#64748b" stroke-width="2.4" />
        <CourseArrow :from="ORIGIN" :to="Y_TIP" stroke="#64748b" stroke-width="2.4" />
        <g stroke="#64748b" stroke-width="1.7">
          <line
            v-for="tick in X_TICKS"
            :key="`tx${tick.time}`"
            :x1="tick.x"
            :y1="ORIGIN.y"
            :x2="tick.x"
            :y2="ORIGIN.y - 9"
          />
          <line
            v-for="tick in Y_TICKS"
            :key="`ty${tick.rate}`"
            :x1="ORIGIN.x"
            :y1="tick.y"
            :x2="ORIGIN.x + 9"
            :y2="tick.y"
          />
        </g>
        <g font-size="15" font-family="KaTeX_Main" fill="#94a3b8">
          <text
            v-for="tick in X_TICKS"
            :key="`nx${tick.time}`"
            :x="tick.x"
            :y="ORIGIN.y + 20"
            text-anchor="middle"
          >
            {{ tick.time }}
          </text>
          <text
            v-for="tick in Y_TICKS"
            :key="`ny${tick.rate}`"
            :x="ORIGIN.x - 11"
            :y="tick.y + 5"
            text-anchor="end"
          >
            {{ tick.rate }}
          </text>
        </g>
        <text :x="ORIGIN.x + 30" y="22" text-anchor="middle" font-size="22" fill="#94a3b8">
          <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
          <tspan font-family="KaTeX_Main" font-size="16" dx="4">/(m/s)</tspan>
        </text>
        <text :x="X_TIP.x - 2" :y="ORIGIN.y + 44" text-anchor="end" font-size="22" fill="#94a3b8">
          <tspan font-family="KaTeX_Math" font-style="italic">t</tspan>
          <tspan font-family="KaTeX_Main" font-size="16" dx="4">/s</tspan>
        </text>
        <text
          :x="ORIGIN.x - 12"
          :y="ORIGIN.y + 44"
          text-anchor="end"
          font-size="20"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="#94a3b8"
        >
          O
        </text>
        <line
          :x1="geom.cross.x"
          :y1="ORIGIN.y"
          :x2="geom.cross.x"
          :y2="geom.cross.y"
          stroke="#2dd4bf"
          stroke-width="1.4"
          stroke-dasharray="6 5"
          opacity="0.55"
        />
        <path
          :d="geom.aPath"
          fill="none"
          stroke="#e2a846"
          stroke-width="3.6"
          stroke-linecap="round"
        />
        <path
          :d="geom.bPath"
          fill="none"
          stroke="#60a5fa"
          stroke-width="3.6"
          stroke-linecap="round"
        />
        <line
          :x1="LEGEND.segFrom"
          :y1="LEGEND.rowA"
          :x2="LEGEND.segTo"
          :y2="LEGEND.rowA"
          stroke="#e2a846"
          stroke-width="3.6"
          stroke-linecap="round"
        />
        <line
          :x1="LEGEND.segFrom"
          :y1="LEGEND.rowB"
          :x2="LEGEND.segTo"
          :y2="LEGEND.rowB"
          stroke="#60a5fa"
          stroke-width="3.6"
          stroke-linecap="round"
        />
        <text
          :x="LEGEND.textX"
          :y="LEGEND.rowA + 6"
          font-size="17"
          fill="#e2a846"
          stroke="#0f1425"
          stroke-width="3.5"
          paint-order="stroke"
        >
          A 自由落体
          <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
          <tspan font-family="KaTeX_Main">=</tspan>
          <tspan font-family="KaTeX_Math" font-style="italic">gt</tspan>
        </text>
        <text
          :x="LEGEND.textX"
          :y="LEGEND.rowB + 6"
          font-size="17"
          fill="#60a5fa"
          stroke="#0f1425"
          stroke-width="3.5"
          paint-order="stroke"
        >
          B 上抛
          <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
          <tspan font-family="KaTeX_Main">= 2</tspan>
          <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
          <tspan font-family="KaTeX_Main">−</tspan>
          <tspan font-family="KaTeX_Math" font-style="italic">gt</tspan>
        </text>
        <circle
          :cx="geom.cross.x"
          :cy="geom.cross.y"
          r="7"
          fill="#2dd4bf"
          stroke="#0f1425"
          stroke-width="2.5"
        />
        <circle
          :cx="geom.bEnd.x"
          :cy="geom.bEnd.y"
          r="5.5"
          fill="#60a5fa"
          stroke="#0f1425"
          stroke-width="2"
        />
        <text
          :x="geom.cross.x + 60"
          :y="geom.cross.y - 10"
          font-size="16"
          fill="#2dd4bf"
          stroke="#0f1425"
          stroke-width="3.5"
          paint-order="stroke"
        >
          相遇：两者速度大小都是
          <tspan font-family="KaTeX_Math" font-style="italic" dx="3">v</tspan>
        </text>
        <text
          :x="geom.bEnd.x + 10"
          :y="ORIGIN.y - 8"
          font-size="16"
          fill="#60a5fa"
          stroke="#0f1425"
          stroke-width="3.5"
          paint-order="stroke"
        >
          B 的最高点
        </text>
      </svg>
      <div class="em-side">
        <div class="em-slider">
          <div class="em-slider-head">
            <span>相遇时的共同速率</span>
            <strong class="text-accent"><Latex :tex="`v = ${speed}\\ \\text{m/s}`" /></strong>
          </div>
          <input v-model.number="speed" type="range" min="2" max="10" step="1" />
        </div>
        <div class="em-read">
          <div class="em-read-row">
            <span>B 的上抛初速度</span
            ><strong class="text-accent-2"
              ><Latex :tex="`2v = ${speedB.toFixed(0)}\\ \\text{m/s}`" />（向上）</strong
            >
          </div>
          <div class="em-read-row">
            <span>相遇所需时间</span
            ><strong><Latex :tex="`t = v/g = ${tMeet.toFixed(2)}\\ \\text{s}`" /></strong>
          </div>
          <div class="em-read-row">
            <span>相遇点离地高度</span
            ><strong><Latex :tex="`3v^2/(2g) = ${meetHeight.toFixed(2)}\\ \\text{m}`" /></strong>
          </div>
          <div class="em-read-row">
            <span>A 释放的高度</span
            ><strong><Latex :tex="`2v^2/g = ${heightA.toFixed(2)}\\ \\text{m}`" /></strong>
          </div>
          <div class="em-read-row">
            <span>B 上升的最大高度</span
            ><strong><Latex :tex="`2v^2/g = ${heightB.toFixed(2)}\\ \\text{m}`" /></strong>
          </div>
          <div class="em-read-row">
            <span>相遇前 A 下落</span
            ><strong><Latex :tex="`v^2/(2g) = ${dropA.toFixed(2)}\\ \\text{m}`" /></strong>
          </div>
          <div class="em-read-row">
            <span>相遇前 B 上升</span
            ><strong><Latex :tex="`3v^2/(2g) = ${riseB.toFixed(2)}\\ \\text{m}`" /></strong>
          </div>
        </div>
        <div class="em-note">
          A 释放的高度与 B 能上升的最大高度<strong class="text-accent">恰好相等</strong>； 相遇时 B
          还在上升途中（<Latex tex="t = v/g < 2v/g" />）；相遇前 A 下落与 B 上升的路程比恒为
          <Latex tex="1 : 3" />。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.em {
  min-width: 0;
}

.em-main {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 1.2rem;
  align-items: center;
}

/* 固定 viewBox + width:100%/height:auto ⇒ 拖滑块时组件高度恒定 */
.em-chart {
  display: block;
  width: 100%;
  min-width: 0;
  height: auto;
}

.em-side {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 0;
}

.em-slider-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  color: var(--c-text-dim);

  font-size: 0.82rem;
}

.em-slider input {
  width: 100%;
  accent-color: var(--c-accent);
}

.em-read {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  padding-left: 0.75rem;
  border-left: 3px solid var(--c-accent-2);
}

/* 读数行：值不换行（拖滑块时行数与高度都不变） */
.em-read-row {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  justify-content: space-between;

  color: var(--c-text-dim);

  font-size: 0.75rem;
  line-height: 1.22;
}

.em-read-row strong {
  flex: 0 0 auto;
  color: var(--c-text);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.em-note {
  color: var(--c-text-dim);
  font-size: 0.75rem;
  line-height: 1.45;
}
</style>
