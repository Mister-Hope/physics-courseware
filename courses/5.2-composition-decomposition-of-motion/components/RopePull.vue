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
/** 单位化 */
const unit = (v: { x: number; y: number }): { x: number; y: number } => {
  const len = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / len, y: v.y / len };
};
/** 垂足（alongTip）处的直角符号：沿绳方向与沿垂线方向各取一小段 */
const rightAngleMark = (): string => {
  const foot = alongTip.value;
  const along = unit({ x: bow.value.x - foot.x, y: bow.value.y - foot.y });
  const perp = unit({ x: shipTip.value.x - foot.x, y: shipTip.value.y - foot.y });
  const size = 12;
  const p1 = { x: foot.x + size * along.x, y: foot.y + size * along.y };
  const p2 = { x: foot.x + size * perp.x, y: foot.y + size * perp.y };
  const p3 = { x: p1.x + size * perp.x, y: p1.y + size * perp.y };
  return `M ${p1.x} ${p1.y} L ${p3.x} ${p3.y} L ${p2.x} ${p2.y}`;
};
const alongLabel = computed(() => ({
  x: alongTip.value.x + 24 * Math.sin(rad(theta.value)),
  y: alongTip.value.y - 24 * Math.cos(rad(theta.value)),
}));
</script>

<template>
  <div class="sim">
    <svg
      :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="人在岸上收绳拉船"
    >
      <!-- 岸（左）与水面 -->
      <rect
        x="0"
        y="100"
        width="95"
        height="180"
        fill="color-mix(in srgb, var(--c-text-dim) 14%, transparent)"
      />
      <SurfaceHatch :from="{ x: 95, y: 100 }" :to="{ x: 95, y: 280 }" side="left" :thickness="14" />
      <line
        x1="0"
        y1="100"
        x2="95"
        y2="100"
        stroke="color-mix(in srgb, var(--c-neutral-300) 75%, transparent)"
        stroke-width="2.2"
      />
      <line
        x1="95"
        y1="280"
        :x2="VIEW_W"
        y2="280"
        stroke="color-mix(in srgb, var(--c-neutral-300) 75%, transparent)"
        stroke-width="2.2"
      />
      <SurfaceHatch
        :from="{ x: 95, y: 280 }"
        :to="{ x: VIEW_W, y: 280 }"
        side="below"
        :thickness="14"
      />
      <!-- 岸上的人（只在题干里示意"有人在收绳"） -->
      <g stroke="var(--c-accent)" stroke-width="2.6" fill="none" stroke-linecap="round">
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
        stroke="var(--c-neutral-300)"
        stroke-width="2.6"
      />
      <!-- 船 -->
      <g :transform="`translate(${bow.x} ${bow.y})`">
        <path
          d="M -30 -10 L 16 -10 L 32 0 L 16 12 L -30 12 Z"
          fill="color-mix(in srgb, var(--c-velocity) 35%, transparent)"
          stroke="var(--c-velocity-light)"
          stroke-width="2.2"
        />
      </g>
      <!-- θ 角 -->
      <line
        :x1="bow.x - 70"
        :y1="bow.y"
        :x2="bow.x + 6"
        :y2="bow.y"
        stroke="color-mix(in srgb, var(--c-text-dim) 70%, transparent)"
        stroke-width="1.6"
        stroke-dasharray="7 6"
      />
      <path
        :d="`M ${arcStart.x} ${arcStart.y} A ${arcRadius} ${arcRadius} 0 0 1 ${arcEnd.x} ${arcEnd.y}`"
        fill="none"
        stroke="var(--c-neutral-300)"
        stroke-width="2"
      />
      <text
        :x="arcLabel.x"
        :y="arcLabel.y"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="var(--c-neutral-300)"
      >
        θ
      </text>
      <!-- 速度分解 -->
      <g v-if="showDecomp">
        <CourseArrow :from="bow" :to="shipTip" stroke="var(--c-force)" :stroke-width="3.4" />
        <CourseArrow :from="bow" :to="alongTip" stroke="var(--c-accent)" :stroke-width="3.2" />
        <line
          :x1="alongTip.x"
          :y1="alongTip.y"
          :x2="shipTip.x"
          :y2="shipTip.y"
          stroke="color-mix(in srgb, var(--c-text-dim) 80%, transparent)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <path
          :d="rightAngleMark()"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          opacity="0.85"
        />
        <text
          :x="shipLabel.x"
          :y="shipLabel.y"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="21"
          fill="var(--c-force)"
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
          fill="var(--c-accent)"
        >
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="14" dy="4">0</tspan>
        </text>
      </g>
    </svg>
    <div v-if="showPanel" class="sim-panel">
      <CourseSlider
        v-model="theta"
        :min="30"
        :max="55"
        label="绳与水平方向的夹角"
        label-width="11rem"
      />
    </div>
    <div v-if="readout" class="sim-readout">
      <Latex :tex="`v_{\\text{船}} = v_0/\\cos\\theta = ${vShip.toFixed(2)}\\ \\text{m/s}`" />
    </div>
  </div>
</template>

<style scoped>
.sim {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.sim svg {
  display: block;
  width: 100%;
  height: auto;
}

.sim-panel {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.sim-readout {
  color: var(--c-text);
  font-size: 0.95rem;
  text-align: center;
}
</style>
