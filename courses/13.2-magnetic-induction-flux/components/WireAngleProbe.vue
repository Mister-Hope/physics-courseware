<template>
  <!--
    第 6 页：导线与磁场方向成夹角时，磁场力怎么变。
    纸面内的二维图（角度精确、不做透视）：导线水平（电流向右），一组平行磁感线与导线成 θ。
    I、B、F 三者互相垂直 ⇒ 这里 F 恒为"垂直纸面向外"，用 ⊙ 记号表示——拖滑杆时 ⊙ 不动、只有读数在变。
    F = IlB·sinθ：θ = 90° 时最大（= IlB），θ = 0 时为零（导线与磁感线平行，不受磁场力）。
  -->
  <div class="wap" :class="{ 'wap-stacked': stacked }">
    <div class="wap-fig">
      <div class="wap-stage">
        <svg viewBox="0 0 520 320" width="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- 平行磁感线（与导线成 θ） -->
          <CourseArrow
            v-for="k in [-1, 0, 1]"
            :key="k"
            :from="arrowFrom(k)"
            :to="arrowTo(k)"
            stroke="var(--c-accent)"
            :stroke-width="2.4"
            :opacity="0.75"
          />
          <text
            :x="arrowTo(-1).x + 10"
            :y="arrowTo(-1).y - 10"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="17"
            fill="var(--c-accent)"
          >
            B
          </text>
          <!-- 导线 + 电流方向 -->
          <CourseArrow
            :from="{ x: 110, y: 210 }"
            :to="{ x: 400, y: 210 }"
            stroke="var(--c-physics)"
            :stroke-width="4"
            label="I"
            :label-dx="-128"
            :label-dy="-14"
          />
          <!-- 夹角 θ（0° 时圆弧退化，不再画） -->
          <g v-if="thetaDeg > 2">
            <path :d="arcPath" fill="none" stroke="var(--c-text-dim)" stroke-width="1.5" />
            <text
              :x="arcLabel.x"
              :y="arcLabel.y"
              text-anchor="middle"
              font-family="KaTeX_Math"
              font-style="italic"
              font-size="17"
              fill="var(--c-text)"
            >
              θ
            </text>
          </g>
          <!-- 磁场力：恒垂直纸面向外 -->
          <g v-if="force > 0">
            <circle
              cx="255"
              cy="210"
              r="10"
              fill="var(--c-surface-solid)"
              stroke="var(--c-danger)"
              stroke-width="2.2"
            />
            <circle cx="255" cy="210" r="3.6" fill="var(--c-danger)" />
            <text
              x="271"
              y="188"
              font-family="KaTeX_Math"
              font-style="italic"
              font-size="17"
              fill="var(--c-danger)"
            >
              F
            </text>
          </g>
          <g v-else>
            <text
              x="238"
              y="188"
              font-family="KaTeX_Math"
              font-style="italic"
              font-size="17"
              fill="var(--c-text-dim)"
            >
              F = 0
            </text>
          </g>
        </svg>
      </div>
      <div class="wap-read" :class="{ 'wap-hidden': step < 2 }"><Latex :tex="fTex" /></div>
    </div>
    <div class="wap-panel">
      <CourseSlider
        v-model="thetaDeg"
        :min="0"
        :max="90"
        :step="1"
        label="导线与磁场的夹角"
        label-width="11rem"
        label-tex="\theta"
      >
        <template #value><Latex :tex="thetaTex" /></template>
      </CourseSlider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const { step = 0, stacked = false } = defineProps<{
  /** 当前点击步 */
  step?: number;
  /** True = 滑杆放在图下方（半栏页面用） */
  stacked?: boolean;
}>();

/** 这块磁场的 B（T）与固定的 Il（A·m） */
const B = 0.2;
const IL = 0.75;
const RAD = Math.PI / 180;

const thetaDeg = ref(45);

const theta = computed(() => thetaDeg.value);
const force = computed(() => B * IL * Math.sin(theta.value * RAD));
const dir = computed(() => ({ x: Math.cos(theta.value * RAD), y: -Math.sin(theta.value * RAD) }));
const perp = computed(() => ({ x: Math.sin(theta.value * RAD), y: Math.cos(theta.value * RAD) }));
const CENTER = { x: 250, y: 84 };
const HALF = 46;

const arrowFrom = (k: number): { x: number; y: number } => ({
  x: CENTER.x + k * 34 * perp.value.x - HALF * dir.value.x,
  y: CENTER.y + k * 34 * perp.value.y - HALF * dir.value.y,
});
const arrowTo = (k: number): { x: number; y: number } => ({
  x: CENTER.x + k * 34 * perp.value.x + HALF * dir.value.x,
  y: CENTER.y + k * 34 * perp.value.y + HALF * dir.value.y,
});
const arcPath = computed(() => {
  const r = 46;
  const ex = 136 + r * Math.cos(theta.value * RAD);
  const ey = 210 - r * Math.sin(theta.value * RAD);
  return `M ${136 + r} 210 A ${r} ${r} 0 0 0 ${ex.toFixed(1)} ${ey.toFixed(1)}`;
});
const arcLabel = computed(() => {
  const half = (theta.value / 2) * RAD;
  return { x: 136 + 62 * Math.cos(half), y: 210 - 62 * Math.sin(half) };
});

const thetaTex = computed(() => `\\theta = ${thetaDeg.value}^\\circ`);
const fTex = computed(() => `F = IlB\\sin\\theta = ${force.value.toFixed(2)}\\ \\text{N}`);

// 第 3 击把导线拨到与磁感线平行；之后老师仍可自己拖
watch(
  () => step,
  (s) => {
    if (s >= 3) thetaDeg.value = 0;
  },
  { immediate: true },
);
</script>

<style scoped>
.wap-stacked {
  flex-direction: column;
  gap: 0.4rem;
  align-items: stretch;
}

.wap {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  min-width: 0;
}

.wap-fig {
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  gap: 0.35rem;

  min-width: 0;
}

.wap-stage {
  width: 100%;
  min-width: 0;
}

.wap-stage svg {
  display: block;
  width: 100%;
  height: auto;
}

.wap-read {
  min-height: 2rem;
  font-variant-numeric: tabular-nums;
  text-align: center;
}

.wap-panel {
  flex: 0 1 340px;
  min-width: 0;
}

.wap-stacked .wap-panel {
  flex: 1 1 auto;
  width: 100%;
}

.wap-hidden {
  visibility: hidden;
}
</style>
