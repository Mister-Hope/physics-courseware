<!-- 第 5 页：振源处周期性变化的电场激起变化的磁场，又激起新的变化的电场，由近及远传播（因果链示意） -->
<script setup lang="ts">
defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 880 250" width="100%" xmlns="http://www.w3.org/2000/svg">
    <g v-if="(step ?? 0) >= 1">
      <line
        x1="36"
        y1="44"
        x2="36"
        y2="166"
        stroke="var(--c-accent)"
        stroke-width="2.6"
        stroke-linecap="round"
      />
      <circle cx="36" cy="44" r="5" fill="var(--c-accent)" />
      <text x="36" y="190" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">振源</text>
      <rect
        x="70"
        y="26"
        width="220"
        height="160"
        rx="12"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.6"
        stroke-dasharray="7 5"
      />
      <g stroke="var(--c-danger)" stroke-width="2.6" stroke-linecap="round">
        <line x1="100" y1="164" x2="100" y2="48" />
        <line x1="140" y1="164" x2="140" y2="48" />
        <line x1="180" y1="164" x2="180" y2="48" />
        <line x1="220" y1="164" x2="220" y2="48" />
        <line x1="260" y1="164" x2="260" y2="48" />
      </g>
      <text x="180" y="212" text-anchor="middle" font-size="16" fill="var(--c-text)">
        变化的电场
        <tspan font-family="KaTeX_Math" font-style="italic">E</tspan>
      </text>
    </g>
    <g v-if="(step ?? 0) >= 2">
      <CourseArrow
        :from="{ x: 294, y: 106 }"
        :to="{ x: 326, y: 106 }"
        stroke="var(--c-accent)"
        stroke-width="2.4"
      />
      <text x="310" y="86" text-anchor="middle" font-size="14" fill="var(--c-accent)">激起</text>
      <rect
        x="330"
        y="26"
        width="220"
        height="160"
        rx="12"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.6"
        stroke-dasharray="7 5"
      />
      <FieldDots
        :x="380"
        :y="58"
        :cols="6"
        :rows="5"
        :spacing="24"
        :size="4"
        dir="in"
        color="var(--c-accent-2)"
      />
      <text x="440" y="212" text-anchor="middle" font-size="16" fill="var(--c-text)">
        变化的磁场
        <tspan font-family="KaTeX_Math" font-style="italic">B</tspan>
      </text>
    </g>
    <g v-if="(step ?? 0) >= 3">
      <CourseArrow
        :from="{ x: 554, y: 106 }"
        :to="{ x: 586, y: 106 }"
        stroke="var(--c-accent)"
        stroke-width="2.4"
      />
      <text x="570" y="86" text-anchor="middle" font-size="14" fill="var(--c-accent)">激起</text>
      <rect
        x="590"
        y="26"
        width="220"
        height="160"
        rx="12"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.6"
        stroke-dasharray="7 5"
      />
      <g stroke="var(--c-danger)" stroke-width="2.6" stroke-linecap="round">
        <line x1="620" y1="164" x2="620" y2="48" />
        <line x1="660" y1="164" x2="660" y2="48" />
        <line x1="700" y1="164" x2="700" y2="48" />
        <line x1="740" y1="164" x2="740" y2="48" />
        <line x1="780" y1="164" x2="780" y2="48" />
      </g>
      <text x="700" y="212" text-anchor="middle" font-size="16" fill="var(--c-text)">
        新的变化的电场
        <tspan font-family="KaTeX_Math" font-style="italic">E</tspan>
      </text>
    </g>
    <g v-if="(step ?? 0) >= 4">
      <CourseArrow
        :from="{ x: 60, y: 238 }"
        :to="{ x: 840, y: 238 }"
        stroke="var(--c-accent)"
        stroke-width="2.8"
      />
      <text x="450" y="226" text-anchor="middle" font-size="15" fill="var(--c-accent)">
        由近及远传播
      </text>
    </g>
  </svg>
</template>
