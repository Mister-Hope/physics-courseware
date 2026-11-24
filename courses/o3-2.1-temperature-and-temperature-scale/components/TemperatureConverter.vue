<script setup lang="ts">
import { computed, ref } from "vue";

const t = ref(20);
const T = computed<number>(() => t.value + 273.15);
const mercTop = computed<number>(() => 300 - ((t.value + 50) / 150) * 228);
const ticks = [-50, 0, 50, 100].map((v): { v: number; y: number } => ({
  v,
  y: 300 - ((v + 50) / 150) * 228,
}));
</script>

<template>
  <div class="temp-converter">
    <div class="temp-thermo">
      <svg viewBox="0 0 220 360" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <text
          x="108"
          y="24"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="14"
          fill="var(--c-text-dim)"
        >
          °C
        </text>
        <rect
          x="96"
          y="34"
          width="24"
          height="266"
          rx="12"
          fill="var(--c-surface)"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
        />
        <circle
          cx="108"
          cy="322"
          r="24"
          fill="var(--c-surface)"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
        />
        <rect
          x="101"
          :y="mercTop"
          width="14"
          :height="300 - mercTop"
          rx="7"
          fill="var(--c-danger)"
        />
        <circle cx="108" cy="322" r="17" fill="var(--c-danger)" />
        <g v-for="tick in ticks" :key="tick.v">
          <line
            x1="120"
            :y1="tick.y"
            x2="132"
            :y2="tick.y"
            stroke="var(--c-text-dim)"
            stroke-width="1"
          />
          <text x="138" :y="tick.y + 4" font-size="11" fill="var(--c-text-dim)">{{ tick.v }}</text>
        </g>
      </svg>
    </div>
    <div class="temp-conv-readout">
      <div class="temp-value-row">
        <span class="temp-value-label">摄氏温度</span>
        <span class="temp-value"
          ><Latex tex="t" /> = {{ t.toFixed(1) }}
          <span class="temp-unit"><Latex tex="\text{°C}" /></span
        ></span>
      </div>
      <div class="temp-value-row">
        <span class="temp-value-label">热力学温度</span>
        <span class="temp-value"
          ><Latex tex="T" /> = {{ T.toFixed(2) }}
          <span class="temp-unit"><Latex tex="\text{K}" /></span
        ></span>
      </div>
      <CourseSlider
        v-model="t"
        :min="-50"
        :max="100"
        :step="0.5"
        label="摄氏温度"
        label-tex="t"
        accent="blue"
      />
      <div class="temp-conv-formula"><Latex tex="T = t + 273.15\ \text{K}" /></div>
    </div>
  </div>
</template>
