<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 关联速度 · 绳模型：人在高岸上以 v0 收绳拉船。 绳不可伸长 ⇒ 船的速度沿绳方向的分量必须等于收绳速度 v0：v船 cosθ = v0 ⇒ v船 = v0/cosθ。
 * showDecomp=false 时只给干净题目图（题干页用），点击后才出分解（分析页用）。
 */
const {
  showDecomp = true,
  showPanel = true,
  readout = true,
  startTheta = 40,
} = defineProps<{
  /** 是否画出速度分解（题干页先给干净图） */
  showDecomp?: boolean;
  /** 是否显示角度滑杆 */
  showPanel?: boolean;
  /** 是否显示读数 */
  readout?: boolean;
  /** 初始的绳与水平方向夹角（度） */
  startTheta?: number;
}>();

const VIEW_W = 480;
const VIEW_H = 330;
/** 岸上绳的固定端（人手处）与绳在船头的系点 */
const ATTACH = { x: 95, y: 88 };
const BOW_Y = 268;
/** 收绳速度 1 m/s 与每 m/s 对应的像素数（箭头要够大，后排才看得清） */
const PULL_SPEED = 1;
const PX = 68;

const theta = ref(startTheta);
const rad = (deg: number): number => (deg * Math.PI) / 180;

/** 船头 x：由"绳与水平方向的夹角 = θ"定出船的位置 */
const bowX = computed(() => 111 + (BOW_Y - ATTACH.y) / Math.tan(rad(theta.value)));
const bow = computed(() => ({ x: bowX.value, y: BOW_Y }));
/** 从船头指向岸的单位向量 */
const ropeDir = computed(() => {
  const dx = ATTACH.x - bow.value.x;
  const dy = ATTACH.y - bow.value.y;
  const len = Math.hypot(dx, dy);
  return { x: dx / len, y: dy / len };
});
const vShip = computed(() => PULL_SPEED / Math.cos(rad(theta.value)));
/** 船头速度（指向岸边，水平向左）与沿绳分量的箭头末端 */
const shipTip = computed(() => ({ x: bow.value.x - vShip.value * PX, y: bow.value.y }));
const alongTip = computed(() => ({
  x: bow.value.x + PULL_SPEED * PX * ropeDir.value.x,
  y: bow.value.y + PULL_SPEED * PX * ropeDir.value.y,
}));
/** 角度弧：从水平向左到绳方向 */
const arcRadius = 58;
const arcStart = computed(() => ({ x: bow.value.x - arcRadius, y: bow.value.y }));
const arcEnd = computed(() => ({
  x: bow.value.x + arcRadius * ropeDir.value.x,
  y: bow.value.y + arcRadius * ropeDir.value.y,
}));
const arcLabel = computed(() => {
  const half = rad(theta.value / 2);
  return {
    x: bow.value.x - 80 * Math.cos(half),
    y: bow.value.y - 80 * Math.sin(half),
  };
});
/** 文字位置：v船 放在红箭头正下方；v0 放在金色箭头外侧（不与红箭头、绳重叠） */
const shipLabel = computed(() => ({
  x: (bow.value.x - 16 + shipTip.value.x) / 2,
  y: bow.value.y + 32,
}));
const alongLabel = computed(() => ({
  x: alongTip.value.x + 24 * Math.sin(rad(theta.value)),
  y: alongTip.value.y - 24 * Math.cos(rad(theta.value)),
}));
</script>

<template>
  <div class="rope-pull">
    <svg
      :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="人在岸上收绳拉船"
    >
      <!-- 岸（左）与水面 -->
      <rect x="0" y="100" width="95" height="180" fill="rgba(148,163,184,0.14)" />
      <SurfaceHatch :from="{ x: 95, y: 100 }" :to="{ x: 95, y: 280 }" side="left" :thickness="14" />
      <line x1="0" y1="100" x2="95" y2="100" stroke="rgba(203,213,225,0.75)" stroke-width="2.2" />
      <line
        x1="95"
        y1="280"
        :x2="VIEW_W"
        y2="280"
        stroke="rgba(203,213,225,0.75)"
        stroke-width="2.2"
      />
      <SurfaceHatch
        :from="{ x: 95, y: 280 }"
        :to="{ x: VIEW_W, y: 280 }"
        side="below"
        :thickness="14"
      />
      <!-- 岸上的人（只在题干里示意"有人在收绳"） -->
      <g stroke="#e2a846" stroke-width="2.6" fill="none" stroke-linecap="round">
        <circle cx="58" cy="52" r="8" />
        <line x1="58" y1="60" x2="58" y2="84" />
        <line x1="58" y1="84" x2="48" y2="100" />
        <line x1="58" y1="84" x2="68" y2="100" />
        <line x1="58" y1="68" x2="82" y2="80" />
      </g>
      <!-- 绳 -->
      <line
        :x1="ATTACH.x"
        :y1="ATTACH.y"
        :x2="bow.x"
        :y2="bow.y - 8"
        stroke="#cbd5e1"
        stroke-width="2.6"
      />
      <!-- 船 -->
      <g :transform="`translate(${bow.x} ${bow.y})`">
        <path
          d="M -30 -10 L 16 -10 L 32 0 L 16 12 L -30 12 Z"
          fill="rgba(96,165,250,0.35)"
          stroke="#93c5fd"
          stroke-width="2.2"
        />
      </g>
      <!-- θ 角 -->
      <line
        :x1="bow.x - 70"
        :y1="bow.y"
        :x2="bow.x + 6"
        :y2="bow.y"
        stroke="rgba(148,163,184,0.7)"
        stroke-width="1.6"
        stroke-dasharray="7 6"
      />
      <path
        :d="`M ${arcStart.x} ${arcStart.y} A ${arcRadius} ${arcRadius} 0 0 1 ${arcEnd.x} ${arcEnd.y}`"
        fill="none"
        stroke="#cbd5e1"
        stroke-width="2"
      />
      <text
        :x="arcLabel.x"
        :y="arcLabel.y"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#cbd5e1"
      >
        θ
      </text>
      <!-- 速度分解 -->
      <g v-if="showDecomp">
        <CourseArrow :from="bow" :to="shipTip" stroke="#f87171" :stroke-width="3.4" />
        <CourseArrow :from="bow" :to="alongTip" stroke="#e2a846" :stroke-width="3.2" />
        <line
          :x1="alongTip.x"
          :y1="alongTip.y"
          :x2="shipTip.x"
          :y2="shipTip.y"
          stroke="rgba(148,163,184,0.8)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <text
          :x="shipLabel.x"
          :y="shipLabel.y"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="21"
          fill="#f87171"
        >
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="14" dy="4">船</tspan>
        </text>
        <text
          :x="alongLabel.x"
          :y="alongLabel.y"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="21"
          fill="#e2a846"
        >
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="14" dy="4">0</tspan>
        </text>
      </g>
    </svg>
    <div v-if="showPanel" class="rope-panel">
      <label
        >绳与水平方向的夹角 <span class="rope-val">{{ theta }}°</span
        ><input v-model.number="theta" type="range" min="30" max="55" step="1"
      /></label>
    </div>
    <div v-if="readout" class="rope-readout">
      v<sub>船</sub> = v<sub>0</sub>/cos θ = <b>{{ vShip.toFixed(2) }} m/s</b>
    </div>
  </div>
</template>

<style scoped>
.rope-pull {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.rope-pull svg {
  display: block;
  width: 100%;
  height: auto;
}

.rope-panel {
  display: flex;
  justify-content: center;
  color: var(--c-text-dim, #94a3b8);
  font-size: 0.8rem;
}

.rope-panel label {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.rope-panel input {
  width: 8rem;
}

.rope-val {
  min-width: 2.6rem;
  color: var(--c-accent, #e2a846);
  font-variant-numeric: tabular-nums;
}

.rope-readout {
  color: var(--c-text, #e2e8f0);
  font-size: 0.95rem;
  text-align: center;
}
</style>
