<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

/**
 * 400 m 跑道示意图 + "点一下跑一圈"动画（逆时针方向）。
 *
 * 起点画在**直道与弯道的交界处**（体育场形跑道的切点 x=120, y=50），运动员沿跑道中心线**逆时针**跑完整整一圈回到起点， 用来支撑"位移为 0、路程 400 m"的辨析。
 *
 * **触发方式：点跑道本身**，不绑翻页点击步—— 交互式演示就该"点它一下、它跑一圈"，不该占老师翻页的点击；跑完再点还能重跑。
 */

/** 跑道中心线（逆时针）：左半圆弯道 → 下直道 → 右半圆弯道 → 上直道回到起/终点 (120, 50) */
const LANE_PATH = "M 120 50 A 50 50 0 0 0 120 150 H 240 A 50 50 0 0 0 240 50 H 120 Z";
const START_POINT = { x: 120, y: 50 };
const STRAIGHT_LEN = 120;
const CURVE_RADIUS = 50;
const CURVE_LEN = Math.PI * CURVE_RADIUS; // ~157.08
const TOTAL_LEN = 2 * STRAIGHT_LEN + 2 * CURVE_LEN; // ~554.16
const LAP_DURATION = 4200;

const progress = ref(0);
const running = ref(false);
const hasFinishedOnce = ref(false);

let frame = 0;

/** 根据归一化弧长进度 progress ∈ [0, 1] 精确计算运动员逆时针奔跑时的坐标 (x, y) 与切向朝向角 deg */
const runner = computed(() => {
  const p = progress.value >= 1 ? 0 : progress.value;
  const s = p * TOTAL_LEN;

  // 1. 左半圆弯道：圆心 (120, 100)，半径 50，角度从 -π/2 逆时针转到 -3π/2
  if (s <= CURVE_LEN) {
    const theta = -Math.PI / 2 - (s / CURVE_LEN) * Math.PI;
    return {
      x: 120 + CURVE_RADIUS * Math.cos(theta),
      y: 100 + CURVE_RADIUS * Math.sin(theta),
      deg: ((theta - Math.PI / 2) * 180) / Math.PI,
    };
  }

  // 2. 下直道：从 (120, 150) 向右跑到 (240, 150)
  const s2 = s - CURVE_LEN;
  if (s2 <= STRAIGHT_LEN) {
    return {
      x: 120 + s2,
      y: 150,
      deg: 0,
    };
  }

  // 3. 右半圆弯道：圆心 (240, 100)，半径 50，角度从 +π/2 逆时针转到 -π/2
  const s3 = s2 - STRAIGHT_LEN;
  if (s3 <= CURVE_LEN) {
    const theta = Math.PI / 2 - (s3 / CURVE_LEN) * Math.PI;
    return {
      x: 240 + CURVE_RADIUS * Math.cos(theta),
      y: 100 + CURVE_RADIUS * Math.sin(theta),
      deg: ((theta - Math.PI / 2) * 180) / Math.PI,
    };
  }

  // 4. 上直道（终点冲刺直道）：从 (240, 50) 向左冲刺回到起/终点 (120, 50)
  const s4 = s3 - CURVE_LEN;
  return {
    x: 240 - s4,
    y: 50,
    deg: -180,
  };
});

/** 奔跑摆臂相位（用于运动员俯视姿态的动态感） */
const strideSwing = computed(() =>
  running.value ? Math.sin(progress.value * Math.PI * 24) * 3.2 : 0,
);

/** 已跑路程长度（用于逆时针金色轨迹高亮） */
const traveledDash = computed(() => {
  const len = progress.value * TOTAL_LEN;
  return `${len.toFixed(1)} ${TOTAL_LEN.toFixed(1)}`;
});

/** 起点到当前位置的位移矢量长度（大于 6 px 时显示实时位移箭头） */
const displacementDist = computed(() =>
  Math.hypot(runner.value.x - START_POINT.x, runner.value.y - START_POINT.y),
);

const runLap = (): void => {
  if (running.value) return;

  running.value = true;
  progress.value = 0;

  const startedAt = performance.now();

  const step = (now: number): void => {
    const elapsed = Math.min(1, (now - startedAt) / LAP_DURATION);

    progress.value = elapsed;

    if (elapsed < 1) {
      frame = requestAnimationFrame(step);
    } else {
      running.value = false;
      hasFinishedOnce.value = true;
    }
  };

  frame = requestAnimationFrame(step);
};

onUnmounted(() => cancelAnimationFrame(frame));
</script>

<template>
  <div class="track-wrap" @click="runLap" title="点击跑道演示逆时针跑一圈">
    <svg class="track-svg" viewBox="0 0 360 205" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- 塑胶跑道红棕渐变 -->
        <linearGradient id="track-surface-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e15b47" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#b93829" stop-opacity="0.22" />
        </linearGradient>

        <!-- 内场草坪深色柔和渐变 -->
        <radialGradient id="infield-turf-grad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#112233" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#0b1322" stop-opacity="0.96" />
        </radialGradient>

        <!-- 运动员光晕 -->
        <radialGradient id="runner-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--c-accent-light)" stop-opacity="0.65" />
          <stop offset="100%" stop-color="var(--c-accent-light)" stop-opacity="0" />
        </radialGradient>

        <!-- 实时位移箭头标记 -->
        <marker
          id="disp-arrow-head"
          markerWidth="8"
          markerHeight="8"
          refX="6.5"
          refY="4"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M 0 1 L 7 4 L 0 7 z" fill="var(--c-physics)" />
        </marker>
      </defs>

      <!-- 外围看台微光衬底 -->
      <rect
        x="49"
        y="29"
        width="262"
        height="142"
        rx="71"
        fill="color-mix(in srgb, var(--c-text-dim) 5%, transparent)"
        stroke="color-mix(in srgb, var(--c-text-dim) 16%, transparent)"
        stroke-width="1"
      />

      <!-- 塑胶跑道环形带（外圈 R=65，内圈 R=35） -->
      <rect
        x="55"
        y="35"
        width="250"
        height="130"
        rx="65"
        fill="url(#track-surface-grad)"
        stroke="color-mix(in srgb, var(--c-force) 48%, transparent)"
        stroke-width="1.6"
      />

      <!-- 分道线（第 2、3、4 道同心体育场线，营造真实跑道层次感） -->
      <rect
        x="62.5"
        y="42.5"
        width="235"
        height="115"
        rx="57.5"
        fill="none"
        stroke="color-mix(in srgb, var(--c-text) 16%, transparent)"
        stroke-width="0.9"
      />
      <rect
        x="70"
        y="50"
        width="220"
        height="100"
        rx="50"
        fill="none"
        stroke="color-mix(in srgb, var(--c-text) 20%, transparent)"
        stroke-width="0.9"
        stroke-dasharray="4 4"
      />
      <rect
        x="77.5"
        y="57.5"
        width="205"
        height="85"
        rx="42.5"
        fill="none"
        stroke="color-mix(in srgb, var(--c-text) 16%, transparent)"
        stroke-width="0.9"
      />

      <!-- 内场草坪 -->
      <rect
        x="85"
        y="65"
        width="190"
        height="70"
        rx="35"
        fill="url(#infield-turf-grad)"
        stroke="color-mix(in srgb, var(--c-text) 42%, transparent)"
        stroke-width="1.5"
      />

      <!-- 内场装饰：直弯道交界虚线 (x=120, x=240) 与中圈 -->
      <g stroke="color-mix(in srgb, var(--c-text-dim) 16%, transparent)" stroke-width="1" fill="none">
        <line x1="120" y1="65" x2="120" y2="135" stroke-dasharray="3 3" />
        <line x1="240" y1="65" x2="240" y2="135" stroke-dasharray="3 3" />
        <circle cx="180" cy="100" r="18" opacity="0.5" />
      </g>

      <!-- 已跑过的路程轨迹高亮（金色发光带，随逆时针奔跑实时延伸） -->
      <path
        v-if="progress > 0"
        :d="LANE_PATH"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="3.6"
        stroke-linecap="round"
        :stroke-dasharray="traveledDash"
        opacity="0.88"
      />

      <!-- 逆时针跑向引导小箭头（上直道向左冲线 & 下直道向右奔跑） -->
      <g opacity="0.65">
        <line
          x1="152"
          y1="50"
          x2="134"
          y2="50"
          stroke="var(--c-neutral-50)"
          stroke-width="1.4"
          stroke-linecap="round"
        />
        <path
          d="M 139 47 L 134 50 L 139 53"
          fill="none"
          stroke="var(--c-neutral-50)"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>

      <!-- 起 / 终点线：放在左端直道与弯道的交界切点 x = 120 -->
      <g>
        <!-- 黑白格终点线质感 -->
        <line x1="120" y1="35" x2="120" y2="65" stroke="var(--c-neutral-50)" stroke-width="3.4" />
        <line
          x1="120"
          y1="35"
          x2="120"
          y2="65"
          stroke="var(--c-neutral-900)"
          stroke-width="2"
          stroke-dasharray="3.75 3.75"
        />
        <!-- 起点小旗杆标志 -->
        <line
          x1="120"
          y1="35"
          x2="120"
          y2="20"
          stroke="var(--c-accent)"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path d="M 120 20 L 130 23.5 L 120 27 Z" fill="var(--c-accent)" />
        <text x="114" y="26" text-anchor="end" font-size="12" font-weight="600" fill="var(--c-accent)">
          起 / 终点
        </text>
      </g>

      <!-- 内场中央文字标注 -->
      <text x="180" y="96" text-anchor="middle" font-size="13.5" font-weight="600" fill="var(--c-neutral-300)">
        400 m 跑道
      </text>
      <text x="180" y="116" text-anchor="middle" font-size="11.5" fill="var(--c-text-dim)">
        55 s 跑完一圈
      </text>

      <!-- 实时位移矢量（奔跑过程中连接起点与运动员的青色有向线段，回到终点时归零） -->
      <g v-if="running && displacementDist > 8">
        <line
          :x1="START_POINT.x"
          :y1="START_POINT.y"
          :x2="runner.x"
          :y2="runner.y"
          stroke="var(--c-physics)"
          stroke-width="1.8"
          stroke-dasharray="4 3"
          marker-end="url(#disp-arrow-head)"
        />
        <circle :cx="START_POINT.x" :cy="START_POINT.y" r="3" fill="var(--c-physics)" />
      </g>

      <!-- 运动员（俯视动感跑者：发光呼吸圈 + 尾迹 + 摆臂双肩 + 躯干 + 头部） -->
      <g :transform="`translate(${runner.x}, ${runner.y}) rotate(${runner.deg})`">
        <!-- 光晕衬底 -->
        <circle cx="0" cy="0" r="13" fill="url(#runner-glow)" />

        <!-- 静止时的点击脉冲提示圈 -->
        <circle
          v-if="!running"
          cx="0"
          cy="0"
          r="9.5"
          fill="none"
          stroke="var(--c-accent-light)"
          stroke-width="1.2"
          stroke-dasharray="3 2"
          opacity="0.7"
        />

        <!-- 奔跑时的速度残影尾迹 -->
        <g v-if="running" stroke="var(--c-accent-light)" stroke-linecap="round" opacity="0.65">
          <line x1="-13" y1="-3.5" x2="-6" y2="-3.5" stroke-width="1.4" />
          <line x1="-16" y1="0" x2="-7" y2="0" stroke-width="1.6" />
          <line x1="-13" y1="3.5" x2="-6" y2="3.5" stroke-width="1.4" />
        </g>

        <!-- 俯视双臂（随步频前后交替摆动） -->
        <line
          :x1="strideSwing"
          y1="-6.2"
          :x2="-strideSwing"
          y2="6.2"
          stroke="var(--c-neutral-50)"
          stroke-width="2.4"
          stroke-linecap="round"
        />

        <!-- 跑者双肩 / 运动背心 -->
        <rect
          x="-3.6"
          y="-5.8"
          width="7.2"
          height="11.6"
          rx="3.6"
          fill="var(--c-accent)"
          stroke="var(--c-neutral-900)"
          stroke-width="1.2"
        />

        <!-- 跑者头部与朝向帽檐 -->
        <path d="M 1 -2.8 L 5.2 0 L 1 2.8 Z" fill="#fef08a" />
        <circle cx="0.6" cy="0" r="3.3" fill="#fef08a" stroke="var(--c-neutral-900)" stroke-width="1.2" />
      </g>

      <!-- 底部轻提示 / 完成一圈结论提示 -->
      <text
        x="180"
        y="191"
        text-anchor="middle"
        font-size="11.5"
        :fill="hasFinishedOnce && !running ? '#e2a846' : '#64748b'"
      >
        {{
          running
            ? `正在逆时针绕跑道奔跑… 已跑路程 ${(progress * 400).toFixed(0)} m`
            : hasFinishedOnce
              ? "跑完一圈回到起点：路程 s = 400 m，位移 Δx = 0（点击可重跑）"
              : "点击跑道任意位置，演示运动员逆时针跑完一圈"
        }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.track-wrap {
  display: flex;
  justify-content: center;

  min-width: 0;

  cursor: pointer;
  user-select: none;
}

.track-svg {
  width: 100%;
  max-width: 460px;
  height: auto;
}
</style>
