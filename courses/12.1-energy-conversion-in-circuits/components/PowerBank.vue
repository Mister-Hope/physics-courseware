<script setup lang="ts">
import { ref, computed } from "vue";

/** 充电宝：铭牌毫安时是电荷量（容量），能量 = 电动势 × 电荷量 = E·Q 拖动容量与电动势，实时换算出 Q（库仑）、W（焦耳）、W（瓦时），并对照民航 160 Wh 限额。 */
const C = ref(10000); // 容量 mAh
const E = ref(3.7); // 电动势 V

/* Q = (C / 1000) A × 3600 s */
const Q = computed(() => (C.value / 1000) * 3600);
/* W = E·Q（J） */
const Wj = computed(() => E.value * Q.value);
/* W = E × C/1000（Wh） */
const Wh = computed(() => (E.value * C.value) / 1000);
const allowed = computed(() => Wh.value <= 160);

const qTex = computed(
  () =>
    `Q = \\dfrac{C}{1000}\\,\\text{A} \\times 3600\\,\\text{s} = ${Q.value.toLocaleString("en-US")}\\,\\text{C}`,
);
const wjTex = computed(() => `W = E \\cdot Q = ${Wj.value.toLocaleString("en-US")}\\,\\text{J}`);
const whTex = computed(
  () => `W = E \\cdot \\dfrac{C}{1000}\\,\\text{A·h} = ${Wh.value.toFixed(1)}\\,\\text{Wh}`,
);

const sliders = computed(() => [
  {
    key: "C",
    text: "容量",
    labelTex: "C",
    value: C.value,
    min: 1000,
    max: 30000,
    step: 500,
    unitTex: "\\text{mAh}",
    color: "#e2a846",
  },
  {
    key: "E",
    text: "电动势",
    labelTex: "E",
    value: E.value,
    min: 1.2,
    max: 20,
    step: 0.1,
    unitTex: "\\text{V}",
    color: "#60a5fa",
  },
]);
const valTex = (s: { value: number; unitTex: string }): string => `${s.value}\\ ${s.unitTex}`;
const setSlider = (key: string, v: string): void => {
  const n = Number(v);
  if (key === "C") C.value = n;
  else E.value = n;
};
</script>

<template>
  <div class="pb-wrap">
    <!-- 充电宝 + 手机示意 -->
    <div class="pb-fig">
      <svg viewBox="0 0 520 280" class="pb-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- 充电线 -->
        <path
          d="M 130 65 C 120 14 392 14 365 238"
          fill="none"
          stroke="#64748b"
          stroke-width="3"
          stroke-linecap="round"
        />
        <path
          d="M 130 65 C 120 14 392 14 367 238"
          fill="none"
          stroke="#64748b"
          stroke-width="1"
          stroke-linecap="round"
          opacity="0.5"
        />
        <!-- 充电宝本体 -->
        <rect
          x="55"
          y="65"
          width="150"
          height="185"
          rx="22"
          fill="rgba(226,168,70,0.1)"
          stroke="#e2a846"
          stroke-width="3"
        />
        <rect
          x="75"
          y="85"
          width="110"
          height="64"
          rx="10"
          fill="#0f172a"
          stroke="#64748b"
          stroke-width="1.6"
        />
        <text
          x="130"
          y="112"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="23"
          font-weight="800"
          fill="#e2a846"
        >
          {{ C.toLocaleString("en-US") }} mAh
        </text>
        <text
          x="130"
          y="138"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="18"
          font-weight="700"
          fill="#60a5fa"
        >
          {{ E.toFixed(1) }} V
        </text>
        <!-- 闪电 -->
        <polygon points="133,168 122,187 128,187 121,206 140,185 133,185 135,168" fill="#e2a846" />
        <!-- USB 口 -->
        <rect
          x="188"
          y="222"
          width="15"
          height="9"
          rx="2"
          fill="#0f172a"
          stroke="#64748b"
          stroke-width="1.6"
        />
        <!-- 手机 -->
        <rect
          x="310"
          y="70"
          width="110"
          height="190"
          rx="14"
          fill="rgba(96,165,250,0.08)"
          stroke="#64748b"
          stroke-width="2.6"
        />
        <line
          x1="352"
          y1="82"
          x2="378"
          y2="82"
          stroke="#64748b"
          stroke-width="2.4"
          stroke-linecap="round"
        />
        <rect
          x="320"
          y="94"
          width="90"
          height="150"
          rx="8"
          fill="#0f172a"
          stroke="rgba(100,116,139,0.6)"
          stroke-width="1.2"
        />
        <circle
          cx="365"
          cy="166"
          r="7"
          fill="none"
          stroke="#60a5fa"
          stroke-width="1.6"
          opacity="0.7"
        />
        <text x="130" y="272" text-anchor="middle" font-size="13" fill="#94a3b8">充电宝</text>
        <text x="365" y="272" text-anchor="middle" font-size="13" fill="#94a3b8">手机</text>
      </svg>
    </div>

    <!-- 控制与读数 -->
    <div class="pb-panel">
      <div class="pb-sliders">
        <div v-for="s in sliders" :key="s.key" class="pb-slider">
          <div class="pb-slider-head">
            <span class="pb-slider-name" :style="{ color: s.color }"
              >{{ s.text }} <Latex :tex="s.labelTex"
            /></span>
            <span class="pb-slider-val" :style="{ color: s.color }"
              ><Latex :tex="valTex(s)"
            /></span>
          </div>
          <input
            type="range"
            :min="s.min"
            :max="s.max"
            :step="s.step"
            :value="s.value"
            @input="setSlider(s.key, ($event.target as HTMLInputElement).value)"
            class="pb-range"
            :style="{ accentColor: s.color }"
          />
        </div>
      </div>

      <div class="pb-reads">
        <div class="pb-line"><Latex :tex="qTex" /></div>
        <div class="pb-line"><Latex :tex="wjTex" /></div>
        <div class="pb-line pb-line-wh"><Latex :tex="whTex" /></div>
      </div>

      <div class="pb-verdict" :class="allowed ? 'pb-ok' : 'pb-no'">
        <mdi-airplane v-if="allowed" class="pb-v-icon" />
        <mdi-alert v-else class="pb-v-icon" />
        <span v-if="allowed">不超过民航 <Latex tex="160\ \text{Wh}" /> 限额 —— 可以携带上机</span>
        <span v-else>已超过民航 <Latex tex="160\ \text{Wh}" /> 限额 —— 不能携带上机</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pb-wrap {
  display: flex;
  gap: 1.1rem;
  align-items: stretch;
  width: 100%;
}

.pb-fig {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  min-width: 0;
  padding: 0.3rem;
  border: 1px solid rgb(100 116 139 / 25%);
  border-radius: 1rem;

  background: rgb(15 23 42 / 55%);
}

.pb-svg {
  width: 100%;
  height: 100%;
  max-height: 190px;
}

.pb-panel {
  display: flex;
  flex: 0 0 432px;
  flex-direction: column;
  gap: 0.45rem;
  justify-content: center;

  min-width: 0;
}

.pb-sliders {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.pb-slider {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.pb-slider-head {
  display: flex;
  gap: 0.3rem;
  align-items: baseline;
  justify-content: space-between;
}

.pb-slider-name {
  font-weight: 800;
  font-size: 0.95rem;
}

.pb-slider-val {
  font-weight: 800;
  font-size: 0.95rem;
  white-space: nowrap;
}

.pb-range {
  width: 100%;
  height: 1.15rem;
  cursor: pointer;
}

.pb-reads {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  padding: 0.4rem 0.6rem;
  border: 1px solid rgb(100 116 139 / 22%);
  border-radius: 0.9rem;

  background: rgb(15 23 42 / 65%);
}

.pb-line {
  font-size: 0.88rem;
}

.pb-line-wh {
  color: #e2a846;
  font-weight: 700;
}

.pb-verdict {
  display: flex;
  gap: 0.45rem;
  align-items: center;

  padding: 0.3rem 0.55rem;
  border-radius: 0.7rem;

  font-weight: 800;
  font-size: 0.85rem;
}

.pb-ok {
  border: 1px solid rgb(74 222 128 / 35%);
  background: rgb(74 222 128 / 10%);
  color: #86efac;
}

.pb-no {
  border: 1px solid rgb(248 113 113 / 35%);
  background: rgb(248 113 113 / 10%);
  color: #fca5a5;
}

.pb-v-icon {
  font-size: 1.15rem;
}

.pb-ok .pb-v-icon {
  color: #4ade80;
}

.pb-no .pb-v-icon {
  color: #f87171;
}
</style>
