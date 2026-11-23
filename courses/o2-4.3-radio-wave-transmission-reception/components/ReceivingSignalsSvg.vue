<!--
  第 9 页示意图：不同电台、不同频率的电磁波同时到达同一根接收天线。
  天线中的感应电流是这些频率叠加的结果，这是“必须先选台”的原因。
-->
<script setup lang="ts">
import { computed } from "vue";

const twoPi = Math.PI * 2;

const wavePath = (y: number, amp: number, wavelength: number): string => {
  const x0 = 60;
  const x1 = 450;
  const points: string[] = [];

  for (let x = x0; x <= x1; x += 2) {
    const offset = amp * Math.sin((twoPi * (x - x0)) / wavelength);
    points.push(`${x === x0 ? "M" : "L"} ${x} ${(y + offset).toFixed(1)}`);
  }

  return points.join(" ");
};

const waves = computed(() => [
  { key: "w1", label: "甲台", y: 90, d: wavePath(90, 15, 38), color: "var(--c-sky)" },
  { key: "w2", label: "乙台", y: 150, d: wavePath(150, 15, 58), color: "var(--c-accent)" },
  { key: "w3", label: "丙台", y: 210, d: wavePath(210, 15, 86), color: "var(--c-physics)" },
]);

const mixedPath = computed(() => {
  const points: string[] = [];

  for (let x = 552; x <= 808; x += 2) {
    const y = 155 + 5 * Math.sin((twoPi * (x - 552)) / 26) + 4 * Math.sin((twoPi * (x - 552)) / 41) + 3 * Math.sin((twoPi * (x - 552)) / 67);

    points.push(`${x === 552 ? "M" : "L"} ${x} ${y.toFixed(1)}`);
  }

  return points.join(" ");
});
</script>

<template>
  <svg viewBox="0 0 880 300" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 三列不同频率的电磁波 -->
    <g fill="none" stroke-width="2" stroke-linecap="round">
      <path v-for="wave in waves" :key="wave.key" :d="wave.d" :stroke="wave.color" />
    </g>
    <g fill="var(--c-text-dim)">
      <text x="60" y="62" font-size="13">甲台</text>
      <text x="60" y="122" font-size="13">乙台</text>
      <text x="60" y="182" font-size="13">丙台</text>
    </g>
    <text x="60" y="250" font-size="12" fill="var(--c-text-dim)">不同频率的电磁波同时到达</text>
    <!-- 波进入天线 -->
    <CourseArrow :from="{ x: 452, y: 90 }" :to="{ x: 466, y: 90 }" stroke="var(--c-sky)" :stroke-width="1.6" :head-size="7" />
    <CourseArrow :from="{ x: 452, y: 150 }" :to="{ x: 466, y: 150 }" stroke="var(--c-accent)" :stroke-width="1.6" :head-size="7" />
    <CourseArrow :from="{ x: 452, y: 210 }" :to="{ x: 466, y: 210 }" stroke="var(--c-physics)" :stroke-width="1.6" :head-size="7" />
    <!-- 接收天线 -->
    <line x1="480" y1="240" x2="480" y2="60" stroke="var(--c-text)" stroke-width="2.4" stroke-linecap="round" />
    <circle cx="480" cy="60" r="3.2" fill="var(--c-text)" />
    <line x1="455" y1="240" x2="505" y2="240" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round" />
    <text x="496" y="52" font-size="14" font-weight="700" fill="var(--c-text)">接收天线</text>
    <!-- 天线中叠加的感应电流 -->
    <CourseArrow :from="{ x: 486, y: 150 }" :to="{ x: 534, y: 150 }" stroke="var(--c-text-dim)" :stroke-width="1.6" :head-size="7" />
    <rect x="540" y="95" width="290" height="110" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.2" opacity="0.6" />
    <text x="685" y="120" text-anchor="middle" font-size="13" fill="var(--c-text)">天线中感应电流</text>
    <path :d="mixedPath" fill="none" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
    <text x="685" y="188" text-anchor="middle" font-size="11.5" fill="var(--c-text-dim)">各种频率叠加在一起</text>
  </svg>
</template>
