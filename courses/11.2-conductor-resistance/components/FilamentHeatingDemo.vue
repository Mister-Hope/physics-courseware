<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 14 页交互：演示"电阻率与温度的关系"。 灯丝（钨）与小灯泡串联：加热灯丝 → 灯丝电阻率变大 → 灯丝电阻 R 变大 → 电流 I 变小 → 小灯泡变暗。 全部按真实公式计算：R =
 * R0 * [1 + alpha * (T - T0)]，I = U / (R + R_L)，灯泡发光强度随 P = I^2 * R_L 变化。
 */
const TEMP_COLD = 20;
const R0 = 2;
const ALPHA = 4.5e-3;
const R_BULB = 6;
const SOURCE_U = 6;

const temperature = ref(TEMP_COLD);

const filamentR = computed(() => R0 * (1 + ALPHA * (temperature.value - TEMP_COLD)));
const current = computed(() => SOURCE_U / (filamentR.value + R_BULB));
const powerRatio = computed(
  () => (current.value * current.value * R_BULB) / ((SOURCE_U / (R0 + R_BULB)) ** 2 * R_BULB),
);

const glowR = computed(() => 15 + 19 * powerRatio.value);
const glowOpacity = computed(() => 0.22 + 0.6 * powerRatio.value);
const flameH = computed(() => 14 + 20 * ((temperature.value - TEMP_COLD) / 800));
</script>

<template>
  <div class="fd-wrap">
    <div class="fd-figure">
      <svg
        viewBox="0 0 620 250"
        xmlns="http://www.w3.org/2000/svg"
        class="block w-full h-auto"
        aria-hidden="true"
      >
        <circle
          :cx="550"
          :cy="100"
          :r="glowR"
          fill="rgba(251,191,36,0.16)"
          :style="{ opacity: glowOpacity }"
        />
        <circle
          :cx="550"
          :cy="100"
          :r="glowR * 0.68"
          fill="rgba(251,191,36,0.28)"
          :style="{ opacity: glowOpacity }"
        />
        <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
          <path d="M 70 40 H 120" />
          <path d="M 160 40 H 550" />
          <path d="M 70 40 V 92" />
          <path d="M 70 108 V 160" />
          <path d="M 70 160 H 276" />
          <path d="M 324 160 H 550" />
          <path d="M 550 160 V 112" />
          <path d="M 550 88 V 40" />
        </g>
        <CircuitBattery :x="70" :y="100" orientation="vertical" polarity />
        <CircuitSwitch :x="140" :y="40" :open="false" label="S" />
        <CircuitResistor :x="300" :y="160" label="灯丝" :color="'var(--c-accent)'" />
        <CircuitBulb :x="550" :y="100" label="L" />
        <path
          :d="`M 300 ${200 - flameH} C 309 ${200 - flameH * 0.5} 308 ${200 - flameH * 0.16} 300 200 C 292 ${200 - flameH * 0.16} 291 ${200 - flameH * 0.5} 300 ${200 - flameH} Z`"
          fill="rgba(248,113,113,0.75)"
          stroke="rgba(251,191,36,0.9)"
          stroke-width="1.2"
        />
        <path
          d="M 288 200 H 312 L 318 240 H 282 Z"
          fill="rgba(148,163,184,0.16)"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="fd-panel">
      <CourseSlider
        v-model="temperature"
        :min="20"
        :max="820"
        :step="20"
        label="灯丝温度"
        accent="red"
        label-width="5.4rem"
      >
        <template #value>{{ temperature.toFixed(0) }}<Latex tex="\ ^\circ\text{C}" /></template>
      </CourseSlider>
      <div class="fd-readout">
        <div class="fd-row">
          <span class="fd-k"><Latex tex="R" /></span>
          <span class="fd-v">{{ filamentR.toFixed(2) }}<Latex tex="\ \Omega" /></span>
        </div>
        <div class="fd-row">
          <span class="fd-k"><Latex tex="I" /></span>
          <span class="fd-v">{{ current.toFixed(2) }}<Latex tex="\ \text{A}" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fd-wrap {
  display: flex;
  gap: 1.4rem;
  align-items: center;
  min-width: 0;
}

.fd-figure {
  flex: 1;
  min-width: 0;
}

.fd-panel {
  display: grid;
  gap: 0.8rem;
  width: 16rem;
}

.fd-readout {
  display: grid;
  gap: 0.3rem;
}

.fd-row {
  display: grid;
  grid-template-columns: 2.2rem minmax(0, 1fr);
  align-items: baseline;
}

.fd-k {
  color: var(--c-text-dim);
}

.fd-v {
  font-size: 1.15rem;
  font-variant-numeric: tabular-nums;
}
</style>
