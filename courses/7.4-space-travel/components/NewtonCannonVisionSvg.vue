<script setup lang="ts">
import { computed } from "vue";

/**
 * 牛顿的高山抛体设想（教材 7.4 开篇）：从高山上水平抛出物体，速度一次比一次大，落地点一次比一次远； 速度足够大时就不再落回地面，成为人造地球卫星。
 *
 * 三条抛物线都是**真实力学算出来的**，不是手画示意：取 GM = 1、地球半径 = 1， 积分 a = −GM·r̂ / r²（四阶龙格–库塔），地面（r ≤ R）为终止条件；7.9 km/s 对应 R 处圆轨道速度 v = 1。 发射点取 r₀ = 1.12
 * R（夸张的“高山”——照真实比例画，近地圆轨道会贴着地面看不清）。
 */
interface Pt {
  x: number;
  y: number;
}

interface Shot {
  speed: number;
  color: string;
  sub: string;
}

interface ShotView {
  speed: number;
  color: string;
  sub: string;
  d: string;
  markX: number;
  markY: number;
}

interface State {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const VIEW = { width: 420, height: 360 };
/** 地心在画布上的位置 */
const C = { x: 210, y: 225 };
/** 1 个地球半径 = 96 用户单位 */
const SCALE = 96;
/** 发射点到地心的距离（地球半径为单位） */
const R0 = 1.12;
/** 第一宇宙速度（km/s）：7.9 km/s 对应 R 处的圆轨道速度，用来把 km/s 换算成无量纲速度 */
const V1 = 7.9;

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
 * 真实引力场里的轨迹（GM = 1、地球半径 = 1）：RK4 积分到落地为止
 *
 * @param speed 发射速度（km/s）
 * @param maxStep 最多积多少步
 * @returns 轨迹点列（无量纲坐标，y 向上）
 */
const integrate = (speed: number, maxStep: number): Pt[] => {
  const dt = 0.002;
  let state: State = { x: 0, y: R0, vx: speed / V1, vy: 0 };
  const points: Pt[] = [{ x: state.x, y: state.y }];

  for (let i = 0; i < maxStep; i += 1) {
    state = rk4Step(state, dt);
    points.push({ x: state.x, y: state.y });

    // 落回地面就停机（前几步还在发射点上，不判）
    if (i > 4 && Math.hypot(state.x, state.y) <= 1) break;
  }

  return points;
};

/**
 * 物理坐标 → 画布坐标
 *
 * @param p 无量纲物理坐标（y 向上）
 * @returns 画布坐标（y 向下）
 */
const toCanvas = (p: Pt): Pt => ({ x: C.x + p.x * SCALE, y: C.y - p.y * SCALE });

/** 三次抛射：速度一次比一次大，落地点一次比一次远 */
const SHOTS: Shot[] = [
  { speed: 5, color: "#f87171", sub: "1" },
  { speed: 6.3, color: "#e2a846", sub: "2" },
  { speed: 7.1, color: "#2dd4bf", sub: "3" },
];

const shots = computed((): ShotView[] =>
  SHOTS.map((shot): ShotView => {
    // 抽样一半的点，path 短一半而肉眼看不出差别
    const raw = integrate(shot.speed, 3000);
    const d = raw
      .filter((_, index) => index % 2 === 0)
      .map((p, index) => {
        const c = toCanvas(p);

        return `${index === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`;
      })
      .join(" ");
    // 速度标号挂在轨迹的 62% 处（三条轨迹起点相同，标号错开才认得出谁是谁）
    const mark = toCanvas(raw[Math.floor(raw.length * 0.62)] ?? { x: 0, y: R0 });

    return {
      speed: shot.speed,
      color: shot.color,
      sub: shot.sub,
      d,
      markX: mark.x + 8,
      markY: mark.y - 8,
    };
  }),
);

/** 抛射点（山顶）与山体 */
const PEAK = { x: C.x, y: C.y - SCALE * R0 };
const HILL_HALF = 26;
const hillBaseY = C.y - SCALE * Math.sqrt(1 - (HILL_HALF / SCALE) ** 2);
const HILL = `M ${C.x - HILL_HALF} ${hillBaseY.toFixed(1)} L ${PEAK.x} ${PEAK.y.toFixed(1)} L ${C.x + HILL_HALF} ${hillBaseY.toFixed(1)} Z`;

/** 速度足够大时不再落回地面：r₀ 处的圆轨道（半径就是 r₀） */
const ORBIT_R = SCALE * R0;
</script>

<template>
  <svg
    :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="从高山上水平抛出物体：速度越大落地点越远，速度足够大就不再落回地面"
  >
    <CelestialEarth :x="C.x" :y="C.y" :r="SCALE" label="地球" :label-size="17" />
    <path :d="HILL" fill="rgba(148,163,184,0.35)" stroke="#94a3b8" stroke-width="1.6" />
    <circle :cx="C.x" :cy="C.y" :r="ORBIT_R" fill="none" stroke="#60a5fa" stroke-width="2.4" />
    <path v-for="shot in shots" :key="shot.sub" :d="shot.d" fill="none" :stroke="shot.color" stroke-width="2.4" stroke-linecap="round" />
    <text
      v-for="shot in shots"
      :key="`label-${shot.sub}`"
      :x="shot.markX"
      :y="shot.markY"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="18"
      :fill="shot.color"
    >
      v
      <tspan font-family="KaTeX_Main" font-size="12" dy="4">{{ shot.sub }}</tspan>
    </text>
    <circle :cx="PEAK.x" :cy="PEAK.y" r="4.5" fill="#e2a846" />
    <text x="126" y="152" text-anchor="end" font-size="16" fill="#60a5fa">不再落回地面</text>
    <text :x="C.x - HILL_HALF - 8" :y="hillBaseY + 6" text-anchor="end" font-size="15" fill="#94a3b8">高山</text>
  </svg>
</template>
