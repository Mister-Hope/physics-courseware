<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * 第 4 页：车厢中央的光源闪一下光——左图是车上观察者（车厢参考系），右图是地面观察者（地面参考系）。
 *
 * 动画用**真实相对论关系**算：取 c = 1、车厢固有长度 L = 1、β = v/c = 0.5（γ = 1.1547）。 车上：光向前后速率相同、光源在中央 ⇒ 两壁**同时**被照到（β
 * 无关，恒在 t = L/2c）。 地面：光对地速率仍是 c，但车厢在光传播的时间里向前走 ⇒ 后壁迎光、前壁追光， t后 = (L/2γ)/(c+v)、t前 = (L/2γ)/(c−v)，β =
 * 0.5 时 t后 : t前 = 1 : 3（先到后壁）。 两条时间线都从同一次闪光算起，动画按地面系的前壁到达时刻归一化。
 */

const BETA = 0.5;
const GAMMA = 1 / Math.sqrt(1 - BETA ** 2);
/** 前壁（追光）被照到的时刻——最晚的那个事件，动画到它结束 */
const T_FRONT = 1 / GAMMA / 2 / (1 - BETA);
/** 后壁（迎光）被照到的时刻 */
const T_REAR = 1 / GAMMA / 2 / (1 + BETA);
/** 像素 / 车厢固有长度（两幅图同一比例，地面系里车厢长度才看得出收缩） */
const SCALE = 230;
/** 车厢在车厢系里的长度（px）与中线高度 */
const CAR_LEN = SCALE;
const CAR_CENTER_A = 190;
const MID_Y = 74;
/** 地面系里闪光发出点的横坐标（此后不再移动） */
const EMIT_X = 120;
/** 地面线高度 */
const GROUND_Y = 120;

const p = ref(0);
let rafId = 0;
let startedAt = 0;
const DURATION = 2600;

/**
 * 推进动画：把真实经过的时间映射成 0→1 的播放进度
 *
 * @param now RequestAnimationFrame 给的时间戳（ms）
 */
const tick = (now: number): void => {
  if (!startedAt) startedAt = now;
  const k = Math.min(1, (now - startedAt) / DURATION);
  p.value = k;
  if (k < 1) rafId = requestAnimationFrame(tick);
};

/** 播放（进页面自动播一次，点一下重播） */
const play = (): void => {
  cancelAnimationFrame(rafId);
  startedAt = 0;
  p.value = 0;
  rafId = requestAnimationFrame(tick);
};

onMounted(play);
onBeforeUnmount(() => cancelAnimationFrame(rafId));

/** 当前时刻（以车厢固有长度 L = 1、光速 c = 1 为单位） */
const time = computed(() => p.value * T_FRONT);

/* ── 车厢参考系（左图） ── */
/** 车厢系里光已经走过的路程（px）：到达两壁的时刻是 L/2c，之后不再前进 */
const carFrameReach = computed(() => Math.min(time.value, 0.5) * SCALE);
const carFrameWallLeft = CAR_CENTER_A - CAR_LEN / 2;
const carFrameWallRight = CAR_CENTER_A + CAR_LEN / 2;
/** 是否已经同时到达前后壁 */
const carFrameHit = computed(() => time.value >= 0.5 - 1e-9);

/* ── 地面参考系（右图） ── */
/** 地面系里车厢中心的横坐标（随 v 右移） */
const carCenter = computed(() => EMIT_X + BETA * time.value * SCALE);
/** 地面系里车厢的半长（长度收缩后的半长） */
const halfCar = (1 / GAMMA / 2) * SCALE;
const rearWall = computed(() => carCenter.value - halfCar);
const frontWall = computed(() => carCenter.value + halfCar);
/** 光向后的波前 / 向前的波前（对地速率都是 c）；碰到壁就被吸收，射线不再前进 */
const lightBack = computed(() => Math.max(EMIT_X - time.value * SCALE, rearWall.value));
const lightFront = computed(() => Math.min(EMIT_X + time.value * SCALE, frontWall.value));
const hitRear = computed(() => time.value >= T_REAR - 1e-9);
const hitFront = computed(() => time.value >= T_FRONT - 1e-9);
</script>

<template>
  <div class="tf" @click="play">
    <div class="tf-grid">
      <div class="tf-cell">
        <div class="tf-cap">车厢参考系（车上观察者）</div>
        <svg
          class="tf-svg"
          viewBox="0 0 380 136"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="车厢参考系：闪光同时到达车厢前壁和后壁"
        >
          <rect
            :x="carFrameWallLeft"
            y="30"
            :width="CAR_LEN"
            height="88"
            rx="8"
            fill="rgba(59,130,246,0.10)"
            stroke="#60a5fa"
            stroke-width="2"
          />
          <line
            :x1="carFrameWallLeft"
            y1="26"
            :x2="carFrameWallLeft"
            y2="122"
            :stroke="carFrameHit ? '#e2a846' : '#94a3b8'"
            stroke-width="4"
          />
          <line
            :x1="carFrameWallRight"
            y1="26"
            :x2="carFrameWallRight"
            y2="122"
            :stroke="carFrameHit ? '#e2a846' : '#94a3b8'"
            stroke-width="4"
          />
          <text :x="carFrameWallLeft" y="18" fill="#94a3b8" font-size="15" text-anchor="middle">
            后壁
          </text>
          <text :x="carFrameWallRight" y="18" fill="#94a3b8" font-size="15" text-anchor="middle">
            前壁
          </text>
          <line
            :x1="CAR_CENTER_A - carFrameReach"
            :y1="MID_Y"
            :x2="CAR_CENTER_A + carFrameReach"
            :y2="MID_Y"
            stroke="#e2a846"
            stroke-width="2.4"
            opacity="0.85"
          />
          <circle
            :cx="CAR_CENTER_A - carFrameReach"
            :cy="MID_Y"
            r="4.4"
            fill="#e2a846"
            :opacity="carFrameHit ? 0 : 1"
          />
          <circle
            :cx="CAR_CENTER_A + carFrameReach"
            :cy="MID_Y"
            r="4.4"
            fill="#e2a846"
            :opacity="carFrameHit ? 0 : 1"
          />
          <circle :cx="CAR_CENTER_A" :cy="MID_Y" r="5" fill="#e2a846" />
        </svg>
      </div>

      <div class="tf-cell">
        <div class="tf-cap">地面参考系（车下观察者）</div>
        <svg
          class="tf-svg"
          viewBox="0 0 380 136"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="地面参考系：闪光先到达车厢后壁、后到达前壁"
        >
          <SurfaceHatch
            :from="{ x: 6, y: GROUND_Y }"
            :to="{ x: 374, y: GROUND_Y }"
            side="below"
            :thickness="11"
            :gap="22"
          />
          <CourseArrow
            :from="{ x: carCenter - 46, y: 18 }"
            :to="{ x: carCenter + 46, y: 18 }"
            stroke="#2dd4bf"
            stroke-width="2.4"
            label="v"
            :label-dy="-9"
          />
          <rect
            :x="rearWall"
            y="30"
            :width="halfCar * 2"
            height="88"
            rx="8"
            fill="rgba(59,130,246,0.10)"
            stroke="#60a5fa"
            stroke-width="2"
          />
          <line
            :x1="rearWall"
            y1="26"
            :x2="rearWall"
            y2="122"
            :stroke="hitRear ? '#e2a846' : '#94a3b8'"
            stroke-width="4"
          />
          <line
            :x1="frontWall"
            y1="26"
            :x2="frontWall"
            y2="122"
            :stroke="hitFront ? '#e2a846' : '#94a3b8'"
            stroke-width="4"
          />
          <text :x="rearWall + 8" y="48" fill="#94a3b8" font-size="15">后壁</text>
          <text :x="frontWall - 8" y="48" fill="#94a3b8" font-size="15" text-anchor="end">
            前壁
          </text>
          <line
            :x1="EMIT_X"
            :y1="MID_Y"
            :x2="lightBack"
            :y2="MID_Y"
            stroke="#e2a846"
            stroke-width="2.4"
            opacity="0.85"
          />
          <line
            :x1="EMIT_X"
            :y1="MID_Y"
            :x2="lightFront"
            :y2="MID_Y"
            stroke="#e2a846"
            stroke-width="2.4"
            opacity="0.85"
          />
          <circle :cx="EMIT_X" :cy="MID_Y" r="4" fill="none" stroke="#e2a846" stroke-width="2" />
          <circle :cx="lightBack" :cy="MID_Y" r="4.4" fill="#e2a846" :opacity="hitRear ? 0 : 1" />
          <circle :cx="lightFront" :cy="MID_Y" r="4.4" fill="#e2a846" :opacity="hitFront ? 0 : 1" />
        </svg>
      </div>
    </div>

    <button class="tf-btn" type="button" aria-label="重播闪光动画" @click.stop="play">
      <mdi-replay /> 重播
    </button>
  </div>
</template>

<style scoped>
.tf {
  display: flex;
  flex-direction: column;
  gap: 0.28rem;

  width: 100%;
  min-width: 0;

  cursor: pointer;
}

.tf-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.tf-cell {
  min-width: 0;
}

.tf-cap {
  margin-bottom: 0.05rem;

  color: var(--c-text-dim);

  font-size: 0.85rem;
  font-weight: 700;
  text-align: center;
}

.tf-svg {
  display: block;
  width: 100%;
  height: auto;
}

.tf-btn {
  align-self: center;

  display: flex;
  gap: 0.3rem;
  align-items: center;

  padding: 0.1rem 0.7rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  background: var(--c-surface);
  color: var(--c-text-dim);

  font-size: 0.78rem;
  font-family: inherit;

  cursor: pointer;
}
</style>
