<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, ref } from "vue";

/**
 * 平行四边形定则演示：两个分力 F₁、F₂ 从同一点 O 出发，夹角 θ 可变。
 *
 * 两个箭头尖端都能拖（透明圆热区 + setPointerCapture），右栏滑杆同样能改；每次改动都用真实矢量合成 重算合力（F = F₁ + F₂），公式数值随之变化。
 *
 * 页面 frontmatter 写 `clicks: 4`：① 出 F₁、F₂ ② 补平行四边形 ③ 出对角线（合力）④ 出公式与数值。 分步只切 visibility / 固定尺寸 SVG 内
 * v-if，已出现的元素不动、不跳。
 */
const { $clicks } = useSlideContext();

/**
 * ViewBox 用户单位（16px 体系）；SCALE＝每牛顿多少用户单位。 视图框是"紧贴内容"的窗口（minX/minY 偏移）——两个力拖到最大、转到反向时刚好不被裁掉，
 * 默认状态也能占满画面（原来按 0 起点留的余量让图看着只有巴掌大）。
 */
const VIEW = { minX: 50, minY: 20, width: 490, height: 240 };
const SCALE = 40;
const OX = 200;
const OY = 205;
const F_MIN = 1;
const F_MAX = 4;
const STEP_MAX = 4;

const force1 = ref(4);
const force2 = ref(4);
const theta = ref(60);
const dragTarget = ref<"" | "force1" | "force2">("");

const step = computed<number>(() => Math.max(0, Math.min($clicks.value, STEP_MAX)));

/** 合力与方向：真实矢量合成（余弦定理的矢量形式） */
const result = computed(() => {
  const rad = (theta.value * Math.PI) / 180;
  const x = force1.value + force2.value * Math.cos(rad);
  const y = force2.value * Math.sin(rad);

  return { x, y, magnitude: Math.hypot(x, y), angle: (Math.atan2(y, x) * 180) / Math.PI };
});

const tipA = computed(() => ({ x: force1.value, y: 0 }));
const tipB = computed(() => {
  const rad = (theta.value * Math.PI) / 180;

  return { x: force2.value * Math.cos(rad), y: force2.value * Math.sin(rad) };
});
const tipC = computed(() => ({ x: result.value.x, y: result.value.y }));
/** 夹角圆弧起点（沿 F₁ 方向 1 N 处）与终点 */
const arcStart = computed(() => ({ x: 1, y: 0 }));
const arcEnd = computed(() => {
  const rad = (theta.value * Math.PI) / 180;

  return { x: Math.cos(rad), y: Math.sin(rad) };
});
const arcLabel = computed(() => {
  const rad = (theta.value * Math.PI) / 360;

  return { x: 1.55 * Math.cos(rad), y: 1.55 * Math.sin(rad) };
});

/**
 * 数据坐标（牛顿）→ viewBox 用户单位。
 *
 * @param v 数据坐标值（牛顿）
 * @returns ViewBox 用户单位坐标
 */
const toScreenX = (v: number): number => OX + v * SCALE;
const toScreenY = (v: number): number => OY - v * SCALE;
const pctX = (v: number): number => ((toScreenX(v) - VIEW.minX) / VIEW.width) * 100;
const pctY = (v: number): number => ((toScreenY(v) - VIEW.minY) / VIEW.height) * 100;

const clamp = (v: number, min: number, max: number): number => Math.min(max, Math.max(min, v));
const snap = (v: number): number => Math.round(v * 2) / 2;

/**
 * 指针位置 → 数据坐标（牛顿）。
 *
 * @param event 指针事件
 * @returns 数据坐标；无法换算时返回 null
 */
const pointerToData = (event: PointerEvent): { x: number; y: number } | null => {
  const el = event.currentTarget as Element;
  const svg = el instanceof SVGSVGElement ? el : el.ownerSVGElement;

  if (!svg) return null;

  const rect = svg.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) return null;

  const userX = ((event.clientX - rect.left) / rect.width) * VIEW.width + VIEW.minX;
  const userY = ((event.clientY - rect.top) / rect.height) * VIEW.height + VIEW.minY;

  return { x: (userX - OX) / SCALE, y: (OY - userY) / SCALE };
};

const onPointerMove = (event: PointerEvent): void => {
  if (dragTarget.value === "") return;

  const point = pointerToData(event);

  if (!point) return;

  if (dragTarget.value === "force1") {
    force1.value = clamp(snap(point.x), F_MIN, F_MAX);

    return;
  }

  force2.value = clamp(snap(Math.hypot(point.x, point.y)), F_MIN, F_MAX);
  theta.value = clamp(
    Math.round((Math.atan2(Math.max(point.y, 0), point.x) * 180) / Math.PI),
    0,
    180,
  );
};

const startDrag = (event: PointerEvent, target: "force1" | "force2"): void => {
  dragTarget.value = target;
  (event.target as Element).setPointerCapture(event.pointerId);
};

const endDrag = (): void => {
  dragTarget.value = "";
};

const fmt = (v: number): string => v.toFixed(1);

const f1Tex = computed(() => `F_1 = ${fmt(force1.value)}\\ \\text{N}`);
const f2Tex = computed(() => `F_2 = ${fmt(force2.value)}\\ \\text{N}`);
const thetaTex = computed(() => `\\theta = ${theta.value}^\\circ`);
const formulaTex = computed(() =>
  theta.value === 0 || theta.value === 180
    ? `F = |F_1 ${theta.value === 0 ? "+" : "-"} F_2|`
    : `F = \\sqrt{F_1^2 + F_2^2 + 2F_1F_2\\cos\\theta}`,
);
const sumTex = computed(() => `F = ${fmt(result.value.magnitude)}\\ \\text{N}`);
const angleTex = computed(() => `\\alpha \\approx ${result.value.angle.toFixed(0)}^\\circ`);
</script>

<template>
  <div class="fp-wrap">
    <div class="fp-figure">
      <svg
        :viewBox="`${VIEW.minX} ${VIEW.minY} ${VIEW.width} ${VIEW.height}`"
        @pointermove="onPointerMove"
        @pointerup="endDrag"
        @pointercancel="endDrag"
      >
        <line
          :x1="toScreenX(-1.7)"
          :y1="toScreenY(0)"
          :x2="toScreenX(0.5)"
          :y2="toScreenY(0)"
          stroke="var(--c-text-dim)"
          stroke-width="1.2"
          stroke-dasharray="5 5"
          opacity="0.45"
        />
        <circle :cx="toScreenX(0)" :cy="toScreenY(0)" r="4" fill="var(--c-text)" />
        <polygon
          v-if="step >= 2"
          :points="`${toScreenX(0)},${toScreenY(0)} ${toScreenX(tipA.x)},${toScreenY(tipA.y)} ${toScreenX(tipC.x)},${toScreenY(tipC.y)} ${toScreenX(tipB.x)},${toScreenY(tipB.y)}`"
          fill="var(--c-accent)"
          fill-opacity="0.1"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="7 5"
        />
        <g v-if="step >= 1">
          <path
            :d="`M ${toScreenX(arcStart.x)} ${toScreenY(arcStart.y)} A ${SCALE} ${SCALE} 0 0 0 ${toScreenX(arcEnd.x)} ${toScreenY(arcEnd.y)}`"
            fill="none"
            stroke="var(--c-accent-2)"
            stroke-width="1.8"
            opacity="0.9"
          />
          <CourseArrow
            :from="{ x: toScreenX(0), y: toScreenY(0) }"
            :to="{ x: toScreenX(tipA.x), y: toScreenY(tipA.y) }"
            stroke="var(--c-accent)"
            stroke-width="3.4"
            pointer-events="none"
          />
          <CourseArrow
            :from="{ x: toScreenX(0), y: toScreenY(0) }"
            :to="{ x: toScreenX(tipB.x), y: toScreenY(tipB.y) }"
            stroke="var(--c-accent-2)"
            stroke-width="3.4"
            pointer-events="none"
          />
          <circle
            :cx="toScreenX(tipA.x)"
            :cy="toScreenY(tipA.y)"
            r="4"
            fill="var(--c-accent)"
            pointer-events="none"
          />
          <circle
            :cx="toScreenX(tipB.x)"
            :cy="toScreenY(tipB.y)"
            r="4"
            fill="var(--c-accent-2)"
            pointer-events="none"
          />
        </g>
        <g v-if="step >= 2">
          <line
            :x1="toScreenX(tipA.x)"
            :y1="toScreenY(tipA.y)"
            :x2="toScreenX(tipC.x)"
            :y2="toScreenY(tipC.y)"
            stroke="var(--c-accent-2)"
            stroke-width="2.4"
            stroke-dasharray="8 5"
            opacity="0.75"
          />
          <line
            :x1="toScreenX(tipB.x)"
            :y1="toScreenY(tipB.y)"
            :x2="toScreenX(tipC.x)"
            :y2="toScreenY(tipC.y)"
            stroke="var(--c-accent)"
            stroke-width="2.4"
            stroke-dasharray="8 5"
            opacity="0.75"
          />
          <circle
            :cx="toScreenX(tipC.x)"
            :cy="toScreenY(tipC.y)"
            r="4.5"
            fill="var(--c-physics)"
            opacity="0.85"
          />
        </g>
        <CourseArrow
          v-if="step >= 3"
          :from="{ x: toScreenX(0), y: toScreenY(0) }"
          :to="{ x: toScreenX(tipC.x), y: toScreenY(tipC.y) }"
          stroke="var(--c-physics)"
          stroke-width="3.8"
          pointer-events="none"
        />
        <g v-if="step >= 1">
          <circle
            :cx="toScreenX(tipA.x)"
            :cy="toScreenY(tipA.y)"
            r="18"
            fill="transparent"
            class="fp-grab"
            @pointerdown="startDrag($event, 'force1')"
          />
          <circle
            :cx="toScreenX(tipB.x)"
            :cy="toScreenY(tipB.y)"
            r="18"
            fill="transparent"
            class="fp-grab"
            @pointerdown="startDrag($event, 'force2')"
          />
        </g>
      </svg>
      <ChartLabel
        :x-percent="pctX(0)"
        :y-percent="pctY(0)"
        :parts="[{ tex: 'O' }]"
        anchor="top-left"
        :dx="-4"
        :dy="6"
        color="var(--c-text)"
      />
      <ChartLabel
        :x-percent="pctX(tipA.x / 2)"
        :y-percent="pctY(0)"
        :parts="[{ tex: 'F_1' }]"
        anchor="bottom-right"
        :dy="8"
        :visible="step >= 1"
        color="var(--c-accent)"
      />
      <ChartLabel
        :x-percent="pctX(tipB.x / 2)"
        :y-percent="pctY(tipB.y / 2)"
        :parts="[{ tex: 'F_2' }]"
        anchor="left"
        :dx="-8"
        :visible="step >= 1"
        color="var(--c-accent-2)"
      />
      <ChartLabel
        :x-percent="pctX(arcLabel.x)"
        :y-percent="pctY(arcLabel.y)"
        :parts="[{ tex: '\\theta' }]"
        :visible="step >= 1 && theta > 8"
        color="var(--c-accent-2)"
      />
      <ChartLabel
        :x-percent="pctX(tipC.x / 2)"
        :y-percent="pctY(tipC.y / 2)"
        :parts="[{ tex: 'F' }]"
        anchor="right"
        :dx="10"
        :visible="step >= 3"
        color="var(--c-physics)"
        halo
      />
      <ChartLabel
        :x-percent="pctX(tipC.x)"
        :y-percent="pctY(tipC.y)"
        :parts="[{ tex: '\\alpha' }]"
        anchor="top-right"
        :dx="2"
        :dy="-4"
        :visible="step >= 4"
        color="var(--c-text-dim)"
      />
    </div>

    <div class="fp-info">
      <div class="fp-row">
        <span class="fp-name" style="color: var(--c-accent)"><Latex tex="F_1" /></span>
        <input
          v-model.number="force1"
          type="range"
          min="1"
          max="4"
          step="0.5"
          aria-label="F1 大小"
        />
        <span class="fp-val"><Latex :tex="f1Tex" /></span>
      </div>
      <div class="fp-row">
        <span class="fp-name" style="color: var(--c-accent-2)"><Latex tex="F_2" /></span>
        <input
          v-model.number="force2"
          type="range"
          min="1"
          max="4"
          step="0.5"
          aria-label="F2 大小"
        />
        <span class="fp-val"><Latex :tex="f2Tex" /></span>
      </div>
      <div class="fp-row">
        <span class="fp-name"><Latex tex="\theta" /></span>
        <input
          v-model.number="theta"
          type="range"
          min="0"
          max="180"
          step="5"
          aria-label="两力夹角"
        />
        <span class="fp-val"><Latex :tex="thetaTex" /></span>
      </div>

      <div class="fp-result" :class="{ 'fp-hidden': step < 4 }">
        <div class="fp-rule">
          以 <Latex tex="F_1" />、<Latex tex="F_2" /> 为邻边作平行四边形，对角线就是合力
        </div>
        <div class="fp-formula"><Latex :tex="formulaTex" /></div>
        <div class="fp-sum"><Latex :tex="sumTex" /></div>
        <div class="fp-angle">合力方向：与 <Latex tex="F_1" /> 成 <Latex :tex="angleTex" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fp-wrap {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  gap: 1.6rem;
  align-items: center;
}

.fp-figure {
  position: relative;
  min-width: 0;
}

.fp-figure svg {
  display: block;
  width: 100%;
  height: auto;
}

.fp-grab {
  cursor: grab;
}

.fp-info {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-width: 0;
}

.fp-info :deep(.katex) {
  font-size: 1em !important;
}

.fp-row {
  display: grid;
  grid-template-columns: 2.6rem minmax(0, 1fr) 5.6rem;
  gap: 0.6rem;
  align-items: center;

  font-size: 0.95rem;
}

.fp-name {
  font-weight: 700;
  text-align: center;
}

.fp-val {
  color: var(--c-text-dim);
  font-size: 0.9rem;
  text-align: right;
  white-space: nowrap;
}

.fp-row input[type="range"] {
  min-width: 0;
  height: 4px;
  border-radius: 2rem;

  background: rgb(148 163 184 / 20%);
  outline: none;

  cursor: pointer;

  appearance: none;
}

.fp-row input[type="range"]::-webkit-slider-thumb {
  width: 14px;
  height: 14px;
  border: 2px solid var(--c-bg-soft);
  border-radius: 50%;

  background: var(--c-text-dim);

  appearance: none;
}

.fp-result {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  margin-top: 0.2rem;
  padding-left: 0.9rem;
  border-left: 3px solid var(--c-physics);
}

.fp-hidden {
  visibility: hidden;
}

.fp-rule {
  font-size: 0.9rem;
  line-height: 1.5;
}

.fp-formula {
  font-size: 0.98rem;
}

.fp-sum {
  font-size: 1.05rem;
}

.fp-angle {
  color: var(--c-text-dim);
  font-size: 0.9rem;
}
</style>
