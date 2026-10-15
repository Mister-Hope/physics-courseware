<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 人造地球卫星轨道实验台（7.4）：拖动滑块改变轨道半径 r，实时按真实公式算出线速度与周期—— v = √(GM/r)，T = 2π√(r³/GM)
 * 并画出轨道（含地球同步卫星的参照轨道）。近地卫星 r ≈ 6.6×10³ km 对应 v ≈ 7.9 km/s、T ≈ 87 min； 移到 4.22×10⁴ km（离地约 3.6×10⁴
 * km）时 T 正好是 24 h，就是地球同步卫星。
 */
const GM = 3.986e14; // 地球引力常量 Gm地（m³/s²）
const R_EARTH = 6400; // 地球半径（km）
const T_DAY = 86400; // 地球自转周期（s）
/** 同步轨道半径：由 T = 2π√(r³/GM) 反解出 r = ∛(GM·T²/4π²)，约 4.22×10⁴ km */
const SYNC_R = Math.cbrt((GM * T_DAY ** 2) / (4 * Math.PI ** 2)) / 1000;

const VIEW = { width: 1000, height: 400 };
/** 地心在画布上的位置 */
const C = { x: 500, y: 200 };
/** 1 km = 多少用户单位（同步轨道的整圆正好落在画布里） */
const PER_KM = 190 / SYNC_R;
/** 卫星画在轨道的 35° 方向（视线清晰，速度箭头也不会压住地球） */
const THETA = (35 * Math.PI) / 180;

const radius = ref(6600);

const altitude = computed(() => radius.value - R_EARTH);
/** 线速度 v = √(GM/r)（km/s） */
const speed = computed(() => Math.sqrt(GM / (radius.value * 1000)) / 1000);
/** 周期 T = 2π√(r³/GM)（min） */
const period = computed(() => (2 * Math.PI * Math.sqrt((radius.value * 1000) ** 3 / GM)) / 60);
/** 是否落在同步轨道上 */
const isSync = computed(() => Math.abs(radius.value - SYNC_R) < 200);

const periodTex = computed(() => {
  const minutes = period.value;

  return minutes >= 120
    ? `${(minutes / 60).toFixed(1)}\\ \\text{h}`
    : `${minutes.toFixed(0)}\\ \\text{min}`;
});

/**
 * 轨道半径（用户单位）：地球用同一个比例尺画，所以低轨会贴着球面——这正是真实的样子
 *
 * @param km 距离地心的千米数
 * @returns 画布用户单位
 */
const unitOf = (km: number): number => km * PER_KM;

const orbitR = computed(() => unitOf(radius.value));
const earthR = computed(() => unitOf(R_EARTH));
const syncR = computed(() => unitOf(SYNC_R));

/** 卫星当前位置与速度方向（沿轨道逆时针运动，速度与半径垂直） */
const sat = computed(() => ({
  x: C.x + orbitR.value * Math.cos(THETA),
  y: C.y - orbitR.value * Math.sin(THETA),
}));
const velTip = computed(() => ({
  x: sat.value.x - 62 * Math.sin(THETA),
  y: sat.value.y - 62 * Math.cos(THETA),
}));
/** 卫星本体的朝向 = 速度方向（SVG 的 rotate 以屏幕坐标为准） */
const satDeg = computed(() => {
  const deg = (Math.atan2(-Math.cos(THETA), -Math.sin(THETA)) * 180) / Math.PI;

  return deg.toFixed(1);
});
/** 半径虚线的中点（放 r 标号） */
const radiusMid = computed(() => ({
  x: C.x + orbitR.value * 0.56 * Math.cos(THETA),
  y: C.y - orbitR.value * 0.56 * Math.sin(THETA),
}));
</script>

<template>
  <div class="sol">
    <div class="sol-panel">
      <div class="sol-line">轨道半径 <Latex :tex="`r = ${radius}\\ \\text{km}`" /></div>
      <div class="sol-line dim">
        离地高度 <Latex :tex="`h = ${Math.round(altitude)}\\ \\text{km}`" />
      </div>
      <input
        v-model.number="radius"
        class="sol-slider"
        type="range"
        min="6500"
        :max="42400"
        step="100"
        :aria-label="`轨道半径 ${radius} 千米`"
      />
      <div class="sol-chips">
        <button class="sol-chip" type="button" @click="radius = 6600">近地卫星</button>
        <button class="sol-chip sync" type="button" @click="radius = Math.round(SYNC_R)">
          同步卫星
        </button>
      </div>
      <div class="sol-line">线速度 <Latex :tex="`v = ${speed.toFixed(2)}\\ \\text{km/s}`" /></div>
      <div class="sol-line">周期 <Latex :tex="`T = ${periodTex}`" /></div>
      <div v-if="isSync" class="sol-sync">轨道平面与赤道平面重合，相对地面静止</div>
    </div>
    <div class="sol-fig">
      <svg
        :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="卫星在不同轨道半径上的线速度与周期"
      >
        <circle
          :cx="C.x"
          :cy="C.y"
          :r="syncR"
          fill="none"
          stroke="#e2a846"
          stroke-width="2"
          stroke-dasharray="9 7"
          :opacity="isSync ? 0.9 : 0.45"
        />
        <text
          :x="C.x - syncR * 0.72"
          :y="C.y - syncR * 0.72"
          text-anchor="end"
          font-size="19"
          fill="#e2a846"
          opacity="0.85"
        >
          同步轨道
        </text>
        <CelestialEarth :x="C.x" :y="C.y" :r="earthR" label="地球" :label-size="19" />
        <circle :cx="C.x" :cy="C.y" :r="orbitR" fill="none" stroke="#60a5fa" stroke-width="2.6" />
        <line
          :x1="C.x"
          :y1="C.y"
          :x2="sat.x"
          :y2="sat.y"
          stroke="#94a3b8"
          stroke-width="1.6"
          stroke-dasharray="7 5"
        />
        <text
          :x="radiusMid.x"
          :y="radiusMid.y"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="22"
          fill="#cbd5e1"
        >
          r
        </text>
        <CourseArrow
          :from="sat"
          :to="velTip"
          stroke="#60a5fa"
          :stroke-width="2.8"
          label="v"
          :label-dx="12"
          :label-dy="-10"
        />
        <g :transform="`translate(${sat.x} ${sat.y}) rotate(${satDeg})`">
          <rect x="-30" y="-5" width="17" height="10" rx="1.6" fill="rgba(96,165,250,0.85)" />
          <rect x="13" y="-5" width="17" height="10" rx="1.6" fill="rgba(96,165,250,0.85)" />
          <line x1="-13" y1="0" x2="-9" y2="0" stroke="#94a3b8" stroke-width="1.4" />
          <line x1="9" y1="0" x2="13" y2="0" stroke="#94a3b8" stroke-width="1.4" />
          <rect x="-9" y="-6" width="18" height="12" rx="2.4" fill="#e2e8f0" />
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.sol {
  display: flex;
  gap: 1.1rem;
  align-items: center;

  width: 100%;
}

.sol-panel {
  display: flex;
  flex: 0 0 25%;
  flex-direction: column;
  gap: 0.45rem;

  min-width: 0;
}

.sol-line {
  color: var(--c-text);
  font-size: 0.95rem;
}

.sol-line.dim {
  color: var(--c-text-dim);
  font-size: 0.86rem;
}

.sol-slider {
  width: 100%;
  accent-color: var(--c-accent);
}

.sol-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.sol-chip {
  padding: 0.15rem 0.6rem;
  border: 1px solid rgb(96 165 250 / 45%);
  border-radius: 2rem;

  background: rgb(96 165 250 / 12%);
  color: #60a5fa;

  font-size: 0.78rem;

  cursor: pointer;

  transition: all 0.25s ease;
}

.sol-chip.sync {
  border-color: rgb(226 168 70 / 45%);
  background: rgb(226 168 70 / 12%);
  color: #e2a846;
}

.sol-chip:hover {
  filter: brightness(1.2);
}

.sol-sync {
  color: #e2a846;
  font-size: 0.86rem;
  line-height: 1.5;
}

.sol-fig {
  flex: 1 1 auto;
  min-width: 0;
}

.sol-fig svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
