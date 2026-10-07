<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 正交分解：滑杆（或拖动箭头尖端）改变矢量 a = (x, y)，实时把 a 拆成"沿 x 轴的 x 个单位向量 i" + "沿 y 轴的 y 个单位向量 j"。默认给 (4,
 * 3)，对应课上"把矢量抽象成 (4, 3)"这一步科学简化。
 *
 * 坐标轴 / 网格 / 刻度 / O / 轴量标签交给共享 `CoordAxes`；单位向量 i、j、分量箭头、投影虚线、拖拽热区与 文字标注留在本组件、画在 `#overlay`
 * 插槽里（`x()`/`y()` 由组件给出数据坐标映射，指针反算走 `plot`）。
 */

interface Point {
  x: number;
  y: number;
}

/** 绘图区四边（viewBox 用户单位，由 `#overlay` 插槽给出） */
interface PlotArea {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface ViewBox {
  width: number;
  height: number;
}

/** 横轴 ±5.5、纵轴 ±4.4：分量活动范围是 ±4，两端都给箭头留了余量（刻度到 ±4 / ±2） */
const X_MIN = -5.5;
const X_MAX = 5.5;
const Y_MIN = -4.4;
const Y_MAX = 4.4;
const TICKS = [-4, -2, 2, 4];
/** ViewBox 尺寸：高度从旧图的 400 提到 416——组件要给顶部轴量标签与刻度数字留位置， 补上之后绘图区的横纵比例回到 1:1（单位向量 i、j 在屏幕上等长），旧图正是 1:1 的。 */
const VIEW = { width: 480, height: 416 };
/** 分量的活动范围 */
const MAX_V = 4;
/** 拖拽热区半径（屏幕 px，按 `px2user` 折成 viewBox 用户单位） */
const GRAB_PX = 22;

const x = ref(4);
const y = ref(3);
const dragging = ref(false);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const format = (value: number): string => (Number.isInteger(value) ? `${value}` : value.toFixed(1));

/**
 * 指针位置 → 坐标平面上的整数格点
 *
 * @param event 指针事件
 * @param plot 绘图区四边（viewBox 用户单位）
 * @param view ViewBox 尺寸
 * @returns 整数格点；SVG 还没量到尺寸时返回 null
 */
const pointerToUnit = (event: PointerEvent, plot: PlotArea, view: ViewBox): Point | null => {
  const svg = (event.currentTarget as SVGElement).ownerSVGElement;

  if (!svg) return null;

  const rect = svg.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) return null;

  const pointerX = ((event.clientX - rect.left) / rect.width) * view.width;
  const pointerY = ((event.clientY - rect.top) / rect.height) * view.height;

  return {
    x: clamp(
      Math.round(X_MIN + ((pointerX - plot.left) / (plot.right - plot.left)) * (X_MAX - X_MIN)),
      -MAX_V,
      MAX_V,
    ),
    y: clamp(
      Math.round(Y_MAX - ((pointerY - plot.top) / (plot.bottom - plot.top)) * (Y_MAX - Y_MIN)),
      -MAX_V,
      MAX_V,
    ),
  };
};

const onPointerMove = (event: PointerEvent, plot: PlotArea, view: ViewBox): void => {
  if (!dragging.value) return;

  const point = pointerToUnit(event, plot, view);

  if (!point) return;

  x.value = point.x;
  y.value = point.y;
};

const startDrag = (event: PointerEvent): void => {
  dragging.value = true;
  (event.target as Element).setPointerCapture(event.pointerId);
};

const endDrag = (): void => {
  dragging.value = false;
};

/** 沿 x 轴：x 个单位向量 i 首尾相接（数据坐标，画的时候再换成用户单位） */
const xUnits = computed<{ from: Point; to: Point }[]>(() => {
  const sign = Math.sign(x.value);

  return Array.from({ length: Math.abs(x.value) }, (_, k) => ({
    from: { x: sign * k, y: 0 },
    to: { x: sign * (k + 1), y: 0 },
  }));
});

/** 沿 y 轴：y 个单位向量 j 首尾相接 */
const yUnits = computed<{ from: Point; to: Point }[]>(() => {
  const sign = Math.sign(y.value);

  return Array.from({ length: Math.abs(y.value) }, (_, k) => ({
    from: { x: 0, y: sign * k },
    to: { x: 0, y: sign * (k + 1) },
  }));
});

const decomposeTex = computed<string>(
  () =>
    `\\vec{a} = ${format(x.value)}\\,\\vec{i} + ${format(y.value)}\\,\\vec{j} = (${format(x.value)},\\;${format(y.value)})`,
);
const magnitudeTex = computed<string>(
  () =>
    `|\\vec{a}| = \\sqrt{${format(x.value)}^2 + ${format(y.value)}^2} = ${Math.hypot(x.value, y.value).toFixed(2)}`,
);
const xTex = computed<string>(() => `x\\,\\vec{i} = (${format(x.value)},\\;0)`);
const yTex = computed<string>(() => `y\\,\\vec{j} = (0,\\;${format(y.value)})`);

/** 图内标注走 `labels`（HTML + 真 KaTeX）：单位向量名、两个分量与合矢量 */
const labels = computed(() => {
  const items = [
    {
      x: 1,
      y: 0,
      tex: "\\vec{i}",
      anchor: "bottom-left" as const,
      color: "var(--c-text-dim)",
      size: 15,
    },
    {
      x: 0,
      y: 1,
      tex: "\\vec{j}",
      anchor: "bottom-left" as const,
      color: "var(--c-text-dim)",
      size: 15,
    },
    {
      x: x.value / 2,
      y: y.value / 2,
      tex: "a",
      anchor: "top-right" as const,
      color: "var(--c-accent)",
      size: 19,
      halo: true,
    },
  ];

  // 两个分量的式子：贴着各自的轴外侧，避开轴上的刻度数字
  if (x.value !== 0) {
    items.push({
      x: x.value / 2,
      y: 0,
      tex: `x\\,\\vec{i} = ${format(x.value)}\\,\\vec{i}`,
      anchor: "center" as const,
      dy: 44,
      color: "var(--c-physics)",
      size: 15,
      halo: true,
    });
  }

  if (y.value !== 0) {
    items.push({
      x: 0,
      y: y.value / 2,
      tex: `y\\,\\vec{j} = ${format(y.value)}\\,\\vec{j}`,
      anchor: "right" as const,
      dx: -22,
      color: "var(--c-accent-2)",
      size: 15,
      halo: true,
    });
  }

  return items;
});
</script>

<template>
  <div class="od-wrap">
    <div class="od-figure">
      <CoordAxes
        :x-range="[X_MIN, X_MAX]"
        :y-range="[Y_MIN, Y_MAX]"
        :x-axis="{ quantity: 'x' }"
        :y-axis="{ quantity: 'y' }"
        :ticks="{ x: TICKS, y: TICKS, grid: true, gridStep: 1, direction: 'cross' }"
        :view="VIEW"
        :labels="labels"
      >
        <template #overlay="{ x: toUserX, y: toUserY, plot, px2user, width, height }">
          <!-- 单位向量 i、j（灰色，长度各 1 个单位） -->
          <CourseArrow
            :from="{ x: toUserX(0), y: toUserY(0) }"
            :to="{ x: toUserX(1), y: toUserY(0) }"
            :head-size="9"
            stroke="var(--c-text-dim)"
            stroke-width="2"
            pointer-events="none"
          />
          <CourseArrow
            :from="{ x: toUserX(0), y: toUserY(0) }"
            :to="{ x: toUserX(0), y: toUserY(1) }"
            :head-size="9"
            stroke="var(--c-text-dim)"
            stroke-width="2"
            pointer-events="none"
          />

          <!-- 投影辅助线：尖端到两条轴 -->
          <g
            stroke="var(--c-text-dim)"
            stroke-width="1"
            stroke-dasharray="4 4"
            opacity="0.5"
            pointer-events="none"
          >
            <line :x1="toUserX(x)" :y1="toUserY(y)" :x2="toUserX(x)" :y2="toUserY(0)" />
            <line :x1="toUserX(x)" :y1="toUserY(y)" :x2="toUserX(0)" :y2="toUserY(y)" />
          </g>

          <!-- x 分量：x 个单位向量 i 首尾相接 -->
          <CourseArrow
            v-for="(unit, index) in xUnits"
            :key="`xu${index}`"
            :from="{ x: toUserX(unit.from.x), y: toUserY(unit.from.y) }"
            :to="{ x: toUserX(unit.to.x), y: toUserY(unit.to.y) }"
            :head-size="9"
            stroke="var(--c-physics)"
            stroke-width="3"
            pointer-events="none"
          />

          <!-- y 分量：y 个单位向量 j 首尾相接 -->
          <CourseArrow
            v-for="(unit, index) in yUnits"
            :key="`yu${index}`"
            :from="{ x: toUserX(unit.from.x), y: toUserY(unit.from.y) }"
            :to="{ x: toUserX(unit.to.x), y: toUserY(unit.to.y) }"
            :head-size="9"
            stroke="var(--c-accent-2)"
            stroke-width="3"
            pointer-events="none"
          />

          <!-- 合矢量 a -->
          <CourseArrow
            :from="{ x: toUserX(0), y: toUserY(0) }"
            :to="{ x: toUserX(x), y: toUserY(y) }"
            :head-size="12"
            stroke="var(--c-accent)"
            stroke-width="3.4"
            pointer-events="none"
          />
          <circle
            :cx="toUserX(x)"
            :cy="toUserY(y)"
            r="4"
            fill="var(--c-accent)"
            pointer-events="none"
          />
          <circle
            :cx="toUserX(x)"
            :cy="toUserY(y)"
            :r="GRAB_PX * px2user"
            fill="transparent"
            class="od-grab"
            @pointerdown="startDrag"
            @pointermove="onPointerMove($event, plot, { width, height })"
            @pointerup="endDrag"
            @pointercancel="endDrag"
          />
        </template>
      </CoordAxes>
    </div>

    <div class="od-info">
      <div class="od-formula"><Latex :tex="decomposeTex" /></div>
      <div class="od-row">
        <span class="od-dot od-dot-teal" />沿 x 轴：<Latex :tex="xTex" />（{{ Math.abs(x) }} 个
        <Latex tex="\vec{i}" /> 相加）
      </div>
      <div class="od-row">
        <span class="od-dot od-dot-blue" />沿 y 轴：<Latex :tex="yTex" />（{{ Math.abs(y) }} 个
        <Latex tex="\vec{j}" /> 相加）
      </div>
      <div class="od-key">两个分量互相垂直，算完再拼回来</div>
      <div class="od-row od-row-dim">模：<Latex :tex="magnitudeTex" /></div>
      <div class="od-hint"><mdi-gesture-tap /> 拖动箭头尖端 / 拖滑杆改变 (x, y)</div>

      <div class="od-controls">
        <label class="od-slider">
          <span class="od-slider-label">x</span>
          <input v-model.number="x" type="range" min="-4" max="4" step="1" />
          <span class="od-slider-val">{{ format(x) }}</span>
        </label>
        <label class="od-slider">
          <span class="od-slider-label">y</span>
          <input v-model.number="y" type="range" min="-4" max="4" step="1" />
          <span class="od-slider-val">{{ format(y) }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.od-wrap {
  display: flex;
  gap: 1rem;
  align-items: center;
}

/* 图的外壳（轴与刻度在 CoordAxes 里）：与旧手写 SVG 同一套边框 / 底色 */
.od-figure {
  display: block;
  flex: 1 1 56%;

  min-width: 0;
  max-width: 18.5rem;
  border: 1px solid rgb(148 163 184 / 12%);
  border-radius: 1.25rem;

  background: rgb(15 20 37 / 45%);

  touch-action: none;
}

.od-grab {
  cursor: grab;
  touch-action: none;
}

.od-grab:active {
  cursor: grabbing;
}

.od-info {
  display: flex;
  flex: 1 1 44%;
  flex-direction: column;
  gap: 0.45rem;

  min-width: 0;

  font-size: 0.95rem;
  line-height: 1.6;
}

.od-formula {
  display: flex;
  align-items: center;
}

.od-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
}

.od-row-dim {
  color: var(--c-text-dim);
  font-size: 0.82rem;
}

.od-dot {
  flex-shrink: 0;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
}

.od-dot-teal {
  background: var(--c-physics);
}

.od-dot-blue {
  background: var(--c-accent-2);
}

.od-key {
  padding-left: 0.75rem;
  border-left: 3px solid var(--c-accent);
  font-size: 0.95rem;
  line-height: 1.65;
}

.od-hint {
  display: flex;
  gap: 0.4rem;
  align-items: center;

  color: var(--c-text-dim);

  font-size: 0.78rem;

  opacity: 0.85;
}

.od-controls {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.15rem;
}

.od-slider {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.od-slider-label {
  width: 0.9rem;

  color: var(--c-accent);

  font-style: italic;
  font-size: 0.9rem;
  font-family: "KaTeX_Math", serif;
}

.od-slider-val {
  width: 1.2rem;
  color: var(--c-text-dim);
  font-size: 0.78rem;
  text-align: right;
}

.od-slider input[type="range"] {
  flex: 1;

  min-width: 0;
  height: 4px;
  border-radius: 2rem;

  background: rgb(148 163 184 / 20%);
  outline: none;

  cursor: pointer;

  appearance: none;
}

.od-slider input[type="range"]::-webkit-slider-thumb {
  width: 13px;
  height: 13px;
  border: 2px solid var(--c-bg-soft);
  border-radius: 50%;

  background: var(--c-accent);

  cursor: pointer;

  appearance: none;
}
</style>
