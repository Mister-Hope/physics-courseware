<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

/**
 * 电梯里的体重计（§4.6 第 5、6 页）
 *
 * 左侧：轿厢固定、两侧楼板上下滚动（楼板向下滚 = 电梯在上升），下方是秤的示数； 右侧：两个过程按钮（上升过程 / 下降过程）+ 页面通过默认插槽放进来的正文 （第 5
 * 页放"上升/下降各三个阶段"的花括号树，第 6 页放"示数与重力"的对应表）。
 *
 * 三个阶段之类的文字一律写在 slides.md 里，不集成进组件。 示数按真实运动学连续变化：加速度取平滑的正弦包络，a(t) 连续 ⇒ 加速段示数从 600 N 连续升到 720 N 再回到
 * 600 N，减速段对称地从 600 N 降到 480 N 再回到 600 N，不会跳变； 每段时长放慢到约 2 s，学生来得及看清示数的连续变化。
 */
const MASS = 60;
const GRAVITY = 10;
const BASE_READING = MASS * GRAVITY;
/** 加速度包络峰值（m/s²） */
const A_PEAK = 2;
/** 三段时长（s）：放慢，让学生看清示数的连续变化 */
const T_ACCEL = 2;
const T_CONST = 1.8;
const T_DECEL = 2;
const TOTAL = T_ACCEL + T_CONST + T_DECEL;
/** 速度峰值与各段位移（由 a(t) = A·sin(πt/T) 积分得到） */
const V_PEAK = (2 * A_PEAK * T_ACCEL) / Math.PI;
const S_ACCEL = (A_PEAK * T_ACCEL ** 2) / Math.PI;
const S_CONST = V_PEAK * T_CONST;
const S_TOTAL = 2 * S_ACCEL + S_CONST;
/** 楼板间距（px，按"一层楼"给）与一次过程里楼板相对滚动的总距离 */
const FLOOR_SPACING = 165;
const SCROLL = 3 * FLOOR_SPACING;
/** 楼板图案覆盖范围（首尾各多一块，保证循环接缝无缝） */
const FLOOR_INDEXES = [-1, 0, 1, 2];

const reading = ref(BASE_READING);
/** 楼板累计下移距离（px）：正值表示楼板向下滚、电梯在上升 */
const floorOffset = ref(0);
const playing = ref<"up" | "down" | null>(null);

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
};

const tick = (): void => {
  const direction = playing.value;

  if (!direction) return;

  const t = (performance.now() - startedAt) / 1000;

  if (t >= TOTAL) {
    reading.value = BASE_READING;
    floorOffset.value = direction === "up" ? SCROLL : 0;
    stopAnimation();
    return;
  }

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
  floorOffset.value = direction === "up" ? 0 : SCROLL;
  reading.value = BASE_READING;
  playing.value = direction;
  startedAt = performance.now();
  raf = requestAnimationFrame(tick);
};

/** 楼板图案的循环位移（对间距取模，接缝无缝） */
const floorShift = computed(
  () => ((floorOffset.value % FLOOR_SPACING) + FLOOR_SPACING) % FLOOR_SPACING,
);

onBeforeUnmount(stopAnimation);
</script>

<template>
  <div class="ew">
    <div class="ew-left">
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

        <!-- 轿厢（固定居中，近似正方形） -->
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

      <div class="ew-reading">
        <span class="ew-reading-label">秤的示数</span>
        <span class="ew-reading-value">{{ reading }}<span class="ew-unit">N</span></span>
      </div>
    </div>

    <div class="ew-right">
      <div class="ew-buttons">
        <button type="button" :class="{ 'ew-on': playing === 'up' }" @click="startProcess('up')">
          <mdi-arrow-up-bold class="ew-icon" />上升过程
        </button>
        <button
          type="button"
          :class="{ 'ew-on': playing === 'down' }"
          @click="startProcess('down')"
        >
          <mdi-arrow-down-bold class="ew-icon" />下降过程
        </button>
      </div>

      <div class="ew-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ew {
  display: flex;
  gap: 1.5rem;

  width: 100%;
  min-width: 0;
  height: 424px;
}

/* ── 左 1/3：电梯井 + 示数 ── */
.ew-left {
  display: flex;
  flex: 0 0 292px;
  flex-direction: column;
  gap: 0.6rem;

  min-width: 0;
}

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

  width: 44px;

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
  right: -30px;
  left: 0;
}

.ew-slab-r {
  right: 0;
  left: -30px;
}

/* ── 轿厢（固定居中、近似正方形） ── */
.ew-cabin {
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  width: 132px;
  height: 132px;
  padding: 0 8px 6px;
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

  width: 48px;
  height: 3px;
  border-radius: 2px;

  background: color-mix(in srgb, var(--c-accent) 55%, transparent);
  box-shadow: 0 0 12px color-mix(in srgb, var(--c-accent) 45%, transparent);

  transform: translateX(-50%);
}

.ew-person {
  width: 104px;
}

.ew-reading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  min-width: 0;
  padding: 0 0.15rem;
}

.ew-reading-label {
  color: var(--c-neutral-300);
  font-size: 0.95rem;
}

.ew-reading-value {
  color: var(--c-accent);

  font-weight: 700;
  font-size: 2.5rem;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.ew-unit {
  margin-left: 0.2rem;
  color: var(--c-text-dim);
  font-weight: 600;
  font-size: 1rem;
}

/* ── 右侧：过程按钮 + 正文 ── */
.ew-right {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 0.8rem;

  min-width: 0;
}

.ew-buttons {
  display: flex;
  gap: 0.7rem;
  min-width: 0;
}

button {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;

  padding: 0.5rem 1.1rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);
  color: var(--c-text);

  font: inherit;
  font-weight: 600;
  font-size: 0.98rem;
  white-space: nowrap;

  cursor: pointer;

  transition:
    border-color 0.16s ease,
    color 0.16s ease,
    background-color 0.16s ease;
}

button:hover {
  border-color: var(--c-border-glow);
  color: var(--c-accent);
}

.ew-icon {
  width: 1.05rem;
  height: 1.05rem;
}

.ew-on {
  border-color: var(--c-border-glow) !important;
  background: var(--c-accent-soft) !important;
  color: var(--c-accent) !important;
}

.ew-content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;

  min-width: 0;
  min-height: 0;
}
</style>
