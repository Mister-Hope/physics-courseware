<script setup lang="ts">
import { computed } from "vue";

/**
 * 第 5 页：黑体辐射的谱线族——不同温度下"辐射强度按波长的分布"。 每条曲线都由真实的普朗克公式 B(λ,T) = 2hc²/λ⁵ · 1/(e^(hc/λkT)−1) 逐点采样画出，
 * 峰值位置由采样点取最大值求得（维恩位移的图像表现）；三条曲线共用一个归一化， 所以温度越高整条曲线越高、峰值越靠短波——这正是要学生观察的两条规律。 点击分步：3000 K → 4000 K →
 * 5000 K（每条曲线出现的同时画出它的峰值虚线）。
 */

const H = 6.62607015e-34;
const C = 2.99792458e8;
const KB = 1.380649e-23;

/** 波长范围（nm）；可见光按教材口径 400–760 nm */
const LAM_MIN = 200;
const LAM_MAX = 1500;
const VIS_LO = 400;
const VIS_HI = 760;
const X_RANGE: [number, number] = [LAM_MIN, LAM_MAX];
const Y_RANGE: [number, number] = [0, 1.28];

const { step = 99 } = defineProps<{ step?: number }>();

const TEMPS = [3000, 4000, 5000];
const CURVE_COLORS = ["var(--c-danger)", "var(--c-accent)", "var(--c-physics)"];
/** 可见光波段按波长取的 6 段真实颜色（紫 → 蓝 → 青绿 → 黄 → 橙 → 红） */
const BAND_EDGES = [400, 450, 500, 560, 600, 645, 760];
const BAND_COLORS = ["#5400ff", "#00c0ff", "#5cff00", "#ffff00", "#ff6e00", "#ff0000"];

/** 普朗克公式的相对值（λ 以 nm 代入；整体只改纵向比例，不改曲线形状） */
const planck = (lamNm: number, t: number): number => {
  const lam = lamNm * 1e-9;
  return (2 * H * C * C) / lam ** 5 / (Math.exp((H * C) / (lam * KB * t)) - 1);
};

const SAMPLES = 84;
const sampled = TEMPS.map((t) => {
  const points: { x: number; y: number }[] = [];
  for (let index = 0; index <= SAMPLES; index += 1) {
    const lam = LAM_MIN + ((LAM_MAX - LAM_MIN) * index) / SAMPLES;
    points.push({ x: lam, y: planck(lam, t) });
  }
  return points;
});

/** 最高温曲线的峰值定为 1：低温曲线因此明显更矮、更靠红外一侧 */
const normalizer = sampled[sampled.length - 1].reduce((best, p) => (p.y > best.y ? p : best)).y;

const curves = sampled.map((points, index) => ({
  points: points.map((p) => ({ x: Math.round(p.x), y: p.y / normalizer })),
  stroke: CURVE_COLORS[index],
  width: 3.2,
  showAt: index + 1,
}));

/** 每条曲线的峰值波长与高度（画峰值虚线用） */
const peaks = sampled.map((points, index) => {
  const best = points.reduce((a, b) => (b.y > a.y ? b : a));
  return {
    lam: Math.round(best.x),
    v: best.y / normalizer,
    color: CURVE_COLORS[index],
    showAt: index + 1,
  };
});

/** 图底部的可见光彩色带：按波长分段上真实颜色（温度无关，常显） */
const bandAreas = BAND_EDGES.slice(0, -1).map((lo, index) => {
  const hi = BAND_EDGES[index + 1];
  return {
    points: [
      { x: lo, y: 0 },
      { x: hi, y: 0 },
      { x: hi, y: 0.11 },
      { x: lo, y: 0.11 },
    ],
    fill: BAND_COLORS[index],
    fillOpacity: 0.85,
  };
});

/** 温度标注：放在曲线右侧下坡段（三条曲线在这里上下错开，互不打架） */
const LABEL_LAM = 1150;
const labels = sampled.map((points, index) => {
  const at = points.reduce((best, p) =>
    Math.abs(p.x - LABEL_LAM) < Math.abs(best.x - LABEL_LAM) ? p : best,
  );
  return {
    x: at.x,
    y: at.y / normalizer,
    parts: [{ tex: `T=${TEMPS[index]}\\ \\text{K}` }],
    anchor: "top-right" as const,
    dy: -8,
    size: 18,
    color: CURVE_COLORS[index],
    halo: true,
    showAt: index + 1,
  };
});

/** 已经出现的曲线才画峰值虚线 */
const shownPeaks = computed(() => peaks.filter((peak) => step >= peak.showAt));
</script>

<template>
  <div class="bb">
    <CoordAxes
      :x-range="X_RANGE"
      :y-range="Y_RANGE"
      :x-axis="{ quantity: 'λ', unit: 'nm' }"
      :y-axis="{}"
      :curves="curves"
      :areas="bandAreas"
      :labels="labels"
      :ticks="{ labels: false }"
      :view="{ width: 960, height: 300 }"
      :step="step"
    >
      <template #overlay="{ x, y, px2user }">
        <text x="4" :y="y(1.28) - 8" font-size="18" fill="var(--c-text-dim)">辐射强度（相对）</text>
        <g
          v-for="peak in shownPeaks"
          :key="peak.lam"
          :stroke="peak.color"
          stroke-width="1.4"
          stroke-dasharray="7 5"
          stroke-opacity="0.75"
        >
          <line :x1="x(peak.lam)" :y1="y(peak.v)" :x2="x(peak.lam)" :y2="y(0)" />
        </g>
        <g stroke="var(--c-text-dim)" stroke-width="1.4" stroke-opacity="0.65">
          <line
            :x1="x(VIS_LO)"
            :y1="y(0) + 15 * px2user"
            :x2="x(VIS_HI)"
            :y2="y(0) + 15 * px2user"
          />
          <line
            :x1="x(VIS_LO)"
            :y1="y(0) + 10 * px2user"
            :x2="x(VIS_LO)"
            :y2="y(0) + 20 * px2user"
          />
          <line
            :x1="x(VIS_HI)"
            :y1="y(0) + 10 * px2user"
            :x2="x(VIS_HI)"
            :y2="y(0) + 20 * px2user"
          />
        </g>
        <text
          :x="x(300)"
          :y="y(0) + 38 * px2user"
          text-anchor="middle"
          font-size="17"
          fill="var(--c-text-dim)"
          >紫外线</text
        >
        <text
          :x="x(580)"
          :y="y(0) + 38 * px2user"
          text-anchor="middle"
          font-size="17"
          fill="var(--c-text-dim)"
          >可见光</text
        >
        <text
          :x="x(1130)"
          :y="y(0) + 38 * px2user"
          text-anchor="middle"
          font-size="17"
          fill="var(--c-text-dim)"
          >红外线</text
        >
      </template>
    </CoordAxes>
  </div>
</template>

<style scoped>
.bb {
  width: 100%;
  min-width: 0;
}
</style>
