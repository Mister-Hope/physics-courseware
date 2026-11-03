<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, onBeforeUnmount, ref, watch } from "vue";

/**
 * 电梯里的体重计（§4.6 第 5 页）
 *
 * 轿厢固定在画面中央，用**两侧楼板上下滚动**表现相对运动：楼板向下滚 = 电梯在上升。 一次完整过程由**翻页单击**驱动：第 1 击播上升过程，第 2 击播下降过程；画面里只给 "电梯怎么动 +
 * 秤的示数"，加速 / 匀速 / 减速三个阶段由学生自己从楼板运动的快慢看出来。
 *
 * 示数按真实运动学连续变化：加速度取平滑的正弦包络，a(t) 连续 ⇒ 加速段示数从 600 N 连续地 升到 720 N 再回到 600 N，减速段对称地从 600 N 降到 480 N 再回到
 * 600 N，不会跳变。
 */
const MASS = 60;
const GRAVITY = 10;
const BASE_READING = MASS * GRAVITY;
/** 加速度包络峰值（m/s²） */
const A_PEAK = 2;
/** 三段时长（s） */
const T_ACCEL = 1.1;
const T_CONST = 1;
const T_DECEL = 1.1;
const TOTAL = T_ACCEL + T_CONST + T_DECEL;
/** 速度峰值与各段位移（由 a(t) = A·sin(πt/T) 积分得到） */
const V_PEAK = (2 * A_PEAK * T_ACCEL) / Math.PI;
const S_ACCEL = (A_PEAK * T_ACCEL ** 2) / Math.PI;
const S_CONST = V_PEAK * T_CONST;
const S_TOTAL = 2 * S_ACCEL + S_CONST;
/** 楼板间距（px，按"一层楼"给）与一次过程里楼板相对滚动的总距离 */
const FLOOR_SPACING = 175;
const SCROLL = 2 * FLOOR_SPACING;
/** 楼板图案覆盖范围（首尾各多一块，保证循环接缝无缝） */
const FLOOR_INDEXES = [-1, 0, 1, 2];

/** 翻页步数：0 = 静止；1 = 上升过程；2 = 下降过程 */
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value, 2)));

const reading = ref(BASE_READING);
/** 楼板累计下移距离（px）：正值表示楼板向下滚、电梯在上升 */
const floorOffset = ref(0);
const playing = ref<"up" | "down" | null>(null);
/** 已亮出的阶段数（0~3）：上升、下降各自跟随动画逐段亮出 */
const upShown = ref(0);
const downShown = ref(0);
/** 当前阶段（0 加速 / 1 匀速 / 2 减速 / -1 无） */
const activePhase = ref(-1);

let raf = 0;
let startedAt = 0;

/**
 * 平滑加速度包络（取竖直向上为正，上升过程用）
 *
 * @param t 过程开始后的时刻（s）
 * @returns 该时刻的加速度分量（m/s²）
 */
const accelAt = (t: number): number => {
  if (t < T_ACCEL) return A_PEAK * Math.sin((Math.PI * t) / T_ACCEL);
  if (t < T_ACCEL + T_CONST) return 0;

  const tail = t - T_ACCEL - T_CONST;

  return -A_PEAK * Math.sin((Math.PI * tail) / T_DECEL);
};

/**
 * 已走位移（m）
 *
 * @param t 过程开始后的时刻（s）
 * @returns 累计位移（m）
 */
const displacementAt = (t: number): number => {
  if (t < T_ACCEL) {
    return (
      (A_PEAK * T_ACCEL * (t - (T_ACCEL / Math.PI) * Math.sin((Math.PI * t) / T_ACCEL))) / Math.PI
    );
  }

  if (t < T_ACCEL + T_CONST) return S_ACCEL + V_PEAK * (t - T_ACCEL);

  const tail = t - T_ACCEL - T_CONST;

  return (
    S_ACCEL +
    S_CONST +
    V_PEAK * tail -
    (A_PEAK * T_DECEL * (tail - (T_DECEL / Math.PI) * Math.sin((Math.PI * tail) / T_DECEL))) /
      Math.PI
  );
};

const stopAnimation = (): void => {
  cancelAnimationFrame(raf);
  raf = 0;
  playing.value = null;
  activePhase.value = -1;
};

const reset = (): void => {
  stopAnimation();
  reading.value = BASE_READING;
  floorOffset.value = 0;
  upShown.value = 0;
  downShown.value = 0;
  activePhase.value = -1;
};

const tick = (): void => {
  const direction = playing.value;

  if (!direction) return;

  const t = (performance.now() - startedAt) / 1000;

  if (t >= TOTAL) {
    reading.value = BASE_READING;
    floorOffset.value = direction === "up" ? SCROLL : 0;
    if (direction === "up") upShown.value = 3;
    else downShown.value = 3;
    stopAnimation();
    return;
  }

  const phase = t < T_ACCEL ? 0 : t < T_ACCEL + T_CONST ? 1 : 2;
  activePhase.value = phase;
  if (direction === "up") upShown.value = Math.max(upShown.value, phase + 1);
  else downShown.value = Math.max(downShown.value, phase + 1);

  const accel = direction === "up" ? accelAt(t) : -accelAt(t);
  reading.value = Math.round(MASS * (GRAVITY + accel));
  const progress = displacementAt(t) / S_TOTAL;
  floorOffset.value = direction === "up" ? progress * SCROLL : SCROLL - progress * SCROLL;
  raf = requestAnimationFrame(tick);
};

/**
 * 播放一次完整过程
 *
 * @param direction 上升 / 下降
 */
const startProcess = (direction: "up" | "down"): void => {
  stopAnimation();
  playing.value = direction;
  startedAt = performance.now();
  raf = requestAnimationFrame(tick);
};

/** 楼板图案的循环位移（对间距取模，接缝无缝） */
const floorShift = computed(
  () => ((floorOffset.value % FLOOR_SPACING) + FLOOR_SPACING) % FLOOR_SPACING,
);

watch(
  step,
  (value, previous) => {
    if (value === 0) {
      reset();
      return;
    }

    if (value === 1) {
      reset();
      if (previous > value) {
        // 往回翻页：直接停在"上升完成"的静态结果上，不重播动画
        floorOffset.value = SCROLL;
        upShown.value = 3;
        return;
      }
      startProcess("up");
      return;
    }

    // value === 2：先把上升过程补完，再播下降过程
    if (floorOffset.value !== SCROLL) {
      stopAnimation();
      floorOffset.value = SCROLL;
      reading.value = BASE_READING;
    }
    startProcess("down");
  },
  { immediate: true },
);

onBeforeUnmount(stopAnimation);
</script>

<template>
  <div class="ew">
    <div class="ew-stage">
      <!-- 楼板：随电梯运动上下滚动（轿厢固定，楼板向下滚 = 电梯上升） -->
      <div class="ew-wall ew-wall-l">
        <div class="ew-floors" :style="{ transform: `translateY(${floorShift}px)` }">
          <div
            v-for="index in FLOOR_INDEXES"
            :key="`l-${index}`"
            class="ew-slab ew-slab-l"
            :style="{ top: `${index * FLOOR_SPACING}px` }"
          />
        </div>
      </div>
      <div class="ew-wall ew-wall-r">
        <div class="ew-floors" :style="{ transform: `translateY(${floorShift}px)` }">
          <div
            v-for="index in FLOOR_INDEXES"
            :key="`r-${index}`"
            class="ew-slab ew-slab-r"
            :style="{ top: `${index * FLOOR_SPACING}px` }"
          />
        </div>
      </div>

      <!-- 轿厢：固定居中；尺寸按"一层楼"的比例画 -->
      <div class="ew-cabin">
        <div class="ew-light" />
        <div class="ew-person">
          <PersonWeightSvg
            :fn-ratio="reading / BASE_READING"
            :needle-ratio="reading / BASE_READING"
            :show-forces="false"
          />
        </div>
      </div>
    </div>

    <div class="ew-panel">
      <div class="ew-read-label">秤的示数</div>
      <div class="ew-read-value">{{ reading }}<span class="ew-unit">N</span></div>

      <div class="ew-stages">
        <div class="ew-stage-row" :class="{ 'ew-hidden': step < 1 }">
          <span
            class="ew-phase"
            :class="{
              'ew-hidden': upShown < 1,
              'ew-active': playing === 'up' && activePhase === 0,
            }"
            >加速上升</span
          >
          <span
            class="ew-phase"
            :class="{
              'ew-hidden': upShown < 2,
              'ew-active': playing === 'up' && activePhase === 1,
            }"
            >匀速上升</span
          >
          <span
            class="ew-phase"
            :class="{
              'ew-hidden': upShown < 3,
              'ew-active': playing === 'up' && activePhase === 2,
            }"
            >减速上升</span
          >
        </div>
        <div class="ew-stage-row" :class="{ 'ew-hidden': step < 2 }">
          <span
            class="ew-phase"
            :class="{
              'ew-hidden': downShown < 1,
              'ew-active': playing === 'down' && activePhase === 0,
            }"
            >加速下降</span
          >
          <span
            class="ew-phase"
            :class="{
              'ew-hidden': downShown < 2,
              'ew-active': playing === 'down' && activePhase === 1,
            }"
            >匀速下降</span
          >
          <span
            class="ew-phase"
            :class="{
              'ew-hidden': downShown < 3,
              'ew-active': playing === 'down' && activePhase === 2,
            }"
            >减速下降</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ew {
  display: flex;
  gap: 1.2rem;

  width: 100%;
  min-width: 0;
  height: 425px;
}

/* ── 电梯井：两侧楼板上下滚动 ── */
.ew-stage {
  position: relative;

  flex: 1 1 auto;

  overflow: hidden;

  min-width: 0;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: linear-gradient(180deg, #0a1020 0%, #101a2e 100%);
}

.ew-wall {
  position: absolute;
  top: 0;
  bottom: 0;

  width: 62px;

  background: color-mix(in srgb, var(--c-surface-solid) 55%, transparent);
}

.ew-wall-l {
  left: 0;
  border-right: 1px solid var(--c-border);
}

.ew-wall-r {
  right: 0;
  border-left: 1px solid var(--c-border);
}

.ew-floors {
  position: absolute;
  inset: 0;
}

.ew-slab {
  position: absolute;

  height: 12px;
  border-radius: 2px;

  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--c-neutral-300) 66%, transparent) 0%,
    color-mix(in srgb, var(--c-neutral-500) 55%, transparent) 100%
  );
  box-shadow: 0 1px 0 rgb(0 0 0 / 45%);
}

.ew-slab-l {
  right: -42px;
  left: 0;
}

.ew-slab-r {
  right: 0;
  left: -42px;
}

/* ── 轿厢（固定居中） ── */
.ew-cabin {
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  width: 170px;
  height: 136px;
  padding: 0 10px 5px;
  border: 1.5px solid color-mix(in srgb, var(--c-neutral-300) 52%, transparent);
  border-radius: 8px 8px 3px 3px;

  background: color-mix(in srgb, var(--c-surface-solid) 82%, transparent);
  box-shadow: 0 10px 24px rgb(0 0 0 / 35%);

  transform: translate(-50%, -50%);
}

.ew-light {
  position: absolute;
  top: 6px;
  left: 50%;

  width: 58px;
  height: 3px;
  border-radius: 2px;

  background: color-mix(in srgb, var(--c-accent) 55%, transparent);
  box-shadow: 0 0 12px color-mix(in srgb, var(--c-accent) 45%, transparent);

  transform: translateX(-50%);
}

.ew-person {
  width: 104px;
}

/* ── 右栏：秤的示数 ── */
.ew-panel {
  display: flex;
  flex: 0 0 292px;
  flex-direction: column;
  gap: 0.55rem;
  justify-content: center;

  min-width: 0;
  padding: 0.2rem 0.3rem;
}

.ew-read-label {
  color: var(--c-neutral-300);
  font-size: 1.02rem;
}

.ew-read-value {
  color: var(--c-accent);

  font-weight: 700;
  font-size: 3.6rem;
  font-variant-numeric: tabular-nums;
  line-height: 1.05;
}

.ew-unit {
  margin-left: 0.28rem;
  color: var(--c-text-dim);
  font-weight: 600;
  font-size: 1.25rem;
}

/* 上升 / 下降各三个阶段：随动画逐段亮出 */
.ew-stages {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  min-height: 4.6rem;
  margin-top: 0.35rem;
}

.ew-stage-row {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  min-width: 0;
}

.ew-phase {
  padding: 0.12rem 0.52rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);

  background: var(--c-surface);
  color: var(--c-text);

  font-size: 0.82rem;
  white-space: nowrap;
}

.ew-active {
  border-color: var(--c-border-glow) !important;
  background: var(--c-accent-soft) !important;
  color: var(--c-accent) !important;
  font-weight: 700;
}

.ew-hidden {
  visibility: hidden;
}
</style>
