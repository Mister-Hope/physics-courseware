<script setup lang="ts">
/**
 * 第 9 页：电表改装计算台。给定表头内阻 Rg、满偏电流 Ig 与目标量程， 切换"改装成电压表（串联分压电阻）/ 改装成电流表（并联分流电阻）"两种模式， 电阻值按教材公式实时计算：Ug =
 * IgRg，R = U/Ig − Rg，R = IgRg/(I − Ig)。
 */
import { computed, ref } from "vue";

type Mode = "v" | "a";
const mode = ref<Mode>("v");
const rg = ref(30);
const ig = ref(1);
const rangeU = ref(10);
const rangeI = ref(0.6);

const ug = computed(() => ig.value * 1e-3 * rg.value);
const rSeries = computed(() => rangeU.value / (ig.value * 1e-3) - rg.value);
const rShunt = computed(() => (ig.value * 1e-3 * rg.value) / (rangeI.value - ig.value * 1e-3));
const rAmmeter = computed(() => (rg.value * rShunt.value) / (rg.value + rShunt.value));

const fmt = (v: number) => {
  if (!Number.isFinite(v)) return "—";
  if (Math.abs(v) >= 100) return v.toFixed(0);
  if (Math.abs(v) >= 1) return v.toFixed(1);
  return v.toFixed(3);
};

const vOk = computed(() => rSeries.value > 0);
const vWarnTex = computed(() => `U_g = I_g R_g = ${fmt(ug.value)}\\ \\text{V}`);
</script>

<template>
  <div class="mc-lab">
    <div class="mc-switch">
      <button class="mc-btn" :class="{ on: mode === 'v' }" type="button" @click="mode = 'v'">
        改装成电压表
      </button>
      <button class="mc-btn" :class="{ on: mode === 'a' }" type="button" @click="mode = 'a'">
        改装成电流表
      </button>
    </div>
    <div class="mc-body">
      <div class="mc-ctrl">
        <CourseSlider
          v-model="rg"
          :min="10"
          :max="1000"
          :step="10"
          label="表头内阻"
          label-tex="R_g"
          accent="gold"
        >
          <template #value>{{ rg }}<Latex tex="\ \Omega" /></template>
        </CourseSlider>
        <CourseSlider
          v-model="ig"
          :min="0.1"
          :max="2"
          :step="0.1"
          label="满偏电流"
          label-tex="I_g"
          accent="blue"
        >
          <template #value>{{ ig.toFixed(1) }}<Latex tex="\ \text{mA}" /></template>
        </CourseSlider>
        <CourseSlider
          v-if="mode === 'v'"
          v-model="rangeU"
          :min="1"
          :max="100"
          :step="1"
          label="量程"
          label-tex="U"
          accent="teal"
        >
          <template #value>{{ rangeU }}<Latex tex="\ \text{V}" /></template>
        </CourseSlider>
        <CourseSlider
          v-else
          v-model="rangeI"
          :min="0.1"
          :max="3"
          :step="0.1"
          label="量程"
          label-tex="I"
          accent="teal"
        >
          <template #value>{{ rangeI.toFixed(1) }}<Latex tex="\ \text{A}" /></template>
        </CourseSlider>
      </div>
      <div class="mc-out">
        <div class="mc-row">
          <Latex tex="U_g = I_g R_g" />
          <Latex :tex="`= ${fmt(ug)}\\ \\text{V}`" />
        </div>
        <template v-if="mode === 'v'">
          <div class="mc-row">
            <Latex tex="R = \dfrac{U}{I_g} - R_g" />
            <Latex v-if="vOk" :tex="`= ${fmt(rSeries)}\\ \\Omega`" />
            <Latex v-else :tex="`\dfrac{U}{I_g} \le R_g`" />
          </div>
          <div v-if="vOk" class="mc-note">
            表头串联这个电阻，两端加到 <Latex :tex="`${rangeU}\\ \\text{V}`" /> 时表头恰好满偏。
          </div>
          <div v-else class="mc-warn">
            量程 <Latex :tex="`${rangeU}\\ \\text{V}`" /> 小于满偏电压
            <Latex tex="U_g" />，量程要选大一些。
          </div>
        </template>
        <template v-else>
          <div class="mc-row">
            <Latex tex="R = \dfrac{I_g R_g}{I - I_g}" />
            <Latex :tex="`= ${fmt(rShunt)}\\ \\Omega`" />
          </div>
          <div class="mc-row">
            <Latex tex="R_A = \dfrac{R_g R}{R_g + R}" />
            <Latex :tex="`= ${fmt(rAmmeter)}\\ \\Omega`" />
          </div>
          <div class="mc-note">
            表头并联这个电阻，干路电流为
            <Latex :tex="`${rangeI}\\ \\text{A}`" /> 时表头恰好满偏；改装后的电流表内阻很小。
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mc-lab {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.mc-switch {
  display: flex;
  gap: 0.6rem;
}
.mc-btn {
  flex: 1;
  padding: 0.45rem 0;
  font-size: 1rem;
  color: var(--c-text-dim);
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
}
.mc-btn.on {
  color: var(--c-bg);
  background: var(--c-accent);
  border-color: var(--c-accent);
}
.mc-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
}
.mc-ctrl {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.mc-out {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 0.75rem 0.9rem;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
}
.mc-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  font-size: 1.02rem;
}
.mc-note {
  font-size: 0.88rem;
  color: var(--c-text-dim);
}
.mc-warn {
  font-size: 0.88rem;
  color: var(--c-danger);
}
</style>
