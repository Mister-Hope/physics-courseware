<template>
  <!--
    第 4、5 页《探究通电导线受力的因素》—— 教材图 13.2-1 的侧视。
    上极板 S、下极板 N，磁场由 N 指向 S（竖直向上）；导线水平、与磁场垂直（截面画成圆，通电时圆内点出 ⊙ = 电流垂直纸面向外）。
    F = IlB（B = 0.2 T）、摆角 tanθ = F/(mg)（m = 0.05 kg）都由公式真实算出，摆角随电流/长度实时变。
    俯视接线小图给出"接通 2、3 ↔ 1、4"两种通电长度：l 变长时金色通电段跟着变长。
    mode="demo"：只画装置与摆动（第 4 页）；mode="lab"：加两个滑杆与三行读数（第 5 页）。
  -->
  <div class="wfp">
    <div class="wfp-fig">
      <svg viewBox="0 0 400 330" width="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- 上极板 S、下极板 N -->
        <rect
          x="100"
          y="26"
          width="200"
          height="40"
          rx="8"
          fill="rgba(148,163,184,0.12)"
          stroke="var(--c-text-dim)"
          stroke-width="1.6"
        />
        <text
          x="200"
          y="54"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="19"
          fill="var(--c-text)"
        >
          S
        </text>
        <rect
          x="100"
          y="266"
          width="200"
          height="40"
          rx="8"
          fill="rgba(148,163,184,0.12)"
          stroke="var(--c-text-dim)"
          stroke-width="1.6"
        />
        <text
          x="200"
          y="294"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="19"
          fill="var(--c-text)"
        >
          N
        </text>
        <!-- 由 N 指向 S 的磁感线 -->
        <CourseArrow
          v-for="x in FIELD_X"
          :key="x"
          :from="{ x, y: 264 }"
          :to="{ x, y: 92 }"
          stroke="var(--c-accent)"
          :stroke-width="2"
          :opacity="0.38"
        />
        <!-- 竖直参考虚线（未通电时导线的位置） -->
        <line
          :x1="PIVOT.x"
          :y1="PIVOT.y"
          :x2="PIVOT.x"
          :y2="250"
          stroke="var(--c-text-dim)"
          stroke-width="1.2"
          stroke-dasharray="6 5"
          opacity="0.55"
        />
        <!-- 悬线 -->
        <line
          :x1="PIVOT.x"
          :y1="PIVOT.y"
          :x2="wire.x"
          :y2="wire.y"
          stroke="var(--c-text)"
          stroke-width="1.8"
          stroke-linecap="round"
        />
        <circle :cx="PIVOT.x" :cy="PIVOT.y" r="3.4" fill="var(--c-text-dim)" />
        <!-- 摆角 -->
        <g v-if="powered">
          <path :d="arcPath" fill="none" stroke="var(--c-text-dim)" stroke-width="1.5" />
          <text
            :x="thetaLabel.x"
            :y="thetaLabel.y"
            text-anchor="middle"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="16"
            fill="var(--c-text)"
          >
            θ
          </text>
        </g>
        <!-- 磁场力（第 5 页点击后才给） -->
        <g v-if="showF">
          <CourseArrow
            :from="wire"
            :to="fTip"
            stroke="var(--c-danger)"
            :stroke-width="3"
            label="F"
            :label-dy="-13"
            :label-dx="-6"
          />
        </g>
        <!-- 导线（截面）：通电时圆内点出电流方向 -->
        <circle
          :cx="wire.x"
          :cy="wire.y"
          r="11"
          fill="var(--c-accent-2-soft)"
          stroke="var(--c-text)"
          stroke-width="1.8"
        />
        <circle v-if="powered" :cx="wire.x" :cy="wire.y" r="3.2" fill="var(--c-text)" />
        <text
          :x="wire.x + 20"
          :y="wire.y - 8"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="15"
          fill="var(--c-text-dim)"
        >
          I
        </text>
      </svg>
      <!-- 俯视接线小图：通电段随 l 变长（demo 模式放在图下） -->
      <div v-if="mode === 'demo'" class="wfp-inset" :class="{ 'wfp-hidden': !insetShown }">
        <WireWiringInset :t="t" />
      </div>
    </div>
    <div v-if="mode === 'lab'" class="wfp-panel">
      <CourseSlider v-model="I" :min="0.5" :max="6" :step="0.5" label="电流" label-tex="I">
        <template #value><Latex :tex="iTex" /></template>
      </CourseSlider>
      <CourseSlider
        v-model="L"
        :min="0.1"
        :max="0.4"
        :step="0.05"
        label="通电长度"
        label-tex="l"
        accent="blue"
      >
        <template #value><Latex :tex="lTex" /></template>
      </CourseSlider>
      <div class="wfp-read" :class="{ 'wfp-hidden': step < 1 }">磁场力 <Latex :tex="fTex" /></div>
      <div class="wfp-read" :class="{ 'wfp-hidden': step < 1 }">电流元 <Latex :tex="ilTex" /></div>
      <div class="wfp-ratio" :class="{ 'wfp-hidden': step < 2 }">
        比值 <Latex :tex="ratioTex" />
      </div>
      <div class="wfp-inset">
        <WireWiringInset :t="t" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const { mode = "demo", step = 0 } = defineProps<{
  /** Demo = 第 4 页（只画装置与摆动）；lab = 第 5 页（带滑杆与读数） */
  mode?: "demo" | "lab";
  /** 当前点击步 */
  step?: number;
}>();

/** 这块磁极间的磁感应强度（T） */
const B = 0.2;
/** 导线质量（kg）与摆长（用户单位） */
const MASS = 0.05;
const G = 9.8;
const MG = MASS * G;
const LS = 120;
const PIVOT = { x: 200, y: 96 };
const FIELD_X = [158, 240, 302];

const I = ref(3);
const L = ref(0.25);

const powered = computed(() => (mode === "lab" ? true : step >= 1));
const force = computed(() => B * I.value * L.value);
const theta = computed(() => (powered.value ? Math.atan(force.value / MG) : 0));
const wire = computed(() => ({
  x: PIVOT.x - LS * Math.sin(theta.value),
  y: PIVOT.y + LS * Math.cos(theta.value),
}));
const arcPath = computed(() => {
  const r = 46;
  const ex = PIVOT.x - r * Math.sin(theta.value);
  const ey = PIVOT.y + r * Math.cos(theta.value);
  return `M ${PIVOT.x} ${PIVOT.y + r} A ${r} ${r} 0 0 0 ${ex.toFixed(1)} ${ey.toFixed(1)}`;
});
const thetaLabel = computed(() => ({
  x: PIVOT.x - 64 * Math.sin(theta.value / 2),
  y: PIVOT.y + 64 * Math.cos(theta.value / 2),
}));
/** F 箭头长度：按力的比例尺缩放，最小给 16 免得只剩箭头头 */
const fLen = computed(() => Math.max(26, 20 + force.value * 170));
const fTip = computed(() => ({ x: wire.value.x - fLen.value, y: wire.value.y }));
const showF = computed(() => mode === "lab" && step >= 1);
const insetShown = computed(() => mode === "lab" || step >= 2);
/** T = 0 ↔ 接 2、3（l 最小）；t = 1 ↔ 接 1、4（l 最大） */
const t = computed(() => (L.value - 0.1) / 0.3);

const iTex = computed(() => `I = ${I.value.toFixed(1)}\\ \\text{A}`);
const lTex = computed(() => `l = ${L.value.toFixed(2)}\\ \\text{m}`);
const fTex = computed(() => `F = ${force.value.toFixed(3)}\\ \\text{N}`);
const ilTex = computed(() => `Il = ${(I.value * L.value).toFixed(2)}\\ \\text{A}\\cdot\\text{m}`);
const ratioTex = computed(
  () => `\\dfrac{F}{Il} = ${B.toFixed(2)}\\ \\dfrac{\\text{N}}{\\text{A}\\cdot\\text{m}}`,
);
</script>

<style scoped>
.wfp {
  display: flex;
  gap: 1.3rem;
  align-items: center;
  justify-content: center;

  min-width: 0;
}

.wfp-fig {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 0.4rem;

  min-width: 0;
}

.wfp-fig svg {
  display: block;

  width: 100%;
  max-width: 420px;
  height: auto;
  margin: 0 auto;
}

.wfp-inset {
  width: 78%;
  min-width: 0;
  margin: 0 auto;
}

.wfp-panel {
  display: flex;
  flex: 0 1 420px;
  flex-direction: column;
  gap: 0.45rem;

  min-width: 0;

  font-size: 1rem;
  line-height: 1.6;
}

.wfp-read,
.wfp-ratio {
  display: grid;
  grid-template-columns: 4.6rem 1fr;
  align-items: baseline;

  padding: 0.15rem 0.7rem;
  border-radius: var(--radius-sm);

  background: color-mix(in srgb, var(--c-surface) 60%, transparent);

  font-variant-numeric: tabular-nums;
}

.wfp-ratio {
  background: var(--c-accent-soft);
  font-weight: 600;
}

.wfp-read > :last-child,
.wfp-ratio > :last-child {
  min-width: 13rem;
}

/* 分步内容始终占位，只把还没轮到的藏起来：点击时只出现新元素、已有元素绝不位移 */
.wfp-hidden {
  visibility: hidden;
}
</style>
