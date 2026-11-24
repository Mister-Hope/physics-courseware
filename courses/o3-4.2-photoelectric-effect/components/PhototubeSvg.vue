<!-- 第 3 页：研究光电效应的装置（光电管 + 可调电源 + 电流表） -->
<template>
  <svg viewBox="8 22 344 246" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="86" y="46" width="208" height="132" rx="14" fill="rgba(148, 163, 184, 0.05)" stroke="var(--c-text-dim)" stroke-width="1.4" />
    <text x="190" y="38" font-size="12" fill="var(--c-text-dim)" text-anchor="middle">真空玻璃管</text>
    <line x1="134" y1="78" x2="134" y2="142" stroke="var(--c-accent)" stroke-width="5" stroke-linecap="round" />
    <line x1="246" y1="78" x2="246" y2="142" stroke="var(--c-velocity)" stroke-width="5" stroke-linecap="round" />
    <text x="134" y="162" font-size="13" fill="var(--c-accent)" text-anchor="middle">阴极 K</text>
    <text x="246" y="162" font-size="13" fill="var(--c-velocity)" text-anchor="middle">阳极 A</text>
    <path d="M 18 92 Q 34 80 50 92 T 82 92 T 110 88" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" />
    <path d="M 110 88 L 126 96" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" />
    <path d="M 108 96 L 122 98 M 120 90 L 122 100" fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round" />
    <path d="M 18 116 Q 34 104 50 116 T 82 116 T 108 114" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" />
    <path d="M 108 114 L 124 120" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" />
    <text x="24" y="76" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)">hν</text>
    <g v-if="showElectrons">
      <circle cx="168" cy="98" r="4.5" fill="var(--c-velocity)" />
      <circle cx="196" cy="112" r="4.5" fill="var(--c-velocity)" />
      <circle cx="222" cy="126" r="4.5" fill="var(--c-velocity)" />
      <path
        d="M 160 98 L 178 98 M 190 112 L 206 112 M 216 126 L 232 126"
        fill="none"
        stroke="var(--c-velocity)"
        stroke-width="1"
        opacity="0.5"
        stroke-dasharray="4 3"
      />
      <text x="176" y="88" font-size="11" fill="var(--c-velocity)">光电子</text>
    </g>
    <path d="M 134 142 L 134 232" fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round" />
    <path d="M 246 142 L 246 232" fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round" />
    <path d="M 134 232 L 152 232" fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round" />
    <path d="M 184 232 L 246 232" fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round" />
    <CircuitMeter :x="168" :y="232" kind="a" />
    <CircuitBattery :x="212" :y="232" :flip="reverse" />
    <text x="212" y="262" font-size="12" fill="var(--c-text-dim)" text-anchor="middle">可调电源</text>
    <g v-if="showCurrent">
      <CourseArrow :from="{ x: 134, y: 186 }" :to="{ x: 134, y: 214 }" stroke="var(--c-accent-2)" :head-size="8" :stroke-width="1.8" />
      <CourseArrow :from="{ x: 246, y: 214 }" :to="{ x: 246, y: 186 }" stroke="var(--c-accent-2)" :head-size="8" :stroke-width="1.8" />
      <text x="292" y="206" font-size="12" fill="var(--c-accent-2)">光电流</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
const {
  showElectrons = false,
  showCurrent = false,
  reverse = false,
} = defineProps<{
  showElectrons?: boolean;
  showCurrent?: boolean;
  reverse?: boolean;
}>();
</script>
