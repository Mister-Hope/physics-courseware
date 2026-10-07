<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * X-t 图像上"割线斜率 → 切线斜率"的演示。
 *
 * 曲线取 x = ½·a·t²（a = 1 m/s²，v = a·t），本节只把它当"某物体的 x-t 图像"用， 不涉及加速度概念：A 点固定（要研究的某一时刻），B 点可拖，割线 AB
 * 的斜率实时给出平均速度； B 越靠近 A，割线越接近 A 点的切线。
 *
 * 坐标轴 / 刻度 / O / 轴量标签交给共享 `CoordAxes`；曲线、割线、切线、Δ 直角边、A/B 两点与拖拽热区 留在本组件，画在 `#overlay` 插槽里（按 viewBox
 * 用户单位作图，`x()`/`y()` 由组件给出数据坐标映射）。
 *
 * 两个刻意的设计：
 *
 * 1. 坐标范围与旧手写 SVG 一致（横轴 0–5 s、纵轴 0–13.2 m，刻度到 4 s / 10 m），比例取 400×260， 放进左右两栏的窄栏里也能放得足够大——图像本身 +
 *    A/B/Δt/Δx 这些标注都要让学生在后排看清。
 * 2. 读数区用固定 2 列栅格 + 等宽数字：拖动时数字位数变化不能让组件高度变，否则整页会抖。
 */
const ACC = 1;
/** A 点所在时刻（固定） */
const TIME_A = 1;
const TIME_MAX = 5;
/** 坐标范围（旧手写 SVG 反推：横轴 0–5 s，纵轴 0–13.2 m） */
const X_MIN = 0;
const X_MAX = 5;
const Y_MIN = 0;
const Y_MAX = 13.2;
/** ViewBox 尺寸（只决定比例；字号由组件按实测宽度自适应） */
const VIEW_WIDTH = 400;
const VIEW_HEIGHT = 260;

/** B 点所在时刻，拖动改变 */
const timeB = ref(3.4);
const dragging = ref(false);
const showTangent = ref(false);

const posOf = (time: number): number => 0.5 * ACC * time * time;

const pointA = computed(() => ({ time: TIME_A, pos: posOf(TIME_A) }));
const pointB = computed(() => ({ time: timeB.value, pos: posOf(timeB.value) }));

/** A 点的切线：斜率就是该点的瞬时速度 v = a·t */
const tangent = computed(() => {
  const slope = ACC * TIME_A;
  const startT = TIME_A - 0.4;
  const endT = TIME_A + 1.2;

  return {
    startTime: startT,
    startPos: pointA.value.pos + slope * (startT - TIME_A),
    endTime: endT,
    endPos: pointA.value.pos + slope * (endT - TIME_A),
  };
});

const deltaTime = computed(() => pointB.value.time - pointA.value.time);
const deltaPos = computed(() => pointB.value.pos - pointA.value.pos);
const averageV = computed(() => deltaPos.value / deltaTime.value);
const instantV = computed(() => ACC * TIME_A);

/** 点标注走 HTML 覆盖层（真 KaTeX）：A/B 用 text，Δt/Δx 用 tex */
const labels = computed(() => [
  {
    x: pointA.value.time,
    y: pointA.value.pos,
    text: "A",
    anchor: "top-left" as const,
    color: "var(--c-accent)",
    halo: true,
    size: 19,
  },
  {
    x: pointB.value.time,
    y: pointB.value.pos,
    text: "B",
    anchor: "top-right" as const,
    color: "var(--c-accent-2)",
    halo: true,
    size: 19,
  },
  {
    x: (pointA.value.time + pointB.value.time) / 2,
    y: Y_MIN,
    tex: "\\Delta t",
    anchor: "center" as const,
    dy: 42,
    color: "var(--c-text)",
    halo: true,
    size: 18,
  },
  {
    x: pointB.value.time,
    y: (pointA.value.pos + pointB.value.pos) / 2,
    tex: "\\Delta x",
    anchor: "right" as const,
    color: "var(--c-text)",
    halo: true,
    size: 18,
  },
]);

/** 绘图区四边（viewBox 用户单位），由 `#overlay` 插槽在模板里传进来 */
interface PlotArea {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

// 指针位置 → B 点时刻：
// `plot` 来自 `#overlay` 插槽；先把客户端 x 换算成 viewBox 用户单位（整个 SVG 等比铺满 viewBox 宽），
// 再按绘图区左右边界线性映射到 `[X_MIN, X_MAX]`。
const moveTo = (event: PointerEvent, plot: PlotArea): void => {
  const svg = (event.currentTarget as SVGElement).ownerSVGElement;

  if (!svg) return;

  const rect = svg.getBoundingClientRect();

  if (rect.width === 0) return;

  const userX = ((event.clientX - rect.left) / rect.width) * VIEW_WIDTH;
  const time = X_MIN + ((userX - plot.left) / (plot.right - plot.left)) * (X_MAX - X_MIN);

  timeB.value = Math.min(TIME_MAX, Math.max(TIME_A + 0.15, Math.round(time * 100) / 100));
};

const handleDown = (event: PointerEvent, plot: PlotArea): void => {
  dragging.value = true;
  (event.currentTarget as Element).setPointerCapture(event.pointerId);
  moveTo(event, plot);
};

const handleMove = (event: PointerEvent, plot: PlotArea): void => {
  if (dragging.value) moveTo(event, plot);
};

const handleUp = (): void => {
  dragging.value = false;
};
</script>

<template>
  <div class="xt-wrap">
    <CoordAxes
      :x-range="[X_MIN, X_MAX]"
      :y-range="[Y_MIN, Y_MAX]"
      :x-axis="{ quantity: 't' }"
      :y-axis="{ quantity: 'x' }"
      :ticks="{ x: [1, 2, 3, 4], y: [2.5, 5, 7.5, 10], labels: false }"
      :view="{ width: VIEW_WIDTH, height: VIEW_HEIGHT }"
      :curves="[{ formula: (t) => 0.5 * ACC * t * t, stroke: 'var(--c-physics)', width: 3 }]"
      :labels="labels"
    >
      <template #overlay="{ x, y, plot }">
        <!-- Δt、Δx 两个直角边 -->
        <g
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="6 4"
          opacity="0.85"
          pointer-events="none"
        >
          <line :x1="x(pointA.time)" :y1="y(pointA.pos)" :x2="x(pointB.time)" :y2="y(pointA.pos)" />
          <line :x1="x(pointB.time)" :y1="y(pointA.pos)" :x2="x(pointB.time)" :y2="y(pointB.pos)" />
        </g>

        <!-- 切线（A 点的瞬时速度） -->
        <line
          v-if="showTangent"
          :x1="x(tangent.startTime)"
          :y1="y(tangent.startPos)"
          :x2="x(tangent.endTime)"
          :y2="y(tangent.endPos)"
          stroke="var(--c-accent)"
          stroke-width="2.6"
          stroke-dasharray="8 5"
          pointer-events="none"
        />

        <!-- 割线 AB（平均速度） -->
        <line
          :x1="x(pointA.time)"
          :y1="y(pointA.pos)"
          :x2="x(pointB.time)"
          :y2="y(pointB.pos)"
          stroke="var(--c-accent-2)"
          stroke-width="3"
          stroke-linecap="round"
          pointer-events="none"
        />

        <!-- A 点 / B 点 -->
        <circle
          :cx="x(pointA.time)"
          :cy="y(pointA.pos)"
          r="6"
          fill="var(--c-accent)"
          pointer-events="none"
        />
        <circle
          :cx="x(pointB.time)"
          :cy="y(pointB.pos)"
          r="6"
          fill="var(--c-accent-2)"
          pointer-events="none"
        />

        <!-- B 点拖拽热区（r=22） -->
        <circle
          :cx="x(pointB.time)"
          :cy="y(pointB.pos)"
          r="22"
          fill="transparent"
          class="grab"
          @pointerdown="handleDown($event, plot)"
          @pointermove="handleMove($event, plot)"
          @pointerup="handleUp"
          @pointercancel="handleUp"
        />
      </template>
    </CoordAxes>

    <div class="readout">
      <span class="chip">
        <span class="chip-k">Δt</span>
        <span class="chip-v">{{ deltaTime.toFixed(2) }} s</span>
      </span>
      <span class="chip">
        <span class="chip-k">Δx</span>
        <span class="chip-v">{{ deltaPos.toFixed(2) }} m</span>
      </span>
      <span class="chip chip-blue">
        <span class="chip-k">割线斜率</span>
        <span class="chip-v">{{ averageV.toFixed(2) }} m/s</span>
      </span>
      <span class="chip chip-gold">
        <span class="chip-k">切线斜率</span>
        <span class="chip-v">{{ instantV.toFixed(2) }} m/s</span>
      </span>
    </div>

    <button class="toggle" type="button" @click="showTangent = !showTangent">
      {{ showTangent ? "隐藏切线" : "显示切线" }}
    </button>
  </div>
</template>

<style scoped>
.xt-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;

  min-width: 0;
}

.grab {
  cursor: grab;
  touch-action: none;
}

.grab:active {
  cursor: grabbing;
}

/* 固定 2 列栅格 + 等宽数字：拖动 B 点时读数变化不会撑高组件（否则整页会抖） */
.readout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.32rem 0.55rem;

  width: 100%;
  max-width: 620px;

  font-variant-numeric: tabular-nums;
}

.chip {
  display: flex;
  gap: 0.4rem;
  align-items: baseline;
  justify-content: space-between;

  min-height: 1.85rem;
  padding: 0.18rem 0.65rem;
  border: 1px solid rgb(148 163 184 / 18%);
  border-radius: 999px;

  background: rgb(30 41 59 / 65%);

  font-size: 0.82rem;
  white-space: nowrap;
}

.chip-k {
  color: #94a3b8;
}

.chip-v {
  color: #f1f5f9;
  font-weight: 700;
}

.chip-blue {
  border-color: rgb(96 165 250 / 45%);
}

.chip-blue .chip-v {
  color: #60a5fa;
}

.chip-gold {
  border-color: rgb(226 168 70 / 45%);
}

.chip-gold .chip-v {
  color: #e2a846;
}

.toggle {
  padding: 0.22rem 0.75rem;
  border: 1px solid rgb(226 168 70 / 50%);
  border-radius: 999px;

  background: transparent;
  color: #e2a846;

  font-size: 0.82rem;

  cursor: pointer;
}

.toggle:hover {
  background: rgb(226 168 70 / 12%);
}
</style>
