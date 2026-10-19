<!--
  1831 年法拉第的铁环实验：两个线圈绕在同一个铁环上。
  线圈 A（左，接电源 + 开关）· 线圈 B（右，接电流表）。
  点按钮接通 / 断开电源：线圈 A 的电流从无到有（或从有到无），铁环中的磁场随之变化，
  另一个线圈 B 的磁通量发生变化 ⇒ 只在接通、断开的瞬间出现感应电流；稳定通电时没有。
  环中金色流动虚线 = 铁环里的磁场（随线圈 A 有无电流而出现 / 消失）。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

const C = { x: 360, y: 150 };
const RI = 52;
const RO = 78;

/** 环上某点（半径 r、角度 deg，SVG 坐标 y 向下） */
const pt = (r: number, deg: number): { x: number; y: number } => {
  const a = (deg * Math.PI) / 180;
  return {
    x: Math.round((C.x + r * Math.cos(a)) * 10) / 10,
    y: Math.round((C.y + r * Math.sin(a)) * 10) / 10,
  };
};

/** 线圈 A（左侧 4 匝）与线圈 B（右侧 4 匝）：每匝画成穿过环带的径向线段 */
const segA = [150, 170, 190, 210].map((d) => ({ a: pt(RI, d), b: pt(RO, d) }));
const segB = [-30, -10, 10, 30].map((d) => ({ a: pt(RI, d), b: pt(RO, d) }));
/** 匝与匝之间沿环外壁走的连线（首尾两匝即引线的出发点） */
const outerA = [150, 170, 190, 210].map((d) => pt(RO, d));
const outerB = [-30, -10, 10, 30].map((d) => pt(RO, d));

const line = (p: { x: number; y: number }, q: { x: number; y: number }): string =>
  `M ${p.x} ${p.y} L ${q.x} ${q.y}`;
const poly = (ps: { x: number; y: number }[]): string =>
  ps.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

const leadTopA = outerA[3];
const leadBotA = outerA[0];
const leadTopB = outerB[0];
const leadBotB = outerB[3];

const powered = ref(false);
/** +1 = 接通瞬间，−1 = 断开瞬间，0 = 无瞬时电流 */
const pulse = ref(0);
let timer = 0;

const toggle = (): void => {
  powered.value = !powered.value;
  pulse.value = powered.value ? 1 : -1;
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    pulse.value = 0;
  }, 1000);
};

onBeforeUnmount(() => window.clearTimeout(timer));

const aStatus = computed(() => (powered.value ? "线圈 A：有电流" : "线圈 A：无电流"));
const bStatus = computed(() => {
  if (pulse.value > 0) return { cls: "ok", text: "接通瞬间：有感应电流" };
  if (pulse.value < 0) return { cls: "ok", text: "断开瞬间：有感应电流（方向与接通时相反）" };
  if (powered.value) return { cls: "bad", text: "稳定通电：无感应电流" };
  return { cls: "bad", text: "无感应电流" };
});
</script>

<template>
  <div class="ei-panel">
    <svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" class="ei-svg">
      <!-- 铁环 -->
      <circle
        :cx="C.x"
        :cy="C.y"
        r="65"
        fill="none"
        stroke="var(--c-neutral-700)"
        stroke-width="26"
      />
      <circle
        :cx="C.x"
        :cy="C.y"
        r="65"
        fill="none"
        stroke="var(--c-neutral-600)"
        stroke-width="26"
        opacity="0.35"
      />
      <text :x="C.x" :y="C.y + 6" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">
        铁环
      </text>
      <!-- 铁环中的磁场：线圈 A 有电流时才出现（金色流动虚线） -->
      <circle
        v-if="powered"
        :cx="C.x"
        :cy="C.y"
        r="65"
        class="ei-ring-flow"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="4"
      />
      <!-- 两个线圈的绕组 -->
      <g stroke="var(--c-accent)" stroke-width="3.4" stroke-linecap="round">
        <path v-for="(s, i) in segA" :key="'sa' + i" :d="line(s.a, s.b)" />
        <path :d="poly(outerA)" fill="none" />
        <path v-for="(s, i) in segB" :key="'sb' + i" :d="line(s.a, s.b)" />
        <path :d="poly(outerB)" fill="none" />
      </g>
      <!-- 线圈 A 的电路：引线 → 开关 → 电源 → 回到线圈 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path :d="line(leadTopA, { x: 250, y: 111 })" />
        <path :d="line({ x: 210, y: 111 }, { x: 170, y: 111 })" />
        <path :d="line({ x: 170, y: 111 }, { x: 170, y: 142 })" />
        <path :d="line({ x: 170, y: 158 }, { x: 170, y: 189 })" />
        <path :d="line({ x: 170, y: 189 }, leadBotA)" />
      </g>
      <CircuitBattery :x="170" :y="150" orientation="vertical" polarity emf="E" />
      <CircuitSwitch :x="230" :y="111" label="S" :open="!powered" />
      <!-- 线圈 B 的电路：引线 → 电流表 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path :d="line(leadTopB, { x: 500, y: 111 })" />
        <path :d="line({ x: 500, y: 111 }, { x: 500, y: 134 })" />
        <path :d="line({ x: 500, y: 166 }, { x: 500, y: 189 })" />
        <path :d="line({ x: 500, y: 189 }, leadBotB)" />
      </g>
      <CircuitMeter :x="500" :y="150" kind="a" />
      <!-- 感应电流：只在接通 / 断开的瞬间出现，方向随瞬时相反 -->
      <g
        v-if="pulse !== 0"
        fill="none"
        stroke="var(--c-physics)"
        stroke-width="3.4"
        stroke-linecap="round"
        :class="pulse > 0 ? 'ei-flow' : 'ei-flow ei-flow-rev'"
      >
        <path :d="line(leadTopB, { x: 500, y: 111 }) + ' L 500 134'" />
        <path :d="'M 500 166 L 500 189 ' + 'L ' + leadBotB.x + ' ' + leadBotB.y" />
      </g>
      <!-- 元件标签 -->
      <text x="150" y="232" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">
        线圈 A
      </text>
      <text x="500" y="232" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">
        线圈 B
      </text>
      <text x="470" y="98" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">
        电流表
      </text>
    </svg>
    <div class="ei-bar">
      <button type="button" class="ei-btn" :class="{ on: powered }" @click="toggle">
        {{ powered ? "断开电源" : "接通电源" }}
      </button>
      <span class="ei-pill" :class="powered ? 'ok' : 'bad'">{{ aStatus }}</span>
      <span class="ei-pill" :class="bStatus.cls">{{ bStatus.text }}</span>
    </div>
  </div>
</template>

<style scoped>
.ei-panel {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 0;
}

.ei-svg {
  display: block;
  flex: 1;
  width: 100%;
  min-height: 0;
}

.ei-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
</style>
