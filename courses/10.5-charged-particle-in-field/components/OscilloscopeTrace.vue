<script setup lang="ts">
/**
 * 第 14 页：示波管怎样显示波形。 step 0：不加电压，亮斑在中心；step 1：YY′ 加信号电压，亮斑只上下移动； step 2：XX′ 加扫描电压，亮斑左右匀速移动；step
 * 3：两者同时作用，屏上描出稳定波形。
 */
import { computed } from "vue";

const { step = 0 } = defineProps<{ step?: number }>();

/** 荧光屏放大区：中心 (615, 112)，宽 180、纵向幅度 62 */
const SX0 = 525;
const SX1 = 705;
const SY = 112;
const AMP = 62;

/** 波形（一个周期正好扫满一屏） */
const sinePath = computed(() => {
  const count = 80;
  let path = "";
  for (let i = 0; i <= count; i += 1) {
    const x = SX0 + ((SX1 - SX0) * i) / count;
    const y = SY - AMP * Math.sin((2 * Math.PI * i) / count);
    path += `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return path.trim();
});

/** YY′ 有信号时电子束偏转后的轨迹（极板内为抛物线，出射后沿切线） */
const deflectedBeam = "M 72 112 L 115 112 Q 150 112 185 108.6 L 400 88";

const beamPath = computed(() => (step === 0 || step === 2 ? "M 72 112 L 400 112" : deflectedBeam));

const hitY = computed(() => (step === 1 || step === 3 ? 88 : 112));
</script>

<template>
  <svg viewBox="0 0 760 230" width="760" height="230" font-family="Inter, system-ui, sans-serif">
    <path
      d="M 14 80 L 360 80 L 400 45 L 400 180 L 360 144 L 14 144 Z"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.6"
      stroke-opacity="0.4"
    />
    <rect
      x="22"
      y="95"
      width="50"
      height="34"
      rx="8"
      fill="color-mix(in srgb, var(--c-surface-solid) 80%, transparent)"
      stroke="var(--c-text-dim)"
      stroke-width="1.5"
    />
    <line
      x1="34"
      y1="104"
      x2="34"
      y2="120"
      stroke="var(--c-accent)"
      stroke-width="2.8"
      stroke-linecap="round"
    />
    <path
      d="M 72 106 L 84 110 L 84 114 L 72 118 Z"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.3"
    />
    <rect
      x="115"
      y="84"
      width="70"
      height="6"
      rx="2"
      fill="var(--c-text-dim)"
      fill-opacity="0.75"
    />
    <rect
      x="115"
      y="134"
      width="70"
      height="6"
      rx="2"
      fill="var(--c-text-dim)"
      fill-opacity="0.75"
    />
    <text x="150" y="72" text-anchor="middle" fill="var(--c-text-dim)" font-size="12">YY′</text>
    <text x="48" y="20" text-anchor="middle" fill="var(--c-text-dim)" font-size="12">电子枪</text>
    <line
      x1="400"
      y1="45"
      x2="400"
      y2="180"
      stroke="var(--c-text-dim)"
      stroke-width="4"
      stroke-opacity="0.55"
    />
    <line
      x1="400"
      y1="45"
      x2="500"
      y2="22"
      stroke="var(--c-text-dim)"
      stroke-width="1"
      stroke-dasharray="5 4"
      stroke-opacity="0.6"
    />
    <line
      x1="400"
      y1="180"
      x2="500"
      y2="202"
      stroke="var(--c-text-dim)"
      stroke-width="1"
      stroke-dasharray="5 4"
      stroke-opacity="0.6"
    />
    <path
      :d="beamPath"
      fill="none"
      stroke="var(--c-physics)"
      stroke-width="2.6"
      stroke-linecap="round"
    />
    <circle :cx="400" :cy="hitY" r="4" fill="var(--c-physics)" />
    <text x="400" y="212" text-anchor="middle" fill="var(--c-text-dim)" font-size="12">荧光屏</text>
    <rect
      x="500"
      y="22"
      width="230"
      height="180"
      rx="10"
      fill="color-mix(in srgb, var(--c-surface-solid) 72%, transparent)"
      stroke="var(--c-text-dim)"
      stroke-width="1.5"
    />
    <text x="615" y="14" text-anchor="middle" fill="var(--c-text-dim)" font-size="12">
      荧光屏正面
    </text>
    <g stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="4 5" stroke-opacity="0.35">
      <line x1="615" y1="32" x2="615" y2="192" />
      <line x1="525" y1="112" x2="705" y2="112" />
    </g>
    <text x="626" y="126" fill="var(--c-text-dim)" font-size="11">O</text>
    <g v-if="step === 0">
      <circle cx="615" cy="112" r="9" fill="var(--c-velocity)" fill-opacity="0.2" />
      <circle cx="615" cy="112" r="4.5" fill="var(--c-velocity)" />
    </g>
    <g v-if="step === 1">
      <line
        x1="615"
        :y1="SY - AMP"
        x2="615"
        :y2="SY + AMP"
        stroke="var(--c-velocity)"
        stroke-width="7"
        stroke-opacity="0.18"
        stroke-linecap="round"
      />
      <line
        x1="615"
        :y1="SY - AMP"
        x2="615"
        :y2="SY + AMP"
        stroke="var(--c-velocity)"
        stroke-width="2.4"
        stroke-linecap="round"
      />
    </g>
    <g v-if="step === 2">
      <line
        :x1="SX0"
        y1="112"
        :x2="SX1"
        y2="112"
        stroke="var(--c-velocity)"
        stroke-width="7"
        stroke-opacity="0.18"
        stroke-linecap="round"
      />
      <line
        :x1="SX0"
        y1="112"
        :x2="SX1"
        y2="112"
        stroke="var(--c-velocity)"
        stroke-width="2.4"
        stroke-linecap="round"
      />
    </g>
    <g v-if="step === 3">
      <path
        :d="sinePath"
        fill="none"
        stroke="var(--c-velocity)"
        stroke-width="7"
        stroke-opacity="0.18"
        stroke-linecap="round"
      />
      <path
        :d="sinePath"
        fill="none"
        stroke="var(--c-velocity)"
        stroke-width="2.4"
        stroke-linecap="round"
      />
    </g>
  </svg>
</template>
