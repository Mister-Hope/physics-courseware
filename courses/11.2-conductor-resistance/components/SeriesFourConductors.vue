<script setup lang="ts">
import { computed } from "vue";

/**
 * 第 6 页（实验方案）：四段导体 a、b、c、d 串联，电压表依次并联到各段两端。 分步（`:step="$clicks"`）：第 0 步只有四段导体串联的电路；点击后电压表接到 a 两端，
 * 之后每点一次换到下一段（b → c → d）。
 *
 * 排布：上方导线只放四段导体，开关 S 与电流表 A 都放到下方导线上 —— 回路更紧凑、元件画得更大； 电压表贴着被测段下方（y=95），开关字母 S
 * 画在下方导线之下（避开表笔），两根表笔落在离元件接线端 10 的导线上（cx±34），落点画小实心点示意"夹在这里"。 电路元件全部用共享 `<Circuit*>`
 * 组件，导线手画、止于元件两端。
 */
const { step = 0 } = defineProps<{ step?: number }>();

/** 四段导体（沿上方导线串联，各长 48，间距 90） */
const segments = [
  { key: "a", cx: 130 },
  { key: "b", cx: 220 },
  { key: "c", cx: 310 },
  { key: "d", cx: 400 },
];

const showVoltmeter = computed(() => step >= 1);

const activeIndex = computed(() => Math.min(Math.max(step - 1, 0), segments.length - 1));
</script>

<template>
  <svg
    viewBox="0 0 560 190"
    xmlns="http://www.w3.org/2000/svg"
    class="block w-full h-auto"
    aria-hidden="true"
  >
    <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
      <path d="M 70 50 H 106" />
      <path d="M 154 50 H 196" />
      <path d="M 244 50 H 286" />
      <path d="M 334 50 H 376" />
      <path d="M 424 50 H 490" />
      <path d="M 70 50 V 92" />
      <path d="M 70 108 V 150" />
      <path d="M 70 150 H 170" />
      <path d="M 210 150 H 439" />
      <path d="M 471 150 H 490" />
      <path d="M 490 150 V 50" />
    </g>
    <rect
      x="103"
      y="39"
      width="54"
      height="22"
      rx="5"
      fill="rgba(226,168,70,0.16)"
      :style="{ visibility: showVoltmeter && activeIndex === 0 ? 'visible' : 'hidden' }"
    />
    <rect
      x="193"
      y="39"
      width="54"
      height="22"
      rx="5"
      fill="rgba(226,168,70,0.16)"
      :style="{ visibility: showVoltmeter && activeIndex === 1 ? 'visible' : 'hidden' }"
    />
    <rect
      x="283"
      y="39"
      width="54"
      height="22"
      rx="5"
      fill="rgba(226,168,70,0.16)"
      :style="{ visibility: showVoltmeter && activeIndex === 2 ? 'visible' : 'hidden' }"
    />
    <rect
      x="373"
      y="39"
      width="54"
      height="22"
      rx="5"
      fill="rgba(226,168,70,0.16)"
      :style="{ visibility: showVoltmeter && activeIndex === 3 ? 'visible' : 'hidden' }"
    />
    <CircuitBattery :x="70" :y="100" orientation="vertical" polarity />
    <CircuitSwitch :x="190" :y="150" :open="false" />
    <text
      x="190"
      y="172"
      text-anchor="middle"
      font-family="KaTeX_Main"
      font-size="16"
      fill="var(--c-text)"
    >
      S
    </text>
    <CircuitMeter kind="a" :x="455" :y="150" />
    <CircuitResistor
      :x="130"
      :y="50"
      label="a"
      :color="activeIndex === 0 ? 'var(--c-accent)' : 'var(--c-text)'"
    />
    <CircuitResistor
      :x="220"
      :y="50"
      label="b"
      :color="activeIndex === 1 ? 'var(--c-accent)' : 'var(--c-text)'"
    />
    <CircuitResistor
      :x="310"
      :y="50"
      label="c"
      :color="activeIndex === 2 ? 'var(--c-accent)' : 'var(--c-text)'"
    />
    <CircuitResistor
      :x="400"
      :y="50"
      label="d"
      :color="activeIndex === 3 ? 'var(--c-accent)' : 'var(--c-text)'"
    />
    <g
      v-for="(seg, index) in segments"
      :key="seg.key"
      :style="{ visibility: showVoltmeter && activeIndex === index ? 'visible' : 'hidden' }"
    >
      <path
        :d="`M ${seg.cx - 34} 50 V 95 H ${seg.cx - 16}`"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.6"
        stroke-linecap="round"
      />
      <path
        :d="`M ${seg.cx + 34} 50 V 95 H ${seg.cx + 16}`"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.6"
        stroke-linecap="round"
      />
      <circle :cx="seg.cx - 34" cy="50" r="2.6" fill="var(--c-text-dim)" />
      <circle :cx="seg.cx + 34" cy="50" r="2.6" fill="var(--c-text-dim)" />
      <CircuitMeter kind="v" :x="seg.cx" :y="95" color="var(--c-accent)" />
    </g>
  </svg>
</template>
