<script setup lang="ts">
/**
 * 多用电表读数训练台 —— 用 physics-modal 移植过来的表盘 + 读数引擎。
 *
 * 物理模型（真值 → 指针 → 读数，全部走真实规则，没有写死的数字）：
 *
 * - 滑块给的是**被测物理量的真值**（电压 / 电流 / 电阻），不是指针位置；
 * - 欧姆挡：该挡中值电阻 = R_中 × 倍率，指针偏转 f = 中值/(中值 + R_x)；
 * - 电压 / 电流挡：f = 真值 / 量程（超量程则打到最右，即"打表"）；
 * - 读数由表盘刻度线反算：欧姆挡 = 刻度值 × 倍率；直流挡按分度值取位。 因此"换挡 → 指针真的会动、读数真的会变"，选倍率/选量程的教学点就成立。
 *
 * 真值默认**不上屏**（滑块不显示数字），读数由 `reveal` 控制何时出现 —— 先让学生看指针自己读。
 */
import { computed, ref } from "vue";

import type { Gear } from "./multimeter-model";
import { calculateReading, deflectionOf, GEARS } from "./multimeter-model";
import MultimeterDial from "./MultimeterDial.vue";

const { kind = "dcv", reveal = false } = defineProps<{
  /** 训练哪一类挡位：直流电压 / 直流电流 / 欧姆 */
  kind?: "dcv" | "dcma" | "ohm";
  /** 是否亮出读数（接页面 $clicks） */
  reveal?: boolean;
}>();

const pool = computed(() => GEARS.filter((g) => g.category === kind));

/** 按 id 取挡位；找不到就退回 OFF（正常不会发生，避免用 non-null 断言） */
const gearById = (id: string): Gear => GEARS.find((g) => g.id === id) ?? GEARS[0];

const defaultGear = computed<Gear>(() => {
  if (kind === "ohm") return gearById("ohm_1");
  if (kind === "dcma") return gearById("dcma_250");
  return gearById("dcv_10");
});

const gear = ref<Gear>(defaultGear.value);

/** 滑块位置 0~100；各挡位自己把它映射成真值（欧姆挡走对数，才够得着几 Ω 到几十 kΩ） */
const pos = ref(38);

const value = computed<number>(() => {
  const p = pos.value / 100;
  if (kind === "ohm") return Math.round(10 ** (0.3 + p * 4));
  if (kind === "dcma") return Number((p * 300).toFixed(1));
  return Number((p * 12).toFixed(2));
});

const unitTex = computed<string>(() =>
  kind === "ohm"
    ? String.raw`\Omega`
    : kind === "dcma"
      ? String.raw`\text{mA}`
      : String.raw`\text{V}`,
);

const deflection = computed<number>(() => deflectionOf(gear.value, value.value));
const reading = computed(() => calculateReading(gear.value, deflection.value));

/** 打到最右 = 超量程（欧姆挡的满偏是短接调零点，不算超量程） */
const overRange = computed<boolean>(
  () => kind !== "ohm" && value.value > (gear.value.range ?? 0) + 1e-9,
);

/** 读数练习的"标准答案"：真值。理想表下读数应当与它一致； 量程选得太大时读数会被分度值吃掉精度，正好用来说明"量程要选得合适"。 */
const valueTex = computed<string>(() => {
  if (kind === "ohm")
    return value.value >= 1000 ? (value.value / 1000).toFixed(2) : value.value.toString();

  return kind === "dcma" ? value.value.toFixed(1) : value.value.toFixed(2);
});
const valueUnitTex = computed<string>(() =>
  kind === "ohm" && value.value >= 1000 ? String.raw`\text{k}\Omega` : unitTex.value,
);

/** 换挡：换过倍率就要重新短接调零 —— 这层提醒由读数要点（reading.note）给出 */
const pickGear = (g: Gear): void => {
  gear.value = g;
};

const presets = computed(() => {
  if (kind !== "ohm") return [];
  return [
    { label: "13 Ω", value: 13 },
    { label: "150 Ω", value: 150 },
    { label: "2 kΩ", value: 2000 },
    { label: "18 kΩ", value: 18000 },
  ];
});
/** 预设值反推滑块位置（对数刻度） */
const applyPreset = (v: number): void => {
  pos.value = Math.max(0, Math.min(100, ((Math.log10(v) - 0.3) / 4) * 100));
};
</script>

<template>
  <div class="ml-root">
    <div class="ml-dial">
      <MultimeterDial :deflection="deflection" :gear="gear" view-box="8 8 684 430" />
    </div>
    <div class="ml-side">
      <div class="ml-gears">
        <button
          v-for="g in pool"
          :key="g.id"
          type="button"
          class="ml-gear"
          :class="{ on: g.id === gear.id }"
          @click="pickGear(g)"
        >
          {{ g.label }}
        </button>
      </div>
      <CourseSlider
        v-model="pos"
        :min="0"
        :max="100"
        :step="1"
        label="拖动改变待测对象"
        accent="gold"
      >
        <template #value>
          <span v-if="overRange" class="ml-over">超量程</span>
          <span v-else>—</span>
        </template>
      </CourseSlider>
      <div v-if="presets.length" class="ml-presets">
        <span class="ml-presets-label">待测电阻：</span>
        <button
          v-for="p in presets"
          :key="p.label"
          type="button"
          class="ml-gear"
          @click="applyPreset(p.value)"
        >
          {{ p.label }}
        </button>
      </div>
      <div class="ml-panel">
        <div class="ml-read" :class="{ 'is-hidden': !reveal }">
          <div class="ml-read-head">
            <span class="ml-read-gear">{{ gear.name }}</span>
            <span class="ml-read-scale">{{ gear.scaleName }}</span>
          </div>
          <div class="ml-read-value">
            <Latex :tex="reading.valueTex" />
            <span v-if="reading.unitTex" class="ml-read-unit"
              ><Latex :tex="reading.unitTex"
            /></span>
          </div>
          <div v-for="(step, i) in reading.stepsTex" :key="`s${i}`" class="ml-step">
            <Latex :tex="step" />
          </div>
          <div class="ml-true">待测真值 <Latex :tex="valueTex" /><Latex :tex="valueUnitTex" /></div>
          <div class="ml-note" :class="`lv-${reading.level}`">{{ reading.note }}</div>
        </div>
        <div class="ml-ask-note" :class="{ 'is-hidden': reveal }">
          先看指针停在哪一格，自己把数读出来；再换几个挡位，看指针怎么跑。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 这一块整体要压进 980×552 的一页里，所以字号与行距都取得比常规紧 */
.ml-root {
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
  width: 100%;
  min-width: 0;
}
.ml-dial {
  flex: 0 0 46%;
  min-width: 0;
}
.ml-side {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.ml-gears {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}
.ml-gear {
  padding: 0.16rem 0.5rem;
  border-radius: 0.45rem;
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-dim);
  font-size: 0.82rem;
  line-height: 1.5;
  cursor: pointer;
}
.ml-gear.on {
  border-color: var(--c-accent);
  background: var(--c-accent-glow);
  color: var(--c-accent);
  font-weight: 700;
}
.ml-presets {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
}
.ml-presets-label {
  font-size: 0.82rem;
  color: var(--c-text-dim);
}
/* 占位容器：读数区与提示语叠在同一个格子里，两块高度取大者 ⇒
   点第 1 步只换内容、不改变高度，上面的问题与表盘都不会被顶跑 */
.ml-panel {
  display: grid;
}
.ml-panel > * {
  grid-area: 1 / 1;
}
.is-hidden {
  visibility: hidden;
}
.ml-read {
  display: grid;
  gap: 0.18rem;
  padding: 0.45rem 0.6rem;
  border-radius: 0.75rem;
  border: 1px solid var(--c-border);
  background: var(--c-panel);
}
.ml-read-head {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: baseline;
}
.ml-read-gear {
  font-size: 1rem;
  font-weight: 700;
  color: var(--c-text);
}
.ml-read-scale {
  font-size: 0.76rem;
  color: var(--c-text-dim);
}
.ml-read-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--c-accent);
  line-height: 1.1;
}
.ml-read-unit {
  margin-left: 0.2rem;
  font-size: 1rem;
}
.ml-step {
  font-size: 0.82rem;
  color: var(--c-text-dim);
}
.ml-true {
  font-size: 0.76rem;
  color: var(--c-text-mute);
}
.ml-note {
  font-size: 0.78rem;
  line-height: 1.45;
  padding: 0.35rem 0.55rem;
  border-radius: 0.6rem;
  border: 1px solid var(--c-border);
}
.ml-note.lv-ok {
  color: var(--c-ok);
  border-color: rgb(52 211 153 / 30%);
}
.ml-note.lv-warn {
  color: var(--c-hint-warn);
  border-color: rgb(210 153 34 / 30%);
}
.ml-note.lv-info {
  color: var(--c-text-dim);
}
.ml-ask-note {
  font-size: 0.85rem;
  color: var(--c-accent);
}
.ml-over {
  color: var(--c-danger);
  font-weight: 700;
}
</style>
