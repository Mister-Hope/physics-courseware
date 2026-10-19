<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 8 页：库仑定律实验室（滑块交互）
 *
 * 调 q₁、q₂、r 三个滑块，实时按库仑定律算 F 并画出两个点电荷之间沿连线方向的作用力： 同种电荷向外（斥力）、异种电荷向内（引力）。
 *
 * 读数公式：F = k·q₁q₂/r²，k = 9.0×10⁹ N·m²/C²（教材 9-text.md 行 132）。 箭头长度只表示相对大小（按 F
 * 的对数映射），不按真实比例——此说明只在代码里，不上屏。
 */
const {
  showForce = false,
  showReadout = false,
  showCompare = false,
} = defineProps<{
  showForce?: boolean;
  showReadout?: boolean;
  showCompare?: boolean;
}>();

/** 教材取 k = 9.0 × 10⁹ N·m²/C² */
const K = 9.0e9;

const q1 = ref(2);
const q2 = ref(2);
const rCm = ref(20);
const like = ref(true);

const VB_W = 560;
const VB_H = 290;
const BALL_R = 26;
const X1 = 118;
const Y = 145;

/** 库仑定律（输入 μC、cm，换算成 C、m） */
const forceAt = (r: number): number => (K * (q1.value * 1e-6) * (q2.value * 1e-6)) / (r / 100) ** 2;
const F = computed(() => forceAt(rCm.value));
const halfF = computed(() => forceAt(rCm.value / 2));

/** 科学计数法 → KaTeX（两位有效数字） */
const texSci = (value: number): string => {
  const [coeff, exp] = value.toExponential(1).split("e");

  return `${coeff} \\times 10^{${Number(exp)}}`;
};

const fTex = computed(() => `F = ${texSci(F.value)}\\ \\text{N}`);
const halfTex = computed(
  () => `F\\left(${rCm.value / 2}\\ \\text{cm}\\right) = ${texSci(halfF.value)}\\ \\text{N}`,
);
const q1Tex = computed(() => `${q1.value.toFixed(1)}\\ \\mu\\text{C}`);
const q2Tex = computed(() => `${q2.value.toFixed(1)}\\ \\mu\\text{C}`);
const rTex = computed(() => `${rCm.value}\\ \\text{cm}`);

/** 球心距：5 cm → 26 px，50 cm → 278 px（示意；保证两侧箭头不出画布） */
const gapPx = computed(() => 26 + (rCm.value - 5) * 5.6);
const X2 = computed(() => X1 + 2 * BALL_R + gapPx.value);
/** 力箭头的长度：随 F 增长（对数映射），两端都留得住 */
const outLen = computed(() => Math.min(70, Math.max(18, 20 + 62 * (F.value / 90) ** 0.35)));
/** 异种电荷的箭头指向对方 ⇒ 球面间隙小时要收短，两条箭头不能交叉 */
const inLen = computed(() => Math.max(10, Math.min(outLen.value, gapPx.value / 2 - 4)));

const pct = (x: number, y: number) => ({
  xPercent: (x / VB_W) * 100,
  yPercent: (y / VB_H) * 100,
});

/** 两个点电荷的力大小相等、方向相反（相互作用力） */
const arrows = computed(() => {
  const top = { x: X1, y: Y };
  const bottom = { x: X2.value, y: Y };

  return like.value
    ? [
        { from: { x: top.x - BALL_R, y: Y }, to: { x: top.x - BALL_R - outLen.value, y: Y } },
        { from: { x: bottom.x + BALL_R, y: Y }, to: { x: bottom.x + BALL_R + outLen.value, y: Y } },
      ]
    : [
        { from: { x: top.x + BALL_R, y: Y }, to: { x: top.x + BALL_R + inLen.value, y: Y } },
        { from: { x: bottom.x - BALL_R, y: Y }, to: { x: bottom.x - BALL_R - inLen.value, y: Y } },
      ];
});
</script>

<template>
  <div class="cfl">
    <div class="cfl-host">
      <svg viewBox="0 0 560 290" width="100%" xmlns="http://www.w3.org/2000/svg">
        <circle :cx="X1" :cy="Y" :r="BALL_R" fill="var(--c-danger)" fill-opacity="0.85" />
        <text
          :x="X1"
          :y="Y + 1"
          text-anchor="middle"
          dominant-baseline="central"
          font-family="KaTeX_Main"
          font-size="22"
          fill="#0c1122"
        >
          +
        </text>
        <circle
          :cx="X2"
          :cy="Y"
          :r="BALL_R"
          :fill="like ? 'var(--c-danger)' : 'var(--c-velocity)'"
          fill-opacity="0.85"
        />
        <text
          :x="X2"
          :y="Y + 1"
          text-anchor="middle"
          dominant-baseline="central"
          font-family="KaTeX_Main"
          font-size="22"
          fill="#0c1122"
        >
          {{ like ? "+" : "−" }}
        </text>
        <line
          :x1="X1"
          y1="215"
          :x2="X2"
          y2="215"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="5 5"
        />
        <line :x1="X1" y1="207" :x2="X1" y2="223" stroke="var(--c-text-dim)" stroke-width="1.4" />
        <line :x1="X2" y1="207" :x2="X2" y2="223" stroke="var(--c-text-dim)" stroke-width="1.4" />
        <g v-if="showForce">
          <CourseArrow
            v-for="(arrow, index) in arrows"
            :key="`f-${index}`"
            :from="arrow.from"
            :to="arrow.to"
            stroke="var(--c-force)"
            stroke-width="3.2"
            label="F"
            :label-dx="0"
            :label-dy="-14"
          />
        </g>
      </svg>
      <ChartLabel
        v-bind="pct(X1, 99)"
        :parts="[{ tex: 'q_1' }]"
        :size="18"
        color="var(--c-accent)"
      />
      <ChartLabel
        v-bind="pct(X2, 99)"
        :parts="[{ tex: 'q_2' }]"
        :size="18"
        color="var(--c-accent)"
      />
      <ChartLabel
        v-bind="pct((X1 + X2) / 2, 245)"
        :parts="[{ tex: 'r' }]"
        :size="18"
        color="var(--c-text-dim)"
      />
    </div>
    <div class="cfl-panel">
      <CourseSlider
        v-model="q1"
        :min="0.5"
        :max="5"
        :step="0.1"
        label="电荷量"
        label-tex="q_1"
        label-width="4.4rem"
        layout="tight"
      >
        <template #value><Latex :tex="q1Tex" /></template>
      </CourseSlider>
      <CourseSlider
        v-model="q2"
        :min="0.5"
        :max="5"
        :step="0.1"
        label="电荷量"
        label-tex="q_2"
        label-width="4.4rem"
        layout="tight"
      >
        <template #value><Latex :tex="q2Tex" /></template>
      </CourseSlider>
      <CourseSlider
        v-model="rCm"
        :min="5"
        :max="50"
        :step="1"
        label="距离"
        label-tex="r"
        label-width="4.4rem"
        layout="tight"
      >
        <template #value><Latex :tex="rTex" /></template>
      </CourseSlider>
      <div class="cfl-toggle">
        <button type="button" :class="{ 'is-on': like }" @click="like = true">同种电荷</button>
        <button type="button" :class="{ 'is-on': !like }" @click="like = false">异种电荷</button>
      </div>
      <div class="cfl-readout" :class="{ 'cfl-hidden': !showReadout }">
        <div><Latex tex="F = k\dfrac{q_1 q_2}{r^2}" /></div>
        <div><Latex :tex="fTex" /></div>
      </div>
      <div class="cfl-compare" :class="{ 'cfl-hidden': !showCompare }">
        <div><Latex :tex="halfTex" /></div>
        <div><Latex tex="\dfrac{F(r/2)}{F(r)} = 4" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 一页只有 552px 的预算：图区与右栏都按"矮而宽"排；实测初始态曾顶出上沿 216.7px，
   所以容器留 max-height 兜底，同时把两栏的呼吸感给足（版面尽量占满）。 */
.cfl {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 1.6rem;
  align-items: center;
  max-height: 330px;
}

.cfl > * {
  min-width: 0;
  min-height: 0;
}

.cfl-host {
  position: relative;
  width: 100%;
}

.cfl-host > svg {
  display: block;
  width: 100%;
  height: auto;
  max-height: 250px;
}

.cfl-panel {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.cfl-toggle {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.1rem;
}

.cfl-toggle button {
  flex: 1;
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--c-text-dim);
  font-size: 0.85rem;
  cursor: pointer;
}

.cfl-toggle button.is-on {
  border-color: var(--c-accent);
  background: var(--c-accent-soft, rgb(226 168 70 / 16%));
  color: var(--c-accent);
}

.cfl-readout,
.cfl-compare {
  text-align: center;
  line-height: 1.5;
}

.cfl-readout {
  margin-top: 0.3rem;
}

.cfl-compare {
  margin-top: 0.2rem;
  padding-top: 0.4rem;
  border-top: 1px solid var(--c-border);
}

.cfl-hidden {
  visibility: hidden;
}
</style>
