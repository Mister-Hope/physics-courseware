<script setup lang="ts">
/**
 * 第 3 页：改变零电势点的位置，φ_A、φ_B 随之改变，但 U_AB 保持不变。 匀强电场沿 +x 方向（场线向右），电势向右降低：φ(x) = -E(x - x_O)，x_O
 * 是零电势点坐标。 E = 400 V/m，x_A = 0.30 m，x_B = 0.50 m。
 */
import { computed, ref } from "vue";

const E = 400;
const X_A = 0.3;
const X_B = 0.5;

/** 零电势点的位置 (m) */
const xZero = ref(0.4);

const phiA = computed(() => Math.round(-E * (X_A - xZero.value)));
const phiB = computed(() => Math.round(-E * (X_B - xZero.value)));
const uAB = computed(() => phiA.value - phiB.value);

/** 位置换算成 SVG 像素：x = 0.2 → 100，x = 0.6 → 400 */
const toPx = (x: number): number => 100 + (x - 0.2) * 750;
const aPx = toPx(X_A);
const bPx = toPx(X_B);
const zeroPx = computed(() => toPx(xZero.value));
</script>

<template>
  <div class="zpl-lab">
    <svg viewBox="0 0 420 200" width="420" height="200">
      <line
        x1="30"
        y1="100"
        x2="402"
        y2="100"
        stroke="var(--c-field)"
        stroke-width="2"
        opacity="0.45"
      />
      <CourseArrow
        :from="{ x: 210, y: 100 }"
        :to="{ x: 265, y: 100 }"
        stroke="var(--c-field)"
        stroke-width="2"
        opacity="0.9"
      />
      <CourseArrow
        :from="{ x: 344, y: 100 }"
        :to="{ x: 399, y: 100 }"
        stroke="var(--c-field)"
        stroke-width="2"
        opacity="0.9"
      />
      <text x="36" y="82" fill="var(--c-text-dim)" font-size="12">电势高</text>
      <text x="396" y="82" text-anchor="end" fill="var(--c-text-dim)" font-size="12">电势低</text>
      <circle :cx="aPx" cy="100" r="5.5" fill="var(--c-neutral-200)" />
      <text
        :x="aPx"
        y="126"
        text-anchor="middle"
        fill="var(--c-text-dim)"
        font-size="14"
        font-style="italic"
        font-family="KaTeX_Math"
      >
        A
      </text>
      <circle :cx="bPx" cy="100" r="5.5" fill="var(--c-neutral-200)" />
      <text
        :x="bPx"
        y="126"
        text-anchor="middle"
        fill="var(--c-text-dim)"
        font-size="14"
        font-style="italic"
        font-family="KaTeX_Math"
      >
        B
      </text>
      <line
        :x1="zeroPx"
        y1="66"
        :x2="zeroPx"
        y2="134"
        stroke="var(--c-accent)"
        stroke-width="1.4"
        stroke-dasharray="5 4"
      />
      <circle :cx="zeroPx" cy="100" r="7" fill="none" stroke="var(--c-accent)" stroke-width="2" />
      <text
        :x="zeroPx"
        y="58"
        text-anchor="middle"
        fill="var(--c-accent)"
        font-size="14"
        font-style="italic"
        font-family="KaTeX_Math"
      >
        O
      </text>
    </svg>
    <div class="zpl-panel">
      <div class="zpl-reads">
        <div class="zpl-cell">
          <span class="zpl-k"><Latex tex="\varphi_A" /></span>
          <span class="zpl-v">{{ phiA }}<Latex tex="\text{ V}" /></span>
        </div>
        <div class="zpl-cell">
          <span class="zpl-k"><Latex tex="\varphi_B" /></span>
          <span class="zpl-v">{{ phiB }}<Latex tex="\text{ V}" /></span>
        </div>
        <div class="zpl-cell zpl-cell--u">
          <span class="zpl-k"><Latex tex="U_{AB}" /></span>
          <span class="zpl-v">{{ uAB }}<Latex tex="\text{ V}" /></span>
        </div>
      </div>
      <CourseSlider
        v-model="xZero"
        :min="0.2"
        :max="0.6"
        :step="0.05"
        label="零电势点"
        label-tex="x_O"
      >
        <template #value>{{ xZero.toFixed(2) }}<Latex tex="\text{ m}" /></template>
      </CourseSlider>
      <div class="zpl-note">
        <Latex tex="\varphi = -E(x - x_O)" />，<Latex tex="E = 400\ \text{V/m}" />，<Latex
          tex="x_A = 0.30\ \text{m}"
        />，<Latex tex="x_B = 0.50\ \text{m}" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.zpl-lab {
  display: flex;
  gap: 1.4rem;
  align-items: center;
  min-width: 0;
}

.zpl-lab svg {
  flex: none;
}

.zpl-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.85rem;

  min-width: 0;
}

.zpl-reads {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
}

.zpl-cell {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  padding: 0.45rem 0.8rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);
}

.zpl-cell--u {
  border-color: var(--c-border-glow);
}

.zpl-k {
  color: var(--c-text-dim);
  font-size: 0.75rem;
}

.zpl-v {
  color: var(--c-text);
  font-size: 1.05rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.zpl-cell--u .zpl-v {
  color: var(--c-accent);
}

.zpl-note {
  color: var(--c-text-dim);
  font-size: 0.72rem;
  line-height: 1.5;
}
</style>
