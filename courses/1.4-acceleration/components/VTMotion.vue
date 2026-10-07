<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

/**
 * V-t 图像 + "点一下让小球沿图线运动"。
 *
 * 图线由 5 段直线组成（v 单位 m/s，t 轴画在 v = 0 处，负速度落在 t 轴下方）： 0–2 s 匀加速 v = 5t（a = +5）、2–3 s 加速度更大（a =
 * +12）、3–5 s 匀速（a = 0）、 5–7 s 匀减速（a = −8）、7–8 s 越过 t 轴后反向加速（a = −12）。
 *
 * 几何与读数全部由公式推出：x(t) = ORIGIN_X + t·SCALE_X、y(v) = ORIGIN_Y − v·SCALE_Y， 每段用 v = v0 + a(t − t0)
 * 求小球当前速度，用 v·a 的符号判断"加速 / 匀速 / 减速"。 当前段用高亮色重描一遍，并画出该段的 Δt / Δv 直角三角形 —— 斜边斜率就是 a。
 *
 * 触发方式是点组件本身（不占翻页点击）：播放中再点一次暂停、读数就地冻结，走完 8 s 后 再点重播。动画只改 SVG 内的 cx/cy 与读数文本，viewBox 固定，页面不会被顶动；
 * 读数栅格是固定列宽 + 等宽数字，数字位数变化也不会让整页上下抖。
 */

interface Segment {
  /** 该段起始时刻 (s) */
  startT: number;
  /** 该段结束时刻 (s) */
  endT: number;
  /** 起始速度 (m/s) */
  v0: number;
  /** 结束速度 (m/s) */
  v1: number;
  /** 该段加速度 (m/s²) */
  a: number;
}

/** 5 段图线（真实数值，相邻段端点速度已核对连续） */
const SEGMENTS: Segment[] = [
  { startT: 0, endT: 2, v0: 0, v1: 10, a: 5 },
  { startT: 2, endT: 3, v0: 10, v1: 22, a: 12 },
  { startT: 3, endT: 5, v0: 22, v1: 22, a: 0 },
  { startT: 5, endT: 7, v0: 22, v1: 6, a: -8 },
  { startT: 7, endT: 8, v0: 6, v1: -6, a: -12 },
];

/** T 轴总时长 (s) 与走完它的真实时长 (ms) */
const TOTAL_T = 8;
const PLAY_MS = 9000;

/**
 * SVG 几何（viewBox 用户单位，按 16px 体系）：原点、每 1 s / 1 m·s⁻¹ 对应的长度 注意：组件挂在半栏（约 420 px）里，viewBox 宽度就按 424 画
 * —— 缩放比≈1， 图内 15 px 的字渲染出来就是 15 px（本仓库要求"最后一排看得清"）。 SCALE_X 取 34：末段竖直直角边右侧还要放得下 "Δv = −12 m/s"（约
 * 78 单位）， x 方向压缩一点，标注才不会被 viewBox 右边界裁掉。
 */
const ORIGIN_X = 54;
const ORIGIN_Y = 200;
const SCALE_X = 34;
const SCALE_Y = 6.5;
/** 坐标轴箭头伸出最后一个刻度的长度、箭头三角形长度 */
const AXIS_EXTRA = 26;
const ARROW_LEN = 12;
const VIEW_W = 424;
const VIEW_H = 252;

/** 刻度位置 */
const T_TICKS = [2, 4, 6, 8];
const V_TICKS = [10, 20];

const xOf = (seconds: number): number => ORIGIN_X + seconds * SCALE_X;
const yOf = (v: number): number => ORIGIN_Y - v * SCALE_Y;

/** 两条轴的箭头尖端（t 轴伸出最后一格一点，v 轴高出 26 m/s 一点） */
const AXIS_END_X = xOf(TOTAL_T) + AXIS_EXTRA;
const AXIS_END_Y = yOf(26) - 8;

/**
 * 读数统一位数：−0.0 归一成 0.0、负号写成真正的减号，位数与字符都稳定
 *
 * @param value 原始数值
 * @param digits 保留的小数位数
 * @returns 定长读数字符串
 */
const fmt = (value: number, digits: number): string => {
  const text = value.toFixed(digits);

  return (Number(text) === 0 ? (0).toFixed(digits) : text).replace("-", "−");
};

const time = ref(0);
const playing = ref(false);

let frame = 0;
let lastTs = 0;

/** 小球当前所在段（t = 8 s 时停在最后一段） */
const activeIndex = computed(() => {
  const index = SEGMENTS.findIndex((seg) => time.value >= seg.startT && time.value < seg.endT);

  return index === -1 ? SEGMENTS.length - 1 : index;
});

const active = computed((): Segment => SEGMENTS[activeIndex.value]);

/** 该段速度公式 v = v0 + a(t − t0) 给出的瞬时速度 */
const velocity = computed(
  (): number => active.value.v0 + active.value.a * (time.value - active.value.startT),
);

const acceleration = computed((): number => active.value.a);

/** 运动状态只看 v·a 的符号：a = 0 匀速；同号加速（第 5 段 v、a 同为负，速度在变大）；异号减速 */
const state = computed((): { text: string; color: string } => {
  const v = velocity.value;
  const a = acceleration.value;

  if (a === 0) return { text: "匀速", color: "#94a3b8" };
  if (v === 0) return { text: "速度为零", color: "#94a3b8" };
  if (v * a > 0) return { text: "加速", color: "#e2a846" };

  return { text: "减速", color: "#60a5fa" };
});

const readout = computed(() => ({
  time: fmt(time.value, 2),
  speed: fmt(velocity.value, 1),
  accel: fmt(acceleration.value, 1),
}));

/** 整条折线：每段起点依次连线，最后补上终点的坐标 */
const curvePath = computed((): string => {
  const points = SEGMENTS.map((seg) => `${xOf(seg.startT)} ${yOf(seg.v0)}`);
  const last = SEGMENTS[SEGMENTS.length - 1];

  points.push(`${xOf(last.endT)} ${yOf(last.v1)}`);

  return `M ${points.join(" L ")}`;
});

/** 小球位置：横坐标取当前时刻，纵坐标取该时刻的速度（t 轴在 v = 0 处） */
const ball = computed(() => ({ x: xOf(time.value), y: yOf(velocity.value) }));

/**
 * 当前段的 Δt / Δv 直角三角形：直角顶点取 (t1, v0)，两条直角边分别是 Δt 与 Δv， 斜边就是该段图线本身。a = 0 的段退化成一条线，整组用 visibility
 * 隐掉（不删元素）。
 */
const triangle = computed(() => {
  const seg = active.value;
  const cornerX = xOf(seg.endT);
  const startY = yOf(seg.v0);
  const endY = yOf(seg.v1);
  /** 速度变小 → 斜边向下、直角边在图线下方，Δt 标注放到边上侧，反之放到下侧，都不压斜边 */
  const labelAbove = seg.v1 < seg.v0;

  return {
    visible: seg.a !== 0,
    dtLeg: { x1: xOf(seg.startT), y1: startY, x2: cornerX, y2: startY },
    dvLeg: { x1: cornerX, y1: startY, x2: cornerX, y2: endY },
    dtLabel: {
      x: (xOf(seg.startT) + cornerX) / 2 + (labelAbove ? 8 : 0),
      y: startY + (labelAbove ? -8 : 15),
      text: `Δt = ${fmt(seg.endT - seg.startT, 0)} s`,
    },
    dvLabel: {
      x: cornerX + 8,
      y: Math.min(startY, endY) + 20,
      text: `Δv = ${fmt(seg.v1 - seg.v0, 0)} m/s`,
    },
  };
});

/** 操作提示：只写给学生看，三种状态固定用词（不写"几秒""从头"这类细节） */
const hint = computed((): string => {
  if (playing.value) return "点击暂停";
  if (time.value >= TOTAL_T) return "点击重来";

  return "点击开始";
});

const step = (now: number): void => {
  if (lastTs === 0) lastTs = now;

  const elapsed = now - lastTs;

  lastTs = now;
  time.value = Math.min(TOTAL_T, time.value + (elapsed / PLAY_MS) * TOTAL_T);

  if (time.value >= TOTAL_T) {
    playing.value = false;
    frame = 0;

    return;
  }

  frame = requestAnimationFrame(step);
};

// 点组件本身：播放中→暂停（就地冻结读数）；走完了→从头重播；其余→继续
const toggle = (): void => {
  if (playing.value) {
    playing.value = false;
    cancelAnimationFrame(frame);
    frame = 0;

    return;
  }

  if (time.value >= TOTAL_T) time.value = 0;

  playing.value = true;
  lastTs = 0;
  frame = requestAnimationFrame(step);
};

onUnmounted(() => cancelAnimationFrame(frame));
</script>

<template>
  <div class="vt-wrap" @click="toggle">
    <svg class="vt-svg" :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`" role="img" aria-label="速度—时间图像">
      <!-- 坐标轴：箭头单独画成三角形，轴线缩回三角形底边以内，尖端正好落在轴端 -->
      <line
        :x1="ORIGIN_X"
        :y1="ORIGIN_Y"
        :x2="AXIS_END_X - 6"
        :y2="ORIGIN_Y"
        stroke="#64748b"
        stroke-width="2"
      />
      <path
        :d="`M ${AXIS_END_X - ARROW_LEN} ${ORIGIN_Y - 6} L ${AXIS_END_X} ${ORIGIN_Y} L ${AXIS_END_X - ARROW_LEN} ${ORIGIN_Y + 6} Z`"
        fill="#64748b"
      />
      <line
        :x1="ORIGIN_X"
        :y1="ORIGIN_Y"
        :x2="ORIGIN_X"
        :y2="AXIS_END_Y + 6"
        stroke="#64748b"
        stroke-width="2"
      />
      <path
        :d="`M ${ORIGIN_X - 6} ${AXIS_END_Y + ARROW_LEN} L ${ORIGIN_X} ${AXIS_END_Y} L ${ORIGIN_X + 6} ${AXIS_END_Y + ARROW_LEN} Z`"
        fill="#64748b"
      />
      <!-- 刻度：短线紧贴轴、向图内伸出 -->
      <g stroke="#475569" stroke-width="1.6">
        <line
          v-for="tick in T_TICKS"
          :key="`tk-t-${tick}`"
          :x1="xOf(tick)"
          :y1="ORIGIN_Y"
          :x2="xOf(tick)"
          :y2="ORIGIN_Y + 7"
        />
        <line
          v-for="tick in V_TICKS"
          :key="`tk-v-${tick}`"
          :x1="ORIGIN_X"
          :y1="yOf(tick)"
          :x2="ORIGIN_X + 7"
          :y2="yOf(tick)"
        />
      </g>
      <!-- 刻度值：t 轴标 2/4/6/8，v 轴标 0/10/20，单位写在轴标签里 -->
      <g style="font-size: 15px" fill="#94a3b8" text-anchor="end">
        <text :x="ORIGIN_X - 10" :y="ORIGIN_Y + 5">0</text>
        <text v-for="tick in V_TICKS" :key="`lb-v-${tick}`" :x="ORIGIN_X - 10" :y="yOf(tick) + 5">
          {{ tick }}
        </text>
      </g>
      <g style="font-size: 15px" fill="#94a3b8" text-anchor="middle">
        <text v-for="tick in T_TICKS" :key="`lb-t-${tick}`" :x="xOf(tick)" :y="ORIGIN_Y + 22">
          {{ tick }}
        </text>
      </g>
      <!-- 轴标签：O 在交点左下，t 在轴下方、v 在轴上方，都用斜体数学字体 -->
      <text
        :x="ORIGIN_X - 10"
        :y="ORIGIN_Y + 22"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        style="font-size: 20px"
        fill="#94a3b8"
      >
        O
      </text>
      <text
        :x="ORIGIN_X"
        :y="AXIS_END_Y - 9"
        text-anchor="middle"
        style="font-size: 15px"
        fill="#94a3b8"
      >
        <tspan font-family="KaTeX_Math" font-style="italic" style="font-size: 20px">v</tspan>
        <tspan>/(m·s⁻¹)</tspan>
      </text>
      <text
        :x="AXIS_END_X"
        :y="ORIGIN_Y + 22"
        text-anchor="middle"
        style="font-size: 15px"
        fill="#94a3b8"
      >
        <tspan font-family="KaTeX_Math" font-style="italic" style="font-size: 20px">t</tspan>
        <tspan>/s</tspan>
      </text>
      <!-- 整条 v-t 图线（非当前段淡一些） -->
      <path
        :d="curvePath"
        fill="none"
        stroke="#2dd4bf"
        stroke-width="2.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.45"
      />
      <!-- 当前段高亮 -->
      <line
        :x1="xOf(active.startT)"
        :y1="yOf(active.v0)"
        :x2="xOf(active.endT)"
        :y2="yOf(active.v1)"
        stroke="#e2a846"
        stroke-width="3.4"
        stroke-linecap="round"
      />
      <!-- 当前段的 Δt / Δv 直角边：斜率 = Δv / Δt = a；a = 0 的段没有三角形 -->
      <g :visibility="triangle.visible ? 'visible' : 'hidden'">
        <line
          :x1="triangle.dtLeg.x1"
          :y1="triangle.dtLeg.y1"
          :x2="triangle.dtLeg.x2"
          :y2="triangle.dtLeg.y2"
          stroke="#e2a846"
          stroke-width="1.8"
          stroke-dasharray="6 4"
          opacity="0.85"
        />
        <line
          :x1="triangle.dvLeg.x1"
          :y1="triangle.dvLeg.y1"
          :x2="triangle.dvLeg.x2"
          :y2="triangle.dvLeg.y2"
          stroke="#e2a846"
          stroke-width="1.8"
          stroke-dasharray="6 4"
          opacity="0.85"
        />
        <text
          :x="triangle.dtLabel.x"
          :y="triangle.dtLabel.y"
          text-anchor="middle"
          style="font-size: 13px"
          fill="#e2a846"
          stroke="#0f1425"
          stroke-width="4"
          paint-order="stroke"
        >
          {{ triangle.dtLabel.text }}
        </text>
        <text
          :x="triangle.dvLabel.x"
          :y="triangle.dvLabel.y"
          style="font-size: 13px"
          fill="#e2a846"
          stroke="#0f1425"
          stroke-width="4"
          paint-order="stroke"
        >
          {{ triangle.dvLabel.text }}
        </text>
      </g>
      <!-- 小球到 t 轴的竖直虚线：直接读出该时刻的 v -->
      <line
        :x1="ball.x"
        :y1="ball.y"
        :x2="ball.x"
        :y2="ORIGIN_Y"
        stroke="#e2a846"
        stroke-width="1.6"
        stroke-dasharray="5 4"
        opacity="0.8"
      />
      <circle :cx="ball.x" :cy="ball.y" r="7" fill="#e2a846" stroke="#0f1425" stroke-width="2" />
    </svg>

    <div class="vt-panel">
      <div class="vt-readout">
        <div class="vt-cell">
          <span class="vt-key"><span class="vt-sym">t</span> =</span>
          <span class="vt-val">{{ readout.time }}<span class="vt-unit">s</span></span>
        </div>
        <div class="vt-cell">
          <span class="vt-key"><span class="vt-sym">v</span> =</span>
          <span class="vt-val">{{ readout.speed }}<span class="vt-unit">m/s</span></span>
        </div>
        <div class="vt-cell">
          <span class="vt-key"><span class="vt-sym">a</span> =</span>
          <span class="vt-val">{{ readout.accel }}<span class="vt-unit">m/s²</span></span>
        </div>
        <div class="vt-cell">
          <span class="vt-key">运动状态</span>
          <span class="vt-val" :style="{ color: state.color }">{{ state.text }}</span>
        </div>
      </div>
      <p class="vt-hint">{{ hint }}</p>
    </div>
  </div>
</template>

<style scoped>
/* 宽度写死：否则组件宽度会跟着读数文字的宽窄变化，SVG 的 width:100% 会跟着缩放，整块图疯狂大小抖动 */
.vt-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 0;
  max-width: 420px;

  cursor: pointer;
  user-select: none;
}

.vt-svg {
  display: block;

  width: 100%;
  max-width: 420px;
  height: auto;
  border: 1px solid rgb(148 163 184 / 10%);
  border-radius: 1.25rem;

  background: rgb(15 20 37 / 40%);
}

.vt-panel {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;

  width: 100%;
  min-width: 0;
}

/* 固定列宽 + 等宽数字 + 不换行：读数位数变化不会撑动栅格，整页不会上下抖。
   2×2 排布是为了塞进约 420px 宽的半栏（4 列并排要 522px，会横向溢出）。 */
.vt-readout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.45rem;
  justify-content: center;

  width: 100%;
  max-width: 420px;

  font-variant-numeric: tabular-nums;
}

/* 每个读数写成一行（"t = 8.00 s"），列宽固定，位数变化不会抖 */
.vt-cell {
  display: flex;
  flex-direction: row;
  gap: 0.35rem;
  align-items: baseline;
  justify-content: center;

  min-width: 0;
  padding: 0.3rem 0.35rem;
  border: 1px solid rgb(148 163 184 / 18%);
  border-radius: 0.9rem;

  background: rgb(30 41 59 / 65%);
}

/* 物理量符号用数学斜体（与课件里的公式一致） */
.vt-sym {
  font-style: italic;
  font-size: 1.05em;
  font-family: "KaTeX_Math", "Times New Roman", serif;
}

.vt-key {
  color: #94a3b8;
  font-size: 0.78rem;
  line-height: 1.2;
  white-space: nowrap;
}

.vt-val {
  color: #f1f5f9;

  font-weight: 700;
  font-size: 1.15rem;
  line-height: 1.25;
  white-space: nowrap;
}

.vt-unit {
  margin-left: 0.12rem;

  color: #94a3b8;

  font-weight: 400;
  font-style: normal;
  font-size: 0.7rem;
}

.vt-hint {
  margin: 0;
  color: #94a3b8;
  font-size: 0.78rem;
  line-height: 1.2;
}
</style>
