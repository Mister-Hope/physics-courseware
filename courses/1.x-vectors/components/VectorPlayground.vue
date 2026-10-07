<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, ref } from "vue";

/**
 * 平面直角坐标系里的矢量：拖动箭头尖端改变矢量；拖动蓝色箭头的起点，把"同一个矢量"平移到任意位置。
 *
 * 页面按点击分三步（frontmatter 写 `clicks: 3`）：① 出坐标图 ② 出右侧读数 ③ 最后出结论"两条箭头只是起点不同"。
 *
 * 坐标轴 / 网格 / 刻度 / O / x、y 轴量标签全部交给共享 `CoordAxes`；矢量箭头、投影虚线、拖拽热区与文字标注 留在本组件、画在 `#overlay` 插槽里：插槽给
 * `x()`/`y()`（数据坐标 → viewBox 用户单位）与 `plot` / `px2user` / `width` / `height`，指针位置的反算也走它们，不在插槽里放
 * ref、不用 DOM 量取。
 */
const { copy = true } = defineProps<{ copy?: boolean }>();

const { $clicks } = useSlideContext();

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

/** 数据范围照搬旧手写 SVG：横轴 ±5、纵轴 ±3.6（刻度到 ±4 / ±2，末端箭头都留了余量） */
const X_MIN = -5;
const X_MAX = 5;
const Y_MIN = -3.6;
const Y_MAX = 3.6;
const TICKS_X = [-4, -2, 2, 4];
const TICKS_Y = [-2, 2];
/**
 * ViewBox 尺寸：高度从旧图的 340 提到 352——组件要给顶部轴量标签与刻度数字留位置， 绘图区比旧图矮一点；补上这 12 个用户单位后横纵比例回到 1:1 附近（误差 <
 * 3%），箭头方向不失真。
 */
const VIEW = { width: 460, height: 352 };
/** 原点矢量分量的活动范围 */
const MAX_V = 3;
/** 平移副本的尖端允许到达的格点范围（保证不出画） */
const COPY_TIP_X = 4;
const COPY_TIP_Y = 3;
/** 拖拽热区半径（屏幕 px，按 `px2user` 折成 viewBox 用户单位） */
const GRAB_PX = 22;

const vx = ref(3);
const vy = ref(2);
const startX = ref(1);
const startY = ref(-2);
const dragTarget = ref<"" | "tip" | "start">("");

const showCopy = computed<boolean>(() => copy);
const step = computed<number>(() => Math.max(0, Math.min($clicks.value, 3)));

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/**
 * 指针位置 → 坐标平面上的格点
 *
 * 先把客户端坐标按 SVG 的实测宽度折成 viewBox 用户单位，再按插槽给的 `plot` 四边线性映射回数据坐标。
 *
 * @param event 指针事件
 * @param plot 绘图区四边（viewBox 用户单位）
 * @param view ViewBox 尺寸
 * @returns 坐标平面上的格点；SVG 还没量到尺寸时返回 null
 */
const pointerToUnit = (
  event: PointerEvent,
  plot: PlotArea,
  view: ViewBox,
): { uCoord: number; v: number } | null => {
  const svg = (event.currentTarget as SVGElement).ownerSVGElement;

  if (!svg) return null;

  const rect = svg.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) return null;

  const pointerX = ((event.clientX - rect.left) / rect.width) * view.width;
  const pointerY = ((event.clientY - rect.top) / rect.height) * view.height;

  return {
    uCoord: X_MIN + ((pointerX - plot.left) / (plot.right - plot.left)) * (X_MAX - X_MIN),
    v: Y_MAX - ((pointerY - plot.top) / (plot.bottom - plot.top)) * (Y_MAX - Y_MIN),
  };
};

/**
 * 把"平移副本的尖端"放到格点上（副本起点随之确定，且保证不跑出画面）
 *
 * @param tipU 尖端所在格点的横坐标
 * @param tipV 尖端所在格点的纵坐标
 */
const placeCopyTip = (tipU: number, tipV: number): void => {
  startX.value = clamp(Math.round(tipU), -COPY_TIP_X, COPY_TIP_X) - vx.value;
  startY.value = clamp(Math.round(tipV), -COPY_TIP_Y, COPY_TIP_Y) - vy.value;
};

const onPointerMove = (event: PointerEvent, plot: PlotArea, view: ViewBox): void => {
  if (dragTarget.value === "") return;

  const point = pointerToUnit(event, plot, view);

  if (!point) return;

  if (dragTarget.value === "tip") {
    vx.value = clamp(Math.round(point.uCoord), -MAX_V, MAX_V);
    vy.value = clamp(Math.round(point.v), -MAX_V, MAX_V);
  } else {
    // 拖起点 = 拖整条副本：尖端随手走
    placeCopyTip(point.uCoord + vx.value, point.v + vy.value);
  }
};

const startDrag = (target: "tip" | "start", event: PointerEvent): void => {
  dragTarget.value = target;
  (event.target as Element).setPointerCapture(event.pointerId);
};

const endDrag = (): void => {
  dragTarget.value = "";
};

const magnitude = computed<number>(() => Math.hypot(vx.value, vy.value));

const vectorTex = computed<string>(() => `\\vec{a} = (${vx.value},\\;${vy.value})`);
const magnitudeTex = computed<string>(
  () => `|\\vec{a}| = \\sqrt{${vx.value}^2 + ${vy.value}^2} = ${magnitude.value.toFixed(2)}`,
);

const pointTex = (uCoord: number, v: number): string => `(${uCoord},\\ ${v})`;

/** 图内标注走 `labels`（HTML + 真 KaTeX）：矢量名与坐标读数，不写 Unicode 符号 */
const labels = computed(() => {
  const items = [
    {
      x: vx.value / 2,
      y: vy.value / 2,
      tex: "a",
      anchor: "top-right" as const,
      color: "var(--c-accent)",
      size: 19,
      halo: true,
      showAt: 1,
    },
    {
      x: vx.value,
      y: vy.value,
      tex: pointTex(vx.value, vy.value),
      anchor: "top-right" as const,
      color: "var(--c-accent)",
      size: 15,
      halo: true,
      showAt: 1,
    },
  ];

  if (showCopy.value) {
    items.push(
      {
        x: startX.value + vx.value / 2,
        y: startY.value + vy.value / 2,
        tex: "a",
        anchor: "top-right" as const,
        color: "var(--c-accent-2)",
        size: 19,
        halo: true,
        showAt: 1,
      },
      {
        x: startX.value + vx.value,
        y: startY.value + vy.value,
        tex: pointTex(startX.value + vx.value, startY.value + vy.value),
        anchor: "top-right" as const,
        color: "var(--c-accent-2)",
        size: 15,
        halo: true,
        showAt: 1,
      },
    );
  }

  return items;
});
</script>

<template>
  <div class="vp-wrap">
    <div class="vp-figure" :class="{ 'vp-hidden': step < 1 }">
      <CoordAxes
        :x-range="[X_MIN, X_MAX]"
        :y-range="[Y_MIN, Y_MAX]"
        :x-axis="{ quantity: 'x' }"
        :y-axis="{ quantity: 'y' }"
        :ticks="{ x: TICKS_X, y: TICKS_Y, grid: true, gridStep: 1, direction: 'cross' }"
        :view="VIEW"
        :labels="labels"
        :step="step"
      >
        <template #overlay="{ x, y, plot, px2user, width, height }">
          <!-- 平移到别的起点的副本（蓝色）：拖它的尖端改矢量本身，拖它的起点整条平移 -->
          <g v-if="showCopy">
            <CourseArrow
              :from="{ x: x(startX), y: y(startY) }"
              :to="{ x: x(startX + vx), y: y(startY + vy) }"
              :head-size="12"
              stroke="var(--c-accent-2)"
              stroke-width="3.4"
              pointer-events="none"
            />
            <circle
              :cx="x(startX)"
              :cy="y(startY)"
              r="5"
              fill="var(--c-accent-2)"
              pointer-events="none"
            />
            <circle
              :cx="x(startX + vx)"
              :cy="y(startY + vy)"
              :r="GRAB_PX * px2user"
              fill="transparent"
              class="vp-grab"
              @pointerdown="startDrag('tip', $event)"
              @pointermove="onPointerMove($event, plot, { width, height })"
              @pointerup="endDrag"
              @pointercancel="endDrag"
            />
            <circle
              :cx="x(startX)"
              :cy="y(startY)"
              :r="GRAB_PX * px2user"
              fill="transparent"
              class="vp-grab"
              @pointerdown="startDrag('start', $event)"
              @pointermove="onPointerMove($event, plot, { width, height })"
              @pointerup="endDrag"
              @pointercancel="endDrag"
            />
          </g>

          <!-- 原点出发的矢量（金色）与两条投影虚线 -->
          <g>
            <line
              :x1="x(0)"
              :y1="y(0)"
              :x2="x(vx)"
              :y2="y(0)"
              stroke="var(--c-accent)"
              stroke-width="1.2"
              stroke-dasharray="5 4"
              opacity="0.5"
              pointer-events="none"
            />
            <line
              :x1="x(vx)"
              :y1="y(0)"
              :x2="x(vx)"
              :y2="y(vy)"
              stroke="var(--c-accent)"
              stroke-width="1.2"
              stroke-dasharray="5 4"
              opacity="0.5"
              pointer-events="none"
            />
            <CourseArrow
              :from="{ x: x(0), y: y(0) }"
              :to="{ x: x(vx), y: y(vy) }"
              :head-size="12"
              stroke="var(--c-accent)"
              stroke-width="3.6"
              pointer-events="none"
            />
            <circle :cx="x(vx)" :cy="y(0)" r="3" fill="var(--c-accent)" pointer-events="none" />
            <circle :cx="x(0)" :cy="y(vy)" r="3" fill="var(--c-accent)" pointer-events="none" />
            <circle
              :cx="x(vx)"
              :cy="y(vy)"
              :r="GRAB_PX * px2user"
              fill="transparent"
              class="vp-grab"
              @pointerdown="startDrag('tip', $event)"
              @pointermove="onPointerMove($event, plot, { width, height })"
              @pointerup="endDrag"
              @pointercancel="endDrag"
            />
          </g>
        </template>
      </CoordAxes>
    </div>

    <div class="vp-info">
      <div class="vp-hint" :class="{ 'vp-hidden': step < 1 }">
        <mdi-gesture-tap /> 拖动箭头尖端或起点试试
      </div>
      <div class="vp-line" :class="{ 'vp-hidden': step < 2 }">
        <span class="vp-dot vp-dot-gold" />
        <span>起点在原点：<Latex :tex="vectorTex" /></span>
      </div>
      <div v-if="showCopy" class="vp-line" :class="{ 'vp-hidden': step < 2 }">
        <span class="vp-dot vp-dot-blue" />
        <span>平移到别的起点：<Latex :tex="vectorTex" /></span>
      </div>
      <div class="vp-line vp-line-dim" :class="{ 'vp-hidden': step < 2 }">
        模长：<Latex :tex="magnitudeTex" />
      </div>
      <div v-if="showCopy" class="vp-key" :class="{ 'vp-hidden': step < 3 }">
        两条箭头只是起点不同
      </div>
    </div>
  </div>
</template>

<style scoped>
.vp-wrap {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}

/* 分步内容始终占位，只把"还没轮到"的藏起来：点击时只出现新元素，已有元素绝不位移 */
.vp-hidden {
  visibility: hidden;
}

/* 图的外壳（轴与刻度在 CoordAxes 里）：与旧手写 SVG 同一套边框 / 底色 */
.vp-figure {
  display: block;
  flex: 1 1 58%;

  min-width: 0;
  max-width: 21rem;
  border: 1px solid rgb(148 163 184 / 12%);
  border-radius: 1.25rem;

  background: rgb(15 20 37 / 45%);

  touch-action: none;
}

.vp-grab {
  cursor: grab;
  touch-action: none;
}

.vp-grab:active {
  cursor: grabbing;
}

.vp-info {
  display: flex;
  flex: 1 1 42%;
  flex-direction: column;
  gap: 0.7rem;

  min-width: 0;

  font-size: 0.95rem;
  line-height: 1.7;
}

.vp-line {
  display: flex;
  gap: 0.55rem;
  align-items: center;
}

.vp-line-dim {
  color: var(--c-text-dim);
  font-size: 0.88rem;
}

.vp-dot {
  flex-shrink: 0;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
}

.vp-dot-gold {
  background: var(--c-accent);
}

.vp-dot-blue {
  background: var(--c-accent-2);
}

.vp-key {
  padding-left: 0.85rem;
  border-left: 3px solid var(--c-accent);
  font-size: 1rem;
  line-height: 1.7;
}

.vp-hint {
  display: flex;
  gap: 0.4rem;
  align-items: center;

  color: var(--c-text-dim);

  font-size: 0.82rem;

  opacity: 0.85;
}
</style>
