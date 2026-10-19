<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 第 6 页：电荷量的平分（9-text.md 行 118–119）——**演"接触 → 分开"的动作**，不是两块并列的静态图。
 *
 * 两个**完全相同**的金属小球 A、B：A 带 q、B 不带电。页面 `clicks: 3`：
 *
 * - 第 0 击（常显）：两球各在自己的**固定槽位**分开站着，A 内 4 个 `+` 记号、B 内没有记号，上方标 $q$ 与 $0$；
 * - 第 1 击：**接触**——两球各自用 `transform` 平移到相切，球内记号重分布为各 2 个（原位留虚线圆圈，看得见它们"从哪儿来"）；
 * - 第 2 击：**分开**——两球平移回各自槽位，下方读数出现：$q_A = q_B = \dfrac{q}{2}$。
 *
 * ⚠️ 位移纪律（AGENTS.md 八"点击时已有元素被顶跑"）：
 *
 * - 两球的**槽位固定**，动作只改 SVG 内部的 `transform`（e2e 的位移检查只看文档流盒子，SVG 内部不算）；
 * - 会变的读数与标签一律**常驻占位 + 只切 `visibility`**（`v-if` 只用在固定尺寸 SVG 内部），绝不用 `v-if` 真删真插。
 */
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value, 2)));

const VB_W = 600;
const VB_H = 190;
const R = 34;
const Y = 104;

/** 两球的固定槽位（分开时站着的位置） */
const A_HOME = 220;
const B_HOME = 380;
/** 接触时两球相切：球心距 = 2R，且这一对球仍以画布中线对称 */
const A_TOUCH = VB_W / 2 - R;
const B_TOUCH = VB_W / 2 + R;

const aDx = computed(() => (step.value === 1 ? A_TOUCH - A_HOME : 0));
const bDx = computed(() => (step.value === 1 ? B_TOUCH - B_HOME : 0));

const atContact = computed(() => step.value === 1);

/**
 * 球内记号：**4 个槽位常驻**（2×2 方阵），电荷量只用**显隐**表达（记号数 = 电荷量的可视化单位）。 ⚠️ 时序：靠拢要 0.55s，若记号在点击瞬间就翻成"各两个"，中间帧会出现"还没接触就平分了"。 所以记号的显隐只走 `opacity`，并由 CSS 延迟 0.55s（= 靠拢结束时刻，见
 * `.cs-mark`），让"平分"严格发生在贴合之后。
 */
const MARK_SLOTS = [
  { dx: -14, dy: -14 },
  { dx: 14, dy: -14 },
  { dx: -14, dy: 14 },
  { dx: 14, dy: 14 },
];

/** A：槽位 0、1 常亮；2、3 在接触后淡出（4 → 2） */
const aMarkOpacity = (index: number): number => (index < 2 || step.value === 0 ? 1 : 0);
/** B：槽位 0、1 接触后淡入（0 → 2）；2、3 一直不用 */
const bMarkOpacity = (index: number): number => (index < 2 && step.value >= 1 ? 1 : 0);

const pct = (x: number, y: number) => ({
  xPercent: (x / VB_W) * 100,
  yPercent: (y / VB_H) * 100,
});
</script>

<template>
  <div class="cs-wrap">
    <div class="cs-host">
      <svg viewBox="0 0 600 190" width="100%" xmlns="http://www.w3.org/2000/svg">
        <g v-if="atContact">
          <circle :cx="A_HOME" :cy="Y" :r="R" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.75" />
          <circle :cx="B_HOME" :cy="Y" :r="R" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.75" />
        </g>
        <g class="cs-ball" :style="{ transform: `translateX(${aDx}px)` }">
          <circle :cx="A_HOME" :cy="Y" :r="R" fill="var(--c-danger)" fill-opacity="0.28" stroke="var(--c-neutral-500)" stroke-width="1.8" />
          <text
            v-for="(slot, index) in MARK_SLOTS"
            :key="`a-${index}`"
            class="cs-mark"
            :style="{ opacity: aMarkOpacity(index) }"
            :x="A_HOME + slot.dx"
            :y="Y + slot.dy + 1"
            text-anchor="middle"
            dominant-baseline="central"
            font-family="KaTeX_Main"
            font-size="20"
            fill="var(--c-danger)"
          >
            +
          </text>
          <text :x="A_HOME" :y="Y + R + 24" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text)">A</text>
        </g>
        <g class="cs-ball" :style="{ transform: `translateX(${bDx}px)` }">
          <circle :cx="B_HOME" :cy="Y" :r="R" fill="var(--c-neutral-700)" fill-opacity="0.55" stroke="var(--c-neutral-500)" stroke-width="1.8" />
          <text
            v-for="(slot, index) in MARK_SLOTS"
            :key="`b-${index}`"
            class="cs-mark"
            :style="{ opacity: bMarkOpacity(index) }"
            :x="B_HOME + slot.dx"
            :y="Y + slot.dy + 1"
            text-anchor="middle"
            dominant-baseline="central"
            font-family="KaTeX_Main"
            font-size="20"
            fill="var(--c-danger)"
          >
            +
          </text>
          <text :x="B_HOME" :y="Y + R + 24" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text)">B</text>
        </g>
      </svg>
      <ChartLabel v-bind="pct(A_HOME, 52)" :parts="[{ tex: 'q' }]" :visible="step === 0" :size="18" color="var(--c-accent)" />
      <ChartLabel v-bind="pct(B_HOME, 52)" :parts="[{ tex: '0' }]" :visible="step === 0" :size="18" color="var(--c-text-dim)" />
      <ChartLabel v-bind="pct(A_HOME, 52)" :parts="[{ tex: '\\dfrac{q}{2}' }]" :visible="step >= 2" :size="18" color="var(--c-accent)" />
      <ChartLabel v-bind="pct(B_HOME, 52)" :parts="[{ tex: '\\dfrac{q}{2}' }]" :visible="step >= 2" :size="18" color="var(--c-accent)" />
    </div>
    <div class="cs-readout" :class="{ 'cs-hidden': step < 2 }">
      <Latex tex="q_A = q_B = \dfrac{q}{2}" />
    </div>
  </div>
</template>

<style scoped>
.cs-wrap {
  width: 100%;
}

.cs-host {
  position: relative;
  width: 100%;
}

.cs-host > svg {
  display: block;
  width: 100%;
  height: auto;
}

/* "接触 / 分开"的动作：只改 transform，不改任何布局 */
.cs-ball {
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 电荷记号的显隐：只动 opacity（不动位置/尺寸，不会引入点击位移）。
   延迟 0.55s = `.cs-ball` 靠拢结束的时刻 ⇒ 记号翻转**严格发生在两球贴合之后**，
   200ms 的中间帧里记号仍是"A 四个 / B 零个"的原状态（不会演成"没碰上就平分"）。
   （复核员建议 0.35s≈贴合附近，这里再往后压到 0.55s，让因果顺序完全对得上。） */
.cs-mark {
  transition: opacity 0.25s ease 0.55s;
}

/* 读数常驻占位：只切 visibility，占的高度不变 */
.cs-readout {
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 2.4rem;

  color: var(--c-accent);
}

.cs-hidden {
  visibility: hidden;
}
</style>
