<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 平抛演示台：拖动滑块改变时刻，实时显示两个方向的分量与合成量。
 *
 * - Mode="velocity"：分速度 v_x = v_0、v_y = gt，合速度 v = √(v_x² + v_y²)，偏角 tanθ = v_y / v_x；
 * - Mode="displacement"：分位移 x = v_0 t、y = ½gt²，合位移 s = √(x² + y²)，偏角 tanα = y / x。
 *
 * 坐标轴 / 刻度 / 轴量标签交给共享 `CoordAxes`；轨迹高亮、矢量箭头、角弧与合量虚线画在 `#overlay` 里。 所有矢量按同一比例尺画（velocity 用 VSCALE
 * px 每 m/s，displacement 用 DSCALE px 每 m）， 这样分矢量与合矢量构成的三角形才是真实的几何关系，不会被两个方向不同的缩放率拉歪。
 */
const {
  mode = "velocity",
  v0 = 5,
  g = 10,
  h = 5,
  start = 60,
} = defineProps<{
  mode?: "velocity" | "displacement";
  /** 水平初速度（m/s） */
  v0?: number;
  /** 重力加速度（m/s²） */
  g?: number;
  /** 抛出点离地高度（m），决定演示的时间上限 t = √(2h/g) */
  h?: number;
  /** 滑块初始位置（0–100） */
  start?: number;
}>();

/** 矢量比例尺（屏幕 px 每 m/s）与位移比例尺（屏幕 px 每 m） */
const VSCALE = 6.4;
const DSCALE = 26;
const ARC_R = 34;

const progress = ref(start);

const fallTime = computed(() => Math.sqrt((2 * h) / g));
const t = computed(() => (progress.value / 100) * fallTime.value);

const vx = computed(() => v0);
const vy = computed(() => g * t.value);
const speed = computed(() => Math.hypot(vx.value, vy.value));
const theta = computed(() => (Math.atan2(vy.value, vx.value) * 180) / Math.PI);

const xPos = computed(() => v0 * t.value);
const yPos = computed(() => 0.5 * g * t.value ** 2);
const dist = computed(() => Math.hypot(xPos.value, yPos.value));
const alpha = computed(() => (Math.atan2(yPos.value, xPos.value) * 180) / Math.PI);

const xSpan = computed(() => v0 * fallTime.value);
const xRange = computed((): [number, number] => [0, xSpan.value * 1.1]);
const yRange = computed((): [number, number] => [-h * 1.14, 0]);

/** 整条轨迹（y 向下为负，与纵轴范围 [-h, 0] 一致） */
const trajectory = computed(() => {
  const count = 60;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= count; i++) {
    const x = (xSpan.value * i) / count;
    points.push({ x, y: -(g * x * x) / (2 * v0 * v0) });
  }
  return points;
});

/** 已经走过的那一段（高亮） */
const flown = computed(() => {
  const count = 48;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= count; i++) {
    const x = (xPos.value * i) / count;
    points.push({ x, y: -(g * x * x) / (2 * v0 * v0) });
  }
  return points;
});

/**
 * 屏幕方向上的单位向量（0° 向右、90° 向下，与 SVG 用户坐标一致）
 *
 * @param deg 方向角（度）
 * @returns 该方向在 SVG 用户坐标下的单位向量
 */
const dir = (deg: number): { dx: number; dy: number } => {
  const rad = (deg * Math.PI) / 180;
  return { dx: Math.cos(rad), dy: Math.sin(rad) };
};

// 位置化签名与 SVG 圆弧的参数顺序一一对应，拆成对象反而不好对照，故保留 6 个参数
/**
 * 角弧的 path（用户单位；半径按屏幕 px 口径再换算）
 *
 * @param cx 弧心 x（用户单位）
 * @param cy 弧心 y（用户单位）
 * @param rPx 弧半径（屏幕 px）
 * @param fromDeg 起始角（度）
 * @param toDeg 终止角（度）
 * @param px2user 屏幕 px 换算成用户单位的比例
 * @returns 角弧的 path 数据
 */
// eslint-disable-next-line max-params
const arcPath = (
  cx: number,
  cy: number,
  rPx: number,
  fromDeg: number,
  toDeg: number,
  px2user: number,
): string => {
  const r = rPx * px2user;
  const from = dir(fromDeg);
  const to = dir(toDeg);
  const startPoint = { x: cx + r * from.dx, y: cy + r * from.dy };
  const endPoint = { x: cx + r * to.dx, y: cy + r * to.dy };
  const largeArc = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  return `M ${startPoint.x} ${startPoint.y} A ${r} ${r} 0 ${largeArc} 1 ${endPoint.x} ${endPoint.y}`;
};

const fixed = (value: number, digits = 2): string => value.toFixed(digits);
</script>

<template>
  <div class="playground">
    <CoordAxes
      :x-range="xRange"
      :y-range="yRange"
      :x-axis="{ quantity: 'x', unit: 'm' }"
      :y-axis="{ quantity: 'y' }"
      :curves="[{ points: trajectory, stroke: 'rgba(148,163,184,0.55)', width: 2.4 }]"
      :labels="[
        {
          x: xPos,
          y: -yPos,
          tex: 'P',
          anchor: 'bottom-left',
          color: 'var(--c-accent)',
          dot: 6,
          halo: true,
          size: 19,
        },
      ]"
      :ticks="{ x: [], y: [], labels: false }"
      :view="{ width: 600, height: 350 }"
    >
      <template #overlay="{ x, y, px2user }">
        <polyline
          :points="flown.map((p) => `${x(p.x)},${y(p.y)}`).join(' ')"
          fill="none"
          stroke="#e2a846"
          stroke-width="3.4"
          stroke-linecap="round"
        />
        <g v-if="mode === 'velocity'">
          <CourseArrow
            :from="{ x: x(xPos), y: y(-yPos) }"
            :to="{ x: x(xPos) + vx * VSCALE * px2user, y: y(-yPos) }"
            stroke="#60a5fa"
            :stroke-width="3"
          />
          <CourseArrow
            :from="{ x: x(xPos), y: y(-yPos) }"
            :to="{ x: x(xPos), y: y(-yPos) + vy * VSCALE * px2user }"
            stroke="#2dd4bf"
            :stroke-width="3"
          />
          <CourseArrow
            :from="{ x: x(xPos), y: y(-yPos) }"
            :to="{
              x: x(xPos) + speed * VSCALE * px2user * dir(theta).dx,
              y: y(-yPos) + speed * VSCALE * px2user * dir(theta).dy,
            }"
            stroke="#f87171"
            :stroke-width="3.4"
          />
          <path
            :d="arcPath(x(xPos), y(-yPos), ARC_R, 0, theta, px2user)"
            fill="none"
            stroke="#f87171"
            stroke-width="2"
          />
          <text
            :x="x(xPos) + vx * VSCALE * px2user + 8"
            :y="y(-yPos) + 6"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
            fill="#93c5fd"
            >v<tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4"
              >x</tspan
            ></text
          >
          <text
            :x="x(xPos) + 10"
            :y="y(-yPos) + vy * VSCALE * px2user + 16"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
            fill="#5eead4"
            >v<tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4"
              >y</tspan
            ></text
          >
          <text
            :x="x(xPos) + speed * VSCALE * px2user * dir(theta).dx + 8"
            :y="y(-yPos) + speed * VSCALE * px2user * dir(theta).dy + 6"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
            fill="#fca5a5"
            >v</text
          >
          <text
            :x="x(xPos) + (ARC_R + 12) * px2user"
            :y="y(-yPos) + (ARC_R + 4) * px2user"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="18"
            fill="#fca5a5"
            >θ</text
          >
        </g>
        <g v-else>
          <line
            :x1="x(0)"
            :y1="y(0)"
            :x2="x(xPos)"
            :y2="y(0)"
            stroke="#60a5fa"
            stroke-width="2.4"
            stroke-dasharray="7 6"
          />
          <line
            :x1="x(xPos)"
            :y1="y(0)"
            :x2="x(xPos)"
            :y2="y(-yPos)"
            stroke="#2dd4bf"
            stroke-width="2.4"
            stroke-dasharray="7 6"
          />
          <CourseArrow
            :from="{ x: x(0), y: y(0) }"
            :to="{ x: x(xPos), y: y(-yPos) }"
            stroke="#f87171"
            :stroke-width="3.4"
          />
          <path
            :d="arcPath(x(0), y(0), ARC_R, 0, alpha, px2user)"
            fill="none"
            stroke="#f87171"
            stroke-width="2"
          />
          <text
            :x="x(xPos / 2)"
            :y="y(0) + 22 * px2user"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
            fill="#93c5fd"
            >x</text
          >
          <text
            :x="x(xPos) + 10 * px2user"
            :y="y(-yPos / 2)"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
            fill="#5eead4"
            >y</text
          >
          <text
            :x="x(xPos / 2) + 6 * px2user"
            :y="y(-yPos / 2) - 6 * px2user"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
            fill="#fca5a5"
            >s</text
          >
          <text
            :x="x(0) + (ARC_R + 12) * px2user"
            :y="y(0) + (ARC_R + 4) * px2user"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="18"
            fill="#fca5a5"
            >α</text
          >
        </g>
      </template>
    </CoordAxes>

    <div class="playground-bar">
      <span class="playground-label">时刻 <Latex tex="t" /></span>
      <input
        v-model.number="progress"
        class="playground-range"
        type="range"
        min="0"
        max="100"
        step="1"
      />
      <span class="playground-time">{{ fixed(t) }} s</span>
    </div>

    <div class="playground-readout">
      <template v-if="mode === 'velocity'">
        <span><Latex tex="v_x" /> = {{ fixed(vx) }} <Latex tex="\text{m/s}" /></span>
        <span><Latex tex="v_y" /> = {{ fixed(vy) }} <Latex tex="\text{m/s}" /></span>
        <span><Latex tex="v" /> = {{ fixed(speed) }} <Latex tex="\text{m/s}" /></span>
        <span><Latex tex="\theta" /> = {{ fixed(theta, 1) }}°</span>
      </template>
      <template v-else>
        <span><Latex tex="x" /> = {{ fixed(xPos) }} <Latex tex="\text{m}" /></span>
        <span><Latex tex="y" /> = {{ fixed(yPos) }} <Latex tex="\text{m}" /></span>
        <span><Latex tex="s" /> = {{ fixed(dist) }} <Latex tex="\text{m}" /></span>
        <span><Latex tex="\alpha" /> = {{ fixed(alpha, 1) }}°</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.playground {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.playground-bar {
  display: flex;
  gap: 0.7rem;
  align-items: center;

  color: var(--c-text-dim);

  font-size: 0.82rem;
}

.playground-label {
  white-space: nowrap;
}

.playground-range {
  flex: 1;
  min-width: 0;
  height: 1.1rem;
  accent-color: var(--c-accent);
}

.playground-time {
  min-width: 4.2rem;
  color: var(--c-accent);
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.playground-readout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.25rem 1rem;

  font-size: 0.88rem;
  font-variant-numeric: tabular-nums;
}
</style>
