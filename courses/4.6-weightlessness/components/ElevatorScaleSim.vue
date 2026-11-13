<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId } from "vue";

import {
  FLOOR_SPAN,
  READING_BASE,
  TRIP,
  displacementFractionAt,
  floorAt,
  motionLabelAt,
  readingAt,
} from "../composables/elevatorReading";
import type { TripDirection } from "../composables/elevatorReading";

/** SVG 里 id/url(#id) 必须按实例唯一：Slidev 会同时挂载相邻页，重名 id 会让填充整体失效 */
const uid = useId();

/**
 * 电梯实测模拟（第 6、8、9、10 页）
 *
 * 照视频里的商场玻璃电梯 + 电子平台秤重画，但把两处「教学重点」放大：
 *
 * 1. 轿厢按正常电梯比例（宽:高 ≈ 1:1.6），轿厢高度 = 一层楼高；井道里是 7 层玻璃幕墙， 楼层随电梯上下滚动（坐上到 4 楼也还没到顶，符合常识）。
 * 2. 秤画成扁平的三维电子平台秤（不是立式柜子），前面板几乎全是读数窗， 红字直接显示视频里的原样数字（kg 口径），秤上放一只深色小盒子。
 *
 * 交互：点「上升」「下降」开始；**点击场景（轿厢）暂停 / 再点继续**，暂停时显示「已暂停」角标。
 */
const TOTAL_FLOORS = 7;
/** 一层楼高（px）= 轿厢高：轿厢始终与一层楼等高 */
const FLOOR_HEIGHT = 310;
/** 井道里重复绘制的玻璃幕墙段数（一层一段，首尾多铺几段保证滚动无缝） */
const FLOOR_INDEXES = [-2, -1, 0, 1, 2, 3];

const { standalone = false, hidePanel = false } = defineProps<{
  standalone?: boolean;
  hidePanel?: boolean;
}>();

const dir = ref<TripDirection | null>(null);
const paused = ref(false);
const t = ref(0);
const restFloor = ref(1);
let raf = 0;
let last = 0;

const reading = computed(() => (dir.value ? readingAt(t.value, dir.value) : READING_BASE));
const readingText = computed(() => reading.value.toFixed(2));
const floor = computed(() => (dir.value ? floorAt(t.value, dir.value) : restFloor.value));
const floorText = computed(() => `${Math.round(floor.value)}F`);
const statusText = computed(() => (dir.value ? motionLabelAt(t.value, dir.value) : "静止"));

/**
 * 轿厢累计位移（以「层」为单位，向上为正）。 ⛔ 不能用 t / TRIP 线性推进（那是匀速）：位移要由加速度包络积分得到—— 起步加速、中段匀速、到站减速，与示数 12.58 / 11.36
 * / 10.08 的三段严格对应。
 */
const travel = computed(() => {
  const base = restFloor.value - 1;
  if (!dir.value) return base;
  const k = displacementFractionAt(t.value);
  return dir.value === "up" ? base + k * FLOOR_SPAN : base - k * FLOOR_SPAN;
});

/**
 * 井道楼层图案的滚动相位（0 ~ 1 层）。 镜头跟着轿厢，所以**电梯上升时楼板向下滚、下降时楼板向上滚**： floorShift 取正 = translateY
 * 向下（旧版取负号，方向正好做反了）。
 */
const floorShift = computed(() => ((travel.value % 1) + 1) % 1);

const startProcess = (next: TripDirection): void => {
  restFloor.value = next === "down" ? 1 + FLOOR_SPAN : 1;
  dir.value = next;
  paused.value = false;
  t.value = 0;
};

const togglePause = (): void => {
  if (!dir.value) return;
  paused.value = !paused.value;
};

/** 播放倍速：2.4 倍 → 单程约 5.2 s，全程约 11.7 s */
const PLAYBACK_SPEED = 2.4;

const tick = (now: number): void => {
  raf = requestAnimationFrame(tick);
  const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
  last = now;
  if (!dir.value || paused.value) return;
  // 播放速度：模型按「视频里的 28 s 时间轴」设计，但模拟要看得清、
  // 比视频快得多 —— 时间轴上的秒数不变，只是播放时按倍数快进
  t.value = Math.min(TRIP, t.value + dt * PLAYBACK_SPEED);
  if (t.value >= TRIP) {
    restFloor.value = dir.value === "up" ? 1 + FLOOR_SPAN : 1;
    dir.value = null;
    paused.value = false;
    t.value = 0;
  }
};

onMounted(() => {
  raf = requestAnimationFrame(tick);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
});
</script>

<template>
  <div class="es" :class="{ 'is-standalone': standalone, 'is-compact': hidePanel }">
    <div class="es-left">
      <div class="es-stage" @click.stop="togglePause">
        <!-- 井道顶部：曳引滑轮 -->
        <svg class="es-machinery" viewBox="0 0 320 64" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="18"
            y1="14"
            x2="302"
            y2="14"
            stroke="var(--c-border)"
            stroke-width="3"
            stroke-linecap="round"
          />
          <line
            x1="34"
            y1="20"
            x2="286"
            y2="20"
            stroke="var(--c-border)"
            stroke-width="1.4"
            stroke-dasharray="6 4"
            opacity="0.55"
          />
          <path
            d="M 148 14 L 152 32 L 168 32 L 172 14 Z"
            fill="none"
            stroke="var(--c-border)"
            stroke-width="2"
          />
          <g :transform="`rotate(${travel * 90} 160 36)`">
            <circle
              cx="160"
              cy="36"
              r="16"
              fill="none"
              stroke="var(--c-text-dim)"
              stroke-width="2"
            />
            <circle
              cx="160"
              cy="36"
              r="12.5"
              fill="none"
              stroke="var(--c-border)"
              stroke-width="1"
              stroke-dasharray="3 3"
            />
            <line x1="144" y1="36" x2="176" y2="36" stroke="var(--c-border)" stroke-width="1.2" />
            <line x1="160" y1="20" x2="160" y2="52" stroke="var(--c-border)" stroke-width="1.2" />
            <circle cx="160" cy="36" r="3.2" fill="var(--c-accent)" />
          </g>
        </svg>

        <!-- 曳引钢缆：顶部滑轮到轿顶吊头 -->
        <div class="es-cables">
          <div class="es-cable es-cable-l" />
          <div class="es-cable es-cable-m" />
          <div class="es-cable es-cable-r" />
        </div>

        <!-- 两侧井道墙：7 层玻璃幕墙，随电梯上下滚动 -->
        <div class="es-wall es-wall-l">
          <div
            class="es-floors"
            :style="{ transform: `translateY(${floorShift * FLOOR_HEIGHT - 7}px)` }"
          >
            <div
              v-for="index in FLOOR_INDEXES"
              :key="`l-${index}`"
              class="es-floor"
              :style="{ bottom: `${index * FLOOR_HEIGHT}px` }"
            >
              <div class="es-glass">
                <div class="es-mullion" />
              </div>
              <div class="es-slab" />
            </div>
          </div>
        </div>
        <div class="es-wall es-wall-r">
          <div
            class="es-floors"
            :style="{ transform: `translateY(${floorShift * FLOOR_HEIGHT - 7}px)` }"
          >
            <div
              v-for="index in FLOOR_INDEXES"
              :key="`r-${index}`"
              class="es-floor"
              :style="{ bottom: `${index * FLOOR_HEIGHT}px` }"
            >
              <div class="es-glass">
                <div class="es-mullion" />
              </div>
              <div class="es-slab" />
            </div>
          </div>
        </div>

        <!-- 井道导轨 -->
        <div class="es-rail es-rail-l" />
        <div class="es-rail es-rail-r" />

        <!-- 轿厢：宽 200 × 高 310（≈ 1 : 1.55，正常电梯比例，轿厢高度 = 一层楼高） -->
        <div class="es-cabin">
          <div class="es-hitch">
            <div class="es-hitch-anchor" />
          </div>
          <div class="es-light" />
          <div class="es-floor-badge">{{ floorText }}</div>
          <div class="es-back-glow" />
          <div class="es-handrail" />

          <!-- 电子平台秤 + 秤上的小盒子（正视 + 略俯视：只画正面与顶面，整体左右对称居中） -->
          <svg class="es-scale" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient :id="uid + '-esBodyGrad'" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#6a7180" />
                <stop offset="55%" stop-color="#4b5260" />
                <stop offset="100%" stop-color="#31363f" />
              </linearGradient>
              <linearGradient :id="uid + '-esPlateGrad'" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#7c8493" />
                <stop offset="60%" stop-color="#5a616f" />
                <stop offset="100%" stop-color="#3f4551" />
              </linearGradient>
              <linearGradient :id="uid + '-esBoxFront'" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#8e96a6" />
                <stop offset="100%" stop-color="#5d6472" />
              </linearGradient>
              <linearGradient :id="uid + '-esBoxTop'" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#b8bfca" />
                <stop offset="100%" stop-color="#8f97a6" />
              </linearGradient>
              <filter :id="uid + '-esGlow'" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <!-- 表身顶面（和秤盘同一倾角、同一进深的平行面） -->
            <polygon
              points="10,60 150,60 141,50 19,50"
              fill="#4a515e"
              stroke="#8a929f"
              stroke-width="0.8"
            />
            <!-- 表身正面：顶边直角，只把下两角磨圆 -->
            <path
              d="M 10 60 H 150 V 88 A 5 5 0 0 1 145 93 H 15 A 5 5 0 0 1 10 88 Z"
              :fill="'url(#' + uid + '-esBodyGrad)'"
              stroke="#7b8393"
              stroke-width="1"
            />
            <!-- 藏在托盘前沿后面的两小截弹簧：只露出一小段 -->
            <path
              d="M 58 46 l 10 2.4 l -10 2.4 l 10 2.4 l -10 2.4 l 10 2.4"
              fill="none"
              stroke="#9aa3b2"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M 92 46 l 10 2.4 l -10 2.4 l 10 2.4 l -10 2.4 l 10 2.4"
              fill="none"
              stroke="#9aa3b2"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <!-- 秤盘：顶面（平行面）+ 前沿厚度；缝隙高度≈盘厚 -->
            <rect
              x="6"
              y="45"
              width="148"
              height="5"
              fill="#343a45"
              stroke="#8a929f"
              stroke-width="0.7"
            />
            <polygon
              points="6,45 154,45 145,35 15,35"
              :fill="'url(#' + uid + '-esPlateGrad)'"
              stroke="#aab2c0"
              stroke-width="0.7"
            />
            <line
              x1="22"
              y1="43.4"
              x2="138"
              y2="37.4"
              stroke="#aab2c0"
              stroke-width="0.9"
              opacity="0.45"
              stroke-linecap="round"
            />

            <!-- 读数窗：撑满正面，数字居中 -->
            <rect
              x="24"
              y="64"
              width="112"
              height="25"
              rx="2.5"
              fill="#07080c"
              stroke="rgba(248,113,113,0.42)"
              stroke-width="1.1"
            />
            <!-- 七段数码管读数（火柴棍数字） -->
            <ScaleReadout
              :value="readingText"
              :center-x="80"
              :y="65.5"
              :height="23"
              color="#ff5a5a"
              :glow="uid + '-esGlow'"
            />

            <!-- 秤脚 -->
            <rect x="34" y="93" width="20" height="6" rx="2" fill="#3a3f4a" />
            <rect x="106" y="93" width="20" height="6" rx="2" fill="#3a3f4a" />

            <!-- 秤上的物块（接近正方形，不透明、左右居中）：只见正面 + 顶面 -->
            <polygon
              points="62,11 98,11 92,5 68,5"
              :fill="'url(#' + uid + '-esBoxTop)'"
              stroke="#6b7280"
              stroke-width="0.7"
            />
            <rect
              x="62"
              y="11"
              width="36"
              height="30"
              rx="1.5"
              :fill="'url(#' + uid + '-esBoxFront)'"
              stroke="#6b7280"
              stroke-width="0.9"
            />
            <line
              x1="68"
              y1="17.5"
              x2="92"
              y2="17.5"
              stroke="#7c8493"
              stroke-width="1"
              opacity="0.5"
              stroke-linecap="round"
            />
          </svg>

          <div class="es-cabin-base" />
        </div>

        <!-- 暂停角标 -->
        <div v-if="paused" class="es-pause">
          <mdi-pause class="es-pause-icon" />
          <div class="es-pause-main">已暂停</div>
          <div class="es-pause-sub">点击电梯继续</div>
        </div>
      </div>
    </div>

    <div class="es-right">
      <div class="es-buttons">
        <button class="es-btn" :class="{ 'is-active': dir === 'up' }" @click="startProcess('up')">
          <mdi-arrow-up-bold class="es-btn-icon" />
          上升
        </button>
        <button
          class="es-btn"
          :class="{ 'is-active': dir === 'down' }"
          @click="startProcess('down')"
        >
          <mdi-arrow-down-bold class="es-btn-icon" />
          下降
        </button>
      </div>

      <div v-if="!hidePanel" class="es-panel">
        <div class="es-panel-row">
          <span class="es-panel-label">楼层</span>
          <span class="es-panel-value"
            >{{ floorText }}<span class="es-panel-sub"> / {{ TOTAL_FLOORS }}F</span></span
          >
        </div>
        <div class="es-panel-row">
          <span class="es-panel-label">运动状态</span>
          <span class="es-panel-value is-state">{{ statusText }}</span>
        </div>
      </div>

      <div class="es-slot">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.es {
  display: flex;
  flex: 1 1 auto;
  gap: 1.4rem;

  width: 100%;
  min-height: 0;
}

/* ── 左侧井道 ── */
.es.is-standalone {
  justify-content: center;
}

.es-left {
  display: flex;
  flex: 0 0 380px;
  flex-direction: column;
  min-height: 0;
}

/* 独立模式（第 5 页）：左井道定宽 */
.es.is-standalone .es-left {
  flex: 0 0 400px;
}

.es-stage {
  position: relative;

  flex: 1 1 auto;

  overflow: hidden;

  min-height: 300px;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: linear-gradient(180deg, #0b1120, #0a0f1c 55%, #080c17);

  cursor: pointer;
}

.es-machinery {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;

  width: 100%;
  height: 60px;

  pointer-events: none;
}

.es-cables {
  position: absolute;
  top: 44px;
  bottom: 40px;
  left: 50%;
  z-index: 2;

  width: 14px;

  pointer-events: none;

  transform: translateX(-50%);
}

.es-cable {
  position: absolute;
  top: 0;
  bottom: 0;
}

.es-cable-l {
  left: 0;
  width: 1.6px;
  background: var(--c-text-dim);
  opacity: 0.8;
}

.es-cable-m {
  top: 14px;
  left: 50%;

  width: 2px;

  background: var(--c-accent);
  box-shadow: 0 0 4px color-mix(in srgb, var(--c-accent) 40%, transparent);

  transform: translateX(-50%);
}

.es-cable-r {
  right: 0;
  width: 1.6px;
  background: var(--c-text-dim);
  opacity: 0.8;
}

/* 井道墙：每段 = 一层楼的玻璃幕墙（段高 = 轿厢高 = 层高） */
.es-wall {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;

  overflow: hidden;

  width: 90px;
}

.es-wall-l {
  left: 0;
}

.es-wall-r {
  right: 0;
}

.es-floors {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;

  height: 100%;

  transition: none;
}

.es-floor {
  position: absolute;
  right: 0;
  left: 0;
  height: 310px;
}

.es-glass {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;

  height: calc(100% - 9px);
  border-bottom: 1px solid color-mix(in srgb, var(--c-text-dim) 22%, transparent);

  background:
    linear-gradient(
      115deg,
      rgb(96 165 250 / 22%) 0 16%,
      rgb(148 163 184 / 7%) 16% 52%,
      rgb(96 165 250 / 14%) 52% 100%
    ),
    rgb(15 23 42 / 55%);
}

.es-mullion {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;

  width: 1px;

  background: color-mix(in srgb, var(--c-text-dim) 30%, transparent);
}

.es-wall-r .es-mullion {
  left: 50%;
}

.es-slab {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;

  height: 9px;
  border-top: 2px solid #525d72;

  background: linear-gradient(180deg, #3d4658, #232a38);
  box-shadow: 0 2px 6px rgb(0 0 0 / 45%);
}

.es-rail {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 4;

  width: 2.5px;

  background: var(--c-text-dim);

  opacity: 0.65;
}

.es-rail-l {
  left: 89px;
}

.es-rail-r {
  right: 89px;
}

/* ── 轿厢 ── */
.es-cabin {
  position: absolute;
  bottom: 16px;
  left: 50%;
  z-index: 6;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 200px;
  height: 310px;
  padding: 0 6px;
  border: 1.6px solid var(--c-text-dim);
  border-radius: 7px 7px 3px 3px;

  background: linear-gradient(160deg, #1b2230 0%, #141a26 45%, #10151f 100%);
  box-shadow: 0 10px 28px rgb(0 0 0 / 45%);

  transform: translateX(-50%);
}

.es-hitch {
  position: absolute;
  top: -11px;
  left: 50%;

  width: 40px;
  height: 11px;
  border: 1.5px solid var(--c-text-dim);
  border-bottom: none;
  border-radius: 3px 3px 0 0;

  background: var(--c-surface);

  transform: translateX(-50%);
}

.es-hitch-anchor {
  position: absolute;
  top: -4px;
  left: 50%;

  width: 8px;
  height: 4px;
  border-radius: 1px;

  background: var(--c-accent);

  transform: translateX(-50%);
}

.es-light {
  position: absolute;
  top: 8px;
  left: 50%;

  width: 58px;
  height: 3px;
  border-radius: 2px;

  background: var(--c-accent);
  box-shadow: 0 0 10px var(--c-accent);

  opacity: 0.8;

  transform: translateX(-50%);
}

.es-floor-badge {
  position: absolute;
  top: 16px;
  right: 10px;

  padding: 0 0.34rem;
  border: 1px solid color-mix(in srgb, var(--c-accent) 45%, transparent);
  border-radius: 0.3rem;

  background: rgb(8 12 22 / 78%);
  color: var(--c-accent);

  font-weight: 700;
  font-size: 0.82rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  line-height: 1.25;
}

.es-back-glow {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;

  height: 60%;

  background: radial-gradient(ellipse at 50% 100%, rgb(96 165 250 / 10%), transparent 70%);

  pointer-events: none;
}

/* 秤：贴在轿厢底、几乎撑满轿厢宽度 */
.es-scale {
  position: relative;
  z-index: 2;

  width: 100%;
  margin-top: auto;
  margin-bottom: 7px;
}

.es-handrail {
  position: absolute;
  top: 52%;
  left: 14%;

  width: 72%;
  height: 3.5px;
  border-radius: 2px;

  background: linear-gradient(180deg, #7d8798, #4f5765);
  box-shadow: 0 1px 3px rgb(0 0 0 / 45%);

  opacity: 0.9;
}

.es-handrail::before,
.es-handrail::after {
  content: "";

  position: absolute;
  top: 2px;

  width: 3px;
  height: 7px;

  background: #5b6472;
}

.es-handrail::before {
  left: 4px;
}

.es-handrail::after {
  right: 4px;
}

.es-cabin-base {
  position: absolute;
  bottom: -5px;
  left: 50%;

  width: 172px;
  height: 5px;
  border-radius: 0 0 3px 3px;

  background: var(--c-text-dim);

  opacity: 0.7;

  transform: translateX(-50%);
}

/* ── 暂停角标 ── */
.es-pause {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 20;

  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  align-items: center;

  padding: 0.7rem 1.1rem;
  border: 1px solid color-mix(in srgb, var(--c-accent) 55%, transparent);
  border-radius: 0.9rem;

  background: rgb(9 13 26 / 82%);
  color: var(--c-text);

  backdrop-filter: blur(6px);

  transform: translate(-50%, -50%);
}

.es-pause-icon {
  color: var(--c-accent);
  font-size: 1.6rem;
}

.es-pause-main {
  color: var(--c-accent);
  font-weight: 700;
  font-size: 1rem;
}

.es-pause-sub {
  color: var(--c-text-dim);
  font-size: 0.72rem;
}

/* ── 右栏 ── */
.es-right {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 0.9rem;
  justify-content: center;

  min-width: 0;
}

/* 独立模式（第 5 页）：右栏定宽居中；紧凑模式：右栏收紧 */
.es.is-standalone .es-right {
  flex: 0 0 340px;
  justify-content: center;
}

.es.is-compact .es-right {
  gap: 0.6rem;
  justify-content: flex-start;
}

.es-buttons {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
}

.es-btn {
  display: inline-flex;
  flex: 1 1 0;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;

  max-width: 9.5rem;
  padding: 0.62rem 0;
  border: 1px solid var(--c-border);
  border-radius: 0.8rem;

  background: color-mix(in srgb, var(--c-surface) 85%, transparent);
  color: var(--c-text);

  font-weight: 700;
  font-size: 1rem;
  white-space: nowrap;

  cursor: pointer;
}

.es-btn:hover {
  border-color: color-mix(in srgb, var(--c-accent) 55%, transparent);
}

.es-btn.is-active {
  border-color: var(--c-accent);
  background: color-mix(in srgb, var(--c-accent) 14%, transparent);
  color: var(--c-accent);
}

/* 紧凑模式（第 7 页起）：按钮变小 */
.es.is-compact .es-btn {
  padding: 0.45rem 0;
  font-size: 0.92rem;
}

.es-btn-icon {
  font-size: 1.1rem;
}

.es-panel {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  padding: 0.55rem 0.9rem;
  border: 1px solid var(--c-border);
  border-radius: 0.8rem;

  background: rgb(30 41 59 / 38%);
}

.es-panel-row {
  display: flex;
  gap: 0.8rem;
  align-items: baseline;
  justify-content: space-between;
}

.es-panel-label {
  color: var(--c-text-dim);
  font-size: 0.82rem;
}

.es-panel-value {
  color: var(--c-accent);
  font-weight: 700;
  font-size: 1.12rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.es-panel-value.is-state {
  color: var(--c-text);
  font-size: 1rem;
  font-family: inherit;
}

.es-panel-sub {
  color: var(--c-text-dim);
  font-weight: 500;
  font-size: 0.76rem;
}

.es-slot {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;

  min-height: 0;
}

.es-slot:empty {
  display: none;
}
</style>
