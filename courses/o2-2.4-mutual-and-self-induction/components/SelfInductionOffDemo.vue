<!--
  第 10 页演示：断电自感。
  L 与灯泡并联，电源与开关在中间支路。
  断开开关：L 中的电流不能突变，线圈相当于电源，经灯泡继续放电
  → 灯先闪亮一下，再慢慢熄灭；通过灯泡的电流方向与原来相反。
  灯亮度 ∝ |通过灯的电流|，电流用指数模型实时算。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

interface Ramp {
  t0: number;
  from: number;
  to: number;
  tau: number;
}

const closed = ref(false);
/** L 中电流（相对值 0–1） */
const iL = ref(0);
/** 通过灯泡的电流：正 = 向下，负 = 向上 */
const iB = ref(0);

const rampL: Ramp = { t0: 0, from: 0, to: 0, tau: 260 };
const rampB: Ramp = { t0: 0, from: 0, to: 0, tau: 100 };

let raf = 0;

const stepValue = (ramp: Ramp, now: number): number =>
  ramp.to + (ramp.from - ramp.to) * Math.exp(-(now - ramp.t0) / ramp.tau);

const tick = (): void => {
  raf = 0;
  const now = performance.now();

  iL.value = stepValue(rampL, now);
  iB.value = closed.value ? stepValue(rampB, now) : -iL.value;

  const busyL = Math.abs(iL.value - rampL.to) > 0.004;
  const busyB = closed.value ? Math.abs(iB.value - rampB.to) > 0.004 : busyL;

  if (busyL || busyB) {
    raf = requestAnimationFrame(tick);
  } else {
    iL.value = rampL.to;
    iB.value = closed.value ? rampB.to : -iL.value;
  }
};

const ensureLoop = (): void => {
  if (raf) return;
  raf = requestAnimationFrame(tick);
};

const setClosed = (on: boolean): void => {
  if (closed.value === on) return;
  closed.value = on;
  const now = performance.now();

  rampL.t0 = now;
  rampL.from = iL.value;
  rampL.to = on ? 1 : 0;
  rampL.tau = on ? 260 : 720;

  rampB.t0 = now;
  rampB.from = Math.abs(iB.value);
  rampB.to = on ? 0.62 : 0;
  rampB.tau = 100;

  // 断开瞬间：L 的电流立刻改为经灯泡继续流动（方向相反）
  if (!on) iB.value = -iL.value;

  ensureLoop();
};

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
});

const brightness = computed(() => Math.min(1, Math.abs(iB.value)));
const stateText = computed(() => {
  if (closed.value) return "开关闭合：灯正常发光";
  return iL.value > 0.03 ? "L 通过灯泡放电" : "灯熄灭";
});
</script>

<template>
  <div class="demo-panel">
    <svg viewBox="125 50 415 295" xmlns="http://www.w3.org/2000/svg" class="demo-svg">
      <!-- 铁芯 -->
      <rect
        x="156"
        y="88"
        width="28"
        height="76"
        rx="3"
        fill="var(--c-neutral-700)"
        opacity="0.5"
      />
      <!-- 导线 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path d="M 170 70 H 470" />
        <path d="M 170 70 V 99.2" />
        <path d="M 170 152.8 V 300" />
        <path d="M 470 70 V 174" />
        <path d="M 470 206 V 300" />
        <path d="M 320 70 V 130" />
        <path d="M 320 170 V 222" />
        <path d="M 320 238 V 300" />
        <path d="M 170 300 H 470" />
      </g>
      <!-- 节点圆点 -->
      <circle cx="320" cy="70" r="3.4" fill="var(--c-text)" />
      <circle cx="320" cy="300" r="3.4" fill="var(--c-text)" />
      <!-- 线圈 L：套在铁芯上的竖放连续螺旋线 3.5 匝，接线端落在上、下轮廓 (170,99.2) / (170,152.8) -->
      <Solenoid
        :x="170"
        :y="126"
        :length="36"
        :radius="26"
        :turns="3.5"
        direction="ccw"
        orientation="vertical"
        :phase="270"
        :line-width="2.8"
        :back-opacity="0.32"
      />
      <!-- 灯泡 -->
      <circle
        :cx="470"
        :cy="190"
        :r="26 + 18 * brightness"
        fill="var(--c-accent)"
        :opacity="0.45 * brightness"
      />
      <CircuitBulb :x="470" :y="190" :r="16" />
      <!-- 灯泡支路中的电流方向：闭合时向下，断开后向上；无电流时不画 -->
      <g v-if="brightness > 0.05">
        <CourseArrow
          v-if="closed"
          :from="{ x: 506, y: 160 }"
          :to="{ x: 506, y: 220 }"
          stroke="var(--c-accent-2)"
          :stroke-width="3"
        />
        <CourseArrow
          v-else
          :from="{ x: 506, y: 220 }"
          :to="{ x: 506, y: 160 }"
          stroke="var(--c-danger)"
          :stroke-width="3"
        />
        <text
          x="524"
          y="196"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="17"
          :fill="closed ? 'var(--c-accent-2)' : 'var(--c-danger)'"
        >
          I
        </text>
      </g>
      <CircuitSwitch :x="320" :y="150" orientation="vertical" label="S" :open="!closed" />
      <CircuitBattery :x="320" :y="230" orientation="vertical" polarity emf="E" />
      <!-- 标签 -->
      <text
        x="134"
        y="134"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="var(--c-accent)"
      >
        L
      </text>
      <text x="440" y="196" text-anchor="end" font-size="16" fill="var(--c-text-dim)">灯泡</text>
      <text
        v-if="!closed && iL > 0.05"
        x="170"
        y="328"
        text-anchor="middle"
        font-size="15"
        fill="var(--c-danger)"
      >
        线圈相当于电源
      </text>
    </svg>

    <div class="demo-bar">
      <button
        type="button"
        class="demo-btn"
        :class="{ on: closed }"
        :disabled="closed"
        @click="setClosed(true)"
      >
        闭合
      </button>
      <button type="button" class="demo-btn" :disabled="!closed" @click="setClosed(false)">
        断开
      </button>
      <span class="demo-pill">{{ stateText }}</span>
    </div>
  </div>
</template>
