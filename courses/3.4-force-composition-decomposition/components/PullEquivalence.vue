<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, ref } from "vue";

/**
 * 实验：探究两个互成角度的力的合成规律——等效控制（按真实几何做）。
 *
 * 装置：橡皮条一端固定在 A，另一端连着结点 O，两根细绳各接一个弹簧测力计，从 O 往外拉。 **结点停在哪里由平衡条件决定，不是画上去的**：
 *
 * ① 橡皮条只能沿自己的方向拉 ⇒ 两个拉力的合力必须**正好沿橡皮条方向**，否则结点被拉偏、橡皮条跟着转； ② 橡皮条的拉力由伸长量决定（胡克定律）⇒ 合力越大，O 被拉得越远。
 *
 * 所以：`O = A + (L₀ + |F₁+F₂| / k) · (F₁+F₂ 的方向)`。 **两个力的竖直分力不平衡时，合力就有竖直分量，O 会跟着上下移动、橡皮条也随之倾斜**——
 * 这正是"两次都必须拉到同一位置"所对应的东西。到"一个力"那一步，画出的力与合力等大同向， 所以结点自然仍停在同一处。
 *
 * 拖任意一个箭头尖端，就能同时改这一个力的**大小和方向**（指针落在哪，箭头尖端就跟到哪）； 因为 O 也随合力移动，二者是隐式关系，内部迭代几次解出自洽位置。拖到画面外会自动停住。
 */
const { startAt = 1 } = defineProps<{ startAt?: number }>();

const { $clicks } = useSlideContext();

/** ViewBox 用户单位、每牛顿多少用户单位（箭头长短按这个换算） */
const VIEW = { width: 400, height: 300 };
const SCALE = 30;
/**
 * 固定端 A、橡皮条原长 L₀（用户单位）、劲度 k（N/用户单位）。
 *
 * 原长取短、k 取软：读数在 0.6–4.5 N 之间变化时，伸长量 m/k 会从约 6 单位变到 80 单位， 橡皮条肉眼可见地从 50 出头长到 130 上下（两倍多）。 早先取
 * L₀=180、k=0.45，读数怎么调都只多伸长十来个单位，看着就像"劲度无穷大、根本不伸长"。
 */
const FIXED = { x: 36, y: 150 };
const NATURAL_LENGTH = 50;
const SPRING_K = 0.1;
/** 两个测力计读数的允许范围（N）——上限放宽到 4.5 N，平行四边形才能拉得更大、右侧不留死角 */
const F_MIN = 0.6;
const F_MAX = 4.5;
const STEP_MAX = 3;
/** 画面内边距：结点、两个拉力尖端、合力尖端都要落在这个框里 */
const PAD = 12;

interface Vec {
  x: number;
  y: number;
}

/** 两个拉力（N；y 在数学坐标里向上为正，画到屏幕时再翻） */
const force1 = ref<Vec>({ x: 2.298, y: 1.928 });
const force2 = ref<Vec>({ x: 2.298, y: -1.928 });

/** 还没轮到这一页讲实验时整块隐形占位，不把别的元素顶跑 */
const shown = computed(() => $clicks.value >= startAt);
const step = computed<number>(() => Math.max(0, Math.min($clicks.value - startAt + 1, STEP_MAX)));

const mag1 = computed(() => Math.hypot(force1.value.x, force1.value.y));
const mag2 = computed(() => Math.hypot(force2.value.x, force2.value.y));
const resultant = computed<Vec>(() => ({
  x: force1.value.x + force2.value.x,
  y: force1.value.y + force2.value.y,
}));
const magR = computed(() => Math.hypot(resultant.value.x, resultant.value.y));

/**
 * 结点位置：沿合力方向，离固定端的距离 = 原长 + 合力/k。
 *
 * @param r 合力矢量（N）
 * @returns 结点坐标（用户单位）
 */
const knotOf = (r: Vec): Vec => {
  const magnitude = Math.hypot(r.x, r.y);

  if (magnitude < 1e-6) return { x: FIXED.x + NATURAL_LENGTH, y: FIXED.y };

  const length = NATURAL_LENGTH + magnitude / SPRING_K;

  return { x: FIXED.x + (length * r.x) / magnitude, y: FIXED.y - (length * r.y) / magnitude };
};

const knot = computed(() => knotOf(resultant.value));

/**
 * 一个力的箭头尖端（屏幕坐标）。
 *
 * @param forceVec 力矢量（N）
 * @param origin 力的作用点（默认结点）
 * @returns 尖端坐标（用户单位）
 */
const tipOf = (forceVec: Vec, origin: Vec = knot.value): Vec => ({
  x: origin.x + forceVec.x * SCALE,
  y: origin.y - forceVec.y * SCALE,
});

const tip1 = computed(() => tipOf(force1.value));
const tip2 = computed(() => tipOf(force2.value));
/** "一个力"那一步：与合力等大同向，画在同一个结点上 */
const tipF = computed(() => tipOf(resultant.value));

/** 两个力之间的夹角（0–180°） */
const angleBetween = computed(() => {
  const product = mag1.value * mag2.value;

  if (product < 1e-6) return 0;

  const cos = (force1.value.x * force2.value.x + force1.value.y * force2.value.y) / product;

  return (Math.acos(Math.min(1, Math.max(-1, cos))) * 180) / Math.PI;
});

/**
 * 把力的读数夹到允许范围（N）。
 *
 * @param forceVec 力矢量（N）
 * @returns 夹好之后的力矢量（N）
 */
const clampMag = (forceVec: Vec): Vec => {
  const magnitude = Math.hypot(forceVec.x, forceVec.y) || 1e-6;
  const target = Math.min(F_MAX, Math.max(F_MIN, magnitude));

  return { x: (forceVec.x / magnitude) * target, y: (forceVec.y / magnitude) * target };
};

/**
 * 结点、两个拉力尖端、合力尖端都得在画面里，这个状态才允许出现。
 *
 * @param first 第一个力（N）
 * @param second 第二个力（N）
 * @returns 是否全部落在画面内
 */
const inScene = (first: Vec, second: Vec): boolean => {
  const r = { x: first.x + second.x, y: first.y + second.y };
  const origin = knotOf(r);
  const points = [origin, tipOf(first, origin), tipOf(second, origin), tipOf(r, origin)];

  return points.every(
    (point) =>
      point.x >= PAD &&
      point.x <= VIEW.width - PAD &&
      point.y >= PAD &&
      point.y <= VIEW.height - PAD,
  );
};

const pointerToUser = (event: PointerEvent): Vec | null => {
  const element = event.currentTarget as Element;
  const svg = element instanceof SVGSVGElement ? element : element.ownerSVGElement;

  if (!svg) return null;

  const rect = svg.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) return null;

  return {
    x: ((event.clientX - rect.left) / rect.width) * VIEW.width,
    y: ((event.clientY - rect.top) / rect.height) * VIEW.height,
  };
};

/**
 * 解出"箭头尖端正好落在指针处"的那个力。
 *
 * 这里不能用简单迭代：结点位置也随合力移动，小合力时"结点转动"被放大（切向增益可达十倍）， 朴素迭代会振荡发散。改用带限步的牛顿法（2×2 数值雅可比），2–4 次即收敛到亚像素。
 *
 * @param point 指针位置（用户单位）
 * @param other 另一个力（N）
 * @returns 解出的力（N）
 */
const solveForce = (point: Vec, other: Vec): Vec => {
  let force: Vec = {
    x: (point.x - FIXED.x - NATURAL_LENGTH) / SCALE,
    y: -(point.y - FIXED.y) / SCALE,
  };
  const tipFor = (forceVec: Vec): Vec =>
    tipOf(forceVec, knotOf({ x: forceVec.x + other.x, y: forceVec.y + other.y }));

  for (let index = 0; index < 24; index += 1) {
    const tip = tipFor(force);
    const error = { x: point.x - tip.x, y: point.y - tip.y };

    if (Math.hypot(error.x, error.y) < 0.05) break;

    const delta = 0.01;
    const tipX = tipFor({ x: force.x + delta, y: force.y });
    const tipY = tipFor({ x: force.x, y: force.y + delta });
    const a = (tipX.x - tip.x) / delta;
    const b = (tipY.x - tip.x) / delta;
    const cCoef = (tipX.y - tip.y) / delta;
    const d = (tipY.y - tip.y) / delta;
    const det = a * d - b * cCoef;

    if (Math.abs(det) < 1e-9) break;

    let dx = (error.x * d - b * error.y) / det;
    let dy = (a * error.y - error.x * cCoef) / det;
    const length = Math.hypot(dx, dy);

    if (length > 1.5) {
      dx = (dx / length) * 1.5;
      dy = (dy / length) * 1.5;
    }

    force = clampMag({ x: force.x + dx, y: force.y + dy });
  }

  return force;
};

const dragTarget = ref<"" | "f1" | "f2">("");

const startDrag = (event: PointerEvent, target: "f1" | "f2"): void => {
  dragTarget.value = target;
  (event.target as Element).setPointerCapture(event.pointerId);
};

const endDrag = (): void => {
  dragTarget.value = "";
};

const onPointerMove = (event: PointerEvent): void => {
  if (dragTarget.value === "") return;

  const point = pointerToUser(event);

  if (!point) return;

  const isFirst = dragTarget.value === "f1";
  const current = isFirst ? force1.value : force2.value;
  const other = isFirst ? force2.value : force1.value;
  const target = solveForce(point, other);

  // 拖到画面外就逐步回退，取最后一个画得下的位置（相当于撞到边界停住）
  for (const ratio of [1, 0.75, 0.5, 0.25]) {
    const candidate = {
      x: current.x + (target.x - current.x) * ratio,
      y: current.y + (target.y - current.y) * ratio,
    };

    if (!inScene(isFirst ? candidate : force1.value, isFirst ? force2.value : candidate)) continue;

    if (isFirst) force1.value = candidate;
    else force2.value = candidate;

    return;
  }
};

const fmt = (v: number): string => v.toFixed(1);

const f1Tex = computed(() => `F_1 = ${fmt(mag1.value)}\\ \\text{N}`);
const f2Tex = computed(() => `F_2 = ${fmt(mag2.value)}\\ \\text{N}`);
const thetaTex = computed(() => `\\theta = ${angleBetween.value.toFixed(0)}^\\circ`);
const forceTex = computed(() => `F = ${fmt(magR.value)}\\ \\text{N}`);
</script>

<template>
  <div class="pe-wrap" :class="{ 'pe-hidden': !shown }">
    <div class="pe-figure">
      <svg
        :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`"
        @pointermove="onPointerMove"
        @pointerup="endDrag"
        @pointercancel="endDrag"
      >
        <!-- 固定端：共享接触面组件，斜线只画在墙外侧 -->
        <SurfaceHatch
          :from="{ x: FIXED.x, y: FIXED.y - 34 }"
          :to="{ x: FIXED.x, y: FIXED.y + 34 }"
          side="left"
          :thickness="12"
          :gap="22"
          :line-width="3"
          :hatch-width="1.4"
        />
        <!-- 橡皮条 -->
        <line
          :x1="FIXED.x"
          :y1="FIXED.y"
          :x2="knot.x"
          :y2="knot.y"
          stroke="var(--c-accent)"
          stroke-width="9"
          stroke-linecap="round"
          opacity="0.2"
        />
        <line
          :x1="FIXED.x"
          :y1="FIXED.y"
          :x2="knot.x"
          :y2="knot.y"
          stroke="var(--c-accent)"
          stroke-width="2"
          opacity="0.75"
        />
        <!-- 结点 -->
        <circle
          :cx="knot.x"
          :cy="knot.y"
          r="7"
          fill="none"
          stroke="var(--c-text)"
          stroke-width="2.6"
        />

        <!-- 两个拉力：尖端可拖 -->
        <g v-if="step >= 1 && step < 2">
          <CourseArrow
            :from="knot"
            :to="tip1"
            stroke="var(--c-accent)"
            stroke-width="3.4"
            pointer-events="none"
          />
          <CourseArrow
            :from="knot"
            :to="tip2"
            stroke="var(--c-accent-2)"
            stroke-width="3.4"
            pointer-events="none"
          />
          <circle :cx="tip1.x" :cy="tip1.y" r="4.5" fill="var(--c-accent)" />
          <circle :cx="tip2.x" :cy="tip2.y" r="4.5" fill="var(--c-accent-2)" />
          <circle
            :cx="tip1.x"
            :cy="tip1.y"
            r="20"
            fill="transparent"
            class="pe-grab"
            @pointerdown="startDrag($event, 'f1')"
          />
          <circle
            :cx="tip2.x"
            :cy="tip2.y"
            r="20"
            fill="transparent"
            class="pe-grab"
            @pointerdown="startDrag($event, 'f2')"
          />
        </g>

        <!-- 撤去两个力，改用一个力：等大同向，结点仍停在同一处 -->
        <g v-if="step >= 2">
          <line
            :x1="knot.x"
            :y1="knot.y"
            :x2="tip1.x"
            :y2="tip1.y"
            stroke="var(--c-accent)"
            stroke-width="2"
            stroke-dasharray="7 5"
            opacity="0.35"
          />
          <line
            :x1="knot.x"
            :y1="knot.y"
            :x2="tip2.x"
            :y2="tip2.y"
            stroke="var(--c-accent-2)"
            stroke-width="2"
            stroke-dasharray="7 5"
            opacity="0.35"
          />
          <CourseArrow
            :from="knot"
            :to="tipF"
            stroke="var(--c-physics)"
            stroke-width="3.8"
            pointer-events="none"
          />
          <circle :cx="tipF.x" :cy="tipF.y" r="5" fill="var(--c-physics)" />
        </g>
      </svg>
      <ChartLabel
        :x-percent="(FIXED.x / VIEW.width) * 100"
        :y-percent="(FIXED.y / VIEW.height) * 100"
        :parts="[{ text: '固定端' }]"
        anchor="bottom-left"
        :dy="10"
        color="var(--c-text-dim)"
      />
      <ChartLabel
        :x-percent="(knot.x / VIEW.width) * 100"
        :y-percent="(knot.y / VIEW.height) * 100"
        :parts="[{ tex: 'O' }]"
        anchor="top-left"
        :dx="-6"
        :dy="-8"
        color="var(--c-text)"
      />
      <ChartLabel
        :x-percent="(tip1.x / VIEW.width) * 100"
        :y-percent="(tip1.y / VIEW.height) * 100"
        :parts="[{ tex: 'F_1' }]"
        anchor="top-right"
        :dx="6"
        :dy="-4"
        :visible="step >= 1 && step < 2"
        color="var(--c-accent)"
        halo
      />
      <ChartLabel
        :x-percent="(tip2.x / VIEW.width) * 100"
        :y-percent="(tip2.y / VIEW.height) * 100"
        :parts="[{ tex: 'F_2' }]"
        anchor="bottom-right"
        :dx="6"
        :dy="4"
        :visible="step >= 1 && step < 2"
        color="var(--c-accent-2)"
        halo
      />
      <ChartLabel
        :x-percent="((knot.x + tipF.x) / 2 / VIEW.width) * 100"
        :y-percent="((knot.y + tipF.y) / 2 / VIEW.height) * 100"
        :parts="[{ tex: 'F' }]"
        anchor="top-right"
        :dy="-6"
        :visible="step >= 2"
        color="var(--c-physics)"
        halo
      />
    </div>

    <div class="pe-info">
      <div class="pe-angles">
        <span style="color: var(--c-accent)"><Latex :tex="f1Tex" /></span>
        <span style="color: var(--c-accent-2)"><Latex :tex="f2Tex" /></span>
        <span><Latex :tex="thetaTex" /></span>
      </div>

      <div class="pe-result" :class="{ 'pe-hidden': step < 3 }">
        <div class="pe-sum"><Latex :tex="forceTex" />，方向与橡皮条在同一条直线上</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pe-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0;
}

.pe-figure {
  position: relative;
  min-width: 0;
}

.pe-figure svg {
  display: block;
  width: 100%;
  height: auto;
}

.pe-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.pe-info :deep(.katex) {
  font-size: 1em !important;
}

/* 两个拉力的大小与夹角只作读数——要改就拖图上的箭头尖端 */
.pe-angles {
  display: flex;
  gap: 1.2rem;
  align-items: baseline;
  font-size: 0.98rem;
}

.pe-result {
  padding-left: 0.9rem;
  border-left: 3px solid var(--c-physics);
}

/* 还没轮到这一页讲实验时整块隐形占位：**不能用 visibility**——ChartLabel 自己会写
   `visibility: visible`，能把父层的 hidden 顶穿。opacity: 0 既保留占位、也不会漏出来。 */
.pe-hidden {
  opacity: 0;
  pointer-events: none;
}

.pe-grab {
  cursor: grab;
}

.pe-sum {
  font-size: 1rem;
  line-height: 1.6;
}
</style>
