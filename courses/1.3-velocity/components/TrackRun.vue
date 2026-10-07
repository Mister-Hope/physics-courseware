<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

/**
 * 400 m 跑道示意图 + "点一下跑一圈"动画。
 *
 * 起点画在**直道与弯道的交界处**（体育场形跑道的切点），黄点沿跑道中心线跑完整整一圈回到起点， 用来支撑"位移为 0、路程 400 m"的辨析。
 *
 * 实现：把跑道中心线写成一条 SVG path，用 `getPointAtLength()` 按弧长取点； 动画只改圆点的 cx/cy（SVG 尺寸固定），所以页面布局不会被顶动。
 *
 * **触发方式：点跑道本身**，不绑翻页点击步—— 交互式演示就该"点它一下、它跑一圈"，不该占老师翻页的点击；跑完再点还能重跑。
 */

/** 跑道中心线：两条直道 + 两个半圆（切点即起 / 终点所在处） */
const LANE_PATH = "M 120 50 H 240 A 50 50 0 0 1 240 150 H 120 A 50 50 0 0 1 120 50 Z";
const START_POINT = { x: 120, y: 50 };
const LAP_DURATION = 4200;

const trackRef = ref<SVGPathElement | null>(null);
const pathLength = ref(0);
const progress = ref(0);
const running = ref(false);

let frame = 0;

const runner = computed(() => {
  const track = trackRef.value;

  if (!track || pathLength.value === 0) return { ...START_POINT };

  const point = track.getPointAtLength(progress.value * pathLength.value);

  return { x: point.x, y: point.y };
});

const runLap = (): void => {
  const track = trackRef.value;

  if (!track || running.value) return;

  if (pathLength.value === 0) pathLength.value = track.getTotalLength();

  running.value = true;
  progress.value = 0;

  const startedAt = performance.now();

  const step = (now: number): void => {
    const elapsed = Math.min(1, (now - startedAt) / LAP_DURATION);

    progress.value = elapsed;

    if (elapsed < 1) frame = requestAnimationFrame(step);
    else running.value = false;
  };

  frame = requestAnimationFrame(step);
};

onMounted(() => {
  if (trackRef.value) pathLength.value = trackRef.value.getTotalLength();
});

onUnmounted(() => cancelAnimationFrame(frame));
</script>

<template>
  <div class="track-wrap" @click="runLap">
    <svg class="track-svg" viewBox="0 0 360 200">
      <!-- 跑道环形带：外沿浅色 + 内场挖空 -->
      <rect
        x="55"
        y="35"
        width="250"
        height="130"
        rx="65"
        fill="rgba(148, 163, 184, 0.16)"
        stroke="rgba(148, 163, 184, 0.35)"
        stroke-width="1.5"
      />
      <rect
        x="85"
        y="65"
        width="190"
        height="70"
        rx="35"
        fill="#0b1120"
        stroke="rgba(148, 163, 184, 0.35)"
        stroke-width="1.5"
      />

      <!-- 中心线：只用于按弧长取点，不可见 -->
      <path ref="trackRef" :d="LANE_PATH" fill="none" stroke="none" />

      <!-- 起 / 终点线：放在直道与弯道的交界处 -->
      <line x1="120" y1="35" x2="120" y2="65" stroke="#f1f5f9" stroke-width="3" />
      <text x="112" y="28" text-anchor="end" style="font-size: 12px" fill="#e2a846">起 / 终点</text>

      <text x="180" y="100" text-anchor="middle" style="font-size: 13px" fill="#94a3b8">
        400 m 跑道
      </text>
      <text x="180" y="122" text-anchor="middle" style="font-size: 12px" fill="#94a3b8">
        55 s 跑完一圈
      </text>

      <!-- 运动员 -->
      <circle :cx="runner.x" :cy="runner.y" r="7" fill="#e2a846" />
    </svg>
  </div>
</template>

<style scoped>
.track-wrap {
  display: flex;
  justify-content: center;
  min-width: 0;
  cursor: pointer;
}

.track-svg {
  width: 100%;
  max-width: 460px;
  height: auto;
}
</style>
