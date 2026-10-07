<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 松垮的铁链：两端固定在两个固定点上，链长不变。 自然状态下垂成悬链线——这是重力势能最低、重心最低的位形； 抓住最低点往下拽，链条被拉成两段近似直线（V 形），重心反而升高。 滑块控制下拉程度
 * t：形状在"悬链线 → V 形"之间连续过渡（两端点与弧长都不变）， 重心用弧长加权质心数值算出——只作定性判断：最低点下降、重心升高。
 */

/** 两端固定点、链长与画布位置 */
const PIN_L = { x: 150, y: 80 };
const PIN_R = { x: 450, y: 80 };
const SPAN = PIN_R.x - PIN_L.x;
const LENGTH = 470;
const CENTER_X = (PIN_L.x + PIN_R.x) / 2;

const pull = ref(0);

/** 悬链线参数 a：由 2a·sinh(w/2a) = L 二分求得 */
const catenaryA = computed(() => {
  let low = SPAN / 40;
  let high = 1e5;

  for (let step = 0; step < 80; step += 1) {
    const mid = Math.sqrt(low * high);

    if (2 * mid * Math.sinh(SPAN / (2 * mid)) > LENGTH) low = mid;
    else high = mid;
  }

  return Math.sqrt(low * high);
});

/** 绷成两段直线（V 形）时最低点比固定点低出的量：每段长 L/2，水平投影为跨度的一半 */
const peakHeight = Math.sqrt((LENGTH / 2) ** 2 - (SPAN / 2) ** 2);

/**
 * 给定上推程度时的形状点：悬链线与 Λ 形按同一组横坐标插值
 *
 * @param amount 下拉程度（0 自然下垂 ~ 1 绷成两段直线）
 * @returns 沿链条的点列
 */
const shapeAt = (amount: number): { x: number; y: number }[] => {
  const a = catenaryA.value;
  const edge = a * Math.cosh(SPAN / (2 * a));
  const points: { x: number; y: number }[] = [];

  for (let step = 0; step <= 200; step += 1) {
    const x = PIN_L.x + (SPAN * step) / 200;
    const yCat = PIN_L.y + edge - a * Math.cosh((x - CENTER_X) / a);
    const ratio = Math.abs(x - CENTER_X) / (SPAN / 2);
    const yTaut = PIN_L.y + peakHeight * (1 - ratio);

    points.push({ x, y: yCat * (1 - amount) + yTaut * amount });
  }

  return points;
};

/**
 * 链条的弧长加权重心纵坐标（均匀链条的质心定义）
 *
 * @param points 沿链条的点列
 * @returns 重心纵坐标
 */
const centroidOf = (points: { x: number; y: number }[]): number => {
  let weight = 0;
  let sum = 0;

  for (let index = 0; index < points.length - 1; index += 1) {
    const point = points[index];
    const next = points[index + 1];
    const seg = Math.hypot(next.x - point.x, next.y - point.y);

    weight += seg;
    sum += seg * ((point.y + next.y) / 2);
  }

  return sum / weight;
};

const shape = computed(() => shapeAt(pull.value));
/** 当前重心高度 */
const centerY = computed(() => centroidOf(shape.value));
/** 自然下垂时的重心高度——同一套质心算法，保证 t = 0 时读数为 0 */
const naturalCenterY = computed(() => centroidOf(shapeAt(0)));
/** 重心比自然下垂时升高了多少（以链长 L 为单位） */
const rise = computed(() => (naturalCenterY.value - centerY.value) / LENGTH);

const path = computed(() =>
  shape.value
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" "),
);

/** 自然下垂时最低点的位置（"往下拽"的起点） */
const naturalBottomY = computed(() => Math.max(...shapeAt(0).map((point) => point.y)));
/** 当前形状中点的纵坐标 */
const midY = computed(() => shape.value[Math.floor(shape.value.length / 2)].y);
</script>

<template>
  <div class="cp">
    <svg
      class="cp-svg"
      viewBox="38 30 564 292"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="把松垮的铁链最低点往下拽、绷直后重心升高的演示"
    >
      <line
        x1="52"
        :y1="PIN_L.y"
        x2="556"
        :y2="PIN_L.y"
        stroke="#94a3b8"
        stroke-width="1.2"
        stroke-dasharray="6 5"
        opacity="0.45"
      />
      <line
        x1="52"
        :y1="naturalCenterY"
        x2="556"
        :y2="naturalCenterY"
        stroke="#94a3b8"
        stroke-width="1.4"
        stroke-dasharray="6 5"
        opacity="0.7"
      />
      <text x="52" :y="naturalCenterY - 10" font-size="15" fill="#94a3b8">自然下垂时的重心</text>
      <path :d="path" fill="none" stroke="#e2a846" stroke-width="6" stroke-linecap="round" />
      <circle :cx="PIN_L.x" :cy="PIN_L.y" r="7.5" fill="#64748b" />
      <circle :cx="PIN_R.x" :cy="PIN_R.y" r="7.5" fill="#64748b" />
      <circle :cx="CENTER_X" :cy="centerY" r="9" fill="#f87171" stroke="#0f1425" stroke-width="2" />
      <line
        :x1="CENTER_X"
        :y1="centerY"
        :x2="CENTER_X"
        :y2="naturalCenterY"
        stroke="#f87171"
        stroke-width="2"
        stroke-dasharray="5 4"
      />
      <text
        :x="CENTER_X + 18"
        :y="centerY - 12"
        font-size="20"
        fill="#f87171"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        重心
      </text>
      <CourseArrow
        :from="{ x: CENTER_X, y: midY - 38 }"
        :to="{ x: CENTER_X, y: midY + 8 }"
        stroke="#60a5fa"
        stroke-width="3.4"
      />
      <text :x="CENTER_X + 14" :y="midY - 18" font-size="16" fill="#60a5fa">往下拽</text>
      <text x="150" y="62" font-size="16" fill="#94a3b8" text-anchor="middle">固定点</text>
      <text x="450" y="62" font-size="16" fill="#94a3b8" text-anchor="middle">固定点</text>
    </svg>
    <div class="cp-ctrl">
      <label class="cp-label">
        <span>往下拽的程度（松 ↔ 紧）</span>
        <input v-model.number="pull" type="range" min="0" max="1" step="0.01" />
      </label>
      <div class="cp-read">最低点被拽得越低、铁链绷得越直 → 重心反而<b class="cp-num">升高</b></div>
    </div>
  </div>
</template>

<style scoped>
.cp {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;

  width: 100%;
}

.cp-svg {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}

.cp-ctrl {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  align-items: center;

  width: 100%;
  max-width: 27rem;
}

.cp-label {
  display: flex;
  gap: 0.7rem;
  align-items: center;

  width: 100%;

  color: var(--c-text-dim);

  font-size: 0.78rem;
}

.cp-label input {
  flex: 1;
  min-width: 0;
  accent-color: var(--c-accent);
}

.cp-read {
  color: var(--c-text);
  font-size: 0.82rem;
  text-align: center;
}

.cp-num {
  color: var(--c-accent);
  font-size: 0.98rem;
}

.cp-note {
  display: block;
  margin-top: 0.1rem;
  color: var(--c-text-dim);
  font-size: 0.74rem;
}
</style>
