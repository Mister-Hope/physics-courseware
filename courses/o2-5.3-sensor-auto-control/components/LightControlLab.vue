<script setup lang="ts">
import { computed, ref } from "vue";

// 第 12 页：光控开关实验台 —— 光照 / R1 两个滑块，按分压公式真算基极电压，与阈值比较后点亮 LED
// 器件参数取自教材表 2（R1 最大 51 kΩ、R2 330 Ω、RG 亮阻 <3 kΩ / 暗阻 >1 MΩ、电源 6 V）；
// 阈值 2.0 V 与 RG-照度关系是按表 2 拟合的教学示意值，不是实测数据。

const E = 6;
const THRESHOLD = 2;
const R_MIN = 3000;
const LUX_MIN = 5;
const LUX_MAX = 1000;

/** 光照滑块（0–100 线性刻度 → 5–1000 lx 对数映射，越往右越亮） */
const light = ref(78);
/** 可调电阻 R1（kΩ），教材最大 51 kΩ */
const r1 = ref(51);

const lux = computed(() => {
  const t = light.value / 100;
  return LUX_MIN * (LUX_MAX / LUX_MIN) ** t;
});

/** 光敏电阻阻值（Ω）：强光趋于亮阻 3 kΩ，越暗越接近 1 MΩ 量级 */
const rg = computed(() => R_MIN + 5e6 / lux.value);

/** 分压：基极接 R1 与 RG 的中点，U_b = E·RG/(R1+RG) */
const ub = computed(() => (E * rg.value) / (r1.value * 1000 + rg.value));

const isOn = computed(() => ub.value >= THRESHOLD);
const barWidth = computed(() => `${Math.min(100, (ub.value / E) * 100).toFixed(1)}%`);
const thresholdLeft = computed(() => `${((THRESHOLD / E) * 100).toFixed(1)}%`);

const ubTex = computed(() => `${ub.value.toFixed(2)}\\,\\text{V}`);
const luxTex = computed(() => `${Math.round(lux.value)}\\,\\text{lx}`);
const rgTex = computed(() =>
  rg.value >= 1e6
    ? `${(rg.value / 1e6).toFixed(2)}\\,\\text{M}\\Omega`
    : `${(rg.value / 1e3).toFixed(0)}\\,\\text{k}\\Omega`,
);
</script>

<template>
  <div class="lab">
    <div class="lab-board">
      <div class="lab-state" :class="isOn ? 'is-on' : 'is-off'">
        <mdi-lightbulb-on-outline class="icon-lg" />
        <span>{{ isOn ? "LED 亮" : "LED 不亮" }}</span>
        <span class="lab-state-sub">{{
          isOn ? "三极管导通，集电极有电流" : "三极管截止，集电极没有电流"
        }}</span>
      </div>
      <div class="lab-readout">
        <div class="lab-bar-label">
          <span>基极电压</span>
          <span class="lab-num"><Latex :tex="ubTex" /></span>
        </div>
        <div class="lab-bar">
          <div class="lab-bar-fill" :style="{ width: barWidth }"></div>
          <div class="lab-bar-mark" :style="{ left: thresholdLeft }"></div>
        </div>
        <div class="lab-bar-axis">
          <span>0</span>
          <span class="lab-axis-threshold" :style="{ left: thresholdLeft }">导通阈值 2.00 V</span>
          <span>6 V</span>
        </div>
        <div class="lab-values">
          <span>光敏电阻</span>
          <span class="lab-num"><Latex :tex="rgTex" /></span>
        </div>
      </div>
    </div>
    <div class="lab-controls">
      <CourseSlider v-model="light" :min="0" :max="100" :step="1" label="光照强度">
        <template #value><Latex :tex="luxTex" /></template>
      </CourseSlider>
      <CourseSlider v-model="r1" :min="20" :max="51" :step="1" label="可调电阻" label-tex="R_1">
        <template #value>{{ r1 }}<Latex tex="\text{ k}\Omega" /></template>
      </CourseSlider>
      <div class="lab-note">
        <Latex tex="R_1" /> 调得越大，要等天更暗（<Latex tex="R_G" /> 更大）才点灯。
      </div>
    </div>
  </div>
</template>
