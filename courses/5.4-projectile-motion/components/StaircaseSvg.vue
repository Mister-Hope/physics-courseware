<script setup lang="ts">
/**
 * 楼梯例题示意图（5.4 抛体运动的规律）：小球从楼梯左上方水平抛出，可能落在不同高度的台阶顶面上。 干净版只画楼梯、地面、抛出点 O 与水平初速度 v0；`showAnalysis` 打开后再补上 A、B 两个候选落点， 以及表示水平距离（水平虚线）与下落高度（竖直虚线）的辅助线。 分步显示用
 * `visibility` 占位（只隐藏不删除），点击时已画出的内容不会位移。
 */
const STEP_W = 52;
const STEP_H = 30;
const STEPS = 6;
const START_X = 140;
const BASE_Y = 320;

const { showAnalysis = false } = defineProps<{
  /** 点击后出现：A、B 两个候选落点与水平距离 / 下落高度虚线 */
  showAnalysis?: boolean;
}>();

/** 抛出点：楼梯左上方，比最上面一级台阶低（平抛只能落到抛出点下方的台阶上） */
const origin = { x: 80, y: 180 };

/** 候选落点都取在台阶顶面上：A 近而低（下落多），B 远而高（下落少） */
const pointA = { x: 178, y: 290 };
const pointB = { x: 332, y: 200 };

/** A、B 两处虚线用不同颜色区分：A 灰、B 金 */
const candidates = [
  { label: "A", point: pointA, color: "#94a3b8" },
  { label: "B", point: pointB, color: "#e2a846" },
];

/** 楼梯折线：每级先竖踢面、再水平顶面，越往右越高 */
const stairPoints = [
  { x: START_X, y: BASE_Y },
  ...Array.from({ length: STEPS }, (_, i) => {
    const x0 = START_X + STEP_W * i;
    const top = BASE_Y - STEP_H * (i + 1);

    return [
      { x: x0, y: top },
      { x: x0 + STEP_W, y: top },
    ];
  }).flat(),
];
const stairPath = stairPoints.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
</script>

<template>
  <div class="staircase">
    <svg viewBox="45 115 430 245" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="小球从楼梯左上方水平抛出，可能落在不同高度的台阶上">
      <SurfaceHatch :from="{ x: 50, y: 320 }" :to="{ x: 140, y: 320 }" side="below" />
      <path :d="stairPath" fill="none" stroke="var(--c-text-dim)" stroke-width="2.6" stroke-linejoin="round" />
      <g :class="{ 'vp-hidden': !showAnalysis }">
        <g v-for="item in candidates" :key="item.label">
          <line :x1="origin.x" :y1="origin.y" :x2="item.point.x" :y2="origin.y" :stroke="item.color" stroke-width="1.6" stroke-dasharray="8 6" opacity="0.85" />
          <line
            :x1="item.point.x"
            :y1="origin.y"
            :x2="item.point.x"
            :y2="item.point.y"
            :stroke="item.color"
            stroke-width="1.6"
            stroke-dasharray="8 6"
            opacity="0.85"
          />
          <circle :cx="item.point.x" :cy="item.point.y" r="6" :fill="item.color" />
          <text :x="item.point.x + 12" :y="item.point.y + 20" font-family="KaTeX_Math" font-style="italic" font-size="22" :fill="item.color">
            {{ item.label }}
          </text>
        </g>
      </g>
      <CourseArrow :from="origin" :to="{ x: 170, y: 180 }" stroke="#60a5fa" :stroke-width="3.2" />
      <text x="106" y="164" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#93c5fd">
        v
        <tspan font-family="KaTeX_Main" font-style="normal" font-size="14" dy="4">0</tspan>
      </text>
      <circle :cx="origin.x" :cy="origin.y" r="6" fill="#e2e8f0" />
      <text x="54" y="188" font-family="KaTeX_Math" font-style="italic" font-size="22" fill="#e2e8f0">O</text>
    </svg>
  </div>
</template>

<style scoped>
.staircase {
  min-width: 0;
}

.staircase svg {
  display: block;
  width: 100%;
  height: auto;
}

/* 分步内容始终占位，只把"还没轮到"的藏起来：点击时只出现新元素，已有元素绝不位移 */
.vp-hidden {
  visibility: hidden;
}
</style>
