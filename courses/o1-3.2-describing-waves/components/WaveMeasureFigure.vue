<script setup lang="ts">
/** 3.2 波的描述 · 波长与周期：同一列正弦波，用括号标出「相邻两个同相点」的间距 */
const { kind = "lambda" } = defineProps<{ kind?: "lambda" | "period" }>();

const xAxis = kind === "lambda" ? { quantity: "x", unit: "m" } : { quantity: "t", unit: "s" };
const yAxis = { quantity: "y", unit: "cm" };
const curves = [
  {
    formula: (u: number): number => Math.sin(Math.PI * u),
    samples: 240,
    color: "var(--c-accent)",
    width: 3,
  },
];
const labels = [
  { x: 0.5, y: 1, dot: 4, color: "var(--c-accent)" },
  { x: 2.5, y: 1, dot: 4, color: "var(--c-accent)" },
];
const mark = kind === "lambda" ? "λ" : "T";
</script>

<template>
  <div class="wm-figure">
    <CoordAxes
      :x-range="[0, 4.4]"
      :y-range="[-1.6, 1.35]"
      :x-axis="xAxis"
      :y-axis="yAxis"
      :curves="curves"
      :labels="labels"
      :ticks="{ x: [1, 2, 3, 4], y: [-1, 1] }"
      :view="{ width: 640, height: 360 }"
      :font-scale="1.35"
    >
      <template #overlay="{ x, y, px2user }">
        <g stroke="var(--c-accent)" stroke-width="1.5" opacity="0.85">
          <line :x1="x(0.5)" :y1="y(-1.12)" :x2="x(2.5)" :y2="y(-1.12)" />
          <line
            :x1="x(0.5)"
            :y1="y(-1.12) - 5 * px2user"
            :x2="x(0.5)"
            :y2="y(-1.12) + 5 * px2user"
          />
          <line
            :x1="x(2.5)"
            :y1="y(-1.12) - 5 * px2user"
            :x2="x(2.5)"
            :y2="y(-1.12) + 5 * px2user"
          />
        </g>
        <text
          :x="x(1.5)"
          :y="y(-1.46)"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="24"
          fill="var(--c-accent)"
          >{{ mark }}</text
        >
      </template>
    </CoordAxes>
  </div>
</template>
