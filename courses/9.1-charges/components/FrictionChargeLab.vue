<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, ref } from "vue";

/**
 * 第 8 页「摩擦起电的原因」：两个原来电中性的物体互相摩擦，束缚较弱的电子从物体 1 转移到物体 2。
 * 滑块调转移的电子数 n（整数 1–6）；读数用真实公式 Q = ne：Q₁ = +ne、Q₂ = −ne、Q₁ + Q₂ = 0。
 * 页面 clicks: 3 —— 常显电中性的两个物体与滑块，第 2 击起出转移，第 3 击出结论行。
 */
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value, 3)));

const BASE = 4; // 每个物体各有 4 个正离子、4 个电子（电中性）
const n = ref(2);

const ions1 = [
  { x: 76, y: 88 },
  { x: 136, y: 88 },
  { x: 76, y: 146 },
  { x: 136, y: 146 },
];
const ions2 = [
  { x: 366, y: 88 },
  { x: 426, y: 88 },
  { x: 366, y: 146 },
  { x: 426, y: 146 },
];
/** 电子槽位（每个物体最多放 4 + 6 个） */
const slots1 = [
  { x: 106, y: 106 },
  { x: 166, y: 106 },
  { x: 106, y: 166 },
  { x: 166, y: 166 },
];
const slots2 = [
  { x: 396, y: 106 },
  { x: 456, y: 106 },
  { x: 396, y: 166 },
  { x: 456, y: 166 },
  { x: 336, y: 136 },
  { x: 486, y: 136 },
  { x: 426, y: 136 },
  { x: 366, y: 122 },
  { x: 336, y: 106 },
  { x: 486, y: 166 },
];

/** 第 2 击之前：两个物体都画成电中性（BASE 个电子），不然就是还没讲就把答案摆出来 */
const leftCount = computed(() => (step.value >= 2 ? Math.max(0, BASE - n.value) : BASE));
const rightCount = computed(() => (step.value >= 2 ? Math.min(slots2.length, BASE + n.value) : BASE));
const q1Tex = computed(() => `Q_1 = +${n.value}e`);
const q2Tex = computed(() => `Q_2 = -${n.value}e`);
</script>

<template>
  <div class="flab">
    <svg viewBox="0 0 560 250" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 物体 1 -->
      <rect x="40" y="60" width="180" height="110" rx="12" fill="var(--c-surface)" fill-opacity="0.5" stroke="var(--c-text)" stroke-width="2" />
      <text x="130" y="196" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">物体 1</text>
      <g v-for="(p, i) in ions1" :key="'i1' + i">
        <circle :cx="p.x" :cy="p.y" r="13" fill="var(--c-danger)" fill-opacity="0.85" />
        <text :x="p.x" :y="p.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="16" fill="#0c1122">+</text>
      </g>
      <g v-for="(p, i) in slots1.slice(0, leftCount)" :key="'e1' + i">
        <circle :cx="p.x" :cy="p.y" r="11" fill="var(--c-velocity)" />
        <text :x="p.x" :y="p.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="13" fill="#0c1122">−</text>
      </g>

      <!-- 物体 2：摩擦时向左靠拢一点 -->
      <g style="transition: transform 0.4s ease" :transform="step >= 2 ? 'translate(-60 0)' : ''">
        <rect x="330" y="60" width="180" height="110" rx="12" fill="var(--c-surface)" fill-opacity="0.5" stroke="var(--c-text)" stroke-width="2" />
        <text x="420" y="196" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">物体 2</text>
        <g v-for="(p, i) in ions2" :key="'i2' + i">
          <circle :cx="p.x" :cy="p.y" r="13" fill="var(--c-danger)" fill-opacity="0.85" />
          <text :x="p.x" :y="p.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="16" fill="#0c1122">+</text>
        </g>
        <g v-for="(p, i) in slots2.slice(0, rightCount)" :key="'e2' + i">
          <circle :cx="p.x" :cy="p.y" r="11" fill="var(--c-velocity)" />
          <text :x="p.x" :y="p.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="13" fill="#0c1122">−</text>
        </g>
      </g>

      <!-- 电子转移 -->
      <g v-if="step >= 2">
        <CourseArrow :from="{ x: 224, y: 116 }" :to="{ x: 264, y: 116 }" stroke="var(--c-velocity)" stroke-width="3.2" />
        <text x="244" y="98" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-velocity)">e</text>
      </g>
    </svg>

    <CourseSlider
      v-model="n"
      :min="1"
      :max="4"
      :step="1"
      :disabled="step < 2"
      label="转移的电子数"
      label-tex="n"
      accent="blue"
      aria-label="转移的电子数 n"
    />

    <div class="flab-out" :class="{ 'flab-hidden': step < 2 }">
      <Latex :tex="q1Tex" />
      <Latex :tex="q2Tex" />
      <span v-if="step >= 3" class="flab-sum"><Latex tex="Q_1 + Q_2 = 0" /></span>
    </div>
  </div>
</template>

<style scoped>
.flab {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.flab-out {
  /* 固定三列：第三列预留给第 3 击才出现的 Q1 + Q2 = 0，
     每格宽度不随 n 变化（旧写法是 flex 行，新元素一出现就把前两个读数挤走 83px）。 */
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.3rem;
  justify-items: center;
  align-items: center;
  font-size: 1.1rem;
  font-variant-numeric: tabular-nums;
}

/* 第 2 击之前读数常驻但不显示（占位，不产生位移） */
.flab-hidden {
  visibility: hidden;
}

.flab-sum {
  color: var(--c-accent);
}
</style>
