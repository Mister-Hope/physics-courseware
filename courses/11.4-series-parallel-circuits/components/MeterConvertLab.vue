<script setup lang="ts">
/**
 * 电表改装计算台：给定表头内阻 Rg、满偏电流 Ig 与目标量程，切换"改装成电压表（串联分压电阻）/ 改装成电流表（并联分流电阻）"， 电阻值按教材公式实时计算：Ug = IgRg；R =
 * U/Ig − Rg；R = IgRg/(I − Ig)；改装后内阻 R_V = Rg + R、R_A = RgR/(Rg+R)。 读数区是固定列的
 * grid（公式一列、数值一列），拖动滑块时数值位数变化也不会把旁边的元素顶跑。
 */
import { computed, ref } from "vue";

type Mode = "v" | "a";

const mode = ref<Mode>("v");
const rg = ref(30);
const ig = ref(1);
const rangeU = ref(10);
const rangeI = ref(0.6);

/** 满偏电压 U_g = I_g R_g（V） */
const ug = computed(() => ig.value * 1e-3 * rg.value);
/** 改装成电压表要串联的分压电阻 R = U/I_g − R_g（Ω） */
const rSeries = computed(() => rangeU.value / (ig.value * 1e-3) - rg.value);
/** 改装成电流表要并联的分流电阻 R = I_g R_g/(I − I_g)（Ω） */
const rShunt = computed(() => (ig.value * 1e-3 * rg.value) / (rangeI.value - ig.value * 1e-3));
/** 改装后电压表内阻 R_V = R_g + R = U/I_g（Ω） */
const rVoltmeter = computed(() => rg.value + rSeries.value);
/** 改装后电流表内阻 R_A = R_g R/(R_g + R)（Ω） */
const rAmmeter = computed(() => (rg.value * rShunt.value) / (rg.value + rShunt.value));

/** 读数格式：大数不留小数、小数给足有效位 */
const fmt = (v: number): string => {
  if (!Number.isFinite(v)) return "—";
  if (v <= 0) return "—";
  if (Math.abs(v) >= 100) return v.toFixed(0);
  if (Math.abs(v) >= 1) return v.toFixed(1);
  return v.toFixed(3);
};

const vOk = computed(() => rSeries.value > 0);
const aOk = computed(() => rangeI.value > ig.value * 1e-3);
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
          label-width="6rem"
          layout="tight"
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
          label-width="6rem"
          layout="tight"
          accent="blue"
        >
          <template #value>{{ ig.toFixed(1) }}<Latex tex="\ \text{mA}" /></template>
        </CourseSlider>
        <CourseSlider
          v-model="rangeU"
          v-show="mode === 'v'"
          :min="1"
          :max="100"
          :step="1"
          label="量程"
          label-tex="U"
          label-width="6rem"
          layout="tight"
          accent="teal"
        >
          <template #value>{{ rangeU }}<Latex tex="\ \text{V}" /></template>
        </CourseSlider>
        <CourseSlider
          v-model="rangeI"
          v-show="mode === 'a'"
          :min="0.1"
          :max="3"
          :step="0.1"
          label="量程"
          label-tex="I"
          label-width="6rem"
          layout="tight"
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
            <Latex tex="R = \frac{U}{I_g} - R_g" />
            <Latex v-if="vOk" :tex="`= ${fmt(rSeries)}\\ \\Omega`" />
            <Latex v-else :tex="`U \le U_g`" />
          </div>
          <div v-if="vOk" class="mc-row">
            <Latex tex="R_V = R_g + R = \frac{U}{I_g}" />
            <Latex :tex="`= ${fmt(rVoltmeter)}\\ \\Omega`" />
          </div>
          <div v-if="vOk" class="mc-note">
            两端加到
            <Latex :tex="`${rangeU}\\ \\text{V}`" />
            时表头恰好满偏——电压表是一个"电压可读的大电阻"。
          </div>
          <div v-else class="mc-warn">
            量程 <Latex :tex="`${rangeU}\\ \\text{V}`" /> 还不到满偏电压
            <Latex tex="U_g" />，量程要往大选。
          </div>
        </template>
        <template v-else>
          <div class="mc-row">
            <Latex tex="R = \frac{I_g R_g}{I - I_g}" />
            <Latex :tex="`= ${fmt(rShunt)}\\ \\Omega`" />
          </div>
          <div class="mc-row">
            <Latex tex="R_A = \frac{R_g R}{R_g + R}" />
            <Latex :tex="`= ${fmt(rAmmeter)}\\ \\Omega`" />
          </div>
          <div v-if="aOk" class="mc-note">
            干路电流为
            <Latex :tex="`${rangeI.toFixed(1)}\\ \\text{A}`" />
            时表头恰好满偏——电流表是一个"电流可读的小电阻"。
          </div>
          <div v-else class="mc-warn">量程电流还不到满偏电流，量程要往大选。</div>
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
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);

  background: var(--c-surface);
  color: var(--c-text-dim);

  font-size: 1rem;

  cursor: pointer;
}

.mc-btn.on {
  border-color: var(--c-accent);
  background: var(--c-accent);
  color: var(--c-bg);
}

.mc-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
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
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);
}

/* 固定列：公式一列、读数一列（右对齐定宽），数值位数变化不会顶跑旁边的元素 */
.mc-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 8.5rem;
  gap: 0.6rem;
  align-items: center;

  font-size: 1.02rem;
  font-variant-numeric: tabular-nums;
}

.mc-row > :last-child {
  text-align: right;
}

.mc-note {
  color: var(--c-text-dim);
  font-size: 0.88rem;
}

.mc-warn {
  color: var(--c-danger);
  font-size: 0.88rem;
}
</style>
