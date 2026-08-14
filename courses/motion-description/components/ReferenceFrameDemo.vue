<script setup lang="ts">
import { ref, onUnmounted } from "vue";

const frame = ref<"ground" | "train">("ground");
const offset = ref(0);

let timer: ReturnType<typeof setInterval> | null = null;

const START = 40; // 地面系下列车起始 x
const TRAIN_SPAN = 300; // 列车移动范围（循环）
const TRAIN_X = 172; // 车厢系下列车固定位置（3 节居中）

const toggle = (): void => {
  frame.value = frame.value === "ground" ? "train" : "ground";
  offset.value = 0;
};

const start = (): void => {
  if (timer) return;
  timer = setInterval(() => {
    offset.value = (offset.value + 2.2) % TRAIN_SPAN;
  }, 33);
};

const stop = (): void => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

// 列车：地面系向右行驶、车厢系固定
const trainX = (): number => (frame.value === "ground" ? START + offset.value : TRAIN_X);

// 窗外景物（地面砖、枕木、电线杆、树、观察者）：地面系静止、车厢系向左后退
const sceneryShift = (): number => (frame.value === "ground" ? 0 : -offset.value);
const groundOffset = (): number => sceneryShift();
const tieOffset = (): number => sceneryShift();
const treeX = (): number => 95 + sceneryShift();
const poleX = (): number => 480 + sceneryShift();
const observerX = (): number => 545 + sceneryShift();

// 地面砖竖线（间隔 40，覆盖全屏及移动余量）
const brickXs = Array.from({ length: 18 }, (_, i) => i * 40 - 20);
// 枕木（间隔 60）
const ties = Array.from({ length: 12 }, (_, i) => i * 60 - 10);

start();

onUnmounted(stop);
</script>

<template>
  <div class="demo-wrap">
    <div class="demo-header">
      <div class="frame-state">
        <span class="frame-dot" :class="frame" />
        <span>参考系：{{ frame === "ground" ? "地面" : "车厢" }}</span>
        <span class="passenger-state" :class="frame">
          · 乘客{{ frame === "ground" ? "随车运动" : "静止" }}
        </span>
      </div>
      <button class="switch-btn" type="button" @click="toggle">
        <svg class="btn-icon" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <path
            d="M7.4 8.6 4 12l3.4 3.4M4 12h16"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        切换参考系
      </button>
    </div>

    <svg viewBox="0 0 640 300" class="demo-svg">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0d1226" />
          <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>
      </defs>

      <!-- 天空（渐变）+ 云 -->
      <rect x="0" y="0" width="640" height="205" fill="url(#skyGrad)" />
      <g fill="rgba(148,163,184,0.12)">
        <ellipse cx="120" cy="58" rx="60" ry="13" />
        <ellipse cx="430" cy="92" rx="72" ry="15" />
        <ellipse cx="565" cy="42" rx="42" ry="9" />
      </g>

      <!-- 地面（砖纹理，车厢系下后退） -->
      <rect x="0" y="205" width="640" height="95" fill="#1a2333" />
      <g :transform="`translate(${groundOffset()}, 0)`">
        <line
          v-for="x in brickXs"
          :key="x"
          :x1="x"
          y1="205"
          :x2="x"
          y2="300"
          stroke="#26344b"
          stroke-width="2"
        />
      </g>

      <!-- 铁轨 + 枕木（枕木车厢系下后退） -->
      <line x1="0" y1="222" x2="640" y2="222" stroke="#475569" stroke-width="3" />
      <line x1="0" y1="242" x2="640" y2="242" stroke="#475569" stroke-width="3" />
      <g :transform="`translate(${tieOffset()}, 0)`">
        <rect
          v-for="t in ties"
          :key="t"
          :x="t"
          y="216"
          width="12"
          height="32"
          rx="2"
          fill="#334155"
        />
      </g>

      <!-- 电线杆（窗外景物） -->
      <g :transform="`translate(${poleX()}, 0)`">
        <rect x="-4" y="146" width="8" height="60" rx="2" fill="#475569" />
        <line x1="-3" y1="152" x2="-34" y2="152" stroke="#475569" stroke-width="2" />
        <line x1="3" y1="158" x2="34" y2="158" stroke="#475569" stroke-width="2" />
      </g>

      <!-- 树（窗外景物，树干底部触地，地面顶部 y=205） -->
      <g :transform="`translate(${treeX()}, 0)`">
        <rect x="-7" y="186" width="14" height="20" rx="3" fill="#7c4a24" />
        <circle cx="0" cy="168" r="18" fill="#166534" opacity="0.85" />
        <circle cx="-13" cy="180" r="11" fill="#15803d" opacity="0.7" />
        <circle cx="13" cy="180" r="11" fill="#15803d" opacity="0.7" />
      </g>

      <!-- 多节列车（3 节车厢，随参考系运动） -->
      <g :transform="`translate(${trainX()}, 0)`">
        <!-- 车厢 1 -->
        <g>
          <rect
            x="0"
            y="116"
            width="96"
            height="84"
            rx="9"
            fill="rgba(59,130,246,0.26)"
            stroke="#3b82f6"
            stroke-width="2"
          />
          <rect
            x="12"
            y="134"
            width="30"
            height="28"
            rx="5"
            fill="rgba(15,20,37,0.6)"
            stroke="rgba(148,163,184,0.4)"
          />
          <rect
            x="54"
            y="134"
            width="30"
            height="28"
            rx="5"
            fill="rgba(15,20,37,0.6)"
            stroke="rgba(148,163,184,0.4)"
          />
          <circle cx="22" cy="212" r="9" fill="#1e293b" stroke="#94a3b8" stroke-width="2" />
          <circle cx="74" cy="212" r="9" fill="#1e293b" stroke="#94a3b8" stroke-width="2" />
        </g>
        <!-- 车厢 2（乘客） -->
        <g>
          <rect
            x="100"
            y="116"
            width="96"
            height="84"
            rx="9"
            fill="rgba(59,130,246,0.26)"
            stroke="#3b82f6"
            stroke-width="2"
          />
          <rect
            x="112"
            y="134"
            width="30"
            height="28"
            rx="5"
            fill="rgba(15,20,37,0.6)"
            stroke="rgba(148,163,184,0.4)"
          />
          <rect
            x="154"
            y="134"
            width="30"
            height="28"
            rx="5"
            fill="rgba(15,20,37,0.6)"
            stroke="rgba(148,163,184,0.4)"
          />
          <g transform="translate(127, 0)">
            <circle cx="0" cy="146" r="7" fill="#f1f5f9" />
            <rect x="-7" y="153" width="14" height="18" rx="5" fill="#e2a846" />
          </g>
          <circle cx="122" cy="212" r="9" fill="#1e293b" stroke="#94a3b8" stroke-width="2" />
          <circle cx="174" cy="212" r="9" fill="#1e293b" stroke="#94a3b8" stroke-width="2" />
        </g>
        <!-- 车厢 3 -->
        <g>
          <rect
            x="200"
            y="116"
            width="96"
            height="84"
            rx="9"
            fill="rgba(59,130,246,0.26)"
            stroke="#3b82f6"
            stroke-width="2"
          />
          <rect
            x="212"
            y="134"
            width="30"
            height="28"
            rx="5"
            fill="rgba(15,20,37,0.6)"
            stroke="rgba(148,163,184,0.4)"
          />
          <rect
            x="254"
            y="134"
            width="30"
            height="28"
            rx="5"
            fill="rgba(15,20,37,0.6)"
            stroke="rgba(148,163,184,0.4)"
          />
          <circle cx="222" cy="212" r="9" fill="#1e293b" stroke="#94a3b8" stroke-width="2" />
          <circle cx="274" cy="212" r="9" fill="#1e293b" stroke="#94a3b8" stroke-width="2" />
        </g>
        <!-- 车顶受电弓 -->
        <rect x="8" y="110" width="18" height="6" rx="2" fill="#3b82f6" opacity="0.7" />
        <rect x="188" y="110" width="18" height="6" rx="2" fill="#3b82f6" opacity="0.7" />
      </g>

      <!-- 乘客状态标注 -->
      <g :transform="`translate(${trainX() + 127}, 0)`">
        <line
          x1="0"
          y1="116"
          x2="0"
          y2="100"
          stroke="#94a3b8"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />
        <text x="0" y="94" text-anchor="middle" font-size="13" fill="#f1f5f9">乘客</text>
      </g>

      <!-- 地面观察者（完整小人，随窗外景物后退） -->
      <g :transform="`translate(${observerX()}, 0)`">
        <circle cx="0" cy="248" r="7" fill="#f1f5f9" />
        <rect x="-6" y="255" width="12" height="14" rx="4" fill="#3b82f6" />
        <rect x="-7" y="269" width="5" height="11" rx="2" fill="#1e293b" />
        <rect x="2" y="269" width="5" height="11" rx="2" fill="#1e293b" />
      </g>
      <text :x="observerX()" y="296" text-anchor="middle" font-size="12" fill="#94a3b8">
        地面观察者
      </text>

      <!-- 参考系说明 -->
      <text
        x="320"
        y="24"
        text-anchor="middle"
        font-size="15"
        font-weight="700"
        :fill="frame === 'ground' ? '#e2a846' : '#60a5fa'"
      >
        {{ frame === "ground" ? "以地面为参考系" : "以车厢为参考系" }}
      </text>
      <text x="320" y="46" text-anchor="middle" font-size="13" fill="#94a3b8">
        {{
          frame === "ground"
            ? "列车向右行驶，窗外景物（树、电线杆、枕木）静止"
            : "列车静止，窗外景物（树、电线杆、枕木、地面）向左后退"
        }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.demo-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.demo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.frame-state {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #cbd5e1;
}

.frame-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: #e2a846;
  box-shadow: 0 0 8px rgba(226, 168, 70, 0.6);
  flex-shrink: 0;
}

.frame-dot.train {
  background: #60a5fa;
  box-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
}

.passenger-state {
  color: #94a3b8;
}

.passenger-state.ground {
  color: #e2a846;
}

.passenger-state.train {
  color: #60a5fa;
}

.switch-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.4rem 1.1rem;
  border-radius: 2rem;
  border: 1px solid rgba(226, 168, 70, 0.5);
  background: linear-gradient(135deg, rgba(226, 168, 70, 0.22), rgba(226, 168, 70, 0.08));
  color: #e2a846;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 10px rgba(226, 168, 70, 0.12);
}

.switch-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.15);
  box-shadow: 0 4px 14px rgba(226, 168, 70, 0.22);
}

.btn-icon {
  display: block;
  flex-shrink: 0;
}

.demo-svg {
  width: 100%;
  height: auto;
  border-radius: 1.25rem;
  border: 1px solid rgba(148, 163, 184, 0.1);
  background: rgba(15, 20, 37, 0.4);
}
</style>
