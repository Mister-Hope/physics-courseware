<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * 第 5 页：时间延缓实验——两只完全一样的钟，一只静止（地面），一只随物体以 v 运动。
 *
 * 真实公式：γ = 1/√(1−(v/c)²)，Δt = γ·Δτ。运动钟的指针转速取地面钟的 1/γ， 于是任一时刻两只钟的读数之比都等于 γ：越接近光速，运动钟走得越慢（时间延缓越显著）。
 * 右侧的 γ 表按同一公式逐行算出，只把最接近当前 v/c 的那一行高亮。
 */

/** 当前 v/c */
const beta = ref(0.9);
/** γ = 1/√(1−(v/c)²) —— 全部读数由它算出 */
const gamma = computed(() => 1 / Math.sqrt(1 - beta.value ** 2));

/** γ 表用的取样点 */
const SAMPLES = [0.5, 0.9, 0.99, 0.999];
/** 最接近当前 v/c 的取样点（用于高亮） */
const nearest = computed(() =>
  SAMPLES.reduce(
    (best, cur) => (Math.abs(cur - beta.value) < Math.abs(best - beta.value) ? cur : best),
    SAMPLES[0],
  ),
);
const rows = computed(() =>
  SAMPLES.map((sample) => ({
    beta: sample,
    gamma: 1 / Math.sqrt(1 - sample ** 2),
    active: sample === nearest.value,
  })),
);

/* ── 两钟对走：地面钟 4 s 转一圈，运动钟 4γ s 转一圈 ── */
const PERIOD = 4;
const elapsed = ref(0);
let rafId = 0;
let last = 0;

/**
 * 累计真实经过的时间（s），让两只钟的指针各自按自己的速率走
 *
 * @param now RequestAnimationFrame 给的时间戳（ms）
 */
const tick = (now: number): void => {
  if (!last) last = now;
  elapsed.value += (now - last) / 1000;
  last = now;
  rafId = requestAnimationFrame(tick);
};

onMounted(() => {
  rafId = requestAnimationFrame(tick);
});
onBeforeUnmount(() => cancelAnimationFrame(rafId));

/**
 * 指针端点：转一周用 period 秒，从 12 点方向顺时针
 *
 * @param period 转一周所需的时间（s）——地面钟取 PERIOD，运动钟取 PERIOD × γ
 * @returns 指针末端在钟面 viewBox 里的坐标
 */
const handAt = (period: number): { x: number; y: number } => {
  const angle = ((-90 + 360 * ((elapsed.value / period) % 1)) * Math.PI) / 180;

  return { x: 55 + 33 * Math.cos(angle), y: 55 + 33 * Math.sin(angle) };
};
const groundHand = computed(() => handAt(PERIOD));
const movingHand = computed(() => handAt(PERIOD * gamma.value));

/** 地面钟读数（s）与运动钟读数（s） */
const groundReading = computed(() => elapsed.value);
const movingReading = computed(() => elapsed.value / gamma.value);

/** 钟面刻度的角度（12 个） */
const TICKS = Array.from({ length: 12 }, (_, index) => index * 30);
</script>

<template>
  <div class="td">
    <div class="td-grid">
      <div class="td-clocks">
        <div class="td-clock">
          <div class="td-cap">地面上的钟</div>
          <svg
            class="td-face"
            viewBox="0 0 110 110"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              cx="55"
              cy="55"
              r="48"
              fill="rgba(148,163,184,0.06)"
              stroke="#94a3b8"
              stroke-width="2"
            />
            <line
              v-for="item in TICKS"
              :key="item"
              :x1="55 + 44 * Math.cos(((item - 90) * Math.PI) / 180)"
              :y1="55 + 44 * Math.sin(((item - 90) * Math.PI) / 180)"
              :x2="55 + 38 * Math.cos(((item - 90) * Math.PI) / 180)"
              :y2="55 + 38 * Math.sin(((item - 90) * Math.PI) / 180)"
              stroke="#94a3b8"
              stroke-width="1.6"
              opacity="0.7"
            />
            <line
              :x1="55"
              :y1="55"
              :x2="groundHand.x"
              :y2="groundHand.y"
              stroke="#e2a846"
              stroke-width="3"
              stroke-linecap="round"
            />
            <circle cx="55" cy="55" r="4" fill="#e2a846" />
          </svg>
          <div class="td-read">
            <Latex :tex="`\\Delta t = ${groundReading.toFixed(1)}\\ \\text{s}`" />
          </div>
        </div>

        <div class="td-clock">
          <div class="td-cap">运动的钟</div>
          <svg
            class="td-face"
            viewBox="0 0 110 110"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              cx="55"
              cy="55"
              r="48"
              fill="rgba(148,163,184,0.06)"
              stroke="#94a3b8"
              stroke-width="2"
            />
            <line
              v-for="item in TICKS"
              :key="item"
              :x1="55 + 44 * Math.cos(((item - 90) * Math.PI) / 180)"
              :y1="55 + 44 * Math.sin(((item - 90) * Math.PI) / 180)"
              :x2="55 + 38 * Math.cos(((item - 90) * Math.PI) / 180)"
              :y2="55 + 38 * Math.sin(((item - 90) * Math.PI) / 180)"
              stroke="#94a3b8"
              stroke-width="1.6"
              opacity="0.7"
            />
            <line
              :x1="55"
              :y1="55"
              :x2="movingHand.x"
              :y2="movingHand.y"
              stroke="#60a5fa"
              stroke-width="3"
              stroke-linecap="round"
            />
            <circle cx="55" cy="55" r="4" fill="#60a5fa" />
          </svg>
          <div class="td-read td-read-2">
            <Latex :tex="`\\Delta\\tau = ${movingReading.toFixed(1)}\\ \\text{s}`" />
          </div>
        </div>
      </div>

      <div class="td-side">
        <div class="td-slider">
          <CourseSlider
            v-model="beta"
            layout="bare"
            :min="0.1"
            :max="0.999"
            :step="0.001"
            aria-label="速度与光速的比值"
          />
          <div class="td-now">
            <Latex :tex="`v = ${beta.toFixed(3)}c`" />
            <span class="td-sep">→</span>
            <span class="td-gamma"><Latex :tex="`\\gamma = ${gamma.toFixed(3)}`" /></span>
          </div>
        </div>

        <div class="td-rows">
          <div
            v-for="row in rows"
            :key="row.beta"
            class="td-row"
            :class="{ 'is-active': row.active }"
          >
            <Latex :tex="`v = ${row.beta}c`" />
            <Latex :tex="`\\gamma = ${row.gamma.toFixed(row.gamma < 2 ? 3 : 2)}`" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.td {
  width: 100%;
  min-width: 0;
}

.td-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: 1.6rem;
  align-items: center;
}

.td-clocks {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  min-width: 0;
}

.td-clock {
  min-width: 0;
  text-align: center;
}

.td-cap {
  margin-bottom: 0.15rem;

  color: var(--c-text-dim);

  font-weight: 700;
  font-size: 0.82rem;
  line-height: 1.3;
}

.td-face {
  display: block;

  width: 100%;
  max-width: 4.9rem;
  height: auto;
  margin: 0 auto;
}

.td-read {
  color: var(--c-accent);
  font-size: 0.9rem;
}

.td-read-2 {
  color: var(--c-accent-2);
}

.td-side {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.td-now {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.4rem;
  align-items: baseline;
  justify-content: center;

  color: var(--c-text);

  font-size: 0.95rem;
  white-space: nowrap;
}

.td-sep {
  color: var(--c-text-dim);
}

.td-gamma {
  color: var(--c-accent);
}

.td-rows {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.td-row {
  display: flex;
  justify-content: space-between;

  padding: 0.02rem 0.5rem;
  border-radius: 0.4rem;

  color: var(--c-text-dim);

  font-size: 0.8rem;
}

.td-row.is-active {
  background: rgb(226 168 70 / 12%);
  color: var(--c-text);
}
</style>
