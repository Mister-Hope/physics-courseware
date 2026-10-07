<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, ref } from "vue";

/**
 * 静摩擦力随拉力的变化（教材"演示"的图形化）。
 *
 * 木块放在水平长木板上，用弹簧测力计水平拉它。拉力较小时木块不动，静摩擦力与拉力平衡（F_f = F）；拉力到达最大静摩擦力 F_max 时木块 即将滑动；一旦滑动，摩擦力突变为滑动摩擦力 F_f
 * = μF_N，此后不再随拉力增大。
 *
 * 坐标轴交给共享 `CoordAxes`（分步呈现用 :step="$clicks"）；滑杆与实时读数留在本组件。 屏幕提示语只写给学生：
 *
 * - 【授课提醒·不上屏】这一页前可先用弹簧测力计水平拉木块做一次真实演示——指针下轻塞一个小纸团随指针移动，作为指针到达最大位置的
 *   标记；拉力到某一数值木块开始移动、拉力突然变小。演示完再用这张图把"静摩擦线性增大 → 突变 → 滑动摩擦不变"讲一遍。
 * - 【授课提醒·不上屏】最大静摩擦力略大于滑动摩擦力（本图取 4.0 N 对 3.5 N），中学通常近似认为两者相等。
 */

/** 正压力（木块放在水平板上，与重力大小相等） */
const N_FORCE = 10;
/** 动摩擦因数（木—木量级） */
const MU_KINETIC = 0.35;
/** 滑动摩擦力大小 F_f = μF_N */
const F_KINETIC = MU_KINETIC * N_FORCE;
/** 最大静摩擦力：略大于滑动摩擦力（中学通常近似认为二者相等） */
const F_MAX = 4;

const X_MAX = 6.4;
const Y_MAX = 5.4;
const TICKS_X = [2, 4, 6];
const TICKS_Y = [1, 2, 3, 4, 5];
const VIEW = { width: 640, height: 320 };

const { $clicks } = useSlideContext();
/** 页面点击步：1 出静摩擦段、2 出最大静摩擦力、3 出突变与滑动摩擦段 */
const step = computed(() => Math.max(0, Math.min($clicks.value, 3)));

/** 拉力 F（滑杆） */
const pull = ref(1.5);

const EPS = 1e-9;
const nearMax = (value: number): boolean => Math.abs(value - F_MAX) < EPS;

const state = computed<"static" | "critical" | "kinetic">(() =>
  pull.value < F_MAX - EPS ? "static" : nearMax(pull.value) ? "critical" : "kinetic",
);

/** 木块实际受到的摩擦力大小 */
const friction = computed<number>(() => (state.value === "kinetic" ? F_KINETIC : pull.value));

const fixed = (value: number): string => value.toFixed(1);

/** 图上的实时工作点（拉力 → 摩擦力）——拖动滑杆时沿曲线移动 */
const marker = computed(() => ({ x: pull.value, y: friction.value }));

const pullTex = computed<string>(() => `F = ${fixed(pull.value)}\\text{ N}`);
const frictionTex = computed<string>(() => `F_f = ${fixed(friction.value)}\\text{ N}`);
const relationTex = computed<string>(() =>
  state.value === "kinetic"
    ? `F_f = \\mu F_N = ${fixed(MU_KINETIC)} \\times ${N_FORCE}\\text{ N} = ${fixed(F_KINETIC)}\\text{ N}`
    : `F_f = F = ${fixed(pull.value)}\\text{ N}`,
);
</script>

<template>
  <div class="sfg-wrap">
    <div class="sfg-figure">
      <CoordAxes
        :x-range="[0, X_MAX]"
        :y-range="[0, Y_MAX]"
        :x-axis="{ quantity: 'F', unit: 'N' }"
        :y-axis="{ quantity: 'F', sub: 'f', unit: 'N' }"
        :ticks="{ x: TICKS_X, y: TICKS_Y }"
        :view="VIEW"
        :step="step"
        :curves="[
          {
            points: [
              { x: 0, y: 0 },
              { x: F_MAX, y: F_MAX },
            ],
            stroke: 'var(--c-accent)',
            width: 3.6,
            showAt: 1,
          },
          {
            points: [
              { x: F_MAX, y: F_MAX },
              { x: F_MAX, y: F_KINETIC },
              { x: X_MAX, y: F_KINETIC },
            ],
            stroke: 'var(--c-accent-2)',
            width: 3.6,
            showAt: 3,
          },
        ]"
        :labels="[
          {
            x: 1.7,
            y: 1.7,
            tex: 'F_{\\text{静}}',
            anchor: 'bottom-right',
            color: 'var(--c-accent)',
            halo: true,
            showAt: 1,
          },
          {
            x: F_MAX,
            y: F_MAX,
            tex: 'F_{\\max}',
            anchor: 'top-left',
            dot: 5,
            color: 'var(--c-accent)',
            showAt: 2,
          },
          {
            x: 5,
            y: F_KINETIC,
            tex: 'F_f=\\mu F_N',
            anchor: 'top-right',
            dot: 5,
            color: 'var(--c-accent-2)',
            halo: true,
            showAt: 3,
          },
        ]"
      >
        <template #overlay="{ x: toUserX, y: toUserY }">
          <g
            v-if="step >= 3"
            stroke="var(--c-accent-2)"
            stroke-width="1.1"
            stroke-dasharray="6 5"
            opacity="0.5"
          >
            <line
              :x1="toUserX(0)"
              :y1="toUserY(F_KINETIC)"
              :x2="toUserX(X_MAX)"
              :y2="toUserY(F_KINETIC)"
            />
          </g>
          <g v-if="step >= 1" pointer-events="none">
            <line
              :x1="toUserX(marker.x)"
              :y1="toUserY(0)"
              :x2="toUserX(marker.x)"
              :y2="toUserY(marker.y)"
              stroke="var(--c-text-dim)"
              stroke-width="1.1"
              stroke-dasharray="4 4"
              opacity="0.7"
            />
            <circle :cx="toUserX(marker.x)" :cy="toUserY(marker.y)" r="6" fill="var(--c-accent)" />
            <circle
              :cx="toUserX(marker.x)"
              :cy="toUserY(marker.y)"
              r="6"
              fill="none"
              stroke="#0f1425"
              stroke-width="1.6"
            />
          </g>
        </template>
      </CoordAxes>
    </div>

    <div class="sfg-info">
      <div class="sfg-readout">
        <span class="sfg-readout-item"><Latex :tex="pullTex" /></span>
        <span class="sfg-readout-item"><Latex :tex="frictionTex" /></span>
      </div>

      <div class="sfg-state" :class="`sfg-state-${state}`">
        <span v-if="state === 'static'">木块静止 · 静摩擦力</span>
        <span v-else-if="state === 'critical'">即将滑动 · 最大静摩擦力</span>
        <span v-else>木块滑动 · 滑动摩擦力</span>
      </div>

      <div class="sfg-relation"><Latex :tex="relationTex" /></div>

      <div class="sfg-caption">
        <div class="sfg-line" :class="{ 'sfg-hidden': step < 1 }">
          <span class="sfg-dot sfg-dot-gold" />木块静止，静摩擦力随拉力一起增大
        </div>
        <div class="sfg-line" :class="{ 'sfg-hidden': step < 2 }">
          <span class="sfg-dot sfg-dot-gold" />到达 <Latex tex="F_{\max}" />，木块即将滑动
        </div>
        <div class="sfg-line" :class="{ 'sfg-hidden': step < 3 }">
          <span class="sfg-dot sfg-dot-blue" />滑动后突变为 <Latex tex="F_f = \mu F_N" />
        </div>
      </div>

      <label class="sfg-slider">
        <span class="sfg-slider-label">拉力 <Latex tex="F" /></span>
        <input v-model.number="pull" type="range" min="0" max="6" step="0.1" />
        <span class="sfg-slider-val">{{ fixed(pull) }}</span>
      </label>
      <div class="sfg-hint"><mdi-gesture-tap /> 慢慢拖动滑杆，增大拉力，看摩擦力怎么变</div>
    </div>
  </div>
</template>

<style scoped>
.sfg-wrap {
  display: flex;
  gap: 1.1rem;
  align-items: stretch;
  min-width: 0;
}

.sfg-figure {
  display: flex;
  flex: 1 1 52%;
  align-items: center;

  min-width: 0;
  max-width: 30rem;
  border: 1px solid rgb(148 163 184 / 12%);
  border-radius: 1.25rem;

  background: rgb(15 20 37 / 45%);
}

.sfg-info {
  display: flex;
  flex: 1 1 48%;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 0;

  font-size: 0.95rem;
  line-height: 1.55;
}

.sfg-readout {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.1rem;
  font-size: 1.05rem;
}

.sfg-state {
  display: inline-block;
  align-self: flex-start;

  padding: 0.12rem 0.6rem;
  border-radius: 2rem;

  font-size: 0.85rem;
}

.sfg-state-static,
.sfg-state-critical {
  background: rgb(226 168 70 / 16%);
  color: var(--c-accent);
}

.sfg-state-kinetic {
  background: rgb(96 165 250 / 16%);
  color: var(--c-accent-2);
}

.sfg-relation {
  color: var(--c-text-dim);
  font-size: 0.92rem;
}

.sfg-caption {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.sfg-line {
  display: block;
  font-size: 0.88rem;
  line-height: 1.5;
}

.sfg-hidden {
  visibility: hidden;
}

.sfg-dot {
  display: inline-block;
  vertical-align: middle;

  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.4rem;
  border-radius: 50%;
}

.sfg-dot-gold {
  background: var(--c-accent);
}

.sfg-dot-blue {
  background: var(--c-accent-2);
}

.sfg-slider {
  display: flex;
  gap: 0.55rem;
  align-items: center;
  margin-top: 0.2rem;
}

.sfg-slider-label {
  flex-shrink: 0;
  font-size: 0.88rem;
}

.sfg-slider-val {
  width: 1.8rem;

  color: var(--c-text-dim);

  font-size: 0.82rem;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.sfg-slider input[type="range"] {
  flex: 1;

  min-width: 0;
  height: 4px;
  border-radius: 2rem;

  background: rgb(148 163 184 / 20%);
  outline: none;

  cursor: pointer;

  appearance: none;
}

.sfg-slider input[type="range"]::-webkit-slider-thumb {
  width: 14px;
  height: 14px;
  border: 2px solid var(--c-bg-soft);
  border-radius: 50%;

  background: var(--c-accent);

  cursor: pointer;

  appearance: none;
}

.sfg-hint {
  display: flex;
  gap: 0.4rem;
  align-items: center;

  color: var(--c-text-dim);

  font-size: 0.78rem;

  opacity: 0.85;
}
</style>
