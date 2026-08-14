<script setup lang="ts">
import { ref } from "vue";

type Mode = "off" | "time" | "interval";

const mode = ref<Mode>("off");

const MIN0 = 60; // 轴起点（8:00）
const MIN45 = 450; // 轴 45min 处（8:45）
const AXIS_Y = 130;

const showTime = (): void => {
  mode.value = mode.value === "time" ? "off" : "time";
};

const showInterval = (): void => {
  mode.value = mode.value === "interval" ? "off" : "interval";
};
</script>

<template>
  <div class="time-wrap">
    <div class="control-bar">
      <button class="opt-btn" type="button" :class="{ active: mode === 'time' }" @click="showTime">
        显示时刻
      </button>
      <button
        class="opt-btn alt"
        type="button"
        :class="{ active: mode === 'interval' }"
        @click="showInterval"
      >
        显示时间间隔
      </button>
      <span v-if="mode === 'time'" class="hint">时刻 → 时间轴上的<span class="hl">点</span></span>
      <span v-else-if="mode === 'interval'" class="hint"
        >时间间隔 → 两点之间的<span class="hl">线段</span></span
      >
    </div>

    <svg viewBox="0 0 640 200" class="time-svg">
      <!-- 时间轴 -->
      <line
        x1="60"
        y1="130"
        x2="580"
        y2="130"
        stroke="#64748b"
        stroke-width="2.5"
        stroke-linecap="round"
      />

      <!-- 刻度（每 5 分钟） -->
      <g stroke="#475569" stroke-width="1.5">
        <line
          v-for="i in 13"
          :key="i"
          :x1="60 + (i - 1) * 43.3"
          :y1="124"
          :x2="60 + (i - 1) * 43.3"
          :y2="136"
        />
      </g>

      <!-- 分钟标签 -->
      <g font-size="12" fill="#94a3b8" text-anchor="middle">
        <text v-for="i in 13" :key="i" :x="60 + (i - 1) * 43.3" y="152">{{ (i - 1) * 5 }}</text>
      </g>

      <text x="60" y="172" text-anchor="middle" font-size="13" fill="#cbd5e1">8 时</text>
      <text x="450" y="172" text-anchor="middle" font-size="13" fill="#cbd5e1">8 时 45 分</text>
      <text x="580" y="188" text-anchor="end" font-size="13" fill="#94a3b8">
        <tspan font-style="italic">t</tspan>
        / min
      </text>

      <!-- 时刻：点 -->
      <g v-if="mode === 'time'">
        <circle cx="60" cy="130" r="7" fill="#e2a846" stroke="#fbbf24" stroke-width="2" />
        <circle cx="450" cy="130" r="7" fill="#e2a846" stroke="#fbbf24" stroke-width="2" />
        <line
          x1="60"
          y1="130"
          x2="60"
          y2="100"
          stroke="#e2a846"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />
        <line
          x1="450"
          y1="130"
          x2="450"
          y2="100"
          stroke="#e2a846"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />
        <text x="60" y="88" text-anchor="middle" font-size="13" font-weight="700" fill="#e2a846">
          上课时刻
        </text>
        <text x="450" y="88" text-anchor="middle" font-size="13" font-weight="700" fill="#e2a846">
          下课时刻
        </text>
      </g>

      <!-- 时间间隔：线段 -->
      <g v-if="mode === 'interval'">
        <line
          x1="60"
          y1="130"
          x2="450"
          y2="130"
          stroke="#3b82f6"
          stroke-width="10"
          stroke-linecap="round"
          opacity="0.85"
        />
        <circle cx="60" cy="130" r="7" fill="#60a5fa" stroke="#93c5fd" stroke-width="2" />
        <circle cx="450" cy="130" r="7" fill="#60a5fa" stroke="#93c5fd" stroke-width="2" />
        <line
          x1="255"
          y1="130"
          x2="255"
          y2="82"
          stroke="#3b82f6"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />
        <text x="255" y="70" text-anchor="middle" font-size="15" font-weight="700" fill="#60a5fa">
          45 min
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.time-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.control-bar {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.opt-btn {
  font-size: 0.85rem;
  padding: 0.35rem 1.1rem;
  border-radius: 2rem;
  border: 1px solid rgba(226, 168, 70, 0.45);
  background: rgba(226, 168, 70, 0.12);
  color: #e2a846;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.opt-btn.alt {
  border-color: rgba(59, 130, 246, 0.45);
  background: rgba(59, 130, 246, 0.12);
  color: #60a5fa;
}

.opt-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.15);
}

.opt-btn.active {
  box-shadow: 0 0 18px rgba(226, 168, 70, 0.25);
  filter: brightness(1.2);
}

.hint {
  font-size: 0.85rem;
  color: #cbd5e1;
}

.hl {
  color: #e2a846;
  font-weight: 700;
}

.time-svg {
  width: 100%;
  height: auto;
  border-radius: 1.25rem;
  border: 1px solid rgba(148, 163, 184, 0.1);
  background: rgba(15, 20, 37, 0.4);
}

.time-svg text {
  font-family: "Times New Roman", "STIX Two Text", "Source Serif 4", Georgia, serif;
}
</style>
