<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 第 13 页「带电体为什么能吸引轻小物体」：把金属箔屑与纸屑放在桌面上，
 * 带电棒**从上方靠近** → 碎屑被吸上去；金属屑接触带电后带上同种电荷，**被排斥、掉回桌面**，
 * 纸屑几乎不导电、感应起的电荷难以重新分布，**被吸住不掉**。
 * 页面 clicks: 2 —— ① 棒下降靠近、碎屑飞上去 ② 金属屑掉回、纸屑仍被吸住。
 */
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value, 2)));

/** 桌面上的碎屑（金属屑在左、纸屑在右） */
const metalBits = [170, 215, 260];
const paperBits = [390, 435, 480];
/** 碎屑飞上去的位移（与棒下降后的下表面贴合） */
const UP = -106;
const metalShift = computed(() => (step.value === 1 ? UP : 0));
const paperShift = computed(() => (step.value >= 1 ? UP : 0));
const rodShift = computed(() => (step.value >= 1 ? 150 : 0));
</script>

<template>
  <svg viewBox="0 0 620 400" width="100%" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 30, y: 330 }" :to="{ x: 590, y: 330 }" side="below" />

    <!-- 带电棒：从上方下降靠近 -->
    <g style="transition: transform 0.7s ease" :transform="`translate(0 ${rodShift})`">
      <rect x="110" y="40" width="400" height="26" rx="13" fill="var(--c-accent)" fill-opacity="0.5" stroke="var(--c-accent)" stroke-width="2" />
      <text v-for="(x, i) in [160, 240, 320, 400, 470]" :key="'r' + i" :x="x" y="54" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="20" fill="var(--c-danger)">+</text>
    </g>
    <text x="60" y="54" text-anchor="middle" font-size="18" fill="var(--c-accent)">带电体</text>

    <!-- 金属屑：第 1 击被吸上，第 2 击接触后带同种电荷、被排斥掉回桌面 -->
    <g style="transition: transform 0.7s ease" :transform="`translate(0 ${metalShift})`">
      <g v-for="(x, i) in metalBits" :key="'m' + i">
        <rect :x="x" y="316" width="26" height="14" rx="4" fill="var(--c-accent)" fill-opacity="0.8" stroke="var(--c-accent)" stroke-width="1.4" />
      </g>
      <g v-if="step >= 2">
        <text v-for="(x, i) in metalBits" :key="'mp' + i" :x="x + 13" y="308" text-anchor="middle" font-family="KaTeX_Main" font-size="18" fill="var(--c-danger)">+</text>
      </g>
    </g>

    <!-- 纸屑：被吸住不掉 -->
    <g style="transition: transform 0.7s ease" :transform="`translate(0 ${paperShift})`">
      <g v-for="(x, i) in paperBits" :key="'p' + i">
        <rect :x="x" y="316" width="24" height="15" rx="3" fill="var(--c-text-dim)" fill-opacity="0.65" stroke="var(--c-text-dim)" stroke-width="1.4" />
      </g>
    </g>

    <!-- 第 1 击：被吸起的箭头 -->
    <g v-if="step === 1">
      <CourseArrow v-for="(x, i) in metalBits" :key="'ma' + i" :from="{ x: x + 13, y: 296 }" :to="{ x: x + 13, y: 236 }" stroke="var(--c-accent-2)" stroke-width="3" />
      <CourseArrow v-for="(x, i) in paperBits" :key="'pa' + i" :from="{ x: x + 12, y: 296 }" :to="{ x: x + 12, y: 236 }" stroke="var(--c-accent-2)" stroke-width="3" />
    </g>

    <!-- 第 2 击：金属屑被排斥下落；纸屑仍被吸住 -->
    <g v-if="step >= 2">
      <CourseArrow v-for="(x, i) in metalBits" :key="'mr' + i" :from="{ x: x + 13, y: 286 }" :to="{ x: x + 13, y: 316 }" stroke="var(--c-danger)" stroke-width="3" />
      <text x="215" y="30" text-anchor="middle" font-size="18" fill="var(--c-danger)">接触后带同种电荷 → 被排斥</text>
      <text x="450" y="30" text-anchor="middle" font-size="18" fill="var(--c-accent-2)">几乎不导电 → 被吸住</text>
    </g>

    <text x="215" y="376" text-anchor="middle" font-size="18" fill="var(--c-accent)">金属屑</text>
    <text x="435" y="376" text-anchor="middle" font-size="18" fill="var(--c-text-dim)">纸屑</text>
  </svg>
</template>
