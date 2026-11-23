<!--
  LC 回路振荡状态图（第 2–8 页共用）：
  电容器极板电荷、电流方向与大小、电场能/磁场能都按简谐振动的真实相位计算。
  quarter = 以 T/4 为单位的振荡进程：0 = 充电完毕刚要放电；1 = 放电完毕；2 = 反向充电完毕；3 = 反向放电完毕；4 = 又充电完毕。
  电荷量 q ∝ cos(π/2·quarter)，电流 i ∝ sin(π/2·quarter)；电场能 ∝ q²，磁场能 ∝ i²。
-->
<script setup lang="ts">
import { computed } from "vue";

const {
  quarter = 0,
  switchClosed = true,
  showEnergy = false,
  showLabels = true,
} = defineProps<{
  /** 振荡进程，以 T/4 为单位（0~4，可含 0.5 步） */
  quarter?: number;
  /** 开关是否闭合 */
  switchClosed?: boolean;
  /** 是否在右侧画电场能 / 磁场能柱状图 */
  showEnergy?: boolean;
  /** 是否标出 C、L、i */
  showLabels?: boolean;
}>();

const phase = computed(() => (Math.PI / 2) * quarter);

/** 归一化电荷量：+1 表示左板带正电 */
const charge = computed(() => Math.cos(phase.value));
/** 归一化电流：+1 表示沿逆时针方向（右侧导线向上） */
const current = computed(() => Math.sin(phase.value));

/** 极板上的电荷符号数量（最多 3 个） */
const chargeCount = computed(() => Math.round(3 * Math.abs(charge.value)));
/** 左板带正电还是负电 */
const positiveLeft = computed(() => charge.value >= 0);

const chargeYs = computed(() => {
  const rows: Record<number, number[]> = { 0: [], 1: [76], 2: [66, 86], 3: [58, 76, 94] };
  return rows[chargeCount.value] ?? [];
});

/** 电流箭头：方向随电流符号翻转，粗细与不透明度随大小变化 */
const currentOn = computed(() => Math.abs(current.value) > 0.04);
const currentOpacity = computed(() => (currentOn.value ? 0.35 + 0.65 * Math.abs(current.value) : 0));
const currentWidth = computed(() => 1.6 + 2.2 * Math.abs(current.value));
const currentArrow = computed(() =>
  current.value >= 0 ? { from: { x: 374, y: 214 }, to: { x: 374, y: 154 } } : { from: { x: 374, y: 154 }, to: { x: 374, y: 214 } },
);

/** 电场能、磁场能（归一化，两项之和恒为 1） */
const electricEnergy = computed(() => charge.value ** 2);
const magneticEnergy = computed(() => current.value ** 2);
const barMax = 148;
</script>

<template>
  <svg :viewBox="showEnergy ? '0 0 600 300' : '72 8 336 288'" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- 回路导线：止于电容器极板与开关触点 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 88 72 H 222" />
      <path d="M 258 72 H 310" />
      <path d="M 350 72 H 392" />
      <path d="M 88 72 V 248" />
      <path d="M 392 72 V 248" />
      <path d="M 88 248 H 170" />
      <path d="M 290 248 H 392" />
    </g>
    <!-- 电感线圈：四段半圆 -->
    <path
      d="M 170 248 a 15 15 0 0 1 30 0 a 15 15 0 0 1 30 0 a 15 15 0 0 1 30 0 a 15 15 0 0 1 30 0"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2.2"
      stroke-linecap="round"
    />
    <!-- 电容器极板 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="2.6" stroke-linecap="round">
      <line x1="222" y1="50" x2="222" y2="94" />
      <line x1="258" y1="50" x2="258" y2="94" />
    </g>
    <!-- 极板电荷：数量随 |q| 变化，极性随 q 的符号翻转 -->
    <g font-family="KaTeX_Main" font-size="15" text-anchor="middle">
      <text v-for="y in chargeYs" :key="`left-${y}`" x="232" :y="y" :fill="positiveLeft ? 'var(--c-danger)' : 'var(--c-velocity)'">
        {{ positiveLeft ? "+" : "−" }}
      </text>
      <text v-for="y in chargeYs" :key="`right-${y}`" x="248" :y="y" :fill="positiveLeft ? 'var(--c-velocity)' : 'var(--c-danger)'">
        {{ positiveLeft ? "−" : "+" }}
      </text>
    </g>
    <!-- 开关 -->
    <CircuitSwitch :x="330" :y="72" :open="!switchClosed" label="S" />
    <!-- 电流方向与大小 -->
    <g :opacity="currentOpacity">
      <CourseArrow
        :from="currentArrow.from"
        :to="currentArrow.to"
        stroke="var(--c-accent)"
        :stroke-width="currentWidth"
        :label="showLabels ? 'i' : ''"
        :label-dx="-16"
        :label-dy="0"
      />
    </g>
    <!-- 元件标签 -->
    <g v-if="showLabels" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-text-dim)" text-anchor="middle">
      <text x="240" y="38">C</text>
      <text x="230" y="272">L</text>
    </g>
    <!-- 能量柱状图：两项之和恒为 1，无阻尼时总能量守恒 -->
    <g v-if="showEnergy">
      <line x1="414" y1="250" x2="540" y2="250" stroke="var(--c-neutral-700)" stroke-width="1.4" />
      <rect :x="424" :y="250 - barMax * electricEnergy" width="42" :height="barMax * electricEnergy" rx="4" fill="var(--c-accent)" opacity="0.85" />
      <rect :x="488" :y="250 - barMax * magneticEnergy" width="42" :height="barMax * magneticEnergy" rx="4" fill="var(--c-accent-2)" opacity="0.85" />
      <text x="445" y="274" font-size="17" text-anchor="middle" fill="var(--c-text-dim)">电场能</text>
      <text x="509" y="274" font-size="17" text-anchor="middle" fill="var(--c-text-dim)">磁场能</text>
    </g>
  </svg>
</template>
