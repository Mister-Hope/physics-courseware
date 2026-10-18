<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 第 11 页「观察静电感应现象」（教材行 39–46 的实验）：
 * ① 带正电的 C 移近彼此接触的 A、B → 金属箔张开；
 * ② 分开 A、B 再移开 C → 金属箔仍张开，两块导体各带净电荷 −Q / +Q；
 * ③ 再让 A、B 接触 → 电荷中和，金属箔闭合。
 * 每一步只"新增"可回收的标记；C 的移开用 transform 移出画面，不用 v-if 删元素。
 */
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value, 3)));

const open = computed(() => step.value >= 1 && step.value <= 2);
const separated = computed(() => step.value >= 2);
/** C 的基准位置就在"靠近 A"处（x=100）；第 0 步与移开后都整体移出画面左侧 */
const cShift = computed(() => (step.value === 1 ? 0 : -130));
</script>

<template>
  <svg viewBox="0 0 560 290" width="100%" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 60, y: 240 }" :to="{ x: 500, y: 240 }" side="below" />

    <!-- 绝缘柱 -->
    <rect x="188" y="190" width="24" height="50" rx="4" fill="var(--c-neutral-700)" />
    <rect x="326" y="190" width="24" height="50" rx="4" fill="var(--c-neutral-700)" />

    <!-- 导体 A -->
    <g>
      <rect x="140" y="140" width="130" height="50" rx="10" fill="var(--c-surface)" fill-opacity="0.6" stroke="var(--c-text)" stroke-width="2" />
      <text x="205" y="126" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text)">A</text>
      <g style="transition: transform 0.4s ease" :transform="open ? 'rotate(15 170 190)' : ''">
        <line x1="170" y1="190" x2="170" y2="226" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
      </g>
      <g style="transition: transform 0.4s ease" :transform="open ? 'rotate(-15 240 190)' : ''">
        <line x1="240" y1="190" x2="240" y2="226" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
      </g>
      <g v-if="step >= 1">
        <text x="154" y="168" text-anchor="middle" font-family="KaTeX_Main" font-size="20" fill="var(--c-velocity)">−</text>
        <text x="172" y="168" text-anchor="middle" font-family="KaTeX_Main" font-size="20" fill="var(--c-velocity)">−</text>
      </g>
      <text v-if="separated" x="150" y="122" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-velocity)">−Q</text>
    </g>

    <!-- 导体 B：分开时向右移动 -->
    <g style="transition: transform 0.4s ease" :transform="separated ? 'translate(30 0)' : ''">
      <rect x="270" y="140" width="130" height="50" rx="10" fill="var(--c-surface)" fill-opacity="0.6" stroke="var(--c-text)" stroke-width="2" />
      <text x="335" y="126" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-text)">B</text>
      <g style="transition: transform 0.4s ease" :transform="open ? 'rotate(15 300 190)' : ''">
        <line x1="300" y1="190" x2="300" y2="226" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
      </g>
      <g style="transition: transform 0.4s ease" :transform="open ? 'rotate(-15 370 190)' : ''">
        <line x1="370" y1="190" x2="370" y2="226" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
      </g>
      <g v-if="step >= 1">
        <text x="368" y="168" text-anchor="middle" font-family="KaTeX_Main" font-size="20" fill="var(--c-danger)">+</text>
        <text x="386" y="168" text-anchor="middle" font-family="KaTeX_Main" font-size="20" fill="var(--c-danger)">+</text>
      </g>
      <text v-if="separated" x="392" y="122" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-danger)">+Q</text>
    </g>

    <!-- 带正电的带电体 C：只有第 1 步在画面里（移近），其余时候都在画面左侧之外 -->
    <g style="transition: transform 0.5s ease" :transform="`translate(${cShift} 0)`">
      <line x1="100" y1="140" x2="64" y2="212" stroke="var(--c-neutral-600)" stroke-width="7" stroke-linecap="round" />
      <circle cx="100" cy="120" r="22" fill="var(--c-danger)" fill-opacity="0.88" />
      <text x="100" y="120" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="22" fill="#0c1122">+</text>
      <text x="100" y="84" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-danger)">C</text>
    </g>
  </svg>
</template>
