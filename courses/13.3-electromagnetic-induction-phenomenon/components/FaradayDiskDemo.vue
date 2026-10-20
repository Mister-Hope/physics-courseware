<!--
  P13 交互：法拉第圆盘发电机（图 13.3-5）。
  铜盘在磁极之间转动：盘上沿半径方向的导体不断切割磁感线 → 回路中产生感应电流 → 电流表指针偏转。
  点「摇动手柄」铜盘持续转动、指针随转速偏转；再点「停止」铜盘停转、指针回零。
  只作定性演示（快/慢、偏/不偏），不出现数值与公式。
-->
<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

const CX = 270;
const CY = 160;
const RX = 42; // 椭圆短半轴（透视：垂直于纸面的方向被压缩）
const RY = 64; // 椭圆长半轴（铜盘半径）
const MAX_OMEGA = 5; // rad/s
const NEEDLE_MAX = 30;

const spinning = ref(false);
/** 铜盘转角（rad） */
const angle = ref(0);
const omega = ref(0);
const needle = ref(0);

let raf = 0;
let lastTime = 0;

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

const tick = (now: number): void => {
  raf = 0;
  const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
  lastTime = now;

  if (spinning.value) {
    omega.value += (MAX_OMEGA - omega.value) * Math.min(1, dt * 4);
  } else {
    omega.value *= Math.exp(-dt * 6);
    if (omega.value < 0.04) omega.value = 0;
  }
  angle.value = (angle.value + omega.value * dt) % (Math.PI * 2);

  const target = (omega.value / MAX_OMEGA) * NEEDLE_MAX;
  needle.value += (target - needle.value) * Math.min(1, dt * 10);

  const busy = spinning.value || omega.value > 0.02 || Math.abs(needle.value) > 0.3;
  if (busy) {
    raf = requestAnimationFrame(tick);
  } else {
    needle.value = 0;
    omega.value = 0;
  }
};

const ensureLoop = (): void => {
  if (raf) return;
  lastTime = performance.now();
  raf = requestAnimationFrame(tick);
};

const toggle = (): void => {
  spinning.value = !spinning.value;
  ensureLoop();
};

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
});

/** 铜盘上的辐条（3 根，随转角转） */
const spokes = (): { x: number; y: number }[] =>
  [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((base) => {
    const t = angle.value + base;
    return { x: CX + RX * Math.sin(t), y: CY - RY * Math.cos(t) };
  });

/** 手柄端点（与铜盘同角速度转动，透视压缩同铜盘） */
const crank = (): { x: number; y: number } => ({
  x: 400 + 16.9 * Math.sin(angle.value),
  y: CY - 26 * Math.cos(angle.value),
});
</script>

<template>
  <div class="ei-panel">
    <svg viewBox="0 0 560 330" xmlns="http://www.w3.org/2000/svg" class="ei-svg">
      <!-- 磁极（左右两极，N 红 / S 蓝）-->
      <rect x="170" y="118" width="30" height="84" rx="4" fill="var(--c-danger)" />
      <rect x="340" y="118" width="30" height="84" rx="4" fill="var(--c-velocity)" />
      <text
        x="185"
        y="168"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="20"
        fill="var(--c-bg-soft)"
      >
        N
      </text>
      <text
        x="355"
        y="168"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="20"
        fill="var(--c-bg-soft)"
      >
        S
      </text>
      <!-- 磁极之间的磁场（水平，穿过铜盘）-->
      <CourseArrow
        :from="{ x: 202, y: 132 }"
        :to="{ x: 338, y: 132 }"
        stroke="var(--c-accent)"
        :stroke-width="2"
      />
      <CourseArrow
        :from="{ x: 202, y: 188 }"
        :to="{ x: 338, y: 188 }"
        stroke="var(--c-accent)"
        :stroke-width="2"
      />
      <!-- 铜盘（半透明填充，磁场线可透出）-->
      <ellipse :cx="CX" :cy="CY" :rx="RX" :ry="RY" fill="var(--c-surface-solid)" opacity="0.45" />
      <ellipse
        :cx="CX"
        :cy="CY"
        :rx="RX"
        :ry="RY"
        fill="none"
        stroke="var(--c-accent-2)"
        stroke-width="3.2"
      />
      <!-- 辐条（转动可见）-->
      <g stroke="var(--c-accent-2)" stroke-width="2" opacity="0.85">
        <line v-for="(s, i) in spokes()" :key="'sp' + i" :x1="CX" :y1="CY" :x2="s.x" :y2="s.y" />
      </g>
      <!-- 转轴与手柄 -->
      <line
        x1="150"
        y1="160"
        x2="400"
        y2="160"
        stroke="var(--c-text)"
        stroke-width="3"
        stroke-linecap="round"
      />
      <line
        x1="400"
        y1="160"
        :x2="crank().x"
        :y2="crank().y"
        stroke="var(--c-text)"
        stroke-width="2.6"
        stroke-linecap="round"
      />
      <circle
        :cx="crank().x"
        :cy="crank().y"
        r="6"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text)"
        stroke-width="2"
      />
      <circle :cx="CX" :cy="CY" r="4.5" fill="var(--c-text)" />
      <!-- 电刷与引线 -->
      <rect x="262" y="224" width="16" height="10" rx="2" fill="var(--c-neutral-300)" />
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path d="M 150 160 H 120 V 230 H 456" />
        <path d="M 270 234 V 300 H 504 V 254" />
      </g>
      <CircuitMeter :x="480" :y="230" kind="a" :r="24" />
      <line
        :x1="480"
        y1="230"
        :x2="480"
        y2="210"
        :transform="`rotate(${needle} 480 230)`"
        stroke="var(--c-danger)"
        stroke-width="2.6"
        stroke-linecap="round"
      />
      <circle cx="480" cy="230" r="2.6" fill="var(--c-text)" />
      <!-- 标注 -->
      <text :x="CX" y="84" text-anchor="middle" font-size="19" fill="var(--c-text-dim)">铜盘</text>
      <text x="452" y="120" font-size="19" fill="var(--c-text-dim)">手柄</text>
      <text x="480" y="282" text-anchor="middle" font-size="19" fill="var(--c-text-dim)">
        电流表
      </text>
      <text x="140" y="248" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">轴</text>
      <text x="230" y="262" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">边缘</text>
    </svg>
    <div class="ei-bar">
      <button type="button" class="ei-btn" :class="{ on: spinning }" @click="toggle">
        {{ spinning ? "停止" : "摇动手柄" }}
      </button>
    </div>
  </div>
</template>
