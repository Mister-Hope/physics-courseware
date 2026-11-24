<script setup lang="ts">
import { computed } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();
const equal = computed<boolean>(() => step >= 2);
const heat = computed<boolean>(() => step >= 1);
</script>

<template>
  <svg viewBox="0 0 800 300" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g v-if="equal">
      <rect x="330" y="18" width="140" height="34" rx="17" fill="rgb(226 168 70 / 15%)" stroke="var(--c-accent)" stroke-width="1.2" />
      <text x="400" y="41" text-anchor="middle" font-size="15" fill="var(--c-accent)">热平衡</text>
    </g>
    <rect
      x="60"
      y="86"
      width="300"
      height="160"
      rx="18"
      :fill="equal ? 'rgb(226 168 70 / 12%)' : 'rgb(248 113 113 / 12%)'"
      :stroke="equal ? 'var(--c-accent)' : 'var(--c-danger)'"
      stroke-width="1.6"
    />
    <rect
      x="440"
      y="86"
      width="300"
      height="160"
      rx="18"
      :fill="equal ? 'rgb(226 168 70 / 12%)' : 'rgb(96 165 250 / 12%)'"
      :stroke="equal ? 'var(--c-accent)' : 'var(--c-velocity)'"
      stroke-width="1.6"
    />
    <text x="210" y="62" text-anchor="middle" font-size="15" fill="var(--c-text)">系统 A</text>
    <text x="590" y="62" text-anchor="middle" font-size="15" fill="var(--c-text)">系统 B</text>
    <text x="210" y="166" text-anchor="middle" font-size="14" :fill="equal ? 'var(--c-accent)' : 'var(--c-danger)'">{{ equal ? "同温" : "高温" }}</text>
    <text x="590" y="166" text-anchor="middle" font-size="14" :fill="equal ? 'var(--c-accent)' : 'var(--c-velocity)'">{{ equal ? "同温" : "低温" }}</text>
    <g v-if="!equal">
      <text x="210" y="200" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">放热</text>
      <text x="590" y="200" text-anchor="middle" font-size="12" fill="var(--c-text-dim)">吸热</text>
    </g>
    <g v-if="heat && !equal">
      <CourseArrow :from="{ x: 380, y: 140 }" :to="{ x: 420, y: 140 }" stroke="var(--c-accent)" :stroke-width="2.6" label="热量" :label-dy="-10" />
    </g>
    <g v-if="!equal">
      <text x="210" y="286" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-danger)">
        T<tspan baseline-shift="sub" font-size="11">A</tspan>
      </text>
      <text x="590" y="286" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-velocity)">
        T<tspan baseline-shift="sub" font-size="11">B</tspan>
      </text>
    </g>
    <g v-else>
      <text x="400" y="286" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">
        T<tspan baseline-shift="sub" font-size="11">A</tspan> = T<tspan baseline-shift="sub" font-size="11">B</tspan> = T
      </text>
    </g>
  </svg>
</template>
