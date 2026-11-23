<!-- 第 10 页：B 与导线成 θ 角时的安培力（F = IlB sinθ） -->
<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 });
const theta = ref(45);
const fixedCurrent = 2;
const fixedLength = 0.4;
const fixedField = 0.5;
const rad = computed(() => (theta.value * Math.PI) / 180);
const force = computed(() => fixedCurrent * fixedLength * fixedField * Math.sin(rad.value));
const showDecomp = computed(() => props.step >= 1);
const tipX = computed(() => 240 + 130 * Math.cos(rad.value));
const tipY = computed(() => 210 - 130 * Math.sin(rad.value));
const parX = computed(() => 240 + 130 * Math.cos(rad.value));
const perY = computed(() => 210 - 130 * Math.sin(rad.value));
const arcEndX = computed(() => 240 + 38 * Math.cos(rad.value));
const arcEndY = computed(() => 210 - 38 * Math.sin(rad.value));
</script>

<template>
  <div class="angle-lab">
    <div class="angle-fig">
      <svg
        viewBox="0 0 480 300"
        class="course-fig"
        role="img"
        aria-label="磁场与导线成夹角时的安培力"
      >
        <line
          x1="70"
          y1="210"
          x2="410"
          y2="210"
          stroke="var(--c-accent)"
          stroke-width="7"
          stroke-linecap="round"
        />
        <CourseArrow
          :from="{ x: 120, y: 210 }"
          :to="{ x: 205, y: 210 }"
          stroke="var(--c-accent-2)"
          :stroke-width="3"
        />
        <text
          x="160"
          y="198"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="16"
          fill="var(--c-accent-2)"
        >
          I
        </text>
        <CourseArrow
          :from="{ x: 240, y: 210 }"
          :to="{ x: tipX, y: tipY }"
          stroke="var(--c-accent)"
          :stroke-width="3"
        />
        <text
          :x="tipX + 8"
          :y="tipY - 4"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="16"
          fill="var(--c-accent)"
        >
          B
        </text>
        <path
          :d="`M 278 210 A 38 38 0 0 1 ${arcEndX} ${arcEndY}`"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="4 3"
        />
        <text
          x="300"
          y="196"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="15"
          fill="var(--c-text-dim)"
        >
          θ
        </text>
        <g v-show="showDecomp">
          <line
            x1="240"
            y1="210"
            :x2="parX"
            y2="210"
            stroke="var(--c-text-dim)"
            stroke-width="1.6"
            stroke-dasharray="6 4"
          />
          <text
            :x="parX - 12"
            :y="198"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="15"
            fill="var(--c-text-dim)"
          >
            <tspan>B</tspan><tspan baseline-shift="sub" font-size="11">∥</tspan>
          </text>
          <line
            x1="240"
            y1="210"
            x2="240"
            :y2="perY"
            stroke="var(--c-text-dim)"
            stroke-width="1.6"
            stroke-dasharray="6 4"
          />
          <text
            x="252"
            :y="perY + 26"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="15"
            fill="var(--c-text-dim)"
          >
            <tspan>B</tspan><tspan baseline-shift="sub" font-size="11">⊥</tspan>
          </text>
        </g>
        <g v-show="force > 0.005">
          <FieldMark
            :x="240"
            :y="210"
            dir="out"
            :r="16"
            :line-width="2"
            color="var(--c-force)"
            label="F"
            :label-size="16"
          />
        </g>
      </svg>
    </div>
    <div class="angle-controls">
      <CourseSlider
        v-model="theta"
        :min="0"
        :max="90"
        :step="5"
        label="夹角"
        label-tex="\theta"
        accent="teal"
      >
        <template #value><Latex :tex="`${theta}^\\circ`" /></template>
      </CourseSlider>
      <div class="angle-readout">
        <Latex tex="F" /> <span class="angle-eq">=</span>
        <span class="angle-value">{{ force.toFixed(2) }}</span>
        <span class="angle-unit">N</span>
      </div>
      <div class="angle-fixed">
        <Latex tex="I = 2\ \text{A}" />，<Latex tex="l = 0.40\ \text{m}" />，<Latex
          tex="B = 0.50\ \text{T}"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.angle-lab {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 1.4rem;
  align-items: center;
  width: 100%;
}

.angle-fig,
.angle-controls {
  min-width: 0;
}

.angle-controls {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.angle-readout {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  padding: 0.5rem 0.9rem;
  font-size: 1.05rem;
  border: 1px solid var(--c-border);
  border-radius: 0.9rem;
  background: color-mix(in srgb, var(--c-accent) 6%, transparent);
}

.angle-eq {
  color: var(--c-text-dim);
}

.angle-value {
  display: inline-block;
  min-width: 4.4rem;
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-family: "JetBrains Mono", monospace;
  color: var(--c-accent);
}

.angle-unit {
  color: var(--c-text-dim);
}

.angle-fixed {
  font-size: 0.85rem;
  color: var(--c-text-dim);
}
</style>
