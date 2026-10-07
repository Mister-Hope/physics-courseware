<script setup lang="ts">
import { ref } from "vue";

type Mode = "off" | "time" | "interval";

const mode = ref<Mode>("off");

// 本课：7:40 上课、8:20 下课，时间间隔 40 min
const DURATION_MIN = 40;
const STEP_MIN = 5;

/** 轴范围：最大刻度 40 再多留约 10%，末端箭头不会顶在刻度上（见 .agents/notes/coordinate-axes-conventions.md） */
const RANGE: [number, number] = [0, 44];
const VIEW = { width: 640, height: 170 };

/** 装饰层相对轴线的偏移（屏幕 px，插槽里乘 `px2user` 折成 viewBox 单位） */
const LABEL_DROP = 52;
const TIME_RISE = 34;
const TIME_LABEL_LIFT = 50;
const INTERVAL_RISE = 54;
const INTERVAL_LABEL_LIFT = 68;

// 两端的起止时刻：文字从轴端点向里排，免得顶着 viewBox 边缘
const END_LABELS = [
  { value: 0, label: "7 时 40 分", anchor: "start" },
  { value: DURATION_MIN, label: "8 时 20 分", anchor: "end" },
] as const;

// "显示时刻"：两个时刻各画一个点 + 一条虚线 + 文字
const TIME_MARKS = [
  { value: 0, label: "上课时刻", anchor: "start" },
  { value: DURATION_MIN, label: "下课时刻", anchor: "end" },
] as const;

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

    <NumberAxis
      :range="RANGE"
      :axis="{ quantity: 't', unit: 'min' }"
      :ticks="{ step: STEP_MIN }"
      :view="VIEW"
    >
      <!-- 轴上的装饰（时刻的点 / 时间间隔的线段）：按 viewBox 用户单位作图，见 .agents/notes/coordinate-axes-api.md「轴外装饰」 -->
      <template #overlay="{ x, axisY, px2user }">
        <text
          v-for="mark in END_LABELS"
          :key="mark.label"
          :x="x(mark.value)"
          :y="axisY + LABEL_DROP * px2user"
          :text-anchor="mark.anchor"
          :font-size="15 * px2user"
          fill="var(--c-text)"
        >
          {{ mark.label }}
        </text>

        <template v-if="mode === 'time'">
          <template v-for="mark in TIME_MARKS" :key="mark.value">
            <line
              :x1="x(mark.value)"
              :y1="axisY"
              :x2="x(mark.value)"
              :y2="axisY - TIME_RISE * px2user"
              stroke="var(--c-accent)"
              :stroke-width="1.6 * px2user"
              :stroke-dasharray="`${7 * px2user} ${5 * px2user}`"
            />
            <circle
              :cx="x(mark.value)"
              :cy="axisY"
              :r="7 * px2user"
              fill="var(--c-accent)"
              stroke="var(--c-accent-glow)"
              :stroke-width="2 * px2user"
            />
            <text
              :x="x(mark.value)"
              :y="axisY - TIME_LABEL_LIFT * px2user"
              :text-anchor="mark.anchor"
              :font-size="15 * px2user"
              font-weight="700"
              fill="var(--c-accent)"
            >
              {{ mark.label }}
            </text>
          </template>
        </template>

        <template v-else-if="mode === 'interval'">
          <line
            :x1="x(0)"
            :y1="axisY"
            :x2="x(DURATION_MIN)"
            :y2="axisY"
            stroke="var(--c-accent-2)"
            :stroke-width="10 * px2user"
            stroke-linecap="round"
            opacity="0.85"
          />
          <line
            :x1="x(DURATION_MIN / 2)"
            :y1="axisY"
            :x2="x(DURATION_MIN / 2)"
            :y2="axisY - INTERVAL_RISE * px2user"
            stroke="var(--c-accent-2)"
            :stroke-width="1.6 * px2user"
            :stroke-dasharray="`${7 * px2user} ${5 * px2user}`"
          />
          <circle
            v-for="value in [0, DURATION_MIN]"
            :key="value"
            :cx="x(value)"
            :cy="axisY"
            :r="7 * px2user"
            fill="var(--c-accent-2)"
            stroke="var(--c-text)"
            :stroke-width="1.6 * px2user"
          />
          <text
            :x="x(DURATION_MIN / 2)"
            :y="axisY - INTERVAL_LABEL_LIFT * px2user"
            text-anchor="middle"
            :font-size="17 * px2user"
            font-weight="700"
            fill="var(--c-accent-2)"
          >
            <tspan font-family="KaTeX_Main">40 min</tspan>
          </text>
        </template>
      </template>
    </NumberAxis>
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
  gap: 0.8rem;
  align-items: center;
}

.opt-btn {
  padding: 0.35rem 1.1rem;
  border: 1px solid rgb(226 168 70 / 45%);
  border-radius: 2rem;

  background: rgb(226 168 70 / 12%);
  color: #e2a846;

  font-weight: 600;
  font-size: 0.85rem;

  cursor: pointer;

  transition: all 0.25s ease;
}

.opt-btn.alt {
  border-color: rgb(59 130 246 / 45%);
  background: rgb(59 130 246 / 12%);
  color: #60a5fa;
}

.opt-btn:hover {
  filter: brightness(1.15);
  transform: translateY(-1px);
}

.opt-btn.active {
  box-shadow: 0 0 18px rgb(226 168 70 / 25%);
  filter: brightness(1.2);
}

.hint {
  color: #cbd5e1;
  font-size: 0.85rem;
}

.hl {
  color: #e2a846;
  font-weight: 700;
}
</style>
