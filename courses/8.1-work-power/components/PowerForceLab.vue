<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 11 页交互：发动机以额定功率 P = 60 kW 工作（教材例题 2 的数据）。 拖动速度 v，由 P = Fv 反解 F = P/v
 * 真实计算牵引力——输出功率一定时，牵引力与速度成反比。
 */
/** 额定功率 P = 60 kW */
const P = 60_000;

/** 汽车速度（m/s） */
const speed = ref(20);

/** 牵引力 F = P / v，真实公式计算（N） */
const force = computed(() => P / speed.value);
const fText = computed(() => force.value.toFixed(0));
/** 牵引箭头长度：按力的大小线性缩放（6000 N 对应 150 用户单位） */
const fLen = computed(() => Math.min(200, (force.value / 6000) * 150));
const fTip = computed(() => ({ x: 239 + fLen.value, y: 166 }));
</script>

<template>
  <div class="pfl">
    <svg
      viewBox="0 0 480 250"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="汽车以额定功率行驶，牵引力随速度变化"
    >
      <SurfaceHatch
        :from="{ x: 16, y: 204 }"
        :to="{ x: 464, y: 204 }"
        side="below"
        :thickness="14"
        :gap="23"
      />
      <path
        d="M 192 142 L 208 112 L 266 112 L 282 142 Z"
        fill="var(--c-surface-solid)"
        stroke="var(--c-velocity)"
        stroke-width="2.2"
        stroke-linejoin="round"
      />
      <path
        d="M 200 138 L 213 119 L 238 119 L 238 138 Z"
        fill="var(--c-velocity)"
        fill-opacity="0.35"
      />
      <path
        d="M 244 119 L 262 119 L 274 138 L 244 138 Z"
        fill="var(--c-velocity)"
        fill-opacity="0.35"
      />
      <rect
        x="146"
        y="142"
        width="186"
        height="44"
        rx="11"
        fill="var(--c-surface-solid)"
        stroke="var(--c-velocity)"
        stroke-width="2.4"
      />
      <circle
        cx="188"
        cy="192"
        r="17"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text-dim)"
        stroke-width="2.4"
      />
      <circle cx="188" cy="192" r="6" fill="var(--c-text-dim)" />
      <circle
        cx="292"
        cy="192"
        r="17"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text-dim)"
        stroke-width="2.4"
      />
      <circle cx="292" cy="192" r="6" fill="var(--c-text-dim)" />
      <CourseArrow
        :from="{ x: 250, y: 84 }"
        :to="{ x: 340, y: 84 }"
        stroke="var(--c-velocity)"
        :stroke-width="2.8"
        label="v"
        :label-dy="-11"
      />
      <CourseArrow
        :from="{ x: 239, y: 166 }"
        :to="{ x: 151, y: 166 }"
        stroke="var(--c-force)"
        :stroke-width="3"
      />
      <text x="176" y="152" font-size="18" fill="var(--c-force)" class="pfl-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="13" dy="5">阻</tspan>
      </text>
      <CourseArrow
        :from="{ x: 239, y: 166 }"
        :to="fTip"
        stroke="var(--c-accent)"
        :stroke-width="3.4"
      />
      <text
        :x="fTip.x + 10"
        :y="172"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="var(--c-accent)"
        class="pfl-lbl"
      >
        F
      </text>
    </svg>
    <div class="pfl-panel">
      <div class="pfl-const"><Latex tex="P = 60\ \text{kW}" />（额定功率）</div>
      <CourseSlider
        v-model="speed"
        :min="10"
        :max="60"
        :step="1"
        label="速度"
        label-tex="v"
        label-width="4.6rem"
        accent="blue"
      >
        <template #value>{{ speed }}<Latex tex="\ \text{m/s}" /></template>
      </CourseSlider>
      <div class="pfl-out">
        <Latex tex="F = \dfrac{P}{v}" /> = <b class="pfl-num">{{ fText }}</b>
        <Latex tex="\text{N}" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pfl {
  display: flex;
  gap: 1.4rem;
  align-items: center;
  justify-content: center;

  width: 100%;
}

.pfl svg {
  display: block;
  flex: 0 0 56%;
  width: 100%;
}

.pfl-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.6rem;

  min-width: 0;

  font-size: 0.95rem;
}

.pfl-const {
  color: var(--c-text-dim);
}

.pfl-out {
  padding-top: 0.35rem;
  border-top: 1px solid var(--c-border);
  font-size: 1.05rem;
}

.pfl-num {
  color: var(--c-accent);
  font-size: 1.2rem;
}

.pfl-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
