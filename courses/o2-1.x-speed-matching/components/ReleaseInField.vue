<!--
  选必2 1.x《复合场中的配速法与摆线运动》引入页的复合场配图。
  一片垂直纸面向里的匀强磁场（裸 × 平铺阵列，不加图例）里，一个带正电小球由静止释放，轨迹被拉成摆线。
  · 常显（题目图）：磁场 × 阵列、释放处的小球（+q, m）、释放点正下方竖直向下的 g 指示箭头；
  · reveal 打开（点击步）后小球沿摆线走 1.5 个周期：到轨迹末端淡出消失 → 静置约 1 s → 回到释放点重走；
  · 点一下图可以从静止重新开始（reveal 未开时点图不动，保持干净题目图）。
  轨迹用解析式 x = R(θ − sinθ)、y = −R(1 − cosθ)（θ = ωt）逐点算出，不是照着样子描的：
  世界坐标取 R = 1、画布 78 单位 = 1R（y 向上），映射见 toX / toY。
  动画：θ 由 rAF 按 dt 累加（ω = 2.2 rad/s），一轮走 LAPS = 1.5 个周期（θ: 0 → 3π，用时 3π / ω ≈ 4.3 s）；
  球在最后 0.3 s 淡出（"走到轨迹边缘消失"），再静置 HOLD = 1 s，然后 clock 回绕到 0
  —— 球回到释放点、轨迹从头再长一遍，一轮 ≈ 5.3 s，如此无限循环，永不跑出画布。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";

const { reveal = false } = defineProps<{
  /** 点击步到了才画出真实轨迹；第 2 页只要干净题目图时传 false */
  reveal?: boolean;
}>();

/** 画布（viewBox 用户单位）：世界窗口 x∈[-0.4, 9.6]、y∈[-2.5, 0.5]；1.5 个摆线周期正好铺满 */
const W = 780;
const H = 235;
const K = 78;
const X0 = -0.4;
const Y0 = 0.5;
const toX = (x: number): number => (x - X0) * K;
const toY = (y: number): number => (Y0 - y) * K;

/**
 * 摆线参数方程（R = 1）
 *
 * @param theta 摆线参数角（弧度）
 * @returns 该角度对应的世界坐标（y 向下为负）
 */
const pointAt = (theta: number): { x: number; y: number } => ({
  x: theta - Math.sin(theta),
  y: -(1 - Math.cos(theta)),
});

/** 释放点（画布坐标）：小球静止释放的位置；g 箭头就摆在它正下方，避开小球向右下的轨迹 */
const START = { x: toX(0), y: toY(0) };

/** 角速度：θ = ωt，走完一个摆线周期（θ 增加 2π）用时 2π / ω ≈ 2.9 s */
const OMEGA = 2.2;
const TAU = 2 * Math.PI;
/** 一轮走的周期数：1.5 个周期（θ: 0 → 3π），轨迹正好铺满整块画布 */
const LAPS = 1.5;
/** 采样点数固定：无论循环多少轮，路径长度都不变 */
const SAMPLES = 260;

/** 一轮的时间轴：先沿摆线走完 1.5 个周期 → 在末端淡出消失 → 静置约 1 s → 回到起点重来 */
const TRAVEL = (TAU * LAPS) / OMEGA;
/** 末端淡出时长：最后 0.3 s 里透明度降到 0，球是"走到轨迹边缘消失"而不是硬停在边上 */
const FADE = 0.3;
/** 消失后的静置时间：留约 1 s 让学生看清"这一轮结束了" */
const HOLD = 1;
/** 一轮总时长；clock 到时回绕到 0，动画就此无限循环 */
const CYCLE = TRAVEL + HOLD;

/** 本轮已走过的时间（0 ≤ clock < CYCLE），回绕到 0 即代表重新开始 */
const clock = ref(0);
/** 本轮的相位 θ（0 → 3π）：球的位置与轨迹都按它算，保证球始终踩在同一条真实摆线上 */
const theta = computed(() => Math.min(clock.value, TRAVEL) * OMEGA);

/** 轨迹只取 [0, θ] 这一段（最多 1.5 个周期），所以路径永远不会越画越长 */
const pathD = computed(() => {
  const last = theta.value;
  let d = "";

  for (let i = 0; i <= SAMPLES; i++) {
    const p = pointAt((last * i) / SAMPLES);

    d += `${i === 0 ? "M" : "L"} ${toX(p.x).toFixed(1)} ${toY(p.y).toFixed(1)} `;
  }

  return d.trim();
});

const showPath = computed(() => reveal === true);
/** 小球的不透明度：最后 FADE 秒淡出到 0，静置期间保持 0（"消失不见"），回绕后立刻恢复 1 */
const ballOpacity = computed(() => {
  const remain = TRAVEL - clock.value;

  return remain <= 0 ? 0 : Math.min(1, remain / FADE);
});
/** 小球位置：始终落在轨迹上（同一时刻同一点）；reveal 未开时停在释放点 */
const ball = computed(() => {
  const p = pointAt(theta.value);

  return showPath.value ? { x: toX(p.x), y: toY(p.y) } : { x: START.x, y: START.y };
});

let raf = 0;
let prev = 0;
const tick = (now: number): void => {
  // 标签页切回来时 dt 会很大，钳一下，免得一帧跳过半个周期
  const dt = prev === 0 ? 0 : Math.min(0.05, (now - prev) / 1000);

  prev = now;
  // clock 走到一轮末尾就回绕到 0：球回到释放点、轨迹重新长出来，一轮接一轮永不停
  clock.value = (clock.value + dt) % CYCLE;
  raf = requestAnimationFrame(tick);
};

/** 从静止（释放点）重新开始，此后一轮接一轮地循环下去 */
const start = (): void => {
  if (!reveal) return;
  cancelAnimationFrame(raf);
  clock.value = 0;
  prev = 0;
  raf = requestAnimationFrame(tick);
};
/** 退出这一步 / 组件卸载：停下并复位到释放点 */
const stop = (): void => {
  cancelAnimationFrame(raf);
  prev = 0;
  clock.value = 0;
};

// 点击步到了就自动从静止开始，之后一直循环；点图可以让它重新从静止开始
watch(
  () => reveal,
  (value) => (value ? start() : stop()),
  { immediate: true },
);

onBeforeUnmount(() => cancelAnimationFrame(raf));
</script>

<template>
  <div class="rif">
    <svg :viewBox="`0 0 ${W} ${H}`" class="rif-svg" @click="start">
      <!-- 匀强磁场：裸 × 平铺（不带圈、不加图例），只当背景点缀 —— 让学生看出"整个空间都有向里的磁场"即可，
           × 要小、要淡，绝不能盖过摆线轨迹；size 6.5 ≈ 原尺寸 9 的 72%，线宽同比收细 -->
      <FieldDots
        :x="13"
        :y="13"
        :cols="14"
        :rows="5"
        :spacing="52"
        :size="6.5"
        :line-width="2"
        :opacity="0.8"
        color="var(--c-field)"
        dir="in"
      />
      <!-- 释放点正下方的 g（中性色，不占用速度蓝/力红）：小球向右下运动，箭头摆在起点正下方的空档里 -->
      <g
        font-size="19"
        :style="{ stroke: 'var(--c-bg)', 'stroke-width': 3.2, 'paint-order': 'stroke' }"
      >
        <CourseArrow
          :from="{ x: START.x, y: 72 }"
          :to="{ x: START.x, y: 132 }"
          stroke="var(--c-text)"
          :stroke-width="2.8"
          :head-size="11"
        />
        <text
          :x="START.x + 12"
          y="111"
          text-anchor="middle"
          fill="var(--c-text)"
          font-family="KaTeX_Math, serif"
          font-style="italic"
        >
          g
        </text>
      </g>
      <path
        v-if="showPath"
        :d="pathD"
        fill="none"
        stroke="var(--c-accent)"
        :stroke-width="3.8"
        stroke-linecap="round"
      />
      <!-- 小球（带 +q, m 标签）：走到轨迹末端时整组淡出，实现"在边缘消失不见" -->
      <g :style="{ opacity: ballOpacity }">
        <circle
          :cx="ball.x"
          :cy="ball.y"
          r="11"
          fill="var(--c-surface-solid)"
          stroke="var(--c-force)"
          :stroke-width="3"
        />
        <path
          :d="`M ${ball.x - 5.5} ${ball.y} H ${ball.x + 5.5} M ${ball.x} ${ball.y - 5.5} V ${ball.y + 5.5}`"
          stroke="var(--c-force)"
          :stroke-width="2.8"
          stroke-linecap="round"
        />
        <text
          :x="ball.x + 18"
          :y="ball.y + 7"
          font-size="19"
          fill="var(--c-text)"
          :style="{ stroke: 'var(--c-bg)', 'stroke-width': 3.2, 'paint-order': 'stroke' }"
        >
          <tspan font-family="KaTeX_Main">+</tspan>
          <tspan font-family="KaTeX_Math" font-style="italic">q</tspan>
          <tspan font-family="KaTeX_Main">,</tspan>
          <tspan font-family="KaTeX_Math" font-style="italic">m</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.rif {
  width: 100%;
}

.rif-svg {
  display: block;

  width: 100%;
  max-width: 820px;
  height: auto;
  margin: 0 auto;

  cursor: pointer;
}
</style>
