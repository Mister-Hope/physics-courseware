<!--
  第 4 页回放：磁体插入 / 抽出线圈，电流表指针跟着偏转。

  四种情况各有一个按钮，点一次重放一遍：
  - 指针偏角与磁体速度成正比（∝ |ΔΦ/Δt|），磁体一停，指针立刻回零——这正是要让学生看见的；
  - 线圈旁的电流箭头只在磁体运动过程中出现，方向为俯视形状下的电流方向
    （近侧向右 = 俯视逆时针）。
  - 指针偏向按图上的绕向约定：甲、丁（俯视逆时针）向右偏，乙、丙（俯视顺时针）向左偏。

  磁体位移与速度都由真实运动学给出：位置走 smoothstep、速度取它对时间的导数，
  所以指针只在中间最快、两端为零。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

type CaseKey = "jia" | "yi" | "bing" | "ding";

interface CaseDef {
  /** 朝向线圈的磁极 */
  pole: "N" | "S";
  motion: "in" | "out";
  /** 俯视看电流是否为逆时针 */
  ccw: boolean;
  /** 指针偏向：+1 右、-1 左 */
  needle: 1 | -1;
}

const CASES: Record<CaseKey, CaseDef> = {
  jia: { pole: "N", motion: "in", ccw: true, needle: 1 },
  yi: { pole: "S", motion: "in", ccw: false, needle: -1 },
  bing: { pole: "N", motion: "out", ccw: false, needle: -1 },
  ding: { pole: "S", motion: "out", ccw: true, needle: 1 },
};

const CASE_LIST: { key: CaseKey; label: string }[] = [
  { key: "jia", label: "甲　N 极插入" },
  { key: "yi", label: "乙　S 极插入" },
  { key: "bing", label: "丙　N 极抽出" },
  { key: "ding", label: "丁　S 极抽出" },
];

/** 磁体长度与行程：顶端从线圈上方 45 到线圈中心 56 */
const MAGNET_TOP_HIGH = -45;
const MAGNET_TOP_LOW = 56;
const DURATION = 1500;

const active = ref<CaseKey>("jia");
/** 0 = 起 position，1 = 终点 */
const progress = ref(1);
/** 归一化速度：smoothstep 的导数 6t(1-t)，峰值 1.5 */
const speed = ref(0);

let raf = 0;
let startTime = 0;

const tick = (now: number): void => {
  raf = 0;
  const t = (now - startTime) / DURATION;
  if (t >= 1) {
    progress.value = 1;
    speed.value = 0;
    return;
  }
  progress.value = t * t * (3 - 2 * t);
  speed.value = 6 * t * (1 - t);
  raf = requestAnimationFrame(tick);
};

const play = (key: CaseKey): void => {
  active.value = key;
  progress.value = 0;
  speed.value = 0;
  startTime = performance.now();
  if (!raf) raf = requestAnimationFrame(tick);
};

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
});

const current = computed<CaseDef>(() => CASES[active.value]);
const upperPole = computed<"N" | "S">(() => (current.value.pole === "N" ? "S" : "N"));
const poleColor = (p: "N" | "S"): string => (p === "N" ? "var(--c-danger)" : "var(--c-velocity)");

const magnetTop = computed<number>(() => {
  const from = current.value.motion === "in" ? MAGNET_TOP_HIGH : MAGNET_TOP_LOW;
  const to = current.value.motion === "in" ? MAGNET_TOP_LOW : MAGNET_TOP_HIGH;

  return from + (to - from) * progress.value;
});

const needleAngle = computed<number>(() => current.value.needle * 26 * Math.min(1, speed.value));

/** 电流箭头的透明度：与速度同步淡入淡出 */
const flowOpacity = computed<number>(() => Math.min(1, speed.value * 3));

const RINGS = [
  { rx: 96, ry: 40 },
  { rx: 80, ry: 33 },
  { rx: 64, ry: 26 },
];
</script>

<template>
  <div class="rp">
    <svg viewBox="0 0 560 290" xmlns="http://www.w3.org/2000/svg" class="rp-svg">
      <!-- 条形磁体 -->
      <g>
        <rect x="267" :y="magnetTop" width="26" height="58" rx="3" :fill="poleColor(upperPole)" />
        <rect
          x="267"
          :y="magnetTop + 58"
          width="26"
          height="58"
          rx="3"
          :fill="poleColor(current.pole)"
        />
        <text
          x="280"
          :y="magnetTop + 20"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="13"
          fill="var(--c-bg)"
        >
          {{ upperPole }}
        </text>
        <text
          x="280"
          :y="magnetTop + 78"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="13"
          fill="var(--c-bg)"
        >
          {{ current.pole }}
        </text>
      </g>

      <!-- 线圈 -->
      <g fill="none" stroke="var(--c-neutral-300)" stroke-width="2">
        <ellipse v-for="r in RINGS" :key="r.rx" cx="280" cy="120" :rx="r.rx" :ry="r.ry" />
      </g>

      <!-- 引线与电流表 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
        <path d="M 240 156 V 252 H 250" />
        <path d="M 320 156 V 252 H 310" />
      </g>
      <CircuitMeter :x="280" :y="252" kind="a" :r="30" />
      <line
        x1="280"
        y1="252"
        x2="280"
        y2="226"
        stroke="var(--c-danger)"
        stroke-width="2.4"
        stroke-linecap="round"
        :transform="`rotate(${needleAngle} 280 252)`"
      />
      <circle cx="280" cy="252" r="2.4" fill="var(--c-text)" />

      <!-- 感应电流：只在线圈两侧切向出现，运动结束即消失 -->
      <g :opacity="flowOpacity">
        <CourseArrow
          :from="{ x: 172, y: current.ccw ? 100 : 142 }"
          :to="{ x: 172, y: current.ccw ? 142 : 100 }"
          stroke="var(--c-physics)"
          :stroke-width="2.6"
          :head-size="9"
        />
        <CourseArrow
          :from="{ x: 388, y: current.ccw ? 142 : 100 }"
          :to="{ x: 388, y: current.ccw ? 100 : 142 }"
          stroke="var(--c-physics)"
          :stroke-width="2.6"
          :head-size="9"
        />
      </g>
    </svg>

    <div class="rp-bar">
      <button
        v-for="item in CASE_LIST"
        :key="item.key"
        type="button"
        class="rp-btn"
        :class="{ on: item.key === active }"
        @click="play(item.key)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.rp {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.rp-svg {
  width: 100%;
  height: auto;
}

.rp-bar {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.45rem;
}

.rp-btn {
  flex: 1 1 auto;

  padding: 0.32rem 0.7rem;
  border: 1px solid var(--c-border);
  border-radius: 0.7rem;

  background: var(--c-surface);
  color: var(--c-text-dim);

  font-size: 0.82rem;
  white-space: nowrap;

  cursor: pointer;

  transition:
    color 0.2s,
    border-color 0.2s,
    background 0.2s;
}

.rp-btn:hover,
.rp-btn.on {
  border-color: var(--c-border-glow);
  background: var(--c-accent-soft);
  color: var(--c-accent);
}
</style>
