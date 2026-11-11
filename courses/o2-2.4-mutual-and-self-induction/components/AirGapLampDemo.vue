<!--
  第 2、3 页演示：隔空点灯（互感）。
  大线圈 B 竖放（轴线竖直），小线圈 A 竖放、从 B 顶端插进 B 的孔里，两者同轴套在一起；
  两个回路之间只有空气、没有导线。
  合上 / 断开开关的瞬间，A 中电流变化 → 穿过 B 的磁通量变化
  → B 中产生感应电动势 → 灯闪亮；电流稳定后灯熄灭。

  灯亮度 ∝ |dI/dt|（用指数趋近模型实时算），不是写死的动画。
  注意：耦合只画「柔和光区 + 沿轴箭头」，不画旋转虚线椭圆（容易被误读成磁感线）。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

const { controls = true } = defineProps<{
  /** 是否显示「接通 / 断开」按钮与状态条（第 2 页只看装置时关掉） */
  controls?: boolean;
}>();

/** 电流变化的指数时间常数（ms） */
const TAU = 240;

const powered = ref(false);
/** 线圈 A 中的电流，0–1（相对值） */
const current = ref(0);
/** B 中的感应电动势，0–1（相对值）；灯亮度直接跟随它 */
const emf = ref(0);

let raf = 0;
let last = 0;
let startTime = 0;
let startCurrent = 0;
let targetCurrent = 0;

const clamp = (value: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, value));

const tick = (now: number): void => {
  raf = 0;
  const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
  last = now;

  // I(t) = target + (start − target)·e^(−t/τ)
  const decay = Math.exp(-(now - startTime) / TAU);
  current.value = targetCurrent + (startCurrent - targetCurrent) * decay;

  // dI/dt（每秒）：只在电流变化时非零，稳定后归零
  const didt = ((targetCurrent - startCurrent) / (TAU / 1000)) * decay;
  const targetEmf = clamp(Math.abs(didt) * 0.22, 0, 1);
  emf.value += (targetEmf - emf.value) * Math.min(1, dt * 26);

  const busy = Math.abs(current.value - targetCurrent) > 0.003 || emf.value > 0.006;

  if (busy) {
    raf = requestAnimationFrame(tick);
  } else {
    current.value = targetCurrent;
    emf.value = 0;
  }
};

const ensureLoop = (): void => {
  if (raf) return;
  last = performance.now();
  raf = requestAnimationFrame(tick);
};

const toggle = (on: boolean): void => {
  if (powered.value === on) return;
  powered.value = on;
  startCurrent = current.value;
  targetCurrent = on ? 1 : 0;
  startTime = performance.now();
  ensureLoop();
};

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
});

const stateText = computed(() => {
  if (!powered.value) return current.value > 0.02 ? "A 中电流减小" : "A 中无电流";

  return current.value < 0.98 ? "A 中电流增大" : "A 中电流稳定";
});

/** 磁场（光区、沿轴箭头）强度：随 A 中电流出现、消失 */
const fieldOpacity = computed(() => clamp(current.value, 0, 1));
/** 灯亮度 */
const glow = computed(() => clamp(emf.value * 1.15, 0, 1));
</script>

<template>
  <div class="demo-panel">
    <svg viewBox="0 0 580 360" xmlns="http://www.w3.org/2000/svg" class="demo-svg">
      <defs>
        <radialGradient id="airgap-glow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0.5" />
          <stop offset="100%" stop-color="var(--c-accent)" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- 穿过两线圈的磁场：柔和填充光区（不是磁感线形状）+ 沿轴方向箭头 -->
      <g :opacity="0.9 * fieldOpacity">
        <ellipse cx="300" cy="145" rx="42" ry="76" fill="url(#airgap-glow-grad)" class="coupling-glow" />
        <ellipse cx="300" cy="196" rx="58" ry="64" fill="url(#airgap-glow-grad)" class="coupling-glow" />
      </g>
      <CourseArrow
        v-if="fieldOpacity > 0.02"
        :from="{ x: 300, y: 206 }"
        :to="{ x: 300, y: 104 }"
        stroke="var(--c-accent)"
        stroke-width="2.2"
        :opacity="0.85 * fieldOpacity"
      />

      <!-- 线圈 A（小、套在里面）：竖放 4 匝；接线端在右侧 (326,86) 上、(326,204) 下 -->
      <Solenoid
        :x="300"
        :y="145"
        :length="118"
        :radius="26"
        :turns="4"
        direction="cw"
        orientation="vertical"
        :phase="0"
        :line-width="2.8"
        :back-opacity="0.3"
      />
      <!-- A 的回路：上端引出向上、向左兜一圈，下端从 B 的孔里穿下去再接回 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path d="M 326 86 V 58 H 92 V 132" />
        <path d="M 92 168 V 300 H 192" />
        <path d="M 208 300 H 326 V 204" />
      </g>
      <CircuitSwitch :x="92" :y="150" orientation="vertical" label="S" :open="!powered" />
      <CircuitBattery :x="200" :y="300" polarity emf="E" />

      <!-- 线圈 B（大、套在外面）：竖放 4 匝；接线端在右侧 (345,134) 上、(345,258) 下 -->
      <Solenoid
        :x="300"
        :y="196"
        :length="124"
        :radius="45"
        :turns="4"
        direction="cw"
        orientation="vertical"
        :phase="0"
        :line-width="2.8"
        :back-opacity="0.32"
        color="var(--c-accent-2)"
      />
      <!-- B 的回路 + 小灯泡 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path d="M 345 134 H 500 V 179" />
        <path d="M 500 213 V 258 H 345" />
      </g>
      <circle
        :cx="500"
        :cy="196"
        :r="17 + 14 * glow"
        fill="var(--c-accent)"
        :opacity="0.42 * glow"
      />
      <CircuitBulb :x="500" :y="196" :r="17" />

      <!-- 文字与引线 -->
      <g stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.7">
        <path d="M 206 94 H 266" fill="none" />
        <path d="M 350 196 H 382" fill="none" />
      </g>
      <text x="196" y="99" text-anchor="end" font-size="15" fill="var(--c-text-dim)">
        线圈 A
      </text>
      <text x="420" y="201" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">
        线圈 B
      </text>
      <text x="528" y="201" font-size="14" fill="var(--c-text-dim)">小灯泡</text>
    </svg>

    <div v-if="controls" class="demo-bar">
      <button
        type="button"
        class="demo-btn"
        :class="{ on: powered }"
        :disabled="powered"
        @click="toggle(true)"
      >
        接通
      </button>
      <button type="button" class="demo-btn" :disabled="!powered" @click="toggle(false)">
        断开
      </button>
      <span class="demo-pill">{{ stateText }}</span>
    </div>
  </div>
</template>
