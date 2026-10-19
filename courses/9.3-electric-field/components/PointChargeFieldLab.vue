<script setup lang="ts">
import { computed, ref } from "vue";

// 第 10 页：点电荷的电场 E = kQ/r²。
// showSphere（第 1 击）：以 Q 为球心的球面 + 球面上等长的径向场强箭头；
// showRatio（第 2 击）：r 与 2r 两处的场强对照读数。
// 页面上的按钮切换 Q 的正负：大小不变，方向沿半径向外 / 向内。
defineProps<{ showSphere?: boolean; showRatio?: boolean }>();

const K = 9e9;
const QMAG = 2e-8; // |Q|，单位 C
const positive = ref(true);
const r = ref(0.12); // P 点到点电荷的距离，单位 m

const E = computed(() => (K * QMAG) / (r.value * r.value));
const E2 = computed(() => (K * QMAG) / (4 * r.value * r.value));

// 箭头长度：以 r 取最小值时的场强为参考；E(2r) 恒为 E/4，长度也严格 1 : 4
const E_REF = (K * QMAG) / (0.05 * 0.05);
const len1 = computed(() => Math.max(8, 56 * (E.value / E_REF)));
const len2 = computed(() => Math.max(6, 14 * (E.value / E_REF)));
const dir = computed(() => (positive.value ? 1 : -1));

const OX = 110;
const OY = 88;
const d1 = computed(() => 80 + ((r.value - 0.05) / 0.25) * 120);
const d2 = computed(() => 2 * d1.value);

const SPHERE_DIRS = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4;
  return { x: Math.cos(a), y: Math.sin(a) };
});

function sci(value: number, digits = 2) {
  const e = Math.floor(Math.log10(value));
  const m = value / 10 ** e;
  return { m: m.toFixed(digits), e };
}
const eTex = computed(() => {
  const s = sci(E.value);
  return `E = ${s.m}\\times 10^{${s.e}}\\ \\text{N/C}`;
});
const e2Tex = computed(() => {
  const s = sci(E2.value);
  return `E(2r) = ${s.m}\\times 10^{${s.e}}\\ \\text{N/C}`;
});
const ratioTex = computed(() => String.raw`\dfrac{E(r)}{E(2r)} = 4`);
</script>

<template>
  <div class="pcl">
    <svg viewBox="0 0 720 170" class="pcl-fig">
      <line
        :x1="OX"
        :y1="OY"
        :x2="OX + d2"
        :y2="OY"
        stroke="var(--c-neutral-500)"
        stroke-opacity="0.4"
        stroke-width="1.6"
        stroke-dasharray="4 6"
      />
      <g v-if="showSphere">
        <circle
          :cx="OX"
          :cy="OY"
          :r="d1"
          fill="none"
          stroke="var(--c-border)"
          stroke-dasharray="4 6"
        />
        <CourseArrow
          v-for="(d, i) in SPHERE_DIRS"
          :key="`s${i}`"
          :from="{ x: OX + d.x * d1, y: OY + d.y * d1 }"
          :to="{ x: OX + d.x * (d1 + dir * len1), y: OY + d.y * (d1 + dir * len1) }"
          stroke="var(--c-field)"
          :stroke-width="2"
        />
      </g>
      <circle :cx="OX" :cy="OY" r="18" fill="var(--c-danger)" fill-opacity="0.9" />
      <text
        :x="OX"
        :y="OY"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="18"
        fill="#fff"
      >
        +
      </text>
      <text
        :x="OX"
        :y="OY + 46"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-danger)"
      >
        Q
      </text>
      <circle :cx="OX + d1" :cy="OY" r="5" fill="var(--c-accent)" />
      <CourseArrow
        :from="{ x: OX + d1, y: OY }"
        :to="{ x: OX + d1 + dir * len1, y: OY }"
        stroke="var(--c-force)"
        :stroke-width="3"
      />
      <text
        :x="OX + d1"
        :y="OY - 30"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        fill="var(--c-force)"
      >
        E
      </text>
      <circle :cx="OX + d2" :cy="OY" r="5" fill="var(--c-accent)" />
      <CourseArrow
        :from="{ x: OX + d2, y: OY }"
        :to="{ x: OX + d2 + dir * len2, y: OY }"
        stroke="var(--c-force)"
        :stroke-width="3"
      />
      <text
        :x="OX + d2"
        :y="OY - 30"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        fill="var(--c-force)"
      >
        E
      </text>
      <text
        :x="OX + d1 / 2"
        :y="OY + 30"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-neutral-500)"
      >
        r
      </text>
      <text
        :x="OX + d1 + d1 / 2"
        :y="OY + 30"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-neutral-500)"
      >
        2r
      </text>
    </svg>
    <div class="pcl-panel">
      <CourseSlider
        v-model="r"
        :min="0.05"
        :max="0.3"
        :step="0.01"
        label-tex="r"
        label-width="2.4rem"
        accent="blue"
      />
      <button class="pcl-toggle" type="button" @click="positive = !positive">
        <Latex :tex="positive ? 'Q > 0' : 'Q < 0'" />
      </button>
      <div class="pcl-read"><Latex :tex="eTex" /></div>
      <div class="pcl-read" :class="{ 'pcl-hidden': !showRatio }"><Latex :tex="e2Tex" /></div>
      <div class="pcl-read pcl-ratio" :class="{ 'pcl-hidden': !showRatio }">
        <Latex :tex="ratioTex" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pcl {
  display: flex;
  gap: 1.25rem;
  align-items: stretch;
}

.pcl-fig {
  flex: 1 1 0;
  min-width: 0;
  height: 150px;
}

.pcl-panel {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 0.24rem;
  justify-content: center;

  width: 13rem;
}

.pcl-toggle {
  align-self: flex-start;

  padding: 0.16rem 0.85rem;
  border: 1px solid rgb(148 163 184 / 30%);
  border-radius: 999px;

  background: var(--c-surface);
  color: var(--c-text);

  cursor: pointer;
}

.pcl-read {
  font-size: 0.92rem;
}

.pcl-ratio {
  color: var(--c-accent);
}

.pcl-hidden {
  visibility: hidden;
}
</style>
