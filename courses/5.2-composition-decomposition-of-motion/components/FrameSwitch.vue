<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * 速度合成定理的动画：同一件事，在"地面参考系"和"传送带参考系"里分别看。 左：地面系（C）—— 带在走、人在带上走，人对地 = 人对带 + 带对地； 右：带系（B）—— 带不动、人只走
 * v人对带，地面在往后退。 两栏互相对照，学生就能看出"换参考系 = 换一个观察者"，而 A 对 C 的速度是两个视角的叠加。
 */
const { showVectors = true, showPanel = true } = defineProps<{
  /** 是否画速度矢量 */
  showVectors?: boolean;
  /** 是否显示滑杆 */
  showPanel?: boolean;
}>();

const VIEW_W = 760;
const VIEW_H = 240;
const PANEL_W = 336;
const LEFT_X = 20;
const RIGHT_X = 404;
const BELT_TOP = 122;
const BELT_H = 28;
const STRIPE = 44;
/** 每 1 m/s 对应的屏幕速度（像素/秒）与箭头长度（像素） */
const SPEED_PX = 52;
const ARROW_PX = 46;

const vWalk = ref(1);
const vBelt = ref(1.2);

const phase = ref(0);
let raf = 0;
let started = 0;

const loop = (now: number): void => {
  if (!started) started = now;
  phase.value = ((now - started) / 1000) % 1000;
  raf = requestAnimationFrame(loop);
};

onMounted(() => {
  raf = requestAnimationFrame(loop);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
});

// 人在某一栏里的屏幕位置：按该参考系里看到的速度前进，走出栏外就绕回左边
const walkerX = (panelX: number, speed: number): number => {
  const span = PANEL_W - 76;
  return panelX + 38 + ((phase.value * speed * SPEED_PX) % span);
};

const leftWalker = computed(() => walkerX(LEFT_X, vWalk.value + vBelt.value));
const rightWalker = computed(() => walkerX(RIGHT_X, vWalk.value));
/** 左栏：带上的斜纹按"带对地速度"向右走 */
const leftStripes = computed(() =>
  [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
    (i) => LEFT_X + ((i * STRIPE + phase.value * vBelt.value * SPEED_PX) % (PANEL_W - 8)),
  ),
);
/** 右栏：带不动（斜纹静止），地面斜线在向左退 */
const rightStripes = computed(() => [0, 1, 2, 3, 4, 5, 6].map((i) => RIGHT_X + 30 + i * 40));
const rightGroundShift = computed(() => -((phase.value * vBelt.value * SPEED_PX) % 40));
</script>

<template>
  <div class="frame-switch">
    <svg
      :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="地面参考系与传送带参考系看同一个运动"
    >
      <!-- 左栏：地面参考系 -->
      <rect
        :x="LEFT_X"
        y="14"
        :width="PANEL_W"
        height="208"
        rx="14"
        fill="rgba(148,163,184,0.05)"
        stroke="rgba(148,163,184,0.3)"
        stroke-width="1.8"
      />
      <text :x="LEFT_X + 16" y="36" font-family="KaTeX_Main" font-size="16" fill="#cbd5e1">
        地面参考系（C）看
      </text>
      <line
        :x1="LEFT_X + 12"
        y1="196"
        :x2="LEFT_X + PANEL_W - 12"
        y2="196"
        stroke="rgba(203,213,225,0.7)"
        stroke-width="2"
      />
      <rect
        :x="LEFT_X + 12"
        :y="BELT_TOP"
        :width="PANEL_W - 24"
        :height="BELT_H"
        rx="6"
        fill="rgba(96,165,250,0.14)"
        stroke="rgba(96,165,250,0.5)"
        stroke-width="1.6"
      />
      <path
        :d="
          leftStripes
            .map((x) => `M ${x} ${BELT_TOP + 7} L ${x - 12} ${BELT_TOP + BELT_H - 7}`)
            .join(' ')
        "
        stroke="rgba(147,197,253,0.55)"
        stroke-width="2"
        fill="none"
      />
      <text
        :x="LEFT_X + 16"
        :y="BELT_TOP + BELT_H + 20"
        font-family="KaTeX_Main"
        font-size="14"
        fill="rgba(147,197,253,0.9)"
      >
        传送带在走动
      </text>
      <!-- 人（地面系里：人走得比带快） -->
      <g :transform="`translate(${leftWalker} 0)`">
        <circle cx="0" cy="76" r="8" fill="none" stroke="#e2a846" stroke-width="2.6" />
        <line
          x1="0"
          y1="84"
          x2="0"
          y2="108"
          stroke="#e2a846"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <line
          x1="0"
          y1="108"
          x2="-9"
          y2="122"
          stroke="#e2a846"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <line
          x1="0"
          y1="108"
          x2="9"
          y2="122"
          stroke="#e2a846"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <line
          x1="0"
          y1="92"
          x2="-10"
          y2="102"
          stroke="#e2a846"
          stroke-width="2.2"
          stroke-linecap="round"
        />
        <line
          x1="0"
          y1="92"
          x2="10"
          y2="84"
          stroke="#e2a846"
          stroke-width="2.2"
          stroke-linecap="round"
        />
      </g>
      <!-- 地面系里的两个速度 -->
      <g v-if="showVectors">
        <CourseArrow
          :from="{ x: leftWalker + 12, y: 98 }"
          :to="{ x: leftWalker + 12 + (vWalk + vBelt) * ARROW_PX, y: 98 }"
          stroke="#f87171"
          :stroke-width="3.2"
        />
        <text
          :x="leftWalker + 14"
          y="90"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="17"
          fill="#f87171"
        >
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="12" dy="3">人对地</tspan>
        </text>
        <CourseArrow
          :from="{ x: LEFT_X + 40, y: BELT_TOP + BELT_H / 2 }"
          :to="{ x: LEFT_X + 40 + vBelt * ARROW_PX, y: BELT_TOP + BELT_H / 2 }"
          stroke="#60a5fa"
          :stroke-width="3"
        />
        <text
          :x="LEFT_X + 42"
          :y="BELT_TOP - 12"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="17"
          fill="#93c5fd"
        >
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="12" dy="3">带对地</tspan>
        </text>
      </g>
      <!-- 右栏：传送带参考系 -->
      <rect
        :x="RIGHT_X"
        y="14"
        :width="PANEL_W"
        height="208"
        rx="14"
        fill="rgba(148,163,184,0.05)"
        stroke="rgba(148,163,184,0.3)"
        stroke-width="1.8"
      />
      <text :x="RIGHT_X + 16" y="36" font-family="KaTeX_Main" font-size="16" fill="#cbd5e1">
        传送带参考系（B）看
      </text>
      <rect
        :x="RIGHT_X + 12"
        :y="BELT_TOP"
        :width="PANEL_W - 24"
        :height="BELT_H"
        rx="6"
        fill="rgba(96,165,250,0.14)"
        stroke="rgba(96,165,250,0.5)"
        stroke-width="1.6"
      />
      <path
        :d="
          rightStripes
            .map(
              (x) =>
                `M ${Math.min(x, RIGHT_X + PANEL_W - 24)} ${BELT_TOP + 7} L ${Math.min(x, RIGHT_X + PANEL_W - 24) - 12} ${BELT_TOP + BELT_H - 7}`,
            )
            .join(' ')
        "
        stroke="rgba(147,197,253,0.55)"
        stroke-width="2"
        fill="none"
      />
      <text
        :x="RIGHT_X + 16"
        :y="BELT_TOP + BELT_H + 20"
        font-family="KaTeX_Main"
        font-size="14"
        fill="rgba(147,197,253,0.9)"
      >
        传送带不动
      </text>
      <!-- 带系里：地面在往后退 -->
      <g opacity="0.85">
        <line
          :x1="RIGHT_X + 12"
          y1="196"
          :x2="RIGHT_X + PANEL_W - 12"
          y2="196"
          stroke="rgba(203,213,225,0.7)"
          stroke-width="2"
        />
        <path
          :d="
            [0, 1, 2, 3, 4, 5, 6, 7, 8]
              .map((i) => {
                const x =
                  RIGHT_X +
                  12 +
                  ((((i * 40 + rightGroundShift) % (PANEL_W - 24)) + (PANEL_W - 24)) %
                    (PANEL_W - 24));
                return `M ${x} 196 L ${x + 10} 208`;
              })
              .join(' ')
          "
          stroke="rgba(203,213,225,0.5)"
          stroke-width="1.6"
          fill="none"
        />
      </g>
      <!-- 人（带系里：只有人对带的速度） -->
      <g :transform="`translate(${rightWalker} 0)`">
        <circle cx="0" cy="76" r="8" fill="none" stroke="#e2a846" stroke-width="2.6" />
        <line
          x1="0"
          y1="84"
          x2="0"
          y2="108"
          stroke="#e2a846"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <line
          x1="0"
          y1="108"
          x2="-9"
          y2="122"
          stroke="#e2a846"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <line
          x1="0"
          y1="108"
          x2="9"
          y2="122"
          stroke="#e2a846"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <line
          x1="0"
          y1="92"
          x2="-10"
          y2="102"
          stroke="#e2a846"
          stroke-width="2.2"
          stroke-linecap="round"
        />
        <line
          x1="0"
          y1="92"
          x2="10"
          y2="84"
          stroke="#e2a846"
          stroke-width="2.2"
          stroke-linecap="round"
        />
      </g>
      <g v-if="showVectors">
        <CourseArrow
          :from="{ x: rightWalker + 12, y: 98 }"
          :to="{ x: rightWalker + 12 + vWalk * ARROW_PX, y: 98 }"
          stroke="#e2a846"
          :stroke-width="3.2"
        />
        <text
          :x="rightWalker + 14"
          y="90"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="17"
          fill="#e2a846"
        >
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="12" dy="3">人对带</tspan>
        </text>
        <CourseArrow
          :from="{ x: RIGHT_X + PANEL_W - 40, y: 196 }"
          :to="{ x: RIGHT_X + PANEL_W - 40 - vBelt * ARROW_PX, y: 196 }"
          stroke="#60a5fa"
          :stroke-width="3"
        />
        <text
          :x="RIGHT_X + PANEL_W - 190"
          y="220"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="17"
          fill="#93c5fd"
        >
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="12" dy="3">地相对带</tspan>
        </text>
      </g>
    </svg>
    <div v-if="showPanel" class="frame-panel">
      <label
        >人对带的速度 <span class="frame-val">{{ vWalk.toFixed(1) }} m/s</span
        ><input v-model.number="vWalk" type="range" min="0.4" max="2" step="0.1"
      /></label>
      <label
        >带对地的速度 <span class="frame-val">{{ vBelt.toFixed(1) }} m/s</span
        ><input v-model.number="vBelt" type="range" min="0" max="2" step="0.1"
      /></label>
    </div>
    <div class="frame-readout">
      人对地的速度 = v<sub>人对带</sub> + v<sub>带对地</sub> = {{ vWalk.toFixed(1) }} +
      {{ vBelt.toFixed(1) }} = <b>{{ (vWalk + vBelt).toFixed(1) }} m/s</b>
    </div>
  </div>
</template>

<style scoped>
.frame-switch {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
}

.frame-switch svg {
  display: block;
  width: 100%;
  height: auto;
}

.frame-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1.6rem;

  color: var(--c-text-dim, #94a3b8);

  font-size: 0.8rem;
}

.frame-panel label {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.frame-panel input {
  width: 6.5rem;
}

.frame-val {
  min-width: 3.2rem;
  color: var(--c-accent, #e2a846);
  font-variant-numeric: tabular-nums;
}

.frame-readout {
  color: var(--c-text, #e2e8f0);
  font-size: 0.95rem;
  text-align: center;
}
</style>
