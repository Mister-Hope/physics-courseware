<template>
  <!--
    第 17 页 STSE：地磁偏角。
    地球（共享 CelestialEarth）+ 地轴（竖直虚线）+ 与地轴不重合的地磁轴（倾斜虚线）；
    赤道附近一点处：地理正北方向（灰虚线箭头）与磁针 N 极指向（金色箭头）之间的夹角就是地磁偏角。
    不标"地磁南极 / 地磁北极"，只标地磁轴——避免与地理南北极混淆。
  -->
  <div class="gmd">
    <svg viewBox="0 0 520 340" width="100%" xmlns="http://www.w3.org/2000/svg">
      <CelestialEarth :x="190" :y="170" :r="96" :show-label="false" />
      <!-- 地轴 -->
      <line x1="190" y1="62" x2="190" y2="278" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="7 6" opacity="0.7" />
      <!-- 地磁轴（与地轴约 11° 不重合） -->
      <line x1="171.7" y1="264.3" x2="208.3" y2="75.7" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="7 6" opacity="0.9" />
      <!-- 赤道附近一点 -->
      <circle cx="286" cy="170" r="4.4" fill="var(--c-text)" />
      <!-- 地理正北方向 -->
      <CourseArrow :from="{ x: 286, y: 170 }" :to="{ x: 286, y: 112 }" stroke="var(--c-text-dim)" :stroke-width="2.4" stroke-dasharray="6 5" />
      <!-- 磁针 N 极指向（与地理北偏 20°） -->
      <CourseArrow :from="{ x: 286, y: 170 }" :to="{ x: 303, y: 123 }" stroke="var(--c-accent)" :stroke-width="3" />
      <!-- 地磁偏角 -->
      <g v-if="step >= 1">
        <path d="M 286 136 A 34 34 0 0 1 297.7 138.1" fill="none" stroke="var(--c-danger)" stroke-width="1.8" />
      </g>
    </svg>
    <ChartLabel :x-percent="63.5" :y-percent="31" :parts="[{ text: '地理北' }]" :size="15" color="var(--c-text-dim)" />
    <ChartLabel :x-percent="70" :y-percent="40" :parts="[{ text: '磁针方向' }]" :size="15" color="var(--c-accent)" />
    <ChartLabel :x-percent="36.5" :y-percent="20" :parts="[{ text: '地磁轴' }]" :size="15" color="var(--c-accent)" />
    <ChartLabel :x-percent="36.5" :y-percent="90" :parts="[{ text: '地轴' }]" :size="15" color="var(--c-text-dim)" />
    <ChartLabel v-if="step >= 1" :x-percent="68.5" :y-percent="56" :parts="[{ text: '地磁偏角' }]" :size="16" color="var(--c-danger)" />
  </div>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<style scoped>
.gmd {
  position: relative;
  width: 100%;
  min-width: 0;
}

.gmd svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
