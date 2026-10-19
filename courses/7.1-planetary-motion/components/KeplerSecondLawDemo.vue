<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * 第 5 页：开普勒第二定律的动画演示。 行星严格按开普勒方程运动：平近点角 M = 2πt/T，由 M = E − e·sinE 用牛顿迭代解出偏近点角 E， 再取行星位置（太阳为原点）：x =
 * a·cosE − c，y = b·sinE；到太阳的距离 r = a(1 − e·cosE)。 把一周期等分成 8 段相等的时间，每段扫过的扇形面积严格相等（面积 =
 * ab·ΔM/2）——图上直观看到 近日点附近扇形“又宽又短”、远日点附近“又窄又长”。行星的切向速度箭头长度按活力公式 v ∝ √(2/r − 1/a) 给出。
 */
/** 椭圆半长轴、离心率（夸张一些，近日点与远日点的快慢差别才看得出来） */
const A = 118;
const ECC = 0.5;
const B = A * Math.sqrt(1 - ECC * ECC);
/** 焦点到中心的距离 c = ae，太阳画在右侧焦点上 */
const FC = A * ECC;
const C = { x: 228, y: 152 };
const SUN = { x: C.x + FC, y: C.y };
/** 近日点（右）、远日点（左） */
const PERI = { x: C.x + A, y: C.y };
const APHE = { x: C.x - A, y: C.y };
/** 一个周期分成 8 段相等时间 */
const SLICES = 8;
/** 一个周期绕完用几秒 */
const PERIOD_S = 7.5;
/** 速度箭头比例：箭头长 = SCALE × √(2/r − 1/a)（万有引力常量取 1 的量纲归一） */
const SPEED_SCALE = 260;

/**
 * 解开普勒方程 M = E − e·sinE（牛顿迭代）
 *
 * @param M 平近点角（弧度）
 * @returns 偏近点角 E（弧度）
 */
const solveE = (M: number): number => {
  let E = M + ECC * Math.sin(M);

  for (let i = 0; i < 6; i += 1) E -= (E - ECC * Math.sin(E) - M) / (1 - ECC * Math.cos(E));

  return E;
};
/**
 * 太阳为原点的轨道点
 *
 * @param M 平近点角（弧度）
 * @returns 该时刻行星的画布坐标
 */
const pointAtM = (M: number): { x: number; y: number } => {
  const E = solveE(M);
  return { x: SUN.x + (A * Math.cos(E) - FC), y: SUN.y + B * Math.sin(E) };
};
/**
 * 归一化后的切向（速度）方向
 *
 * @param M 平近点角（弧度）
 * @returns 该时刻速度方向的单位向量
 */
const tangentAtM = (M: number): { x: number; y: number } => {
  const E = solveE(M);
  const dx = -A * Math.sin(E);
  const dy = B * Math.cos(E);
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
};
/**
 * 到太阳的距离 r = a(1 − e·cosE)
 *
 * @param M 平近点角（弧度）
 * @returns 行星到太阳的距离
 */
const distanceAtM = (M: number): number => A * (1 - ECC * Math.cos(solveE(M)));

/** 进度 t：0 → 1 正好一个周期 */
const progress = ref(0);
let raf = 0;
let previous = 0;
/** 绕完一圈后停住看整幅“等面积扇形”，再重来 */
let holdUntil = 0;

/**
 * 每帧推进动画进度（绕完一个周期后停住一会儿，再从头演示）
 *
 * @param now RequestAnimationFrame 给出的时间戳（毫秒）
 */
const tick = (now: number): void => {
  const dt = previous === 0 ? 0 : (now - previous) / 1000;

  previous = now;

  if (holdUntil === 0) {
    progress.value += dt / PERIOD_S;

    if (progress.value >= 1) {
      progress.value = 1;
      holdUntil = now + 1800;
    }
  } else if (now >= holdUntil) {
    progress.value = 0;
    holdUntil = 0;
  }

  raf = requestAnimationFrame(tick);
};

onMounted(() => {
  raf = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
});

/** 点一下从头再演示一次 */
const restart = (): void => {
  progress.value = 0;
  holdUntil = 0;
};

/** 当前时刻的平近点角、位置、速度方向与速度大小 */
const meanAnomaly = computed(() => 2 * Math.PI * progress.value);
const planet = computed(() => pointAtM(meanAnomaly.value));
const velocityDirection = computed(() => tangentAtM(meanAnomaly.value));
const speed = computed(() => Math.sqrt(Math.max(0, 2 / distanceAtM(meanAnomaly.value) - 1 / A)));
const arrowTo = computed(() => ({
  x: planet.value.x + velocityDirection.value.x * speed.value * SPEED_SCALE,
  y: planet.value.y + velocityDirection.value.y * speed.value * SPEED_SCALE,
}));

/** 已扫过的扇形（等时间 ⇒ 等面积）：每段扇形从太阳出发，沿该段时间内的轨道点围成 */
const sectors = computed(() => {
  const swept = progress.value * SLICES;
  const done: { points: string; index: number }[] = [];

  for (let i = 0; i < SLICES; i += 1) {
    const fraction = Math.min(1, Math.max(0, swept - i));

    if (fraction <= 0) break;

    const steps = Math.max(2, Math.round(14 * fraction));
    const samples: string[] = [];

    for (let j = 0; j <= steps; j += 1) {
      const point = pointAtM((2 * Math.PI * (i + (fraction * j) / steps)) / SLICES);

      samples.push(`${point.x.toFixed(1)},${point.y.toFixed(1)}`);
    }

    done.push({ points: `${SUN.x},${SUN.y} ${samples.join(" ")}`, index: i });
  }

  return done;
});

const aria =
  "行星沿椭圆轨道运行，太阳在一个焦点上；相等时间内扫过的扇形面积相等，近日点附近速度快，远日点附近速度慢。";
</script>

<template>
  <svg
    viewBox="0 0 480 300"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="aria"
    class="ks-svg"
    @click="restart"
  >
    <polygon
      v-for="sector in sectors"
      :key="sector.index"
      :points="sector.points"
      :fill="sector.index % 2 === 0 ? 'rgba(226,168,70,0.20)' : 'rgba(96,165,250,0.20)'"
    />
    <ellipse
      :cx="C.x"
      :cy="C.y"
      :rx="A"
      :ry="B"
      fill="none"
      stroke="#e2a846"
      stroke-width="1.8"
      opacity="0.6"
    />
    <CourseArrow :from="planet" :to="arrowTo" stroke="#7dd3fc" stroke-width="2.6" />
    <CelestialSun :x="SUN.x" :y="SUN.y" :r="17" label="太阳" :label-size="16" />
    <CelestialPlanet :x="planet.x" :y="planet.y" :r="7" variant="blue" />
    <text :x="PERI.x + 8" :y="PERI.y - 14" font-size="15" fill="#94a3b8" class="ks-halo">
      近日点
    </text>
    <text
      :x="APHE.x - 8"
      :y="APHE.y - 14"
      text-anchor="end"
      font-size="15"
      fill="#94a3b8"
      class="ks-halo"
    >
      远日点
    </text>
  </svg>
</template>

<style scoped>
.ks-svg {
  display: block;
  width: 100%;
  height: auto;
  cursor: pointer;
}

/* 图内小字压在轨道/扇形上时加描边光晕 */
.ks-halo {
  paint-order: stroke;
  stroke: #0f1425;
  stroke-width: 3.2px;
}
</style>
