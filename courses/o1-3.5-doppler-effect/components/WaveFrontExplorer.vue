<!-- 第 10 页：拖动滑块改变波源速度，观察前方波前挤密、后方拉疏，以及每秒通过的波峰数 -->
<template>
  <div class="dp-explorer">
    <div class="figure dp-fig-explorer">
      <svg viewBox="0 0 660 244" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g fill="none" stroke="var(--c-accent)" stroke-width="1.5">
          <circle
            v-for="ring in rings"
            :key="ring.k"
            :cx="ring.cx"
            cy="122"
            :r="ring.r"
            :opacity="0.85 - ring.k * 0.09"
          />
        </g>
        <line
          x1="40"
          y1="122"
          x2="620"
          y2="122"
          stroke="var(--c-text-mute)"
          stroke-width="1"
          stroke-dasharray="5 5"
          opacity="0.4"
        />
        <circle cx="330" cy="122" r="6" fill="var(--c-accent-light)" />
        <line
          x1="344"
          y1="122"
          :x2="344 + speed * 120"
          y2="122"
          stroke="var(--c-physics)"
          stroke-width="2.4"
          stroke-linecap="round"
        />
        <path :d="`M ${344 + speed * 120} 122 l -10 -5 v 10 z`" fill="var(--c-physics)" />
        <text
          :x="352 + speed * 60"
          y="106"
          text-anchor="middle"
          font-size="14"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="var(--c-physics)"
        >
          v
        </text>
        <circle cx="604" cy="122" r="7" fill="var(--c-physics-light)" />
        <text x="604" y="148" text-anchor="middle" font-size="13" fill="var(--c-physics-light)">
          观察者 A
        </text>
        <circle cx="56" cy="122" r="7" fill="var(--c-physics-light)" />
        <text x="56" y="148" text-anchor="middle" font-size="13" fill="var(--c-physics-light)">
          观察者 B
        </text>
      </svg>
    </div>
    <div class="dp-explorer-row">
      <span class="dp-explorer-label">波源速度</span>
      <CourseSlider
        v-model="speed"
        :min="0"
        :max="0.6"
        :step="0.05"
        layout="bare"
        aria-label="波源速度（与波速之比）"
      />
      <span class="dp-explorer-value"><Latex :tex="`v_s = ${speed.toFixed(2)}\\,v`" /></span>
    </div>
    <div class="dp-read">
      <div class="dp-read-item">
        <span class="dp-read-label">观察者 A（前方）</span>
        <Latex :tex="`\\lambda_A = ${frontLambda.toFixed(2)}\\,\\lambda_0`" />
        <span class="dp-read-sub">每秒通过 <Latex :tex="`${frontCount.toFixed(1)}`" /> 个波峰</span>
      </div>
      <div class="dp-read-item">
        <span class="dp-read-label">观察者 B（后方）</span>
        <Latex :tex="`\\lambda_B = ${backLambda.toFixed(2)}\\,\\lambda_0`" />
        <span class="dp-read-sub">每秒通过 <Latex :tex="`${backCount.toFixed(1)}`" /> 个波峰</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const speed = ref(0.3);

const rings = computed(() =>
  [1, 2, 3, 4, 5].map((k) => ({
    k,
    cx: 330 - 24 * speed.value * k,
    r: 24 * k,
  })),
);

const frontLambda = computed(() => 1 - speed.value);
const backLambda = computed(() => 1 + speed.value);
const frontCount = computed(() => 3 / (1 - speed.value));
const backCount = computed(() => 3 / (1 + speed.value));
</script>
