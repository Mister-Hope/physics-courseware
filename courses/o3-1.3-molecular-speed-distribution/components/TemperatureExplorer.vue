<!-- 1.3 第 7 页：温度滑块 → 麦克斯韦速率分布曲线（按真实公式计算） -->
<template>
  <div class="sm-explorer">
    <div class="figure sm-fig-explorer">
      <CoordAxes
        :x-range="[0, 1400]"
        :y-range="[0, 1.12]"
        :x-axis="{ quantity: 'v', unit: '(m/s)' }"
        :y-axis="{ quantity: 'f' }"
        :curves="curves"
        :labels="labels"
        :ticks="{ x: [400, 800, 1200], y: [] }"
        :view="{ width: 880, height: 240 }" />
    </div>
    <div class="sm-explorer-row">
      <span class="sm-explorer-label"><Latex tex="T =" /> {{ temperature }} <Latex tex="\text{K}" /></span>
      <CourseSlider v-model="temperature" :min="200" :max="800" :step="10" layout="bare" aria-label="氧气温度（开尔文）" />
      <span class="sm-explorer-value"><Latex :tex="peakLabel" /></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const M = 0.032
const R = 8.314
const temperature = ref(300)

const peakSpeed = (temp: number): number => Math.sqrt((2 * R * temp) / M)

const density = (speed: number, temp: number): number => {
  const scaleFactor = M / (2 * Math.PI * R * temp)
  return 4 * Math.PI * scaleFactor ** 1.5 * speed * speed * Math.exp((-M * speed * speed) / (2 * R * temp))
}

const displayScale = 1.02 / density(peakSpeed(200), 200)

const curves = computed(() => [
  {
    formula: (speed: number) => density(speed, temperature.value) * displayScale,
    stroke: 'var(--c-accent)',
    width: 3
  }
])

const labels = computed(() => {
  const peak = peakSpeed(temperature.value)
  return [
    {
      x: peak + 14,
      y: density(peak, temperature.value) * displayScale - 0.05,
      tex: 'v_p',
      anchor: 'top-left' as const,
      size: 16,
      color: 'var(--c-accent)'
    }
  ]
})

const peakLabel = computed(() => `v_p = ${Math.round(peakSpeed(temperature.value))}\\ \\text{m/s}`)
</script>
