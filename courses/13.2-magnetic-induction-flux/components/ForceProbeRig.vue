<template>
  <!--
    第 4 页《探究：导线受力与什么有关》交互装置
    —— 教材图 13.2-1 的侧视：直导线水平悬挂在磁体两极间（下 N 上 S，磁场由下向上），
       通电后导线摆起一定角度；摆角由 tanθ = F/(mg) 真实算出，F = k·I·l（k = 0.2 为这块磁场的恒定比值）。
    —— 右侧两个滑块改电流 I 与通电长度 l：F 与 I·l 实时变化（step 2 起显示读数），
       F/(I·l) 恒为 0.20 N/(A·m)（step 3 高亮）——比值与 I、l 无关，只由磁场决定。
  -->
  <div class="fpr-wrap">
    <div class="fpr-fig">
      <svg viewBox="0 0 400 330" width="400" height="330" xmlns="http://www.w3.org/2000/svg">
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
          y="53"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="19"
          fill="var(--c-text)"
        >
          S
        </text>
        <rect
          x="100"
          y="264"
          width="200"
          height="40"
          rx="8"
          fill="rgba(148,163,184,0.12)"
          stroke="var(--c-text-dim)"
          stroke-width="1.6"
        />
        <text
          x="200"
          y="291"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="19"
          fill="var(--c-text)"
        >
          N
        </text>
        <CourseArrow
          :from="{ x: 158, y: 254 }"
          :to="{ x: 158, y: 94 }"
          stroke="var(--c-accent)"
          stroke-width="2"
          :opacity="0.4"
        />
        <CourseArrow
          :from="{ x: 240, y: 254 }"
          :to="{ x: 240, y: 94 }"
          stroke="var(--c-accent)"
          stroke-width="2"
          :opacity="0.4"
        />
        <CourseArrow
          :from="{ x: 302, y: 254 }"
          :to="{ x: 302, y: 94 }"
          stroke="var(--c-accent)"
          stroke-width="2"
          :opacity="0.4"
        />
        <line
          x1="200"
          y1="96"
          x2="200"
          y2="252"
          stroke="var(--c-text-dim)"
          stroke-width="1.3"
          stroke-dasharray="6 5"
          opacity="0.7"
        />
        <line
          x1="200"
          y1="96"
          :x2="wire.x"
          :y2="wire.y"
          stroke="var(--c-text)"
          stroke-width="1.8"
          stroke-linecap="round"
        />
        <circle
          :cx="wire.x"
          :cy="wire.y"
          r="11"
          fill="rgba(96,165,250,0.2)"
          stroke="var(--c-text)"
          stroke-width="1.8"
        />
        <circle :cx="wire.x" :cy="wire.y" r="3.2" fill="var(--c-text)" />
        <text
          :x="wire.x - 34"
          :y="wire.y - 22"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="16"
          fill="var(--c-text-dim)"
        >
          I
        </text>
        <CourseArrow
          :from="{ x: wire.x, y: wire.y }"
          :to="{ x: wire.x - forceLen, y: wire.y }"
          stroke="var(--c-danger)"
          stroke-width="3"
        />
        <text
          :x="wire.x - forceLen / 2 - 6"
          :y="wire.y - 12"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="17"
          fill="var(--c-danger)"
        >
          F
        </text>
        <CourseArrow
          :from="{ x: wire.x, y: wire.y }"
          :to="{ x: wire.x, y: wire.y + G_LEN }"
          stroke="var(--c-physics)"
          stroke-width="2.6"
        />
        <text
          :x="wire.x + 12"
          :y="wire.y + G_LEN - 6"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="16"
          fill="var(--c-physics)"
        >
          mg
        </text>
      </svg>
    </div>
    <div class="fpr-panel">
      <CourseSlider v-model="I" :min="0.5" :max="6" :step="0.5" label="电流" label-tex="I">
        <template #value><Latex :tex="iTex" /></template>
      </CourseSlider>
      <CourseSlider
        v-model="L"
        :min="0.05"
        :max="0.4"
        :step="0.05"
        label="通电长度"
        label-tex="l"
        accent="blue"
      >
        <template #value><Latex :tex="lTex" /></template>
      </CourseSlider>
      <div class="fpr-read" :class="{ 'fpr-hidden': step < 2 }">磁场力 <Latex :tex="fTex" /></div>
      <div class="fpr-read" :class="{ 'fpr-hidden': step < 2 }">电流元 <Latex :tex="ilTex" /></div>
      <div class="fpr-ratio" :class="{ 'fpr-hidden': step < 3 }">
        比值 <Latex :tex="ratioTex" /> 恒定不变
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const { step = 1 } = defineProps({
  /** 第几次点击：1 = 装置与滑块，2 = 读数，3 = 比值恒定 */
  step: { type: Number, default: 1 },
});

/** 这块磁场的恒定比值 F/(Il)（教学上到第 5 页才命名为 B，这里只作"同一磁场的恒量"） */
const K = 0.2;
/** 导线参数与偏转几何 */
const M_WIRE = 0.05;
const G = 9.8;
const MG = M_WIRE * G;
const LS = 120;
const PIVOT = { x: 200, y: 96 };
/** 力的比例尺：mg 与最大 F 都换算成相近长度，箭头用同一比例 */
const SCALE = 120;
const G_LEN = MG * SCALE;

const I = ref(3);
const L = ref(0.25);

const force = computed(() => K * I.value * L.value);
const theta = computed(() => Math.atan(force.value / MG));
const wire = computed(() => ({
  x: PIVOT.x - LS * Math.sin(theta.value),
  y: PIVOT.y + LS * Math.cos(theta.value),
}));
const forceLen = computed(() => force.value * SCALE);

const iTex = computed(() => `I = ${I.value.toFixed(1)}\\,\\text{A}`);
const lTex = computed(() => `l = ${L.value.toFixed(2)}\\,\\text{m}`);
const fTex = computed(() => `F = ${force.value.toFixed(3)}\\,\\text{N}`);
const ilTex = computed(() => `Il = ${(I.value * L.value).toFixed(2)}\\,\\text{A}\\cdot\\text{m}`);
const ratioTex = computed(
  () => `\\frac{F}{Il} = ${K.toFixed(2)}\\,\\frac{\\text{N}}{\\text{A}\\cdot\\text{m}}`,
);
</script>

<style scoped>
.fpr-wrap {
  display: flex;
  gap: 1.4rem;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

/* 分步内容始终占位，只把"还没轮到"的藏起来：点击时只出现新元素，已有元素绝不位移 */
.fpr-hidden {
  visibility: hidden;
}

.fpr-fig {
  flex: 0 1 420px;
  min-width: 0;
  touch-action: none;
}

.fpr-fig svg {
  display: block;
  width: 100%;
  height: auto;
}

.fpr-panel {
  display: flex;
  flex: 0 1 430px;
  flex-direction: column;
  gap: 0.85rem;

  min-width: 0;

  font-size: 1rem;
  line-height: 1.7;
}

.fpr-read {
  padding: 0.35rem 0.8rem;
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--c-surface) 60%, transparent);
}

.fpr-ratio {
  padding: 0.35rem 0.8rem;
  border-radius: var(--radius-sm);
  background: var(--c-accent-soft);
  color: var(--c-text);
  font-weight: 600;
}
</style>
