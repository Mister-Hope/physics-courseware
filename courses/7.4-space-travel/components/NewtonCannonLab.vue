<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";

/**
 * 牛顿炮实验台（7.4 宇宙航行的核心动画）： 拖动滑块改变水平抛出速度（4～12 km/s，对应第一宇宙速度 7.9、第二宇宙速度 11.2）， 轨迹**用真实力学算出来**——取 GM =
 * 1、地球半径 R = 1（于是近地圆轨道速度 v = 1，对应 7.9 km/s）， 从地面 r = 1 处水平发射，RK4 积分 a = −GM·r̂/r²： v < 7.9 km/s
 * 落回地面 / v = 7.9 km/s 圆轨道 / 7.9 < v < 11.2 椭圆 / v ≥ 11.2 逃离地球。 点“发射”让炮弹沿算出的轨迹跑一趟（点一下动一次，不占用翻页的点击）。
 */
interface Pt {
  x: number;
  y: number;
}

interface Trail {
  points: Pt[];
  landed: boolean;
  outOfFrame: boolean;
  maxR: number;
}

interface State {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const VIEW = { width: 1000, height: 420 };
/** 地心在画布上的位置（画在偏下处，给轨迹留出上方空间） */
const C = { x: 500, y: 230 };
/** 1 个地球半径 = 75 用户单位 */
const SCALE = 75;
/** 第一宇宙速度 / 第二宇宙速度（km/s） */
const V1 = 7.9;
const V2 = 11.2;
/** 落到地面的判定半径（略小于 R，避免圆轨道因数值误差被判成落地） */
const GROUND = 0.995;
/** 轨迹画到 r > 4.6 R 就停（飞出画面） */
const R_MAX = 4.6;
/** 动画时长（ms） */
const DURATION = 4200;

const speed = ref(V1);
const playing = ref(false);
const progress = ref(0);

/**
 * 引力加速度 a = −GM·r̂/r²（取 GM = 1、地球半径 = 1）
 *
 * @param x 位置横坐标
 * @param y 位置纵坐标
 * @returns 加速度的两个分量
 */
const accAt = (x: number, y: number): [number, number] => {
  const r2 = x * x + y * y;
  const f = -1 / (r2 * Math.sqrt(r2));

  return [f * x, f * y];
};

/**
 * 四阶龙格–库塔推进一步
 *
 * @param s 当前状态（位置 + 速度）
 * @param dt 步长
 * @returns 下一步的状态
 */
const rk4Step = (s: State, dt: number): State => {
  const { x, y, vx, vy } = s;
  const [a1x, a1y] = accAt(x, y);
  const k2x = vx + (a1x * dt) / 2;
  const k2y = vy + (a1y * dt) / 2;
  const [a2x, a2y] = accAt(x + (vx * dt) / 2, y + (vy * dt) / 2);
  const k3x = vx + (a2x * dt) / 2;
  const k3y = vy + (a2y * dt) / 2;
  const [a3x, a3y] = accAt(x + (k2x * dt) / 2, y + (k2y * dt) / 2);
  const [a4x, a4y] = accAt(x + k3x * dt, y + k3y * dt);

  return {
    x: x + (dt / 6) * (vx + 2 * k2x + 2 * k3x + (vx + a3x * dt)),
    y: y + (dt / 6) * (vy + 2 * k2y + 2 * k3y + (vy + a3y * dt)),
    vx: vx + (dt / 6) * (a1x + 2 * a2x + 2 * a3x + a4x),
    vy: vy + (dt / 6) * (a1y + 2 * a2y + 2 * a3y + a4y),
  };
};

/**
 * 真实引力场里的轨迹（GM = 1、R = 1）：RK4 积分，落地或飞出画面为止
 *
 * @param u 无量纲发射速度（v / 7.9）
 * @returns 轨迹点列与终止原因
 */
const integrate = (u: number): Trail => {
  const dt = 0.006;
  // 椭圆轨道只积一个周期多一点（周期由比能量给出：a = −GM/(2ε)，T = 2πa^{3/2}）
  const eps = (u * u) / 2 - 1;
  const period = eps < 0 ? 2 * Math.PI * (-1 / (2 * eps)) ** 1.5 : Number.POSITIVE_INFINITY;
  const maxStep = Number.isFinite(period) ? Math.min(6000, Math.ceil((1.05 * period) / dt)) : 6000;
  let state: State = { x: 0, y: 1, vx: u, vy: 0 };
  let landed = false;
  let outOfFrame = false;
  let maxR = 1;
  const points: Pt[] = [{ x: 0, y: 1 }];

  for (let i = 0; i < maxStep; i += 1) {
    state = rk4Step(state, dt);
    const r = Math.hypot(state.x, state.y);
    maxR = Math.max(maxR, r);
    points.push({ x: state.x, y: state.y });

    if (i > 8 && r <= GROUND) {
      landed = true;
      break;
    }

    if (r > R_MAX) {
      outOfFrame = true;
      break;
    }
  }

  return { points, landed, outOfFrame, maxR };
};

const trail = computed((): Trail => integrate(speed.value / V1));

/** 比能量 ε = v²/2 − GM/R（GM = R = 1）：ε ≥ 0 就再也回不来了 */
const energy = computed((): number => {
  const u = speed.value / V1;

  return (u * u) / 2 - 1;
});

/** 轨道类型：逃离地球由比能量判定（r > 4.6 R 只是画不下了，不是逃逸） */
const regime = computed(() => {
  if (energy.value >= 0) return { key: "escape", label: "逃离地球", color: "#2dd4bf" };
  if (trail.value.landed) return { key: "land", label: "落回地面", color: "#f87171" };
  if (trail.value.maxR - 1 < 0.005) return { key: "circle", label: "圆轨道", color: "#60a5fa" };

  return { key: "ellipse", label: "椭圆轨道", color: "#e2a846" };
});

/** 远地点离地高度（椭圆轨道才有）：比能量 ε = v²/2 − GM/R，半长轴 a = −GM/(2ε)，远地点 = 2a − R */
const apogeeKm = computed(() => {
  if (energy.value >= 0) return null;

  const semiMajor = -1 / (2 * energy.value);
  const apogeeRadius = 2 * semiMajor - 1;

  return (apogeeRadius - 1) * 6400;
});

/** 远地点高度的 LaTeX 写法（km） */
const apogeeTex = computed(() => {
  const km = apogeeKm.value;

  if (!km || km <= 0) return null;

  const exponent = Math.floor(Math.log10(km));
  const mantissa = km / 10 ** exponent;

  return `${mantissa.toFixed(1)}\\times10^{${exponent}}\\ \\text{km}`;
});

/**
 * 物理坐标 → 画布坐标：整体外扩 3.5 用户单位，保证贴地轨迹不会被地球的球面盖住
 *
 * @param p 无量纲物理坐标（y 向上）
 * @returns 画布坐标（y 向下）
 */
const toCanvas = (p: Pt): Pt => {
  const r = Math.hypot(p.x, p.y) || 1;
  const scale = SCALE + 3.5 / r;

  return { x: C.x + p.x * scale, y: C.y - p.y * scale };
};

/** 轨迹 path（取样抽稀，视觉上看不出差别） */
const pathD = computed((): string =>
  trail.value.points
    .filter((_, index) => index % 3 === 0)
    .map((p, index) => {
      const c = toCanvas(p);

      return `${index === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`;
    })
    .join(" "),
);

/** 炮弹当前位置（沿算出的轨迹走） */
const ball = computed((): Pt => {
  const { points } = trail.value;
  const index = Math.min(points.length - 1, Math.round(progress.value * (points.length - 1)));

  return toCanvas(points[index] ?? { x: 0, y: 1 });
});

/** 发射点（地面上一点） */
const launchPoint = computed((): Pt => toCanvas({ x: 0, y: 1 }));

let frame = 0;
let startedAt = 0;

/** 停住动画 */
const stop = (): void => {
  if (frame !== 0) cancelAnimationFrame(frame);
  frame = 0;
  playing.value = false;
};

/**
 * 每帧推进一格（进度按真实时间走，与轨迹长短无关）
 *
 * @param now RAF 给的时间戳
 */
const tick = (now: number): void => {
  const ratio = Math.min(1, (now - startedAt) / DURATION);
  progress.value = ratio;

  if (ratio >= 1) {
    stop();

    return;
  }

  frame = requestAnimationFrame(tick);
};

/** 点一下动一次：炮弹沿当前轨迹跑一趟 */
const launch = (): void => {
  stop();
  progress.value = 0;
  playing.value = true;
  startedAt = performance.now();
  frame = requestAnimationFrame(tick);
};

/** 改了初速度就重算轨迹、炮弹回到发射点 */
watch(speed, () => {
  stop();
  progress.value = 0;
});

onUnmounted(stop);
</script>

<template>
  <div class="nc">
    <div class="nc-panel">
      <div class="nc-head">
        初速度 <Latex tex="v" /> = <b class="nc-num">{{ speed.toFixed(1) }}</b>
        <Latex tex="\text{km/s}" />
      </div>
      <input
        v-model.number="speed"
        class="nc-slider"
        type="range"
        min="4"
        max="12"
        step="0.1"
        :aria-label="`水平抛出速度 ${speed.toFixed(1)} 千米每秒`"
      />
      <div class="nc-chips">
        <button class="nc-chip" type="button" @click="speed = V1">7.9</button>
        <button class="nc-chip" type="button" @click="speed = V2">11.2</button>
        <button class="nc-chip wide" type="button" :disabled="playing" @click="launch">发射</button>
      </div>
      <div class="nc-regime" :style="{ color: regime.color }">{{ regime.label }}</div>
      <div v-if="regime.key === 'ellipse' && apogeeTex" class="nc-note">
        远地点离地约 <Latex :tex="apogeeTex" /><span v-if="trail.outOfFrame">（已超出画面）</span>
      </div>
      <div v-else-if="regime.key === 'circle'" class="nc-note">
        <Latex tex="v = 7.9\ \text{km/s}" />，近地圆轨道
      </div>
      <div v-else-if="regime.key === 'escape'" class="nc-note">
        <Latex tex="v \ge 11.2\ \text{km/s}" />，已挣脱地球引力
      </div>
    </div>
    <div class="nc-fig">
      <svg
        :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="水平抛出速度不同时的轨迹：落回地面、圆轨道、椭圆轨道与逃离地球"
      >
        <CelestialEarth :x="C.x" :y="C.y" :r="SCALE" />
        <path
          :d="pathD"
          fill="none"
          :stroke="regime.color"
          stroke-width="3"
          stroke-linecap="round"
        />
        <CourseArrow
          :from="{ x: launchPoint.x + 4, y: launchPoint.y }"
          :to="{ x: launchPoint.x + 58, y: launchPoint.y }"
          stroke="#60a5fa"
          :stroke-width="2.8"
          label="v"
        />
        <circle :cx="ball.x" :cy="ball.y" r="7" :fill="regime.color" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.nc {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  width: 100%;
}

.nc-panel {
  display: flex;
  flex: 0 0 22%;
  flex-direction: column;
  gap: 0.55rem;

  min-width: 0;
}

.nc-head {
  color: var(--c-text);
  font-size: 1rem;
}

.nc-num {
  color: var(--c-accent);
  font-size: 1.35rem;
}

.nc-slider {
  width: 100%;
  accent-color: var(--c-accent);
}

.nc-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.nc-chip {
  padding: 0.15rem 0.62rem;
  border: 1px solid rgb(226 168 70 / 45%);
  border-radius: 2rem;

  background: rgb(226 168 70 / 12%);
  color: #e2a846;

  font-size: 0.8rem;

  cursor: pointer;

  transition: all 0.25s ease;
}

.nc-chip.wide {
  border-color: rgb(96 165 250 / 45%);
  background: rgb(96 165 250 / 14%);
  color: #60a5fa;
}

.nc-chip:disabled {
  opacity: 0.5;
  cursor: default;
}

.nc-chip:hover:not(:disabled) {
  filter: brightness(1.2);
}

.nc-regime {
  font-weight: 700;
  font-size: 1.26rem;
}

.nc-note {
  color: var(--c-text-dim);
  font-size: 0.86rem;
  line-height: 1.5;
}

.nc-fig {
  flex: 1 1 auto;
  min-width: 0;
}

.nc-fig svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
