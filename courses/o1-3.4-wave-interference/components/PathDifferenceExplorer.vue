<!-- 第 10 页：拖动 P 点，实时算出到 S₁、S₂ 的路程差，并判断加强 / 减弱（真算） -->
<template>
  <div class="wi-explorer">
    <div class="figure">
      <svg
        viewBox="70 22 520 152"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line
          x1="90"
          y1="124"
          x2="570"
          y2="124"
          stroke="var(--c-text-dim)"
          stroke-width="1"
          stroke-dasharray="5 6"
          opacity="0.45"
        />
        <line
          :x1="240"
          :y1="64"
          :x2="pX"
          :y2="124"
          stroke="var(--c-accent)"
          stroke-width="1.4"
          stroke-dasharray="4 5"
          opacity="0.55"
        />
        <line
          :x1="420"
          :y1="64"
          :x2="pX"
          :y2="124"
          stroke="var(--c-physics)"
          stroke-width="1.4"
          stroke-dasharray="4 5"
          opacity="0.55"
        />
        <circle cx="240" cy="64" r="6" fill="var(--c-accent)" />
        <circle cx="420" cy="64" r="6" fill="var(--c-physics)" />
        <circle :cx="pX" cy="124" r="6" fill="var(--c-text)" />
        <text
          x="226"
          y="56"
          text-anchor="end"
          font-size="15"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="var(--c-accent)"
        >
          S<tspan dy="4" font-size="10">1</tspan>
        </text>
        <text
          x="434"
          y="56"
          font-size="15"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="var(--c-physics)"
        >
          S<tspan dy="4" font-size="10">2</tspan>
        </text>
        <text
          :x="pX"
          y="146"
          text-anchor="middle"
          font-size="15"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="var(--c-text)"
        >
          P
        </text>
      </svg>
    </div>
    <CourseSlider v-model="pos" :min="0" :max="100" :step="1" layout="bare" aria-label="P 点位置" />
    <div class="wi-explorer-row">
      <div class="wi-explorer-read"><Latex :tex="deltaTex" /></div>
      <div class="wi-explorer-tag" :class="verdictClass">{{ verdict }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const pos = ref(50);

const lambda = 2;
const scale = 60;

const pX = computed(() => 90 + (pos.value / 100) * 480);
const s1 = { x: 240, y: 64 };
const s2 = { x: 420, y: 64 };

const delta = computed(() => {
  const p = { x: pX.value, y: 124 };
  const d1 = Math.hypot(p.x - s1.x, p.y - s1.y);
  const d2 = Math.hypot(p.x - s2.x, p.y - s2.y);
  return Math.abs(d1 - d2) / scale;
});

const deltaTex = computed(() => `\\Delta r = ${delta.value.toFixed(2)}\\ \\text{m}`);

const verdict = computed(() => {
  const ratio = delta.value / lambda;
  const nearest = Math.round(ratio);
  if (Math.abs(ratio - nearest) < 0.06) return "路程差是半波长的偶数倍：加强";
  if (Math.abs(ratio - nearest - 0.5) < 0.06) return "路程差是半波长的奇数倍：减弱";
  return "介于加强点与减弱点之间";
});

const verdictClass = computed((): string => {
  const ratio = delta.value / lambda;
  const nearest = Math.round(ratio);
  if (Math.abs(ratio - nearest) < 0.06) return "wi-tag-strong";
  if (Math.abs(ratio - nearest - 0.5) < 0.06) return "wi-tag-weak";
  return "wi-tag-mid";
});
</script>
