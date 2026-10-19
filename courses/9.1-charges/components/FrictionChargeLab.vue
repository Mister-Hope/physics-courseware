<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 第 8 页「摩擦起电的原因」——**不用滑块**，用点击分步演过程： 两个原来电中性的物体（各 4 个正离子、4 个自由电子）互相摩擦， 束缚较弱的 **2 个电子**从物体 1 转移到物体
 * 2（飞过去的位移动画）： 物体 1 多出 2 个正离子（+2e）、物体 2 多出 2 个电子（−2e），代数和为 0。 页面 clicks: 3 —— ① 文字（束缚较弱）② 摩擦 + 电子转移 +
 * 读数 ③ 结论 + 代数和。
 */
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value, 3)));

const BASE = 4; // 每个物体各有 4 个正离子、4 个电子（电中性）
const N = 2; // 这次转移 2 个电子（图上数得清）

const ions1 = [
  { x: 76, y: 88 },
  { x: 136, y: 88 },
  { x: 76, y: 146 },
  { x: 136, y: 146 },
];
const ions2 = [
  { x: 386, y: 88 },
  { x: 446, y: 88 },
  { x: 386, y: 146 },
  { x: 446, y: 146 },
];
/** 物体 1 里留下的电子 */
const stayElectrons = [
  { x: 106, y: 166 },
  { x: 166, y: 166 },
];
/** 物体 2 原有的电子 */
const ownElectrons = [
  { x: 416, y: 106 },
  { x: 466, y: 106 },
  { x: 416, y: 166 },
  { x: 466, y: 166 },
];
/** 转移的 2 个电子：从物体 1 的槽位出发，飞向物体 2 的空位（translate 过渡演出） */
const flyers = [
  { from: { x: 106, y: 106 }, to: { x: 380, y: 106 } },
  { from: { x: 166, y: 106 }, to: { x: 380, y: 166 } },
];
const transferred = computed(() => step.value >= 2);
const q1Tex = computed(() => `Q_1 = +${N}e`);
const q2Tex = computed(() => `Q_2 = -${N}e`);
/** 读数三个格子固定，第 3 格从第 0 步就预留（不产生位移） */
const showReadout = computed(() => step.value >= 2);
</script>

<template>
  <div class="flab">
    <svg viewBox="0 0 620 250" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 物体 1 -->
      <rect
        x="40"
        y="60"
        width="180"
        height="110"
        rx="12"
        fill="var(--c-surface)"
        fill-opacity="0.5"
        stroke="var(--c-text)"
        stroke-width="2"
      />
      <text x="130" y="200" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">
        物体 1
      </text>
      <g v-for="(p, i) in ions1" :key="'i1' + i">
        <circle :cx="p.x" :cy="p.y" r="13" fill="var(--c-danger)" fill-opacity="0.85" />
        <text
          :x="p.x"
          :y="p.y"
          text-anchor="middle"
          dominant-baseline="central"
          font-family="KaTeX_Main"
          font-size="16"
          fill="#0c1122"
        >
          +
        </text>
      </g>
      <g v-for="(p, i) in stayElectrons" :key="'e1' + i">
        <circle :cx="p.x" :cy="p.y" r="11" fill="var(--c-velocity)" />
        <text
          :x="p.x"
          :y="p.y"
          text-anchor="middle"
          dominant-baseline="central"
          font-family="KaTeX_Main"
          font-size="13"
          fill="#0c1122"
        >
          −
        </text>
      </g>

      <!-- 物体 2：摩擦时向左靠拢一点 -->
      <g style="transition: transform 0.4s ease" :transform="transferred ? 'translate(-40 0)' : ''">
        <rect
          x="350"
          y="60"
          width="180"
          height="110"
          rx="12"
          fill="var(--c-surface)"
          fill-opacity="0.5"
          stroke="var(--c-text)"
          stroke-width="2"
        />
        <text x="440" y="200" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">
          物体 2
        </text>
        <g v-for="(p, i) in ions2" :key="'i2' + i">
          <circle :cx="p.x" :cy="p.y" r="13" fill="var(--c-danger)" fill-opacity="0.85" />
          <text
            :x="p.x"
            :y="p.y"
            text-anchor="middle"
            dominant-baseline="central"
            font-family="KaTeX_Main"
            font-size="16"
            fill="#0c1122"
          >
            +
          </text>
        </g>
        <g v-for="(p, i) in ownElectrons" :key="'e2' + i">
          <circle :cx="p.x" :cy="p.y" r="11" fill="var(--c-velocity)" />
          <text
            :x="p.x"
            :y="p.y"
            text-anchor="middle"
            dominant-baseline="central"
            font-family="KaTeX_Main"
            font-size="13"
            fill="#0c1122"
          >
            −
          </text>
        </g>
      </g>

      <!-- 转移的 2 个电子：飞过去 -->
      <g
        v-for="(f, i) in flyers"
        :key="'fly' + i"
        style="transition: transform 0.75s ease"
        :transform="transferred ? `translate(${f.to.x - f.from.x} ${f.to.y - f.from.y})` : ''"
      >
        <circle :cx="f.from.x" :cy="f.from.y" r="11" fill="var(--c-velocity)" />
        <text
          :x="f.from.x"
          :y="f.from.y"
          text-anchor="middle"
          dominant-baseline="central"
          font-family="KaTeX_Main"
          font-size="13"
          fill="#0c1122"
        >
          −
        </text>
      </g>

      <!-- 转移方向 -->
      <g v-if="transferred">
        <CourseArrow
          :from="{ x: 232, y: 112 }"
          :to="{ x: 300, y: 112 }"
          stroke="var(--c-velocity)"
          stroke-width="3.2"
        />
        <text
          x="266"
          y="94"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="17"
          fill="var(--c-velocity)"
        >
          e
        </text>
        <!-- 净电荷标记：物体 1 多出 2 个正离子，物体 2 多出 2 个电子 -->
        <text
          x="246"
          y="76"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="22"
          fill="var(--c-danger)"
        >
          +
        </text>
        <text
          x="246"
          y="172"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="22"
          fill="var(--c-danger)"
        >
          +
        </text>
        <text
          x="552"
          y="76"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="22"
          fill="var(--c-velocity)"
        >
          −
        </text>
        <text
          x="552"
          y="172"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="22"
          fill="var(--c-velocity)"
        >
          −
        </text>
      </g>
    </svg>

    <div class="flab-out" :class="{ 'flab-hidden': !showReadout }">
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
  gap: 0.5rem;
}

.flab-out {
  /* 固定三列：第三列预留给第 3 击才出现的 Q1 + Q2 = 0，读数不随内容挤位 */
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.3rem;
  place-items: center center;

  font-size: 1.1rem;
  font-variant-numeric: tabular-nums;
}

.flab-hidden {
  visibility: hidden;
}

.flab-sum {
  color: var(--c-accent);
}
</style>
