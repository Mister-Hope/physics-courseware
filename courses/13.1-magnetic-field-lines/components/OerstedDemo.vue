<!--
  奥斯特实验（交互组件，对应第 3 页）：导线沿南北方向架在小磁针上方，右侧是电源与开关。
  电流方向与通断由按钮控制（@click，不占翻页点击）；小磁针偏转角由真实公式算：
    tanθ = B_导 / B_地，B_导 = μ0·I / (2πr)（r = 导线到磁针的竖直距离）
  电流向北 → 磁针所在处 B 指向西 → N 极向西（左）偏；电流反向则反向偏转。
-->
<script setup>
import { useSlideContext } from "@slidev/client";
import { computed, ref } from "vue";

const { step = 0 } = defineProps({ step: { type: Number, default: 0 } });

const { $clicks } = useSlideContext();
const cur = computed(() => $clicks.value);

/** Dir: 0 断开 / 1 电流向北（屏幕向上） / -1 电流向南 */
const dir = ref(0);
const I = ref(4);

const MU0_2PI = 2e-7;
const R = 0.05;
const BH = 3e-5;
const Bw = computed(() => (MU0_2PI * I.value) / R);
/** 偏转角（弧度）：向西为负（屏幕上逆时针），由 tanθ = B_导/B_地 算出 */
const theta = computed(() =>
  dir.value === 0 ? 0 : (dir.value > 0 ? -1 : 1) * Math.atan(Bw.value / BH),
);
/** 定性说明（不给实时数值） */
const note = computed(() => {
  if (dir.value === 0) return "开关断开，磁针只受地磁场作用，指南指北";
  const west = dir.value > 0;
  return west
    ? "电流向北，磁针处的磁场向西 —— N 极向西偏；电流越大，偏转越大"
    : "电流向南，磁针处的磁场向东 —— N 极向东偏；电流越大，偏转越大";
});
const rot = computed(() => (theta.value * 180) / Math.PI);
/** 电流磁场方向（西 = 屏幕左 / 东 = 屏幕右） */
const bLeft = computed(() => dir.value > 0);
const pick = (d) => {
  dir.value = d;
};
</script>

<template>
  <div class="flex min-h-0 w-full flex-1 flex-col">
    <div class="mb-1 flex shrink-0 flex-wrap items-center justify-center gap-3">
      <button type="button" class="mf-btn" :class="{ 'mf-btn-on': dir === 0 }" @click="pick(0)">
        断开开关
      </button>
      <button type="button" class="mf-btn" :class="{ 'mf-btn-on': dir > 0 }" @click="pick(1)">
        电流向北
      </button>
      <button type="button" class="mf-btn" :class="{ 'mf-btn-on': dir < 0 }" @click="pick(-1)">
        电流向南
      </button>
      <CourseSlider
        v-model="I"
        :min="0"
        :max="10"
        :step="0.5"
        label="电流"
        label-tex="I"
        layout="tight"
        label-width="5.6rem"
        accent="gold"
      />
    </div>

    <svg viewBox="0 0 420 330" xmlns="http://www.w3.org/2000/svg" class="min-h-0 w-full flex-1">
      <!-- 电路：左腿穿过小磁针上方，上边是开关与电源 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 200 40 H 260" />
        <path d="M 300 40 H 342" />
        <path d="M 358 40 H 380" />
        <path d="M 380 40 V 280" />
        <path d="M 380 280 H 200" />
      </g>
      <CircuitSwitch :x="280" :y="40" :open="dir === 0" label="S" />
      <CircuitBattery :x="350" :y="40" orientation="horizontal" polarity :flip="dir > 0" />

      <!-- 小磁针（含刻度盘） -->
      <circle
        cx="200"
        cy="215"
        r="62"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="2"
        opacity="0.7"
      />
      <g stroke="var(--c-text-dim)" stroke-width="1.6" opacity="0.7">
        <path d="M 200 153 V 165" />
        <path d="M 200 265 V 277" />
        <path d="M 138 215 H 150" />
        <path d="M 250 215 H 262" />
      </g>
      <text
        x="200"
        y="146"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="14"
        fill="var(--c-text-dim)"
      >
        N
      </text>
      <text
        x="200"
        y="296"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="14"
        fill="var(--c-text-dim)"
      >
        S
      </text>
      <text
        x="128"
        y="220"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="14"
        fill="var(--c-text-dim)"
      >
        W
      </text>
      <text
        x="272"
        y="220"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="14"
        fill="var(--c-text-dim)"
      >
        E
      </text>
      <g :transform="`rotate(${rot} 200 215)`">
        <path d="M 200 168 L 210 215 L 200 228 L 190 215 Z" fill="var(--c-danger)" />
        <path d="M 190 215 L 210 215 L 200 262 Z" fill="var(--c-velocity)" />
        <text
          x="200"
          y="186"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="13"
          fill="var(--c-text)"
        >
          N
        </text>
      </g>

      <!-- 导线（画在磁针之上，先垫一圈底色让层级清楚） -->
      <path d="M 200 40 V 280" stroke="var(--c-bg)" stroke-width="9" fill="none" />
      <path d="M 200 40 V 280" stroke="var(--c-text)" stroke-width="3" fill="none" />

      <!-- 电流方向与电流的磁场方向 -->
      <CourseArrow
        v-if="dir !== 0"
        :from="{ x: 200, y: dir > 0 ? 145 : 60 }"
        :to="{ x: 200, y: dir > 0 ? 60 : 145 }"
        stroke="var(--c-accent)"
        stroke-width="3.4"
        label="I"
      />
      <g v-if="dir !== 0 && step >= 1">
        <CourseArrow
          :from="bLeft ? { x: 130, y: 215 } : { x: 270, y: 215 }"
          :to="bLeft ? { x: 60, y: 215 } : { x: 340, y: 215 }"
          stroke="var(--c-field)"
          stroke-width="3.2"
          label="B"
        />
      </g>
    </svg>

    <div class="shrink-0 text-center text-sm" style="color: var(--c-text-dim)">
      {{ note }}
    </div>
  </div>
</template>

<style scoped>
.mf-btn {
  padding: 0.25rem 0.9rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  color: var(--c-text-dim);

  font-size: 0.85rem;

  transition:
    color 0.2s,
    border-color 0.2s,
    background-color 0.2s;
}

.mf-btn-on {
  border-color: var(--c-accent-border);
  background-color: var(--c-accent-soft);
  color: var(--c-accent);
}
</style>
