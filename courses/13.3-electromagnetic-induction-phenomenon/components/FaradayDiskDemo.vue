<!--
  P13 交互：法拉第圆盘发电机（图 13.3-5）。
  紫铜圆盘水平安装，竖直铜轴穿过盘心；蹄形磁体的两极（N 上 / S 下）从盘的上、下两侧夹住圆盘，
  磁场沿转轴方向竖直穿过盘面（B ⊥ 盘面）→ 盘上沿半径方向的导体随盘转动时切割磁感线 → 回路中产生感应电流。
  轴电刷压在轴上（盘面之上、磁体之外），边缘电刷压在盘的右缘；两根引线一根从表盘上方、一根从表盘下方
  绕到右侧灵敏电流计，各自止于表盘左右接线柱，互不交叉。
  点「摇动手柄」铜盘持续转动、指针随转速偏转；再点「停止」铜盘停转、指针回零。
  只作定性演示（快/慢、偏/不偏），不出现数值与刻度读数。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

const CX = 238; // 盘心
const CY = 186;
const RX = 124; // 盘面在水平方向的投影半轴
const RY = 66; // 竖直方向的透视压缩半轴（俯视角看水平放置的圆盘）
const SHAFT_TOP = 66; // 轴顶（摇柄安装处）
const ARM = 38; // 摇柄臂长
const ARM_RY = (ARM * RY) / RX; // 柄臂在盘面（水平面）内转动，投影压缩与盘面一致
const AXIS_BRUSH_Y = 105; // 轴电刷高度（在盘面投影之上，避开磁体）
const EDGE_BRUSH_Y = CY; // 边缘电刷压盘的右缘
const AMM = { x: 489, y: 196, r: 27 }; // 灵敏电流计（引线端点 = 表盘左右接线柱）
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

  const target = clamp((omega.value / MAX_OMEGA) * NEEDLE_MAX, 0, NEEDLE_MAX);
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

/** 盘面上方向角 t 处的点：水平按 RX 展开、竖直按 RY 压缩（椭圆投影） */
const rimPoint = (t: number): { x: number; y: number } => ({
  x: CX + RX * Math.cos(t),
  y: CY + RY * Math.sin(t),
});

/** 盘面辐条：随转角转动，让"盘在转"看得见 */
const spokes = computed(() =>
  [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((base) => rimPoint(angle.value + base)),
);

/** 摇柄端点：柄臂固定在盘面上，随盘同角速度转动（投影成椭圆弧，视觉上真的在摇） */
const crankEnd = computed(() => ({
  x: CX + ARM * Math.cos(angle.value),
  y: SHAFT_TOP + ARM_RY * Math.sin(angle.value),
}));

/** 磁极臂（上 N / 下 S）与磁轭：两极从盘的上、下两侧夹住圆盘的边缘，磁场竖直穿过盘面。 极臂右端只到 x=212：与转轴（x=238）留出空档，整条极臂与轴在画面上没有任何交叠。 */
const YOKE = { x: 76, y: 138, w: 18, h: 96 };
const N_ARM = { x: 94, y: 138, w: 118, h: 20 };
const S_ARM = { x: 94, y: 214, w: 118, h: 20 };
/** 磁感线：四条，均匀铺在两极之间，竖直向下穿过盘面（B ⊥ 盘面） */
const FIELD_X = [122, 150, 178, 206];
/** 极臂几何中心（N/S 字母放这里） */
const ARM_CX = N_ARM.x + N_ARM.w / 2;

/** 轴电刷引线：从轴电刷水平向右引出，绕过表盘右侧、从右接线柱接入 */
const axisLead = `M ${CX + 18} ${AXIS_BRUSH_Y} H ${AMM.x + AMM.r + 12} V ${AMM.y} H ${AMM.x + AMM.r}`;
/** 边缘电刷引线：从盘缘电刷向右，从左接线柱接入（与轴引线分开走，互不交叉） */
const edgeLead = `M ${CX + RX + 16} ${EDGE_BRUSH_Y} H ${AMM.x - AMM.r - 8} V ${AMM.y} H ${AMM.x - AMM.r}`;
</script>

<template>
  <div class="ei-panel">
    <svg viewBox="0 0 560 330" xmlns="http://www.w3.org/2000/svg" class="ei-svg">
      <!-- 蹄形磁体：磁轭 + 上臂（N）+ 下臂（S）。两极从盘的上、下两侧夹住圆盘 -->
      <rect
        :x="YOKE.x"
        :y="YOKE.y"
        :width="YOKE.w"
        :height="YOKE.h"
        rx="3"
        fill="var(--c-neutral-500)"
      />
      <rect
        :x="S_ARM.x"
        :y="S_ARM.y"
        :width="S_ARM.w"
        :height="S_ARM.h"
        rx="3"
        fill="var(--c-velocity)"
      />
      <!-- 磁感线：竖直向下穿过盘面；画在盘之前，靠半透明盘面"透出" -->
      <CourseArrow
        v-for="(fx, i) in FIELD_X"
        :key="'f' + i"
        :from="{ x: fx, y: 160 }"
        :to="{ x: fx, y: 212 }"
        stroke="var(--c-field)"
        :stroke-width="2.6"
      />
      <!-- 下极 S 的字母（在盘面之下，随盘面一起被半透明盘"透出"）-->
      <text
        :x="ARM_CX"
        y="229"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="17"
        fill="var(--c-bg-soft)"
      >
        S
      </text>
      <!-- 铜盘（半透明，能透出磁感线与下极）-->
      <ellipse :cx="CX" :cy="CY" :rx="RX" :ry="RY" fill="var(--c-accent)" opacity="0.12" />
      <ellipse
        :cx="CX"
        :cy="CY"
        :rx="RX"
        :ry="RY"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="3.2"
      />
      <!-- 盘面辐条（随转角转）；标出的一根更亮，便于看清转动 -->
      <g stroke-linecap="round">
        <line
          v-for="(s, i) in spokes"
          :key="'sp' + i"
          :x1="CX"
          :y1="CY"
          :x2="s.x"
          :y2="s.y"
          :stroke="i === 0 ? 'var(--c-accent-light)' : 'var(--c-accent)'"
          :stroke-width="i === 0 ? 2.6 : 1.4"
          :opacity="i === 0 ? 0.95 : 0.42"
        />
      </g>
      <!-- 上极 N（在盘面之上，压在盘前）-->
      <rect
        :x="N_ARM.x"
        :y="N_ARM.y"
        :width="N_ARM.w"
        :height="N_ARM.h"
        rx="3"
        fill="var(--c-danger)"
      />
      <text
        :x="ARM_CX"
        y="154"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="17"
        fill="var(--c-bg-soft)"
      >
        N
      </text>
      <!-- 转轴（穿过盘心，竖直）与摇柄：摇柄在轴顶，远离磁体 -->
      <line
        :x1="CX"
        :y1="CY"
        :x2="CX"
        :y2="SHAFT_TOP"
        stroke="var(--c-neutral-200)"
        stroke-width="5"
        stroke-linecap="round"
      />
      <circle :cx="CX" :cy="CY" r="6.5" fill="var(--c-surface-solid)" stroke="var(--c-accent)" />
      <line
        :x1="CX"
        :y1="SHAFT_TOP"
        :x2="crankEnd.x"
        :y2="crankEnd.y"
        stroke="var(--c-neutral-200)"
        stroke-width="3.4"
        stroke-linecap="round"
      />
      <line
        :x1="crankEnd.x"
        :y1="crankEnd.y"
        :x2="crankEnd.x"
        :y2="crankEnd.y - 20"
        stroke="var(--c-neutral-300)"
        stroke-width="6.5"
        stroke-linecap="round"
      />
      <circle
        :cx="crankEnd.x"
        :cy="crankEnd.y - 20"
        r="5.5"
        fill="var(--c-neutral-300)"
        stroke="var(--c-bg-soft)"
        stroke-width="1"
      />
      <circle :cx="CX" :cy="SHAFT_TOP" r="4" fill="var(--c-neutral-200)" />
      <!-- 电刷：轴电刷压在轴上、边缘电刷压在盘的右缘 -->
      <rect
        :x="CX + 2"
        :y="AXIS_BRUSH_Y - 7"
        width="16"
        height="14"
        rx="2"
        fill="var(--c-accent)"
        stroke="var(--c-bg-soft)"
        stroke-width="1"
      />
      <rect
        :x="CX + RX - 2"
        :y="EDGE_BRUSH_Y - 5"
        width="18"
        height="10"
        rx="2"
        fill="var(--c-accent)"
        stroke="var(--c-bg-soft)"
        stroke-width="1"
      />
      <!-- 引线：轴电刷走表盘上方、边缘电刷走表盘下方，互不交叉 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path :d="axisLead" />
        <path :d="edgeLead" />
      </g>
      <Galvanometer :x="AMM.x" :y="AMM.y" :r="AMM.r" :angle="needle" />
      <!-- 标注（避开导线与磁体）-->
      <text :x="CX" y="282" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">铜盘</text>
      <text x="226" y="112" text-anchor="end" font-size="17" fill="var(--c-text-dim)">轴</text>
      <text x="288" y="46" font-size="17" fill="var(--c-text-dim)">手柄</text>
      <text x="382" y="166" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">边缘</text>
      <text :x="AMM.x" y="276" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">
        灵敏电流计
      </text>
    </svg>
    <div class="ei-bar">
      <button type="button" class="ei-btn" :class="{ on: spinning }" @click="toggle">
        {{ spinning ? "停止" : "摇动手柄" }}
      </button>
    </div>
  </div>
</template>
