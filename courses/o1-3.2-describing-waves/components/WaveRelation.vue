<script setup lang="ts">
import { computed, ref } from "vue";

/** 3.2 波的描述 · v=λf 互动：改变波源频率或介质，观察波长与周期的真实变化（v 由介质决定，f 由波源决定） */
const f = ref(1);
const medium = ref<"A" | "B">("A");
const v = computed(() => (medium.value === "A" ? 2 : 4));
const lambda = computed(() => v.value / f.value);
const period = computed(() => 1 / f.value);
const curves = computed(() => [
  {
    formula: (x: number): number => Math.sin((2 * Math.PI * x) / lambda.value),
    samples: 360,
    color: "var(--c-accent)",
    width: 3,
  },
]);
const xAxis = { quantity: "x", unit: "m" };
const yAxis = { quantity: "y", unit: "cm" };
const setMedium = (m: "A" | "B"): void => {
  medium.value = m;
};
const mediumStyle = (m: "A" | "B"): Record<string, string> => ({
  background: medium.value === m ? "rgba(226, 168, 70, 0.2)" : "transparent",
  borderColor: medium.value === m ? "var(--c-accent)" : "var(--c-line)",
  color: medium.value === m ? "var(--c-accent)" : "var(--c-text-dim)",
});
</script>

<template>
  <div class="wr-stack">
    <CoordAxes
      :x-range="[0, 8]"
      :y-range="[-1.6, 1.35]"
      :x-axis="xAxis"
      :y-axis="yAxis"
      :curves="curves"
      :ticks="{ x: [2, 4, 6, 8], y: [-1, 1] }"
      :view="{ width: 900, height: 260 }"
      :font-scale="1.05"
    >
      <template #overlay="{ x, y, px2user }">
        <g stroke="var(--c-accent)" stroke-width="1.5" opacity="0.85">
          <line :x1="x(0)" :y1="y(-1.18)" :x2="x(lambda)" :y2="y(-1.18)" />
          <line :x1="x(0)" :y1="y(-1.18) - 5 * px2user" :x2="x(0)" :y2="y(-1.18) + 5 * px2user" />
          <line
            :x1="x(lambda)"
            :y1="y(-1.18) - 5 * px2user"
            :x2="x(lambda)"
            :y2="y(-1.18) + 5 * px2user"
          />
        </g>
        <text
          :x="x(lambda / 2)"
          :y="y(-1.47)"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="22"
          fill="var(--c-accent)"
          >λ</text
        >
      </template>
    </CoordAxes>
    <div class="wr-controls">
      <div class="wr-medium">
        <span class="wr-label">介质</span>
        <button class="wr-btn" :style="mediumStyle('A')" @click.stop="setMedium('A')">绳 A</button>
        <button class="wr-btn" :style="mediumStyle('B')" @click.stop="setMedium('B')">绳 B</button>
      </div>
      <div class="wr-f">
        <CourseSlider
          v-model="f"
          :min="0.5"
          :max="2"
          :step="0.1"
          label="频率"
          label-tex="f"
          accent="gold"
        />
      </div>
      <div class="wr-readouts">
        <div class="wr-readout">
          <span class="wr-k">波速 <Latex tex="v" /></span
          ><span class="wr-v">{{ v.toFixed(1) }} <Latex tex="\text{m/s}" /></span>
        </div>
        <div class="wr-readout">
          <span class="wr-k">频率 <Latex tex="f" /></span
          ><span class="wr-v">{{ f.toFixed(1) }} <Latex tex="\text{Hz}" /></span>
        </div>
        <div class="wr-readout">
          <span class="wr-k">波长 <Latex tex="\lambda" /></span
          ><span class="wr-v">{{ lambda.toFixed(2) }} <Latex tex="\text{m}" /></span>
        </div>
        <div class="wr-readout">
          <span class="wr-k">周期 <Latex tex="T" /></span
          ><span class="wr-v">{{ period.toFixed(2) }} <Latex tex="\text{s}" /></span>
        </div>
      </div>
    </div>
    <div class="tip-hint">
      同一介质中波速 <Latex tex="v" /> 不变；频率 <Latex tex="f" /> 由波源决定，波长
      <Latex tex="\lambda = v/f" /> 随频率改变。
    </div>
  </div>
</template>
