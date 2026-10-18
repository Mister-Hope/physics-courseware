<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * 抓娃娃机（俯视图：从上往下看）。
 *
 * 爪在落下抓取之前，要在水平面内选好位置：1 号电机驱动小车沿横梁左右移动（x 坐标）， 2 号电机驱动横梁沿两侧导轨前后移动（y 坐标）——两个方向的运动互相垂直、互不干扰。
 * 位置按真实运动学算：x = v_x t + ½a_x t²，y = v_y t；爪走过的轨迹与两个方向上的投影都画出来， 让学生看到"一条平面内的轨迹 = 两个方向上的直线运动"。
 *
 * 用法：只开 x（vy=0）、只开 y（vx=0）、两个都开（斜线）；ax > 0 时轨迹变成曲线。
 */
const {
  vx = 1,
  vy = 0.6,
  ax = 0,
  trail = true,
  showMotors = false,
  showProjection = true,
  readout = true,
} = defineProps<{
  /** 左右方向初速度（m/s）；0 表示 1 号电机不工作 */
  vx?: number;
  /** 前后方向速度（m/s）；0 表示 2 号电机不工作 */
  vy?: number;
  /** 左右方向的加速度（m/s²），>0 时轨迹变曲线 */
  ax?: number;
  /** 是否画出爪走过的轨迹 */
  trail?: boolean;
  /** 是否标出两个电机（点开后才出现） */
  showMotors?: boolean;
  /** 是否画坐标轴与两个方向上的投影 */
  showProjection?: boolean;
  /** 是否显示运动性质的读数 */
  readout?: boolean;
}>();

const VIEW_W = 760;
const VIEW_H = 460;
/** 原点 O（爪的起点）与每米对应的像素数 */
const OX = 116;
const OY = 372;
const SX = 250;
const SY = 232;
/** 一轮运动 2 s、动画 2.6 s、停 1.1 s 后重放 */
const T_PHYS = 2;
const T_ANIM = 2.6;
const HOLD = 1.1;
/** 横梁两侧导轨的 x 位置 */
const RAIL_LEFT = 108;
const RAIL_RIGHT = 652;

const progress = ref(0);
let raf = 0;
let started = 0;

const loop = (now: number): void => {
  if (!started) started = now;
  const elapsed = (now - started) / 1000;
  progress.value = Math.min(1, (elapsed % (T_ANIM + HOLD)) / T_ANIM);
  raf = requestAnimationFrame(loop);
};

onMounted(() => {
  raf = requestAnimationFrame(loop);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
});

const tNow = computed(() => progress.value * T_PHYS);
const xOf = (t: number): number => vx * t + 0.5 * ax * t * t;
const yOf = (t: number): number => vy * t;

/** 爪当前的位置（用户单位）：x 向右、y 向"里"（屏幕上向上） */
const clawX = computed(() => OX + xOf(tNow.value) * SX);
const clawY = computed(() => OY - yOf(tNow.value) * SY);
/** 横梁的 y 位置 = 爪的 y 位置；小车带着爪沿横梁左右移动 */
const beamY = computed(() => clawY.value);

const trailPoints = computed(() => {
  const steps = 48;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = (tNow.value * i) / steps;
    pts.push(`${(OX + xOf(t) * SX).toFixed(1)},${(OY - yOf(t) * SY).toFixed(1)}`);
  }
  return pts.join(" ");
});

const xMotorText = computed(() => {
  if (vx === 0 && ax === 0) return "1 号电机（左右）：不工作";
  return ax === 0 ? "1 号电机（左右）：匀速" : "1 号电机（左右）：匀加速";
});
const yMotorText = computed(() =>
  vy === 0 ? "2 号电机（前后）：不工作" : "2 号电机（前后）：匀速",
);
</script>

<template>
  <div class="sim">
    <svg
      :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="抓娃娃机俯视图里爪的平面运动"
    >
      <!-- 机箱与机内地面（俯视） -->
      <rect
        x="56"
        y="36"
        width="648"
        height="392"
        rx="18"
        fill="color-mix(in srgb, var(--c-text-dim) 5%, transparent)"
        stroke="color-mix(in srgb, var(--c-text-dim) 35%, transparent)"
        stroke-width="2"
      />
      <rect
        x="92"
        y="66"
        width="576"
        height="328"
        rx="10"
        fill="color-mix(in srgb, var(--c-text-dim) 8%, transparent)"
        stroke="color-mix(in srgb, var(--c-text-dim) 25%, transparent)"
        stroke-width="1.6"
      />
      <text
        x="100"
        y="60"
        font-family="KaTeX_Main"
        font-size="15"
        fill="color-mix(in srgb, var(--c-neutral-300) 70%, transparent)"
      >
        俯视：从上往下看
      </text>
      <!-- 两侧导轨（2 号电机驱动横梁沿它前后移动） -->
      <rect
        :x="RAIL_LEFT - 4"
        y="78"
        width="8"
        height="304"
        rx="4"
        fill="color-mix(in srgb, var(--c-text-dim) 35%, transparent)"
      />
      <rect
        :x="RAIL_RIGHT - 4"
        y="78"
        width="8"
        height="304"
        rx="4"
        fill="color-mix(in srgb, var(--c-text-dim) 35%, transparent)"
      />
      <!-- 横梁 -->
      <rect
        :x="RAIL_LEFT"
        :y="beamY - 9"
        :width="RAIL_RIGHT - RAIL_LEFT"
        height="18"
        rx="7"
        fill="color-mix(in srgb, var(--c-text-dim) 38%, transparent)"
      />
      <!-- 小车（1 号电机驱动它沿横梁左右移动） -->
      <rect
        :x="clawX - 22"
        :y="beamY - 15"
        width="44"
        height="30"
        rx="8"
        fill="color-mix(in srgb, var(--c-text-dim) 45%, transparent)"
        stroke="color-mix(in srgb, var(--c-neutral-300) 70%, transparent)"
        stroke-width="1.6"
      />
      <!-- 爪（俯视，悬在落点上方） -->
      <g :transform="`translate(${clawX} ${clawY})`">
        <circle
          r="22"
          fill="none"
          stroke="color-mix(in srgb, var(--c-accent) 55%, transparent)"
          stroke-width="1.6"
          stroke-dasharray="6 5"
        />
        <circle r="7" fill="var(--c-accent)" />
        <line
          x1="8"
          y1="0"
          x2="19"
          y2="0"
          stroke="var(--c-accent)"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <line
          x1="-8"
          y1="0"
          x2="-19"
          y2="0"
          stroke="var(--c-accent)"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <line
          x1="0"
          y1="8"
          x2="0"
          y2="19"
          stroke="var(--c-accent)"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <line
          x1="0"
          y1="-8"
          x2="0"
          y2="-19"
          stroke="var(--c-accent)"
          stroke-width="2.6"
          stroke-linecap="round"
        />
      </g>
      <!-- 娃娃堆 -->
      <circle cx="206" cy="140" r="20" fill="var(--c-force)" opacity="0.7" />
      <circle cx="268" cy="118" r="17" fill="var(--c-velocity)" opacity="0.7" />
      <circle cx="336" cy="150" r="18" fill="var(--c-accent)" opacity="0.7" />
      <circle cx="240" cy="300" r="19" fill="color-mix(in srgb, var(--c-physics) 70%, transparent)" />
      <circle cx="430" cy="330" r="20" fill="var(--c-ok)" opacity="0.7" />
      <circle cx="520" cy="212" r="17" fill="color-mix(in srgb, var(--c-neutral-300) 55%, transparent)" />
      <!-- 目标：爪要落到的那个娃娃 -->
      <circle
        cx="612"
        cy="98"
        r="22"
        fill="none"
        stroke="color-mix(in srgb, var(--c-accent) 85%, transparent)"
        stroke-width="2.4"
        stroke-dasharray="7 5"
      />
      <circle cx="612" cy="98" r="16" fill="var(--c-force)" opacity="0.85" />
      <!-- 取物口（抓到之后投放的位置，与这次对位无关） -->
      <rect
        x="540"
        y="318"
        width="100"
        height="58"
        rx="8"
        fill="color-mix(in srgb, var(--c-text-dim) 12%, transparent)"
        stroke="color-mix(in srgb, var(--c-accent) 70%, transparent)"
        stroke-width="1.8"
        stroke-dasharray="7 5"
      />
      <text
        x="590"
        y="353"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="15"
        fill="color-mix(in srgb, var(--c-accent) 90%, transparent)"
      >
        取物口
      </text>
      <!-- 爪走过的轨迹 -->
      <polyline
        v-if="trail"
        :points="trailPoints"
        fill="none"
        stroke="var(--c-velocity)"
        stroke-width="3"
        stroke-linecap="round"
        opacity="0.9"
      />
      <!-- 两个方向上的投影 -->
      <g v-if="showProjection" opacity="0.8">
        <line
          :x1="clawX"
          :y1="clawY"
          :x2="clawX"
          :y2="OY"
          stroke="color-mix(in srgb, var(--c-velocity) 50%, transparent)"
          stroke-width="1.6"
          stroke-dasharray="6 5"
        />
        <line
          :x1="clawX"
          :y1="clawY"
          :x2="OX"
          :y2="clawY"
          stroke="color-mix(in srgb, var(--c-velocity) 50%, transparent)"
          stroke-width="1.6"
          stroke-dasharray="6 5"
        />
        <circle :cx="clawX" :cy="OY" r="4.5" fill="var(--c-velocity)" />
        <circle :cx="OX" :cy="clawY" r="4.5" fill="var(--c-velocity)" />
      </g>
      <!-- 坐标轴 -->
      <g v-if="showProjection">
        <line
          :x1="OX"
          :y1="OY"
          :x2="OX + 170"
          :y2="OY"
          stroke="color-mix(in srgb, var(--c-neutral-300) 85%, transparent)"
          stroke-width="2"
        />
        <line
          :x1="OX"
          :y1="OY"
          :x2="OX"
          :y2="OY - 128"
          stroke="color-mix(in srgb, var(--c-neutral-300) 85%, transparent)"
          stroke-width="2"
        />
        <polygon
          :points="`${OX + 170},${OY} ${OX + 158},${OY - 5} ${OX + 158},${OY + 5}`"
          fill="color-mix(in srgb, var(--c-neutral-300) 85%, transparent)"
        />
        <polygon
          :points="`${OX},${OY - 128} ${OX - 5},${OY - 116} ${OX + 5},${OY - 116}`"
          fill="color-mix(in srgb, var(--c-neutral-300) 85%, transparent)"
        />
        <text
          :x="OX + 180"
          :y="OY + 8"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="22"
          fill="var(--c-neutral-300)"
        >
          x
        </text>
        <text
          :x="OX + 188"
          :y="OY + 30"
          font-family="KaTeX_Main"
          font-size="14"
          fill="color-mix(in srgb, var(--c-neutral-300) 75%, transparent)"
        >
          左右
        </text>
        <text
          :x="OX - 12"
          :y="OY - 138"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="22"
          fill="var(--c-neutral-300)"
        >
          y
        </text>
        <text
          :x="OX + 10"
          :y="OY - 118"
          font-family="KaTeX_Main"
          font-size="14"
          fill="color-mix(in srgb, var(--c-neutral-300) 75%, transparent)"
        >
          前后
        </text>
        <text
          :x="OX - 24"
          :y="OY + 22"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="var(--c-neutral-300)"
        >
          O
        </text>
      </g>
      <!-- 两个电机 -->
      <g v-if="showMotors">
        <rect
          :x="clawX - 46"
          :y="beamY - 46"
          width="92"
          height="24"
          rx="7"
          fill="color-mix(in srgb, var(--c-velocity) 20%, transparent)"
          stroke="var(--c-velocity)"
          stroke-width="1.6"
        />
        <text
          :x="clawX"
          :y="beamY - 29"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="13"
          fill="var(--c-velocity-light)"
        >
          1 号电机（x）
        </text>
        <rect
          :x="RAIL_LEFT + 6"
          :y="beamY - 12"
          width="92"
          height="24"
          rx="7"
          fill="color-mix(in srgb, var(--c-accent) 20%, transparent)"
          stroke="var(--c-accent)"
          stroke-width="1.6"
        />
        <text
          :x="RAIL_LEFT + 52"
          :y="beamY + 5"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="13"
          fill="var(--c-accent)"
        >
          2 号电机（y）
        </text>
      </g>
    </svg>
    <div v-if="readout" class="sim-readout">
      <span>{{ xMotorText }}</span>
      <span>{{ yMotorText }}</span>
    </div>
  </div>
</template>

<style scoped>
.sim {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.sim svg {
  display: block;
  width: 100%;
  height: auto;
}

.sim-readout {
  display: flex;
  gap: 1.4rem;
  justify-content: center;

  color: var(--c-text-dim);

  font-size: 0.8rem;
  white-space: nowrap;
}
</style>
