<template>
  <!-- 摆长、重力加速度可调的单摆：周期由 T=2π√(l/g) 真实计算，摆的动画周期与读数一致 -->
  <div class="sp-lab">
    <div class="sp-lab-fig">
      <svg
        viewBox="0 0 300 300"
        width="300"
        height="300"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="单摆周期演示"
      >
        <path
          d="M70 26 H230 M78 26 L71 19 M102 26 L95 19 M126 26 L119 19 M150 26 L143 19 M174 26 L167 19 M198 26 L191 19 M222 26 L215 19"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.3"
          stroke-linecap="round"
          stroke-opacity=".4"
        />
        <line
          x1="70"
          y1="26"
          x2="230"
          y2="26"
          stroke="var(--c-text-dim)"
          stroke-width="3"
          stroke-linecap="round"
        />
        <line
          x1="150"
          y1="26"
          x2="150"
          y2="294"
          stroke="var(--c-text-dim)"
          stroke-width="1.3"
          stroke-dasharray="5 7"
          stroke-opacity=".35"
        />
        <g class="sp-swing" :style="{ animationDuration: `${period}s` }">
          <line
            x1="150"
            y1="26"
            x2="150"
            :y2="26 + stringLength"
            stroke="var(--c-accent)"
            stroke-width="2.2"
            stroke-linecap="round"
          />
          <circle
            cx="150"
            :cy="26 + stringLength"
            r="11"
            fill="var(--c-accent)"
            fill-opacity=".26"
            stroke="var(--c-accent)"
            stroke-width="2"
          />
        </g>
        <circle cx="150" cy="26" r="4.5" fill="var(--c-text-dim)" />
      </svg>
      <div class="sp-lab-cap">摆角 <Latex tex="\pm 5^{\circ}" />（小角度）</div>
    </div>
    <div class="sp-lab-panel">
      <CourseSlider
        v-model="length"
        :min="0.2"
        :max="1.5"
        :step="0.01"
        label="摆长"
        label-tex="l"
        label-width="5.5rem"
        accent="gold"
      >
        <template #value>{{ length.toFixed(2) }}<Latex tex="\text{ m}" /></template>
      </CourseSlider>
      <div class="sp-g">
        <span class="sp-g-label">重力加速度</span>
        <button
          v-for="item in planets"
          :key="item.name"
          type="button"
          class="sp-g-btn"
          :class="{ 'is-active': g === item.value }"
          @click="g = item.value"
        >
          {{ item.name }}
        </button>
        <span class="sp-g-value"
          ><Latex tex="g" /> = {{ g.toFixed(1) }}<Latex tex="\text{ m/s}^2"
        /></span>
      </div>
      <div class="sp-readout">
        <span class="sp-readout-label">周期</span>
        <span class="sp-readout-value"
          ><Latex tex="T" /> = {{ periodText }}<Latex tex="\text{ s}"
        /></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const length = ref<number>(1);
const g = ref<number>(9.8);

const planets = [
  { name: "地球", value: 9.8 },
  { name: "月球", value: 1.6 },
  { name: "火星", value: 3.7 },
];

const period = computed<number>(() => 2 * Math.PI * Math.sqrt(length.value / g.value));
const periodText = computed<string>(() => period.value.toFixed(2));
/** 摆线的示意长度：只随摆长做视觉映射，不参与公式计算 */
const stringLength = computed<number>(() => 80 + ((length.value - 0.2) / 1.3) * 140);
</script>

<style scoped>
.sp-lab {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 2.2rem;
  align-items: center;
}

.sp-lab-fig {
  width: 300px;
}

.sp-lab-cap {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--c-text-dim);
  text-align: center;
}

.sp-swing {
  transform-box: view-box;
  transform-origin: 150px 26px;
  animation: sp-swing 2s ease-in-out infinite;
}

@keyframes sp-swing {
  0% {
    transform: rotate(-5deg);
  }

  50% {
    transform: rotate(5deg);
  }

  100% {
    transform: rotate(-5deg);
  }
}

.sp-lab-panel {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-width: 0;
}

.sp-g {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sp-g-label {
  font-size: 0.8rem;
  color: var(--c-text-dim);
  white-space: nowrap;
}

.sp-g-btn {
  padding: 0.18rem 0.65rem;
  font-family: inherit;
  font-size: 0.8rem;
  color: var(--c-text-dim);
  cursor: pointer;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  transition:
    color 0.15s,
    background 0.15s,
    border-color 0.15s;
}

.sp-g-btn.is-active {
  font-weight: 700;
  color: var(--c-bg);
  background: var(--c-accent);
  border-color: var(--c-accent);
}

.sp-g-value {
  margin-left: auto;
  font-size: 0.8rem;
  color: var(--c-text-dim);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.sp-readout {
  display: flex;
  gap: 0.7rem;
  align-items: baseline;
  padding: 0.35rem 0.8rem;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
}

.sp-readout-label {
  font-size: 0.78rem;
  color: var(--c-text-dim);
}

.sp-readout-value {
  min-width: 8.5rem;
  font-size: 1.05rem;
  font-variant-numeric: tabular-nums;
}
</style>
